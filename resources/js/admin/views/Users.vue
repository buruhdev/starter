<template>
    <div>
        <h1>Users</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Users",
    mounted() {
        this.$emit('pageChanged', "users");
    }
})
</script>

