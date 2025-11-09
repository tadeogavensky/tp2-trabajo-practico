import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../index.js";

export function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isPasswordStrong(password) {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return passwordRegex.test(password);
}

export function isAgeValid(age) {
  return age > 0 && age <= 120;
}

export function isFirstNameValid(firstName) {
  const hasNumber = /\d/;
  return (
    typeof firstName === "string" &&
    firstName.length >= 2 &&
    firstName.length <= 50 &&
    !hasNumber.test(firstName)
  );
}

export function isLastNameValid(lastName) {
  const hasNumber = /\d/;
  return (
    typeof lastName === "string" &&
    lastName.length >= 2 &&
    lastName.length <= 50 &&
    !hasNumber.test(lastName)
  );
}

export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateJWT(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyJWT(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
