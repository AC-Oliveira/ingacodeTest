import { StatusCodes } from 'http-status-codes';
import userService from '../services/User';

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await userService.loginUser(email, password);
    response.status(StatusCodes.OK).json(result);
  } catch (error: any) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export default {
  loginUser,
};
