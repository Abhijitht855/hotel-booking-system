import express from 'express'
import "dotenv/config";
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js';

const app=express()
connectDB();

const PORT = 5000

app.use(express.json());


app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send('hello from server')
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    
})