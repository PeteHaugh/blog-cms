import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Cooking Blog!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center border-y border-black bg-[url('https://i.ibb.co/FgTzPHh/Roast.webp')] bg-no-repeat bg-cover overflow-hidden  ">
        <div className="flex flex-row justify-around  bg-white bg-opacity-30 py-20 w-full">
            <div className="flex flex-col px-10 justify-center space-y-5 bg-opacity-100">
              <h1 className="text-6xl max-w-xl font-serif ">
                <span className="underline decoration-black decoration-4">
                  The Greedy Ginger
                </span>{" "}
              </h1>
              <h2>Ideas and recipes from one cook to another</h2>
            </div>
            <img
              className="hidden md:inline-flex  rounded-full object-cover h-72 w-72"
              src="https://i.ibb.co/RB1qWmp/Hero.jpg"
              alt=""
            />
          
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug?.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out over"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
