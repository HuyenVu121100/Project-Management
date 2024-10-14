import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginData from "./PostLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, Stack, TextField } from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer } from "react-toastify";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

const BodyStyle = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 3%;
`;

const ContainerStyle = styled.div`
	display: block;
	margin: 0 auto;
	margin-bottom: 10%;
	border: 1px solid #0d6efd;
	width: 360px;
	padding: 20px;
`;

interface LoginFormInputs {
	userNameOrEmailAddress: string;
	password: string;
	rememberClient: boolean;
}

const schema = yup.object({
	userNameOrEmailAddress: yup.string().required("Username or Email is required"),
	password: yup.string().required("Password is required"),
	rememberClient: yup.boolean().required()
});

const Login = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClickShowPassword = (): void => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
	};

	const { register, handleSubmit } = useForm<LoginFormInputs>({
		defaultValues: {
			userNameOrEmailAddress: "",
			password: "",
			rememberClient: false
		},
		resolver: yupResolver(schema)
	});

	const navigate = useNavigate();

	const onSubmit = async (data: LoginFormInputs): Promise<void> => {
		const { token, error } = await LoginData(data.userNameOrEmailAddress, data.password, data.rememberClient);
		if (typeof token === "string" && token.trim() !== "") {
			navigate("/home");
		} else {
			console.error("Error logging in:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<h1 className="h1" style={{ textAlign: "center" }}>
					Time-sheet
				</h1>
			</div>
			<BodyStyle>
				<ContainerStyle style={{ backgroundColor: "white" }}>
					<Stack spacing={3}>
						<p className="text" style={{ textAlign: "center", fontWeight: "500" }}>
							Login
						</p>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
							<TextField
								id="input-with-sxc"
								label="User name or email*"
								variant="standard"
								{...register("userNameOrEmailAddress")}
								style={{ width: "100%" }}
							/>
						</Box>

						<div style={{ display: "flex" }}>
							<FontAwesomeIcon
								icon={faLock}
								style={{
									position: "relative",
									top: 32,
									left: 5,
									paddingRight: "2%"
								}}
							/>
							<FormControl sx={{ m: 1, width: "100%" }} variant="standard" required>
								<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
								<Input
									{...register("password")}
									id="standard-adornment-password"
									type={showPassword ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
						<FormControlLabel control={<Checkbox {...register("rememberClient")} color="primary" />} label="Remember me" />

						<Button variant="contained" type="submit" style={{ marginTop: 20 }}>
							Login
						</Button>
						<Button variant="outlined">
							<FontAwesomeIcon icon={faGoogle} style={{ paddingRight: "5%" }} />
							Login With Google
						</Button>
						<p>2024 Timesheet. Version 4.3.0.0 20231608</p>
					</Stack>
				</ContainerStyle>
			</BodyStyle>
			<ToastContainer />
		</form>
	);
};

export default Login;
