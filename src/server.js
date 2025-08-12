import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database();

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    if (method === 'GET' && url === '/users') {
        const users = database.select('users');

        res.setHeader('Content-Type', 'application/json');
        return res
        .end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        if (req.body && typeof req.body === 'object') {
            const { name, email } = req.body;

            if (!name || !email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Nome e email são obrigatórios.' }));
            }

            const user = {
                id: 1,
                name,
                email,
            };

            database.insert('users', user);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Usuário criado com sucesso.' }));
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Corpo da requisição inválido.' }));
        }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(3333);