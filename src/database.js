import fs from 'node:fs/promises';
import path from 'node:path';

export class Database {
    constructor() {
        this.database = {};
        this.dbPath = path.resolve(process.cwd(), 'src/db.json');
        fs.readFile(this.dbPath, 'utf-8')
            .then(data => {
                this.database = JSON.parse(data);
            })
            .catch(() => {
                this.persist();
            });
    }

    persist() {
        fs.writeFile(this.dbPath, JSON.stringify(this.database, null, 2))
            .catch((err) => {
                console.error('Erro ao salvar o banco de dados:', err);
            });
    }

    select(table) {
        const data = this.database[table] || [];
        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data);
        } else {
            this.database[table] = [data];
        }

        this.persist();
        return data;
    }

    update(table, id, data) {
        const rowIndex = this.database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            this.database[table][rowIndex] = { id, ...data };
            this.persist();
        }
    }

        delete(table, id) {
        const rowIndex = this.database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) {
            this.database[table].splice(rowIndex, 1);
            this.persist();
        }
    }
}