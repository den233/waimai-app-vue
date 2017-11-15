<template>
  <div class="addSubtract">
    <transition name="decrease">
      <div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="subtractCart"></div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="increase icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script type="es6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    computed: {

    },
    methods: {
      addCart (e){
        this.$emit('on-add',e.target);
        if(!this.food.count){
          //避开 Vue 不能检测属性被添加的限制。
          Vue.set(this.food, 'count', 1);
        }else{
          this.food.count ++
        }
      },
      subtractCart (){
        if(this.food.count)
          this.food.count --
      }
    },
    mounted (){
      //console.log(this.food)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .decrease-enter,.decrease-leave-to
    transform translate3d(24px,0,0) rotateZ(90deg)
    opacity 0
  .decrease-enter-active,.decrease-leave-active
    transition all 0.2s linear
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
