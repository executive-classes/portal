const rules = {
    required: input => !!input || 'Necessário.',
    max(value) { return input => parseInt(input) <= value || `Máximo de ${value}` },
    min(value) { return input => parseInt(input) >= value || `Mínimo de ${value}` },
    email: input => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(input) || 'E-mail inválido.'
    }
}

export default rules;