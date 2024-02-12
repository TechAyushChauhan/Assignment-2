const app=require("./app");
const mongoose=require("mongoose")
let db=require("./db/dbFun");
// mongoose.connect('mongodb://127.0.0.1:27017/test');
db.connection();

app.listen(3000,()=>console.log("server is running"))