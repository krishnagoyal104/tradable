import React from 'react';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../components/home';
import Explore from '../components/explore';
import Create from '../components/create';
import AssetView from '../components/assetView';
import Dashboard from '../components/dashboard';
import Trades from '../components/trades';
import DashboardAsset from '../components/dashboardAsset';

const Layout = (props) => {
	const path = props.location.pathname;
	return(
		<div>
			{path != '/' && <Navbar />}
      <Switch>
        <Route path="/" component={Home} exact />
				<Route path="/explore" component={Explore} />
				<Route path="/create" component={Create} />
				<Route path="/view" component={AssetView} />
				<Route path="/dashboard/asset/:id" component={DashboardAsset} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/asset/:id" component={AssetView} />
				<Route path="/trades" component={Trades} />
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