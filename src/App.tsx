import * as React from 'react';
import './App.css';
import User from './Model/User/User'

import HeaderComponent from './Components/HeaderComponent/HeaderComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';

export interface State {
  user: User,
  isLoginModalVisible: boolean
}

class App extends React.Component {
  state: State;

  openLoginModal = () => this.setLoginModal(true);
  closeLoginModal = () => this.setLoginModal(false);
  setLoggedUser = (user: User) => {
    this.setState(() => ({ user }));
  }

  setLoginModal(isModalVisible: boolean) {
    console.log('setLogModal');

    this.setState(() => {
      return {
        isLoginModalVisible: isModalVisible
      };
    });
  }
  constructor(props: any) {
    super(props);

    // When application started we have none authorized user yet
    this.state = {
      user: User.notAuthorizedUser(),
      isLoginModalVisible: false
    };
    this.openLoginModal.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <HeaderComponent user={this.state.user} openLoginModal={this.openLoginModal} />
        <LoginComponent modalOpen={this.state.isLoginModalVisible} closeLoginModal={this.closeLoginModal} setLoggedUser={this.setLoggedUser} />
        {/* <LDAPComponent /> */}
      </div>
    );
  }
}

export default App;
