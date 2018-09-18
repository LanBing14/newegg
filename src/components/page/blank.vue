<template>
	<div id="balance">

	</div>
</template>

<script>
	import axios from "axios";
	import qs from "qs";
	export default {
		name: 'balance',
		data() {
			return {
				urls: '',

			}
		},
		methods: {
			getQueryString(name, url) {
				url = url || window.location.search.substr(1);
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = url.match(reg);
				if(r != null)
					return decodeURI(r[2]);
				return null;
			}
		},
		mounted() {

		},
		created() {
			//判断地址栏地址
			this.urls = window.location.href;
			//			this.urls = 'http://egg.wufuapp.com/?openid=oX6js0WrM2E-Pbz0tg3ltsDdPByY&activityId=12&from=singlemessage'
			if(this.urls.indexOf('activityId') == -1) {
				//跳到首页
			
				if(this.urls.indexOf('makeMoney') > -1){
						let openid = this.getQueryString('openid');
						let makeMoney =this.getQueryString('makeMoney');
						
						//跳到抢蛋页面
						this.$router.push({
							path: '/friends_money_details',
							query: {
								openid: openid,
								makeMoney: makeMoney
							}
						});
				}else{
					this.$router.push({
						path: '/product_details',
						query: {}
					});
				}

			} else {
				let openid = this.getQueryString('openid');
				let activityId =this.getQueryString('activityId');
				console.log(openid);
				//跳到抢蛋页面
				this.$router.push({
					path: '/Free_egg_robbing',
					query: {
						openid: openid,
						activityId: activityId
					}
				});

			}
		},
		components: {}
	}
</script>

<style lang="scss" scoped>
	#balance {
		min-height: 41.6rem;
	}
</style>