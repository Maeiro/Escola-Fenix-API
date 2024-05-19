const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const backendUrl = 'https://escola-fenix-backend-f552677f1c3c.herokuapp.com';

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/alunos', (req, res) => {
  fetch(`${backendUrl}/alunos`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erro ao buscar alunos');
    });
});

app.post('/alunos', (req, res) => {
  const aluno = req.body;
  fetch(`${backendUrl}/alunos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aluno)
  })
    .then(() => res.send('Aluno adicionado'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erro ao adicionar aluno');
    });
});

app.put('/alunos/:id', (req, res) => {
  const id = req.params.id;
  const aluno = req.body;
  fetch(`${backendUrl}/alunos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aluno)
  })
    .then(() => res.send('Aluno atualizado'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erro ao atualizar aluno');
    });
});

app.delete('/alunos/:id', (req, res) => {
  const id = req.params.id;
  fetch(`${backendUrl}/alunos/${id}`, {
    method: 'DELETE'
  })
    .then(() => res.send('Aluno removido'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Erro ao remover aluno');
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
