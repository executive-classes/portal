import $rules from '@/rules';

export default class Validator {

    static validate(rules) {
        let result = [];

        rules.forEach(e => {
            let info = e.split(':');
            let rule = info[0];
            let params = info[1] != undefined ? info[1].split(',') : null;

            if (params) {
                result.push($rules[rule](...params));
            } else {
                result.push($rules[rule]);
            }

        });

        return result;
    }
}
