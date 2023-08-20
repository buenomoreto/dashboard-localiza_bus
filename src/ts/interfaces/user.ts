type User = {
  id: number;
  token: string;
  tipo: string;
};

type UserCredentials = {
  email: string;
  senha: string;
};

type AccessCredentials = {
  senha: string;
  token: string;
};

export type {
  User,
  UserCredentials,
  AccessCredentials
};
