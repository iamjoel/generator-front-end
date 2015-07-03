# 前端项目结构生成器
## 启动
* 下载本项目
* `cd 本项目跟路径`
* `npm i` 安装依赖
* `npm link` 在本地能使用该包
* `npm install -g yo` 安装[Yo](https://github.com/yeoman/yo)
* `cd 要生成前端项目的目录`
* `yo front-end`

## 执行`yo front-end`做了什么
1 将`app/templates/copyContent`下的所有文件拷贝到当前文件夹    
生成的项目结构如下（tree /f）

```
└─src 源码
    │
    ├──css
    ├──common.css
    ├──image
    ├──js
    ├──sass
    │  ├─common.scss
    │  ├─_rem.scss px转化成rem
    │  ├─_utilities.scss 工具方法，包括生成以rem为单位的图片精灵
    │  ├─_variables.scss
    ├─vendor 第三方组件
    │  ├─caculate-rem.js 根据屏幕的不同宽度给根节点设置不同的字号
    │  ├─jquery.js
    ├──views .html文件
    ├─config.rb compass框架的配置文件
    └─index.html
├──gulpfile.js
├──.gitignore
└──package.json
```

2 执行`npm install`


## 配置的任务
* `gulp build` 构建项目：将js,css文件进行压缩,并且生成sourcemap，其压缩后的文件和image，html文件一起移动到`build`文件夹。image可以用gulp-imagemin来压缩，这里没用的原因是，其安装过程（非下载过程）异常的慢。。。

## 创建自己的项目结构生成器
[官方教程](http://yeoman.io/authoring/)