import { HanDict } from './HanDict';
import { Translate } from './Translate'

const testDict = [
    { hanzi: "a", pinyin: "", meaning: "" },
    { hanzi: "b", pinyin: "", meaning: "" },
    { hanzi: "bb", pinyin: "", meaning: "" }
];

const translate = new Translate(new HanDict(testDict))

test('empty', () => {
    expect(translate.getVocab("").length).toEqual(0)
});

test('no matches', () => {
    expect(translate.getVocab(".@:;?").length).toEqual(0)
});

test('find both words', () => {
    expect(translate.getVocab("abb").length).toEqual(2)
});

test('no duplicates', () => {
    expect(translate.getVocab("aa").length).toEqual(1)
});
