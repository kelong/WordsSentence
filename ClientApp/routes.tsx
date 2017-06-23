import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import ComponentWithModal from './components/ComponentWithModal';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route exact path='/modal' component={ ComponentWithModal } />
</Layout>;
