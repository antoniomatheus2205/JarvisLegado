const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const corretorRoutes = require('./routes/corretorRoutes');
app.use('/corretor', corretorRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
