import { useEffect } from 'react';
import { useLocation, useLocalStorage } from 'react-use';

const useAuthToken = (): string => {
  const { search } = useLocation();
  const [value, setValue] = useLocalStorage<string>('token');

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token') || null;

    if (token) {
      setValue(token);
    }
  }, [search]);

  return value || '';
};

export {
  useAuthToken,
}
