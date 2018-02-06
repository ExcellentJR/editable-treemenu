<template>
	<article>
		<div class="row">
			<div class="col-md-12">
				<!-- <button type="button" class="btn btn-default btn-sm">{{msg}}</button> -->
				<div style="width: 240px;height: 300px;">
					<cotalogue ref="cotalogue" :data="data"></cotalogue>
				</div>
			</div>
		</div>
		<!--重命名目录-->
		<Modal
			v-model="newName.isshow"
			:loading="newName.loading"
			title="重命名目录"
			class-name="vertical-center-modal"
			width="600"
			@on-ok="rename"
			@on-cancel="newName.isshow=false,newName.formval.folderName='',newName.formval.id=null">
			<div class="form-horizontal">
				<div class="form-group">
					<label class="col-md-2 control-label"><em>*</em>&nbsp目录名称:</label>
					<div class="col-md-9">
						<input type="text" class="form-control" maxlength="70" v-model="newName.formval.folderName" :placeholder="'请输入目录名称'" />
					</div>
				</div>
			</div>
		</Modal>
		<!--新建目录-->
		<Modal
			v-model="newFolder.isshow"
			:loading="newFolder.loading"
			title="新建目录"
			class-name="vertical-center-modal"
			width="600"
			@on-ok="createDire"
			@on-cancel="newFolder.isshow=false,newFolder.formval.folderName='',newFolder.formval.id=null">
			<div class="form-horizontal">
				<div class="form-group">
					<label class="col-md-2 control-label"><em>*</em>&nbsp目录名称:</label>
					<div class="col-md-9">
						<input type="text" class="form-control" maxlength="70" v-model="newFolder.formval.folderName" :placeholder="'请输入目录名称'" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">父级目录:</label>
					<div class="col-md-9">
						<input type="text" class="form-control" disabled v-model="newFolder.formval.parentFolder" />
					</div>
				</div>
			</div>
		</Modal>
		<!--新建目录-->
		<Modal
			v-model="newTask.isshow"
			:loading="newTask.loading"
			title="新建任务"
			class-name="vertical-center-modal"
			width="600"
			@on-ok="createTask"
			@on-cancel="newTask.isshow=false,newTask.formval.taskName='',newTask.formval.id=null">
			<div class="form-horizontal">
				<div class="form-group">
					<label class="col-md-2 control-label"><em>*</em>&nbsp任务名称:</label>
					<div class="col-md-9">
						<input type="text" class="form-control" maxlength="70" v-model="newTask.formval.taskName" :placeholder="'请输入任务名称'" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-2 control-label">父级目录:</label>
					<div class="col-md-9">
						<input type="text" class="form-control" disabled v-model="newTask.formval.parentFolder" />
					</div>
				</div>
			</div>
		</Modal>
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
					nodeName: '处理失败的任务',
					nodeType: 2,
					status: 2,
					parentId: 1,
					contextmenuIndex: 3
				},
				numberOfChildren: 0
			}],
			newName: {
				isshow: false,
				loading: true,
				index: null,
				formval: {
					folderName: '',
					id: null
				}
			},
			newFolder: {
				isshow: false,
				loading: true,
				index: null,
				formval: {
					folderName: '',
					id: null,
					parentId: null,
					parentFolder: ''
				}
			},
			newTask: {
				isshow: false,
				loading: true,
				index: null,
				formval: {
					taskName: '',
					id: null,
					parentId: null,
					parentFolder: ''
				}
			}
		}
	},
	mounted () {
		//新建文件夹
        Bus.$on('createdire', data => {
			console.log(data);
			this.newFolder.isshow = true;
			this.newFolder.index = this.getIndexById(data.data.nodeId);
			this.newFolder.formval.folderName = '';
			this.newFolder.formval.parentId = data.data.nodeId;
			this.newFolder.formval.parentFolder = data.data.nodeName;
		});
		//删除文件夹
		Bus.$on('deletedire', data => {
			console.log(data);
			this.deleteDire(data);
		});
		//新建任务
		Bus.$on('createtask', data => {
			console.log(data);
			this.newTask.isshow = true;
			this.newTask.index = this.getIndexById(data.data.nodeId);
			this.newTask.formval.taskName = '';
			this.newTask.formval.parentId = data.data.nodeId;
			this.newTask.formval.parentFolder = data.data.nodeName;
		});
		//删除任务
		Bus.$on('deletetask', data => {
			console.log(data);
			this.deleteTask(data);
		});
		//文件夹重命名
		Bus.$on('newname', data => {
			console.log(data);
			this.newName.isshow = true;
			this.newName.index = this.getIndexById(data.data.nodeId);
			this.newName.formval.folderName = data.data.nodeName;
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
		//新建文件夹
		createDire(){
			var _this = this;
			if(typeof(_this.newFolder.index) === 'undefined'){
				return
			}
			if(!_this.data[_this.newFolder.index].data.open){
				_this.$refs.cotalogue.expand_menu(_this.newFolder.index);
			}
			setTimeout(()=>{
				if(_this.newFolder.formval.folderName.length){
					_this.data.splice(_this.newFolder.index + 1, 0 , {
						children: [],
						data: {
							open: false,
							isSelected: false,
							level:  _this.data[_this.newFolder.index].data.level + 1,
							nodeId:  _this.data[_this.newFolder.index].data.nodeId + 1,
							nodeName: _this.newFolder.formval.folderName,
							nodeType: 1,
							parentId: _this.data[_this.newFolder.index].data.nodeId,
							contextmenuIndex: 2
						},
						numberOfChildren: 0
					});
					_this.newFolder.loading = false;
					_this.newFolder.isshow = false;
				}else{
					_this.newFolder.loading = false;
					_this.$nextTick(() => {
						_this.newFolder.loading = true;
						_this.$Message.warning('目录名称不能为空！');
					});
				}
			}, 300);
		},
		//删除文件夹
		deleteDire(data){
			var _this = this,
				index = _this.getIndexById(data.data.nodeId);
			if(typeof(index) === 'undefined'){
				return
			}
			if(data.numberOfChildren === 0){
				_this.data.splice(index, 1);
			}else{
				_this.$Message.warning('请先删除该文件夹的子项目');
			}
		},
		//新建任务
		createTask(){
			var _this = this;
			if(typeof(_this.newTask.index) === 'undefined'){
				return
			}
			if(!_this.data[_this.newTask.index].data.open){
				_this.$refs.cotalogue.expand_menu(_this.newTask.index);
			}
			setTimeout(()=>{
				if(_this.newTask.formval.taskName.length){
					_this.data.splice(_this.newTask.index + 1, 0 , {
						children: [],
						data: {
							open: false,
							isSelected: false,
							level: _this.data[_this.newTask.index].data.level + 1,
							nodeId: _this.data[_this.newTask.index].data.nodeId + 1,
							nodeName: _this.newTask.formval.taskName,
							nodeType: 2,
							status: 0,
							parentId: _this.data[_this.newTask.index].data.nodeId,
							contextmenuIndex: 3
						},
						numberOfChildren: 0
					});
					_this.newTask.loading = false;
					_this.newTask.isshow = false;
				}else{
					_this.newTask.loading = false;
					_this.$nextTick(() => {
						_this.newTask.loading = true;
						_this.$Message.warning('任务名称不能为空！');
					});
				}
			}, 300);
		},
		//删除任务
		deleteTask(data){
			var _this = this,
				index = _this.getIndexById(data.data.nodeId);
			if(typeof(index) === 'undefined'){
				return
			}
			_this.data.splice(index, 1);
		},
		//重命名
		rename(){
			var _this = this;
			setTimeout(()=>{
				if(_this.newName.formval.folderName.length){
					if(typeof(_this.newName.index) === 'undefined'){
						return
					}
					_this.newName.isshow = false;
					_this.newName.loading = false;
					_this.data[_this.newName.index].data.nodeName = _this.newName.formval.folderName;
				}else{
					_this.newName.loading = false;
					_this.$nextTick(() => {
						_this.newName.loading = true;
						_this.$Message.warning('目录名称不能为空！');
					});
				}
			}, 250);

		}
	}
}
</script>
<style scoped>
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.vertical-center-modal .ivu-modal{
		top: 0;
	}
	em {
		color: #f00;
		font-size: 13px;
	}
</style>


