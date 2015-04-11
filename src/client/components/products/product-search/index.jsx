import React from 'react';
import Immutable from 'immutable';
import {IntlMixin} from 'react-intl';
import {addons} from 'react/addons';
import LoadingButton from '../../ui/loading-button';
import {onProductsQuerySubmit, onProductsQueryChange} from '../../../core/products/actions';

export default React.createClass({
  mixins: [addons.PureRenderMixin, IntlMixin],

  propTypes: {
    query: React.PropTypes.instanceOf(Immutable.Map),
    status: React.PropTypes.instanceOf(Immutable.Map)
  },

  onSubmit(e) {
    e.preventDefault();
    onProductsQuerySubmit(this.props.query.get('q'), this.props.location);
  },

  onKeyDown(e) {
    if (e.key == 'Enter') {
      onProductsQuerySubmit(this.props.query.get('q'), this.props.location);
    }
  },

  onChange(e) {
    e.persist();
    onProductsQueryChange(e, this.props.location);
  },

  render() {
    const status = this.props.status;

    var isLoading = status.get('isQuerying');

    return (
      <form className="search-list__input" noValidate onSubmit={ this.onSubmit }>
        <input
          autoFocus
          className="u-full-width"
          name="q"
          type="text"
          onChange={ this.onChange }
          placeholder={ this.getIntlMessage('products.searchText') }
          value={this.props.query.get('q')}
        />
        <LoadingButton isLoading={ isLoading }>
          Search
        </LoadingButton>
      </form>
    );
  }
});