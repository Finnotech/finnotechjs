import axios from 'axios';

const BASE_URL = 'https://apibeta.finnotech.ir';
const SAND_BOX_BASE_URL = 'https://sandboxapi.finnotech.ir';

export default (options: { useSandBox: boolean }) => {
	const customAxios = axios.create({
		baseURL: options.useSandBox ? SAND_BOX_BASE_URL : BASE_URL,
	});

	return customAxios;
};
