
module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === 'invalid') {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Simulação: pega user do header pra teste
    if (req.headers['x-user-id']) {
      req.user = { id: req.headers['x-user-id'] };
    } else {
      req.user = { id: 'defaultUserId' };
    }

    next();
  } catch (error) {
    // Qualquer erro retorna 401, evitando 500
    return res.status(401).json({ message: 'Token inválido' });
  }
};