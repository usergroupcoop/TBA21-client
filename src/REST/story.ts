import type { WP_REST_API_Post } from "wp-types";

export const getStory = async (slug: string): Promise<WP_REST_API_Post> => {
  const response = await fetch(
    `https://stories.ocean-archive.org/wp-json/wp/v2/posts?slug=${slug}`
  );
  const [story] = await response.json();
  return story;
};
