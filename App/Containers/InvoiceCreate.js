/**
 * Create Invoice Container
 */
import React from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import styles from './SearchInvoiceStyles';
import {Colors} from '../Theme';
import {Input, Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import STARTUPACTIONS from '../Stores/Invoice/Actions';
import NavigationService from '../Services/NavigationService';

class InvoiceCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: moment(new Date()).format('YYYY-MM-DD'),
      invReference: '',
      description: '',
      amount: null,
    };
  }

  createInvoice = () => {
    console.log(this.state);
    if (
      this.state.invReference == '' ||
      this.state.invReference == null ||
      this.state.amount == null ||
      this.state.description == ''
    )
      return;
    var payload = {
      listOfInvoices: [
        {
          merchant: {
            merchantReference: '7066823',
            contact: {
              id: '569809',
              email: 'dung@101digital.io',
            },
          },
          invoiceReference: this.state.invReference,
          currency: 'GBP',
          invoiceDate: '2020-04-27',
          transactionDate: '2020-04-27',
          dueDate: this.state.dueDate,
          settlementDate: '2020-05-15',
          items: [
            {
              itemReference: 'YRC0001',
              description: this.state.description,
              quantity: 1,
              taxId: '2',
              amount: Number.parseInt(this.state.amount, 10),
            },
          ],
        },
      ],
    };
    this.props.createInvoice(payload);
    var date = this.state.dueDate;

    this.props.navigation.navigate('Home', {
      screen: 'searchInvoice',
      params: {dueDate: date},
    });
    setTimeout(
      () =>
        this.setState({
          dueDate: moment(new Date()).format('YYYY-MM-DD'),
          invReference: '',
          description: '',
          amount: null,
        }),
      2000,
    );
  };
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: 'black',
              width: '100%',
              height: 50,
              elevation: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.white,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Create Invoice
            </Text>
          </View>

          <View style={{marginTop: 40, flex: 1}}>
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <DatePicker
                style={{width: 150}}
                date={this.state.dueDate}
                mode="date"
                placeholder="select due date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({dueDate: date});
                }}
              />
            </View>
            <Input
              placeholder="Invoice  Reference"
              value={this.state.invReference}
              onChangeText={(text) => this.setState({invReference: text})}
            />
            <Input
              placeholder="Invoice  Description"
              value={this.state.description}
              onChangeText={(text) => this.setState({description: text})}
            />
            <Input
              placeholder="Invoice  Amount"
              value={this.state.amount}
              onChangeText={(text) => this.setState({amount: text})}
            />
            <View style={{alignItems: 'flex-end', marginRight: 10}}>
              <Button
                title="Create"
                onPress={() => this.createInvoice()}
                containerStyle={{width: 200, height: 50}}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  createInvoice: (payload) => dispatch(STARTUPACTIONS.createInvoice(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceCreate);
