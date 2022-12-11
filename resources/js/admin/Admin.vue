<template>

    <SideMenuVue />

    <div class="wrapper d-flex flex-column min-vh-100 bg-light">

        <TopMenuVue :breadcumpItems="breadcumbItems" />

        <div class="body flex-grow-1 px-3">
            <div class="container-lg">

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

export default defineComponent({
    name: "Admin",
    components: { SideMenuVue, TopMenuVue, BottomVue },
    setup() {
        const breadcumbItems = ref<Breadcump[]>([
            { name: "Foo" },
            { name: "Bar" }
        ]);

        return { breadcumbItems }
    }
})
</script>

