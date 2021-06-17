<template>
    <v-card>
        <v-form @submit.prevent="submit()">
            <v-card-title>Documentos</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Tax -->
                    <v-col cols="5" sm="3" lg="3">
                        <v-select
                            v-model="user.tax_type"
                            :items="taxes"
                            item-text="name"
                            item-value="id"
                            label="Tipo"
                            return-object
                            prepend-icon="mdi-file-document"
                            :error-messages="errors.tax_type"
                            @change="tax_type_check('tax_type')"
                            @blur="tax_type_check('tax_type')"
                        ></v-select>
                    </v-col>
                    <v-col cols="7" sm="9" lg="3">
                        <v-text-field
                            v-model="user.tax_code"
                            v-maska="tax_type_mask"
                            type="text"
                            label="Doc"
                            :error-messages="errors.tax_code"
                            @input="$v.user.tax_code.$touch()"
                            @blur="$v.user.tax_code.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- Tax Alt -->
                    <v-col cols="5" sm="3" lg="3">
                        <v-select
                            v-model="user.tax_type_alt"
                            :items="taxes_alt"
                            item-text="name"
                            item-value="id"
                            label="Tipo"
                            return-object
                            prepend-icon="mdi-file-document-outline"
                            :error-messages="errors.tax_type_alt"
                            @change="tax_type_check('tax_type_alt')"
                            @blur="tax_type_check('tax_type_alt')"
                        ></v-select>
                    </v-col>
                    <v-col cols="7" sm="9" lg="3">
                        <v-text-field
                            v-model="user.tax_code_alt"
                            v-maska="tax_type_alt_mask"
                            type="text"
                            label="Doc"
                            :error-messages="errors.tax_code_alt"
                            @input="$v.user.tax_code_alt.$touch()"
                            @blur="$v.user.tax_code_alt.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- UF -->
                    <v-col cols="12" v-show="has_ie">
                        <v-select
                            v-model="user.uf"
                            :items="states"
                            item-text="name"
                            item-value="short_name"
                            return-object
                            label="Estado"
                            prepend-icon="mdi-map"
                            :error-messages="errors.uf"
                            @change="$v.user.uf.$touch()"
                            @blur="$v.user.uf.$touch()"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" type="submit" rounded text>Salvar alterações</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    import { required, not, requiredIf } from "vuelidate/lib/validators";

    export default {
        name: "ProfileTax",

        props: {
            user: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            taxes: [],
            taxes_alt: [
                {
                    id: null,
                    name: "Nenhum",
                    mask: null
                }
            ],
            states: []
        }),

        validations: {
            user: {
                tax_type: {
                    required,
                    different: not(
                        (type, user) =>
                            user.tax_type_alt != null &&
                            type.id == user.tax_type_alt.id
                    )
                },
                tax_code: {
                    required
                },
                tax_type_alt: {
                    different: not((type, user) => type.id == user.tax_type.id)
                },
                tax_code_alt: {
                    requiredIf: requiredIf(
                        user =>
                            user.tax_type_alt != null &&
                            user.tax_type_alt.id != null
                    )
                },
                uf: {
                    requiredIf: requiredIf(
                        user =>
                            (user.tax_type != null && user.tax_type.id == "ie") ||
                            (user.tax_type_alt != null &&
                                user.tax_type_alt.id == "ie")
                    )
                }
            }
        },

        computed: {
            errors() {
                const errors = {
                    tax_type: [],
                    tax_code: [],
                    tax_type_alt: [],
                    tax_code_alt: [],
                    uf: []
                };

                if (this.$v.user.tax_type.$dirty) {
                    !this.$v.user.tax_type.required &&
                        errors.tax_type.push("O tipo é necessário");
                    !this.$v.user.tax_type.different &&
                        errors.tax_type.push("Os tipos devem ser diferentes");
                }

                if (this.$v.user.tax_code.$dirty) {
                    !this.$v.user.tax_code.required &&
                        errors.tax_code.push("O documento é necessário");
                }

                if (this.$v.user.tax_type_alt.$dirty) {
                    !this.$v.user.tax_type_alt.different &&
                        errors.tax_type_alt.push("Os tipos devem ser diferentes");
                }

                if (this.$v.user.tax_code_alt.$dirty) {
                    !this.$v.user.tax_code_alt.requiredIf &&
                        errors.tax_code_alt.push("O documento é necessário");
                }

                if (this.$v.user.uf.$dirty) {
                    !this.$v.user.uf.requiredIf &&
                        errors.uf.push("O estado é necessário");
                }

                return errors;
            },
            tax_type_mask() {
                if (this.user.tax_type == null) {
                    return null;
                }

                if (this.user.tax_type.id == "ie") {
                    if (this.user.uf == undefined) {
                        return null;
                    }

                    return this.user.uf.ie_mask;
                }

                return this.user.tax_type.mask;
            },
            tax_type_alt_mask() {
                if (this.user.tax_type_alt == null) {
                    return null;
                }

                if (this.user.tax_type_alt.id == "ie") {
                    if (this.user.uf == undefined) {
                        return null;
                    }

                    return this.user.uf.ie_mask;
                }

                return this.user.tax_type_alt.mask;
            },
            has_ie() {
                if (this.user.tax_type == null && this.user.tax_type_alt == null) {
                    return false;
                }

                if (this.user.tax_type_alt == null) {
                    return this.user.tax_type.id == "ie";
                }

                if (this.user.tax_type == null) {
                    return this.user.tax_type_alt.id == "ie";
                }

                return (
                    this.user.tax_type.id == "ie" ||
                    this.user.tax_type_alt.id == "ie"
                );
            }
        },

        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$v.$reset();
                    this.$emit("submit", "tax");
                }
            },
            tax_type_check(field) {
                this.$v.user[field].$touch();

                if (this.$v.user.tax_type.$dirty) {
                    this.$v.user.tax_type.$touch();
                }

                if (this.$v.user.tax_type_alt.$dirty) {
                    this.$v.user.tax_type_alt.$touch();
                }
            }
        },

        created() {
            this.$http.get("taxes").then(response => {
                this.taxes = response.data;
                this.taxes_alt = this.taxes_alt.concat(response.data);
            });
            this.$http
                .get("states")
                .then(response => (this.states = response.data));
        }
    };
</script>