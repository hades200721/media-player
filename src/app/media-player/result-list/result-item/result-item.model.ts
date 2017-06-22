export class Song {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(id?: number, name?: string, desc?: string, imagePath?: string) {
        this.id = id || 0;
        this.name = name || '';
        this.description = desc || '';
        this.imagePath = imagePath || '';
    }
}