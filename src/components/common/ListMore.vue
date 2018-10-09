<template>
<aside class="article_more">
    <div class="loading" v-if="loading">loading</div>
    <div class="error" v-if="error"></div>
    <list-element v-if="artList" title="最新文章" :list="artList"></list-element>
    <list-element v-if="artList" title="最新图集" :list="imgList"></list-element>
</aside>
</template>
<script>
import listElement from './ListElement.vue'

import axios from "axios";
import * as config from "../../config";

export default {
  data() {
    return {
      loading: true,
      error: false,
      imgList: null,
      artList: null
    };
  },
  methods: {
    fetchData() {
      //获取最新普通文章
      axios
        .get(config.articleApi, {
          params: {
            artType: "normal",
            limit: 5
          }
        })
        .then(res => {
          this.loading = this.error = false;
          this.artList = res.data.list;
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
        });

      //获取最新图集
      axios
        .get(config.articleApi, {
          params: {
            artType: "photos",
            limit: 5
          }
        })
        .then(res => {
          this.loading = this.error = false;
          this.imgList = res.data.list;
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
        });
    }
  },
  created() {
    this.fetchData();
  },
  components:{
      listElement
  }
};
</script>

<style lang="scss">
@import "../../scss/common/variable";
@import "../../scss/common/mixin";

.article_more {
  display: table-cell;
  vertical-align: top;
  width: 30%;
  padding: $PADDING_LARGE 0 $PADDING_LARGE $PADDING_LARGE;
  ul {
    padding: $PADDING_XXX_SMALL 0;
    margin-bottom: $MARGIN_MEDIUM;
    li {
      list-style-type: square;
      list-style-position: inside;
      margin: 0;
      padding: 0;

      a {
        color: #333;
        &:hover {
          color: #c00000;
        }
      }
    }
  }
  h3 {
  }

  @include max-screen($SECTION_WIDTH_LARGE - 1) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 $PADDING_LARGE 0;
  }
}
</style>