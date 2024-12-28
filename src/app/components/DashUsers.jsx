import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Table } from "flowbite-react";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function DashUsers() {
  const { user, isLoaded } = useUser()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/get', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userMongoId: user?.publicMetadata?.userMongoId }),
        });
        const data = await res.json()
        console.log(data)
        if (res.ok) {
          setUsers(data.users)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [user?.publicMetadata?.isAdmin])

  return (
    <div className="w-full overflow-x-scroll py-3">
      {
        users.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Registered</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
              </Table.Head>
              {
                users &&
                users.map(user => (
                  <Table.Body className="divide-y" key={user._id}>
                    <Table.Row className=" border-gray-600 dark:border-gray-800 dark:text-white">
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                          <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full" />
                      </Table.Cell>
                      <Table.Cell className="font-semibold">{user.username}</Table.Cell>
                      <Table.Cell className="text-gray-400">{user.email}</Table.Cell>
                      <Table.Cell>
                        {
                          user.isAdmin ?(
                            <FaCheck className="text-green-600 font-semibold text-lg"/>
                          ):(
                            <AiOutlineClose className="text-red-600 font-bold text-lg"/>
                          )
                        }
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </>
        ) : (
          <div className="text-2xl font-bold text-pink-700 text-center mt-5">No Users found!!!</div>
        )
      }
    </div>
  )
}
