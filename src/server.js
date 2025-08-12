import http from 'node:http';

const users = [];
let nextId = 1;

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = undefined;
    }

    if (method === 'GET' && url === '/users') {
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        if (req.body && typeof req.body === 'object') {
            const { name, email } = req.body;

            if (!name || !email) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Nome e email são obrigatórios.' }));
            }

            users.push({
                id: nextId++,
                name,
                email,
            });

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