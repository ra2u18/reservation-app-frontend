import './ConfirmModalComponent.css';

interface ConfirmModalComponentProps {
    show: boolean;
    content: string;
    close: () => void;
}

export const ConfirmModalComponent: React.FC<ConfirmModalComponentProps> = ({ show, content, close }) => {        
    if (!show) return null;

    return (        
        <div className='modal'>
            <div className='modalContent'>
                <h2>You tried to reserve and ...</h2>
                <h3 className="modalText">{content}</h3>
                <button onClick={() => close()}>Ok, close</button>
            </div>
        </div>
    );
}