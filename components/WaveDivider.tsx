type Props = {
  flip?: boolean;
};

export function WaveDivider({ flip }: Props) {
  return (
    <div className="w-full overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={flip ? "rotate-180" : undefined}
      >
        <path
          d="M0 72L80 64C160 56 320 40 480 45.3C640 51 800 77 960 83.3C1120 90 1280 77 1360 70.7L1440 64V0H1360C1280 0 1120 0 960 0C800 0 640 0 480 0C320 0 160 0 80 0H0V72Z"
          fill="url(#paint0_linear)"
          opacity="0.9"
        />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="0" y2="120">
            <stop stopColor="var(--color-surface)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--color-bg)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
