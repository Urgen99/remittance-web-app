import crypto from "crypto-js";

const encryptString = (str: string, SECRET_KEY: string) => {
  const encrypt = crypto.AES.encrypt(str, SECRET_KEY);
  return encrypt.toString();
};

const decryptString = (str: string, SECRET_KEY: string) => {
  const decrypt = crypto.AES.decrypt(str, SECRET_KEY);
  return decrypt.toString(crypto.enc.Utf8);
};

export { decryptString, encryptString };
