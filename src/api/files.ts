import axios from '@api/customAxios';
import formatURL from '@utils/formatURL';

export interface FileResponse {
  accessTime: string;
  blockSize: number;
  contentType: string;
  creationTime: string;
  modificationTime: string;
  name: string;
  size: string;
}

interface DownloadFileData {
  filename: string;
  directory: string;
  podName: string;
}

export const receiveFile = async (
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    const writePath = directory === 'root' ? '/' : '/' + formatURL(directory);

    const shareFileInfoResult = await axios.get('v1/file/receive', {
      params: {
        podName,
        sharingRef: reference,
        dirPath: writePath,
      },
    });

    return shareFileInfoResult.data;
  } catch (error) {
    return error;
  }
};

export async function downloadFile(data: DownloadFileData): Promise<Blob> {
  const writePath =
    data.directory === 'root' ? '/' : '/' + formatURL(data.directory) + '/';

  const formData = new FormData();
  formData.append('filePath', writePath + data.filename);
  formData.append('podName', data.podName);

  const downloadFile = await axios.post('v1/file/download', formData, {
    responseType: 'blob',
  });

  return downloadFile.data;
}
