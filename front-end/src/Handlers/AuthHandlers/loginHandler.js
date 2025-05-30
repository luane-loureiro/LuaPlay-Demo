import { toast } from 'react-toastify';

/**
 * Lida com o login do usuário.
 * @param {Object} form - { email, password }
 * @param {Function} login - função do AuthContext
 * @param {Function} navigate - função do react-router-dom
 * @param {Function} loginUser - função que faz a chamada ao backend
 */
export async function loginHandler(form, login, navigate, loginUser) {
  try {
    const response = await loginUser(form);
    console.log('Resposta login:', response);

    const { token, user } = response;
    const { username, email } = user;

    login({ userData: { username, email }, token });

    toast.success('Login realizado com sucesso!');
    navigate('/');
  } catch (err) {
    toast.error('Falha no login: ' + (err.message || 'Erro inesperado'));
  }
}
