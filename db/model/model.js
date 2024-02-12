const mongoose = require("mongoose");
let userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
});

let usermodel= mongoose.model("users",userschema);

let postschema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    image:{type:String,required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})
let postmodel= mongoose.model("posts",postschema);

let tokenschema=mongoose.Schema({
    token:{type:String,required:true},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})
let tokenmodel= mongoose.model("token",tokenschema);

module.exports={usermodel,postmodel,tokenmodel}