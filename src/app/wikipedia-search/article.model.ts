export class Article {

    public pageid: string;
    public extract: string;
    public title: string;

    constructor(pageid: string, extract: string, title: string) {
        this.pageid = pageid;
        this.extract = extract;
        this.title = title;
    }

}