/**
 * Search bar prop dependant
 */
import React from 'react';
import {} from 'react-native';
import {SearchBar} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Colors} from '../Theme';

export default class SearchBarComponent extends React.Component {
  render() {
    return (
      <SearchBar
        containerStyle={this.props.styleprop}
        placeholder="Search From  ID..."
        onChangeText={this.props.action.bind(this)}
        value={this.props.searchValue}
        inputContainerStyle={{color: Colors.transparent}}
        inputStyle={{color: Colors.white, fontSize: 15}}
        onClear={this.props.onClearAction.bind(this)}
        onSubmitEditing={this.props.submit.bind(this)}
      />
    );
  }
}

SearchBarComponent.propTypes = {
  searchValue: PropTypes.string,
  action: PropTypes.func,
  styleprop: PropTypes.object,
  onClearAction: PropTypes.func,
  submit: PropTypes.func,
};
