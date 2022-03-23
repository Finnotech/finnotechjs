import { v4 as uuidV4 } from 'uuid';

export const generateUUID = (): string => uuidV4();

export const convertBase64ToBlob = (fileBase64: string): Blob => {
	try {
		const splitDataURI = fileBase64.split(',');
		const byteString =
			splitDataURI[0].indexOf('base64') >= 0
				? Buffer.from(splitDataURI[1], 'base64').toString()
				: decodeURI(splitDataURI[1]);
		const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

		const ia = new Uint8Array(byteString.length);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], { type: mimeString });
	} catch (err) {
		console.error(err);
		throw new Error('error in converting base64 to Blob');
	}
};
