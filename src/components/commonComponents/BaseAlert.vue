<template>
    <v-alert
        v-model="$alert.show"
        dismissible
        transition="expand-transition"
        :color="$alert.type"
        border="left"
        elevation="2"
        colored-border
        :icon="$alert.icon"
    >{{$alert.message}}</v-alert>
</template>

<script>
    export default {
        name: "BaseAlert"
    };
</script>