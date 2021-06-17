<template>
    <v-alert
        v-model="alert.show"
        dismissible
        transition="expand-transition"
        :color="alert.type"
        border="left"
        elevation="2"
        colored-border
        :icon="alert.icon"
    >{{alert.message}}</v-alert>
</template>

<script>
    import Alert from "../../domain/alert/Alert";
    
    export default {
        name: "BaseAlert",

        props: {
            alert: {
                type: Object,
                default: new Alert()
            }
        }
    };
</script>