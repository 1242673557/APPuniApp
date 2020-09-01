<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text v-if="yzm" @click="send"  >获取验证码</text>
				<text   v-else>{{num}}</text>
			</view>
			<input type="text" v-model="code"  placeholder="- - - -" maxlength="4"  @input="aa" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="doLogin" :disabled="loGin">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {sms} from "@/utils/sms.js"
	import {wxlogin} from "@/utils/wxlogin.js"
	export default{
		data(){
			return {
				phone:'',//手机号
				code:'',//用户输入的验证码
				yzm:true,//验证码判断
				loGin:true,//是否登录
				num:60
			}
		},
		methods:{
			async send(){
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
						wx.showToast({
							title:'手机号不正确',
							icon:'none'
						})
				        return false; 
				    } else{
						var result=await sms(this.phone);
						var code=result[1].data.list.code;
						wx.showToast({
							title:'验证码为:'+code,
							icon:'none',
							duration:2000
						})
						wx.setStorageSync('code',code)
						this.yzm=false
						if(!this.yzm){
							setInterval(()=>{
								this.num=this.num-1
								if(this.num==1){
									this.yzm=true
									this.num=60
								}
							},1000)
						}
					}
			
				
			},
			
			// 提交表单
			async doLogin(){
				// 1.检验验证码
				var code=this.code;//用户输入的验证码
				var codeStorage=wx.getStorageSync('code');
				if(code==codeStorage){
					// 2.执行登录
					var result=await wxlogin({phone:this.phone});
					// 3.获取到token，uid等信息，存入到缓存
					console.log(result)
					var userInfo=result[1].data.list;
					wx.setStorageSync('userInfo',userInfo)
					// 4.跳转到我的页面
					wx.switchTab({
						url:'/pages/mine/mine'
					});
				}else{
					wx.showToast({
						title:'验证码不正确',
						icon:'none'
					})
				}
			},
			aa(){
				if(this.code.length==4){
					this.loGin=false;
				}else{
					this.loGin=true;
				}
			}
		},
	
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
