import "./App.css";
import Footer from "./component/Footer";
import Navbar from "./component/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./component/SignUp";
import PrivateComponent from "./component/PrivateComponent";
import Login from "./component/Login";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<h1>product listing component</h1>} />
              <Route path="/add" element={<h1>product adding component</h1>} />
              <Route
                path="/update"
                element={<h1>product updating component</h1>}
              />
              <Route path="/logout" element={<h1>logout component</h1>} />
              <Route path="/profile" element={<h1>profile component</h1>} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
