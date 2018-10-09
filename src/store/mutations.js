//Mutations 接受 state 作为第一个参数

export const incNum = (state,num) => {
    state.count += num
}

//返回token值
export const setMyToken = (state,token) => {
    state.token = token
}

//返回用户信息
export const setUserInfo = (state,userinfo) => {
    state.userInfo = userinfo
}

//初始化用户信息
export const initToken = (state) => {
    state.token = window.$cookies.get("think_token")
    state.userinfo = JSON.parse(window.$cookies.get("userinfo"))
    state.initLogin = true
}