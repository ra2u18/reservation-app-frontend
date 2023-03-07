import { SyntheticEvent, useState, useEffect } from "react";
import { DataService } from "../../services/DataService";

interface CustomEvent {
    target: HTMLInputElement
}

export interface ICreateSpaceState {
    name?: string;
    location?: string;
    description?: string;
    photoURL?: string;
    photo?: File
}

interface ICreateSpaceProps {
    dataService: DataService
}

export const CreateSpace: React.FC<ICreateSpaceProps> = ({ dataService }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [photo, setPhoto] = useState<File>();

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const id = await dataService.createSpace({
                name,
                location,
                description,
                photoURL,
                photo
            });
            console.log(id);
        } catch (error) {
            console.error(error);
        }
    }

    const setPhotoUrl = (e: CustomEvent) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
             <label>Name:<br />
                    <input name='space name' value={name} onChange={e => setName(e.target.value)} />
                </label><br />
                <label>Location:<br />
                    <input name='space location' value={location} onChange={e => setLocation(e.target.value)} />
                </label><br />
                <label>Description:<br />
                    <input name='space location' value={description} onChange={e => setDescription(e.target.value)} />
                </label><br />
                <label>Photo:<br />
                    <input name='photo' type='file' onChange={e => setPhotoUrl(e)} />
                </label><br />
                { photo && <img alt='' src={URL.createObjectURL(photo)} /> }<br />
                <input data-test="submit-button" type="submit" value="Create space" />
        </form>
    )
}