import { Button, Card } from "flowbite-react"
import Link from "next/link"

export default function PostCard({post}) {
  return (
      <Card
      className="max-w-sm"
      renderImage={() => <img src={post.image} alt="post image" className="w-[full] h-[300px]"/>}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {post.title}
      </h5>
      <p className="border border-orange-400 p-1 w-[fit-content] rounded-md">
        {post.category}
      </p>
      <Link href={`/post/${post.slug}`}><Button gradientDuoTone="pinkToOrange" >Read Post</Button></Link>
    </Card>
  )
}
