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
            profileForm: new Form({
                name: '' as string,
                email: '' as string
            }) as Form,
            toaster: createToaster({}) as Toaster,
            t: t
        }
    },
    getters: {
        getProfile(state): Profile {
            return state.profile;
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
        async updateProfile(): Promise<void> {
            try {
                const response = await this.profileForm.put(`/api/v1/profile/${this.profile.id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                        "Accept": "application/json"
                    }
                });

                this.fetchProfile();
                this.toaster.success(this.t("dataupdated"));

            } catch (error) {
                this.toaster.error(this.t("failedupdatedata"));
            }
        }
    }
});

export default useProfileStore;
