import React, {FC, useEffect, useState} from "react";
import BoatItem from "./BoatItem";
import BoatModal from "./BoatModal";
import {Boat} from "../model/Boat";
import {createBoat, deleteBoat, getBoats, updateBoat} from "../services/BoatService";
import '../styles.css';
import ErrorComponent from "./ErrorComponent";

const BoatList: FC = () => {
    const [boats, setBoats] = useState<Boat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isCreation, setIsCreation] = useState<boolean>(false);

    useEffect(() => {
        const fetchBoats = async () => {
            try {
                const boats = await getBoats();
                setBoats(boats);
            } catch (error) {
                setError("could not load boats");
            } finally {
                setLoading(false);
            }
        };

        fetchBoats();
    }, []);

    const handleEdit = (boat: Boat) => {
        setSelectedBoat(boat);
        setIsEditable(true);
        setShowModal(true);
    };

    const handleCreate = (boat: Boat) => {
        setSelectedBoat(boat);
        setIsEditable(true);
        setIsCreation(true);
        setShowModal(true);
    };

    const handleDelete = async (boatId: string) => {
        try {
            await deleteBoat(boatId);
            setBoats(boats.filter(boat => boat.id !== boatId));
        } catch (error) {
            setError("could not delete boat");
        }
    };

    const handleShowModal = (boat: Boat) => {
        setSelectedBoat(boat);
        setIsEditable(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBoat(null);
    };

    const handleSave = async (updatedBoat: Boat) => {
        try {
            const savedBoat = await updateBoat(updatedBoat);
            setBoats(boats.map(boat => (boat.id === savedBoat.id ? savedBoat : boat)));
        } catch (error) {
            setError("could not save the boat");
        }
    };

    const handleCreation = async (boat: Boat) => {
        try {
            await createBoat(boat);
            setBoats(await getBoats());
        } catch (error) {
            setError("could not create the boat");
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div className="container">
            {error && <ErrorComponent message={error}/>
            }
            <div className="boat-list">
                <h1>Boat List</h1>
                <button onClick={() => handleCreate({id: '', name: '', description: ''})}>Create New Boat</button>

                <table className="boat-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boats.length > 0 ? (
                        boats.map((boat) => (
                            <BoatItem
                                key={boat.id}
                                boat={boat}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onClick={handleShowModal}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>Seems lonely in here, what are you up to?</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <BoatModal
                show={showModal}
                handleClose={handleCloseModal}
                boat={selectedBoat}
                onSave={handleSave}
                onCreate={handleCreation}
                editable={isEditable}
                creation={isCreation}
            />
        </div>
    );
}

export default BoatList;
