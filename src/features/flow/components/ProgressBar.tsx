interface Props {
  value: number;
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="h-1 w-full bg-gray-100">
      <div
        className="h-full bg-gray-900 transition-all duration-300 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
