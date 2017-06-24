export class Song {
    public id: number;
    public name: string;
    public artist: string;
    public genre: string;
    public description: string;
    public duration: string;
    public imagePath: string;

    constructor(id?: number, name?: string, artist?: string, genre?: string, desc?: string, duration?: string, imagePath?: string) {
        this.id = id || 0;
        this.name = name || '';
        this.artist = (this.name.split('-')) ? this.name.split('-')[0] : (artist || '');
        this.genre = genre || '';
        this.description = desc || '';
        this.duration = duration;
        this.imagePath = (imagePath) ? imagePath.replace('large', 't500x500') : '';
    }
}