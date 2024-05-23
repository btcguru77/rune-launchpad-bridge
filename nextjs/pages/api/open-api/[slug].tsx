// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  payload: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { slug } = req.query;

  if (req.method === "GET") {
    if (slug === "getFeeSummary") {
      try {
        const data = await fetch(
          "https://mempool.space/api/v1/fees/recommended"
        );
        const jsonData = await data.json();
        const feeRateOptions = {
          list: [
            {
              title: "Slow",
              desc: "About 1 hours",
              feeRate: jsonData.hourFee,
            },
            {
              title: "Avg",
              desc: "About 30 minutes",
              feeRate: jsonData.halfHourFee,
            },
            {
              title: "Fast",
              desc: "About 10 minutes",
              feeRate: jsonData.fastestFee,
            },
          ],
        };
        return res
          .status(200)
          .json({ payload: feeRateOptions, message: "success" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ payload: null, message: "failed" });
      }
    }

    if (slug === "getCurrentBtcPrice") {
      try {
        const data = await fetch("https://mempool.space/api/v1/prices");
        const jsonData = await data.json();
        const currentPrice = jsonData?.USD;
        return res
          .status(200)
          .json({ payload: currentPrice, message: "success" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ payload: null, message: "failed" });
      }
    }
    return res.status(404);
  }
}