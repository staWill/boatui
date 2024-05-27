import React, {FC} from "react";
import {Boat} from "../model/Boat";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

interface BoatItemProps {
    boat: Boat;
    onEdit: (boat: Boat) => void;
    onDelete: (boatId: string) => void;
    onClick: (boat: Boat) => void;
}

const BoatItem: FC<BoatItemProps> = ({boat, onEdit, onDelete, onClick}) => {
    return (
        <tr onClick={() => onClick(boat)}>
            <td>{boat.id}</td>
            <td>{boat.name}</td>
            <td>{boat.description}</td>
            <td>
                <FontAwesomeIcon
                    icon={faEdit}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(boat);
                    }}
                    style={{cursor: 'pointer', marginRight: '10px'}}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(boat.id);
                    }}
                    style={{cursor: 'pointer'}}
                />
            </td>
        </tr>
    );
}

export default BoatItem;
