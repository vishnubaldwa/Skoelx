import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Section({
  children,
}: Props) {
  return (
    <section className="mb-8">
      {children}
    </section>
  );
}