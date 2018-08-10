import axios from 'axios';
import ability from '../../Config/ability';

// Class User for LDAP authorisation
export default class User {
  // login name  
  name = '';
  email = '';
  fullName = '';

  private _isAuthorized = false;

  constructor(name?: string, password?: string) {
    this.name = name || '';
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
          try {
            const { data: { entity: { data: userData, orgUnit: [{ value: group }] } } } = response;

            // get user info and fill object properties
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

            // Here we change permissions
            ability.update([{
              actions: ['read'],
              subject: [`${group}-secret-data`]
            }]);

          } catch (error) {
            reject('Incorrect server data format');
          }

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
    // User is not logged
    user.clearLoginFlag();
    // User have no permissions
    ability.update([]);
    return user;
  };

}