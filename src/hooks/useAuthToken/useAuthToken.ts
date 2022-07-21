import { useLocation, useLocalStorage } from 'react-use';

const useAuthToken = (): string => {
  const { search } = useLocation();
  const [value, setValue] = useLocalStorage<string>('token');

  const params = new URLSearchParams(search);
  const token = params.get('token') || null;

  if (token) {
    setValue(token);
  }

  return token || value || '';
};

export {
  useAuthToken,
}
