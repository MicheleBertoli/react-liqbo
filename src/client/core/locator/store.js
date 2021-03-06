import * as actions from './actions';
import Immutable from 'immutable';
import {locatorQueryCursor, locatorDetailCursor, locatorCursor, mapFocusCursor, userLocationCursor} from '../state';
import {register} from '../dispatcher';
import {LocatorItem, LocatorCoordinates, UserGeoLocation} from './records';

export const dispatchToken = register(({action, data}) => {

  let query;

  switch (action) {

    /**
     * When the query input is modified
     */
    case actions.onLocatorQueryChange:
      const {name, value} = data;
      console.log(data);

      locatorQueryCursor(query => query.set(name, value));
      break;

    /**
     * When a query option is modified
     */
    case actions.onLocatorParamToggle:
      locatorQueryCursor(query => query.setIn(data.keyPath, data.value));
      break;

    /**
     * When the query response comes in, cast the response as an immutable
     * map and register the items as new records.
     */
    case actions.onLocatorQuerySuccess:
      locatorCursor(locations => {
        return locations.withMutations(list => {
          list.clear();

          data.forEach(i => {
            list.push(new LocatorItem(i).toMap());
          });
        });
      });
      break;

    case actions.onLocatorDetailQuerySuccess:
      console.log('onLocatorDetailQuerySuccess', data);
      var locationDetail = new LocatorItem(data).toMap();

      locatorDetailCursor(location => location.merge(locationDetail));
      break;

    case actions.onMapFocus:
      mapFocusCursor(focus => {
        return focus.withMutations(list => {
          list.clear();

          data.forEach(i => {
            list.push(new LocatorCoordinates(i).toMap());
          });
        });
      });
      break;

    case actions.onGeoLocationSuccess:
      userLocationCursor(location => {
        return new UserGeoLocation(data.coords).toMap();
      });
      break;
  };
})

export function getNewQuery() {
  return locatorQueryCursor();
}

export function getActiveQueryParams() {
  return locatorQueryCursor()
          .get('where')
          .filter(val => val === true);
}

export function getLocatorQuery() {
  return locatorCursor();
}

export function getLocatorDetail() {
  return locatorDetailCursor();
}

export function getMapFocus() {
  return mapFocusCursor();
}

export function getUserLocation() {
  return userLocationCursor();
}
