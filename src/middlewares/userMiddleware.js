import { User } from "../models/index.js";
import {
  isEmailValid,
  isPasswordStrong,
  isFirstNameValid,
  isLastNameValid,
  isAgeValid,
  verifyJWT,
  isUsernameValid,
} from "../utils/user.js";

import USER_FIELD_ERRORS from "../errors/user.js";

export async function checkUserEmailExists(req, res, next) {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (!req.user && existingUser) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.EMAIL_TAKEN });
    }

    if (req.user && existingUser && existingUser.id !== req.user.userId) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.EMAIL_TAKEN });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function checkUserUsernameExists(req, res, next) {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ where: { username } });

    if (!req.user && existingUser) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.USERNAME_TAKEN });
    }

    if (req.user && existingUser && existingUser.id !== req.user.userId) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.USERNAME_TAKEN });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function validateEmailFormat(req, res, next) {
  const { email } = req.body;

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.EMAIL_INVALID });
  }

  next();
}

export async function validatePasswordStrength(req, res, next) {
  const { password } = req.body;

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.PASSWORD_WEAK });
  }

  next();
}

export async function validateSignUpFields(req, res, next) {
  console.log("Validating sign-up fields");
  const { firstName, lastName, age, username, email, password } = req.body;
  const missingFields = [];

  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (!firstName) missingFields.push("firstName");
  if (!lastName) missingFields.push("lastName");
  if (!age) missingFields.push("age");
  if (!username) missingFields.push("username");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Missing required fields", fields: missingFields });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.EMAIL_INVALID });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({
      error: USER_FIELD_ERRORS.PASSWORD_WEAK,
    });
  }

  if (!isFirstNameValid(firstName)) {
    return res.status(400).json({
      error: USER_FIELD_ERRORS.FIRST_NAME_INVALID,
    });
  }

  if (!isLastNameValid(lastName)) {
    return res.status(400).json({
      error: USER_FIELD_ERRORS.LAST_NAME_INVALID,
    });
  }

  if (!isUsernameValid(username)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.USERNAME_INVALID });
  }

  if (!isAgeValid(age)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.AGE_INVALID });
  }

  next();
}

export async function validateLoginFields(req, res, next) {
  const { email, password } = req.body;
  const missingFields = [];

  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Missing required fields", fields: missingFields });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.EMAIL_INVALID });
  }
  next();
}

export async function validateUpdateFields(req, res, next) {
  const { firstName, lastName, age, username, email, password } = req.body;

  if (firstName && !isFirstNameValid(firstName)) {
    return res
      .status(400)
      .json({ error: USER_FIELD_ERRORS.FIRST_NAME_INVALID });
  }

  if (lastName && !isLastNameValid(lastName)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.LAST_NAME_INVALID });
  }

  if (username && !isUsernameValid(username)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.USERNAME_INVALID });
  }

  if (email && !isEmailValid(email)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.EMAIL_INVALID });
  }

  if (password && !isPasswordStrong(password)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.PASSWORD_WEAK });
  }

  if (age && !isAgeValid(age)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.AGE_INVALID });
  }

  next();
}

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: USER_FIELD_ERRORS.TOKEN_INVALID });
  }
    const payload = verifyJWT(token);
    
    if (!payload || !payload.userId) {
        return res.status(403).json({ error: 'TOKEN_INVALID_FORMAT' });
    }
    
    const user = await User.findByPk(payload.userId);

    if (!user) {
        return res.status(404).json({ error: 'USER_NOT_FOUND' });
    }
    req.user = user; 
    
    next();
}
