import { Entry } from "./Entry"

export class HanDict {

    dictionary: Map<string, Entry> = new Map();

    constructor(entries: Entry[]) {
        entries.forEach(entry => { this.dictionary.set(entry.hanzi, entry) });
    }

    readonly empty: Entry = { hanzi: "", pinyin: "", meaning: "" };
    readonly maxWordLength = 8;

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
