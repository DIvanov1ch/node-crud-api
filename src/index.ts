import { create } from './create-server';
import { getServerPort } from './utils/get-server-port';

const serverPort = getServerPort();

create(serverPort);
