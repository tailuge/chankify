import { Entry } from "./Entry"
import { RankedEntry } from "./RankedEntry"
import Pinyin from "pinyin-tone"

export class HanDict {

    readonly defaultRank = 100000
    readonly dictionary: Map<string, RankedEntry> = new Map()
    readonly empty: RankedEntry = { hanzi: "", pinyin: "", meaning: "", rank: 0 }
    readonly maxWordLength = 8

    constructor(entries: Entry[]) {
        entries.forEach(entry => { this.addOrExtend(entry) })
    }

    static fromDictAndRanking(entries: Entry[], rankedEntries: string[]): HanDict {
        const hanDict = new HanDict(entries)
        hanDict.importRanking(rankedEntries)
        return hanDict
    }

    importRanking(rankedEntries: string[]) {
        var rank = 1;
        rankedEntries.forEach(entry => {
            const rankedEntry = this.dictionary.get(entry)
            rankedEntry && (rankedEntry.rank = rank++)
        })

    }

    addOrExtend(entry: Entry) {

        var rankedEntry: RankedEntry = entry as RankedEntry
        rankedEntry.rank = this.defaultRank

        entry.pinyin = Pinyin(entry.pinyin.toLowerCase().replaceAll("u:","v")).replace(/\s+/g, '')
        entry.meaning = entry.meaning.split('/')[0]
        if (this.dictionary.has(entry.hanzi)) {
            const existingEntry = this.dictionary.get(entry.hanzi)
            existingEntry && (existingEntry.pinyin = this.extendOrCombinePinyin(existingEntry.pinyin, entry.pinyin))
            existingEntry && (existingEntry.meaning = existingEntry.meaning + '/' + entry.meaning)
        } else {
            this.dictionary.set(entry.hanzi, rankedEntry)
        }
    }

    extendOrCombinePinyin(existing: string, additional: string): string {
        if (existing.includes(additional)) {
            return existing
        }
        return existing + '/' + additional
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
