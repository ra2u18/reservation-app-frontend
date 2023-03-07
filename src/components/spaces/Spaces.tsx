import { useEffect, useState } from "react"
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./SpaceComponent";

import { ConfirmModalComponent } from "./ConfirmModalComponent";

import './Spaces.css'
import { Link } from "react-router-dom";

interface SpacesProps {
    dataService: DataService;
}

export const Spaces: React.FC<SpacesProps> = ({ dataService }) => {
    const [spaces, setSpaces] = useState<Space[]>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<string>('');

    useEffect(() => {
        const getSpaces = async () => {
            const spaces = await dataService.getSpaces();
            setSpaces(spaces);
        }

        getSpaces();
    }, []);

    const reserveSpace = async (spaceId: string) => {
        const reservationResult = await dataService.reserveSpace(spaceId);

        if(reservationResult) {
            setShowModal(true);
            setModalContent(`You reserved the space with id ${spaceId} and got reservation nb ${reservationResult}`);
        } else {
            setShowModal(true);
            setModalContent(`You can't reserve the space with id ${spaceId}`);
        }
    }

    const renderSpaces = () => {
        let rows: any[] = [];
        if(!spaces) return rows;

        rows = spaces.map((space) => 
            <SpaceComponent key={space.spaceId}
                location={space.location}
                name={space.name}
                spaceId={space.spaceId}
                reserveSpace={reserveSpace} />
        );

        return rows;
    }

    const closeModal = () => {
        setShowModal(false);
        setModalContent('');
    }

    return <div className="spaces">
        <h2>Welcome to the Spaces page!</h2>
        <Link to="/create-spaces">Create Spaces</Link> <br />
        { renderSpaces() }
        <ConfirmModalComponent close={closeModal} content={modalContent} show={showModal} />
    </div>
}