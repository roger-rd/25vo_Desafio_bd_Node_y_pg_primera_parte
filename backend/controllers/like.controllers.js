import { handleErrors } from "../dataBase/error.js";
import {postModel} from  "../models/like.model.js"

const getAllPosts =  async (req,res)=>{
    try {
        const result = await postModel.findAll();
        return res.status(200).json({ok:true, result})
    } catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
    }
};

const getPost = async (req,res)=>{
    const{id}  = req.params
    const { titulo, img, descripcion } = req.query; // obtener como query string
    try {
        const result = await postModel.findById(titulo, img, descripcion,id);
        return res.status(200).json({ok:true, message: "Presupuesto modificado con éxito", result})
    } catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
    }
}

const agregarPost = async (req, res) => {
    const { titulo, img, descripcion} = req.body
    try {
        const result = await postModel.agregar({ titulo, img, descripcion})
        return res.status(201).json({ ok: true, result })
    }catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
        }
}

const updatePost = async(req,res) =>{
    const{id}  = req.params
    const {titulo, img, descripcion} = req.body;
    try {
        const result = await postModel.updatePost(id,{titulo,img,descripcion});
        return res.status(201).json({ ok: true, result })
    } catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
    }
};

const deletePost = async(req,res)=>{
    const{id}  = req.params
    try {
        const result = await postModel.remove(id);
        return res.status(200).json({ ok: true, result })
    } catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        return res.status(status).json({ok:false, return:message})
    }
}


export  const todoController = {
    getAllPosts,
    getPost,
    agregarPost,
    updatePost,
    deletePost
};