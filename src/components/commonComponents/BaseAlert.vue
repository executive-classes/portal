<template>
    <v-alert
        v-model="alert"
        dismissible
        transition="expand-transition"
        color="danger"
        border="left"
        elevation="2"
        colored-border
        icon="fa-exclamation"
    >{{message}}</v-alert>
</template>

<script>
    export default {
        name: "BaseAlert",

        props: {
            type: {
                type: String,
                default: "danger"
            },
            icon: {
                type: String,
                default: "fa-exclamation"
            },
            alert: {
                type: Boolean,
                default: false
            },
            message: {
                type: String,
                default: ""
            }
        }
    };
</script>