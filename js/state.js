import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from './config';

const userPool = new CognitoUserPool({
  UserPoolId: config.cognito.USER_POOL_ID,
  ClientId: config.cognito.APP_CLIENT_ID
});

export default {
  auth: {
    user: null,
    userPool: userPool,
    userToken: null,
    username: null,
    confcode: null,
  }
}