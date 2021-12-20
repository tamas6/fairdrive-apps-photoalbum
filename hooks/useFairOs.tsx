/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
// import qs from 'qs';
import axios from 'axios';
import { PodItem } from 'contexts/Pods';
import urlPath from 'helpers/urlPath';
import useUser from 'hooks/useUser';
import { Dispatch, SetStateAction, useState } from 'react';

interface Payload {
  username?: string;
  password?: string;
  address?: string;
  mnemonic?: string;
  podName?: string;
  podReference?: string;
  directory?: string;
  file?: any;
  files?: any;
}

const host = process.env.NEXT_PUBLIC_FAIROSHOST;

const podNameDefault = 'Home';

export interface DownloadFilesPayload {
  podName: string;
  directory: string;
  files: any;
}

const useFairOs = () => {
  const [aborList, setAborList] = useState([]);
  const { user } = useUser();

  const login = async (payload: Payload) => {
    const { username, password } = payload;

    try {
      const response = await axios({
        baseURL: host,
        url: 'user/login',
        method: 'POST',
        data: {
          user_name: username,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // localStorage.removeItem('user');

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axios({
        baseURL: host,
        method: 'POST',
        url: 'user/logout',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        data: {
          user_name: '',
          password: '',
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const userLoggedIn = async (username: string) => {
    try {
      const requestBody = {
        user_name: username,
      };

      const response = await axios({
        baseURL: host,
        method: 'GET',
        url: 'user/isloggedin',
        data: requestBody,
        params: { user_name: username },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const getDirectory = async (payload: Payload) => {
    const { directory, podName } = payload;

    try {
      const pod_name =
        podName === undefined || podName === null ? podNameDefault : podName;
      let data = { dir_path: '', pod_name: pod_name };

      if (directory === 'root') {
        data = {
          dir_path: '/',
          pod_name: pod_name,
        };
      } else {
        data = {
          dir_path: '/' + directory,
          pod_name: pod_name,
        };
      }

      const response = await axios({
        baseURL: host,
        method: 'GET',
        url: 'dir/ls',
        params: data,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const getPods = async () => {
    const response = await axios({
      baseURL: host,
      method: 'GET',
      url: 'pod/ls',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response;
  };

  const openPod = async (podName: string) => {
    try {
      const openPod = await axios({
        baseURL: host,
        method: 'POST',
        url: 'pod/open',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          pod_name:
            podName === undefined || podName === null
              ? podNameDefault
              : podName,
          password: user.password,
        },
        withCredentials: true,
      });

      return openPod;
    } catch (err) {
      return err;
    }
  };

  const getPodsWithHref = async () => {
    const { data } = await getPods();
    const podsWithHref: PodItem[] = [];

    data.pod_name.forEach((pod: string) => {
      if (pod === 'Home') {
        podsWithHref.push({
          title: pod,
          slug: '/',
        });
      } else {
        podsWithHref.push({
          title: pod,
          slug: `/pods/${pod}`,
        });
      }
    });

    return podsWithHref;
  };

  const downloadFilePreview = async (
    filename: string,
    directory: string,
    podName: string
  ) => {
    const controller = new AbortController();
    let writePath = '';

    if (directory === 'root') {
      writePath = '/';
    } else {
      writePath = '/' + urlPath(directory) + '/';
    }

    const formData = new FormData();

    formData.append('file_path', writePath + filename);
    formData.append('pod_name', podName);

    try {
      const downloadFile = await axios.post(host + 'file/download', formData, {
        data: formData,
        responseType: 'blob',
        withCredentials: true,
        signal: controller.signal,
      });

      setAborList((list) => {
        return [...list, controller];
      });

      return downloadFile.data;
    } catch (err) {
      return err;
    }
  };

  const downloadAllFiles = (
    payload: DownloadFilesPayload,
    setFiles: Dispatch<SetStateAction<string[]>>,
    callback: () => void
  ) => {
    aborList.forEach((controller) => {
      controller.abort();
    });
    setAborList([]);

    const { files, directory, podName } = payload;

    if (files !== null && files !== undefined) {
      files.map(async (entry: any) => {
        const url = window.URL.createObjectURL(
          await downloadFilePreview(entry.name, urlPath(directory), podName)
        );

        // Incremental loading
        setFiles((files) => {
          return [...files, url];
        });
      });

      callback && callback();

      return files;
    }

    return null;
  };

  return {
    login,
    logout,
    userLoggedIn,
    getDirectory,
    getPods,
    getPodsWithHref,
    openPod,
    downloadFilePreview,
    downloadAllFiles,
  };
};

export default useFairOs;
