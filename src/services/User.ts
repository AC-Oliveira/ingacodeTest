import userModel from '../models/User';
import errors from '../messages/error';
import hash from './utils/hashGenAndCompare';
import auth from '../middlewares/auth';

const loginUser = async (username: string, password: string) => {
  const user = await userModel.findUserByUsername(username);
  if (!user) throw new Error(errors.NOT_FOUND);
  const result = await hash.passwordCompare(password, user.Password);
  if (!result) throw new Error(errors.WRONG_PASSWORD);
  const token = auth.generateToken(user.Username, user.Id);
  return {
    token,
    user: {
      username: user.Username,
      id: user.Id,
    },
  };
};

export default {
  loginUser,
};
