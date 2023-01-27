import { Entry } from "./Entry"

export class HanDict {

    dictionary: Entry[]

    constructor(entries: Entry[]) {
        this.dictionary = entries
    }

    longestPrefixMatch(input: string): Entry {
        return this.dictionary[0]
    }
}
