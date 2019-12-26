const SsmlEntity = require('../lib/SsmlEntity');

describe('ssmlEntity', () => {

    test('text', () => {
        let str = SsmlEntity.create()
            .text('你好啊').getStr();

        expect(str).toBe('<speak>你好啊</speak>')
    })

    test('audio', () => {
        let str = SsmlEntity.create()
            .audio('https://xxxxx').getStr();

        expect(str).toBe('<speak><audio src="https://xxxxx"/></speak>')
    })

});