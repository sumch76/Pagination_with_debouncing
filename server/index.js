const express=require('express');
require('dotenv').config();
const connectDB=require('./config/db');
const userRoutes=require('./routes/userRoutes');


const app = express();
app.use(express.json());
app.use('/users', userRoutes);
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