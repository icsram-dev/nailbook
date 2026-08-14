"use client";

import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4">
     <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffdfa] shadow-[0_30px_80px_-35px_rgba(74,49,38,.65)]">
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-4 sm:px-8 sm:py-6">
          <h2 className="text-2xl tracking-tight text-stone-800 sm:text-4xl">
  {title}
</h2>

          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-xl text-stone-500 transition hover:bg-[#f3e8e1] hover:text-[#8f6252]"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
