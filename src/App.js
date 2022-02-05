import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser, getUser } from './services/userAPI';
import Loading from './components/Loading';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      info: { name: null },
      isDisabled: true,
      logged: false,
      received: false,
      userNameApp: '',
    };
  }

  componentDidMount() {
    this.nameForHeader();
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    const minInput = 3;
    if (value.length >= minInput) {
      this.setState({
        isDisabled: false,
      });
    }
    this.setState({
      info: { name: value },
    });
  }

  onClick = async () => {
    this.setState({
      logged: true,
    });
    const { info } = this.state;
    const response = await createUser(info);
    if (response === 'OK') {
      return this.setState({
        logged: false,
        received: true,
      });
    }
  }

  nameForHeader = async () => {
    // const { userNameApp } = this.state;
    const response = await getUser();
    const reposName = await response.name;
    // return response;
    // console.log(response.name);
    this.setState({
      userNameApp: reposName,
    }/* , () => console.log(userNameApp) */);
  }

  render() {
    const {
      logged,
      info,
      isDisabled,
      received,
      userNameApp,
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          {!userNameApp ? <Loading /> : (
            <Route
              path="/search"
              render={ () => (
                <Search userNamePage={ userNameApp } />
              ) }
            />
          )}
          {/* <Route
            path="/search"
            render={ () => (
              <Search userNamePage={ userNameApp } />
            ) }
          /> */}
          <Route
            path="/album/:id"
            render={ (props) => (
              <Album { ...props } userNamePage={ userNameApp } />
            ) }
          />
          <Route
            path="/favorites"
            render={ () => (
              <Favorites userNamePage={ userNameApp } />
            ) }
          />
          <Route
            path="/profile"
            render={ () => (
              <Profile userNamePage={ userNameApp } />
            ) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <ProfileEdit userNamePage={ userNameApp } />
            ) }
          />

          {/* <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } /> */}

          {logged ? <Loading /> : null}
          {received ? <Redirect to="/search" /> : null}
          <Route
            exact
            path="/"
            render={ () => (
              <Login
                infoP={ info }
                isDisabledP={ isDisabled }
                handleClick={ this.onClick }
                handleChange={ this.onInputChange }
                loggedP={ logged }
                receivedP={ received }
              />
            ) }
          />

          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
