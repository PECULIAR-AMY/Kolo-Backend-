
export const validate = (schema) => {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: [
          {
            field: "body",
            message: "Request body is empty, missing, or not valid JSON",
          },
        ],
      });
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    // Replace req.body with sanitized/validated data
    req.body = result.data;

    next();
  };
};