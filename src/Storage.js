import axios from "axios"
import auth from "./auth"


export default {

  getStorage(name) {
    if (window.localStorage) {
      return JSON.parse(window.localStorage.getItem(name))
    } else {
      return null
    }
  },
  setStorage(name,data){
    if (window.localStorage) {
      return window.localStorage.setItem(name,data)
    } else {
      return null
    }
  },
  addHistory(data) {
    var oldList = this.getStorage("artList") || []

    var existedEle = oldList.filter((v)=>{ //查找是否之前已经看过
      if(v.id == data.id){
        return true
      }
    })
    if(existedEle.length){//如果找到，删除
      existedEle.forEach(function(element) {
        data.times = element.times + 1
        oldList.splice(oldList.indexOf(element),1)
      }, this);
    }

   
    oldList.unshift(data)
    this.setStorage("artList",JSON.stringify(oldList))
  }

}