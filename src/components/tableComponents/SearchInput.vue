<template>
    <v-text-field
        v-model="input"
        :label="label"
        :hide-details="details ? true : 'auto'"
        :prepend-inner-icon="icon"
        :class="classes"
        @input="$emit('input', this.input)"
    ></v-text-field>
</template>

<script>
    export default {
        name: "SearchInput",

        props: {
            label: {
                type: String,
                default: "Pesquisar"
            },
            icon: {
                type: String,
                default: "mdi-magnify"
            },
            classes: {
                type: String,
                default: ""
            },
            details: {
                type: Boolean,
                default: true
            }
        },

        data: () => ({
            input: ''
        })
    };
</script>
