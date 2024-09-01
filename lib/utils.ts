import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Message } from "ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Default UI Message
export const initialMessages: Message[] = [
  {
    role: "assistant",
    id: "0",
    content:
      "Hi! I am your PDF assistant. I am happy to help with your questions about your PDF document",
  },
];

export function scrollToEnd(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;

    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      }
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

interface Data{
  sources: string[];
}

export const getSources = (data: Data[], role: string, index: number) => {
  if (role === 'assistant' && index >= 2 && (index - 2) % 2 === 0) {
    const sourcesIndex = (index - 2) / 2;

    if (data[sourcesIndex] && data[sourcesIndex].sources) {
      return data[sourcesIndex].sources
    }
  }

  return [];
}