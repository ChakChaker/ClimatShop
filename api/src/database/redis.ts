import { config } from "../../config";
import Redis from "ioredis";
const redis = new Redis({
    port: config.REDIS_PORT,
    host: config.REDIS_HOST,
    password: config.REDIS_AUTH,
});

redis.get("bd started", (err, result) => {
        if (err) {
            // tslint:disable-next-line: no-console
            console.error(err);
        } else {
            // tslint:disable-next-line: no-console
            console.log(result);
        }
    });

export default redis;
