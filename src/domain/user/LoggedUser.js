import User from './User';

export default class LoggedUser extends User {
    constructor(data = {}, privileges = [], props = []) {
        super(data, props);

        if (toString.call(privileges) == "[object Array]") {
            this._privileges = privileges;
        }
    }

    /**
     * Test if a user have a privilege.
     * 
     * @param {String} privilege 
     * @returns Boolean
     */
    can(privilege) {
        return this._privileges.includes('*') || this._privileges.includes(privilege);
    }
}