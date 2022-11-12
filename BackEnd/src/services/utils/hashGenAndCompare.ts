import bcrypt from 'bcrypt';
const saltRounds = 10;

const passwordGenerator = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const passwordCompare = async (
  bodypassword: string,
  userpassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(bodypassword, userpassword);
  return result;
};

export default { passwordGenerator, passwordCompare };
