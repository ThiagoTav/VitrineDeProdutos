import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import produtoRoutes from './produtoRoutes';
import { conectarMongoDB } from '../config/db';

describe('API Produtos', () => {
  const app = express();
  app.use(express.json());
  app.use('/produtos', produtoRoutes);

  beforeAll(async () => {
    // conecta ao MongoDB usando variável de ambiente ou padrão apontando para o container 'mongo'
    await conectarMongoDB();
  });

  afterAll(async () => {
    // desconecta do MongoDB
    await mongoose.disconnect();
  });

  it('GET /produtos deve retornar lista de produtos e GET /produtos/:id deve retornar detalhes de um produto', async () => {
    // 1. Consulta todos os produtos
    const resAll = await request(app).get('/produtos');
    expect(resAll.status).toBe(200);
    expect(Array.isArray(resAll.body)).toBe(true);
    expect(resAll.body.length).toBeGreaterThan(0);

    // 2. Seleciona o primeiro ID (mongo usa _id)
    const first = resAll.body[0];
    const id = first._id || first.id;
    expect(id).toBeDefined();

    // 3. Consulta detalhes do produto
    const resOne = await request(app).get(`/produtos/${id}`);
    expect(resOne.status).toBe(200);
    expect(resOne.body).toMatchObject({
      nome: expect.any(String),
      descricao: expect.any(String),
      preco: expect.any(Number),
      imagemUrl: expect.any(String),
    });
  }, 30000); // timeout ampliado para 30s
});