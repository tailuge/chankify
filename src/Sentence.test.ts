import { Sentence } from './Sentence'

test('fullstop', () => {
    const sentences = new Sentence("生成使用者所要的圖片。不過有時AI的判定")
    expect(sentences.size()).toEqual(2)
    expect(sentences.getReferenceSentence("使用")).toEqual("生成使用者所要的圖片")
});

test('youtube transcript', () => {
    const sentences = new Sentence(`各式各樣的這種美國的媒體 都在講說 這2月5號就要訪問中國大陸
    英國的媒體同樣也是在說 可是就是沒有看到 中國大陸這邊的 一些媒體在講說這布林肯`)
    expect(sentences.size()).toEqual(7)
});
