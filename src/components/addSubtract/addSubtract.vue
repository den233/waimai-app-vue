<template>
  <div class="addSubtract">
    <div class="decrease icon-remove_circle_outline" v-show="foods.count>0" @click="subtractCart"></div>
    <div class="count" v-show="foods.count>0">{{foods.count}}</div>
    <div class="increase icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="es6">
  export default {
    props: {
      foods: {
        type: Object,
        default (){
          return {
            count: 0
          }
        }
      }
    },
    computed: {

    },
    methods: {
      addCart (){
        this.foods.count +=1
      },
      subtractCart (){
        this.foods.count -=1
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .addSubtract
    position absolute
    right 0
    bottom 0
    .decrease,.increase,.count
      display inline-block
      width 24px
      height 24px
    .decrease,.increase
      border-radius 50%
      font-size 24px
      color #00a0dc
    .count
      line-height 24px
      vertical-align bottom
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
</style>
