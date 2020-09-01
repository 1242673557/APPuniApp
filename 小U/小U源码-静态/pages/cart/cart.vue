<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in cartlist" :key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change="singleCheck($event,index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="baseUrl+item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="reduce(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
				</view>

				<view class="cartDel" id="demo2" @click="Delete(index)"><label for="">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllCheck" @click="doAllCheck" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{total}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toConfirm($event)">
				<!-- 被选中的商品的个数 -->
				<label >去结算</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartlist
	} from "@/utils/cartlist.js"
	import {
		cartedit
	} from "@/utils/cartedit.js"
	import {
		baseUrl
	} from "@/utils/request.js"
	import {cartdelete} from "@/utils/cartdelete.js"
	export default {
		data() {
			return {
				cartlist: [], //数据列表
				baseUrl: baseUrl, //图片前缀
			}
		},
		methods: {
			// 数量增加
			async add(index) {
				// 1.页面的num增加
				this.cartlist[index].num += 1
				// 2.调用接口，更新数据库中的记录
				let {
					id,
					num,
					checked
				} = this.cartlist[index]
				checked = checked ? 1 : 0; //数据类型要和mysql数据库保持一致
				let {
					token
				} = uni.getStorageSync('userInfo');
				// 3.执行更新数据库中的cart表
				var result = await cartedit(id, num, checked, token)
			},
			// 数量减少
			async reduce(index) {
				// 1.页面的num增加
				this.cartlist[index].num -= 1
				if (this.cartlist[index].num <= 1) {
					this.cartlist[index].num = 1
				}
				// 2.调用接口，更新数据库中的记录
				let {id,num,checked} = this.cartlist[index]
				checked = checked ? 1 : 0; //数据类型要和mysql数据库保持一致
				let {token} = uni.getStorageSync('userInfo');
				// 3.执行更新数据库中的cart表
				var result = await cartedit(id, num, checked, token)
			},
			
			// 单选
			singleCheck(e, index) {
				// 页面checked改变
				var value = e.detail.value;
				// console.log(value,'111');
				this.cartlist[index].checked = value;
				// 同步数据
				this.doEdit(index)
			},
			
			
			// 点击全选
			doAllCheck() {
				this.isAllCheck = !this.isAllCheck
			},
			// 删除数据
			async Delete(index){
				let {token} = uni.getStorageSync('userInfo');
				let {id}=this.cartlist[index];
				let {uid}=uni.getStorageSync("userInfo")
				let Th=this
				wx.showModal({
					title:'确定要删除吗？',
					async success(res){
						if(res.confirm){
							var result= await cartdelete(id,token);
							var liebiao = await cartlist(uid, token)
							Th.cartlist=liebiao[1].data.list
							wx.showToast({
							  title: '删除成功',
							  icon: 'none',
							})
						}else if(res.cancel){
							console.log('删除取消')
							wx.showToast({
							  title: '取消删除',
							  icon: 'none',
							})
						}
						
					}
				})
				
			},
			
			
			// 同步数据到数据库
			async doEdit(index) {
				//同步数据到数据库
				let {id,num,checked} = this.cartlist[index];
				checked = checked ? 1 : 0 //数据类型要和mysql数据库保持一致
				let {token} = uni.getStorageSync('userInfo');
				var result = await cartedit(id, num, checked, token)
			},
			
			// 缓存数据，跳转到确认页面
			toConfirm(e){
			 var result = this.cartlist.filter(item=>{
				 return item.checked==true
			 })
			uni.setStorageSync("order",result)
			if(result.length==0){
				wx.showToast({
				  title: '请选择商品',
				  icon: 'none',
				})
				console.log(111)
			}else{
				uni.navigateTo({
					url:"/pages/confirm/confirm"
				})
			}
		
			}
		},
		computed: {
			// 计算总价
			total() {
				var sum = 0;
				this.cartlist.forEach(item => {
					if (item.checked) {
						sum += item.price * item.num
					}
				});
				return sum;
			},
			isAllCheck: {
				get: function() {
					var result =this.cartlist.every(item => {
						return item.checked == true;
					})
					return result;
					// console.log(result)
					
				},
				set: function(val) {
					// 把每个商品的checked状态和全选保持一致
					this.cartlist.forEach(item => {
						item.checked = val
					})
				}
			}
		},
		async onLoad() {
			let {uid,token} = uni.getStorageSync("userInfo")
			console.log(token)
			if(token==undefined){
		
				wx.showModal({
					title:'请先登录',
					async success(res){
						if(res.confirm){
							  icon: 'none',
							  uni.redirectTo({
							  	url:"../send/send"
							  })
						}else if(res.cancel){
							wx.showToast({
							  title: '登录取消',
							  icon: 'none',
							}),
						uni.reLaunch({
							 url:"../index/index"
						})
						}
						
					}
				})
				
				
				
			}
			var result = await cartlist(uid, token)
			var aa = result[1].data.list
			aa.forEach(item => {
				item.checked = item.checked == 1 ? true : false;
			});
			this.cartlist = aa
		}
	};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}

	.scroll-view_H {
		width: 750rpx;
		height: 200rpx;
	}
</style>
