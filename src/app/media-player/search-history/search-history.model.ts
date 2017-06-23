export class SearchHistory {
    public keyword: string;
    private date: number;

    constructor(keyword: string) {
        this.keyword = keyword;
        this.date = Date.now();
    }
}