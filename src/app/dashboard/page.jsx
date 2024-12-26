'use client'
import {useState,useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import DashSidebar from '../components/DashSidebar'
import DashPosts from '../components/DashPosts'
import DashProfile from '../components/DashProfile'
import DashUsers from '../components/DashUsers'
import DashboardComp from '../components/DashboardComp'

export default function Dashboard() {
  const searchParams=useSearchParams()
  const [tab,setTab]=useState('')

  useEffect(()=>{
    const urlParams=new URLSearchParams(searchParams);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[searchParams])
  return (
    <div className='min-h-screen flex flex-col md:flex-row gap-1'>
      <div className='md:w-[20%]'>
        <DashSidebar/>
      </div>
      {/* Tabs */}
      {tab==='profile' && <DashProfile/>}
      {tab==='posts' && <DashPosts/>}
      {tab==='users' && <DashUsers/>}
      {tab==='dash' && <DashboardComp/>}
    </div>
  )
}
