"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  messages: Message[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isThinking?: boolean; // shows assistant typing indicator at the end
};

const CodeBlock = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const lang = (className || "").replace("language-", "");
  const text = useMemo(() => String(children ?? ""), [children]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };
  return (
    <div className="relative group">
      <pre className={className}><code>{children}</code></pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-black/50 border border-white/20 opacity-0 group-hover:opacity-100 transition"
        aria-label="Copy code"
        title="Copy code"
      >
        Copy{lang ? ` (${lang})` : ""}
      </button>
    </div>
  );
};

const MessageList = ({ messages, isLoading, isError, errorMessage, isThinking }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  // no avatar rendering to keep chat clean

  // Error banner
  if (isError) {
    return (
      <div className="w-full p-4 text-sm bg-red-500/10 border border-red-500/30 rounded">
        <p className="font-medium text-red-300">Something went wrong</p>
        <p className="opacity-80 text-red-200">{errorMessage || "Please try again."}</p>
      </div>
    );
  }

  // Skeleton when loading initial messages
  if (isLoading && (!messages || messages.length === 0)) {
    return (
      <div className="flex flex-col gap-4 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse flex gap-2">
            <div className="h-10 w-10 rounded-full bg-white/10" />
            <div className="flex-1">
              <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
              <div className="h-4 bg-white/10 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!isLoading && (!messages || messages.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center opacity-80 py-12 text-center">
        <Loader2 className="w-6 h-6 mb-3 opacity-50" />
        <p className="text-sm">Ask anything about your document to get started.</p>
        <div className="flex gap-2 mt-3 text-xs">
          <span className="px-2 py-1 rounded bg-white/10">Summarize this PDF</span>
          <span className="px-2 py-1 rounded bg-white/10">What are the key points?</span>
          <span className="px-2 py-1 rounded bg-white/10">Explain page 3</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 px-2 relative overflow-auto"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn('flex', {
            'justify-end pl-10': m.role === 'user',
            'justify-start pr-10': m.role === 'assistant',
          })}
        >
          <div
            className={cn(
              'prose prose-invert max-w-none rounded-xl px-4 py-3 text-sm shadow ring-1',
              {
                'ring-white/10 bg-white/10': m.role === 'assistant',
                'ring-yellow-400/30 bg-yellow-400 text-black': m.role === 'user',
              }
            )}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code: (props: any) => {
                  const { inline, className, children, ...rest } = props || {};
                  if (inline) return <code className="px-1 py-0.5 rounded bg-black/30" {...rest}>{children}</code>;
                  return <CodeBlock className={className}>{children}</CodeBlock>;
                },
                a: (props: any) => {
                  const { children, href, ...rest } = props || {};
                  return <a className="underline" href={href} target="_blank" rel="noreferrer" {...rest}>{children}</a>;
                },
              }}
            >
              {m.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
      {isThinking && (
        <div className="flex justify-start pr-10">
          <div className="rounded-xl px-4 py-3 text-sm shadow ring-1 ring-white/10 bg-white/10 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking…</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
