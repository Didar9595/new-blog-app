'use client'
import { useTheme } from "next-themes"
import { useState,useEffect, } from "react"

const ThemeComp = ({children}) => {
    const{theme,setTheme} = useTheme();
    const [mounted,setMounted]=useState(false);
    useEffect(()=>setMounted(true,[]));
    if(!mounted) return null;
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:gray-200 dark:bg-black min-h-screen">{children}</div>
    </div>
  )
}

export default ThemeComp
