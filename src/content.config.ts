import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

export const POSTS_PATH = "src/content/posts/";
export const PAGES_PATH = "src/content/pages/";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const nullableString = z.string().or(z.null()).transform((val) => (val === null || val === "" ? undefined : val));

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: `./${POSTS_PATH}` }),
  schema: z.object({
    title: z.string(),
    description: z.string().or(z.null()).transform((val) => val ?? "").optional().default(""),
    published: z.coerce.date(),
    updated: z.preprocess((val) => (val === null || val === "" ? undefined : val), z.coerce.date().optional()),
    category: z.string().or(z.null()).transform((val) => (val && val.trim() ? val : "Travels")).optional().default("Travels"),
    tags: z.preprocess(
      (val) => (val === null || val === "" ? [] : val),
      z.array(z.string()).transform(removeDupsAndLowerCase).optional().default([])
    ),
    cover: nullableString.optional(),
    draft: z.boolean().default(false),
    lang: nullableString.optional(),
    annotation: nullableString.optional(),
  })
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: `./${PAGES_PATH}` }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date(),
    draft: z.boolean().default(false),
    lang: z.string().optional(),
    annotation: z.string().optional(),
  })
});

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
};