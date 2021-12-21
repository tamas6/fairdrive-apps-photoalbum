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
import Spinner from 'components/Spinner';
import useFiles from 'hooks/useFiles';
import useDirs from 'hooks/useDirs';
import DirsGrid from 'components/DirsGrid';

const Home: NextPage = () => {
  const { files, setFiles } = useFiles();
  const { dirs, setDirs } = useDirs();
  const { openPod, getDirectory, downloadAllFiles } = useFairOs();
  const [isPodLoading, setIsPodLoading] = useState(false);
  const router = useRouter();
  const { slug = '/' } = router.query;
  const { user, isAuthenticated } = useUser();

  const podName: string = slug[0] === '/' ? 'Home' : slug[0];
  const directory: string = !slug[1] ? 'root' : slug[1];

  const getPod = async () => {
    setIsPodLoading(true);
    setDirs([]);
    setFiles([]);

    await openPod(podName);

    const { files, dirs } = await getDirectory({ podName, directory });

    setDirs(dirs);

    downloadAllFiles(
      {
        podName,
        directory,
        files: files,
      },
      setFiles,
      () => setIsPodLoading(false)
    );
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

        {isPodLoading && (
          <div className="my-8">
            <Spinner />
          </div>
        )}

        <div className="w-full">
          <DirsGrid pod={podName} dirs={dirs} />
        </div>

        <div className="w-full">
          <ImageGrid images={files} />
        </div>
      </Layout>
    )
  );
};

export default Home;
