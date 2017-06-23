import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import YourComponent from './components/YourComponent';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route exact path='/yourComponent' component={ YourComponent } />
</Layout>;
