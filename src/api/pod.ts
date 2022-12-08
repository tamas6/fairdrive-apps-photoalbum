import axios from '@api/customAxios';
export interface GetPodResponse {
  pods: string[];
  sharedPodName: string[];
}

export interface PodFilesResponse {
  files: string[];
  dirs: string;
}

export async function getPods(): Promise<GetPodResponse> {
  return (await axios.get('v1/pod/ls')).data;
}

export async function openPod(
  podName: string,
  password: string
): Promise<void> {
  return await axios.post('v1/pod/open', {
    podName,
    password,
  });
}

export async function receivePod(podReference: string) {
  return await axios.get(
    `pod/receive?sharing_ref=${podReference}&ref=${podReference}`
  );
}

export async function getFilesAndDirectories(
  podName: string,
  directory: string
): Promise<PodFilesResponse> {
  let data = { dirPath: '', podName };

  if (directory === 'root') {
    data = {
      dirPath: '/',
      podName,
    };
  } else {
    data = {
      dirPath: '/' + directory,
      podName,
    };
  }

  const response = (
    await axios({
      baseURL: process.env.NEXT_PUBLIC_FAIROSHOST,
      method: 'GET',
      url: 'v1/dir/ls',
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  ).data;

  return response;
}
