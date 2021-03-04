// Generate by [js2dts@0.3.3](https://github.com/whxaxes/js2dts#readme)

import { XMLElement } from 'xmlbuilder';
/**
 * ssml 实体类
 */
declare class SsmlEntity {
  ssmlXml: XMLElement;
  currentElement: XMLElement;
  constructor();
  /**
   * 获取 Ssml 字符串
   */
  getStr(): string;
  /**
   * 操作父节点
   */
  up(): this;
  /**
   * 添加节点信息
   * @param {String} name 节点名称
   * @param {Object} attrsObj 属性对象
   * @param {String} text 节点内容
   */
  element(name: string, attrsObj?: any, text?: string): this;
  /**
   * 添加文本-不会更改节点层次，所以此方法注意 up方法的使用
   * @param {String} text 文本
   */
  text(text: string): this;
  /**
   * 添加音频 - 注意要是百度云bos的音频地址 - 
   * 标签audio不能包含background标签、 不支持自我嵌套。
   * @param {String} src 音频地址。仅支持百度云BOS的音频地址。
   * @param {Object} attrsObj 属性对象
   */
  audio(src: string, attrsObj?: any): this;
  /**
   * 设置合成语音中数字、 符号的读法， 属性是type 参考 SsmlEntity.SAY_AS_TYPE 取值
   * say-as不能包含其他任何标签， 会引发解析错误
   * @param {String} type 参考 SsmlEntity.SAY_AS_TYPE 取值
   * @param {String} text 数字或符号
   * @param {Object} attrsObj 属性对象
   */
  sayAs(type: string, text: string, attrsObj?: any): this;
  /**
   * 替换合成语音中部分词语的发音。 aliasText 支持中文和英文， 不支持数字。
   * sub 不能包含其他任何标签， 会引发解析错误
   * @param {String} text 待替换发音词语文本
   * @param {String} aliasText 替换词语后的发音。支持中文和英文，不支持数字。
   * @param {Object} attrsObj 属性对象
   */
  sub(text: string, aliasText: string, attrsObj?: any): this;
  /**
   * 添加静音片段-秒为单位，最大支持10秒，大于10的dueros也会按照10s处理
   * @param {number} time 静音秒
   * @param {Object} attrsObj 属性对象
   */
  silence(time: number, attrsObj?: any): this;
  /**
   * 添加静音片段-毫秒为单位，最大支持10秒，大于10的dueros也会按照10s处理
   * @param {number} time 静音毫秒
   * @param {Object} attrsObj 属性对象
   */
  msSilence(time: number, attrsObj?: any): this;
  /**
   * dueros 扩展标签
   * 设置合成语音的背景音。目前仅支持wav格式的音频文件， 同时要求文件大小不能超过3M， 播放时间不能超过90s。 如果音频文件不符合要求， 可能存在播放失败的情况。
   * background不支持自我嵌套
   * @param {String} src 音频源地址 仅支持百度云BOS的音频地址。
   * @param {String} repeat 是否重复-默认 yes
   * @param {Object} attrsObj 属性对象
   */
  background(src: string, repeat?: string, attrsObj?: any): this;
  /**
   * dueros 扩展标签
   * 设置合成语音中英文单词读音方式 - 
   * say-as不能包含其他任何标签， 会引发解析错误
   * @param {String} interpretAs as-character：按字母方式读。 as-word：按单词方式读(默认)。
   * @param {String} text 单词文本
   * @param {Object} attrsObj 属性对象
   */
  sayAsWord(interpretAs?: string, text: string, attrsObj?: any): this;
}
declare const _SsmlEntity: typeof SsmlEntity;
export = _SsmlEntity;
