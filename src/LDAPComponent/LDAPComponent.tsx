import * as React from "react"

export interface Props {
  children?: React.ReactNode
}

export interface State {
}

export default class LDAPComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>LDAP Component here</h1>
      </div>
    )
  }
}
