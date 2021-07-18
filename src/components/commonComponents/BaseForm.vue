<template>
    <v-form @submit.prevent="submit()">
        <base-card :title="title" :subtitle="subtitle">
            <slot></slot>
            
            <template slot="actions">
                <slot name="submit">
                    <v-btn color="primary" type="submit" rounded text>
                        <v-icon left v-if="showIcon">{{ submitIcon }}</v-icon>
                        {{ submitText }}
                    </v-btn>
                </slot>
            </template>
        </base-card>
    </v-form>
</template>

<script>
    export default {
        name: "BaseForm",

        props: {
            title: {
                type: String,
                default: ""
            },
            subtitle: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                required: true
            },
            args: {
                type: Object
            },
            submitText: {
                type: String,
                default: "Salvar"
            },
            submitIcon: {
                type: String,
                default: ""
            }
        },

        computed: {
            showIcon() {
                return this.submitIcon != "";
            }
        },

        methods: {
            submit() {
                if (this.$validator.validate(this.name)) {
                    this.$emit("submit", this.args);
                }
            },
        },

        created() {
            this.$validator.pushForm(this.name);
        }
    };
</script>