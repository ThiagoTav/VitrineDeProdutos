import { Request, Response } from 'express';

export function login(req: Request, res: Response) {
  const { usuario, senha } = req.body;
  if (usuario === 'admin' && senha === '1234') {
    req.session.user = { usuario };
    return res.json({ ok: true });
  }
  res.status(401).json({ erro: 'Credenciais inválidas' });
}

export function logout(req: Request, res: Response) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ erro: 'Logout falhou' });
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
}