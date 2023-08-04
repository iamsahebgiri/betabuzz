import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  html: string;
}

export default function Preview({ html, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current
        .querySelectorAll('pre code[class^="language-"]')
        .forEach((block) => {
          hljs.highlightBlock(block as HTMLElement);
        });
    }
  }, [html]);

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      className={cn(
        "prose w-full border border-transparent px-1 font-medium  dark:prose-invert prose-strong:font-bold prose-pre:rounded-xl prose-pre:bg-[#0d1117] prose-pre:text-[#c9d1d9]",
        className
      )}
    />
  );
}
