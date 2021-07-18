import Model from '../model/Model';

export default class Tax extends Model {
    constructor(data = {}, props = []) {
        props.push(
            'id',
            'abbr',
            'short_name',
            'name',
            'ie_mask',
        );

        super(data, 'id', props);
    }

    /**
     * Process the user properties into a object data 
     * to send to API.
     * 
     * @returns Object
     */
    sanitize() {
        return {
            ... this.short_name
                ? { uf: this.uf.short_name }
                : {},
        }
    }
}