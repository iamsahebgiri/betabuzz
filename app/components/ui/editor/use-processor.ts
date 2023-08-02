import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { createElement, useEffect, useState } from "react";

export function useProcessor(md: string) {
  const [content, setContent] = useState<React.ReactNode>(null);
  console.log(md);
  const mentionRegex = /@(\w+)/g;
  const text = md.replace(mentionRegex, '<mention handle="$1">@$1</mention>');

  console.log(text);

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeReact, {
        createElement,
      })
      .process(text)
      .then((file) => {
        setContent(file.result);
      });
  }, [text]);

  return content;
}
