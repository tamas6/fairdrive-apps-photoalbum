import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FieldError, useForm } from 'react-hook-form';
import UserContext from '@context/UserContext';
import PodContext from '@context/PodContext';
import { useLocales } from '@context/LocalesContext';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import Disclaimer from '@components/Disclaimer/Disclaimer';
import NetworkDropdown from '@components/Dropdowns/NetworkDropdown/NetworkDropdown';
import CustomCheckbox from '@components/Inputs/Checkbox/Checkbox';
import { Network } from '@data/networks';
import { getDefaultNetwork, useFdpStorage } from '@context/FdpStorageContext';
import { setDefaultNetwork } from '@utils/localStorage';
import { useMatomoContext } from '@context/Matomo';

const ALLOW_TRACKING_KEY = 'allow-matomo';

function getDefaultTrackingValue(): boolean {
  const enabled = localStorage.getItem(ALLOW_TRACKING_KEY);
  return enabled === 'true' || enabled === null ? true : false;
}

const LoginForm: FC = () => {
  const CREATE_USER_URL = process.env.NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT;
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const { errors, isValid } = formState;

  const { setUser, setPassword, setAddress, errorMessage, setErrorMessage } =
    useContext(UserContext);
  const { clearPodContext } = useContext(PodContext);
  const {
    fdpClientRef,
    setWallet,
    setIsLoggedIn,
    setFdpStorageType,
    setLoginType,
    storageType,
  } = useFdpStorage();
  const { setEnabled } = useMatomoContext();

  const router = useRouter();
  const { intl } = useLocales();
  const fdsLoginEnabled = router?.query['fdsLogin'] === 'true';

  const [allowTracking, setAllowTracking] = useState(getDefaultTrackingValue());
  const [network, setNetwork] = useState(getDefaultNetwork());
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: { userName: string; password: string }) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const { userName, password } = data;
      setFdpStorageType('native', network.ensConfig, network.datahubConfig);
      setEnabled(allowTracking);
      const wallet = await fdpClientRef.current.account.login(
        userName,
        password
      );
      setWallet(wallet);
      setIsLoggedIn(true);
      setLoginType('username');
      setUser(userName);
      setPassword(password);
      setDefaultNetwork(String(network.id));
      router.push('/gallery');
    } catch (error) {
      setErrorMessage(
        'Login failed. Incorrect user credentials, please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const onNetworkChange = (network: Network) => {
    setNetwork(network);
  };

  const onAllowTrackingClick = () => {
    const enabled = !allowTracking;
    setAllowTracking(enabled);
    localStorage.setItem(ALLOW_TRACKING_KEY, String(enabled));
  };

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        title="Welcome back"
        content="Please log in to get access to your photos."
      />

      <Disclaimer />

      <div className="w-98 mt-8">
        <div className="mb-5 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label="username"
            id="userName"
            type="text"
            name="userName"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{ required: true }}
            error={errors.userName as FieldError}
            errorMessage="Username or e-mail is required"
          />

          <AuthenticationInput
            label="password"
            id="password"
            type="password"
            name="password"
            placeholder="Type here"
            useFormRegister={register}
            validationRules={{ required: true }}
            error={errors.password as FieldError}
            errorMessage="Password is required"
          />

          <label className="font-normal text-base text-color-accents-plum-black dark:text-color-accents-grey-pastel">
            {intl.get('CHOOSE_NETWORK')}:
          </label>
          <NetworkDropdown
            className="mb-3"
            value={network}
            onChange={onNetworkChange}
          />

          <CustomCheckbox
            className="mb-3 sm:mb-0"
            name="confirm"
            onChange={onAllowTrackingClick}
            checked={allowTracking}
          >
            {intl.get('ALLOW_TRACKING')}
          </CustomCheckbox>

          <div className="mt-14 text-center">
            <Button
              loading={loading}
              disabled={!isValid}
              type="submit"
              variant="secondary"
              label="Login"
            />
          </div>

          <div className="my-6 text-center">
            <a
              href={CREATE_USER_URL}
              target="_blank"
              rel="noreferrer"
              className="font-normal text-xs text-color-accents-purple-black"
            >
              Don&apos;t have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
