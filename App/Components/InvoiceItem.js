/**
 * Item Invoice List view
 */
import React from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Colors} from '../Theme';

export default class InvoiceItem extends React.Component {
  render() {
    return (
      <Card title="INVOICE">
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text>ID : {this.props.obj.invoiceId}</Text>
          <Text>
            Amount : {this.props.obj.currency} {this.props.obj.totalAmount}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around',marginTop : 10}}>
          <Text>DueDate : {this.props.obj.dueDate}</Text>
      
        </View>
      </Card>
    );
  }
}

InvoiceItem.propTypes = {
  obj: PropTypes.object,
};
