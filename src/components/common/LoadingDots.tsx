import clsx from "clsx";

interface LoadingDotsProps {
  color?: "gray" | "purple";
}

const colorClasses = {
  gray: "bg-gray-200",
  purple: "bg-purple-300",
} as const;

const LoadingDots = ({ color = "gray" }: LoadingDotsProps) => {
  return (
    <div className="flex h-full w-full flex-grow items-center justify-center">
      <div className="z-50 flex space-x-3.5" role="status" aria-live="polite">
        {[...Array(3)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className={clsx(
              "h-3 w-3 animate-bounce rounded-full",
              colorClasses[color],
            )}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingDots;
