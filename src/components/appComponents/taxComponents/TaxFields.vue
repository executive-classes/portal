<template>
    <v-row>
        <!-- Tax -->
        <v-col cols="12" :lg="hasAlt ? 6 : 12">
            <v-row>
                <!-- Tax -->
                <v-col cols="5" sm="3" lg="6">
                    <form-group
                        :validator="$v.model.tax"
                        attribute="tipo"
                        :messages="errorMessages"
                        v-slot="props"
                    >
                        <v-select
                            return-object
                            label="Tipo"
                            prepend-icon="mdi-file-document"
                            :value="model.tax.id"
                            :items="taxes"
                            item-text="name"
                            item-value="id"
                            :error-messages="props.error"
                            @change="tax_update($event, 'tax')"
                            @blur="tax_check()"
                        ></v-select>
                    </form-group>
                </v-col>

                <!-- Tax Code -->
                <v-col cols="7" sm="9" lg="6">
                    <form-group :validator="$v.model.tax.code" attribute="documento" v-slot="props">
                        <v-text-field
                            type="text"
                            label="Doc"
                            v-model="model.tax.code"
                            v-maska="get_tax_mask('tax')"
                            :error-messages="props.error"
                            @input="$v.model.tax.code.$touch()"
                            @blur="$v.model.tax.code.$touch()"
                        ></v-text-field>
                    </form-group>
                </v-col>
            </v-row>
        </v-col>

        <!-- Tax Alt -->
        <v-col cols="12" lg="6" v-if="hasAlt">
            <v-row>
                <!-- Tax -->
                <v-col cols="5" sm="3" lg="6">
                    <form-group
                        :validator="$v.model.tax_alt"
                        attribute="tipo"
                        :messages="errorMessages"
                        v-slot="props"
                    >
                        <v-select
                            return-object
                            clearable
                            label="Tipo"
                            prepend-icon="mdi-file-document-outline"
                            :value="model.tax_alt.id"
                            :items="taxes_alt"
                            item-text="name"
                            item-value="id"
                            :error-messages="props.error"
                            @change="tax_update($event, 'tax_alt')"
                            @blur="tax_check()"
                        ></v-select>
                    </form-group>
                </v-col>

                <!-- Tax Code -->
                <v-col cols="7" sm="9" lg="6">
                    <form-group :validator="$v.model.tax_alt.code" attribute="documento" v-slot="props">
                        <v-text-field
                            type="text"
                            label="Doc"
                            v-model="model.tax_alt.code"
                            v-maska="get_tax_mask('tax_alt')"
                            :error-messages="props.error"
                            @input="$v.model.tax_alt.code.$touch()"
                            @blur="$v.model.tax_alt.code.$touch()"
                        ></v-text-field>
                    </form-group>
                </v-col>
            </v-row>
        </v-col>

        <!-- UF -->
        <v-col cols="12" v-show="has_ie">
            <form-group :validator="$v.model.uf" attribute="estado" v-slot="props">
                <v-select
                    return-object
                    label="Estado"
                    prepend-icon="mdi-map"
                    :value="model.uf.short_name"
                    :items="states"
                    item-text="name"
                    item-value="short_name"
                    :error-messages="props.error"
                    @change="uf_update"
                    @blur="$v.model.uf.$touch()"
                ></v-select>
            </form-group>
        </v-col>
    </v-row>
</template>

<script>
    import { required, not, requiredIf } from "vuelidate/lib/validators";

    export default {
        name: "TaxFields",

        props: {
            model: {
                type: Object,
                required: true
            },
            strictTaxes: {
                type: Boolean,
                default: false
            },
            hasAlt: {
                type: Boolean,
                default: true
            },
            formName: {
                type: String,
                required: true
            }
        },

        data: () => ({
            taxes: [],
            taxes_alt: [],
            states: [],
            errorMessages: {
                different: "Os tipos devem ser diferentes."
            }
        }),

        validations: {
            model: {
                tax: {
                    required,
                    different: not( (type, model) => model.tax_alt && type.id == model.tax_alt.id ),
                    code: {
                        required
                    }
                },
                tax_alt: {
                    different: not( (type, model) => type.id && type.id == model.tax.id ),
                    code: {
                        requiredIf: requiredIf( tax => tax.id != null )
                    }
                },
                uf: {
                    requiredIf: requiredIf( model => model.tax_alt ? model.tax.id == "ie" : model.tax.id == "ie" || model.tax_alt.id == "ie" )
                }
            }
        },

        computed: {
            has_ie() {
                if (this.model.tax_alt) {
                    return this.model.tax.id == "ie";
                }

                return this.model.tax.id == "ie" || this.model.tax_alt.id == "ie";
            }
        },

        methods: {
            tax_update(event, type) {
                if (event) {
                    this.model[type].fill(event ? event : {});
                } else {
                    this.model[type].clean();
                }
                
                this.tax_check();

                if (type == 'tax_alt') {
                    this.$v.model.tax_alt.code.$touch();
                }
            },

            uf_update(event) {
                this.model.uf.fill(event)
                this.$v.model.uf.$touch()
            },

            tax_check() {
                this.$v.model.tax.$touch();
                this.$v.model.tax_alt.$touch();
            },

            get_tax_mask(type) {
                if (this.model[type].id == "ie") {
                    return this.model.uf.ie_mask;
                }

                return this.model[type].mask;
            }
        },

        created() {
            // Register the validator
            this.$validator.pushFields(this.formName, "tax", this.$v);

            // Get the taxes
            this.$http.get("taxes").then(response => {
                this.taxes = this.strictTaxes
                    ? response.primary
                    : response.data;
                this.taxes_alt = this.strictTaxes 
                    ? response.secondary 
                    : response.data;
            });

            // Get the states
            this.$http
                .get("states")
                .then(response => (this.states = response.data));
        }
    };
</script>