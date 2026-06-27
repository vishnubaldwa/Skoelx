import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

export default function Card({
  title,
  children,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {title && (
        <h2 className="mb-4 text-xl font-semibold">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}