const express=require('express');
const router=express.Router();
const url="mongodb://localhost:27017/node";
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const userSchema= require("./schema")
const app=express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const Usermodel=mongoose.model('Use', userSchema);
const counterschema={
    id:String,
    seq:Number
}

const countermodel=mongoose.model("counter",counterschema);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

router.get('/get',async(req,res)=>{
    console.log("hi hello world");
    const a1=await  Usermodel.find()
    res.send(a1);
})
router.get('/get/:ID',async(req,res)=>{
    const a1=req.params.ID
    console.log(a1);
    const a= await Usermodel.find({"ID":a1})
    console.log(a)

    res.send(a);
})

router.post('/post',async(req,res)=>{
    countermodel.findOneAndUpdate(
        {id:'autoval'},
        {'$inc':{"seq":1}},
        {new:true},(err,data)=>{
        let ID;
           if(data==null){
            const newval=new countermodel({id:'autoval',seq:1});
            newval.save()
            console.log('this is null')
            ID=1
           }
           else{
            ID=data.seq;
            console.log(ID)
            
           }
        
            const a = new Usermodel({
                Firstname:req.body.Firstname,
                Lastname:req.body.Lastname,
                Email:req.body.Email,
                Mob:req.body.Mob,
                Sal:req.body.Sal,
                ID:ID
            })
            a.save((err, data) => {
                if (err) {
                  res.status(500)
                    .send({
                      message: err
                    });
                  return;
                } else res.status(200)
                  .send({
                    message: "User Inserted to database!!"
                    
                  })
})                    
})   

          });

    
 router.patch('/:ID',async(req,res)=>{
    const a1=req.params.ID
    console.log(a1);
    const a= await Usermodel.findOneAndUpdate({"ID":a1},{
        Sal:req.body.Sal
    })

    res.send(a);
}) 

router.delete('/:ID',async(req,res)=> {
    try{
        Usermodel.deleteOne({ID:req.params.ID}).then((data)=>{
            res.json('deleted successfully..')   
    })  
    }catch(err){
        res.send('Error')
    }
})

module.exports=router