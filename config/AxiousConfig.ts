import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("token") ?? "";
		if (token !== "") {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	async (error) => {
		return await Promise.reject(error);
	}
);

export default instance;
