<template>
    <base-card :title="student.name" icon="fa-user-graduate">
        <base-alert></base-alert>

        <base-tabs>
            <v-tab>
                <v-icon left>fa-id-card</v-icon>Dados
            </v-tab>
            <v-tab>
                <v-icon left>fa-file-alt</v-icon>Documentos
            </v-tab>
            <v-tab>
                <v-icon left>fa-toggle-on</v-icon>Mudar Status
            </v-tab>
            <v-tab>
                <v-icon left>fa-cog</v-icon>Mudar Configurações
            </v-tab>

            <v-tab-item>
                <base-form
                    name="studentData"
                    :args="{type: 'data'}"
                    title="Dados de Perfil"
                    @submit="submit($event)"
                >
                    <StudentTimestampsFields :student="student"></StudentTimestampsFields>
                    <UserDataFields :user="student.user" formName="studentData"></UserDataFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="studentTax"
                    :args="{type: 'tax'}"
                    title="Documentos"
                    @submit="submit($event)"
                >
                    <UserTaxFields :user="student.user" formName="studentTax"></UserTaxFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="studentStatus"
                    :args="{type: 'status'}"
                    title="Mudar Status"
                    @submit="submit($event)"
                >
                    <StudentStatusFields :student="student"></StudentStatusFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="studentSettings"
                    :args="{type: 'settings'}"
                    title="Configurações de sistema"
                    @submit="submit($event)"
                >
                    <UserSettingsFields :user="student.user"></UserSettingsFields>
                </base-form>
            </v-tab-item>
        </base-tabs>
    </base-card>
</template>

<script>
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import UserSettingsFields from "@/components/appComponents/userComponents/UserSettingsFields";
    import StudentTimestampsFields from "@/components/appComponents/studentComponents/StudentTimestampsFields";
    import StudentStatusFields from "@/components/appComponents/studentComponents/StudentStatusFields";
    import Student from "@/domain/student/Student";

    export default {
        name: "Student",

        components: {
            UserDataFields,
            UserTaxFields,
            UserSettingsFields,
            StudentTimestampsFields,
            StudentStatusFields
        },

        data: () => ({
            student: new Student()
        }),

        methods: {
            submit(action) {
                this.student
                    .update(action.type)
                    .then(() => this.$alert.success("Aluno atualizado."))
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`students/${this.$route.params.id}`)
                .then(response => (this.student = new Student(response.data)))
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>