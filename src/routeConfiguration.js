import React from "react";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import Home from "./containers/Home/Home";

const routeConfiguration = () => {
	return [
		{
			name: "ForgotPassword",
			path: "/forgot-password",
			component: (props) => <ForgotPassword {...props} />,
		},
		{
			name: "Login",
			path: "/login",
			component: (props) => <Login {...props} />,
		},
		{
			name: "Signup",
			path: "/signup",
			component: (props) => <Signup {...props} />,
		},
		{
			name: "Home",
			path: "/",
			component: (props) => <Home {...props} />,
			auth: true,
		},
	];
};

export default routeConfiguration;
