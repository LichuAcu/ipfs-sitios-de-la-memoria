import fs from 'fs';
import https from 'https';

async function download() {
	fs.readFile('files.txt', 'utf-8', async function (err, data) {
		const arr = data.split('\r\n');

		for (const fileInfo of arr) {
			https.get(fileInfo, async response => {
				const name = fileInfo.split('/').pop();
				const fileStream = fs.createWriteStream('./files/' + name);
				response.pipe(fileStream);
			});
		}
	});
}

download();
