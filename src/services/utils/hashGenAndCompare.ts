import bcrypt from 'bcrypt';
const saltRounds = 10;

const passwordGenerator = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const passwordCompare = async (bodypassword, userpassword) => {
  const result = await bcrypt.compare(bodypassword, userpassword);
  return result;
};

export default { passwordGenerator, passwordCompare };
