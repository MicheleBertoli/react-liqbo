import Intl from 'intl';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import {i18nCursor} from './core/state';
import {loadFavouriteStores, loadFavouriteProducts} from './core/api/favourites-api';

const app = document.getElementById('root');

// Load favourites stored in IndexedDB
loadFavouriteStores();
loadFavouriteProducts();

Router.run(routes, (Handler) => {
  React.render(<Handler {...i18nCursor().toJS()} />, app)
});
