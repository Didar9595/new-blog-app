import NewPosts from "@/lib/models/post.model"
import {connect} from "../../../../lib/mongodb/mongoose"
import { currentUser } from "@clerk/nextjs/server"


export const DELETE=async(req)=>{
  try {
    const user=await currentUser();
    await connect()
    const data=await req.json();
    if(user.publicMetadata.userMongoId!==data.userId){
      return new Response('Unauthorized',{status:401});
    }
    console.log("Data Ki Post ID",data.postId)
    await NewPosts.findByIdAndDelete(data.postId)
    console.log("Success")
    return new Response("Success",{status:200})
  } catch (error) {
    return new Response("Failed",{status:500})
  }
  
}