import { randomUUID } from 'node:crypto';
import { BuildRoutePath } from './utils/build-route-path.js';

export const Routes = [
    {
        method: 'GET',
        path: BuildRoutePath('/users'),
        handler: (req, res, database) => {
            const users = database.select('users');
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: BuildRoutePath('/users'),
        handler: (req, res, database) => {
            if (req.body && typeof req.body === 'object') {
                const { name, email } = req.body;

                if (!name || !email) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Nome e Email são obrigatórios.' }));
                }

                const user = {
                    id: randomUUID(),
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
    },
    {
        method: 'PUT',
        path: BuildRoutePath('/users/:id'),
        handler: (req, res, database) => {
            const { id } = req.params;
            if (!req.body || typeof req.body !== 'object') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Corpo da requisição inválido.' }));
}
            const { name, email } = req.body;

            database.update('users', id, { name, email });

            return res.writeHead(204).end();
        }
    },
    {
        method: 'DELETE',
        path: BuildRoutePath('/users/:id'),
        handler: (req, res, database) => {
            const { id } = req.params;

            database.delete('users', id);

            return res.writeHead(204).end();
        }
    }
];  