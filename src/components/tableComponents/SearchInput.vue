<template>
    <v-text-field
        v-model="input"
        :label="label"
        :hide-details="details ? true : 'auto'"
        :prepend-inner-icon="icon"
        :class="classes"
        @input="search()"
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
        }),

        methods: {
            search() {
                this.$emit('input', this.input);
            }
        }
    };
</script>
