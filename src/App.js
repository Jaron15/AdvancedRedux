import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from  'react-redux';
import {useEffect, Fragment} from 'react';
import {uiActions} from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
const dispatch = useDispatch();
//cartIsVisible state slice 
const showCart = useSelector(state => state.ui.cartIsVisible);
//cart state slice
const cart = useSelector(state => state.cart);
//notification state slice
const notification = useSelector(state => state.ui.notification);

//this effect sends cart data to a backend everytime the cart state is changed
//this can not be done within a reducer bc a reducer can not contain async code or any kind of effects
//so this effect that takes data from a reducer, but must be put in a different component to complete the fetch operation (App was chosen randomly you could have put this effect in cart.js for example)
useEffect(() => {
  const sendCartData = async () => {
// the dispatch functions set the showNotification state with title status and message properties
//this first one is pending and is called before the fetch runs so that the user gets a notification that it got their request
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending',
      message: 'Sending cart data!'
    }))
//fetch data
  const response = await fetch('https://react-http-312f4-default-rtdb.firebaseio.com/cart.json', {
    method: 'PUT',
    body: JSON.stringify(cart)
  })


if (!response.ok) {
  throw new Error('Sending cart data failed.')
}

//if there is no error set the notification state to success 
dispatch(uiActions.showNotification({
  status: 'success',
  title: 'Success!',
  message: 'Sent cart data successfully!'
}))
  };

//check to see if this is the initial render because you dont want to send empty cart data for no reason 
  if (isInitial) {
    isInitial = false;
    return;
  }
//run the function defined above with a catch block that will run another 
//notification dispatch to set the notification state to error 
sendCartData().catch(error => {
  dispatch(uiActions.showNotification({
    status: 'error',
    title: 'Error!',
    message: 'Sending cart data failed!'
  }))
})

}, [cart, dispatch])


//we pass in the status/title/message from notification(our notification state slice)
//.status(the status property of the notification slice)/message/title
//Notification.js conditionally renders jsx to present the status of the request using these props
  return (
    <Fragment>
     {notification && 
     <Notification
     status={notification.status}
     title={notification.title}
     message={notification.message} 
     />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
