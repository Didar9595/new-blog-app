import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Button, Table,Modal } from "flowbite-react"
import { TiWarningOutline } from "react-icons/ti";

function DashPosts() {
  const { user } = useUser()
  const [userPosts, setUserPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.publicMetadata?.userMongoId,
            limit:20,
          }),
        });
        const data = await res.json();
        console.log("Data",data)
        if (res.ok) {
          setUserPosts(data.posts)
        }
        console.log("Posts",userPosts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [user?.publicMetadata?.userMongoId])

  const handleDelete = async() => {
    setShowModal(false);
    try {
      const res = await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postIdToDelete,
          userId: user?.publicMetadata?.userMongoId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const newPosts = userPosts.filter(post => post._id !== postIdToDelete);
        setUserPosts(newPosts);
        setPostIdToDelete("")

      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full overflow-x-scroll py-3">
      {
        userPosts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell><span>Edit</span></Table.HeadCell>
              </Table.Head>
              {
                userPosts && 
                userPosts.map(post => (
                  <Table.Body className="divide-y" key={post._id}>
                    <Table.Row className=" border-gray-600 dark:border-gray-800 dark:text-white">
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="w-32 h-20 object-cover rounded-md"/>
                        </Link>
                      </Table.Cell>
                      <Table.Cell className="font-semibold">{post.title}</Table.Cell>
                      <Table.Cell className="text-gray-400">{post.category}</Table.Cell>
                      <Table.Cell>
                        <span className="text-md text-red-700 cursor-pointer" onClick={()=>{
                          setShowModal(true)
                          setPostIdToDelete(post._id)
                        }}>Delete</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/dashboard/update-post/${post._id}`}>
                          <span className="text-blue-700">Edit</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </>
        ) :
          (
            <div className="text-2xl font-bold text-pink-700 text-center mt-5">You Don&apos;t have any Post!!!</div>
          )
      }
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
             <TiWarningOutline className='h-14 w-14 text-red-700 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>
                Yes, I&apos;m sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> 
    </div>
  )
}

export default DashPosts
