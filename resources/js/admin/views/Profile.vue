<template>
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header">{{ $t("updateprofiledata") }}</div>
                <div class="card-body">
                    <form @submit.prevent="store.updateProfile" @keydown="store.$state.profileForm.onKeydown($event)">

                        <div class="mb-3">
                            <label for="name" class="form-label">{{ $t("name") }}</label>
                            <input type="text" id="name" class="form-control"
                                :class="store.$state.profileForm.errors.has('name') ? 'is-invalid' : ''"
                                v-model="store.$state.profileForm.name" :disabled="store.$state.profileForm.busy">
                            <small role="alert" class="invalid-feedback"
                                v-if="store.$state.profileForm.errors.has('name')">
                                {{ store.$state.profileForm.errors.get('name') }}</small>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">{{ $t("email") }}</label>
                            <input type="text" id="email" class="form-control"
                                :class="store.$state.profileForm.errors.has('email') ? 'is-invalid' : ''"
                                v-model="store.$state.profileForm.email" :disabled="store.$state.profileForm.busy">
                            <small role="alert" class="invalid-feedback"
                                v-if="store.$state.profileForm.errors.has('email')">
                                {{ store.$state.profileForm.errors.get('email') }}</small>
                        </div>

                        <div class="mb-3">
                            <button class="btn btn-primary" type="submit" :disabled="store.$state.profileForm.busy">
                                <b>{{ $t("update") }}</b>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useProfileStore from '../stores/profile.store';

export default defineComponent({
    name: "Profile",
    data() {
        return {
            store: useProfileStore()
        }
    },
    mounted() {
        this.$emit('pageChanged', "profile");
        this.store.fetchProfile();
    }
})
</script>

