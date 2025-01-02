'use client'
import { Button, Navbar, TextInput } from "flowbite-react"
import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from 'react-icons/fa'
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect,useState } from "react";
import { SignedIn,SignedOut,SignInButton,UserButton } from "@clerk/nextjs";
import {dark,light} from '@clerk/themes'
import { useRouter,useSearchParams } from "next/navigation";

const Header = () => {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const router=useRouter();
  const [searchTerm,setSearchTerm]=useState('');
  const searchParams=useSearchParams()

  const handleSubmit=(e)=>{
    e.preventDefault()
    const urlParams=new URLSearchParams(searchParams)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery=urlParams.toString()
    router.push(`/search?${searchQuery}`)
  }


  useEffect(()=>{
    const urlParams=new URLSearchParams(searchParams)
    const searchTermFromUrl=urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[searchParams]);

 const handleSearch=()=>{
  router.push('/search')
 }


  return (
    <Navbar className="bg-slate-100 h-[fit-content]">
      <Link href='/' className="font-bold text-lg sm:text-xl dark:text-white w-[25%] lg:w-[15%]">
        <img src="./Logo.png" alt="Logo Image" className="rounded-lg"/>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="hidden lg:inline" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      </form>
      <Button className="w-10 lg:hidden" color="gray" pill onClick={handleSearch}><AiOutlineSearch /></Button>
      <div className="flex gap-2 md:order-1">
        <Button className="w-14 flex items-center justify-center" color="gray" pill onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        <div className="flex justify-center">
        <SignedIn>
          <UserButton 
          appearance={
            {
              baseTheme:theme==='light'?light:dark
            }
          }
          userProfileUrl="/dashboard?tab=profile"
          />
        </SignedIn>
        <SignedOut>
        <Link href='/sign-in'>
          <Button gradientDuoTone="pinkToOrange" outline >Sign In</Button>
         </Link>
        </SignedOut>
        </div>
        
        <Navbar.Toggle className="bg-gray-100" />
      </div>
      <Navbar.Collapse>
        <Link href='/'>
          <Navbar.Link active={path === '/'} as={'div'}>Home</Navbar.Link>
        </Link>
        <Link href='/about'>
          <Navbar.Link active={path === '/about'} as={'div'}>About</Navbar.Link>
        </Link>
        <Link href='/projects'>
          <Navbar.Link active={path === '/projects'} as={'div'}>Projects</Navbar.Link>
        </Link>
        <Link href='/dashboard'>
          <Navbar.Link active={path === '/dashboard'} as={'div'}>Dashboard</Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
