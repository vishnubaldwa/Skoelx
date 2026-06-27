interface Props {
  value: string;

  onChange(value: string): void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Search..."
      className="w-80 rounded-lg border px-4 py-3"
    />
  );
}