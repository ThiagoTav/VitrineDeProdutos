import mongoose from 'mongoose';
import { Produto } from '../models/produtoModel';

describe('Produto Model (Mongoose)', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/vitrine');
  });

  afterAll(async () => {
    await mongoose.disconnect();    // ← fecha a conexão
  });

  it('deve ter pelo menos um documento no banco', async () => {
    const count = await Produto.countDocuments();
    expect(count).toBeGreaterThan(0);
  });

  it('deve encontrar um documento por _id', async () => {
    const first = await Produto.findOne();
    const found = await Produto.findById(first!._id);
    expect(found).not.toBeNull();
    expect(found!._id.toString()).toBe(first!._id.toString());
  });
});