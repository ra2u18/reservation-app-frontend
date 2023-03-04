import genericImage from '../../assets/generic.jpg';
import './SpaceComponent.css'

interface SpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    photoURL?: string,

    reserveSpace: Function
}

export const SpaceComponent: React.FC<SpaceComponentProps> = ({ name, spaceId, location, photoURL, reserveSpace }) => {
    const renderImg = () => {
        if (!photoURL) return <img src={genericImage} alt=''/>
        
        return <img src={photoURL} alt='' />
    }

    return (
        <div className='spaceComponent'>
            { renderImg() }
            <label className='name'>{name}</label> <br />
            <label className='spaceId'>{spaceId}</label> <br />
            <label className='location'>{location}</label> <br />
            <button onClick={() => { reserveSpace(spaceId) }}>Reserve</button>
        </div>
    )
}