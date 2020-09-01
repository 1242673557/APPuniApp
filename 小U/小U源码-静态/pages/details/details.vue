<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="baseUrl+getgoodsinfo.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{getgoodsinfo.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{getgoodsinfo.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="jian">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" @click="jia">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{getgoodsinfo.specsname}}</label>
					<view class="threed3i1" v-for="(item,index) in specsattr" :key="index">{{item}}</view>
					<!-- <view class="threed3i2">5g</view> -->
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			
			<rich-text :nodes="getgoodsinfo.description"></rich-text>
			<!-- <image :src="baseUrl+getgoodsinfo.img" mode="aspectFill" /> -->
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2" @click="goCart">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {getgoodsinfo} from "@/utils/getgoodsinfo.js"
	import {baseUrl} from "@/utils/request.js"
	import {cartadd} from "@/utils/cartadd.js"
	export default {
		data() {
			return {
			getgoodsinfo:[],//数据
			baseUrl:baseUrl,//图片前缀
			specsattr:[],//规格数组
			num:1,//商品数量
			}
		},
		
		methods:{
			// 商品数量加
			jia(){
				this.num +=1
				if(this.num>99){
					this.num=99
				}
			},
			// 商品数量减少
			jian(){
				this.num -=1
				if(this.num<1){
					this.num=1
				}
			},
			// 添加购物车
			async addCart(){
				// 1.从缓存中拿到uid和token
				let {uid,token}=uni.getStorageSync("userInfo")
				// 2.拿到商品id和商品num
				var goodsid=this.$mp.query.id;
				var num=this.num;
				// 3.添加购物车
				var result = await cartadd(uid,goodsid,num,token);
				// 4.提示用户添加成功
				wx.showToast({
					title:"成功添加购物车"
				})
			},
			
			async goCart(){
				// 1.从缓存中拿到uid和token
				let {uid,token}=uni.getStorageSync("userInfo")
				// 2.拿到商品id和商品num
				var goodsid=this.$mp.query.id;
				var num=this.num;
				// 3.添加购物车
				var result = await cartadd(uid,goodsid,num,token)
			
				if(result[1].data.code==200){
					console.log(result)
					uni.reLaunch({
						url:"../cart/cart"
					})
				}
		
			}
		},
		
		async onLoad(e) {
			var id = e.id
			var aa = await getgoodsinfo({
				id: id
			})
			this.getgoodsinfo=aa[1].data.list[0]
			var specsattr = this.getgoodsinfo.specsattr.split(',')
			this.specsattr=specsattr
		}

	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
