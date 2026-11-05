import { BlogPost } from "@/components/content/blog-post";
import Body from "@/content/pages/blog/macro-substitution-foxpro-migration.mdx";
import { getPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/content";

const post = getPost("macro-substitution-foxpro-migration");
export const metadata = pageMetadata(post.meta, "/blog/macro-substitution-foxpro-migration");

export default function MacroSubstitutionPost() {
  return <BlogPost post={post} Body={Body} />;
}
