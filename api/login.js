import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'users.json');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username, password } = req.body;

  if (!fs.existsSync(usersPath)) {
    return res.status(401).send('❌ No users found');
  }

  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.send('✅ Login successful');
  } else {
    res.status(401).send('❌ Invalid credentials');
  }
}
