const dbfun=require("./db/dbFun")
const express = require("express");
const bodyParser =require("body-parser")
 


let app=express();
app.use(bodyParser.json());


app.post("/register",async(req,res)=>{ 
    let data= await dbfun.insertuser(req.body)
 res.status(200).json({status:"Success", data:data})
});
app.post("/login",async(req,res)=>{ 
    let data= await dbfun.login(req.body);
    if (data.status=="Success") {
        
        res.status(200).json(data)
    } else {
        res.status(400).json(data)
    }

});
app.post("/posts",async(req,res)=>{ 
    let auth=await dbfun.auth(req.headers.authorization);
    if (auth.status=="Failed") {
        res.status(400).json(auth);
    }
    let post=await dbfun.CreatePost({...req.body,user:auth.user})
     
    res.status(200).json(post);
});
app.put("/posts:id",async(req,res)=>{ 
   let id=req.params.id.split(":");
   let auth=await dbfun.auth(req.headers.authorization);
   if (auth.status=="Failed") {
       res.status(400).json(auth);
   }
   let ed=await dbfun.editPost(id[1],req.body)
   res.status(200).json(ed)

   
});
app.delete("/posts:id",async(req,res)=>{ 
    let id=req.params.id.split(":");
    let auth=await dbfun.auth(req.headers.authorization);
    if (auth.status=="Failed") {
        res.status(400).json(auth);
    }
    let del=await dbfun.delPost(id[1]);
    res.status(200).json(del)
 
    
 });
 app.get("/*",(req,res)=>{ 
    res.status(400).json({status:"Failed",message:"Api not found"})
    
 });
 app.post("/*",(req,res)=>{ 
    res.status(400).json({status:"Failed",message:"Api not found"})
    
 });
 app.put("/*",(req,res)=>{ 
    res.status(400).json({status:"Failed",message:"Api not found"})
    
 });
 app.delete("/*",(req,res)=>{ 
    res.status(400).json({status:"Failed",message:"Api not found"})
    
 });
module.exports=app;