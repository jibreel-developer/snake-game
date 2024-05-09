interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function SnakeHead({ children, className }: Props) {
  return (
    <div
      className={`text-xs bg-black text-white size-4 rounded-full flex items-center justify-center ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}

export function SnakeTail({ children, className }: Props) {
  return (
    <div
      className={`text-xs bg-black text-white size-3 flex items-center justify-center ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
