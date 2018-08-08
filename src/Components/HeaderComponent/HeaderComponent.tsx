import * as React from "react";
import './HeaderComponent.css';
import User from '../../Model/User/User'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import OptionsComponent from "../OptionsComponent/OptionsComponent";

export interface Props {
  children?: React.ReactNode
  openLoginModal: () => void;
  user: User;
}

export interface State {

  isAuthorized: boolean,
  userName: string,
  groups: string[]
}

export default class HeaderComponent extends React.Component<Props, State> {

  state = {
    isAuthorized: false,
    userName: '',
    groups: []
  };

  constructor(props: Props) {
    super(props);
    this.state.userName = (props.user.name) || '';
    this.state.isAuthorized = props.user.isAuthorised();
  }

  render() {
    return (
      <div><Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Scientists Utopia</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {this.state.isAuthorized ?
            (<NavItem>
              {/* <NavLink>{this.state.user}</NavLink> */}
              <p>{this.state.userName}</p>
            </NavItem>)
            :
            (<NavItem>
              <NavLink onClick={this.props.openLoginModal}>Login</NavLink>
            </NavItem>)
          }
          {this.state.isAuthorized &&
            (<NavItem>
              <NavLink>Logout</NavLink>
            </NavItem>)
          }
          <OptionsComponent user={this.props.user} />
        </Nav>
      </Navbar></div>
    )
  }
}
