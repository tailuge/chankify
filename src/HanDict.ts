import { Entry } from "./Entry"

export class HanDict {

    readonly dictionary: Map<string, Entry> = new Map();
    readonly empty: Entry = { hanzi: "", pinyin: "", meaning: "" };
    readonly maxWordLength = 8;

    constructor(entries: Entry[]) {
        entries.forEach(entry => { this.dictionary.set(entry.hanzi, entry) });
    }

    exactMatch(input: string): Entry {
        var result = this.dictionary.get(input)
        return result ? result : this.empty
    }

    longestPrefixMatch(input: string): Entry {
        var prefix = ""
        var longestMatch = this.empty
        for (const char of input.substring(0,this.maxWordLength)) {
            prefix += char
            const nextLongestMatch = this.exactMatch(prefix)
            longestMatch = nextLongestMatch === this.empty ? longestMatch : nextLongestMatch
        }
        return longestMatch
    }
}
