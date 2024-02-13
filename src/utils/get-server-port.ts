import 'dotenv/config';
import { DEFAULT_SERVER_PORT } from '../constants';

export const getServerPort = () => process.env.PORT || DEFAULT_SERVER_PORT;
