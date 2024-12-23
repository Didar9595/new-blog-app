import React from 'react'
import PostCard from './PostCard';

const RecentPosts = async({limit}) => {
    let posts=null;
    try {
        const res=await fetch(process.env.URL+'/api/post/get',{
            method:'POST',
            body:JSON.stringify({limit:limit,order:'desc'}),
            cache:'no-store'
        })
        const data=await res.json();
        posts=data.posts
    } catch (error) {
        console.log("Error getting the Posts",error)
    }
  return (
    <div className='my-14 flex flex-col items-center gap-4 dark:text-white'>
      <h1 className='font-bold text-xl bg-gradient-to-r from-pink-400 to-orange-400 text-white p-2 rounded-md'>Recent Posts</h1>
      <div className='flex gap-4 justify-center flex-wrap'>
        {posts && posts.map(post=><PostCard key={post._id} post={post}/>)}
      </div>
    </div>
  )
}

export default RecentPosts
