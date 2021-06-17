export default class Alert {
    constructor() {
        this.message = "message";
        this.show = false;
        this.type = "info";
        this.icon = "fa-info";
    }

    /**
     * Define a success alert with a given message.
     * 
     * @param {String} message 
     */
    success(message) {
        this.message = message;
        this.show = true;
        this.type = "success";
        this.icon = "fa-check";
    }

    /**
     * Define a info alert with a given message.
     *
     * @param {String} message
     */
    info(message) {
        this.message = message;
        this.show = true;
        this.type = "info";
        this.icon = "fa-info";
    }

    /**
     * Define a warning alert with a given message.
     *
     * @param {String} message
     */
    warning(message) {
        this.message = message;
        this.show = true;
        this.type = "warning";
        this.icon = "fa-exclamation";
    }

    /**
     * Define a error alert with a given message.
     *
     * @param {String} message
     */
    error(message) {
        this.message = message;
        this.show = true;
        this.type = "danger";
        this.icon = "fa-times";
    }
}
