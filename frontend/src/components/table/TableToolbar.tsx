import SearchBar from "./SearchBar";

interface Props {
  search: string;

  onSearch(value: string): void;

  children?: React.ReactNode;
}

export default function TableToolbar({
  search,
  onSearch,
  children,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">

      <SearchBar
        value={search}
        onChange={onSearch}
      />

      <div className="flex gap-3">

        {children}

      </div>

    </div>
  );
}