interface Props {
  page: number;
  totalPages: number;

  onPrevious(): void;

  onNext(): void;
}

export default function TablePagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">

      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <div>

        Page {page} of {totalPages}

      </div>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}