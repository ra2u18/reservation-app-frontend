import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../model/Model";

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CognitoIdentityCredentials } from '@aws-sdk/credential-provider-cognito-identity'

import { config } from "./config";

export class DataService {
    private s3client = new S3Client({ region: config.REGION });
    private creds: CognitoIdentityCredentials | undefined;

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

    public async createSpace(spacePayload: ICreateSpaceState) {
        if (spacePayload.photo) {
            const photoURL = await this.uploadPublicFile(spacePayload.photo, config.SPACES_PHOTOS_BUCKET);
            
            // prepare to save to db
            spacePayload.photoURL = photoURL;
            spacePayload.photo = undefined;
        }

        const requestURL = config.api.spacesUrl;
        const requestOptions: RequestInit = {
            method: 'POST',
            body: JSON.stringify(spacePayload)
        };

        const res = await fetch(requestURL, requestOptions);
        const resJson = await res.json();

        return JSON.stringify(resJson.id);
    }

    private async uploadPublicFile(file: File, bucket: string) {
        const filename = file.name;
        const commandProps = {
            Bucket: bucket,
            Key: filename,
            Body: file,
            ACL: 'public-read'
        };

        const uploadResult = await new S3Client({
            region: config.REGION,
            credentials: this.creds
        }).send(new PutObjectCommand(commandProps));

        if (uploadResult.$metadata.httpStatusCode !== 200) 
            return '';

        const bucketURL = `https://${bucket}.s3.amazonaws.com/${filename}`;
        return bucketURL;
    }

    public setCreds(creds: CognitoIdentityCredentials) {
        this.creds = creds;
    }
}