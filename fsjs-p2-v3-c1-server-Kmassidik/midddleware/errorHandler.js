function errorHandler(err, req, res, next) {
  // console.error(err, "<======================== error"); // ntr dulu

  let status = 500;
  let message = "Internal server error!";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeForeignKeyConstraintError":
      status = 400;
      message = "Invalid data!";
      break;
      case "WrongInput":
        status = 400;
        message = err.message;
        break;
    case "NotFound":
      status = 404;
      message = err.message;
      break;
    case "login":
      status = 401;
      message = err.err;
      break;
    case "JsonWebTokenError":
    case "authentication":
      status = 401;
      message = "Authentication failed";
      break;
    case "unAuthorization":
      status = 403;
      message = err.message;
      break;
    default:
      break;
  }

  res.status(status).json(message);
}

module.exports = errorHandler;
