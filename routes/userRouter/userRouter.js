import url from "url";
import createUser from "./createUser.js";
import deleteUser from "./deleteUser.js";
import getUser from "./getUser.js";
import listUsers from "./listUsers.js";
import updateUser from "./updateUser.js";

export default function (req, res) {
  const parseUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parseUrl.path;
  if (path === "/users" && method === "GET") {
    listUsers(req, res);
  } else if (path==="/users" && method === "POST") {
    createUser(req, res);
  } else if(path.startsWith("/users/")&&method==="GET"){
    getUser(req,res)
  }else if (path.startsWith("/users/") && method === "PUT") {
    updateUser(req, res, parseUrl);
  } else if (path.startsWith("/users/") && method === "DELETE") {
    deleteUser(req, res, parseUrl);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found in users" }));
  }
}
