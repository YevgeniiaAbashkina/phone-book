import { Route, Switch, Redirect } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import Header from './components/Header';
import Loader from './components/Loader';
import Home from './components/Home';
import './css/App.css';
import {useSelector, useDispatch} from "react-redux";
import { appSelector, authSuccess } from './store/app';
import { useEffect } from 'react';
import ContactMain from './components/ContactMain';


function App() {
  const {loading , auth} = useSelector(appSelector);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(authSuccess())
  }, [dispatch])

  console.log(auth)

  return (
    <div className="App">
      <Header/>
      <hr/>
      {auth && <Redirect exact from = "/" to ="/contacts" />}
      <Switch>
        <Route path="/" exact component = {Home}/>
        <Route path="/contacts" component={ContactMain}/>
        <Route path = "/login" component = {AuthComponent}/>
      </Switch>
      {loading && <Loader/>}
    </div>
  );
}

export default App;
