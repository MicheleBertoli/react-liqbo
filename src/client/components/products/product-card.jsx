import React from 'react';
import Immutable from 'immutable';
import {addons} from 'react/addons';

require('../../../../assets/css/components/product-card.scss');

var notAvailableImg = require('../../../../assets/img/not-available.svg');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    product: React.PropTypes.instanceOf(Immutable.Map)
  },

  render() {
    const product = this.props.product;
    const productImg = product.get('image_thumb_url');

    return (
      <div className="product-card">
        <div className="media-object product-card--inner">
          <div className="media-object__figure product-card__image">
            <img src={ productImg ? productImg : notAvailableImg  } />
          </div>
          <div className="media-object__body">
            <div className="product-card__title">
              <strong>{ product.get('name') }</strong>
            </div>
            <div className="product-card__description">
              <div>{ product.get('package') }</div>
              <div>{ product.get('origin') }</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
