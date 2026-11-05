import { BlogPost } from "@/components/content/blog-post";
import Body from "@/content/pages/blog/dbf-to-sql-server-data-types.mdx";
import { getPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/content";

const post = getPost("dbf-to-sql-server-data-types");
export const metadata = pageMetadata(post.meta, "/blog/dbf-to-sql-server-data-types");

export default function DbfToSqlServerPost() {
  return <BlogPost post={post} Body={Body} />;
}
