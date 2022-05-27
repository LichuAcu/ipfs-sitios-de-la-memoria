import process from 'process';
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { config } from 'dotenv';

config();

async function main() {
	const token = process.env.WEB3_STORAGE_TOKEN;

	const storage = new Web3Storage({ token });

	const files = await getFilesFromPath('./files');

	const cid = await storage.put(files, { wrapWithDirectory: false });
	return cid;
}

main();
