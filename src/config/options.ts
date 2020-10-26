const expire = Math.floor(Date.now() / 1000) - 30;
const secret = 'W@#!90v9V22^SGy#jWe86$aUM%J02bmF';

const options = {
  expires_in: expire,
  secret
};

export default options;
