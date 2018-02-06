# cotalogue

> A treeMenu component which you can edit by contextMenu based on Vue.js2.0; <br/>   
> 1、与一般的偏展示的树形菜单不同，该组件是一个和右键菜单结合起来的可以进行新增、删除、重命名等操作（可自己扩展）的树形菜单，树形菜单由文件夹和任务两种item组成，针对文件夹和任务的右键菜单有不同的操作，任务前方的图标可自行修改颜色以展示该任务的状态。<br/>   
> 2、该组件并未采用递归调用自己的方式来实现，数据格式上统一“拍平”——使用一个数组（但仍可使用常规的数据格式），视图上采用data中关键的字段（level）来控制padding，具体的数据格式见图，可异步获取数据（推荐），具体实现可见代码；<br/>   
> 3、另外使用到了iveiw 的部分组件（Message、Modal、Icon、Spin等，按需加载）; <br/> 
> 4、持续更新中...

#demo
![image](https://github.com/ExcellentJR/editable-treemenu/blob/master/static/lib/img/wholeView.png) <br/> 
![image](https://github.com/ExcellentJR/editable-treemenu/blob/master/static/lib/img/folderContextMenu.png)
![image](https://github.com/ExcellentJR/editable-treemenu/blob/master/static/lib/img/taskContextMenu.png) <br/> 
![image](https://github.com/ExcellentJR/editable-treemenu/blob/master/static/lib/img/createNewFolder.png)
![image](https://github.com/ExcellentJR/editable-treemenu/blob/master/static/lib/img/createNewTask.png)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
