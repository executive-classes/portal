export default class Validator {
    constructor() {
        this._validators = {};
    }

    pushForm(formName) {
        if (this._validators[formName] == undefined) {
            this._validators[formName] = {};
        }
    }

    pushFields(formName, fieldsName, $v) {
        this.pushForm(formName);
        this._validators[formName][fieldsName] = $v;
    }

    validate(formName) {
        let result = true;

        if (typeof this._validators[formName] == "object") {
            Object.entries(this._validators[formName]).forEach((item) => {
                let $v = item[1];

                $v.$touch();

                if ($v.$invalid) {
                    result = false;
                }
            });
        }

        if (result) {
            this.reset(formName);
        }

        return result;
    }

    reset(formName) {
        Object.entries(this._validators[formName]).forEach((item) => {
            let $v = item[1];
            $v.$reset();
        });
    }

}
