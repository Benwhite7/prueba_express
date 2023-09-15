function logErrors (err, req , res , next) {
  console.error(err);
  next(err); //se define que tipo de middleware es.
}

function errorHandler (err , req , res , next) {
  res.status(500).json({
    message : err.message,
    stack : err.message
  })
}

function boomeErrorHandler (err , req , res , next) {
  if(err.isBoom) {
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

module.exports = {logErrors , errorHandler , boomeErrorHandler}
