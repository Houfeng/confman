# 一句话介绍
Confman 是一个强大的配置文件加载器，无论你喜欢 yaml 、cson、json、properties、plist、ini、toml、xml 还是 js，都能满足你的愿望，并且更加简单、更加强大。

[![npm version](https://badge.fury.io/js/confman.svg)](http://badge.fury.io/js/confman)
[![Build Status](https://travis-ci.org/Houfeng/confman.svg?branch=master)](https://travis-ci.org/Houfeng/confman) 

# 支持的特性
- 支持多种配置文件格式，默认包括 yaml/cson/json/properties/plist/ini/toml/xml/js 
- 支持配置文件相互引用，无论何种格式都可以「引用其它任意格式」的配置文件
- 支持「基于目录」的多文件配置
- 支持「环境配置」，区分加载生产、测试等不同的配置
- 可以非常方便的「扩展」新的配置文件格式
- 可以「混合使用」不同的配置文件格式
- 内置多种「指令」，并可轻易的扩展新的指令

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

通过指定 ```NODE_ENV``` 可以加载指定的「环境配置文件 config.prod.yaml」，并和「默认配置 config.yaml」进行合并,
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

# 添加新格式

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

注册自定义 loader
```js
confman.loaders.push(require('your-loader-path'));
```

# 新的扩展名

方式一，映射到一个已经添加的 loader
```js
confman.loaders.push({
  extname: '.xxx',
  loader: '.yaml'
});
```

方式二，直接映射到一个未添加的自定义 loader 
```js
confman.loaders.push({
  extname: '.xxx',
  loader: require('your-loader-path')
});
```

# 内置的指令

如上边用到的 ```$require```，Confman 允许使用指令完成某些配置，内置的指令包括:

- $require 引用指令，用于引用其它配置文件，参数为相对于当前文件的相对路径或绝对路径
- $calc 计算指令，用于计算一个表达式，如 $calc root.baseUrl+"/xxx" (表达式中可用变量有 root:根对象，parent:父对象，self:当前对象)
- $read 读取指令，用于读取一个文本文件，参数为相对于当前文件的相对路径或绝对路径

示例 example.yaml
```yaml
name: example
test1: $require ./test1.json
test2: $read ./test2.txt
test3: $calc root.name + ":test3"
```

假如 ```test1.json``` 的内容为 ```{ "name": "test1" }```，```test2.txt``` 的内容为 ```my name is test2```,
通过 ```Confman.load('./example')``` 加载 ```example``` 的结果为：

```json
{
  "name": "example",
  "test1": { "name": "test1" },
  "test2": "my name is test2",
  "test3": "example:test3"
}
```

# 自定义指令

编写一个自定义指令的代码如下：

```js
module.exports = {
  name: 'xxx',
  exec: function(context){
    //context.fromPath 来自哪个配置文件
    //context.parser 当前 Confman 实例
    //context.root 根对象
    //context.parent 父对象
    //context.self 当前对象
    //context.name 配置属性名
    //context.value 指令后的值
    return {} //返回值为指令执行结果
  }
};
```

注册自定义指令
```js
confman.directives.push(require('your_directive_path'));
```

# 其它的问题
- 新的建议或 Bug 请使用 isseus 反馈
- 贡献代码，请使用 Pull Request，需一并提交相关测试并且不能低于现有覆盖率