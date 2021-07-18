<template>
    <v-stepper v-model="actualStep">
        <v-stepper-header>
            <v-stepper-step
                v-for="(text, index) in steps"
                :key="index"
                :step="index"
                :complete="actualStep > index"
            >{{text}}</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content v-for="(slot, step) of $slots" :key="step" :step="step">
                <slot :name="step" />

                <v-btn
                    color="primary"
                    v-if="step < total"
                    @click="next(getAction(slot, 'next'))"
                >Próximo</v-btn>

                <v-btn
                    color="primary"
                    v-if="step == total"
                    @click="finish(getAction(slot, 'finish'))"
                >Confirmar</v-btn>

                <v-btn
                    v-if="step > 1"
                    class="ml-3"
                    @click="previous(getAction(slot, 'previous'))"
                >Voltar</v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    export default {
        name: "BaseStepper",

        props: {
            steps: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            actualStep: 1
        }),

        computed: {
            total() {
                return Object.keys(this.steps).length;
            }
        },

        methods: {
            getAction(slot, type) {
                let action = null;

                slot.some(vNode => {
                    if (vNode.tag == "v-action") {
                        if (vNode.data.attrs[type] !== undefined) {
                            action = vNode.data.attrs[type];
                            return true;
                        }
                    }
                });

                return action;
            },

            executeAction(action, stepperAction) {
                let actionResult = true;

                if (typeof action == "function") {
                    actionResult = action();

                    if (actionResult instanceof Promise) {
                        return actionResult
                            .then(() => stepperAction())
                            .catch(error => this.$alert.error(error));
                    } 
                }

                if (actionResult) {
                    return stepperAction();
                }
            },

            next(action) {
                this.executeAction(action, () => (this.actualStep += 1));
            },

            previous(action) {
                this.executeAction(action, () => (this.actualStep -= 1));
            },

            finish(action) {
                this.executeAction(action, () => this.$emit("finish"));
            }
        }
    };
</script>
