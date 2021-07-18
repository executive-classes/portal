export default class Model {
    constructor(data, pk, props, defaultVals = {}) {
        this._properties = props;
        this._default_vals = defaultVals;
        this._primary_key = pk;

        this.fill(data);
        
        this._log();
    }

    /**
     * Fill a existing Model class.
     * 
     * @param {Object} data 
     */
    fill(data, fillNull = true) {
        this._fillProperties(data, fillNull);
    }

    /**
     * Clean the Model class.
     * 
     * @param {Object} data 
     */
    clean() {
        this._cleanProperties();
    }

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
     * Fill the given data into the object.
     * 
     * @param {Object} data 
     * @param {Array} props
     */
    _fillProperties(data, fillNull = true) {
        // Verify if there was any property defined.
        if (this._properties == []) {
            throw new Error(`The ${this.constructor.name} required properties need to be defined`);
        }

        // Save the original data.
        this._original = data;

        // Fill the data into the object.
        this._properties.forEach(property => {
            if (this[property] === undefined) {
                if (data[property] === undefined) {
                    this[property] = this._default_vals[property];
                } else {
                    this[property] = data[property];
                }
            } else {
                if (data[property] || (data[property] === null && fillNull)) {
                    this[property] = data[property];
                }
            }
        });

        // Declare the custom properties.
        this._customProperties(data);
    }

    /**
     * Fill the given data into the object.
     */
    _cleanProperties() {
        // Verify if there was any property defined.
        if (this._properties == []) {
            throw new Error(`The ${this.constructor.name} required properties need to be defined`);
        }

        // Clean the object.
        this._properties.forEach(property => {
            if (this._default_vals[property]) {
                this[property] = this._default_vals[property];
            } else {
                this[property] = undefined;
            }
        });
    }

    /**
     * Define the custom properties.
     *
     * @param {Object} data
     */
    _customProperties() {}

    /**
     * Make the GET request with the model data.
     * 
     * @returns Promise
     */
    _search() {
        throw new Error('The _search method should be implemented');
    }

    /**
     * Make the POST request with the model data.
     * 
     * @returns Promise
     */
    _create() {
        throw new Error('The _create method should be implemented');
    }

    /**
     * Make the PUT request with the model data.
     * 
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