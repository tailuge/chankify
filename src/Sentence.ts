
export class Sentence {

    sentences: string[] = []

    constructor(text: string) {
        this.sentences = text.split(/[。！？…《》.,!，、]/)
    }

    size(): number {
        return this.sentences.length
    }

    getReferenceSentence(input: string): string {
        var match = this.sentences.find(sentence => sentence.indexOf(input) > -1)
        return match ? match : "";
    }
}