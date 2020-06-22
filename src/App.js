import React ,{useEffect,createContext,useReducer, useContext}from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import Signin from './components/screens/signin'
import Signup from './components/screens/signup'
import Profile from './components/screens/profile'
import CreatePost from './components/screens/createPost'
import {reducerr, initialState} from './reduces/userReducer'
import UserProfile from './components/screens/userProfile'
import Postsmyfollow from './components/screens/myfollowersposts'

export const UserContext = createContext()

const Routing = ()=>{

  const history = useHistory()
  const{state,dispatch} = useContext(UserContext)
 useEffect(()=>{
   const user = JSON.parse(localStorage.getItem("user"))
   if(user){
     dispatch({type:"USER",payload:user})
     history.push('/')
   }else{
     history.push('/signin')
   }
 },[])
  return (
    <Switch>
        
       
        <Route exact path="/">
           <Home/>
  </Route>
  <Route exact path="/signin">
           <Signin/>
  </Route>
  <Route exact path="/signup">
           <Signup/>
  </Route>
  <Route exact path="/profile">
           <Profile/>
  </Route>
  <Route exact path="/create">
           <CreatePost/>
  </Route>
  <Route exact path="/user/:userid">
           <UserProfile/>
  </Route>
  <Route exact path="/user/:userid">
           <UserProfile/>
  </Route>
  <Route  path="/postsmyfollow">
           <Postsmyfollow/>
  </Route>
    </Switch>
  )
}
function App() {
  const[state,dispatch] = useReducer(reducerr,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
 <NavBar />
  <Routing/>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
