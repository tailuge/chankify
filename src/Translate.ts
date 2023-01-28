import { Entry } from "./Entry";
import { HanDict } from "./HanDict";

export class Translate {

    readonly dictionary: HanDict

    constructor(entries: Entry[]) {
        this.dictionary = new HanDict(entries)
    }

    getVocab(input: string): Entry[] {

        var words: Entry[] = []
        while(input.length > 0) {
            var word = this.dictionary.longestPrefixMatch(input)
            if (word === this.dictionary.empty) {
                // no word found, remove first char from input and continue
                input = input.substring(1)
            } else {
                input = input.substring(word.hanzi.length)
                words.push(word)
            }
        }
        return words
    }
}