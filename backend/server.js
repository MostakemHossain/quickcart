import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app= express();
dotenv.config();
const PORT = process.env.PORT || 3000

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.get('/test',(req,res)=>{
    res.send('Hello World');
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})