import express from 'express';
import cors from 'cors';
import juegosRouter from './Routes/juegos.js';
import authRouter from './Routes/auth.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/juegos', juegosRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});