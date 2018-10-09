<template>
    <div>
        <login-trigger></login-trigger>
        news
        <hr> myToken:{{getMyToken}}
        <br>
        <button @click="SetMyToken">SetMyToken</button>
        <hr>

        <div v-for="(subject,index) in results" :key="index">
            <input v-model="subject.marks">
            <span>
                Marks for {{ subject.title }}: {{ subject.marks }}
            </span>
        </div>

        <span>
            Total marks are: {{ totalMarks }}
        </span>
    </div>
</template>

<script>
import LoginTrigger from "./common/LoginTrigger"
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as unity from '../unity'

unity.setWebTitle("NEWS - memei.net")

export default {
    data() {
        return {
            results: [
                {
                    name: 'English',
                    marks: 70
                },
                {
                    name: 'Math',
                    marks: 80
                },
                {
                    name: 'History',
                    marks: 90
                }
            ]
        }
    },

    components: {
        LoginTrigger
    },
    computed: {
        ...mapGetters(['getMyToken']),
        totalMarks: function() {
            let total = 0;
            for (let i = 0; i < this.results.length; i++) {
                total += parseInt(this.results[i].marks);
            }
            return total;
        }
    },
    methods: {

        SetMyToken() {
            this.$store.commit("setMyToken", "my vuex token")
        }
    },
    destroyed:()=>{
        
    }
}


</script>
