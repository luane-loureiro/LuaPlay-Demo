require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conexão com MongoDB Atlas estabelecida!");
  process.exit(0);
})
.catch(err => {
  console.error("Erro ao conectar:", err);
  process.exit(1);
});