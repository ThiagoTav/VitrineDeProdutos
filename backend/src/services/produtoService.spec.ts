jest.setTimeout(30_000);

import mongoose from 'mongoose';
import { Produto } from '../models/produtoModel';

describe('Produto Model (Mongoose)', () => {
  beforeAll(async () => {
    // 2) pega MONGO_URL do .env (docker-compose injeta em process.env)
    const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/vitrine';
    await mongoose.connect(mongoUrl);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('deve ter pelo menos um documento no banco', async () => {
    const count = await Produto.countDocuments();
    expect(count).toBeGreaterThan(0);
  });

  it('deve encontrar um documento por _id', async () => {
    const first = await Produto.findOne();
    expect(first).not.toBeNull();

    const found = await Produto.findById(first!._id);
    expect(found).not.toBeNull();
    expect(found!._id.toString()).toBe(first!._id.toString());
  });
});