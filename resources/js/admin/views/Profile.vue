<template>
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <DefaultCard :title="$t('updateprofiledata')">
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
            </DefaultCard>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <DefaultCard :title="$t('updateprofileimage')">
                <form @submit.prevent="updateProfileImage">
                    <div class="mb-3">
                        <label for="imageProfile" class="form-label">{{ $t("image") }}</label>
                        <input type="file" ref="image" accept="image/*" class="form-control" @change="onImageChange($event)">
                    </div>
                    <cropper
                        class="cropper mb-3"
                        v-if="showImageEditor"
                        :src="tempImage"
                        ref="cropper"
                        :stencil-props="{
                            aspectRatio: 12/12
                        }"
                        @change="change"
                    />
                    <button type="submit" class="btn btn-primary fw-bold">{{ $t("save") }}</button>
                </form>
            </DefaultCard>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useProfileStore from '../stores/profile.store';
import DefaultCard from "../components/DefaultCard.vue";
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import axios from "axios";
import Toaster, { createToaster } from "@meforma/vue-toaster";
import {useI18n} from "vue-i18n";

export default defineComponent({
    name: "Profile",
    components: {DefaultCard, Cropper},
    data() {
        const { t } = useI18n();
        return {
            store: useProfileStore(),
            rawImage: "" as string,
            tempImage: '' as string,
            showImageEditor: false as boolean,
            toaster: createToaster({}) as Toaster,
            t: t
        }
    },
    mounted() {
        this.$emit('pageChanged', "profile");
        this.store.fetchProfile();
        this.tempImage = this.store.$state.profile.image!
    },
    methods: {
        updateProfileImage(): void {
            if (this.tempImage === "" || this.tempImage === undefined) {
                this.toaster.error(this.t("failedfetchdata"));
            } else {
                const { canvas } = (this.$refs["cropper"] as any).getResult();
                this.$refs["image"] = null;
                if (canvas) {
                    canvas.toBlob(async (blob: string) => {
                        this.store.$state.rawImage = blob;
                        await this.store.updateProfileImage();
                    });
                    this.showImageEditor = false;
                }
            }
        },
        onImageChange(event: any): void {
            let formData = new FormData();
            formData.append('image', event.target.files[0]);
            axios.post(`/api/v1/profile/image/temp`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                    "Accept": "application/json",
                    'content-type': 'multipart/form-data'
                }
            }).then(response => {
                this.tempImage = '/storage/' + response.data.tempUri;
                this.showImageEditor = true;
            }).catch(_error => {
                this.toaster.error(this.t("failedfetchdata"));
            })
        },
        change({ coordinates, canvas }) {
            // console.log(coordinates, canvas)
        }
    }
})
</script>

<style scoped>
.cropper {
    height: 600px;
    width: 600px;
    background: #DDD;
}
</style>
