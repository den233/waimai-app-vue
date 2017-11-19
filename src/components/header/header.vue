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
          <icon :type="headerData.supports[0].type"></icon>
          <span class="text">
            {{ headerData.supports[0].description }}
          </span>
        </div>
      </div>
      <div v-if="headerData.supports" class="support-count" @click="showDetail">
        <span class="count">
          {{ headerData.supports.length }}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">
        {{ headerData.bulletin }}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="headerData.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="detail-trs">
      <div class="detail" v-if="detailShow">
        <div class="detail-wrapper clearMargin">
          <div class="detail-main">
            <div class="name">
              {{ headerData.name }}
            </div>
            <!--评分-->
            <star :size="48" :score="headerData.score" class="star-wrapper"></star>
            <div class="title">
              <div class="text">优惠信息</div>
            </div>
            <ul v-if="headerData.supports" class="supports">
              <li v-for="item in headerData.supports" class="supports-item">
                <icon :type="item.type"></icon>
                {{ item.description }}
              </li>
            </ul>
            <div class="title">
              <div class="text">商家公告</div>
            </div>
            <div class="bulletin">
              {{ headerData.bulletin }}
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="es6">
  import icon from '../icon/icon'
  import star from '../star/star'
  export default {
    components: {
      icon,
      star
    },
    props: {
      headerData: {
        type: Object
      }
    },
    data (){
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail (){
        this.detailShow = true
      },
      closeDetail (){
        this.detailShow = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.stylus'

  .detail-trs-enter,.detail-trs-leave-to
    transform translateY(100%)
    opacity 0
  .detail-trs-enter-active,.detail-trs-leave-active
    transition all 0.2s ease-out
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
            width 12px
            height 12px
            vertical-align top
            margin-right 4px
            background-size 12px 12px
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
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 32px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 16px
          .title
            display flex
            align-items center
            width 80%
            margin 28px auto 24px auto
            &:before,&:after
              flex 1
              content ''
              display block
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding 0 12px
              font-weight 700
          .supports
            width 80%
            margin 0 auto
            .supports-item
              margin-bottom 12px
              font-size 12px
              line-height 12px
              padding 0 12px
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
            &:last-child
              margin-bottom 0
            .icon
              width 16px
              height 16px
              vertical-align top
              margin-right 6px
              background-size 16px 16px
          .bulletin
            width 80%
            margin 0 auto
            padding 0 12px
            font-size 12px
            line-height 24px
      .detail-close
        width 32px
        height 32px
        line-height 32px
        text-align center
        margin -64px auto 0 auto
        .icon-close
          font-size 32px
          color rgba(255, 255, 255, 0.5)
</style>
