<template>
    <v-row>
        <v-col cols="12">
            <form-group :validator="$v.employee.position" attribute="cargo" v-slot="props">
                <v-select
                    return-object
                    label="Cargo"
                    prepend-icon="mdi-clipboard-account-outline"
                    v-model="employee.position"
                    :items="positions"
                    item-text="name"
                    item-value="id"
                    :error-messages="props.error"
                    @change="$v.employee.position.$touch()"
                    @blur="$v.employee.position.$touch()"
                ></v-select>
            </form-group>
        </v-col>
    </v-row>
</template>

<script>
    import { required } from "vuelidate/lib/validators";

    export default {
        name: "EmployeePositionFields",

        props: {
            employee: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        },

        data: () => ({
            positions: []
        }),

        validations: {
            employee: {
                position: {
                    required
                }
            }
        },

        created() {
            this.$validator.pushFields(this.formName, "employeePosition", this.$v);

            this.$http.get("employees/positions").then(response => {
                this.positions = response.data;
            });
        }
    };
</script>
