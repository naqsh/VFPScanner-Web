import { BlogPost } from "@/components/content/blog-post";
import Body from "@/content/pages/blog/foxpro-project-size-pjx.mdx";
import { getPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/content";

const post = getPost("foxpro-project-size-pjx");
export const metadata = pageMetadata(post.meta, "/blog/foxpro-project-size-pjx");

export default function ProjectSizePjxPost() {
  return <BlogPost post={post} Body={Body} />;
}
