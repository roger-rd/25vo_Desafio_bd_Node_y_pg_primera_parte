import { pool } from "../dataBase/connection.js";

 const findAll = async ()=>{
    const {rows} = await pool.query("SELECT * FROM  posts")
    return rows;
}

 const findById = async(id)=>{
    const text = "SELECT * FROM  posts WHERE id = $1";
    const {rows} = await pool.query(text,[id]);
    if(rows.length === 0 ){
        throw ({code:"404"})
    }
    return rows[0];
};


 const agregar = async ({ titulo, img, descripcion }) => {
    if (!titulo || !img || !descripcion) {
        throw ({code:"400"});
    }
    const text = "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0) RETURNING *";
    const { rows } = await pool.query(text, [titulo, img, descripcion]);
    return rows[0];
};

const updatePost = async(id, {titulo, img, descripcion})=>{
    if (!titulo || !img || !descripcion) {
        throw ({code:"400"});
    }
    const text = "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *";
    const {rows} = await pool.query(text, [titulo,img,descripcion,id]);
    return rows[0];
}

const remove = async(id) =>{
    const text = " DELETE FROM posts WHERE id = $1 RETURNING * ";
    const{rows} = await pool.query(text, [id]);
    return rows[0];
}

export const postModel = {
    findAll,
    findById,
    agregar,
    updatePost,
    remove
};