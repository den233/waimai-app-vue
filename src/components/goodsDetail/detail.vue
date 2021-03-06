<template>
  <transition name="move">
    <div v-show="showFlag" class="goodsDetail" ref="goodsDetail">
      <div class="goodsDetail-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sale">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="nowPrice"><i>¥</i>{{ food.price }}</span><span v-if="food.oldPrice" class="oldPrice">¥{{ food.oldPrice }}</span>
          </div>
          <add-subtract :food="food" @on-add="whichOneIsAdd"></add-subtract>
          <transition name="buy">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addToCart">加入购物车</div>
          </transition>
        </div>
        <split v-if="food.info"></split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="text">
            {{food.info}}
          </div>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @changeType="changeType" @changeOnly="onlyChange"></rating-select>
          <div class="rating-wrapper" v-if="this.food.ratings">
            <ul v-show="this.food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="rating-text">
                  <span :class="{'icon-thumb_up': rating.rateType ===0,'icon-thumb_down': rating.rateType ===1}"></span><span class="text">{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!this.food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="es6">
  import Vue from 'vue'
  import BetterScroll from 'better-scroll'
  import addSubtract from '../addSubtract/addSubtract'
  import split from '../split/split'
  import ratingSelect from '../ratingSelect/ratingSelect'
  import {formatDate} from '../../common/js/formatDate'

  export default {
    components: {
      addSubtract,
      split,
      ratingSelect
    },
    props: {
      food: {
        type: Object
      }
    },
    filters: {
      formatDate (time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
//      formatDate: function (date) {
//        let d = new Date(date);
//        let year = d.getFullYear();
//        let month = d.getMonth() + 1;
//        let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
//        let hour = d.getHours();
//        let minutes = d.getMinutes();
//        let seconds = d.getSeconds();
//        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
//      }
    },
    data (){
      return {
        showFlag: false,
        selectType: 2,
        onlyContent: false,
        desc: {
          'all': '全部',
          'positive': '推荐',
          'negative': '吐槽'
        }
      }
    },
    methods: {
      show (){
        this.showFlag = true;
        this.$nextTick(() => {
          if(!this.goodsDetailScroll){
            this.goodsDetailScroll = new BetterScroll(this.$refs.goodsDetail, {
              click: true
            });
          }else{
            this.goodsDetailScroll.refresh();
          }
        });
      },
      back (){
        this.showFlag = false;
      },
      addToCart (e){
        Vue.set(this.food, 'count', 1);
        this.$emit("on-add",e.target)
      },
      whichOneIsAdd (target){
        this.$emit("on-add",target)
      },
      changeType (type){
        this.selectType = type;
        this.$nextTick(() => {
          this.goodsDetailScroll.refresh();
        });
      },
      onlyChange (){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.goodsDetailScroll.refresh();
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if(this.selectType === type){
          return true
        }else if(this.selectType ===2){
          return true
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.stylus"

  .move-enter,.move-leave-to
    transform translate3d(0,100%,0)
  .move-enter-active,.move-leave-active
    transition all 0.2s

  .buy-enter,.buy-leave-to
    opacity 0
  .buy-enter-active,.buy-leave-active
    transition all 0.2s
  .goodsDetail
    position fixed
    top 0
    right 0
    left 0
    bottom 48px
    z-index 30
    background #fff
    overflow hidden
    .goodsDetail-content
      .image-header
        position relative
        width 100%
        height 0
        padding-bottom  100%
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
        .back
          position absolute
          top 10px
          left 0
          .icon-arrow_lift
            display block
            padding 10px
            font-size 20px
            color #fff
      .content
        position relative
        padding 18px
        .title
          line-height 14px
          margin-bottom 8px
          font-size 14px
          font-weight 700
          color rgb(7, 17, 27)
        .detail
          margin-bottom 18px
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
          .sale
            margin-right 12px
        .price
          .nowPrice
            font-size 14px
            color rgb(240, 20, 20)
            line-height 24px
            font-weight 700
            margin-right 8px
            &>i
              font-size 10px
              font-style normal
              font-weight normal
          .oldPrice
            font-size 10px
            color rgb(147, 153, 159)
            line-height 24px
            font-weight 700
            text-decoration line-through
        .addSubtract
          bottom 18px
          right 18px
        .buy
          position absolute
          right 18px
          bottom 18px
          z-index 10
          height 24px
          line-height 24px
          padding  0 12px
          box-sizing border-box
          border-radius 12px
          font-size 10px
          color #fff
          background rgb(0, 160, 220)
      .info
        padding 18px
        .title
          line-height 14px
          margin-bottom 6px
          font-size 14px
          color rgb(7, 17, 27)
        .text
          font-size 12px
          color rgb(77, 85, 93)
          line-height 24px
      .rating
        padding-top 18px
        .title
          padding 0 18px
          line-height 14px
          margin-bottom 6px
          font-size 14px
          color rgb(7, 17, 27)
        .rating-wrapper
          margin 0 18px
          .rating-item
            position relative
            padding 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .user
              position absolute
              right 0
              top 16px
              font-size 0
              .name
                font-size 10px
                line-height 12px
                color rgb(147, 153, 159)
                margin-right 6px
              .avatar
                border-radius 50%
            .rating-text
              margin-top 6px
              .icon-thumb_up,.icon-thumb_down
                font-size 12px
                line-height 24px
              .icon-thumb_down
                color rgb(147, 153, 159)
              .icon-thumb_up
                color rgb(0, 160, 220)
              .text
                font-size 12px
                color rgb(7, 17, 27)
                line-height 16px
                margin-left 4px
          .no-rating
            padding 16px 0
            font-size 12px
            color rgb(147, 153, 159)
</style>
