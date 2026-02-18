"use client";

import Editor from "@monaco-editor/react";

import type { EditorLanguage } from "@/lib/types";

type CodeEditorProps = {
  language: EditorLanguage;
  value: string;
  theme: "vs" | "vs-dark";
  onChange: (value: string) => void;
};

export default function CodeEditor({ language, value, theme, onChange }: CodeEditorProps) {
  return (
    <Editor
      width="100%"
      height="100%"
      language={language}
      value={value}
      theme={theme}
      loading={<div className="h-full w-full bg-code-bg" />}
      onChange={(nextValue) => onChange(nextValue ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "var(--font-mono)",
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 16, bottom: 16 },
      }}
    />
  );
}
