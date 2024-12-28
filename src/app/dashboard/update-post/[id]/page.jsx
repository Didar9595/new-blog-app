'use client'
import { app } from "@/firebase";
import { useUser } from "@clerk/nextjs"
import { TextInput, Select, FileInput, Button, Alert } from "flowbite-react";
import dynamic from "next/dynamic";
import { useState,useEffect } from "react";
import 'react-quill-new/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {  CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter,usePathname } from "next/navigation";


export default function Page() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError,setPublishError]=useState(null);
    const router=useRouter()
    const pathname=usePathname()
    const postId=pathname.split('/').pop();
    
    useEffect(()=>{
        const fetchPost=async()=>{
            try {
                const res=await fetch('/api/post/get',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        postId:postId,
                    }),
                });
                const data=await res.json();
                if(res.ok){
                    setFormData(data.posts[0])
                }
            } catch (error) {
                console.log(error)
            }

        };
        if(isSignedIn){
            fetchPost();
        }

    },[postId,isSignedIn])


    const handleUploadImage = async() => {
        try {
            if (!file) {
                setImageUploadError("Pls Select an Image to Upload");
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, `new-blog-app/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            console.log(uploadTask)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image Upload Failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData,image:downloadURL})
                    })
                }
            )
        } catch (error) {
            setImageUploadError("Image upload Failed");
            setImageUploadProgress(null);
            console.log(error)
        }
    }

    const handleSubmit=async()=>{
        try {
            const res= await fetch('/api/post/update',{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    ...formData,userMongoId:user.publicMetadata.userMongoId,postId:postId,
                }),
            });
        const data=await res.json();
        if(!res.ok){
            setPublishError(data.message)
            return
        }
        if(res.ok){
            setPublishError(null)
            router.push(`/post/${data.slug}`)
        }
        } catch (error) {
            setPublishError("Error Publishing the Post...")
        }
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (isSignedIn) {
        return (
            <div className="flex justify-center items-center">
                <div className="border my-5 w-[90%] lg:w-[50%] shadow-lg rounded-lg min-h-screen">
                    <h1 className="font-bold text-2xl text-white bg-gradient-to-r from-pink-500 to-orange-400 p-3 text-center rounded-lg">Update Post</h1>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-2 my-6">
                        <TextInput placeholder="Enter title of the post..." type="text" id="title" required className="w-[100%] lg:w-[70%] p-3" defaultValue={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})}/>
                        <Select id="category" required defaultValue={formData.category} onChange={e=>setFormData({...formData,category:e.target.value})}>
                            <option value="technology">Technology</option>
                            <option value="travel">Travel</option>
                            <option value="vlog">Vlog</option>
                            <option value="sports">Sports</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="news">News</option>
                        </Select>
                    </div>
                    <div className="p-3">
                        <div className="p-3 flex justify-between items-center gap-3 border-2 border-dotted border-pink-500">
                            <FileInput type='file' accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                            <Button gradientDuoTone="pinkToOrange" type="button" outline onClick={handleUploadImage} className=" text-xs" disabled={imageUploadError}>
                                {imageUploadProgress?(
                                    <div className="w-[3em] lg:w-[5em] h-[fit-content]">
                                        <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
                                    </div>
                                ):('Upload')}
                            </Button>
                        </div>
                        {
                            imageUploadError && (
                                <Alert color="failure" className="my-3">{imageUploadError}</Alert>
                            )
                        }
                        {
                            formData.image && (
                                <img src={formData.image} alt="Post Image" className="w-[100%] my-3"/>
                            )
                        }
                    </div>

                    <ReactQuill theme="snow" placeholder="Enter your Text..." required className="h-72 p-3 mb-14 text-white" value={formData.content} onChange={value=>setFormData({...formData,content:value})}/>
                    <div className="p-3">
                        <Button gradientDuoTone="pinkToOrange" className="w-[100%] tracking-wider text-xl" type="submit" onClick={handleSubmit}>Post</Button>
                    </div>
                </div>

            </div>
        )
    }
    else {
        return <div className="text-2xl font-bold text-red-600 italic text-center py-8">Your are not authorized to access the page...</div>
    }

}
