import axios from 'axios';
import ability from '../../Config/ability';

// Class User for LDAP authorisation
export default class User {
  // login name  
  name = '';
  email = '';
  fullName = '';

  // TODO: change it, it is test construct
  // we will get permissions from server
  groupList: Map<string, string>;

  private _isAuthorized = false;

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

  isAuthorized() {
    return this._isAuthorized;
  }

  setLoginFlag() {
    this._isAuthorized = true;
  }

  clearLoginFlag() {
    this._isAuthorized = false;
  }

  // Promise, that logged user in
  getLoginPromise(password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.get(`http://localhost:8080/ldapproxy/get?username=${this.name}&password=${password}`)
        .then((response) => {

          // Get user data from server request
          // We use destructuring assignment to receive it
          const { data: { entity: { data: userData } } } = response;

          userData.forEach((token: any) => {
            switch (token.attribute) {
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

          // TODO: create more suitable permissions model
          const group = this.groupList.get(this.name) || '';

          ability.update([{
            actions: ['read'],
            subject: [`${group}-data`]
          }]);

          this.setLoginFlag();
          resolve(response);
        })
        .catch((errResponse) => {
          reject(errResponse);
        });
    });
  }

  // Factory's static method - generate default null user without authorisation
  static notAuthorizedUser(): User {
    const user = new User();
    user.clearLoginFlag();
    ability.update([]);
    return user;
  };

}