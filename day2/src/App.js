import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import Home from "./components/home";
import ResDetails from "./components/res_details";
export default function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div style={{ paddingTop: "10vh" }}>
          <Switch>
            <Route path="/res_details/:id" component={ResDetails} />
            <Route path="/:ent_id/:ent_type" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
