import Model from '../model/Model';

export default class Tax extends Model {
    constructor(data = {}, props = []) {
        props.push(
            'id',
            'name',
            'code',
            'priority',
            'mask',
            'alt'
        );

        const defaults = {
            alt: data.alt != undefined ? data.alt : false
        };

        super(data, 'id', props, defaults);
    }

    /**
     * Process the user properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    sanitize() {
        return {
            ... this._valid() || this.alt
                ? this._makeData()
                : {},
        }
    }

    /**
     * Make the data for the tax or the tax alt.
     * 
     * @returns Object
     */
    _makeData() {
        return {
            ... !this.alt
                ? {
                    tax_type_id: this.id,
                    tax_code: this.code
                } : {
                    tax_type_alt_id: this._valid() ? this.id : null,
                    tax_code_alt: this._valid() ? this.code : null
                },
        }
    }

    /**
     * Verify if the tax is valid.
     * 
     * @returns Boolean
     */
    _valid() {
        return this.id && this.code;
    }
}