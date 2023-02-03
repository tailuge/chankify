import { HanDict } from './HanDict'

const testDict = [
    { hanzi: "a", pinyin: "", meaning: "" },
    { hanzi: "b", pinyin: "", meaning: "" },
    { hanzi: "bb", pinyin: "", meaning: "" },
    { hanzi: "c", pinyin: "c1", meaning: "1" },
    { hanzi: "c", pinyin: "c2", meaning: "2" }
];

const dict = new HanDict(testDict)

test('finds word', () => {
    expect(dict.longestPrefixMatch("a")).toBeDefined()
    expect(dict.longestPrefixMatch("a").hanzi).toEqual("a")
});

test('does not find word', () => {
    expect(dict.longestPrefixMatch("x").hanzi).toEqual("")
});

test('given bbb finds bb and not just b', () => {
    expect(dict.longestPrefixMatch("bbb").hanzi).toEqual("bb")
});

test('given c finds concatenated c entries in input dictionary', () => {
    const result = dict.longestPrefixMatch("c")
    expect(result.hanzi).toEqual("c")
    expect(result.pinyin).toEqual("c1 / c2")
    expect(result.meaning).toEqual("1 / 2")
});
