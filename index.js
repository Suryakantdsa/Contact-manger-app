const express=require("express")
const app=express()
const cors=require("cors")
const User=require("./models/user")
const uri="mongodb+srv://Suryakant:Suryadas@cluster0.mydbwj6.mongodb.net/conactManger?retryWrites=true&w=majority"
const mongoose=require("mongoose")

app.use(cors())
app.use(express.json())

mongoose.connect(uri)
.then(()=>{console.log("connected")})


app.post("/v1/contacts", async(req,resp)=>{
    console.log(req.body)

    try{
        let newuser=new User(req.body)
        let result=await newuser.save()
        resp.send(result)

    }catch{
        if(!req.body.firstName){
            resp.status(404).send({"error": "Missing required field(s): firstName"})
        }else if(!req.body.lastName){
            resp.status(404).send({"error": "Missing required field(s): lastName"})
        }
        else if(!req.body.email){
            resp.status(404).send({"error": "Missing required field(s): email"})
        }
        else{
            resp.status(404).send({"error": "Missing required field(s): phone"})
        }
        
    }

})

app.get("/v1/contacts",async(req,resp)=>{
    try{

        let result= await User.find()
        resp.send(result)
    } catch{
        resp.status(400).send({msg:"no data"})
    }
})
app.get("/v1/contacts/:id",async(req,resp)=>{
    try{

        let result= await User.findOne({_id:req.params.id})
        resp.send(result)
    } catch{
        resp.status(404).send({msg:"no data"})
    }
})
app.delete("/v1/contacts/:id",async(req,resp)=>{
    try{

        let result= await User.deleteOne({_id:req.params.id})
        resp.status(204).send(result)
    } catch{
        resp.status(404).send({msg:"no data to delete"})
    }
})
app.put("/v1/contacts/:id",async(req,resp)=>{
    try{

        let result= await User.updateOne(
            {_id:req.params.id}
            ,{
                $set:req.body
            }
            )
        resp.status(204).send(result)
    } catch{
        resp.status(404).send({msg:"no data to delete"})
    }
})
app.patch("/v1/contacts/:id",async(req,resp)=>{
    try{

        let result= await User.updateOne(
            {_id:req.params.id}
            ,{
                $set:req.body
            }
            )
        resp.status(204).send(result)
    } catch{
        resp.status(404).send({msg:"no data to delete"})
    }
})




app.listen(3000,()=>{console.log("app is running at port 5000")})