import data from '../../data.js'
export default async function updateUser(req,res){
  const id = parseInt(req.url.split("/")[2]);
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    const updatedData = JSON.parse(body);
    const updatedUser = await data.updateUser(id, updatedData);
    if (updatedUser) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  });
}