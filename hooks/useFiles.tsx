import { FilesContext } from 'contexts/Files';
import { useContext } from 'react';

const useFiles = () => useContext(FilesContext);

export default useFiles;
