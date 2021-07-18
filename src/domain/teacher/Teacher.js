import http from '@/http';
import Model from '../model/Model';
import User from '../user/User';

export default class Teacher extends Model {
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
    }

    /**
     * Create or Update the user and create the teacher.
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
     * Update the teacher status.
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
     * Cancel the Teacher.
     * 
     * @returns Promise
     */
    cancel() {
        return http.delete(`teachers/${this.id}`)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Reactivate the teacher.
     * 
     * @returns Promise
     */
    reactivate() {
        return this._update({ teacher_status_id: 'active' });
    }

    /**
     * Make the POST request with the model data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _create(data) {
        return http.post(`teachers`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Make the PUT request with the teacher data.
     * 
     * @param {Object} data 
     * @param {String|null} id 
     * @returns Promise
     */
    _update(data) {
        return http.put(`teachers/${this.id}`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }


    /**
     * Process the teacher properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        return {
            ...this._sanitizeUser(),
            ...this._sanitizeStatus()
        }
    }


    /**
     * Sanitize the teacher user to the API request.
     * 
     * @returns Object
     */
    _sanitizeUser() {
        return {
            ... this.user.id ? { user_id: this.user.id } : {}
        };
    }

    /**
     * Sanitize the teacher status to the API request.
     * 
     * @returns Object
     */
    _sanitizeStatus() {
        return {
            ... this.status ? { teacher_status_id: this.status.id } : {}
        };
    }
}