import RecentPosts from '@/app/components/RecentPosts';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import React from 'react'

export default async function page({params}) {
    let post=null;
    try {
        const result=await fetch(process.env.URL+"/api/post/get",{
            method:"POST",
            body:JSON.stringify({slug:params.slug}),
            cache:'no-store',
        });
        const data=await result.json();
        post=data.posts[0];
    } catch (error) {
        post={title:"Failed to Load the Post"}
    }

    if(!post || !post.title==='Failed to Load the Post'){
        return(
            <h2 className='text-2xl font-bold text-center p-10'>Page Not Found</h2>
        )
    }
  return (
    <div className='flex flex-col items-center p-4 lg:p-20 gap-8 dark:text-white'>
      <h1 className='font-extrabold text-lg lg:text-2xl text-center'>{post && post.title}</h1>
      <Link href={`/search?category=${post && post.category}`} ><Button className='w-[100%] lg:w-[120%] capitalize' outline gradientDuoTone='pinkToOrange'>{post && post.category}</Button></Link>
      <img src={post && post.image} alt={post && post.title} width={400}/>
      <div className='w-[100%] lg:w-[70%] flex flex-row justify-between'>
        <span className='text-pink-400'>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='text-orange-400'>{post && (post?.content?.length/1000).toFixed(0)} mins read</span>
      </div>
      <div dangerouslySetInnerHTML={{__html:post?.content}} className='w-[100%] lg:w-[70%]'></div>
      <div className='w-[100%] lg:w-[70%] flex flex-col items-start gap-2 md:flex-row md:justify-between'>
        <p className='underline text-blue-600'>{post.email}</p>
      <p className='font-bold text-lg'>Posted By: <span className='text-gray-400 italic capitalize'>~~{post.name}</span></p>
      </div>
      <RecentPosts limit={5}/>
    </div>
  )
}

