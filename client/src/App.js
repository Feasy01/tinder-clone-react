import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
function App() {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const authToken = cookies.AuthToken;
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				{authToken && <Route path="/dashboard" element={<Dashboard />}></Route>}
				{authToken && (
					<Route path="/onboarding" element={<Onboarding />}></Route>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
