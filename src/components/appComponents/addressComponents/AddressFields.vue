<template>
    <v-row>
        <!-- Country -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.address.country" attribute="país" v-slot="props">
                <v-select
                    return-object
                    label="País"
                    v-model="address.country"
                    :items="countries"
                    item-text="name_pt"
                    item-value="short_name"
                    :error-messages="props.error"
                    @change="$v.address.country.$touch()"
                    @blur="$v.address.country.$touch()"
                ></v-select>
            </form-group>
        </v-col>

        <!-- Cep -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.address.zip" attribute="CEP" v-slot="props">
                <v-text-field
                    type="text"
                    label="CEP"
                    :append-outer-icon="onlySearch ? 'fa-search-location' : ''"
                    v-model="address.zip"
                    v-maska="'#####-###'"
                    :hint="onlySearch ? 'Para preencher o endereço, pesquise pelo CEP' : ''"
                    :persistent-hint="onlySearch"
                    :error-messages="props.error"
                    @input="$v.address.zip.$touch()"
                    @blur="$v.address.zip.$touch()"
                    @click:append-outer="search()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Rua -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.address.street" attribute="rua" v-slot="props">
                <v-text-field
                    :disabled="onlySearch"
                    type="text"
                    label="Endereço"
                    v-model="address.street"
                    :error-messages="props.error"
                    @input="$v.address.street.$touch()"
                    @blur="$v.address.street.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Number -->
        <v-col cols="6" md="2">
            <form-group :validator="$v.address.number" attribute="número" v-slot="props">
                <v-text-field
                    type="text"
                    label="Número / KM"
                    v-model="address.number"
                    :error-messages="props.error"
                    @input="$v.address.number.$touch()"
                    @blur="$v.address.number.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Complement -->
        <v-col cols="6" md="4">
            <v-text-field
                type="text"
                label="Complemento"
                v-model="address.complement"
            ></v-text-field>
        </v-col>

        <!-- District -->
        <v-col cols="12" md="5">
            <form-group :validator="$v.address.district" attribute="bairro" v-slot="props">
                <v-text-field
                    :disabled="onlySearch"
                    type="text"
                    label="Bairro"
                    v-model="address.district"
                    :error-messages="props.error"
                    @input="$v.address.district.$touch()"
                    @blur="$v.address.district.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- City -->
        <v-col cols="12" md="5">
            <form-group :validator="$v.address.city" attribute="cidade" v-slot="props">
                <v-text-field
                    :disabled="onlySearch"
                    type="text"
                    label="Cidade"
                    v-model="address.city"
                    :error-messages="props.error"
                    @input="$v.address.city.$touch()"
                    @blur="$v.address.city.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- State -->
        <v-col cols="12" md="2">
            <form-group :validator="$v.address.state" attribute="estado" v-slot="props">
                <v-text-field
                    :disabled="onlySearch"
                    type="text"
                    label="Estado"
                    v-model="address.state"
                    counter="2"
                    :error-messages="props.error"
                    @input="$v.address.state.$touch()"
                    @blur="$v.address.state.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

    </v-row>
</template>

<script>
    import { required, maxLength } from "vuelidate/lib/validators";

    export default {
        name: "AddressFields",

        props: {
            address: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        },

        data: () => ({
            countries: []
        }),

        validations: {
            address: {
                country: {
                    required
                },
                zip: {
                    required
                },
                street: {
                    required
                },
                number: {
                    required
                },
                district: {
                    required
                },
                city: {
                    required
                },
                state: {
                    required,
                    maxLength: maxLength(2)
                },
            }
        },

        computed: {
            onlySearch() {
                return this.address.country ? this.address.country.short_name == 'BR' : true;
            }
        },

        methods: {
            search() {
                if (!this.onlySearch) {
                    return;
                }

                this.address
                    .search()
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            // Register the validator
            this.$validator.pushFields(this.formName, "addressData", this.$v);

            // Get the countries
            this.$http
                .get("countries")
                .then(response => (this.countries = response.data));
        }
    }
</script>