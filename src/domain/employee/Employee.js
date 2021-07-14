import http from '@/http';
import Model from '../model/Model';
import User from '../user/User';

export default class Employee extends Model {
    constructor(data = {}, props = []) {
        props.push(
            'id',
            'created_at',
            'updated_at',
            'status',
            'position'
        );

        super(data, props, 'id');
    }

    /**
     * Define the custom properties.
     * 
     * @param {Object} data 
     */
    _customProperties(data) {
        this.user = new User(data.user ? data.user : {});
    }

    /**
     * Create or Update the user and create the employee.
     * 
     * @returns Promise
     */
    create() {
        return this.user.createOrUpdate()
            .then(() => this._create(this._sanitize()))
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the POST request with the model data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _create(data) {
        return http.post(`employees`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the PUT request with the employee data.
     * 
     * @param {Object} data 
     * @param {String|null} id 
     * @returns Promise
     */
    _update(data) {
        return http.put(`employees/${this.id}`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    cancel() {
        return http.delete(`employees/${this.id}`)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    reactivate() {
        return this._update({ employee_status_id: 'active' });
    }

    /**
     * Process the employee properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        return {
            ...this._sanitizeUser(),
            ...this._sanitizePosition(),
            ...this._sanitizeStatus()
        }
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
     * Sanitize the employee user to the API request.
     * 
     * @returns Object
     */
    _sanitizeUser() {
        return {
            ... this.user.id ? { user_id: this.user.id } : {}
        };
    }

    /**
     * Update the employee status.
     * 
     * @returns Promise
     */
    updateStatus() {
        return this._update(this._sanitizeStatus());
    }

    /**
     * Sanitize the employee status to the API request.
     * 
     * @returns Object
     */
    _sanitizeStatus() {
        return {
            ... this.status ? { employee_status_id: this.status.id } : {}
        };
    }

    /**
     * Update the employee position.
     * 
     * @returns Promise
     */
    updatePosition() {
        return this._update(this._sanitizePosition());
    }

    /**
     * Sanitize the employee position to the API request.
     * 
     * @returns Object
     */
    _sanitizePosition() {
        return {
            ... this.position ? { employee_position_id: this.position.id } : {}
        };
    }

    /**
     * Update the user settings.
     * 
     * @returns Promise
     */
    updateSettings() {
        return this.user.updateSettings();
    }
}