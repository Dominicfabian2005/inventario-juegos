import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM juegos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre, plataforma, genero, anio, estado } = req.body;
  db.query(
    'INSERT INTO juegos (nombre, plataforma, genero, anio, estado) VALUES (?, ?, ?, ?, ?)',
    [nombre, plataforma, genero, anio, estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nombre, plataforma, genero, anio, estado });
    }
  );
});

router.put('/:id', (req, res) => {
  const { nombre, plataforma, genero, anio, estado } = req.body;
  db.query(
    'UPDATE juegos SET nombre=?, plataforma=?, genero=?, anio=?, estado=? WHERE id=?',
    [nombre, plataforma, genero, anio, estado, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Juego actualizado' });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM juegos WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Juego eliminado' });
  });
});

export default router;