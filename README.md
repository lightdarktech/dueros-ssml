# dueros-ssml
dueros ssml

> 百度的 `dueros` 平台的 `ssml` 生成模块，详细见：https://dueros.baidu.com/didp/doc/dueros-bot-platform/dbp-custom/ssml_markdown

## 安装

`npm install dueros-ssml --save` 

## 使用说明

* 引入： `const SsmlEntity = require('dueros-ssml')` 
* 创建 `SsmlEntity` 对象： `new SsmlEntity()` or `SsmlEntity.create()` 
* `text` 方法会在当前节点层次插入文本，不会改变节点层次
* 除了 `text` 方法，其他方法会进入创建的节点层次，可以通过 `up` 方法重新回到创建节点的父节点上
* 当现有方法中没有要使用的节点方法可以通过 `element(name, attrsObj = {}, text = '')` 方法直接操作，可参考其他方法的实现
* `getStr` 方法获取 `ssml` 字符串



### 示例

``` js
const SsmlEntity = require('dueros-ssml');

let str = SsmlEntity.create()
    .text('先放段音频：')
    .audio('百度云BOS的音频地址-wav格式').up()
    .text('播放完音频了')
    .text('开始播放背景音：')
    .background('百度云BOS的音频地址-wav格式').text('此时有背景音乐').sub('w3c', '万维网联盟').up().text('还在背景音乐的节点中').up()
    .text('这时候没有背景音乐，因为用up 方法跳出背景音乐节点了')
    .sayAs(SsmlEntity.SAY_AS_TYPE.NUMBER_DIGITS, '123123123').up()
    .sub('Gu', '胃溃疡').up()
    .silence(10).up()
    .msSilence(100).getStr();
console.log( `${str}` )
```

打印结果为：

``` xml
<speak>先放段音频：<audio src="百度云BOS的音频地址-wav格式"/>播放完音频了开始播放背景音：<background src="百度云BOS的音频地址-wav格式" repeat="yes">此
时有背景音乐<sub alias="万维网联盟">w3c</sub>还在背景音乐的节点中</background>这时候没有背景音乐，因为用up 方法跳出背景音乐节点了<say-as type="number: digits">123123123</say-as><sub alias="胃溃疡">Gu</sub><silence time="10s"/><silence time="100ms"/></speak>
```

