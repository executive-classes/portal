<template>
    <base-main-card title="Alunos" icon="fa-user-graduate">
        <base-alert></base-alert>

        <StudentTable></StudentTable>
    </base-main-card>
</template>

<script>
    import StudentTable from "@/components/appComponents/studentComponents/table/StudentTable";

    export default {
        name: "Students",

        components: {
            StudentTable
        }
    }
</script>