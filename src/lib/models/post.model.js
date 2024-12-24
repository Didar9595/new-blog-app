import mongoose from "mongoose";


//if (mongoose.models.Post) {
 //   delete mongoose.models.Post;
//  }

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:'https://tse2.mm.bing.net/th?id=OIP.G37tgeQqSNt7v2oPfj9ltQHaE7&pid=Api',
    },
    category:{
        type:String,
        default:'technology',
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }
    
},{timestamps:true});

const NewPosts=mongoose.models.NewPosts || mongoose.model("NewPosts",postSchema);

export default NewPosts;