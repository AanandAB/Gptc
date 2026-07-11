import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";
export function getDb() { return drizzle(getCloudflareContext().env.DB, { schema }); }
