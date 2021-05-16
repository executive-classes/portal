<template>
    <v-row>
        <v-col cols="12" lg="7" xl="6" class="info d-none d-md-flex align-center justify-center">
            <v-container>
            </v-container>
        </v-col>
        <v-col cols="12" lg="5" xl="6" class="d-flex align-center">
            <v-container>
                <div class="pa-7 pa-sm-12">
                    <v-row>
                        <v-col cols="12" lg="9" xl="6">
                            <img src="@/assets/images/logo-icon.png" />
                            <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Login</h2>

                            <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                            >
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    class="mt-4"
                                    required
                                    outlined
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    label="Password"
                                    required
                                    outlined
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                ></v-text-field>

                                <v-btn
                                    :disabled="!valid"
                                    color="info"
                                    block
                                    class="mr-4"
                                    submit
                                    @click="submit"
                                >Sign In</v-btn>
                            </v-form>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            valid: true,
            email: "",
            password: "",
            showPassword: false,
            passwordRules: [
                v => !!v || "Password is required"
            ],
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ]
        }),
        methods: {
            submit() {
                this.$refs.form.validate();
                if (this.$refs.form.validate(true)) {
                    this.$router.push({ path: "/dashboards/analytical" });
                }
            }
        }
    };
</script>
