import http from '@/http';
import Model from '../model/Model';
import Address from '../address/Address';
import Customer from '../customer/Customer';
import Tax from '../tax/Tax';
import Uf from '../address/Uf';

export default class Biller extends Model {
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
            'status',
            'interval',
            'payment_method'
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
        this.customer = new Customer(data.customer ? data.customer : {});
        this.tax = new Tax(data.tax);
        this.tax_alt = new Tax({ ...data.tax_alt, alt: true });
        this.uf = new Uf();
    }

    /**
     * Create the address and create the biller.
     * 
     * @returns Promise
     */
    create() {
        return this.address.create()
            .then(() => this._create(this._sanitize()))
            .catch(error => Promise.reject(error));
    }

    /**
     * Update the biller address.
     * 
     * @returns Promise
     */
    updateAddress() {
        return this.address.update()
    }

    /**
     * Update the biller data.
     * 
     * @returns Promise
     */
    updateData() {
        return this._update(this._sanitizeData());
    }

    /**
     * Update the biller taxes.
     *
     * @returns Promise
     */
    updateTax() {
        return this._update(this._sanitizeTax());
    }

    /**
     * Update the biller status.
     * 
     * @returns Promise
     */
    updateStatus() {
        return this._update(this._sanitizeStatus());
    }

    /**
     * Update the biller payment.
     * 
     * @returns Promise
     */
    updatePayment() {
        return this._update(this._sanitizePayment());
    }

    /**
     * Cancel the biller.
     * 
     * @returns Promise
     */
    cancel() {
        return http.delete(`billers/${this.id}`)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Reactivate the biller.
     * 
     * @returns Promise
     */
    reactivate() {
        return this._update({ biller_status_id: 'active' });
    }

    /**
     * Make the POST request with the model data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _create(data) {
        return http.post(`billers`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the PUT request with the biller data.
     * 
     * @param {Object} data 
     * @param {String|null} id 
     * @returns Promise
     */
    _update(data) {
        return http.put(`billers/${this.id}`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Process the biller properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        return {
            ...this._sanitizeCustomer(),
            ...this._sanitizeData(),
            ...this._sanitizeTax(),
            ...this._sanitizeAddress(),
            ...this._sanitizeStatus(),
            ...this._sanitizePayment()
        }
    }

    /**
     * Sanitize the biller customer to the API request.
     * 
     * @returns Object
     */
    _sanitizeCustomer() {
        return {
            ... this.customer.id ? { customer_id: this.customer.id } : {}
        };
    }

    /**
     * Sanitize the biller data to the API request.
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
     * Sanitize the biller tax data to the API request.
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
     * Sanitize the biller status to the API request.
     * 
     * @returns Object
     */
    _sanitizeStatus() {
        return {
            ... this.status ? { biller_status_id: this.status.id } : {}
        };
    }

    /**
     * Sanitize the biller payment interval to the API request.
     * 
     * @returns Object
     */
    _sanitizePayment() {
        return {
            ... this.interval ? { payment_interval_id: this.interval.id } : {},
            ... this.payment_method ? { payment_method_id: this.payment_method.id } : {}
        };
    }
}