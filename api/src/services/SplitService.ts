import { Request, Response } from "express";
import redis from "../database/redis";

async function GetSplits(req: Request, res: Response) {
    const data = await GetAllSplits();
    res.send(data);
}

async function CreateSplit(req: Request, res: Response) {
    const split = req.body as Split;
    const existing = await GetAllSplits();
    const newOnes = existing.concat([split]);
    await redis.set("splits", JSON.stringify(newOnes));
    res.status(200).send();
}

async function GetAllSplits() {
    return redis.get("splits").then((result) => {
        const existing = (JSON.parse(result) as Split[]) || [];
        return existing;
    });
}
async function DeleteSplitByName(req: Request, res: Response) {
    const existing = await GetAllSplits();
    await redis.set(
        "splits",
        JSON.stringify(
            existing.filter((s) => {
                if (s.productName !== req.body.name) return;
            })
        )
    );
    res.status(200).send();
}
export interface Split {
    productName: string;
    country: string;
    manufacturer: string;
    warrany: string;
    coolingPower: number;
    heatingPower: number;
    efficiencyRating: string;
    price: number;
    image: string;
}

export { GetSplits, CreateSplit, DeleteSplitByName };
