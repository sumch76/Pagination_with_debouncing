const express=require('express');
require('dotenv').config();
const connectDB=require('./config/db');


const app = express();
// app.use(cors());
app.use(express.json());
connectDB().then(()=>
{
    console.log('MongoDB Connected...');
    app.listen(3000,()=>{
        console.log('server is listening on port 3000');    
    });
}).catch((err)=>
{
    console.log('database cannot be connected..'+err.message); 
});