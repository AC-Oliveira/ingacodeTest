import userModel from '../models/User';
import errors from '../messages/error';
import hash from './utils/hashGenAndCompare';
import auth from '../middlewares/auth';

const loginUser = async (username: string, password: string) => {
  if (!username || !password) throw new Error(errors.LOGIN_FIELDS_EMPTY);
  const user = await userModel.findUserByUsername(username);
  if (!user) throw new Error(errors.USER_NOT_FOUND);
  const result = await hash.passwordCompare(password, user.Password);
  if (!result) throw new Error(errors.WRONG_PASSWORD);
  const token = auth.generateToken(user.Username, user.Id);
  return {
    token,
  };
};

const createUser = async (username: string, password: string) => {
  const user = await userModel.findUserByUsername(username);
  if (user) throw new Error(errors.USER_ALREADY_EXISTS);
  const hashPassword = await hash.passwordGenerator(password);
  const newUser = await userModel.createUser(username, hashPassword);
};

const createCollaborator = async (name: string, username: string) => {
  const user = await userModel.findUserByUsername(username);
  if (!user) throw new Error(errors.USER_NOT_FOUND);
  const collaborator = await userModel.createCollaborator(user.Id, name);
};

const findAllUsers = async () => {
  const users = await userModel.findAllUsers();
  return users;
};

const findAllCollaborators = async () => {
  const collaborators = await userModel.findAllCollaborators();
  return collaborators;
};

const findCollaboratorsByName = async (word: string) => {
  const collaborator = await userModel.findCollaboratorsByName(word);
  return collaborator;
};

const findCollaboratorById = async (id: string, name: string) => {
  const user = userModel.findCollaboratorById(id);
  if (!user) throw new Error(errors.COLLABORATOR_NOT_FOUND_FN(name));
};

export default {
  loginUser,
  createUser,
  createCollaborator,
  findAllUsers,
  findAllCollaborators,
  findCollaboratorsByName,
  findCollaboratorById,
};
