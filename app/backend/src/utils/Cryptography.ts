import * as bcrypt from 'bcryptjs';

export const encryptPass = async (password: string) => {
  const salt = await bcrypt.genSaltSync(10);
  const result = await bcrypt.hashSync(password, salt);
  return result;
};

export const verifyDb = async (login: string, dbPassword: string) : Promise<boolean> => {
  const result = await bcrypt.compareSync(login, dbPassword);
  return result;
};
