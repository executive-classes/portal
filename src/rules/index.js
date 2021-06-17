const rules = {
    required: input => !!input || 'Necessário.',
    email: input => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(input) || 'E-mail inválido.'
    },
    password: input => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W|_])(?=.{8}).*$/
        return pattern.test(input) || 'E-mail inválido.'
    },
    same(value) {
        return input => {
            return input == value || 'Os valores são diferentes.';
        }
    },
    different(value) {
        return input => {
            return input != value || 'Os valores são iguais.';
        }
    },
    max(value) { return input => parseInt(input) <= value || `Máximo de ${value}` },
    min(value) { return input => parseInt(input) >= value || `Mínimo de ${value}` },
}

export default rules;