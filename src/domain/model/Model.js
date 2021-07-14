export default class Model {
    constructor(data, props, pk) {
        this._properties = props;
        this._primary_key = pk;
        this._fillProperties(data, props);
        this._log();
    }

    /**
     * Fill a existing Model class.
     * 
     * @param {Object} data 
     */
    fill(data) {
        this._fillProperties(data, this._properties);
    }

    /**
     * Fill the given data into the object.
     * 
     * @param {Object} data 
     * @param {Array} props
     */
    _fillProperties(data, props) {
        // Verify if there was any property defined.
        if (this._properties == []) {
            throw new Error(`The ${this.constructor.name} required properties need to be defined`);
        }

        // Save the original data.
        this._original = data;

        // Fill the data into the object.
        props.forEach(property => {
            this[property] = data[property];
        });

        // Declare the custom properties.
        this._customProperties(data);
    }

    /**
     * Define the custom properties.
     *
     * @param {Object} data
     */
    _customProperties() {}

    /**
     * Check if a property exists.
     * 
     * @param {String} property 
     * @returns Boolean
     */
    has(property) {
        return this[property] !== undefined;
    }

    /**
     * Search for a model
     * 
     * @param {Object} data 
     * @returns Promise
     */
    search(data) {
        return this._search(data);
    }

    /**
     * Create the model.
     * 
     * @returns Promise
     */
    create() {
        return this._create(this._sanitize());
    }

    /**
     * Create or Update the model.
     * 
     * @returns Promise
     */
    createOrUpdate() {
        if (this[this._primary_key] == undefined) {
            return this._create(this._sanitize());
        }

        return this._update(this._sanitize());
    }

    /**
     * Update the model.
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

        return this._update(this._sanitize());
    }

    /**
     * Make the POST request with the model data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _create() {
        throw new Error('The _create method should be implemented');
    }

    /**
     * Make the PUT request with the model data.
     * 
     * @param {Object} data 
     * @returns Promise
     */
    _update() {
        throw new Error('The _update method should be implemented');
    }

    /**
     * Process the model properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    _sanitize() {
        throw new Error('The _sanitize method should be implemented');
    }

    /**
     * Log the object.
     */
    _log() {
        if (process.env.NODE_ENV == 'development') {
            let label = `Model: ${this.constructor.name}`;

            console.groupCollapsed(label);
            console.table(this);
            console.groupEnd(label);
        }
    }
}