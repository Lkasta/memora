interface CustomIconProps {
  className?: string;
  fillColor?: string;
  size?: number;
}

export function MemoGhost({
  className = "",
  fillColor = "fill-gray-200",
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
        d="M34.041 0C34.0138 0.329731 34 0.663249 34 1C34 7.62742 39.3726 13 46 13C52.6274 13 58 7.62742 58 1C58 0.663249 57.9862 0.329731 57.959 0H62C73.0457 0 82 8.95431 82 20V31.166C87.6754 32.1182 92 37.054 92 43C92 48.946 87.6754 53.8818 82 54.834V78.5C82 98.1061 66.1061 114 46.5 114H11V54.959C4.84047 54.4509 0 49.2907 0 43C0 36.7093 4.84047 31.5491 11 31.041V20C11 8.9543 19.9543 0 31 0H34.041ZM34.5 42C31.4624 42 29 44.4624 29 47.5C29 50.5376 31.4624 53 34.5 53C37.5376 53 40 50.5376 40 47.5C40 44.4624 37.5376 42 34.5 42ZM66.5 42C63.4624 42 61 44.4624 61 47.5C61 50.5376 63.4624 53 66.5 53C69.5376 53 72 50.5376 72 47.5C72 44.4624 69.5376 42 66.5 42Z"
        className={fillColor}
      />
    </svg>
  );
}
