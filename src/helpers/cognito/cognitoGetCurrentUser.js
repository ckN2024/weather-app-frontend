import { CognitoUserPool } from "amazon-cognito-identity-js";

const cognitoGetCurrentUser = async () => {
    const UserPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
    const ClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    
    return new Promise((resolve, reject) => {
        const poolData = {
            UserPoolId,
            ClientId,
        }

        const userPool = new CognitoUserPool(poolData)
        const user = userPool.getCurrentUser();

        if(user) {
            user.getSession((err, session) => {
                if(err) {
                    console.log("An error occured in retrieving user session.")
                    reject(err);
                } else {
                    console.log("User session: ", session);
                    resolve(session)
                }
            })
        }
    })
}

export default cognitoGetCurrentUser;