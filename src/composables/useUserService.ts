import { type UserCredentials, type AccessCredentials } from '@/ts/interfaces/user';
import { api } from '@/config/axios';

export default function useUserService() {

  const signIn = async (user: UserCredentials) => {
    const response = await api.post('/user/signIn', user);
    return response;
  };

  const accountRecovery = async (payload: {email: string}) => {
    const response = await api.post('/user/account-recovery', payload);
    return response;
  };

  const tokenVerify = async (token: string) => {
    const response = await api.get(`/user/validate-token/${token}`);
    return response;
  };

  const updatePassword = async (credentials: AccessCredentials) => {
    const response = await api.post('/user/reset-password', credentials);
    return response;
  };

  return {
    signIn,
    accountRecovery,
    tokenVerify,
    updatePassword
  };
}