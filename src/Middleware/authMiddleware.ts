import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2 || !partes[1]) {
    return res.status(401).json({ erro: 'Formato de token inválido.' });
  }

  const token = partes[1];
  const secret = "sua_chave_secreta_aqui";

  try {
    const decoded = verify(token, secret);
    (req as any).user = decoded; 
    
    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};