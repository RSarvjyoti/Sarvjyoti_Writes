import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { MyHeader } from "./components/MyHeader";
import MyFooter from "./components/MyFooter";

function App() {
  return (
    <>
      <MyHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <MyFooter />
    </>
  );
}

export default App;
