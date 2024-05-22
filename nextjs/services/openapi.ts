const OPENAPI_URL_MAINNET = "/unisat"


const API_STATUS = {
  FAILED: "0",
  SUCCESS: "1",
};

class OpenApiService {
  store: { host: string, deviceId: string }

  constructor() {
    this.store = {
      host: OPENAPI_URL_MAINNET,
      deviceId: ""
    };
  }

  getHost = () => {
    return this.store.host;
  };

  httpGet = async (route, params) => {
    let url = this.getHost() + route;
    let c = 0;
    for (const id in params) {
      if (c == 0) {
        url += "?";
      } else {
        url += "&";
      }
      url += `${id}=${params[id]}`;
      c++;
    }

    const headers = new Headers();
    headers.append("X-Client", "UniSat Wallet");
    headers.append("X-Version", "1.2.6");
    // headers.append("x-address", "1KRbF83A794o97iufe5qu6ngcwjPM6Vp9q");
    headers.append("x-channel", "store");
    headers.append("x-udid", this.store.deviceId);
    headers.append("accept", "application/json");
    headers.append("Authorization", `Bearer ${process.env.UNISAT_OPENAPK_KEY}`);
    try {
      const res = await fetch(new Request(url), {
        method: "GET",
        headers,
        mode: "cors",
        cache: "default",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  httpPost = async (route, params) => {
    const url = this.getHost() + route;
    const headers = new Headers();
    headers.append("X-Client", "UniSat Wallet");
    headers.append("X-Version", "1.2.6");
    headers.append("x-address", "1KRbF83A794o97iufe5qu6ngcwjPM6Vp9q");
    headers.append("x-channel", "store");
    headers.append("x-udid", this.store.deviceId);
    headers.append("Content-Type", "application/json;charset=utf-8");
    headers.append("Authorization", `Bearer ${process.env.UNISAT_OPENAPK_KEY}`);
    const res = await fetch(new Request(url), {
      method: "POST",
      headers,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data;
  };

  getFeeSummary = async () => {
    try {
      const data = await fetch("https://mempool.space/api/v1/fees/recommended");
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
      return feeRateOptions;
    } catch (error) {
      console.log(error);
    }
  };

  collectionStaticList = async (data) => {
    const res = await this.httpPost(
      "/v3/market/collection/auction/collection_statistic_list",
      data
    );
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  collectionStatic = async (data) => {
    const res = await this.httpPost(
      "/v3/market/collection/auction/collection_statistic",
      data
    );
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  collectionSummary = async (data) => {
    const res = await this.httpPost(
      "/v3/market/collection/auction/collection_summary",
      data
    );
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  collectionAuctionList = async (data, type) => {
    const res = await this.httpPost(`/v3/market/${type}/auction/list`, data);
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  collectionAuctions = async (data, type) => {
    const res = await this.httpPost(`/v3/market/${type}/auction/actions`, data);
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  collectionInscriptions = async (data, type) => {
    const res = await this.httpPost(
      `/v3/market/${type}/auction/collection_inscriptions`,
      data
    );
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  // namesData = async (address, name) => {
  //   const res = await this.httpGet(
  //     `/v/address/${address}/category/${name}/names-data?cursor=0&size=2000`
  //   );
  //   if (res.code == API_STATUS.FAILED) {
  //     console.log(res.msg);
  //   }
  //   return res.data;
  // };

  // brc20StaticList = async (data) => {
  //   const res = await this.httpGet(
  //     `/v1/indexer/brc20/status?ticker_hex=${data.name}&start=${data.start}&limit=${data.limit}&complete=${data.complete}&sort=deploy`
  //   );
  //   if (res.code == API_STATUS.FAILED) {
  //     console.log(res.msg);
  //   }
  //   return res.data;
  // };

  brc20TokenInfo = async (ticker) => {
    const res = await this.httpGet(`/v1/indexer/brc20/${ticker}/info`, ticker);
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  inscribeOrderList = async (cursor, size) => {
    const res = await this.httpGet(`/v2/inscribe/order/list`, {
      cursor: cursor,
      size: size,
    });
    if (res.code == API_STATUS.FAILED) {
      console.log(res.msg);
    }
    return res.data;
  };

  inscribeOrder = async (orderId) => {
    const res = await this.httpGet(`/v2/inscribe/order/${orderId}`, {
      orderId: orderId,
    });

    return res;
  };

  inscribeOrderCreate = async (
    receiveAddress,
    feeRate,
    outputValue,
    devAddress,
    devFee,
    files
  ) => {
    const data = await this.httpPost("/v2/inscribe/order/create", {
      receiveAddress,
      feeRate,
      outputValue,
      devAddress,
      devFee,
      files,
    });
    return data;
  };

  inscribeBRC20Transfer = async (
    receiveAddress,
    feeRate,
    outputValue,
    devAddress,
    devFee,
    brc20Ticker,
    brc20Amount
  ) => {
    const data = await this.httpPost(
      "/v2/inscribe/order/create/brc20-transfer",
      {
        receiveAddress,
        feeRate,
        outputValue,
        devAddress,
        devFee,
        brc20Ticker,
        brc20Amount,
      }
    );

    return data;
  };

  inscribeBRC20Deploy = async (
    receiveAddress,
    feeRate,
    outputValue,
    devAddress,
    devFee,
    brc20Ticker,
    brc20Max,
    brc20Limit
  ) => {
    const data = await this.httpPost("/v2/inscribe/order/create/brc20-deploy", {
      receiveAddress,
      feeRate,
      outputValue,
      devAddress,
      devFee,
      brc20Ticker,
      brc20Max,
      brc20Limit,
    });

    return data;
  };

  inscribeBRC20Mint = async (
    receiveAddress,
    feeRate,
    outputValue,
    devAddress,
    devFee,
    brc20Ticker,
    brc20Amount,
    count
  ) => {
    const data = await this.httpPost("/v2/inscribe/order/create/brc20-mint", {
      receiveAddress,
      feeRate,
      outputValue,
      devAddress,
      devFee,
      brc20Ticker,
      brc20Amount,
      count,
    });
    return data;
  };

  // inscribeOrderList = async (cursor, size) => {
  //   const res = await this.httpGet(`/v2/inscribe/order/list`, {
  //     cursor: cursor,
  //     size: size,
  //   });
  //   if (res.code == API_STATUS.FAILED) {
  //     console.log(res.msg);
  //   }
  //   return res.data;
  // };

  getBTCUtxos = async (address, cursor = 0, size = 500) => {
    let allUTXOs = [];
    let currentCursor = cursor;
    const delayBetweenCalls = 250; // Delay in milliseconds (4 times per second)

    while (true) {
      const res = await this.httpGet(
        `/v1/indexer/address/${address}/utxo-data`,
        {
          address: address,
          cursor: currentCursor,
          size: size,
        }
      );

      if (res.code === API_STATUS.FAILED) {
        console.log(res.msg);
        break;
      }

      allUTXOs.push(...res.data.utxo);
      currentCursor = res.data.cursor;

      // If the cursor is zero, we've reached the end of the UTXOs
      if (res.data.cursor === 0) {
        break;
      }

      // Pause execution for the specified delay before making the next API call
      await new Promise((resolve) => setTimeout(resolve, delayBetweenCalls));
    }

    return allUTXOs;
  };

  getRunesUTXOs = async (address, runeid, start = 0, limit = 500) => {
    let allUTXOs = [];
    let currentStart = start;
    const delayBetweenCalls = 200; // Delay in milliseconds (5 times per second)

    while (true) {
      const res = await this.httpGet(
        `/v1/indexer/address/${address}/runes/${runeid}/utxo`,
        {
          address: address,
          runeid: runeid,
          start: currentStart,
          limit: limit,
        }
      );

      if (res.code === API_STATUS.FAILED) {
        console.log(res.msg);
        break;
      }

      allUTXOs.push(...res.data.utxo);
      currentStart += limit;

      // If the number of UTXOs returned is less than the limit,
      // we've reached the end of the UTXOs for this address and rune ID
      if (res.data.utxo.length < limit) {
        break;
      }

      // Pause execution for the specified delay before making the next API call
      await new Promise((resolve) => setTimeout(resolve, delayBetweenCalls));
    }

    return allUTXOs;
  };
}

export default new OpenApiService();
