import { Readable } from 'node:stream';

class OneToHoundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 5) {
                this.push(null);
                return;
            }

            const buf = Buffer.from(String(i));
            this.push(buf);
        }, 1000);
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHoundredStream(),
    duplex: 'half',
}).then(response => {
    response.text().then(data => {
        console.log(data);
    });
});