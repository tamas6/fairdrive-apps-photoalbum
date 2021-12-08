import { AppContext } from 'contexts/App';
import { useContext } from 'react';

const useApp = () => useContext(AppContext);

export default useApp;
