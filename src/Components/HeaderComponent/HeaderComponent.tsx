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
  logout: () => void;
  user: User;
}

export interface State {

}

export default class HeaderComponent extends React.Component<Props, State> {

  state = {

  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (

      < div >
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Scientists Utopia</NavbarBrand>
          <Nav className="ml-auto" navbar>
            {this.props.user.isAuthorized() ?
              (<NavItem>
                <NavLink>{this.props.user.fullName}</NavLink>
              </NavItem>)
              :
              (<NavItem>
                <NavLink onClick={this.props.openLoginModal}>Login</NavLink>
              </NavItem>)
            }
            {this.props.user.isAuthorized() &&
              (<NavItem>
                <NavLink onClick={this.props.logout}>Logout</NavLink>
              </NavItem>)
            }
            <OptionsComponent user={this.props.user} />
          </Nav>
        </Navbar></div >
    )
  }
}
