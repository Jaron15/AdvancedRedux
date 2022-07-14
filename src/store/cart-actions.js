
import {uiActions} from './ui-slice';
import {cartActions} from './cart-slice';

// fetch the stored cart data from the backend adn return it as a json object 
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-312f4-default-rtdb.firebaseio.com/cart.json' )

            if (!response.ok) {
                return new Error('Could not fetch cart data!')
            }
            
            const data = await response.json();

            return data
        }
//extract cartdata from fetchData() 
//then use the replaceCart action from cartActions to set the cart data
        try {
           const cartData = await fetchData();
           dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
                }))
        }
    }
}

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