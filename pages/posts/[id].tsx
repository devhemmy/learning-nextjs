import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);

  return (
    <div>
      <h2> ID : {post.id} </h2>
      <h2>Post Title : {post.title} </h2>
      <br />
      <h2>{post.body} </h2>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  const paths = posts.map((post: { id: any }) => ({
    params: { id: `${post.id}` },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  console.log(process.env.HOST);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  const post = await res.json();

  // Pass post data to the page via props
  return {
    props: { post },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};
