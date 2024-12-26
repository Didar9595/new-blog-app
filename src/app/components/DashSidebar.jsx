'use client'
import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { MdSpaceDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import { BsFilePostFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";

function DashSidebar() {
    const [tab, setTab] = useState('')
    const searchParams = useSearchParams()
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [searchParams])
    if (!isSignedIn) {
        return null;
    }
    return (
        <Sidebar className="w-full">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-3">
                    {
                        user?.publicMetadata?.isAdmin &&
                        <Link href='/dashboard?tab=dash'>
                        <Sidebar.Item active={tab === 'dash'} icon={MdSpaceDashboard} as='div'>
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                    }
                    <Link href='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile' || !tab} icon={ImProfile} as='div' label={user?.publicMetadata?.isAdmin?'Admin':'User'} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link href='/dashboard?tab=posts'>
                        <Sidebar.Item active={tab === 'posts'} icon={BsFilePostFill} as='div'>
                            Posts
                        </Sidebar.Item>
                    </Link>
                    {
                        user?.publicMetadata?.isAdmin &&
                        <Link href='/dashboard?tab=users'>
                        <Sidebar.Item active={tab === 'users'} icon={FaUsers} as='div'>
                            Users
                        </Sidebar.Item>
                    </Link>
                    }
                    <Sidebar.Item className='cursor-pointer' icon={PiSignOutBold}>
                            <SignOutButton/>
                        </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar
