const builder = require('xmlbuilder');

/**
 * ssml 实体类
 */
class SsmlEntity {
    constructor() {
        this.ssmlXml = builder.create('speak');
        this.currentElement = this.ssmlXml;
    }

    /**
     * 获取 Ssml 字符串
     */
    getStr() {
        return this.ssmlXml.toString();
    }

    /**
     * 操作父节点
     */
    up() {
        this.currentElement = this.currentElement.up();
        return this;
    }

    /**
     * 添加节点信息
     * @param {String} name 节点名称
     * @param {Object} attrsObj 属性对象
     * @param {String} text 节点内容
     */
    element(name, attrsObj = {}, text = '') {
        this.currentElement = this.currentElement.element(name, attrsObj, text);
        return this;
    }

    /**
     * 添加文本-不会更改节点层次，所以此方法注意 up方法的使用
     * @param {String} text 文本
     */
    text(text) {
        this.currentElement.text(text);
        return this;
    }

    /**
     * 添加音频 - 注意要是百度云bos的音频地址 - 
     * 标签audio不能包含background标签、 不支持自我嵌套。
     * @param {String} src 音频地址。仅支持百度云BOS的音频地址。
     * @param {Object} attrsObj 属性对象
     */
    audio(src, attrsObj = {}) {
        attrsObj.src = src;
        return this.element('audio', attrsObj);
    }

    /**
     * 设置合成语音中数字、 符号的读法， 属性是type 参考 SsmlEntity.SAY_AS_TYPE 取值
     * say-as不能包含其他任何标签， 会引发解析错误
     * @param {String} type 参考 SsmlEntity.SAY_AS_TYPE 取值
     * @param {String} text 数字或符号
     * @param {Object} attrsObj 属性对象
     */
    sayAs(type, text, attrsObj = {}) {
        attrsObj.type = type;
        return this.element('say-as', attrsObj, text);
    }

    /**
     * 替换合成语音中部分词语的发音。 aliasText 支持中文和英文， 不支持数字。
     * sub 不能包含其他任何标签， 会引发解析错误
     * @param {String} text 待替换发音词语文本
     * @param {String} aliasText 替换词语后的发音。支持中文和英文，不支持数字。
     * @param {Object} attrsObj 属性对象
     */
    sub(text, aliasText, attrsObj = {}) {
        attrsObj.alias = aliasText;
        return this.element('sub', attrsObj, text);
    }

    /**
     * 添加静音片段-秒为单位，最大支持10秒，大于10的dueros也会按照10s处理
     * @param {number} time 静音秒
     * @param {Object} attrsObj 属性对象
     */
    silence(time, attrsObj = {}) {
        attrsObj.time = `${time}s`;
        return this.element('silence', attrsObj);
    }

    /**
     * 添加静音片段-毫秒为单位，最大支持10秒，大于10的dueros也会按照10s处理
     * @param {number} time 静音毫秒
     * @param {Object} attrsObj 属性对象
     */
    msSilence(time, attrsObj = {}) {
        attrsObj.time = `${time}ms`;
        return this.element('silence', attrsObj);
    }


    /**
     * dueros 扩展标签
     * 设置合成语音的背景音。目前仅支持wav格式的音频文件， 同时要求文件大小不能超过3M， 播放时间不能超过90s。 如果音频文件不符合要求， 可能存在播放失败的情况。
     * background不支持自我嵌套
     * @param {String} src 音频源地址 仅支持百度云BOS的音频地址。
     * @param {String} repeat 是否重复-默认 yes
     * @param {Object} attrsObj 属性对象
     */
    background(src, repeat = 'yes', attrsObj = {}) {
        attrsObj.src = src;
        attrsObj.repeat = repeat;
        return this.element('background', attrsObj);
    }

    /**
     * dueros 扩展标签
     * 设置合成语音中英文单词读音方式 - 
     * say-as不能包含其他任何标签， 会引发解析错误
     * @param {String} interpretAs as-character：按字母方式读。 as-word：按单词方式读(默认)。
     * @param {String} text 单词文本
     * @param {Object} attrsObj 属性对象
     */
    sayAsWord(interpretAs = 'as-word', text, attrsObj = {}) {
        attrsObj['interpret-as'] = interpretAs;
        return this.element('say-as', attrsObj, text);
    }

}

/**
 * 构造一个 SsmlEntity
 */
SsmlEntity.create = () => {
    return new SsmlEntity();
}

// 设置合成语音中数字、符号的读法类型
SsmlEntity.SAY_AS_TYPE = {
    NUMBER_ORDINAL: 'number: ordinal', //整数读法。
    NUMBER_DIGITS: 'number: digits', //数字串读法。
    NUMBER_SCORE: 'number: score', //比分读法。
    NUMBER_FRACTION: 'number: fraction', //分数读法。
    TELEPHONE: 'telephone', //电话号码读法。
    NUMBER: 'number' // 整数读法。负整数读法。 浮点数读法。负浮点数读法。比分读法。分数读法。负分数读法。科学计数读法。
};

module.exports = SsmlEntity;