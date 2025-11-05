import bcrypt from "bcrypt";

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
  return age > 0 && age < 120;
}

export function isFirstNameValid(firstName) {
  return (
    typeof firstName === "string" &&
    firstName.length >= 2 &&
    firstName.length <= 50
  );
}

export function isLastNameValid(lastName) {
  return (
    typeof lastName === "string" &&
    lastName.length >= 2 &&
    lastName.length <= 50
  );
}

export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
