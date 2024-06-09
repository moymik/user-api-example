import data from '../../data.js'
export default async function deleteUser(req, res) {
  const id = parseInt(req.url.split("/")[2]);
  const success = await data.deleteUser(id);
  if (success) {
    res.writeHead(204);
    res.end(JSON.stringify({ message: 'User deleted' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "User not found" }));
  }
}
