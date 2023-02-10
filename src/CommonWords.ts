export class CommonWords {

    static readonly common = "的是不我一有大在人" +
        "了中到資要可以這個你" +
        "會好為上來就學交也用" +
        "能如文時沒說他看提那" +
        "問生過下請天們所多麼" +
        "小想得之還電出工對都"

    static isCommon(hanzi: string): boolean {
        return this.common.includes(hanzi)
    }
}
