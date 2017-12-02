<template>
  <div id="app">
    <v-header :headerData="headerData"></v-header>
    <ul class="tab border-1px">
      <router-link v-for="(item , index) in classify" :to="{ path: item.key }" tag="li" :key="index" class="tab-item" active-class="active">
        {{ item.value }}
      </router-link>
    </ul>
    <div class="content">
      <keep-alive>
        <router-view :seller="headerData"></router-view>
      </keep-alive>
    </div>
    <loading v-show="loadingShow"></loading>
  </div>
</template>

<script type="es6">
  import Vue from 'vue';
  import header from './components/header/header';
  import loading from './components/loading/loading.vue'
  export default {
    components: {
      VHeader: header,
      loading
    },
    data (){
      return {
        loadingShow: false,
        headerData: {},
        classify: [
          {
            value: '商品',
            key: 'goods'
          },
          {
            value: '评价',
            key: 'ratings'
          },
          {
            value: '商家',
            key: 'seller'
          }
        ]
      }
    },
    methods: {
      getHeaderData () {
        Vue.http.interceptors.push((request, next) => {
          // 请求完成前
          this.loadingShow = true;
          next((response) => {
            // 请求完成后 --可在此处对response进行修改 --下属所得将是被修改的response
            this.loadingShow = false;
            return response;
          });
        });
        this.$http.post('//data.leibo.group', {v:'seller'}).then(
          (res) => {
            res = res.data;
            res.errno === 0 && (this.headerData = res.data);
          },
          (error) => {
            console.log(error)
          }
        )
      }
    },
    created (){
      console.log("源码地址:"+'https://github.com/leiboT/waimai-app-vue');
      this.getHeaderData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/stylus/mixin.stylus"

  #app
    height 100%
    display flex
    flex-direction column
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77, 85, 93)
    .active
        color rgb(240, 20 ,20) !important
    .content
      flex 1
</style>
