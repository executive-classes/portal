<template>
    <base-card :title="teacher.name" icon="fa-chalkboard-teacher">
        <base-alert></base-alert>

        <v-tabs :vertical="vertical">
            <v-tab>
                <v-icon left>fa-id-card</v-icon>Dados
            </v-tab>
            <v-tab>
                <v-icon left>fa-toggle-on</v-icon>Mudar Status
            </v-tab>

            <v-tab-item>
                <TeacherData :teacher="teacher" @submit="submit()"></TeacherData>
            </v-tab-item>
            <v-tab-item>
                <TeacherStatus :teacher="teacher" @submit="submit()"></TeacherStatus>
            </v-tab-item>
        </v-tabs>
    </base-card>
</template>

<script>
    import TeacherData from "./tabs/TeacherData";
    import TeacherStatus from "./tabs/TeacherStatus";

    export default {
        name: "User",

        components: {
            TeacherData,
            TeacherStatus
        },

        data: () => ({
            teacher: {}
        }),

        computed: {
            vertical() {
                if (["xs", "sm"].includes(this.$vuetify.breakpoint.name)) {
                    return false;
                }

                return true;
            }
        },

        methods: {
            submit() {
                console.log(this.teacher);
                // this.$http
                //     .put("teachers", this.teacher)
                //     .then(response => (this.teacher = response.data))
                //     .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`teachers/${this.$route.params.id}`)
                .then(response => (this.teacher = response.data))
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>

<style>
    .v-tab {
        justify-content: start;
    }
</style>