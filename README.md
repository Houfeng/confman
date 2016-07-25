# 一句话介绍
conifg-parser 是一个强大的配置文件加载器，无论你喜欢 yaml 、json、cson、ini、toml 还是 js，都能满足你的愿望，并且更加简单、更加强大。

# 支持的特性
- 支持多种配置文件格式，默认包括 yaml/json/cson/ini/toml/js 
- 可以「混合使用」不同的配置文件格式
- 可以使用基于「目录」的配置文件
- 可以非常方便的「扩展」新的配置文件格式
- 无论何种配置文件，都可以轻松的「引用其它任意格式」的配置文件
- 支持「环境配置」，区分加载生产、测试不同配置

# 现在就安装
```
$ npm install config-parser --save
```

# 来几个示例

#### 单一配置文件
```js

```

#### 配置文件相互引用
```js
```

#### 基于目录的多文件配置
目录结构
```sh
```
加载代码
```js
```

#### 不同的环境配置
```js
```

# 扩展新格式
其实，多数情况你不需要这么做。
```js
module.exports = {
  extname: '.xxx',
  load: function (configPath) {
    //...
    return configs;
  }
};
```