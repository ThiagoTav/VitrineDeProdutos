import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  preco: Number,
  imagemUrl: String,
});

export const Produto = mongoose.model('Produto', produtoSchema);