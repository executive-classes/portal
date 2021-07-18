import http from '@/http';
import Model from '../model/Model';
import Tax from '../tax/Tax';
import Uf from '../address/Uf';

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
            'language'
        );

        super(data, 'id', props);
    }

    /**
     * Define the custom properties.
     *
     * @param {Object} data
     */
    _customProperties(data) {
        this.tax = new Tax(data.tax);
        this.tax_alt = new Tax({ ...data.tax_alt, alt: true });
        this.uf = new Uf();
    }

    /**
     * Search a user by a email.
     * 
     * @param {String} email 
     * @returns Promise
     */
    searchByEmail() {
        return this._search({ email: this.email });
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
     * Update the user taxes.
     *
     * @returns Promise
     */
    updateTax() {
        return this._update(this._sanitizeTax());
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
            ... this._sanitizeData(),
            ... this._sanitizeTax(),
            ... this._sanitizeSettings()
        }
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
     * Sanitize the user tax data to the API request.
     * 
     * @returns Object
     */
    _sanitizeTax() {
        return {
            ... this.tax.sanitize(),
            ... this.tax_alt.sanitize(),
            ... this.uf.sanitize(),
        };
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