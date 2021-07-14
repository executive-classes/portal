<template>
    <div>
        <h1>Bem vindo {{user.name}}</h1>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",

        data: () => ({
            user: {}
        }),

        created() {
            this.user = this.$store.getters.user;
        }
    };
</script>