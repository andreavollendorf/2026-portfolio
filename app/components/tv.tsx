"use client";

export default function TV() {
  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)] mb-3">
        Currently Watching
      </div>

      {/* TV Set */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* TV Body - vintage brown/gray plastic */}
          <div
            className="rounded-[4px] p-[10px] shadow-lg flex gap-2"
            style={{
              background: 'linear-gradient(180deg, #8b8178 0%, #6b6158 50%, #5a524a 100%)',
            }}
          >
            {/* Screen Section */}
            <div>
              {/* Screen bezel - darker inner frame */}
              <div
                className="rounded-[3px] p-[6px]"
                style={{
                  background: 'linear-gradient(180deg, #5a534b 0%, #4a433b 100%)',
                }}
              >
                {/* Screen with rounded CRT corners */}
                <div className="relative w-[140px] h-[105px] rounded-[8px] overflow-hidden bg-[#1a2a1a]">
                  {/* Video */}
                  <img
                    src="/tudor.webp"
                    alt="Tudor Monastery Farm"
                    className="w-full h-full object-cover"
                  />

                  {/* CRT Effects Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Scan lines */}
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 1px,
                          black 1px,
                          black 2px
                        )`,
                      }}
                    />

                    {/* Moving scan line */}
                    <div
                      className="absolute inset-x-0 h-[2px] bg-white/[0.03] animate-scan"
                    />

                    {/* Static noise */}
                    <div className="absolute inset-0 opacity-[0.015] animate-static bg-noise" />

                    {/* Screen curvature / vignette */}
                    <div
                      className="absolute inset-0 rounded-[8px]"
                      style={{
                        boxShadow: `inset 0 0 40px rgba(0,0,0,0.5)`,
                      }}
                    />

                    {/* Screen glare */}
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        background: `linear-gradient(
                          135deg,
                          rgba(255,255,255,0.3) 0%,
                          transparent 30%,
                          transparent 100%
                        )`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel - right side */}
            <div className="flex flex-col justify-between py-1 w-[44px]">
              {/* Speaker grille */}
              <div className="flex flex-col gap-[2px]">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[3px] rounded-full"
                    style={{
                      background: 'linear-gradient(180deg, #3a332b 0%, #4a433b 100%)',
                    }}
                  />
                ))}
              </div>

              {/* Knobs */}
              <div className="flex flex-col gap-2 items-center mt-2">
                {/* Channel dial */}
                <div
                  className="w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #9a9288 0%, #7a7268 100%)',
                    borderColor: '#5a534b',
                  }}
                >
                  <div className="w-[2px] h-[8px] bg-[#4a433b] rounded-full" />
                </div>

                {/* Volume dial */}
                <div
                  className="w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #9a9288 0%, #7a7268 100%)',
                    borderColor: '#5a534b',
                  }}
                >
                  <div className="w-[2px] h-[6px] bg-[#4a433b] rounded-full transform rotate-45" />
                </div>

                {/* Small buttons */}
                <div className="flex gap-1 mt-1">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#4a433b]" />
                  <div className="w-[8px] h-[8px] rounded-full bg-[#4a433b]" />
                </div>
              </div>
            </div>
          </div>

          {/* TV Base/Stand */}
          <div
            className="mx-auto mt-0 rounded-b-[2px]"
            style={{
              width: '90%',
              height: '6px',
              background: 'linear-gradient(180deg, #5a524a 0%, #4a423a 100%)',
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-[11px] text-[var(--muted)]">
        Tudor Monastery Farm
      </div>
    </div>
  );
}
