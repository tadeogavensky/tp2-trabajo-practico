const USER_FIELD_ERRORS = {
  FIRST_NAME_INVALID:
    "First name must be between 2 and 50 characters and contain no numbers.",
  LAST_NAME_INVALID:
    "Last name must be between 2 and 50 characters and contain no numbers.",
  USERNAME_INVALID: "Username must be between 2 and 50 characters.",
  EMAIL_INVALID: "Email format is invalid.",
  PASSWORD_WEAK:
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
  AGE_INVALID: "Age must be a number between 1 and 120.",
  USERNAME_TAKEN: "The username is already taken.",
  EMAIL_TAKEN: "The email is already registered.",
  TOKEN_INVALID: "Invalid or expired token.",
  NO_TOKEN: "No token provided.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  USER_NOT_FOUND: "User not found.",
};

export default USER_FIELD_ERRORS;
