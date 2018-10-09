//Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。
//Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
export const incRDnum = (context) => {
    setTimeout(()=>{
        context.commit("incNum",Math.floor(Math.random()*10))
    },600)
}