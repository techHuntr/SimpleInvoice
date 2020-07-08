/**
 * Root Screen
 * Author Arafath Misree
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from './Services/NavigationService';
import Snackbar from 'react-native-snackbar';

import appNavigator from './Navigators/AppStack';
import {Helpers} from './Theme';
import STARTUPACTIONS from './Stores/Invoice/Actions';
import {getInvoiceState} from './Stores/Invoice/Selectors';

const RootStack = createStackNavigator();

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.getToken();
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.error) {
      Snackbar.show({
        text: nextprops.errorMessage,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    } else if (nextprops.successMessage) {
      Snackbar.show({
        text: nextprops.successMessage,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
      });
    }
    console.log('props', nextprops);
  }

  render() {
    return (
      <View style={Helpers.fill}>
        <NavigationContainer
          ref={(nav) => {
            this.navigator = nav;
            NavigationService.setTopLevelNavigator(nav);
          }}>
          <RootStack.Navigator initialRouteName="appStack">
            <RootStack.Screen
              name="appStack"
              component={appNavigator}
              options={({route, navigation}) => ({header: () => {}})}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
};

const mapStateToProps = (state) => ({
  error: getInvoiceState(state).error,
  errorMessage: getInvoiceState(state).errorMessage,
  successMessage: getInvoiceState(state).successMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(STARTUPACTIONS.fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
