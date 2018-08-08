import axios from 'axios';

// Class User for LDAP authorisation
export default class User {
  // login name  
  name = '';
  email = '';
  fullName = '';
  // groups that includes user as a member
  groups: string[] = [];

  // TO DO: destroy it, it is test construct
  // we will get groups from server
  groupList: Map<string, string>;

  private _isAuthorised = false;

  constructor(name?: string, password?: string) {
    this.name = name || '';
    this.groupList = new Map();
    this.groupList.set('curie', 'Chemists');
    this.groupList.set('boyle', 'Chemists');
    this.groupList.set('nobel', 'Chemists');
    this.groupList.set('pasteur', 'Chemists');
    this.groupList.set('euclid', 'Mathematicians');
    this.groupList.set('riemann', 'Mathematicians');
    this.groupList.set('euler', 'Mathematicians');
    this.groupList.set('gauss', 'Mathematicians');
    this.groupList.set('einstein', 'Scientists');
    this.groupList.set('galieleo', 'Scientists');
    this.groupList.set('tesla', 'Scientists');
    this.groupList.set('newton', 'Scientists');
    this.groupList.set('jmacy', 'Scientists');
  }

  isAuthorised() {
    return this._isAuthorised;
  }

  setLoginFlag() {
    this._isAuthorised = true;
  }

  clearLoginFlag() {
    this._isAuthorised = false;
  }

  // Promise, that logged user in
  getLoginPromise(password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.get(`http://localhost:8080/ldapproxy/get?username=${this.name}&password=${password}`)
        .then((response) => {

          //Get user data from server request
          const data: { attribute: string, value: string }[] = response.data;
          data.forEach((token) => {
            switch (token.attribute) {
              case 'mail':
                this.email = token.value[0];
                break;
              case 'mail':
                this.email = token.value[0];
                break;
              case 'uid':
                this.name = token.value[0];
                break;
              case 'cn':
                this.fullName = token.value[0];
                break;

              default:
                break;
            }
          });

          this.groups = [this.groupList.get(this.name) || ''];

          resolve(response);
        })
        .catch((errResponse) => {
          reject(errResponse)
        });
    });
  }

  // Factory's static method - generate default null user without authorisation
  static notAuthorizedUser(): User {
    const user = new User();
    user.clearLoginFlag();
    return user;
  };

}