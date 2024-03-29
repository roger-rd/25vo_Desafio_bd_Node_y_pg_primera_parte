import { useState, useEffect } from "react";
import axios from "axios";

import Form from "./components/Form";
import Post from "./components/Post";

import "./App.css";


const urlBaseServer = "http://localhost:3000";
//axios.defaults.baseURL = urlBaseServer;

const App = () => {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);


  const getPosts = async () => {
    const {data: posts} = await axios.get(urlBaseServer + "/api/posts");
    setPosts([...posts.result]); 
  };


  const agregarPost = async () => {
    const post = { titulo, img: imgSrc, descripcion };
    await axios.post(urlBaseServer + "/api/posts", post);
    getPosts();
  };
  

  const like = async (id) => {
    await axios.put(urlBaseServer + `/api/posts/like/${id}`);
    getPosts();
  };


  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/api/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
            //se agrega esto
            titulo={titulo}
            imgSrc={imgSrc}
            descripcion={descripcion}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post key={i} post={post} like={like} eliminarPost={eliminarPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
