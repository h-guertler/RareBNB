import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
// import * as spotsActions from "./store/spots";
import Navigation from "./components/Navigation";
import SpotsGrid from "./components/SpotsGrid";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpotForm from "./components/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/spots/new">
          <CreateSpot/>
        </Route>
        <Route exact path="/spots/current">
          <ManageSpots/>
        </Route>
        <Route path="/spots/:spotId/edit">
          <UpdateSpotForm />
        </Route>
        <Route exact path="/spots/:spotId">
          <SpotDetails />
        </Route>
        <Route exact path="/">
          <SpotsGrid />
        </Route>
        <Route>
          <h1>404 Page Not Found</h1>
        </Route>
        </Switch>}
    </>
  );
}

export default App;
