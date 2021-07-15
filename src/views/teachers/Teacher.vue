<template>
    <base-card :title="teacher.name" icon="fa-user-tie">
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
                    name="teacherData"
                    :args="{type: 'data'}"
                    title="Dados de Perfil"
                    @submit="submit($event)"
                >
                    <TeacherTimestampsFields :teacher="teacher"></TeacherTimestampsFields>
                    <UserDataFields :user="teacher.user" formName="teacherData"></UserDataFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="teacherTax"
                    :args="{type: 'tax'}"
                    title="Documentos"
                    @submit="submit($event)"
                >
                    <UserTaxFields :user="teacher.user" formName="teacherTax"></UserTaxFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="teacherStatus"
                    :args="{type: 'status'}"
                    title="Mudar Status"
                    @submit="submit($event)"
                >
                    <TeacherStatusFields :teacher="teacher"></TeacherStatusFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="teacherSettings"
                    :args="{type: 'settings'}"
                    title="Configurações de sistema"
                    @submit="submit($event)"
                >
                    <UserSettingsFields :user="teacher.user"></UserSettingsFields>
                </base-form>
            </v-tab-item>
        </base-tabs>
    </base-card>
</template>

<script>
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import UserSettingsFields from "@/components/appComponents/userComponents/UserSettingsFields";
    import TeacherTimestampsFields from "@/components/appComponents/teacherComponents/TeacherTimestampsFields";
    import TeacherStatusFields from "@/components/appComponents/teacherComponents/TeacherStatusFields";
    import Teacher from "@/domain/teacher/Teacher";

    export default {
        name: "Teacher",

        components: {
            UserDataFields,
            UserTaxFields,
            UserSettingsFields,
            TeacherTimestampsFields,
            TeacherStatusFields
        },

        data: () => ({
            teacher: new Teacher()
        }),

        methods: {
            submit(action) {
                this.teacher
                    .update(action.type)
                    .then(() => this.$alert.success("Professor atualizado."))
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`teachers/${this.$route.params.id}`)
                .then(response => (this.teacher = new Teacher(response.data)))
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>