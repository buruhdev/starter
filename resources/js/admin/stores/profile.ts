import axios from "axios";
import { defineStore } from "pinia";
import { Profile }  from '../types/Profile';

const useProfileStore = defineStore("profile", {
    state: () => {
        return {
            profile: {} as Profile
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
            } catch (error) {
                console.log(error);
            }

        }
    }
});

export default useProfileStore;
