export function errorMiddleware(err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
}

export function notFound(req, res, next, err = { message: 'not found' }) {
  res.status(404).json({ error: err.message });
}
