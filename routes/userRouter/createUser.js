import data from "../../data.js";
export default function createUser(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const newUser = JSON.parse(body);
    console.log(newUser)
    data.addUser(newUser);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  });
}
