/**
 * Search Invoice Container
 */

import React from 'react';
import {View, FlatList, Text, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import styles from './SearchInvoiceStyles';
import STARTUPACTIONS from '../Stores/Invoice/Actions';
import {Helpers} from '../Theme';
import SearchBarComponent from '../Components/searchBar';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {getInvoice, getInvoiceState} from '../Stores/Invoice/Selectors';
import InvoiceItem from '../Components/InvoiceItem';
import LoadingComponent from '../Components/loadingComponent';

class SearchInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '7066823',
      fromDate: '2019-01-13',
      toDate: moment(new Date()).format('YYYY-MM-DD'),
      pageNum: 1,
      pageSize: 10,
    };
    this.subscription = null;
  }

  componentDidMount() {
    this.subscription = this.props.navigation.addListener('focus', () => {
      const {dueDate} = this.props.route.params ? this.props.route.params : '';
      console.log('route', this.props.route);
      if (dueDate && dueDate != '') {
        this.props.clear();
        this.setState(
          {
            toDate: dueDate,
          },
          () => setTimeout(() => this.submit(), 1000),
        );
      } else {
        this.props.clear();
        setTimeout(() => this.submit(), 1000);
      }
    });
  }

  componentWillUnmount() {
    this.subscription();
  }

  submit = () => {
    var payload = {
      merchantReference: this.state.searchValue,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
    };
    this.props.searchInvoice(payload);
  };

  searchOnchange = (value) => {
    this.setState({
      searchValue: value,
    });
    console.log(value);
  };

  clearData = () => {
    this.setState({
      searchValue: '',
    });
    console.log(this.state.searchValue);
  };

  render() {
    console.log(this.state);
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View
            style={[
              styles.searchWrap,
              Platform.OS == 'android' ? {} : {marginTop: 30},
            ]}>
            <SearchBarComponent
              styleprop={styles.searchBarStyle}
              searchValue={this.state.searchValue}
              action={(value) => this.searchOnchange(value)}
              onClearAction={() => this.clearData()}
              submit={() => this.submit()}
            />
          </View>
          <View style={styles.dateWrap}>
            <View style={{flex: 1, marginLeft: 10}}>
              <DatePicker
                style={{width: 150}}
                date={this.state.fromDate}
                mode="date"
                placeholder="select from date"
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
                  this.setState({fromDate: date});
                  this.props.clear();
                  this.submit();
                }}
              />
            </View>

            <View style={{flex: 1, marginLeft: 50}}>
              <DatePicker
                style={{width: 150}}
                date={this.state.toDate}
                mode="date"
                placeholder="select to date"
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
                  this.setState({toDate: date});
                  this.props.clear();
                  this.submit();
                }}
              />
            </View>
          </View>

          {this.props.isloading && this.props.data.length == 0 ? (
            <LoadingComponent />
          ) : (
            <FlatList
              data={this.props.data ? this.props.data : []}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                if (item) {
                  return <InvoiceItem id={index} obj={item} />;
                }
                return null;
              }}
              onEndReachedThreshold={0.5}
              onEndReached={({distanceFromEnd}) => {
                {
                  if (!this.props.loading) {
                    this.setState(
                      {
                        pageNum: this.state.pageNum + 1,
                      },
                      () => this.submit(),
                    );
                  }
                }
              }}
              scrollEventThrottle={400}
            />
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  data: getInvoice(state),
  error: getInvoiceState(state).error,
  errorMessage: getInvoiceState(state).errorMessage,
  isloading: getInvoiceState(state).loading,
});

const mapDispatchToProps = (dispatch) => ({
  searchInvoice: (payload) => dispatch(STARTUPACTIONS.getInvoice(payload)),
  clear: () => dispatch(STARTUPACTIONS.clearData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchInvoice);
