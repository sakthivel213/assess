const express=require('express');
const router=require('./routes/router');
const app= express();
app.use(express.json());
app.use('/login',router);
app.listen(7000,()=>{
    console.log('hi 7000');
})