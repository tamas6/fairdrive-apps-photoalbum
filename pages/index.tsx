import type { NextPage } from 'next';
import Layout from 'components/Layout';
import useUser from 'hooks/useUser';

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <Layout>
      <h1 className="text-center">Fairdrive</h1>
      {!user && <h3 className="text-center">user loggeout</h3>}
    </Layout>
  );
};

export default Home;
