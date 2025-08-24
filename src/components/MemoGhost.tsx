interface CustomIconProps {
  className?: string;
  bodyColor?: string;
  eyeColor?: string;
  size?: number;
}

export function MemoGhost({
  className = "",
  bodyColor = "fill-gray-200",
  eyeColor = "fill-white",
  size = 92,
}: CustomIconProps) {
  const height = Math.round((size * 114) / 92);

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 92 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58 1C58 7.62742 52.6274 13 46 13C39.3726 13 34 7.62742 34 1C34 0.663247 34.0139 0.329733 34.0411 0H31C19.9543 0 11 8.9543 11 20V31.0411C4.84047 31.5492 0 36.7093 0 43C0 49.2907 4.84047 54.4508 11 54.9589V114H46.5C66.1061 114 82 98.1061 82 78.5V54.8341C87.6754 53.8819 92 48.946 92 43C92 37.054 87.6754 32.1181 82 31.1659V20C82 8.95431 73.0457 0 62 0H57.9589C57.9861 0.329733 58 0.663247 58 1Z"
        className={bodyColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58 1C58 7.62742 52.6274 13 46 13C39.3726 13 34 7.62742 34 1C34 0.663247 34.0139 0.329733 34.0411 0H31C19.9543 0 11 8.9543 11 20V31.0411C4.84047 31.5492 0 36.7093 0 43C0 49.2907 4.84047 54.4508 11 54.9589V114H46.5C66.1061 114 82 98.1061 82 78.5V54.8341C87.6754 53.8819 92 48.946 92 43C92 37.054 87.6754 32.1181 82 31.1659V20C82 8.95431 73.0457 0 62 0H57.9589C57.9861 0.329733 58 0.663247 58 1Z"
        className={bodyColor}
      />
      <path
        d="M34.5 53C37.5376 53 40 50.5376 40 47.5C40 44.4624 37.5376 42 34.5 42C31.4624 42 29 44.4624 29 47.5C29 50.5376 31.4624 53 34.5 53Z"
        className={eyeColor}
      />
      <path
        d="M66.5 53C69.5376 53 72 50.5376 72 47.5C72 44.4624 69.5376 42 66.5 42C63.4624 42 61 44.4624 61 47.5C61 50.5376 63.4624 53 66.5 53Z"
        className={eyeColor}
      />
    </svg>
  );
}
