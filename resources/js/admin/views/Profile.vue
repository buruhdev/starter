<template>
    <div>
        <h1>Profile</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useProfileStore from '../stores/profile';

export default defineComponent({
    name: "Profile",
    setup() {
        const store = useProfileStore();

        return { store }
    },
    mounted() {
        this.$emit('pageChanged', "profile");
        this.store.fetchProfile();
    },
    methods: {
        //
    }
})
</script>

