import 'dotenv/config';
import { createApp } from './app.js';
import { loadConfig } from './config.js';
import { InquiryStore } from './db.js';

const config = loadConfig();
const store = new InquiryStore(config.databasePath);
store.ensureAdminUser(config.adminUsername, config.adminPassword);

const app = createApp({ config, store });

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
  console.log(
    `Database: ${config.databasePath} | Admin user: ${config.adminUsername}`,
  );
});
