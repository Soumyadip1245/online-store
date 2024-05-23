import { amazonData } from './amazon';
import { shoppingData } from './shopping';
import { myntraData } from './myntra';
import { blinkitData } from './blinkit';

export default async function ({ req, res, log, error }) {
    try {
        const fetcher = parseInt(req.body.fetcher);
        const query = req.body.query;
        let value;

        switch (fetcher) {
            case 1:
                value = await amazonData(query);
                break;
            case 2:
                value = await shoppingData(query);
                break;
            case 3:
                value = await myntraData(query);
                break;
            case 4:
                value = await blinkitData(query);
                break;
            default:
                value = { data: "Invalid Code", status: 500 };
                break;
        }

        if (value.status === 200) {
            res.json({ data: value.data });
        } else {
            res.status(500).json({ data: value.data });
        }
    } catch (err) {
        log(err);
        error(err.message);
        res.status(500).json({ error: err.message });
    }
}