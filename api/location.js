export default function handler(req, res) {
  const { user } = req.query;
  const locations = global.locations || {};
  const loc = locations[user];

  if (!loc) return res.status(404).json({ error: 'No location yet' });
  res.json(loc);
}
