import express from 'express';
import cors from 'cors'
import { createPdf, PDF_STORE_PATH } from './pdf-creater';
import { mockTemplates } from './mockData';
import { Template, OrderDto } from './types';

const app = express();

app.use(cors())
app.use(express.json())

const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Welcome to Docflux!');
});

app.get('/download-pdf', (req, res) => {
  res.download(PDF_STORE_PATH + '/contract.pdf')
})

app.get('/templates', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const templates: Template[] = mockTemplates
  res.send(JSON.stringify(templates))
})

app.post('/create-pdf', (req, res) => {
  const order: OrderDto = req.body
  createPdf(order)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

