import { FilecoinNumber, Converter } from "@glif/filecoin-number";

import * as Cookies from "~/vendor/cookie-cutter";
import * as C from "~/common/constants";

export const delay = (ms) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export const pluralize = (text, count) => {
  return count > 1 || count === 0 ? `${text}s` : text;
};

export const isValidUsername = (username) => {
  return C.regex.username.test(username);
};

export const isValidPassword = (password) => {
  return C.regex.password.test(password);
};

export function formatAsFilecoin(number) {
  return `${number} FIL`;
}

export function convertFIL(number = 0) {
  const filecoinNumber = new FilecoinNumber(`${number}`, "attofil");
  const inFil = filecoinNumber.toFil();
  return inFil;
}

export function inFIL(number = 0) {
  const filecoinNumber = new FilecoinNumber(`${number}`, "attofil");
  const inFil = filecoinNumber.toFil();

  let candidate = `${formatAsFilecoin(inFil)}`;

  return candidate;
}

export const getViewerFromHeader = async (headers) => {
  try {
    const token = Cookies.get(headers, C.auth);
    const url = `${C.api.host}/viewer`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    console.log(json);
    if (!json) {
      return null;
    }

    if (json.error) {
      return null;
    }

    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const toDate = (data) => {
  const date = new Date(data);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const bytesToSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
};

export const isEmpty = (string) => {
  // NOTE(jim): If a number gets passed in, it isn't considered empty for zero.
  if (string === 0) {
    return false;
  }

  if (!string) {
    return true;
  }

  if (typeof string === "object") {
    return true;
  }

  if (string.length === 0) {
    return true;
  }

  string = string.toString();

  return !string.trim();
};

export function classNames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}
