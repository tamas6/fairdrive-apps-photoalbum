/* eslint-disable jsx-a11y/alt-text */
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
import ImageGrid from 'components/ImageGrid';

const Home: NextPage = () => {
  const { openPod, getDirectory, downloadAllFiles } = useFairOs();
  const [loadedFiles, setLoadedFiles] = useState(null);
  const router = useRouter();
  const { slug = '/' } = router.query;
  const { user, isAuthenticated } = useUser();

  const getPod = async () => {
    const podName: string = slug === '/' ? 'Home' : slug[0];
    await openPod(podName);
    const { data } = await getDirectory({ podName, directory: 'root' });

    const res = await downloadAllFiles({
      podName,
      directory: 'root',
      files: data.files,
    });

    setLoadedFiles(res);
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
  }, [user, slug]);

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
        <div className="w-full">
          <ImageGrid images={loadedFiles}></ImageGrid>
        </div>
      </Layout>
    )
  );
};

export default Home;
