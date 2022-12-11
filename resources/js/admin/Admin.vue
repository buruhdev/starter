<template>

    <SideMenuVue />

    <div class="wrapper d-flex flex-column min-vh-100 bg-light">

        <TopMenuVue :breadcumpItems="breadcumbItems" />

        <div class="body flex-grow-1 px-3">
            <div class="container-lg">
                <router-view @page-changed="onPageChanged"></router-view>
            </div>
        </div>

        <BottomVue />

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SideMenuVue from './components/SideMenu.vue';
import TopMenuVue from './components/TopMenu.vue';
import BottomVue from './components/Bottom.vue';
import { Breadcump } from './types/Breadcump';
import { RouterView } from 'vue-router';

export default defineComponent({
    components: { SideMenuVue, TopMenuVue, BottomVue },
    setup() {
        const breadcumbItems = ref<Breadcump[]>([]);
        const currentURL = ref<URL>(new URL(window.location.href));

        return { breadcumbItems, currentURL }
    },
    methods: {
        onPageChanged(currentPage: string) {
            this.currentURL = new URL(window.location.href);
            let pathname: Array<string> = this.currentURL.pathname.split("/");
            this.breadcumbItems = [];

            pathname.map(name => {
                // name = name.charAt(0).toUpperCase() + name.slice(1);
                if (name !== "" && currentPage === name) {
                    this.breadcumbItems.push({ name: name, isActive: true });
                } else if (name !== "") {
                    this.breadcumbItems.push({ name: name, isActive: false });
                }
            });
        }
    }
})
</script>

