import {createSlice} from '@reduxjs/toolkit';

import {uiActions} from './ui-slice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
//if the item is not in cart add a new item object 
            if (!existingItem) {
                state.items.push({
                id: newItem.id,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
                name: newItem.title
                });
            }
//else add the quantity to the existing item and update the price 
            else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
//grab the id being passed in when called and put it in a 'id' const 
            const id = action.payload;
//find the existing item where its ID matches the id being grabbed from the payload ^
            const existingItem = state.items.find(item => item.id === id);
            state.quantity--;
//if there is only one of the item in question then filter it out
            if (existingItem.quantity === 1) {
//this filter will return only the items that have an id that doesnt match the id in question
                state.items = state.items.filter(item => item.id !== id)
//if the items qty is more than 1 then decrement its quantity adn update the price
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});


//Custom Action Creator 
//function that returns another function so that you can use async code 
export const sendCartData = (cart) => {
    return async (dispatch) => {
// the dispatch functions set the showNotification state with title status and message properties
//this first one is pending and is called before the fetch runs so that the user gets a notification that it got their request
    dispatch(
    uiActions.showNotification({
        status: 'pending',
        title: 'Sending',
        message: 'Sending cart data!'
        })
    );

    const sendRequest = async () => {
        //fetch data
          const response = await fetch('https://react-http-312f4-default-rtdb.firebaseio.com/cart.json', {
            method: 'PUT',
            body: JSON.stringify(cart)
          })
        
        
        if (!response.ok) {
          throw new Error('Sending cart data failed.')
        }
    }

    try {
    await sendRequest();
    //if there is no error set the notification state to success 
    dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }))
    } catch (error) {
    dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
        }))
    }
    };
    }


export const cartActions = cartSlice.actions;
export default cartSlice;