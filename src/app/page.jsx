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
      <img src="Main.webp" alt="Hero Image" className="w-[full] h-[700px] md:h-[800px]"/>
      <div className="absolute top-10 lg:top-24 left-10 lg:left-48 text- flex flex-col gap-4">
        <h1 className="font-bold sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[#fd200b]">Welocome to DA&apos; BlogSpot</h1>
        <p className="text-black text-sm sm:text-base md:text-lg lg:text-xl font-medium w-[80%]">We&apos;re thrilled to have you here in our little corner of the internet. Whether you&apos;re a seasoned reader or just starting your blogging journey, there&apos;s something for everyone to explore.</p>
        <div className="w-[80%] lg:w-[60%]">
          <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-[#fd200b]">📖 What We Offer:</h3>
          <p className="text-black text-sm sm:text-base lg:text-lg">Dive into our collection of thought-provoking articles, inspiring stories, and practical tips curated by a passionate community of writers. We’re here to spark your curiosity, fuel your creativity, and keep you informed.</p>
        </div>
        <div className="w-[80%] lg:w-[60%]">
          <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-[#fd200b]">🤝 Join Us</h3>
          <p className="text-black text-sm sm:text-base lg:text-lg">Your voice matters! Feel free to comment, share, and connect with like-minded individuals who share your interests. Together, we build a space where ideas flourish and connections grow.</p>
        </div>
        <div className="w-[80%] lg:w-[60%]">
          <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-[#fd200b]">🌈 Stay Updated</h3>
          <p className="text-black text-sm sm:text-base lg:text-lg">Don’t miss out on our latest posts! Subscribe to our newsletter and follow us on social media for updates and exclusive content.</p>
        </div>
        <Link href='/'><Button gradientDuoTone="pinkToOrange">Explore</Button></Link>
      </div>
      <div className='my-14 flex flex-col items-center gap-4 dark:text-white'>
        <h1 className='font-bold text-xl bg-gradient-to-r from-pink-400 to-orange-400 text-white p-2 rounded-md'>Recent Posts</h1>
        <div className='flex gap-4 justify-center flex-wrap'>
          {posts && posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  )
}
