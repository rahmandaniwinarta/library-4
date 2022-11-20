import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { LayOut } from "./components/LayOut";
import { VerifiedPage } from "./pages/VerifiedPage";
import Axios from "axios";
//setup react
import { useEffect } from "react";

//setup redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/lib/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);

      dispatch(
        login({
          NIM: res.data.NIM,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  });

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification/:token" element={<VerifiedPage />} />
      </Routes>
    </div>
  );
}

export default App;
