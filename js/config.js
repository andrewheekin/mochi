export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: 'mochibox-uploads'
  },
  apiGateway: {
    URL: 'https://gvfebshb2a.execute-api.us-east-1.amazonaws.com/prod',
  },
  cognito: {
    USER_POOL_ID : 'us-east-1_bxV6wia2E',
    APP_CLIENT_ID : '7l5jk3e8tcu63hvgdds5mpbf2t',
    REGION: 'us-east-1',
    IDENTITY_POOL_ID: 'us-east-1:605b0c76-feeb-481e-adb6-8621a05db139',    
  }
};