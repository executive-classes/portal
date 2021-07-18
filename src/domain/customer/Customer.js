import http from '@/http';
import Model from '../model/Model';
import Address from '../address/Address';
import Tax from '../tax/Tax';
import Uf from '../address/Uf';

export default class Customer extends Model {
    constructor(data = {}, props = []) {
        props.push(
            'id',
            'created_at',
            'updated_at',
            'inactive_at',
            'reactive_at',
            'name',
            'email',
            'phone',
            'phone_alt',
            'status'
        );

        super(data, 'id', props);
    }

    /**
     * Define the custom properties.
     * 
     * @param {Object} data 
     */
    _customProperties(data) {
        this.address = new Address(data.address ? data.address : {});
        this.tax = new Tax(data.tax);
        this.tax_alt = new Tax({ ...data.tax_alt, alt: true });
        this.uf = new Uf();
    }

    /**
     * Create the address and create the customer.
     * 
     * @returns Promise
     */
    create() {
        return this.address.create()
            .then(() => this._create(this._sanitize()))
            .catch(error => Promise.reject(error));
    }

    /**
     * Update the customer data.
     * 
     * @returns Promise
     */
    updateData() {
        return this._update(this._sanitizeData());
    }

    /**
     * Update the customer address.
     * 
     * @returns Promise
     */
    updateAddress() {
        return this.address.update()
    }

    /**
     * Update the customer taxes.
     *
     * @returns Promise
     */
    updateTax() {
        return this._update(this._sanitizeTax());
    }

    /**
     * Update the customer status.
     * 
     * @returns Promise
     */
    updateStatus() {
        return this._update(this._sanitizeStatus());
    }

    /**
     * Cancel the customer.
     * 
     * @returns Promise
     */
    cancel() {
        return http.delete(`customers/${this.id}`)
            .then(data => {
                this.fill(data.data);
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
        return http.post(`customers`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the PUT request with the customer data.
     * 
     * @param {Object} data 
     * @param {String|null} id 
     * @returns Promise
     */
    _update(data) {
        return http.put(`customers/${this.id}`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Reactivate the customer.
     * 
     * @returns Promise
     */
    reactivate() {
        return this._update({ customer_status_id: 'active' });
    }

    /**
     * Process the customer properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        return {
            ...this._sanitizeData(),
            ...this._sanitizeTax(),
            ...this._sanitizeAddress(),
            ...this._sanitizeStatus()
        }
    }

    /**
     * Sanitize the customer data to the API request.
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
     * Sanitize the customer tax data to the API request.
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
     * Sanitize the customer address data to the API request.
     * 
     * @returns Object
     */
    _sanitizeAddress() {
        return {
            ... this.address.id ? { address_id: this.address.id } : {}
        };
    }

    /**
     * Sanitize the customer status to the API request.
     * 
     * @returns Object
     */
    _sanitizeStatus() {
        return {
            ... this.status ? { customer_status_id: this.status.id } : {}
        };
    }
}