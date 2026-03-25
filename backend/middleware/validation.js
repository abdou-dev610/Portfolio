export const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // Check required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: name, email, subject, message',
    });
  }

  // Validate name
  if (name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name must be at least 2 characters long',
    });
  }

  // Validate email format
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address',
    });
  }

  // Validate subject
  if (subject.trim().length < 5 || subject.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Subject must be between 5 and 100 characters',
    });
  }

  // Validate message
  if (message.trim().length < 10 || message.trim().length > 5000) {
    return res.status(400).json({
      success: false,
      message: 'Message must be between 10 and 5000 characters',
    });
  }

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
