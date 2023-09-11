import express from 'express';
import cors from 'cors'
import { createPdf, PDF_STORE_PATH } from './pdf-creater';

export type CustomerInfo = {
  name: string;
  address: string;
  email: string;
}

const app = express();

app.use(cors())
app.use(express.json())

const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Welcome to Docflux!');
});

app.get('/download-pdf', (req, res) => {
  res.download(PDF_STORE_PATH + '/customer-info.pdf')
})

app.post('/create-pdf', (req, res) => {
  const customerInfo: CustomerInfo = req.body
  createPdf(customerInfo)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

