// back-end/src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'Todos os campos são necessários' });

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(409).json({ message: 'Nome de usuário já existe' });

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(409).json({ message: 'E-mail já cadastrado' });

    // Como a senha será criptografada no 'pre save', não precisa fazer hash aqui
    const user = new User({ username, email, password });
    await user.save();

    return res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'E-mail e senha são necessários' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Login inválido' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Login inválido' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};