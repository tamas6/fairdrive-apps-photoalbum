import { PodsContext } from 'contexts/Pods';
import { useContext } from 'react';

const usePods = () => useContext(PodsContext);

export default usePods;
