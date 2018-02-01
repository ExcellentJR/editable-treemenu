<template>
	<div class="naza-tree-warp">
		<div class="naza-tree-inner show-wrap">
			<ul class="naza-tree">
				<span style="position: absolute;left: 230px;top: 42px;">
					<Spin v-if="isloading">
						<Icon type="load-c" size=16 class="demo-spin-icon-load"></Icon>
					</Spin>
				</span>
				<li v-for="(item, $index) in data"
					class="naza-tree-row"
					:class="item.data.isSelected?'selected':''"
					@click="clickme($index)">
					<context-menu
						:context-menu-data="contextMenuData"
						:target-class="className"
						:data="item">
					</context-menu>
					<a :style="{paddingLeft: (20 * item.data.level) + 'px'}">
						<i v-if="item.data.nodeType!==2"
							class="glyphicon"
							aria-hidden="true"
							:class="[item.data.open?'glyphicon-chevron-down':'glyphicon-chevron-right']"
							@click="expand_menu($index)"
							:style="{position: 'absolute',left: (20 * item.data.level - 17) + 'px',top: '6px'}">
						</i>
						<i v-if="item.data.nodeType===2"
							aria-hidden="true"
							class="fa fa-circle"
							:style="{position: 'absolute',
									left: (20 * item.data.level - 14) + 'px',
									top: '9px',
									color: '#0f0',
									fontSize: '10px'}">
						</i>
						<span class="name-container"
							:class="'vue-contextmenuName-menu' + item.data.nodeType + item.data.nodeId"
							@dblclick="dblClick($index)"
							@contextmenu="showMenu($index,$event)">
							<i v-if="item.data.nodeType!==2"
								class="fa" aria-hidden="true"
								:class="[item.data.open?'fa-folder-open':'fa-folder']"
								style="color:#09c;font-size: 16px;">
							</i>
							<span class="name"
								:title="item.data.nodeName"
								:style="{display:item.data.nodeType===1?'inline-block':'initial',
										userSelect: 'none'}">
								{{item.data.nodeName}}
							</span>
						</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Spin,Icon } from 'iview'
import contextMenu from './contextMenu.vue'
export default {
	name: 'cotalogue',
	components: {
		Spin,
		Icon,
		contextMenu
	},
	props: {
		data: {
			type: Array,
			default: []
		},
	},
	data () {
		return {
			clickNum: null,
			isloading: false,
			className: '',
			contextMenuData: {
				menuName: 'menu',
				axios: {
					x: null,
					y: null
				},
				menulists:[[],[{
					fnHandler: 'createdire',
					icoName: 'fa fa-folder',
					btnName: '新建目录'
				},{
					fnHandler: 'createtask',
					icoName: 'fa fa-circle',
					btnName: '新建任务'
				}],[{
					fnHandler: 'createdire',
					icoName: 'fa fa-folder',
					btnName: '新建目录'
				},{
					fnHandler: 'createtask',
					icoName: 'fa fa-circle',
					btnName: '新建任务'
				},{
					fnHandler: 'newname',
					icoName: 'fa fa-pencil',
					btnName: '重命名'
				},{
					fnHandler: 'deletedire',
					icoName: 'fa fa-times',
					btnName: '删除'
				}],[{
					fnHandler: 'deletetask',
					icoName: 'fa fa-times',
					btnName: '删除'
				}]]
			}
		}
	},
	methods: {
		expand_menu(index) {
			var _this = this;
			clearTimeout(_this.clickNum);
			if(_this.data[index].numberOfChildren === 0){
				_this.clickNum = setTimeout(()=>{
					_this.data[index].data.open = !_this.data[index].data.open;
				}, 250);
			}else{
				(!_this.data[index].data.open) && (_this.isloading = true);
				_this.clickNum = setTimeout(()=>{
					if(_this.data[index].data.level > 1){
						if(_this.data[index].data.open){
							let length = 0;
							for(let i = index + 1;i < _this.data.length;i++){
								if(_this.data[i].data.level > _this.data[index].data.level){
									length += 1
								}else if(_this.data[i].data.level === _this.data[index].data.level){
									break
								}
							}
							_this.data[index].data.open = !_this.data[index].data.open;
							_this.data.splice(index + 1,length);
						}else{
							_this.getTaskData(index);
							_this.data[index].data.open = !_this.data[index].data.open;
						}
					}
				},250)
			}
		},
		getTaskData(index){
			var _this = this,
				mockData = {
					children: [{
						children: [],
						data: {
							open: false,
							isSelected: false,
							level: _this.data[index].data.level + 1,
							nodeId: _this.data.length + 1,
							nodeName: '有子级文件夹',
							nodeType: 1,
							parentId: _this.data[index].data.nodeId
						},
						numberOfChildren: 2
					}, {
						children: [],
						data: {
							open: false,
							isSelected: false,
							level: _this.data[index].data.level + 1,
							nodeId: _this.data.length + 2,
							nodeName: '无子级文件夹',
							nodeType: 1,
							parentId: _this.data[index].data.nodeId
						},
						numberOfChildren: 0
					}, {
						children: [],
						data: {
							open: false,
							isSelected: false,
							level: _this.data[index].data.level + 1,
							nodeId: _this.data.length + 1,
							nodeName: '新建任务',
							nodeType: 2,
							parentId: _this.data[index].data.nodeId
						},
						numberOfChildren: 0
					}]
				};
			_this.isloading = false;
			mockData.children.forEach(item => {
				item.data.isSelected = false;
				item.data.contextmenuIndex = item.data.nodeType + 1;
				if(_this.data.length === 1){
					_this.data.push(item);
				}else if(_this.data.length > 1){
					_this.data.splice(index + 1, 0, item);
				}
			});
			// _this.data[index].numberOfChildren = 2;
		},
		clickme(index){
			var _this = this;
			_this.data.forEach((item)=>{
				item.data.isSelected = false;
			});
			_this.data[index].data.isSelected = true;
		},
		dblClick(index){
			var _this = this;
			if(_this.data[index].data.nodeType === 1){
				_this.expand_menu(index);
			}
		},
		showMenu(index,event){
			var _this = this;
			_this.clickme(index);
			event.preventDefault();
			_this.className = event.target.closest('.name-container').classList[1];
			var x = event.clientX;
			var y = event.clientY;
			// Get the current location
			_this.contextMenuData.axios = {
				x, y
			};
		}
	}
}
</script>
<style scoped>
	.naza-tree-warp {
		width: 100%;
		height: 100%;
		min-width: 175px;
		border-bottom: 0 none;
		border-top: 0 none;
		border-right: 0 none;
	}
	.naza-tree-warp .naza-tree-inner {
		max-height: inherit;
		height: 100%;
		width: 100%;
		box-shadow: none;
		overflow: auto;
		padding: 5px 0px;
		padding-bottom: 30px;
	}
	.naza-tree-warp .naza-tree-inner .naza-tree {
		padding: 0;
		margin: 0;
		cursor: pointer;
		display: inline-block;
		min-width: 100%;
	}
	.naza-tree-warp .naza-tree-inner .naza-tree .selected {
		background-color: #5bc0de;
	}
	.naza-tree-warp .naza-tree-inner .naza-tree .naza-tree-row {
		list-style: none;
		min-width: 300px;
		line-height: 30px;
		height: 30px;
		float: none;
		color: #555;
	}
	.naza-tree-warp .naza-tree-inner .naza-tree .naza-tree-row:hover {
		background-color: #e5e5e5;
	}
	.naza-tree-warp .naza-tree-inner .naza-tree .naza-tree-row a {
		display: block;
		position: relative;
		line-height: 30px;
		height: 30px;
		padding: 0px 10px;
		text-decoration: none;
		text-align: left;
		color: #555;
		font-size: 12px;
	}
	.naza-tree-warp .naza-tree-inner .naza-tree .naza-tree-row a .name-container {
		display: inline-block;
		width: 100%;
		white-space: nowrap;
		vertical-align: middle;
	}
	.naza-tree-warp .naza-tree-inner .naza-tree .naza-tree-row a i {
		display: inline-block;
		font-size: 14px;
		margin-bottom: 2px;
	}
	.show-wrap::-webkit-scrollbar {
		width: 10px;
		height: 10px;
		background-color: #00ffcc;
		border-radius: 5px;
		/* display: none */
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	}
	.show-wrap::-webkit-scrollbar-track{
		width: 10px;
		height: 10px;
		background-color: #ddd;
		border-radius: 5px;
	}
	.show-wrap::-webkit-scrollbar-thumb{
		width: 10px;
		height: 10px;
		background-color: #00ffcc;
		border-radius: 5px;
	}
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>


