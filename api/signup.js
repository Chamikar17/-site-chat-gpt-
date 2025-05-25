export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('All fields required');
  }

  const users = global.users || (global.users = []);
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).send('❌ Username already exists');

  users.push({ username, email, password });
  res.send('✅ Signup successful');
}
