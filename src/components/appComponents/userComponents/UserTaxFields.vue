<template>
    <v-row>
        <!-- Tax -->
        <v-col cols="5" sm="3" lg="3">
            <form-group
                :validator="$v.user.tax_type"
                attribute="tipo"
                :messages="errorMessages"
                v-slot="props"
            >
                <v-select
                    return-object
                    label="Tipo"
                    prepend-icon="mdi-file-document"
                    v-model="user.tax_type"
                    :items="taxes"
                    item-text="name"
                    item-value="id"
                    :error-messages="props.error"
                    @change="tax_type_check()"
                    @blur="tax_type_check()"
                ></v-select>
            </form-group>
        </v-col>

        <!-- Tax Code -->
        <v-col cols="7" sm="9" lg="3">
            <form-group :validator="$v.user.tax_code" attribute="documento" v-slot="props">
                <v-text-field
                    type="text"
                    label="Doc"
                    v-model="user.tax_code"
                    v-maska="tax_type_mask"
                    :error-messages="props.error"
                    @input="$v.user.tax_code.$touch()"
                    @blur="$v.user.tax_code.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Tax Alt -->
        <v-col cols="5" sm="3" lg="3">
            <form-group
                :validator="$v.user.tax_type_alt"
                attribute="tipo"
                :messages="errorMessages"
                v-slot="props"
            >
                <v-select
                    return-object
                    label="Tipo"
                    prepend-icon="mdi-file-document-outline"
                    v-model="user.tax_type_alt"
                    :items="taxes_alt"
                    item-text="name"
                    item-value="id"
                    :error-messages="props.error"
                    @change="tax_type_check()"
                    @blur="tax_type_check()"
                ></v-select>
            </form-group>
        </v-col>

        <!-- Tax Code Alt -->
        <v-col cols="7" sm="9" lg="3">
            <form-group :validator="$v.user.tax_code_alt" attribute="documento" v-slot="props">
                <v-text-field
                    type="text"
                    label="Doc"
                    v-model="user.tax_code_alt"
                    v-maska="tax_type_alt_mask"
                    :error-messages="props.error"
                    @input="$v.user.tax_code_alt.$touch()"
                    @blur="$v.user.tax_code_alt.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- UF -->
        <v-col cols="12" v-show="has_ie">
            <form-group :validator="$v.user.uf" attribute="estado" v-slot="props">
                <v-select
                    return-object
                    label="Estado"
                    prepend-icon="mdi-map"
                    v-model="user.uf"
                    :items="states"
                    item-text="name"
                    item-value="short_name"
                    :error-messages="props.error"
                    @change="$v.user.uf.$touch()"
                    @blur="$v.user.uf.$touch()"
                ></v-select>
            </form-group>
        </v-col>
    </v-row>
</template>

<script>
    import { required, not, requiredIf } from "vuelidate/lib/validators";

    export default {
        name: "UserTaxFields",

        props: {
            user: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
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
            states: [],
            errorMessages: {
                different: "Os tipos devem ser diferentes."
            }
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
            tax_type_mask() {
                return this.get_tax_type_mask("tax_type");
            },
            tax_type_alt_mask() {
                return this.get_tax_type_mask("tax_type_alt");
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
            tax_type_check() {
                this.$v.user.tax_type.$touch();
                this.$v.user.tax_type_alt.$touch();
            },

            get_tax_type_mask(type) {
                if (this.user[type] == null) {
                    return null;
                }

                if (this.user[type].id == "ie") {
                    if (this.user.uf == undefined) {
                        return null;
                    }

                    return this.user.uf.ie_mask;
                }

                return this.user[type].mask;
            }
        },

        created() {
            // Register the validator
            this.$validator.pushFields(this.formName, "userTax", this.$v);

            // Get the taxes
            this.$http.get("taxes").then(response => {
                this.taxes = response.data;
                this.taxes_alt = this.taxes_alt.concat(response.data);
            });

            // Get the states
            this.$http
                .get("states")
                .then(response => (this.states = response.data));
        }
    };
</script>