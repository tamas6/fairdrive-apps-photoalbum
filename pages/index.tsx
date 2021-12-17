import type { NextPage } from 'next';
import Layout from 'components/Layout';
import useUser from 'hooks/useUser';
import Router from 'next/router';
import { useEffect } from 'react';
import Title from 'components/Title';
import ContentHeader from 'components/ContentHeader';
import AlertIcon from 'assets/icons/alert.svg';
import PlusIcon from 'assets/icons/plus.svg';
import Button from 'components/Button';

const Home: NextPage = () => {
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/login');
    }
  }, [isAuthenticated]);

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
      </Layout>
    )
  );
};

export default Home;
