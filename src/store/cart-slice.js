import {createSlice} from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        replaceCart(state, action)  {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
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





export const cartActions = cartSlice.actions;
export default cartSlice;