import http from '@/http';

export default class User {
    constructor(data, privileges = null) {
        Object.entries(data).forEach(([key, value]) => {
            this[key] = value;
        });

        if (toString.call(privileges) == "[object Array]") {
            this._privileges = privileges;
        }

        this.uf = null;
        this._original = data;
    }

    /**
     * Test if a user have a privilege.
     * 
     * @param {String} privilege 
     */
    can(privilege) {
        return this._privileges.includes('*') || this._privileges.includes(privilege);
    }

    /**
     * Update the user.
     * 
     * @param {String, null} action 
     * @returns Promise
     */
    update(action = null) {
        if (action) {
            action = 'update' + String.capitalize(action);

            if (typeof this[action] == 'function') {
                return this[action]();
            }
        }

        return this._put(this._sanitizeUser());
    }

    /**
     * Update the user data.
     * 
     * @returns Promise
     */
    updateData() {
        return this._put(this._sanitizeData());
    }

    /**
     * Update the user taxes.
     * 
     * @returns Promise
     */
    updateTax() {
        return this._put(this._sanitizeTax());
    }

    /**
     * Update the user password.
     * 
     * @returns Promise
     */
    updatePassword() {
        return this._put(this._sanitizePassword());
    }

    /**
     * Update the user settings.
     * 
     * @returns Promise
     */
    updateSettings() {
        return this._put(this._sanitizeSettings());
    }

    /**
     * Make the PUT request with the user data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _put(data) {
        /** @todo Remove */
        console.table(data);

        return http.put("profile", data)
    }

    /**
     * Process the user properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitizeUser() {
        return {
            ...this._sanitizeData(),
            ...this._sanitizeTax(),
            ...this._sanitizePassword(),
            ...this._sanitizeSettings()
        }
    }

    /**
     * Sanitize the user data to the API request.
     * 
     * @returns Object
     */
    _sanitizeData() {
        let data = {
            name: this.name,
            phone: this.phone,
            phone_alt: this.phone_alt
        };

        if (this.email != this._original.email) {
            data = {
                ...data,
                email: this.email
            };
        }

        return data;
    }

    /**
     * Sanitize the user tax data to the API request.
     * 
     * @returns Object
     */
    _sanitizeTax() {
        let data = {};

        // Set the Tax data.
        if (this.tax_type) {
            data = {
                ...data,
                tax_type_id: this.tax_type.id,
                tax_code: this.tax_code
            };

        }

        // Set the Tax Alt data.
        data = this._sanitizeTaxAlt(data);

        // Set the UF data.
        if (this.uf) {
            data = {
                ...data,
                uf: this.uf.short_name
            }
        }

        return data;
    }

    /**
     * Sanitize the user alt tax data to the API request.
     * 
     * @param {Object} data 
     * @returns Object
     */
    _sanitizeTaxAlt(data) {
        let tax_type_alt_id = null
        let tax_code_alt = null

        if (this.tax_type_alt && this.tax_type_alt.id != null) {
            tax_type_alt_id = this.tax_type_alt.id;
            tax_code_alt = this.tax_code_alt;
        }

        return {
            ...data,
            tax_type_alt_id: tax_type_alt_id,
            tax_code_alt: tax_code_alt
        };
    }

    /**
     * Sanitize the user password to the API request.
     * 
     * @returns Object
     */
    _sanitizePassword() {
        if (!this.password) {
            return {}
        }

        return {
            password: this.password
        };
    }

    /**
     * Sanitize the user settings data to the API request.
     * 
     * @returns Object
     */
    _sanitizeSettings() {
        return {
            system_language_id: this.language.id
        }
    }

}