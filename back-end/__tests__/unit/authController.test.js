const authController = require('../../src/controllers/authController');
const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/User');
jest.mock('jsonwebtoken');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('register', () => {
    it('deve registrar novo usuário com sucesso', async () => {
      const req = {
        body: { username: 'user1', email: 'user1@email.com', password: 'senha123' },
      };
      const res = mockRes();

      User.findOne.mockResolvedValueOnce(null); // username
      User.findOne.mockResolvedValueOnce(null); // email
      User.prototype.save = jest.fn().mockResolvedValueOnce({});

      await authController.register(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(2);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuário criado com sucesso' });
    });

    it('deve retornar 409 se username já existir', async () => {
      const req = { body: { username: 'user1', email: 'a@a.com', password: '123' } };
      const res = mockRes();

      User.findOne.mockResolvedValueOnce({}); // username já existe

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: 'Nome de usuário já existe' });
    });

    it('deve retornar 400 se campos faltarem', async () => {
      const req = { body: { email: '', password: '' } };
      const res = mockRes();

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login', () => {
    it('deve autenticar usuário corretamente', async () => {
      const req = { body: { email: 'user@email.com', password: 'senha123' } };
      const res = mockRes();

      const userMock = {
        _id: '123',
        username: 'user',
        email: 'user@email.com',
        comparePassword: jest.fn().mockResolvedValue(true)
      };

      User.findOne.mockResolvedValue(userMock);
      jwt.sign.mockReturnValue('fake-token');

      await authController.login(req, res);

      expect(jwt.sign).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        token: 'fake-token',
        user: {
          id: '123',
          username: 'user',
          email: 'user@email.com'
        }
      });
    });

    it('deve retornar 401 se usuário não existir', async () => {
      const req = { body: { email: 'inexistente@email.com', password: '123' } };
      const res = mockRes();

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Login inválido' });
    });

    it('deve retornar 401 se senha estiver errada', async () => {
      const req = { body: { email: 'user@email.com', password: 'errada' } };
      const res = mockRes();

      const userMock = {
        comparePassword: jest.fn().mockResolvedValue(false)
      };

      User.findOne.mockResolvedValue(userMock);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
