const notFound = (req, res, next) => {
  res.status(404).json({ message: "Element not found" });
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

module.exports = { notFound, errorHandler };
