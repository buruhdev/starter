<template>
    <div>
        <h1>Profile</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Profile",
    mounted() {
        this.$emit('pageChanged', "profile");
    }
})
</script>
