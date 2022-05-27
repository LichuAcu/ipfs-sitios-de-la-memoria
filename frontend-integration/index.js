export async function uploadFile({ event, onRootCidReady, onStoredChunk, token }) {
	event.preventDefault();

	const files = event.target.files;

	const client = new Web3Storage({ token });

	const cid = await client.put(files, {
		onRootCidReady,
		onStoredChunk,
	});

	return cid;
}
