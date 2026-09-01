import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { components } from "@/components/shared/PortableTextComponents";
import { cn } from "@/lib/utils";

interface RichTextProps {
  content: PortableTextBlock[] | undefined;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null;

  return (
    <div className={cn("rich-text space-y-5 text-base leading-relaxed text-ink", className)}>
      <PortableText value={content} components={components} />
    </div>
  );
}