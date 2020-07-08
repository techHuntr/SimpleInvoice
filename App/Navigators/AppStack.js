import React from 'react';
import IconIvoice from 'react-native-vector-icons/MaterialCommunityIcons';
import IconSearch from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InvoiceCreate from '../Containers/InvoiceCreate';
import SearchInvoice from '../Containers/SearchInvoice';
import {Colors} from '../Theme';

//Navigation Stack

let createInvoiceStack = createStackNavigator();

function invoiceStackNavigator() {
  return (
    <createInvoiceStack.Navigator>
      <createInvoiceStack.Screen
        name="createInvoice"
        component={InvoiceCreate}
      
      />
    </createInvoiceStack.Navigator>
  );
}

let searchinvoiceStack = createStackNavigator();

function searchinvoiceStackNavigator() {
  return (
    <searchinvoiceStack.Navigator>
      <searchinvoiceStack.Screen
        name="searchInvoice"
        component={SearchInvoice}
      />
    </searchinvoiceStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function appNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: 'black',
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={searchinvoiceStackNavigator}
        options={({route}) => {
          return {
            tabBarIcon: ({tintColor, focused}) => (
              <IconIvoice
                name={'file-multiple'}
                style={{color: focused ? Colors.gray : Colors.white}}
                size={25}
              />
            ),

            tabBarVisible: this.getTabBarVisibility(route),
          };
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={invoiceStackNavigator}
        options={({route}) => {
          return {
            tabBarIcon: ({tintColor, focused}) => (
              <IconSearch
                name={'file-document-edit'}
                style={{color: focused ? Colors.gray : Colors.white}}
                size={25}
              />
            ),

            tabBarVisible: this.getTabBarVisibility(route),
          };
        }}
      />
    </Tab.Navigator>
  );
}

getTabBarVisibility = (route) => {
  if (route.state && route.state.routes.length > 1) {
    return false;
  } else {
    return true;
  }
};
