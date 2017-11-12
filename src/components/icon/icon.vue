<template>
    <span class="icon" :class="classMap[type]"></span>
</template>

<script type="es6">
  export default {
    props: {
      type: Number
    },
    data (){
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice']
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.stylus"

  .icon
    display inline-block
    background-repeat no-repeat
    &.decrease
      bg-image('decrease_1')
    &.discount
      bg-image('discount_1')
    &.special
      bg-image('special_1')
    &.invoice
      bg-image('invoice_1')
</style>
