import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/LoginPage";
import ProtectRouter from "./router/ProjectRouter";
import AllProject from "./feature/ShowProject/AllProject";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./page/404";

function App(): JSX.Element {
	return (
		<>
			<Router>
				<Routes>
					<Route path="error" element={<ErrorPage />} />
					<Route path="/" element={<Login />} />
					<Route
						path="/home"
						element={
							<ProtectRouter>
								<Home />
							</ProtectRouter>
						}
					>
						<Route path="project" element={<AllProject />} />
					</Route>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
