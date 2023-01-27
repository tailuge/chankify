import { Entry } from "./Entry"

export class HanDict {

    dictionary: Map<string, Entry> = new Map();

    constructor(entries: Entry[]) {
        entries.forEach(entry => { this.dictionary.set(entry.hanzi, entry) });
    }

    readonly empty: Entry = { hanzi: "", pinyin: "", meaning: "" };

    longestPrefixMatch(input: string): Entry {
        var result = this.dictionary.get(input)
        return result ? result : this.empty
    }
}
