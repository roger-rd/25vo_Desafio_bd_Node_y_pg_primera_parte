import {Router} from 'express';
import { todoController } from '../controllers/like.controllers.js';

const router = Router();


//////GET//////
router.get("/", (req,res)=>{
    res.json({ok:true, result:"todo esta ok en la raiz"});
});
router.get("/posts", todoController.getAllPosts);
router.get("/posts/:id", todoController.getPost);


//////POST//////
router.post("/posts", todoController.agregarPost);

//////PUT//////

router.put("/posts/:id", todoController.updatePost);

//////DELETE//////
router.delete("/posts/:id",todoController.deletePost);

export default router;

