<template>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card-group d-block d-md-flex row">
                        <div class="card col-md-7 p-4 mb-0">
                            <div class="card-body">
                                <h1>{{ $t("login") }}</h1>
                                <p class="text-medium-emphasis">{{ $t("signintoyouraccount") }}</p>
                                <form @submit.prevent="authenticate" @keydown="loginForm.onKeydown($event)">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">
                                            <svg class="icon">
                                                <use
                                                    xlink:href="/coreui/vendors/@coreui/icons/svg/free.svg#cil-envelope-closed">
                                                </use>
                                            </svg>
                                        </span>
                                        <input class="form-control" type="text" :placeholder="$t('email')"
                                            v-model="loginForm.email"
                                            :class="loginForm.errors.has('email') ? 'is-invalid' : ''">
                                        <small role="alert" class="invalid-feedback"
                                            v-if="loginForm.errors.has('email')">{{ loginForm.errors.get('email')
                                            }}</small>
                                    </div>
                                    <div class="input-group mb-4"><span class="input-group-text">
                                            <svg class="icon">
                                                <use
                                                    xlink:href="/coreui/vendors/@coreui/icons/svg/free.svg#cil-lock-locked">
                                                </use>
                                            </svg></span>
                                        <input class="form-control" type="password" :placeholder="$t('password')"
                                            v-model="loginForm.password"
                                            :class="loginForm.errors.has('password') ? 'is-invalid' : ''">
                                        <small role="alert" class="invalid-feedback"
                                            v-if="loginForm.errors.has('password')">{{ loginForm.errors.get('password')
                                            }}</small>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <button class="btn btn-primary px-4" type="submit">{{ $t("login")
                                            }}</button>
                                        </div>
                                        <div class="col-6 text-end">
                                            <button class="btn btn-link px-0" type="button">
                                                {{ $t("forgotpassword?") }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card col-md-5 text-white bg-primary py-5">
                            <div class="card-body text-center">
                                <div>
                                    <h2>Sign up</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.</p>
                                    <button class="btn btn-lg btn-outline-light mt-3" type="button">Register
                                        Now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from 'vform';

export default defineComponent({
    name: "Login",
    data() {
        return {
            loginForm: new Form({
                email: '' as string,
                password: '' as string
            }) as Form
        }
    },
    methods: {
        async authenticate(): Promise<void> {
            await this.loginForm.post('/api/v1/auth/login').then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('token_expires', response.data.expires_in);
                window.location.replace('/admin/dashboard');
            }).catch(error => {
                //
            });
        }
    }
});
</script>
