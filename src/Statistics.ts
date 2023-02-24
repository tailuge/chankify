import { HanDict } from "./HanDict"
import { RankedEntry } from "./RankedEntry"

export class Statistics {

    readonly dictionary: HanDict

    skipCount: number = 0

    constructor(dictionary: HanDict) {
        this.dictionary = dictionary
    }

    getVocabCount(input: string): Map<RankedEntry, number> {

        var words = new Map<RankedEntry, number>()
        while (input.length > 0) {
            var word = this.dictionary.longestPrefixMatch(input)
            if (word === this.dictionary.empty) {
                // no word found, remove first char from input and continue
                input = input.substring(1)
            } else {
                input = input.substring(word.hanzi.length)
                const existing = words.get(word)
                if (existing) {
                    words.set(word, existing + 1)
                } else {
                    words.set(word, 1)
                }
            }
        }
        return words
    }

    getReport(input: string): string {
        const stats = this.getVocabCount(input)
        const statsList: { count: number; word: RankedEntry }[] = []
        stats.forEach((v, k) => { statsList.push({ count: v, word: k }) })
        statsList.sort((a,b) => b.count - a.count)
        return statsList.filter(entry=>entry.word.rank > this.skipCount).map(entry=>`${entry.count}\t${entry.word.hanzi}`).join("\n")
    }

}