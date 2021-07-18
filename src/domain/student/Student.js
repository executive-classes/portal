import http from '@/http';
import Model from '../model/Model';
import User from '../user/User';
import Customer from '../customer/Customer';
import Biller from '../biller/Biller';

export default class Student extends Model {
    constructor(data = {}, props = []) {
        props.push(
            'id',
            'created_at',
            'updated_at',
            'status',
        );

        super(data, 'id', props);
    }

    /**
     * Define the custom properties.
     * 
     * @param {Object} data 
     */
    _customProperties(data) {
        this.user = new User(data.user ? data.user : {});
        this.customer = new Customer(data.customer ? data.customer : {});
        this.biller = new Biller(data.biller ? data.biller : {});
    }

    /**
     * Create or Update the user and create the student.
     * 
     * @returns Promise
     */
    create() {
        return this.user.createOrUpdate()
            .then(() => this._create(this._sanitize()))
            .catch(error => Promise.reject(error));
    }

    /**
     * Update the user data.
     * 
     * @returns Promise
     */
    updateData() {
        return this.user.updateData();
    }

    /**
     * Update the user taxes.
     * 
     * @returns Promise
     */
    updateTax() {
        return this.user.updateTax();
    }

    /**
     * Update the student status.
     * 
     * @returns Promise
     */
    updateStatus() {
        return this._update(this._sanitizeStatus());
    }

    /**
     * Update the user settings.
     * 
     * @returns Promise
     */
    updateSettings() {
        return this.user.updateSettings();
    }

    /**
     * Cancel the Student
     * 
     * @returns Promise
     */
    cancel() {
        return http.delete(`students/${this.id}`)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Reactivate the student
     * 
     * @returns Promise
     */
    reactivate() {
        return this._update({ student_status_id: 'active' });
    }

    /**
     * Make the POST request with the model data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _create(data) {
        return http.post(`students`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the PUT request with the student data.
     * 
     * @param {Object} data 
     * @param {String|null} id 
     * @returns Promise
     */
    _update(data) {
        return http.put(`students/${this.id}`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Process the student properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        return {
            ...this._sanitizeCustomer(),
            ...this._sanitizeBiller(),
            ...this._sanitizeUser(),
            ...this._sanitizeStatus()
        }
    }

    /**
     * Sanitize the student customer to the API request.
     * 
     * @returns Object
     */
    _sanitizeCustomer() {
        return {
            ... this.customer.id ? { customer_id: this.customer.id } : {}
        };
    }

    /**
     * Sanitize the student biller to the API request.
     * 
     * @returns Object
     */
    _sanitizeBiller() {
        return {
            ... this.biller.id ? { biller_id: this.biller.id } : {}
        };
    }

    /**
     * Sanitize the student user to the API request.
     * 
     * @returns Object
     */
    _sanitizeUser() {
        return {
            ... this.user.id ? { user_id: this.user.id } : {}
        };
    }

    /**
     * Sanitize the student status to the API request.
     * 
     * @returns Object
     */
    _sanitizeStatus() {
        return {
            ... this.status ? { student_status_id: this.status.id } : {}
        };
    }
}