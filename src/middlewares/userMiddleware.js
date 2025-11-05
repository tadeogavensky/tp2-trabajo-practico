import { User } from "../../models/index.js";
import {
  isEmailValid,
  isPasswordStrong,
  isFirstNameValid,
  isLastNameValid,
  isAgeValid,
} from "../utils/user.js";

export async function checkUserEmailExists(req, res, next) {
  try {
    const { email } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function checkUserUsernameExists(req, res, next) {
  try {
    const { username } = req.body;
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(409).json({ error: "Username already taken" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function validateEmailFormat(req, res, next) {
  const { email } = req.body;

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  next();
}

export async function validatePasswordStrength(req, res, next) {
  const { password } = req.body;

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }

  next();
}

export async function validateSignUpFields(req, res, next) {
  console.log("Validating sign-up fields");
  const { firstName, lastName, age, username, email, password } = req.body;
  if (!email || !password || !firstName || !lastName || !age || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!isPasswordStrong(password)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }

  if (!isFirstNameValid(firstName)) {
    return res.status(400).json({ error: "Invalid first name" });
  }

  if (!isLastNameValid(lastName)) {
    return res.status(400).json({ error: "Invalid last name" });
  }

  if (!isAgeValid(age)) {
    return res.status(400).json({ error: "Invalid age" });
  }

  next();
}

export async function validateLoginFields(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  next();
}
