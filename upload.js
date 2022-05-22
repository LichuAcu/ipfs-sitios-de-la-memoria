import process from 'process';
import fs from 'fs';
import https from 'https';
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { config } from 'dotenv';

config();

async function main() {
	const token = process.env.WEB3_STORAGE_TOKEN;

	const storage = new Web3Storage({ token });

	fs.readFile('files.txt', 'utf-8', async function (err, data) {
		const arr = data.split('\r\n');

		for (const file of [arr[4]]) {
			https.get(file, async response => {
				const file = fs.createWriteStream('data.pdf');
				const stream = response.pipe(file);

				stream.on('finish', async function () {
					const pathFiles = await getFilesFromPath('data.pdf');

					console.log(`Uploading ${pathFiles.length} files`);
					const cid = await storage.put(pathFiles);
					console.log('Content added with CID:', cid);

					fs.unlinkSync('data.pdf');
				});
			});
		}
	});
}

main();
