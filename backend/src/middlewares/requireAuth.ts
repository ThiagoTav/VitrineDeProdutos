import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ erro: 'Não autenticado' });
}