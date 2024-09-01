import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SignUp from "./pages/signup/SignUp";
import States from "./pages/states/States";
import StateDetail from "./components/StatesWidget/WidgetData/statedetail/StateDetail";
import Categories from "./pages/Categories/Categories";



function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route index element={<Home />} />
          <Route path="states" element={<States />} />
            <Route path="states/:stateName" element={<StateDetail />} />{" "}

            <Route path="categories" element={<Categories />} />
            <Route path="categories/:stateName" element={<StateDetail />} />{" "}

          <Route path="forgot-password" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              {/* <Route path=":userId" element={<Single />} /> */}
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="/user-detail" element={<Single />} />

            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>

        
      </BrowserRouter>
    </div>
  );
}

export default App;
