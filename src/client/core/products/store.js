import * as actions from './actions';
import Immutable from 'immutable';
import R from 'ramda';
import {productQueryCursor, productCursor, productDetailCursor, productAvailCursor} from '../state';
import {register} from '../dispatcher';
import {ProductItem} from './records';
import {LocatorItem} from '../locator/records';

export const dispatchToken = register(({action, data}) => {

  let query;

  switch (action) {

    /**
     * When the query input is modified
     */
    case actions.onProductsQueryChange:
      const {name, value} = data;
      productQueryCursor(query => query.set(name, value));
      break;

    /**
     * When a query option is modified
     */
    case actions.onProductsParamToggle:
      productQueryCursor(query => query.setIn(data.keyPath, data.value));
      break;

    /**
     * When the query response comes in, cast the response as an immutable
     * map and register the items as new records.
     */
    case actions.onProductsQuerySuccess:
      productCursor(products => {
        return products.withMutations(list => {
          list.clear();

          data.forEach(i => {
            list.push(new ProductItem(i).toMap());
          });
        });
      });
      break;

    case actions.onProductDetailQuerySuccess:
      var productItem = new ProductItem(data).toMap();

      productDetailCursor(product => product.merge(productItem));
      break;

    case actions.onProductAvailableQuerySuccess:
      console.log('onProductAvailableQuerySuccess', data);

      var id = data.id.toString();
      var obj = {};

      obj[id] = R.map(i => {
        return new LocatorItem(i).toMap();
      })(data.stores);

      productAvailCursor(products => {
        return products.mergeDeep(obj);
      });

      break;
  };
})

export function getNewQuery() {
  return productQueryCursor();
}

export function getProductQuery() {
  return productCursor();
}

export function getProductDetail() {
  return productDetailCursor();
}

export function getProductAvailability() {
  return productAvailCursor();
}
