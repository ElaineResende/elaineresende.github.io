import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import { customHistory } from './HistoryConfig';

import { Layout } from '../ui/layout/Layout';
import TpMain, { Todos } from '../ui/TpMain';
import NotFound from '../ui/NotFound';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './AxiosConfig';
import Graficos4 from '../graficos/Graficos4';

const newTheme = createMuiTheme();

const renderLayout = Componente => (props) => {
  const elemento = (<Componente params={props.match.params} {...props} />);
  return (
    <Layout {...props}>
      {elemento}
    </Layout>
  );
};

const Routes = () => (
  <MuiThemeProvider theme={newTheme}>
    <Router history={customHistory}>
      <Switch>
        <Route exact path="/" render={renderLayout(TpMain)} />
        <Route path="/todos" render={renderLayout(Todos)} />
        <Route path="/grafico" render={renderLayout(Graficos4)} />
        <Route path="/dashboard" render={renderLayout(NotFound)} />

        <Route render={renderLayout(NotFound)} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
