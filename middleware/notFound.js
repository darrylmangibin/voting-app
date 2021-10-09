import ErrorResponse from '../utils/errorResponse.js';

const notFound = (req, res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

export default notFound;
