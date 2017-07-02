export class Song {
    public id: number;
    public name: string;
    public artist: string;
    public genre: string;
    public description: string;
    public duration: number;
    public durationStr: string;
    public imagePath: string;
    public rating: number;

    constructor(id?: number, name?: string, artist?: string, genre?: string, desc?: string, duration?: number, durationStr?: string, imagePath?: string) {
        this.id = id || 0;
        this.name = name || '';
        this.artist = (this.name.split('-')) ? this.name.split('-')[0] : (artist || '');
        this.genre = genre || '';
        this.description = desc || '';
        this.duration = duration;
        this.durationStr = durationStr;
        this.imagePath = (imagePath) ? imagePath.replace('large', 't500x500') : '';
        this.rating = -1;
    }
}