import MainLayout from "../layout/MainLayout";
import CreateUser from "../pages/CreateUser";
import Login from "../pages/Login";
import PackageDetails from "../pages/PackageDetails";
import Packages from "../pages/Packages";
import Register from "../pages/Register";
import UpdateUser from "../pages/UpdateUser";
import Users from "../pages/Users";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Users />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/update-user" element={<UpdateUser />} />
            <Route path="/buy-packages" element={<Packages />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/package-details" element={<PackageDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
