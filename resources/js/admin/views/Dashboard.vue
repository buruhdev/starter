<template>
    <div>
        <h1>Dashboard</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Dashboard",
    mounted() {
        this.$emit('pageChanged', "dashboard");
    }
})
</script>

