import React , { Component } from 'react';
import { BrowserRouter , Route , Switch, Redirect } from 'react-router-dom';


import './App.css';
import Auth from './views/Auth/Auth';
import Events from './views/Events/Events';
import Booking from './views/Booking/Booking';
import MainNavigation from './components/MainNavigation/MainNavigation';
import AuthContext from './context/AuthContext';

class App extends Component {

  state = {
    token : null,
    userId : null
  }

  login = (token , userId , expirationTime) =>{
    debugger;
    this.setState({
      token : token,
      userId : userId
    })
  }

  logout = () =>{
    this.setState({
      token : null,
      userId : null
    })
  }

  render(){
    return (
      <div className="App">
       <BrowserRouter>
          <AuthContext.Provider value={{
            token : this.state.token,
            userId : this.state.userId,
            login : this.login,
            logout : this.logout
          }}>
          
            <MainNavigation />
            <main className="MainContent">
            <Switch>
              {this.state.token && <Redirect from ="/" to="/events" exact />}
              {this.state.token && <Redirect from ="/auth" to="/events" exact />}
              <Route path="/auth" component={Auth} />
              <Route path="/events" component={Events} />
              {this.state.token && <Route path="/booking" component={Booking} />}
              {!this.state.token && <Redirect to="/auth" exact />}
            </Switch>
            </main>
          </AuthContext.Provider>
       </BrowserRouter>
       home
      </div>
    );
  }  
}

export default App;
