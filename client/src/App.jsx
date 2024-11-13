import MainLayout from "../layout/MainLayout";
import CreateUser from "../pages/CreateUser";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
