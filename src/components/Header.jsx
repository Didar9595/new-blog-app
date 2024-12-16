'use client'
import { Button, Navbar, TextInput } from "flowbite-react"
import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon,FaSun} from 'react-icons/fa'
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Header = () => {
  const path =usePathname();
  const{theme,setTheme}=useTheme();
  return (
    <Navbar className="bg-slate-100 px-4">
        <Link href='/' className="flex flex-row items-center gap-2 font-bold text-lg sm:text-xl dark:text-white">
          <img src="Logo.png" alt="Logo Image" className="w-[35%] rounded-md"/>
        </Link>
        <form>
            <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="hidden lg:inline"/>
        </form>
        <Button className="w-10 lg:hidden" color="gray" pill><AiOutlineSearch/></Button>
        <Navbar.Collapse>
          <Link href='/'>
           <Navbar.Link active={path==='/'} as={'div'}>Home</Navbar.Link>
          </Link>
          <Link href='/about'>
           <Navbar.Link active={path==='/about'} as={'div'}>About</Navbar.Link>
          </Link>
          <Link href='/projects'>
           <Navbar.Link active={path==='/projects'} as={'div'}>Projects</Navbar.Link>
          </Link>
        </Navbar.Collapse>
        <div className="flex gap-4">
            <Button className="w-14" color="gray" pill onClick={()=>setTheme(theme==='light'?'dark':'light')}>
                {theme==='light'?<FaMoon/>:<FaSun/>}
            </Button>
            <Link href='/sign-in'>
              <Button gradientDuoTone="pinkToOrange" outline>Sign In</Button>
            </Link>
            <Navbar.Toggle className="bg-gray-100"/>
        </div>
    </Navbar>
  )
}

export default Header
