import { ReactNode } from "react";


type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SettingsCard({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-[#fffdfa] p-7 shadow-sm">
      <div className="border-b border-stone-200 pb-5">
        <h2 className="font-serif text-2xl text-stone-800">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {description}
          </p>
        )}
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}
