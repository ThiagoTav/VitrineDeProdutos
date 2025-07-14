import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // ← carrega variáveis do .env

export async function conectarMongoDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error('❌ Variável de ambiente MONGO_URL não definida');
    }

    await mongoose.connect(mongoUrl);
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error);
  }
}