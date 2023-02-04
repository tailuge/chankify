import { Sentence } from './Sentence'

test('fullstop', () => {
    const sentences = new Sentence("生成使用者所要的圖片。不過有時AI的判定")
    expect(sentences.size()).toEqual(2)
    expect(sentences.getReferenceSentence("使用")).toEqual("生成使用者所要的圖片")
});

