import express from 'express';
import cors from 'cors'
import { createPdf, PDF_STORE_PATH } from './pdf-creater';

export type CustomerInfo = {
  name: string;
  address: string;
  email: string;
}

type Template = {
  uuid: string;
  title: string;
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

app.get('/templates', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const templates: Template[] = [ 
    { uuid: "1111", title: 'Private Customers 2023 - Finnish' },
    { uuid: "2222", title: 'Corporate Customers 2023 - Finnish' }
  ]
  res.send(JSON.stringify(templates))
})



app.post('/create-pdf', (req, res) => {
  const customerInfo: CustomerInfo = req.body
  createPdf(customerInfo)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

