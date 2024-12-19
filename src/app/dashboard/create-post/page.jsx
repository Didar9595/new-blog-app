'use client'
import { useUser } from "@clerk/nextjs"
import { TextInput, Select, FileInput, Button } from "flowbite-react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css'

const page = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded) {
        return null;
    }
    if (isSignedIn && user.publicMetadata.isAdmin) {
        return (
            <div className="flex justify-center items-center">
                <div className="border my-5 w-[90%] lg:w-[50%] shadow-lg rounded-lg min-h-screen">
                    <h1 className="font-bold text-2xl text-white bg-gradient-to-r from-pink-500 to-orange-400 p-3 text-center rounded-lg">Create a Post</h1>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-2 my-6">
                        <TextInput placeholder="Enter title of the post..." type="text" id="title" required className="w-[100%] lg:w-[70%] p-3" />
                        <Select id="category" required>
                            <option value="technology">Technology</option>
                            <option value="travel">Travel</option>
                            <option value="vlog">Vlog</option>
                            <option value="sports">Sports</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="news">News</option>
                        </Select>
                    </div>
                    <div className="p-3">
                        <div className="p-3 flex justify-between items-center border-2 border-dotted border-pink-400">
                            <FileInput type='file' accept="image/*" />
                            <Button gradientDuoTone="pinkToOrange" type="button" outline>Upload Image</Button>
                        </div>
                    </div>
                    <ReactQuill theme="snow" placeholder="Enter your Text..." required className="h-72 p-3 mb-14" />
                    <div className="p-3">
                        <Button gradientDuoTone="pinkToOrange" className="w-[100%] tracking-wider text-xl" type="submit">Post</Button>
                    </div>
                </div>

            </div>
        )
    }
    else {
        return <div className="text-2xl font-bold text-red-600 italic text-center py-8">Your are not authorized to to access the page...</div>
    }

}

export default page
