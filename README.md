# AdvancedRedux
** NOTES **

In this demo application I dive a little deeper into Redux and Redux Toolkit. Specifically how to use async functions and effects, and how to fetch and handle data from a backend using Redux. There are a couple ways to implement these types of functions in a React Redux app, in this example I do the in component approach first and then change it to the Custom Action Creator approach and left notes for both. The reason for these methods is the fact that you cant use async methods or any effects in reducers, so you could put the logic in another component or write custom action components that can be stored with the reducer logic. I went with the Custom Actions because it allows for slimmer components, you can also seperate the code a little bit to make it cleaner as I did taking the fetching logic out of the cart-slice.js and moving it into a new cart-actions.js file.


# Installation 
You can copy this repository and install the packages with npm i to use this application with npm start and look through the notes to help clarify processes.
