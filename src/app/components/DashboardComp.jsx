'use client'
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { FaUsers } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { GrLinkPrevious } from "react-icons/gr";
import { Button, Table } from "flowbite-react";

export default function DashboardComp() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [lastMonthUsers, setLastMonthUsers] = useState(0)
  const [lastMonthPosts, setLastMonthPosts] = useState(0)
  const { user } = useUser()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/get', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 5,
          }),
        });
        const data = await res.json()
        if (res.ok) {
          setUsers(data.users)
          setTotalUsers(data.totalUsers)
          setLastMonthUsers(data.lastMonthUsers)
        }
      } catch (error) {
        console.log(error)
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 5,
          }),
        });
        const data = await res.json()
        if (res.ok) {
          setPosts(data.posts)
          setTotalPosts(data.totalPosts)
          setLastMonthPosts(data.lastMonthPosts)
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchUsers();
    fetchPosts();
  }, [user])
  return (
    <div className="w-full p-5">
      <div className="flex flex-wrap gap-5 justify-center items-center">
        <div className="rounded-lg shadow-md p-3">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className=" flex flex-col gap-3">
              <h3 className="font-bold text-2xl">Total Users</h3>
              <p className="text-lg ">{totalUsers}</p>
            </div>
            <div className="p-5">
              <FaUsers className="text-6xl text-white bg-pink-600 p-3 rounded-full shadow-lg" />
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <span className="flex gap-1 items-center"><GrLinkPrevious className="text-blue-600" />{lastMonthUsers}</span>
            <p className="font-semibold text-gray-400">Last Month</p>
          </div>
        </div>
        <div className="rounded-lg shadow-md p-3">
          <div className="flex flex-row justify-between items-center gap-4">
            <div className=" flex flex-col gap-3">
              <h3 className="font-bold text-2xl">Total Posts</h3>
              <p className="text-lg ">{totalPosts}</p>
            </div>
            <div className="p-5">
              <MdLibraryBooks className="text-6xl text-white bg-orange-600 p-3 rounded-full shadow-lg" />
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <span className="flex gap-1 items-center"><GrLinkPrevious className="text-blue-600" />{lastMonthPosts}</span>
            <p className="font-semibold text-gray-400">Last Month</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 justify-center ">
        <div className="p-3 shadow-lg rounded-md flex flex-col gap-2 max-h-[80vh]  md:max-h-[60vh] overflow-scroll">
          <div className="flex items-center justify-between gap-9">
            <p className="font-bold">Recent Users</p>
            <Button gradientDuoTone="pinkToOrange" outline>See All</Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Profile Image</Table.HeadCell>
              <Table.HeadCell>userName</Table.HeadCell>
            </Table.Head>
            {
              users && 
              users.map(user=>(
                <Table.Body className="divide-y h-[10vh]" key={user._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell><img src={user.profilePicture} alt="profile Pic" className="w-10 rounded-full"/></Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
              </Table.Row>
            </Table.Body>
              ))
            }
          </Table>
        </div>
        <div className="p-3 shadow-lg rounded-md flex flex-col gap-2 max-h-[80vh]  md:max-h-[60vh] overflow-scroll">
          <div className="flex items-center justify-between gap-9">
            <p className="font-bold">Recent Posts</p>
            <Button gradientDuoTone="pinkToOrange" outline>See All</Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {
              posts && 
              posts.map(post=>(
                <Table.Body className="divide-y" key={post._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell><img src={post.image} alt="profile Pic" className="w-20 rounded-md"/></Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
              </Table.Row>
            </Table.Body>
              ))
            }
          </Table>
        </div>
      </div>
    </div>
  )
}
