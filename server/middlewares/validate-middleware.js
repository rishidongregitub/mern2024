const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Validation Error";
    const extraDetails = err.errors[0].message;  // Assuming the first error message provides enough information

    const error = {
      status,
      message,
      extraDetails
    };
    console.error(error);

    next(error);
  }
};

module.exports = validate;
