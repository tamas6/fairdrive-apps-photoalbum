import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './loginRegisterPage';
const useStyles = makeStyles(() =>
	createStyles({
		Main: {
			height: 'calc(100vh - 12rem)',
		},

		loginRegisterButtons: {
			padding: '23rem 0 30rem 0',
			backgroundColor: (style: Props & Theme) => style.backgroundDark,
			width: 'auto',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
			overflowX: 'hidden',
			overflowY: 'auto',
		},
		App: {
			backgroundColor: (style: Props & Theme) => style.backgroundDark,
		},
	})
);

export default useStyles;
