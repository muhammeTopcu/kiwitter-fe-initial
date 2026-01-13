import "./App.css";
import { Switch, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Login from "./components/body/Login";
import Signup from "./components/body/Signup";
import Header from "./components/headers/Header";
import { UserContextProvider } from "./context/UserContextProvider";
import PrivateRoute from "./private/PrivateRoute";

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
            <PageLayout>Home</PageLayout>
          </Route>
          <Route path="/profile/:nick">
            <PageLayout>Profile page</PageLayout>
          </Route>
          <PrivateRoute path="/detail/:twitId">
            <PageLayout>Twit detail</PageLayout>
          </PrivateRoute>
        </Switch>
      </UserContextProvider>
    </div>
  );
}

export default App;
