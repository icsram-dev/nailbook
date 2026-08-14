import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function AdminPageHeader({
  title,
  description,
  actions,
}: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="eyebrow">Adminisztráció</p>
        <h1 className="mt-2 font-serif text-4xl text-stone-800">{title}</h1>

        {description && (
          <p className="mt-2 text-stone-600">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
