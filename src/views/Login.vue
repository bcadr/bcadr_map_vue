<template>
    <div class="Login">
        <div class="content">
            <div class="logo">
                <img src="../assets/logo.png" />
            </div>
            <div class="form">
                <div class="title">系统登陆</div>
                <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-model-item label="用户名">
                        <a-input v-model="form.userName" />
                    </a-form-model-item>
                    <a-form-model-item label="密码">
                        <a-input v-model="form.passWord" type="password"/>
                    </a-form-model-item>
                    <button @click="submit">登陆</button>
                    <div class="tip">tip: 账号密码随意</div>
                </a-form-model>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                userName: 'admin',
                passWord: '123',
            },
        };
    },
    methods: {
        submit() {
            this.$router.push('/home')
        },
    },
};
</script>
<style lang="scss">
@import "../style/Login.scss";
</style>
