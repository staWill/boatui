import React from 'react';
import {useKeycloak} from '@react-keycloak/web';
import BoatList from "./components/BoatList";

function App() {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return (
            <div>
                <h1>Unauthorized</h1>
                <button onClick={() => keycloak.login()}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <BoatList></BoatList>
            <button onClick={() => keycloak.logout()}>Logout</button>
        </div>
    );
}

export default App;
