import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link href='/dashboard/create-post'><Button>Create a Post</Button></Link>
    </div>
  )
}

export default page
