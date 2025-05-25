export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username, password } = req.body;
  const users = global.users || [];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.send('✅ Login successful');
  } else {
    res.status(401).send('❌ Invalid credentials');
  }
}
