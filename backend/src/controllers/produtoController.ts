import { Request, Response } from 'express';
import * as service from '../services/produtoService';

export function listar(req: Request, res: Response) {
  res.json(service.getAll());
}

export function buscarPorId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const produto = service.getById(id);
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  res.json(produto);
}