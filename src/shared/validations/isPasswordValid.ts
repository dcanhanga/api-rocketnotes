export const isPasswordValid = (value: string): boolean => {
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return value.length >= 8 && uppercaseRegex.test(value) && specialCharRegex.test(value);
};
