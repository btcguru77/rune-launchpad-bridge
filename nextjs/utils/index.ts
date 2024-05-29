export function addressFormat(address) {
  try {
    if (address) {
      const formattedAddress =
        address.slice(0, 5) + "....." + address.slice(-5);
      return formattedAddress;
    }
  } catch (error) {
    //  console.log(error);
  }
}

export const hex2Text = (hex: string) => {
  try {
    return hex.startsWith("0x")
      ? decodeURIComponent(
        hex.replace(/^0x/, "").replace(/[0-9a-f]{2}/g, "%$&")
      )
      : hex;
  } catch {
    return hex;
  }
};

export const satoshisToBTC = (amount: number) => {
  return amount / 100000000;
};

export const btcTosatoshis = (amount: number) => {
  return Math.floor(amount * 100000000);
};

export function shortAddress(address?: string, len = 5) {
  if (!address) return "";
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + "..." + address.slice(address.length - len);
}

export async function sleep(timeSec: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeSec * 1000);
  });
}

export const copyToClipboard = (textToCopy: string | number) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy.toString());
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy.toString();
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
};

export const calculateFee = (vins, vouts, recommendedFeeRate) => {
  const baseTxSize = 10;
  const inSize = 200;
  const outSize = 34;

  const txSize = baseTxSize + vins * inSize + vouts * outSize;
  const fee = txSize * recommendedFeeRate;

  return fee;
};

export function formatDate(date: Date, fmt = "yyyy-MM-dd hh:mm:ss") {
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  return fmt;
}


export function convert2RunesName(runeName: string) {
  return runeName.replace(/[^a-zA-Z\s•]+/, '').replace(/ /g, "•").toUpperCase()
}