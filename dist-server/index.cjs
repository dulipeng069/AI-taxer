var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@prisma/client/runtime/library.js
var require_library = __commonJS({
  "node_modules/@prisma/client/runtime/library.js"(exports, module) {
    "use strict";
    var Ll = Object.create;
    var Rt = Object.defineProperty;
    var Nl = Object.getOwnPropertyDescriptor;
    var Ol = Object.getOwnPropertyNames;
    var Fl = Object.getPrototypeOf;
    var Ml = Object.prototype.hasOwnProperty;
    var X = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
    var Nr = (e, r) => {
      for (var t in r) Rt(e, t, { get: r[t], enumerable: true });
    };
    var ro = (e, r, t, n) => {
      if (r && typeof r == "object" || typeof r == "function") for (let i of Ol(r)) !Ml.call(e, i) && i !== t && Rt(e, i, { get: () => r[i], enumerable: !(n = Nl(r, i)) || n.enumerable });
      return e;
    };
    var _ = (e, r, t) => (t = e != null ? Ll(Fl(e)) : {}, ro(r || !e || !e.__esModule ? Rt(t, "default", { value: e, enumerable: true }) : t, e));
    var $l = (e) => ro(Rt({}, "__esModule", { value: true }), e);
    var Eo = X((Cd, Bn) => {
      "use strict";
      var v = Bn.exports;
      Bn.exports.default = v;
      var D = "\x1B[", qr = "\x1B]", mr = "\x07", Lt = ";", yo = process.env.TERM_PROGRAM === "Apple_Terminal";
      v.cursorTo = (e, r) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        return typeof r != "number" ? D + (e + 1) + "G" : D + (r + 1) + ";" + (e + 1) + "H";
      };
      v.cursorMove = (e, r) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        let t = "";
        return e < 0 ? t += D + -e + "D" : e > 0 && (t += D + e + "C"), r < 0 ? t += D + -r + "A" : r > 0 && (t += D + r + "B"), t;
      };
      v.cursorUp = (e = 1) => D + e + "A";
      v.cursorDown = (e = 1) => D + e + "B";
      v.cursorForward = (e = 1) => D + e + "C";
      v.cursorBackward = (e = 1) => D + e + "D";
      v.cursorLeft = D + "G";
      v.cursorSavePosition = yo ? "\x1B7" : D + "s";
      v.cursorRestorePosition = yo ? "\x1B8" : D + "u";
      v.cursorGetPosition = D + "6n";
      v.cursorNextLine = D + "E";
      v.cursorPrevLine = D + "F";
      v.cursorHide = D + "?25l";
      v.cursorShow = D + "?25h";
      v.eraseLines = (e) => {
        let r = "";
        for (let t = 0; t < e; t++) r += v.eraseLine + (t < e - 1 ? v.cursorUp() : "");
        return e && (r += v.cursorLeft), r;
      };
      v.eraseEndLine = D + "K";
      v.eraseStartLine = D + "1K";
      v.eraseLine = D + "2K";
      v.eraseDown = D + "J";
      v.eraseUp = D + "1J";
      v.eraseScreen = D + "2J";
      v.scrollUp = D + "S";
      v.scrollDown = D + "T";
      v.clearScreen = "\x1Bc";
      v.clearTerminal = process.platform === "win32" ? `${v.eraseScreen}${D}0f` : `${v.eraseScreen}${D}3J${D}H`;
      v.beep = mr;
      v.link = (e, r) => [qr, "8", Lt, Lt, r, mr, e, qr, "8", Lt, Lt, mr].join("");
      v.image = (e, r = {}) => {
        let t = `${qr}1337;File=inline=1`;
        return r.width && (t += `;width=${r.width}`), r.height && (t += `;height=${r.height}`), r.preserveAspectRatio === false && (t += ";preserveAspectRatio=0"), t + ":" + e.toString("base64") + mr;
      };
      v.iTerm = { setCwd: (e = process.cwd()) => `${qr}50;CurrentDir=${e}${mr}`, annotation: (e, r = {}) => {
        let t = `${qr}1337;`, n = typeof r.x < "u", i = typeof r.y < "u";
        if ((n || i) && !(n && i && typeof r.length < "u")) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
        return e = e.replace(/\|/g, ""), t += r.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", r.length > 0 ? t += (n ? [e, r.length, r.x, r.y] : [r.length, e]).join("|") : t += e, t + mr;
      } };
    });
    var Vn = X((Sd, bo) => {
      "use strict";
      bo.exports = (e, r = process.argv) => {
        let t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = r.indexOf(t + e), i = r.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
      };
    });
    var Po = X((Rd, xo) => {
      "use strict";
      var uu = require("os"), wo = require("tty"), pe = Vn(), { env: G } = process, Ve;
      pe("no-color") || pe("no-colors") || pe("color=false") || pe("color=never") ? Ve = 0 : (pe("color") || pe("colors") || pe("color=true") || pe("color=always")) && (Ve = 1);
      "FORCE_COLOR" in G && (G.FORCE_COLOR === "true" ? Ve = 1 : G.FORCE_COLOR === "false" ? Ve = 0 : Ve = G.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(G.FORCE_COLOR, 10), 3));
      function jn(e) {
        return e === 0 ? false : { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 };
      }
      function Un(e, r) {
        if (Ve === 0) return 0;
        if (pe("color=16m") || pe("color=full") || pe("color=truecolor")) return 3;
        if (pe("color=256")) return 2;
        if (e && !r && Ve === void 0) return 0;
        let t = Ve || 0;
        if (G.TERM === "dumb") return t;
        if (process.platform === "win32") {
          let n = uu.release().split(".");
          return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? Number(n[2]) >= 14931 ? 3 : 2 : 1;
        }
        if ("CI" in G) return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((n) => n in G) || G.CI_NAME === "codeship" ? 1 : t;
        if ("TEAMCITY_VERSION" in G) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(G.TEAMCITY_VERSION) ? 1 : 0;
        if (G.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in G) {
          let n = parseInt((G.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (G.TERM_PROGRAM) {
            case "iTerm.app":
              return n >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        return /-256(color)?$/i.test(G.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(G.TERM) || "COLORTERM" in G ? 1 : t;
      }
      function cu(e) {
        let r = Un(e, e && e.isTTY);
        return jn(r);
      }
      xo.exports = { supportsColor: cu, stdout: jn(Un(true, wo.isatty(1))), stderr: jn(Un(true, wo.isatty(2))) };
    });
    var Co = X((Ad, To) => {
      "use strict";
      var pu = Po(), dr = Vn();
      function vo(e) {
        if (/^\d{3,4}$/.test(e)) {
          let t = /(\d{1,2})(\d{2})/.exec(e);
          return { major: 0, minor: parseInt(t[1], 10), patch: parseInt(t[2], 10) };
        }
        let r = (e || "").split(".").map((t) => parseInt(t, 10));
        return { major: r[0], minor: r[1], patch: r[2] };
      }
      function Qn(e) {
        let { env: r } = process;
        if ("FORCE_HYPERLINK" in r) return !(r.FORCE_HYPERLINK.length > 0 && parseInt(r.FORCE_HYPERLINK, 10) === 0);
        if (dr("no-hyperlink") || dr("no-hyperlinks") || dr("hyperlink=false") || dr("hyperlink=never")) return false;
        if (dr("hyperlink=true") || dr("hyperlink=always") || "NETLIFY" in r) return true;
        if (!pu.supportsColor(e) || e && !e.isTTY || process.platform === "win32" || "CI" in r || "TEAMCITY_VERSION" in r) return false;
        if ("TERM_PROGRAM" in r) {
          let t = vo(r.TERM_PROGRAM_VERSION);
          switch (r.TERM_PROGRAM) {
            case "iTerm.app":
              return t.major === 3 ? t.minor >= 1 : t.major > 3;
            case "WezTerm":
              return t.major >= 20200620;
            case "vscode":
              return t.major > 1 || t.major === 1 && t.minor >= 72;
          }
        }
        if ("VTE_VERSION" in r) {
          if (r.VTE_VERSION === "0.50.0") return false;
          let t = vo(r.VTE_VERSION);
          return t.major > 0 || t.minor >= 50;
        }
        return false;
      }
      To.exports = { supportsHyperlink: Qn, stdout: Qn(process.stdout), stderr: Qn(process.stderr) };
    });
    var Ro = X((Id, Br) => {
      "use strict";
      var mu = Eo(), Gn = Co(), So = (e, r, { target: t = "stdout", ...n } = {}) => Gn[t] ? mu.link(e, r) : n.fallback === false ? e : typeof n.fallback == "function" ? n.fallback(e, r) : `${e} (\u200B${r}\u200B)`;
      Br.exports = (e, r, t = {}) => So(e, r, t);
      Br.exports.stderr = (e, r, t = {}) => So(e, r, { target: "stderr", ...t });
      Br.exports.isSupported = Gn.stdout;
      Br.exports.stderr.isSupported = Gn.stderr;
    });
    var Mo = X((Jd, Ru) => {
      Ru.exports = { name: "dotenv", version: "16.0.3", description: "Loads environment variables from .env file", main: "lib/main.js", types: "lib/main.d.ts", exports: { ".": { require: "./lib/main.js", types: "./lib/main.d.ts", default: "./lib/main.js" }, "./config": "./config.js", "./config.js": "./config.js", "./lib/env-options": "./lib/env-options.js", "./lib/env-options.js": "./lib/env-options.js", "./lib/cli-options": "./lib/cli-options.js", "./lib/cli-options.js": "./lib/cli-options.js", "./package.json": "./package.json" }, scripts: { "dts-check": "tsc --project tests/types/tsconfig.json", lint: "standard", "lint-readme": "standard-markdown", pretest: "npm run lint && npm run dts-check", test: "tap tests/*.js --100 -Rspec", prerelease: "npm test", release: "standard-version" }, repository: { type: "git", url: "git://github.com/motdotla/dotenv.git" }, keywords: ["dotenv", "env", ".env", "environment", "variables", "config", "settings"], readmeFilename: "README.md", license: "BSD-2-Clause", devDependencies: { "@types/node": "^17.0.9", decache: "^4.6.1", dtslint: "^3.7.0", sinon: "^12.0.1", standard: "^16.0.4", "standard-markdown": "^7.1.0", "standard-version": "^9.3.2", tap: "^15.1.6", tar: "^6.1.11", typescript: "^4.5.4" }, engines: { node: ">=12" } };
    });
    var qo = X((Hd, $t) => {
      "use strict";
      var Au = require("fs"), $o = require("path"), Iu = require("os"), _u = Mo(), ku = _u.version, Du = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
      function Lu(e) {
        let r = {}, t = e.toString();
        t = t.replace(/\r\n?/mg, `
`);
        let n;
        for (; (n = Du.exec(t)) != null; ) {
          let i = n[1], o = n[2] || "";
          o = o.trim();
          let s = o[0];
          o = o.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), s === '"' && (o = o.replace(/\\n/g, `
`), o = o.replace(/\\r/g, "\r")), r[i] = o;
        }
        return r;
      }
      function Wn(e) {
        console.log(`[dotenv@${ku}][DEBUG] ${e}`);
      }
      function Nu(e) {
        return e[0] === "~" ? $o.join(Iu.homedir(), e.slice(1)) : e;
      }
      function Ou(e) {
        let r = $o.resolve(process.cwd(), ".env"), t = "utf8", n = !!(e && e.debug), i = !!(e && e.override);
        e && (e.path != null && (r = Nu(e.path)), e.encoding != null && (t = e.encoding));
        try {
          let o = Mt.parse(Au.readFileSync(r, { encoding: t }));
          return Object.keys(o).forEach(function(s) {
            Object.prototype.hasOwnProperty.call(process.env, s) ? (i === true && (process.env[s] = o[s]), n && Wn(i === true ? `"${s}" is already defined in \`process.env\` and WAS overwritten` : `"${s}" is already defined in \`process.env\` and was NOT overwritten`)) : process.env[s] = o[s];
          }), { parsed: o };
        } catch (o) {
          return n && Wn(`Failed to load ${r} ${o.message}`), { error: o };
        }
      }
      var Mt = { config: Ou, parse: Lu };
      $t.exports.config = Mt.config;
      $t.exports.parse = Mt.parse;
      $t.exports = Mt;
    });
    var Go = X((ef, Qo) => {
      "use strict";
      Qo.exports = (e) => {
        let r = e.match(/^[ \t]*(?=\S)/gm);
        return r ? r.reduce((t, n) => Math.min(t, n.length), 1 / 0) : 0;
      };
    });
    var Ho = X((rf, Jo) => {
      "use strict";
      var qu = Go();
      Jo.exports = (e) => {
        let r = qu(e);
        if (r === 0) return e;
        let t = new RegExp(`^[ \\t]{${r}}`, "gm");
        return e.replace(t, "");
      };
    });
    var Yn = X((tf, Bu) => {
      Bu.exports = { name: "@prisma/engines-version", version: "5.10.0-34.5a9203d0590c951969e85a7d07215503f4672eb9", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "5a9203d0590c951969e85a7d07215503f4672eb9" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.15", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Zn = X((Bt) => {
      "use strict";
      Object.defineProperty(Bt, "__esModule", { value: true });
      Bt.enginesVersion = void 0;
      Bt.enginesVersion = Yn().prisma.enginesVersion;
    });
    var ni = X((Rf, zo) => {
      "use strict";
      zo.exports = (e, r = 1, t) => {
        if (t = { indent: " ", includeEmptyLines: false, ...t }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof r != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof r}\``);
        if (typeof t.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof t.indent}\``);
        if (r === 0) return e;
        let n = t.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, t.indent.repeat(r));
      };
    });
    var es = X((_f, Xo) => {
      "use strict";
      Xo.exports = ({ onlyFirst: e = false } = {}) => {
        let r = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(r, e ? void 0 : "g");
      };
    });
    var ai = X((kf, rs) => {
      "use strict";
      var zu = es();
      rs.exports = (e) => typeof e == "string" ? e.replace(zu(), "") : e;
    });
    var ts = X((Nf, jt) => {
      "use strict";
      jt.exports = (e = {}) => {
        let r;
        if (e.repoUrl) r = e.repoUrl;
        else if (e.user && e.repo) r = `https://github.com/${e.user}/${e.repo}`;
        else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
        let t = new URL(`${r}/issues/new`), n = ["body", "title", "labels", "template", "milestone", "assignee", "projects"];
        for (let i of n) {
          let o = e[i];
          if (o !== void 0) {
            if (i === "labels" || i === "projects") {
              if (!Array.isArray(o)) throw new TypeError(`The \`${i}\` option should be an array`);
              o = o.join(",");
            }
            t.searchParams.set(i, o);
          }
        }
        return t.toString();
      };
      jt.exports.default = jt.exports;
    });
    var Ji = X((x0, $a) => {
      "use strict";
      $a.exports = /* @__PURE__ */ (function() {
        function e(r, t, n, i, o) {
          return r < t || n < t ? r > n ? n + 1 : r + 1 : i === o ? t : t + 1;
        }
        return function(r, t) {
          if (r === t) return 0;
          if (r.length > t.length) {
            var n = r;
            r = t, t = n;
          }
          for (var i = r.length, o = t.length; i > 0 && r.charCodeAt(i - 1) === t.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && r.charCodeAt(s) === t.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a = 0, l, u, c, p, m, f, g, h, A, T, C, E, I = [];
          for (l = 0; l < i; l++) I.push(l + 1), I.push(r.charCodeAt(s + l));
          for (var me = I.length - 1; a < o - 3; ) for (A = t.charCodeAt(s + (u = a)), T = t.charCodeAt(s + (c = a + 1)), C = t.charCodeAt(s + (p = a + 2)), E = t.charCodeAt(s + (m = a + 3)), f = a += 4, l = 0; l < me; l += 2) g = I[l], h = I[l + 1], u = e(g, u, c, A, h), c = e(u, c, p, T, h), p = e(c, p, m, C, h), f = e(p, m, f, E, h), I[l] = f, m = p, p = c, c = u, u = g;
          for (; a < o; ) for (A = t.charCodeAt(s + (u = a)), f = ++a, l = 0; l < me; l += 2) g = I[l], I[l] = f = e(g, u, f, A, I[l + 1]), u = g;
          return f;
        };
      })();
    });
    var id = {};
    Nr(id, { Debug: () => Nn, Decimal: () => Te, Extensions: () => kn, MetricsClient: () => hr, NotFoundError: () => Le, PrismaClientInitializationError: () => S, PrismaClientKnownRequestError: () => V, PrismaClientRustPanicError: () => ue, PrismaClientUnknownRequestError: () => j, PrismaClientValidationError: () => K, Public: () => Dn, Sql: () => oe, defineDmmfProperty: () => is, detectRuntime: () => fn, empty: () => ss, getPrismaClient: () => _l, join: () => os, makeStrictEnum: () => kl, objectEnumValues: () => Gt, raw: () => hi, sqltag: () => yi, warnEnvConflicts: () => Dl, warnOnce: () => Wr });
    module.exports = $l(id);
    var kn = {};
    Nr(kn, { defineExtension: () => to, getExtensionContext: () => no });
    function to(e) {
      return typeof e == "function" ? e : (r) => r.$extends(e);
    }
    function no(e) {
      return e;
    }
    var Dn = {};
    Nr(Dn, { validator: () => io });
    function io(...e) {
      return (r) => r;
    }
    var At = {};
    Nr(At, { $: () => uo, bgBlack: () => Wl, bgBlue: () => Zl, bgCyan: () => eu, bgGreen: () => zl, bgMagenta: () => Xl, bgRed: () => Kl, bgWhite: () => ru, bgYellow: () => Yl, black: () => Ql, blue: () => Ye, bold: () => W, cyan: () => _e, dim: () => Ie, gray: () => Or, green: () => Me, grey: () => Hl, hidden: () => jl, inverse: () => Vl, italic: () => Bl, magenta: () => Gl, red: () => ce, reset: () => ql, strikethrough: () => Ul, underline: () => ee, white: () => Jl, yellow: () => de });
    var Ln;
    var oo;
    var so;
    var ao;
    var lo = true;
    typeof process < "u" && ({ FORCE_COLOR: Ln, NODE_DISABLE_COLORS: oo, NO_COLOR: so, TERM: ao } = process.env || {}, lo = process.stdout && process.stdout.isTTY);
    var uo = { enabled: !oo && so == null && ao !== "dumb" && (Ln != null && Ln !== "0" || lo) };
    function F(e, r) {
      let t = new RegExp(`\\x1b\\[${r}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${r}m`;
      return function(o) {
        return !uo.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(t, i + n) : o) + i;
      };
    }
    var ql = F(0, 0);
    var W = F(1, 22);
    var Ie = F(2, 22);
    var Bl = F(3, 23);
    var ee = F(4, 24);
    var Vl = F(7, 27);
    var jl = F(8, 28);
    var Ul = F(9, 29);
    var Ql = F(30, 39);
    var ce = F(31, 39);
    var Me = F(32, 39);
    var de = F(33, 39);
    var Ye = F(34, 39);
    var Gl = F(35, 39);
    var _e = F(36, 39);
    var Jl = F(37, 39);
    var Or = F(90, 39);
    var Hl = F(90, 39);
    var Wl = F(40, 49);
    var Kl = F(41, 49);
    var zl = F(42, 49);
    var Yl = F(43, 49);
    var Zl = F(44, 49);
    var Xl = F(45, 49);
    var eu = F(46, 49);
    var ru = F(47, 49);
    var tu = 100;
    var co = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Fr = [];
    var po = Date.now();
    var nu = 0;
    globalThis.DEBUG ?? (globalThis.DEBUG = process.env.DEBUG ?? "");
    globalThis.DEBUG_COLORS ?? (globalThis.DEBUG_COLORS = process.env.DEBUG_COLORS ? process.env.DEBUG_COLORS === "true" : true);
    var Mr = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let r = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), t = r.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = r.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return t && !n;
    }, log: (...e) => {
      let [r, t, ...n] = e, i;
      typeof require == "function" && typeof process < "u" && typeof process.stderr < "u" && typeof process.stderr.write == "function" ? i = (...o) => {
        let s = require("util");
        process.stderr.write(s.format(...o) + `
`);
      } : i = console.warn ?? console.log, i(`${r} ${t}`, ...n);
    }, formatters: {} };
    function iu(e) {
      let r = { color: co[nu++ % co.length], enabled: Mr.enabled(e), namespace: e, log: Mr.log, extend: () => {
      } }, t = (...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = r;
        if (n.length !== 0 && Fr.push([o, ...n]), Fr.length > tu && Fr.shift(), Mr.enabled(o) || i) {
          let l = n.map((c) => typeof c == "string" ? c : ou(c)), u = `+${Date.now() - po}ms`;
          po = Date.now(), globalThis.DEBUG_COLORS ? a(At[s](W(o)), ...l, At[s](u)) : a(o, ...l, u);
        }
      };
      return new Proxy(t, { get: (n, i) => r[i], set: (n, i, o) => r[i] = o });
    }
    var Nn = new Proxy(iu, { get: (e, r) => Mr[r], set: (e, r, t) => Mr[r] = t });
    function ou(e, r = 2) {
      let t = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (t.has(i)) return "[Circular *]";
          t.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, r);
    }
    function mo(e = 7500) {
      let r = Fr.map(([t, ...n]) => `${t} ${n.map((i) => typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
      return r.length < e ? r : r.slice(-e);
    }
    function fo() {
      Fr.length = 0;
    }
    var N = Nn;
    var go = _(require("fs"));
    function On() {
      let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY;
      if (!(e && go.default.existsSync(e)) && process.arch === "ia32") throw new Error('The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)');
    }
    var Fn = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    var It = "libquery_engine";
    function _t(e, r) {
      let t = r === "url";
      return e.includes("windows") ? t ? "query_engine.dll.node" : `query_engine-${e}.dll.node` : e.includes("darwin") ? t ? `${It}.dylib.node` : `${It}-${e}.dylib.node` : t ? `${It}.so.node` : `${It}-${e}.so.node`;
    }
    var ko = _(require("child_process"));
    var Jn = _(require("fs/promises"));
    var Ot = _(require("os"));
    var ke = Symbol.for("@ts-pattern/matcher");
    var su = Symbol.for("@ts-pattern/isVariadic");
    var Dt = "@ts-pattern/anonymous-select-key";
    var Mn = (e) => !!(e && typeof e == "object");
    var kt = (e) => e && !!e[ke];
    var we = (e, r, t) => {
      if (kt(e)) {
        let n = e[ke](), { matched: i, selections: o } = n.match(r);
        return i && o && Object.keys(o).forEach((s) => t(s, o[s])), i;
      }
      if (Mn(e)) {
        if (!Mn(r)) return false;
        if (Array.isArray(e)) {
          if (!Array.isArray(r)) return false;
          let n = [], i = [], o = [];
          for (let s of e.keys()) {
            let a = e[s];
            kt(a) && a[su] ? o.push(a) : o.length ? i.push(a) : n.push(a);
          }
          if (o.length) {
            if (o.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
            if (r.length < n.length + i.length) return false;
            let s = r.slice(0, n.length), a = i.length === 0 ? [] : r.slice(-i.length), l = r.slice(n.length, i.length === 0 ? 1 / 0 : -i.length);
            return n.every((u, c) => we(u, s[c], t)) && i.every((u, c) => we(u, a[c], t)) && (o.length === 0 || we(o[0], l, t));
          }
          return e.length === r.length && e.every((s, a) => we(s, r[a], t));
        }
        return Object.keys(e).every((n) => {
          let i = e[n];
          return (n in r || kt(o = i) && o[ke]().matcherType === "optional") && we(i, r[n], t);
          var o;
        });
      }
      return Object.is(r, e);
    };
    var Be = (e) => {
      var r, t, n;
      return Mn(e) ? kt(e) ? (r = (t = (n = e[ke]()).getSelectionKeys) == null ? void 0 : t.call(n)) != null ? r : [] : Array.isArray(e) ? $r(e, Be) : $r(Object.values(e), Be) : [];
    };
    var $r = (e, r) => e.reduce((t, n) => t.concat(r(n)), []);
    function fe(e) {
      return Object.assign(e, { optional: () => au(e), and: (r) => B(e, r), or: (r) => lu(e, r), select: (r) => r === void 0 ? ho(e) : ho(r, e) });
    }
    function au(e) {
      return fe({ [ke]: () => ({ match: (r) => {
        let t = {}, n = (i, o) => {
          t[i] = o;
        };
        return r === void 0 ? (Be(e).forEach((i) => n(i, void 0)), { matched: true, selections: t }) : { matched: we(e, r, n), selections: t };
      }, getSelectionKeys: () => Be(e), matcherType: "optional" }) });
    }
    function B(...e) {
      return fe({ [ke]: () => ({ match: (r) => {
        let t = {}, n = (i, o) => {
          t[i] = o;
        };
        return { matched: e.every((i) => we(i, r, n)), selections: t };
      }, getSelectionKeys: () => $r(e, Be), matcherType: "and" }) });
    }
    function lu(...e) {
      return fe({ [ke]: () => ({ match: (r) => {
        let t = {}, n = (i, o) => {
          t[i] = o;
        };
        return $r(e, Be).forEach((i) => n(i, void 0)), { matched: e.some((i) => we(i, r, n)), selections: t };
      }, getSelectionKeys: () => $r(e, Be), matcherType: "or" }) });
    }
    function k(e) {
      return { [ke]: () => ({ match: (r) => ({ matched: !!e(r) }) }) };
    }
    function ho(...e) {
      let r = typeof e[0] == "string" ? e[0] : void 0, t = e.length === 2 ? e[1] : typeof e[0] == "string" ? void 0 : e[0];
      return fe({ [ke]: () => ({ match: (n) => {
        let i = { [r ?? Dt]: n };
        return { matched: t === void 0 || we(t, n, (o, s) => {
          i[o] = s;
        }), selections: i };
      }, getSelectionKeys: () => [r ?? Dt].concat(t === void 0 ? [] : Be(t)) }) });
    }
    function Ee(e) {
      return typeof e == "number";
    }
    function Ze(e) {
      return typeof e == "string";
    }
    function $e(e) {
      return typeof e == "bigint";
    }
    var yd = fe(k(function(e) {
      return true;
    }));
    var Xe = (e) => Object.assign(fe(e), { startsWith: (r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && n.startsWith(t)))));
      var t;
    }, endsWith: (r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && n.endsWith(t)))));
      var t;
    }, minLength: (r) => Xe(B(e, ((t) => k((n) => Ze(n) && n.length >= t))(r))), maxLength: (r) => Xe(B(e, ((t) => k((n) => Ze(n) && n.length <= t))(r))), includes: (r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && n.includes(t)))));
      var t;
    }, regex: (r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && !!n.match(t)))));
      var t;
    } });
    var Ed = Xe(k(Ze));
    var be = (e) => Object.assign(fe(e), { between: (r, t) => be(B(e, ((n, i) => k((o) => Ee(o) && n <= o && i >= o))(r, t))), lt: (r) => be(B(e, ((t) => k((n) => Ee(n) && n < t))(r))), gt: (r) => be(B(e, ((t) => k((n) => Ee(n) && n > t))(r))), lte: (r) => be(B(e, ((t) => k((n) => Ee(n) && n <= t))(r))), gte: (r) => be(B(e, ((t) => k((n) => Ee(n) && n >= t))(r))), int: () => be(B(e, k((r) => Ee(r) && Number.isInteger(r)))), finite: () => be(B(e, k((r) => Ee(r) && Number.isFinite(r)))), positive: () => be(B(e, k((r) => Ee(r) && r > 0))), negative: () => be(B(e, k((r) => Ee(r) && r < 0))) });
    var bd = be(k(Ee));
    var qe = (e) => Object.assign(fe(e), { between: (r, t) => qe(B(e, ((n, i) => k((o) => $e(o) && n <= o && i >= o))(r, t))), lt: (r) => qe(B(e, ((t) => k((n) => $e(n) && n < t))(r))), gt: (r) => qe(B(e, ((t) => k((n) => $e(n) && n > t))(r))), lte: (r) => qe(B(e, ((t) => k((n) => $e(n) && n <= t))(r))), gte: (r) => qe(B(e, ((t) => k((n) => $e(n) && n >= t))(r))), positive: () => qe(B(e, k((r) => $e(r) && r > 0))), negative: () => qe(B(e, k((r) => $e(r) && r < 0))) });
    var wd = qe(k($e));
    var xd = fe(k(function(e) {
      return typeof e == "boolean";
    }));
    var Pd = fe(k(function(e) {
      return typeof e == "symbol";
    }));
    var vd = fe(k(function(e) {
      return e == null;
    }));
    var $n = { matched: false, value: void 0 };
    function pr(e) {
      return new qn(e, $n);
    }
    var qn = class e {
      constructor(r, t) {
        this.input = void 0, this.state = void 0, this.input = r, this.state = t;
      }
      with(...r) {
        if (this.state.matched) return this;
        let t = r[r.length - 1], n = [r[0]], i;
        r.length === 3 && typeof r[1] == "function" ? i = r[1] : r.length > 2 && n.push(...r.slice(1, r.length - 1));
        let o = false, s = {}, a = (u, c) => {
          o = true, s[u] = c;
        }, l = !n.some((u) => we(u, this.input, a)) || i && !i(this.input) ? $n : { matched: true, value: t(o ? Dt in s ? s[Dt] : s : this.input, this.input) };
        return new e(this.input, l);
      }
      when(r, t) {
        if (this.state.matched) return this;
        let n = !!r(this.input);
        return new e(this.input, n ? { matched: true, value: t(this.input, this.input) } : $n);
      }
      otherwise(r) {
        return this.state.matched ? this.state.value : r(this.input);
      }
      exhaustive() {
        if (this.state.matched) return this.state.value;
        let r;
        try {
          r = JSON.stringify(this.input);
        } catch {
          r = this.input;
        }
        throw new Error(`Pattern matching error: no pattern matches value ${r}`);
      }
      run() {
        return this.exhaustive();
      }
      returnType() {
        return this;
      }
    };
    var Do = require("util");
    var Ao = _(Ro());
    function Vr(e) {
      return (0, Ao.default)(e, e, { fallback: ee });
    }
    var du = { warn: de("prisma:warn") };
    var fu = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
    function jr(e, ...r) {
      fu.warn() && console.warn(`${du.warn} ${e}`, ...r);
    }
    var gu = (0, Do.promisify)(ko.default.exec);
    var ie = N("prisma:get-platform");
    var hu = ["1.0.x", "1.1.x", "3.0.x"];
    async function Lo() {
      let e = Ot.default.platform(), r = process.arch;
      if (e === "freebsd") {
        let s = await Ft("freebsd-version");
        if (s && s.trim().length > 0) {
          let l = /^(\d+)\.?/.exec(s);
          if (l) return { platform: "freebsd", targetDistro: `freebsd${l[1]}`, arch: r };
        }
      }
      if (e !== "linux") return { platform: e, arch: r };
      let t = await Eu(), n = await Su(), i = wu({ arch: r, archFromUname: n, familyDistro: t.familyDistro }), { libssl: o } = await xu(i);
      return { platform: "linux", libssl: o, arch: r, archFromUname: n, ...t };
    }
    function yu(e) {
      let r = /^ID="?([^"\n]*)"?$/im, t = /^ID_LIKE="?([^"\n]*)"?$/im, n = r.exec(e), i = n && n[1] && n[1].toLowerCase() || "", o = t.exec(e), s = o && o[1] && o[1].toLowerCase() || "", a = pr({ id: i, idLike: s }).with({ id: "alpine" }, ({ id: l }) => ({ targetDistro: "musl", familyDistro: l, originalDistro: l })).with({ id: "raspbian" }, ({ id: l }) => ({ targetDistro: "arm", familyDistro: "debian", originalDistro: l })).with({ id: "nixos" }, ({ id: l }) => ({ targetDistro: "nixos", originalDistro: l, familyDistro: "nixos" })).with({ id: "debian" }, { id: "ubuntu" }, ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).with({ id: "rhel" }, { id: "centos" }, { id: "fedora" }, ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).when(({ idLike: l }) => l.includes("debian") || l.includes("ubuntu"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).when(({ idLike: l }) => i === "arch" || l.includes("arch"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "arch", originalDistro: l })).when(({ idLike: l }) => l.includes("centos") || l.includes("fedora") || l.includes("rhel") || l.includes("suse"), ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).otherwise(({ id: l }) => ({ targetDistro: void 0, familyDistro: void 0, originalDistro: l }));
      return ie(`Found distro info:
${JSON.stringify(a, null, 2)}`), a;
    }
    async function Eu() {
      let e = "/etc/os-release";
      try {
        let r = await Jn.default.readFile(e, { encoding: "utf-8" });
        return yu(r);
      } catch {
        return { targetDistro: void 0, familyDistro: void 0, originalDistro: void 0 };
      }
    }
    function bu(e) {
      let r = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);
      if (r) {
        let t = `${r[1]}.x`;
        return No(t);
      }
    }
    function Io(e) {
      let r = /libssl\.so\.(\d)(\.\d)?/.exec(e);
      if (r) {
        let t = `${r[1]}${r[2] ?? ".0"}.x`;
        return No(t);
      }
    }
    function No(e) {
      let r = (() => {
        if (Fo(e)) return e;
        let t = e.split(".");
        return t[1] = "0", t.join(".");
      })();
      if (hu.includes(r)) return r;
    }
    function wu(e) {
      return pr(e).with({ familyDistro: "musl" }, () => (ie('Trying platform-specific paths for "alpine"'), ["/lib"])).with({ familyDistro: "debian" }, ({ archFromUname: r }) => (ie('Trying platform-specific paths for "debian" (and "ubuntu")'), [`/usr/lib/${r}-linux-gnu`, `/lib/${r}-linux-gnu`])).with({ familyDistro: "rhel" }, () => (ie('Trying platform-specific paths for "rhel"'), ["/lib64", "/usr/lib64"])).otherwise(({ familyDistro: r, arch: t, archFromUname: n }) => (ie(`Don't know any platform-specific paths for "${r}" on ${t} (${n})`), []));
    }
    async function xu(e) {
      let r = 'grep -v "libssl.so.0"', t = await _o(e);
      if (t) {
        ie(`Found libssl.so file using platform-specific paths: ${t}`);
        let o = Io(t);
        if (ie(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "libssl-specific-path" };
      }
      ie('Falling back to "ldconfig" and other generic paths');
      let n = await Ft(`ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${r}`);
      if (n || (n = await _o(["/lib64", "/usr/lib64", "/lib"])), n) {
        ie(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);
        let o = Io(n);
        if (ie(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "ldconfig" };
      }
      let i = await Ft("openssl version -v");
      if (i) {
        ie(`Found openssl binary with version: ${i}`);
        let o = bu(i);
        if (ie(`The parsed openssl version is: ${o}`), o) return { libssl: o, strategy: "openssl-binary" };
      }
      return ie("Couldn't find any version of libssl or OpenSSL in the system"), {};
    }
    async function _o(e) {
      for (let r of e) {
        let t = await Pu(r);
        if (t) return t;
      }
    }
    async function Pu(e) {
      try {
        return (await Jn.default.readdir(e)).find((t) => t.startsWith("libssl.so.") && !t.startsWith("libssl.so.0"));
      } catch (r) {
        if (r.code === "ENOENT") return;
        throw r;
      }
    }
    async function er() {
      let { binaryTarget: e } = await Oo();
      return e;
    }
    function vu(e) {
      return e.binaryTarget !== void 0;
    }
    async function Hn() {
      let { memoized: e, ...r } = await Oo();
      return r;
    }
    var Nt = {};
    async function Oo() {
      if (vu(Nt)) return Promise.resolve({ ...Nt, memoized: true });
      let e = await Lo(), r = Tu(e);
      return Nt = { ...e, binaryTarget: r }, { ...Nt, memoized: false };
    }
    function Tu(e) {
      let { platform: r, arch: t, archFromUname: n, libssl: i, targetDistro: o, familyDistro: s, originalDistro: a } = e;
      r === "linux" && !["x64", "arm64"].includes(t) && jr(`Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures. If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`);
      let l = "1.1.x";
      if (r === "linux" && i === void 0) {
        let c = pr({ familyDistro: s }).with({ familyDistro: "debian" }, () => "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.").otherwise(() => "Please manually install OpenSSL and try installing Prisma again.");
        jr(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`);
      }
      let u = "debian";
      if (r === "linux" && o === void 0 && jr(`Prisma doesn't know which engines to download for the Linux distro "${a}". Falling back to Prisma engines built "${u}".
Please report your experience by creating an issue at ${Vr("https://github.com/prisma/prisma/issues")} so we can add your distro to the list of known supported distros.`), r === "darwin" && t === "arm64") return "darwin-arm64";
      if (r === "darwin") return "darwin";
      if (r === "win32") return "windows";
      if (r === "freebsd") return o;
      if (r === "openbsd") return "openbsd";
      if (r === "netbsd") return "netbsd";
      if (r === "linux" && o === "nixos") return "linux-nixos";
      if (r === "linux" && t === "arm64") return `${o === "musl" ? "linux-musl-arm64" : "linux-arm64"}-openssl-${i || l}`;
      if (r === "linux" && t === "arm") return `linux-arm-openssl-${i || l}`;
      if (r === "linux" && o === "musl") {
        let c = "linux-musl";
        return !i || Fo(i) ? c : `${c}-openssl-${i}`;
      }
      return r === "linux" && o && i ? `${o}-openssl-${i}` : (r !== "linux" && jr(`Prisma detected unknown OS "${r}" and may not work as expected. Defaulting to "linux".`), i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`);
    }
    async function Cu(e) {
      try {
        return await e();
      } catch {
        return;
      }
    }
    function Ft(e) {
      return Cu(async () => {
        let r = await gu(e);
        return ie(`Command "${e}" successfully returned "${r.stdout}"`), r.stdout;
      });
    }
    async function Su() {
      return typeof Ot.default.machine == "function" ? Ot.default.machine() : (await Ft("uname -m"))?.trim();
    }
    function Fo(e) {
      return e.startsWith("1.");
    }
    var zn = _(qo());
    var qt = _(require("fs"));
    var fr = _(require("path"));
    function Bo(e) {
      let r = e.ignoreProcessEnv ? {} : process.env, t = (n) => n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function(o, s) {
        let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
        if (!a) return o;
        let l = a[1], u, c;
        if (l === "\\") c = a[0], u = c.replace("\\$", "$");
        else {
          let p = a[2];
          c = a[0].substring(l.length), u = Object.hasOwnProperty.call(r, p) ? r[p] : e.parsed[p] || "", u = t(u);
        }
        return o.replace(c, u);
      }, n) ?? n;
      for (let n in e.parsed) {
        let i = Object.hasOwnProperty.call(r, n) ? r[n] : e.parsed[n];
        e.parsed[n] = t(i);
      }
      for (let n in e.parsed) r[n] = e.parsed[n];
      return e;
    }
    var Kn = N("prisma:tryLoadEnv");
    function Ur({ rootEnvPath: e, schemaEnvPath: r }, t = { conflictCheck: "none" }) {
      let n = Vo(e);
      t.conflictCheck !== "none" && Fu(n, r, t.conflictCheck);
      let i = null;
      return jo(n?.path, r) || (i = Vo(r)), !n && !i && Kn("No Environment variables loaded"), i?.dotenvResult.error ? console.error(ce(W("Schema Env Error: ")) + i.dotenvResult.error) : { message: [n?.message, i?.message].filter(Boolean).join(`
`), parsed: { ...n?.dotenvResult?.parsed, ...i?.dotenvResult?.parsed } };
    }
    function Fu(e, r, t) {
      let n = e?.dotenvResult.parsed, i = !jo(e?.path, r);
      if (n && r && i && qt.default.existsSync(r)) {
        let o = zn.default.parse(qt.default.readFileSync(r)), s = [];
        for (let a in o) n[a] === o[a] && s.push(a);
        if (s.length > 0) {
          let a = fr.default.relative(process.cwd(), e.path), l = fr.default.relative(process.cwd(), r);
          if (t === "error") {
            let u = `There is a conflict between env var${s.length > 1 ? "s" : ""} in ${ee(a)} and ${ee(l)}
Conflicting env vars:
${s.map((c) => `  ${W(c)}`).join(`
`)}

We suggest to move the contents of ${ee(l)} to ${ee(a)} to consolidate your env vars.
`;
            throw new Error(u);
          } else if (t === "warn") {
            let u = `Conflict for env var${s.length > 1 ? "s" : ""} ${s.map((c) => W(c)).join(", ")} in ${ee(a)} and ${ee(l)}
Env vars from ${ee(l)} overwrite the ones from ${ee(a)}
      `;
            console.warn(`${de("warn(prisma)")} ${u}`);
          }
        }
      }
    }
    function Vo(e) {
      if (Mu(e)) {
        Kn(`Environment variables loaded from ${e}`);
        let r = zn.default.config({ path: e, debug: process.env.DOTENV_CONFIG_DEBUG ? true : void 0 });
        return { dotenvResult: Bo(r), message: Ie(`Environment variables loaded from ${fr.default.relative(process.cwd(), e)}`), path: e };
      } else Kn(`Environment variables not found at ${e}`);
      return null;
    }
    function jo(e, r) {
      return e && r && fr.default.resolve(e) === fr.default.resolve(r);
    }
    function Mu(e) {
      return !!(e && qt.default.existsSync(e));
    }
    var Uo = "library";
    function Qr(e) {
      let r = $u();
      return r || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : Uo);
    }
    function $u() {
      let e = process.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
    }
    var Vu = _(Zn());
    var M = _(require("path"));
    var ju = _(Zn());
    var df = N("prisma:engines");
    function Wo() {
      return M.default.join(__dirname, "../");
    }
    var ff = "libquery-engine";
    M.default.join(__dirname, "../query-engine-darwin");
    M.default.join(__dirname, "../query-engine-darwin-arm64");
    M.default.join(__dirname, "../query-engine-debian-openssl-1.0.x");
    M.default.join(__dirname, "../query-engine-debian-openssl-1.1.x");
    M.default.join(__dirname, "../query-engine-debian-openssl-3.0.x");
    M.default.join(__dirname, "../query-engine-linux-static-x64");
    M.default.join(__dirname, "../query-engine-linux-static-arm64");
    M.default.join(__dirname, "../query-engine-rhel-openssl-1.0.x");
    M.default.join(__dirname, "../query-engine-rhel-openssl-1.1.x");
    M.default.join(__dirname, "../query-engine-rhel-openssl-3.0.x");
    M.default.join(__dirname, "../libquery_engine-darwin.dylib.node");
    M.default.join(__dirname, "../libquery_engine-darwin-arm64.dylib.node");
    M.default.join(__dirname, "../libquery_engine-debian-openssl-1.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-debian-openssl-1.1.x.so.node");
    M.default.join(__dirname, "../libquery_engine-debian-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.1.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-musl.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-musl-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-rhel-openssl-1.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-rhel-openssl-1.1.x.so.node");
    M.default.join(__dirname, "../libquery_engine-rhel-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../query_engine-windows.dll.node");
    var Xn = _(require("fs"));
    var Ko = N("chmodPlusX");
    function ei(e) {
      if (process.platform === "win32") return;
      let r = Xn.default.statSync(e), t = r.mode | 64 | 8 | 1;
      if (r.mode === t) {
        Ko(`Execution permissions of ${e} are fine`);
        return;
      }
      let n = t.toString(8).slice(-3);
      Ko(`Have to call chmodPlusX on ${e}`), Xn.default.chmodSync(e, n);
    }
    function ri(e) {
      let r = e.e, t = (a) => `Prisma cannot find the required \`${a}\` system library in your system`, n = r.message.includes("cannot open shared object file"), i = `Please refer to the documentation about Prisma's system requirements: ${Vr("https://pris.ly/d/system-requirements")}`, o = `Unable to require(\`${Ie(e.id)}\`).`, s = pr({ message: r.message, code: r.code }).with({ code: "ENOENT" }, () => "File does not exist.").when(({ message: a }) => n && a.includes("libz"), () => `${t("libz")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libgcc_s"), () => `${t("libgcc_s")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libssl"), () => {
        let a = e.platformInfo.libssl ? `openssl-${e.platformInfo.libssl}` : "openssl";
        return `${t("libssl")}. Please install ${a} and try again.`;
      }).when(({ message: a }) => a.includes("GLIBC"), () => `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`).when(({ message: a }) => e.platformInfo.platform === "linux" && a.includes("symbol not found"), () => `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`).otherwise(() => `The Prisma engines do not seem to be compatible with your system. ${i}`);
      return `${o}
${s}

Details: ${r.message}`;
    }
    var De;
    ((r) => {
      let e;
      ((E) => (E.findUnique = "findUnique", E.findUniqueOrThrow = "findUniqueOrThrow", E.findFirst = "findFirst", E.findFirstOrThrow = "findFirstOrThrow", E.findMany = "findMany", E.create = "create", E.createMany = "createMany", E.update = "update", E.updateMany = "updateMany", E.upsert = "upsert", E.delete = "delete", E.deleteMany = "deleteMany", E.groupBy = "groupBy", E.count = "count", E.aggregate = "aggregate", E.findRaw = "findRaw", E.aggregateRaw = "aggregateRaw"))(e = r.ModelAction || (r.ModelAction = {}));
    })(De || (De = {}));
    var Gr = _(require("path"));
    function ti(e) {
      return Gr.default.sep === Gr.default.posix.sep ? e : e.split(Gr.default.sep).join(Gr.default.posix.sep);
    }
    var Yo = _(ni());
    function oi(e) {
      return String(new ii(e));
    }
    var ii = class {
      constructor(r) {
        this.config = r;
      }
      toString() {
        let { config: r } = this, t = r.provider.fromEnvVar ? `env("${r.provider.fromEnvVar}")` : r.provider.value, n = JSON.parse(JSON.stringify({ provider: t, binaryTargets: Uu(r.binaryTargets) }));
        return `generator ${r.name} {
${(0, Yo.default)(Qu(n), 2)}
}`;
      }
    };
    function Uu(e) {
      let r;
      if (e.length > 0) {
        let t = e.find((n) => n.fromEnvVar !== null);
        t ? r = `env("${t.fromEnvVar}")` : r = e.map((n) => n.native ? "native" : n.value);
      } else r = void 0;
      return r;
    }
    function Qu(e) {
      let r = Object.keys(e).reduce((t, n) => Math.max(t, n.length), 0);
      return Object.entries(e).map(([t, n]) => `${t.padEnd(r)} = ${Gu(n)}`).join(`
`);
    }
    function Gu(e) {
      return JSON.parse(JSON.stringify(e, (r, t) => Array.isArray(t) ? `[${t.map((n) => JSON.stringify(n)).join(", ")}]` : JSON.stringify(t)));
    }
    var Hr = {};
    Nr(Hr, { error: () => Wu, info: () => Hu, log: () => Ju, query: () => Ku, should: () => Zo, tags: () => Jr, warn: () => si });
    var Jr = { error: ce("prisma:error"), warn: de("prisma:warn"), info: _e("prisma:info"), query: Ye("prisma:query") };
    var Zo = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
    function Ju(...e) {
      console.log(...e);
    }
    function si(e, ...r) {
      Zo.warn() && console.warn(`${Jr.warn} ${e}`, ...r);
    }
    function Hu(e, ...r) {
      console.info(`${Jr.info} ${e}`, ...r);
    }
    function Wu(e, ...r) {
      console.error(`${Jr.error} ${e}`, ...r);
    }
    function Ku(e, ...r) {
      console.log(`${Jr.query} ${e}`, ...r);
    }
    function Vt(e, r) {
      if (!e) throw new Error(`${r}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    function rr(e, r) {
      throw new Error(r);
    }
    function li(e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }
    var ui = (e, r) => e.reduce((t, n) => (t[r(n)] = n, t), {});
    function gr(e, r) {
      let t = {};
      for (let n of Object.keys(e)) t[n] = r(e[n], n);
      return t;
    }
    function ci(e, r) {
      if (e.length === 0) return;
      let t = e[0];
      for (let n = 1; n < e.length; n++) r(t, e[n]) < 0 && (t = e[n]);
      return t;
    }
    function w(e, r) {
      Object.defineProperty(e, "name", { value: r, configurable: true });
    }
    var ns = /* @__PURE__ */ new Set();
    var Wr = (e, r, ...t) => {
      ns.has(e) || (ns.add(e), si(r, ...t));
    };
    var V = class extends Error {
      constructor(r, { code: t, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(r), this.name = "PrismaClientKnownRequestError", this.code = t, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    w(V, "PrismaClientKnownRequestError");
    var Le = class extends V {
      constructor(r, t) {
        super(r, { code: "P2025", clientVersion: t }), this.name = "NotFoundError";
      }
    };
    w(Le, "NotFoundError");
    var S = class e extends Error {
      constructor(r, t, n) {
        super(r), this.name = "PrismaClientInitializationError", this.clientVersion = t, this.errorCode = n, Error.captureStackTrace(e);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    w(S, "PrismaClientInitializationError");
    var ue = class extends Error {
      constructor(r, t) {
        super(r), this.name = "PrismaClientRustPanicError", this.clientVersion = t;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    w(ue, "PrismaClientRustPanicError");
    var j = class extends Error {
      constructor(r, { clientVersion: t, batchRequestIdx: n }) {
        super(r), this.name = "PrismaClientUnknownRequestError", this.clientVersion = t, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    w(j, "PrismaClientUnknownRequestError");
    var K = class extends Error {
      constructor(t, { clientVersion: n }) {
        super(t);
        this.name = "PrismaClientValidationError";
        this.clientVersion = n;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    w(K, "PrismaClientValidationError");
    var hr = class {
      constructor(r) {
        this._engine = r;
      }
      prometheus(r) {
        return this._engine.metrics({ format: "prometheus", ...r });
      }
      json(r) {
        return this._engine.metrics({ format: "json", ...r });
      }
    };
    function Kr(e) {
      let r;
      return { get() {
        return r || (r = { value: e() }), r.value;
      } };
    }
    function is(e, r) {
      let t = Kr(() => Yu(r));
      Object.defineProperty(e, "dmmf", { get: () => t.get() });
    }
    function Yu(e) {
      return { datamodel: { models: pi(e.models), enums: pi(e.enums), types: pi(e.types) } };
    }
    function pi(e) {
      return Object.entries(e).map(([r, t]) => ({ name: r, ...t }));
    }
    var Qt = Symbol();
    var mi = /* @__PURE__ */ new WeakMap();
    var Ne = class {
      constructor(r) {
        r === Qt ? mi.set(this, `Prisma.${this._getName()}`) : mi.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return mi.get(this);
      }
    };
    var zr = class extends Ne {
      _getNamespace() {
        return "NullTypes";
      }
    };
    var Yr = class extends zr {
    };
    di(Yr, "DbNull");
    var Zr = class extends zr {
    };
    di(Zr, "JsonNull");
    var Xr = class extends zr {
    };
    di(Xr, "AnyNull");
    var Gt = { classes: { DbNull: Yr, JsonNull: Zr, AnyNull: Xr }, instances: { DbNull: new Yr(Qt), JsonNull: new Zr(Qt), AnyNull: new Xr(Qt) } };
    function di(e, r) {
      Object.defineProperty(e, "name", { value: r, configurable: true });
    }
    function et(e) {
      return { ok: false, error: e, map() {
        return et(e);
      }, flatMap() {
        return et(e);
      } };
    }
    var fi = class {
      constructor() {
        this.registeredErrors = [];
      }
      consumeError(r) {
        return this.registeredErrors[r];
      }
      registerNewError(r) {
        let t = 0;
        for (; this.registeredErrors[t] !== void 0; ) t++;
        return this.registeredErrors[t] = { error: r }, t;
      }
    };
    var gi = (e) => {
      let r = new fi(), t = tr(r, e.startTransaction.bind(e)), n = { errorRegistry: r, queryRaw: tr(r, e.queryRaw.bind(e)), executeRaw: tr(r, e.executeRaw.bind(e)), provider: e.provider, startTransaction: async (...i) => (await t(...i)).map((s) => Zu(r, s)) };
      return e.getConnectionInfo && (n.getConnectionInfo = Xu(r, e.getConnectionInfo.bind(e))), n;
    };
    var Zu = (e, r) => ({ provider: r.provider, options: r.options, queryRaw: tr(e, r.queryRaw.bind(r)), executeRaw: tr(e, r.executeRaw.bind(r)), commit: tr(e, r.commit.bind(r)), rollback: tr(e, r.rollback.bind(r)) });
    function tr(e, r) {
      return async (...t) => {
        try {
          return await r(...t);
        } catch (n) {
          let i = e.registerNewError(n);
          return et({ kind: "GenericJs", id: i });
        }
      };
    }
    function Xu(e, r) {
      return (...t) => {
        try {
          return r(...t);
        } catch (n) {
          let i = e.registerNewError(n);
          return et({ kind: "GenericJs", id: i });
        }
      };
    }
    var Sl = _(Yn());
    var Rl = require("async_hooks");
    var Al = require("events");
    var Il = _(require("fs"));
    var Ct = _(require("path"));
    var oe = class e {
      constructor(r, t) {
        if (r.length - 1 !== t.length) throw r.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${r.length} strings to have ${r.length - 1} values`);
        let n = t.reduce((s, a) => s + (a instanceof e ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = r[0];
        let i = 0, o = 0;
        for (; i < t.length; ) {
          let s = t[i++], a = r[i];
          if (s instanceof e) {
            this.strings[o] += s.strings[0];
            let l = 0;
            for (; l < s.values.length; ) this.values[o++] = s.values[l++], this.strings[o] = s.strings[l];
            this.strings[o] += a;
          } else this.values[o++] = s, this.strings[o] = a;
        }
      }
      get text() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for (; t < r; ) n += `$${t}${this.strings[t++]}`;
        return n;
      }
      get sql() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for (; t < r; ) n += `?${this.strings[t++]}`;
        return n;
      }
      get statement() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for (; t < r; ) n += `:${t}${this.strings[t++]}`;
        return n;
      }
      inspect() {
        return { text: this.text, sql: this.sql, values: this.values };
      }
    };
    function os(e, r = ",", t = "", n = "") {
      if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new oe([t, ...Array(e.length - 1).fill(r), n], e);
    }
    function hi(e) {
      return new oe([e], []);
    }
    var ss = hi("");
    function yi(e, ...r) {
      return new oe(e, r);
    }
    function rt(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(r) {
        return e[r];
      } };
    }
    function te(e, r) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return r();
      } };
    }
    var xe = class {
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(r) {
        return this._map.get(r)?.value;
      }
      set(r, t) {
        this._map.set(r, { value: t });
      }
      getOrCreate(r, t) {
        let n = this._map.get(r);
        if (n) return n.value;
        let i = t();
        return this.set(r, i), i;
      }
    };
    function nr(e) {
      let r = new xe();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(t) {
        return r.getOrCreate(t, () => e.getPropertyValue(t));
      }, getPropertyDescriptor(t) {
        return e.getPropertyDescriptor?.(t);
      } };
    }
    var us = require("util");
    var Jt = { enumerable: true, configurable: true, writable: true };
    function Ht(e) {
      let r = new Set(e);
      return { getOwnPropertyDescriptor: () => Jt, has: (t, n) => r.has(n), set: (t, n, i) => r.add(n) && Reflect.set(t, n, i), ownKeys: () => [...r] };
    }
    var as = Symbol.for("nodejs.util.inspect.custom");
    function Pe(e, r) {
      let t = ec(r), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s)) return o[s];
        let a = t.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a = t.get(s);
        return a ? a.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = ls(Reflect.ownKeys(o), t), a = ls(Array.from(t.keys()), t);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        return t.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let l = t.get(s);
        return l ? l.getPropertyDescriptor ? { ...Jt, ...l?.getPropertyDescriptor(s) } : Jt : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      } });
      return i[as] = function(o, s, a = us.inspect) {
        let l = { ...this };
        return delete l[as], a(l, s);
      }, i;
    }
    function ec(e) {
      let r = /* @__PURE__ */ new Map();
      for (let t of e) {
        let n = t.getKeys();
        for (let i of n) r.set(i, t);
      }
      return r;
    }
    function ls(e, r) {
      return e.filter((t) => r.get(t)?.has?.(t) ?? true);
    }
    function tt(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    function yr(e, r) {
      return { batch: e, transaction: r?.kind === "batch" ? { isolationLevel: r.options.isolationLevel } : void 0 };
    }
    var Er = class {
      constructor(r = 0, t) {
        this.context = t;
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.currentIndent = r;
      }
      write(r) {
        return typeof r == "string" ? this.currentLine += r : r.write(this), this;
      }
      writeJoined(r, t) {
        let n = t.length - 1;
        for (let i = 0; i < t.length; i++) this.write(t[i]), i !== n && this.write(r);
        return this;
      }
      writeLine(r) {
        return this.write(r).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let r = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, r?.(), this;
      }
      withIndent(r) {
        return this.indent(), r(this), this.unindent(), this;
      }
      afterNextNewline(r) {
        return this.afterNextNewLineCallback = r, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(r) {
        return this.marginSymbol = r, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let r = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + r.slice(1) : r;
      }
    };
    function cs(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    function br(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    function Wt(e) {
      return e.toString() !== "Invalid Date";
    }
    var wr = 9e15;
    var Ge = 1e9;
    var Ei = "0123456789abcdef";
    var zt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    var Yt = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    var bi = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -wr, maxE: wr, crypto: false };
    var fs;
    var Oe;
    var x = true;
    var Xt = "[DecimalError] ";
    var Qe = Xt + "Invalid argument: ";
    var gs = Xt + "Precision limit exceeded";
    var hs = Xt + "crypto unavailable";
    var ys = "[object Decimal]";
    var re = Math.floor;
    var Q = Math.pow;
    var rc = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    var tc = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    var nc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    var Es = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    var he = 1e7;
    var b = 7;
    var ic = 9007199254740991;
    var oc = zt.length - 1;
    var wi = Yt.length - 1;
    var d = { toStringTag: ys };
    d.absoluteValue = d.abs = function() {
      var e = new this.constructor(this);
      return e.s < 0 && (e.s = 1), y(e);
    };
    d.ceil = function() {
      return y(new this.constructor(this), this.e + 1, 2);
    };
    d.clampedTo = d.clamp = function(e, r) {
      var t, n = this, i = n.constructor;
      if (e = new i(e), r = new i(r), !e.s || !r.s) return new i(NaN);
      if (e.gt(r)) throw Error(Qe + r);
      return t = n.cmp(e), t < 0 ? e : n.cmp(r) > 0 ? r : new i(n);
    };
    d.comparedTo = d.cmp = function(e) {
      var r, t, n, i, o = this, s = o.d, a = (e = new o.constructor(e)).d, l = o.s, u = e.s;
      if (!s || !a) return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ l < 0 ? 1 : -1;
      if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0;
      if (l !== u) return l;
      if (o.e !== e.e) return o.e > e.e ^ l < 0 ? 1 : -1;
      for (n = s.length, i = a.length, r = 0, t = n < i ? n : i; r < t; ++r) if (s[r] !== a[r]) return s[r] > a[r] ^ l < 0 ? 1 : -1;
      return n === i ? 0 : n > i ^ l < 0 ? 1 : -1;
    };
    d.cosine = d.cos = function() {
      var e, r, t = this, n = t.constructor;
      return t.d ? t.d[0] ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + b, n.rounding = 1, t = sc(n, vs(n, t)), n.precision = e, n.rounding = r, y(Oe == 2 || Oe == 3 ? t.neg() : t, e, r, true)) : new n(1) : new n(NaN);
    };
    d.cubeRoot = d.cbrt = function() {
      var e, r, t, n, i, o, s, a, l, u, c = this, p = c.constructor;
      if (!c.isFinite() || c.isZero()) return new p(c);
      for (x = false, o = c.s * Q(c.s * c, 1 / 3), !o || Math.abs(o) == 1 / 0 ? (t = z(c.d), e = c.e, (o = (e - t.length + 1) % 3) && (t += o == 1 || o == -2 ? "0" : "00"), o = Q(t, 1 / 3), e = re((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new p(t), n.s = c.s) : n = new p(o.toString()), s = (e = p.precision) + 3; ; ) if (a = n, l = a.times(a).times(a), u = l.plus(c), n = O(u.plus(c).times(a), u.plus(l), s + 2, 1), z(a.d).slice(0, s) === (t = z(n.d)).slice(0, s)) if (t = t.slice(s - 3, s + 1), t == "9999" || !i && t == "4999") {
        if (!i && (y(a, e + 1, 0), a.times(a).times(a).eq(c))) {
          n = a;
          break;
        }
        s += 4, i = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (y(n, e + 1, 1), r = !n.times(n).times(n).eq(c));
        break;
      }
      return x = true, y(n, e, p.rounding, r);
    };
    d.decimalPlaces = d.dp = function() {
      var e, r = this.d, t = NaN;
      if (r) {
        if (e = r.length - 1, t = (e - re(this.e / b)) * b, e = r[e], e) for (; e % 10 == 0; e /= 10) t--;
        t < 0 && (t = 0);
      }
      return t;
    };
    d.dividedBy = d.div = function(e) {
      return O(this, new this.constructor(e));
    };
    d.dividedToIntegerBy = d.divToInt = function(e) {
      var r = this, t = r.constructor;
      return y(O(r, new t(e), 0, 1, 1), t.precision, t.rounding);
    };
    d.equals = d.eq = function(e) {
      return this.cmp(e) === 0;
    };
    d.floor = function() {
      return y(new this.constructor(this), this.e + 1, 3);
    };
    d.greaterThan = d.gt = function(e) {
      return this.cmp(e) > 0;
    };
    d.greaterThanOrEqualTo = d.gte = function(e) {
      var r = this.cmp(e);
      return r == 1 || r === 0;
    };
    d.hyperbolicCosine = d.cosh = function() {
      var e, r, t, n, i, o = this, s = o.constructor, a = new s(1);
      if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
      if (o.isZero()) return a;
      t = s.precision, n = s.rounding, s.precision = t + Math.max(o.e, o.sd()) + 4, s.rounding = 1, i = o.d.length, i < 32 ? (e = Math.ceil(i / 3), r = (1 / rn(4, e)).toString()) : (e = 16, r = "2.3283064365386962890625e-10"), o = xr(s, 1, o.times(r), new s(1), true);
      for (var l, u = e, c = new s(8); u--; ) l = o.times(o), o = a.minus(l.times(c.minus(l.times(c))));
      return y(o, s.precision = t, s.rounding = n, true);
    };
    d.hyperbolicSine = d.sinh = function() {
      var e, r, t, n, i = this, o = i.constructor;
      if (!i.isFinite() || i.isZero()) return new o(i);
      if (r = o.precision, t = o.rounding, o.precision = r + Math.max(i.e, i.sd()) + 4, o.rounding = 1, n = i.d.length, n < 3) i = xr(o, 2, i, i, true);
      else {
        e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, i = i.times(1 / rn(5, e)), i = xr(o, 2, i, i, true);
        for (var s, a = new o(5), l = new o(16), u = new o(20); e--; ) s = i.times(i), i = i.times(a.plus(s.times(l.times(s).plus(u))));
      }
      return o.precision = r, o.rounding = t, y(i, r, t, true);
    };
    d.hyperbolicTangent = d.tanh = function() {
      var e, r, t = this, n = t.constructor;
      return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 7, n.rounding = 1, O(t.sinh(), t.cosh(), n.precision = e, n.rounding = r)) : new n(t.s);
    };
    d.inverseCosine = d.acos = function() {
      var e, r = this, t = r.constructor, n = r.abs().cmp(1), i = t.precision, o = t.rounding;
      return n !== -1 ? n === 0 ? r.isNeg() ? ge(t, i, o) : new t(0) : new t(NaN) : r.isZero() ? ge(t, i + 4, o).times(0.5) : (t.precision = i + 6, t.rounding = 1, r = r.asin(), e = ge(t, i + 4, o).times(0.5), t.precision = i, t.rounding = o, e.minus(r));
    };
    d.inverseHyperbolicCosine = d.acosh = function() {
      var e, r, t = this, n = t.constructor;
      return t.lte(1) ? new n(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, n.rounding = 1, x = false, t = t.times(t).minus(1).sqrt().plus(t), x = true, n.precision = e, n.rounding = r, t.ln()) : new n(t);
    };
    d.inverseHyperbolicSine = d.asinh = function() {
      var e, r, t = this, n = t.constructor;
      return !t.isFinite() || t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, n.rounding = 1, x = false, t = t.times(t).plus(1).sqrt().plus(t), x = true, n.precision = e, n.rounding = r, t.ln());
    };
    d.inverseHyperbolicTangent = d.atanh = function() {
      var e, r, t, n, i = this, o = i.constructor;
      return i.isFinite() ? i.e >= 0 ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = o.precision, r = o.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? y(new o(i), e, r, true) : (o.precision = t = n - i.e, i = O(i.plus(1), new o(1).minus(i), t + e, 1), o.precision = e + 4, o.rounding = 1, i = i.ln(), o.precision = e, o.rounding = r, i.times(0.5))) : new o(NaN);
    };
    d.inverseSine = d.asin = function() {
      var e, r, t, n, i = this, o = i.constructor;
      return i.isZero() ? new o(i) : (r = i.abs().cmp(1), t = o.precision, n = o.rounding, r !== -1 ? r === 0 ? (e = ge(o, t + 4, n).times(0.5), e.s = i.s, e) : new o(NaN) : (o.precision = t + 6, o.rounding = 1, i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(), o.precision = t, o.rounding = n, i.times(2)));
    };
    d.inverseTangent = d.atan = function() {
      var e, r, t, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, m = c.rounding;
      if (u.isFinite()) {
        if (u.isZero()) return new c(u);
        if (u.abs().eq(1) && p + 4 <= wi) return s = ge(c, p + 4, m).times(0.25), s.s = u.s, s;
      } else {
        if (!u.s) return new c(NaN);
        if (p + 4 <= wi) return s = ge(c, p + 4, m).times(0.5), s.s = u.s, s;
      }
      for (c.precision = a = p + 10, c.rounding = 1, t = Math.min(28, a / b + 2 | 0), e = t; e; --e) u = u.div(u.times(u).plus(1).sqrt().plus(1));
      for (x = false, r = Math.ceil(a / b), n = 1, l = u.times(u), s = new c(u), i = u; e !== -1; ) if (i = i.times(l), o = s.minus(i.div(n += 2)), i = i.times(l), s = o.plus(i.div(n += 2)), s.d[r] !== void 0) for (e = r; s.d[e] === o.d[e] && e--; ) ;
      return t && (s = s.times(2 << t - 1)), x = true, y(s, c.precision = p, c.rounding = m, true);
    };
    d.isFinite = function() {
      return !!this.d;
    };
    d.isInteger = d.isInt = function() {
      return !!this.d && re(this.e / b) > this.d.length - 2;
    };
    d.isNaN = function() {
      return !this.s;
    };
    d.isNegative = d.isNeg = function() {
      return this.s < 0;
    };
    d.isPositive = d.isPos = function() {
      return this.s > 0;
    };
    d.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    d.lessThan = d.lt = function(e) {
      return this.cmp(e) < 0;
    };
    d.lessThanOrEqualTo = d.lte = function(e) {
      return this.cmp(e) < 1;
    };
    d.logarithm = d.log = function(e) {
      var r, t, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, m = c.rounding, f = 5;
      if (e == null) e = new c(10), r = true;
      else {
        if (e = new c(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1)) return new c(NaN);
        r = e.eq(10);
      }
      if (t = u.d, u.s < 0 || !t || !t[0] || u.eq(1)) return new c(t && !t[0] ? -1 / 0 : u.s != 1 ? NaN : t ? 0 : 1 / 0);
      if (r) if (t.length > 1) o = true;
      else {
        for (i = t[0]; i % 10 === 0; ) i /= 10;
        o = i !== 1;
      }
      if (x = false, a = p + f, s = Ue(u, a), n = r ? Zt(c, a + 10) : Ue(e, a), l = O(s, n, a, 1), nt(l.d, i = p, m)) do
        if (a += 10, s = Ue(u, a), n = r ? Zt(c, a + 10) : Ue(e, a), l = O(s, n, a, 1), !o) {
          +z(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = y(l, p + 1, 0));
          break;
        }
      while (nt(l.d, i += 10, m));
      return x = true, y(l, p, m);
    };
    d.minus = d.sub = function(e) {
      var r, t, n, i, o, s, a, l, u, c, p, m, f = this, g = f.constructor;
      if (e = new g(e), !f.d || !e.d) return !f.s || !e.s ? e = new g(NaN) : f.d ? e.s = -e.s : e = new g(e.d || f.s !== e.s ? f : NaN), e;
      if (f.s != e.s) return e.s = -e.s, f.plus(e);
      if (u = f.d, m = e.d, a = g.precision, l = g.rounding, !u[0] || !m[0]) {
        if (m[0]) e.s = -e.s;
        else if (u[0]) e = new g(f);
        else return new g(l === 3 ? -0 : 0);
        return x ? y(e, a, l) : e;
      }
      if (t = re(e.e / b), c = re(f.e / b), u = u.slice(), o = c - t, o) {
        for (p = o < 0, p ? (r = u, o = -o, s = m.length) : (r = m, t = c, s = u.length), n = Math.max(Math.ceil(a / b), s) + 2, o > n && (o = n, r.length = 1), r.reverse(), n = o; n--; ) r.push(0);
        r.reverse();
      } else {
        for (n = u.length, s = m.length, p = n < s, p && (s = n), n = 0; n < s; n++) if (u[n] != m[n]) {
          p = u[n] < m[n];
          break;
        }
        o = 0;
      }
      for (p && (r = u, u = m, m = r, e.s = -e.s), s = u.length, n = m.length - s; n > 0; --n) u[s++] = 0;
      for (n = m.length; n > o; ) {
        if (u[--n] < m[n]) {
          for (i = n; i && u[--i] === 0; ) u[i] = he - 1;
          --u[i], u[n] += he;
        }
        u[n] -= m[n];
      }
      for (; u[--s] === 0; ) u.pop();
      for (; u[0] === 0; u.shift()) --t;
      return u[0] ? (e.d = u, e.e = en(u, t), x ? y(e, a, l) : e) : new g(l === 3 ? -0 : 0);
    };
    d.modulo = d.mod = function(e) {
      var r, t = this, n = t.constructor;
      return e = new n(e), !t.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || t.d && !t.d[0] ? y(new n(t), n.precision, n.rounding) : (x = false, n.modulo == 9 ? (r = O(t, e.abs(), 0, 3, 1), r.s *= e.s) : r = O(t, e, 0, n.modulo, 1), r = r.times(e), x = true, t.minus(r));
    };
    d.naturalExponential = d.exp = function() {
      return xi(this);
    };
    d.naturalLogarithm = d.ln = function() {
      return Ue(this);
    };
    d.negated = d.neg = function() {
      var e = new this.constructor(this);
      return e.s = -e.s, y(e);
    };
    d.plus = d.add = function(e) {
      var r, t, n, i, o, s, a, l, u, c, p = this, m = p.constructor;
      if (e = new m(e), !p.d || !e.d) return !p.s || !e.s ? e = new m(NaN) : p.d || (e = new m(e.d || p.s === e.s ? p : NaN)), e;
      if (p.s != e.s) return e.s = -e.s, p.minus(e);
      if (u = p.d, c = e.d, a = m.precision, l = m.rounding, !u[0] || !c[0]) return c[0] || (e = new m(p)), x ? y(e, a, l) : e;
      if (o = re(p.e / b), n = re(e.e / b), u = u.slice(), i = o - n, i) {
        for (i < 0 ? (t = u, i = -i, s = c.length) : (t = c, n = o, s = u.length), o = Math.ceil(a / b), s = o > s ? o + 1 : s + 1, i > s && (i = s, t.length = 1), t.reverse(); i--; ) t.push(0);
        t.reverse();
      }
      for (s = u.length, i = c.length, s - i < 0 && (i = s, t = c, c = u, u = t), r = 0; i; ) r = (u[--i] = u[i] + c[i] + r) / he | 0, u[i] %= he;
      for (r && (u.unshift(r), ++n), s = u.length; u[--s] == 0; ) u.pop();
      return e.d = u, e.e = en(u, n), x ? y(e, a, l) : e;
    };
    d.precision = d.sd = function(e) {
      var r, t = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Qe + e);
      return t.d ? (r = bs(t.d), e && t.e + 1 > r && (r = t.e + 1)) : r = NaN, r;
    };
    d.round = function() {
      var e = this, r = e.constructor;
      return y(new r(e), e.e + 1, r.rounding);
    };
    d.sine = d.sin = function() {
      var e, r, t = this, n = t.constructor;
      return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + b, n.rounding = 1, t = lc(n, vs(n, t)), n.precision = e, n.rounding = r, y(Oe > 2 ? t.neg() : t, e, r, true)) : new n(NaN);
    };
    d.squareRoot = d.sqrt = function() {
      var e, r, t, n, i, o, s = this, a = s.d, l = s.e, u = s.s, c = s.constructor;
      if (u !== 1 || !a || !a[0]) return new c(!u || u < 0 && (!a || a[0]) ? NaN : a ? s : 1 / 0);
      for (x = false, u = Math.sqrt(+s), u == 0 || u == 1 / 0 ? (r = z(a), (r.length + l) % 2 == 0 && (r += "0"), u = Math.sqrt(r), l = re((l + 1) / 2) - (l < 0 || l % 2), u == 1 / 0 ? r = "5e" + l : (r = u.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + l), n = new c(r)) : n = new c(u.toString()), t = (l = c.precision) + 3; ; ) if (o = n, n = o.plus(O(s, o, t + 2, 1)).times(0.5), z(o.d).slice(0, t) === (r = z(n.d)).slice(0, t)) if (r = r.slice(t - 3, t + 1), r == "9999" || !i && r == "4999") {
        if (!i && (y(o, l + 1, 0), o.times(o).eq(s))) {
          n = o;
          break;
        }
        t += 4, i = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (y(n, l + 1, 1), e = !n.times(n).eq(s));
        break;
      }
      return x = true, y(n, l, c.rounding, e);
    };
    d.tangent = d.tan = function() {
      var e, r, t = this, n = t.constructor;
      return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 10, n.rounding = 1, t = t.sin(), t.s = 1, t = O(t, new n(1).minus(t.times(t)).sqrt(), e + 10, 0), n.precision = e, n.rounding = r, y(Oe == 2 || Oe == 4 ? t.neg() : t, e, r, true)) : new n(NaN);
    };
    d.times = d.mul = function(e) {
      var r, t, n, i, o, s, a, l, u, c = this, p = c.constructor, m = c.d, f = (e = new p(e)).d;
      if (e.s *= c.s, !m || !m[0] || !f || !f[0]) return new p(!e.s || m && !m[0] && !f || f && !f[0] && !m ? NaN : !m || !f ? e.s / 0 : e.s * 0);
      for (t = re(c.e / b) + re(e.e / b), l = m.length, u = f.length, l < u && (o = m, m = f, f = o, s = l, l = u, u = s), o = [], s = l + u, n = s; n--; ) o.push(0);
      for (n = u; --n >= 0; ) {
        for (r = 0, i = l + n; i > n; ) a = o[i] + f[n] * m[i - n - 1] + r, o[i--] = a % he | 0, r = a / he | 0;
        o[i] = (o[i] + r) % he | 0;
      }
      for (; !o[--s]; ) o.pop();
      return r ? ++t : o.shift(), e.d = o, e.e = en(o, t), x ? y(e, p.precision, p.rounding) : e;
    };
    d.toBinary = function(e, r) {
      return vi(this, 2, e, r);
    };
    d.toDecimalPlaces = d.toDP = function(e, r) {
      var t = this, n = t.constructor;
      return t = new n(t), e === void 0 ? t : (se(e, 0, Ge), r === void 0 ? r = n.rounding : se(r, 0, 8), y(t, e + t.e + 1, r));
    };
    d.toExponential = function(e, r) {
      var t, n = this, i = n.constructor;
      return e === void 0 ? t = ve(n, true) : (se(e, 0, Ge), r === void 0 ? r = i.rounding : se(r, 0, 8), n = y(new i(n), e + 1, r), t = ve(n, true, e + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
    };
    d.toFixed = function(e, r) {
      var t, n, i = this, o = i.constructor;
      return e === void 0 ? t = ve(i) : (se(e, 0, Ge), r === void 0 ? r = o.rounding : se(r, 0, 8), n = y(new o(i), e + i.e + 1, r), t = ve(n, false, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + t : t;
    };
    d.toFraction = function(e) {
      var r, t, n, i, o, s, a, l, u, c, p, m, f = this, g = f.d, h = f.constructor;
      if (!g) return new h(f);
      if (u = t = new h(1), n = l = new h(0), r = new h(n), o = r.e = bs(g) - f.e - 1, s = o % b, r.d[0] = Q(10, s < 0 ? b + s : s), e == null) e = o > 0 ? r : u;
      else {
        if (a = new h(e), !a.isInt() || a.lt(u)) throw Error(Qe + a);
        e = a.gt(r) ? o > 0 ? r : u : a;
      }
      for (x = false, a = new h(z(g)), c = h.precision, h.precision = o = g.length * b * 2; p = O(a, r, 0, 1, 1), i = t.plus(p.times(n)), i.cmp(e) != 1; ) t = n, n = i, i = u, u = l.plus(p.times(i)), l = i, i = r, r = a.minus(p.times(i)), a = i;
      return i = O(e.minus(t), n, 0, 1, 1), l = l.plus(i.times(u)), t = t.plus(i.times(n)), l.s = u.s = f.s, m = O(u, n, o, 1).minus(f).abs().cmp(O(l, t, o, 1).minus(f).abs()) < 1 ? [u, n] : [l, t], h.precision = c, x = true, m;
    };
    d.toHexadecimal = d.toHex = function(e, r) {
      return vi(this, 16, e, r);
    };
    d.toNearest = function(e, r) {
      var t = this, n = t.constructor;
      if (t = new n(t), e == null) {
        if (!t.d) return t;
        e = new n(1), r = n.rounding;
      } else {
        if (e = new n(e), r === void 0 ? r = n.rounding : se(r, 0, 8), !t.d) return e.s ? t : e;
        if (!e.d) return e.s && (e.s = t.s), e;
      }
      return e.d[0] ? (x = false, t = O(t, e, 0, r, 1).times(e), x = true, y(t)) : (e.s = t.s, t = e), t;
    };
    d.toNumber = function() {
      return +this;
    };
    d.toOctal = function(e, r) {
      return vi(this, 8, e, r);
    };
    d.toPower = d.pow = function(e) {
      var r, t, n, i, o, s, a = this, l = a.constructor, u = +(e = new l(e));
      if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new l(Q(+a, u));
      if (a = new l(a), a.eq(1)) return a;
      if (n = l.precision, o = l.rounding, e.eq(1)) return y(a, n, o);
      if (r = re(e.e / b), r >= e.d.length - 1 && (t = u < 0 ? -u : u) <= ic) return i = ws(l, a, t, n), e.s < 0 ? new l(1).div(i) : y(i, n, o);
      if (s = a.s, s < 0) {
        if (r < e.d.length - 1) return new l(NaN);
        if (e.d[r] & 1 || (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1) return a.s = s, a;
      }
      return t = Q(+a, u), r = t == 0 || !isFinite(t) ? re(u * (Math.log("0." + z(a.d)) / Math.LN10 + a.e + 1)) : new l(t + "").e, r > l.maxE + 1 || r < l.minE - 1 ? new l(r > 0 ? s / 0 : 0) : (x = false, l.rounding = a.s = 1, t = Math.min(12, (r + "").length), i = xi(e.times(Ue(a, n + t)), n), i.d && (i = y(i, n + 5, 1), nt(i.d, n, o) && (r = n + 10, i = y(xi(e.times(Ue(a, r + t)), r), r + 5, 1), +z(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = y(i, n + 1, 0)))), i.s = s, x = true, l.rounding = o, y(i, n, o));
    };
    d.toPrecision = function(e, r) {
      var t, n = this, i = n.constructor;
      return e === void 0 ? t = ve(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (se(e, 1, Ge), r === void 0 ? r = i.rounding : se(r, 0, 8), n = y(new i(n), e, r), t = ve(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + t : t;
    };
    d.toSignificantDigits = d.toSD = function(e, r) {
      var t = this, n = t.constructor;
      return e === void 0 ? (e = n.precision, r = n.rounding) : (se(e, 1, Ge), r === void 0 ? r = n.rounding : se(r, 0, 8)), y(new n(t), e, r);
    };
    d.toString = function() {
      var e = this, r = e.constructor, t = ve(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
      return e.isNeg() && !e.isZero() ? "-" + t : t;
    };
    d.truncated = d.trunc = function() {
      return y(new this.constructor(this), this.e + 1, 1);
    };
    d.valueOf = d.toJSON = function() {
      var e = this, r = e.constructor, t = ve(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
      return e.isNeg() ? "-" + t : t;
    };
    function z(e) {
      var r, t, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, r = 1; r < i; r++) n = e[r] + "", t = b - n.length, t && (o += je(t)), o += n;
        s = e[r], n = s + "", t = b - n.length, t && (o += je(t));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    function se(e, r, t) {
      if (e !== ~~e || e < r || e > t) throw Error(Qe + e);
    }
    function nt(e, r, t, n) {
      var i, o, s, a;
      for (o = e[0]; o >= 10; o /= 10) --r;
      return --r < 0 ? (r += b, i = 0) : (i = Math.ceil((r + 1) / b), r %= b), o = Q(10, b - r), a = e[i] % o | 0, n == null ? r < 3 ? (r == 0 ? a = a / 100 | 0 : r == 1 && (a = a / 10 | 0), s = t < 4 && a == 99999 || t > 3 && a == 49999 || a == 5e4 || a == 0) : s = (t < 4 && a + 1 == o || t > 3 && a + 1 == o / 2) && (e[i + 1] / o / 100 | 0) == Q(10, r - 2) - 1 || (a == o / 2 || a == 0) && (e[i + 1] / o / 100 | 0) == 0 : r < 4 ? (r == 0 ? a = a / 1e3 | 0 : r == 1 ? a = a / 100 | 0 : r == 2 && (a = a / 10 | 0), s = (n || t < 4) && a == 9999 || !n && t > 3 && a == 4999) : s = ((n || t < 4) && a + 1 == o || !n && t > 3 && a + 1 == o / 2) && (e[i + 1] / o / 1e3 | 0) == Q(10, r - 3) - 1, s;
    }
    function Kt(e, r, t) {
      for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
        for (o = i.length; o--; ) i[o] *= r;
        for (i[0] += Ei.indexOf(e.charAt(s++)), n = 0; n < i.length; n++) i[n] > t - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / t | 0, i[n] %= t);
      }
      return i.reverse();
    }
    function sc(e, r) {
      var t, n, i;
      if (r.isZero()) return r;
      n = r.d.length, n < 32 ? (t = Math.ceil(n / 3), i = (1 / rn(4, t)).toString()) : (t = 16, i = "2.3283064365386962890625e-10"), e.precision += t, r = xr(e, 1, r.times(i), new e(1));
      for (var o = t; o--; ) {
        var s = r.times(r);
        r = s.times(s).minus(s).times(8).plus(1);
      }
      return e.precision -= t, r;
    }
    var O = /* @__PURE__ */ (function() {
      function e(n, i, o) {
        var s, a = 0, l = n.length;
        for (n = n.slice(); l--; ) s = n[l] * i + a, n[l] = s % o | 0, a = s / o | 0;
        return a && n.unshift(a), n;
      }
      function r(n, i, o, s) {
        var a, l;
        if (o != s) l = o > s ? 1 : -1;
        else for (a = l = 0; a < o; a++) if (n[a] != i[a]) {
          l = n[a] > i[a] ? 1 : -1;
          break;
        }
        return l;
      }
      function t(n, i, o, s) {
        for (var a = 0; o--; ) n[o] -= a, a = n[o] < i[o] ? 1 : 0, n[o] = a * s + n[o] - i[o];
        for (; !n[0] && n.length > 1; ) n.shift();
      }
      return function(n, i, o, s, a, l) {
        var u, c, p, m, f, g, h, A, T, C, E, I, me, le, Lr, U, ne, Ae, Y, cr, St = n.constructor, _n = n.s == i.s ? 1 : -1, Z = n.d, L = i.d;
        if (!Z || !Z[0] || !L || !L[0]) return new St(!n.s || !i.s || (Z ? L && Z[0] == L[0] : !L) ? NaN : Z && Z[0] == 0 || !L ? _n * 0 : _n / 0);
        for (l ? (f = 1, c = n.e - i.e) : (l = he, f = b, c = re(n.e / f) - re(i.e / f)), Y = L.length, ne = Z.length, T = new St(_n), C = T.d = [], p = 0; L[p] == (Z[p] || 0); p++) ;
        if (L[p] > (Z[p] || 0) && c--, o == null ? (le = o = St.precision, s = St.rounding) : a ? le = o + (n.e - i.e) + 1 : le = o, le < 0) C.push(1), g = true;
        else {
          if (le = le / f + 2 | 0, p = 0, Y == 1) {
            for (m = 0, L = L[0], le++; (p < ne || m) && le--; p++) Lr = m * l + (Z[p] || 0), C[p] = Lr / L | 0, m = Lr % L | 0;
            g = m || p < ne;
          } else {
            for (m = l / (L[0] + 1) | 0, m > 1 && (L = e(L, m, l), Z = e(Z, m, l), Y = L.length, ne = Z.length), U = Y, E = Z.slice(0, Y), I = E.length; I < Y; ) E[I++] = 0;
            cr = L.slice(), cr.unshift(0), Ae = L[0], L[1] >= l / 2 && ++Ae;
            do
              m = 0, u = r(L, E, Y, I), u < 0 ? (me = E[0], Y != I && (me = me * l + (E[1] || 0)), m = me / Ae | 0, m > 1 ? (m >= l && (m = l - 1), h = e(L, m, l), A = h.length, I = E.length, u = r(h, E, A, I), u == 1 && (m--, t(h, Y < A ? cr : L, A, l))) : (m == 0 && (u = m = 1), h = L.slice()), A = h.length, A < I && h.unshift(0), t(E, h, I, l), u == -1 && (I = E.length, u = r(L, E, Y, I), u < 1 && (m++, t(E, Y < I ? cr : L, I, l))), I = E.length) : u === 0 && (m++, E = [0]), C[p++] = m, u && E[0] ? E[I++] = Z[U] || 0 : (E = [Z[U]], I = 1);
            while ((U++ < ne || E[0] !== void 0) && le--);
            g = E[0] !== void 0;
          }
          C[0] || C.shift();
        }
        if (f == 1) T.e = c, fs = g;
        else {
          for (p = 1, m = C[0]; m >= 10; m /= 10) p++;
          T.e = p + c * f - 1, y(T, a ? o + T.e + 1 : o, s, g);
        }
        return T;
      };
    })();
    function y(e, r, t, n) {
      var i, o, s, a, l, u, c, p, m, f = e.constructor;
      e: if (r != null) {
        if (p = e.d, !p) return e;
        for (i = 1, a = p[0]; a >= 10; a /= 10) i++;
        if (o = r - i, o < 0) o += b, s = r, c = p[m = 0], l = c / Q(10, i - s - 1) % 10 | 0;
        else if (m = Math.ceil((o + 1) / b), a = p.length, m >= a) if (n) {
          for (; a++ <= m; ) p.push(0);
          c = l = 0, i = 1, o %= b, s = o - b + 1;
        } else break e;
        else {
          for (c = a = p[m], i = 1; a >= 10; a /= 10) i++;
          o %= b, s = o - b + i, l = s < 0 ? 0 : c / Q(10, i - s - 1) % 10 | 0;
        }
        if (n = n || r < 0 || p[m + 1] !== void 0 || (s < 0 ? c : c % Q(10, i - s - 1)), u = t < 4 ? (l || n) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (t == 4 || n || t == 6 && (o > 0 ? s > 0 ? c / Q(10, i - s) : 0 : p[m - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), r < 1 || !p[0]) return p.length = 0, u ? (r -= e.e + 1, p[0] = Q(10, (b - r % b) % b), e.e = -r || 0) : p[0] = e.e = 0, e;
        if (o == 0 ? (p.length = m, a = 1, m--) : (p.length = m + 1, a = Q(10, b - o), p[m] = s > 0 ? (c / Q(10, i - s) % Q(10, s) | 0) * a : 0), u) for (; ; ) if (m == 0) {
          for (o = 1, s = p[0]; s >= 10; s /= 10) o++;
          for (s = p[0] += a, a = 1; s >= 10; s /= 10) a++;
          o != a && (e.e++, p[0] == he && (p[0] = 1));
          break;
        } else {
          if (p[m] += a, p[m] != he) break;
          p[m--] = 0, a = 1;
        }
        for (o = p.length; p[--o] === 0; ) p.pop();
      }
      return x && (e.e > f.maxE ? (e.d = null, e.e = NaN) : e.e < f.minE && (e.e = 0, e.d = [0])), e;
    }
    function ve(e, r, t) {
      if (!e.isFinite()) return Ps(e);
      var n, i = e.e, o = z(e.d), s = o.length;
      return r ? (t && (n = t - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + je(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (o = "0." + je(-i - 1) + o, t && (n = t - s) > 0 && (o += je(n))) : i >= s ? (o += je(i + 1 - s), t && (n = t - i - 1) > 0 && (o = o + "." + je(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), t && (n = t - s) > 0 && (i + 1 === s && (o += "."), o += je(n))), o;
    }
    function en(e, r) {
      var t = e[0];
      for (r *= b; t >= 10; t /= 10) r++;
      return r;
    }
    function Zt(e, r, t) {
      if (r > oc) throw x = true, t && (e.precision = t), Error(gs);
      return y(new e(zt), r, 1, true);
    }
    function ge(e, r, t) {
      if (r > wi) throw Error(gs);
      return y(new e(Yt), r, t, true);
    }
    function bs(e) {
      var r = e.length - 1, t = r * b + 1;
      if (r = e[r], r) {
        for (; r % 10 == 0; r /= 10) t--;
        for (r = e[0]; r >= 10; r /= 10) t++;
      }
      return t;
    }
    function je(e) {
      for (var r = ""; e--; ) r += "0";
      return r;
    }
    function ws(e, r, t, n) {
      var i, o = new e(1), s = Math.ceil(n / b + 4);
      for (x = false; ; ) {
        if (t % 2 && (o = o.times(r), ms(o.d, s) && (i = true)), t = re(t / 2), t === 0) {
          t = o.d.length - 1, i && o.d[t] === 0 && ++o.d[t];
          break;
        }
        r = r.times(r), ms(r.d, s);
      }
      return x = true, o;
    }
    function ps(e) {
      return e.d[e.d.length - 1] & 1;
    }
    function xs(e, r, t) {
      for (var n, i = new e(r[0]), o = 0; ++o < r.length; ) if (n = new e(r[o]), n.s) i[t](n) && (i = n);
      else {
        i = n;
        break;
      }
      return i;
    }
    function xi(e, r) {
      var t, n, i, o, s, a, l, u = 0, c = 0, p = 0, m = e.constructor, f = m.rounding, g = m.precision;
      if (!e.d || !e.d[0] || e.e > 17) return new m(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
      for (r == null ? (x = false, l = g) : l = r, a = new m(0.03125); e.e > -2; ) e = e.times(a), p += 5;
      for (n = Math.log(Q(2, p)) / Math.LN10 * 2 + 5 | 0, l += n, t = o = s = new m(1), m.precision = l; ; ) {
        if (o = y(o.times(e), l, 1), t = t.times(++c), a = s.plus(O(o, t, l, 1)), z(a.d).slice(0, l) === z(s.d).slice(0, l)) {
          for (i = p; i--; ) s = y(s.times(s), l, 1);
          if (r == null) if (u < 3 && nt(s.d, l - n, f, u)) m.precision = l += 10, t = o = a = new m(1), c = 0, u++;
          else return y(s, m.precision = g, f, x = true);
          else return m.precision = g, s;
        }
        s = a;
      }
    }
    function Ue(e, r) {
      var t, n, i, o, s, a, l, u, c, p, m, f = 1, g = 10, h = e, A = h.d, T = h.constructor, C = T.rounding, E = T.precision;
      if (h.s < 0 || !A || !A[0] || !h.e && A[0] == 1 && A.length == 1) return new T(A && !A[0] ? -1 / 0 : h.s != 1 ? NaN : A ? 0 : h);
      if (r == null ? (x = false, c = E) : c = r, T.precision = c += g, t = z(A), n = t.charAt(0), Math.abs(o = h.e) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && t.charAt(1) > 3; ) h = h.times(e), t = z(h.d), n = t.charAt(0), f++;
        o = h.e, n > 1 ? (h = new T("0." + t), o++) : h = new T(n + "." + t.slice(1));
      } else return u = Zt(T, c + 2, E).times(o + ""), h = Ue(new T(n + "." + t.slice(1)), c - g).plus(u), T.precision = E, r == null ? y(h, E, C, x = true) : h;
      for (p = h, l = s = h = O(h.minus(1), h.plus(1), c, 1), m = y(h.times(h), c, 1), i = 3; ; ) {
        if (s = y(s.times(m), c, 1), u = l.plus(O(s, new T(i), c, 1)), z(u.d).slice(0, c) === z(l.d).slice(0, c)) if (l = l.times(2), o !== 0 && (l = l.plus(Zt(T, c + 2, E).times(o + ""))), l = O(l, new T(f), c, 1), r == null) if (nt(l.d, c - g, C, a)) T.precision = c += g, u = s = h = O(p.minus(1), p.plus(1), c, 1), m = y(h.times(h), c, 1), i = a = 1;
        else return y(l, T.precision = E, C, x = true);
        else return T.precision = E, l;
        l = u, i += 2;
      }
    }
    function Ps(e) {
      return String(e.s * e.s / 0);
    }
    function Pi(e, r) {
      var t, n, i;
      for ((t = r.indexOf(".")) > -1 && (r = r.replace(".", "")), (n = r.search(/e/i)) > 0 ? (t < 0 && (t = n), t += +r.slice(n + 1), r = r.substring(0, n)) : t < 0 && (t = r.length), n = 0; r.charCodeAt(n) === 48; n++) ;
      for (i = r.length; r.charCodeAt(i - 1) === 48; --i) ;
      if (r = r.slice(n, i), r) {
        if (i -= n, e.e = t = t - n - 1, e.d = [], n = (t + 1) % b, t < 0 && (n += b), n < i) {
          for (n && e.d.push(+r.slice(0, n)), i -= b; n < i; ) e.d.push(+r.slice(n, n += b));
          r = r.slice(n), n = b - r.length;
        } else n -= i;
        for (; n--; ) r += "0";
        e.d.push(+r), x && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
      } else e.e = 0, e.d = [0];
      return e;
    }
    function ac(e, r) {
      var t, n, i, o, s, a, l, u, c;
      if (r.indexOf("_") > -1) {
        if (r = r.replace(/(\d)_(?=\d)/g, "$1"), Es.test(r)) return Pi(e, r);
      } else if (r === "Infinity" || r === "NaN") return +r || (e.s = NaN), e.e = NaN, e.d = null, e;
      if (tc.test(r)) t = 16, r = r.toLowerCase();
      else if (rc.test(r)) t = 2;
      else if (nc.test(r)) t = 8;
      else throw Error(Qe + r);
      for (o = r.search(/p/i), o > 0 ? (l = +r.slice(o + 1), r = r.substring(2, o)) : r = r.slice(2), o = r.indexOf("."), s = o >= 0, n = e.constructor, s && (r = r.replace(".", ""), a = r.length, o = a - o, i = ws(n, new n(t), o, o * 2)), u = Kt(r, t, he), c = u.length - 1, o = c; u[o] === 0; --o) u.pop();
      return o < 0 ? new n(e.s * 0) : (e.e = en(u, c), e.d = u, x = false, s && (e = O(e, i, a * 4)), l && (e = e.times(Math.abs(l) < 54 ? Q(2, l) : ir.pow(2, l))), x = true, e);
    }
    function lc(e, r) {
      var t, n = r.d.length;
      if (n < 3) return r.isZero() ? r : xr(e, 2, r, r);
      t = 1.4 * Math.sqrt(n), t = t > 16 ? 16 : t | 0, r = r.times(1 / rn(5, t)), r = xr(e, 2, r, r);
      for (var i, o = new e(5), s = new e(16), a = new e(20); t--; ) i = r.times(r), r = r.times(o.plus(i.times(s.times(i).minus(a))));
      return r;
    }
    function xr(e, r, t, n, i) {
      var o, s, a, l, u = 1, c = e.precision, p = Math.ceil(c / b);
      for (x = false, l = t.times(t), a = new e(n); ; ) {
        if (s = O(a.times(l), new e(r++ * r++), c, 1), a = i ? n.plus(s) : n.minus(s), n = O(s.times(l), new e(r++ * r++), c, 1), s = a.plus(n), s.d[p] !== void 0) {
          for (o = p; s.d[o] === a.d[o] && o--; ) ;
          if (o == -1) break;
        }
        o = a, a = n, n = s, s = o, u++;
      }
      return x = true, s.d.length = p + 1, s;
    }
    function rn(e, r) {
      for (var t = e; --r; ) t *= e;
      return t;
    }
    function vs(e, r) {
      var t, n = r.s < 0, i = ge(e, e.precision, 1), o = i.times(0.5);
      if (r = r.abs(), r.lte(o)) return Oe = n ? 4 : 1, r;
      if (t = r.divToInt(i), t.isZero()) Oe = n ? 3 : 2;
      else {
        if (r = r.minus(t.times(i)), r.lte(o)) return Oe = ps(t) ? n ? 2 : 3 : n ? 4 : 1, r;
        Oe = ps(t) ? n ? 1 : 4 : n ? 3 : 2;
      }
      return r.minus(i).abs();
    }
    function vi(e, r, t, n) {
      var i, o, s, a, l, u, c, p, m, f = e.constructor, g = t !== void 0;
      if (g ? (se(t, 1, Ge), n === void 0 ? n = f.rounding : se(n, 0, 8)) : (t = f.precision, n = f.rounding), !e.isFinite()) c = Ps(e);
      else {
        for (c = ve(e), s = c.indexOf("."), g ? (i = 2, r == 16 ? t = t * 4 - 3 : r == 8 && (t = t * 3 - 2)) : i = r, s >= 0 && (c = c.replace(".", ""), m = new f(1), m.e = c.length - s, m.d = Kt(ve(m), 10, i), m.e = m.d.length), p = Kt(c, 10, i), o = l = p.length; p[--l] == 0; ) p.pop();
        if (!p[0]) c = g ? "0p+0" : "0";
        else {
          if (s < 0 ? o-- : (e = new f(e), e.d = p, e.e = o, e = O(e, m, t, n, 0, i), p = e.d, o = e.e, u = fs), s = p[t], a = i / 2, u = u || p[t + 1] !== void 0, u = n < 4 ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : s > a || s === a && (n === 4 || u || n === 6 && p[t - 1] & 1 || n === (e.s < 0 ? 8 : 7)), p.length = t, u) for (; ++p[--t] > i - 1; ) p[t] = 0, t || (++o, p.unshift(1));
          for (l = p.length; !p[l - 1]; --l) ;
          for (s = 0, c = ""; s < l; s++) c += Ei.charAt(p[s]);
          if (g) {
            if (l > 1) if (r == 16 || r == 8) {
              for (s = r == 16 ? 4 : 3, --l; l % s; l++) c += "0";
              for (p = Kt(c, i, r), l = p.length; !p[l - 1]; --l) ;
              for (s = 1, c = "1."; s < l; s++) c += Ei.charAt(p[s]);
            } else c = c.charAt(0) + "." + c.slice(1);
            c = c + (o < 0 ? "p" : "p+") + o;
          } else if (o < 0) {
            for (; ++o; ) c = "0" + c;
            c = "0." + c;
          } else if (++o > l) for (o -= l; o--; ) c += "0";
          else o < l && (c = c.slice(0, o) + "." + c.slice(o));
        }
        c = (r == 16 ? "0x" : r == 2 ? "0b" : r == 8 ? "0o" : "") + c;
      }
      return e.s < 0 ? "-" + c : c;
    }
    function ms(e, r) {
      if (e.length > r) return e.length = r, true;
    }
    function uc(e) {
      return new this(e).abs();
    }
    function cc(e) {
      return new this(e).acos();
    }
    function pc(e) {
      return new this(e).acosh();
    }
    function mc(e, r) {
      return new this(e).plus(r);
    }
    function dc(e) {
      return new this(e).asin();
    }
    function fc(e) {
      return new this(e).asinh();
    }
    function gc(e) {
      return new this(e).atan();
    }
    function hc(e) {
      return new this(e).atanh();
    }
    function yc(e, r) {
      e = new this(e), r = new this(r);
      var t, n = this.precision, i = this.rounding, o = n + 4;
      return !e.s || !r.s ? t = new this(NaN) : !e.d && !r.d ? (t = ge(this, o, 1).times(r.s > 0 ? 0.25 : 0.75), t.s = e.s) : !r.d || e.isZero() ? (t = r.s < 0 ? ge(this, n, i) : new this(0), t.s = e.s) : !e.d || r.isZero() ? (t = ge(this, o, 1).times(0.5), t.s = e.s) : r.s < 0 ? (this.precision = o, this.rounding = 1, t = this.atan(O(e, r, o, 1)), r = ge(this, o, 1), this.precision = n, this.rounding = i, t = e.s < 0 ? t.minus(r) : t.plus(r)) : t = this.atan(O(e, r, o, 1)), t;
    }
    function Ec(e) {
      return new this(e).cbrt();
    }
    function bc(e) {
      return y(e = new this(e), e.e + 1, 2);
    }
    function wc(e, r, t) {
      return new this(e).clamp(r, t);
    }
    function xc(e) {
      if (!e || typeof e != "object") throw Error(Xt + "Object expected");
      var r, t, n, i = e.defaults === true, o = ["precision", 1, Ge, "rounding", 0, 8, "toExpNeg", -wr, 0, "toExpPos", 0, wr, "maxE", 0, wr, "minE", -wr, 0, "modulo", 0, 9];
      for (r = 0; r < o.length; r += 3) if (t = o[r], i && (this[t] = bi[t]), (n = e[t]) !== void 0) if (re(n) === n && n >= o[r + 1] && n <= o[r + 2]) this[t] = n;
      else throw Error(Qe + t + ": " + n);
      if (t = "crypto", i && (this[t] = bi[t]), (n = e[t]) !== void 0) if (n === true || n === false || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[t] = true;
      else throw Error(hs);
      else this[t] = false;
      else throw Error(Qe + t + ": " + n);
      return this;
    }
    function Pc(e) {
      return new this(e).cos();
    }
    function vc(e) {
      return new this(e).cosh();
    }
    function Ts(e) {
      var r, t, n;
      function i(o) {
        var s, a, l, u = this;
        if (!(u instanceof i)) return new i(o);
        if (u.constructor = i, ds(o)) {
          u.s = o.s, x ? !o.d || o.e > i.maxE ? (u.e = NaN, u.d = null) : o.e < i.minE ? (u.e = 0, u.d = [0]) : (u.e = o.e, u.d = o.d.slice()) : (u.e = o.e, u.d = o.d ? o.d.slice() : o.d);
          return;
        }
        if (l = typeof o, l === "number") {
          if (o === 0) {
            u.s = 1 / o < 0 ? -1 : 1, u.e = 0, u.d = [0];
            return;
          }
          if (o < 0 ? (o = -o, u.s = -1) : u.s = 1, o === ~~o && o < 1e7) {
            for (s = 0, a = o; a >= 10; a /= 10) s++;
            x ? s > i.maxE ? (u.e = NaN, u.d = null) : s < i.minE ? (u.e = 0, u.d = [0]) : (u.e = s, u.d = [o]) : (u.e = s, u.d = [o]);
            return;
          } else if (o * 0 !== 0) {
            o || (u.s = NaN), u.e = NaN, u.d = null;
            return;
          }
          return Pi(u, o.toString());
        } else if (l !== "string") throw Error(Qe + o);
        return (a = o.charCodeAt(0)) === 45 ? (o = o.slice(1), u.s = -1) : (a === 43 && (o = o.slice(1)), u.s = 1), Es.test(o) ? Pi(u, o) : ac(u, o);
      }
      if (i.prototype = d, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = xc, i.clone = Ts, i.isDecimal = ds, i.abs = uc, i.acos = cc, i.acosh = pc, i.add = mc, i.asin = dc, i.asinh = fc, i.atan = gc, i.atanh = hc, i.atan2 = yc, i.cbrt = Ec, i.ceil = bc, i.clamp = wc, i.cos = Pc, i.cosh = vc, i.div = Tc, i.exp = Cc, i.floor = Sc, i.hypot = Rc, i.ln = Ac, i.log = Ic, i.log10 = kc, i.log2 = _c, i.max = Dc, i.min = Lc, i.mod = Nc, i.mul = Oc, i.pow = Fc, i.random = Mc, i.round = $c, i.sign = qc, i.sin = Bc, i.sinh = Vc, i.sqrt = jc, i.sub = Uc, i.sum = Qc, i.tan = Gc, i.tanh = Jc, i.trunc = Hc, e === void 0 && (e = {}), e && e.defaults !== true) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r = 0; r < n.length; ) e.hasOwnProperty(t = n[r++]) || (e[t] = this[t]);
      return i.config(e), i;
    }
    function Tc(e, r) {
      return new this(e).div(r);
    }
    function Cc(e) {
      return new this(e).exp();
    }
    function Sc(e) {
      return y(e = new this(e), e.e + 1, 3);
    }
    function Rc() {
      var e, r, t = new this(0);
      for (x = false, e = 0; e < arguments.length; ) if (r = new this(arguments[e++]), r.d) t.d && (t = t.plus(r.times(r)));
      else {
        if (r.s) return x = true, new this(1 / 0);
        t = r;
      }
      return x = true, t.sqrt();
    }
    function ds(e) {
      return e instanceof ir || e && e.toStringTag === ys || false;
    }
    function Ac(e) {
      return new this(e).ln();
    }
    function Ic(e, r) {
      return new this(e).log(r);
    }
    function _c(e) {
      return new this(e).log(2);
    }
    function kc(e) {
      return new this(e).log(10);
    }
    function Dc() {
      return xs(this, arguments, "lt");
    }
    function Lc() {
      return xs(this, arguments, "gt");
    }
    function Nc(e, r) {
      return new this(e).mod(r);
    }
    function Oc(e, r) {
      return new this(e).mul(r);
    }
    function Fc(e, r) {
      return new this(e).pow(r);
    }
    function Mc(e) {
      var r, t, n, i, o = 0, s = new this(1), a = [];
      if (e === void 0 ? e = this.precision : se(e, 1, Ge), n = Math.ceil(e / b), this.crypto) if (crypto.getRandomValues) for (r = crypto.getRandomValues(new Uint32Array(n)); o < n; ) i = r[o], i >= 429e7 ? r[o] = crypto.getRandomValues(new Uint32Array(1))[0] : a[o++] = i % 1e7;
      else if (crypto.randomBytes) {
        for (r = crypto.randomBytes(n *= 4); o < n; ) i = r[o] + (r[o + 1] << 8) + (r[o + 2] << 16) + ((r[o + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(r, o) : (a.push(i % 1e7), o += 4);
        o = n / 4;
      } else throw Error(hs);
      else for (; o < n; ) a[o++] = Math.random() * 1e7 | 0;
      for (n = a[--o], e %= b, n && e && (i = Q(10, b - e), a[o] = (n / i | 0) * i); a[o] === 0; o--) a.pop();
      if (o < 0) t = 0, a = [0];
      else {
        for (t = -1; a[0] === 0; t -= b) a.shift();
        for (n = 1, i = a[0]; i >= 10; i /= 10) n++;
        n < b && (t -= b - n);
      }
      return s.e = t, s.d = a, s;
    }
    function $c(e) {
      return y(e = new this(e), e.e + 1, this.rounding);
    }
    function qc(e) {
      return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
    }
    function Bc(e) {
      return new this(e).sin();
    }
    function Vc(e) {
      return new this(e).sinh();
    }
    function jc(e) {
      return new this(e).sqrt();
    }
    function Uc(e, r) {
      return new this(e).sub(r);
    }
    function Qc() {
      var e = 0, r = arguments, t = new this(r[e]);
      for (x = false; t.s && ++e < r.length; ) t = t.plus(r[e]);
      return x = true, y(t, this.precision, this.rounding);
    }
    function Gc(e) {
      return new this(e).tan();
    }
    function Jc(e) {
      return new this(e).tanh();
    }
    function Hc(e) {
      return y(e = new this(e), e.e + 1, 1);
    }
    d[Symbol.for("nodejs.util.inspect.custom")] = d.toString;
    d[Symbol.toStringTag] = "Decimal";
    var ir = d.constructor = Ts(bi);
    zt = new ir(zt);
    Yt = new ir(Yt);
    var Te = ir;
    function Pr(e) {
      return ir.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    var it = class {
      constructor(r, t, n, i, o) {
        this.modelName = r, this.name = t, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let r = this.isList ? "List" : "", t = this.isEnum ? "Enum" : "";
        return `${r}${t}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function vr(e) {
      return e instanceof it;
    }
    var tn = class {
      constructor(r) {
        this.value = r;
      }
      write(r) {
        r.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    var nn = (e) => e;
    var on = { bold: nn, red: nn, green: nn, dim: nn, enabled: false };
    var Cs = { bold: W, red: ce, green: Me, dim: Ie, enabled: true };
    var Tr = { write(e) {
      e.writeLine(",");
    } };
    var Ce = class {
      constructor(r) {
        this.contents = r;
        this.isUnderlined = false;
        this.color = (r2) => r2;
      }
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(r) {
        return this.color = r, this;
      }
      write(r) {
        let t = r.getCurrentLineLength();
        r.write(this.color(this.contents)), this.isUnderlined && r.afterNextNewline(() => {
          r.write(" ".repeat(t)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    var Je = class {
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Cr = class extends Je {
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(t) {
        return this.items.push(new tn(t)), this;
      }
      getField(t) {
        return this.items[t];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
      }
      write(t) {
        if (this.items.length === 0) {
          this.writeEmpty(t);
          return;
        }
        this.writeWithItems(t);
      }
      writeEmpty(t) {
        let n = new Ce("[]");
        this.hasError && n.setColor(t.context.colors.red).underline(), t.write(n);
      }
      writeWithItems(t) {
        let { colors: n } = t.context;
        t.writeLine("[").withIndent(() => t.writeJoined(Tr, this.items).newLine()).write("]"), this.hasError && t.afterNextNewline(() => {
          t.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    var Ss = ": ";
    var sn = class {
      constructor(r, t) {
        this.name = r;
        this.value = t;
        this.hasError = false;
      }
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + Ss.length;
      }
      write(r) {
        let t = new Ce(this.name);
        this.hasError && t.underline().setColor(r.context.colors.red), r.write(t).write(Ss).write(this.value);
      }
    };
    var J = class e extends Je {
      constructor() {
        super(...arguments);
        this.fields = {};
        this.suggestions = [];
      }
      addField(t) {
        this.fields[t.name] = t;
      }
      addSuggestion(t) {
        this.suggestions.push(t);
      }
      getField(t) {
        return this.fields[t];
      }
      getDeepField(t) {
        let [n, ...i] = t, o = this.getField(n);
        if (!o) return;
        let s = o;
        for (let a of i) {
          let l;
          if (s.value instanceof e ? l = s.value.getField(a) : s.value instanceof Cr && (l = s.value.getField(Number(a))), !l) return;
          s = l;
        }
        return s;
      }
      getDeepFieldValue(t) {
        return t.length === 0 ? this : this.getDeepField(t)?.value;
      }
      hasField(t) {
        return !!this.getField(t);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(t) {
        delete this.fields[t];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(t) {
        return this.getField(t)?.value;
      }
      getDeepSubSelectionValue(t) {
        let n = this;
        for (let i of t) {
          if (!(n instanceof e)) return;
          let o = n.getSubSelectionValue(i);
          if (!o) return;
          n = o;
        }
        return n;
      }
      getDeepSelectionParent(t) {
        let n = this.getSelectionParent();
        if (!n) return;
        let i = n;
        for (let o of t) {
          let s = i.value.getFieldValue(o);
          if (!s || !(s instanceof e)) return;
          let a = s.getSelectionParent();
          if (!a) return;
          i = a;
        }
        return i;
      }
      getSelectionParent() {
        let t = this.getField("select");
        if (t?.value instanceof e) return { kind: "select", value: t.value };
        let n = this.getField("include");
        if (n?.value instanceof e) return { kind: "include", value: n.value };
      }
      getSubSelectionValue(t) {
        return this.getSelectionParent()?.value.fields[t].value;
      }
      getPrintWidth() {
        let t = Object.values(this.fields);
        return t.length == 0 ? 2 : Math.max(...t.map((i) => i.getPrintWidth())) + 2;
      }
      write(t) {
        let n = Object.values(this.fields);
        if (n.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(t);
          return;
        }
        this.writeWithContents(t, n);
      }
      writeEmpty(t) {
        let n = new Ce("{}");
        this.hasError && n.setColor(t.context.colors.red).underline(), t.write(n);
      }
      writeWithContents(t, n) {
        t.writeLine("{").withIndent(() => {
          t.writeJoined(Tr, [...n, ...this.suggestions]).newLine();
        }), t.write("}"), this.hasError && t.afterNextNewline(() => {
          t.writeLine(t.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    var H = class extends Je {
      constructor(t) {
        super();
        this.text = t;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(t) {
        let n = new Ce(this.text);
        this.hasError && n.underline().setColor(t.context.colors.red), t.write(n);
      }
    };
    var Ti = class {
      constructor(r) {
        this.errorMessages = [];
        this.arguments = r;
      }
      write(r) {
        r.write(this.arguments);
      }
      addErrorMessage(r) {
        this.errorMessages.push(r);
      }
      renderAllMessages(r) {
        return this.errorMessages.map((t) => t(r)).join(`
`);
      }
    };
    function an(e) {
      return new Ti(Rs(e));
    }
    function Rs(e) {
      let r = new J();
      for (let [t, n] of Object.entries(e)) {
        let i = new sn(t, As(n));
        r.addField(i);
      }
      return r;
    }
    function As(e) {
      if (typeof e == "string") return new H(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new H(String(e));
      if (typeof e == "bigint") return new H(`${e}n`);
      if (e === null) return new H("null");
      if (e === void 0) return new H("undefined");
      if (Pr(e)) return new H(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return Buffer.isBuffer(e) ? new H(`Buffer.alloc(${e.byteLength})`) : new H(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let r = Wt(e) ? e.toISOString() : "Invalid Date";
        return new H(`new Date("${r}")`);
      }
      return e instanceof Ne ? new H(`Prisma.${e._getName()}`) : vr(e) ? new H(`prisma.${cs(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? Kc(e) : typeof e == "object" ? Rs(e) : new H(Object.prototype.toString.call(e));
    }
    function Kc(e) {
      let r = new Cr();
      for (let t of e) r.addItem(As(t));
      return r;
    }
    function Is(e) {
      if (e === void 0) return "";
      let r = an(e);
      return new Er(0, { colors: on }).write(r).toString();
    }
    var zc = "P2037";
    function or({ error: e, user_facing_error: r }, t, n) {
      return r.error_code ? new V(Yc(r, n), { code: r.error_code, clientVersion: t, meta: r.meta, batchRequestIdx: r.batch_request_idx }) : new j(e, { clientVersion: t, batchRequestIdx: r.batch_request_idx });
    }
    function Yc(e, r) {
      let t = e.message;
      return (r === "postgresql" || r === "postgres" || r === "mysql") && e.error_code === zc && (t += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), t;
    }
    var ot = "<unknown>";
    function _s(e) {
      var r = e.split(`
`);
      return r.reduce(function(t, n) {
        var i = ep(n) || tp(n) || op(n) || up(n) || ap(n);
        return i && t.push(i), t;
      }, []);
    }
    var Zc = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    var Xc = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    function ep(e) {
      var r = Zc.exec(e);
      if (!r) return null;
      var t = r[2] && r[2].indexOf("native") === 0, n = r[2] && r[2].indexOf("eval") === 0, i = Xc.exec(r[2]);
      return n && i != null && (r[2] = i[1], r[3] = i[2], r[4] = i[3]), { file: t ? null : r[2], methodName: r[1] || ot, arguments: t ? [r[2]] : [], lineNumber: r[3] ? +r[3] : null, column: r[4] ? +r[4] : null };
    }
    var rp = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function tp(e) {
      var r = rp.exec(e);
      return r ? { file: r[2], methodName: r[1] || ot, arguments: [], lineNumber: +r[3], column: r[4] ? +r[4] : null } : null;
    }
    var np = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
    var ip = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    function op(e) {
      var r = np.exec(e);
      if (!r) return null;
      var t = r[3] && r[3].indexOf(" > eval") > -1, n = ip.exec(r[3]);
      return t && n != null && (r[3] = n[1], r[4] = n[2], r[5] = null), { file: r[3], methodName: r[1] || ot, arguments: r[2] ? r[2].split(",") : [], lineNumber: r[4] ? +r[4] : null, column: r[5] ? +r[5] : null };
    }
    var sp = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
    function ap(e) {
      var r = sp.exec(e);
      return r ? { file: r[3], methodName: r[1] || ot, arguments: [], lineNumber: +r[4], column: r[5] ? +r[5] : null } : null;
    }
    var lp = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function up(e) {
      var r = lp.exec(e);
      return r ? { file: r[2], methodName: r[1] || ot, arguments: [], lineNumber: +r[3], column: r[4] ? +r[4] : null } : null;
    }
    var Ci = class {
      getLocation() {
        return null;
      }
    };
    var Si = class {
      constructor() {
        this._error = new Error();
      }
      getLocation() {
        let r = this._error.stack;
        if (!r) return null;
        let n = _s(r).find((i) => {
          if (!i.file) return false;
          let o = ti(i.file);
          return o !== "<anonymous>" && !o.includes("@prisma") && !o.includes("/packages/client/src/runtime/") && !o.endsWith("/runtime/binary.js") && !o.endsWith("/runtime/library.js") && !o.endsWith("/runtime/edge.js") && !o.endsWith("/runtime/edge-esm.js") && !o.startsWith("internal/") && !i.methodName.includes("new ") && !i.methodName.includes("getCallSite") && !i.methodName.includes("Proxy.") && i.methodName.split(".").length < 4;
        });
        return !n || !n.file ? null : { fileName: n.file, lineNumber: n.lineNumber, columnNumber: n.column };
      }
    };
    function He(e) {
      return e === "minimal" ? typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Ci() : new Si();
    }
    var ks = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Sr(e = {}) {
      let r = pp(e);
      return Object.entries(r).reduce((n, [i, o]) => (ks[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    function pp(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    function ln(e = {}) {
      return (r) => (typeof e._count == "boolean" && (r._count = r._count._all), r);
    }
    function Ds(e, r) {
      let t = ln(e);
      return r({ action: "aggregate", unpacker: t, argsMapper: Sr })(e);
    }
    function mp(e = {}) {
      let { select: r, ...t } = e;
      return typeof r == "object" ? Sr({ ...t, _count: r }) : Sr({ ...t, _count: { _all: true } });
    }
    function dp(e = {}) {
      return typeof e.select == "object" ? (r) => ln(e)(r)._count : (r) => ln(e)(r)._count._all;
    }
    function Ls(e, r) {
      return r({ action: "count", unpacker: dp(e), argsMapper: mp })(e);
    }
    function fp(e = {}) {
      let r = Sr(e);
      if (Array.isArray(r.by)) for (let t of r.by) typeof t == "string" && (r.select[t] = true);
      else typeof r.by == "string" && (r.select[r.by] = true);
      return r;
    }
    function gp(e = {}) {
      return (r) => (typeof e?._count == "boolean" && r.forEach((t) => {
        t._count = t._count._all;
      }), r);
    }
    function Ns(e, r) {
      return r({ action: "groupBy", unpacker: gp(e), argsMapper: fp })(e);
    }
    function Os(e, r, t) {
      if (r === "aggregate") return (n) => Ds(n, t);
      if (r === "count") return (n) => Ls(n, t);
      if (r === "groupBy") return (n) => Ns(n, t);
    }
    function Fs(e, r) {
      let t = r.fields.filter((i) => !i.relationName), n = ui(t, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new it(e, o, s.type, s.isList, s.kind === "enum");
      }, ...Ht(Object.keys(n)) });
    }
    var Ms = (e) => Array.isArray(e) ? e : e.split(".");
    var Ri = (e, r) => Ms(r).reduce((t, n) => t && t[n], e);
    var $s = (e, r, t) => Ms(r).reduceRight((n, i, o, s) => Object.assign({}, Ri(e, s.slice(0, o)), { [i]: n }), t);
    function hp(e, r) {
      return e === void 0 || r === void 0 ? [] : [...r, "select", e];
    }
    function yp(e, r, t) {
      return r === void 0 ? e ?? {} : $s(r, t, e || true);
    }
    function Ai(e, r, t, n, i, o) {
      let a = e._runtimeDataModel.models[r].fields.reduce((l, u) => ({ ...l, [u.name]: u }), {});
      return (l) => {
        let u = He(e._errorFormat), c = hp(n, i), p = yp(l, o, c), m = t({ dataPath: c, callsite: u })(p), f = Ep(e, r);
        return new Proxy(m, { get(g, h) {
          if (!f.includes(h)) return g[h];
          let T = [a[h].type, t, h], C = [c, p];
          return Ai(e, ...T, ...C);
        }, ...Ht([...f, ...Object.getOwnPropertyNames(m)]) });
      };
    }
    function Ep(e, r) {
      return e._runtimeDataModel.models[r].fields.filter((t) => t.kind === "object").map((t) => t.name);
    }
    var Qs = _(ni());
    var Us = _(require("fs"));
    var qs = { keyword: _e, entity: _e, value: (e) => W(Ye(e)), punctuation: Ye, directive: _e, function: _e, variable: (e) => W(Ye(e)), string: (e) => W(Me(e)), boolean: de, number: _e, comment: Or };
    var bp = (e) => e;
    var un = {};
    var wp = 0;
    var P = { manual: un.Prism && un.Prism.manual, disableWorkerMessageHandler: un.Prism && un.Prism.disableWorkerMessageHandler, util: { encode: function(e) {
      if (e instanceof ye) {
        let r = e;
        return new ye(r.type, P.util.encode(r.content), r.alias);
      } else return Array.isArray(e) ? e.map(P.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
    }, type: function(e) {
      return Object.prototype.toString.call(e).slice(8, -1);
    }, objId: function(e) {
      return e.__id || Object.defineProperty(e, "__id", { value: ++wp }), e.__id;
    }, clone: function e(r, t) {
      let n, i, o = P.util.type(r);
      switch (t = t || {}, o) {
        case "Object":
          if (i = P.util.objId(r), t[i]) return t[i];
          n = {}, t[i] = n;
          for (let s in r) r.hasOwnProperty(s) && (n[s] = e(r[s], t));
          return n;
        case "Array":
          return i = P.util.objId(r), t[i] ? t[i] : (n = [], t[i] = n, r.forEach(function(s, a) {
            n[a] = e(s, t);
          }), n);
        default:
          return r;
      }
    } }, languages: { extend: function(e, r) {
      let t = P.util.clone(P.languages[e]);
      for (let n in r) t[n] = r[n];
      return t;
    }, insertBefore: function(e, r, t, n) {
      n = n || P.languages;
      let i = n[e], o = {};
      for (let a in i) if (i.hasOwnProperty(a)) {
        if (a == r) for (let l in t) t.hasOwnProperty(l) && (o[l] = t[l]);
        t.hasOwnProperty(a) || (o[a] = i[a]);
      }
      let s = n[e];
      return n[e] = o, P.languages.DFS(P.languages, function(a, l) {
        l === s && a != e && (this[a] = o);
      }), o;
    }, DFS: function e(r, t, n, i) {
      i = i || {};
      let o = P.util.objId;
      for (let s in r) if (r.hasOwnProperty(s)) {
        t.call(r, s, r[s], n || s);
        let a = r[s], l = P.util.type(a);
        l === "Object" && !i[o(a)] ? (i[o(a)] = true, e(a, t, null, i)) : l === "Array" && !i[o(a)] && (i[o(a)] = true, e(a, t, s, i));
      }
    } }, plugins: {}, highlight: function(e, r, t) {
      let n = { code: e, grammar: r, language: t };
      return P.hooks.run("before-tokenize", n), n.tokens = P.tokenize(n.code, n.grammar), P.hooks.run("after-tokenize", n), ye.stringify(P.util.encode(n.tokens), n.language);
    }, matchGrammar: function(e, r, t, n, i, o, s) {
      for (let h in t) {
        if (!t.hasOwnProperty(h) || !t[h]) continue;
        if (h == s) return;
        let A = t[h];
        A = P.util.type(A) === "Array" ? A : [A];
        for (let T = 0; T < A.length; ++T) {
          let C = A[T], E = C.inside, I = !!C.lookbehind, me = !!C.greedy, le = 0, Lr = C.alias;
          if (me && !C.pattern.global) {
            let U = C.pattern.toString().match(/[imuy]*$/)[0];
            C.pattern = RegExp(C.pattern.source, U + "g");
          }
          C = C.pattern || C;
          for (let U = n, ne = i; U < r.length; ne += r[U].length, ++U) {
            let Ae = r[U];
            if (r.length > e.length) return;
            if (Ae instanceof ye) continue;
            if (me && U != r.length - 1) {
              C.lastIndex = ne;
              var p = C.exec(e);
              if (!p) break;
              var c = p.index + (I ? p[1].length : 0), m = p.index + p[0].length, a = U, l = ne;
              for (let L = r.length; a < L && (l < m || !r[a].type && !r[a - 1].greedy); ++a) l += r[a].length, c >= l && (++U, ne = l);
              if (r[U] instanceof ye) continue;
              u = a - U, Ae = e.slice(ne, l), p.index -= ne;
            } else {
              C.lastIndex = 0;
              var p = C.exec(Ae), u = 1;
            }
            if (!p) {
              if (o) break;
              continue;
            }
            I && (le = p[1] ? p[1].length : 0);
            var c = p.index + le, p = p[0].slice(le), m = c + p.length, f = Ae.slice(0, c), g = Ae.slice(m);
            let Y = [U, u];
            f && (++U, ne += f.length, Y.push(f));
            let cr = new ye(h, E ? P.tokenize(p, E) : p, Lr, p, me);
            if (Y.push(cr), g && Y.push(g), Array.prototype.splice.apply(r, Y), u != 1 && P.matchGrammar(e, r, t, U, ne, true, h), o) break;
          }
        }
      }
    }, tokenize: function(e, r) {
      let t = [e], n = r.rest;
      if (n) {
        for (let i in n) r[i] = n[i];
        delete r.rest;
      }
      return P.matchGrammar(e, t, r, 0, 0, false), t;
    }, hooks: { all: {}, add: function(e, r) {
      let t = P.hooks.all;
      t[e] = t[e] || [], t[e].push(r);
    }, run: function(e, r) {
      let t = P.hooks.all[e];
      if (!(!t || !t.length)) for (var n = 0, i; i = t[n++]; ) i(r);
    } }, Token: ye };
    P.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: true }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: true, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, boolean: /\b(?:true|false)\b/, function: /\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
    P.languages.javascript = P.languages.extend("clike", { "class-name": [P.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: true }], keyword: [{ pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: true }, { pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/ });
    P.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
    P.languages.insertBefore("javascript", "keyword", { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: true, greedy: true }, "function-variable": { pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: true, inside: P.languages.javascript }, { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: P.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: true, inside: P.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/, lookbehind: true, inside: P.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ });
    P.languages.markup && P.languages.markup.tag.addInlined("script", "javascript");
    P.languages.js = P.languages.javascript;
    P.languages.typescript = P.languages.extend("javascript", { keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/, builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/ });
    P.languages.ts = P.languages.typescript;
    function ye(e, r, t, n, i) {
      this.type = e, this.content = r, this.alias = t, this.length = (n || "").length | 0, this.greedy = !!i;
    }
    ye.stringify = function(e, r) {
      return typeof e == "string" ? e : Array.isArray(e) ? e.map(function(t) {
        return ye.stringify(t, r);
      }).join("") : xp(e.type)(e.content);
    };
    function xp(e) {
      return qs[e] || bp;
    }
    function Bs(e) {
      return Pp(e, P.languages.javascript);
    }
    function Pp(e, r) {
      return P.tokenize(e, r).map((n) => ye.stringify(n)).join("");
    }
    var Vs = _(Ho());
    function js(e) {
      return (0, Vs.default)(e);
    }
    var cn = class e {
      static read(r) {
        let t;
        try {
          t = Us.default.readFileSync(r, "utf-8");
        } catch {
          return null;
        }
        return e.fromContent(t);
      }
      static fromContent(r) {
        let t = r.split(/\r?\n/);
        return new e(1, t);
      }
      constructor(r, t) {
        this.firstLineNumber = r, this.lines = t;
      }
      get lastLineNumber() {
        return this.firstLineNumber + this.lines.length - 1;
      }
      mapLineAt(r, t) {
        if (r < this.firstLineNumber || r > this.lines.length + this.firstLineNumber) return this;
        let n = r - this.firstLineNumber, i = [...this.lines];
        return i[n] = t(i[n]), new e(this.firstLineNumber, i);
      }
      mapLines(r) {
        return new e(this.firstLineNumber, this.lines.map((t, n) => r(t, this.firstLineNumber + n)));
      }
      lineAt(r) {
        return this.lines[r - this.firstLineNumber];
      }
      prependSymbolAt(r, t) {
        return this.mapLines((n, i) => i === r ? `${t} ${n}` : `  ${n}`);
      }
      slice(r, t) {
        let n = this.lines.slice(r - 1, t).join(`
`);
        return new e(r, js(n).split(`
`));
      }
      highlight() {
        let r = Bs(this.toString());
        return new e(this.firstLineNumber, r.split(`
`));
      }
      toString() {
        return this.lines.join(`
`);
      }
    };
    var vp = { red: ce, gray: Or, dim: Ie, bold: W, underline: ee, highlightSource: (e) => e.highlight() };
    var Tp = { red: (e) => e, gray: (e) => e, dim: (e) => e, bold: (e) => e, underline: (e) => e, highlightSource: (e) => e };
    function Cp({ message: e, originalMethod: r, isPanic: t, callArguments: n }) {
      return { functionName: `prisma.${r}()`, message: e, isPanic: t ?? false, callArguments: n };
    }
    function Sp({ callsite: e, message: r, originalMethod: t, isPanic: n, callArguments: i }, o) {
      let s = Cp({ message: r, originalMethod: t, isPanic: n, callArguments: i });
      if (!e || typeof window < "u" || process.env.NODE_ENV === "production") return s;
      let a = e.getLocation();
      if (!a || !a.lineNumber || !a.columnNumber) return s;
      let l = Math.max(1, a.lineNumber - 3), u = cn.read(a.fileName)?.slice(l, a.lineNumber), c = u?.lineAt(a.lineNumber);
      if (u && c) {
        let p = Ap(c), m = Rp(c);
        if (!m) return s;
        s.functionName = `${m.code})`, s.location = a, n || (u = u.mapLineAt(a.lineNumber, (g) => g.slice(0, m.openingBraceIndex))), u = o.highlightSource(u);
        let f = String(u.lastLineNumber).length;
        if (s.contextLines = u.mapLines((g, h) => o.gray(String(h).padStart(f)) + " " + g).mapLines((g) => o.dim(g)).prependSymbolAt(a.lineNumber, o.bold(o.red("\u2192"))), i) {
          let g = p + f + 1;
          g += 2, s.callArguments = (0, Qs.default)(i, g).slice(g);
        }
      }
      return s;
    }
    function Rp(e) {
      let r = Object.keys(De.ModelAction).join("|"), n = new RegExp(String.raw`\.(${r})\(`).exec(e);
      if (n) {
        let i = n.index + n[0].length, o = e.lastIndexOf(" ", n.index) + 1;
        return { code: e.slice(o, i), openingBraceIndex: i };
      }
      return null;
    }
    function Ap(e) {
      let r = 0;
      for (let t = 0; t < e.length; t++) {
        if (e.charAt(t) !== " ") return r;
        r++;
      }
      return r;
    }
    function Ip({ functionName: e, location: r, message: t, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], l = r ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))) : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)), r && a.push(s.underline(_p(r))), i) {
        a.push("");
        let u = [i.toString()];
        o && (u.push(o), u.push(s.dim(")"))), a.push(u.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(t), a.join(`
`);
    }
    function _p(e) {
      let r = [e.fileName];
      return e.lineNumber && r.push(String(e.lineNumber)), e.columnNumber && r.push(String(e.columnNumber)), r.join(":");
    }
    function Rr(e) {
      let r = e.showColors ? vp : Tp, t;
      return t = Sp(e, r), Ip(t, r);
    }
    function Gs(e, r, t, n) {
      return e === De.ModelAction.findFirstOrThrow || e === De.ModelAction.findUniqueOrThrow ? kp(r, t, n) : n;
    }
    function kp(e, r, t) {
      return async (n) => {
        if ("rejectOnNotFound" in n.args) {
          let o = Rr({ originalMethod: n.clientMethod, callsite: n.callsite, message: "'rejectOnNotFound' option is not supported" });
          throw new K(o, { clientVersion: r });
        }
        return await t(n).catch((o) => {
          throw o instanceof V && o.code === "P2025" ? new Le(`No ${e} found`, r) : o;
        });
      };
    }
    function Se(e) {
      return e.replace(/^./, (r) => r.toLowerCase());
    }
    var Dp = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Lp = ["aggregate", "count", "groupBy"];
    function Ii(e, r) {
      let t = e._extensions.getAllModelExtensions(r) ?? {}, n = [Np(e, r), Fp(e, r), rt(t), te("name", () => r), te("$name", () => r), te("$parent", () => e._appliedParent)];
      return Pe({}, n);
    }
    function Np(e, r) {
      let t = Se(r), n = Object.keys(De.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = (l) => e._request(l);
        s = Gs(o, r, e._clientVersion, s);
        let a = (l) => (u) => {
          let c = He(e._errorFormat);
          return e._createPrismaPromise((p) => {
            let m = { args: u, dataPath: [], action: o, model: r, clientMethod: `${t}.${i}`, jsModelName: t, transaction: p, callsite: c };
            return s({ ...m, ...l });
          });
        };
        return Dp.includes(o) ? Ai(e, r, a) : Op(i) ? Os(e, i, a) : a({});
      } };
    }
    function Op(e) {
      return Lp.includes(e);
    }
    function Fp(e, r) {
      return nr(te("fields", () => {
        let t = e._runtimeDataModel.models[r];
        return Fs(r, t);
      }));
    }
    function Js(e) {
      return e.replace(/^./, (r) => r.toUpperCase());
    }
    var _i = Symbol();
    function st(e) {
      let r = [Mp(e), te(_i, () => e), te("$parent", () => e._appliedParent)], t = e._extensions.getAllClientExtensions();
      return t && r.push(rt(t)), Pe(e, r);
    }
    function Mp(e) {
      let r = Object.keys(e._runtimeDataModel.models), t = r.map(Se), n = [...new Set(r.concat(t))];
      return nr({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Js(i);
        if (e._runtimeDataModel.models[o] !== void 0) return Ii(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return Ii(e, i);
      }, getPropertyDescriptor(i) {
        if (!t.includes(i)) return { enumerable: false };
      } });
    }
    function Hs(e) {
      return e[_i] ? e[_i] : e;
    }
    function Ws(e) {
      if (typeof e == "function") return e(this);
      if (e.client?.__AccelerateEngine) {
        let t = e.client.__AccelerateEngine;
        this._originalClient._engine = new t(this._originalClient._accelerateEngineConfig);
      }
      let r = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return st(r);
    }
    function Ks({ result: e, modelName: r, select: t, extensions: n }) {
      let i = n.getAllComputedFields(r);
      if (!i) return e;
      let o = [], s = [];
      for (let a of Object.values(i)) {
        if (t) {
          if (!t[a.name]) continue;
          let l = a.needs.filter((u) => !t[u]);
          l.length > 0 && s.push(tt(l));
        }
        $p(e, a.needs) && o.push(qp(a, Pe(e, o)));
      }
      return o.length > 0 || s.length > 0 ? Pe(e, [...o, ...s]) : e;
    }
    function $p(e, r) {
      return r.every((t) => li(e, t));
    }
    function qp(e, r) {
      return nr(te(e.name, () => e.compute(r)));
    }
    function pn({ visitor: e, result: r, args: t, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(r)) {
        for (let s = 0; s < r.length; s++) r[s] = pn({ result: r[s], args: t, modelName: i, runtimeDataModel: n, visitor: e });
        return r;
      }
      let o = e(r, i, t) ?? r;
      return t.include && zs({ includeOrSelect: t.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), t.select && zs({ includeOrSelect: t.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    function zs({ includeOrSelect: e, result: r, parentModelName: t, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || r[o] == null) continue;
        let l = n.models[t].fields.find((c) => c.name === o);
        if (!l || l.kind !== "object" || !l.relationName) continue;
        let u = typeof s == "object" ? s : {};
        r[o] = pn({ visitor: i, result: r[o], args: u, modelName: l.type, runtimeDataModel: n });
      }
    }
    function Ys({ result: e, modelName: r, args: t, extensions: n, runtimeDataModel: i }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[r] ? e : pn({ result: e, args: t ?? {}, modelName: r, runtimeDataModel: i, visitor: (s, a, l) => Ks({ result: s, modelName: Se(a), select: l.select, extensions: n }) });
    }
    function Zs(e) {
      if (e instanceof oe) return Bp(e);
      if (Array.isArray(e)) {
        let t = [e[0]];
        for (let n = 1; n < e.length; n++) t[n] = at(e[n]);
        return t;
      }
      let r = {};
      for (let t in e) r[t] = at(e[t]);
      return r;
    }
    function Bp(e) {
      return new oe(e.strings, e.values);
    }
    function at(e) {
      if (typeof e != "object" || e == null || e instanceof Ne || vr(e)) return e;
      if (Pr(e)) return new Te(e.toFixed());
      if (br(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let r = e.length, t;
        for (t = Array(r); r--; ) t[r] = at(e[r]);
        return t;
      }
      if (typeof e == "object") {
        let r = {};
        for (let t in e) t === "__proto__" ? Object.defineProperty(r, t, { value: at(e[t]), configurable: true, enumerable: true, writable: true }) : r[t] = at(e[t]);
        return r;
      }
      rr(e, "Unknown value");
    }
    function ea(e, r, t, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = r.customDataProxyFetch;
        return "transaction" in r && i !== void 0 && (r.transaction?.kind === "batch" && r.transaction.lock.then(), r.transaction = i), n === t.length ? e._executeRequest(r) : t[n]({ model: r.model, operation: r.model ? r.action : r.clientMethod, args: Zs(r.args ?? {}), __internalParams: r, query: (s, a = r) => {
          let l = a.customDataProxyFetch;
          return a.customDataProxyFetch = ia(o, l), a.args = s, ea(e, a, t, n + 1);
        } });
      });
    }
    function ra(e, r) {
      let { jsModelName: t, action: n, clientMethod: i } = r, o = t ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(r);
      let s = e._extensions.getAllQueryCallbacks(t ?? "$none", o);
      return ea(e, r, s);
    }
    function ta(e) {
      return (r) => {
        let t = { requests: r }, n = r[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? na(t, n, 0, e) : e(t);
      };
    }
    function na(e, r, t, n) {
      if (t === r.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return r[t]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a = e) {
        let l = a.customDataProxyFetch;
        return a.customDataProxyFetch = ia(i, l), na(a, r, t + 1, n);
      } });
    }
    var Xs = (e) => e;
    function ia(e = Xs, r = Xs) {
      return (t) => e(r(t));
    }
    function sa(e, r, t) {
      let n = Se(t);
      return !r.result || !(r.result.$allModels || r.result[n]) ? e : Vp({ ...e, ...oa(r.name, e, r.result.$allModels), ...oa(r.name, e, r.result[n]) });
    }
    function Vp(e) {
      let r = new xe(), t = (n, i) => r.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => t(o, i)) : [n]));
      return gr(e, (n) => ({ ...n, needs: t(n.name, /* @__PURE__ */ new Set()) }));
    }
    function oa(e, r, t) {
      return t ? gr(t, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: jp(r, o, i) })) : {};
    }
    function jp(e, r, t) {
      let n = e?.[r]?.compute;
      return n ? (i) => t({ ...i, [r]: n(i) }) : t;
    }
    function aa(e, r) {
      if (!r) return e;
      let t = { ...e };
      for (let n of Object.values(r)) if (e[n.name]) for (let i of n.needs) t[i] = true;
      return t;
    }
    var mn = class {
      constructor(r, t) {
        this.extension = r;
        this.previous = t;
        this.computedFieldsCache = new xe();
        this.modelExtensionsCache = new xe();
        this.queryCallbacksCache = new xe();
        this.clientExtensions = Kr(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = Kr(() => {
          let r2 = this.previous?.getAllBatchQueryCallbacks() ?? [], t2 = this.extension.query?.$__internalBatch;
          return t2 ? r2.concat(t2) : r2;
        });
      }
      getAllComputedFields(r) {
        return this.computedFieldsCache.getOrCreate(r, () => sa(this.previous?.getAllComputedFields(r), this.extension, r));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(r) {
        return this.modelExtensionsCache.getOrCreate(r, () => {
          let t = Se(r);
          return !this.extension.model || !(this.extension.model[t] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(r) : { ...this.previous?.getAllModelExtensions(r), ...this.extension.model.$allModels, ...this.extension.model[t] };
        });
      }
      getAllQueryCallbacks(r, t) {
        return this.queryCallbacksCache.getOrCreate(`${r}:${t}`, () => {
          let n = this.previous?.getAllQueryCallbacks(r, t) ?? [], i = [], o = this.extension.query;
          return !o || !(o[r] || o.$allModels || o[t] || o.$allOperations) ? n : (o[r] !== void 0 && (o[r][t] !== void 0 && i.push(o[r][t]), o[r].$allOperations !== void 0 && i.push(o[r].$allOperations)), r !== "$none" && o.$allModels !== void 0 && (o.$allModels[t] !== void 0 && i.push(o.$allModels[t]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[t] !== void 0 && i.push(o[t]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var dn = class e {
      constructor(r) {
        this.head = r;
      }
      static empty() {
        return new e();
      }
      static single(r) {
        return new e(new mn(r));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(r) {
        return new e(new mn(r, this.head));
      }
      getAllComputedFields(r) {
        return this.head?.getAllComputedFields(r);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(r) {
        return this.head?.getAllModelExtensions(r);
      }
      getAllQueryCallbacks(r, t) {
        return this.head?.getAllQueryCallbacks(r, t) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    var la = N("prisma:client");
    var ua = { Vercel: "vercel", "Netlify CI": "netlify" };
    function ca({ postinstall: e, ciName: r, clientVersion: t }) {
      if (la("checkPlatformCaching:postinstall", e), la("checkPlatformCaching:ciName", r), e === true && r && r in ua) {
        let n = `Prisma has detected that this project was built on ${r}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ua[r]}-build`;
        throw console.error(n), new S(n, t);
      }
    }
    function pa(e, r) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [r[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    var Up = "Cloudflare-Workers";
    var Qp = "node";
    function fn() {
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : globalThis.navigator?.userAgent === Up ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : globalThis.process?.release?.name === Qp ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    var ha = _(require("fs"));
    var lt = _(require("path"));
    function gn(e) {
      let { runtimeBinaryTarget: r } = e;
      return `Add "${r}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${Gp(e)}`;
    }
    function Gp(e) {
      let { generator: r, generatorBinaryTargets: t, runtimeBinaryTarget: n } = e, i = { fromEnvVar: null, value: n }, o = [...t, i];
      return oi({ ...r, binaryTargets: o });
    }
    function We(e) {
      let { runtimeBinaryTarget: r } = e;
      return `Prisma Client could not locate the Query Engine for runtime "${r}".`;
    }
    function Ke(e) {
      let { searchedLocations: r } = e;
      return `The following locations have been searched:
${[...new Set(r)].map((i) => `  ${i}`).join(`
`)}`;
    }
    function ma(e) {
      let { runtimeBinaryTarget: r } = e;
      return `${We(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${r}".
${gn(e)}

${Ke(e)}`;
    }
    function hn(e) {
      return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`;
    }
    function yn(e) {
      let { errorStack: r } = e;
      return r?.match(/\/\.next|\/next@|\/next\//) ? `

We detected that you are using Next.js, learn how to fix this: https://pris.ly/d/engine-not-found-nextjs.` : "";
    }
    function da(e) {
      let { queryEngineName: r } = e;
      return `${We(e)}${yn(e)}

This is likely caused by a bundler that has not copied "${r}" next to the resulting bundle.
Ensure that "${r}" has been copied next to the bundle or in "${e.expectedLocation}".

${hn("engine-not-found-bundler-investigation")}

${Ke(e)}`;
    }
    function fa(e) {
      let { runtimeBinaryTarget: r, generatorBinaryTargets: t } = e, n = t.find((i) => i.native);
      return `${We(e)}

This happened because Prisma Client was generated for "${n?.value ?? "unknown"}", but the actual deployment required "${r}".
${gn(e)}

${Ke(e)}`;
    }
    function ga(e) {
      let { queryEngineName: r } = e;
      return `${We(e)}${yn(e)}

This is likely caused by tooling that has not copied "${r}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${r}" has been copied to "${e.expectedLocation}".

${hn("engine-not-found-tooling-investigation")}

${Ke(e)}`;
    }
    var Jp = N("prisma:client:engines:resolveEnginePath");
    var Hp = () => new RegExp("runtime[\\\\/]library\\.m?js$");
    async function ya(e, r) {
      let t = { binary: process.env.PRISMA_QUERY_ENGINE_BINARY, library: process.env.PRISMA_QUERY_ENGINE_LIBRARY }[e] ?? r.prismaPath;
      if (t !== void 0) return t;
      let { enginePath: n, searchedLocations: i } = await Wp(e, r);
      if (Jp("enginePath", n), n !== void 0 && e === "binary" && ei(n), n !== void 0) return r.prismaPath = n;
      let o = await er(), s = r.generator?.binaryTargets ?? [], a = s.some((m) => m.native), l = !s.some((m) => m.value === o), u = __filename.match(Hp()) === null, c = { searchedLocations: i, generatorBinaryTargets: s, generator: r.generator, runtimeBinaryTarget: o, queryEngineName: Ea(e, o), expectedLocation: lt.default.relative(process.cwd(), r.dirname), errorStack: new Error().stack }, p;
      throw a && l ? p = fa(c) : l ? p = ma(c) : u ? p = da(c) : p = ga(c), new S(p, r.clientVersion);
    }
    async function Wp(engineType, config) {
      let binaryTarget = await er(), searchedLocations = [], dirname = eval("__dirname"), searchLocations = [config.dirname, lt.default.resolve(dirname, ".."), config.generator?.output?.value ?? dirname, lt.default.resolve(dirname, "../../../.prisma/client"), "/tmp/prisma-engines", config.cwd];
      __filename.includes("resolveEnginePath") && searchLocations.push(Wo());
      for (let e of searchLocations) {
        let r = Ea(engineType, binaryTarget), t = lt.default.join(e, r);
        if (searchedLocations.push(e), ha.default.existsSync(t)) return { enginePath: t, searchedLocations };
      }
      return { enginePath: void 0, searchedLocations };
    }
    function Ea(e, r) {
      return e === "library" ? _t(r, "fs") : `query-engine-${r}${r === "windows" ? ".exe" : ""}`;
    }
    var ki = _(ai());
    function ba(e) {
      return e ? e.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (r) => `${r[0]}5`) : "";
    }
    function wa(e) {
      return e.split(`
`).map((r) => r.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
    }
    var xa = _(ts());
    function Pa({ title: e, user: r = "prisma", repo: t = "prisma", template: n = "bug_report.yml", body: i }) {
      return (0, xa.default)({ user: r, repo: t, template: n, title: e, body: i });
    }
    function va({ version: e, binaryTarget: r, title: t, description: n, engineVersion: i, database: o, query: s }) {
      let a = mo(6e3 - (s?.length ?? 0)), l = wa((0, ki.default)(a)), u = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", c = (0, ki.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${r?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? ba(s) : ""}
\`\`\`
`), p = Pa({ title: t, body: c });
      return `${t}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${ee(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
    }
    function Ar({ inlineDatasources: e, overrideDatasources: r, env: t, clientVersion: n }) {
      let i, o = Object.keys(e)[0], s = e[o]?.url, a = r[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = t[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw new S(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new S("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    var En = class extends Error {
      constructor(r, t) {
        super(r), this.clientVersion = t.clientVersion, this.cause = t.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var ae = class extends En {
      constructor(r, t) {
        super(r, t), this.isRetryable = t.isRetryable ?? true;
      }
    };
    function R(e, r) {
      return { ...e, isRetryable: r };
    }
    var Ir = class extends ae {
      constructor(t) {
        super("This request must be retried", R(t, true));
        this.name = "ForcedRetryError";
        this.code = "P5001";
      }
    };
    w(Ir, "ForcedRetryError");
    var sr = class extends ae {
      constructor(t, n) {
        super(t, R(n, false));
        this.name = "InvalidDatasourceError";
        this.code = "P6001";
      }
    };
    w(sr, "InvalidDatasourceError");
    var ar = class extends ae {
      constructor(t, n) {
        super(t, R(n, false));
        this.name = "NotImplementedYetError";
        this.code = "P5004";
      }
    };
    w(ar, "NotImplementedYetError");
    var $ = class extends ae {
      constructor(r, t) {
        super(r, t), this.response = t.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
          let i = `(The request id was: ${n})`;
          this.message = this.message + " " + i;
        }
      }
    };
    var lr = class extends $ {
      constructor(t) {
        super("Schema needs to be uploaded", R(t, true));
        this.name = "SchemaMissingError";
        this.code = "P5005";
      }
    };
    w(lr, "SchemaMissingError");
    var Di = "This request could not be understood by the server";
    var ut = class extends $ {
      constructor(t, n, i) {
        super(n || Di, R(t, false));
        this.name = "BadRequestError";
        this.code = "P5000";
        i && (this.code = i);
      }
    };
    w(ut, "BadRequestError");
    var ct = class extends $ {
      constructor(t, n) {
        super("Engine not started: healthcheck timeout", R(t, true));
        this.name = "HealthcheckTimeoutError";
        this.code = "P5013";
        this.logs = n;
      }
    };
    w(ct, "HealthcheckTimeoutError");
    var pt = class extends $ {
      constructor(t, n, i) {
        super(n, R(t, true));
        this.name = "EngineStartupError";
        this.code = "P5014";
        this.logs = i;
      }
    };
    w(pt, "EngineStartupError");
    var mt = class extends $ {
      constructor(t) {
        super("Engine version is not supported", R(t, false));
        this.name = "EngineVersionNotSupportedError";
        this.code = "P5012";
      }
    };
    w(mt, "EngineVersionNotSupportedError");
    var Li = "Request timed out";
    var dt = class extends $ {
      constructor(t, n = Li) {
        super(n, R(t, false));
        this.name = "GatewayTimeoutError";
        this.code = "P5009";
      }
    };
    w(dt, "GatewayTimeoutError");
    var Kp = "Interactive transaction error";
    var ft = class extends $ {
      constructor(t, n = Kp) {
        super(n, R(t, false));
        this.name = "InteractiveTransactionError";
        this.code = "P5015";
      }
    };
    w(ft, "InteractiveTransactionError");
    var zp = "Request parameters are invalid";
    var gt = class extends $ {
      constructor(t, n = zp) {
        super(n, R(t, false));
        this.name = "InvalidRequestError";
        this.code = "P5011";
      }
    };
    w(gt, "InvalidRequestError");
    var Ni = "Requested resource does not exist";
    var ht = class extends $ {
      constructor(t, n = Ni) {
        super(n, R(t, false));
        this.name = "NotFoundError";
        this.code = "P5003";
      }
    };
    w(ht, "NotFoundError");
    var Oi = "Unknown server error";
    var _r = class extends $ {
      constructor(t, n, i) {
        super(n || Oi, R(t, true));
        this.name = "ServerError";
        this.code = "P5006";
        this.logs = i;
      }
    };
    w(_r, "ServerError");
    var Fi = "Unauthorized, check your connection string";
    var yt = class extends $ {
      constructor(t, n = Fi) {
        super(n, R(t, false));
        this.name = "UnauthorizedError";
        this.code = "P5007";
      }
    };
    w(yt, "UnauthorizedError");
    var Mi = "Usage exceeded, retry again later";
    var Et = class extends $ {
      constructor(t, n = Mi) {
        super(n, R(t, true));
        this.name = "UsageExceededError";
        this.code = "P5008";
      }
    };
    w(Et, "UsageExceededError");
    async function Yp(e) {
      let r;
      try {
        r = await e.text();
      } catch {
        return { type: "EmptyError" };
      }
      try {
        let t = JSON.parse(r);
        if (typeof t == "string") switch (t) {
          case "InternalDataProxyError":
            return { type: "DataProxyError", body: t };
          default:
            return { type: "UnknownTextError", body: t };
        }
        if (typeof t == "object" && t !== null) {
          if ("is_panic" in t && "message" in t && "error_code" in t) return { type: "QueryEngineError", body: t };
          if ("EngineNotStarted" in t || "InteractiveTransactionMisrouted" in t || "InvalidRequestError" in t) {
            let n = Object.values(t)[0].reason;
            return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: t } : { type: "DataProxyError", body: t };
          }
        }
        return { type: "UnknownJsonError", body: t };
      } catch {
        return r === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: r };
      }
    }
    async function bt(e, r) {
      if (e.ok) return;
      let t = { clientVersion: r, response: e }, n = await Yp(e);
      if (n.type === "QueryEngineError") throw new V(n.body.message, { code: n.body.error_code, clientVersion: r });
      if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new _r(t, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
          if (n.body.EngineNotStarted.reason === "SchemaMissing") return new lr(t);
          if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new mt(t);
          if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
            throw new pt(t, i, o);
          }
          if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
            throw new S(i, r, o);
          }
          if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
            let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
            throw new ct(t, i);
          }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
          let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
          throw new ft(t, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new gt(t, n.body.InvalidRequestError.reason);
      }
      if (e.status === 401 || e.status === 403) throw new yt(t, kr(Fi, n));
      if (e.status === 404) return new ht(t, kr(Ni, n));
      if (e.status === 429) throw new Et(t, kr(Mi, n));
      if (e.status === 504) throw new dt(t, kr(Li, n));
      if (e.status >= 500) throw new _r(t, kr(Oi, n));
      if (e.status >= 400) throw new ut(t, kr(Di, n));
    }
    function kr(e, r) {
      return r.type === "EmptyError" ? e : `${e}: ${JSON.stringify(r)}`;
    }
    function Ta(e) {
      let r = Math.pow(2, e) * 50, t = Math.ceil(Math.random() * r) - Math.ceil(r / 2), n = r + t;
      return new Promise((i) => setTimeout(() => i(n), n));
    }
    function Ca(e) {
      if (!!e.generator?.previewFeatures.some((t) => t.toLowerCase().includes("metrics"))) throw new S("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e.clientVersion);
    }
    function Zp(e) {
      return e[0] * 1e3 + e[1] / 1e6;
    }
    function Sa(e) {
      return new Date(Zp(e));
    }
    var Ra = { "@prisma/debug": "workspace:*", "@prisma/engines-version": "5.10.0-34.5a9203d0590c951969e85a7d07215503f4672eb9", "@prisma/fetch-engine": "workspace:*", "@prisma/get-platform": "workspace:*" };
    var wt = class extends ae {
      constructor(t, n) {
        super(`Cannot fetch data from service:
${t}`, R(n, true));
        this.name = "RequestError";
        this.code = "P5010";
      }
    };
    w(wt, "RequestError");
    async function ur(e, r, t = (n) => n) {
      let n = r.clientVersion;
      try {
        return typeof fetch == "function" ? await t(fetch)(e, r) : await t($i)(e, r);
      } catch (i) {
        let o = i.message ?? "Unknown error";
        throw new wt(o, { clientVersion: n });
      }
    }
    function em(e) {
      return { ...e.headers, "Content-Type": "application/json" };
    }
    function rm(e) {
      return { method: e.method, headers: em(e) };
    }
    function tm(e, r) {
      return { text: () => Promise.resolve(Buffer.concat(e).toString()), json: () => Promise.resolve().then(() => JSON.parse(Buffer.concat(e).toString())), ok: r.statusCode >= 200 && r.statusCode <= 299, status: r.statusCode, url: r.url, headers: new qi(r.headers) };
    }
    async function $i(e, r = {}) {
      let t = nm("https"), n = rm(r), i = [], { origin: o } = new URL(e);
      return new Promise((s, a) => {
        let l = t.request(e, n, (u) => {
          let { statusCode: c, headers: { location: p } } = u;
          c >= 301 && c <= 399 && p && (p.startsWith("http") === false ? s($i(`${o}${p}`, r)) : s($i(p, r))), u.on("data", (m) => i.push(m)), u.on("end", () => s(tm(i, u))), u.on("error", a);
        });
        l.on("error", a), l.end(r.body ?? "");
      });
    }
    var nm = typeof require < "u" ? require : () => {
    };
    var qi = class {
      constructor(r = {}) {
        this.headers = /* @__PURE__ */ new Map();
        for (let [t, n] of Object.entries(r)) if (typeof n == "string") this.headers.set(t, n);
        else if (Array.isArray(n)) for (let i of n) this.headers.set(t, i);
      }
      append(r, t) {
        this.headers.set(r, t);
      }
      delete(r) {
        this.headers.delete(r);
      }
      get(r) {
        return this.headers.get(r) ?? null;
      }
      has(r) {
        return this.headers.has(r);
      }
      set(r, t) {
        this.headers.set(r, t);
      }
      forEach(r, t) {
        for (let [n, i] of this.headers) r.call(t, i, n, this);
      }
    };
    var im = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/;
    var Aa = N("prisma:client:dataproxyEngine");
    async function om(e, r) {
      let t = Ra["@prisma/engines-version"], n = r.clientVersion ?? "unknown";
      if (process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
      if (e.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
      let [i, o] = n?.split("-") ?? [];
      if (o === void 0 && im.test(i)) return i;
      if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        if (e.startsWith("localhost") || e.startsWith("127.0.0.1")) return "0.0.0";
        let [s] = t.split("-") ?? [], [a, l, u] = s.split("."), c = sm(`<=${a}.${l}.${u}`), p = await ur(c, { clientVersion: n });
        if (!p.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${p.status} ${p.statusText}, response body: ${await p.text() || "<empty body>"}`);
        let m = await p.text();
        Aa("length of body fetched from unpkg.com", m.length);
        let f;
        try {
          f = JSON.parse(m);
        } catch (g) {
          throw console.error("JSON.parse error: body fetched from unpkg.com: ", m), g;
        }
        return f.version;
      }
      throw new ar("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
    }
    async function Ia(e, r) {
      let t = await om(e, r);
      return Aa("version", t), t;
    }
    function sm(e) {
      return encodeURI(`https://unpkg.com/prisma@${e}/package.json`);
    }
    var _a = 3;
    var Bi = N("prisma:client:dataproxyEngine");
    var Vi = class {
      constructor({ apiKey: r, tracingHelper: t, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = r, this.tracingHelper = t, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: r, interactiveTransaction: t } = {}) {
        let n = { Authorization: `Bearer ${this.apiKey}`, "Prisma-Engine-Hash": this.engineHash };
        this.tracingHelper.isEnabled() && (n.traceparent = r ?? this.tracingHelper.getTraceParent()), t && (n["X-transaction-id"] = t.id);
        let i = this.buildCaptureSettings();
        return i.length > 0 && (n["X-capture-telemetry"] = i.join(", ")), n;
      }
      buildCaptureSettings() {
        let r = [];
        return this.tracingHelper.isEnabled() && r.push("tracing"), this.logLevel && r.push(this.logLevel), this.logQueries && r.push("query"), r;
      }
    };
    var xt = class {
      constructor(r) {
        this.name = "DataProxyEngine";
        Ca(r), this.config = r, this.env = { ...r.env, ...typeof process < "u" ? process.env : {} }, this.inlineSchema = btoa(r.inlineSchema), this.inlineDatasources = r.inlineDatasources, this.inlineSchemaHash = r.inlineSchemaHash, this.clientVersion = r.clientVersion, this.engineHash = r.engineVersion, this.logEmitter = r.logEmitter, this.tracingHelper = r.tracingHelper;
      }
      apiKey() {
        return this.headerBuilder.apiKey;
      }
      version() {
        return this.engineHash;
      }
      async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
          let [r, t] = this.extractHostAndApiKey();
          this.host = r, this.headerBuilder = new Vi({ apiKey: t, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel, logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await Ia(r, this.config), Bi("host", this.host);
        })(), await this.startPromise;
      }
      async stop() {
      }
      propagateResponseExtensions(r) {
        r?.logs?.length && r.logs.forEach((t) => {
          switch (t.level) {
            case "debug":
            case "error":
            case "trace":
            case "warn":
            case "info":
              break;
            case "query": {
              let n = typeof t.attributes.query == "string" ? t.attributes.query : "";
              if (!this.tracingHelper.isEnabled()) {
                let [i] = n.split("/* traceparent");
                n = i;
              }
              this.logEmitter.emit("query", { query: n, timestamp: Sa(t.timestamp), duration: Number(t.attributes.duration_ms), params: t.attributes.params, target: t.attributes.target });
            }
          }
        }), r?.traces?.length && this.tracingHelper.createEngineSpan({ span: true, spans: r.traces });
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
      }
      async url(r) {
        return await this.start(), `https://${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${r}`;
      }
      async uploadSchema() {
        let r = { name: "schemaUpload", internal: true };
        return this.tracingHelper.runInChildSpan(r, async () => {
          let t = await ur(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
          t.ok || Bi("schema response status", t.status);
          let n = await bt(t, this.clientVersion);
          if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
          this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        });
      }
      request(r, { traceparent: t, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({ body: r, traceparent: t, interactiveTransaction: n, customDataProxyFetch: i });
      }
      async requestBatch(r, { traceparent: t, transaction: n, customDataProxyFetch: i }) {
        let o = n?.kind === "itx" ? n.options : void 0, s = yr(r, n), { batchResult: a, elapsed: l } = await this.requestInternal({ body: s, customDataProxyFetch: i, interactiveTransaction: o, traceparent: t });
        return a.map((u) => "errors" in u && u.errors.length > 0 ? or(u.errors[0], this.clientVersion, this.config.activeProvider) : { data: u, elapsed: l });
      }
      requestInternal({ body: r, traceparent: t, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({ actionGerund: "querying", callback: async ({ logHttpCall: o }) => {
          let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
          o(s);
          let a = await ur(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: t, interactiveTransaction: i }), body: JSON.stringify(r), clientVersion: this.clientVersion }, n);
          a.ok || Bi("graphql response status", a.status), await this.handleError(await bt(a, this.clientVersion));
          let l = await a.json(), u = l.extensions;
          if (u && this.propagateResponseExtensions(u), l.errors) throw l.errors.length === 1 ? or(l.errors[0], this.config.clientVersion, this.config.activeProvider) : new j(l.errors, { clientVersion: this.config.clientVersion });
          return l;
        } });
      }
      async transaction(r, t, n) {
        let i = { start: "starting", commit: "committing", rollback: "rolling back" };
        return this.withRetry({ actionGerund: `${i[r]} transaction`, callback: async ({ logHttpCall: o }) => {
          if (r === "start") {
            let s = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a = await this.url("transaction/start");
            o(a);
            let l = await ur(a, { method: "POST", headers: this.headerBuilder.build({ traceparent: t.traceparent }), body: s, clientVersion: this.clientVersion });
            await this.handleError(await bt(l, this.clientVersion));
            let u = await l.json(), c = u.extensions;
            c && this.propagateResponseExtensions(c);
            let p = u.id, m = u["data-proxy"].endpoint;
            return { id: p, payload: { endpoint: m } };
          } else {
            let s = `${n.payload.endpoint}/${r}`;
            o(s);
            let a = await ur(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: t.traceparent }), clientVersion: this.clientVersion });
            await this.handleError(await bt(a, this.clientVersion));
            let u = (await a.json()).extensions;
            u && this.propagateResponseExtensions(u);
            return;
          }
        } });
      }
      extractHostAndApiKey() {
        let r = { clientVersion: this.clientVersion }, t = Object.keys(this.inlineDatasources)[0], n = Ar({ inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources, clientVersion: this.clientVersion, env: this.env }), i;
        try {
          i = new URL(n);
        } catch {
          throw new sr(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\``, r);
        }
        let { protocol: o, host: s, searchParams: a } = i;
        if (o !== "prisma:") throw new sr(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\``, r);
        let l = a.get("api_key");
        if (l === null || l.length < 1) throw new sr(`Error validating datasource \`${t}\`: the URL must contain a valid API key`, r);
        return [s, l];
      }
      metrics() {
        throw new ar("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
      }
      async withRetry(r) {
        for (let t = 0; ; t++) {
          let n = (i) => {
            this.logEmitter.emit("info", { message: `Calling ${i} (n=${t})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          };
          try {
            return await r.callback({ logHttpCall: n });
          } catch (i) {
            if (!(i instanceof ae) || !i.isRetryable) throw i;
            if (t >= _a) throw i instanceof Ir ? i.cause : i;
            this.logEmitter.emit("warn", { message: `Attempt ${t + 1}/${_a} failed for ${r.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            let o = await Ta(t);
            this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }
        }
      }
      async handleError(r) {
        if (r instanceof lr) throw await this.uploadSchema(), new Ir({ clientVersion: this.clientVersion, cause: r });
        if (r) throw r;
      }
    };
    function ka(e) {
      if (e?.kind === "itx") return e.options.id;
    }
    var Ui = _(require("os"));
    var Da = _(require("path"));
    var ji = Symbol("PrismaLibraryEngineCache");
    function am() {
      let e = globalThis;
      return e[ji] === void 0 && (e[ji] = {}), e[ji];
    }
    function lm(e) {
      let r = am();
      if (r[e] !== void 0) return r[e];
      let t = Da.default.toNamespacedPath(e), n = { exports: {} }, i = 0;
      return process.platform !== "win32" && (i = Ui.default.constants.dlopen.RTLD_LAZY | Ui.default.constants.dlopen.RTLD_DEEPBIND), process.dlopen(n, t, i), r[e] = n.exports, n.exports;
    }
    var La = { async loadLibrary(e) {
      let r = await Hn(), t = await ya("library", e);
      try {
        return e.tracingHelper.runInChildSpan({ name: "loadLibrary", internal: true }, () => lm(t));
      } catch (n) {
        let i = ri({ e: n, platformInfo: r, id: t });
        throw new S(i, e.clientVersion);
      }
    } };
    var Qi;
    var Na = { async loadLibrary(e) {
      let { clientVersion: r, adapter: t, engineWasm: n } = e;
      if (t === void 0) throw new S(`The \`adapter\` option for \`PrismaClient\` is required in this context (${fn()})`, r);
      if (n === void 0) throw new S("WASM engine was unexpectedly `undefined`", r);
      Qi === void 0 && (Qi = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new S("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", r);
        let a = { "./query_engine_bg.js": o }, l = new WebAssembly.Instance(s, a);
        return o.__wbg_set_wasm(l.exports), o.QueryEngine;
      })());
      let i = await Qi;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var um = "P2036";
    var Re = N("prisma:client:libraryEngine");
    function cm(e) {
      return e.item_type === "query" && "query" in e;
    }
    function pm(e) {
      return "level" in e ? e.level === "error" && e.message === "PANIC" : false;
    }
    var Oa = [...Fn, "native"];
    var Fa = 0;
    var Pt = class {
      constructor(r, t) {
        this.name = "LibraryEngine";
        this.libraryLoader = t ?? La, r.engineWasm !== void 0 && (this.libraryLoader = t ?? Na), this.config = r, this.libraryStarted = false, this.logQueries = r.logQueries ?? false, this.logLevel = r.logLevel ?? "error", this.logEmitter = r.logEmitter, this.datamodel = r.inlineSchema, r.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(r.overrideDatasources)[0], i = r.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary(), this.checkForTooManyEngines();
      }
      checkForTooManyEngines() {
        Fa === 10 && console.warn(`${de("warn(prisma-client)")} This is the 10th instance of Prisma Client being started. Make sure this is intentional.`);
      }
      async transaction(r, t, n) {
        await this.start();
        let i = JSON.stringify(t), o;
        if (r === "start") {
          let a = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          o = await this.engine?.startTransaction(a, i);
        } else r === "commit" ? o = await this.engine?.commitTransaction(n.id, i) : r === "rollback" && (o = await this.engine?.rollbackTransaction(n.id, i));
        let s = this.parseEngineResponse(o);
        if (mm(s)) {
          let a = this.getExternalAdapterError(s);
          throw a ? a.error : new V(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
        }
        return s;
      }
      async instantiateLibrary() {
        if (Re("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        On(), this.binaryTarget = await this.getCurrentBinaryTarget(), await this.loadEngine(), this.version();
      }
      async getCurrentBinaryTarget() {
        {
          if (this.binaryTarget) return this.binaryTarget;
          let r = await er();
          if (!Oa.includes(r)) throw new S(`Unknown ${ce("PRISMA_QUERY_ENGINE_LIBRARY")} ${ce(W(r))}. Possible binaryTargets: ${Me(Oa.join(", "))} or a path to the query engine library.
You may have to run ${Me("prisma generate")} for your changes to take effect.`, this.config.clientVersion);
          return r;
        }
      }
      parseEngineResponse(r) {
        if (!r) throw new j("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(r);
        } catch {
          throw new j("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let r = new WeakRef(this), { adapter: t } = this.config;
            t && Re("Using driver adapter: %O", t), this.engine = new this.QueryEngineConstructor({ datamodel: this.datamodel, env: process.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json" }, (n) => {
              r.deref()?.logger(n);
            }, t), Fa++;
          } catch (r) {
            let t = r, n = this.parseInitError(t.message);
            throw typeof n == "string" ? t : new S(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(r) {
        let t = this.parseEngineResponse(r);
        if (t) {
          if ("span" in t) {
            this.config.tracingHelper.createEngineSpan(t);
            return;
          }
          t.level = t?.level.toLowerCase() ?? "unknown", cm(t) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: t.query, params: t.params, duration: Number(t.duration_ms), target: t.module_path }) : pm(t) ? this.loggerRustPanic = new ue(Gi(this, `${t.message}: ${t.reason} in ${t.file}:${t.line}:${t.column}`), this.config.clientVersion) : this.logEmitter.emit(t.level, { timestamp: /* @__PURE__ */ new Date(), message: t.message, target: t.module_path });
        }
      }
      parseInitError(r) {
        try {
          return JSON.parse(r);
        } catch {
        }
        return r;
      }
      parseRequestError(r) {
        try {
          return JSON.parse(r);
        } catch {
        }
        return r;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return Re(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let r = async () => {
          Re("library starting");
          try {
            let t = { traceparent: this.config.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(t)), this.libraryStarted = true, Re("library started");
          } catch (t) {
            let n = this.parseInitError(t.message);
            throw typeof n == "string" ? t : new S(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        };
        return this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan("connect", r), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return Re("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) return;
        let r = async () => {
          await new Promise((n) => setTimeout(n, 5)), Re("library stopping");
          let t = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(t)), this.libraryStarted = false, this.libraryStoppingPromise = void 0, Re("library stopped");
        };
        return this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan("disconnect", r), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(r) {
        return this.library?.debugPanic(r);
      }
      async request(r, { traceparent: t, interactiveTransaction: n }) {
        Re(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: t }), o = JSON.stringify(r);
        try {
          await this.start(), this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let s = this.parseEngineResponse(await this.executingQueryPromise);
          if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new j(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: s, elapsed: 0 };
        } catch (s) {
          if (s instanceof S) throw s;
          if (s.code === "GenericFailure" && s.message?.startsWith("PANIC:")) throw new ue(Gi(this, s.message), this.config.clientVersion);
          let a = this.parseRequestError(s.message);
          throw typeof a == "string" ? s : new j(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(r, { transaction: t, traceparent: n }) {
        Re("requestBatch");
        let i = yr(r, t);
        await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), ka(t));
        let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
        if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new j(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: a, errors: l } = s;
        if (Array.isArray(a)) return a.map((u) => u.errors && u.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(u.errors[0]) : { data: u, elapsed: 0 });
        throw l && l.length === 1 ? new Error(l[0].error) : new Error(JSON.stringify(s));
      }
      buildQueryError(r) {
        if (r.user_facing_error.is_panic) return new ue(Gi(this, r.user_facing_error.message), this.config.clientVersion);
        let t = this.getExternalAdapterError(r.user_facing_error);
        return t ? t.error : or(r, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(r) {
        if (r.error_code === um && this.config.adapter) {
          let t = r.meta?.id;
          Vt(typeof t == "number", "Malformed external JS error received from the engine");
          let n = this.config.adapter.errorRegistry.consumeError(t);
          return Vt(n, "External error with reported id was not registered"), n;
        }
      }
      async metrics(r) {
        await this.start();
        let t = await this.engine.metrics(JSON.stringify(r));
        return r.format === "prometheus" ? t : this.parseEngineResponse(t);
      }
    };
    function mm(e) {
      return typeof e == "object" && e !== null && e.error_code !== void 0;
    }
    function Gi(e, r) {
      return va({ binaryTarget: e.binaryTarget, title: r, version: e.config.clientVersion, engineVersion: e.versionInfo?.commit, database: e.config.activeProvider, query: e.lastQuery });
    }
    function Ma({ copyEngine: e = true }, r) {
      let t;
      try {
        t = Ar({ inlineDatasources: r.inlineDatasources, overrideDatasources: r.overrideDatasources, env: { ...r.env, ...process.env }, clientVersion: r.clientVersion });
      } catch {
      }
      e && t?.startsWith("prisma://") && Wr("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let n = Qr(r.generator), i = !!(t?.startsWith("prisma://") || !e), o = !!r.adapter, s = n === "library", a = n === "binary";
      if (i && o || o && false) {
        let l;
        throw e ? t?.startsWith("prisma://") ? l = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : l = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : l = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new K(l.join(`
`), { clientVersion: r.clientVersion });
      }
      if (i) return new xt(r);
      if (s) return new Pt(r);
      throw new K("Invalid client engine type, please use `library` or `binary`", { clientVersion: r.clientVersion });
    }
    function bn({ generator: e }) {
      return e?.previewFeatures ?? [];
    }
    var Ua = _(Ji());
    function Va(e, r) {
      let t = ja(e), n = dm(t), i = gm(n);
      i ? wn(i, r) : r.addErrorMessage(() => "Unknown error");
    }
    function ja(e) {
      return e.errors.flatMap((r) => r.kind === "Union" ? ja(r) : [r]);
    }
    function dm(e) {
      let r = /* @__PURE__ */ new Map(), t = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          t.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = r.get(i);
        o ? r.set(i, { ...n, argument: { ...n.argument, typeNames: fm(o.argument.typeNames, n.argument.typeNames) } }) : r.set(i, n);
      }
      return t.push(...r.values()), t;
    }
    function fm(e, r) {
      return [...new Set(e.concat(r))];
    }
    function gm(e) {
      return ci(e, (r, t) => {
        let n = qa(r), i = qa(t);
        return n !== i ? n - i : Ba(r) - Ba(t);
      });
    }
    function qa(e) {
      let r = 0;
      return Array.isArray(e.selectionPath) && (r += e.selectionPath.length), Array.isArray(e.argumentPath) && (r += e.argumentPath.length), r;
    }
    function Ba(e) {
      switch (e.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    var Fe = class {
      constructor(r, t) {
        this.name = r;
        this.value = t;
        this.isRequired = false;
      }
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(r) {
        let { colors: { green: t } } = r.context;
        r.addMarginSymbol(t(this.isRequired ? "+" : "?")), r.write(t(this.name)), this.isRequired || r.write(t("?")), r.write(t(": ")), typeof this.value == "string" ? r.write(t(this.value)) : r.write(this.value);
      }
    };
    var xn = class {
      constructor() {
        this.fields = [];
      }
      addField(r, t) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${r}: ${t}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(r) {
        let { colors: { green: t } } = r.context;
        r.writeLine(t("{")).withIndent(() => {
          r.writeJoined(Tr, this.fields).newLine();
        }).write(t("}")).addMarginSymbol(t("+"));
      }
    };
    function wn(e, r) {
      switch (e.kind) {
        case "IncludeAndSelect":
          hm(e, r);
          break;
        case "IncludeOnScalar":
          ym(e, r);
          break;
        case "EmptySelection":
          Em(e, r);
          break;
        case "UnknownSelectionField":
          bm(e, r);
          break;
        case "UnknownArgument":
          wm(e, r);
          break;
        case "UnknownInputField":
          xm(e, r);
          break;
        case "RequiredArgumentMissing":
          Pm(e, r);
          break;
        case "InvalidArgumentType":
          vm(e, r);
          break;
        case "InvalidArgumentValue":
          Tm(e, r);
          break;
        case "ValueTooLarge":
          Cm(e, r);
          break;
        case "SomeFieldsMissing":
          Sm(e, r);
          break;
        case "TooManyFieldsGiven":
          Rm(e, r);
          break;
        case "Union":
          Va(e, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    function hm(e, r) {
      let t = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      t && t instanceof J && (t.getField("include")?.markAsError(), t.getField("select")?.markAsError()), r.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green("`include`")} or ${n.green("`select`")}, but ${n.red("not both")} at the same time.`);
    }
    function ym(e, r) {
      let [t, n] = Pn(e.selectionPath), i = e.outputType, o = r.arguments.getDeepSelectionParent(t)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new Fe(s.name, "true"));
      r.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${vt(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    function Em(e, r) {
      let t = e.outputType, n = r.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), Ja(n, t)), r.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(t.name)} must not be empty. ${vt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(t.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    function bm(e, r) {
      let [t, n] = Pn(e.selectionPath), i = r.arguments.getDeepSelectionParent(t);
      i && (i.value.getField(n)?.markAsError(), Ja(i.value, e.outputType)), r.addErrorMessage((o) => {
        let s = [`Unknown field ${o.red(`\`${n}\``)}`];
        return i && s.push(`for ${o.bold(i.kind)} statement`), s.push(`on model ${o.bold(`\`${e.outputType.name}\``)}.`), s.push(vt(o)), s.join(" ");
      });
    }
    function wm(e, r) {
      let t = e.argumentPath[0], n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      n instanceof J && (n.getField(t)?.markAsError(), Am(n, e.arguments)), r.addErrorMessage((i) => Qa(i, t, e.arguments.map((o) => o.name)));
    }
    function xm(e, r) {
      let [t, n] = Pn(e.argumentPath), i = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      if (i instanceof J) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(t);
        o instanceof J && Ha(o, e.inputType);
      }
      r.addErrorMessage((o) => Qa(o, n, e.inputType.fields.map((s) => s.name)));
    }
    function Qa(e, r, t) {
      let n = [`Unknown argument \`${e.red(r)}\`.`], i = _m(r, t);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), t.length > 0 && n.push(vt(e)), n.join(" ");
    }
    function Pm(e, r) {
      let t;
      r.addErrorMessage((l) => t?.value instanceof H && t.value.text === "null" ? `Argument \`${l.green(o)}\` must not be ${l.red("null")}.` : `Argument \`${l.green(o)}\` is missing.`);
      let n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      if (!(n instanceof J)) return;
      let [i, o] = Pn(e.argumentPath), s = new xn(), a = n.getDeepFieldValue(i);
      if (a instanceof J) if (t = a.getField(o), t && a.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
        for (let l of e.inputTypes[0].fields) s.addField(l.name, l.typeNames.join(" | "));
        a.addSuggestion(new Fe(o, s).makeRequired());
      } else {
        let l = e.inputTypes.map(Ga).join(" | ");
        a.addSuggestion(new Fe(o, l).makeRequired());
      }
    }
    function Ga(e) {
      return e.kind === "list" ? `${Ga(e.elementType)}[]` : e.name;
    }
    function vm(e, r) {
      let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      n instanceof J && n.getDeepFieldValue(e.argumentPath)?.markAsError(), r.addErrorMessage((i) => {
        let o = vn("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(t)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    function Tm(e, r) {
      let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      n instanceof J && n.getDeepFieldValue(e.argumentPath)?.markAsError(), r.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(t)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = vn("or", e.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    function Cm(e, r) {
      let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath), i;
      if (n instanceof J) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof H && (i = s.text);
      }
      r.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(t)}\``), s.join(" ");
      });
    }
    function Sm(e, r) {
      let t = e.argumentPath[e.argumentPath.length - 1], n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      if (n instanceof J) {
        let i = n.getDeepFieldValue(e.argumentPath);
        i instanceof J && Ha(i, e.inputType);
      }
      r.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(t)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${vn("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(vt(i)), o.join(" ");
      });
    }
    function Rm(e, r) {
      let t = e.argumentPath[e.argumentPath.length - 1], n = r.arguments.getDeepSubSelectionValue(e.selectionPath), i = [];
      if (n instanceof J) {
        let o = n.getDeepFieldValue(e.argumentPath);
        o instanceof J && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      r.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(t)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${vn("and", i.map((a) => o.red(a)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    function Ja(e, r) {
      for (let t of r.fields) e.hasField(t.name) || e.addSuggestion(new Fe(t.name, "true"));
    }
    function Am(e, r) {
      for (let t of r) e.hasField(t.name) || e.addSuggestion(new Fe(t.name, t.typeNames.join(" | ")));
    }
    function Ha(e, r) {
      if (r.kind === "object") for (let t of r.fields) e.hasField(t.name) || e.addSuggestion(new Fe(t.name, t.typeNames.join(" | ")));
    }
    function Pn(e) {
      let r = [...e], t = r.pop();
      if (!t) throw new Error("unexpected empty path");
      return [r, t];
    }
    function vt({ green: e, enabled: r }) {
      return "Available options are " + (r ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    function vn(e, r) {
      if (r.length === 1) return r[0];
      let t = [...r], n = t.pop();
      return `${t.join(", ")} ${e} ${n}`;
    }
    var Im = 3;
    function _m(e, r) {
      let t = 1 / 0, n;
      for (let i of r) {
        let o = (0, Ua.default)(e, i);
        o > Im || o < t && (t = o, n = i);
      }
      return n;
    }
    function Tn({ args: e, errors: r, errorFormat: t, callsite: n, originalMethod: i, clientVersion: o }) {
      let s = an(e);
      for (let p of r) wn(p, s);
      let a = t === "pretty" ? Cs : on, l = s.renderAllMessages(a), u = new Er(0, { colors: a }).write(s).toString(), c = Rr({ message: l, callsite: n, originalMethod: i, showColors: t === "pretty", callArguments: u });
      throw new K(c, { clientVersion: o });
    }
    var km = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", update: "updateOne", updateMany: "updateMany", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    function Wa({ modelName: e, action: r, args: t, runtimeDataModel: n, extensions: i, callsite: o, clientMethod: s, errorFormat: a, clientVersion: l }) {
      let u = new Hi({ runtimeDataModel: n, modelName: e, action: r, rootArgs: t, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: l });
      return { modelName: e, action: km[r], query: Wi(t, u) };
    }
    function Wi({ select: e, include: r, ...t } = {}, n) {
      return { arguments: za(t, n), selection: Dm(e, r, n) };
    }
    function Dm(e, r, t) {
      return e && r && t.throwValidationError({ kind: "IncludeAndSelect", selectionPath: t.getSelectionPath() }), e ? Om(e, t) : Lm(t, r);
    }
    function Lm(e, r) {
      let t = {};
      return e.model && !e.isRawAction() && (t.$composites = true, t.$scalars = true), r && Nm(t, r, e), t;
    }
    function Nm(e, r, t) {
      for (let [n, i] of Object.entries(r)) {
        let o = t.findField(n);
        o && o?.kind !== "object" && t.throwValidationError({ kind: "IncludeOnScalar", selectionPath: t.getSelectionPath().concat(n), outputType: t.getOutputTypeDescription() }), i === true ? e[n] = true : typeof i == "object" && (e[n] = Wi(i, t.nestSelection(n)));
      }
    }
    function Om(e, r) {
      let t = {}, n = r.getComputedFields(), i = aa(e, n);
      for (let [o, s] of Object.entries(i)) {
        let a = r.findField(o);
        n?.[o] && !a || (s === true ? t[o] = true : typeof s == "object" && (t[o] = Wi(s, r.nestSelection(o))));
      }
      return t;
    }
    function Ka(e, r) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (br(e)) {
        if (Wt(e)) return { $type: "DateTime", value: e.toISOString() };
        r.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r.getSelectionPath(), argumentPath: r.getArgumentPath(), argument: { name: r.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (vr(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return Fm(e, r);
      if (ArrayBuffer.isView(e)) return { $type: "Bytes", value: Buffer.from(e).toString("base64") };
      if (Mm(e)) return e.values;
      if (Pr(e)) return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof Ne) {
        if (e !== Gt.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if ($m(e)) return e.toJSON();
      if (typeof e == "object") return za(e, r);
      r.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r.getSelectionPath(), argumentPath: r.getArgumentPath(), argument: { name: r.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    function za(e, r) {
      if (e.$type) return { $type: "Raw", value: e };
      let t = {};
      for (let n in e) {
        let i = e[n];
        i !== void 0 && (t[n] = Ka(i, r.nestArgument(n)));
      }
      return t;
    }
    function Fm(e, r) {
      let t = [];
      for (let n = 0; n < e.length; n++) {
        let i = r.nestArgument(String(n)), o = e[n];
        o === void 0 && r.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${r.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: "Can not use `undefined` value within array. Use `null` or filter out `undefined` values" }), t.push(Ka(o, i));
      }
      return t;
    }
    function Mm(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    function $m(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    var Hi = class e {
      constructor(r) {
        this.params = r;
        this.params.modelName && (this.model = this.params.runtimeDataModel.models[this.params.modelName]);
      }
      throwValidationError(r) {
        Tn({ errors: [r], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.model)) return { name: this.params.modelName, fields: this.model.fields.map((r) => ({ name: r.name, typeName: "boolean", isRelation: r.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(r) {
        return this.model?.fields.find((t) => t.name === r);
      }
      nestSelection(r) {
        let t = this.findField(r), n = t?.kind === "object" ? t.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(r) });
      }
      nestArgument(r) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(r) });
      }
    };
    var Ya = (e) => ({ command: e });
    var Za = (e) => e.strings.reduce((r, t, n) => `${r}@P${n}${t}`);
    function Tt(e) {
      try {
        return Xa(e, "fast");
      } catch {
        return Xa(e, "slow");
      }
    }
    function Xa(e, r) {
      return JSON.stringify(e.map((t) => qm(t, r)));
    }
    function qm(e, r) {
      return typeof e == "bigint" ? { prisma__type: "bigint", prisma__value: e.toString() } : br(e) ? { prisma__type: "date", prisma__value: e.toJSON() } : Te.isDecimal(e) ? { prisma__type: "decimal", prisma__value: e.toJSON() } : Buffer.isBuffer(e) ? { prisma__type: "bytes", prisma__value: e.toString("base64") } : Bm(e) || ArrayBuffer.isView(e) ? { prisma__type: "bytes", prisma__value: Buffer.from(e).toString("base64") } : typeof e == "object" && r === "slow" ? rl(e) : e;
    }
    function Bm(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    function rl(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(el);
      let r = {};
      for (let t of Object.keys(e)) r[t] = el(e[t]);
      return r;
    }
    function el(e) {
      return typeof e == "bigint" ? e.toString() : rl(e);
    }
    var Vm = /^(\s*alter\s)/i;
    var tl = N("prisma:client");
    function Ki(e, r, t, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && t.length > 0 && Vm.exec(r)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    var zi = ({ clientMethod: e, activeProvider: r }) => (t) => {
      let n = "", i;
      if (Array.isArray(t)) {
        let [o, ...s] = t;
        n = o, i = { values: Tt(s || []), __prismaRawParameters__: true };
      } else switch (r) {
        case "sqlite":
        case "mysql": {
          n = t.sql, i = { values: Tt(t.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = t.text, i = { values: Tt(t.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = Za(t), i = { values: Tt(t.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${r} provider does not support ${e}`);
      }
      return i?.values ? tl(`prisma.${e}(${n}, ${i.values})`) : tl(`prisma.${e}(${n})`), { query: n, parameters: i };
    };
    var nl = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [r, ...t] = e;
      return new oe(r, t);
    } };
    var il = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    function Yi(e) {
      return function(t) {
        let n, i = (o = e) => {
          try {
            return o === void 0 || o?.kind === "itx" ? n ?? (n = ol(t(o))) : ol(t(o));
          } catch (s) {
            return Promise.reject(s);
          }
        };
        return { then(o, s) {
          return i().then(o, s);
        }, catch(o) {
          return i().catch(o);
        }, finally(o) {
          return i().finally(o);
        }, requestTransaction(o) {
          let s = i(o);
          return s.requestTransaction ? s.requestTransaction(o) : s;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    function ol(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    var sl = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, async createEngineSpan() {
    }, getActiveContext() {
    }, runInChildSpan(e, r) {
      return r();
    } };
    var Zi = class {
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(r) {
        return this.getGlobalTracingHelper().getTraceParent(r);
      }
      createEngineSpan(r) {
        return this.getGlobalTracingHelper().createEngineSpan(r);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(r, t) {
        return this.getGlobalTracingHelper().runInChildSpan(r, t);
      }
      getGlobalTracingHelper() {
        return globalThis.PRISMA_INSTRUMENTATION?.helper ?? sl;
      }
    };
    function al(e) {
      return e.includes("tracing") ? new Zi() : sl;
    }
    function ll(e, r = () => {
    }) {
      let t, n = new Promise((i) => t = i);
      return { then(i) {
        return --e === 0 && t(r()), i?.(n);
      } };
    }
    var jm = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var ul = jm;
    function cl(e) {
      return typeof e == "string" ? e : e.reduce((r, t) => {
        let n = typeof t == "string" ? t : t.level;
        return n === "query" ? r : r && (t === "info" || r === "info") ? "info" : n;
      }, void 0);
    }
    var Cn = class {
      constructor() {
        this._middlewares = [];
      }
      use(r) {
        this._middlewares.push(r);
      }
      get(r) {
        return this._middlewares[r];
      }
      has(r) {
        return !!this._middlewares[r];
      }
      length() {
        return this._middlewares.length;
      }
    };
    var ml = _(ai());
    function Sn(e) {
      return typeof e.batchRequestIdx == "number";
    }
    function Rn(e) {
      return e === null ? e : Array.isArray(e) ? e.map(Rn) : typeof e == "object" ? Um(e) ? Qm(e) : gr(e, Rn) : e;
    }
    function Um(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    function Qm({ $type: e, value: r }) {
      switch (e) {
        case "BigInt":
          return BigInt(r);
        case "Bytes":
          return Buffer.from(r, "base64");
        case "DateTime":
          return new Date(r);
        case "Decimal":
          return new Te(r);
        case "Json":
          return JSON.parse(r);
        default:
          rr(r, "Unknown tagged value");
      }
    }
    function pl(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let r = [];
      return e.modelName && r.push(e.modelName), e.query.arguments && r.push(Xi(e.query.arguments)), r.push(Xi(e.query.selection)), r.join("");
    }
    function Xi(e) {
      return `(${Object.keys(e).sort().map((t) => {
        let n = e[t];
        return typeof n == "object" && n !== null ? `(${t} ${Xi(n)})` : t;
      }).join(" ")})`;
    }
    var Gm = { aggregate: false, aggregateRaw: false, createMany: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateOne: true, upsertOne: true };
    function eo(e) {
      return Gm[e];
    }
    var An = class {
      constructor(r) {
        this.options = r;
        this.tickActive = false;
        this.batches = {};
      }
      request(r) {
        let t = this.options.batchBy(r);
        return t ? (this.batches[t] || (this.batches[t] = [], this.tickActive || (this.tickActive = true, process.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[t].push({ request: r, resolve: n, reject: i });
        })) : this.options.singleLoader(r);
      }
      dispatchBatches() {
        for (let r in this.batches) {
          let t = this.batches[r];
          delete this.batches[r], t.length === 1 ? this.options.singleLoader(t[0].request).then((n) => {
            n instanceof Error ? t[0].reject(n) : t[0].resolve(n);
          }).catch((n) => {
            t[0].reject(n);
          }) : (t.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(t.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < t.length; i++) t[i].reject(n);
            else for (let i = 0; i < t.length; i++) {
              let o = n[i];
              o instanceof Error ? t[i].reject(o) : t[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < t.length; i++) t[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    var Jm = N("prisma:client:request_handler");
    var In = class {
      constructor(r, t) {
        this.logEmitter = t, this.client = r, this.dataloader = new An({ batchLoader: ta(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((p) => p.protocolQuery), l = this.client._tracingHelper.getTraceParent(s), u = n.some((p) => eo(p.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: l, transaction: Hm(o), containsWrite: u, customDataProxyFetch: i })).map((p, m) => {
            if (p instanceof Error) return p;
            try {
              return this.mapQueryEngineResult(n[m], p);
            } catch (f) {
              return f;
            }
          });
        }), singleLoader: async (n) => {
          let i = n.transaction?.kind === "itx" ? dl(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: eo(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, batchBy: (n) => n.transaction?.id ? `transaction-${n.transaction.id}` : pl(n.protocolQuery), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(r) {
        try {
          return await this.dataloader.request(r);
        } catch (t) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = r;
          this.handleAndLogRequestError({ error: t, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a });
        }
      }
      mapQueryEngineResult({ dataPath: r, unpacker: t }, n) {
        let i = n?.data, o = n?.elapsed, s = this.unpack(i, r, t);
        return process.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
      }
      handleAndLogRequestError(r) {
        try {
          this.handleRequestError(r);
        } catch (t) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: t.message, target: r.clientMethod, timestamp: /* @__PURE__ */ new Date() }), t;
        }
      }
      handleRequestError({ error: r, clientMethod: t, callsite: n, transaction: i, args: o, modelName: s }) {
        if (Jm(r), Wm(r, i) || r instanceof Le) throw r;
        if (r instanceof V && Km(r)) {
          let l = fl(r.meta);
          Tn({ args: o, errors: [l], callsite: n, errorFormat: this.client._errorFormat, originalMethod: t, clientVersion: this.client._clientVersion });
        }
        let a = r.message;
        if (n && (a = Rr({ callsite: n, originalMethod: t, isPanic: r.isPanic, showColors: this.client._errorFormat === "pretty", message: a })), a = this.sanitizeMessage(a), r.code) {
          let l = s ? { modelName: s, ...r.meta } : r.meta;
          throw new V(a, { code: r.code, clientVersion: this.client._clientVersion, meta: l, batchRequestIdx: r.batchRequestIdx });
        } else {
          if (r.isPanic) throw new ue(a, this.client._clientVersion);
          if (r instanceof j) throw new j(a, { clientVersion: this.client._clientVersion, batchRequestIdx: r.batchRequestIdx });
          if (r instanceof S) throw new S(a, this.client._clientVersion);
          if (r instanceof ue) throw new ue(a, this.client._clientVersion);
        }
        throw r.clientVersion = this.client._clientVersion, r;
      }
      sanitizeMessage(r) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, ml.default)(r) : r;
      }
      unpack(r, t, n) {
        if (!r || (r.data && (r = r.data), !r)) return r;
        let i = Object.values(r)[0], o = t.filter((a) => a !== "select" && a !== "include"), s = Rn(Ri(i, o));
        return n ? n(s) : s;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function Hm(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx") return { kind: "itx", options: dl(e) };
        rr(e, "Unknown transaction kind");
      }
    }
    function dl(e) {
      return { id: e.id, payload: e.payload };
    }
    function Wm(e, r) {
      return Sn(e) && r?.kind === "batch" && e.batchRequestIdx !== r.index;
    }
    function Km(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    function fl(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(fl) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...r] = e.selectionPath;
        return { ...e, selectionPath: r };
      }
      return e;
    }
    var gl = "5.10.0";
    var hl = gl;
    function yl(e) {
      return e.map((r) => {
        let t = {};
        for (let n of Object.keys(r)) t[n] = El(r[n]);
        return t;
      });
    }
    function El({ prisma__type: e, prisma__value: r }) {
      switch (e) {
        case "bigint":
          return BigInt(r);
        case "bytes":
          return Buffer.from(r, "base64");
        case "decimal":
          return new Te(r);
        case "datetime":
        case "date":
          return new Date(r);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${r}Z`);
        case "array":
          return r.map(El);
        default:
          return r;
      }
    }
    var Pl = _(Ji());
    var q = class extends Error {
      constructor(r) {
        super(r + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    w(q, "PrismaClientConstructorValidationError");
    var bl = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "__internal"];
    var wl = ["pretty", "colorless", "minimal"];
    var xl = ["info", "query", "warn", "error"];
    var Ym = { datasources: (e, { datasourceNames: r }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) throw new q(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [t, n] of Object.entries(e)) {
          if (!r.includes(t)) {
            let i = Dr(t, r) || ` Available datasources: ${r.join(", ")}`;
            throw new q(`Unknown datasource ${t} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new q(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new q(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new q(`Invalid value ${JSON.stringify(o)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, adapter: (e, r) => {
      if (e === null) return;
      if (e === void 0) throw new q('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!bn(r).includes("driverAdapters")) throw new q('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (Qr() === "binary") throw new q('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, datasourceUrl: (e) => {
      if (typeof e < "u" && typeof e != "string") throw new q(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, errorFormat: (e) => {
      if (e) {
        if (typeof e != "string") throw new q(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!wl.includes(e)) {
          let r = Dr(e, wl);
          throw new q(`Invalid errorFormat ${e} provided to PrismaClient constructor.${r}`);
        }
      }
    }, log: (e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new q(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function r(t) {
        if (typeof t == "string" && !xl.includes(t)) {
          let n = Dr(t, xl);
          throw new q(`Invalid log level "${t}" provided to PrismaClient constructor.${n}`);
        }
      }
      for (let t of e) {
        r(t);
        let n = { level: r, emit: (i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = Dr(i, o);
            throw new q(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        } };
        if (t && typeof t == "object") for (let [i, o] of Object.entries(t)) if (n[i]) n[i](o);
        else throw new q(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, transactionOptions: (e) => {
      if (!e) return;
      let r = e.maxWait;
      if (r != null && r <= 0) throw new q(`Invalid value ${r} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let t = e.timeout;
      if (t != null && t <= 0) throw new q(`Invalid value ${t} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, __internal: (e) => {
      if (!e) return;
      let r = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new q(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [t] of Object.entries(e)) if (!r.includes(t)) {
        let n = Dr(t, r);
        throw new q(`Invalid property ${JSON.stringify(t)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    } };
    function vl(e, r) {
      for (let [t, n] of Object.entries(e)) {
        if (!bl.includes(t)) {
          let i = Dr(t, bl);
          throw new q(`Unknown property ${t} provided to PrismaClient constructor.${i}`);
        }
        Ym[t](n, r);
      }
      if (e.datasourceUrl && e.datasources) throw new q('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    function Dr(e, r) {
      if (r.length === 0 || typeof e != "string") return "";
      let t = Zm(e, r);
      return t ? ` Did you mean "${t}"?` : "";
    }
    function Zm(e, r) {
      if (r.length === 0) return null;
      let t = r.map((i) => ({ value: i, distance: (0, Pl.default)(e, i) }));
      t.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = t[0];
      return n.distance < 3 ? n.value : null;
    }
    function Tl(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((r, t) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a = () => {
          o || (s++, s === e.length && (o = true, i ? t(i) : r(n)));
        }, l = (u) => {
          o || (o = true, t(u));
        };
        for (let u = 0; u < e.length; u++) e[u].then((c) => {
          n[u] = c, a();
        }, (c) => {
          if (!Sn(c)) {
            l(c);
            return;
          }
          c.batchRequestIdx === u ? l(c) : (i || (i = c), a());
        });
      });
    }
    var ze = N("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Xm = { requestArgsToMiddlewareArgs: (e) => e, middlewareArgsToRequestArgs: (e) => e };
    var ed = Symbol.for("prisma.client.transaction.id");
    var rd = { id: 0, nextId() {
      return ++this.id;
    } };
    function _l(e) {
      class r {
        constructor(n) {
          this._originalClient = this;
          this._middlewares = new Cn();
          this._createPrismaPromise = Yi();
          this.$extends = Ws;
          e = n?.__internal?.configOverride?.(e) ?? e, ca(e), n && vl(n, e);
          let i = n?.adapter ? gi(n.adapter) : void 0, o = new Al.EventEmitter().on("error", () => {
          });
          this._extensions = dn.empty(), this._previewFeatures = bn(e), this._clientVersion = e.clientVersion ?? hl, this._activeProvider = e.activeProvider, this._tracingHelper = al(this._previewFeatures);
          let s = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && Ct.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && Ct.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, a = !i && Ur(s, { conflictCheck: "none" }) || e.injectableEdgeEnv?.();
          try {
            let l = n ?? {}, u = l.__internal ?? {}, c = u.debug === true;
            c && N.enable("prisma:client");
            let p = Ct.default.resolve(e.dirname, e.relativePath);
            Il.default.existsSync(p) || (p = e.dirname), ze("dirname", e.dirname), ze("relativePath", e.relativePath), ze("cwd", p);
            let m = u.engine || {};
            if (l.errorFormat ? this._errorFormat = l.errorFormat : process.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : process.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: p, dirname: e.dirname, enableDebugLogs: c, allowTriggerPanic: m.allowTriggerPanic, datamodelPath: Ct.default.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: m.binaryPath ?? void 0, engineEndpoint: m.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: l.log && cl(l.log), logQueries: l.log && !!(typeof l.log == "string" ? l.log === "query" : l.log.find((f) => typeof f == "string" ? f === "query" : f.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: e.engineWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: pa(l, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: l.transactionOptions?.maxWait ?? 2e3, timeout: l.transactionOptions?.timeout ?? 5e3, isolationLevel: l.transactionOptions?.isolationLevel }, logEmitter: o, isBundled: e.isBundled, adapter: i }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: Ar, getBatchRequestPayload: yr, prismaGraphQLToJSError: or, PrismaClientUnknownRequestError: j, PrismaClientInitializationError: S, PrismaClientKnownRequestError: V, debug: N("prisma:client:accelerateEngine"), engineVersion: Sl.version, clientVersion: e.clientVersion } }, ze("clientVersion", e.clientVersion), this._engine = Ma(e, this._engineConfig), this._requestHandler = new In(this, o), l.log) for (let f of l.log) {
              let g = typeof f == "string" ? f : f.emit === "stdout" ? f.level : null;
              g && this.$on(g, (h) => {
                Hr.log(`${Hr.tags[g] ?? ""}`, h.message || h.query);
              });
            }
            this._metrics = new hr(this._engine);
          } catch (l) {
            throw l.clientVersion = this._clientVersion, l;
          }
          return this._appliedParent = st(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i);
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            fo();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: zi({ clientMethod: i, activeProvider: a }), callsite: He(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = Cl(n, i);
              return Ki(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new K("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (Ki(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new K(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: Ya, callsite: He(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: zi({ clientMethod: i, activeProvider: a }), callsite: He(this._errorFormat), dataPath: [], middlewareArgsMapper: s }).then(yl);
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Cl(n, i));
            throw new K("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = rd.nextId(), s = ll(n.length), a = n.map((l, u) => {
            if (l?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let c = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, p = { kind: "batch", id: o, index: u, isolationLevel: c, lock: s };
            return l.requestTransaction?.(p) ?? l;
          });
          return Tl(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), l;
          try {
            let u = { kind: "itx", ...a };
            l = await n(this._createItxClient(u)), await this._engine.transaction("commit", o, a);
          } catch (u) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), u;
          }
          return l;
        }
        _createItxClient(n) {
          return st(Pe(Hs(this), [te("_appliedParent", () => this._appliedParent._createItxClient(n)), te("_createPrismaPromise", () => Yi(n)), te(ed, () => n.id), tt(ul)]));
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? o = () => this._transactionWithCallback({ callback: n, options: i }) : o = () => this._transactionWithArray({ promises: n, options: i });
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Xm, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = -1, l = async (u) => {
            let c = this._middlewares.get(++a);
            if (c) return this._tracingHelper.runInChildSpan(s.middleware, (A) => c(u, (T) => (A?.end(), l(T))));
            let { runInTransaction: p, args: m, ...f } = u, g = { ...n, ...f };
            m && (g.args = i.middlewareArgsToRequestArgs(m)), n.transaction !== void 0 && p === false && delete g.transaction;
            let h = await ra(this, g);
            return g.model ? Ys({ result: h, modelName: g.model, args: g.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel }) : h;
          };
          return this._tracingHelper.runInChildSpan(s.operation, () => new Rl.AsyncResource("prisma-client-request").runInAsyncScope(() => l(o)));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: l, argsMapper: u, transaction: c, unpacker: p, otelParentCtx: m, customDataProxyFetch: f }) {
          try {
            n = u ? u(n) : n;
            let g = { name: "serialize" }, h = this._tracingHelper.runInChildSpan(g, () => Wa({ modelName: l, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion }));
            return N.enabled("prisma:client") && (ze("Prisma Client call:"), ze(`prisma.${i}(${Is(n)})`), ze("Generated request:"), ze(JSON.stringify(h, null, 2) + `
`)), c?.kind === "batch" && await c.lock, this._requestHandler.request({ protocolQuery: h, modelName: l, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: c, unpacker: p, otelParentCtx: m, otelChildCtx: this._tracingHelper.getActiveContext(), customDataProxyFetch: f });
          } catch (g) {
            throw g.clientVersion = this._clientVersion, g;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics")) throw new K("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
          return this._metrics;
        }
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
      }
      return r;
    }
    function Cl(e, r) {
      return td(e) ? [new oe(e, r), nl] : [e, il];
    }
    function td(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    var nd = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function kl(e) {
      return new Proxy(e, { get(r, t) {
        if (t in r) return r[t];
        if (!nd.has(t)) throw new TypeError(`Invalid enum value: ${String(t)}`);
      } });
    }
    function Dl(e) {
      Ur(e, { conflictCheck: "warn" });
    }
  }
});

// node_modules/.prisma/client/index.js
var require_client = __commonJS({
  "node_modules/.prisma/client/index.js"(exports2) {
    Object.defineProperty(exports2, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      NotFoundError: NotFoundError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join3,
      raw: raw3,
      Decimal: Decimal2,
      Debug: Debug3,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      detectRuntime: detectRuntime2
    } = require_library();
    var Prisma = {};
    exports2.Prisma = Prisma;
    exports2.$Enums = {};
    Prisma.prismaVersion = {
      client: "5.10.0",
      engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.NotFoundError = NotFoundError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join3;
    Prisma.raw = raw3;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    var path = require("path");
    exports2.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      Serializable: "Serializable"
    });
    exports2.Prisma.UserScalarFieldEnum = {
      id: "id",
      username: "username",
      passwordHash: "passwordHash",
      role: "role",
      status: "status",
      companyName: "companyName",
      companyCode: "companyCode",
      contactPerson: "contactPerson",
      contactPhone: "contactPhone",
      avatarUrl: "avatarUrl",
      realName: "realName",
      phone: "phone",
      subscription: "subscription",
      validUntil: "validUntil",
      permissions: "permissions",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports2.Prisma.EmployeeScalarFieldEnum = {
      id: "id",
      enterpriseId: "enterpriseId",
      name: "name",
      idNumber: "idNumber",
      code: "code",
      phone: "phone",
      department: "department",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports2.Prisma.TaxRecordScalarFieldEnum = {
      id: "id",
      enterpriseId: "enterpriseId",
      employeeId: "employeeId",
      batchId: "batchId",
      period: "period",
      paymentDate: "paymentDate",
      income: "income",
      taxableIncome: "taxableIncome",
      taxRate: "taxRate",
      quickDeduction: "quickDeduction",
      taxPayable: "taxPayable",
      taxPaid: "taxPaid",
      currentTax: "currentTax",
      afterTaxIncome: "afterTaxIncome",
      isNewSegment: "isNewSegment",
      createdAt: "createdAt"
    };
    exports2.Prisma.UploadBatchScalarFieldEnum = {
      id: "id",
      enterpriseId: "enterpriseId",
      fileName: "fileName",
      totalRecords: "totalRecords",
      totalAmount: "totalAmount",
      uploadTime: "uploadTime",
      status: "status"
    };
    exports2.Prisma.AuditLogScalarFieldEnum = {
      id: "id",
      userId: "userId",
      action: "action",
      details: "details",
      ipAddress: "ipAddress",
      createdAt: "createdAt"
    };
    exports2.Prisma.NotificationScalarFieldEnum = {
      id: "id",
      userId: "userId",
      type: "type",
      title: "title",
      content: "content",
      isRead: "isRead",
      createdAt: "createdAt"
    };
    exports2.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports2.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports2.Prisma.ModelName = {
      User: "User",
      Employee: "Employee",
      TaxRecord: "TaxRecord",
      UploadBatch: "UploadBatch",
      AuditLog: "AuditLog",
      Notification: "Notification"
    };
    var config3 = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "/Users/dulipeng/Desktop/aitaxmaster/node_modules/@prisma/client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "darwin-arm64",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ]
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../.env"
      },
      "relativePath": "../../..",
      "clientVersion": "5.10.0",
      "engineVersion": "5a9203d0590c951969e85a7d07215503f4672eb9",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "sqlite",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": null,
            "value": "file:./dev.db"
          }
        }
      },
      "inlineSchema": `// This is a suggested Prisma Schema for TaxMaster 2025 (Cloudflare D1 Version)
// Technology Stack: Cloudflare Workers + D1 (SQLite) + Prisma ORM

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

// ==========================================
// 1. User & Authentication (SaaS Multi-tenancy)
// ==========================================

// SQLite doesn't support native Enums, so we use Strings
// UserRole: 'SUPER_ADMIN', 'ENTERPRISE_ADMIN'
// AccountStatus: 'ACTIVE', 'DISABLED', 'SUSPENDED'

model User {
  id            String        @id @default(uuid())
  username      String        @unique // Login ID
  passwordHash  String        // Encrypted password
  role          String        @default("ENTERPRISE_ADMIN") // Simulated Enum
  status        String        @default("ACTIVE") // Simulated Enum
  
  // Enterprise Profile
  companyName   String?
  companyCode   String? @unique // Generated Enterprise Code
  contactPerson String?
  contactPhone  String?
  avatarUrl     String?

  // Application Fields
  realName      String?
  phone         String?
  subscription  String?       @default("FREE") // 'FREE', 'PAID'
  validUntil    DateTime?
  
  // Permissions (Stored as String in SQLite, parsed as JSON in app)
  permissions   String?       @default("[]") 

  // Relations
  employees     Employee[]
  taxRecords    TaxRecord[]
  uploadBatches UploadBatch[]
  auditLogs     AuditLog[]
  notifications Notification[]

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([username])
}

// ==========================================
// 2. Core Business Data
// ==========================================

model Employee {
  id          String   @id @default(uuid())
  enterpriseId String
  
  name        String
  idNumber    String
  code        String? // Generated User ID Code
  phone       String?
  department  String?

  enterprise  User        @relation(fields: [enterpriseId], references: [id])
  taxRecords  TaxRecord[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([enterpriseId, idNumber]) 
  @@index([idNumber])
}

model TaxRecord {
  id              String   @id @default(uuid())
  enterpriseId    String
  employeeId      String
  batchId         String?

  period          String   // YYYY-MM
  paymentDate     DateTime

  // Note: SQLite doesn't have native Decimal. 
  // Prisma handles this, but usually stores as high-precision text or double.
  // For finance, prefer storing as String or Integer (cents) if accessing via raw SQL.
  // Here we let Prisma handle the Decimal type mapping.
  income          Decimal
  
  taxableIncome   Decimal
  taxRate         Decimal
  quickDeduction  Decimal
  taxPayable      Decimal
  taxPaid         Decimal
  currentTax      Decimal
  afterTaxIncome  Decimal

  isNewSegment    Boolean  @default(false)

  enterprise      User        @relation(fields: [enterpriseId], references: [id])
  employee        Employee    @relation(fields: [employeeId], references: [id])
  batch           UploadBatch? @relation(fields: [batchId], references: [id])

  createdAt       DateTime @default(now())

  @@index([enterpriseId, period])
  @@index([employeeId])
}

model UploadBatch {
  id            String   @id @default(uuid())
  enterpriseId  String
  fileName      String
  totalRecords  Int
  totalAmount   Decimal
  uploadTime    DateTime @default(now())
  
  status        String   // 'SUCCESS', 'PROCESSING', 'FAILED'

  enterprise    User        @relation(fields: [enterpriseId], references: [id])
  records       TaxRecord[]
}

model AuditLog {
  id          String   @id @default(uuid())
  userId      String
  action      String
  details     String?  // JSON stringified
  ipAddress   String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}

model Notification {
  id          String   @id @default(uuid())
  userId      String?  // Null means global/system broadcast to all enterprises
  type        String   @default("SYSTEM") // 'SYSTEM', 'ALERT', 'UPDATE'
  title       String
  content     String   // Can be HTML or Markdown
  isRead      Boolean  @default(false)
  createdAt   DateTime @default(now())

  // Relation to specific user if not global
  user        User?    @relation(fields: [userId], references: [id])
}
`,
      "inlineSchemaHash": "51f6afe059f4cbe2a11c96c58256f91ec810c4cac1bc475d84b210479c46187c",
      "copyEngine": true
    };
    var fs2 = require("fs");
    config3.dirname = __dirname;
    if (!fs2.existsSync(path.join(__dirname, "schema.prisma"))) {
      const alternativePaths = [
        "node_modules/.prisma/client",
        ".prisma/client"
      ];
      const alternativePath = alternativePaths.find((altPath) => {
        return fs2.existsSync(path.join(process.cwd(), altPath, "schema.prisma"));
      }) ?? alternativePaths[0];
      config3.dirname = path.join(process.cwd(), alternativePath);
      config3.isBundled = true;
    }
    config3.runtimeDataModel = JSON.parse('{"models":{"User":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"passwordHash","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"ENTERPRISE_ADMIN","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"ACTIVE","isGenerated":false,"isUpdatedAt":false},{"name":"companyName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"companyCode","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"contactPerson","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"contactPhone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"avatarUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"realName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"subscription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"FREE","isGenerated":false,"isUpdatedAt":false},{"name":"validUntil","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"permissions","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"[]","isGenerated":false,"isUpdatedAt":false},{"name":"employees","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Employee","relationName":"EmployeeToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"taxRecords","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TaxRecord","relationName":"TaxRecordToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"uploadBatches","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UploadBatch","relationName":"UploadBatchToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"auditLogs","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AuditLog","relationName":"AuditLogToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notifications","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Notification","relationName":"NotificationToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Employee":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"enterpriseId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"idNumber","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"code","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"department","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"enterprise","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"EmployeeToUser","relationFromFields":["enterpriseId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"taxRecords","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TaxRecord","relationName":"EmployeeToTaxRecord","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[["enterpriseId","idNumber"]],"uniqueIndexes":[{"name":null,"fields":["enterpriseId","idNumber"]}],"isGenerated":false},"TaxRecord":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"enterpriseId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"employeeId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"batchId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"period","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"paymentDate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"income","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"taxableIncome","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"taxRate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"quickDeduction","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"taxPayable","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"taxPaid","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"currentTax","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"afterTaxIncome","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"isNewSegment","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"enterprise","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"TaxRecordToUser","relationFromFields":["enterpriseId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"employee","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Employee","relationName":"EmployeeToTaxRecord","relationFromFields":["employeeId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"batch","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UploadBatch","relationName":"TaxRecordToUploadBatch","relationFromFields":["batchId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UploadBatch":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"enterpriseId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"fileName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"totalRecords","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"totalAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Decimal","isGenerated":false,"isUpdatedAt":false},{"name":"uploadTime","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"enterprise","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"UploadBatchToUser","relationFromFields":["enterpriseId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"records","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TaxRecord","relationName":"TaxRecordToUploadBatch","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"AuditLog":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"action","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"details","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"ipAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"AuditLogToUser","relationFromFields":["userId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Notification":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"SYSTEM","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isRead","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"NotificationToUser","relationFromFields":["userId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports2.Prisma, config3.runtimeDataModel);
    config3.engineWasm = void 0;
    var { warnEnvConflicts: warnEnvConflicts2 } = require_library();
    warnEnvConflicts2({
      rootEnvPath: config3.relativeEnvPaths.rootEnvPath && path.resolve(config3.dirname, config3.relativeEnvPaths.rootEnvPath),
      schemaEnvPath: config3.relativeEnvPaths.schemaEnvPath && path.resolve(config3.dirname, config3.relativeEnvPaths.schemaEnvPath)
    });
    var PrismaClient2 = getPrismaClient2(config3);
    exports2.PrismaClient = PrismaClient2;
    Object.assign(exports2, Prisma);
    path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
    path.join(process.cwd(), "node_modules/.prisma/client/libquery_engine-darwin-arm64.dylib.node");
    path.join(__dirname, "schema.prisma");
    path.join(process.cwd(), "node_modules/.prisma/client/schema.prisma");
  }
});

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports2, module2) {
    module2.exports = { ...require_client() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports2, module2) {
    module2.exports = {
      ...require_default()
    };
  }
});

// node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS({
  "node_modules/@prisma/debug/dist/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to2, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to2, key) && key !== except)
            __defProp2(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to2;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      Debug: () => Debug3,
      clearLogs: () => clearLogs,
      default: () => src_default,
      getLogs: () => getLogs
    });
    module2.exports = __toCommonJS(src_exports);
    var colors_exports = {};
    __export(colors_exports, {
      $: () => $3,
      bgBlack: () => bgBlack2,
      bgBlue: () => bgBlue2,
      bgCyan: () => bgCyan2,
      bgGreen: () => bgGreen2,
      bgMagenta: () => bgMagenta2,
      bgRed: () => bgRed2,
      bgWhite: () => bgWhite2,
      bgYellow: () => bgYellow2,
      black: () => black2,
      blue: () => blue2,
      bold: () => bold2,
      cyan: () => cyan2,
      dim: () => dim2,
      gray: () => gray2,
      green: () => green2,
      grey: () => grey2,
      hidden: () => hidden2,
      inverse: () => inverse2,
      italic: () => italic2,
      magenta: () => magenta2,
      red: () => red2,
      reset: () => reset2,
      strikethrough: () => strikethrough2,
      underline: () => underline2,
      white: () => white2,
      yellow: () => yellow2
    });
    var FORCE_COLOR2;
    var NODE_DISABLE_COLORS2;
    var NO_COLOR2;
    var TERM2;
    var isTTY2 = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR: FORCE_COLOR2, NODE_DISABLE_COLORS: NODE_DISABLE_COLORS2, NO_COLOR: NO_COLOR2, TERM: TERM2 } = process.env || {});
      isTTY2 = process.stdout && process.stdout.isTTY;
    }
    var $3 = {
      enabled: !NODE_DISABLE_COLORS2 && NO_COLOR2 == null && TERM2 !== "dumb" && (FORCE_COLOR2 != null && FORCE_COLOR2 !== "0" || isTTY2)
    };
    function init2(x2, y2) {
      let rgx = new RegExp(`\\x1b\\[${y2}m`, "g");
      let open = `\x1B[${x2}m`, close = `\x1B[${y2}m`;
      return function(txt) {
        if (!$3.enabled || txt == null)
          return txt;
        return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
      };
    }
    var reset2 = init2(0, 0);
    var bold2 = init2(1, 22);
    var dim2 = init2(2, 22);
    var italic2 = init2(3, 23);
    var underline2 = init2(4, 24);
    var inverse2 = init2(7, 27);
    var hidden2 = init2(8, 28);
    var strikethrough2 = init2(9, 29);
    var black2 = init2(30, 39);
    var red2 = init2(31, 39);
    var green2 = init2(32, 39);
    var yellow2 = init2(33, 39);
    var blue2 = init2(34, 39);
    var magenta2 = init2(35, 39);
    var cyan2 = init2(36, 39);
    var white2 = init2(37, 39);
    var gray2 = init2(90, 39);
    var grey2 = init2(90, 39);
    var bgBlack2 = init2(40, 49);
    var bgRed2 = init2(41, 49);
    var bgGreen2 = init2(42, 49);
    var bgYellow2 = init2(43, 49);
    var bgBlue2 = init2(44, 49);
    var bgMagenta2 = init2(45, 49);
    var bgCyan2 = init2(46, 49);
    var bgWhite2 = init2(47, 49);
    var MAX_ARGS_HISTORY = 100;
    var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var argsHistory = [];
    var lastTimestamp = Date.now();
    var lastColor = 0;
    globalThis.DEBUG ?? (globalThis.DEBUG = process.env.DEBUG ?? "");
    globalThis.DEBUG_COLORS ?? (globalThis.DEBUG_COLORS = process.env.DEBUG_COLORS ? process.env.DEBUG_COLORS === "true" : true);
    var topProps = {
      enable(namespace) {
        if (typeof namespace === "string") {
          globalThis.DEBUG = namespace;
        }
      },
      disable() {
        const prev = globalThis.DEBUG;
        globalThis.DEBUG = "";
        return prev;
      },
      // this is the core logic to check if logging should happen or not
      enabled(namespace) {
        const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
          return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        });
        const isListened = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] === "-")
            return false;
          return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
        });
        const isExcluded = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] !== "-")
            return false;
          return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
        });
        return isListened && !isExcluded;
      },
      log: (...args) => {
        const [namespace, format, ...rest] = args;
        let logger;
        if (typeof require === "function" && typeof process !== "undefined" && typeof process.stderr !== "undefined" && typeof process.stderr.write === "function") {
          logger = (...args2) => {
            const util = require(`${"util"}`);
            process.stderr.write(util.format(...args2) + "\n");
          };
        } else {
          logger = console.warn ?? console.log;
        }
        logger(`${namespace} ${format}`, ...rest);
      },
      formatters: {}
      // not implemented
    };
    function debugCreate(namespace) {
      const instanceProps = {
        color: COLORS[lastColor++ % COLORS.length],
        enabled: topProps.enabled(namespace),
        namespace,
        log: topProps.log,
        extend: () => {
        }
        // not implemented
      };
      const debugCall = (...args) => {
        const { enabled, namespace: namespace2, color, log } = instanceProps;
        if (args.length !== 0) {
          argsHistory.push([namespace2, ...args]);
        }
        if (argsHistory.length > MAX_ARGS_HISTORY) {
          argsHistory.shift();
        }
        if (topProps.enabled(namespace2) || enabled) {
          const stringArgs = args.map((arg) => {
            if (typeof arg === "string") {
              return arg;
            }
            return safeStringify(arg);
          });
          const ms2 = `+${Date.now() - lastTimestamp}ms`;
          lastTimestamp = Date.now();
          if (globalThis.DEBUG_COLORS) {
            log(colors_exports[color](bold2(namespace2)), ...stringArgs, colors_exports[color](ms2));
          } else {
            log(namespace2, ...stringArgs, ms2);
          }
        }
      };
      return new Proxy(debugCall, {
        get: (_2, prop) => instanceProps[prop],
        set: (_2, prop, value) => instanceProps[prop] = value
      });
    }
    var Debug3 = new Proxy(debugCreate, {
      get: (_2, prop) => topProps[prop],
      set: (_2, prop, value) => topProps[prop] = value
    });
    function safeStringify(value, indent = 2) {
      const cache = /* @__PURE__ */ new Set();
      return JSON.stringify(
        value,
        (key, value2) => {
          if (typeof value2 === "object" && value2 !== null) {
            if (cache.has(value2)) {
              return `[Circular *]`;
            }
            cache.add(value2);
          } else if (typeof value2 === "bigint") {
            return value2.toString();
          }
          return value2;
        },
        indent
      );
    }
    function getLogs(numChars = 7500) {
      const logs = argsHistory.map(([namespace, ...args]) => {
        return `${namespace} ${args.map((arg) => {
          if (typeof arg === "string") {
            return arg;
          } else {
            return JSON.stringify(arg);
          }
        }).join(" ")}`;
      }).join("\n");
      if (logs.length < numChars) {
        return logs;
      }
      return logs.slice(-numChars);
    }
    function clearLogs() {
      argsHistory.length = 0;
    }
    var src_default = Debug3;
  }
});

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.6.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs2 = require("fs");
    var path = require("path");
    var os2 = require("os");
    var crypto3 = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match2;
      while ((match2 = LINE.exec(lines)) != null) {
        const key = match2[1];
        let value = match2[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err2 = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err2.code = "MISSING_DATA";
        throw err2;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err2 = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err2.code = "INVALID_DOTENV_KEY";
          throw err2;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err2 = new Error("INVALID_DOTENV_KEY: Missing key part");
        err2.code = "INVALID_DOTENV_KEY";
        throw err2;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err2 = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err2.code = "INVALID_DOTENV_KEY";
        throw err2;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err2 = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err2.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err2;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs2.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs2.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug2 = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (debug2 || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug2 = Boolean(options && options.debug);
      const quiet = options && "quiet" in options ? options.quiet : true;
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug2) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs2.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug2) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (debug2 || !quiet) {
        const keysCount = Object.keys(parsedAll).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug2) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config3(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto3.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err2 = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err2.code = "INVALID_DOTENV_KEY";
          throw err2;
        } else if (decryptionFailed) {
          const err2 = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err2.code = "DECRYPTION_FAILED";
          throw err2;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug2 = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err2 = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err2.code = "OBJECT_REQUIRED";
        throw err2;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug2) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config3,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/@hono/node-server/dist/index.mjs
var import_http = require("http");
var import_http2 = require("http2");
var import_http22 = require("http2");
var import_stream = require("stream");
var import_crypto = __toESM(require("crypto"), 1);
var RequestError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "RequestError";
  }
};
var toRequestError = (e) => {
  if (e instanceof RequestError) {
    return e;
  }
  return new RequestError(e.message, { cause: e });
};
var GlobalRequest = global.Request;
var Request2 = class extends GlobalRequest {
  constructor(input, options) {
    if (typeof input === "object" && getRequestCache in input) {
      input = input[getRequestCache]();
    }
    if (typeof options?.body?.getReader !== "undefined") {
      ;
      options.duplex ??= "half";
    }
    super(input, options);
  }
};
var newHeadersFromIncoming = (incoming) => {
  const headerRecord = [];
  const rawHeaders = incoming.rawHeaders;
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const { [i]: key, [i + 1]: value } = rawHeaders;
    if (key.charCodeAt(0) !== /*:*/
    58) {
      headerRecord.push([key, value]);
    }
  }
  return new Headers(headerRecord);
};
var wrapBodyStream = Symbol("wrapBodyStream");
var newRequestFromIncoming = (method, url, headers, incoming, abortController) => {
  const init2 = {
    method,
    headers,
    signal: abortController.signal
  };
  if (method === "TRACE") {
    init2.method = "GET";
    const req = new Request2(url, init2);
    Object.defineProperty(req, "method", {
      get() {
        return "TRACE";
      }
    });
    return req;
  }
  if (!(method === "GET" || method === "HEAD")) {
    if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) {
      init2.body = new ReadableStream({
        start(controller) {
          controller.enqueue(incoming.rawBody);
          controller.close();
        }
      });
    } else if (incoming[wrapBodyStream]) {
      let reader;
      init2.body = new ReadableStream({
        async pull(controller) {
          try {
            reader ||= import_stream.Readable.toWeb(incoming).getReader();
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
            }
          } catch (error) {
            controller.error(error);
          }
        }
      });
    } else {
      init2.body = import_stream.Readable.toWeb(incoming);
    }
  }
  return new Request2(url, init2);
};
var getRequestCache = Symbol("getRequestCache");
var requestCache = Symbol("requestCache");
var incomingKey = Symbol("incomingKey");
var urlKey = Symbol("urlKey");
var headersKey = Symbol("headersKey");
var abortControllerKey = Symbol("abortControllerKey");
var getAbortController = Symbol("getAbortController");
var requestPrototype = {
  get method() {
    return this[incomingKey].method || "GET";
  },
  get url() {
    return this[urlKey];
  },
  get headers() {
    return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
  },
  [getAbortController]() {
    this[getRequestCache]();
    return this[abortControllerKey];
  },
  [getRequestCache]() {
    this[abortControllerKey] ||= new AbortController();
    return this[requestCache] ||= newRequestFromIncoming(
      this.method,
      this[urlKey],
      this.headers,
      this[incomingKey],
      this[abortControllerKey]
    );
  }
};
[
  "body",
  "bodyUsed",
  "cache",
  "credentials",
  "destination",
  "integrity",
  "mode",
  "redirect",
  "referrer",
  "referrerPolicy",
  "signal",
  "keepalive"
].forEach((k2) => {
  Object.defineProperty(requestPrototype, k2, {
    get() {
      return this[getRequestCache]()[k2];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k2) => {
  Object.defineProperty(requestPrototype, k2, {
    value: function() {
      return this[getRequestCache]()[k2]();
    }
  });
});
Object.setPrototypeOf(requestPrototype, Request2.prototype);
var newRequest = (incoming, defaultHostname) => {
  const req = Object.create(requestPrototype);
  req[incomingKey] = incoming;
  const incomingUrl = incoming.url || "";
  if (incomingUrl[0] !== "/" && // short-circuit for performance. most requests are relative URL.
  (incomingUrl.startsWith("http://") || incomingUrl.startsWith("https://"))) {
    if (incoming instanceof import_http22.Http2ServerRequest) {
      throw new RequestError("Absolute URL for :path is not allowed in HTTP/2");
    }
    try {
      const url2 = new URL(incomingUrl);
      req[urlKey] = url2.href;
    } catch (e) {
      throw new RequestError("Invalid absolute URL", { cause: e });
    }
    return req;
  }
  const host = (incoming instanceof import_http22.Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
  if (!host) {
    throw new RequestError("Missing host header");
  }
  let scheme;
  if (incoming instanceof import_http22.Http2ServerRequest) {
    scheme = incoming.scheme;
    if (!(scheme === "http" || scheme === "https")) {
      throw new RequestError("Unsupported scheme");
    }
  } else {
    scheme = incoming.socket && incoming.socket.encrypted ? "https" : "http";
  }
  const url = new URL(`${scheme}://${host}${incomingUrl}`);
  if (url.hostname.length !== host.length && url.hostname !== host.replace(/:\d+$/, "")) {
    throw new RequestError("Invalid host header");
  }
  req[urlKey] = url.href;
  return req;
};
var responseCache = Symbol("responseCache");
var getResponseCache = Symbol("getResponseCache");
var cacheKey = Symbol("cache");
var GlobalResponse = global.Response;
var Response2 = class _Response {
  #body;
  #init;
  [getResponseCache]() {
    delete this[cacheKey];
    return this[responseCache] ||= new GlobalResponse(this.#body, this.#init);
  }
  constructor(body, init2) {
    let headers;
    this.#body = body;
    if (init2 instanceof _Response) {
      const cachedGlobalResponse = init2[responseCache];
      if (cachedGlobalResponse) {
        this.#init = cachedGlobalResponse;
        this[getResponseCache]();
        return;
      } else {
        this.#init = init2.#init;
        headers = new Headers(init2.#init.headers);
      }
    } else {
      this.#init = init2;
    }
    if (typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) {
      headers ||= init2?.headers || { "content-type": "text/plain; charset=UTF-8" };
      this[cacheKey] = [init2?.status || 200, body, headers];
    }
  }
  get headers() {
    const cache = this[cacheKey];
    if (cache) {
      if (!(cache[2] instanceof Headers)) {
        cache[2] = new Headers(cache[2]);
      }
      return cache[2];
    }
    return this[getResponseCache]().headers;
  }
  get status() {
    return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
  }
  get ok() {
    const status = this.status;
    return status >= 200 && status < 300;
  }
};
["body", "bodyUsed", "redirected", "statusText", "trailers", "type", "url"].forEach((k2) => {
  Object.defineProperty(Response2.prototype, k2, {
    get() {
      return this[getResponseCache]()[k2];
    }
  });
});
["arrayBuffer", "blob", "clone", "formData", "json", "text"].forEach((k2) => {
  Object.defineProperty(Response2.prototype, k2, {
    value: function() {
      return this[getResponseCache]()[k2]();
    }
  });
});
Object.setPrototypeOf(Response2, GlobalResponse);
Object.setPrototypeOf(Response2.prototype, GlobalResponse.prototype);
async function readWithoutBlocking(readPromise) {
  return Promise.race([readPromise, Promise.resolve().then(() => Promise.resolve(void 0))]);
}
function writeFromReadableStreamDefaultReader(reader, writable, currentReadPromise) {
  const cancel = (error) => {
    reader.cancel(error).catch(() => {
    });
  };
  writable.on("close", cancel);
  writable.on("error", cancel);
  (currentReadPromise ?? reader.read()).then(flow, handleStreamError);
  return reader.closed.finally(() => {
    writable.off("close", cancel);
    writable.off("error", cancel);
  });
  function handleStreamError(error) {
    if (error) {
      writable.destroy(error);
    }
  }
  function onDrain() {
    reader.read().then(flow, handleStreamError);
  }
  function flow({ done, value }) {
    try {
      if (done) {
        writable.end();
      } else if (!writable.write(value)) {
        writable.once("drain", onDrain);
      } else {
        return reader.read().then(flow, handleStreamError);
      }
    } catch (e) {
      handleStreamError(e);
    }
  }
}
function writeFromReadableStream(stream, writable) {
  if (stream.locked) {
    throw new TypeError("ReadableStream is locked.");
  } else if (writable.destroyed) {
    return;
  }
  return writeFromReadableStreamDefaultReader(stream.getReader(), writable);
}
var buildOutgoingHttpHeaders = (headers) => {
  const res = {};
  if (!(headers instanceof Headers)) {
    headers = new Headers(headers ?? void 0);
  }
  const cookies = [];
  for (const [k2, v] of headers) {
    if (k2 === "set-cookie") {
      cookies.push(v);
    } else {
      res[k2] = v;
    }
  }
  if (cookies.length > 0) {
    res["set-cookie"] = cookies;
  }
  res["content-type"] ??= "text/plain; charset=UTF-8";
  return res;
};
var X_ALREADY_SENT = "x-hono-already-sent";
var webFetch = global.fetch;
if (typeof global.crypto === "undefined") {
  global.crypto = import_crypto.default;
}
global.fetch = (info, init2) => {
  init2 = {
    // Disable compression handling so people can return the result of a fetch
    // directly in the loader without messing with the Content-Encoding header.
    compress: false,
    ...init2
  };
  return webFetch(info, init2);
};
var outgoingEnded = Symbol("outgoingEnded");
var handleRequestError = () => new Response(null, {
  status: 400
});
var handleFetchError = (e) => new Response(null, {
  status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500
});
var handleResponseError = (e, outgoing) => {
  const err2 = e instanceof Error ? e : new Error("unknown error", { cause: e });
  if (err2.code === "ERR_STREAM_PREMATURE_CLOSE") {
    console.info("The user aborted a request.");
  } else {
    console.error(e);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "Content-Type": "text/plain" });
    }
    outgoing.end(`Error: ${err2.message}`);
    outgoing.destroy(err2);
  }
};
var flushHeaders = (outgoing) => {
  if ("flushHeaders" in outgoing && outgoing.writable) {
    outgoing.flushHeaders();
  }
};
var responseViaCache = async (res, outgoing) => {
  let [status, body, header] = res[cacheKey];
  if (header instanceof Headers) {
    header = buildOutgoingHttpHeaders(header);
  }
  if (typeof body === "string") {
    header["Content-Length"] = Buffer.byteLength(body);
  } else if (body instanceof Uint8Array) {
    header["Content-Length"] = body.byteLength;
  } else if (body instanceof Blob) {
    header["Content-Length"] = body.size;
  }
  outgoing.writeHead(status, header);
  if (typeof body === "string" || body instanceof Uint8Array) {
    outgoing.end(body);
  } else if (body instanceof Blob) {
    outgoing.end(new Uint8Array(await body.arrayBuffer()));
  } else {
    flushHeaders(outgoing);
    await writeFromReadableStream(body, outgoing)?.catch(
      (e) => handleResponseError(e, outgoing)
    );
  }
  ;
  outgoing[outgoingEnded]?.();
};
var isPromise = (res) => typeof res.then === "function";
var responseViaResponseObject = async (res, outgoing, options = {}) => {
  if (isPromise(res)) {
    if (options.errorHandler) {
      try {
        res = await res;
      } catch (err2) {
        const errRes = await options.errorHandler(err2);
        if (!errRes) {
          return;
        }
        res = errRes;
      }
    } else {
      res = await res.catch(handleFetchError);
    }
  }
  if (cacheKey in res) {
    return responseViaCache(res, outgoing);
  }
  const resHeaderRecord = buildOutgoingHttpHeaders(res.headers);
  if (res.body) {
    const reader = res.body.getReader();
    const values = [];
    let done = false;
    let currentReadPromise = void 0;
    if (resHeaderRecord["transfer-encoding"] !== "chunked") {
      let maxReadCount = 2;
      for (let i = 0; i < maxReadCount; i++) {
        currentReadPromise ||= reader.read();
        const chunk = await readWithoutBlocking(currentReadPromise).catch((e) => {
          console.error(e);
          done = true;
        });
        if (!chunk) {
          if (i === 1) {
            await new Promise((resolve) => setTimeout(resolve));
            maxReadCount = 3;
            continue;
          }
          break;
        }
        currentReadPromise = void 0;
        if (chunk.value) {
          values.push(chunk.value);
        }
        if (chunk.done) {
          done = true;
          break;
        }
      }
      if (done && !("content-length" in resHeaderRecord)) {
        resHeaderRecord["content-length"] = values.reduce((acc, value) => acc + value.length, 0);
      }
    }
    outgoing.writeHead(res.status, resHeaderRecord);
    values.forEach((value) => {
      ;
      outgoing.write(value);
    });
    if (done) {
      outgoing.end();
    } else {
      if (values.length === 0) {
        flushHeaders(outgoing);
      }
      await writeFromReadableStreamDefaultReader(reader, outgoing, currentReadPromise);
    }
  } else if (resHeaderRecord[X_ALREADY_SENT]) {
  } else {
    outgoing.writeHead(res.status, resHeaderRecord);
    outgoing.end();
  }
  ;
  outgoing[outgoingEnded]?.();
};
var getRequestListener = (fetchCallback, options = {}) => {
  const autoCleanupIncoming = options.autoCleanupIncoming ?? true;
  if (options.overrideGlobalObjects !== false && global.Request !== Request2) {
    Object.defineProperty(global, "Request", {
      value: Request2
    });
    Object.defineProperty(global, "Response", {
      value: Response2
    });
  }
  return async (incoming, outgoing) => {
    let res, req;
    try {
      req = newRequest(incoming, options.hostname);
      let incomingEnded = !autoCleanupIncoming || incoming.method === "GET" || incoming.method === "HEAD";
      if (!incomingEnded) {
        ;
        incoming[wrapBodyStream] = true;
        incoming.on("end", () => {
          incomingEnded = true;
        });
        if (incoming instanceof import_http2.Http2ServerRequest) {
          ;
          outgoing[outgoingEnded] = () => {
            if (!incomingEnded) {
              setTimeout(() => {
                if (!incomingEnded) {
                  setTimeout(() => {
                    incoming.destroy();
                    outgoing.destroy();
                  });
                }
              });
            }
          };
        }
      }
      outgoing.on("close", () => {
        const abortController = req[abortControllerKey];
        if (abortController) {
          if (incoming.errored) {
            req[abortControllerKey].abort(incoming.errored.toString());
          } else if (!outgoing.writableFinished) {
            req[abortControllerKey].abort("Client connection prematurely closed.");
          }
        }
        if (!incomingEnded) {
          setTimeout(() => {
            if (!incomingEnded) {
              setTimeout(() => {
                incoming.destroy();
              });
            }
          });
        }
      });
      res = fetchCallback(req, { incoming, outgoing });
      if (cacheKey in res) {
        return responseViaCache(res, outgoing);
      }
    } catch (e) {
      if (!res) {
        if (options.errorHandler) {
          res = await options.errorHandler(req ? e : toRequestError(e));
          if (!res) {
            return;
          }
        } else if (!req) {
          res = handleRequestError();
        } else {
          res = handleFetchError(e);
        }
      } else {
        return handleResponseError(e, outgoing);
      }
    }
    try {
      return await responseViaResponseObject(res, outgoing, options);
    } catch (e) {
      return handleResponseError(e, outgoing);
    }
  };
};
var createAdaptorServer = (options) => {
  const fetchCallback = options.fetch;
  const requestListener = getRequestListener(fetchCallback, {
    hostname: options.hostname,
    overrideGlobalObjects: options.overrideGlobalObjects,
    autoCleanupIncoming: options.autoCleanupIncoming
  });
  const createServer = options.createServer || import_http.createServer;
  const server = createServer(options.serverOptions || {}, requestListener);
  return server;
};
var serve = (options, listeningListener) => {
  const server = createAdaptorServer(options);
  server.listen(options?.port ?? 3e3, options.hostname, () => {
    const serverInfo = server.address();
    listeningListener && listeningListener(serverInfo);
  });
  return server;
};

// node_modules/hono/dist/utils/mime.js
var getMimeType = (filename, mimes = baseMimes) => {
  const regexp = /\.([a-zA-Z0-9]+?)$/;
  const match2 = filename.match(regexp);
  if (!match2) {
    return;
  }
  let mimeType = mimes[match2[1]];
  if (mimeType && mimeType.startsWith("text")) {
    mimeType += "; charset=utf-8";
  }
  return mimeType;
};
var _baseMimes = {
  aac: "audio/aac",
  avi: "video/x-msvideo",
  avif: "image/avif",
  av1: "video/av1",
  bin: "application/octet-stream",
  bmp: "image/bmp",
  css: "text/css",
  csv: "text/csv",
  eot: "application/vnd.ms-fontobject",
  epub: "application/epub+zip",
  gif: "image/gif",
  gz: "application/gzip",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  ics: "text/calendar",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  jsonld: "application/ld+json",
  map: "application/json",
  mid: "audio/x-midi",
  midi: "audio/x-midi",
  mjs: "text/javascript",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  oga: "audio/ogg",
  ogv: "video/ogg",
  ogx: "application/ogg",
  opus: "audio/opus",
  otf: "font/otf",
  pdf: "application/pdf",
  png: "image/png",
  rtf: "application/rtf",
  svg: "image/svg+xml",
  tif: "image/tiff",
  tiff: "image/tiff",
  ts: "video/mp2t",
  ttf: "font/ttf",
  txt: "text/plain",
  wasm: "application/wasm",
  webm: "video/webm",
  weba: "audio/webm",
  webmanifest: "application/manifest+json",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  xhtml: "application/xhtml+xml",
  xml: "application/xml",
  zip: "application/zip",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  gltf: "model/gltf+json",
  glb: "model/gltf-binary"
};
var baseMimes = _baseMimes;

// node_modules/@hono/node-server/dist/serve-static.mjs
var import_fs = require("fs");
var import_path = require("path");
var COMPRESSIBLE_CONTENT_TYPE_REGEX = /^\s*(?:text\/[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var ENCODINGS = {
  br: ".br",
  zstd: ".zst",
  gzip: ".gz"
};
var ENCODINGS_ORDERED_KEYS = Object.keys(ENCODINGS);
var createStreamBody = (stream) => {
  const body = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      stream.on("error", (err2) => {
        controller.error(err2);
      });
      stream.on("end", () => {
        controller.close();
      });
    },
    cancel() {
      stream.destroy();
    }
  });
  return body;
};
var getStats = (path) => {
  let stats;
  try {
    stats = (0, import_fs.lstatSync)(path);
  } catch {
  }
  return stats;
};
var serveStatic = (options = { root: "" }) => {
  const root = options.root || "";
  const optionPath = options.path;
  if (root !== "" && !(0, import_fs.existsSync)(root)) {
    console.error(`serveStatic: root path '${root}' is not found, are you sure it's correct?`);
  }
  return async (c, next) => {
    if (c.finalized) {
      return next();
    }
    let filename;
    if (optionPath) {
      filename = optionPath;
    } else {
      try {
        filename = decodeURIComponent(c.req.path);
        if (/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(filename)) {
          throw new Error();
        }
      } catch {
        await options.onNotFound?.(c.req.path, c);
        return next();
      }
    }
    let path = (0, import_path.join)(
      root,
      !optionPath && options.rewriteRequestPath ? options.rewriteRequestPath(filename, c) : filename
    );
    let stats = getStats(path);
    if (stats && stats.isDirectory()) {
      const indexFile = options.index ?? "index.html";
      path = (0, import_path.join)(path, indexFile);
      stats = getStats(path);
    }
    if (!stats) {
      await options.onNotFound?.(path, c);
      return next();
    }
    const mimeType = getMimeType(path);
    c.header("Content-Type", mimeType || "application/octet-stream");
    if (options.precompressed && (!mimeType || COMPRESSIBLE_CONTENT_TYPE_REGEX.test(mimeType))) {
      const acceptEncodingSet = new Set(
        c.req.header("Accept-Encoding")?.split(",").map((encoding) => encoding.trim())
      );
      for (const encoding of ENCODINGS_ORDERED_KEYS) {
        if (!acceptEncodingSet.has(encoding)) {
          continue;
        }
        const precompressedStats = getStats(path + ENCODINGS[encoding]);
        if (precompressedStats) {
          c.header("Content-Encoding", encoding);
          c.header("Vary", "Accept-Encoding", { append: true });
          stats = precompressedStats;
          path = path + ENCODINGS[encoding];
          break;
        }
      }
    }
    let result;
    const size = stats.size;
    const range = c.req.header("range") || "";
    if (c.req.method == "HEAD" || c.req.method == "OPTIONS") {
      c.header("Content-Length", size.toString());
      c.status(200);
      result = c.body(null);
    } else if (!range) {
      c.header("Content-Length", size.toString());
      result = c.body(createStreamBody((0, import_fs.createReadStream)(path)), 200);
    } else {
      c.header("Accept-Ranges", "bytes");
      c.header("Date", stats.birthtime.toUTCString());
      const parts = range.replace(/bytes=/, "").split("-", 2);
      const start = parseInt(parts[0], 10) || 0;
      let end = parseInt(parts[1], 10) || size - 1;
      if (size < end - start + 1) {
        end = size - 1;
      }
      const chunksize = end - start + 1;
      const stream = (0, import_fs.createReadStream)(path, { start, end });
      c.header("Content-Length", chunksize.toString());
      c.header("Content-Range", `bytes ${start}-${end}/${stats.size}`);
      result = c.body(createStreamBody(stream), 206);
    }
    await options.onFound?.(path, c);
    return result;
  };
};

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err2) {
          if (err2 instanceof Error && onError) {
            context.error = err2;
            res = await onError(err2, context);
            isError = true;
          } else {
            throw err2;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j2 = paths.length - 1; j2 >= 0; j2--) {
      if (paths[j2].includes(mark)) {
        paths[j2] = paths[j2].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey2 = `${label}#${next}`;
    if (!patternCache[cacheKey2]) {
      if (match2[2]) {
        patternCache[cacheKey2] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey2, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey2] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey2];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw3 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw3[key]();
  };
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw2 = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw2(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k2, v] of this.#res.headers.entries()) {
        if (k2 === "content-type") {
          continue;
        }
        if (k2 === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k2, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k2, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k2, v);
        } else {
          responseHeaders.delete(k2);
          for (const v2 of v) {
            responseHeaders.append(k2, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err2, c) => {
  if ("getResponse" in err2) {
    const res = err2.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err2);
  return c.text("Internal Server Error", 500);
};
var Hono = class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app6) {
    const subApp = this.basePath(path);
    app6.routes.map((r) => {
      let handler;
      if (app6.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app6.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err2, c) {
    if (err2 instanceof Error) {
      return this.errorHandler(err2, c);
    }
    throw err2;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err2) {
        return this.#handleError(err2, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err2) => this.#handleError(err2, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err2) {
        return this.#handleError(err2, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path);
}

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b2) {
  if (a.length === 1) {
    return b2.length === 1 ? a < b2 ? -1 : 1 : -1;
  }
  if (b2.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b2 === ONLY_WILDCARD_REG_EXP_STR || b2 === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b2 === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b2.length ? a < b2 ? -1 : 1 : b2.length - a.length;
}
var Node = class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k2) => k2 !== ONLY_WILDCARD_REG_EXP_STR && k2 !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k2) => k2.length > 1 && k2 !== ONLY_WILDCARD_REG_EXP_STR && k2 !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k2) => {
      const c = this.#children[k2];
      return (typeof c.#varIndex === "number" ? `(${k2})@${c.#varIndex}` : regExpMetaChars.has(k2) ? `\\${k2}` : k2) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j2 = tokens.length - 1; j2 >= 0; j2--) {
        if (tokens[j2].indexOf(mark) !== -1) {
          tokens[j2] = tokens[j2].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_2, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_2, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j2 = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j2++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j2, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j2] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j2 = 0, len2 = handlerData[i].length; j2 < len2; j2++) {
      const map = handlerData[i][j2]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k2 = 0, len3 = keys.length; k2 < len3; k2++) {
        map[keys[k2]] = paramReplacementMap[map[keys[k2]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k2 of Object.keys(middleware).sort((a, b2) => b2.length - a.length)) {
    if (buildWildcardRegExp(k2).test(path)) {
      return [...middleware[k2]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re2 = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re2.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re2.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j2 = 0, len2 = curNodes.length; j2 < len2; j2++) {
        const node = curNodes[j2];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k2 = 0, len3 = node.#patterns.length; k2 < len3; k2++) {
          const pattern = node.#patterns[k2];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b2) => {
        return a.score - b2.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  };
};

// src/lib/prisma.ts
var import_client = __toESM(require_default2(), 1);

// node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var import_debug = __toESM(require_dist(), 1);
function ok(value) {
  return {
    ok: true,
    value,
    map(fn2) {
      return ok(fn2(value));
    },
    flatMap(fn2) {
      return fn2(value);
    }
  };
}
function err(error) {
  return {
    ok: false,
    error,
    map() {
      return err(error);
    },
    flatMap() {
      return err(error);
    }
  };
}
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};

// node_modules/@prisma/adapter-d1/dist/index.mjs
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $2 = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x2, y2) {
  let rgx = new RegExp(`\\x1b\\[${y2}m`, "g");
  let open = `\x1B[${x2}m`, close = `\x1B[${y2}m`;
  return function(txt) {
    if (!$2.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
function getColumnTypes(columnNames, rows) {
  const columnTypes = [];
  columnLoop:
    for (const columnIndex of columnNames) {
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const candidateValue = rows[rowIndex][columnIndex];
        if (candidateValue !== null) {
          columnTypes[columnIndex] = inferColumnType(candidateValue);
          continue columnLoop;
        }
      }
      columnTypes[columnIndex] = ColumnTypeEnum.Int32;
    }
  return columnTypes;
}
function inferColumnType(value) {
  switch (typeof value) {
    case "string":
      return inferStringType(value);
    case "number":
      return inferNumberType(value);
    case "object":
      return inferObjectType(value);
    default:
      throw new UnexpectedTypeError(value);
  }
}
var isoDateRegex = new RegExp(
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
);
function isISODate(str) {
  return isoDateRegex.test(str);
}
function inferStringType(value) {
  if (["true", "false"].includes(value)) {
    return ColumnTypeEnum.Boolean;
  }
  if (isISODate(value)) {
    return ColumnTypeEnum.DateTime;
  }
  return ColumnTypeEnum.Text;
}
function inferNumberType(value) {
  if (!Number.isInteger(value)) {
    return ColumnTypeEnum.Float;
  } else if (Number.isInteger(value) && Math.abs(value) < Number.MAX_SAFE_INTEGER) {
    return ColumnTypeEnum.Int32;
  } else {
    return ColumnTypeEnum.UnknownNumber;
  }
}
function inferObjectType(value) {
  if (value instanceof Array) {
    return ColumnTypeEnum.Bytes;
  }
  throw new UnexpectedTypeError(value);
}
var UnexpectedTypeError = class extends Error {
  constructor(value) {
    const type = typeof value;
    const repr = type === "object" ? JSON.stringify(value) : String(value);
    super(`unexpected value of type ${type}: ${repr}`);
    this.name = "UnexpectedTypeError";
  }
};
function mapRow(obj, columnTypes) {
  const result = Object.values(obj);
  for (let i = 0; i < result.length; i++) {
    const value = result[i];
    if (value instanceof ArrayBuffer) {
      result[i] = Array.from(new Uint8Array(value));
      continue;
    }
    if (typeof value === "number" && (columnTypes[i] === ColumnTypeEnum.Int32 || columnTypes[i] === ColumnTypeEnum.Int64) && !Number.isInteger(value)) {
      result[i] = Math.trunc(value);
      continue;
    }
    if (typeof value === "bigint") {
      result[i] = value.toString();
      continue;
    }
    if (columnTypes[i] === ColumnTypeEnum.Boolean) {
      result[i] = JSON.parse(value);
    }
  }
  return result;
}
var debug = (0, import_debug.Debug)("prisma:driver-adapter:d1");
var D1Queryable = class {
  constructor(client) {
    this.client = client;
    this.provider = "sqlite";
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug(`${tag} %O`, query);
    const ioResult = await this.performIO(query);
    return ioResult.map((data) => {
      const convertedData = this.convertData(data);
      return convertedData;
    });
  }
  convertData(ioResult) {
    if (ioResult.results.length === 0) {
      return {
        columnNames: [],
        columnTypes: [],
        rows: []
      };
    }
    const results = ioResult.results;
    const columnNames = Object.keys(results[0]);
    const columnTypes = Object.values(getColumnTypes(columnNames, results));
    const rows = ioResult.results.map((value) => mapRow(value, columnTypes));
    return {
      columnNames,
      // * Note: without Object.values the array looks like
      // * columnTypes: [ id: 128 ],
      // * and errors with:
      // * ✘ [ERROR] A hanging Promise was canceled. This happens when the worker runtime is waiting for a Promise from JavaScript to resolve, but has detected that the Promise cannot possibly ever resolve because all code and events related to the Promise's I/O context have already finished.
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug(`${tag} %O`, query);
    return (await this.performIO(query)).map(({ meta }) => meta.rows_written ?? 0);
  }
  async performIO(query) {
    try {
      query.args = query.args.map((arg) => this.cleanArg(arg));
      const result = await this.client.prepare(query.sql).bind(...query.args).all();
      return ok(result);
    } catch (e) {
      const error = e;
      console.error("Error in performIO: %O", error);
      let extendedCode = 1;
      if (error.message.startsWith("D1_ERROR: UNIQUE constraint failed:")) {
        extendedCode = 2067;
      } else if (error.message.startsWith("D1_ERROR: FOREIGN KEY constraint failed")) {
        extendedCode = 787;
      }
      return err({
        kind: "Sqlite",
        extendedCode,
        message: error.message
      });
    }
  }
  cleanArg(arg) {
    if (arg === true) {
      return 1;
    }
    if (arg === false) {
      return 0;
    }
    if (arg instanceof Uint8Array) {
      return Array.from(arg);
    }
    if (typeof arg === "bigint") {
      return String(arg);
    }
    return arg;
  }
};
var D1Transaction = class extends D1Queryable {
  constructor(client, options) {
    super(client);
    this.options = options;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async commit() {
    debug(`[js::commit]`);
    return ok(void 0);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async rollback() {
    debug(`[js::rollback]`);
    return ok(void 0);
  }
};
var PrismaD1 = class extends D1Queryable {
  // TODO: decide what we want to do for "debug"
  constructor(client, debug2) {
    super(client);
    this.tags = {
      error: red("prisma:error"),
      warn: yellow("prisma:warn"),
      info: cyan("prisma:info"),
      query: blue("prisma:query")
    };
    this.alreadyWarned = /* @__PURE__ */ new Set();
    this.warnOnce = (key, message, ...args) => {
      if (!this.alreadyWarned.has(key)) {
        this.alreadyWarned.add(key);
        console.info(`${this.tags.warn} ${message}`, ...args);
      }
    };
    if (debug2) {
      globalThis.DEBUG = debug2;
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async startTransaction() {
    const options = {
      // TODO: D1 does not support transactions.
      usePhantomQuery: true
    };
    const tag = "[js::startTransaction]";
    debug(`${tag} options: %O`, options);
    this.warnOnce(
      "D1 Transaction",
      "Cloudflare D1 - currently in Beta - does not support transactions. When using Prisma's D1 adapter, implicit & explicit transactions will be ignored and ran as individual queries, which breaks the guarantees of the ACID properties of transactions. For more details see https://pris.ly/d/d1-transactions"
    );
    return ok(new D1Transaction(this.client, options));
  }
};

// src/lib/prisma.ts
var globalPrisma;
var getPrisma = (cOrEnv) => {
  let d1 = null;
  if (cOrEnv?.env?.DB) {
    d1 = cOrEnv.env.DB;
  } else if (cOrEnv?.DB) {
    d1 = cOrEnv.DB;
  }
  if (d1) {
    console.log("[Prisma] Using D1 Adapter");
    const adapter = new PrismaD1(d1);
    return new import_client.PrismaClient({ adapter });
  }
  console.log("[Prisma] Using Standard Connection");
  if (!globalPrisma) {
    globalPrisma = new import_client.PrismaClient();
  }
  return globalPrisma;
};

// node_modules/bcryptjs/index.js
var import_crypto2 = __toESM(require("crypto"), 1);
var randomFallback = null;
function randomBytes(len) {
  try {
    return crypto.getRandomValues(new Uint8Array(len));
  } catch {
  }
  try {
    return import_crypto2.default.randomBytes(len);
  } catch {
  }
  if (!randomFallback) {
    throw Error(
      "Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative"
    );
  }
  return randomFallback(len);
}
function setRandomFallback(random) {
  randomFallback = random;
}
function genSaltSync(rounds, seed_length) {
  rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof rounds !== "number")
    throw Error(
      "Illegal arguments: " + typeof rounds + ", " + typeof seed_length
    );
  if (rounds < 4) rounds = 4;
  else if (rounds > 31) rounds = 31;
  var salt = [];
  salt.push("$2b$");
  if (rounds < 10) salt.push("0");
  salt.push(rounds.toString());
  salt.push("$");
  salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
  return salt.join("");
}
function genSalt(rounds, seed_length, callback) {
  if (typeof seed_length === "function")
    callback = seed_length, seed_length = void 0;
  if (typeof rounds === "function") callback = rounds, rounds = void 0;
  if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
  else if (typeof rounds !== "number")
    throw Error("illegal arguments: " + typeof rounds);
  function _async(callback2) {
    nextTick(function() {
      try {
        callback2(null, genSaltSync(rounds));
      } catch (err2) {
        callback2(err2);
      }
    });
  }
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err2, res) {
        if (err2) {
          reject(err2);
          return;
        }
        resolve(res);
      });
    });
}
function hashSync(password, salt) {
  if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
  if (typeof salt === "number") salt = genSaltSync(salt);
  if (typeof password !== "string" || typeof salt !== "string")
    throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
  return _hash(password, salt);
}
function hash(password, salt, callback, progressCallback) {
  function _async(callback2) {
    if (typeof password === "string" && typeof salt === "number")
      genSalt(salt, function(err2, salt2) {
        _hash(password, salt2, callback2, progressCallback);
      });
    else if (typeof password === "string" && typeof salt === "string")
      _hash(password, salt, callback2, progressCallback);
    else
      nextTick(
        callback2.bind(
          this,
          Error("Illegal arguments: " + typeof password + ", " + typeof salt)
        )
      );
  }
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err2, res) {
        if (err2) {
          reject(err2);
          return;
        }
        resolve(res);
      });
    });
}
function safeStringCompare(known, unknown) {
  var diff = known.length ^ unknown.length;
  for (var i = 0; i < known.length; ++i) {
    diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
  }
  return diff === 0;
}
function compareSync(password, hash2) {
  if (typeof password !== "string" || typeof hash2 !== "string")
    throw Error("Illegal arguments: " + typeof password + ", " + typeof hash2);
  if (hash2.length !== 60) return false;
  return safeStringCompare(
    hashSync(password, hash2.substring(0, hash2.length - 31)),
    hash2
  );
}
function compare(password, hashValue, callback, progressCallback) {
  function _async(callback2) {
    if (typeof password !== "string" || typeof hashValue !== "string") {
      nextTick(
        callback2.bind(
          this,
          Error(
            "Illegal arguments: " + typeof password + ", " + typeof hashValue
          )
        )
      );
      return;
    }
    if (hashValue.length !== 60) {
      nextTick(callback2.bind(this, null, false));
      return;
    }
    hash(
      password,
      hashValue.substring(0, 29),
      function(err2, comp) {
        if (err2) callback2(err2);
        else callback2(null, safeStringCompare(comp, hashValue));
      },
      progressCallback
    );
  }
  if (callback) {
    if (typeof callback !== "function")
      throw Error("Illegal callback: " + typeof callback);
    _async(callback);
  } else
    return new Promise(function(resolve, reject) {
      _async(function(err2, res) {
        if (err2) {
          reject(err2);
          return;
        }
        resolve(res);
      });
    });
}
function getRounds(hash2) {
  if (typeof hash2 !== "string")
    throw Error("Illegal arguments: " + typeof hash2);
  return parseInt(hash2.split("$")[2], 10);
}
function getSalt(hash2) {
  if (typeof hash2 !== "string")
    throw Error("Illegal arguments: " + typeof hash2);
  if (hash2.length !== 60)
    throw Error("Illegal hash length: " + hash2.length + " != 60");
  return hash2.substring(0, 29);
}
function truncates(password) {
  if (typeof password !== "string")
    throw Error("Illegal arguments: " + typeof password);
  return utf8Length(password) > 72;
}
var nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
function utf8Length(string) {
  var len = 0, c = 0;
  for (var i = 0; i < string.length; ++i) {
    c = string.charCodeAt(i);
    if (c < 128) len += 1;
    else if (c < 2048) len += 2;
    else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
      ++i;
      len += 4;
    } else len += 3;
  }
  return len;
}
function utf8Array(string) {
  var offset = 0, c1, c2;
  var buffer = new Array(utf8Length(string));
  for (var i = 0, k2 = string.length; i < k2; ++i) {
    c1 = string.charCodeAt(i);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192;
      buffer[offset++] = c1 & 63 | 128;
    } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
      c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
      ++i;
      buffer[offset++] = c1 >> 18 | 240;
      buffer[offset++] = c1 >> 12 & 63 | 128;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    } else {
      buffer[offset++] = c1 >> 12 | 224;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    }
  }
  return buffer;
}
var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
var BASE64_INDEX = [
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  1,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  -1,
  -1,
  -1,
  -1,
  -1
];
function base64_encode(b2, len) {
  var off = 0, rs = [], c1, c2;
  if (len <= 0 || len > b2.length) throw Error("Illegal len: " + len);
  while (off < len) {
    c1 = b2[off++] & 255;
    rs.push(BASE64_CODE[c1 >> 2 & 63]);
    c1 = (c1 & 3) << 4;
    if (off >= len) {
      rs.push(BASE64_CODE[c1 & 63]);
      break;
    }
    c2 = b2[off++] & 255;
    c1 |= c2 >> 4 & 15;
    rs.push(BASE64_CODE[c1 & 63]);
    c1 = (c2 & 15) << 2;
    if (off >= len) {
      rs.push(BASE64_CODE[c1 & 63]);
      break;
    }
    c2 = b2[off++] & 255;
    c1 |= c2 >> 6 & 3;
    rs.push(BASE64_CODE[c1 & 63]);
    rs.push(BASE64_CODE[c2 & 63]);
  }
  return rs.join("");
}
function base64_decode(s, len) {
  var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
  if (len <= 0) throw Error("Illegal len: " + len);
  while (off < slen - 1 && olen < len) {
    code = s.charCodeAt(off++);
    c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    code = s.charCodeAt(off++);
    c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c1 == -1 || c2 == -1) break;
    o = c1 << 2 >>> 0;
    o |= (c2 & 48) >> 4;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++);
    c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c3 == -1) break;
    o = (c2 & 15) << 4 >>> 0;
    o |= (c3 & 60) >> 2;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++);
    c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    o = (c3 & 3) << 6 >>> 0;
    o |= c4;
    rs.push(String.fromCharCode(o));
    ++olen;
  }
  var res = [];
  for (off = 0; off < olen; off++) res.push(rs[off].charCodeAt(0));
  return res;
}
var BCRYPT_SALT_LEN = 16;
var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
var BLOWFISH_NUM_ROUNDS = 16;
var MAX_EXECUTION_TIME = 100;
var P_ORIG = [
  608135816,
  2242054355,
  320440878,
  57701188,
  2752067618,
  698298832,
  137296536,
  3964562569,
  1160258022,
  953160567,
  3193202383,
  887688300,
  3232508343,
  3380367581,
  1065670069,
  3041331479,
  2450970073,
  2306472731
];
var S_ORIG = [
  3509652390,
  2564797868,
  805139163,
  3491422135,
  3101798381,
  1780907670,
  3128725573,
  4046225305,
  614570311,
  3012652279,
  134345442,
  2240740374,
  1667834072,
  1901547113,
  2757295779,
  4103290238,
  227898511,
  1921955416,
  1904987480,
  2182433518,
  2069144605,
  3260701109,
  2620446009,
  720527379,
  3318853667,
  677414384,
  3393288472,
  3101374703,
  2390351024,
  1614419982,
  1822297739,
  2954791486,
  3608508353,
  3174124327,
  2024746970,
  1432378464,
  3864339955,
  2857741204,
  1464375394,
  1676153920,
  1439316330,
  715854006,
  3033291828,
  289532110,
  2706671279,
  2087905683,
  3018724369,
  1668267050,
  732546397,
  1947742710,
  3462151702,
  2609353502,
  2950085171,
  1814351708,
  2050118529,
  680887927,
  999245976,
  1800124847,
  3300911131,
  1713906067,
  1641548236,
  4213287313,
  1216130144,
  1575780402,
  4018429277,
  3917837745,
  3693486850,
  3949271944,
  596196993,
  3549867205,
  258830323,
  2213823033,
  772490370,
  2760122372,
  1774776394,
  2652871518,
  566650946,
  4142492826,
  1728879713,
  2882767088,
  1783734482,
  3629395816,
  2517608232,
  2874225571,
  1861159788,
  326777828,
  3124490320,
  2130389656,
  2716951837,
  967770486,
  1724537150,
  2185432712,
  2364442137,
  1164943284,
  2105845187,
  998989502,
  3765401048,
  2244026483,
  1075463327,
  1455516326,
  1322494562,
  910128902,
  469688178,
  1117454909,
  936433444,
  3490320968,
  3675253459,
  1240580251,
  122909385,
  2157517691,
  634681816,
  4142456567,
  3825094682,
  3061402683,
  2540495037,
  79693498,
  3249098678,
  1084186820,
  1583128258,
  426386531,
  1761308591,
  1047286709,
  322548459,
  995290223,
  1845252383,
  2603652396,
  3431023940,
  2942221577,
  3202600964,
  3727903485,
  1712269319,
  422464435,
  3234572375,
  1170764815,
  3523960633,
  3117677531,
  1434042557,
  442511882,
  3600875718,
  1076654713,
  1738483198,
  4213154764,
  2393238008,
  3677496056,
  1014306527,
  4251020053,
  793779912,
  2902807211,
  842905082,
  4246964064,
  1395751752,
  1040244610,
  2656851899,
  3396308128,
  445077038,
  3742853595,
  3577915638,
  679411651,
  2892444358,
  2354009459,
  1767581616,
  3150600392,
  3791627101,
  3102740896,
  284835224,
  4246832056,
  1258075500,
  768725851,
  2589189241,
  3069724005,
  3532540348,
  1274779536,
  3789419226,
  2764799539,
  1660621633,
  3471099624,
  4011903706,
  913787905,
  3497959166,
  737222580,
  2514213453,
  2928710040,
  3937242737,
  1804850592,
  3499020752,
  2949064160,
  2386320175,
  2390070455,
  2415321851,
  4061277028,
  2290661394,
  2416832540,
  1336762016,
  1754252060,
  3520065937,
  3014181293,
  791618072,
  3188594551,
  3933548030,
  2332172193,
  3852520463,
  3043980520,
  413987798,
  3465142937,
  3030929376,
  4245938359,
  2093235073,
  3534596313,
  375366246,
  2157278981,
  2479649556,
  555357303,
  3870105701,
  2008414854,
  3344188149,
  4221384143,
  3956125452,
  2067696032,
  3594591187,
  2921233993,
  2428461,
  544322398,
  577241275,
  1471733935,
  610547355,
  4027169054,
  1432588573,
  1507829418,
  2025931657,
  3646575487,
  545086370,
  48609733,
  2200306550,
  1653985193,
  298326376,
  1316178497,
  3007786442,
  2064951626,
  458293330,
  2589141269,
  3591329599,
  3164325604,
  727753846,
  2179363840,
  146436021,
  1461446943,
  4069977195,
  705550613,
  3059967265,
  3887724982,
  4281599278,
  3313849956,
  1404054877,
  2845806497,
  146425753,
  1854211946,
  1266315497,
  3048417604,
  3681880366,
  3289982499,
  290971e4,
  1235738493,
  2632868024,
  2414719590,
  3970600049,
  1771706367,
  1449415276,
  3266420449,
  422970021,
  1963543593,
  2690192192,
  3826793022,
  1062508698,
  1531092325,
  1804592342,
  2583117782,
  2714934279,
  4024971509,
  1294809318,
  4028980673,
  1289560198,
  2221992742,
  1669523910,
  35572830,
  157838143,
  1052438473,
  1016535060,
  1802137761,
  1753167236,
  1386275462,
  3080475397,
  2857371447,
  1040679964,
  2145300060,
  2390574316,
  1461121720,
  2956646967,
  4031777805,
  4028374788,
  33600511,
  2920084762,
  1018524850,
  629373528,
  3691585981,
  3515945977,
  2091462646,
  2486323059,
  586499841,
  988145025,
  935516892,
  3367335476,
  2599673255,
  2839830854,
  265290510,
  3972581182,
  2759138881,
  3795373465,
  1005194799,
  847297441,
  406762289,
  1314163512,
  1332590856,
  1866599683,
  4127851711,
  750260880,
  613907577,
  1450815602,
  3165620655,
  3734664991,
  3650291728,
  3012275730,
  3704569646,
  1427272223,
  778793252,
  1343938022,
  2676280711,
  2052605720,
  1946737175,
  3164576444,
  3914038668,
  3967478842,
  3682934266,
  1661551462,
  3294938066,
  4011595847,
  840292616,
  3712170807,
  616741398,
  312560963,
  711312465,
  1351876610,
  322626781,
  1910503582,
  271666773,
  2175563734,
  1594956187,
  70604529,
  3617834859,
  1007753275,
  1495573769,
  4069517037,
  2549218298,
  2663038764,
  504708206,
  2263041392,
  3941167025,
  2249088522,
  1514023603,
  1998579484,
  1312622330,
  694541497,
  2582060303,
  2151582166,
  1382467621,
  776784248,
  2618340202,
  3323268794,
  2497899128,
  2784771155,
  503983604,
  4076293799,
  907881277,
  423175695,
  432175456,
  1378068232,
  4145222326,
  3954048622,
  3938656102,
  3820766613,
  2793130115,
  2977904593,
  26017576,
  3274890735,
  3194772133,
  1700274565,
  1756076034,
  4006520079,
  3677328699,
  720338349,
  1533947780,
  354530856,
  688349552,
  3973924725,
  1637815568,
  332179504,
  3949051286,
  53804574,
  2852348879,
  3044236432,
  1282449977,
  3583942155,
  3416972820,
  4006381244,
  1617046695,
  2628476075,
  3002303598,
  1686838959,
  431878346,
  2686675385,
  1700445008,
  1080580658,
  1009431731,
  832498133,
  3223435511,
  2605976345,
  2271191193,
  2516031870,
  1648197032,
  4164389018,
  2548247927,
  300782431,
  375919233,
  238389289,
  3353747414,
  2531188641,
  2019080857,
  1475708069,
  455242339,
  2609103871,
  448939670,
  3451063019,
  1395535956,
  2413381860,
  1841049896,
  1491858159,
  885456874,
  4264095073,
  4001119347,
  1565136089,
  3898914787,
  1108368660,
  540939232,
  1173283510,
  2745871338,
  3681308437,
  4207628240,
  3343053890,
  4016749493,
  1699691293,
  1103962373,
  3625875870,
  2256883143,
  3830138730,
  1031889488,
  3479347698,
  1535977030,
  4236805024,
  3251091107,
  2132092099,
  1774941330,
  1199868427,
  1452454533,
  157007616,
  2904115357,
  342012276,
  595725824,
  1480756522,
  206960106,
  497939518,
  591360097,
  863170706,
  2375253569,
  3596610801,
  1814182875,
  2094937945,
  3421402208,
  1082520231,
  3463918190,
  2785509508,
  435703966,
  3908032597,
  1641649973,
  2842273706,
  3305899714,
  1510255612,
  2148256476,
  2655287854,
  3276092548,
  4258621189,
  236887753,
  3681803219,
  274041037,
  1734335097,
  3815195456,
  3317970021,
  1899903192,
  1026095262,
  4050517792,
  356393447,
  2410691914,
  3873677099,
  3682840055,
  3913112168,
  2491498743,
  4132185628,
  2489919796,
  1091903735,
  1979897079,
  3170134830,
  3567386728,
  3557303409,
  857797738,
  1136121015,
  1342202287,
  507115054,
  2535736646,
  337727348,
  3213592640,
  1301675037,
  2528481711,
  1895095763,
  1721773893,
  3216771564,
  62756741,
  2142006736,
  835421444,
  2531993523,
  1442658625,
  3659876326,
  2882144922,
  676362277,
  1392781812,
  170690266,
  3921047035,
  1759253602,
  3611846912,
  1745797284,
  664899054,
  1329594018,
  3901205900,
  3045908486,
  2062866102,
  2865634940,
  3543621612,
  3464012697,
  1080764994,
  553557557,
  3656615353,
  3996768171,
  991055499,
  499776247,
  1265440854,
  648242737,
  3940784050,
  980351604,
  3713745714,
  1749149687,
  3396870395,
  4211799374,
  3640570775,
  1161844396,
  3125318951,
  1431517754,
  545492359,
  4268468663,
  3499529547,
  1437099964,
  2702547544,
  3433638243,
  2581715763,
  2787789398,
  1060185593,
  1593081372,
  2418618748,
  4260947970,
  69676912,
  2159744348,
  86519011,
  2512459080,
  3838209314,
  1220612927,
  3339683548,
  133810670,
  1090789135,
  1078426020,
  1569222167,
  845107691,
  3583754449,
  4072456591,
  1091646820,
  628848692,
  1613405280,
  3757631651,
  526609435,
  236106946,
  48312990,
  2942717905,
  3402727701,
  1797494240,
  859738849,
  992217954,
  4005476642,
  2243076622,
  3870952857,
  3732016268,
  765654824,
  3490871365,
  2511836413,
  1685915746,
  3888969200,
  1414112111,
  2273134842,
  3281911079,
  4080962846,
  172450625,
  2569994100,
  980381355,
  4109958455,
  2819808352,
  2716589560,
  2568741196,
  3681446669,
  3329971472,
  1835478071,
  660984891,
  3704678404,
  4045999559,
  3422617507,
  3040415634,
  1762651403,
  1719377915,
  3470491036,
  2693910283,
  3642056355,
  3138596744,
  1364962596,
  2073328063,
  1983633131,
  926494387,
  3423689081,
  2150032023,
  4096667949,
  1749200295,
  3328846651,
  309677260,
  2016342300,
  1779581495,
  3079819751,
  111262694,
  1274766160,
  443224088,
  298511866,
  1025883608,
  3806446537,
  1145181785,
  168956806,
  3641502830,
  3584813610,
  1689216846,
  3666258015,
  3200248200,
  1692713982,
  2646376535,
  4042768518,
  1618508792,
  1610833997,
  3523052358,
  4130873264,
  2001055236,
  3610705100,
  2202168115,
  4028541809,
  2961195399,
  1006657119,
  2006996926,
  3186142756,
  1430667929,
  3210227297,
  1314452623,
  4074634658,
  4101304120,
  2273951170,
  1399257539,
  3367210612,
  3027628629,
  1190975929,
  2062231137,
  2333990788,
  2221543033,
  2438960610,
  1181637006,
  548689776,
  2362791313,
  3372408396,
  3104550113,
  3145860560,
  296247880,
  1970579870,
  3078560182,
  3769228297,
  1714227617,
  3291629107,
  3898220290,
  166772364,
  1251581989,
  493813264,
  448347421,
  195405023,
  2709975567,
  677966185,
  3703036547,
  1463355134,
  2715995803,
  1338867538,
  1343315457,
  2802222074,
  2684532164,
  233230375,
  2599980071,
  2000651841,
  3277868038,
  1638401717,
  4028070440,
  3237316320,
  6314154,
  819756386,
  300326615,
  590932579,
  1405279636,
  3267499572,
  3150704214,
  2428286686,
  3959192993,
  3461946742,
  1862657033,
  1266418056,
  963775037,
  2089974820,
  2263052895,
  1917689273,
  448879540,
  3550394620,
  3981727096,
  150775221,
  3627908307,
  1303187396,
  508620638,
  2975983352,
  2726630617,
  1817252668,
  1876281319,
  1457606340,
  908771278,
  3720792119,
  3617206836,
  2455994898,
  1729034894,
  1080033504,
  976866871,
  3556439503,
  2881648439,
  1522871579,
  1555064734,
  1336096578,
  3548522304,
  2579274686,
  3574697629,
  3205460757,
  3593280638,
  3338716283,
  3079412587,
  564236357,
  2993598910,
  1781952180,
  1464380207,
  3163844217,
  3332601554,
  1699332808,
  1393555694,
  1183702653,
  3581086237,
  1288719814,
  691649499,
  2847557200,
  2895455976,
  3193889540,
  2717570544,
  1781354906,
  1676643554,
  2592534050,
  3230253752,
  1126444790,
  2770207658,
  2633158820,
  2210423226,
  2615765581,
  2414155088,
  3127139286,
  673620729,
  2805611233,
  1269405062,
  4015350505,
  3341807571,
  4149409754,
  1057255273,
  2012875353,
  2162469141,
  2276492801,
  2601117357,
  993977747,
  3918593370,
  2654263191,
  753973209,
  36408145,
  2530585658,
  25011837,
  3520020182,
  2088578344,
  530523599,
  2918365339,
  1524020338,
  1518925132,
  3760827505,
  3759777254,
  1202760957,
  3985898139,
  3906192525,
  674977740,
  4174734889,
  2031300136,
  2019492241,
  3983892565,
  4153806404,
  3822280332,
  352677332,
  2297720250,
  60907813,
  90501309,
  3286998549,
  1016092578,
  2535922412,
  2839152426,
  457141659,
  509813237,
  4120667899,
  652014361,
  1966332200,
  2975202805,
  55981186,
  2327461051,
  676427537,
  3255491064,
  2882294119,
  3433927263,
  1307055953,
  942726286,
  933058658,
  2468411793,
  3933900994,
  4215176142,
  1361170020,
  2001714738,
  2830558078,
  3274259782,
  1222529897,
  1679025792,
  2729314320,
  3714953764,
  1770335741,
  151462246,
  3013232138,
  1682292957,
  1483529935,
  471910574,
  1539241949,
  458788160,
  3436315007,
  1807016891,
  3718408830,
  978976581,
  1043663428,
  3165965781,
  1927990952,
  4200891579,
  2372276910,
  3208408903,
  3533431907,
  1412390302,
  2931980059,
  4132332400,
  1947078029,
  3881505623,
  4168226417,
  2941484381,
  1077988104,
  1320477388,
  886195818,
  18198404,
  3786409e3,
  2509781533,
  112762804,
  3463356488,
  1866414978,
  891333506,
  18488651,
  661792760,
  1628790961,
  3885187036,
  3141171499,
  876946877,
  2693282273,
  1372485963,
  791857591,
  2686433993,
  3759982718,
  3167212022,
  3472953795,
  2716379847,
  445679433,
  3561995674,
  3504004811,
  3574258232,
  54117162,
  3331405415,
  2381918588,
  3769707343,
  4154350007,
  1140177722,
  4074052095,
  668550556,
  3214352940,
  367459370,
  261225585,
  2610173221,
  4209349473,
  3468074219,
  3265815641,
  314222801,
  3066103646,
  3808782860,
  282218597,
  3406013506,
  3773591054,
  379116347,
  1285071038,
  846784868,
  2669647154,
  3771962079,
  3550491691,
  2305946142,
  453669953,
  1268987020,
  3317592352,
  3279303384,
  3744833421,
  2610507566,
  3859509063,
  266596637,
  3847019092,
  517658769,
  3462560207,
  3443424879,
  370717030,
  4247526661,
  2224018117,
  4143653529,
  4112773975,
  2788324899,
  2477274417,
  1456262402,
  2901442914,
  1517677493,
  1846949527,
  2295493580,
  3734397586,
  2176403920,
  1280348187,
  1908823572,
  3871786941,
  846861322,
  1172426758,
  3287448474,
  3383383037,
  1655181056,
  3139813346,
  901632758,
  1897031941,
  2986607138,
  3066810236,
  3447102507,
  1393639104,
  373351379,
  950779232,
  625454576,
  3124240540,
  4148612726,
  2007998917,
  544563296,
  2244738638,
  2330496472,
  2058025392,
  1291430526,
  424198748,
  50039436,
  29584100,
  3605783033,
  2429876329,
  2791104160,
  1057563949,
  3255363231,
  3075367218,
  3463963227,
  1469046755,
  985887462
];
var C_ORIG = [
  1332899944,
  1700884034,
  1701343084,
  1684370003,
  1668446532,
  1869963892
];
function _encipher(lr2, off, P2, S2) {
  var n, l = lr2[off], r = lr2[off + 1];
  l ^= P2[0];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[1];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[2];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[3];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[4];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[5];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[6];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[7];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[8];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[9];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[10];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[11];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[12];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[13];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[14];
  n = S2[l >>> 24];
  n += S2[256 | l >> 16 & 255];
  n ^= S2[512 | l >> 8 & 255];
  n += S2[768 | l & 255];
  r ^= n ^ P2[15];
  n = S2[r >>> 24];
  n += S2[256 | r >> 16 & 255];
  n ^= S2[512 | r >> 8 & 255];
  n += S2[768 | r & 255];
  l ^= n ^ P2[16];
  lr2[off] = r ^ P2[BLOWFISH_NUM_ROUNDS + 1];
  lr2[off + 1] = l;
  return lr2;
}
function _streamtoword(data, offp) {
  for (var i = 0, word = 0; i < 4; ++i)
    word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
  return { key: word, offp };
}
function _key(key, P2, S2) {
  var offset = 0, lr2 = [0, 0], plen = P2.length, slen = S2.length, sw;
  for (var i = 0; i < plen; i++)
    sw = _streamtoword(key, offset), offset = sw.offp, P2[i] = P2[i] ^ sw.key;
  for (i = 0; i < plen; i += 2)
    lr2 = _encipher(lr2, 0, P2, S2), P2[i] = lr2[0], P2[i + 1] = lr2[1];
  for (i = 0; i < slen; i += 2)
    lr2 = _encipher(lr2, 0, P2, S2), S2[i] = lr2[0], S2[i + 1] = lr2[1];
}
function _ekskey(data, key, P2, S2) {
  var offp = 0, lr2 = [0, 0], plen = P2.length, slen = S2.length, sw;
  for (var i = 0; i < plen; i++)
    sw = _streamtoword(key, offp), offp = sw.offp, P2[i] = P2[i] ^ sw.key;
  offp = 0;
  for (i = 0; i < plen; i += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr2[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr2[1] ^= sw.key, lr2 = _encipher(lr2, 0, P2, S2), P2[i] = lr2[0], P2[i + 1] = lr2[1];
  for (i = 0; i < slen; i += 2)
    sw = _streamtoword(data, offp), offp = sw.offp, lr2[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr2[1] ^= sw.key, lr2 = _encipher(lr2, 0, P2, S2), S2[i] = lr2[0], S2[i + 1] = lr2[1];
}
function _crypt(b2, salt, rounds, callback, progressCallback) {
  var cdata = C_ORIG.slice(), clen = cdata.length, err2;
  if (rounds < 4 || rounds > 31) {
    err2 = Error("Illegal number of rounds (4-31): " + rounds);
    if (callback) {
      nextTick(callback.bind(this, err2));
      return;
    } else throw err2;
  }
  if (salt.length !== BCRYPT_SALT_LEN) {
    err2 = Error(
      "Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN
    );
    if (callback) {
      nextTick(callback.bind(this, err2));
      return;
    } else throw err2;
  }
  rounds = 1 << rounds >>> 0;
  var P2, S2, i = 0, j2;
  if (typeof Int32Array === "function") {
    P2 = new Int32Array(P_ORIG);
    S2 = new Int32Array(S_ORIG);
  } else {
    P2 = P_ORIG.slice();
    S2 = S_ORIG.slice();
  }
  _ekskey(salt, b2, P2, S2);
  function next() {
    if (progressCallback) progressCallback(i / rounds);
    if (i < rounds) {
      var start = Date.now();
      for (; i < rounds; ) {
        i = i + 1;
        _key(b2, P2, S2);
        _key(salt, P2, S2);
        if (Date.now() - start > MAX_EXECUTION_TIME) break;
      }
    } else {
      for (i = 0; i < 64; i++)
        for (j2 = 0; j2 < clen >> 1; j2++) _encipher(cdata, j2 << 1, P2, S2);
      var ret = [];
      for (i = 0; i < clen; i++)
        ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
      if (callback) {
        callback(null, ret);
        return;
      } else return ret;
    }
    if (callback) nextTick(next);
  }
  if (typeof callback !== "undefined") {
    next();
  } else {
    var res;
    while (true) if (typeof (res = next()) !== "undefined") return res || [];
  }
}
function _hash(password, salt, callback, progressCallback) {
  var err2;
  if (typeof password !== "string" || typeof salt !== "string") {
    err2 = Error("Invalid string / salt: Not a string");
    if (callback) {
      nextTick(callback.bind(this, err2));
      return;
    } else throw err2;
  }
  var minor, offset;
  if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
    err2 = Error("Invalid salt version: " + salt.substring(0, 2));
    if (callback) {
      nextTick(callback.bind(this, err2));
      return;
    } else throw err2;
  }
  if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
  else {
    minor = salt.charAt(2);
    if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
      err2 = Error("Invalid salt revision: " + salt.substring(2, 4));
      if (callback) {
        nextTick(callback.bind(this, err2));
        return;
      } else throw err2;
    }
    offset = 4;
  }
  if (salt.charAt(offset + 2) > "$") {
    err2 = Error("Missing salt rounds");
    if (callback) {
      nextTick(callback.bind(this, err2));
      return;
    } else throw err2;
  }
  var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
  password += minor >= "a" ? "\0" : "";
  var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
  function finish(bytes) {
    var res = [];
    res.push("$2");
    if (minor >= "a") res.push(minor);
    res.push("$");
    if (rounds < 10) res.push("0");
    res.push(rounds.toString());
    res.push("$");
    res.push(base64_encode(saltb, saltb.length));
    res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
    return res.join("");
  }
  if (typeof callback == "undefined")
    return finish(_crypt(passwordb, saltb, rounds));
  else {
    _crypt(
      passwordb,
      saltb,
      rounds,
      function(err3, bytes) {
        if (err3) callback(err3, null);
        else callback(null, finish(bytes));
      },
      progressCallback
    );
  }
}
function encodeBase64(bytes, length) {
  return base64_encode(bytes, length);
}
function decodeBase64(string, length) {
  return base64_decode(string, length);
}
var bcryptjs_default = {
  setRandomFallback,
  genSaltSync,
  genSalt,
  hashSync,
  hash,
  compareSync,
  compare,
  getRounds,
  getSalt,
  truncates,
  encodeBase64,
  decodeBase64
};

// src/controllers/auth.ts
var app = new Hono2();
app.post("/login", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const prisma = getPrisma(c);
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user || !bcryptjs_default.compareSync(password, user.passwordHash)) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    if (user.status !== "ACTIVE") {
      return c.json({ error: "\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u914D\u7F6E\u4F7F\u7528\u6743\u9650" }, 403);
    }
    if (user.validUntil && new Date(user.validUntil) < /* @__PURE__ */ new Date()) {
      await prisma.user.update({
        where: { id: user.id },
        data: { status: "DISABLED" }
      });
      return c.json({ error: "\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u914D\u7F6E\u4F7F\u7528\u6743\u9650" }, 403);
    }
    return c.json({
      status: "ok",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.companyName,
        companyCode: user.companyCode,
        permissions: user.permissions,
        // @ts-ignore: IDE cache issue
        validUntil: user.validUntil,
        // @ts-ignore: IDE cache issue
        subscription: user.subscription
      }
    });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
app.post("/register", async (c) => {
  try {
    const { username, password, companyName } = await c.req.json();
    if (!username || !password) {
      return c.json({ error: "Username and password are required" }, 400);
    }
    const prisma = getPrisma(c);
    const hashedPassword = bcryptjs_default.hashSync(password, 10);
    const companyCode = `ENT-${Math.floor(1e5 + Math.random() * 9e5)}`;
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
        companyName,
        companyCode,
        role: "ENTERPRISE_ADMIN",
        status: "ACTIVE"
      }
    });
    return c.json({
      status: "ok",
      data: {
        id: user.id,
        username: user.username,
        companyName: user.companyName,
        companyCode: user.companyCode
      }
    });
  } catch (e) {
    if (e.code === "P2002") {
      return c.json({ error: "Username already exists" }, 400);
    }
    return c.json({ error: e.message }, 500);
  }
});
app.post("/change-password", async (c) => {
  try {
    const { username, oldPassword, newPassword } = await c.req.json();
    if (!username || !oldPassword || !newPassword) {
      return c.json({ error: "Username, old password and new password are required" }, 400);
    }
    const prisma = getPrisma(c);
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user || !bcryptjs_default.compareSync(oldPassword, user.passwordHash)) {
      return c.json({ error: "Invalid old password" }, 401);
    }
    const hashedPassword = bcryptjs_default.hashSync(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword }
    });
    return c.json({ status: "ok", message: "Password changed successfully" });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
var auth_default = app;

// src/controllers/user.ts
var app2 = new Hono2();
app2.get("/", async (c) => {
  try {
    const prisma = getPrisma(c);
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        companyName: true,
        companyCode: true,
        status: true,
        createdAt: true,
        phone: true,
        realName: true,
        subscription: true,
        validUntil: true
        // Exclude passwordHash
      }
    });
    return c.json({ status: "ok", data: users });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
app2.post("/apply", async (c) => {
  try {
    const { companyName, realName, phone } = await c.req.json();
    if (!companyName || !realName || !phone) {
      return c.json({ error: "All fields are required" }, 400);
    }
    const prisma = getPrisma(c);
    const defaultPassword = phone.slice(-6);
    const hashedPassword = bcryptjs_default.hashSync(defaultPassword, 10);
    const companyCode = `ENT-${Math.floor(1e5 + Math.random() * 9e5)}`;
    const userData = {
      username: phone,
      // Login with phone
      passwordHash: hashedPassword,
      role: "ENTERPRISE_ADMIN",
      companyName,
      companyCode,
      // @ts-ignore: IDE cache issue
      contactPerson: realName,
      contactPhone: phone,
      realName,
      phone,
      status: "PENDING_APPROVAL",
      // @ts-ignore: IDE cache issue
      subscription: "FREE"
      // Default
    };
    const user = await prisma.user.create({
      data: userData
    });
    return c.json({
      status: "ok",
      data: {
        id: user.id,
        username: user.username,
        status: user.status
      }
    });
  } catch (e) {
    if (e.code === "P2002") {
      return c.json({ error: "Phone number already registered" }, 400);
    }
    return c.json({ error: e.message }, 500);
  }
});
app2.post("/", async (c) => {
  try {
    const { username, password, role, companyName } = await c.req.json();
    if (!username || !password || !role) {
      return c.json({ error: "Username, password and role are required" }, 400);
    }
    const prisma = getPrisma(c);
    const hashedPassword = bcryptjs_default.hashSync(password, 10);
    const companyCode = role === "ENTERPRISE_ADMIN" ? `ENT-${Math.floor(1e5 + Math.random() * 9e5)}` : void 0;
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashedPassword,
        role,
        // 'SUPER_ADMIN' or 'ENTERPRISE_ADMIN'
        companyName: companyName || (role === "SUPER_ADMIN" ? "TaxMaster Admin" : void 0),
        companyCode,
        status: "ACTIVE"
      }
    });
    return c.json({
      status: "ok",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.companyName,
        companyCode: user.companyCode
      }
    });
  } catch (e) {
    if (e.code === "P2002") {
      return c.json({ error: "Username already exists" }, 400);
    }
    return c.json({ error: e.message }, 500);
  }
});
app2.put("/:id", async (c) => {
  try {
    const id2 = c.req.param("id");
    const { companyName, status, subscription, validUntil } = await c.req.json();
    const prisma = getPrisma(c);
    const user = await prisma.user.update({
      where: { id: id2 },
      data: {
        companyName,
        status,
        // @ts-ignore: IDE cache issue
        subscription,
        validUntil: validUntil ? new Date(validUntil) : void 0
      }
    });
    return c.json({
      status: "ok",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.companyName,
        status: user.status,
        subscription: user.subscription,
        validUntil: user.validUntil
      }
    });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
app2.put("/:id/password", async (c) => {
  try {
    const id2 = c.req.param("id");
    const { newPassword } = await c.req.json();
    if (!newPassword) {
      return c.json({ error: "New password is required" }, 400);
    }
    const prisma = getPrisma(c);
    const hashedPassword = bcryptjs_default.hashSync(newPassword, 10);
    await prisma.user.update({
      where: { id: id2 },
      data: {
        passwordHash: hashedPassword
      }
    });
    return c.json({ status: "ok", message: "Password updated successfully" });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
app2.delete("/:id", async (c) => {
  try {
    const id2 = c.req.param("id");
    const prisma = getPrisma(c);
    await prisma.taxRecord.deleteMany({
      where: { enterpriseId: id2 }
    });
    await prisma.employee.deleteMany({
      where: { enterpriseId: id2 }
    });
    await prisma.uploadBatch.deleteMany({
      where: { enterpriseId: id2 }
    });
    await prisma.auditLog.deleteMany({
      where: { userId: id2 }
    });
    await prisma.user.delete({
      where: { id: id2 }
    });
    return c.json({ status: "ok", message: "User deleted successfully" });
  } catch (e) {
    console.error("Delete user error:", e);
    return c.json({ error: e.message }, 500);
  }
});
var user_default = app2;

// src/controllers/notification.ts
var app3 = new Hono2();
app3.get("/", async (c) => {
  const userId = c.req.query("userId");
  if (!userId) {
    return c.json({ error: "User ID is required" }, 400);
  }
  const prisma = getPrisma(c);
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { userId },
          { userId: null }
          // Global notifications
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return c.json({ status: "ok", data: notifications });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
app3.post("/", async (c) => {
  const body = await c.req.json();
  const { title, content, type, targetUserId } = body;
  if (!title || !content) {
    return c.json({ error: "Title and content are required" }, 400);
  }
  const prisma = getPrisma(c);
  try {
    if (targetUserId) {
      const user = await prisma.user.findUnique({ where: { id: targetUserId } });
      if (!user) {
        return c.json({ error: "Target user not found" }, 404);
      }
    }
    const notification = await prisma.notification.create({
      data: {
        title,
        content,
        type: type || "SYSTEM",
        userId: targetUserId || null
      }
    });
    return c.json({ status: "ok", data: notification });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
app3.put("/:id/read", async (c) => {
  const id2 = c.req.param("id");
  const prisma = getPrisma(c);
  try {
    const notification = await prisma.notification.update({
      where: { id: id2 },
      data: { isRead: true }
    });
    return c.json({ status: "ok", data: notification });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
app3.delete("/:id", async (c) => {
  const id2 = c.req.param("id");
  const prisma = getPrisma(c);
  try {
    await prisma.notification.delete({
      where: { id: id2 }
    });
    return c.json({ status: "ok", message: "Notification deleted" });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});
var notification_default = app3;

// src/controllers/tax.ts
var generateUserCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `UID-${result}`;
};
var retryTransaction = async (fn2, retries = 3, delay = 100) => {
  try {
    return await fn2();
  } catch (error) {
    if (retries > 0 && (error?.message?.includes("SQLITE_BUSY") || error?.message?.includes("database is locked"))) {
      console.log(`[SQLite] Database locked, retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryTransaction(fn2, retries - 1, delay * 2);
    }
    throw error;
  }
};
var taxController = {
  // Upload a batch of records
  uploadBatch: async (c) => {
    const prisma = getPrisma(c);
    try {
      const body = await c.req.json();
      const { enterpriseId, batchId, records, fileName } = body;
      if (!enterpriseId || !batchId || !records || !Array.isArray(records)) {
        return c.json({ error: "Invalid input data" }, 400);
      }
      const totalRecords = records.length;
      const totalAmount = records.reduce((sum, r) => sum + Number(r.income), 0);
      const batch = await prisma.uploadBatch.upsert({
        where: { id: batchId },
        create: {
          id: batchId,
          // Use provided batchId or generate one
          enterpriseId,
          fileName: fileName || `Batch-${batchId}`,
          totalRecords,
          totalAmount,
          status: "SUCCESS",
          uploadTime: /* @__PURE__ */ new Date()
        },
        update: {
          totalRecords: { increment: totalRecords },
          totalAmount: { increment: totalAmount }
        }
      });
      const employeeMap = /* @__PURE__ */ new Map();
      const allIdNumbers = [];
      records.forEach((r) => {
        const key = `${enterpriseId}-${r.idNumber}`;
        if (!employeeMap.has(key)) {
          employeeMap.set(key, {
            enterpriseId,
            name: r.name,
            idNumber: r.idNumber,
            code: generateUserCode()
            // Generate User ID Code
          });
          allIdNumbers.push(r.idNumber);
        }
      });
      const existingEmployees = [];
      const employeesToUpdateInUpload = [];
      const FIND_CHUNK_SIZE = 50;
      for (let i = 0; i < allIdNumbers.length; i += FIND_CHUNK_SIZE) {
        const chunk = allIdNumbers.slice(i, i + FIND_CHUNK_SIZE);
        const found = await prisma.employee.findMany({
          where: {
            enterpriseId,
            idNumber: { in: chunk }
          },
          select: { id: true, idNumber: true, code: true }
        });
        found.forEach((e) => {
          if (!e.code) {
            e.code = generateUserCode();
            employeesToUpdateInUpload.push({ id: e.id, code: e.code });
          }
        });
        existingEmployees.push(...found);
      }
      if (employeesToUpdateInUpload.length > 0) {
        const UPDATE_CHUNK = 10;
        for (let i = 0; i < employeesToUpdateInUpload.length; i += UPDATE_CHUNK) {
          const chunk = employeesToUpdateInUpload.slice(i, i + UPDATE_CHUNK);
          await retryTransaction(async () => {
            await prisma.$transaction(
              chunk.map((e) => prisma.employee.update({
                where: { id: e.id },
                data: { code: e.code }
              }))
            );
          });
        }
      }
      const existingIdSet = new Set(existingEmployees.map((e) => e.idNumber));
      const newEmployees = Array.from(employeeMap.values()).filter((e) => !existingIdSet.has(e.idNumber));
      if (newEmployees.length > 0) {
        const EMP_CREATE_CHUNK = 20;
        for (let i = 0; i < newEmployees.length; i += EMP_CREATE_CHUNK) {
          const chunk = newEmployees.slice(i, i + EMP_CREATE_CHUNK);
          await retryTransaction(async () => {
            const createdEmployees = await prisma.$transaction(
              chunk.map((employeeData) => prisma.employee.create({ data: employeeData }))
            );
            existingEmployees.push(...createdEmployees);
          });
        }
      }
      const empIdMap = /* @__PURE__ */ new Map();
      existingEmployees.forEach((e) => empIdMap.set(e.idNumber, e.id));
      console.log(`[API] Mapped ${empIdMap.size} employees`);
      const taxRecordsData = records.map((r) => {
        const employeeId = empIdMap.get(r.idNumber);
        if (!employeeId) {
          console.warn(`Skipping record for ${r.idNumber}: Employee ID not found after creation`);
          return null;
        }
        return {
          enterpriseId,
          employeeId,
          batchId: batch.id,
          period: r.date.substring(0, 7),
          paymentDate: new Date(r.date),
          income: r.income,
          taxableIncome: r.segmentCumulativeTaxableIncome || 0,
          taxRate: r.taxRate || 0,
          quickDeduction: r.quickDeduction || 0,
          taxPayable: r.segmentTotalTax || 0,
          taxPaid: r.segmentPriorTaxPaid || 0,
          currentTax: r.currentTax,
          afterTaxIncome: r.afterTaxIncome,
          isNewSegment: false
        };
      }).filter((r) => r !== null);
      console.log(`[API] Prepared ${taxRecordsData.length} tax records to save`);
      const RECORD_BATCH_SIZE = 20;
      for (let i = 0; i < taxRecordsData.length; i += RECORD_BATCH_SIZE) {
        const chunk = taxRecordsData.slice(i, i + RECORD_BATCH_SIZE);
        await retryTransaction(async () => {
          await prisma.$transaction(
            chunk.map((recordData) => prisma.taxRecord.create({ data: recordData }))
          );
        });
      }
      return c.json({ status: "ok", batchId: batch.id });
    } catch (e) {
      console.error("Upload error:", e);
      return c.json({ error: e.message }, 500);
    }
  },
  // Get all records for a company (or all for super admin if no companyId filtered)
  getRecords: async (c) => {
    const prisma = getPrisma(c);
    const companyId = c.req.query("companyId");
    console.log(`[API] getRecords called for companyId: ${companyId}`);
    try {
      const where = companyId ? { enterpriseId: companyId } : {};
      const records = await prisma.taxRecord.findMany({
        where,
        orderBy: { paymentDate: "desc" }
      });
      console.log(`[API] Found ${records.length} records. Fetching employees...`);
      const employeeIds = /* @__PURE__ */ new Set();
      records.forEach((r) => {
        if (r.employeeId) employeeIds.add(r.employeeId);
      });
      const uniqueEmpIds = Array.from(employeeIds);
      console.log(`[API] Unique employees to fetch: ${uniqueEmpIds.length}`);
      const employeeMap = /* @__PURE__ */ new Map();
      const CHUNK_SIZE = 50;
      console.log(`[API] Fetching ${uniqueEmpIds.length} employees in chunks of ${CHUNK_SIZE}`);
      const employeesToUpdate = [];
      for (let i = 0; i < uniqueEmpIds.length; i += CHUNK_SIZE) {
        const chunk = uniqueEmpIds.slice(i, i + CHUNK_SIZE);
        try {
          const employees = await prisma.employee.findMany({
            where: { id: { in: chunk } },
            select: { id: true, name: true, idNumber: true, code: true }
          });
          employees.forEach((e) => {
            if (!e.code) {
              e.code = generateUserCode();
              employeesToUpdate.push({ id: e.id, code: e.code });
            }
            employeeMap.set(e.id, e);
          });
        } catch (chunkError) {
          console.error(`[API] Error fetching employee chunk ${i / CHUNK_SIZE}:`, chunkError);
        }
      }
      if (employeesToUpdate.length > 0) {
        console.log(`[API] Backfilling codes for ${employeesToUpdate.length} employees...`);
        const UPDATE_CHUNK = 20;
        for (let i = 0; i < employeesToUpdate.length; i += UPDATE_CHUNK) {
          const chunk = employeesToUpdate.slice(i, i + UPDATE_CHUNK);
          await prisma.$transaction(
            chunk.map((e) => prisma.employee.update({
              where: { id: e.id },
              data: { code: e.code }
            }))
          );
        }
      }
      const formatted = records.map((r) => {
        const emp = employeeMap.get(r.employeeId);
        return {
          id: r.id,
          companyId: r.enterpriseId,
          date: r.paymentDate.toISOString().split("T")[0],
          name: emp?.name || "Unknown",
          idNumber: emp?.idNumber || "Unknown",
          employeeCode: emp?.code || "-",
          // Return Employee Code
          income: Number(r.income),
          batchId: r.batchId,
          // Restore calculation fields if possible, or just basic ones
          currentTax: Number(r.currentTax),
          afterTaxIncome: Number(r.afterTaxIncome),
          taxRate: Number(r.taxRate),
          quickDeduction: Number(r.quickDeduction),
          segmentCumulativeTaxableIncome: Number(r.taxableIncome),
          segmentTotalTax: Number(r.taxPayable),
          segmentPriorTaxPaid: Number(r.taxPaid),
          paymentMonth: r.period
          // Approximation
        };
      });
      return c.json(formatted);
    } catch (e) {
      console.error("[API] getRecords Error:", e);
      return c.json({ error: e.message }, 500);
    }
  },
  // Delete a batch
  deleteBatch: async (c) => {
    const prisma = getPrisma(c);
    const batchId = c.req.param("id");
    try {
      const deletedRecords = await prisma.taxRecord.deleteMany({
        where: { batchId }
      });
      console.log(`[API] Deleted ${deletedRecords.count} records for batch ${batchId}`);
      await prisma.uploadBatch.delete({
        where: { id: batchId }
      });
      console.log(`[API] Deleted batch metadata for ${batchId}`);
      return c.json({ status: "ok" });
    } catch (e) {
      console.error(`[API] Delete batch failed:`, e);
      return c.json({ error: e.message }, 500);
    }
  }
};

// src/worker.ts
var app4 = new Hono2();
app4.use("/*", cors());
app4.route("/api/auth", auth_default);
app4.route("/api/users", user_default);
app4.route("/api/notifications", notification_default);
app4.post("/api/tax/upload", taxController.uploadBatch);
app4.get("/api/tax/records", taxController.getRecords);
app4.delete("/api/tax/batch/:id", taxController.deleteBatch);
app4.get("/api/health", (c) => {
  return c.json({ status: "ok", message: "TaxMaster API Health Check OK" });
});
app4.get("/api/test-db", async (c) => {
  const prisma = getPrisma(c);
  try {
    const count = await prisma.user.count();
    return c.json({ status: "ok", count, message: "DB Connection Successful" });
  } catch (e) {
    return c.json({ status: "error", message: e.message }, 500);
  }
});
var worker_default = app4;

// src/index.ts
var import_dotenv = __toESM(require_main(), 1);
var import_promises = require("fs/promises");
(0, import_dotenv.config)();
var port = Number(process.env.PORT) || 3e3;
var app5 = new Hono2();
app5.route("/", worker_default);
app5.use("/*", serveStatic({ root: "./dist" }));
app5.get("*", async (c) => {
  if (c.req.path.startsWith("/api")) {
    return c.notFound();
  }
  try {
    const indexHtml = await (0, import_promises.readFile)("./dist/index.html", "utf-8");
    return c.html(indexHtml);
  } catch (e) {
    return c.text("Frontend build not found. Please run `npm run build` first.", 404);
  }
});
console.log(`Server is running on port ${port}`);
serve({
  fetch: app5.fetch,
  port
});
/*! Bundled license information:

@prisma/client/runtime/library.js:
  (*! Bundled license information:
  
  decimal.js/decimal.mjs:
    (*!
     *  decimal.js v10.4.3
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Licence
     *)
  *)
*/
