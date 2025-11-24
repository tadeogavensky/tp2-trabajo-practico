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

export const checkUserEmailExists = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!req.user && existingUser) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.EMAIL_TAKEN });
    }
    if (req.user && existingUser && existingUser.id !== req.user.id) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.EMAIL_TAKEN });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkUserUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  if (!username) return next();

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (!req.user && existingUser) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.USERNAME_TAKEN });
    }
    if (req.user && existingUser && existingUser.id !== req.user.id) {
      return res.status(409).json({ error: USER_FIELD_ERRORS.USERNAME_TAKEN });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const validateEmailFormat = (req, res, next) => {
  const { email } = req.body;

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.EMAIL_INVALID });
  }

  next();
};

export const validatePasswordStrength = (req, res, next) => {
  const { password } = req.body;

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.PASSWORD_WEAK });
  }

  next();
};

export const validateSignUpFields = (req, res, next) => {
  const { firstName, lastName, age, username, email, password } = req.body;
  const missingFields = [];

  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (!firstName) missingFields.push("firstName");
  if (!lastName) missingFields.push("lastName");
  if (age == null) missingFields.push("age");
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

  const parsedAge = Number(age);
  if (!Number.isInteger(parsedAge) || !isAgeValid(parsedAge)) {
    return res.status(400).json({ error: USER_FIELD_ERRORS.AGE_INVALID });
  }
  req.body.age = parsedAge;

  next();
};

export const validateLoginFields = (req, res, next) => {
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
};

export const validateUpdateFields = (req, res, next) => {
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

  if (age !== undefined) {
    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || !isAgeValid(parsedAge)) {
      return res.status(400).json({ error: USER_FIELD_ERRORS.AGE_INVALID });
    }
    req.body.age = parsedAge;
  }

  next();
};

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: USER_FIELD_ERRORS.TOKEN_INVALID });
  }
  const payload = verifyJWT(token);

  if (!payload || !payload.userId) {
    return res.status(403).json({ error: "TOKEN_INVALID_FORMAT" });
  }

  const user = await User.findByPk(payload.userId);

  if (!user) {
    return res.status(404).json({ error: "USER_NOT_FOUND" });
  }
  req.user = user;

  next();
};
