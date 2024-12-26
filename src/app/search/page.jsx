'use client'
import { useState,useEffect } from "react"
import { useRouter,useSearchParams } from "next/navigation"
import PostCard from "../components/PostCard"
import { Button, Select, TextInput } from "flowbite-react"


export default function Page() {
    const [postData, setPostData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized",
    });
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(false)
    const [showMore,setShowMore]=useState(false)
    const searchParams=useSearchParams()
    const router=useRouter()

    useEffect(()=>{
        const urlParams=new URLSearchParams(searchParams)
        const searchTermFromUrl=urlParams.get('searchTerm') ||""
        const sortFromUrl=urlParams.get('sort') || "desc"
        const categoryFromUrl=urlParams.get('category') || "uncategorized"
        if(searchTermFromUrl|| sortFromUrl|| categoryFromUrl){
            setPostData({
                ...postData,
                searchTerm:searchTermFromUrl,
                sort:sortFromUrl,
                category:categoryFromUrl,
            })
        }
        const fetchPosts=async()=>{
            setLoading(true);
            const searchQuery=urlParams.toString()
            const res=await fetch('/api/post/get',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    limit:12,
                    order:sortFromUrl||'desc',
                    category:categoryFromUrl||'uncategorized',
                    searchTerm:searchTermFromUrl
                }),
            });
            if(!res.ok){
                setLoading(false);
                return;
            }
            if(res.ok){
                const data=await res.json()
                setPosts(data.posts)
                console.log(posts)
                setLoading(false);
                if(data.posts.length===12){
                    setShowMore(true)
                }
                else{
                    setShowMore(false)
                }
            }
        };
        fetchPosts();
    },[searchParams]);

    const handleChange=(e)=>{
        if(e.target.id==='searchTerm'){
            setPostData({...postData,searchTerm:e.target.value})
        }
        if(e.target.id==='sort'){
            const order=e.target.value||'desc'
            setPostData({...postData,sort:order})
        }
        if(e.target.id==='category'){
            const category=e.target.value||'uncategorized'
            setPostData({...postData,category})
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!postData.searchTerm){
            postData.searchTerm=''
        }
        const urlParams=new URLSearchParams(searchParams)
        urlParams.set('searchTerm',postData.searchTerm)
        urlParams.set('sort',postData.sort)
        urlParams.set('category',postData.category)
        const searchQuery=urlParams.toString()
        router.push(`/search?${searchQuery}`)
    }
    const handleShowMore=async()=>{
        const noOfPosts=posts.length;
        const startIndex=noOfPosts;
        const urlParams=new URLSearchParams(searchParams)
        urlParams.set('startIndex',startIndex)
        const searchQuery=urlParams.toString()
        const res=await fetch('/api/post/get',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                limit:12,
                order:postData.sort,
                category:postData.category,
                searchTerm:postData.searchTerm,
                startIndex,
            }),
        });
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data=await res.json()
            setPosts([...posts,...data.posts])
            if(data.posts.length===12){
                setShowMore(true)
            }
            else{
                setShowMore(false)
            }
        }
    }

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
        <div className="p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-row gap-3 items-center">
                <label >Search Term:</label>
                <TextInput placeholder="Search..." id="searchTerm" type="text" value={postData.searchTerm} onChange={handleChange}/>
                </div>
                <div className="flex flex-row gap-3  items-center">
                    <label>Sort:</label>
                    <Select id="sort" onChange={handleChange}>
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                    </Select>
                </div>
                <div className="flex flex-row gap-3  items-center">
                    <label >Catgeory:</label>
                    <Select id="category" onChange={handleChange}>
                    <option value="technology">Technology</option>
                            <option value="travel">Travel</option>
                            <option value="vlog">Vlog</option>
                            <option value="sports">Sports</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="news">News</option>
                    </Select>
                </div>
                <Button gradientDuoTone="pinkToOrange" outline type="submit">Apply Filter</Button>
            </form>
        </div>
        <div className="p-3 md:border-2 md:border-dotted md:border-pink-400 w-full">
            <h1 className="font-bold text-xl md:text-2xl ">Result:</h1>
            <div className="flex flex-wrap gap-5 p-2">
                {
                    !loading && posts.length===0 &&(
                        <p className="text-lg text-gray-400">No Post Found</p>
                    )
                }
                {
                    loading && <p className="text-lg text-gray-700 dark:text-gray-300">Please Wait...</p>
                }
                {
                    !loading && posts && 
                    posts.map(post=><PostCard key={post._id} post={post}/>)
                }
                {
                    showMore && (
                        <Button gradientDuoTone="pinkToOrange" onClick={handleShowMore}>Show More</Button>
                    )
                }
            </div>
        </div>
    </div>
  )
}
