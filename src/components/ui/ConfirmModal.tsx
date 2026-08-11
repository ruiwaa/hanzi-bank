import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    cancelBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const activeEl = document.activeElement;
        const firstEl = cancelBtnRef.current;
        const lastEl = confirmBtnRef.current;

        if (event.shiftKey) {
          if (activeEl === lastEl) {
            event.preventDefault();
            firstEl?.focus();
          }
          if (activeEl === firstEl) {
            event.preventDefault();
            lastEl?.focus();
          }
        } else {
          if (activeEl === firstEl) {
            event.preventDefault();
            lastEl?.focus();
          }

          if (activeEl === lastEl) {
            event.preventDefault();
            firstEl?.focus();
          }
        }
      }

      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-[90%] max-w-md rounded-xl bg-white p-6"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="mt-3 text-gray-500">{description}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            ref={cancelBtnRef}
            onClick={onCancel}
            className="rounded-lg border px-4 py-2 focus:outline"
          >
            취소
          </button>

          <button
            type="button"
            ref={confirmBtnRef}
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-white focus:outline"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
