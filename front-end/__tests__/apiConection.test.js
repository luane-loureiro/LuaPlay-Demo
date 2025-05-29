import axios from 'axios';

describe('Teste de conexão com backend', () => {
  const baseURL = 'http://localhost:3000/auth/';

  const testUser = {
    username: 'testeVitest',
    email: 'testevitest@example.com',
    password: '123456',
  };

  it('Deve criar um usuário e depois conseguir logar e receber token', async () => {
    // Tenta criar o usuário (ignora erro se já existir)
    try {
      await axios.post(`${baseURL}/register`, testUser);
    } catch (error) {
      // Se o erro for de conflito (usuário já existe), pode ignorar
      if (error.response && error.response.status !== 409) {
        throw error;
      }
    }

    // Agora tenta logar com o usuário criado
    const loginResponse = await axios.post(`${baseURL}/login`, {
      email: testUser.email,
      password: testUser.password,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.data).toHaveProperty('token');
    expect(loginResponse.data.user.email).toBe(testUser.email);
  });
});
