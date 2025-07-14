import { produtos } from '../models/produtoModel';
import { Produto } from '../types/produto';

export function getAll(): Produto[] {
  return produtos;
}

export function getById(id: number): Produto | undefined {
  return produtos.find(p => p.id === id);
}