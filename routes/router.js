import url from "url";
import userRouter from "./userRouter/userRouter.js";

export default function routeHandler(req, res) {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.path
  if(path === '/users'||path.startsWith('/users/')){
    userRouter(req,res)
  } else{ 
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({message:"Route not found"}))
  }
}
