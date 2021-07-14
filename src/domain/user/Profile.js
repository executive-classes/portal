import http from '@/http';
import User from './User';

export default class Profile extends User {
    constructor(data = {}, props = []) {
        props.push('password_reminder');
        super(data, props);
    }

    /**
     * Make the PUT request with the user data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _update(data) {
        return http.put("profile", data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Process the user properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        return {
            ...this._sanitizeData(),
            ...this._sanitizeTax(),
            ...this._sanitizePassword(),
            ...this._sanitizeSettings()
        }
    }

    /**
     * Update the user password.
     * 
     * @returns Promise
     */
    updatePassword() {
        return this._update(this._sanitizePassword());
    }

    /**
     * Sanitize the user password to the API request.
     * 
     * @returns Object
     */
    _sanitizePassword() {
        return {
            ... this.password ? { password: this.password } : {},
            ... this.password_reminder ? { password_reminder: this.password_reminder } : {}
        };
    }
}