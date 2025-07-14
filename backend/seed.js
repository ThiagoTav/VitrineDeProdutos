const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://vitrine-mongodb:27017/vitrine';

const produtoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  preco: Number,
  imagemUrl: String,
});

const Produto = mongoose.model('Produto', produtoSchema);

async function seed() {
  await mongoose.connect(MONGO_URI);
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/produtos.json'), 'utf-8'));

  await Produto.deleteMany({});
  await Produto.insertMany(data);

  console.log('Banco populado com sucesso!');
  await mongoose.disconnect();
}

seed();