import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='w-[100%] flex justify-center items-center p-4'><SignIn/></div>
  )
}