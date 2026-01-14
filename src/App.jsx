import "./App.css";
import { Switch, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Login from "./components/body/Login";
import Signup from "./components/body/Signup";
import Header from "./components/headers/Header";
import { UserContextProvider } from "./components/context/UserContextProvider";
import PrivateRoute from "./components/private/PrivateRoute";
import UserTwits from "./components/body/UserTwits";
import HomePage from "./components/body/HomePage";
import TwitDetail from "./components/body/TwitDetail";

function App() {
  return (
    <div className="relative">
      <UserContextProvider>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/profile/:nickname">
            <UserTwits />
          </Route>
          <PrivateRoute path="/detail/:twitId">
            <TwitDetail />
          </PrivateRoute>
        </Switch>
      </UserContextProvider>
    </div>
  );
}

export default App;
