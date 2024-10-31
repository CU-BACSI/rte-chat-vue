// server.ts
import express from "express";
import 'dotenv/config';
import ViteExpress from "vite-express";
import api from './server/api';

const app = express();
app.use(express.json())
app.use('/api', api)
const PORT = +(process.env.PORT || 3000);
ViteExpress.listen(app, PORT, () => console.log(`Server is listening on port ${PORT} ...`));
