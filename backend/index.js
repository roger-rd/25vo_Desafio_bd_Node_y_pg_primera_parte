import * as dotenv from 'dotenv';
import { application } from 'express';
dotenv.config();

import {agregarPost, getPost, getPosts } from './dataBase/db.js';
import { handleErrors } from './dataBase/error.js';
import express from 'express';
import cors from 'cors'
const app = express();

//// Middleware////
app.use(cors());
app.use(express.json());

/////GET/////
app.get("/", (req,res)=>{
    res.json({ok:true, result:"todo esta ok en la raiz"})
});

app.get("/posts", async(req,res)=>{
    try {
        const result = await getPosts();
        return res.status(200).json({ok:true, result})
    } catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
    }
});

app.get("/posts/:id", async (req,res)=>{
    const{id}  = req.params
    try {
        const result = await getPost(id);
        return res.status(200).json({ok:true, result})
    } catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
    }
})

////POST//////

app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion} = req.body
    try {
        const result = await agregarPost({ titulo, img, descripcion})
        return res.status(201).json({ ok: true, result })
    }catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
        }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("servidor listo en http://localhost:" + PORT );
});