import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from  'react-redux';
import {useEffect, Fragment} from 'react';
import Notification from './components/UI/Notification';

import {sendCartData, fetchCartData} from './store/cart-actions';

let isInitial = true;

function App() {
const dispatch = useDispatch();
//cartIsVisible state slice 
const showCart = useSelector(state => state.ui.cartIsVisible);
//cart state slice
const cart = useSelector(state => state.cart);
//notification state slice
const notification = useSelector(state => state.ui.notification);

//dispatch[the dependency] will never change so this will only run on initial render
useEffect(() => {
  dispatch(fetchCartData())
}, [dispatch])

//this effect sends cart data to a backend everytime the cart state is changed
//this can not be done within a reducer bc a reducer can not contain async code or any kind of effects
//so this effect that takes data from a reducer, but must be put in a different component to complete the fetch operation (App was chosen randomly you could have put this effect in cart.js for example)
useEffect(() => {
 //check to see if this is the initial render because you dont want to send empty cart data for no reason 
 if (isInitial) {
  isInitial = false;
  return;
}

if (cart.changed) {
dispatch(sendCartData(cart))
}
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
