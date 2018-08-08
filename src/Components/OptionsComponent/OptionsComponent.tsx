import * as React from "react";
import User from '../../Model/User/User';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import './OptionsComponent.css'

export interface Props {
  children?: React.ReactNode,
  user: User,
}

export interface State {
}

export default class OptionsComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
                </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Option 1
                  </DropdownItem>
            <DropdownItem>
              Option 2
                  </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
                  </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown></div>
    )
  }
}
