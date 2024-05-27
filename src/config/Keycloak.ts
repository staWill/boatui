import Keycloak from "keycloak-js";

const realm= process.env.REACT_APP_KEYCLOAK_REALM as string;
const url= process.env.REACT_APP_KEYCLOAK_URL as string;
const clientId= process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string;

const keycloak = new Keycloak({
    realm: realm,
    url: url,
    clientId: clientId
});

export default keycloak;
