import { toast } from "react-toastify";
import { API_END_POINT } from "../../api/ApiEndPoint";
import instance from "../../config/AxiousConfig";

interface LoginResponse {
	token: string | null;
	error: string | null;
}

const LoginData = async (userNameOrEmailAddress: string, password: string, rememberClient: boolean): Promise<LoginResponse> => {
	const postData = {
		userNameOrEmailAddress,
		password,
		rememberClient
	};

	try {
		const response = await instance.post(API_END_POINT.API_LOGIN, postData);
		const token = response.data.result.accessToken ?? null;
		localStorage.setItem("token", token);

		return { token, error: null };
	} catch (error: unknown) {
		let errorMessage: string = "Something went wrong";
		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (isAxiosError(error)) {
			errorMessage = error.response?.data?.error?.details ?? errorMessage;
		}

		toast.error(errorMessage);
		return { token: null, error: errorMessage };
	}
};

function isAxiosError(error: unknown): error is { response?: { data?: { error?: { details?: string } } } } {
	return typeof error === "object" && error !== null && "response" in error;
}

export default LoginData;
