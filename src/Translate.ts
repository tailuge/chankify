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
        const sentences = new Sentence(input)
        return this.getVocab(input).map(entry => this.getTabDelimitedRow(entry, sentences))
    }

    getTabDelimitedRow(entry: Entry, sentences: Sentence) {
        return `${entry.hanzi}\t${entry.pinyin}\t${entry.meaning}\t${sentences.getReferenceSentence(entry.hanzi)}`
    }

    getAnkiData(input: string): any {
        const sentences = new Sentence(input)
        return this.getVocab(input).map(entry => {
            return { front: entry.hanzi, back: `${entry.pinyin}<br/>${entry.meaning}<br/> e.g. ${sentences.getReferenceSentence(entry.hanzi)}` }
        })
    }
}