export class SearchHistory {
    public keyword: string;
    public date: string;

    constructor(keyword: string, date: string) {
        this.keyword = keyword;
        this.date = date;
    }
}