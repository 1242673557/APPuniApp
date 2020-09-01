<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="center" type="text" placeholder="寻找商品" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" data-current="0" v-for="(item,index) in cate" :key="item.id" >
					<!-- :class="indexgoodsname==index?'tag_list active_tag_list':'tag_list'" -->
					<!-- uni-tab-item-title-active选中 -->
					                      <!-- uni-tab-item-title uni-tab-item-title-active nav -->
					<text :class="title==index?'uni-tab-item-title-active':' uni-tab-item-title'" @click="titileClick(index)" >                                 
						{{item.catename}}
					</text>

				</view>



			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) in swiperList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img" mode="scaleToFill" class="slideshow"></image>
					</view>
				</swiper-item>
				<!-- 	<swiper-item >
					<view class="swiper-item">
						<image src="../../static/index/swiper.jpg" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item >
					<view class="swiper-item">
						<image src="../../static/index/swiper.jpg" mode=""></image>
					</view>
				</swiper-item>
				 -->
			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="classify">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{secondkill.hour}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{secondkill.minute}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{secondkill.second}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view v-for="(item,index) in indexgoodslist" :key="item.id" :class="indexgoodsname==index?'tag_list active_tag_list':'tag_list'">
					<label for="" @click="aa(index)">{{item.goodXxk}}</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">

				<view class="product" v-for="(item,index) in xb" :key="item.id">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="baseUrl+item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售{{item.market_price}}件</view>
						<view class="Immed" @click="goRob(index)">立即抢购</view>
					</view>
				</view>
	
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from "@/utils/request.js"
	import {
		getcate
	} from "@/utils/getcate.js"
	import {
		getseckill
	} from "@/utils/getseckill.js"
	import {
		getbanner
	} from "@/utils/getbanner.js"
	import {
		getindexgoods
	} from "@/utils/getindexgoods.js"
	export default {
		data() {
			return {
				cate: [], //首页快速分类导航
				swiperList: [], //轮播图列表
				goodlist: [], //商品列表
				secondkill: {}, //限时秒杀
				indexgoods: [], //获取商品信息
				indexgoodslist: [{
						goodXxk: "热门推荐",
						id: 1
					},
					{
						goodXxk: "最新好货",
						id: 2
					},
					{
						goodXxk: "所有商品",
						id: 3
					}
				], //获取商品信息切换类名
				indexgoodsname: 0, //获取商品信息123判断
				getindexgoods: [],//3个分类商品信息
				xb: {},//具体某一条商品信息
				baseUrl: baseUrl,//商品信息图片前缀
				title:0
			}
		},
		methods: {
			// 头部导航栏跳转以及样式切换
			titileClick(e){
				this.title=e
				uni.navigateTo({
					url:'../product/product?id='+this.cate[this.title].id
				})
			},
			// 切换底部商品选项
			aa(e) {
				// this.indexgoodslist[e].className
				this.indexgoodsname = e
				this.xb = this.indexgoods[this.indexgoodsname].content

				// console.log(this.getindexgoods)
			},
			// 商品分类跳转
			classify(){
				uni.navigateTo({
					url:'../classify/classify'
				})
				console.log("githup测试新增数据")
			},
			// 立即抢购(跳转传商品id)
			goRob(e){
				uni.navigateTo({
					url:'../details/details?id='+this.xb[e].id
				})
			}
		},
		
		// 使用封装的函数请求数据
		async onLoad() {
			//首页快速分类导航
			var cate = await getcate();
			this.cate = cate[1].data.list

			// 轮播图数据
			var result = await getbanner();
			this.swiperList = result[1].data.list
			this.swiperList.forEach(item => {
				item.img = baseUrl + item.img
			})

			// 限时秒杀
			var kill = await getseckill()
			var endtime = kill[1].data.list[0].endtime
			setInterval(() => {
				var nowtime = new Date().getTime()
				var distance = endtime - nowtime
				
				// 计算倒计时时间
				distance = Math.floor(distance / 1000)
				var hour = Math.floor(distance / 3600) //小时
				var minute = Math.floor(distance % 3600 / 60) //分钟
				var second = distance % 3600 % 60 //秒数
				hour = hour < 10 ? "0" + hour : hour;
				minute = minute < 10 ? "0" + minute : minute;
				second = second < 10 ? "0" + second : second;
				this.secondkill = {
					hour,
					minute,
					second
				}
			}, 1000)
	
			// 获取商品信息
			var indexgoods = await getindexgoods()
			this.indexgoods = indexgoods[1].data.list
			this.xb = this.indexgoods[0].content


			// console.log(indexgoods)
			// /api/getindexgoods
			// var goods = await myRequest("/api/getindexgoods");
			// console.log(goods)
			// // 限时秒杀
			// var getseckill = await myRequest("/api/getseckill");

		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");

	.swiper-item {
		width: 100%;
		height: 100%;
	}

	.slideshow {
		width: 100%;
		height: 100%;
	}
</style>
