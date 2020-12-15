import React from 'react';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Home from '../components/home';

const Layout = (props) => {
	const path = props.location.pathname;
	return(
		<div>
      <Switch>
        <Route path="/" component={Home} />
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