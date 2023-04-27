import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { Provider, connect } from "react-redux";
import Store from "./redux/app/Store";
import Home from "./components/Home";
import Header from "./components/Header";
import { getUserAuth } from "./redux/actions/index";
import { useEffect } from "react";
import RequireAuthProtectRoutes from "./components/RequireAuthProtectRoutes";
const App = (props) => {
  useEffect(() => {
    props.getUserAuth();
  }, []);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireAuthProtectRoutes>
                <Header />
                <Home />
              </RequireAuthProtectRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispachToProps = (dispach) => {
  return {
    getUserAuth: () => dispach(getUserAuth()),
  };
};

export default connect(mapStateToProps, mapDispachToProps)(App);
