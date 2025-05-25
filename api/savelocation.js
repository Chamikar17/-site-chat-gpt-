export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const { username, lat, lon } = req.body;
  if (!username || !lat || !lon) return res.status(400).send('Missing data');

  const locations = global.locations || (global.locations = {});
  locations[username] = { lat, lon, time: new Date() };

  res.send({ status: 'ok' });
}
