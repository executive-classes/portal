<template>
    <span>
        <!-- Edit -->
        <base-tooltip placement="left" text="Editar" v-slot="props">
            <v-btn
                icon
                color="primary"
                :to="{name: 'employees.show', params: {employee_id: employee.id}}"
                :disabled="employee.status.id != 'active'"
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
            v-if="employee.status.id == 'active'"
        >
            <v-btn
                icon
                color="danger"
                @click="$emit('cancel', employee)"
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
                @click="$emit('reactivate', employee)"
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
        name: "EmployeeTableActions",

        props: {
            employee: {
                type: Object,
                required: true
            }
        }
    };
</script>