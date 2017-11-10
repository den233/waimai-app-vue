<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="headerData.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ headerData.name }}</span>
        </div>
        <div class="description">
          {{ headerData.description }}/{{ headerData.deliveryTime }}分钟送达
        </div>
        <div v-if="headerData.supports" class="support">
          <span class="icon" :class="classMap[headerData.supports[0].type]"></span>
          <span class="text">
            {{ headerData.supports[0].description }}
          </span>
        </div>
      </div>
      <div v-if="headerData.supports" class="support-count">
        <span class="count">
          {{ headerData.supports.length }}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">
        {{ headerData.bulletin }}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="headerData.avatar" alt="" width="100%" height="100%">
    </div>
  </div>
</template>

<script type="es6">
  export default {
    props: {
      headerData: {
        type: Object
      }
    },
    data (){
      return {
        classMap: []
      }
    },
    created (){
      this.classMap = ['decrease', 'discount', 'special', 'invoice']
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.stylus'

  .header
    position relative
    color rgb(255, 255, 255)
    height: 134px;
    background-color rgba(7, 17, 27, 0.5)
    overflow hidden
    .content-wrapper
      padding 24px 12px 18px 24px
      font-size 0
      position relative
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 4px
      .content
        display inline-block
        margin-left 16px
        .title
          margin-top 2px
          .brand
            display inline-block
            width 30px
            height 18px
            vertical-align top
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          font-size 12px
          line-height 12px
          margin-top 8px
        .support
          margin-top 10px
          .icon
            display inline-block
            width 12px
            height 12px
            vertical-align top
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.special
              bg-image('special_1')
            &.invoice
              bg-image('invoice_1')
          .text
            line-height 12px
            font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 15px
        box-sizing border-box
        height 24px
        line-height 24px
        padding 0 8px
        border-radius 14px
        background-color rgba(0, 0, 0, 0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          font-size 10px
          line-height 24px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background-color rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        vertical-align top
        margin-top 8px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        font-size 10px
        position absolute
        top 9px
        right 12px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
</style>
