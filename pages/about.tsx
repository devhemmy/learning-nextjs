import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useSWR from 'swr';
import fs from 'fs';
import path from 'path';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function About({
  todo,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/comments/1',
    fetcher
  );

  return (
    <div>
      <h2>this is a pre-rendered data</h2>
      <h2>Title : {todo.title}</h2>
      <h2>id : {todo.id}</h2>
      <br />
      <h2>here is some client-rendering data</h2>
      {error && <div>failed to load</div>}
      {!data ? <div>loading...</div> : <div>hello {data.email}!</div>}
    </div>
  );
}

export default About;

export const getStaticProps: GetStaticProps = async (context) => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    return {
      filename,
      content: fileContents,
    };
  });
  // fetching from external api is fine but don't call api route here
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const todo = await data.json();

  if (!data) {
    // gives a 404 page if no data to be found
    // return {
    //   notFound: true,
    // };
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { todo, posts },
    revalidate: 1,
  };
};
