import * as dotenv from 'dotenv';
import { application } from 'express';
dotenv.config();

import express from 'express';
import cors from 'cors'
const app = express();
import likeRouter from './routes/like.route.js';

//// Middleware////
app.use(cors());
app.use(express.json());
app.use("/api",likeRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("servidor listo en http://localhost:" + PORT );
});