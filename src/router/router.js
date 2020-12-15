import React from 'react';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../components/home';
import Explore from '../components/explore';
import Create from '../components/create';

const Layout = (props) => {
	const path = props.location.pathname;
	return(
		<div>
			{path != '/' && <Navbar />}
      <Switch>
        <Route path="/" component={Home} exact />
				<Route path="/explore" component={Explore} />
				<Route path="/create" component={Create} />
      </Switch>
		</div>
	);
}

const App = withRouter(Layout);

const AppRouter = () => (
  <BrowserRouter>
  	<App />
  </BrowserRouter>
);

export default AppRouter;