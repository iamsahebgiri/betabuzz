import React, { useRef, useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
}

const shortcuts = [
  {
    title: "Bold",
    ctrlKey: true,
    key: "b",
    leftTag: "*",
    rightTag: "*",
  },
];

export function Write({ textValue, setTextValue }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key.toLowerCase() === "b") {
      const start = textareaRef.current?.selectionStart;
      const end = textareaRef.current?.selectionEnd;

      if (typeof start !== "undefined" && typeof end !== "undefined") {
        const value = textareaRef.current?.value;
        const text = textareaRef.current?.value.substring(start, end);
        const left = value?.substring(0, start);
        const right = value?.substring(end, value.length);

        if (left?.endsWith("**") && right?.startsWith("**")) {
          setTextValue(`${left.slice(0, -2)}${text}${right.substring(2)}`);
        } else {
          setTextValue(`${left}**${text}**${right}`);
        }
      }
    }
  };

  return (
    <div className="w-full relative">
      <Textarea
        ref={textareaRef}
        autoComplete="off"
        autoCorrect="off"
        className="resize-none h-auto"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        rows={5}
        onKeyDown={handleKeyDown}
      />
      <p className="text-sm text-muted-foreground prose-none mt-1">
        Supports markdown.
      </p>
    </div>
  );
}
