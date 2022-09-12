export const validLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const validUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const invalidLogin = {
  email: 'user@xablau.com',
  password: 'invalid_secret',
};

export const invalidUser = {
  id: 2,
  username: 'User',
  role: 'undefined',
  email: 'user@xablau.com',
  password: 'senha_invalida',
};
