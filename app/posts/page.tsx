import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border border-gray-400 rounded-md px-2 justify-between flex"
          >
            <Link
              href={`/posts/${post.id}`}
              className="font-semibold text-black"
            >
              {post.title}
            </Link>
            <span className="text-sm text-gray-600 ml-2">
              by {post.author.name}
            </span>
          </li>
        ))}
      </ul>
      <div className=" w-full justify-end flex ">
        <Link href={'/posts/new'}>
          <div className="border border-gray-500 rounded-md text-black mt-10 w-40 justify-center items-center align-center  flex">
            create new post
          </div>
        </Link>
      </div>
    </div>
  );
}
