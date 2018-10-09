import * as config from './config'
import axios from 'axios'
import store from './store'

export default {
    //执行登录操作
    login (accounts, pass, cb) {
        cb = arguments[arguments.length - 1]
        if(this.loggedIn()){
            if(cb) cb(true)
            this.onChange(true)
            return
        }
        loginRequest(accounts, pass, (res)=>{
            if(res.authenticated){//登录成功
                window.$cookies.set("think_token", res.token, res.expiration)
                window.$cookies.set("userinfo", JSON.stringify(res.userinfo), res.expiration)
                store.commit("initToken", window)

                if(cb) cb(true)
                this.onChange(true)
            } else {//登录失败
                if(cb) cb(false,res.info)
                this.onChange(false)
            }
        })
    },
    getToken (){//取得本地token
        return window.$cookies.get("think_token")
    },
    logout (cb){//退出登录
        delete window.$cookies.remove("think_token")
        delete window.$cookies.remove("userinfo")
        store.commit("initToken", window)
        if(cb) cb()
        this.onChange(false)
    },
    loggedIn (){//返回登录状态
        if(store.getters.initedLogin) {
            return !!store.getters.getMyToken
        } else {
            store.commit("initToken")
            return !!store.getters.getMyToken
        }
    },
    onChange () {},
    
    //执行注册操作
    register(nickname, email, password, truename, address, birthday, cb){
        cb = arguments[arguments.length - 1]
        registerRequest(nickname, email, password, truename, address, birthday, (res) => {
            if(res.registered){//注册成功
                cb({registered:true})
            } else {//注册失败
                cb({
                    registered:false,
                    info:res.info
                })
            }
        })
    },

    /* 
    * 获取 七牛 上传token
    * @return Promise
    */
    getUploadToken(){
        return new Promise((resolve, reject)=>{

            if(window.$cookies.get('uploadToken')){
                //return window.$cookies.get('uploadToken')
                resolve(window.$cookies.get('uploadToken'))
            } else {
                axios.get(config.getUploadTokenApi)
                .then((res)=>{
                    window.$cookies.set("uploadToken",res.data.uploadToken,res.data.expires)
                    //return res.data.uploadToken
                    resolve(res.data.uploadToken)
                })
                .catch((err)=>{
                    //console.log(err)
                    reject(err)
                })
            }

        })
    }
}

//发出登录请求
function loginRequest(accounts, pass, cb){
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.post(config.loginApi,{
        accounts:accounts,
        password:pass
    })
    .then(function(response){//--请求成功
        if(response.data.token) {//登录成功
            cb({
                authenticated:true,
                token:response.data.token,
                userinfo:response.data.userinfo,
                expiration:response.data.expiration
            })
        } else {//登录失败
            cb({
                authenticated:false,
                info:response.data.error
            })
        }
    })
    .catch(function(error){//--请求失败
        console.log(error)
    })
}

//发出注册请求
function registerRequest(nickname, email, password, truename, address, birthday, cb){
    axios.post(config.registerApi,{
        nickname:nickname,
        email:email,
        password:password,
        truename:truename,
        address:address,
        birthday:birthday
    }).then(function(response){
        if(response.data.success == "yes"){
            cb({
                registered:true
            })
        } else {
            cb({
                registered:false,
                info:response.data.info
            })
        }
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    })
}