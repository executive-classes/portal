import http from '@/http';
import Model from '../model/Model';

export default class User extends Model {
    constructor(data = {}, props = []) {
        props.push(
            'id',
            'created_at',
            'updated_at',
            'inactive_at',
            'reactive_at',
            'status',
            'active',
            'email',
            'email_verified',
            'name',
            'phone',
            'phone_alt',
            'tax_type',
            'tax_code',
            'tax_type_alt',
            'tax_code_alt',
            'language'
        );

        super(data, props, 'id');
    }

    /**
     * Define the custom properties.
     *
     * @param {Object} data
     */
    _customProperties() {
        this.uf = null;
    }

    /**
     * Define the user's privileges.
     * 
     * @param {Array} privileges 
     * @returns This
     */
    withPrivileges(privileges = []) {
        if (toString.call(privileges) == "[object Array]") {
            this._privileges = privileges;
        }

        return this;
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

    /**
     * Search a user by a email.
     * 
     * @param {String} email 
     * @returns Promise
     */
    searchByEmail(email) {
        return this._search({ email: email });
    }

    /**
     * Search by a user.
     * 
     * @param {String} email 
     * @returns Promise
     */
    _search(data) {
        if (data.id) {
            return http.get(`users/${data.id}`)
                .then(data => {
                    this.fill(data.data);
                    return Promise.resolve(data);
                })
                .catch(error => Promise.reject(error));
        }

        return http.get(`users`, { params: data })
            .then(data => {
                if (data.data[0] != undefined) {
                    this.fill(data.data[0]);
                }
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the POST request with the model data.
     *
     * @param {Object} data
     * @returns Promise
     */
    _create(data) {
        return http.post(`users`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the PUT request with the user data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _update(data) {
        return http.put(`users/${this.id}`, data)
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
            ...this._sanitizeSettings()
        }
    }

    /**
     * Update the user data.
     * 
     * @returns Promise
     */
    updateData() {
        return this._update(this._sanitizeData());
    }

    /**
     * Sanitize the user data to the API request.
     * 
     * @returns Object
     */
    _sanitizeData() {
        return {
            ... this.email && this.email != this._original.email ? { email: this.email } : {},
            ... this.name && this.name != this._original.name ? { name: this.name } : {},
            ... this.phone !== undefined ? { phone: this.phone } : {},
            ... this.phone_alt !== undefined ? { phone_alt: this.phone_alt } : {},
        };
    }

    /**
     * Update the user taxes.
     *
     * @returns Promise
     */
    updateTax() {
        return this._update(this._sanitizeTax());
    }

    /**
     * Sanitize the user tax data to the API request.
     * 
     * @returns Object
     */
    _sanitizeTax() {
        return {
            ... this.tax_type && this.tax_code
                ? {
                    tax_type_id: this.tax_type.id,
                    tax_code: this.tax_code
                } : {},

            ... this.tax_type_alt !== undefined && this.tax_code_alt !== undefined
                ? (
                    this.tax_type_alt && this.tax_type_alt.id != null
                        ? {
                            tax_type_alt_id: this.tax_type_alt.id,
                            tax_code_alt: this.tax_code_alt
                        } : {
                            tax_type_alt_id: null,
                            tax_code_alt: null
                        }
                ) : {},

            ... this.uf ? { uf: this.uf.short_name } : {}
        };
    }

    /**
     * Update the user settings.
     * 
     * @returns Promise
     */
    updateSettings() {
        return this._update(this._sanitizeSettings());
    }

    /**
     * Sanitize the user settings data to the API request.
     * 
     * @returns Object
     */
    _sanitizeSettings() {
        return {
            ... this.language ? { system_language_id: this.language.id } : {}
        }
    }
}