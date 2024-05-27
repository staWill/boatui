import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from "./config/Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";

ReactDOM.render(
    <React.StrictMode>
        <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required' }}>
            <App />
        </ReactKeycloakProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
