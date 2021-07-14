<template>
    <v-card>
        <v-form @submit.prevent="submit()">
            <v-card-title>Documentos</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Tax -->
                    <v-col cols="5" sm="3" lg="3">
                        <v-select
                            return-object
                            label="Tipo"
                            prepend-icon="mdi-file-document"
                            v-model="employee.user.tax_type"
                            :items="taxes"
                            item-text="name"
                            item-value="id"
                            :error-messages="errors.tax_type"
                            @change="tax_type_check('tax_type')"
                            @blur="tax_type_check('tax_type')"
                        ></v-select>
                    </v-col>
                    <v-col cols="7" sm="9" lg="3">
                        <v-text-field
                            type="text"
                            label="Doc"
                            v-model="employee.user.tax_code"
                            v-maska="tax_type_mask"
                            :error-messages="errors.tax_code"
                            @input="$v.employee.user.tax_code.$touch()"
                            @blur="$v.employee.user.tax_code.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- Tax Alt -->
                    <v-col cols="5" sm="3" lg="3">
                        <v-select
                            return-object
                            label="Tipo"
                            prepend-icon="mdi-file-document-outline"
                            v-model="employee.user.tax_type_alt"
                            :items="taxes_alt"
                            item-text="name"
                            item-value="id"
                            :error-messages="errors.tax_type_alt"
                            @change="tax_type_check('tax_type_alt')"
                            @blur="tax_type_check('tax_type_alt')"
                        ></v-select>
                    </v-col>
                    <v-col cols="7" sm="9" lg="3">
                        <v-text-field
                            type="text"
                            label="Doc"
                            v-model="employee.user.tax_code_alt"
                            v-maska="tax_type_alt_mask"
                            :error-messages="errors.tax_code_alt"
                            @input="$v.employee.user.tax_code_alt.$touch()"
                            @blur="$v.employee.user.tax_code_alt.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- UF -->
                    <v-col cols="12" v-show="has_ie">
                        <v-select
                            return-object
                            label="Estado"
                            prepend-icon="mdi-map"
                            v-model="employee.user.uf"
                            :items="states"
                            item-text="name"
                            item-value="short_name"
                            :error-messages="errors.uf"
                            @change="$v.employee.user.uf.$touch()"
                            @blur="$v.employee.user.uf.$touch()"
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
        name: "EmployeeTax",

        props: {
            employee: {
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
            employee: {
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

                if (this.$v.employee.user.tax_type.$dirty) {
                    !this.$v.employee.user.tax_type.required &&
                        errors.tax_type.push("O tipo é necessário");
                    !this.$v.employee.user.tax_type.different &&
                        errors.tax_type.push("Os tipos devem ser diferentes");
                }

                if (this.$v.employee.user.tax_code.$dirty) {
                    !this.$v.employee.user.tax_code.required &&
                        errors.tax_code.push("O documento é necessário");
                }

                if (this.$v.employee.user.tax_type_alt.$dirty) {
                    !this.$v.employee.user.tax_type_alt.different &&
                        errors.tax_type_alt.push("Os tipos devem ser diferentes");
                }

                if (this.$v.employee.user.tax_code_alt.$dirty) {
                    !this.$v.employee.user.tax_code_alt.requiredIf &&
                        errors.tax_code_alt.push("O documento é necessário");
                }

                if (this.$v.employee.user.uf.$dirty) {
                    !this.$v.employee.user.uf.requiredIf &&
                        errors.uf.push("O estado é necessário");
                }

                return errors;
            },
            tax_type_mask() {
                if (this.employee.user.tax_type == null) {
                    return null;
                }

                if (this.employee.user.tax_type.id == "ie") {
                    if (this.employee.user.uf == undefined) {
                        return null;
                    }

                    return this.employee.user.uf.ie_mask;
                }

                return this.employee.user.tax_type.mask;
            },
            tax_type_alt_mask() {
                if (this.employee.user.tax_type_alt == null) {
                    return null;
                }

                if (this.employee.user.tax_type_alt.id == "ie") {
                    if (this.employee.user.uf == undefined) {
                        return null;
                    }

                    return this.employee.user.uf.ie_mask;
                }

                return this.employee.user.tax_type_alt.mask;
            },
            has_ie() {
                if (this.employee.user.tax_type == null && this.employee.user.tax_type_alt == null) {
                    return false;
                }

                if (this.employee.user.tax_type_alt == null) {
                    return this.employee.user.tax_type.id == "ie";
                }

                if (this.employee.user.tax_type == null) {
                    return this.employee.user.tax_type_alt.id == "ie";
                }

                return (
                    this.employee.user.tax_type.id == "ie" ||
                    this.employee.user.tax_type_alt.id == "ie"
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
                this.$v.employee.user[field].$touch();

                if (this.$v.employee.user.tax_type.$dirty) {
                    this.$v.employee.user.tax_type.$touch();
                }

                if (this.$v.employee.user.tax_type_alt.$dirty) {
                    this.$v.employee.user.tax_type_alt.$touch();
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