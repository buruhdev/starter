<template>

    <div class="sidebar sidebar-dark sidebar-fixed" id="sidebar">
        <div class="sidebar-brand d-none d-md-flex">
            <h4 class="sidebar-brand-full">
                Name
            </h4>
            <h5 class="sidebar-brand-narrow">
                N
            </h5>
        </div>
        <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
            <li class="nav-item">
                <a class="nav-link" href="index.html">
                    <svg class="nav-icon">
                        <use xlink:href="/coreui/vendors/@coreui/icons/svg/free.svg#cil-speedometer"></use>
                    </svg> Dashboard
                </a>
            </li>
        </ul>
        <button class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Side Menu"
})
</script>

