import NewPosts from "@/lib/models/post.model";
import { currentUser } from "@clerk/nextjs/server";
import {connect} from '@/lib/mongodb/mongoose'

export const PUT=async(req)=>{
    try {
        const user=await currentUser();
        await connect();
        const data=await req.json();
        if(!user || user.publicMetadata.userMongoId!==data.userMongoId){
            return new Response('Unauthorized',{status:401})
        }
        const newPost=await NewPosts.findByIdAndUpdate(data.postId,
            {
                $set:{
                    title:data.title,
                    content:data.content,
                    category:data.category,
                    image:data.image,
                },
            },
            {new:true}
        );
        return new Response(JSON.stringify(newPost),{status:200})
    } catch (error) {
        return new Response('Error occurred while Updating',{status:500})
    }
}