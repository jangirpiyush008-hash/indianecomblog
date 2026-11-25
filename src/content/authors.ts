import type { Author } from "@/types/content";

export const piyush: Author = {
  slug: "piyush-jangir",
  name: "Piyush Jangir",
  role: "Founder & Editor",
  bio: "Piyush Jangir founded this publication and writes or edits every story on it. He covers technology, shopping, personal finance and the internet in India, with a focus on explaining things clearly and linking to the original source for every claim.",
};

export const authors: Record<string, Author> = {
  piyush,
};

export const allAuthors: Author[] = Object.values(authors);
