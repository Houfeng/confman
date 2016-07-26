# 一句话介绍
confman 是一个强大的配置文件加载器，无论你喜欢 yaml 、json、cson、xml、ini、toml 还是 js，都能满足你的愿望，并且更加简单、更加强大。

[![npm version](https://badge.fury.io/js/confman.svg)](http://badge.fury.io/js/confman)
[![Build Status](https://travis-ci.org/Houfeng/confman.svg?branch=master)](https://travis-ci.org/Houfeng/confman) 

# 支持的特性
- 支持多种配置文件格式，默认包括 yaml/json/cson/xml/ini/toml/js 
- 支持配置文件相互引用，无论何种格式都可以「引用其它任意格式」的配置文件
- 支持「基于目录」的多文件配置
- 支持「环境配置」，区分加载生产、测试等不同的配置
- 可以非常方便的「扩展」新的配置文件格式
- 可以「混合使用」不同的配置文件格式

# 现在就安装
```sh
$ npm install confman --save
```

# 来几个示例

#### 不同的环境配置
目录
```
app
├── index.js
├── config.dev.yaml
├── config.prod.yaml
└── config.yaml
```

index.js
```js
const confman = require('confman');
const configs = confman.load(`${__dirname}/config`);
console.log(configs);
```

启动应用
```sh
$ NODE_ENV=prod node index.js 
```

通过指定 ```NODE_ENV``` 可以加载指定的「环境配置文件 config.prod.ymal」，并和「默认配置 config.yaml」进行合并,
如果有相同的配置，「环境配置会覆盖默认配置」

#### 配置文件相互引用
文件一: test1.yaml
```yaml
name: test1
#可以使用 $require 引用其它文件
child: $requrie ./test2
```
文件二: test2.json
```json
{
  "name": "test2",
   "child": "$require other-file"
}
```
```$require``` 可以在任意支持的格式的配置文件中使用

#### 基于目录的多文件配置
目录结构
```
├── config
│   ├── conn.yaml
│   ├── index.yaml
│   └── mvc.yaml
├── config.dev
│   └── conn.yaml
├── config.prod
│   └── conn.yaml
└── index.js
```

index.js
```js
const confman = require('confman');
const configs = confman.load(`${__dirname}/config`);
console.log(configs);
```

# 扩展新格式
其实，多数情况你不需要这么做，如果确实有需要，你可这样编写一个自定义 ```loader```

```js
module.exports = {
  extname: '.xxx',
  load: function (configPath) {
    //...
    return configs;
  }
};
```

添加自定义 loader
```js
confman.loaders.push(require('your-loader-path'));
```

# 自定义扩展名

方式一:
```js
confman.loaders.push({
  extname: '.xxx',
  loader: '.yaml'
});
```

方式二:
```js
confman.loaders.push({
  extname: '.xxx',
  loader: require('your-loader-path')
});
```