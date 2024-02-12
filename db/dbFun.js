const mongoose=require("mongoose");
const model=require("./model/model");
let jwt=require("jsonwebtoken")
let Skey="Skey";
async function connection() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/assignment')
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
   
};
async function insertuser(data) {
   let user= await model.usermodel.create(data);
   return user;
}

async function auth(token) {
    let user=await model.tokenmodel.find({token:token});
    if (user.length==0) {
        return {status:"Failed"}
    }
    return {status:"Success",user:user[0]._id}
};
async function login(data) {
    let user=await model.usermodel.find(data);
    if (user.length==0) {
        return {status :"Failed"}
    }
    let tokencheck=await model.tokenmodel.find({user:user[0]._id})
    if (tokencheck!==0) {
        return {status :"Success",token:tokencheck[0].token}
    } else {
        
    let token=jwt.sign(user[0].email,Skey);
    await model.tokenmodel.create({token:token,user:user[0]._id});
     return {status :"Success",token:token};
    }
};
async function CreatePost(data) {
    let user=await model.postmodel.create(data);
    return {status:"Post created",user:user}
};
async function postcheck(id) {
    let post=await model.postmodel.find({_id:id});
    
    if (post.length==0) {
        return false
    }
    return true
};

async function editPost(id,data) {
    try {
            if (await postcheck(id)==false) {
            return {status:"Failed"}
        }
        await model.postmodel.updateOne({_id:id},{$set:data});
        return {status:"Success"}
    } catch (error) {
        return {status:"Failed",error:error}
    }
   
};
async function delPost(id) {
    try {
            if (await postcheck(id)==false) {
            return {status:"Failed"}
        }
        await model.postmodel.deleteOne({_id:id});
        return {status:"Successfully deleted"}
    } catch (error) {
        return {status:"Failed",error:error}
    }
   
};


module.exports={connection,insertuser,login,auth,CreatePost,editPost,delPost}