import axios from "axios";
import { defineStore } from "pinia";
import { Profile }  from '../types/Profile';
import Form from 'vform';
import Toaster, { createToaster } from "@meforma/vue-toaster";
import { useI18n } from "vue-i18n";

const useProfileStore = defineStore("profile", {
    state: () => {
        const { t } = useI18n();
        return {
            profile: {} as Profile,
            tempImageUri: '' as string,
            profileForm: new Form({
                name: '' as string,
                email: '' as string
            }) as Form,
            toaster: createToaster({}) as Toaster,
            t: t,
            rawImage: "" as string
        }
    },
    getters: {
        getProfile(state): Profile {
            return state.profile;
        },
        getTempImageUri(state): string {
            return state.tempImageUri;
        }
    },
    actions: {
        async fetchProfile() {
            try {
                const response = await axios.get('/api/v1/profile', { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } });
                this.profile = response.data.profile;
                this.profileForm.fill(this.profile);
            } catch (error) {
                this.toaster.error(this.t("failedfetchdata"));
            }
        },
        async updateProfile(state): Promise<void> {
            try {
                await this.profileForm.put(`/api/v1/profile/${this.profile.id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                        "Accept": "application/json"
                    }
                });
                await this.fetchProfile();
                this.toaster.success(this.t("dataupdated"));

            } catch (error) {
                this.toaster.error(this.t("failedupdatedata"));
            }
        },
        async updateProfileImage(): Promise<void> {
            let formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('image', this.$state.rawImage);
            try {
                await axios.post(`/api/v1/profile/image/${this.profile.id}`, formData,{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                        "Accept": "application/json",
                        'content-type': 'multipart/form-data'
                    }});
                await this.fetchProfile();
            } catch (error) {
                this.toaster.error(this.t("failedupdatedata"));
            }
        }
    }
});

export default useProfileStore;
