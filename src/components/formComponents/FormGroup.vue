<template>
    <div>
        <slot :error="activeErrorMessages"></slot>
    </div>
</template>

<script>
    import { singleErrorExtractorMixin } from "vuelidate-error-extractor";

    export default {
        mixins: [singleErrorExtractorMixin]
    };
</script>