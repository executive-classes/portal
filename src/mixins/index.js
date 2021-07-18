import moment from "moment";

export const formatter = {
    methods: {
        formatDate(date) {
            return moment(date).format("DD/MM/YYYY, HH:mm:ss");
        },

        formatAddress(address) {
            return `${address.street}, ${address.number} - ${address.city}, ${address.state}`
        }
    }
}
