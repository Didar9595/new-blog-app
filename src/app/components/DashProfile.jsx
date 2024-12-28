import { UserProfile } from "@clerk/nextjs"
import {dark,light} from '@clerk/themes'
import { useTheme } from "next-themes"

function DashProfile() {
  const theme =useTheme()
  return (
    <div className="flex items-center justify-center w-full p-5">
      <UserProfile
       appearance={{
        baseTheme:theme==='dark'? dark:light,
       }}
      
      />
    </div>
  )
}

export default DashProfile
