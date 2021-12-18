/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import useUser from 'hooks/useUser';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Title from 'components/Title';
import ContentHeader from 'components/ContentHeader';
import AlertIcon from 'assets/icons/alert.svg';
import PlusIcon from 'assets/icons/plus.svg';
import Button from 'components/Button';
import useFairOs from 'hooks/useFairOs';

const Home: NextPage = () => {
  const { openPod, getDirectory } = useFairOs();
  const [pod, setPod] = useState(null);
  const [files, setFiles] = useState(null);
  const router = useRouter();
  const { slug = '/' } = router.query;
  const { user, isAuthenticated } = useUser();

  const getPod = async () => {
    const podName = slug === '/' ? 'Home' : slug;
    const response = await openPod(podName);
    setPod(response);

    const { data } = await getDirectory({ podName, directory: 'root' });

    setFiles(data.files);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/login');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user && user.password) {
      getPod();
    }
  }, [user]);

  return (
    isAuthenticated && (
      <Layout>
        <ContentHeader />

        <div className="flex justify-between">
          <Title
            sub={
              <div className="text-xs font-normal -mt-6 text-purple">
                <AlertIcon className="inline-block" />
                Content that is in this pod includes content you have shared and
                not shared
              </div>
            }
          >
            Your Photos
          </Title>

          <div className="my-8">
            <Button radius="simple" append={<PlusIcon />} className="px-4">
              New Folder
            </Button>
          </div>
        </div>

        {JSON.stringify(files)}
      </Layout>
    )
  );
};

export default Home;
