"use client";

import { useState, useCallback, useEffect } from "react";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

type GameState = "playing" | "won" | "lost";

const GRID_SIZE = 8;
const MINE_COUNT = 10;

function createBoard(): Cell[][] {
  // Initialize empty board
  const board: Cell[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        }))
    );

  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate neighbor mines
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!board[row][col].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
              if (board[nr][nc].isMine) count++;
            }
          }
        }
        board[row][col].neighborMines = count;
      }
    }
  }

  return board;
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [globalWins, setGlobalWins] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize board on client only to avoid hydration mismatch
  useEffect(() => {
    setBoard(createBoard());
    setMounted(true);
    fetch("/api/minesweeper")
      .then((res) => res.json())
      .then((data) => setGlobalWins(data.wins))
      .catch(() => {});
  }, []);

  // Timer
  useEffect(() => {
    if (!started || gameState !== "playing") return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [started, gameState]);

  const revealCell = useCallback(
    (row: number, col: number, currentBoard: Cell[][]): Cell[][] => {
      if (
        row < 0 ||
        row >= GRID_SIZE ||
        col < 0 ||
        col >= GRID_SIZE ||
        currentBoard[row][col].isRevealed ||
        currentBoard[row][col].isFlagged
      ) {
        return currentBoard;
      }

      const newBoard = currentBoard.map((r) => r.map((c) => ({ ...c })));
      newBoard[row][col].isRevealed = true;

      // If empty cell, reveal neighbors
      if (newBoard[row][col].neighborMines === 0 && !newBoard[row][col].isMine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) {
              const result = revealCell(row + dr, col + dc, newBoard);
              for (let i = 0; i < GRID_SIZE; i++) {
                for (let j = 0; j < GRID_SIZE; j++) {
                  newBoard[i][j] = result[i][j];
                }
              }
            }
          }
        }
      }

      return newBoard;
    },
    []
  );

  const handleClick = useCallback(
    (row: number, col: number) => {
      if (gameState !== "playing" || board[row][col].isFlagged) return;

      if (!started) setStarted(true);

      const cell = board[row][col];

      if (cell.isMine) {
        // Game over - reveal all mines
        const newBoard = board.map((r) =>
          r.map((c) => ({
            ...c,
            isRevealed: c.isMine ? true : c.isRevealed,
          }))
        );
        setBoard(newBoard);
        setGameState("lost");
        return;
      }

      const newBoard = revealCell(row, col, board);
      setBoard(newBoard);

      // Check win condition
      const unrevealedSafe = newBoard
        .flat()
        .filter((c) => !c.isRevealed && !c.isMine).length;
      if (unrevealedSafe === 0) {
        setGameState("won");
        // Increment global wins
        fetch("/api/minesweeper", { method: "POST" })
          .then((res) => res.json())
          .then((data) => setGlobalWins(data.wins))
          .catch(() => {});
      }
    },
    [board, gameState, started, revealCell]
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if (gameState !== "playing" || board[row][col].isRevealed) return;

      const newBoard = board.map((r) => r.map((c) => ({ ...c })));
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
    },
    [board, gameState]
  );

  const resetGame = useCallback(() => {
    setBoard(createBoard());
    setGameState("playing");
    setTime(0);
    setStarted(false);
  }, []);

  if (!mounted) {
    return <div className="h-full flex flex-col p-4" />;
  }

  const flagCount = board.flat().filter((c) => c.isFlagged).length;

  const getNumberColor = (num: number) => {
    const colors: Record<number, string> = {
      1: "text-blue-600",
      2: "text-emerald-600",
      3: "text-red-500",
      4: "text-purple-600",
      5: "text-amber-600",
      6: "text-cyan-600",
      7: "text-gray-700",
      8: "text-gray-500",
    };
    return colors[num] || "";
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center mb-3 text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
        <span className="flex-1">{String(MINE_COUNT - flagCount).padStart(2, "0")} mines</span>
        <button
          onClick={resetGame}
          className="hover:text-[var(--foreground)] transition-colors"
        >
          {gameState === "won" ? "You won" : gameState === "lost" ? "Try again" : "Reset"}
        </button>
        <span className="flex-1 text-right">{String(Math.min(time, 999)).padStart(3, "0")}</span>
      </div>

      {/* Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div>
          <div
            className="grid gap-[1px] bg-[var(--border)] rounded-md overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
          {board.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <button
                key={`${rowIdx}-${colIdx}`}
                onClick={() => handleClick(rowIdx, colIdx)}
                onContextMenu={(e) => handleRightClick(e, rowIdx, colIdx)}
                disabled={gameState !== "playing"}
                className={`
                  w-6 h-6 flex items-center justify-center text-[11px] font-medium
                  transition-colors duration-75
                  ${
                    cell.isRevealed
                      ? cell.isMine
                        ? "bg-red-100"
                        : "bg-[var(--background)]"
                      : "bg-[var(--surface)] hover:bg-[var(--surface-hover)] active:bg-[var(--background)]"
                  }
                  ${getNumberColor(cell.neighborMines)}
                `}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    <span className="text-[10px]">●</span>
                  ) : cell.neighborMines > 0 ? (
                    cell.neighborMines
                  ) : null
                ) : cell.isFlagged ? (
                  <span className="text-red-400 text-[10px]">⚑</span>
                ) : null}
              </button>
            ))
          )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-[10px] text-[var(--muted)] flex justify-between">
        <span>Right-click to flag</span>
        {globalWins !== null && (
          <span>{globalWins.toLocaleString()} wins globally</span>
        )}
      </div>
    </div>
  );
}
