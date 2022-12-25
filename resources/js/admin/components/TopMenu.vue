<template>

    <header class="header header-sticky mb-4">
        <div class="container-fluid">
            <button class="header-toggler px-md-0 me-md-3" type="button"
                onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()">
                <svg class="icon icon-lg">
                    <use xlink:href="/coreui/vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
                </svg>
            </button>
            <a class="header-brand d-md-none" href="#">
                <svg width="118" height="46" alt="CoreUI Logo">
                    <use xlink:href="assets/brand/coreui.svg#full"></use>
                </svg>
            </a>

            <ul class="header-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <svg class="icon icon-lg">
                            <use xlink:href="/coreui/vendors/@coreui/icons/svg/free.svg#cil-bell"></use>
                        </svg>
                    </a>
                </li>
            </ul>
            <ul class="header-nav ms-3">
                <li class="nav-item dropdown">
                    <a class="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                        aria-expanded="false">
                        <div class="avatar avatar-md">
                            <img class="avatar-img" :src="'/storage/' + store.$state.profile.image ?? 'https://via.placeholder.com/150'" alt="user@email.com">
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end pt-0">
                        <div class="dropdown-header bg-light py-2">
                            <div class="fw-semibold">{{ $t("account") }}</div>
                        </div>
                        <router-link class="dropdown-item" to="/admin/profile">
                            <svg class="icon me-2">
                                <use xlink:href="/coreui/vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                            </svg>{{ $t("profile") }}</router-link>
                        <a class="dropdown-item" href="javascript:void(0);" @click="logout">
                            <svg class="icon me-2">
                                <use xlink:href="/coreui/vendors/@coreui/icons/svg/free.svg#cil-account-logout"></use>
                            </svg> {{ $t("logout") }}
                        </a>
                    </div>
                </li>
            </ul>
        </div>

        <div class="header-divider"></div>

        <div class="container-fluid">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb my-0 ms-2">
                    <li class="breadcrumb-item">
                        <a href="javascript:void(0);">{{ $t("home") }}</a>
                    </li>
                    <li class="breadcrumb-item" :class="item.isActive ? 'active' : ''"
                        v-for="(item, index) in breadcumpItems" :key="index">
                        <span v-if="item.isActive">{{ $t(item.name) }}</span>
                        <a href="javascript:void(0);" v-else>{{ $t(item.name) }}</a>
                    </li>
                </ol>
            </nav>
        </div>
    </header>

</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType } from 'vue'
import { Breadcump } from '../types/Breadcump';
import useProfileStore from '../stores/profile.store';

export default defineComponent({
    props: {
        breadcumpItems: {
            required: true,
            type: Array as PropType<Breadcump[]>
        }
    },
    data() {
        return {
            store: useProfileStore()
        }
    },
    methods: {
        async logout() {
            await axios.get('/api/v1/auth/logout', { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } }).then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('token_expires');
                window.location.replace('/auth/login');
            }).catch(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('token_expires');
                window.location.replace('/auth/login');
            })
        }
    }
})
</script>

