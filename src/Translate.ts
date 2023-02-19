import { Entry } from "./Entry";
import { HanDict } from "./HanDict";
import { Sentence } from "./Sentence";
import { CommonWords } from "./CommonWords"
import { RankedEntry } from "./RankedEntry";
import { Ruby } from "./Ruby";

export class Translate {

    readonly dictionary: HanDict

    constructor(entries: Entry[]) {
        this.dictionary = new HanDict(entries)
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
        return Array.from(words.values()).filter(entry => !CommonWords.isCommon(entry.hanzi))
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
            return {q:sentence, a:ruby.format(this.getVocab(sentence))}
        })
    }
  
}