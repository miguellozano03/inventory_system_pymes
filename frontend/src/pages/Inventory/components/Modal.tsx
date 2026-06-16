import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40
      "
      onClick={onClose}
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-xl
          w-full
          max-w-lg
          mx-4
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
            flex items-center justify-between
            px-5 py-4
            border-b
          "
        >
          <h2 className="font-semibold text-lg">{title}</h2>

          <button type="button" onClick={onClose} className="hover:opacity-70">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
