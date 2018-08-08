import * as React from "react";
import axios from 'axios';

export interface Props {
  children?: React.ReactNode
}

export interface State {
  userData: any;
}

export default class LDAPComponent extends React.Component<Props, State> {
  state = {
    userData: {}
  }

  constructor(props: Props) {
    super(props);
  }

  // AJAX request to proxy-server using axious
  sendAuthRequest() {
    axios.get('http://localhost:8080/ldapproxy/get?username=curie&password=password').then((response: any) => {
      // Set user information in state when it loaded
      console.log(response);
      this.setState(() => ({
        userData: response
      }));
    }).catch((rejected: any) => {
      console.log(rejected);
    })
  }


  componentDidMount() {
    // Send auth request when component created 
    this.sendAuthRequest();
  };

  render() {
    return (
      <div>
        <h1>LDAP Component here</h1>
        {JSON.stringify(this.state.userData)}
      </div>
    )
  }
}
