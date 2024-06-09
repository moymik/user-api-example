import data from '../../data.js'
export default async function listUsers(req, res) {
    const users = await data.getUsers()
    console.log(users)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }