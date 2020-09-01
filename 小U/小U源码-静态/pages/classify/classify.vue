<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view v-for="(item,index) in getcates" :key="item.id" @click="pitch(index)"  :class="num==index?'left_list activeList':'left_list'">
				<label for="">{{item.catename}}</label>
			</view>
		
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="(item,index) in children" :key="item.id">
						<!-- 每个最多显示6个 -->
						<view>
							<image :src="baseUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>

			</view>
		</view>



	</view>
</template>

<script>
	import {baseUrl} from "@/utils/request.js"
	import {getcates} from "@/utils/getcates.js"
	export default {
		data() {
			return {
				baseUrl:baseUrl,//图片前缀
				getcates:[],//数据
				num:1,//动态类名
				children:[]//子集数据
			}
		},
		methods:{
			pitch(e){
				this.num=e
				this.children=this.getcates[e].children
				console.log(this.children)
			}
		},
		async onLoad(){
			var aa=await getcates()
			this.getcates=aa[1].data.list
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
