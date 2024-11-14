import { getCurrentInstance as qs, ref as St, reactive as Bs, onMounted as Fs, onUnmounted as Js, watch as zs, isReadonly as Ws, toRefs as Hs, unref as Xr, defineComponent as Ys, openBlock as Ur, createElementBlock as Vr, createElementVNode as dr, Fragment as Ks, renderList as Gs, normalizeClass as Xs, toDisplayString as Fn, withDirectives as Qs, isRef as eo, withKeys as to, vModelText as ro, defineCustomElement as no } from "vue";
var ga = "vercel.ai.error", ao = Symbol.for(ga), ya, so = class va extends Error {
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: t,
    message: r,
    cause: n
  }) {
    super(r), this[ya] = !0, this.name = t, this.cause = n;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(t) {
    return va.hasMarker(t, ga);
  }
  static hasMarker(t, r) {
    const n = Symbol.for(r);
    return t != null && typeof t == "object" && n in t && typeof t[n] == "boolean" && t[n] === !0;
  }
  /**
   * Returns a JSON representation of the error.
   * @returns {Object} An object containing the error's name, message, and cause.
   *
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message
    };
  }
};
ya = ao;
var O = so, Qr = "AI_APICallError", _a = `vercel.ai.error.${Qr}`, oo = Symbol.for(_a), ba, Ie = class extends O {
  constructor({
    message: e,
    url: t,
    requestBodyValues: r,
    statusCode: n,
    responseHeaders: a,
    responseBody: s,
    cause: o,
    isRetryable: i = n != null && (n === 408 || // request timeout
    n === 409 || // conflict
    n === 429 || // too many requests
    n >= 500),
    // server error
    data: u
  }) {
    super({ name: Qr, message: e, cause: o }), this[ba] = !0, this.url = t, this.requestBodyValues = r, this.statusCode = n, this.responseHeaders = a, this.responseBody = s, this.isRetryable = i, this.data = u;
  }
  static isInstance(e) {
    return O.hasMarker(e, _a);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isAPICallError(e) {
    return e instanceof Error && e.name === Qr && typeof e.url == "string" && typeof e.requestBodyValues == "object" && (e.statusCode == null || typeof e.statusCode == "number") && (e.responseHeaders == null || typeof e.responseHeaders == "object") && (e.responseBody == null || typeof e.responseBody == "string") && (e.cause == null || typeof e.cause == "object") && typeof e.isRetryable == "boolean" && (e.data == null || typeof e.data == "object");
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      requestBodyValues: this.requestBodyValues,
      statusCode: this.statusCode,
      responseHeaders: this.responseHeaders,
      responseBody: this.responseBody,
      cause: this.cause,
      isRetryable: this.isRetryable,
      data: this.data
    };
  }
};
ba = oo;
var en = "AI_EmptyResponseBodyError", wa = `vercel.ai.error.${en}`, io = Symbol.for(wa), xa, lo = class extends O {
  // used in isInstance
  constructor({ message: e = "Empty response body" } = {}) {
    super({ name: en, message: e }), this[xa] = !0;
  }
  static isInstance(e) {
    return O.hasMarker(e, wa);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isEmptyResponseBodyError(e) {
    return e instanceof Error && e.name === en;
  }
};
xa = io;
function In(e) {
  return e == null ? "unknown error" : typeof e == "string" ? e : e instanceof Error ? e.message : JSON.stringify(e);
}
var Ta = "AI_InvalidArgumentError", ka = `vercel.ai.error.${Ta}`, uo = Symbol.for(ka), Sa, co = class extends O {
  constructor({
    message: t,
    cause: r,
    argument: n
  }) {
    super({ name: Ta, message: t, cause: r }), this[Sa] = !0, this.argument = n;
  }
  static isInstance(t) {
    return O.hasMarker(t, ka);
  }
};
Sa = uo;
var tn = "AI_InvalidPromptError", Ea = `vercel.ai.error.${tn}`, fo = Symbol.for(Ea), Ia, Qe = class extends O {
  constructor({
    prompt: e,
    message: t,
    cause: r
  }) {
    super({ name: tn, message: `Invalid prompt: ${t}`, cause: r }), this[Ia] = !0, this.prompt = e;
  }
  static isInstance(e) {
    return O.hasMarker(e, Ea);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidPromptError(e) {
    return e instanceof Error && e.name === tn && prompt != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      prompt: this.prompt
    };
  }
};
Ia = fo;
var rn = "AI_InvalidResponseDataError", Ca = `vercel.ai.error.${rn}`, po = Symbol.for(Ca), Aa, qr = class extends O {
  constructor({
    data: e,
    message: t = `Invalid response data: ${JSON.stringify(e)}.`
  }) {
    super({ name: rn, message: t }), this[Aa] = !0, this.data = e;
  }
  static isInstance(e) {
    return O.hasMarker(e, Ca);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidResponseDataError(e) {
    return e instanceof Error && e.name === rn && e.data != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      data: this.data
    };
  }
};
Aa = po;
var nn = "AI_JSONParseError", Ra = `vercel.ai.error.${nn}`, mo = Symbol.for(Ra), Na, gr = class extends O {
  constructor({ text: e, cause: t }) {
    super({
      name: nn,
      message: `JSON parsing failed: Text: ${e}.
Error message: ${In(t)}`,
      cause: t
    }), this[Na] = !0, this.text = e;
  }
  static isInstance(e) {
    return O.hasMarker(e, Ra);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isJSONParseError(e) {
    return e instanceof Error && e.name === nn && "text" in e && typeof e.text == "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      valueText: this.text
    };
  }
};
Na = mo;
var an = "AI_LoadAPIKeyError", Oa = `vercel.ai.error.${an}`, ho = Symbol.for(Oa), Pa, fr = class extends O {
  // used in isInstance
  constructor({ message: e }) {
    super({ name: an, message: e }), this[Pa] = !0;
  }
  static isInstance(e) {
    return O.hasMarker(e, Oa);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isLoadAPIKeyError(e) {
    return e instanceof Error && e.name === an;
  }
};
Pa = ho;
var sn = "AI_TooManyEmbeddingValuesForCallError", Ma = `vercel.ai.error.${sn}`, go = Symbol.for(Ma), ja, yo = class extends O {
  constructor(e) {
    super({
      name: sn,
      message: `Too many values for a single embedding call. The ${e.provider} model "${e.modelId}" can only embed up to ${e.maxEmbeddingsPerCall} values per call, but ${e.values.length} values were provided.`
    }), this[ja] = !0, this.provider = e.provider, this.modelId = e.modelId, this.maxEmbeddingsPerCall = e.maxEmbeddingsPerCall, this.values = e.values;
  }
  static isInstance(e) {
    return O.hasMarker(e, Ma);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isTooManyEmbeddingValuesForCallError(e) {
    return e instanceof Error && e.name === sn && "provider" in e && typeof e.provider == "string" && "modelId" in e && typeof e.modelId == "string" && "maxEmbeddingsPerCall" in e && typeof e.maxEmbeddingsPerCall == "number" && "values" in e && Array.isArray(e.values);
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      provider: this.provider,
      modelId: this.modelId,
      maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
      values: this.values
    };
  }
};
ja = go;
var on = "AI_TypeValidationError", Da = `vercel.ai.error.${on}`, vo = Symbol.for(Da), $a, _o = class ln extends O {
  constructor({ value: t, cause: r }) {
    super({
      name: on,
      message: `Type validation failed: Value: ${JSON.stringify(t)}.
Error message: ${In(r)}`,
      cause: r
    }), this[$a] = !0, this.value = t;
  }
  static isInstance(t) {
    return O.hasMarker(t, Da);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value: t,
    cause: r
  }) {
    return ln.isInstance(r) && r.value === t ? r : new ln({ value: t, cause: r });
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isTypeValidationError(t) {
    return t instanceof Error && t.name === on;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      value: this.value
    };
  }
};
$a = vo;
var yr = _o, un = "AI_UnsupportedFunctionalityError", Za = `vercel.ai.error.${un}`, bo = Symbol.for(Za), La, de = class extends O {
  constructor({ functionality: e }) {
    super({
      name: un,
      message: `'${e}' functionality not supported.`
    }), this[La] = !0, this.functionality = e;
  }
  static isInstance(e) {
    return O.hasMarker(e, Za);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isUnsupportedFunctionalityError(e) {
    return e instanceof Error && e.name === un && typeof e.functionality == "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      functionality: this.functionality
    };
  }
};
La = bo;
let wo = (e, t = 21) => (r = t) => {
  let n = "", a = r;
  for (; a--; )
    n += e[Math.random() * e.length | 0];
  return n;
};
function xo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gt = { exports: {} };
const To = typeof Buffer < "u", Jn = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, zn = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function Ua(e, t, r) {
  r == null && t !== null && typeof t == "object" && (r = t, t = void 0), To && Buffer.isBuffer(e) && (e = e.toString()), e && e.charCodeAt(0) === 65279 && (e = e.slice(1));
  const n = JSON.parse(e, t);
  if (n === null || typeof n != "object")
    return n;
  const a = r && r.protoAction || "error", s = r && r.constructorAction || "error";
  if (a === "ignore" && s === "ignore")
    return n;
  if (a !== "ignore" && s !== "ignore") {
    if (Jn.test(e) === !1 && zn.test(e) === !1)
      return n;
  } else if (a !== "ignore" && s === "ignore") {
    if (Jn.test(e) === !1)
      return n;
  } else if (zn.test(e) === !1)
    return n;
  return Va(n, { protoAction: a, constructorAction: s, safe: r && r.safe });
}
function Va(e, { protoAction: t = "error", constructorAction: r = "error", safe: n } = {}) {
  let a = [e];
  for (; a.length; ) {
    const s = a;
    a = [];
    for (const o of s) {
      if (t !== "ignore" && Object.prototype.hasOwnProperty.call(o, "__proto__")) {
        if (n === !0)
          return null;
        if (t === "error")
          throw new SyntaxError("Object contains forbidden prototype property");
        delete o.__proto__;
      }
      if (r !== "ignore" && Object.prototype.hasOwnProperty.call(o, "constructor") && Object.prototype.hasOwnProperty.call(o.constructor, "prototype")) {
        if (n === !0)
          return null;
        if (r === "error")
          throw new SyntaxError("Object contains forbidden prototype property");
        delete o.constructor;
      }
      for (const i in o) {
        const u = o[i];
        u && typeof u == "object" && a.push(u);
      }
    }
  }
  return e;
}
function Cn(e, t, r) {
  const n = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return Ua(e, t, r);
  } finally {
    Error.stackTraceLimit = n;
  }
}
function ko(e, t) {
  const r = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return Ua(e, t, { safe: !0 });
  } catch {
    return null;
  } finally {
    Error.stackTraceLimit = r;
  }
}
gt.exports = Cn;
gt.exports.default = Cn;
gt.exports.parse = Cn;
gt.exports.safeParse = ko;
gt.exports.scan = Va;
var So = gt.exports;
const It = /* @__PURE__ */ xo(So);
function Eo(e) {
  let t, r, n, a, s, o, i;
  return u(), {
    feed: l,
    reset: u
  };
  function u() {
    t = !0, r = "", n = 0, a = -1, s = void 0, o = void 0, i = "";
  }
  function l(f) {
    r = r ? r + f : f, t && Io(r) && (r = r.slice(qa.length)), t = !1;
    const y = r.length;
    let p = 0, m = !1;
    for (; p < y; ) {
      m && (r[p] === `
` && ++p, m = !1);
      let _ = -1, T = a, b;
      for (let v = n; _ < 0 && v < y; ++v)
        b = r[v], b === ":" && T < 0 ? T = v - p : b === "\r" ? (m = !0, _ = v - p) : b === `
` && (_ = v - p);
      if (_ < 0) {
        n = y - p, a = T;
        break;
      } else
        n = 0, a = -1;
      c(r, p, T, _), p += _ + 1;
    }
    p === y ? r = "" : p > 0 && (r = r.slice(p));
  }
  function c(f, y, p, m) {
    if (m === 0) {
      i.length > 0 && (e({
        type: "event",
        id: s,
        event: o || void 0,
        data: i.slice(0, -1)
        // remove trailing newline
      }), i = "", s = void 0), o = void 0;
      return;
    }
    const _ = p < 0, T = f.slice(y, y + (_ ? m : p));
    let b = 0;
    _ ? b = m : f[y + p + 1] === " " ? b = p + 2 : b = p + 1;
    const v = y + b, k = m - b, P = f.slice(v, v + k).toString();
    if (T === "data")
      i += P ? "".concat(P, `
`) : `
`;
    else if (T === "event")
      o = P;
    else if (T === "id" && !P.includes("\0"))
      s = P;
    else if (T === "retry") {
      const M = parseInt(P, 10);
      Number.isNaN(M) || e({
        type: "reconnect-interval",
        value: M
      });
    }
  }
}
const qa = [239, 187, 191];
function Io(e) {
  return qa.every((t, r) => e.charCodeAt(r) === t);
}
class Co extends TransformStream {
  constructor() {
    let t;
    super({
      start(r) {
        t = Eo((n) => {
          n.type === "event" && r.enqueue(n);
        });
      },
      transform(r) {
        t.feed(r);
      }
    });
  }
}
function Ct(...e) {
  return e.reduce(
    (t, r) => ({
      ...t,
      ...r ?? {}
    }),
    {}
  );
}
function jr(e) {
  const t = {};
  return e.headers.forEach((r, n) => {
    t[n] = r;
  }), t;
}
var ur = ({
  prefix: e,
  size: t = 7,
  alphabet: r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator: n = "-"
} = {}) => {
  const a = wo(r, t);
  if (e == null)
    return a;
  if (r.includes(n))
    throw new co({
      argument: "separator",
      message: `The separator "${n}" must not be part of the alphabet "${r}".`
    });
  return (s) => `${e}${n}${a(s)}`;
}, Be = ur();
function Ao(e) {
  return e == null ? "unknown error" : typeof e == "string" ? e : e instanceof Error ? e.message : JSON.stringify(e);
}
function hr(e) {
  return e instanceof Error && (e.name === "AbortError" || e.name === "TimeoutError");
}
function Ro({
  apiKey: e,
  environmentVariableName: t,
  apiKeyParameterName: r = "apiKey",
  description: n
}) {
  if (typeof e == "string")
    return e;
  if (e != null)
    throw new fr({
      message: `${n} API key must be a string.`
    });
  if (typeof process > "u")
    throw new fr({
      message: `${n} API key is missing. Pass it using the '${r}' parameter. Environment variables is not supported in this environment.`
    });
  if (e = process.env[t], e == null)
    throw new fr({
      message: `${n} API key is missing. Pass it using the '${r}' parameter or the ${t} environment variable.`
    });
  if (typeof e != "string")
    throw new fr({
      message: `${n} API key must be a string. The value of the ${t} environment variable is not a string.`
    });
  return e;
}
var vr = Symbol.for("vercel.ai.validator");
function No(e) {
  return { [vr]: !0, validate: e };
}
function Oo(e) {
  return typeof e == "object" && e !== null && vr in e && e[vr] === !0 && "validate" in e;
}
function Po(e) {
  return Oo(e) ? e : Mo(e);
}
function Mo(e) {
  return No((t) => {
    const r = e.safeParse(t);
    return r.success ? { success: !0, value: r.data } : { success: !1, error: r.error };
  });
}
function jo({
  value: e,
  schema: t
}) {
  const r = Dr({ value: e, schema: t });
  if (!r.success)
    throw yr.wrap({ value: e, cause: r.error });
  return r.value;
}
function Dr({
  value: e,
  schema: t
}) {
  const r = Po(t);
  try {
    if (r.validate == null)
      return { success: !0, value: e };
    const n = r.validate(e);
    return n.success ? n : {
      success: !1,
      error: yr.wrap({ value: e, cause: n.error })
    };
  } catch (n) {
    return {
      success: !1,
      error: yr.wrap({ value: e, cause: n })
    };
  }
}
function Do({
  text: e,
  schema: t
}) {
  try {
    const r = It.parse(e);
    return t == null ? r : jo({ value: r, schema: t });
  } catch (r) {
    throw gr.isJSONParseError(r) || yr.isTypeValidationError(r) ? r : new gr({ text: e, cause: r });
  }
}
function An({
  text: e,
  schema: t
}) {
  try {
    const r = It.parse(e);
    return t == null ? {
      success: !0,
      value: r
    } : Dr({ value: r, schema: t });
  } catch (r) {
    return {
      success: !1,
      error: gr.isJSONParseError(r) ? r : new gr({ text: e, cause: r })
    };
  }
}
function Wn(e) {
  try {
    return It.parse(e), !0;
  } catch {
    return !1;
  }
}
function $o(e) {
  return Object.fromEntries(
    Object.entries(e).filter(([t, r]) => r != null)
  );
}
var Zo = () => globalThis.fetch, At = async ({
  url: e,
  headers: t,
  body: r,
  failedResponseHandler: n,
  successfulResponseHandler: a,
  abortSignal: s,
  fetch: o
}) => Lo({
  url: e,
  headers: {
    "Content-Type": "application/json",
    ...t
  },
  body: {
    content: JSON.stringify(r),
    values: r
  },
  failedResponseHandler: n,
  successfulResponseHandler: a,
  abortSignal: s,
  fetch: o
}), Lo = async ({
  url: e,
  headers: t = {},
  body: r,
  successfulResponseHandler: n,
  failedResponseHandler: a,
  abortSignal: s,
  fetch: o = Zo()
}) => {
  try {
    const i = await o(e, {
      method: "POST",
      headers: $o(t),
      body: r.content,
      signal: s
    }), u = jr(i);
    if (!i.ok) {
      let l;
      try {
        l = await a({
          response: i,
          url: e,
          requestBodyValues: r.values
        });
      } catch (c) {
        throw hr(c) || Ie.isAPICallError(c) ? c : new Ie({
          message: "Failed to process error response",
          cause: c,
          statusCode: i.status,
          url: e,
          responseHeaders: u,
          requestBodyValues: r.values
        });
      }
      throw l.value;
    }
    try {
      return await n({
        response: i,
        url: e,
        requestBodyValues: r.values
      });
    } catch (l) {
      throw l instanceof Error && (hr(l) || Ie.isAPICallError(l)) ? l : new Ie({
        message: "Failed to process successful response",
        cause: l,
        statusCode: i.status,
        url: e,
        responseHeaders: u,
        requestBodyValues: r.values
      });
    }
  } catch (i) {
    if (hr(i))
      throw i;
    if (i instanceof TypeError && i.message === "fetch failed") {
      const u = i.cause;
      if (u != null)
        throw new Ie({
          message: `Cannot connect to API: ${u.message}`,
          cause: u,
          url: e,
          requestBodyValues: r.values,
          isRetryable: !0
          // retry when network error
        });
    }
    throw i;
  }
}, Uo = ({
  errorSchema: e,
  errorToMessage: t,
  isRetryable: r
}) => async ({ response: n, url: a, requestBodyValues: s }) => {
  const o = await n.text(), i = jr(n);
  if (o.trim() === "")
    return {
      responseHeaders: i,
      value: new Ie({
        message: n.statusText,
        url: a,
        requestBodyValues: s,
        statusCode: n.status,
        responseHeaders: i,
        responseBody: o,
        isRetryable: r == null ? void 0 : r(n)
      })
    };
  try {
    const u = Do({
      text: o,
      schema: e
    });
    return {
      responseHeaders: i,
      value: new Ie({
        message: t(u),
        url: a,
        requestBodyValues: s,
        statusCode: n.status,
        responseHeaders: i,
        responseBody: o,
        data: u,
        isRetryable: r == null ? void 0 : r(n, u)
      })
    };
  } catch {
    return {
      responseHeaders: i,
      value: new Ie({
        message: n.statusText,
        url: a,
        requestBodyValues: s,
        statusCode: n.status,
        responseHeaders: i,
        responseBody: o,
        isRetryable: r == null ? void 0 : r(n)
      })
    };
  }
}, Ba = (e) => async ({ response: t }) => {
  const r = jr(t);
  if (t.body == null)
    throw new lo({});
  return {
    responseHeaders: r,
    value: t.body.pipeThrough(new TextDecoderStream()).pipeThrough(new Co()).pipeThrough(
      new TransformStream({
        transform({ data: n }, a) {
          n !== "[DONE]" && a.enqueue(
            An({
              text: n,
              schema: e
            })
          );
        }
      })
    )
  };
}, Rn = (e) => async ({ response: t, url: r, requestBodyValues: n }) => {
  const a = await t.text(), s = An({
    text: a,
    schema: e
  }), o = jr(t);
  if (!s.success)
    throw new Ie({
      message: "Invalid JSON response",
      cause: s.error,
      statusCode: t.status,
      responseHeaders: o,
      responseBody: a,
      url: r,
      requestBodyValues: n
    });
  return {
    responseHeaders: o,
    value: s.value
  };
}, { btoa: Vo, atob: qo } = globalThis;
function Bo(e) {
  const t = e.replace(/-/g, "+").replace(/_/g, "/"), r = qo(t);
  return Uint8Array.from(r, (n) => n.codePointAt(0));
}
function cn(e) {
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += String.fromCodePoint(e[r]);
  return Vo(t);
}
function Fo(e) {
  return e == null ? void 0 : e.replace(/\/$/, "");
}
const Jo = Symbol("Let zodToJsonSchema decide on which parser to use"), zo = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: !1,
  definitions: {},
  errorMessages: !1,
  markdownDescription: !1,
  patternStrategy: "escape",
  applyRegexFlags: !1,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
}, Wo = (e) => ({
  ...zo,
  ...e
}), Ho = (e) => {
  const t = Wo(e), r = t.name !== void 0 ? [...t.basePath, t.definitionPath, t.name] : t.basePath;
  return {
    ...t,
    currentPath: r,
    propertyPath: void 0,
    seen: new Map(Object.entries(t.definitions).map(([n, a]) => [
      a._def,
      {
        def: a._def,
        path: [...t.basePath, t.definitionPath, n],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};
function Fa(e, t, r, n) {
  n != null && n.errorMessages && r && (e.errorMessage = {
    ...e.errorMessage,
    [t]: r
  });
}
function V(e, t, r, n, a) {
  e[t] = r, Fa(e, t, n, a);
}
var D;
(function(e) {
  e.assertEqual = (a) => a;
  function t(a) {
  }
  e.assertIs = t;
  function r(a) {
    throw new Error();
  }
  e.assertNever = r, e.arrayToEnum = (a) => {
    const s = {};
    for (const o of a)
      s[o] = o;
    return s;
  }, e.getValidEnumValues = (a) => {
    const s = e.objectKeys(a).filter((i) => typeof a[a[i]] != "number"), o = {};
    for (const i of s)
      o[i] = a[i];
    return e.objectValues(o);
  }, e.objectValues = (a) => e.objectKeys(a).map(function(s) {
    return a[s];
  }), e.objectKeys = typeof Object.keys == "function" ? (a) => Object.keys(a) : (a) => {
    const s = [];
    for (const o in a)
      Object.prototype.hasOwnProperty.call(a, o) && s.push(o);
    return s;
  }, e.find = (a, s) => {
    for (const o of a)
      if (s(o))
        return o;
  }, e.isInteger = typeof Number.isInteger == "function" ? (a) => Number.isInteger(a) : (a) => typeof a == "number" && isFinite(a) && Math.floor(a) === a;
  function n(a, s = " | ") {
    return a.map((o) => typeof o == "string" ? `'${o}'` : o).join(s);
  }
  e.joinValues = n, e.jsonStringifyReplacer = (a, s) => typeof s == "bigint" ? s.toString() : s;
})(D || (D = {}));
var dn;
(function(e) {
  e.mergeShapes = (t, r) => ({
    ...t,
    ...r
    // second overwrites first
  });
})(dn || (dn = {}));
const x = D.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Fe = (e) => {
  switch (typeof e) {
    case "undefined":
      return x.undefined;
    case "string":
      return x.string;
    case "number":
      return isNaN(e) ? x.nan : x.number;
    case "boolean":
      return x.boolean;
    case "function":
      return x.function;
    case "bigint":
      return x.bigint;
    case "symbol":
      return x.symbol;
    case "object":
      return Array.isArray(e) ? x.array : e === null ? x.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? x.promise : typeof Map < "u" && e instanceof Map ? x.map : typeof Set < "u" && e instanceof Set ? x.set : typeof Date < "u" && e instanceof Date ? x.date : x.object;
    default:
      return x.unknown;
  }
}, h = D.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), Yo = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class he extends Error {
  constructor(t) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = t;
  }
  get errors() {
    return this.issues;
  }
  format(t) {
    const r = t || function(s) {
      return s.message;
    }, n = { _errors: [] }, a = (s) => {
      for (const o of s.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(a);
        else if (o.code === "invalid_return_type")
          a(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          a(o.argumentsError);
        else if (o.path.length === 0)
          n._errors.push(r(o));
        else {
          let i = n, u = 0;
          for (; u < o.path.length; ) {
            const l = o.path[u];
            u === o.path.length - 1 ? (i[l] = i[l] || { _errors: [] }, i[l]._errors.push(r(o))) : i[l] = i[l] || { _errors: [] }, i = i[l], u++;
          }
        }
    };
    return a(this), n;
  }
  static assert(t) {
    if (!(t instanceof he))
      throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, D.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (r) => r.message) {
    const r = {}, n = [];
    for (const a of this.issues)
      a.path.length > 0 ? (r[a.path[0]] = r[a.path[0]] || [], r[a.path[0]].push(t(a))) : n.push(t(a));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
he.create = (e) => new he(e);
const ft = (e, t) => {
  let r;
  switch (e.code) {
    case h.invalid_type:
      e.received === x.undefined ? r = "Required" : r = `Expected ${e.expected}, received ${e.received}`;
      break;
    case h.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(e.expected, D.jsonStringifyReplacer)}`;
      break;
    case h.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${D.joinValues(e.keys, ", ")}`;
      break;
    case h.invalid_union:
      r = "Invalid input";
      break;
    case h.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${D.joinValues(e.options)}`;
      break;
    case h.invalid_enum_value:
      r = `Invalid enum value. Expected ${D.joinValues(e.options)}, received '${e.received}'`;
      break;
    case h.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case h.invalid_return_type:
      r = "Invalid function return type";
      break;
    case h.invalid_date:
      r = "Invalid date";
      break;
    case h.invalid_string:
      typeof e.validation == "object" ? "includes" in e.validation ? (r = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? r = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? r = `Invalid input: must end with "${e.validation.endsWith}"` : D.assertNever(e.validation) : e.validation !== "regex" ? r = `Invalid ${e.validation}` : r = "Invalid";
      break;
    case h.too_small:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : r = "Invalid input";
      break;
    case h.too_big:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? r = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : r = "Invalid input";
      break;
    case h.custom:
      r = "Invalid input";
      break;
    case h.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case h.not_multiple_of:
      r = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case h.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = t.defaultError, D.assertNever(e);
  }
  return { message: r };
};
let Ja = ft;
function Ko(e) {
  Ja = e;
}
function _r() {
  return Ja;
}
const br = (e) => {
  const { data: t, path: r, errorMaps: n, issueData: a } = e, s = [...r, ...a.path || []], o = {
    ...a,
    path: s
  };
  if (a.message !== void 0)
    return {
      ...a,
      path: s,
      message: a.message
    };
  let i = "";
  const u = n.filter((l) => !!l).slice().reverse();
  for (const l of u)
    i = l(o, { data: t, defaultError: i }).message;
  return {
    ...a,
    path: s,
    message: i
  };
}, Go = [];
function w(e, t) {
  const r = _r(), n = br({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [
      e.common.contextualErrorMap,
      e.schemaErrorMap,
      r,
      r === ft ? void 0 : ft
      // then global default map
    ].filter((a) => !!a)
  });
  e.common.issues.push(n);
}
class re {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, r) {
    const n = [];
    for (const a of r) {
      if (a.status === "aborted")
        return I;
      a.status === "dirty" && t.dirty(), n.push(a.value);
    }
    return { status: t.value, value: n };
  }
  static async mergeObjectAsync(t, r) {
    const n = [];
    for (const a of r) {
      const s = await a.key, o = await a.value;
      n.push({
        key: s,
        value: o
      });
    }
    return re.mergeObjectSync(t, n);
  }
  static mergeObjectSync(t, r) {
    const n = {};
    for (const a of r) {
      const { key: s, value: o } = a;
      if (s.status === "aborted" || o.status === "aborted")
        return I;
      s.status === "dirty" && t.dirty(), o.status === "dirty" && t.dirty(), s.value !== "__proto__" && (typeof o.value < "u" || a.alwaysSet) && (n[s.value] = o.value);
    }
    return { status: t.value, value: n };
  }
}
const I = Object.freeze({
  status: "aborted"
}), ct = (e) => ({ status: "dirty", value: e }), oe = (e) => ({ status: "valid", value: e }), fn = (e) => e.status === "aborted", pn = (e) => e.status === "dirty", Rt = (e) => e.status === "valid", Nt = (e) => typeof Promise < "u" && e instanceof Promise;
function wr(e, t, r, n) {
  if (typeof t == "function" ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t.get(e);
}
function za(e, t, r, n, a) {
  if (typeof t == "function" ? e !== t || !a : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return t.set(e, r), r;
}
var S;
(function(e) {
  e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e.toString = (t) => typeof t == "string" ? t : t == null ? void 0 : t.message;
})(S || (S = {}));
var Tt, kt;
class Ae {
  constructor(t, r, n, a) {
    this._cachedPath = [], this.parent = t, this.data = r, this._path = n, this._key = a;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Hn = (e, t) => {
  if (Rt(t))
    return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new he(e.common.issues);
      return this._error = r, this._error;
    }
  };
};
function R(e) {
  if (!e)
    return {};
  const { errorMap: t, invalid_type_error: r, required_error: n, description: a } = e;
  if (t && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: a } : { errorMap: (o, i) => {
    var u, l;
    const { message: c } = e;
    return o.code === "invalid_enum_value" ? { message: c ?? i.defaultError } : typeof i.data > "u" ? { message: (u = c ?? n) !== null && u !== void 0 ? u : i.defaultError } : o.code !== "invalid_type" ? { message: i.defaultError } : { message: (l = c ?? r) !== null && l !== void 0 ? l : i.defaultError };
  }, description: a };
}
class N {
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Fe(t.data);
  }
  _getOrReturnCtx(t, r) {
    return r || {
      common: t.parent.common,
      data: t.data,
      parsedType: Fe(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new re(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Fe(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const r = this._parse(t);
    if (Nt(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(t) {
    const r = this._parse(t);
    return Promise.resolve(r);
  }
  parse(t, r) {
    const n = this.safeParse(t, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(t, r) {
    var n;
    const a = {
      common: {
        issues: [],
        async: (n = r == null ? void 0 : r.async) !== null && n !== void 0 ? n : !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Fe(t)
    }, s = this._parseSync({ data: t, path: a.path, parent: a });
    return Hn(a, s);
  }
  async parseAsync(t, r) {
    const n = await this.safeParseAsync(t, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(t, r) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Fe(t)
    }, a = this._parse({ data: t, path: n.path, parent: n }), s = await (Nt(a) ? a : Promise.resolve(a));
    return Hn(n, s);
  }
  refine(t, r) {
    const n = (a) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(a) : r;
    return this._refinement((a, s) => {
      const o = t(a), i = () => s.addIssue({
        code: h.custom,
        ...n(a)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((u) => u ? !0 : (i(), !1)) : o ? !0 : (i(), !1);
    });
  }
  refinement(t, r) {
    return this._refinement((n, a) => t(n) ? !0 : (a.addIssue(typeof r == "function" ? r(n, a) : r), !1));
  }
  _refinement(t) {
    return new ke({
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  optional() {
    return Ce.create(this, this._def);
  }
  nullable() {
    return He.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Te.create(this, this._def);
  }
  promise() {
    return mt.create(this, this._def);
  }
  or(t) {
    return jt.create([this, t], this._def);
  }
  and(t) {
    return Dt.create(this, t, this._def);
  }
  transform(t) {
    return new ke({
      ...R(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const r = typeof t == "function" ? t : () => t;
    return new Vt({
      ...R(this._def),
      innerType: this,
      defaultValue: r,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new Nn({
      typeName: g.ZodBranded,
      type: this,
      ...R(this._def)
    });
  }
  catch(t) {
    const r = typeof t == "function" ? t : () => t;
    return new qt({
      ...R(this._def),
      innerType: this,
      catchValue: r,
      typeName: g.ZodCatch
    });
  }
  describe(t) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return cr.create(this, t);
  }
  readonly() {
    return Bt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Xo = /^c[^\s-]{8,}$/i, Qo = /^[0-9a-z]+$/, ei = /^[0-9A-HJKMNP-TV-Z]{26}$/, ti = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, ri = /^[a-z0-9_-]{21}$/i, ni = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, ai = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, si = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Br;
const oi = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ii = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, li = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Wa = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", ui = new RegExp(`^${Wa}$`);
function Ha(e) {
  let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision == null && (t = `${t}(\\.\\d+)?`), t;
}
function ci(e) {
  return new RegExp(`^${Ha(e)}$`);
}
function Ya(e) {
  let t = `${Wa}T${Ha(e)}`;
  const r = [];
  return r.push(e.local ? "Z?" : "Z"), e.offset && r.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${r.join("|")})`, new RegExp(`^${t}$`);
}
function di(e, t) {
  return !!((t === "v4" || !t) && oi.test(e) || (t === "v6" || !t) && ii.test(e));
}
class xe extends N {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== x.string) {
      const s = this._getOrReturnCtx(t);
      return w(s, {
        code: h.invalid_type,
        expected: x.string,
        received: s.parsedType
      }), I;
    }
    const n = new re();
    let a;
    for (const s of this._def.checks)
      if (s.kind === "min")
        t.data.length < s.value && (a = this._getOrReturnCtx(t, a), w(a, {
          code: h.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "max")
        t.data.length > s.value && (a = this._getOrReturnCtx(t, a), w(a, {
          code: h.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "length") {
        const o = t.data.length > s.value, i = t.data.length < s.value;
        (o || i) && (a = this._getOrReturnCtx(t, a), o ? w(a, {
          code: h.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : i && w(a, {
          code: h.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), n.dirty());
      } else if (s.kind === "email")
        ai.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
          validation: "email",
          code: h.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "emoji")
        Br || (Br = new RegExp(si, "u")), Br.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
          validation: "emoji",
          code: h.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "uuid")
        ti.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
          validation: "uuid",
          code: h.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "nanoid")
        ri.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
          validation: "nanoid",
          code: h.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid")
        Xo.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
          validation: "cuid",
          code: h.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid2")
        Qo.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
          validation: "cuid2",
          code: h.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "ulid")
        ei.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
          validation: "ulid",
          code: h.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "url")
        try {
          new URL(t.data);
        } catch {
          a = this._getOrReturnCtx(t, a), w(a, {
            validation: "url",
            code: h.invalid_string,
            message: s.message
          }), n.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
        validation: "regex",
        code: h.invalid_string,
        message: s.message
      }), n.dirty())) : s.kind === "trim" ? t.data = t.data.trim() : s.kind === "includes" ? t.data.includes(s.value, s.position) || (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), n.dirty()) : s.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : s.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : s.kind === "startsWith" ? t.data.startsWith(s.value) || (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "endsWith" ? t.data.endsWith(s.value) || (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "datetime" ? Ya(s).test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.invalid_string,
        validation: "datetime",
        message: s.message
      }), n.dirty()) : s.kind === "date" ? ui.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.invalid_string,
        validation: "date",
        message: s.message
      }), n.dirty()) : s.kind === "time" ? ci(s).test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.invalid_string,
        validation: "time",
        message: s.message
      }), n.dirty()) : s.kind === "duration" ? ni.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
        validation: "duration",
        code: h.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "ip" ? di(t.data, s.version) || (a = this._getOrReturnCtx(t, a), w(a, {
        validation: "ip",
        code: h.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64" ? li.test(t.data) || (a = this._getOrReturnCtx(t, a), w(a, {
        validation: "base64",
        code: h.invalid_string,
        message: s.message
      }), n.dirty()) : D.assertNever(s);
    return { status: n.value, value: t.data };
  }
  _regex(t, r, n) {
    return this.refinement((a) => t.test(a), {
      validation: r,
      code: h.invalid_string,
      ...S.errToObj(n)
    });
  }
  _addCheck(t) {
    return new xe({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...S.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...S.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...S.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...S.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...S.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...S.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...S.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...S.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...S.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...S.errToObj(t) });
  }
  datetime(t) {
    var r, n;
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      offset: (r = t == null ? void 0 : t.offset) !== null && r !== void 0 ? r : !1,
      local: (n = t == null ? void 0 : t.local) !== null && n !== void 0 ? n : !1,
      ...S.errToObj(t == null ? void 0 : t.message)
    });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: t
    }) : this._addCheck({
      kind: "time",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      ...S.errToObj(t == null ? void 0 : t.message)
    });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...S.errToObj(t) });
  }
  regex(t, r) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...S.errToObj(r)
    });
  }
  includes(t, r) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: r == null ? void 0 : r.position,
      ...S.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(t, r) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...S.errToObj(r)
    });
  }
  endsWith(t, r) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...S.errToObj(r)
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...S.errToObj(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...S.errToObj(r)
    });
  }
  length(t, r) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...S.errToObj(r)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(t) {
    return this.min(1, S.errToObj(t));
  }
  trim() {
    return new xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new xe({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get minLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
xe.create = (e) => {
  var t;
  return new xe({
    checks: [],
    typeName: g.ZodString,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...R(e)
  });
};
function fi(e, t) {
  const r = (e.toString().split(".")[1] || "").length, n = (t.toString().split(".")[1] || "").length, a = r > n ? r : n, s = parseInt(e.toFixed(a).replace(".", "")), o = parseInt(t.toFixed(a).replace(".", ""));
  return s % o / Math.pow(10, a);
}
class Je extends N {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== x.number) {
      const s = this._getOrReturnCtx(t);
      return w(s, {
        code: h.invalid_type,
        expected: x.number,
        received: s.parsedType
      }), I;
    }
    let n;
    const a = new re();
    for (const s of this._def.checks)
      s.kind === "int" ? D.isInteger(t.data) || (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), a.dirty()) : s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), a.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), a.dirty()) : s.kind === "multipleOf" ? fi(t.data, s.value) !== 0 && (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), a.dirty()) : s.kind === "finite" ? Number.isFinite(t.data) || (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.not_finite,
        message: s.message
      }), a.dirty()) : D.assertNever(s);
    return { status: a.value, value: t.data };
  }
  gte(t, r) {
    return this.setLimit("min", t, !0, S.toString(r));
  }
  gt(t, r) {
    return this.setLimit("min", t, !1, S.toString(r));
  }
  lte(t, r) {
    return this.setLimit("max", t, !0, S.toString(r));
  }
  lt(t, r) {
    return this.setLimit("max", t, !1, S.toString(r));
  }
  setLimit(t, r, n, a) {
    return new Je({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: r,
          inclusive: n,
          message: S.toString(a)
        }
      ]
    });
  }
  _addCheck(t) {
    return new Je({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: S.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: S.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: S.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: S.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: S.toString(t)
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: S.toString(r)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: S.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: S.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: S.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && D.isInteger(t.value));
  }
  get isFinite() {
    let t = null, r = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(t);
  }
}
Je.create = (e) => new Je({
  checks: [],
  typeName: g.ZodNumber,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...R(e)
});
class ze extends N {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== x.bigint) {
      const s = this._getOrReturnCtx(t);
      return w(s, {
        code: h.invalid_type,
        expected: x.bigint,
        received: s.parsedType
      }), I;
    }
    let n;
    const a = new re();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), a.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), a.dirty()) : s.kind === "multipleOf" ? t.data % s.value !== BigInt(0) && (n = this._getOrReturnCtx(t, n), w(n, {
        code: h.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), a.dirty()) : D.assertNever(s);
    return { status: a.value, value: t.data };
  }
  gte(t, r) {
    return this.setLimit("min", t, !0, S.toString(r));
  }
  gt(t, r) {
    return this.setLimit("min", t, !1, S.toString(r));
  }
  lte(t, r) {
    return this.setLimit("max", t, !0, S.toString(r));
  }
  lt(t, r) {
    return this.setLimit("max", t, !1, S.toString(r));
  }
  setLimit(t, r, n, a) {
    return new ze({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: r,
          inclusive: n,
          message: S.toString(a)
        }
      ]
    });
  }
  _addCheck(t) {
    return new ze({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: S.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: S.toString(t)
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: S.toString(r)
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
ze.create = (e) => {
  var t;
  return new ze({
    checks: [],
    typeName: g.ZodBigInt,
    coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : !1,
    ...R(e)
  });
};
class Ot extends N {
  _parse(t) {
    if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== x.boolean) {
      const n = this._getOrReturnCtx(t);
      return w(n, {
        code: h.invalid_type,
        expected: x.boolean,
        received: n.parsedType
      }), I;
    }
    return oe(t.data);
  }
}
Ot.create = (e) => new Ot({
  typeName: g.ZodBoolean,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...R(e)
});
class rt extends N {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== x.date) {
      const s = this._getOrReturnCtx(t);
      return w(s, {
        code: h.invalid_type,
        expected: x.date,
        received: s.parsedType
      }), I;
    }
    if (isNaN(t.data.getTime())) {
      const s = this._getOrReturnCtx(t);
      return w(s, {
        code: h.invalid_date
      }), I;
    }
    const n = new re();
    let a;
    for (const s of this._def.checks)
      s.kind === "min" ? t.data.getTime() < s.value && (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), n.dirty()) : s.kind === "max" ? t.data.getTime() > s.value && (a = this._getOrReturnCtx(t, a), w(a, {
        code: h.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), n.dirty()) : D.assertNever(s);
    return {
      status: n.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new rt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: S.toString(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: S.toString(r)
    });
  }
  get minDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
}
rt.create = (e) => new rt({
  checks: [],
  coerce: (e == null ? void 0 : e.coerce) || !1,
  typeName: g.ZodDate,
  ...R(e)
});
class xr extends N {
  _parse(t) {
    if (this._getType(t) !== x.symbol) {
      const n = this._getOrReturnCtx(t);
      return w(n, {
        code: h.invalid_type,
        expected: x.symbol,
        received: n.parsedType
      }), I;
    }
    return oe(t.data);
  }
}
xr.create = (e) => new xr({
  typeName: g.ZodSymbol,
  ...R(e)
});
class Pt extends N {
  _parse(t) {
    if (this._getType(t) !== x.undefined) {
      const n = this._getOrReturnCtx(t);
      return w(n, {
        code: h.invalid_type,
        expected: x.undefined,
        received: n.parsedType
      }), I;
    }
    return oe(t.data);
  }
}
Pt.create = (e) => new Pt({
  typeName: g.ZodUndefined,
  ...R(e)
});
class Mt extends N {
  _parse(t) {
    if (this._getType(t) !== x.null) {
      const n = this._getOrReturnCtx(t);
      return w(n, {
        code: h.invalid_type,
        expected: x.null,
        received: n.parsedType
      }), I;
    }
    return oe(t.data);
  }
}
Mt.create = (e) => new Mt({
  typeName: g.ZodNull,
  ...R(e)
});
class pt extends N {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return oe(t.data);
  }
}
pt.create = (e) => new pt({
  typeName: g.ZodAny,
  ...R(e)
});
class tt extends N {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return oe(t.data);
  }
}
tt.create = (e) => new tt({
  typeName: g.ZodUnknown,
  ...R(e)
});
class Ve extends N {
  _parse(t) {
    const r = this._getOrReturnCtx(t);
    return w(r, {
      code: h.invalid_type,
      expected: x.never,
      received: r.parsedType
    }), I;
  }
}
Ve.create = (e) => new Ve({
  typeName: g.ZodNever,
  ...R(e)
});
class Tr extends N {
  _parse(t) {
    if (this._getType(t) !== x.undefined) {
      const n = this._getOrReturnCtx(t);
      return w(n, {
        code: h.invalid_type,
        expected: x.void,
        received: n.parsedType
      }), I;
    }
    return oe(t.data);
  }
}
Tr.create = (e) => new Tr({
  typeName: g.ZodVoid,
  ...R(e)
});
class Te extends N {
  _parse(t) {
    const { ctx: r, status: n } = this._processInputParams(t), a = this._def;
    if (r.parsedType !== x.array)
      return w(r, {
        code: h.invalid_type,
        expected: x.array,
        received: r.parsedType
      }), I;
    if (a.exactLength !== null) {
      const o = r.data.length > a.exactLength.value, i = r.data.length < a.exactLength.value;
      (o || i) && (w(r, {
        code: o ? h.too_big : h.too_small,
        minimum: i ? a.exactLength.value : void 0,
        maximum: o ? a.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: a.exactLength.message
      }), n.dirty());
    }
    if (a.minLength !== null && r.data.length < a.minLength.value && (w(r, {
      code: h.too_small,
      minimum: a.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: a.minLength.message
    }), n.dirty()), a.maxLength !== null && r.data.length > a.maxLength.value && (w(r, {
      code: h.too_big,
      maximum: a.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: a.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((o, i) => a.type._parseAsync(new Ae(r, o, r.path, i)))).then((o) => re.mergeArray(n, o));
    const s = [...r.data].map((o, i) => a.type._parseSync(new Ae(r, o, r.path, i)));
    return re.mergeArray(n, s);
  }
  get element() {
    return this._def.type;
  }
  min(t, r) {
    return new Te({
      ...this._def,
      minLength: { value: t, message: S.toString(r) }
    });
  }
  max(t, r) {
    return new Te({
      ...this._def,
      maxLength: { value: t, message: S.toString(r) }
    });
  }
  length(t, r) {
    return new Te({
      ...this._def,
      exactLength: { value: t, message: S.toString(r) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Te.create = (e, t) => new Te({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ...R(t)
});
function it(e) {
  if (e instanceof J) {
    const t = {};
    for (const r in e.shape) {
      const n = e.shape[r];
      t[r] = Ce.create(it(n));
    }
    return new J({
      ...e._def,
      shape: () => t
    });
  } else return e instanceof Te ? new Te({
    ...e._def,
    type: it(e.element)
  }) : e instanceof Ce ? Ce.create(it(e.unwrap())) : e instanceof He ? He.create(it(e.unwrap())) : e instanceof Re ? Re.create(e.items.map((t) => it(t))) : e;
}
class J extends N {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), r = D.objectKeys(t);
    return this._cached = { shape: t, keys: r };
  }
  _parse(t) {
    if (this._getType(t) !== x.object) {
      const l = this._getOrReturnCtx(t);
      return w(l, {
        code: h.invalid_type,
        expected: x.object,
        received: l.parsedType
      }), I;
    }
    const { status: n, ctx: a } = this._processInputParams(t), { shape: s, keys: o } = this._getCached(), i = [];
    if (!(this._def.catchall instanceof Ve && this._def.unknownKeys === "strip"))
      for (const l in a.data)
        o.includes(l) || i.push(l);
    const u = [];
    for (const l of o) {
      const c = s[l], f = a.data[l];
      u.push({
        key: { status: "valid", value: l },
        value: c._parse(new Ae(a, f, a.path, l)),
        alwaysSet: l in a.data
      });
    }
    if (this._def.catchall instanceof Ve) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const c of i)
          u.push({
            key: { status: "valid", value: c },
            value: { status: "valid", value: a.data[c] }
          });
      else if (l === "strict")
        i.length > 0 && (w(a, {
          code: h.unrecognized_keys,
          keys: i
        }), n.dirty());
      else if (l !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const c of i) {
        const f = a.data[c];
        u.push({
          key: { status: "valid", value: c },
          value: l._parse(
            new Ae(a, f, a.path, c)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: c in a.data
        });
      }
    }
    return a.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const c of u) {
        const f = await c.key, y = await c.value;
        l.push({
          key: f,
          value: y,
          alwaysSet: c.alwaysSet
        });
      }
      return l;
    }).then((l) => re.mergeObjectSync(n, l)) : re.mergeObjectSync(n, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return S.errToObj, new J({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (r, n) => {
          var a, s, o, i;
          const u = (o = (s = (a = this._def).errorMap) === null || s === void 0 ? void 0 : s.call(a, r, n).message) !== null && o !== void 0 ? o : n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (i = S.errToObj(t).message) !== null && i !== void 0 ? i : u
          } : {
            message: u
          };
        }
      } : {}
    });
  }
  strip() {
    return new J({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new J({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(t) {
    return new J({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(t) {
    return new J({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: g.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(t, r) {
    return this.augment({ [t]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(t) {
    return new J({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const r = {};
    return D.objectKeys(t).forEach((n) => {
      t[n] && this.shape[n] && (r[n] = this.shape[n]);
    }), new J({
      ...this._def,
      shape: () => r
    });
  }
  omit(t) {
    const r = {};
    return D.objectKeys(this.shape).forEach((n) => {
      t[n] || (r[n] = this.shape[n]);
    }), new J({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return it(this);
  }
  partial(t) {
    const r = {};
    return D.objectKeys(this.shape).forEach((n) => {
      const a = this.shape[n];
      t && !t[n] ? r[n] = a : r[n] = a.optional();
    }), new J({
      ...this._def,
      shape: () => r
    });
  }
  required(t) {
    const r = {};
    return D.objectKeys(this.shape).forEach((n) => {
      if (t && !t[n])
        r[n] = this.shape[n];
      else {
        let s = this.shape[n];
        for (; s instanceof Ce; )
          s = s._def.innerType;
        r[n] = s;
      }
    }), new J({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Ka(D.objectKeys(this.shape));
  }
}
J.create = (e, t) => new J({
  shape: () => e,
  unknownKeys: "strip",
  catchall: Ve.create(),
  typeName: g.ZodObject,
  ...R(t)
});
J.strictCreate = (e, t) => new J({
  shape: () => e,
  unknownKeys: "strict",
  catchall: Ve.create(),
  typeName: g.ZodObject,
  ...R(t)
});
J.lazycreate = (e, t) => new J({
  shape: e,
  unknownKeys: "strip",
  catchall: Ve.create(),
  typeName: g.ZodObject,
  ...R(t)
});
class jt extends N {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = this._def.options;
    function a(s) {
      for (const i of s)
        if (i.result.status === "valid")
          return i.result;
      for (const i of s)
        if (i.result.status === "dirty")
          return r.common.issues.push(...i.ctx.common.issues), i.result;
      const o = s.map((i) => new he(i.ctx.common.issues));
      return w(r, {
        code: h.invalid_union,
        unionErrors: o
      }), I;
    }
    if (r.common.async)
      return Promise.all(n.map(async (s) => {
        const o = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: r.data,
            path: r.path,
            parent: o
          }),
          ctx: o
        };
      })).then(a);
    {
      let s;
      const o = [];
      for (const u of n) {
        const l = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, c = u._parseSync({
          data: r.data,
          path: r.path,
          parent: l
        });
        if (c.status === "valid")
          return c;
        c.status === "dirty" && !s && (s = { result: c, ctx: l }), l.common.issues.length && o.push(l.common.issues);
      }
      if (s)
        return r.common.issues.push(...s.ctx.common.issues), s.result;
      const i = o.map((u) => new he(u));
      return w(r, {
        code: h.invalid_union,
        unionErrors: i
      }), I;
    }
  }
  get options() {
    return this._def.options;
  }
}
jt.create = (e, t) => new jt({
  options: e,
  typeName: g.ZodUnion,
  ...R(t)
});
const Ze = (e) => e instanceof Zt ? Ze(e.schema) : e instanceof ke ? Ze(e.innerType()) : e instanceof Lt ? [e.value] : e instanceof We ? e.options : e instanceof Ut ? D.objectValues(e.enum) : e instanceof Vt ? Ze(e._def.innerType) : e instanceof Pt ? [void 0] : e instanceof Mt ? [null] : e instanceof Ce ? [void 0, ...Ze(e.unwrap())] : e instanceof He ? [null, ...Ze(e.unwrap())] : e instanceof Nn || e instanceof Bt ? Ze(e.unwrap()) : e instanceof qt ? Ze(e._def.innerType) : [];
class $r extends N {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== x.object)
      return w(r, {
        code: h.invalid_type,
        expected: x.object,
        received: r.parsedType
      }), I;
    const n = this.discriminator, a = r.data[n], s = this.optionsMap.get(a);
    return s ? r.common.async ? s._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : s._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (w(r, {
      code: h.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [n]
    }), I);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(t, r, n) {
    const a = /* @__PURE__ */ new Map();
    for (const s of r) {
      const o = Ze(s.shape[t]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
      for (const i of o) {
        if (a.has(i))
          throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(i)}`);
        a.set(i, s);
      }
    }
    return new $r({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: t,
      options: r,
      optionsMap: a,
      ...R(n)
    });
  }
}
function mn(e, t) {
  const r = Fe(e), n = Fe(t);
  if (e === t)
    return { valid: !0, data: e };
  if (r === x.object && n === x.object) {
    const a = D.objectKeys(t), s = D.objectKeys(e).filter((i) => a.indexOf(i) !== -1), o = { ...e, ...t };
    for (const i of s) {
      const u = mn(e[i], t[i]);
      if (!u.valid)
        return { valid: !1 };
      o[i] = u.data;
    }
    return { valid: !0, data: o };
  } else if (r === x.array && n === x.array) {
    if (e.length !== t.length)
      return { valid: !1 };
    const a = [];
    for (let s = 0; s < e.length; s++) {
      const o = e[s], i = t[s], u = mn(o, i);
      if (!u.valid)
        return { valid: !1 };
      a.push(u.data);
    }
    return { valid: !0, data: a };
  } else return r === x.date && n === x.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class Dt extends N {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t), a = (s, o) => {
      if (fn(s) || fn(o))
        return I;
      const i = mn(s.value, o.value);
      return i.valid ? ((pn(s) || pn(o)) && r.dirty(), { status: r.value, value: i.data }) : (w(n, {
        code: h.invalid_intersection_types
      }), I);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([s, o]) => a(s, o)) : a(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
Dt.create = (e, t, r) => new Dt({
  left: e,
  right: t,
  typeName: g.ZodIntersection,
  ...R(r)
});
class Re extends N {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== x.array)
      return w(n, {
        code: h.invalid_type,
        expected: x.array,
        received: n.parsedType
      }), I;
    if (n.data.length < this._def.items.length)
      return w(n, {
        code: h.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), I;
    !this._def.rest && n.data.length > this._def.items.length && (w(n, {
      code: h.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const s = [...n.data].map((o, i) => {
      const u = this._def.items[i] || this._def.rest;
      return u ? u._parse(new Ae(n, o, n.path, i)) : null;
    }).filter((o) => !!o);
    return n.common.async ? Promise.all(s).then((o) => re.mergeArray(r, o)) : re.mergeArray(r, s);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new Re({
      ...this._def,
      rest: t
    });
  }
}
Re.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Re({
    items: e,
    typeName: g.ZodTuple,
    rest: null,
    ...R(t)
  });
};
class $t extends N {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== x.object)
      return w(n, {
        code: h.invalid_type,
        expected: x.object,
        received: n.parsedType
      }), I;
    const a = [], s = this._def.keyType, o = this._def.valueType;
    for (const i in n.data)
      a.push({
        key: s._parse(new Ae(n, i, n.path, i)),
        value: o._parse(new Ae(n, n.data[i], n.path, i)),
        alwaysSet: i in n.data
      });
    return n.common.async ? re.mergeObjectAsync(r, a) : re.mergeObjectSync(r, a);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, r, n) {
    return r instanceof N ? new $t({
      keyType: t,
      valueType: r,
      typeName: g.ZodRecord,
      ...R(n)
    }) : new $t({
      keyType: xe.create(),
      valueType: t,
      typeName: g.ZodRecord,
      ...R(r)
    });
  }
}
class kr extends N {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== x.map)
      return w(n, {
        code: h.invalid_type,
        expected: x.map,
        received: n.parsedType
      }), I;
    const a = this._def.keyType, s = this._def.valueType, o = [...n.data.entries()].map(([i, u], l) => ({
      key: a._parse(new Ae(n, i, n.path, [l, "key"])),
      value: s._parse(new Ae(n, u, n.path, [l, "value"]))
    }));
    if (n.common.async) {
      const i = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of o) {
          const l = await u.key, c = await u.value;
          if (l.status === "aborted" || c.status === "aborted")
            return I;
          (l.status === "dirty" || c.status === "dirty") && r.dirty(), i.set(l.value, c.value);
        }
        return { status: r.value, value: i };
      });
    } else {
      const i = /* @__PURE__ */ new Map();
      for (const u of o) {
        const l = u.key, c = u.value;
        if (l.status === "aborted" || c.status === "aborted")
          return I;
        (l.status === "dirty" || c.status === "dirty") && r.dirty(), i.set(l.value, c.value);
      }
      return { status: r.value, value: i };
    }
  }
}
kr.create = (e, t, r) => new kr({
  valueType: t,
  keyType: e,
  typeName: g.ZodMap,
  ...R(r)
});
class nt extends N {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== x.set)
      return w(n, {
        code: h.invalid_type,
        expected: x.set,
        received: n.parsedType
      }), I;
    const a = this._def;
    a.minSize !== null && n.data.size < a.minSize.value && (w(n, {
      code: h.too_small,
      minimum: a.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: a.minSize.message
    }), r.dirty()), a.maxSize !== null && n.data.size > a.maxSize.value && (w(n, {
      code: h.too_big,
      maximum: a.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: a.maxSize.message
    }), r.dirty());
    const s = this._def.valueType;
    function o(u) {
      const l = /* @__PURE__ */ new Set();
      for (const c of u) {
        if (c.status === "aborted")
          return I;
        c.status === "dirty" && r.dirty(), l.add(c.value);
      }
      return { status: r.value, value: l };
    }
    const i = [...n.data.values()].map((u, l) => s._parse(new Ae(n, u, n.path, l)));
    return n.common.async ? Promise.all(i).then((u) => o(u)) : o(i);
  }
  min(t, r) {
    return new nt({
      ...this._def,
      minSize: { value: t, message: S.toString(r) }
    });
  }
  max(t, r) {
    return new nt({
      ...this._def,
      maxSize: { value: t, message: S.toString(r) }
    });
  }
  size(t, r) {
    return this.min(t, r).max(t, r);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
nt.create = (e, t) => new nt({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ...R(t)
});
class dt extends N {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== x.function)
      return w(r, {
        code: h.invalid_type,
        expected: x.function,
        received: r.parsedType
      }), I;
    function n(i, u) {
      return br({
        data: i,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          _r(),
          ft
        ].filter((l) => !!l),
        issueData: {
          code: h.invalid_arguments,
          argumentsError: u
        }
      });
    }
    function a(i, u) {
      return br({
        data: i,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          _r(),
          ft
        ].filter((l) => !!l),
        issueData: {
          code: h.invalid_return_type,
          returnTypeError: u
        }
      });
    }
    const s = { errorMap: r.common.contextualErrorMap }, o = r.data;
    if (this._def.returns instanceof mt) {
      const i = this;
      return oe(async function(...u) {
        const l = new he([]), c = await i._def.args.parseAsync(u, s).catch((p) => {
          throw l.addIssue(n(u, p)), l;
        }), f = await Reflect.apply(o, this, c);
        return await i._def.returns._def.type.parseAsync(f, s).catch((p) => {
          throw l.addIssue(a(f, p)), l;
        });
      });
    } else {
      const i = this;
      return oe(function(...u) {
        const l = i._def.args.safeParse(u, s);
        if (!l.success)
          throw new he([n(u, l.error)]);
        const c = Reflect.apply(o, this, l.data), f = i._def.returns.safeParse(c, s);
        if (!f.success)
          throw new he([a(c, f.error)]);
        return f.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new dt({
      ...this._def,
      args: Re.create(t).rest(tt.create())
    });
  }
  returns(t) {
    return new dt({
      ...this._def,
      returns: t
    });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, r, n) {
    return new dt({
      args: t || Re.create([]).rest(tt.create()),
      returns: r || tt.create(),
      typeName: g.ZodFunction,
      ...R(n)
    });
  }
}
class Zt extends N {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Zt.create = (e, t) => new Zt({
  getter: e,
  typeName: g.ZodLazy,
  ...R(t)
});
class Lt extends N {
  _parse(t) {
    if (t.data !== this._def.value) {
      const r = this._getOrReturnCtx(t);
      return w(r, {
        received: r.data,
        code: h.invalid_literal,
        expected: this._def.value
      }), I;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
Lt.create = (e, t) => new Lt({
  value: e,
  typeName: g.ZodLiteral,
  ...R(t)
});
function Ka(e, t) {
  return new We({
    values: e,
    typeName: g.ZodEnum,
    ...R(t)
  });
}
class We extends N {
  constructor() {
    super(...arguments), Tt.set(this, void 0);
  }
  _parse(t) {
    if (typeof t.data != "string") {
      const r = this._getOrReturnCtx(t), n = this._def.values;
      return w(r, {
        expected: D.joinValues(n),
        received: r.parsedType,
        code: h.invalid_type
      }), I;
    }
    if (wr(this, Tt) || za(this, Tt, new Set(this._def.values)), !wr(this, Tt).has(t.data)) {
      const r = this._getOrReturnCtx(t), n = this._def.values;
      return w(r, {
        received: r.data,
        code: h.invalid_enum_value,
        options: n
      }), I;
    }
    return oe(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Values() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  extract(t, r = this._def) {
    return We.create(t, {
      ...this._def,
      ...r
    });
  }
  exclude(t, r = this._def) {
    return We.create(this.options.filter((n) => !t.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
Tt = /* @__PURE__ */ new WeakMap();
We.create = Ka;
class Ut extends N {
  constructor() {
    super(...arguments), kt.set(this, void 0);
  }
  _parse(t) {
    const r = D.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(t);
    if (n.parsedType !== x.string && n.parsedType !== x.number) {
      const a = D.objectValues(r);
      return w(n, {
        expected: D.joinValues(a),
        received: n.parsedType,
        code: h.invalid_type
      }), I;
    }
    if (wr(this, kt) || za(this, kt, new Set(D.getValidEnumValues(this._def.values))), !wr(this, kt).has(t.data)) {
      const a = D.objectValues(r);
      return w(n, {
        received: n.data,
        code: h.invalid_enum_value,
        options: a
      }), I;
    }
    return oe(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
kt = /* @__PURE__ */ new WeakMap();
Ut.create = (e, t) => new Ut({
  values: e,
  typeName: g.ZodNativeEnum,
  ...R(t)
});
class mt extends N {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== x.promise && r.common.async === !1)
      return w(r, {
        code: h.invalid_type,
        expected: x.promise,
        received: r.parsedType
      }), I;
    const n = r.parsedType === x.promise ? r.data : Promise.resolve(r.data);
    return oe(n.then((a) => this._def.type.parseAsync(a, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
mt.create = (e, t) => new mt({
  type: e,
  typeName: g.ZodPromise,
  ...R(t)
});
class ke extends N {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t), a = this._def.effect || null, s = {
      addIssue: (o) => {
        w(n, o), o.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), a.type === "preprocess") {
      const o = a.transform(n.data, s);
      if (n.common.async)
        return Promise.resolve(o).then(async (i) => {
          if (r.value === "aborted")
            return I;
          const u = await this._def.schema._parseAsync({
            data: i,
            path: n.path,
            parent: n
          });
          return u.status === "aborted" ? I : u.status === "dirty" || r.value === "dirty" ? ct(u.value) : u;
        });
      {
        if (r.value === "aborted")
          return I;
        const i = this._def.schema._parseSync({
          data: o,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? I : i.status === "dirty" || r.value === "dirty" ? ct(i.value) : i;
      }
    }
    if (a.type === "refinement") {
      const o = (i) => {
        const u = a.refinement(i, s);
        if (n.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return i;
      };
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? I : (i.status === "dirty" && r.dirty(), o(i.value), { status: r.value, value: i.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => i.status === "aborted" ? I : (i.status === "dirty" && r.dirty(), o(i.value).then(() => ({ status: r.value, value: i.value }))));
    }
    if (a.type === "transform")
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!Rt(o))
          return o;
        const i = a.transform(o.value, s);
        if (i instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: i };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => Rt(o) ? Promise.resolve(a.transform(o.value, s)).then((i) => ({ status: r.value, value: i })) : o);
    D.assertNever(a);
  }
}
ke.create = (e, t, r) => new ke({
  schema: e,
  typeName: g.ZodEffects,
  effect: t,
  ...R(r)
});
ke.createWithPreprocess = (e, t, r) => new ke({
  schema: t,
  effect: { type: "preprocess", transform: e },
  typeName: g.ZodEffects,
  ...R(r)
});
class Ce extends N {
  _parse(t) {
    return this._getType(t) === x.undefined ? oe(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ce.create = (e, t) => new Ce({
  innerType: e,
  typeName: g.ZodOptional,
  ...R(t)
});
class He extends N {
  _parse(t) {
    return this._getType(t) === x.null ? oe(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
He.create = (e, t) => new He({
  innerType: e,
  typeName: g.ZodNullable,
  ...R(t)
});
class Vt extends N {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    let n = r.data;
    return r.parsedType === x.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Vt.create = (e, t) => new Vt({
  innerType: e,
  typeName: g.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...R(t)
});
class qt extends N {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, a = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return Nt(a) ? a.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new he(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new he(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
qt.create = (e, t) => new qt({
  innerType: e,
  typeName: g.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...R(t)
});
class Sr extends N {
  _parse(t) {
    if (this._getType(t) !== x.nan) {
      const n = this._getOrReturnCtx(t);
      return w(n, {
        code: h.invalid_type,
        expected: x.nan,
        received: n.parsedType
      }), I;
    }
    return { status: "valid", value: t.data };
  }
}
Sr.create = (e) => new Sr({
  typeName: g.ZodNaN,
  ...R(e)
});
const pi = Symbol("zod_brand");
class Nn extends N {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = r.data;
    return this._def.type._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class cr extends N {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? I : s.status === "dirty" ? (r.dirty(), ct(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const a = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return a.status === "aborted" ? I : a.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: a.value
      }) : this._def.out._parseSync({
        data: a.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(t, r) {
    return new cr({
      in: t,
      out: r,
      typeName: g.ZodPipeline
    });
  }
}
class Bt extends N {
  _parse(t) {
    const r = this._def.innerType._parse(t), n = (a) => (Rt(a) && (a.value = Object.freeze(a.value)), a);
    return Nt(r) ? r.then((a) => n(a)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Bt.create = (e, t) => new Bt({
  innerType: e,
  typeName: g.ZodReadonly,
  ...R(t)
});
function Ga(e, t = {}, r) {
  return e ? pt.create().superRefine((n, a) => {
    var s, o;
    if (!e(n)) {
      const i = typeof t == "function" ? t(n) : typeof t == "string" ? { message: t } : t, u = (o = (s = i.fatal) !== null && s !== void 0 ? s : r) !== null && o !== void 0 ? o : !0, l = typeof i == "string" ? { message: i } : i;
      a.addIssue({ code: "custom", ...l, fatal: u });
    }
  }) : pt.create();
}
const mi = {
  object: J.lazycreate
};
var g;
(function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(g || (g = {}));
const hi = (e, t = {
  message: `Input not instance of ${e.name}`
}) => Ga((r) => r instanceof e, t), Xa = xe.create, Qa = Je.create, gi = Sr.create, yi = ze.create, es = Ot.create, vi = rt.create, _i = xr.create, bi = Pt.create, wi = Mt.create, xi = pt.create, Ti = tt.create, ki = Ve.create, Si = Tr.create, Ei = Te.create, Ii = J.create, Ci = J.strictCreate, Ai = jt.create, Ri = $r.create, Ni = Dt.create, Oi = Re.create, Pi = $t.create, Mi = kr.create, ji = nt.create, Di = dt.create, $i = Zt.create, Zi = Lt.create, Li = We.create, Ui = Ut.create, Vi = mt.create, Yn = ke.create, qi = Ce.create, Bi = He.create, Fi = ke.createWithPreprocess, Ji = cr.create, zi = () => Xa().optional(), Wi = () => Qa().optional(), Hi = () => es().optional(), Yi = {
  string: (e) => xe.create({ ...e, coerce: !0 }),
  number: (e) => Je.create({ ...e, coerce: !0 }),
  boolean: (e) => Ot.create({
    ...e,
    coerce: !0
  }),
  bigint: (e) => ze.create({ ...e, coerce: !0 }),
  date: (e) => rt.create({ ...e, coerce: !0 })
}, Ki = I;
var d = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: ft,
  setErrorMap: Ko,
  getErrorMap: _r,
  makeIssue: br,
  EMPTY_PATH: Go,
  addIssueToContext: w,
  ParseStatus: re,
  INVALID: I,
  DIRTY: ct,
  OK: oe,
  isAborted: fn,
  isDirty: pn,
  isValid: Rt,
  isAsync: Nt,
  get util() {
    return D;
  },
  get objectUtil() {
    return dn;
  },
  ZodParsedType: x,
  getParsedType: Fe,
  ZodType: N,
  datetimeRegex: Ya,
  ZodString: xe,
  ZodNumber: Je,
  ZodBigInt: ze,
  ZodBoolean: Ot,
  ZodDate: rt,
  ZodSymbol: xr,
  ZodUndefined: Pt,
  ZodNull: Mt,
  ZodAny: pt,
  ZodUnknown: tt,
  ZodNever: Ve,
  ZodVoid: Tr,
  ZodArray: Te,
  ZodObject: J,
  ZodUnion: jt,
  ZodDiscriminatedUnion: $r,
  ZodIntersection: Dt,
  ZodTuple: Re,
  ZodRecord: $t,
  ZodMap: kr,
  ZodSet: nt,
  ZodFunction: dt,
  ZodLazy: Zt,
  ZodLiteral: Lt,
  ZodEnum: We,
  ZodNativeEnum: Ut,
  ZodPromise: mt,
  ZodEffects: ke,
  ZodTransformer: ke,
  ZodOptional: Ce,
  ZodNullable: He,
  ZodDefault: Vt,
  ZodCatch: qt,
  ZodNaN: Sr,
  BRAND: pi,
  ZodBranded: Nn,
  ZodPipeline: cr,
  ZodReadonly: Bt,
  custom: Ga,
  Schema: N,
  ZodSchema: N,
  late: mi,
  get ZodFirstPartyTypeKind() {
    return g;
  },
  coerce: Yi,
  any: xi,
  array: Ei,
  bigint: yi,
  boolean: es,
  date: vi,
  discriminatedUnion: Ri,
  effect: Yn,
  enum: Li,
  function: Di,
  instanceof: hi,
  intersection: Ni,
  lazy: $i,
  literal: Zi,
  map: Mi,
  nan: gi,
  nativeEnum: Ui,
  never: ki,
  null: wi,
  nullable: Bi,
  number: Qa,
  object: Ii,
  oboolean: Hi,
  onumber: Wi,
  optional: qi,
  ostring: zi,
  pipeline: Ji,
  preprocess: Fi,
  promise: Vi,
  record: Pi,
  set: ji,
  strictObject: Ci,
  string: Xa,
  symbol: _i,
  transformer: Yn,
  tuple: Oi,
  undefined: bi,
  union: Ai,
  unknown: Ti,
  void: Si,
  NEVER: Ki,
  ZodIssueCode: h,
  quotelessJson: Yo,
  ZodError: he
});
function Gi() {
  return {};
}
function Xi(e, t) {
  var n, a, s;
  const r = {
    type: "array"
  };
  return (n = e.type) != null && n._def && ((s = (a = e.type) == null ? void 0 : a._def) == null ? void 0 : s.typeName) !== g.ZodAny && (r.items = Z(e.type._def, {
    ...t,
    currentPath: [...t.currentPath, "items"]
  })), e.minLength && V(r, "minItems", e.minLength.value, e.minLength.message, t), e.maxLength && V(r, "maxItems", e.maxLength.value, e.maxLength.message, t), e.exactLength && (V(r, "minItems", e.exactLength.value, e.exactLength.message, t), V(r, "maxItems", e.exactLength.value, e.exactLength.message, t)), r;
}
function Qi(e, t) {
  const r = {
    type: "integer",
    format: "int64"
  };
  if (!e.checks)
    return r;
  for (const n of e.checks)
    switch (n.kind) {
      case "min":
        t.target === "jsonSchema7" ? n.inclusive ? V(r, "minimum", n.value, n.message, t) : V(r, "exclusiveMinimum", n.value, n.message, t) : (n.inclusive || (r.exclusiveMinimum = !0), V(r, "minimum", n.value, n.message, t));
        break;
      case "max":
        t.target === "jsonSchema7" ? n.inclusive ? V(r, "maximum", n.value, n.message, t) : V(r, "exclusiveMaximum", n.value, n.message, t) : (n.inclusive || (r.exclusiveMaximum = !0), V(r, "maximum", n.value, n.message, t));
        break;
      case "multipleOf":
        V(r, "multipleOf", n.value, n.message, t);
        break;
    }
  return r;
}
function el() {
  return {
    type: "boolean"
  };
}
function ts(e, t) {
  return Z(e.type._def, t);
}
const tl = (e, t) => Z(e.innerType._def, t);
function rs(e, t, r) {
  const n = r ?? t.dateStrategy;
  if (Array.isArray(n))
    return {
      anyOf: n.map((a, s) => rs(e, t, a))
    };
  switch (n) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return rl(e, t);
  }
}
const rl = (e, t) => {
  const r = {
    type: "integer",
    format: "unix-time"
  };
  if (t.target === "openApi3")
    return r;
  for (const n of e.checks)
    switch (n.kind) {
      case "min":
        V(
          r,
          "minimum",
          n.value,
          // This is in milliseconds
          n.message,
          t
        );
        break;
      case "max":
        V(
          r,
          "maximum",
          n.value,
          // This is in milliseconds
          n.message,
          t
        );
        break;
    }
  return r;
};
function nl(e, t) {
  return {
    ...Z(e.innerType._def, t),
    default: e.defaultValue()
  };
}
function al(e, t) {
  return t.effectStrategy === "input" ? Z(e.schema._def, t) : {};
}
function sl(e) {
  return {
    type: "string",
    enum: e.values
  };
}
const ol = (e) => "type" in e && e.type === "string" ? !1 : "allOf" in e;
function il(e, t) {
  const r = [
    Z(e.left._def, {
      ...t,
      currentPath: [...t.currentPath, "allOf", "0"]
    }),
    Z(e.right._def, {
      ...t,
      currentPath: [...t.currentPath, "allOf", "1"]
    })
  ].filter((s) => !!s);
  let n = t.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const a = [];
  return r.forEach((s) => {
    if (ol(s))
      a.push(...s.allOf), s.unevaluatedProperties === void 0 && (n = void 0);
    else {
      let o = s;
      if ("additionalProperties" in s && s.additionalProperties === !1) {
        const { additionalProperties: i, ...u } = s;
        o = u;
      } else
        n = void 0;
      a.push(o);
    }
  }), a.length ? {
    allOf: a,
    ...n
  } : void 0;
}
function ll(e, t) {
  const r = typeof e.value;
  return r !== "bigint" && r !== "number" && r !== "boolean" && r !== "string" ? {
    type: Array.isArray(e.value) ? "array" : "object"
  } : t.target === "openApi3" ? {
    type: r === "bigint" ? "integer" : r,
    enum: [e.value]
  } : {
    type: r === "bigint" ? "integer" : r,
    const: e.value
  };
}
let Fr;
const Xe = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => (Fr === void 0 && (Fr = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), Fr),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/
};
function ns(e, t) {
  const r = {
    type: "string"
  };
  function n(a) {
    return t.patternStrategy === "escape" ? ul(a) : a;
  }
  if (e.checks)
    for (const a of e.checks)
      switch (a.kind) {
        case "min":
          V(r, "minLength", typeof r.minLength == "number" ? Math.max(r.minLength, a.value) : a.value, a.message, t);
          break;
        case "max":
          V(r, "maxLength", typeof r.maxLength == "number" ? Math.min(r.maxLength, a.value) : a.value, a.message, t);
          break;
        case "email":
          switch (t.emailStrategy) {
            case "format:email":
              _e(r, "email", a.message, t);
              break;
            case "format:idn-email":
              _e(r, "idn-email", a.message, t);
              break;
            case "pattern:zod":
              be(r, Xe.email, a.message, t);
              break;
          }
          break;
        case "url":
          _e(r, "uri", a.message, t);
          break;
        case "uuid":
          _e(r, "uuid", a.message, t);
          break;
        case "regex":
          be(r, a.regex, a.message, t);
          break;
        case "cuid":
          be(r, Xe.cuid, a.message, t);
          break;
        case "cuid2":
          be(r, Xe.cuid2, a.message, t);
          break;
        case "startsWith":
          be(r, RegExp(`^${n(a.value)}`), a.message, t);
          break;
        case "endsWith":
          be(r, RegExp(`${n(a.value)}$`), a.message, t);
          break;
        case "datetime":
          _e(r, "date-time", a.message, t);
          break;
        case "date":
          _e(r, "date", a.message, t);
          break;
        case "time":
          _e(r, "time", a.message, t);
          break;
        case "duration":
          _e(r, "duration", a.message, t);
          break;
        case "length":
          V(r, "minLength", typeof r.minLength == "number" ? Math.max(r.minLength, a.value) : a.value, a.message, t), V(r, "maxLength", typeof r.maxLength == "number" ? Math.min(r.maxLength, a.value) : a.value, a.message, t);
          break;
        case "includes": {
          be(r, RegExp(n(a.value)), a.message, t);
          break;
        }
        case "ip": {
          a.version !== "v6" && _e(r, "ipv4", a.message, t), a.version !== "v4" && _e(r, "ipv6", a.message, t);
          break;
        }
        case "emoji":
          be(r, Xe.emoji, a.message, t);
          break;
        case "ulid": {
          be(r, Xe.ulid, a.message, t);
          break;
        }
        case "base64": {
          switch (t.base64Strategy) {
            case "format:binary": {
              _e(r, "binary", a.message, t);
              break;
            }
            case "contentEncoding:base64": {
              V(r, "contentEncoding", "base64", a.message, t);
              break;
            }
            case "pattern:zod": {
              be(r, Xe.base64, a.message, t);
              break;
            }
          }
          break;
        }
        case "nanoid":
          be(r, Xe.nanoid, a.message, t);
      }
  return r;
}
const ul = (e) => Array.from(e).map((t) => /[a-zA-Z0-9]/.test(t) ? t : `\\${t}`).join(""), _e = (e, t, r, n) => {
  var a;
  e.format || (a = e.anyOf) != null && a.some((s) => s.format) ? (e.anyOf || (e.anyOf = []), e.format && (e.anyOf.push({
    format: e.format,
    ...e.errorMessage && n.errorMessages && {
      errorMessage: { format: e.errorMessage.format }
    }
  }), delete e.format, e.errorMessage && (delete e.errorMessage.format, Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)), e.anyOf.push({
    format: t,
    ...r && n.errorMessages && { errorMessage: { format: r } }
  })) : V(e, "format", t, r, n);
}, be = (e, t, r, n) => {
  var a;
  e.pattern || (a = e.allOf) != null && a.some((s) => s.pattern) ? (e.allOf || (e.allOf = []), e.pattern && (e.allOf.push({
    pattern: e.pattern,
    ...e.errorMessage && n.errorMessages && {
      errorMessage: { pattern: e.errorMessage.pattern }
    }
  }), delete e.pattern, e.errorMessage && (delete e.errorMessage.pattern, Object.keys(e.errorMessage).length === 0 && delete e.errorMessage)), e.allOf.push({
    pattern: Kn(t, n),
    ...r && n.errorMessages && { errorMessage: { pattern: r } }
  })) : V(e, "pattern", Kn(t, n), r, n);
}, Kn = (e, t) => {
  var l;
  const r = typeof e == "function" ? e() : e;
  if (!t.applyRegexFlags || !r.flags)
    return r.source;
  const n = {
    i: r.flags.includes("i"),
    m: r.flags.includes("m"),
    s: r.flags.includes("s")
    // `.` matches newlines
  }, a = n.i ? r.source.toLowerCase() : r.source;
  let s = "", o = !1, i = !1, u = !1;
  for (let c = 0; c < a.length; c++) {
    if (o) {
      s += a[c], o = !1;
      continue;
    }
    if (n.i) {
      if (i) {
        if (a[c].match(/[a-z]/)) {
          u ? (s += a[c], s += `${a[c - 2]}-${a[c]}`.toUpperCase(), u = !1) : a[c + 1] === "-" && ((l = a[c + 2]) != null && l.match(/[a-z]/)) ? (s += a[c], u = !0) : s += `${a[c]}${a[c].toUpperCase()}`;
          continue;
        }
      } else if (a[c].match(/[a-z]/)) {
        s += `[${a[c]}${a[c].toUpperCase()}]`;
        continue;
      }
    }
    if (n.m) {
      if (a[c] === "^") {
        s += `(^|(?<=[\r
]))`;
        continue;
      } else if (a[c] === "$") {
        s += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (n.s && a[c] === ".") {
      s += i ? `${a[c]}\r
` : `[${a[c]}\r
]`;
      continue;
    }
    s += a[c], a[c] === "\\" ? o = !0 : i && a[c] === "]" ? i = !1 : !i && a[c] === "[" && (i = !0);
  }
  try {
    const c = new RegExp(s);
  } catch {
    return console.warn(`Could not convert regex pattern at ${t.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), r.source;
  }
  return s;
};
function as(e, t) {
  var n, a, s, o, i, u;
  if (t.target === "openApi3" && ((n = e.keyType) == null ? void 0 : n._def.typeName) === g.ZodEnum)
    return {
      type: "object",
      required: e.keyType._def.values,
      properties: e.keyType._def.values.reduce((l, c) => ({
        ...l,
        [c]: Z(e.valueType._def, {
          ...t,
          currentPath: [...t.currentPath, "properties", c]
        }) ?? {}
      }), {}),
      additionalProperties: !1
    };
  const r = {
    type: "object",
    additionalProperties: Z(e.valueType._def, {
      ...t,
      currentPath: [...t.currentPath, "additionalProperties"]
    }) ?? {}
  };
  if (t.target === "openApi3")
    return r;
  if (((a = e.keyType) == null ? void 0 : a._def.typeName) === g.ZodString && ((s = e.keyType._def.checks) != null && s.length)) {
    const { type: l, ...c } = ns(e.keyType._def, t);
    return {
      ...r,
      propertyNames: c
    };
  } else {
    if (((o = e.keyType) == null ? void 0 : o._def.typeName) === g.ZodEnum)
      return {
        ...r,
        propertyNames: {
          enum: e.keyType._def.values
        }
      };
    if (((i = e.keyType) == null ? void 0 : i._def.typeName) === g.ZodBranded && e.keyType._def.type._def.typeName === g.ZodString && ((u = e.keyType._def.type._def.checks) != null && u.length)) {
      const { type: l, ...c } = ts(e.keyType._def, t);
      return {
        ...r,
        propertyNames: c
      };
    }
  }
  return r;
}
function cl(e, t) {
  if (t.mapStrategy === "record")
    return as(e, t);
  const r = Z(e.keyType._def, {
    ...t,
    currentPath: [...t.currentPath, "items", "items", "0"]
  }) || {}, n = Z(e.valueType._def, {
    ...t,
    currentPath: [...t.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [r, n],
      minItems: 2,
      maxItems: 2
    }
  };
}
function dl(e) {
  const t = e.values, n = Object.keys(e.values).filter((s) => typeof t[t[s]] != "number").map((s) => t[s]), a = Array.from(new Set(n.map((s) => typeof s)));
  return {
    type: a.length === 1 ? a[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: n
  };
}
function fl() {
  return {
    not: {}
  };
}
function pl(e) {
  return e.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const Er = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function ml(e, t) {
  if (t.target === "openApi3")
    return Gn(e, t);
  const r = e.options instanceof Map ? Array.from(e.options.values()) : e.options;
  if (r.every((n) => n._def.typeName in Er && (!n._def.checks || !n._def.checks.length))) {
    const n = r.reduce((a, s) => {
      const o = Er[s._def.typeName];
      return o && !a.includes(o) ? [...a, o] : a;
    }, []);
    return {
      type: n.length > 1 ? n : n[0]
    };
  } else if (r.every((n) => n._def.typeName === "ZodLiteral" && !n.description)) {
    const n = r.reduce((a, s) => {
      const o = typeof s._def.value;
      switch (o) {
        case "string":
        case "number":
        case "boolean":
          return [...a, o];
        case "bigint":
          return [...a, "integer"];
        case "object":
          if (s._def.value === null)
            return [...a, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return a;
      }
    }, []);
    if (n.length === r.length) {
      const a = n.filter((s, o, i) => i.indexOf(s) === o);
      return {
        type: a.length > 1 ? a : a[0],
        enum: r.reduce((s, o) => s.includes(o._def.value) ? s : [...s, o._def.value], [])
      };
    }
  } else if (r.every((n) => n._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: r.reduce((n, a) => [
        ...n,
        ...a._def.values.filter((s) => !n.includes(s))
      ], [])
    };
  return Gn(e, t);
}
const Gn = (e, t) => {
  const r = (e.options instanceof Map ? Array.from(e.options.values()) : e.options).map((n, a) => Z(n._def, {
    ...t,
    currentPath: [...t.currentPath, "anyOf", `${a}`]
  })).filter((n) => !!n && (!t.strictUnions || typeof n == "object" && Object.keys(n).length > 0));
  return r.length ? { anyOf: r } : void 0;
};
function hl(e, t) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(e.innerType._def.typeName) && (!e.innerType._def.checks || !e.innerType._def.checks.length))
    return t.target === "openApi3" ? {
      type: Er[e.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        Er[e.innerType._def.typeName],
        "null"
      ]
    };
  if (t.target === "openApi3") {
    const n = Z(e.innerType._def, {
      ...t,
      currentPath: [...t.currentPath]
    });
    return n && "$ref" in n ? { allOf: [n], nullable: !0 } : n && { ...n, nullable: !0 };
  }
  const r = Z(e.innerType._def, {
    ...t,
    currentPath: [...t.currentPath, "anyOf", "0"]
  });
  return r && { anyOf: [r, { type: "null" }] };
}
function gl(e, t) {
  const r = {
    type: "number"
  };
  if (!e.checks)
    return r;
  for (const n of e.checks)
    switch (n.kind) {
      case "int":
        r.type = "integer", Fa(r, "type", n.message, t);
        break;
      case "min":
        t.target === "jsonSchema7" ? n.inclusive ? V(r, "minimum", n.value, n.message, t) : V(r, "exclusiveMinimum", n.value, n.message, t) : (n.inclusive || (r.exclusiveMinimum = !0), V(r, "minimum", n.value, n.message, t));
        break;
      case "max":
        t.target === "jsonSchema7" ? n.inclusive ? V(r, "maximum", n.value, n.message, t) : V(r, "exclusiveMaximum", n.value, n.message, t) : (n.inclusive || (r.exclusiveMaximum = !0), V(r, "maximum", n.value, n.message, t));
        break;
      case "multipleOf":
        V(r, "multipleOf", n.value, n.message, t);
        break;
    }
  return r;
}
function yl(e, t) {
  return t.removeAdditionalStrategy === "strict" ? e.catchall._def.typeName === "ZodNever" ? e.unknownKeys !== "strict" : Z(e.catchall._def, {
    ...t,
    currentPath: [...t.currentPath, "additionalProperties"]
  }) ?? !0 : e.catchall._def.typeName === "ZodNever" ? e.unknownKeys === "passthrough" : Z(e.catchall._def, {
    ...t,
    currentPath: [...t.currentPath, "additionalProperties"]
  }) ?? !0;
}
function vl(e, t) {
  const r = {
    type: "object",
    ...Object.entries(e.shape()).reduce((n, [a, s]) => {
      if (s === void 0 || s._def === void 0)
        return n;
      const o = Z(s._def, {
        ...t,
        currentPath: [...t.currentPath, "properties", a],
        propertyPath: [...t.currentPath, "properties", a]
      });
      return o === void 0 ? n : {
        properties: { ...n.properties, [a]: o },
        required: s.isOptional() ? n.required : [...n.required, a]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: yl(e, t)
  };
  return r.required.length || delete r.required, r;
}
const _l = (e, t) => {
  var n;
  if (t.currentPath.toString() === ((n = t.propertyPath) == null ? void 0 : n.toString()))
    return Z(e.innerType._def, t);
  const r = Z(e.innerType._def, {
    ...t,
    currentPath: [...t.currentPath, "anyOf", "1"]
  });
  return r ? {
    anyOf: [
      {
        not: {}
      },
      r
    ]
  } : {};
}, bl = (e, t) => {
  if (t.pipeStrategy === "input")
    return Z(e.in._def, t);
  if (t.pipeStrategy === "output")
    return Z(e.out._def, t);
  const r = Z(e.in._def, {
    ...t,
    currentPath: [...t.currentPath, "allOf", "0"]
  }), n = Z(e.out._def, {
    ...t,
    currentPath: [...t.currentPath, "allOf", r ? "1" : "0"]
  });
  return {
    allOf: [r, n].filter((a) => a !== void 0)
  };
};
function wl(e, t) {
  return Z(e.type._def, t);
}
function xl(e, t) {
  const n = {
    type: "array",
    uniqueItems: !0,
    items: Z(e.valueType._def, {
      ...t,
      currentPath: [...t.currentPath, "items"]
    })
  };
  return e.minSize && V(n, "minItems", e.minSize.value, e.minSize.message, t), e.maxSize && V(n, "maxItems", e.maxSize.value, e.maxSize.message, t), n;
}
function Tl(e, t) {
  return e.rest ? {
    type: "array",
    minItems: e.items.length,
    items: e.items.map((r, n) => Z(r._def, {
      ...t,
      currentPath: [...t.currentPath, "items", `${n}`]
    })).reduce((r, n) => n === void 0 ? r : [...r, n], []),
    additionalItems: Z(e.rest._def, {
      ...t,
      currentPath: [...t.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: e.items.length,
    maxItems: e.items.length,
    items: e.items.map((r, n) => Z(r._def, {
      ...t,
      currentPath: [...t.currentPath, "items", `${n}`]
    })).reduce((r, n) => n === void 0 ? r : [...r, n], [])
  };
}
function kl() {
  return {
    not: {}
  };
}
function Sl() {
  return {};
}
const El = (e, t) => Z(e.innerType._def, t);
function Z(e, t, r = !1) {
  var o;
  const n = t.seen.get(e);
  if (t.override) {
    const i = (o = t.override) == null ? void 0 : o.call(t, e, t, n, r);
    if (i !== Jo)
      return i;
  }
  if (n && !r) {
    const i = Il(n, t);
    if (i !== void 0)
      return i;
  }
  const a = { def: e, path: t.currentPath, jsonSchema: void 0 };
  t.seen.set(e, a);
  const s = Al(e, e.typeName, t);
  return s && Rl(e, t, s), a.jsonSchema = s, s;
}
const Il = (e, t) => {
  switch (t.$refStrategy) {
    case "root":
      return { $ref: e.path.join("/") };
    case "relative":
      return { $ref: Cl(t.currentPath, e.path) };
    case "none":
    case "seen":
      return e.path.length < t.currentPath.length && e.path.every((r, n) => t.currentPath[n] === r) ? (console.warn(`Recursive reference detected at ${t.currentPath.join("/")}! Defaulting to any`), {}) : t.$refStrategy === "seen" ? {} : void 0;
  }
}, Cl = (e, t) => {
  let r = 0;
  for (; r < e.length && r < t.length && e[r] === t[r]; r++)
    ;
  return [(e.length - r).toString(), ...t.slice(r)].join("/");
}, Al = (e, t, r) => {
  switch (t) {
    case g.ZodString:
      return ns(e, r);
    case g.ZodNumber:
      return gl(e, r);
    case g.ZodObject:
      return vl(e, r);
    case g.ZodBigInt:
      return Qi(e, r);
    case g.ZodBoolean:
      return el();
    case g.ZodDate:
      return rs(e, r);
    case g.ZodUndefined:
      return kl();
    case g.ZodNull:
      return pl(r);
    case g.ZodArray:
      return Xi(e, r);
    case g.ZodUnion:
    case g.ZodDiscriminatedUnion:
      return ml(e, r);
    case g.ZodIntersection:
      return il(e, r);
    case g.ZodTuple:
      return Tl(e, r);
    case g.ZodRecord:
      return as(e, r);
    case g.ZodLiteral:
      return ll(e, r);
    case g.ZodEnum:
      return sl(e);
    case g.ZodNativeEnum:
      return dl(e);
    case g.ZodNullable:
      return hl(e, r);
    case g.ZodOptional:
      return _l(e, r);
    case g.ZodMap:
      return cl(e, r);
    case g.ZodSet:
      return xl(e, r);
    case g.ZodLazy:
      return Z(e.getter()._def, r);
    case g.ZodPromise:
      return wl(e, r);
    case g.ZodNaN:
    case g.ZodNever:
      return fl();
    case g.ZodEffects:
      return al(e, r);
    case g.ZodAny:
      return Gi();
    case g.ZodUnknown:
      return Sl();
    case g.ZodDefault:
      return nl(e, r);
    case g.ZodBranded:
      return ts(e, r);
    case g.ZodReadonly:
      return El(e, r);
    case g.ZodCatch:
      return tl(e, r);
    case g.ZodPipeline:
      return bl(e, r);
    case g.ZodFunction:
    case g.ZodVoid:
    case g.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((n) => {
      })();
  }
}, Rl = (e, t, r) => (e.description && (r.description = e.description, t.markdownDescription && (r.markdownDescription = e.description)), r), Nl = (e, t) => {
  const r = Ho(t), n = void 0, a = t == null ? void 0 : t.name, s = Z(
    e._def,
    r,
    !1
  ) ?? {}, o = a === void 0 ? n ? {
    ...s,
    [r.definitionPath]: n
  } : s : {
    $ref: [
      ...r.$refStrategy === "relative" ? [] : r.basePath,
      r.definitionPath,
      a
    ].join("/"),
    [r.definitionPath]: {
      ...n,
      [a]: s
    }
  };
  return r.target === "jsonSchema7" ? o.$schema = "http://json-schema.org/draft-07/schema#" : r.target === "jsonSchema2019-09" && (o.$schema = "https://json-schema.org/draft/2019-09/schema#"), o;
};
function Ol(e) {
  const t = ["ROOT"];
  let r = -1, n = null;
  function a(u, l, c) {
    switch (u) {
      case '"': {
        r = l, t.pop(), t.push(c), t.push("INSIDE_STRING");
        break;
      }
      case "f":
      case "t":
      case "n": {
        r = l, n = l, t.pop(), t.push(c), t.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        t.pop(), t.push(c), t.push("INSIDE_NUMBER");
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        r = l, t.pop(), t.push(c), t.push("INSIDE_NUMBER");
        break;
      }
      case "{": {
        r = l, t.pop(), t.push(c), t.push("INSIDE_OBJECT_START");
        break;
      }
      case "[": {
        r = l, t.pop(), t.push(c), t.push("INSIDE_ARRAY_START");
        break;
      }
    }
  }
  function s(u, l) {
    switch (u) {
      case ",": {
        t.pop(), t.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        r = l, t.pop();
        break;
      }
    }
  }
  function o(u, l) {
    switch (u) {
      case ",": {
        t.pop(), t.push("INSIDE_ARRAY_AFTER_COMMA");
        break;
      }
      case "]": {
        r = l, t.pop();
        break;
      }
    }
  }
  for (let u = 0; u < e.length; u++) {
    const l = e[u];
    switch (t[t.length - 1]) {
      case "ROOT":
        a(l, u, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (l) {
          case '"': {
            t.pop(), t.push("INSIDE_OBJECT_KEY");
            break;
          }
          case "}": {
            r = u, t.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (l) {
          case '"': {
            t.pop(), t.push("INSIDE_OBJECT_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (l) {
          case '"': {
            t.pop(), t.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (l) {
          case ":": {
            t.pop(), t.push("INSIDE_OBJECT_BEFORE_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        a(l, u, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        s(l, u);
        break;
      }
      case "INSIDE_STRING": {
        switch (l) {
          case '"': {
            t.pop(), r = u;
            break;
          }
          case "\\": {
            t.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            r = u;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (l) {
          case "]": {
            r = u, t.pop();
            break;
          }
          default: {
            r = u, a(l, u, "INSIDE_ARRAY_AFTER_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (l) {
          case ",": {
            t.pop(), t.push("INSIDE_ARRAY_AFTER_COMMA");
            break;
          }
          case "]": {
            r = u, t.pop();
            break;
          }
          default: {
            r = u;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        a(l, u, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        t.pop(), r = u;
        break;
      }
      case "INSIDE_NUMBER": {
        switch (l) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            r = u;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            t.pop(), t[t.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && o(l, u), t[t.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && s(l, u);
            break;
          }
          case "}": {
            t.pop(), t[t.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && s(l, u);
            break;
          }
          case "]": {
            t.pop(), t[t.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && o(l, u);
            break;
          }
          default: {
            t.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const f = e.substring(n, u + 1);
        !"false".startsWith(f) && !"true".startsWith(f) && !"null".startsWith(f) ? (t.pop(), t[t.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? s(l, u) : t[t.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && o(l, u)) : r = u;
        break;
      }
    }
  }
  let i = e.slice(0, r + 1);
  for (let u = t.length - 1; u >= 0; u--)
    switch (t[u]) {
      case "INSIDE_STRING": {
        i += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        i += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        i += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const c = e.substring(n, e.length);
        "true".startsWith(c) ? i += "true".slice(c.length) : "false".startsWith(c) ? i += "false".slice(c.length) : "null".startsWith(c) && (i += "null".slice(c.length));
      }
    }
  return i;
}
function Pl(e) {
  if (e === void 0)
    return { value: void 0, state: "undefined-input" };
  try {
    return {
      value: It.parse(e),
      state: "successful-parse"
    };
  } catch {
    try {
      return {
        value: It.parse(Ol(e)),
        state: "repaired-parse"
      };
    } catch {
    }
  }
  return { value: void 0, state: "failed-parse" };
}
var Ft = {
  code: "0",
  name: "text",
  parse: (e) => {
    if (typeof e != "string")
      throw new Error('"text" parts expect a string value.');
    return { type: "text", value: e };
  }
}, Jt = {
  code: "1",
  name: "function_call",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("function_call" in e) || typeof e.function_call != "object" || e.function_call == null || !("name" in e.function_call) || !("arguments" in e.function_call) || typeof e.function_call.name != "string" || typeof e.function_call.arguments != "string")
      throw new Error(
        '"function_call" parts expect an object with a "function_call" property.'
      );
    return {
      type: "function_call",
      value: e
    };
  }
}, zt = {
  code: "2",
  name: "data",
  parse: (e) => {
    if (!Array.isArray(e))
      throw new Error('"data" parts expect an array value.');
    return { type: "data", value: e };
  }
}, Wt = {
  code: "3",
  name: "error",
  parse: (e) => {
    if (typeof e != "string")
      throw new Error('"error" parts expect a string value.');
    return { type: "error", value: e };
  }
}, Ht = {
  code: "4",
  name: "assistant_message",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("id" in e) || !("role" in e) || !("content" in e) || typeof e.id != "string" || typeof e.role != "string" || e.role !== "assistant" || !Array.isArray(e.content) || !e.content.every(
      (t) => t != null && typeof t == "object" && "type" in t && t.type === "text" && "text" in t && t.text != null && typeof t.text == "object" && "value" in t.text && typeof t.text.value == "string"
    ))
      throw new Error(
        '"assistant_message" parts expect an object with an "id", "role", and "content" property.'
      );
    return {
      type: "assistant_message",
      value: e
    };
  }
}, Yt = {
  code: "5",
  name: "assistant_control_data",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("threadId" in e) || !("messageId" in e) || typeof e.threadId != "string" || typeof e.messageId != "string")
      throw new Error(
        '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.'
      );
    return {
      type: "assistant_control_data",
      value: {
        threadId: e.threadId,
        messageId: e.messageId
      }
    };
  }
}, Kt = {
  code: "6",
  name: "data_message",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("role" in e) || !("data" in e) || typeof e.role != "string" || e.role !== "data")
      throw new Error(
        '"data_message" parts expect an object with a "role" and "data" property.'
      );
    return {
      type: "data_message",
      value: e
    };
  }
}, Gt = {
  code: "7",
  name: "tool_calls",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("tool_calls" in e) || typeof e.tool_calls != "object" || e.tool_calls == null || !Array.isArray(e.tool_calls) || e.tool_calls.some(
      (t) => t == null || typeof t != "object" || !("id" in t) || typeof t.id != "string" || !("type" in t) || typeof t.type != "string" || !("function" in t) || t.function == null || typeof t.function != "object" || !("arguments" in t.function) || typeof t.function.name != "string" || typeof t.function.arguments != "string"
    ))
      throw new Error(
        '"tool_calls" parts expect an object with a ToolCallPayload.'
      );
    return {
      type: "tool_calls",
      value: e
    };
  }
}, Xt = {
  code: "8",
  name: "message_annotations",
  parse: (e) => {
    if (!Array.isArray(e))
      throw new Error('"message_annotations" parts expect an array value.');
    return { type: "message_annotations", value: e };
  }
}, Qt = {
  code: "9",
  name: "tool_call",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("toolCallId" in e) || typeof e.toolCallId != "string" || !("toolName" in e) || typeof e.toolName != "string" || !("args" in e) || typeof e.args != "object")
      throw new Error(
        '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.'
      );
    return {
      type: "tool_call",
      value: e
    };
  }
}, er = {
  code: "a",
  name: "tool_result",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("toolCallId" in e) || typeof e.toolCallId != "string" || !("result" in e))
      throw new Error(
        '"tool_result" parts expect an object with a "toolCallId" and a "result" property.'
      );
    return {
      type: "tool_result",
      value: e
    };
  }
}, tr = {
  code: "b",
  name: "tool_call_streaming_start",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("toolCallId" in e) || typeof e.toolCallId != "string" || !("toolName" in e) || typeof e.toolName != "string")
      throw new Error(
        '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.'
      );
    return {
      type: "tool_call_streaming_start",
      value: e
    };
  }
}, rr = {
  code: "c",
  name: "tool_call_delta",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("toolCallId" in e) || typeof e.toolCallId != "string" || !("argsTextDelta" in e) || typeof e.argsTextDelta != "string")
      throw new Error(
        '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.'
      );
    return {
      type: "tool_call_delta",
      value: e
    };
  }
}, nr = {
  code: "d",
  name: "finish_message",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("finishReason" in e) || typeof e.finishReason != "string")
      throw new Error(
        '"finish_message" parts expect an object with a "finishReason" property.'
      );
    const t = {
      finishReason: e.finishReason
    };
    return "usage" in e && e.usage != null && typeof e.usage == "object" && "promptTokens" in e.usage && "completionTokens" in e.usage && (t.usage = {
      promptTokens: typeof e.usage.promptTokens == "number" ? e.usage.promptTokens : Number.NaN,
      completionTokens: typeof e.usage.completionTokens == "number" ? e.usage.completionTokens : Number.NaN
    }), {
      type: "finish_message",
      value: t
    };
  }
}, ar = {
  code: "e",
  name: "finish_step",
  parse: (e) => {
    if (e == null || typeof e != "object" || !("finishReason" in e) || typeof e.finishReason != "string")
      throw new Error(
        '"finish_step" parts expect an object with a "finishReason" property.'
      );
    const t = {
      finishReason: e.finishReason,
      isContinued: !1
    };
    return "usage" in e && e.usage != null && typeof e.usage == "object" && "promptTokens" in e.usage && "completionTokens" in e.usage && (t.usage = {
      promptTokens: typeof e.usage.promptTokens == "number" ? e.usage.promptTokens : Number.NaN,
      completionTokens: typeof e.usage.completionTokens == "number" ? e.usage.completionTokens : Number.NaN
    }), "isContinued" in e && typeof e.isContinued == "boolean" && (t.isContinued = e.isContinued), {
      type: "finish_step",
      value: t
    };
  }
}, ss = [
  Ft,
  Jt,
  zt,
  Wt,
  Ht,
  Yt,
  Kt,
  Gt,
  Xt,
  Qt,
  er,
  tr,
  rr,
  nr,
  ar
], Ml = {
  [Ft.code]: Ft,
  [Jt.code]: Jt,
  [zt.code]: zt,
  [Wt.code]: Wt,
  [Ht.code]: Ht,
  [Yt.code]: Yt,
  [Kt.code]: Kt,
  [Gt.code]: Gt,
  [Xt.code]: Xt,
  [Qt.code]: Qt,
  [er.code]: er,
  [tr.code]: tr,
  [rr.code]: rr,
  [nr.code]: nr,
  [ar.code]: ar
};
Ft.name + "", Ft.code, Jt.name + "", Jt.code, zt.name + "", zt.code, Wt.name + "", Wt.code, Ht.name + "", Ht.code, Yt.name + "", Yt.code, Kt.name + "", Kt.code, Gt.name + "", Gt.code, Xt.name + "", Xt.code, Qt.name + "", Qt.code, er.name + "", er.code, tr.name + "", tr.code, rr.name + "", rr.code, nr.name + "", nr.code, ar.name + "", ar.code;
var jl = ss.map((e) => e.code), Dl = (e) => {
  const t = e.indexOf(":");
  if (t === -1)
    throw new Error("Failed to parse stream string. No separator found.");
  const r = e.slice(0, t);
  if (!jl.includes(r))
    throw new Error(`Failed to parse stream string. Invalid code ${r}.`);
  const n = r, a = e.slice(t + 1), s = JSON.parse(a);
  return Ml[n].parse(s);
};
function Le(e, t) {
  const r = ss.find((n) => n.name === e);
  if (!r)
    throw new Error(`Invalid stream part type: ${e}`);
  return `${r.code}:${JSON.stringify(t)}
`;
}
var $l = 10;
function Zl(e, t) {
  const r = new Uint8Array(t);
  let n = 0;
  for (const a of e)
    r.set(a, n), n += a.length;
  return e.length = 0, r;
}
async function* Ll(e, {
  isAborted: t
} = {}) {
  const r = new TextDecoder(), n = [];
  let a = 0;
  for (; ; ) {
    const { value: s } = await e.read();
    if (s && (n.push(s), a += s.length, s[s.length - 1] !== $l))
      continue;
    if (n.length === 0)
      break;
    const o = Zl(n, a);
    a = 0;
    const i = r.decode(o, { stream: !0 }).split(`
`).filter((u) => u !== "").map(Dl);
    for (const u of i)
      yield u;
    if (t != null && t()) {
      e.cancel();
      break;
    }
  }
}
function pr(e, t) {
  return !e || !t || !t.length ? e : { ...e, annotations: [...t] };
}
async function Ul({
  reader: e,
  abortControllerRef: t,
  update: r,
  onToolCall: n,
  onFinish: a,
  generateId: s = Be,
  getCurrentDate: o = () => /* @__PURE__ */ new Date()
}) {
  var i;
  const u = o();
  let l = {}, c;
  const f = [], y = [];
  let p;
  const m = {};
  let _ = {
    completionTokens: NaN,
    promptTokens: NaN,
    totalTokens: NaN
  }, T = "unknown";
  for await (const { type: b, value: v } of Ll(e, {
    isAborted: () => (t == null ? void 0 : t.current) === null
  })) {
    if (b === "error")
      throw new Error(v);
    if (b === "finish_step") {
      v.isContinued || (c = {});
      continue;
    }
    if (b === "finish_message") {
      if (T = v.finishReason, v.usage != null) {
        const { completionTokens: C, promptTokens: j } = v.usage;
        _ = {
          completionTokens: C,
          promptTokens: j,
          totalTokens: C + j
        };
      }
      continue;
    }
    if (c != null && (b === "text" || b === "tool_call" || b === "tool_call_streaming_start" || b === "tool_call_delta" || b === "tool_result") && (l.text && f.push(l.text), l.function_call && f.push(l.function_call), l.tool_calls && f.push(l.tool_calls), l = c, c = void 0), b === "text" && (l.text ? l.text = {
      ...l.text,
      content: (l.text.content || "") + v
    } : l.text = {
      id: s(),
      role: "assistant",
      content: v,
      createdAt: u
    }), b === "tool_call_streaming_start")
      l.text == null && (l.text = {
        id: s(),
        role: "assistant",
        content: "",
        createdAt: u
      }), l.text.toolInvocations == null && (l.text.toolInvocations = []), m[v.toolCallId] = {
        text: "",
        toolName: v.toolName,
        prefixMapIndex: l.text.toolInvocations.length
      }, l.text.toolInvocations.push({
        state: "partial-call",
        toolCallId: v.toolCallId,
        toolName: v.toolName,
        args: void 0
      });
    else if (b === "tool_call_delta") {
      const C = m[v.toolCallId];
      C.text += v.argsTextDelta;
      const { value: j } = Pl(C.text);
      l.text.toolInvocations[C.prefixMapIndex] = {
        state: "partial-call",
        toolCallId: v.toolCallId,
        toolName: C.toolName,
        args: j
      }, l.text.internalUpdateId = s();
    } else if (b === "tool_call") {
      if (m[v.toolCallId] != null ? l.text.toolInvocations[m[v.toolCallId].prefixMapIndex] = { state: "call", ...v } : (l.text == null && (l.text = {
        id: s(),
        role: "assistant",
        content: "",
        createdAt: u
      }), l.text.toolInvocations == null && (l.text.toolInvocations = []), l.text.toolInvocations.push({
        state: "call",
        ...v
      })), l.text.internalUpdateId = s(), n) {
        const C = await n({ toolCall: v });
        C != null && (l.text.toolInvocations[l.text.toolInvocations.length - 1] = { state: "result", ...v, result: C });
      }
    } else if (b === "tool_result") {
      const C = (i = l.text) == null ? void 0 : i.toolInvocations;
      if (C == null)
        throw new Error("tool_result must be preceded by a tool_call");
      const j = C.findIndex(
        (L) => L.toolCallId === v.toolCallId
      );
      if (j === -1)
        throw new Error(
          "tool_result must be preceded by a tool_call with the same toolCallId"
        );
      C[j] = {
        ...C[j],
        state: "result",
        ...v
      };
    }
    let k = null;
    b === "function_call" && (l.function_call = {
      id: s(),
      role: "assistant",
      content: "",
      function_call: v.function_call,
      name: v.function_call.name,
      createdAt: u
    }, k = l.function_call);
    let P = null;
    b === "tool_calls" && (l.tool_calls = {
      id: s(),
      role: "assistant",
      content: "",
      tool_calls: v.tool_calls,
      createdAt: u
    }, P = l.tool_calls), b === "data" && y.push(...v);
    let M = l.text;
    b === "message_annotations" && (p ? p.push(...v) : p = [...v], k = pr(
      l.function_call,
      p
    ), P = pr(
      l.tool_calls,
      p
    ), M = pr(
      l.text,
      p
    ), l.text != null && (l.text.internalUpdateId = s())), p != null && p.length && (l.text && (l.text.annotations = [...p]), l.function_call && (l.function_call.annotations = [...p]), l.tool_calls && (l.tool_calls.annotations = [...p]));
    const E = [k, P, M].filter(Boolean).map((C) => ({
      ...pr(C, p)
    }));
    r([...f, ...E], [...y]);
  }
  return a == null || a({ message: l.text, finishReason: T, usage: _ }), {
    messages: [
      l.text,
      l.function_call,
      l.tool_calls
    ].filter(Boolean),
    data: y
  };
}
var Vl = () => fetch;
async function ql({
  api: e,
  body: t,
  streamProtocol: r = "data",
  credentials: n,
  headers: a,
  abortController: s,
  restoreMessagesOnFailure: o,
  onResponse: i,
  onUpdate: u,
  onFinish: l,
  onToolCall: c,
  generateId: f,
  fetch: y = Vl()
}) {
  var p, m;
  const _ = await y(e, {
    method: "POST",
    body: JSON.stringify(t),
    headers: {
      "Content-Type": "application/json",
      ...a
    },
    signal: (p = s == null ? void 0 : s()) == null ? void 0 : p.signal,
    credentials: n
  }).catch((b) => {
    throw o(), b;
  });
  if (i)
    try {
      await i(_);
    } catch (b) {
      throw b;
    }
  if (!_.ok)
    throw o(), new Error(
      (m = await _.text()) != null ? m : "Failed to fetch the chat response."
    );
  if (!_.body)
    throw new Error("The response body is empty.");
  const T = _.body.getReader();
  switch (r) {
    case "text": {
      const b = Bl(), v = {
        id: f(),
        createdAt: /* @__PURE__ */ new Date(),
        role: "assistant",
        content: ""
      };
      for (; ; ) {
        const { done: k, value: P } = await T.read();
        if (k)
          break;
        if (v.content += b(P), u([{ ...v }], []), (s == null ? void 0 : s()) === null) {
          T.cancel();
          break;
        }
      }
      return l == null || l(v, {
        usage: { completionTokens: NaN, promptTokens: NaN, totalTokens: NaN },
        finishReason: "unknown"
      }), {
        messages: [v],
        data: []
      };
    }
    case "data":
      return await Ul({
        reader: T,
        abortControllerRef: s != null ? { current: s() } : void 0,
        update: u,
        onToolCall: c,
        onFinish({ message: b, finishReason: v, usage: k }) {
          l && b != null && l(b, { usage: k, finishReason: v });
        },
        generateId: f
      });
    default: {
      const b = r;
      throw new Error(`Unknown stream protocol: ${b}`);
    }
  }
}
function Bl(e) {
  const t = new TextDecoder();
  return function(r) {
    return r ? t.decode(r, { stream: !0 }) : "";
  };
}
async function Fl({
  getStreamedResponse: e,
  experimental_onFunctionCall: t,
  experimental_onToolCall: r,
  updateChatRequest: n,
  getCurrentMessages: a
}) {
  for (; ; ) {
    const s = await e();
    if ("messages" in s) {
      let o = !1;
      for (const i of s.messages)
        if (!((i.function_call === void 0 || typeof i.function_call == "string") && (i.tool_calls === void 0 || typeof i.tool_calls == "string"))) {
          if (o = !0, t) {
            const u = i.function_call;
            if (typeof u != "object") {
              console.warn(
                "experimental_onFunctionCall should not be defined when using tools"
              );
              continue;
            }
            const l = await t(
              a(),
              u
            );
            if (l === void 0) {
              o = !1;
              break;
            }
            n(l);
          }
          if (r) {
            const u = i.tool_calls;
            if (!Array.isArray(u) || u.some((c) => typeof c != "object")) {
              console.warn(
                "experimental_onToolCall should not be defined when using tools"
              );
              continue;
            }
            const l = await r(a(), u);
            if (l === void 0) {
              o = !1;
              break;
            }
            n(l);
          }
        }
      if (!o)
        break;
    } else {
      let o = function(u) {
        for (const l of u.messages) {
          if (l.tool_calls !== void 0)
            for (const c of l.tool_calls)
              typeof c == "object" && c.function.arguments && typeof c.function.arguments != "string" && (c.function.arguments = JSON.stringify(
                c.function.arguments
              ));
          l.function_call !== void 0 && typeof l.function_call == "object" && l.function_call.arguments && typeof l.function_call.arguments != "string" && (l.function_call.arguments = JSON.stringify(
            l.function_call.arguments
          ));
        }
      };
      const i = s;
      if ((i.function_call === void 0 || typeof i.function_call == "string") && (i.tool_calls === void 0 || typeof i.tool_calls == "string"))
        break;
      if (t) {
        const u = i.function_call;
        if (typeof u != "object") {
          console.warn(
            "experimental_onFunctionCall should not be defined when using tools"
          );
          continue;
        }
        const l = await t(a(), u);
        if (l === void 0)
          break;
        o(l), n(l);
      }
      if (r) {
        const u = i.tool_calls;
        if (typeof u != "object") {
          console.warn(
            "experimental_onToolCall should not be defined when using functions"
          );
          continue;
        }
        const l = await r(a(), u);
        if (l === void 0)
          break;
        o(l), n(l);
      }
    }
  }
}
var hn = Symbol.for("vercel.ai.schema");
function Jl(e, {
  validate: t
} = {}) {
  return {
    [hn]: !0,
    _type: void 0,
    // should never be used directly
    [vr]: !0,
    jsonSchema: e,
    validate: t
  };
}
function zl(e) {
  return typeof e == "object" && e !== null && hn in e && e[hn] === !0 && "jsonSchema" in e && "validate" in e;
}
function os(e) {
  return zl(e) ? e : Wl(e);
}
function Wl(e) {
  return Jl(
    // we assume that zodToJsonSchema will return a valid JSONSchema7:
    Nl(e),
    {
      validate: (t) => {
        const r = e.safeParse(t);
        return r.success ? { success: !0, value: r.data } : { success: !1, error: r.error };
      }
    }
  );
}
var Jr = /* @__PURE__ */ new WeakMap(), Xn = 0;
function Hl(e) {
  if (!e.length)
    return "";
  for (var t = "arg", r = 0; r < e.length; ++r) {
    var n = void 0;
    e[r] === null || typeof e[r] != "object" && typeof e[r] != "function" ? typeof e[r] == "string" ? n = '"' + e[r] + '"' : n = String(e[r]) : Jr.has(e[r]) ? n = Jr.get(e[r]) : (n = Xn, Jr.set(e[r], Xn++)), t += "@" + n;
  }
  return t;
}
function Yl(e) {
  if (typeof e == "function")
    try {
      e = e();
    } catch {
      e = "";
    }
  return Array.isArray(e) ? e = Hl(e) : e = String(e || ""), e;
}
var On = (
  /** @class */
  function() {
    function e(t) {
      t === void 0 && (t = 0), this.items = /* @__PURE__ */ new Map(), this.ttl = t;
    }
    return e.prototype.serializeKey = function(t) {
      return Yl(t);
    }, e.prototype.get = function(t) {
      var r = this.serializeKey(t);
      return this.items.get(r);
    }, e.prototype.set = function(t, r, n) {
      var a = this.serializeKey(t), s = n || this.ttl, o = Date.now(), i = {
        data: r,
        createdAt: o,
        expiresAt: s ? o + s : 1 / 0
      };
      this.dispatchExpire(s, i, a), this.items.set(a, i);
    }, e.prototype.dispatchExpire = function(t, r, n) {
      var a = this;
      t && setTimeout(function() {
        var s = Date.now(), o = s >= r.expiresAt;
        o && a.delete(n);
      }, t);
    }, e.prototype.delete = function(t) {
      this.items.delete(t);
    }, e;
  }()
);
function Kl() {
  return typeof navigator.onLine < "u" ? navigator.onLine : !0;
}
function Gl() {
  return typeof document < "u" && typeof document.visibilityState < "u" ? document.visibilityState !== "hidden" : !0;
}
var Xl = function(e) {
  return fetch(e).then(function(t) {
    return t.json();
  });
};
const zr = {
  isOnline: Kl,
  isDocumentVisible: Gl,
  fetcher: Xl
};
var Ue = function() {
  return Ue = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
  }, Ue.apply(this, arguments);
}, lt = function(e, t, r, n) {
  function a(s) {
    return s instanceof r ? s : new r(function(o) {
      o(s);
    });
  }
  return new (r || (r = Promise))(function(s, o) {
    function i(c) {
      try {
        l(n.next(c));
      } catch (f) {
        o(f);
      }
    }
    function u(c) {
      try {
        l(n.throw(c));
      } catch (f) {
        o(f);
      }
    }
    function l(c) {
      c.done ? s(c.value) : a(c.value).then(i, u);
    }
    l((n = n.apply(e, t || [])).next());
  });
}, ut = function(e, t) {
  var r = { label: 0, sent: function() {
    if (s[0] & 1) throw s[1];
    return s[1];
  }, trys: [], ops: [] }, n, a, s, o;
  return o = { next: i(0), throw: i(1), return: i(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function i(l) {
    return function(c) {
      return u([l, c]);
    };
  }
  function u(l) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; r; ) try {
      if (n = 1, a && (s = l[0] & 2 ? a.return : l[0] ? a.throw || ((s = a.return) && s.call(a), 0) : a.next) && !(s = s.call(a, l[1])).done) return s;
      switch (a = 0, s && (l = [l[0] & 2, s.value]), l[0]) {
        case 0:
        case 1:
          s = l;
          break;
        case 4:
          return r.label++, { value: l[1], done: !1 };
        case 5:
          r.label++, a = l[1], l = [0];
          continue;
        case 7:
          l = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (s = r.trys, !(s = s.length > 0 && s[s.length - 1]) && (l[0] === 6 || l[0] === 2)) {
            r = 0;
            continue;
          }
          if (l[0] === 3 && (!s || l[1] > s[0] && l[1] < s[3])) {
            r.label = l[1];
            break;
          }
          if (l[0] === 6 && r.label < s[1]) {
            r.label = s[1], s = l;
            break;
          }
          if (s && r.label < s[2]) {
            r.label = s[2], r.ops.push(l);
            break;
          }
          s[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      l = t.call(e, r);
    } catch (c) {
      l = [6, c], a = 0;
    } finally {
      n = s = 0;
    }
    if (l[0] & 5) throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}, Ql = function(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), a, s = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(a = n.next()).done; ) s.push(a.value);
  } catch (i) {
    o = { error: i };
  } finally {
    try {
      a && !a.done && (r = n.return) && r.call(n);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}, eu = function(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, a = t.length, s; n < a; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}, is = new On(), Ir = new On(), Wr = new On(), ls = {
  cache: is,
  refreshInterval: 0,
  ttl: 0,
  serverTTL: 1e3,
  dedupingInterval: 2e3,
  revalidateOnFocus: !0,
  revalidateDebounce: 0,
  shouldRetryOnError: !0,
  errorRetryInterval: 5e3,
  errorRetryCount: 5,
  fetcher: zr.fetcher,
  isOnline: zr.isOnline,
  isDocumentVisible: zr.isDocumentVisible
};
function tu(e, t, r) {
  var n = Ir.get(e);
  if (n)
    n.data.push(t);
  else {
    var a = 5e3;
    Ir.set(e, [t], r > 0 ? r + a : r);
  }
}
function ru(e, t, r) {
  if (r.isDocumentVisible() && !(r.errorRetryCount !== void 0 && t > r.errorRetryCount)) {
    var n = Math.min(t || 0, r.errorRetryCount), a = n * r.errorRetryInterval;
    setTimeout(function() {
      e(null, { errorRetryCount: n + 1, shouldRetryOnError: !0 });
    }, a);
  }
}
var Qn = function(e, t, r, n) {
  return r === void 0 && (r = is), n === void 0 && (n = ls.ttl), lt(void 0, void 0, void 0, function() {
    var a, s, o, i, u, l, c;
    return ut(this, function(f) {
      switch (f.label) {
        case 0:
          if (!nu(t)) return [3, 5];
          f.label = 1;
        case 1:
          return f.trys.push([1, 3, , 4]), [4, t];
        case 2:
          return a = f.sent(), [3, 4];
        case 3:
          return i = f.sent(), s = i, [3, 4];
        case 4:
          return [3, 6];
        case 5:
          a = t, f.label = 6;
        case 6:
          if (o = !1, u = { data: a, error: s, isValidating: o }, typeof a < "u")
            try {
              r.set(e, u, n);
            } catch (y) {
              console.error("swrv(mutate): failed to set cache", y);
            }
          return l = Ir.get(e), l && l.data.length && (c = l.data.filter(function(y) {
            return y.key === e;
          }), c.forEach(function(y, p) {
            typeof u.data < "u" && (y.data = u.data), y.error = u.error, y.isValidating = u.isValidating;
            var m = p === c.length - 1;
            m || delete c[p];
          }), c = c.filter(Boolean)), [2, u];
      }
    });
  });
};
function ea() {
  for (var e = this, t = [], r = 0; r < arguments.length; r++)
    t[r] = arguments[r];
  var n, a, s = Ue({}, ls), o = !1, i = !1, u = qs(), l = (u == null ? void 0 : u.proxy) || u;
  if (!l)
    return console.error("Could not get current instance, check to make sure that `useSwrv` is declared in the top level of the setup function."), null;
  var c = (l == null ? void 0 : l.$isServer) || !1;
  t.length >= 1 && (n = t[0]), t.length >= 2 && (a = t[1]), t.length > 2 && (s = Ue(Ue({}, s), t[2]));
  var f = c ? s.serverTTL : s.ttl, y = typeof n == "function" ? n : St(n);
  typeof a > "u" && (a = s.fetcher);
  var p = null;
  p || (p = Bs({
    data: void 0,
    error: void 0,
    isValidating: !0,
    key: null
  }));
  var m = function(v, k) {
    return lt(e, void 0, void 0, function() {
      var P, M, E, C, j, L, W, z = this;
      return ut(this, function($) {
        switch ($.label) {
          case 0:
            return P = p.data === void 0, M = y.value, M ? (E = s.cache.get(M), C = E && E.data, p.isValidating = !0, C && (p.data = C.data, p.error = C.error), j = v || a, !j || !s.isDocumentVisible() && !P || (k == null ? void 0 : k.forceRevalidate) !== void 0 && !(k != null && k.forceRevalidate) ? (p.isValidating = !1, [
              2
              /*return*/
            ]) : E && (L = !!(Date.now() - E.createdAt >= s.dedupingInterval || k != null && k.forceRevalidate), !L) ? (p.isValidating = !1, [
              2
              /*return*/
            ]) : (W = function() {
              return lt(z, void 0, void 0, function() {
                var H, ne, K, X;
                return ut(this, function(Y) {
                  switch (Y.label) {
                    case 0:
                      return H = Wr.get(M), H ? [3, 2] : (ne = Array.isArray(M) ? M : [M], K = j.apply(void 0, eu([], Ql(ne), !1)), Wr.set(M, K, s.dedupingInterval), [4, Qn(M, K, s.cache, f)]);
                    case 1:
                      return Y.sent(), [3, 4];
                    case 2:
                      return [4, Qn(M, H.data, s.cache, f)];
                    case 3:
                      Y.sent(), Y.label = 4;
                    case 4:
                      return p.isValidating = !1, Wr.delete(M), p.error !== void 0 && (X = !o && s.shouldRetryOnError && (k ? k.shouldRetryOnError : !0), X && ru(m, k ? k.errorRetryCount : 1, s)), [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, C && s.revalidateDebounce ? (setTimeout(function() {
              return lt(z, void 0, void 0, function() {
                return ut(this, function(H) {
                  switch (H.label) {
                    case 0:
                      return o ? [3, 2] : [4, W()];
                    case 1:
                      H.sent(), H.label = 2;
                    case 2:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, s.revalidateDebounce), [3, 3]) : [3, 1])) : [
              2
              /*return*/
            ];
          case 1:
            return [4, W()];
          case 2:
            $.sent(), $.label = 3;
          case 3:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, _ = function() {
    return lt(e, void 0, void 0, function() {
      return ut(this, function(v) {
        return [2, m(null, { shouldRetryOnError: !1 })];
      });
    });
  }, T = null;
  Fs(function() {
    var v = function() {
      return lt(e, void 0, void 0, function() {
        return ut(this, function(k) {
          switch (k.label) {
            case 0:
              return !p.error && s.isOnline() ? [4, m()] : [3, 2];
            case 1:
              return k.sent(), [3, 3];
            case 2:
              T && clearTimeout(T), k.label = 3;
            case 3:
              return s.refreshInterval && !o && (T = setTimeout(v, s.refreshInterval)), [
                2
                /*return*/
              ];
          }
        });
      });
    };
    s.refreshInterval && (T = setTimeout(v, s.refreshInterval)), s.revalidateOnFocus && (document.addEventListener("visibilitychange", _, !1), window.addEventListener("focus", _, !1));
  }), Js(function() {
    o = !0, T && clearTimeout(T), s.revalidateOnFocus && (document.removeEventListener("visibilitychange", _, !1), window.removeEventListener("focus", _, !1));
    var v = Ir.get(y.value);
    v && (v.data = v.data.filter(function(k) {
      return k !== p;
    }));
  });
  try {
    zs(y, function(v) {
      Ws(y) || (y.value = v), p.key = v, p.isValidating = !!v, tu(y.value, p, f), !c && !i && y.value && m(), i = !1;
    }, {
      immediate: !0
    });
  } catch {
  }
  var b = Ue(Ue({}, Hs(p)), { mutate: function(v, k) {
    return m(v, Ue(Ue({}, k), { forceRevalidate: !0 }));
  } });
  return b;
}
function nu(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var au = 0, ta = ea.default || ea, ra = {};
function su({
  api: e = "/api/chat",
  id: t,
  initialMessages: r = [],
  initialInput: n = "",
  sendExtraMessageFields: a,
  experimental_onFunctionCall: s,
  streamMode: o,
  streamProtocol: i,
  onResponse: u,
  onFinish: l,
  onError: c,
  credentials: f,
  headers: y,
  body: p,
  generateId: m = Be,
  onToolCall: _,
  fetch: T,
  keepLastMessageOnError: b = !1,
  maxSteps: v
} = {
  maxSteps: 1
}) {
  var k, P;
  o && (i ?? (i = o === "text" ? "text" : void 0));
  const M = t || `chat-${au++}`, E = `${e}|${M}`, { data: C, mutate: j } = ta(
    E,
    () => ra[E] || r
  ), { data: L, mutate: W } = ta(
    `${M}-loading`,
    null
  );
  (k = L.value) != null || (L.value = !1), (P = C.value) != null || (C.value = r);
  const z = (A) => (ra[E] = A, j()), $ = C, H = St(void 0), ne = St(void 0);
  let K = null;
  async function X(A, { options: q, data: G, headers: fe, body: ae } = {}) {
    const qe = $.value.length;
    try {
      H.value = void 0, W(() => !0), K = new AbortController();
      const pe = A;
      z(A);
      const Q = {
        headers: fe ?? (q == null ? void 0 : q.headers),
        body: ae ?? (q == null ? void 0 : q.body)
      };
      let Pe = {
        messages: A,
        options: Q,
        body: Q.body,
        headers: Q.headers,
        data: G
      };
      await Fl({
        getStreamedResponse: async () => {
          var Me;
          const Zr = (Me = ne.value) != null ? Me : [], yt = a ? Pe.messages : Pe.messages.map(
            ({
              role: vt,
              content: se,
              name: je,
              data: ee,
              annotations: ue,
              toolInvocations: De,
              function_call: _t
            }) => ({
              role: vt,
              content: se,
              ...je !== void 0 && { name: je },
              ...ee !== void 0 && { data: ee },
              ...ue !== void 0 && { annotations: ue },
              ...De !== void 0 && { toolInvocations: De },
              // outdated function/tool call handling (TODO deprecate):
              ..._t !== void 0 && { function_call: _t }
            })
          );
          return await ql({
            api: e,
            body: {
              messages: yt,
              data: Pe.data,
              ...Xr(p),
              // Use unref to unwrap the ref value
              ...Q.body
            },
            streamProtocol: i,
            headers: {
              ...y,
              ...Q.headers
            },
            abortController: () => K,
            credentials: f,
            onResponse: u,
            onUpdate(vt, se) {
              z([...Pe.messages, ...vt]), ne.value = [...Zr, ...se ?? []];
            },
            onFinish: l,
            restoreMessagesOnFailure() {
              b || z(pe);
            },
            generateId: m,
            onToolCall: _,
            fetch: T
          });
        },
        experimental_onFunctionCall: s,
        updateChatRequest(Me) {
          Pe = Me;
        },
        getCurrentMessages: () => $.value
      }), K = null;
    } catch (pe) {
      if (pe.name === "AbortError")
        return K = null, null;
      c && pe instanceof Error && c(pe), H.value = pe;
    } finally {
      W(() => !1);
    }
    const ve = $.value[$.value.length - 1];
    // ensure we actually have new messages (to prevent infinite loops in case of errors):
    $.value.length > qe && // ensure there is a last message:
    ve != null && // check if the feature is enabled:
    v && v > 1 && // check that next step is possible:
    na(ve) && // limit the number of automatic steps:
    ou($.value) <= v && await X($.value);
  }
  const Y = async (A, q) => (A.id || (A.id = m()), X($.value.concat(A), q)), ie = async (A) => {
    const q = $.value;
    return q.length === 0 ? null : q[q.length - 1].role === "assistant" ? X(q.slice(0, -1), A) : X(q, A);
  }, ge = () => {
    K && (K.abort(), K = null);
  }, ye = (A) => {
    typeof A == "function" && (A = A($.value)), z(A);
  }, Ne = (A) => {
    typeof A == "function" && (A = A(ne.value)), ne.value = A;
  }, B = St(n);
  return {
    messages: $,
    append: Y,
    error: H,
    reload: ie,
    stop: ge,
    setMessages: ye,
    input: B,
    handleSubmit: (A, q = {}) => {
      var G;
      (G = A == null ? void 0 : A.preventDefault) == null || G.call(A);
      const fe = B.value;
      !fe && !q.allowEmptySubmit || (X(
        !fe && q.allowEmptySubmit ? $.value : $.value.concat({
          id: m(),
          createdAt: /* @__PURE__ */ new Date(),
          content: fe,
          role: "user"
        }),
        q
      ), B.value = "");
    },
    isLoading: L,
    data: ne,
    setData: Ne,
    addToolResult: ({
      toolCallId: A,
      result: q
    }) => {
      const G = $.value.map(
        (ae, qe, ve) => (
          // update the tool calls in the last assistant message:
          qe === ve.length - 1 && ae.role === "assistant" && ae.toolInvocations ? {
            ...ae,
            toolInvocations: ae.toolInvocations.map(
              (pe) => pe.toolCallId === A ? { ...pe, result: q } : pe
            )
          } : ae
        )
      );
      z(G);
      const fe = G[G.length - 1];
      na(fe) && X(G);
    }
  };
}
function na(e) {
  return e.role === "assistant" && e.toolInvocations && e.toolInvocations.length > 0 && e.toolInvocations.every((t) => "result" in t);
}
function ou(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0 && e[r].role === "assistant"; r--)
    t++;
  return t;
}
var iu = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {}, et = "1.9.0", aa = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function lu(e) {
  var t = /* @__PURE__ */ new Set([e]), r = /* @__PURE__ */ new Set(), n = e.match(aa);
  if (!n)
    return function() {
      return !1;
    };
  var a = {
    major: +n[1],
    minor: +n[2],
    patch: +n[3],
    prerelease: n[4]
  };
  if (a.prerelease != null)
    return function(u) {
      return u === e;
    };
  function s(i) {
    return r.add(i), !1;
  }
  function o(i) {
    return t.add(i), !0;
  }
  return function(u) {
    if (t.has(u))
      return !0;
    if (r.has(u))
      return !1;
    var l = u.match(aa);
    if (!l)
      return s(u);
    var c = {
      major: +l[1],
      minor: +l[2],
      patch: +l[3],
      prerelease: l[4]
    };
    return c.prerelease != null || a.major !== c.major ? s(u) : a.major === 0 ? a.minor === c.minor && a.patch <= c.patch ? o(u) : s(u) : a.minor <= c.minor ? o(u) : s(u);
  };
}
var uu = lu(et), cu = et.split(".")[0], sr = Symbol.for("opentelemetry.js.api." + cu), or = iu;
function Pn(e, t, r, n) {
  var a;
  n === void 0 && (n = !1);
  var s = or[sr] = (a = or[sr]) !== null && a !== void 0 ? a : {
    version: et
  };
  if (!n && s[e]) {
    var o = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + e);
    return r.error(o.stack || o.message), !1;
  }
  if (s.version !== et) {
    var o = new Error("@opentelemetry/api: Registration of version v" + s.version + " for " + e + " does not match previously registered API v" + et);
    return r.error(o.stack || o.message), !1;
  }
  return s[e] = t, r.debug("@opentelemetry/api: Registered a global for " + e + " v" + et + "."), !0;
}
function ir(e) {
  var t, r, n = (t = or[sr]) === null || t === void 0 ? void 0 : t.version;
  if (!(!n || !uu(n)))
    return (r = or[sr]) === null || r === void 0 ? void 0 : r[e];
}
function Mn(e, t) {
  t.debug("@opentelemetry/api: Unregistering a global for " + e + " v" + et + ".");
  var r = or[sr];
  r && delete r[e];
}
var du = function(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), a, s = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(a = n.next()).done; ) s.push(a.value);
  } catch (i) {
    o = { error: i };
  } finally {
    try {
      a && !a.done && (r = n.return) && r.call(n);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}, fu = function(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, a = t.length, s; n < a; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}, pu = (
  /** @class */
  function() {
    function e(t) {
      this._namespace = t.namespace || "DiagComponentLogger";
    }
    return e.prototype.debug = function() {
      for (var t = [], r = 0; r < arguments.length; r++)
        t[r] = arguments[r];
      return xt("debug", this._namespace, t);
    }, e.prototype.error = function() {
      for (var t = [], r = 0; r < arguments.length; r++)
        t[r] = arguments[r];
      return xt("error", this._namespace, t);
    }, e.prototype.info = function() {
      for (var t = [], r = 0; r < arguments.length; r++)
        t[r] = arguments[r];
      return xt("info", this._namespace, t);
    }, e.prototype.warn = function() {
      for (var t = [], r = 0; r < arguments.length; r++)
        t[r] = arguments[r];
      return xt("warn", this._namespace, t);
    }, e.prototype.verbose = function() {
      for (var t = [], r = 0; r < arguments.length; r++)
        t[r] = arguments[r];
      return xt("verbose", this._namespace, t);
    }, e;
  }()
);
function xt(e, t, r) {
  var n = ir("diag");
  if (n)
    return r.unshift(t), n[e].apply(n, fu([], du(r), !1));
}
var me;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.ERROR = 30] = "ERROR", e[e.WARN = 50] = "WARN", e[e.INFO = 60] = "INFO", e[e.DEBUG = 70] = "DEBUG", e[e.VERBOSE = 80] = "VERBOSE", e[e.ALL = 9999] = "ALL";
})(me || (me = {}));
function mu(e, t) {
  e < me.NONE ? e = me.NONE : e > me.ALL && (e = me.ALL), t = t || {};
  function r(n, a) {
    var s = t[n];
    return typeof s == "function" && e >= a ? s.bind(t) : function() {
    };
  }
  return {
    error: r("error", me.ERROR),
    warn: r("warn", me.WARN),
    info: r("info", me.INFO),
    debug: r("debug", me.DEBUG),
    verbose: r("verbose", me.VERBOSE)
  };
}
var hu = function(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), a, s = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(a = n.next()).done; ) s.push(a.value);
  } catch (i) {
    o = { error: i };
  } finally {
    try {
      a && !a.done && (r = n.return) && r.call(n);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}, gu = function(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, a = t.length, s; n < a; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}, yu = "diag", Cr = (
  /** @class */
  function() {
    function e() {
      function t(a) {
        return function() {
          for (var s = [], o = 0; o < arguments.length; o++)
            s[o] = arguments[o];
          var i = ir("diag");
          if (i)
            return i[a].apply(i, gu([], hu(s), !1));
        };
      }
      var r = this, n = function(a, s) {
        var o, i, u;
        if (s === void 0 && (s = { logLevel: me.INFO }), a === r) {
          var l = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
          return r.error((o = l.stack) !== null && o !== void 0 ? o : l.message), !1;
        }
        typeof s == "number" && (s = {
          logLevel: s
        });
        var c = ir("diag"), f = mu((i = s.logLevel) !== null && i !== void 0 ? i : me.INFO, a);
        if (c && !s.suppressOverrideMessage) {
          var y = (u = new Error().stack) !== null && u !== void 0 ? u : "<failed to generate stacktrace>";
          c.warn("Current logger will be overwritten from " + y), f.warn("Current logger will overwrite one already registered from " + y);
        }
        return Pn("diag", f, r, !0);
      };
      r.setLogger = n, r.disable = function() {
        Mn(yu, r);
      }, r.createComponentLogger = function(a) {
        return new pu(a);
      }, r.verbose = t("verbose"), r.debug = t("debug"), r.info = t("info"), r.warn = t("warn"), r.error = t("error");
    }
    return e.instance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e;
  }()
);
function vu(e) {
  return Symbol.for(e);
}
var _u = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      var r = this;
      r._currentContext = t ? new Map(t) : /* @__PURE__ */ new Map(), r.getValue = function(n) {
        return r._currentContext.get(n);
      }, r.setValue = function(n, a) {
        var s = new e(r._currentContext);
        return s._currentContext.set(n, a), s;
      }, r.deleteValue = function(n) {
        var a = new e(r._currentContext);
        return a._currentContext.delete(n), a;
      };
    }
    return e;
  }()
), bu = new _u(), wu = function(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), a, s = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(a = n.next()).done; ) s.push(a.value);
  } catch (i) {
    o = { error: i };
  } finally {
    try {
      a && !a.done && (r = n.return) && r.call(n);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}, xu = function(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, a = t.length, s; n < a; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}, Tu = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.active = function() {
      return bu;
    }, e.prototype.with = function(t, r, n) {
      for (var a = [], s = 3; s < arguments.length; s++)
        a[s - 3] = arguments[s];
      return r.call.apply(r, xu([n], wu(a), !1));
    }, e.prototype.bind = function(t, r) {
      return r;
    }, e.prototype.enable = function() {
      return this;
    }, e.prototype.disable = function() {
      return this;
    }, e;
  }()
), ku = function(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), a, s = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(a = n.next()).done; ) s.push(a.value);
  } catch (i) {
    o = { error: i };
  } finally {
    try {
      a && !a.done && (r = n.return) && r.call(n);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}, Su = function(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, a = t.length, s; n < a; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}, Hr = "context", Eu = new Tu(), us = (
  /** @class */
  function() {
    function e() {
    }
    return e.getInstance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e.prototype.setGlobalContextManager = function(t) {
      return Pn(Hr, t, Cr.instance());
    }, e.prototype.active = function() {
      return this._getContextManager().active();
    }, e.prototype.with = function(t, r, n) {
      for (var a, s = [], o = 3; o < arguments.length; o++)
        s[o - 3] = arguments[o];
      return (a = this._getContextManager()).with.apply(a, Su([t, r, n], ku(s), !1));
    }, e.prototype.bind = function(t, r) {
      return this._getContextManager().bind(t, r);
    }, e.prototype._getContextManager = function() {
      return ir(Hr) || Eu;
    }, e.prototype.disable = function() {
      this._getContextManager().disable(), Mn(Hr, Cr.instance());
    }, e;
  }()
), gn;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SAMPLED = 1] = "SAMPLED";
})(gn || (gn = {}));
var cs = "0000000000000000", ds = "00000000000000000000000000000000", Iu = {
  traceId: ds,
  spanId: cs,
  traceFlags: gn.NONE
}, Et = (
  /** @class */
  function() {
    function e(t) {
      t === void 0 && (t = Iu), this._spanContext = t;
    }
    return e.prototype.spanContext = function() {
      return this._spanContext;
    }, e.prototype.setAttribute = function(t, r) {
      return this;
    }, e.prototype.setAttributes = function(t) {
      return this;
    }, e.prototype.addEvent = function(t, r) {
      return this;
    }, e.prototype.addLink = function(t) {
      return this;
    }, e.prototype.addLinks = function(t) {
      return this;
    }, e.prototype.setStatus = function(t) {
      return this;
    }, e.prototype.updateName = function(t) {
      return this;
    }, e.prototype.end = function(t) {
    }, e.prototype.isRecording = function() {
      return !1;
    }, e.prototype.recordException = function(t, r) {
    }, e;
  }()
), jn = vu("OpenTelemetry Context Key SPAN");
function Dn(e) {
  return e.getValue(jn) || void 0;
}
function Cu() {
  return Dn(us.getInstance().active());
}
function $n(e, t) {
  return e.setValue(jn, t);
}
function Au(e) {
  return e.deleteValue(jn);
}
function Ru(e, t) {
  return $n(e, new Et(t));
}
function fs(e) {
  var t;
  return (t = Dn(e)) === null || t === void 0 ? void 0 : t.spanContext();
}
var Nu = /^([0-9a-f]{32})$/i, Ou = /^[0-9a-f]{16}$/i;
function Pu(e) {
  return Nu.test(e) && e !== ds;
}
function Mu(e) {
  return Ou.test(e) && e !== cs;
}
function ps(e) {
  return Pu(e.traceId) && Mu(e.spanId);
}
function ju(e) {
  return new Et(e);
}
var Yr = us.getInstance(), ms = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.startSpan = function(t, r, n) {
      n === void 0 && (n = Yr.active());
      var a = !!(r != null && r.root);
      if (a)
        return new Et();
      var s = n && fs(n);
      return Du(s) && ps(s) ? new Et(s) : new Et();
    }, e.prototype.startActiveSpan = function(t, r, n, a) {
      var s, o, i;
      if (!(arguments.length < 2)) {
        arguments.length === 2 ? i = r : arguments.length === 3 ? (s = r, i = n) : (s = r, o = n, i = a);
        var u = o ?? Yr.active(), l = this.startSpan(t, s, u), c = $n(u, l);
        return Yr.with(c, i, void 0, l);
      }
    }, e;
  }()
);
function Du(e) {
  return typeof e == "object" && typeof e.spanId == "string" && typeof e.traceId == "string" && typeof e.traceFlags == "number";
}
var $u = new ms(), Zu = (
  /** @class */
  function() {
    function e(t, r, n, a) {
      this._provider = t, this.name = r, this.version = n, this.options = a;
    }
    return e.prototype.startSpan = function(t, r, n) {
      return this._getTracer().startSpan(t, r, n);
    }, e.prototype.startActiveSpan = function(t, r, n, a) {
      var s = this._getTracer();
      return Reflect.apply(s.startActiveSpan, s, arguments);
    }, e.prototype._getTracer = function() {
      if (this._delegate)
        return this._delegate;
      var t = this._provider.getDelegateTracer(this.name, this.version, this.options);
      return t ? (this._delegate = t, this._delegate) : $u;
    }, e;
  }()
), Lu = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getTracer = function(t, r, n) {
      return new ms();
    }, e;
  }()
), Uu = new Lu(), sa = (
  /** @class */
  function() {
    function e() {
    }
    return e.prototype.getTracer = function(t, r, n) {
      var a;
      return (a = this.getDelegateTracer(t, r, n)) !== null && a !== void 0 ? a : new Zu(this, t, r, n);
    }, e.prototype.getDelegate = function() {
      var t;
      return (t = this._delegate) !== null && t !== void 0 ? t : Uu;
    }, e.prototype.setDelegate = function(t) {
      this._delegate = t;
    }, e.prototype.getDelegateTracer = function(t, r, n) {
      var a;
      return (a = this._delegate) === null || a === void 0 ? void 0 : a.getTracer(t, r, n);
    }, e;
  }()
), Ar;
(function(e) {
  e[e.UNSET = 0] = "UNSET", e[e.OK = 1] = "OK", e[e.ERROR = 2] = "ERROR";
})(Ar || (Ar = {}));
var Kr = "trace", Vu = (
  /** @class */
  function() {
    function e() {
      this._proxyTracerProvider = new sa(), this.wrapSpanContext = ju, this.isSpanContextValid = ps, this.deleteSpan = Au, this.getSpan = Dn, this.getActiveSpan = Cu, this.getSpanContext = fs, this.setSpan = $n, this.setSpanContext = Ru;
    }
    return e.getInstance = function() {
      return this._instance || (this._instance = new e()), this._instance;
    }, e.prototype.setGlobalTracerProvider = function(t) {
      var r = Pn(Kr, this._proxyTracerProvider, Cr.instance());
      return r && this._proxyTracerProvider.setDelegate(t), r;
    }, e.prototype.getTracerProvider = function() {
      return ir(Kr) || this._proxyTracerProvider;
    }, e.prototype.getTracer = function(t, r) {
      return this.getTracerProvider().getTracer(t, r);
    }, e.prototype.disable = function() {
      Mn(Kr, Cr.instance()), this._proxyTracerProvider = new sa();
    }, e;
  }()
), qu = Vu.getInstance(), Bu = Object.defineProperty, hs = (e, t) => {
  for (var r in t)
    Bu(e, r, { get: t[r], enumerable: !0 });
};
async function Fu(e) {
  return e === void 0 ? Promise.resolve() : new Promise((t) => setTimeout(t, e));
}
var yn = "AI_RetryError", gs = `vercel.ai.error.${yn}`, Ju = Symbol.for(gs), ys, oa = class extends O {
  constructor({
    message: e,
    reason: t,
    errors: r
  }) {
    super({ name: yn, message: e }), this[ys] = !0, this.reason = t, this.errors = r, this.lastError = r[r.length - 1];
  }
  static isInstance(e) {
    return O.hasMarker(e, gs);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isRetryError(e) {
    return e instanceof Error && e.name === yn && typeof e.reason == "string" && Array.isArray(e.errors);
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      reason: this.reason,
      lastError: this.lastError,
      errors: this.errors
    };
  }
};
ys = Ju;
var zu = ({
  maxRetries: e = 2,
  initialDelayInMs: t = 2e3,
  backoffFactor: r = 2
} = {}) => async (n) => vs(n, {
  maxRetries: e,
  delayInMs: t,
  backoffFactor: r
});
async function vs(e, {
  maxRetries: t,
  delayInMs: r,
  backoffFactor: n
}, a = []) {
  try {
    return await e();
  } catch (s) {
    if (hr(s) || t === 0)
      throw s;
    const o = Ao(s), i = [...a, s], u = i.length;
    if (u > t)
      throw new oa({
        message: `Failed after ${u} attempts. Last error: ${o}`,
        reason: "maxRetriesExceeded",
        errors: i
      });
    if (s instanceof Error && Ie.isAPICallError(s) && s.isRetryable === !0 && u <= t)
      return await Fu(r), vs(
        e,
        { maxRetries: t, delayInMs: n * r, backoffFactor: n },
        i
      );
    throw u === 1 ? s : new oa({
      message: `Failed after ${u} attempts with non-retryable error: '${o}'`,
      reason: "errorNotRetryable",
      errors: i
    });
  }
}
function vn({
  operationId: e,
  telemetry: t
}) {
  return {
    // standardized operation and resource name:
    "operation.name": `${e}${(t == null ? void 0 : t.functionId) != null ? ` ${t.functionId}` : ""}`,
    "resource.name": t == null ? void 0 : t.functionId,
    // detailed, AI SDK specific data:
    "ai.operationId": e,
    "ai.telemetry.functionId": t == null ? void 0 : t.functionId
  };
}
function Wu({
  model: e,
  settings: t,
  telemetry: r,
  headers: n
}) {
  var a;
  return {
    "ai.model.provider": e.provider,
    "ai.model.id": e.modelId,
    // settings:
    ...Object.entries(t).reduce((s, [o, i]) => (s[`ai.settings.${o}`] = i, s), {}),
    // add metadata as attributes:
    ...Object.entries((a = r == null ? void 0 : r.metadata) != null ? a : {}).reduce(
      (s, [o, i]) => (s[`ai.telemetry.metadata.${o}`] = i, s),
      {}
    ),
    // request headers
    ...Object.entries(n ?? {}).reduce((s, [o, i]) => (i !== void 0 && (s[`ai.request.headers.${o}`] = i), s), {})
  };
}
var Hu = {
  startSpan() {
    return mr;
  },
  startActiveSpan(e, t, r, n) {
    if (typeof t == "function")
      return t(mr);
    if (typeof r == "function")
      return r(mr);
    if (typeof n == "function")
      return n(mr);
  }
}, mr = {
  spanContext() {
    return Yu;
  },
  setAttribute() {
    return this;
  },
  setAttributes() {
    return this;
  },
  addEvent() {
    return this;
  },
  addLink() {
    return this;
  },
  addLinks() {
    return this;
  },
  setStatus() {
    return this;
  },
  updateName() {
    return this;
  },
  end() {
    return this;
  },
  isRecording() {
    return !1;
  },
  recordException() {
    return this;
  }
}, Yu = {
  traceId: "",
  spanId: "",
  traceFlags: 0
};
function Ku({
  isEnabled: e = !1,
  tracer: t
} = {}) {
  return e ? t || qu.getTracer("ai") : Hu;
}
function _n({
  name: e,
  tracer: t,
  attributes: r,
  fn: n,
  endWhenDone: a = !0
}) {
  return t.startActiveSpan(e, { attributes: r }, async (s) => {
    try {
      const o = await n(s);
      return a && s.end(), o;
    } catch (o) {
      try {
        o instanceof Error ? (s.recordException({
          name: o.name,
          message: o.message,
          stack: o.stack
        }), s.setStatus({
          code: Ar.ERROR,
          message: o.message
        })) : s.setStatus({ code: Ar.ERROR });
      } finally {
        s.end();
      }
      throw o;
    }
  });
}
function ht({
  telemetry: e,
  attributes: t
}) {
  return (e == null ? void 0 : e.isEnabled) !== !0 ? {} : Object.entries(t).reduce((r, [n, a]) => {
    if (a === void 0)
      return r;
    if (typeof a == "object" && "input" in a && typeof a.input == "function") {
      if ((e == null ? void 0 : e.recordInputs) === !1)
        return r;
      const s = a.input();
      return s === void 0 ? r : { ...r, [n]: s };
    }
    if (typeof a == "object" && "output" in a && typeof a.output == "function") {
      if ((e == null ? void 0 : e.recordOutputs) === !1)
        return r;
      const s = a.output();
      return s === void 0 ? r : { ...r, [n]: s };
    }
    return { ...r, [n]: a };
  }, {});
}
var bn = "AI_DownloadError", _s = `vercel.ai.error.${bn}`, Gu = Symbol.for(_s), bs, Gr = class extends O {
  constructor({
    url: e,
    statusCode: t,
    statusText: r,
    cause: n,
    message: a = n == null ? `Failed to download ${e}: ${t} ${r}` : `Failed to download ${e}: ${n}`
  }) {
    super({ name: bn, message: a, cause: n }), this[bs] = !0, this.url = e, this.statusCode = t, this.statusText = r;
  }
  static isInstance(e) {
    return O.hasMarker(e, _s);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isDownloadError(e) {
    return e instanceof Error && e.name === bn && typeof e.url == "string" && (e.statusCode == null || typeof e.statusCode == "number") && (e.statusText == null || typeof e.statusText == "string");
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      statusCode: this.statusCode,
      statusText: this.statusText,
      cause: this.cause
    };
  }
};
bs = Gu;
async function Xu({
  url: e,
  fetchImplementation: t = fetch
}) {
  var r;
  const n = e.toString();
  try {
    const a = await t(n);
    if (!a.ok)
      throw new Gr({
        url: n,
        statusCode: a.status,
        statusText: a.statusText
      });
    return {
      data: new Uint8Array(await a.arrayBuffer()),
      mimeType: (r = a.headers.get("content-type")) != null ? r : void 0
    };
  } catch (a) {
    throw Gr.isInstance(a) ? a : new Gr({ url: n, cause: a });
  }
}
var Qu = [
  { mimeType: "image/gif", bytes: [71, 73, 70] },
  { mimeType: "image/png", bytes: [137, 80, 78, 71] },
  { mimeType: "image/jpeg", bytes: [255, 216] },
  { mimeType: "image/webp", bytes: [82, 73, 70, 70] }
];
function ec(e) {
  for (const { bytes: t, mimeType: r } of Qu)
    if (e.length >= t.length && t.every((n, a) => e[a] === n))
      return r;
}
var wn = "AI_InvalidDataContentError", ws = `vercel.ai.error.${wn}`, tc = Symbol.for(ws), xs, ia = class extends O {
  constructor({
    content: e,
    cause: t,
    message: r = `Invalid data content. Expected a base64 string, Uint8Array, ArrayBuffer, or Buffer, but got ${typeof e}.`
  }) {
    super({ name: wn, message: r, cause: t }), this[xs] = !0, this.content = e;
  }
  static isInstance(e) {
    return O.hasMarker(e, ws);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidDataContentError(e) {
    return e instanceof Error && e.name === wn && e.content != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      cause: this.cause,
      content: this.content
    };
  }
};
xs = tc;
var Ts = d.union([
  d.string(),
  d.instanceof(Uint8Array),
  d.instanceof(ArrayBuffer),
  d.custom(
    // Buffer might not be available in some environments such as CloudFlare:
    (e) => {
      var t, r;
      return (r = (t = globalThis.Buffer) == null ? void 0 : t.isBuffer(e)) != null ? r : !1;
    },
    { message: "Must be a Buffer" }
  )
]);
function rc(e) {
  return typeof e == "string" ? e : e instanceof ArrayBuffer ? cn(new Uint8Array(e)) : cn(e);
}
function Rr(e) {
  if (e instanceof Uint8Array)
    return e;
  if (typeof e == "string")
    try {
      return Bo(e);
    } catch (t) {
      throw new ia({
        message: "Invalid data content. Content string is not a base64-encoded media.",
        content: e,
        cause: t
      });
    }
  if (e instanceof ArrayBuffer)
    return new Uint8Array(e);
  throw new ia({ content: e });
}
function nc(e) {
  try {
    return new TextDecoder().decode(e);
  } catch {
    throw new Error("Error decoding Uint8Array to text");
  }
}
var xn = "AI_InvalidMessageRoleError", ks = `vercel.ai.error.${xn}`, ac = Symbol.for(ks), Ss, sc = class extends O {
  constructor({
    role: e,
    message: t = `Invalid message role: '${e}'. Must be one of: "system", "user", "assistant", "tool".`
  }) {
    super({ name: xn, message: t }), this[Ss] = !0, this.role = e;
  }
  static isInstance(e) {
    return O.hasMarker(e, ks);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidMessageRoleError(e) {
    return e instanceof Error && e.name === xn && typeof e.role == "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      role: this.role
    };
  }
};
Ss = ac;
function oc(e) {
  try {
    const [t, r] = e.split(",");
    return {
      mimeType: t.split(";")[0].split(":")[1],
      base64Content: r
    };
  } catch {
    return {
      mimeType: void 0,
      base64Content: void 0
    };
  }
}
async function ic({
  prompt: e,
  modelSupportsImageUrls: t = !0,
  modelSupportsUrl: r = () => !1,
  downloadImplementation: n = Xu
}) {
  const a = await uc(
    e.messages,
    n,
    t,
    r
  );
  return [
    ...e.system != null ? [{ role: "system", content: e.system }] : [],
    ...e.messages.map(
      (s) => lc(s, a)
    )
  ];
}
function lc(e, t) {
  const r = e.role;
  switch (r) {
    case "system":
      return {
        role: "system",
        content: e.content,
        providerMetadata: e.experimental_providerMetadata
      };
    case "user":
      return typeof e.content == "string" ? {
        role: "user",
        content: [{ type: "text", text: e.content }],
        providerMetadata: e.experimental_providerMetadata
      } : {
        role: "user",
        content: e.content.map((n) => cc(n, t)).filter((n) => n.type !== "text" || n.text !== ""),
        providerMetadata: e.experimental_providerMetadata
      };
    case "assistant":
      return typeof e.content == "string" ? {
        role: "assistant",
        content: [{ type: "text", text: e.content }],
        providerMetadata: e.experimental_providerMetadata
      } : {
        role: "assistant",
        content: e.content.filter(
          // remove empty text parts:
          (n) => n.type !== "text" || n.text !== ""
        ).map((n) => {
          const { experimental_providerMetadata: a, ...s } = n;
          return {
            ...s,
            providerMetadata: a
          };
        }),
        providerMetadata: e.experimental_providerMetadata
      };
    case "tool":
      return {
        role: "tool",
        content: e.content.map((n) => ({
          type: "tool-result",
          toolCallId: n.toolCallId,
          toolName: n.toolName,
          result: n.result,
          content: n.experimental_content,
          isError: n.isError,
          providerMetadata: n.experimental_providerMetadata
        })),
        providerMetadata: e.experimental_providerMetadata
      };
    default: {
      const n = r;
      throw new sc({ role: n });
    }
  }
}
async function uc(e, t, r, n) {
  const a = e.filter((o) => o.role === "user").map((o) => o.content).filter(
    (o) => Array.isArray(o)
  ).flat().filter(
    (o) => o.type === "image" || o.type === "file"
  ).filter(
    (o) => !(o.type === "image" && r === !0)
  ).map((o) => o.type === "image" ? o.image : o.data).map(
    (o) => (
      // support string urls:
      typeof o == "string" && (o.startsWith("http:") || o.startsWith("https:")) ? new URL(o) : o
    )
  ).filter((o) => o instanceof URL).filter((o) => !n(o)), s = await Promise.all(
    a.map(async (o) => ({
      url: o,
      data: await t({ url: o })
    }))
  );
  return Object.fromEntries(
    s.map(({ url: o, data: i }) => [o.toString(), i])
  );
}
function cc(e, t) {
  if (e.type === "text")
    return {
      type: "text",
      text: e.text,
      providerMetadata: e.experimental_providerMetadata
    };
  let r = e.mimeType, n, a, s;
  const o = e.type;
  switch (o) {
    case "image":
      n = e.image;
      break;
    case "file":
      n = e.data;
      break;
    default:
      throw new Error(`Unsupported part type: ${o}`);
  }
  try {
    a = typeof n == "string" ? new URL(n) : n;
  } catch {
    a = n;
  }
  if (a instanceof URL)
    if (a.protocol === "data:") {
      const { mimeType: i, base64Content: u } = oc(
        a.toString()
      );
      if (i == null || u == null)
        throw new Error(`Invalid data URL format in part ${o}`);
      r = i, s = Rr(u);
    } else {
      const i = t[a.toString()];
      i ? (s = i.data, r ?? (r = i.mimeType)) : s = a;
    }
  else
    s = Rr(a);
  switch (o) {
    case "image":
      return r == null && s instanceof Uint8Array && (r = ec(s)), {
        type: "image",
        image: s,
        mimeType: r,
        providerMetadata: e.experimental_providerMetadata
      };
    case "file":
      if (r == null)
        throw new Error("Mime type is missing for file part");
      return {
        type: "file",
        data: s instanceof Uint8Array ? rc(s) : s,
        mimeType: r,
        providerMetadata: e.experimental_providerMetadata
      };
  }
}
var Tn = "AI_InvalidArgumentError", Es = `vercel.ai.error.${Tn}`, dc = Symbol.for(Es), Is, we = class extends O {
  constructor({
    parameter: e,
    value: t,
    message: r
  }) {
    super({
      name: Tn,
      message: `Invalid argument for parameter ${e}: ${r}`
    }), this[Is] = !0, this.parameter = e, this.value = t;
  }
  static isInstance(e) {
    return O.hasMarker(e, Es);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidArgumentError(e) {
    return e instanceof Error && e.name === Tn && typeof e.parameter == "string" && typeof e.value == "string";
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      parameter: this.parameter,
      value: this.value
    };
  }
};
Is = dc;
function fc({
  maxTokens: e,
  temperature: t,
  topP: r,
  topK: n,
  presencePenalty: a,
  frequencyPenalty: s,
  stopSequences: o,
  seed: i,
  maxRetries: u
}) {
  if (e != null) {
    if (!Number.isInteger(e))
      throw new we({
        parameter: "maxTokens",
        value: e,
        message: "maxTokens must be an integer"
      });
    if (e < 1)
      throw new we({
        parameter: "maxTokens",
        value: e,
        message: "maxTokens must be >= 1"
      });
  }
  if (t != null && typeof t != "number")
    throw new we({
      parameter: "temperature",
      value: t,
      message: "temperature must be a number"
    });
  if (r != null && typeof r != "number")
    throw new we({
      parameter: "topP",
      value: r,
      message: "topP must be a number"
    });
  if (n != null && typeof n != "number")
    throw new we({
      parameter: "topK",
      value: n,
      message: "topK must be a number"
    });
  if (a != null && typeof a != "number")
    throw new we({
      parameter: "presencePenalty",
      value: a,
      message: "presencePenalty must be a number"
    });
  if (s != null && typeof s != "number")
    throw new we({
      parameter: "frequencyPenalty",
      value: s,
      message: "frequencyPenalty must be a number"
    });
  if (i != null && !Number.isInteger(i))
    throw new we({
      parameter: "seed",
      value: i,
      message: "seed must be an integer"
    });
  if (u != null) {
    if (!Number.isInteger(u))
      throw new we({
        parameter: "maxRetries",
        value: u,
        message: "maxRetries must be an integer"
      });
    if (u < 0)
      throw new we({
        parameter: "maxRetries",
        value: u,
        message: "maxRetries must be >= 0"
      });
  }
  return {
    maxTokens: e,
    temperature: t ?? 0,
    topP: r,
    topK: n,
    presencePenalty: a,
    frequencyPenalty: s,
    stopSequences: o != null && o.length > 0 ? o : void 0,
    seed: i,
    maxRetries: u ?? 2
  };
}
var kn = d.lazy(
  () => d.union([
    d.null(),
    d.string(),
    d.number(),
    d.boolean(),
    d.record(d.string(), kn),
    d.array(kn)
  ])
), Ye = d.record(
  d.string(),
  d.record(d.string(), kn)
), pc = d.array(
  d.union([
    d.object({ type: d.literal("text"), text: d.string() }),
    d.object({
      type: d.literal("image"),
      data: d.string(),
      mimeType: d.string().optional()
    })
  ])
), Cs = d.object({
  type: d.literal("text"),
  text: d.string(),
  experimental_providerMetadata: Ye.optional()
}), mc = d.object({
  type: d.literal("image"),
  image: d.union([Ts, d.instanceof(URL)]),
  mimeType: d.string().optional(),
  experimental_providerMetadata: Ye.optional()
}), hc = d.object({
  type: d.literal("file"),
  data: d.union([Ts, d.instanceof(URL)]),
  mimeType: d.string(),
  experimental_providerMetadata: Ye.optional()
}), gc = d.object({
  type: d.literal("tool-call"),
  toolCallId: d.string(),
  toolName: d.string(),
  args: d.unknown()
}), yc = d.object({
  type: d.literal("tool-result"),
  toolCallId: d.string(),
  toolName: d.string(),
  result: d.unknown(),
  content: pc.optional(),
  isError: d.boolean().optional(),
  experimental_providerMetadata: Ye.optional()
}), vc = d.object({
  role: d.literal("system"),
  content: d.string(),
  experimental_providerMetadata: Ye.optional()
}), _c = d.object({
  role: d.literal("user"),
  content: d.union([
    d.string(),
    d.array(d.union([Cs, mc, hc]))
  ]),
  experimental_providerMetadata: Ye.optional()
}), bc = d.object({
  role: d.literal("assistant"),
  content: d.union([
    d.string(),
    d.array(d.union([Cs, gc]))
  ]),
  experimental_providerMetadata: Ye.optional()
}), wc = d.object({
  role: d.literal("tool"),
  content: d.array(yc),
  experimental_providerMetadata: Ye.optional()
}), xc = d.union([
  vc,
  _c,
  bc,
  wc
]);
function Tc(e) {
  if (!Array.isArray(e))
    return "other";
  if (e.length === 0)
    return "messages";
  const t = e.map(kc);
  return t.some((r) => r === "has-ui-specific-parts") ? "ui-messages" : t.every(
    (r) => r === "has-core-specific-parts" || r === "message"
  ) ? "messages" : "other";
}
function kc(e) {
  return typeof e == "object" && e !== null && (e.role === "function" || // UI-only role
  e.role === "data" || // UI-only role
  "toolInvocations" in e || // UI-specific field
  "experimental_attachments" in e) ? "has-ui-specific-parts" : typeof e == "object" && e !== null && "content" in e && (Array.isArray(e.content) || // Core messages can have array content
  "experimental_providerMetadata" in e) ? "has-core-specific-parts" : typeof e == "object" && e !== null && "role" in e && "content" in e && typeof e.content == "string" && ["system", "user", "assistant", "tool"].includes(e.role) ? "message" : "other";
}
function Sc(e) {
  var t, r, n;
  const a = [];
  for (const s of e) {
    let o;
    try {
      o = new URL(s.url);
    } catch {
      throw new Error(`Invalid URL: ${s.url}`);
    }
    switch (o.protocol) {
      case "http:":
      case "https:": {
        if ((t = s.contentType) != null && t.startsWith("image/"))
          a.push({ type: "image", image: o });
        else {
          if (!s.contentType)
            throw new Error(
              "If the attachment is not an image, it must specify a content type"
            );
          a.push({
            type: "file",
            data: o,
            mimeType: s.contentType
          });
        }
        break;
      }
      case "data:": {
        let i, u, l;
        try {
          [i, u] = s.url.split(","), l = i.split(";")[0].split(":")[1];
        } catch {
          throw new Error(`Error processing data URL: ${s.url}`);
        }
        if (l == null || u == null)
          throw new Error(`Invalid data URL format: ${s.url}`);
        if ((r = s.contentType) != null && r.startsWith("image/"))
          a.push({
            type: "image",
            image: Rr(u)
          });
        else if ((n = s.contentType) != null && n.startsWith("text/"))
          a.push({
            type: "text",
            text: nc(
              Rr(u)
            )
          });
        else {
          if (!s.contentType)
            throw new Error(
              "If the attachment is not an image or text, it must specify a content type"
            );
          a.push({
            type: "file",
            data: u,
            mimeType: s.contentType
          });
        }
        break;
      }
      default:
        throw new Error(`Unsupported URL protocol: ${o.protocol}`);
    }
  }
  return a;
}
var As = "AI_MessageConversionError", Rs = `vercel.ai.error.${As}`, Ec = Symbol.for(Rs), Ns, la = class extends O {
  constructor({
    originalMessage: e,
    message: t
  }) {
    super({ name: As, message: t }), this[Ns] = !0, this.originalMessage = e;
  }
  static isInstance(e) {
    return O.hasMarker(e, Rs);
  }
};
Ns = Ec;
function Ic(e, t) {
  var r;
  const n = (r = t == null ? void 0 : t.tools) != null ? r : {}, a = [];
  for (const s of e) {
    const { role: o, content: i, toolInvocations: u, experimental_attachments: l } = s;
    switch (o) {
      case "system": {
        a.push({
          role: "system",
          content: i
        });
        break;
      }
      case "user": {
        a.push({
          role: "user",
          content: l ? [
            { type: "text", text: i },
            ...Sc(l)
          ] : i
        });
        break;
      }
      case "assistant": {
        if (u == null) {
          a.push({ role: "assistant", content: i });
          break;
        }
        a.push({
          role: "assistant",
          content: [
            { type: "text", text: i },
            ...u.map(
              ({ toolCallId: c, toolName: f, args: y }) => ({
                type: "tool-call",
                toolCallId: c,
                toolName: f,
                args: y
              })
            )
          ]
        }), a.push({
          role: "tool",
          content: u.map((c) => {
            if (!("result" in c))
              throw new la({
                originalMessage: s,
                message: "ToolInvocation must have a result: " + JSON.stringify(c)
              });
            const { toolCallId: f, toolName: y, result: p } = c, m = n[y];
            return (m == null ? void 0 : m.experimental_toToolResultContent) != null ? {
              type: "tool-result",
              toolCallId: f,
              toolName: y,
              result: m.experimental_toToolResultContent(p),
              experimental_content: m.experimental_toToolResultContent(p)
            } : {
              type: "tool-result",
              toolCallId: f,
              toolName: y,
              result: p
            };
          })
        });
        break;
      }
      case "function":
      case "data":
      case "tool":
        break;
      default: {
        const c = o;
        throw new la({
          originalMessage: s,
          message: `Unsupported role: ${c}`
        });
      }
    }
  }
  return a;
}
function Cc({
  prompt: e,
  tools: t
}) {
  if (e.prompt == null && e.messages == null)
    throw new Qe({
      prompt: e,
      message: "prompt or messages must be defined"
    });
  if (e.prompt != null && e.messages != null)
    throw new Qe({
      prompt: e,
      message: "prompt and messages cannot be defined at the same time"
    });
  if (e.system != null && typeof e.system != "string")
    throw new Qe({
      prompt: e,
      message: "system must be a string"
    });
  if (e.prompt != null) {
    if (typeof e.prompt != "string")
      throw new Qe({
        prompt: e,
        message: "prompt must be a string"
      });
    return {
      type: "prompt",
      system: e.system,
      messages: [
        {
          role: "user",
          content: e.prompt
        }
      ]
    };
  }
  if (e.messages != null) {
    const r = Tc(e.messages);
    if (r === "other")
      throw new Qe({
        prompt: e,
        message: "messages must be an array of CoreMessage or UIMessage"
      });
    const n = r === "ui-messages" ? Ic(e.messages, {
      tools: t
    }) : e.messages, a = Dr({
      value: n,
      schema: d.array(xc)
    });
    if (!a.success)
      throw new Qe({
        prompt: e,
        message: "messages must be an array of CoreMessage or UIMessage",
        cause: a.error
      });
    return {
      type: "messages",
      messages: n,
      system: e.system
    };
  }
  throw new Error("unreachable");
}
function Ac(e) {
  return {
    promptTokens: e.promptTokens,
    completionTokens: e.completionTokens,
    totalTokens: e.promptTokens + e.completionTokens
  };
}
function Nr(e, {
  contentType: t,
  dataStreamVersion: r
}) {
  var n;
  const a = new Headers((n = e == null ? void 0 : e.headers) != null ? n : {});
  return a.has("Content-Type") || a.set("Content-Type", t), r !== void 0 && a.set("X-Vercel-AI-Data-Stream", r), a;
}
function ua(e, t) {
  const r = e.pipeThrough(
    new TransformStream(t)
  );
  return r[Symbol.asyncIterator] = () => {
    const n = r.getReader();
    return {
      async next() {
        const { done: a, value: s } = await n.read();
        return a ? { done: !0, value: void 0 } : { done: !1, value: s };
      }
    };
  }, r;
}
ur({ prefix: "aiobj", size: 24 });
function Ee() {
  let e, t;
  return {
    promise: new Promise((n, a) => {
      e = n, t = a;
    }),
    resolve: e,
    reject: t
  };
}
function Rc() {
  var e, t;
  return (t = (e = globalThis == null ? void 0 : globalThis.performance) == null ? void 0 : e.now()) != null ? t : Date.now();
}
function ca(e, {
  contentType: t,
  dataStreamVersion: r
}) {
  const n = {};
  if ((e == null ? void 0 : e.headers) != null)
    for (const [a, s] of Object.entries(e.headers))
      n[a] = s;
  return n["Content-Type"] == null && (n["Content-Type"] = t), r !== void 0 && (n["X-Vercel-AI-Data-Stream"] = r), n;
}
function da({
  response: e,
  status: t,
  statusText: r,
  headers: n,
  stream: a
}) {
  e.writeHead(t ?? 200, r, n);
  const s = a.getReader();
  (async () => {
    try {
      for (; ; ) {
        const { done: i, value: u } = await s.read();
        if (i)
          break;
        e.write(u);
      }
    } catch (i) {
      throw i;
    } finally {
      e.end();
    }
  })();
}
ur({ prefix: "aiobj", size: 24 });
var Sn = "AI_InvalidToolArgumentsError", Os = `vercel.ai.error.${Sn}`, Nc = Symbol.for(Os), Ps, Oc = class extends O {
  constructor({
    toolArgs: e,
    toolName: t,
    cause: r,
    message: n = `Invalid arguments for tool ${t}: ${In(
      r
    )}`
  }) {
    super({ name: Sn, message: n, cause: r }), this[Ps] = !0, this.toolArgs = e, this.toolName = t;
  }
  static isInstance(e) {
    return O.hasMarker(e, Os);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidToolArgumentsError(e) {
    return e instanceof Error && e.name === Sn && typeof e.toolName == "string" && typeof e.toolArgs == "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      toolName: this.toolName,
      toolArgs: this.toolArgs
    };
  }
};
Ps = Nc;
var En = "AI_NoSuchToolError", Ms = `vercel.ai.error.${En}`, Pc = Symbol.for(Ms), js, Or = class extends O {
  constructor({
    toolName: e,
    availableTools: t = void 0,
    message: r = `Model tried to call unavailable tool '${e}'. ${t === void 0 ? "No tools are available." : `Available tools: ${t.join(", ")}.`}`
  }) {
    super({ name: En, message: r }), this[js] = !0, this.toolName = e, this.availableTools = t;
  }
  static isInstance(e) {
    return O.hasMarker(e, Ms);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isNoSuchToolError(e) {
    return e instanceof Error && e.name === En && "toolName" in e && e.toolName != null && typeof e.name == "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      toolName: this.toolName,
      availableTools: this.availableTools
    };
  }
};
js = Pc;
function Mc(e) {
  return e != null && Object.keys(e).length > 0;
}
function jc({
  tools: e,
  toolChoice: t,
  activeTools: r
}) {
  return Mc(e) ? {
    tools: (r != null ? Object.entries(e).filter(
      ([a]) => r.includes(a)
    ) : Object.entries(e)).map(([a, s]) => {
      const o = s.type;
      switch (o) {
        case void 0:
        case "function":
          return {
            type: "function",
            name: a,
            description: s.description,
            parameters: os(s.parameters).jsonSchema
          };
        case "provider-defined":
          return {
            type: "provider-defined",
            name: a,
            id: s.id,
            args: s.args
          };
        default: {
          const i = o;
          throw new Error(`Unsupported tool type: ${i}`);
        }
      }
    }),
    toolChoice: t == null ? { type: "auto" } : typeof t == "string" ? { type: t } : { type: "tool", toolName: t.toolName }
  } : {
    tools: void 0,
    toolChoice: void 0
  };
}
var Dc = /^([\s\S]*?)(\s+)(\S*)$/;
function $c(e) {
  const t = e.match(Dc);
  return t ? { prefix: t[1], whitespace: t[2], suffix: t[3] } : void 0;
}
function Zc({
  toolCall: e,
  tools: t
}) {
  const r = e.toolName;
  if (t == null)
    throw new Or({ toolName: e.toolName });
  const n = t[r];
  if (n == null)
    throw new Or({
      toolName: e.toolName,
      availableTools: Object.keys(t)
    });
  const a = os(n.parameters), s = e.args.trim() === "" ? Dr({ value: {}, schema: a }) : An({ text: e.args, schema: a });
  if (s.success === !1)
    throw new Oc({
      toolName: r,
      toolArgs: e.args,
      cause: s.error
    });
  return {
    type: "tool-call",
    toolCallId: e.toolCallId,
    toolName: r,
    args: s.value
  };
}
function Lc({
  text: e = "",
  tools: t,
  toolCalls: r,
  toolResults: n
}) {
  const a = [];
  return a.push({
    role: "assistant",
    content: [{ type: "text", text: e }, ...r]
  }), n.length > 0 && a.push({
    role: "tool",
    content: n.map((s) => {
      const o = t[s.toolName];
      return (o == null ? void 0 : o.experimental_toToolResultContent) != null ? {
        type: "tool-result",
        toolCallId: s.toolCallId,
        toolName: s.toolName,
        result: o.experimental_toToolResultContent(s.result),
        experimental_content: o.experimental_toToolResultContent(
          s.result
        )
      } : {
        type: "tool-result",
        toolCallId: s.toolCallId,
        toolName: s.toolName,
        result: s.result
      };
    })
  }), a;
}
ur({ prefix: "aitxt", size: 24 });
function Uc() {
  let e = [], t = null, r = !1;
  const n = async () => {
    if (r && e.length === 0) {
      t == null || t.close();
      return;
    }
    if (e.length !== 0)
      try {
        const { value: a, done: s } = await e[0].read();
        s ? (e.shift(), e.length > 0 ? await n() : r && (t == null || t.close())) : t == null || t.enqueue(a);
      } catch (a) {
        t == null || t.error(a), e.shift(), r && e.length === 0 && (t == null || t.close());
      }
  };
  return {
    stream: new ReadableStream({
      start(a) {
        t = a;
      },
      pull: n,
      async cancel() {
        for (const a of e)
          await a.cancel();
        e = [], r = !0;
      }
    }),
    addStream: (a) => {
      if (r)
        throw new Error("Cannot add inner stream: outer stream is closed");
      e.push(a.getReader());
    },
    close: () => {
      r = !0, e.length === 0 && (t == null || t.close());
    }
  };
}
function Zn(e, t) {
  const r = e.getReader(), n = t.getReader();
  let a, s, o = !1, i = !1;
  async function u(c) {
    try {
      a == null && (a = r.read());
      const f = await a;
      a = void 0, f.done ? c.close() : c.enqueue(f.value);
    } catch (f) {
      c.error(f);
    }
  }
  async function l(c) {
    try {
      s == null && (s = n.read());
      const f = await s;
      s = void 0, f.done ? c.close() : c.enqueue(f.value);
    } catch (f) {
      c.error(f);
    }
  }
  return new ReadableStream({
    async pull(c) {
      try {
        if (o) {
          await l(c);
          return;
        }
        if (i) {
          await u(c);
          return;
        }
        a == null && (a = r.read()), s == null && (s = n.read());
        const { result: f, reader: y } = await Promise.race([
          a.then((p) => ({ result: p, reader: r })),
          s.then((p) => ({ result: p, reader: n }))
        ]);
        f.done || c.enqueue(f.value), y === r ? (a = void 0, f.done && (await l(c), o = !0)) : (s = void 0, f.done && (i = !0, await u(c)));
      } catch (f) {
        c.error(f);
      }
    },
    cancel() {
      r.cancel(), n.cancel();
    }
  });
}
function Vc({
  tools: e,
  generatorStream: t,
  toolCallStreaming: r,
  tracer: n,
  telemetry: a,
  abortSignal: s
}) {
  let o = null;
  const i = new ReadableStream({
    start(m) {
      o = m;
    }
  }), u = {}, l = /* @__PURE__ */ new Set();
  let c = !1, f;
  function y() {
    c && l.size === 0 && (f != null && o.enqueue(f), o.close());
  }
  const p = new TransformStream({
    transform(m, _) {
      const T = m.type;
      switch (T) {
        case "text-delta":
        case "response-metadata":
        case "error": {
          _.enqueue(m);
          break;
        }
        case "tool-call-delta": {
          r && (u[m.toolCallId] || (_.enqueue({
            type: "tool-call-streaming-start",
            toolCallId: m.toolCallId,
            toolName: m.toolName
          }), u[m.toolCallId] = !0), _.enqueue({
            type: "tool-call-delta",
            toolCallId: m.toolCallId,
            toolName: m.toolName,
            argsTextDelta: m.argsTextDelta
          }));
          break;
        }
        case "tool-call": {
          const b = m.toolName;
          if (e == null) {
            o.enqueue({
              type: "error",
              error: new Or({ toolName: m.toolName })
            });
            break;
          }
          const v = e[b];
          if (v == null) {
            o.enqueue({
              type: "error",
              error: new Or({
                toolName: m.toolName,
                availableTools: Object.keys(e)
              })
            });
            break;
          }
          try {
            const k = Zc({
              toolCall: m,
              tools: e
            });
            if (_.enqueue(k), v.execute != null) {
              const P = Be();
              l.add(P), _n({
                name: "ai.toolCall",
                attributes: ht({
                  telemetry: a,
                  attributes: {
                    ...vn({
                      operationId: "ai.toolCall",
                      telemetry: a
                    }),
                    "ai.toolCall.name": k.toolName,
                    "ai.toolCall.id": k.toolCallId,
                    "ai.toolCall.args": {
                      output: () => JSON.stringify(k.args)
                    }
                  }
                }),
                tracer: n,
                fn: async (M) => v.execute(k.args, { abortSignal: s }).then(
                  (E) => {
                    o.enqueue({
                      ...k,
                      type: "tool-result",
                      result: E
                    }), l.delete(P), y();
                    try {
                      M.setAttributes(
                        ht({
                          telemetry: a,
                          attributes: {
                            "ai.toolCall.result": {
                              output: () => JSON.stringify(E)
                            }
                          }
                        })
                      );
                    } catch {
                    }
                  },
                  (E) => {
                    o.enqueue({
                      type: "error",
                      error: E
                    }), l.delete(P), y();
                  }
                )
              });
            }
          } catch (k) {
            o.enqueue({
              type: "error",
              error: k
            });
          }
          break;
        }
        case "finish": {
          f = {
            type: "finish",
            finishReason: m.finishReason,
            logprobs: m.logprobs,
            usage: Ac(m.usage),
            experimental_providerMetadata: m.providerMetadata
          };
          break;
        }
        default: {
          const b = T;
          throw new Error(`Unhandled chunk type: ${b}`);
        }
      }
    },
    flush() {
      c = !0, y();
    }
  });
  return new ReadableStream({
    async start(m) {
      return Promise.all([
        t.pipeThrough(p).pipeTo(
          new WritableStream({
            write(_) {
              m.enqueue(_);
            },
            close() {
            }
          })
        ),
        i.pipeTo(
          new WritableStream({
            write(_) {
              m.enqueue(_);
            },
            close() {
              m.close();
            }
          })
        )
      ]);
    }
  });
}
var qc = ur({ prefix: "aitxt", size: 24 });
async function Bc({
  model: e,
  tools: t,
  toolChoice: r,
  system: n,
  prompt: a,
  messages: s,
  maxRetries: o,
  abortSignal: i,
  headers: u,
  maxToolRoundtrips: l = 0,
  maxSteps: c = l != null ? l + 1 : 1,
  experimental_continueSteps: f = !1,
  experimental_telemetry: y,
  experimental_providerMetadata: p,
  experimental_toolCallStreaming: m = !1,
  experimental_activeTools: _,
  onChunk: T,
  onFinish: b,
  onStepFinish: v,
  _internal: {
    now: k = Rc,
    generateId: P = qc,
    currentDate: M = () => /* @__PURE__ */ new Date()
  } = {},
  ...E
}) {
  if (c < 1)
    throw new we({
      parameter: "maxSteps",
      value: c,
      message: "maxSteps must be at least 1"
    });
  const C = Wu({
    model: e,
    telemetry: y,
    headers: u,
    settings: { ...E, maxRetries: o }
  }), j = Ku(y), L = Cc({
    prompt: { system: n, prompt: a, messages: s },
    tools: t
  });
  return _n({
    name: "ai.streamText",
    attributes: ht({
      telemetry: y,
      attributes: {
        ...vn({ operationId: "ai.streamText", telemetry: y }),
        ...C,
        // specific settings that only make sense on the outer level:
        "ai.prompt": {
          input: () => JSON.stringify({ system: n, prompt: a, messages: s })
        },
        "ai.settings.maxSteps": c
      }
    }),
    tracer: j,
    endWhenDone: !1,
    fn: async (W) => {
      const z = zu({ maxRetries: o }), $ = async ({
        responseMessages: ge
      }) => {
        const ye = ge.length === 0 ? L.type : "messages", Ne = await ic({
          prompt: {
            type: ye,
            system: L.system,
            messages: [...L.messages, ...ge]
          },
          modelSupportsImageUrls: e.supportsImageUrls,
          modelSupportsUrl: e.supportsUrl
        }), B = {
          type: "regular",
          ...jc({ tools: t, toolChoice: r, activeTools: _ })
        }, {
          result: { stream: Oe, warnings: le, rawResponse: A, request: q },
          doStreamSpan: G,
          startTimestampMs: fe
        } = await z(
          () => _n({
            name: "ai.streamText.doStream",
            attributes: ht({
              telemetry: y,
              attributes: {
                ...vn({
                  operationId: "ai.streamText.doStream",
                  telemetry: y
                }),
                ...C,
                "ai.prompt.format": {
                  input: () => ye
                },
                "ai.prompt.messages": {
                  input: () => JSON.stringify(Ne)
                },
                "ai.prompt.tools": {
                  // convert the language model level tools:
                  input: () => {
                    var ae;
                    return (ae = B.tools) == null ? void 0 : ae.map((qe) => JSON.stringify(qe));
                  }
                },
                "ai.prompt.toolChoice": {
                  input: () => B.toolChoice != null ? JSON.stringify(B.toolChoice) : void 0
                },
                // standardized gen-ai llm span attributes:
                "gen_ai.system": e.provider,
                "gen_ai.request.model": e.modelId,
                "gen_ai.request.frequency_penalty": E.frequencyPenalty,
                "gen_ai.request.max_tokens": E.maxTokens,
                "gen_ai.request.presence_penalty": E.presencePenalty,
                "gen_ai.request.stop_sequences": E.stopSequences,
                "gen_ai.request.temperature": E.temperature,
                "gen_ai.request.top_k": E.topK,
                "gen_ai.request.top_p": E.topP
              }
            }),
            tracer: j,
            endWhenDone: !1,
            fn: async (ae) => ({
              startTimestampMs: k(),
              // get before the call
              doStreamSpan: ae,
              result: await e.doStream({
                mode: B,
                ...fc(E),
                inputFormat: ye,
                prompt: Ne,
                providerMetadata: p,
                abortSignal: i,
                headers: u
              })
            })
          })
        );
        return {
          result: {
            stream: Vc({
              tools: t,
              generatorStream: Oe,
              toolCallStreaming: m,
              tracer: j,
              telemetry: y,
              abortSignal: i
            }),
            warnings: le,
            request: q ?? {},
            rawResponse: A
          },
          doStreamSpan: G,
          startTimestampMs: fe
        };
      }, {
        result: { stream: H, warnings: ne, rawResponse: K, request: X },
        doStreamSpan: Y,
        startTimestampMs: ie
      } = await $({ responseMessages: [] });
      return new Fc({
        stream: H,
        warnings: ne,
        rawResponse: K,
        request: X,
        onChunk: T,
        onFinish: b,
        onStepFinish: v,
        rootSpan: W,
        doStreamSpan: Y,
        telemetry: y,
        startTimestampMs: ie,
        maxSteps: c,
        continueSteps: f,
        startStep: $,
        modelId: e.modelId,
        now: k,
        currentDate: M,
        generateId: P,
        tools: t
      });
    }
  });
}
var Fc = class {
  constructor({
    stream: e,
    warnings: t,
    rawResponse: r,
    request: n,
    onChunk: a,
    onFinish: s,
    onStepFinish: o,
    rootSpan: i,
    doStreamSpan: u,
    telemetry: l,
    startTimestampMs: c,
    maxSteps: f,
    continueSteps: y,
    startStep: p,
    modelId: m,
    now: _,
    currentDate: T,
    generateId: b,
    tools: v
  }) {
    this.warnings = t, this.rawResponse = r;
    const { resolve: k, promise: P } = Ee();
    this.usage = P;
    const { resolve: M, promise: E } = Ee();
    this.finishReason = E;
    const { resolve: C, promise: j } = Ee();
    this.text = j;
    const { resolve: L, promise: W } = Ee();
    this.toolCalls = W;
    const { resolve: z, promise: $ } = Ee();
    this.toolResults = $;
    const { resolve: H, promise: ne } = Ee();
    this.steps = ne;
    const {
      resolve: K,
      promise: X
    } = Ee();
    this.experimental_providerMetadata = X;
    const { resolve: Y, promise: ie } = Ee();
    this.request = ie;
    const { resolve: ge, promise: ye } = Ee();
    this.response = ye;
    const {
      resolve: Ne,
      promise: B
    } = Ee();
    this.responseMessages = B;
    const {
      stream: Oe,
      addStream: le,
      close: A
    } = Uc();
    this.originalStream = Oe;
    const q = [], G = this;
    function fe({
      stream: ae,
      startTimestamp: qe,
      doStreamSpan: ve,
      currentStep: pe,
      responseMessages: Q,
      usage: Pe = {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      },
      stepType: Me,
      previousStepText: Zr = "",
      stepRequest: yt,
      hasLeadingWhitespace: vt
    }) {
      const se = [], je = [];
      let ee = "unknown", ue = {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      }, De, _t = !0, Ke = "", at = Me === "continue" ? Zr : "", bt, ce = {
        id: b(),
        timestamp: T(),
        modelId: m
      }, st = "", Vn = !1, qn = !0, Bn = !1;
      async function Lr({
        controller: U,
        chunk: te
      }) {
        U.enqueue(te), Ke += te.textDelta, at += te.textDelta, Vn = !0, Bn = te.textDelta.trimEnd() !== te.textDelta, await (a == null ? void 0 : a({ chunk: te }));
      }
      le(
        ae.pipeThrough(
          new TransformStream({
            async transform(U, te) {
              var Ge, Se, wt;
              if (_t) {
                const F = _() - qe;
                _t = !1, ve.addEvent("ai.stream.firstChunk", {
                  "ai.response.msToFirstChunk": F,
                  // deprecated:
                  "ai.stream.msToFirstChunk": F
                }), ve.setAttributes({
                  "ai.response.msToFirstChunk": F,
                  // deprecated:
                  "ai.stream.msToFirstChunk": F
                });
              }
              if (U.type === "text-delta" && U.textDelta.length === 0)
                return;
              const $e = U.type;
              switch ($e) {
                case "text-delta": {
                  if (y) {
                    const F = qn && vt ? U.textDelta.trimStart() : U.textDelta;
                    if (F.length === 0)
                      break;
                    qn = !1, st += F;
                    const ot = $c(st);
                    ot != null && (st = ot.suffix, await Lr({
                      controller: te,
                      chunk: {
                        type: "text-delta",
                        textDelta: ot.prefix + ot.whitespace
                      }
                    }));
                  } else
                    await Lr({ controller: te, chunk: U });
                  break;
                }
                case "tool-call": {
                  te.enqueue(U), se.push(U), await (a == null ? void 0 : a({ chunk: U }));
                  break;
                }
                case "tool-result": {
                  te.enqueue(U), je.push(U), await (a == null ? void 0 : a({ chunk: U }));
                  break;
                }
                case "response-metadata": {
                  ce = {
                    id: (Ge = U.id) != null ? Ge : ce.id,
                    timestamp: (Se = U.timestamp) != null ? Se : ce.timestamp,
                    modelId: (wt = U.modelId) != null ? wt : ce.modelId
                  };
                  break;
                }
                case "finish": {
                  ue = U.usage, ee = U.finishReason, De = U.experimental_providerMetadata, bt = U.logprobs;
                  const F = _() - qe;
                  ve.addEvent("ai.stream.finish"), ve.setAttributes({
                    "ai.response.msToFinish": F,
                    "ai.response.avgCompletionTokensPerSecond": 1e3 * ue.completionTokens / F
                  });
                  break;
                }
                case "tool-call-streaming-start":
                case "tool-call-delta": {
                  te.enqueue(U), await (a == null ? void 0 : a({ chunk: U }));
                  break;
                }
                case "error": {
                  te.enqueue(U), ee = "error";
                  break;
                }
                default: {
                  const F = $e;
                  throw new Error(`Unknown chunk type: ${F}`);
                }
              }
            },
            // invoke onFinish callback and resolve toolResults promise when the stream is about to close:
            async flush(U) {
              var te;
              const Ge = se.length > 0 ? JSON.stringify(se) : void 0;
              let Se = "done";
              pe + 1 < f && (y && ee === "length" && // only use continue when there are no tool calls:
              se.length === 0 ? Se = "continue" : (
                // there are tool calls:
                se.length > 0 && // all current tool calls have results:
                je.length === se.length && (Se = "tool-result")
              )), y && st.length > 0 && (Se !== "continue" || // when the next step is a regular step, publish the buffer
              Me === "continue" && !Vn) && (await Lr({
                controller: U,
                chunk: {
                  type: "text-delta",
                  textDelta: st
                }
              }), st = "");
              try {
                ve.setAttributes(
                  ht({
                    telemetry: l,
                    attributes: {
                      "ai.response.finishReason": ee,
                      "ai.response.text": { output: () => Ke },
                      "ai.response.toolCalls": {
                        output: () => Ge
                      },
                      "ai.response.id": ce.id,
                      "ai.response.model": ce.modelId,
                      "ai.response.timestamp": ce.timestamp.toISOString(),
                      "ai.usage.promptTokens": ue.promptTokens,
                      "ai.usage.completionTokens": ue.completionTokens,
                      // deprecated
                      "ai.finishReason": ee,
                      "ai.result.text": { output: () => Ke },
                      "ai.result.toolCalls": {
                        output: () => Ge
                      },
                      // standardized gen-ai llm span attributes:
                      "gen_ai.response.finish_reasons": [ee],
                      "gen_ai.response.id": ce.id,
                      "gen_ai.response.model": ce.modelId,
                      "gen_ai.usage.input_tokens": ue.promptTokens,
                      "gen_ai.usage.output_tokens": ue.completionTokens
                    }
                  })
                );
              } catch {
              } finally {
                ve.end();
              }
              if (U.enqueue({
                type: "step-finish",
                finishReason: ee,
                usage: ue,
                experimental_providerMetadata: De,
                logprobs: bt,
                response: {
                  ...ce
                },
                isContinued: Se === "continue"
              }), Me === "continue") {
                const F = Q[Q.length - 1];
                typeof F.content == "string" ? F.content += Ke : F.content.push({
                  text: Ke,
                  type: "text"
                });
              } else
                Q.push(
                  ...Lc({
                    text: Ke,
                    tools: v ?? {},
                    toolCalls: se,
                    toolResults: je
                  })
                );
              const wt = {
                stepType: Me,
                text: Ke,
                toolCalls: se,
                toolResults: je,
                finishReason: ee,
                usage: ue,
                warnings: G.warnings,
                logprobs: bt,
                request: yt,
                rawResponse: G.rawResponse,
                response: {
                  ...ce,
                  headers: (te = G.rawResponse) == null ? void 0 : te.headers,
                  // deep clone msgs to avoid mutating past messages in multi-step:
                  messages: JSON.parse(JSON.stringify(Q))
                },
                experimental_providerMetadata: De,
                isContinued: Se === "continue"
              };
              q.push(wt), await (o == null ? void 0 : o(wt));
              const $e = {
                promptTokens: Pe.promptTokens + ue.promptTokens,
                completionTokens: Pe.completionTokens + ue.completionTokens,
                totalTokens: Pe.totalTokens + ue.totalTokens
              };
              if (Se !== "done") {
                const {
                  result: F,
                  doStreamSpan: ot,
                  startTimestampMs: Vs
                } = await p({ responseMessages: Q });
                G.warnings = F.warnings, G.rawResponse = F.rawResponse, fe({
                  stream: F.stream,
                  startTimestamp: Vs,
                  doStreamSpan: ot,
                  currentStep: pe + 1,
                  responseMessages: Q,
                  usage: $e,
                  stepType: Se,
                  previousStepText: at,
                  stepRequest: F.request,
                  hasLeadingWhitespace: Bn
                });
                return;
              }
              try {
                U.enqueue({
                  type: "finish",
                  finishReason: ee,
                  usage: $e,
                  experimental_providerMetadata: De,
                  logprobs: bt,
                  response: {
                    ...ce
                  }
                }), A(), i.setAttributes(
                  ht({
                    telemetry: l,
                    attributes: {
                      "ai.response.finishReason": ee,
                      "ai.response.text": { output: () => at },
                      "ai.response.toolCalls": {
                        output: () => Ge
                      },
                      "ai.usage.promptTokens": $e.promptTokens,
                      "ai.usage.completionTokens": $e.completionTokens,
                      // deprecated
                      "ai.finishReason": ee,
                      "ai.result.text": { output: () => at },
                      "ai.result.toolCalls": {
                        output: () => Ge
                      }
                    }
                  })
                ), k($e), M(ee), C(at), L(se), K(De), z(je), Y(yt), ge({
                  ...ce,
                  headers: r == null ? void 0 : r.headers,
                  messages: Q
                }), H(q), Ne(Q), await (s == null ? void 0 : s({
                  finishReason: ee,
                  logprobs: bt,
                  usage: $e,
                  text: at,
                  toolCalls: se,
                  // The tool results are inferred as a never[] type, because they are
                  // optional and the execute method with an inferred result type is
                  // optional as well. Therefore we need to cast the toolResults to any.
                  // The type exposed to the users will be correctly inferred.
                  toolResults: je,
                  request: yt,
                  rawResponse: r,
                  response: {
                    ...ce,
                    headers: r == null ? void 0 : r.headers,
                    messages: Q
                  },
                  warnings: t,
                  experimental_providerMetadata: De,
                  steps: q,
                  responseMessages: Q
                }));
              } catch (F) {
                U.error(F);
              } finally {
                i.end();
              }
            }
          })
        )
      );
    }
    fe({
      stream: e,
      startTimestamp: c,
      doStreamSpan: u,
      currentStep: 0,
      responseMessages: [],
      usage: void 0,
      stepType: "initial",
      stepRequest: n,
      hasLeadingWhitespace: !1
    });
  }
  /**
  Split out a new stream from the original stream.
  The original stream is replaced to allow for further splitting,
  since we do not know how many times the stream will be split.
  
  Note: this leads to buffering the stream content on the server.
  However, the LLM results are expected to be small enough to not cause issues.
     */
  teeStream() {
    const [e, t] = this.originalStream.tee();
    return this.originalStream = t, e;
  }
  get textStream() {
    return ua(this.teeStream(), {
      transform(e, t) {
        e.type === "text-delta" ? t.enqueue(e.textDelta) : e.type === "error" && t.error(e.error);
      }
    });
  }
  get fullStream() {
    return ua(this.teeStream(), {
      transform(e, t) {
        t.enqueue(e);
      }
    });
  }
  toAIStream(e = {}) {
    return this.toDataStreamInternal({ callbacks: e });
  }
  toDataStreamInternal({
    callbacks: e = {},
    getErrorMessage: t = () => "",
    // mask error messages for safety by default
    sendUsage: r = !0
  } = {}) {
    let n = "";
    const a = new TransformStream({
      async start() {
        e.onStart && await e.onStart();
      },
      async transform(o, i) {
        if (i.enqueue(o), o.type === "text-delta") {
          const u = o.textDelta;
          n += u, e.onToken && await e.onToken(u), e.onText && await e.onText(u);
        }
      },
      async flush() {
        e.onCompletion && await e.onCompletion(n), e.onFinal && await e.onFinal(n);
      }
    }), s = new TransformStream({
      transform: async (o, i) => {
        const u = o.type;
        switch (u) {
          case "text-delta": {
            i.enqueue(Le("text", o.textDelta));
            break;
          }
          case "tool-call-streaming-start": {
            i.enqueue(
              Le("tool_call_streaming_start", {
                toolCallId: o.toolCallId,
                toolName: o.toolName
              })
            );
            break;
          }
          case "tool-call-delta": {
            i.enqueue(
              Le("tool_call_delta", {
                toolCallId: o.toolCallId,
                argsTextDelta: o.argsTextDelta
              })
            );
            break;
          }
          case "tool-call": {
            i.enqueue(
              Le("tool_call", {
                toolCallId: o.toolCallId,
                toolName: o.toolName,
                args: o.args
              })
            );
            break;
          }
          case "tool-result": {
            i.enqueue(
              Le("tool_result", {
                toolCallId: o.toolCallId,
                result: o.result
              })
            );
            break;
          }
          case "error": {
            i.enqueue(
              Le("error", t(o.error))
            );
            break;
          }
          case "step-finish": {
            i.enqueue(
              Le("finish_step", {
                finishReason: o.finishReason,
                usage: r ? {
                  promptTokens: o.usage.promptTokens,
                  completionTokens: o.usage.completionTokens
                } : void 0,
                isContinued: o.isContinued
              })
            );
            break;
          }
          case "finish": {
            i.enqueue(
              Le("finish_message", {
                finishReason: o.finishReason,
                usage: r ? {
                  promptTokens: o.usage.promptTokens,
                  completionTokens: o.usage.completionTokens
                } : void 0
              })
            );
            break;
          }
          default: {
            const l = u;
            throw new Error(`Unknown chunk type: ${l}`);
          }
        }
      }
    });
    return this.fullStream.pipeThrough(a).pipeThrough(s).pipeThrough(new TextEncoderStream());
  }
  pipeAIStreamToResponse(e, t) {
    return this.pipeDataStreamToResponse(e, t);
  }
  pipeDataStreamToResponse(e, t) {
    const r = t == null ? void 0 : "init" in t ? t.init : {
      headers: "headers" in t ? t.headers : void 0,
      status: "status" in t ? t.status : void 0,
      statusText: "statusText" in t ? t.statusText : void 0
    }, n = t == null ? void 0 : "data" in t ? t.data : void 0, a = t == null ? void 0 : "getErrorMessage" in t ? t.getErrorMessage : void 0, s = t == null ? void 0 : "sendUsage" in t ? t.sendUsage : void 0;
    da({
      response: e,
      status: r == null ? void 0 : r.status,
      statusText: r == null ? void 0 : r.statusText,
      headers: ca(r, {
        contentType: "text/plain; charset=utf-8",
        dataStreamVersion: "v1"
      }),
      stream: this.toDataStream({ data: n, getErrorMessage: a, sendUsage: s })
    });
  }
  pipeTextStreamToResponse(e, t) {
    da({
      response: e,
      status: t == null ? void 0 : t.status,
      statusText: t == null ? void 0 : t.statusText,
      headers: ca(t, {
        contentType: "text/plain; charset=utf-8"
      }),
      stream: this.textStream.pipeThrough(new TextEncoderStream())
    });
  }
  toAIStreamResponse(e) {
    return this.toDataStreamResponse(e);
  }
  toDataStream(e) {
    const t = this.toDataStreamInternal({
      getErrorMessage: e == null ? void 0 : e.getErrorMessage,
      sendUsage: e == null ? void 0 : e.sendUsage
    });
    return e != null && e.data ? Zn(e == null ? void 0 : e.data.stream, t) : t;
  }
  toDataStreamResponse(e) {
    var t;
    const r = e == null ? void 0 : "init" in e ? e.init : {
      headers: "headers" in e ? e.headers : void 0,
      status: "status" in e ? e.status : void 0,
      statusText: "statusText" in e ? e.statusText : void 0
    }, n = e == null ? void 0 : "data" in e ? e.data : void 0, a = e == null ? void 0 : "getErrorMessage" in e ? e.getErrorMessage : void 0, s = e == null ? void 0 : "sendUsage" in e ? e.sendUsage : void 0;
    return new Response(
      this.toDataStream({ data: n, getErrorMessage: a, sendUsage: s }),
      {
        status: (t = r == null ? void 0 : r.status) != null ? t : 200,
        statusText: r == null ? void 0 : r.statusText,
        headers: Nr(r, {
          contentType: "text/plain; charset=utf-8",
          dataStreamVersion: "v1"
        })
      }
    );
  }
  toTextStreamResponse(e) {
    var t;
    return new Response(this.textStream.pipeThrough(new TextEncoderStream()), {
      status: (t = e == null ? void 0 : e.status) != null ? t : 200,
      headers: Nr(e, {
        contentType: "text/plain; charset=utf-8"
      })
    });
  }
};
function Ds(e) {
  const t = new TextEncoder();
  let r = "";
  const n = e || {};
  return new TransformStream({
    async start() {
      n.onStart && await n.onStart();
    },
    async transform(a, s) {
      const o = typeof a == "string" ? a : a.content;
      s.enqueue(t.encode(o)), r += o, n.onToken && await n.onToken(o), n.onText && typeof a == "string" && await n.onText(a);
    },
    async flush() {
      const a = Jc(n);
      n.onCompletion && await n.onCompletion(r), n.onFinal && !a && await n.onFinal(r);
    }
  });
}
function Jc(e) {
  return "experimental_onFunctionCall" in e;
}
function zc() {
  let e = !0;
  return (t) => (e && (t = t.trimStart(), t && (e = !1)), t);
}
function $s() {
  const e = new TextEncoder(), t = new TextDecoder();
  return new TransformStream({
    transform: async (r, n) => {
      const a = t.decode(r);
      n.enqueue(e.encode(Le("text", a)));
    }
  });
}
new TextDecoder("utf-8");
var Wc = {};
hs(Wc, {
  toAIStream: () => Hc,
  toDataStream: () => Ln,
  toDataStreamResponse: () => Yc
});
function Hc(e, t) {
  return Ln(e, t);
}
function Ln(e, t) {
  return e.pipeThrough(
    new TransformStream({
      transform: async (r, n) => {
        var a;
        if (typeof r == "string") {
          n.enqueue(r);
          return;
        }
        if ("event" in r) {
          r.event === "on_chat_model_stream" && fa(
            (a = r.data) == null ? void 0 : a.chunk,
            n
          );
          return;
        }
        fa(r, n);
      }
    })
  ).pipeThrough(Ds(t)).pipeThrough($s());
}
function Yc(e, t) {
  var r;
  const n = Ln(e, t == null ? void 0 : t.callbacks), a = t == null ? void 0 : t.data, s = t == null ? void 0 : t.init, o = a ? Zn(a.stream, n) : n;
  return new Response(o, {
    status: (r = s == null ? void 0 : s.status) != null ? r : 200,
    statusText: s == null ? void 0 : s.statusText,
    headers: Nr(s, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
function fa(e, t) {
  if (typeof e.content == "string")
    t.enqueue(e.content);
  else {
    const r = e.content;
    for (const n of r)
      n.type === "text" && t.enqueue(n.text);
  }
}
var Kc = {};
hs(Kc, {
  toDataStream: () => Zs,
  toDataStreamResponse: () => Gc
});
function Zs(e, t) {
  return Xc(e).pipeThrough(Ds(t)).pipeThrough($s());
}
function Gc(e, t = {}) {
  var r;
  const { init: n, data: a, callbacks: s } = t, o = Zs(e, s), i = a ? Zn(a.stream, o) : o;
  return new Response(i, {
    status: (r = n == null ? void 0 : n.status) != null ? r : 200,
    statusText: n == null ? void 0 : n.statusText,
    headers: Nr(n, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
function Xc(e) {
  const t = e[Symbol.asyncIterator](), r = zc();
  return new ReadableStream({
    async pull(n) {
      var a;
      const { value: s, done: o } = await t.next();
      if (o) {
        n.close();
        return;
      }
      const i = r((a = s.delta) != null ? a : "");
      i && n.enqueue(i);
    }
  });
}
function Qc({
  prompt: e,
  useLegacyFunctionCalling: t = !1
}) {
  const r = [];
  for (const { role: n, content: a } of e)
    switch (n) {
      case "system": {
        r.push({ role: "system", content: a });
        break;
      }
      case "user": {
        if (a.length === 1 && a[0].type === "text") {
          r.push({ role: "user", content: a[0].text });
          break;
        }
        r.push({
          role: "user",
          content: a.map((s) => {
            var o, i, u;
            switch (s.type) {
              case "text":
                return { type: "text", text: s.text };
              case "image":
                return {
                  type: "image_url",
                  image_url: {
                    url: s.image instanceof URL ? s.image.toString() : `data:${(o = s.mimeType) != null ? o : "image/jpeg"};base64,${cn(s.image)}`,
                    // OpenAI specific extension: image detail
                    detail: (u = (i = s.providerMetadata) == null ? void 0 : i.openai) == null ? void 0 : u.imageDetail
                  }
                };
              case "file": {
                if (s.data instanceof URL)
                  throw new de({
                    functionality: "'File content parts with URL data' functionality not supported."
                  });
                switch (s.mimeType) {
                  case "audio/wav":
                    return {
                      type: "input_audio",
                      input_audio: { data: s.data, format: "wav" }
                    };
                  case "audio/mp3":
                  case "audio/mpeg":
                    return {
                      type: "input_audio",
                      input_audio: { data: s.data, format: "mp3" }
                    };
                  default:
                    throw new de({
                      functionality: `File content part type ${s.mimeType} in user messages`
                    });
                }
              }
            }
          })
        });
        break;
      }
      case "assistant": {
        let s = "";
        const o = [];
        for (const i of a)
          switch (i.type) {
            case "text": {
              s += i.text;
              break;
            }
            case "tool-call": {
              o.push({
                id: i.toolCallId,
                type: "function",
                function: {
                  name: i.toolName,
                  arguments: JSON.stringify(i.args)
                }
              });
              break;
            }
            default: {
              const u = i;
              throw new Error(`Unsupported part: ${u}`);
            }
          }
        if (t) {
          if (o.length > 1)
            throw new de({
              functionality: "useLegacyFunctionCalling with multiple tool calls in one message"
            });
          r.push({
            role: "assistant",
            content: s,
            function_call: o.length > 0 ? o[0].function : void 0
          });
        } else
          r.push({
            role: "assistant",
            content: s,
            tool_calls: o.length > 0 ? o : void 0
          });
        break;
      }
      case "tool": {
        for (const s of a)
          t ? r.push({
            role: "function",
            name: s.toolName,
            content: JSON.stringify(s.result)
          }) : r.push({
            role: "tool",
            tool_call_id: s.toolCallId,
            content: JSON.stringify(s.result)
          });
        break;
      }
      default: {
        const s = n;
        throw new Error(`Unsupported role: ${s}`);
      }
    }
  return r;
}
function pa(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.content) == null ? void 0 : t.map(({ token: n, logprob: a, top_logprobs: s }) => ({
    token: n,
    logprob: a,
    topLogprobs: s ? s.map(({ token: o, logprob: i }) => ({
      token: o,
      logprob: i
    })) : []
  }))) != null ? r : void 0;
}
function Pr(e) {
  switch (e) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "content_filter":
      return "content-filter";
    case "function_call":
    case "tool_calls":
      return "tool-calls";
    default:
      return "unknown";
  }
}
var Un = d.object({
  error: d.object({
    message: d.string(),
    // The additional information below is handled loosely to support
    // OpenAI-compatible providers that have slightly different error
    // responses:
    type: d.string().nullish(),
    param: d.any().nullish(),
    code: d.union([d.string(), d.number()]).nullish()
  })
}), lr = Uo({
  errorSchema: Un,
  errorToMessage: (e) => e.error.message
});
function Mr({
  id: e,
  model: t,
  created: r
}) {
  return {
    id: e ?? void 0,
    modelId: t ?? void 0,
    timestamp: r != null ? new Date(r * 1e3) : void 0
  };
}
function ed({
  mode: e,
  useLegacyFunctionCalling: t = !1,
  structuredOutputs: r = !1
}) {
  var n;
  const a = (n = e.tools) != null && n.length ? e.tools : void 0, s = [];
  if (a == null)
    return { tools: void 0, tool_choice: void 0, toolWarnings: s };
  const o = e.toolChoice;
  if (t) {
    const l = [];
    for (const f of a)
      f.type === "provider-defined" ? s.push({ type: "unsupported-tool", tool: f }) : l.push({
        name: f.name,
        description: f.description,
        parameters: f.parameters
      });
    if (o == null)
      return {
        functions: l,
        function_call: void 0,
        toolWarnings: s
      };
    switch (o.type) {
      case "auto":
      case "none":
      case void 0:
        return {
          functions: l,
          function_call: void 0,
          toolWarnings: s
        };
      case "required":
        throw new de({
          functionality: "useLegacyFunctionCalling and toolChoice: required"
        });
      default:
        return {
          functions: l,
          function_call: { name: o.toolName },
          toolWarnings: s
        };
    }
  }
  const i = [];
  for (const l of a)
    l.type === "provider-defined" ? s.push({ type: "unsupported-tool", tool: l }) : i.push({
      type: "function",
      function: {
        name: l.name,
        description: l.description,
        parameters: l.parameters,
        strict: r === !0 ? !0 : void 0
      }
    });
  if (o == null)
    return { tools: i, tool_choice: void 0, toolWarnings: s };
  const u = o.type;
  switch (u) {
    case "auto":
    case "none":
    case "required":
      return { tools: i, tool_choice: u, toolWarnings: s };
    case "tool":
      return {
        tools: i,
        tool_choice: {
          type: "function",
          function: {
            name: o.toolName
          }
        },
        toolWarnings: s
      };
    default: {
      const l = u;
      throw new de({
        functionality: `Unsupported tool choice type: ${l}`
      });
    }
  }
}
var td = class {
  constructor(e, t, r) {
    this.specificationVersion = "v1", this.modelId = e, this.settings = t, this.config = r;
  }
  get supportsStructuredOutputs() {
    return this.settings.structuredOutputs === !0;
  }
  get defaultObjectGenerationMode() {
    return ad(this.modelId) ? "tool" : this.supportsStructuredOutputs ? "json" : "tool";
  }
  get provider() {
    return this.config.provider;
  }
  get supportsImageUrls() {
    return !this.settings.downloadImages;
  }
  getArgs({
    mode: e,
    prompt: t,
    maxTokens: r,
    temperature: n,
    topP: a,
    topK: s,
    frequencyPenalty: o,
    presencePenalty: i,
    stopSequences: u,
    responseFormat: l,
    seed: c,
    providerMetadata: f
  }) {
    var y, p, m, _, T, b, v, k, P;
    const M = e.type, E = [];
    s != null && E.push({
      type: "unsupported-setting",
      setting: "topK"
    }), l != null && l.type === "json" && l.schema != null && E.push({
      type: "unsupported-setting",
      setting: "responseFormat",
      details: "JSON response format schema is not supported"
    });
    const C = this.settings.useLegacyFunctionCalling;
    if (C && this.settings.parallelToolCalls === !0)
      throw new de({
        functionality: "useLegacyFunctionCalling with parallelToolCalls"
      });
    if (C && this.settings.structuredOutputs === !0)
      throw new de({
        functionality: "structuredOutputs with useLegacyFunctionCalling"
      });
    const j = {
      // model id:
      model: this.modelId,
      // model specific settings:
      logit_bias: this.settings.logitBias,
      logprobs: this.settings.logprobs === !0 || typeof this.settings.logprobs == "number" ? !0 : void 0,
      top_logprobs: typeof this.settings.logprobs == "number" ? this.settings.logprobs : typeof this.settings.logprobs == "boolean" && this.settings.logprobs ? 0 : void 0,
      user: this.settings.user,
      parallel_tool_calls: this.settings.parallelToolCalls,
      // standardized settings:
      max_tokens: r,
      temperature: n,
      top_p: a,
      frequency_penalty: o,
      presence_penalty: i,
      stop: u,
      seed: c,
      // openai specific settings:
      max_completion_tokens: (p = (y = f == null ? void 0 : f.openai) == null ? void 0 : y.maxCompletionTokens) != null ? p : void 0,
      store: (_ = (m = f == null ? void 0 : f.openai) == null ? void 0 : m.store) != null ? _ : void 0,
      metadata: (b = (T = f == null ? void 0 : f.openai) == null ? void 0 : T.metadata) != null ? b : void 0,
      prediction: (k = (v = f == null ? void 0 : f.openai) == null ? void 0 : v.prediction) != null ? k : void 0,
      // response format:
      response_format: (l == null ? void 0 : l.type) === "json" ? { type: "json_object" } : void 0,
      // messages:
      messages: Qc({
        prompt: t,
        useLegacyFunctionCalling: C
      })
    };
    switch (ma(this.modelId) && (j.temperature = void 0, j.top_p = void 0, j.frequency_penalty = void 0, j.presence_penalty = void 0), M) {
      case "regular": {
        const { tools: L, tool_choice: W, functions: z, function_call: $, toolWarnings: H } = ed({
          mode: e,
          useLegacyFunctionCalling: C,
          structuredOutputs: this.settings.structuredOutputs
        });
        return {
          args: {
            ...j,
            tools: L,
            tool_choice: W,
            functions: z,
            function_call: $
          },
          warnings: [...E, ...H]
        };
      }
      case "object-json":
        return {
          args: {
            ...j,
            response_format: this.settings.structuredOutputs === !0 && e.schema != null ? {
              type: "json_schema",
              json_schema: {
                schema: e.schema,
                strict: !0,
                name: (P = e.name) != null ? P : "response",
                description: e.description
              }
            } : { type: "json_object" }
          },
          warnings: E
        };
      case "object-tool":
        return {
          args: C ? {
            ...j,
            function_call: {
              name: e.tool.name
            },
            functions: [
              {
                name: e.tool.name,
                description: e.tool.description,
                parameters: e.tool.parameters
              }
            ]
          } : {
            ...j,
            tool_choice: {
              type: "function",
              function: { name: e.tool.name }
            },
            tools: [
              {
                type: "function",
                function: {
                  name: e.tool.name,
                  description: e.tool.description,
                  parameters: e.tool.parameters,
                  strict: this.settings.structuredOutputs === !0 ? !0 : void 0
                }
              }
            ]
          },
          warnings: E
        };
      default: {
        const L = M;
        throw new Error(`Unsupported type: ${L}`);
      }
    }
  }
  async doGenerate(e) {
    var t, r, n, a, s, o, i, u, l, c, f, y, p, m, _, T, b, v;
    const { args: k, warnings: P } = this.getArgs(e), { responseHeaders: M, value: E } = await At({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: Ct(this.config.headers(), e.headers),
      body: k,
      failedResponseHandler: lr,
      successfulResponseHandler: Rn(
        rd
      ),
      abortSignal: e.abortSignal,
      fetch: this.config.fetch
    }), { messages: C, ...j } = k, L = E.choices[0];
    let W;
    return (((r = (t = E.usage) == null ? void 0 : t.completion_tokens_details) == null ? void 0 : r.reasoning_tokens) != null || ((a = (n = E.usage) == null ? void 0 : n.prompt_tokens_details) == null ? void 0 : a.cached_tokens) != null) && (W = { openai: {} }, ((o = (s = E.usage) == null ? void 0 : s.completion_tokens_details) == null ? void 0 : o.reasoning_tokens) != null && (W.openai.reasoningTokens = (u = (i = E.usage) == null ? void 0 : i.completion_tokens_details) == null ? void 0 : u.reasoning_tokens), ((c = (l = E.usage) == null ? void 0 : l.prompt_tokens_details) == null ? void 0 : c.cached_tokens) != null && (W.openai.cachedPromptTokens = (y = (f = E.usage) == null ? void 0 : f.prompt_tokens_details) == null ? void 0 : y.cached_tokens)), {
      text: (p = L.message.content) != null ? p : void 0,
      toolCalls: this.settings.useLegacyFunctionCalling && L.message.function_call ? [
        {
          toolCallType: "function",
          toolCallId: Be(),
          toolName: L.message.function_call.name,
          args: L.message.function_call.arguments
        }
      ] : (m = L.message.tool_calls) == null ? void 0 : m.map((z) => {
        var $;
        return {
          toolCallType: "function",
          toolCallId: ($ = z.id) != null ? $ : Be(),
          toolName: z.function.name,
          args: z.function.arguments
        };
      }),
      finishReason: Pr(L.finish_reason),
      usage: {
        promptTokens: (T = (_ = E.usage) == null ? void 0 : _.prompt_tokens) != null ? T : NaN,
        completionTokens: (v = (b = E.usage) == null ? void 0 : b.completion_tokens) != null ? v : NaN
      },
      rawCall: { rawPrompt: C, rawSettings: j },
      rawResponse: { headers: M },
      request: { body: JSON.stringify(k) },
      response: Mr(E),
      warnings: P,
      logprobs: pa(L.logprobs),
      providerMetadata: W
    };
  }
  async doStream(e) {
    if (ma(this.modelId)) {
      const _ = await this.doGenerate(e);
      return {
        stream: new ReadableStream({
          start(b) {
            if (b.enqueue({ type: "response-metadata", ..._.response }), _.text && b.enqueue({
              type: "text-delta",
              textDelta: _.text
            }), _.toolCalls)
              for (const v of _.toolCalls)
                b.enqueue({
                  type: "tool-call",
                  ...v
                });
            b.enqueue({
              type: "finish",
              finishReason: _.finishReason,
              usage: _.usage,
              logprobs: _.logprobs,
              providerMetadata: _.providerMetadata
            }), b.close();
          }
        }),
        rawCall: _.rawCall,
        rawResponse: _.rawResponse,
        warnings: _.warnings
      };
    }
    const { args: t, warnings: r } = this.getArgs(e), n = {
      ...t,
      stream: !0,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.compatibility === "strict" ? { include_usage: !0 } : void 0
    }, { responseHeaders: a, value: s } = await At({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: Ct(this.config.headers(), e.headers),
      body: n,
      failedResponseHandler: lr,
      successfulResponseHandler: Ba(
        nd
      ),
      abortSignal: e.abortSignal,
      fetch: this.config.fetch
    }), { messages: o, ...i } = t, u = [];
    let l = "unknown", c = {
      promptTokens: void 0,
      completionTokens: void 0
    }, f, y = !0;
    const { useLegacyFunctionCalling: p } = this.settings;
    let m;
    return {
      stream: s.pipeThrough(
        new TransformStream({
          transform(_, T) {
            var b, v, k, P, M, E, C, j, L, W, z, $, H, ne, K, X;
            if (!_.success) {
              l = "error", T.enqueue({ type: "error", error: _.error });
              return;
            }
            const Y = _.value;
            if ("error" in Y) {
              l = "error", T.enqueue({ type: "error", error: Y.error });
              return;
            }
            y && (y = !1, T.enqueue({
              type: "response-metadata",
              ...Mr(Y)
            })), Y.usage != null && (c = {
              promptTokens: (b = Y.usage.prompt_tokens) != null ? b : void 0,
              completionTokens: (v = Y.usage.completion_tokens) != null ? v : void 0
            }, ((k = Y.usage.prompt_tokens_details) == null ? void 0 : k.cached_tokens) != null && (m = {
              openai: {
                cachedPromptTokens: (P = Y.usage.prompt_tokens_details) == null ? void 0 : P.cached_tokens
              }
            }));
            const ie = Y.choices[0];
            if ((ie == null ? void 0 : ie.finish_reason) != null && (l = Pr(ie.finish_reason)), (ie == null ? void 0 : ie.delta) == null)
              return;
            const ge = ie.delta;
            ge.content != null && T.enqueue({
              type: "text-delta",
              textDelta: ge.content
            });
            const ye = pa(
              ie == null ? void 0 : ie.logprobs
            );
            ye != null && ye.length && (f === void 0 && (f = []), f.push(...ye));
            const Ne = p && ge.function_call != null ? [
              {
                type: "function",
                id: Be(),
                function: ge.function_call,
                index: 0
              }
            ] : ge.tool_calls;
            if (Ne != null)
              for (const B of Ne) {
                const Oe = B.index;
                if (u[Oe] == null) {
                  if (B.type !== "function")
                    throw new qr({
                      data: B,
                      message: "Expected 'function' type."
                    });
                  if (B.id == null)
                    throw new qr({
                      data: B,
                      message: "Expected 'id' to be a string."
                    });
                  if (((M = B.function) == null ? void 0 : M.name) == null)
                    throw new qr({
                      data: B,
                      message: "Expected 'function.name' to be a string."
                    });
                  u[Oe] = {
                    id: B.id,
                    type: "function",
                    function: {
                      name: B.function.name,
                      arguments: (E = B.function.arguments) != null ? E : ""
                    }
                  };
                  const A = u[Oe];
                  ((C = A.function) == null ? void 0 : C.name) != null && ((j = A.function) == null ? void 0 : j.arguments) != null && (A.function.arguments.length > 0 && T.enqueue({
                    type: "tool-call-delta",
                    toolCallType: "function",
                    toolCallId: A.id,
                    toolName: A.function.name,
                    argsTextDelta: A.function.arguments
                  }), Wn(A.function.arguments) && T.enqueue({
                    type: "tool-call",
                    toolCallType: "function",
                    toolCallId: (L = A.id) != null ? L : Be(),
                    toolName: A.function.name,
                    args: A.function.arguments
                  }));
                  continue;
                }
                const le = u[Oe];
                ((W = B.function) == null ? void 0 : W.arguments) != null && (le.function.arguments += ($ = (z = B.function) == null ? void 0 : z.arguments) != null ? $ : ""), T.enqueue({
                  type: "tool-call-delta",
                  toolCallType: "function",
                  toolCallId: le.id,
                  toolName: le.function.name,
                  argsTextDelta: (H = B.function.arguments) != null ? H : ""
                }), ((ne = le.function) == null ? void 0 : ne.name) != null && ((K = le.function) == null ? void 0 : K.arguments) != null && Wn(le.function.arguments) && T.enqueue({
                  type: "tool-call",
                  toolCallType: "function",
                  toolCallId: (X = le.id) != null ? X : Be(),
                  toolName: le.function.name,
                  args: le.function.arguments
                });
              }
          },
          flush(_) {
            var T, b;
            _.enqueue({
              type: "finish",
              finishReason: l,
              logprobs: f,
              usage: {
                promptTokens: (T = c.promptTokens) != null ? T : NaN,
                completionTokens: (b = c.completionTokens) != null ? b : NaN
              },
              ...m != null ? { providerMetadata: m } : {}
            });
          }
        })
      ),
      rawCall: { rawPrompt: o, rawSettings: i },
      rawResponse: { headers: a },
      request: { body: JSON.stringify(n) },
      warnings: r
    };
  }
}, Ls = d.object({
  prompt_tokens: d.number().nullish(),
  completion_tokens: d.number().nullish(),
  prompt_tokens_details: d.object({
    cached_tokens: d.number().nullish()
  }).nullish(),
  completion_tokens_details: d.object({
    reasoning_tokens: d.number().nullish()
  }).nullish()
}).nullish(), rd = d.object({
  id: d.string().nullish(),
  created: d.number().nullish(),
  model: d.string().nullish(),
  choices: d.array(
    d.object({
      message: d.object({
        role: d.literal("assistant").nullish(),
        content: d.string().nullish(),
        function_call: d.object({
          arguments: d.string(),
          name: d.string()
        }).nullish(),
        tool_calls: d.array(
          d.object({
            id: d.string().nullish(),
            type: d.literal("function"),
            function: d.object({
              name: d.string(),
              arguments: d.string()
            })
          })
        ).nullish()
      }),
      index: d.number(),
      logprobs: d.object({
        content: d.array(
          d.object({
            token: d.string(),
            logprob: d.number(),
            top_logprobs: d.array(
              d.object({
                token: d.string(),
                logprob: d.number()
              })
            )
          })
        ).nullable()
      }).nullish(),
      finish_reason: d.string().nullish()
    })
  ),
  usage: Ls
}), nd = d.union([
  d.object({
    id: d.string().nullish(),
    created: d.number().nullish(),
    model: d.string().nullish(),
    choices: d.array(
      d.object({
        delta: d.object({
          role: d.enum(["assistant"]).nullish(),
          content: d.string().nullish(),
          function_call: d.object({
            name: d.string().optional(),
            arguments: d.string().optional()
          }).nullish(),
          tool_calls: d.array(
            d.object({
              index: d.number(),
              id: d.string().nullish(),
              type: d.literal("function").optional(),
              function: d.object({
                name: d.string().nullish(),
                arguments: d.string().nullish()
              })
            })
          ).nullish()
        }).nullish(),
        logprobs: d.object({
          content: d.array(
            d.object({
              token: d.string(),
              logprob: d.number(),
              top_logprobs: d.array(
                d.object({
                  token: d.string(),
                  logprob: d.number()
                })
              )
            })
          ).nullable()
        }).nullish(),
        finish_reason: d.string().nullable().optional(),
        index: d.number()
      })
    ),
    usage: Ls
  }),
  Un
]);
function ma(e) {
  return e.startsWith("o1-");
}
function ad(e) {
  return e.startsWith("gpt-4o-audio-preview");
}
function sd({
  prompt: e,
  inputFormat: t,
  user: r = "user",
  assistant: n = "assistant"
}) {
  if (t === "prompt" && e.length === 1 && e[0].role === "user" && e[0].content.length === 1 && e[0].content[0].type === "text")
    return { prompt: e[0].content[0].text };
  let a = "";
  e[0].role === "system" && (a += `${e[0].content}

`, e = e.slice(1));
  for (const { role: s, content: o } of e)
    switch (s) {
      case "system":
        throw new Qe({
          message: "Unexpected system message in prompt: ${content}",
          prompt: e
        });
      case "user": {
        const i = o.map((u) => {
          switch (u.type) {
            case "text":
              return u.text;
            case "image":
              throw new de({
                functionality: "images"
              });
          }
        }).join("");
        a += `${r}:
${i}

`;
        break;
      }
      case "assistant": {
        const i = o.map((u) => {
          switch (u.type) {
            case "text":
              return u.text;
            case "tool-call":
              throw new de({
                functionality: "tool-call messages"
              });
          }
        }).join("");
        a += `${n}:
${i}

`;
        break;
      }
      case "tool":
        throw new de({
          functionality: "tool messages"
        });
      default: {
        const i = s;
        throw new Error(`Unsupported role: ${i}`);
      }
    }
  return a += `${n}:
`, {
    prompt: a,
    stopSequences: [`
${r}:`]
  };
}
function ha(e) {
  return e == null ? void 0 : e.tokens.map((t, r) => ({
    token: t,
    logprob: e.token_logprobs[r],
    topLogprobs: e.top_logprobs ? Object.entries(e.top_logprobs[r]).map(
      ([n, a]) => ({
        token: n,
        logprob: a
      })
    ) : []
  }));
}
var od = class {
  constructor(e, t, r) {
    this.specificationVersion = "v1", this.defaultObjectGenerationMode = void 0, this.modelId = e, this.settings = t, this.config = r;
  }
  get provider() {
    return this.config.provider;
  }
  getArgs({
    mode: e,
    inputFormat: t,
    prompt: r,
    maxTokens: n,
    temperature: a,
    topP: s,
    topK: o,
    frequencyPenalty: i,
    presencePenalty: u,
    stopSequences: l,
    responseFormat: c,
    seed: f
  }) {
    var y;
    const p = e.type, m = [];
    o != null && m.push({
      type: "unsupported-setting",
      setting: "topK"
    }), c != null && c.type !== "text" && m.push({
      type: "unsupported-setting",
      setting: "responseFormat",
      details: "JSON response format is not supported."
    });
    const { prompt: _, stopSequences: T } = sd({ prompt: r, inputFormat: t }), b = [...T ?? [], ...l ?? []], v = {
      // model id:
      model: this.modelId,
      // model specific settings:
      echo: this.settings.echo,
      logit_bias: this.settings.logitBias,
      logprobs: typeof this.settings.logprobs == "number" ? this.settings.logprobs : typeof this.settings.logprobs == "boolean" && this.settings.logprobs ? 0 : void 0,
      suffix: this.settings.suffix,
      user: this.settings.user,
      // standardized settings:
      max_tokens: n,
      temperature: a,
      top_p: s,
      frequency_penalty: i,
      presence_penalty: u,
      seed: f,
      // prompt:
      prompt: _,
      // stop sequences:
      stop: b.length > 0 ? b : void 0
    };
    switch (p) {
      case "regular": {
        if ((y = e.tools) != null && y.length)
          throw new de({
            functionality: "tools"
          });
        if (e.toolChoice)
          throw new de({
            functionality: "toolChoice"
          });
        return { args: v, warnings: m };
      }
      case "object-json":
        throw new de({
          functionality: "object-json mode"
        });
      case "object-tool":
        throw new de({
          functionality: "object-tool mode"
        });
      default: {
        const k = p;
        throw new Error(`Unsupported type: ${k}`);
      }
    }
  }
  async doGenerate(e) {
    const { args: t, warnings: r } = this.getArgs(e), { responseHeaders: n, value: a } = await At({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: Ct(this.config.headers(), e.headers),
      body: t,
      failedResponseHandler: lr,
      successfulResponseHandler: Rn(
        id
      ),
      abortSignal: e.abortSignal,
      fetch: this.config.fetch
    }), { prompt: s, ...o } = t, i = a.choices[0];
    return {
      text: i.text,
      usage: {
        promptTokens: a.usage.prompt_tokens,
        completionTokens: a.usage.completion_tokens
      },
      finishReason: Pr(i.finish_reason),
      logprobs: ha(i.logprobs),
      rawCall: { rawPrompt: s, rawSettings: o },
      rawResponse: { headers: n },
      response: Mr(a),
      warnings: r,
      request: { body: JSON.stringify(t) }
    };
  }
  async doStream(e) {
    const { args: t, warnings: r } = this.getArgs(e), n = {
      ...t,
      stream: !0,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.compatibility === "strict" ? { include_usage: !0 } : void 0
    }, { responseHeaders: a, value: s } = await At({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: Ct(this.config.headers(), e.headers),
      body: n,
      failedResponseHandler: lr,
      successfulResponseHandler: Ba(
        ld
      ),
      abortSignal: e.abortSignal,
      fetch: this.config.fetch
    }), { prompt: o, ...i } = t;
    let u = "unknown", l = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    }, c, f = !0;
    return {
      stream: s.pipeThrough(
        new TransformStream({
          transform(y, p) {
            if (!y.success) {
              u = "error", p.enqueue({ type: "error", error: y.error });
              return;
            }
            const m = y.value;
            if ("error" in m) {
              u = "error", p.enqueue({ type: "error", error: m.error });
              return;
            }
            f && (f = !1, p.enqueue({
              type: "response-metadata",
              ...Mr(m)
            })), m.usage != null && (l = {
              promptTokens: m.usage.prompt_tokens,
              completionTokens: m.usage.completion_tokens
            });
            const _ = m.choices[0];
            (_ == null ? void 0 : _.finish_reason) != null && (u = Pr(_.finish_reason)), (_ == null ? void 0 : _.text) != null && p.enqueue({
              type: "text-delta",
              textDelta: _.text
            });
            const T = ha(
              _ == null ? void 0 : _.logprobs
            );
            T != null && T.length && (c === void 0 && (c = []), c.push(...T));
          },
          flush(y) {
            y.enqueue({
              type: "finish",
              finishReason: u,
              logprobs: c,
              usage: l
            });
          }
        })
      ),
      rawCall: { rawPrompt: o, rawSettings: i },
      rawResponse: { headers: a },
      warnings: r,
      request: { body: JSON.stringify(n) }
    };
  }
}, id = d.object({
  id: d.string().nullish(),
  created: d.number().nullish(),
  model: d.string().nullish(),
  choices: d.array(
    d.object({
      text: d.string(),
      finish_reason: d.string(),
      logprobs: d.object({
        tokens: d.array(d.string()),
        token_logprobs: d.array(d.number()),
        top_logprobs: d.array(d.record(d.string(), d.number())).nullable()
      }).nullish()
    })
  ),
  usage: d.object({
    prompt_tokens: d.number(),
    completion_tokens: d.number()
  })
}), ld = d.union([
  d.object({
    id: d.string().nullish(),
    created: d.number().nullish(),
    model: d.string().nullish(),
    choices: d.array(
      d.object({
        text: d.string(),
        finish_reason: d.string().nullish(),
        index: d.number(),
        logprobs: d.object({
          tokens: d.array(d.string()),
          token_logprobs: d.array(d.number()),
          top_logprobs: d.array(d.record(d.string(), d.number())).nullable()
        }).nullish()
      })
    ),
    usage: d.object({
      prompt_tokens: d.number(),
      completion_tokens: d.number()
    }).nullish()
  }),
  Un
]), ud = class {
  constructor(e, t, r) {
    this.specificationVersion = "v1", this.modelId = e, this.settings = t, this.config = r;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    var e;
    return (e = this.settings.maxEmbeddingsPerCall) != null ? e : 2048;
  }
  get supportsParallelCalls() {
    var e;
    return (e = this.settings.supportsParallelCalls) != null ? e : !0;
  }
  async doEmbed({
    values: e,
    headers: t,
    abortSignal: r
  }) {
    if (e.length > this.maxEmbeddingsPerCall)
      throw new yo({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values: e
      });
    const { responseHeaders: n, value: a } = await At({
      url: this.config.url({
        path: "/embeddings",
        modelId: this.modelId
      }),
      headers: Ct(this.config.headers(), t),
      body: {
        model: this.modelId,
        input: e,
        encoding_format: "float",
        dimensions: this.settings.dimensions,
        user: this.settings.user
      },
      failedResponseHandler: lr,
      successfulResponseHandler: Rn(
        cd
      ),
      abortSignal: r,
      fetch: this.config.fetch
    });
    return {
      embeddings: a.data.map((s) => s.embedding),
      usage: a.usage ? { tokens: a.usage.prompt_tokens } : void 0,
      rawResponse: { headers: n }
    };
  }
}, cd = d.object({
  data: d.array(d.object({ embedding: d.array(d.number()) })),
  usage: d.object({ prompt_tokens: d.number() }).nullish()
});
function Us(e = {}) {
  var t, r, n, a;
  const s = (r = Fo((t = e.baseURL) != null ? t : e.baseUrl)) != null ? r : "https://api.openai.com/v1", o = (n = e.compatibility) != null ? n : "compatible", i = (a = e.name) != null ? a : "openai", u = () => ({
    Authorization: `Bearer ${Ro({
      apiKey: e.apiKey,
      environmentVariableName: "OPENAI_API_KEY",
      description: "OpenAI"
    })}`,
    "OpenAI-Organization": e.organization,
    "OpenAI-Project": e.project,
    ...e.headers
  }), l = (m, _ = {}) => new td(m, _, {
    provider: `${i}.chat`,
    url: ({ path: T }) => `${s}${T}`,
    headers: u,
    compatibility: o,
    fetch: e.fetch
  }), c = (m, _ = {}) => new od(m, _, {
    provider: `${i}.completion`,
    url: ({ path: T }) => `${s}${T}`,
    headers: u,
    compatibility: o,
    fetch: e.fetch
  }), f = (m, _ = {}) => new ud(m, _, {
    provider: `${i}.embedding`,
    url: ({ path: T }) => `${s}${T}`,
    headers: u,
    fetch: e.fetch
  }), y = (m, _) => {
    if (new.target)
      throw new Error(
        "The OpenAI model function cannot be called with the new keyword."
      );
    return m === "gpt-3.5-turbo-instruct" ? c(
      m,
      _
    ) : l(m, _);
  }, p = function(m, _) {
    return y(m, _);
  };
  return p.languageModel = y, p.chat = l, p.completion = c, p.embedding = f, p.textEmbedding = f, p.textEmbeddingModel = f, p;
}
Us({
  compatibility: "strict"
  // strict for OpenAI API
});
const dd = Us({
  apiKey: "sk-ILz56c0511cddc9ba291da2292e6e1a4f617f1b12ae5TABd",
  baseURL: "https://api.gptsapi.net/v1"
});
async function fd(e) {
  return await Bc({
    model: dd("gpt-4o-mini"),
    messages: e
  });
}
const pd = { class: "chat-container" }, md = { class: "messages" }, hd = { class: "input-area" }, gd = ["disabled"], yd = ["disabled"], vd = /* @__PURE__ */ Ys({
  __name: "Chatbot",
  setup(e) {
    const { messages: t, input: r } = su(), n = St(!1);
    async function a() {
      if (r.value.trim()) {
        n.value = !0;
        try {
          const s = {
            id: crypto.randomUUID(),
            // Generate a unique ID
            role: "user",
            content: r.value
          };
          t.value.push(s);
          const o = await fd([s]);
          let i = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: ""
          };
          t.value.push(i);
          const u = o.toDataStream().getReader(), l = new TextDecoder();
          for (; ; ) {
            const { done: c, value: f } = await u.read();
            if (c) break;
            const y = l.decode(f);
            if (y.startsWith("0:")) {
              const p = y.match(/0:"([^"]*)"/);
              if (p && p[1]) {
                const m = p[1].replace(/\\n\\n/g, `

`);
                i.content += m, t.value[t.value.length - 1] = { ...i };
              }
            }
          }
          r.value = "";
        } catch (s) {
          console.error("Error:", s);
        } finally {
          n.value = !1;
        }
      }
    }
    return (s, o) => (Ur(), Vr("div", pd, [
      dr("div", md, [
        (Ur(!0), Vr(Ks, null, Gs(Xr(t), (i, u) => (Ur(), Vr("div", {
          key: u,
          class: Xs(i.role)
        }, Fn(i.content), 3))), 128))
      ]),
      dr("div", hd, [
        Qs(dr("input", {
          "onUpdate:modelValue": o[0] || (o[0] = (i) => eo(r) ? r.value = i : null),
          onKeyup: to(a, ["enter"]),
          placeholder: "Type a message...",
          disabled: n.value
        }, null, 40, gd), [
          [ro, Xr(r)]
        ]),
        dr("button", {
          onClick: a,
          disabled: n.value
        }, Fn(n.value ? "Sending..." : "Send"), 9, yd)
      ])
    ]));
  }
}), _d = no(vd);
customElements.define("vue-chatbot", _d);
export {
  _d as ChatbotElement
};
