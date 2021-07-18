import http from '@/http';
import Model from '../model/Model';

export default class Address extends Model {
    constructor(data = {}, props = []) {
        props.push(
            'id',
            'zip',
            'street',
            'number',
            'complement',
            'district',
            'city',
            'state',
            'country'
        );

        super(data, 'id', props);
    }

    /**
     * Create or Update the user and create the employee.
     * 
     * @returns Promise
     */
    search() {
        return this._search();
    }

    /**
     * Create the address.
     * 
     * @returns Promise
     */
    create() {
        return this._create(this._sanitize());
    }

    /**
     * Make the Search request with the model data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _search() {
        return http.get(`addresses/search/${this.zip}`)
            .then(data => {
                this.fill(data.data, false);
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
        return http.post(`addresses`, data)
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
        return http.put(`addresses/${this.id}`, data)
            .then(data => {
                this.fill(data.data);
                return Promise.resolve(data);
            })
            .catch(error => Promise.reject(error));
    }

    /**
     * Process the employee properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        return {
            zip: this.zip,
            number: this.number,
            complement: this.complement,
            country: this.country,
            street: this.street,
            district: this.district,
            city: this.city,
            state: this.state,
            ... this.country ? { country: this.country.short_name } : {}
        }
    }
}