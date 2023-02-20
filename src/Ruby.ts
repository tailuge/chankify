import { RankedEntry } from "./RankedEntry";

export class Ruby {

    readonly sentence: string

    constructor(sentence: string) {
        this.sentence = sentence
    }

    format(entries: RankedEntry[]): string {
        var result = this.sentence
        entries.forEach(entry => {
            result = result.replaceAll(entry.hanzi,this.rubyWord(entry.hanzi, entry.pinyin))
        })
        return result
    }

    rubyWord(hanzi: string, pinyin: string): string {
        return ` ${hanzi}[${pinyin}]`
    }
}