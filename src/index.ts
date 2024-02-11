import { DEFAULT_SERVER_PORT } from "./constants";
import { create } from "./createServer";
import 'dotenv/config';

const serverPort = process.env.PORT || DEFAULT_SERVER_PORT;

create(serverPort);
