<template>
  <div id="app">
    <v-header></v-header>
    <ul class="tab border-1px">
      <router-link v-for="(item , index) in classify" :to="{ path: item.key }" tag="li" :key="index" class="tab-item" active-class="active">
        {{ item.value }}
      </router-link>
    </ul>
    <div class="content">
      <transition name="classify-trans" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script type="es6">
  import header from './components/header/header'
  export default {
    components: {
      VHeader: header
    },
    data (){
      return {
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
  .classify-trans-enter-active,.classify-trans-leave-active
    transition opacity 0.5s
  .classify-trans-enter,.classify-trans-leave-to
    transform translateX(-100%)
    opacity 0
</style>
