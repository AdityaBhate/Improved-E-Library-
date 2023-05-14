import { useEffect } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles.scss";
import PageNotFound from "./pages/PageNotFound";

function App() {
	const queryClient = new QueryClient();

	const authorizeUser = () => {
		let cookies = Cookies.get();
		if (cookies.User) {
			return true;
		} else {
			return false;
		}
	};

	const adminAccess = () => {
		let cookies = Cookies.get();
		if (cookies.Role === "admin") {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/auth' element={<Auth />} />
					<Route
						path='/search'
						element={authorizeUser() ? <Search /> : <Auth />}
					/>
					<Route
						path='/upload'
						element={adminAccess() ? <Upload /> : <Auth />}
					/>
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</QueryClientProvider>
		</>
	);
}

export default App;
