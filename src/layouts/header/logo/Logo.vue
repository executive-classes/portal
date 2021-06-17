<template>
    <!--- Logo part --->
    <v-toolbar-title
        class="align-center d-flex logo-width"
        :class="`${showLogo ? 'logo-width' : ''}`"
        v-if="navbarColor !== 'white'"
    >
        <span class="logo-icon">
            <img src="../../../assets/images/logo-light-icon.png" class="mt-2" style="height: 1.5em" />
        </span>
        <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
            <img src="../../../assets/images/logo-light-text.png" class="mt-2" style="height: 1.5em" />
        </span>
    </v-toolbar-title>

    <!--- Dark Logo part --->
    <v-toolbar-title
        class="align-center d-flex logo-width"
        :class="`${showLogo ? 'logo-width' : ''}`"
        v-else
    >
        <span class="logo-icon">
            <img src="../../../assets/images/logo-icon.png" class="mt-2" style="height: 1.5em" />
        </span>
        <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
            <img src="../../../assets/images/logo-text.png" class="mt-2" style="height: 1.5em" />
        </span>
    </v-toolbar-title>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Logo",

        computed: {
            ...mapState(["navbarColor", "showLogo"])
        }
    };
</script>

<style lang="scss">
    .hidelogo {
        display: none;
    }
</style>