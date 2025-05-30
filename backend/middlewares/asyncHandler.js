const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "Bad request",
        message: err.message,
        stack: err.stack,
      });
    case 500:
      res.json({
        title: "Server Error",
        message: err.message,
        stack: err.stack,
      });
    case 401:
      res.json({
        title: "Unauthorised",
        message: err.mesage,
        stack: err.stack,
      });
    case 404:
      res.json({ title: "Not found", mesage: err.message, stack: err.stack });
    default:
      console.log("Seems all good");
  }

  res.json({ title: "NOT FOUND", message: err.message, stack: err.stack });
};

module.exports = errorHandler;
