<template>
    <div>
        <h1>Profile</h1>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Profile",
    data() {
        return {}
    },
    mounted() {
        this.$emit('pageChanged', "profile");
        this.getData();
    },
    methods: {
        async getData() {
            await axios.get('/api/v1/profile', { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }
    }
})
</script>

