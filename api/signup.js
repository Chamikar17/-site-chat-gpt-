import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'users.json');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('All fields required');
  }

  let users = [];
  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).send('❌ Username already exists');

  users.push({ username, email, password });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.send('✅ Signup successful');
}
