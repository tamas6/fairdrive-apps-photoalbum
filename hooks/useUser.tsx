import { UserContext } from 'contexts/User';
import { useContext } from 'react';

const useUser = () => useContext(UserContext);

export default useUser;
