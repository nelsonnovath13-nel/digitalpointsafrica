import { useRef, useState } from "react";

interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  label?: string;
}

export default function FileDropzone({ files, onChange, label = "Attach files (optional)" }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    onChange([...files, ...Array.from(list)]);
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-950/50">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-lg border border-dashed px-4 py-6 text-center text-xs transition ${
          dragOver ? "border-point-400 bg-point-50 text-point-700" : "border-ink-950/15 text-ink-950/40 hover:border-ink-950/30"
        }`}
      >
        Click or drag files here (images, PDF, Word)
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept="image/png,image/jpeg,image/webp,application/pdf,.doc,.docx"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between text-xs text-ink-950/60">
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
                className="ml-2 text-ink-950/40 hover:text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
