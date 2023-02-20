import { Entry } from "./Entry";
import { HanDict } from "./HanDict";
import { Sentence } from "./Sentence";
import { RankedEntry } from "./RankedEntry";
import { Ruby } from "./Ruby";

export class Translate {

    readonly dictionary: HanDict

    skipCount: number

    constructor(entries: Entry[]) {
        this.dictionary = new HanDict(entries)
        this.skipCount = 0
    }

    getVocab(input: string): RankedEntry[] {

        var words = new Set<RankedEntry>()
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
        return Array.from(words.values()).filter(entry => entry.rank > this.skipCount)
    }

    getTabDelimitedRows(input: string): string[] {
        return this.getVocab(input).map(entry => this.getTabDelimitedRow(entry))
    }

    getTabDelimitedRow(entry: Entry) {
        return `${entry.hanzi}\t${entry.pinyin}\t${entry.meaning}`
    }

    getAnkiData(inputText: string): any {
        const sentences = new Sentence(inputText)
        return this.getVocab(inputText).map(entry => {
            const containingSentence = sentences.getReferenceSentence(entry.hanzi).replaceAll(entry.hanzi,`<b>${entry.hanzi}</b>`)
            return { q: containingSentence, a: `${entry.pinyin}<br/>${entry.meaning}` }
        })
    }

    getAnkiSentenceData(inputText: string): any {
        const sentences = new Sentence(inputText)
        return sentences.sentences.map(sentence => { 
            const ruby = new Ruby(sentence)
            const vocab = this.getVocab(sentence)
            const vocabRows = vocab.map(entry => {
                return `${entry.hanzi}[${entry.pinyin}] ${entry.meaning}`}
                ).join("</li><li>")
            return {q:sentence, a:ruby.format(vocab) + `<br/><br/><ul><li>${vocabRows}</li></ul>`}
        })
    }


  
}