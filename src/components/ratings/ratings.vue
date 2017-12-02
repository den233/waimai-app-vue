<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <ul class="score-wrapper">
            <li class="score">{{seller.score}}</li>
            <li class="title">综合评分</li>
            <li class="rank">高于周边商家{{seller.rankRate}}%</li>
          </ul>
        </div>
        <ul class="overview-right">
          <li class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </li>
          <li class="score-wrapper">
            <span class="title">商家态度</span>
            <star :size="36" :score="seller.score" class="star"></star>
            <span class="score">{{seller.score}}</span>
          </li>
          <li class="deliveryTime">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </li>
        </ul>
      </div>
      <split></split>
      <rating-select  :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @changeType="changeType" @changeOnly="onlyChange"></rating-select>
      <ul class="rating-wrapper">
        <li v-for="rating in ratings" class="rating-item" v-if="needShow(rating.rateType,rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" alt="" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score" class="star"></star>
              <span class="deliveryTime" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text" v-if="rating.text">{{rating.text}}</p>
            <div class="recommend" v-if="rating.recommend.length">
              <span :class="{'icon-thumb_up': rating.rateType ===0,'icon-thumb_down': rating.rateType ===1}"></span>
              <span v-for="item in rating.recommend" class="recommend-item">{{item}}</span>
            </div>
            <div class="rateTime">{{rating.rateTime | formatDate}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="es6">
  import BetterScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'
  import ratingSelect from '../ratingSelect/ratingSelect'
  import {formatDate} from '../../common/js/formatDate'
  export default {
    components: {
      star,
      split,
      ratingSelect
    },
    props: {
      seller: {
        type: Object
      }
    },
    data (){
      return {
        ratings: [],
        selectType: 2,
        onlyContent: false,
        desc: {
          'all': '全部',
          'positive': '满意',
          'negative': '不满意'
        }
      }
    },
    methods: {
      changeType (type){
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
        });
      },
      onlyChange (){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
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
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    mounted (){
      this.$http.post('//data.leibo.group', {v:'ratings'}).then(
        (res) => {
          if(res.body.errno ===0 ){
            this.ratings = res.body.data;
            this.$nextTick(() => {
              if(!this.ratingsScroll){
                this.ratingsScroll = new BetterScroll(this.$refs.ratings, {
                  click: true
                });
              }else{
                this.ratingsScroll.refresh();
              }
            });
          }
        },
        (error) => {

        }
      );
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.stylus'
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .ratings-content
      .overview
        display flex
        padding 18px 0
        .overview-left
          flex 0 0 137px
          padding 6px 0
          width 137px
          border-right 1px solid rgb(147, 153, 159)
          text-align center
          @media screen and (max-width 320px)
            flex 0 0 120px
            width 120px
          .score
            font-size 24px
            line-height 28px
            color rgb(255, 153, 0)
            margin-bottom 6px
          .title
            font-size 12px
            line-height 12px
            color rgb(7, 17, 27)
            margin-bottom 8px
          .rank
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
        .overview-right
          flex 1
          margin 6px 0 0 24px
          @media screen and (max-width 320px)
            margin 6px 0 0 6px
          .score-wrapper
            margin-bottom 8px
            font-size 0
            .title
              vertical-align top
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .star
              display inline-block
              vertical-align top
              margin 0 12px
            .score
              vertical-align top
              font-size 12px
              line-height 18px
              color rgb(255, 153, 0)
          .deliveryTime
            font-size 0
            .title
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .time
              margin-left 12px
              font-size 12px
              line-height 18px
              color rgb(147, 153, 159)
      .rating-wrapper
        padding 0 18px
        .rating-item
          display flex
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            img
              border-radius 50%
          .content
            flex 1
            .name
              font-size 10px
              line-height 12px
              color rgb(7, 17, 27)
              margin-bottom 4px
            .star-wrapper
              margin-bottom 6px
              font-size 0
              .star
                display inline-block
                vertical-align top
              .deliveryTime
                font-size 10px
                line-height 12px
                color rgb(147, 153, 159)
                margin-left 6px
            .text
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
              margin-bottom 8px
            .recommend
              font-size 0
              .icon-thumb_up
                font-size 12px
                line-height 16px
                color rgb(0, 166, 220)
                margin-right 8px
              .icon-thumb_down
                font-size 12px
                line-height 16px
                color rgb(183, 187, 191)
                margin-right 8px
              .recommend-item
                display inline-block
                margin 0 8px 4px 0
                padding 0 6px
                font-size 9px
                line-height 16px
                color rgb(147, 153, 159)
                border 1px solid rgba(7, 17, 27, 0.1)
            .rateTime
              font-size 9px
              line-height 16px
              color rgb(147, 153, 159)
              margin-top 8px
</style>
