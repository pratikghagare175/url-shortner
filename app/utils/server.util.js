const { customAlphabet } = require("nanoid");
const config = require("../configs/env.config")

exports.generateLink = () => {
  const hashAlphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const customAlphabetHash = customAlphabet(hashAlphabets, 6); // 6 is the ID length
  const hash = customAlphabetHash()
  return {shortlink:`${config.shortlink_domain}/${hash}`,hash}
};

exports.responseSend = (res, statusCode, {success, message, data}) => {
  res.status(statusCode).send({success, message, data});
};
