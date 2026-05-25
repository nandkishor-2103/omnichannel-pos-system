import { FileText } from "lucide-react";
import { useState } from "react";

export default function NoteSection() {
  const [note, setNote] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(e.target.value);
  };

  return (
    <div className="border-b p-4">
      <h2 className="mb-3 flex items-center text-lg font-semibold">
        <FileText className="mr-2 h-5 w-5" />
        Note
      </h2>

      <div className="space-y-3">
        <textarea
          className="
            min-h-40
            w-full
            resize-none
            rounded-md
            border
            bg-background
            p-3
            text-sm
            outline-none
            focus:ring-2
            focus:ring-green-500"
          placeholder="Add order note if any"
          value={note}
          onChange={handleNoteChange}
        />
      </div>
    </div>
  );
}
