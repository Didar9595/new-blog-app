import Link from "next/link";
import PostCard from "./components/PostCard";
import { Button } from "flowbite-react";

export default async function page() {
  let posts = null;
  try {
    const res = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ limit: 12, order: 'desc' }),
      cache: 'no-store'
    })
    const data = await res.json();
    posts = data.posts
  } catch (error) {
    console.log("Error getting the Posts", error)
  }
  return (
    <div className="flex flex-col relative">
      <img src="Main.webp" alt="Hero Image" className="w-[full] h-[500px] md:h-[800px]"/>
      <div className="absolute top-10 md:top-32 lg:top-24 left-10 lg:left-48  flex flex-col gap-4">
        <h1 className="font-bold text-[2.5rem] md:text-[3rem] lg:text-[4rem] text-[#fd200b]">Welocome to DA&apos;s BlogSpot</h1>
        <p className="text-gray-800 text-md md:text-2xl  lg:text-3xl font-medium w-[80%]">We&apos;re thrilled to have you here in our little corner of the internet. Whether you&apos;re a seasoned reader or just starting your blogging journey, there&apos;s something for everyone to explore.</p>
        <Link href='/'><Button gradientDuoTone="pinkToOrange" className="lg:w-[15%]">Explore</Button></Link>
      </div>
      <div className='my-14 flex flex-col items-center gap-4 dark:text-white'>
        <h1 className='font-bold text-xl bg-gradient-to-r from-pink-400 to-orange-400 text-white p-2 rounded-md'>Recent Posts</h1>
        <div className='flex gap-4 justify-center flex-wrap sm:p-2'>
          {posts && posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  )
}
