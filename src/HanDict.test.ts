import { HanDict } from './HanDict'

const testDict = [
    { hanzi: "a", pinyin: "", meaning: "" },
    { hanzi: "b", pinyin: "", meaning: "" },
    { hanzi: "bb", pinyin: "", meaning: "" }
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

