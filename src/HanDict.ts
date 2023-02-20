import { Entry } from "./Entry"
import { RankedEntry } from "./RankedEntry"

export class HanDict {

    readonly dictionary: Map<string, RankedEntry> = new Map()
    readonly empty: RankedEntry = { hanzi: "", pinyin: "", meaning: "", rank: 0 }
    readonly maxWordLength = 8

    constructor(entries: Entry[]) {
        var rank = 1;
        entries.forEach(entry => { this.addOrExtend(entry, rank++) })
    }

    addOrExtend(entry: Entry, rank: number) {

        if (!this.dictionary.has(entry.hanzi)) {
            var rankedEntry: RankedEntry = entry as RankedEntry
            rankedEntry.rank = rank
            this.dictionary.set(entry.hanzi, rankedEntry)
        }
    }

    exactMatch(input: string): RankedEntry {
        var result = this.dictionary.get(input)
        return result ? result : this.empty
    }

    longestPrefixMatch(input: string): RankedEntry {
        var prefix = ""
        var longestMatch = this.empty
        for (const char of input.substring(0, this.maxWordLength)) {
            prefix += char
            const nextLongestMatch = this.exactMatch(prefix)
            longestMatch = nextLongestMatch === this.empty ? longestMatch : nextLongestMatch
        }
        return longestMatch
    }
}
