import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import produtoRoutes from './produtoRoutes';
import { conectarMongoDB } from '../config/db';
import { Produto } from '../models/produtoModel';

const app = express();
app.use(express.json());
app.use('/produtos', produtoRoutes);

beforeAll(async () => {
  await conectarMongoDB();
});

afterAll(async () => {
  await mongoose.disconnect();   // ← fecha a conexão
});

describe('GET /produtos', () => {
  it('retorna 200 e lista de produtos', async () => {
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /produtos/:id', () => {
  let sampleId: string;

  beforeAll(async () => {
    const first = await Produto.findOne();
    sampleId = first!._id.toString();
  });

  it('retorna 200 para _id válido', async () => {
    const res = await request(app).get(`/produtos/${sampleId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', sampleId);
  });

  it('retorna 400 para _id malformado', async () => {
    const res = await request(app).get('/produtos/1234');  
    expect(res.status).toBe(400);
  });

  it('retorna 404 para _id bem-formado mas inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/produtos/${fakeId}`);
    expect(res.status).toBe(404);
  });
});