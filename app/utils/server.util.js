const { customAlphabet } = require("nanoid");

export const hashGeneration = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return customAlphabet(alphabet, 8); // 8 is the ID length
};
