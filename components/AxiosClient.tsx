import {AuthUserContext} from 'components/provider/AuthProvider'
import axios from 'axios'

const authUser = AuthUserContext()

const client = axios.create({
  baseURL: '/api/user/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

if (authUser) {
  authUser.getIdToken().then((accessToken) => {
    console.log('token:',accessToken, 'uid:', authUser.uid)
    client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    client.defaults.headers.common['uid'] = authUser.uid;
  });
}

export {client}