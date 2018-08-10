import * as React from "react";
import User from '../../Model/User/User';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Can from './../CanComponent/CanComponent';
import ability from '../../Config/ability';

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
            <Can I="read" a="mathematicians-secret-data" ability={ability}>
              <DropdownItem>
                Mathematicians Secret Data
              </DropdownItem>
            </Can>
            <Can I="read" a="scientists-secret-data" ability={ability}>
              <DropdownItem>
                Scientists Secret Data
              </DropdownItem>
            </Can>
            <Can I="read" a="chemists-secret-data" ability={ability}>
              <DropdownItem>
                Chemists Secret Data
              </DropdownItem>
            </Can>
            {/* <DropdownItem divider /> */}
            <DropdownItem>
              Common Data
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown></div>
    )
  }
}
