import { Entry } from "./Entry";
import { HanDict } from "./HanDict";
import { Sentence } from "./Sentence";

export class Translate {

    readonly dictionary: HanDict

    constructor(entries: Entry[]) {
        this.dictionary = new HanDict(entries)
    }

    getVocab(input: string): Entry[] {

        var words = new Set<Entry>()
        while (input.length > 0) {
            var word = this.dictionary.longestPrefixMatch(input)
            if (word === this.dictionary.empty) {
                // no word found, remove first char from input and continue
                input = input.substring(1)
            } else {
                input = input.substring(word.hanzi.length)
                words.add(word)
            }
        }
        return Array.from(words.values())
    }

    getTabDelimitedRows(input: string): string[] {
        return this.getVocab(input).map(entry => this.getTabDelimitedRow(entry))
    }

    getTabDelimitedRow(entry: Entry) {
        return `${entry.hanzi}\t${entry.pinyin}\t${entry.meaning}`
    }

    getAnkiData(input: string): any {
        const sentences = new Sentence(input)
        return this.getVocab(input).map(entry => {
            const containingSentence = sentences.getReferenceSentence(entry.hanzi).replaceAll(entry.hanzi,`<b>${entry.hanzi}</b>`)
            return { q: containingSentence, a: `${entry.pinyin}<br/>${entry.meaning}` }
        })
    }
}