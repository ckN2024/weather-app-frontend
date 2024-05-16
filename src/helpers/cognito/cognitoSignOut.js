import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import cognitoGetCurrentUser from "./cognitoGetCurrentUser";

const cognitoSignOut = (email) => {
  const UserPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
  const ClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

  var poolData = {
    UserPoolId,
    ClientId,
  };
  var userPool = new CognitoUserPool(poolData);

  var userData = {
    Username: email,
    Pool: userPool,
  };

  var cognitoUser = new CognitoUser(userData);

  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("idToken");
  sessionStorage.removeItem("refreshToken");

  cognitoUser.signOut();
};

export default cognitoSignOut;
