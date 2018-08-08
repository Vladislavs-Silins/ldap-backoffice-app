import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import User from '../../Model/User/User'

export interface Props {
  children?: React.ReactNode,
  modalOpen: boolean,
  closeLoginModal: () => void,
  setLoggedUser: (user: User) => void
}

export interface State {
  userName: string,
  password: string
}

export default class LoginComponent extends React.Component<Props, State> {

  state: State;

  constructor(props: Props) {
    super(props)

    this.state = {
      userName: 'curie',
      password: 'password'
    }
  }

  // Input user name for login
  handleChangeUserName = (event: any) => {
    event.preventDefault();
    event.persist();
    this.setState(() => {
      return {
        userName: event.target.value
      };
    });
  }

  // Input password for login
  handleChangePassword = (event: any) => {
    event.preventDefault();
    event.persist();
    this.setState(() => {
      return {
        password: event.target.value
      };
    });
  }

  // logging user with user data in state 
  handleLogin = (e: any) => {
    e.preventDefault();
    const name = this.state.userName;
    const password = this.state.password;
    const user = new User(name);
    const loginPromise: Promise<any> = user.getLoginPromise(password);
    loginPromise.then((response) => {
      console.log('Success');
      console.log(response);
      user.setLoginFlag();
      this.props.setLoggedUser(user);
      this.props.closeLoginModal();
    }).catch((errResponse) => {
      console.log('Error');
    });
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalOpen} toggle={this.props.closeLoginModal} className={'className'}>
          <ModalHeader toggle={this.props.closeLoginModal}>Modal title</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label for="userName">User</Label>
                <Input type="text" name="userName" id="userName" value={this.state.userName} placeholder="Enter the login name" onChange={this.handleChangeUserName} />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" value={this.state.password} placeholder="Enter your password here" onChange={this.handleChangePassword} />
              </FormGroup>
              <Button color="primary" onClick={this.handleLogin}>Login</Button>{' '}
              <Button color="secondary" onClick={this.props.closeLoginModal}>Cancel</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
