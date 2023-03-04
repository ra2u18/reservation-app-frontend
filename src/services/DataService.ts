import { Space } from "../model/Model";

export class DataService {
    public async getSpaces(): Promise<Space[]> {
        const spaces: Space[] = [];
        
        spaces.push({ location: "Paris", name: "Best Location", spaceId: "123" });
        spaces.push({ location: "Lodon", name: "Best Location", spaceId: "234" });
        spaces.push({ location: "Rome", name: "Best Location", spaceId: "345" });

        return spaces;
    }

    public async reserveSpace(spaceId: string): Promise<string | undefined> {
        if(spaceId !== '123') return undefined;

        return('5555')
    }
}