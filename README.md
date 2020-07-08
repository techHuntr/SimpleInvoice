# SimpleInvoice


Simple Invoice app is built using react-native CLI a frame work to build native  application's using javascript. 
This application consist of two tabs which demonstrate search and filter functionalities as well as a create invoice functionality. 

# Architecture

The application is built following certain reactive best practices. The application state is managed used Redux also Redux Saga is used to manage
SideEffects as well as predefined logics. Also this application follows a layer based approach service layer and presentation layer are two major 
components of this architecture. Below diagram demonstrate the redux saga pattern


![alt text](https://github.com/techHuntr/SimpleInvoice/blob/master/c8bdd0125500d0c7569a0a8040058aff.jpg?raw=true)


# Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start:

`react-native run-android`  
`react-native run-ios`  
