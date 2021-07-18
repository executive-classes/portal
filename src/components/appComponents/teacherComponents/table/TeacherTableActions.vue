<template>
    <span>
        <!-- Edit -->
        <base-tooltip placement="left" text="Editar" v-slot="props">
            <v-btn
                icon
                color="primary"
                :to="{name: 'teachers.show', params: {teacher_id: teacher.id}}"
                :disabled="teacher.status.id != 'active'"
                v-bind="props.attrs"
                v-on="props.on"
            >
                <v-icon small>mdi-pencil</v-icon>
            </v-btn>
        </base-tooltip>

        <!-- Cancel -->
        <base-tooltip
            placement="right"
            text="Cancelar"
            v-slot="props"
            v-if="teacher.status.id == 'active'"
        >
            <v-btn
                icon
                color="danger"
                @click="$emit('cancel', teacher)"
                v-bind="props.attrs"
                v-on="props.on"
            >
                <v-icon small>mdi-block-helper</v-icon>
            </v-btn>
        </base-tooltip>

        <!-- Reactivate -->
        <base-tooltip placement="right" text="Reativar" v-slot="props" v-else>
            <v-btn
                icon
                color="success"
                @click="$emit('reactivate', teacher)"
                v-bind="props.attrs"
                v-on="props.on"
            >
                <v-icon small>mdi-check</v-icon>
            </v-btn>
        </base-tooltip>
    </span>
</template>

<script>
    export default {
        name: "TeacherTableActions",

        props: {
            teacher: {
                type: Object,
                required: true
            }
        }
    };
</script>