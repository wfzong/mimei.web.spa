<template>
<div class="register">
    <h3>用户注册</h3>
    <form @submit.prevent="register" v-if="!registered">
        <ul @click="recheck">
            <li><label for="nickname">昵称：</label><input v-model="nickname" name="nickname" id="nickname"></li>
            <li><label for="email">邮箱：</label><input v-model="email" name="email" id="email"></li>
            <li><label for="password">密码：</label><input v-model="password" name="password" id="password" type="password"></li>
            <li><label for="truename">真实姓名：</label><input v-model="truename" name="truename" id="truename"></li>
            <li><label for="address">通讯地址：</label><input v-model="address" name="address" id="address"></li>
            <li><label for="birthday">生日：</label><input v-model="birthday" name="birthday" id="birthday"></li>
            <li v-if="error" class="error">{{errorInfo}}</li>
            <li><input type="submit" value="注册提交"></li>
        </ul>
    </form>
    <div v-if="registered">
        <h4>注册成功</h4>
        <p>请 <router-link  :to="{path:'/auth/login'}">登录</router-link></p>
    </div>
</div>
</template>
<script>
import auth from "../../auth"
export default {
    data(){
        return {
            registered:false,
            nickname:"",
            email:"",
            password:"",
            truename:"",
            address:"",
            birthday:"",
            error:false,
            errorInfo:""
        }
    },
    methods:{
        register(){
            auth.register(
                this.nickname, 
                this.email, 
                this.password, 
                this.truename, 
                this.address, 
                this.birthday, 
                res => {
                    if(res.registered){
                        this.registered = true
                    } else {
                        this.error = true
                        this.errorInfo = res.info
                    }
                    console.log(res)
                }
                )
        },
        recheck(){
            this.error = false
        }
    }
    
}
</script>
<style lang="scss">
@import "../../scss/reset";

.register {
    padding:12px;
    ul {
        li {
            line-height: 2em;
        }
    }
}
.error {
    background:red;
    color:white;
    padding:6px;
    margin:6px 0;
}
</style>