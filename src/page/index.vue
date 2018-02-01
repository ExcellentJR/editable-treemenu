<template>
	<article>
		<div class="row">
			<div class="col-md-12">
				<button type="button" class="btn btn-default btn-sm">{{msg}}</button>
				<div style="width: 240px;height: 300px;">
					<cotalogue ref="cotalogue" :data="data"></cotalogue>
				</div>
			</div>
		</div>
	</article>
</template>
<script>
import Bus from '../common/js/bus.js'
import cotalogue from '../components/cotalogue'
export default {
	name: 'index',
	components: {
		cotalogue
	},
	data () {
		return {
			msg: '德莱联盟',
			data: [{
				children: [],
				data: {
					open: true,
					isSelected: false,
					level: 1,
					nodeId: 1,
					nodeName: '根文件夹',
					nodeType: 1,
					parentId: -1,
					contextmenuIndex: 1
				},
				numberOfChildren: 3
			}, {
				children: [],
				data: {
					open: false,
					isSelected: false,
					level: 2,
					nodeId: 2,
					nodeName: '新建文件夹1',
					nodeType: 1,
					parentId: 1,
					contextmenuIndex: 2
				},
				numberOfChildren: 2
			}, {
				children: [],
				data: {
					open: false,
					isSelected: false,
					level: 2,
					nodeId: 3,
					nodeName: '新建文件夹2',
					nodeType: 1,
					parentId: 1,
					contextmenuIndex: 2
				},
				numberOfChildren: 2
			}, {
				children: [],
				data: {
					open: false,
					isSelected: false,
					level: 2,
					nodeId: 4,
					nodeName: '新建任务',
					nodeType: 2,
					parentId: 1,
					contextmenuIndex: 3
				},
				numberOfChildren: 0
			}]
		}
	},
	created() {
		//新建文件夹
        Bus.$on('createdire', data => {
			console.log(data);
			this.createDire(data);
		});
		//删除文件夹
		Bus.$on('deletedire', data => {
			console.log(data);
			this.deleteDire(data);
		});
		//新建任务
		Bus.$on('createtask', data => {
			console.log(data);
			this.createTask(data);
		});
		//删除任务
		Bus.$on('deletetask', data => {
			console.log(data);
			this.deleteTask(data);
		});
		//文件夹重命名
		Bus.$on('newname', data => {
			console.log(data);
			this.rename(data);
		});
	},
	methods: {
		//根据文件夹或者任务的nodeId寻找该文件夹在左边菜单栏对应的index
		getIndexById(nodeId){
			for(let i = 0;i<this.data.length;i++){
				if(this.data[i].data.nodeId === nodeId){
					return i
				}
			}
		},
		//删除文件夹时要获取该文件夹下的子文件的个数
		getChildrenLength(index){
			var _this = this,
				length = 0;
			if(_this.data.length < 2){
				return 0
			}else{
				for(let i = index + 1;i < _this.data.length;i++){
					if(_this.data[i].data.level > _this.data[index].data.level){
						length += 1
					}else if(_this.data[i].data.level === _this.data[index].data.level){
						return length
					}
				}
			}
		},
		createDire(data){
			var _this = this,
				index = _this.getIndexById(data.data.nodeId);
			if(typeof(index) === 'undefined'){
				return
			}
			if(!_this.data[index].data.open){
				_this.$refs.cotalogue.expand_menu(index);
			}
			setTimeout(()=>{
				_this.data.splice(index + 1, 0 , {
					children: [],
					data: {
						open: false,
						isSelected: false,
						level: data.data.level + 1,
						nodeId: data.data.nodeId + 1,
						nodeName: '我是新建的文件夹',
						nodeType: 1,
						parentId: data.data.nodeId,
						contextmenuIndex: 2
					},
					numberOfChildren: 0
				})
			}, 300);
		},
		deleteDire(data){
			var _this = this,
				index = _this.getIndexById(data.data.nodeId);
			if(typeof(index) === 'undefined'){
				return
			}
			if(data.numberOfChildren === 0){
				_this.data.splice(index, 1);
			}else{
				_this.iview.Message.warning('请先删除该文件夹的子项目');
			}
		},
		createTask(data){
			var _this = this,
				index = _this.getIndexById(data.data.nodeId);
			if(typeof(index) === 'undefined'){
				return
			}
			if(!_this.data[index].data.open){
				_this.$refs.cotalogue.expand_menu(index);
			}
			setTimeout(()=>{
				_this.data.splice(index + 1, 0 , {
					children: [],
					data: {
						open: false,
						isSelected: false,
						level: data.data.level + 1,
						nodeId: data.data.nodeId + 1,
						nodeName: '我是新建的任务',
						nodeType: 2,
						parentId: data.data.nodeId,
						contextmenuIndex: 3
					},
					numberOfChildren: 0
				})
			}, 300);
		},
		deleteTask(data){
			var _this = this,
				index = _this.getIndexById(data.data.nodeId);
			if(typeof(index) === 'undefined'){
				return
			}
			_this.data.splice(index, 1);
		},
		rename(data){
			var _this = this,
				index = _this.getIndexById(data.data.nodeId);
			if(typeof(index) === 'undefined'){
				return
			}
			_this.data[index].data.nodeName = '我被修改了T.T';
		}
	}
}
</script>
<style scoped>

</style>


