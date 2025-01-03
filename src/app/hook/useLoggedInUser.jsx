import { useSelector } from 'react-redux';

const useLoggedInUser = () => {
  const user = useSelector((state) => state.auth.user);
  return user;
};

export default useLoggedInUser;