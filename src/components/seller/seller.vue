<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="header-wrapper">
        <div class="header-top border-1px">
          <h1 class="title">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favorite" @click="collect">
            <span class="icon-favorite" :class="{active : favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <div class="header-bottom">
          <ul class="bottom-wrapper">
            <li class="item">
              <h1 class="title">起送价</h1>
              <div class="text">{{seller.minPrice}}<span class="unit">元</span></div>
            </li>
            <li class="item delivery-cost">
              <h1 class="title">商家配送</h1>
              <div class="text">{{seller.deliveryPrice}}<span class="unit">元</span></div>
            </li>
            <li class="item">
              <h1 class="title">平均配送时间</h1>
              <div class="text">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="notice-activity">
        <h1 class="title">公告和活动</h1>
        <div class="text border-1px">{{seller.bulletin}}</div>
        <ul class="notice-activity-wrapper">
          <li v-for="item in seller.supports" class="item border-1px">
            <icon :type="item.type"></icon>
            <span class="description">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info-wrapper">
        <h1 class="title">商家信息</h1>
        <ul class="info-list border-1px">
          <li class="info-item border-1px" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import star from '../star/star'
  import split from '../split/split'
  import icon from '../icon/icon'
  import BetterScroll from 'better-scroll'
  import {saveToLocal,loadFromLocal} from '../../common/js/store'

  export default {
    components: {
      star,
      split,
      icon
    },
    props: {
      seller: {
        type: Object
      }
    },
    data (){
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      }
    },
    computed: {
      favoriteText (){
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    watch: {
      seller (){
        this.initScroll();
        this.initPics();
      }
    },
    mounted (){
      this.initScroll();
      this.initPics();
    },
    methods: {
      initScroll (){
        this.$nextTick(() => {
          if(!this.sellerScroll){
            this.sellerScroll = new BetterScroll(this.$refs.seller, {
              click: true
            });
          }else{
            this.sellerScroll.refresh();
          }
        })
      },
      initPics (){
        //商家实景横向滑动处理
        if(this.seller.pics){
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) *this.seller.pics.length;
          this.$refs.picList.style.width = (width - margin) + 'px';
          this.$nextTick(() => {
            if(!this.picScroll){
              this.picScroll = new BetterScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            }else{
              this.picScroll.refresh();
            }
          })
        }
      },
      collect (){
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.stylus"
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .header-wrapper
      padding 0 18px
      .header-top
        position relative
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          font-size 14px
          line-height 14px
          color rgb(7, 17, 27)
          margin-bottom 8px
        .star-wrapper
          font-size 0
          .star
            display inline-block
            vertical-align top
          .rating-count
            display inline-block
            vertical-align top
            margin-left 8px
            font-size 10px
            line-height 18px
            color rgb(77, 85, 93)
          .sell-count
            display inline-block
            vertical-align top
            margin-left 12px
            font-size 10px
            line-height 18px
            color rgb(77, 85, 93)

        .favorite
          position absolute
          top 15px
          right 0
          text-align center
          .icon-favorite
            font-size 24px
            line-height 24px
            color #d4d6d9
            &.active
              color rgb(240, 20, 20)
          .text
            display block
            width 36px
            margin-top 4px
            font-size 10px
            line-height 10px
            color rgb(77, 85, 93)
      .header-bottom
        text-align center
        .bottom-wrapper
          display flex
          padding 18px 0
          .item
            flex 1
            .title
              margin-bottom 4px
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
            .text
              font-size 24px
              line-height 24px
              color rgb(7, 17, 27)
              .unit
                font-size 10px
            &.delivery-cost
              box-sizing border-box
              border-left 1px solid rgba(7, 17, 27, 0.1)
              border-right 1px solid rgba(7, 17, 27, 0.1)
    .notice-activity
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      .text
        padding 0 12px 16px
        font-size 12px
        line-height 24px
        color rgb(240, 20, 20)
        border-1px(rgba(7, 17, 27, 0.1))
      .notice-activity-wrapper
        .item
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          padding 16px 12px
          .icon
            width 16px
            height 16px
            vertical-align top
            background-size 16px 16px
          .description
            display inline-block
            vertical-align top
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        margin-bottom 12px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin-right 0
    .info-wrapper
      padding 18px 18px 0 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        padding-bottom  12px
        border-1px(rgba(7, 17, 27, 0.1))
      .info-item
        padding 16px 12px
        font-size 12px
        line-height 16px
        color rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
</style>
