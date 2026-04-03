import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const SECRET = 'inventario_secret_key_2024';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  db.query('SELECT * FROM usuarios WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const usuario = results[0];
      const token = jwt.sign(
        { id: usuario.id, username: usuario.username },
        SECRET,
        { expiresIn: '2h' }
      );

      res.json({ token, username: usuario.username });
    }
  );
});

router.post('/logout', (req, res) => {
  res.json({ mensaje: 'Sesión cerrada' });
});

export default router;