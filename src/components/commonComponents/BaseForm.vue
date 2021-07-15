<template>
    <v-form @submit.prevent="submit()">
        <v-card>
            <!-- Form title -->
            <v-card-title v-if="showTitle">{{ title }}</v-card-title>

            <!-- Slot with inputs -->
            <v-card-text>
                <slot></slot>
            </v-card-text>

            <!-- Submit button -->
            <v-card-actions>
                <slot name="submit">
                    <v-btn color="primary" type="submit" rounded text>
                        <v-icon left v-if="showIcon">{{ submitIcon }}</v-icon>
                        {{ submitText }}
                    </v-btn>
                </slot>
            </v-card-actions>
        </v-card>
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
            showTitle() {
                return this.title != "";
            },
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