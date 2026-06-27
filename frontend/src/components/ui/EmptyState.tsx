interface Props {
  title: string;
}

export default function EmptyState({
  title,
}: Props) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        No records found.
      </p>
    </div>
  );
}