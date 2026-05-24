"use client";

import { Upload, FileText } from "lucide-react";

type Props = {
  loading: boolean;
  onUpload: () => void;
  onFileChange: (file: File | null) => void;
  selectedFile: File | null;
};

export default function ResumeUpload({
  loading,
  onUpload,
  onFileChange,
  selectedFile,
}: Props) {

  return (

    <div className="space-y-4">

      {/* Upload Box */}
      <label
        className="
          border-2
          border-dashed
          border-zinc-700
          hover:border-orange-500
          transition-all
          rounded-2xl
          p-8
          flex
          flex-col
          items-center
          justify-center
          text-center
          cursor-pointer
          bg-zinc-800/50
        "
      >

        <Upload className="w-10 h-10 mb-3 text-orange-400" />

        <p className="text-lg font-medium">
          Upload Resume
        </p>

        <p className="text-zinc-400 text-sm mt-1">
          PDF format only
        </p>

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            onFileChange(
              e.target.files?.[0] || null
            );
          }}
        />

      </label>

      {/* Selected File */}
      {selectedFile && (

        <div className="
          flex
          items-center
          gap-3
          bg-zinc-800
          p-3
          rounded-xl
        ">

          <FileText className="text-orange-400" />

          <p className="text-sm text-zinc-300 truncate">
            {selectedFile.name}
          </p>

        </div>

      )}

      {/* Analyze Button */}
      <button
        onClick={onUpload}
        disabled={loading}
        className="
          w-full
          bg-orange-500
          hover:bg-orange-600
          transition-all
          py-3
          rounded-xl
          font-semibold
        "
      >
        {loading
          ? "Analyzing Resume..."
          : "Analyze Resume"}
      </button>

    </div>
  );
}