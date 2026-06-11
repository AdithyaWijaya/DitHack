((function (_0x1bb1bd, _0x5e9502) {
  const _0x510678 = a0_0x50c6,
    _0x4335ed = _0x1bb1bd();
  while (!![]) {
    try {
      const _0x142631 =
        parseInt(_0x510678(0x2f1)) / 0x1 +
        (parseInt(_0x510678(0x1ea)) / 0x2) *
          (-parseInt(_0x510678(0x2be)) / 0x3) +
        (-parseInt(_0x510678(0x2d7)) / 0x4) *
          (-parseInt(_0x510678(0x275)) / 0x5) +
        -parseInt(_0x510678(0x23d)) / 0x6 +
        parseInt(_0x510678(0x208)) / 0x7 +
        (parseInt(_0x510678(0x221)) / 0x8) *
          (parseInt(_0x510678(0x1b7)) / 0x9) +
        -parseInt(_0x510678(0x2b1)) / 0xa;
      if (_0x142631 === _0x5e9502) break;
      else _0x4335ed["push"](_0x4335ed["shift"]());
    } catch (_0x2aca01) {
      _0x4335ed["push"](_0x4335ed["shift"]());
    }
  }
})(a0_0x1fb2, 0xd1e84),
  (function () {
    "use strict";
    const _0x595930 = a0_0x50c6;
    const _0xed865b = "https://api-dithack.up.railway.app",
      _0x344323 = _0x595930(0x270);
    function _0x340986() {
      const _0x153b6f = _0x595930;
      let _0x5d12fb = localStorage[_0x153b6f(0x21c)](_0x344323);
      if (_0x5d12fb) return _0x5d12fb;
      return (
        window[_0x153b6f(0x1cd)] && crypto[_0x153b6f(0x2b3)]
          ? (_0x5d12fb = crypto["randomUUID"]())
          : (_0x5d12fb =
              _0x153b6f(0x1ff) +
              Date[_0x153b6f(0x1d7)]()["toString"](0x24) +
              "-" +
              Math["random"]()[_0x153b6f(0x2d2)](0x24)["slice"](0x2, 0xc)),
        localStorage[_0x153b6f(0x1ca)](_0x344323, _0x5d12fb),
        _0x5d12fb
      );
    }
    function _0x19917c() {
      const _0xb39536 = _0x595930;
      return {
        Authorization:
          _0xb39536(0x230) + localStorage[_0xb39536(0x21c)](_0xb39536(0x285)),
        "x-device-id": _0x340986(),
      };
    }
    function _0x92c9ce() {
      const _0x279f0a = _0x595930;
      if (document[_0x279f0a(0x1cb)](_0x279f0a(0x2ca))) return;
      const _0x4cc664 = document[_0x279f0a(0x2c6)](_0x279f0a(0x1e2));
      ((_0x4cc664["id"] = _0x279f0a(0x2ca)),
        (_0x4cc664[_0x279f0a(0x1c9)] = _0x279f0a(0x1bb)),
        (_0x4cc664[_0x279f0a(0x1f1)] =
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"),
        document[_0x279f0a(0x2cd)][_0x279f0a(0x1ce)](_0x4cc664));
    }
    async function _0x1b8075(_0x5447e4) {
      const _0x583330 = _0x595930;
      try {
        const _0x3acc4a = await _0x5447e4[_0x583330(0x236)]();
        return (
          _0x3acc4a["detail"] || _0x3acc4a[_0x583330(0x20d)] || _0x583330(0x232)
        );
      } catch (_0x4aac21) {
        return _0x583330(0x232);
      }
    }
    async function _0x2bb374(_0x49188c) {
      const _0x11c164 = _0x595930;
      try {
        const _0xf14065 = await fetch(
          _0xed865b + "/check/" + encodeURIComponent(_0x49188c),
          { headers: { "x-device-id": _0x340986() } },
        );
        if (_0xf14065[_0x11c164(0x2ff)] === 0x194)
          return { valid: ![], message: "Token\x20tidak\x20valid!" };
        if (_0xf14065["status"] === 0x199)
          return { valid: ![], message: _0x11c164(0x205) };
        if (!_0xf14065["ok"])
          return { valid: ![], message: await _0x1b8075(_0xf14065) };
        const _0x4b8f56 = await _0xf14065[_0x11c164(0x236)](),
          _0x364bfd = new Date(_0x4b8f56[_0x11c164(0x255)]),
          _0x4a9ebf = new Date();
        if (!_0x4b8f56[_0x11c164(0x1c4)])
          return { valid: ![], message: _0x11c164(0x1c6) };
        if (_0x364bfd < _0x4a9ebf)
          return {
            valid: ![],
            message:
              "Token\x20sudah\x20expired\x20pada\x20" +
              _0x4b8f56[_0x11c164(0x255)],
          };
        return {
          valid: !![],
          message: _0x11c164(0x2a5) + _0x4b8f56[_0x11c164(0x26d)] + "!",
          owner: _0x4b8f56[_0x11c164(0x26d)],
        };
      } catch (_0x17d349) {
        return (
          console[_0x11c164(0x1fe)](_0x11c164(0x262), _0x17d349),
          { valid: ![], message: _0x11c164(0x2c9) }
        );
      }
    }
    function _0xc9efc8() {
      const _0x1c7d48 = _0x595930,
        _0x201a7d = document[_0x1c7d48(0x1cb)](_0x1c7d48(0x2c0));
      if (_0x201a7d) _0x201a7d[_0x1c7d48(0x1f0)]();
      _0x92c9ce();
      const _0x156770 = window[_0x1c7d48(0x1f4)] <= 0x1e0,
        _0x47842e = _0x156770 ? _0x1c7d48(0x20e) : _0x1c7d48(0x1fc),
        _0x391090 = _0x156770 ? _0x1c7d48(0x2f4) : _0x1c7d48(0x1fc),
        _0x1b3666 = _0x156770 ? _0x1c7d48(0x29c) : "13px",
        _0xf8ad9d = _0x156770 ? "8px\x2010px" : "10px\x2012px",
        _0xcfd868 = _0x156770 ? "8px" : _0x1c7d48(0x2a8),
        _0x12dc79 = _0x156770 ? _0x1c7d48(0x254) : "10px",
        _0x50a48d = _0x156770 ? _0x1c7d48(0x2df) : _0x1c7d48(0x25f),
        _0x2c997f = _0x156770 ? _0x1c7d48(0x25f) : _0x1c7d48(0x254),
        _0x16e7e9 = _0x156770 ? _0x1c7d48(0x29c) : _0x1c7d48(0x29b),
        _0x1183ad = document[_0x1c7d48(0x2c6)]("div");
      ((_0x1183ad["id"] = _0x1c7d48(0x2c0)),
        (_0x1183ad["style"][_0x1c7d48(0x226)] = _0x1c7d48(0x2e8)));
      const _0x2cb74d = document[_0x1c7d48(0x2c6)](_0x1c7d48(0x245));
      _0x2cb74d[_0x1c7d48(0x23c)][_0x1c7d48(0x226)] =
        _0x1c7d48(0x2ee) +
        _0x47842e +
        "\x20!important;\x20border-radius:\x2010px\x20!important;\x20text-align:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-width:\x20350px\x20!important;\x20width:\x2090%\x20!important;\x20box-shadow:\x200\x204px\x2020px\x20rgba(0,\x200,\x200,\x200.2)\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#ddd\x20!important;\x20height:\x20auto\x20!important;\x20min-height:\x20auto\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20";
      const _0x22695e = document[_0x1c7d48(0x2c6)]("h2");
      ((_0x22695e[_0x1c7d48(0x242)] = _0x1c7d48(0x210)),
        (_0x22695e["style"][_0x1c7d48(0x226)] =
          _0x1c7d48(0x2fd) +
          _0x16e7e9 +
          _0x1c7d48(0x1c7) +
          _0x391090 +
          _0x1c7d48(0x21a)));
      const _0x59bfab = document["createElement"]("input");
      ((_0x59bfab[_0x1c7d48(0x2fa)] = _0x1c7d48(0x2ed)),
        (_0x59bfab["id"] = _0x1c7d48(0x1f9)),
        (_0x59bfab[_0x1c7d48(0x2d9)] = _0x1c7d48(0x24d)),
        (_0x59bfab["style"]["cssText"] =
          _0x1c7d48(0x28f) +
          _0xf8ad9d +
          "\x20!important;\x20border-radius:\x206px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#000\x20!important;\x20background:\x20#fff\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#333\x20!important;\x20font-size:\x20" +
          _0x1b3666 +
          _0x1c7d48(0x25a) +
          _0x12dc79 +
          _0x1c7d48(0x2a9)));
      const _0x3c9b75 = document[_0x1c7d48(0x2c6)](_0x1c7d48(0x245));
      ((_0x3c9b75["id"] = _0x1c7d48(0x2e7)),
        (_0x3c9b75[_0x1c7d48(0x23c)][_0x1c7d48(0x226)] =
          _0x1c7d48(0x257) +
          _0x1b3666 +
          _0x1c7d48(0x1b9) +
          _0x50a48d +
          _0x1c7d48(0x1e7)));
      const _0x34cd13 = document[_0x1c7d48(0x2c6)]("button");
      ((_0x34cd13[_0x1c7d48(0x242)] = _0x1c7d48(0x295)),
        (_0x34cd13["id"] = "dithack-license-submit"),
        (_0x34cd13[_0x1c7d48(0x23c)][_0x1c7d48(0x226)] =
          _0x1c7d48(0x28f) +
          _0xcfd868 +
          _0x1c7d48(0x209) +
          _0x1b3666 +
          _0x1c7d48(0x25e)));
      const _0x2bf998 = document["createElement"]("p");
      return (
        (_0x2bf998[_0x1c7d48(0x2ae)] = _0x1c7d48(0x1bf)),
        (_0x2bf998[_0x1c7d48(0x23c)][_0x1c7d48(0x226)] =
          _0x1c7d48(0x271) +
          (_0x156770 ? "11px" : _0x1c7d48(0x29c)) +
          _0x1c7d48(0x1b9) +
          _0x2c997f +
          _0x1c7d48(0x2b7)),
        _0x2cb74d["appendChild"](_0x22695e),
        _0x2cb74d[_0x1c7d48(0x1ce)](_0x59bfab),
        _0x2cb74d[_0x1c7d48(0x1ce)](_0x34cd13),
        _0x2cb74d[_0x1c7d48(0x1ce)](_0x3c9b75),
        _0x2cb74d["appendChild"](_0x2bf998),
        _0x1183ad[_0x1c7d48(0x1ce)](_0x2cb74d),
        document["body"][_0x1c7d48(0x1ce)](_0x1183ad),
        (_0x34cd13[_0x1c7d48(0x1dd)] = async () => {
          const _0x2232bb = _0x1c7d48,
            _0x3ed7b0 = _0x59bfab[_0x2232bb(0x284)][_0x2232bb(0x1d3)]();
          if (!_0x3ed7b0) {
            ((_0x3c9b75[_0x2232bb(0x242)] =
              "Masukkan\x20Token\x20terlebih\x20dahulu!"),
              (_0x3c9b75[_0x2232bb(0x23c)][_0x2232bb(0x2c2)] = "#ff6b6b"));
            return;
          }
          ((_0x34cd13[_0x2232bb(0x242)] = _0x2232bb(0x1df)),
            (_0x34cd13[_0x2232bb(0x2fc)] = !![]),
            (_0x34cd13[_0x2232bb(0x23c)][_0x2232bb(0x2c3)] = "0.7"));
          const _0x5a5414 = await _0x2bb374(_0x3ed7b0);
          _0x5a5414[_0x2232bb(0x2d6)]
            ? ((_0x3c9b75[_0x2232bb(0x242)] = _0x5a5414[_0x2232bb(0x20d)]),
              (_0x3c9b75[_0x2232bb(0x23c)]["color"] = _0x2232bb(0x2af)),
              (_0x34cd13[_0x2232bb(0x242)] = _0x2232bb(0x2c8)),
              (_0x34cd13[_0x2232bb(0x23c)][_0x2232bb(0x23f)] =
                _0x2232bb(0x290)),
              localStorage[_0x2232bb(0x1ca)]("auth", _0x3ed7b0),
              setTimeout(() => {
                (_0x1183ad["remove"](), _0x56fb04());
              }, 0x5dc))
            : ((_0x3c9b75[_0x2232bb(0x242)] = _0x5a5414[_0x2232bb(0x20d)]),
              (_0x3c9b75[_0x2232bb(0x23c)]["color"] = _0x2232bb(0x2a2)),
              (_0x34cd13[_0x2232bb(0x242)] = _0x2232bb(0x295)),
              (_0x34cd13["disabled"] = ![]),
              (_0x34cd13[_0x2232bb(0x23c)][_0x2232bb(0x2c3)] = "1"));
        }),
        _0x59bfab[_0x1c7d48(0x2f3)](_0x1c7d48(0x2a4), (_0x2fadc6) => {
          const _0x3ad5b4 = _0x1c7d48;
          _0x2fadc6[_0x3ad5b4(0x25b)] === "Enter" && _0x34cd13["click"]();
        }),
        setTimeout(() => _0x59bfab[_0x1c7d48(0x27b)](), 0x64),
        _0x1183ad
      );
    }
    function _0x36dfe0() {
      _0xc9efc8();
    }
    const _0x49c4b5 = window[_0x595930(0x2f3)],
      _0x158a6f = document["addEventListener"],
      _0x52f1fd = EventTarget
        ? EventTarget["prototype"][_0x595930(0x2f3)]
        : null,
      _0x3f72e9 = [
        "blur",
        _0x595930(0x27b),
        _0x595930(0x258),
        "focusin",
        _0x595930(0x222),
        _0x595930(0x244),
        "fullscreenchange",
        _0x595930(0x2b0),
        _0x595930(0x2b9),
      ];
    (Object[_0x595930(0x217)](document, _0x595930(0x240), {
      get: function () {
        return ![];
      },
      configurable: ![],
    }),
      Object[_0x595930(0x217)](document, _0x595930(0x248), {
        get: function () {
          const _0xeab237 = _0x595930;
          return _0xeab237(0x298);
        },
        configurable: ![],
      }),
      Object[_0x595930(0x217)](document, _0x595930(0x239), {
        get: function () {
          return null;
        },
        set: function () {},
        configurable: ![],
      }),
      Object[_0x595930(0x217)](window, _0x595930(0x2e4), {
        get: function () {
          return function () {};
        },
        set: function () {},
        configurable: ![],
      }),
      Object[_0x595930(0x217)](window, _0x595930(0x253), {
        get: function () {
          return function () {};
        },
        set: function () {},
        configurable: ![],
      }),
      Object["defineProperty"](window, _0x595930(0x2d4), {
        get: function () {
          return function () {};
        },
        set: function () {},
        configurable: ![],
      }));
    let _0x23ce4d = window[_0x595930(0x1f4)],
      _0x15155d = window[_0x595930(0x22e)];
    (Object[_0x595930(0x217)](window, _0x595930(0x1f4), {
      get: function () {
        return _0x23ce4d;
      },
      configurable: !![],
    }),
      Object[_0x595930(0x217)](window, _0x595930(0x22e), {
        get: function () {
          return _0x15155d;
        },
        configurable: !![],
      }),
      Object[_0x595930(0x217)](window, _0x595930(0x214), {
        get: function () {
          return _0x23ce4d;
        },
        configurable: !![],
      }),
      Object[_0x595930(0x217)](window, "outerHeight", {
        get: function () {
          return _0x15155d;
        },
        configurable: !![],
      }),
      Object[_0x595930(0x217)](screen, _0x595930(0x264), {
        get: function () {
          return 0x780;
        },
        configurable: !![],
      }),
      Object[_0x595930(0x217)](screen, _0x595930(0x1d8), {
        get: function () {
          return 0x438;
        },
        configurable: !![],
      }),
      Object[_0x595930(0x217)](screen, _0x595930(0x2e6), {
        get: function () {
          return 0x780;
        },
        configurable: !![],
      }),
      Object[_0x595930(0x217)](screen, "availHeight", {
        get: function () {
          return 0x410;
        },
        configurable: !![],
      }),
      (window[_0x595930(0x272)] = function (_0xe14d6e, _0x464600) {
        const _0x39185d = _0x595930;
        ((_0x23ce4d = _0xe14d6e),
          (_0x15155d = _0x464600),
          console[_0x39185d(0x2ef)](
            _0x39185d(0x269) + _0xe14d6e + "x" + _0x464600,
          ));
      }),
      Object[_0x595930(0x217)](document, _0x595930(0x287), {
        get: function () {
          const _0x4b9ff7 = _0x595930;
          return document["createElement"](_0x4b9ff7(0x245));
        },
        configurable: ![],
      }),
      Object[_0x595930(0x217)](document, "fullscreenEnabled", {
        get: function () {
          return ![];
        },
        configurable: ![],
      }),
      Object[_0x595930(0x217)](document, _0x595930(0x28b), {
        get: function () {
          return function () {};
        },
        set: function () {},
        configurable: ![],
      }),
      Object[_0x595930(0x217)](document, _0x595930(0x2c1), {
        get: function () {
          return function () {};
        },
        set: function () {},
        configurable: ![],
      }),
      (Element["prototype"][_0x595930(0x2cb)] = function () {
        const _0x8fba63 = _0x595930;
        return Promise[_0x8fba63(0x2b4)](new Error(_0x8fba63(0x22f)));
      }),
      (document[_0x595930(0x249)] = function () {
        const _0x263c1c = _0x595930;
        return Promise[_0x263c1c(0x204)]();
      }));
    if (Element[_0x595930(0x211)]["webkitRequestFullscreen"])
      Element["prototype"][_0x595930(0x22d)] = function () {
        return Promise["reject"](new Error("Fullscreen\x20request\x20blocked"));
      };
    if (document[_0x595930(0x2d0)])
      document[_0x595930(0x2d0)] = function () {
        const _0x529a21 = _0x595930;
        return Promise[_0x529a21(0x204)]();
      };
    if (Element[_0x595930(0x211)]["mozRequestFullScreen"])
      Element["prototype"]["mozRequestFullScreen"] = function () {
        const _0x3fec21 = _0x595930;
        return Promise[_0x3fec21(0x2b4)](new Error(_0x3fec21(0x22f)));
      };
    if (document[_0x595930(0x243)])
      document[_0x595930(0x243)] = function () {
        return Promise["resolve"]();
      };
    if (Element[_0x595930(0x211)][_0x595930(0x2f6)])
      Element[_0x595930(0x211)][_0x595930(0x2f6)] = function () {
        const _0x2cc41f = _0x595930;
        return Promise[_0x2cc41f(0x2b4)](
          new Error("Fullscreen\x20request\x20blocked"),
        );
      };
    if (document[_0x595930(0x1ef)])
      document[_0x595930(0x1ef)] = function () {
        const _0x4f1624 = _0x595930;
        return Promise[_0x4f1624(0x204)]();
      };
    (Object["defineProperty"](document, _0x595930(0x2ce), {
      get: function () {
        return function () {};
      },
      set: function () {},
      configurable: ![],
    }),
      Object[_0x595930(0x217)](window, _0x595930(0x2ce), {
        get: function () {
          return function () {};
        },
        set: function () {},
        configurable: ![],
      }),
      (window[_0x595930(0x2f3)] = function (_0x140bcd, _0x2645d0, _0x1540ef) {
        const _0x26dac9 = _0x595930;
        if (_0x3f72e9["indexOf"](_0x140bcd) !== -0x1) return;
        return _0x49c4b5[_0x26dac9(0x1de)](
          this,
          _0x140bcd,
          _0x2645d0,
          _0x1540ef,
        );
      }),
      (document[_0x595930(0x2f3)] = function (_0x48fce0, _0x10d885, _0x37c161) {
        const _0x34ec47 = _0x595930;
        if (_0x3f72e9[_0x34ec47(0x2ea)](_0x48fce0) !== -0x1) return;
        return _0x158a6f[_0x34ec47(0x1de)](
          this,
          _0x48fce0,
          _0x10d885,
          _0x37c161,
        );
      }));
    EventTarget &&
      EventTarget["prototype"] &&
      _0x52f1fd &&
      (EventTarget[_0x595930(0x211)][_0x595930(0x2f3)] = function (
        _0x327dfc,
        _0x3ca414,
        _0x579cfb,
      ) {
        const _0x4c86cc = _0x595930;
        if (_0x3f72e9[_0x4c86cc(0x2ea)](_0x327dfc) !== -0x1) return;
        return _0x52f1fd[_0x4c86cc(0x1de)](
          this,
          _0x327dfc,
          _0x3ca414,
          _0x579cfb,
        );
      });
    console["log"](_0x595930(0x2e2));
    const _0x2a8d08 = document[_0x595930(0x1cb)]("quizizz-hack-frame");
    if (_0x2a8d08) _0x2a8d08[_0x595930(0x1f0)]();
    const _0x3b87d4 = document["getElementById"]("quizizz-hack-toggle");
    if (_0x3b87d4) _0x3b87d4[_0x595930(0x1f0)]();
    let _0x668de3 = null,
      _0x1bf2ff = ![],
      _0x2b3120 = _0x595930(0x20a);
    function _0x1b6ec9() {
      const _0x590b77 = _0x595930;
      _0x92c9ce();
      const _0x18c6eb = document[_0x590b77(0x2c6)]("div");
      _0x18c6eb["id"] = "quizizz-hack-frame";
      const _0x32a6a7 = window["innerWidth"] <= 0x300;
      Object[_0x590b77(0x1d0)](_0x18c6eb[_0x590b77(0x23c)], {
        position: _0x590b77(0x278),
        top: _0x32a6a7 ? _0x590b77(0x2a8) : _0x590b77(0x1b8),
        right: _0x32a6a7 ? "10px" : _0x590b77(0x1b8),
        left: _0x32a6a7 ? _0x590b77(0x2a8) : "auto",
        width: _0x32a6a7 ? "calc(100%\x20-\x2020px)" : _0x590b77(0x25d),
        maxHeight: _0x32a6a7 ? _0x590b77(0x1f5) : _0x590b77(0x2bf),
        height: _0x32a6a7 ? _0x590b77(0x223) : "500px",
        backgroundColor: _0x590b77(0x2c4),
        borderRadius: _0x32a6a7 ? _0x590b77(0x254) : "12px",
        border: _0x590b77(0x263),
        boxShadow: "0\x206px\x2020px\x20rgba(0,0,0,0.3)",
        zIndex: _0x590b77(0x206),
        display: _0x590b77(0x297),
        flexDirection: _0x590b77(0x2ad),
        overflow: _0x590b77(0x240),
        fontFamily: _0x590b77(0x28d),
      });
      const _0x1b6610 = document[_0x590b77(0x2c6)](_0x590b77(0x245));
      Object[_0x590b77(0x1d0)](_0x1b6610[_0x590b77(0x23c)], {
        height: _0x32a6a7 ? _0x590b77(0x288) : _0x590b77(0x219),
        minHeight: _0x32a6a7 ? _0x590b77(0x288) : _0x590b77(0x219),
        backgroundColor: _0x590b77(0x1b6),
        color: _0x590b77(0x2e9),
        display: _0x590b77(0x297),
        alignItems: _0x590b77(0x1db),
        justifyContent: _0x590b77(0x28a),
        padding: _0x32a6a7 ? _0x590b77(0x27c) : _0x590b77(0x292),
        cursor: _0x590b77(0x1d5),
        userSelect: _0x590b77(0x2eb),
        flexShrink: "0",
      });
      const _0x48af54 = document[_0x590b77(0x2c6)](_0x590b77(0x279));
      ((_0x48af54[_0x590b77(0x242)] = "DitHack!"),
        (_0x48af54[_0x590b77(0x23c)]["cssText"] =
          _0x590b77(0x1d9) +
          (_0x32a6a7 ? _0x590b77(0x29b) : _0x590b77(0x20e)) +
          _0x590b77(0x2fe)),
        _0x1b6610[_0x590b77(0x1ce)](_0x48af54));
      const _0x5970cd = document["createElement"]("button");
      ((_0x5970cd[_0x590b77(0x2fa)] = _0x590b77(0x2ec)),
        (_0x5970cd[_0x590b77(0x28c)] = _0x590b77(0x29e)),
        (_0x5970cd[_0x590b77(0x2ae)] = _0x590b77(0x1cf)),
        (_0x5970cd[_0x590b77(0x23c)][_0x590b77(0x226)] =
          "\x0a\x20\x20\x20\x20\x20\x20margin-left:\x208px;\x20width:\x20" +
          (_0x32a6a7 ? "30px" : _0x590b77(0x1ed)) +
          ";\x20height:\x20" +
          (_0x32a6a7 ? "30px" : "28px") +
          _0x590b77(0x2dd) +
          (_0x32a6a7 ? _0x590b77(0x299) : _0x590b77(0x29c)) +
          _0x590b77(0x23e)),
        _0x1b6610[_0x590b77(0x1ce)](_0x5970cd));
      const _0x536c09 = document[_0x590b77(0x2c6)](_0x590b77(0x245));
      ((_0x536c09[_0x590b77(0x23c)][_0x590b77(0x1be)] = _0x590b77(0x297)),
        (_0x536c09[_0x590b77(0x23c)]["gap"] = _0x590b77(0x254)),
        (_0x536c09[_0x590b77(0x23c)][_0x590b77(0x26f)] = "auto"));
      const _0x343695 = document["createElement"](_0x590b77(0x279));
      ((_0x343695[_0x590b77(0x242)] = "—"),
        (_0x343695["style"][_0x590b77(0x226)] =
          "cursor:\x20pointer;\x20font-weight:\x20bold;\x20font-size:\x20" +
          (_0x32a6a7 ? _0x590b77(0x2f4) : "14px") +
          _0x590b77(0x2de)));
      const _0x2f308d = document[_0x590b77(0x2c6)](_0x590b77(0x279));
      ((_0x2f308d[_0x590b77(0x242)] = "✕"),
        (_0x2f308d[_0x590b77(0x23c)][_0x590b77(0x226)] =
          _0x590b77(0x235) + (_0x32a6a7 ? "14px" : _0x590b77(0x29c)) + ";"),
        _0x536c09["appendChild"](_0x343695),
        _0x536c09[_0x590b77(0x1ce)](_0x2f308d),
        _0x1b6610["appendChild"](_0x536c09));
      const _0x16707f = document[_0x590b77(0x2c6)](_0x590b77(0x245));
      ((_0x16707f["id"] = "quizizz-content"),
        Object[_0x590b77(0x1d0)](_0x16707f[_0x590b77(0x23c)], {
          flex: "1",
          overflowY: _0x590b77(0x223),
          padding: _0x32a6a7 ? "8px" : _0x590b77(0x29c),
          backgroundColor: _0x590b77(0x2a1),
          minHeight: "200px",
        }));
      const _0x5b4d3b = document[_0x590b77(0x2c6)](_0x590b77(0x245));
      Object[_0x590b77(0x1d0)](_0x5b4d3b["style"], {
        position: _0x590b77(0x231),
        top: "0",
        display: _0x590b77(0x297),
        alignItems: _0x590b77(0x261),
        width: _0x590b77(0x266),
        backgroundColor: _0x590b77(0x2a1),
        marginBottom: _0x32a6a7 ? "8px" : _0x590b77(0x29c),
        gap: _0x590b77(0x21d),
        height: _0x590b77(0x288),
      });
      const _0x4f0344 = document[_0x590b77(0x2c6)]("input");
      ((_0x4f0344[_0x590b77(0x2fa)] = _0x590b77(0x2ed)),
        (_0x4f0344[_0x590b77(0x2d9)] = _0x590b77(0x25c)),
        (_0x4f0344[_0x590b77(0x23c)][_0x590b77(0x226)] =
          "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20flex:\x201\x20!important;\x20padding:\x208px\x2012px\x20!important;\x20border-radius:\x208px\x200\x200\x208px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#ccc\x20!important;\x20border-right:\x20none\x20!important;\x20font-size:\x2014px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x2040px\x20!important;\x20line-height:\x2024px\x20!important;\x20box-sizing:\x20border-box\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20outline:\x20none\x20!important;\x20margin:\x200\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20"));
      const _0x625b01 = document[_0x590b77(0x2c6)]("button");
      ((_0x625b01[_0x590b77(0x242)] = "✕"),
        (_0x625b01[_0x590b77(0x23c)][_0x590b77(0x226)] = _0x590b77(0x207)),
        _0x5b4d3b["appendChild"](_0x4f0344),
        _0x5b4d3b[_0x590b77(0x1ce)](_0x625b01));
      const _0x2bfb2b = document["createElement"](_0x590b77(0x245));
      ((_0x2bfb2b["id"] = _0x590b77(0x1dc)),
        (_0x2bfb2b[_0x590b77(0x23c)][_0x590b77(0x226)] =
          "display:\x20flex;\x20flex-direction:\x20column;\x20gap:\x20" +
          (_0x32a6a7 ? _0x590b77(0x25f) : _0x590b77(0x254)) +
          ";"),
        _0x16707f[_0x590b77(0x1ce)](_0x5b4d3b),
        _0x16707f[_0x590b77(0x1ce)](_0x2bfb2b),
        _0x18c6eb[_0x590b77(0x1ce)](_0x1b6610),
        _0x18c6eb["appendChild"](_0x16707f));
      const _0x4b60db = document[_0x590b77(0x2c6)](_0x590b77(0x245));
      return (
        Object[_0x590b77(0x1d0)](_0x4b60db[_0x590b77(0x23c)], {
          position: _0x590b77(0x24e),
          bottom: "0",
          right: "0",
          width: _0x32a6a7 ? _0x590b77(0x1fc) : _0x590b77(0x2f8),
          height: _0x32a6a7 ? _0x590b77(0x1fc) : _0x590b77(0x2f8),
          cursor: "se-resize",
          background: _0x590b77(0x250),
          borderBottomRightRadius: _0x32a6a7 ? "8px" : _0x590b77(0x29c),
        }),
        _0x18c6eb[_0x590b77(0x1ce)](_0x4b60db),
        document[_0x590b77(0x225)]["appendChild"](_0x18c6eb),
        {
          container: _0x18c6eb,
          header: _0x1b6610,
          content: _0x16707f,
          searchBar: _0x4f0344,
          clearBtn: _0x625b01,
          resultsWrap: _0x2bfb2b,
          logoutBtn: _0x5970cd,
          minimizeBtn: _0x343695,
          hideBtn: _0x2f308d,
          resizeHandle: _0x4b60db,
        }
      );
    }
    function _0x12850f() {
      const _0xb325f1 = _0x595930,
        _0x404cf4 = document[_0xb325f1(0x2c6)]("button");
      _0x404cf4["id"] = _0xb325f1(0x2c7);
      const _0x5cd01c = document[_0xb325f1(0x2c6)]("img");
      return (
        (_0x5cd01c[_0xb325f1(0x268)] = _0xb325f1(0x21e)),
        (_0x5cd01c[_0xb325f1(0x24c)] = _0xb325f1(0x1d1)),
        (_0x5cd01c[_0xb325f1(0x23c)]["cssText"] =
          "\x0a\x20\x20\x20\x20\x20\x20\x20\x20width:\x2042px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20height:\x2042px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20object-fit:\x20contain\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20pointer-events:\x20none\x20!important;\x0a\x20\x20\x20\x20"),
        _0x404cf4[_0xb325f1(0x1ce)](_0x5cd01c),
        (_0x404cf4["style"]["cssText"] =
          "\x0a\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20bottom:\x2020px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20left:\x2020px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20padding:\x200\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20background:\x20transparent\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2050%\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20z-index:\x20999998\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20opacity:\x200\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20opacity\x200.3s\x20ease,\x20transform\x200.2s\x20ease\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20width:\x2050px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20height:\x2050px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20display:\x20flex\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20align-items:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20justify-content:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20box-sizing:\x20border-box\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x20none\x20!important;\x0a\x20\x20\x20\x20"),
        _0x404cf4["addEventListener"]("touchstart", function () {
          const _0x341a53 = _0xb325f1;
          _0x404cf4[_0x341a53(0x23c)]["transform"] = _0x341a53(0x22c);
        }),
        _0x404cf4[_0xb325f1(0x2f3)](_0xb325f1(0x2e0), function () {
          const _0x242974 = _0xb325f1;
          _0x404cf4[_0x242974(0x23c)][_0x242974(0x24b)] = _0x242974(0x2aa);
        }),
        (_0x404cf4[_0xb325f1(0x1dd)] = function () {
          const _0x2cf4e4 = _0xb325f1,
            _0x5e540f = document[_0x2cf4e4(0x1cb)](_0x2cf4e4(0x241));
          _0x5e540f &&
            ((_0x5e540f[_0x2cf4e4(0x23c)][_0x2cf4e4(0x1be)] = "flex"),
            (_0x404cf4[_0x2cf4e4(0x23c)][_0x2cf4e4(0x2c3)] = "0"));
        }),
        document[_0xb325f1(0x225)]["appendChild"](_0x404cf4),
        _0x404cf4
      );
    }
    function _0x3395d1(_0x586294) {
      const _0x1813fa = _0x595930,
        _0x26f6e4 = document[_0x1813fa(0x1cb)](_0x1813fa(0x280));
      if (_0x26f6e4) _0x26f6e4["remove"]();
      const _0x10298b = document[_0x1813fa(0x2c6)](_0x1813fa(0x245));
      ((_0x10298b["id"] = _0x1813fa(0x280)),
        (_0x10298b[_0x1813fa(0x23c)][_0x1813fa(0x226)] = _0x1813fa(0x22b)));
      const _0x148f17 = document[_0x1813fa(0x2c6)](_0x1813fa(0x245));
      _0x148f17[_0x1813fa(0x23c)][_0x1813fa(0x226)] = _0x1813fa(0x281);
      const _0x34c9d6 = document[_0x1813fa(0x2c6)](_0x1813fa(0x245));
      ((_0x34c9d6[_0x1813fa(0x242)] = "Logout\x20DitHack?"),
        (_0x34c9d6[_0x1813fa(0x23c)][_0x1813fa(0x226)] = _0x1813fa(0x296)));
      const _0x4ee061 = document[_0x1813fa(0x2c6)](_0x1813fa(0x245));
      ((_0x4ee061[_0x1813fa(0x242)] = _0x1813fa(0x1eb)),
        (_0x4ee061["style"][_0x1813fa(0x226)] = _0x1813fa(0x2a6)));
      const _0x42201e = document["createElement"](_0x1813fa(0x245));
      _0x42201e["style"][_0x1813fa(0x226)] =
        "display:flex\x20!important;\x20gap:10px\x20!important;\x20justify-content:center\x20!important;";
      const _0x7f5383 = document[_0x1813fa(0x2c6)](_0x1813fa(0x2ec));
      ((_0x7f5383["textContent"] = _0x1813fa(0x2d3)),
        (_0x7f5383["style"][_0x1813fa(0x226)] = _0x1813fa(0x212)));
      const _0x182f67 = document["createElement"]("button");
      ((_0x182f67["textContent"] = _0x1813fa(0x29e)),
        (_0x182f67[_0x1813fa(0x23c)][_0x1813fa(0x226)] = _0x1813fa(0x2ba)),
        (_0x7f5383["onclick"] = () => _0x10298b[_0x1813fa(0x1f0)]()),
        (_0x10298b["onclick"] = (_0x581d54) => {
          const _0x2c5770 = _0x1813fa;
          if (_0x581d54[_0x2c5770(0x1ba)] === _0x10298b)
            _0x10298b[_0x2c5770(0x1f0)]();
        }),
        (_0x182f67[_0x1813fa(0x1dd)] = async () => {
          const _0x5b8544 = _0x1813fa;
          ((_0x182f67[_0x5b8544(0x2fc)] = !![]),
            (_0x182f67[_0x5b8544(0x242)] = _0x5b8544(0x227)),
            await _0x586294(),
            _0x10298b[_0x5b8544(0x1f0)]());
        }),
        _0x42201e[_0x1813fa(0x1ce)](_0x7f5383),
        _0x42201e[_0x1813fa(0x1ce)](_0x182f67),
        _0x148f17["appendChild"](_0x34c9d6),
        _0x148f17[_0x1813fa(0x1ce)](_0x4ee061),
        _0x148f17[_0x1813fa(0x1ce)](_0x42201e),
        _0x10298b[_0x1813fa(0x1ce)](_0x148f17),
        document[_0x1813fa(0x225)][_0x1813fa(0x1ce)](_0x10298b));
    }
    async function _0x2d4843() {
      const _0x5ba6c4 = _0x595930,
        _0x2d32d9 = localStorage[_0x5ba6c4(0x21c)](_0x5ba6c4(0x285));
      if (_0x2d32d9)
        try {
          await fetch(_0xed865b + _0x5ba6c4(0x29d), {
            method: _0x5ba6c4(0x27e),
            headers: _0x19917c(),
          });
        } catch (_0x7bb1eb) {
          console[_0x5ba6c4(0x1fe)]("[License]\x20Logout\x20error:", _0x7bb1eb);
        }
      (localStorage["removeItem"](_0x5ba6c4(0x285)),
        document[_0x5ba6c4(0x1cb)](_0x5ba6c4(0x241))?.[_0x5ba6c4(0x1f0)](),
        document[_0x5ba6c4(0x1cb)](_0x5ba6c4(0x2c7))?.[_0x5ba6c4(0x1f0)](),
        _0xc9efc8());
    }
    async function _0x4de6d9(_0x1dd64f) {
      const _0x4f8e36 = _0x595930;
      try {
        const _0xc06afc = await fetch(
          _0xed865b + _0x4f8e36(0x27f) + encodeURIComponent(_0x1dd64f),
          { headers: _0x19917c() },
        );
        if (_0xc06afc[_0x4f8e36(0x2ff)] === 0x199)
          return { error: _0x4f8e36(0x205) };
        if (!_0xc06afc["ok"]) return null;
        const _0x5d1fe3 = await _0xc06afc[_0x4f8e36(0x236)]();
        if (!_0x5d1fe3) return null;
        return _0x5d1fe3;
      } catch (_0x4113d2) {
        return (console[_0x4f8e36(0x1fe)](_0x4f8e36(0x260), _0x4113d2), null);
      }
    }
    async function _0xea7a8d(_0x2aac69) {
      const _0x5be046 = _0x595930;
      try {
        const _0x601bf2 = await fetch(
          _0xed865b + _0x5be046(0x26b) + encodeURIComponent(_0x2aac69),
          { headers: _0x19917c() },
        );
        if (_0x601bf2[_0x5be046(0x2ff)] === 0x199)
          return {
            error: "Token\x20sudah\x20digunakan\x20di\x20perangkat\x20lain",
          };
        if (!_0x601bf2["ok"]) return null;
        const _0x5b4b56 = await _0x601bf2[_0x5be046(0x236)]();
        if (
          !_0x5b4b56 ||
          (_0x5b4b56[_0x5be046(0x1c8)] &&
            _0x5b4b56["answers"][_0x5be046(0x2cf)] === 0x0)
        )
          return null;
        return _0x5b4b56;
      } catch (_0x7d727b) {
        return (console[_0x5be046(0x1fe)](_0x5be046(0x203), _0x7d727b), null);
      }
    }
    function _0x37e663(_0x1aaffb) {
      const _0x17a14b = _0x595930;
      if (!_0x1aaffb) return null;
      if (
        _0x1aaffb[_0x17a14b(0x1e0)] !== undefined &&
        Array[_0x17a14b(0x20b)](_0x1aaffb[_0x17a14b(0x1c8)])
      )
        return _0x1aaffb["answers"][_0x17a14b(0x229)]((_0xb7d51a) => {
          const _0x4d6329 = _0x17a14b,
            _0x4e01a4 = _0xb7d51a[_0x4d6329(0x2b6)] || "";
          let _0xa7959b = null;
          if (
            Array[_0x4d6329(0x20b)](_0xb7d51a[_0x4d6329(0x26e)]) &&
            _0xb7d51a[_0x4d6329(0x26e)]["length"] > 0x0
          ) {
            const _0x14d8f3 = _0xb7d51a["media"][_0x4d6329(0x286)](
              (_0x415e4b) => _0x415e4b && _0x415e4b["url"],
            );
            if (_0x14d8f3) _0xa7959b = _0x14d8f3[_0x4d6329(0x29f)];
          } else
            _0xb7d51a[_0x4d6329(0x26e)] &&
              _0xb7d51a[_0x4d6329(0x26e)]["url"] &&
              (_0xa7959b = _0xb7d51a[_0x4d6329(0x26e)][_0x4d6329(0x29f)]);
          const _0x3a71de = Array["isArray"](_0xb7d51a[_0x4d6329(0x1ee)])
              ? _0xb7d51a["answer"]
              : [_0xb7d51a[_0x4d6329(0x1ee)]],
            _0xbdde95 =
              _0xb7d51a[_0x4d6329(0x2fa)] === _0x4d6329(0x289) ||
              _0xb7d51a["ignoreAnswers"];
          let _0x23e920 = [];
          return (
            _0xbdde95
              ? (_0x23e920 = (_0xb7d51a[_0x4d6329(0x23b)] || [])["map"](
                  (_0xc36a62) => ({
                    text: _0xc36a62[_0x4d6329(0x2ed)] || "",
                    mediaUrl: _0x191936(_0xc36a62),
                  }),
                ))
              : (_0x23e920 = _0x3a71de["map"]((_0x80a517) => {
                  const _0x4875ad = _0x4d6329,
                    _0x571d8c =
                      _0xb7d51a[_0x4875ad(0x23b)] &&
                      _0xb7d51a[_0x4875ad(0x23b)][_0x80a517];
                  if (!_0x571d8c) return null;
                  return {
                    text: _0x571d8c[_0x4875ad(0x2ed)] || "",
                    mediaUrl: _0x191936(_0x571d8c),
                  };
                })["filter"](Boolean)),
            {
              question: _0x4e01a4,
              questionMedia: _0xa7959b,
              answers: _0x23e920,
              type: _0xb7d51a[_0x4d6329(0x2fa)] || "MCQ",
              layout: _0xb7d51a[_0x4d6329(0x237)] || null,
              multiAnswer: _0x3a71de[_0x4d6329(0x2cf)] > 0x1,
              isBlank: _0xbdde95,
            }
          );
        });
      let _0x5bd2d8 = null;
      if (_0x1aaffb[_0x17a14b(0x27a)] && _0x1aaffb["data"][_0x17a14b(0x1c8)])
        _0x5bd2d8 = _0x1aaffb["data"][_0x17a14b(0x1c8)];
      else {
        if (Array[_0x17a14b(0x20b)](_0x1aaffb[_0x17a14b(0x27a)]))
          _0x5bd2d8 = _0x1aaffb[_0x17a14b(0x27a)];
        else {
          if (Array[_0x17a14b(0x20b)](_0x1aaffb[_0x17a14b(0x1c8)]))
            _0x5bd2d8 = _0x1aaffb[_0x17a14b(0x1c8)];
          else {
            if (Array[_0x17a14b(0x20b)](_0x1aaffb)) _0x5bd2d8 = _0x1aaffb;
          }
        }
      }
      if (_0x5bd2d8)
        return _0x5bd2d8[_0x17a14b(0x229)]((_0x3a315d) => {
          const _0x2c578b = _0x17a14b,
            _0x1d513b =
              (_0x3a315d[_0x2c578b(0x2b6)] &&
                (_0x3a315d[_0x2c578b(0x2b6)][_0x2c578b(0x2ed)] ||
                  (_0x3a315d[_0x2c578b(0x2b6)][_0x2c578b(0x1e4)] &&
                    _0x3a315d[_0x2c578b(0x2b6)][_0x2c578b(0x1e4)][
                      _0x2c578b(0x2ed)
                    ]))) ||
              "";
          let _0xe5ba97 = null;
          if (
            _0x3a315d[_0x2c578b(0x2b6)] &&
            _0x3a315d[_0x2c578b(0x2b6)][_0x2c578b(0x2e5)]
          )
            _0xe5ba97 = _0x3a315d[_0x2c578b(0x2b6)]["image"];
          else {
            if (
              _0x3a315d["question"] &&
              _0x3a315d[_0x2c578b(0x2b6)][_0x2c578b(0x26e)]
            ) {
              const _0x35c5b9 = Array["isArray"](
                _0x3a315d[_0x2c578b(0x2b6)][_0x2c578b(0x26e)],
              )
                ? _0x3a315d[_0x2c578b(0x2b6)]["media"][_0x2c578b(0x286)](
                    (_0x4cf932) => _0x4cf932 && _0x4cf932[_0x2c578b(0x29f)],
                  )
                : _0x3a315d["question"][_0x2c578b(0x26e)];
              if (_0x35c5b9 && _0x35c5b9["url"]) _0xe5ba97 = _0x35c5b9["url"];
            } else {
              if (
                _0x3a315d[_0x2c578b(0x2b6)] &&
                _0x3a315d[_0x2c578b(0x2b6)]["structure"] &&
                _0x3a315d[_0x2c578b(0x2b6)][_0x2c578b(0x1e4)]["media"]
              ) {
                const _0x218f33 =
                  _0x3a315d["question"][_0x2c578b(0x1e4)][_0x2c578b(0x26e)];
                if (_0x218f33 && _0x218f33[_0x2c578b(0x29f)])
                  _0xe5ba97 = _0x218f33[_0x2c578b(0x29f)];
              }
            }
          }
          const _0x188d70 = (_0x3a315d["answers"] || [])[_0x2c578b(0x229)](
            (_0x5e6682) => ({
              text: _0x5e6682[_0x2c578b(0x2ed)] || "",
              mediaUrl: _0x191936(_0x5e6682),
            }),
          );
          return {
            question: _0x1d513b,
            questionMedia: _0xe5ba97,
            answers: _0x188d70,
            type: "MCQ",
            isBlank: ![],
          };
        });
      return null;
    }
    function _0x191936(_0x581689) {
      const _0x51f437 = _0x595930;
      if (!_0x581689) return null;
      if (
        _0x581689[_0x51f437(0x2e5)] &&
        typeof _0x581689["image"] === _0x51f437(0x1d2)
      )
        return _0x581689[_0x51f437(0x2e5)];
      if (_0x581689[_0x51f437(0x26e)]) {
        if (typeof _0x581689[_0x51f437(0x26e)] === _0x51f437(0x1d2))
          return _0x581689[_0x51f437(0x26e)];
        if (_0x581689[_0x51f437(0x26e)]["url"])
          return _0x581689[_0x51f437(0x26e)][_0x51f437(0x29f)];
        if (Array[_0x51f437(0x20b)](_0x581689["media"])) {
          const _0xfeca21 = _0x581689[_0x51f437(0x26e)][_0x51f437(0x286)](
            (_0x42575f) => _0x42575f && _0x42575f["url"],
          );
          if (_0xfeca21) return _0xfeca21[_0x51f437(0x29f)];
        }
      }
      return null;
    }
    function _0x1b3e47(_0x16faf2) {
      const _0x59d8a4 = _0x595930;
      if (!_0x16faf2) return "";
      const _0x1e4491 = document[_0x59d8a4(0x2c6)](_0x59d8a4(0x245));
      return (
        (_0x1e4491["innerHTML"] = _0x16faf2),
        _0x1e4491[_0x59d8a4(0x21b)](
          "script[type=\x22math/tex\x22],\x20script[type=\x22math/asciimath\x22]",
        )["forEach"]((_0x2163f3) => _0x2163f3["remove"]()),
        _0x1e4491[_0x59d8a4(0x21b)]("blank")[_0x59d8a4(0x1b4)]((_0x43fc56) => {
          const _0x3ce4a0 = _0x59d8a4;
          let _0x1a8f9b = _0x43fc56[_0x3ce4a0(0x2dc)];
          while (_0x1a8f9b) {
            const _0x2e9709 = _0x1a8f9b;
            _0x1a8f9b = _0x1a8f9b["previousSibling"];
            if (
              _0x2e9709["nodeName"] === "BR" ||
              (_0x2e9709[_0x3ce4a0(0x1e5)] === Node["TEXT_NODE"] &&
                _0x2e9709["textContent"][_0x3ce4a0(0x1d3)]() === "")
            )
              _0x2e9709[_0x3ce4a0(0x1f0)]();
            else break;
          }
          _0x43fc56["remove"]();
        }),
        _0x1e4491["querySelectorAll"](_0x59d8a4(0x2a3))[_0x59d8a4(0x1b4)](
          (_0x593ebe) => _0x593ebe["remove"](),
        ),
        _0x1e4491["querySelectorAll"](_0x59d8a4(0x294))[_0x59d8a4(0x1b4)](
          (_0x2fc759) => {
            const _0x519479 = _0x59d8a4;
            ((_0x2fc759["style"][_0x519479(0x274)] = _0x519479(0x240)),
              (_0x2fc759[_0x519479(0x23c)][_0x519479(0x1be)] =
                _0x519479(0x2f2)));
          },
        ),
        _0x1e4491[_0x59d8a4(0x21b)](".katex-display")[_0x59d8a4(0x1b4)](
          (_0x5b09a2) => {
            const _0x539409 = _0x59d8a4;
            ((_0x5b09a2["style"]["display"] = _0x539409(0x2f2)),
              (_0x5b09a2[_0x539409(0x23c)][_0x539409(0x213)] = "0\x200.1em"),
              (_0x5b09a2["style"][_0x539409(0x1b5)] = _0x539409(0x1fd)));
          },
        ),
        _0x1e4491[_0x59d8a4(0x2ae)]
      );
    }
    function _0x1d6979(
      _0x4d58b2,
      _0x1f3c5a = "",
      _0x467a45 = _0x595930(0x1b6),
    ) {
      const _0x1eb468 = _0x595930,
        _0x59a5b0 = document[_0x1eb468(0x1cb)]("quizizz-results");
      if (!_0x59a5b0) return;
      _0x59a5b0[_0x1eb468(0x2ae)] = "";
      if (!_0x4d58b2 || _0x4d58b2["length"] === 0x0) {
        _0x59a5b0[_0x1eb468(0x2ae)] =
          "<div\x20style=\x22text-align:center;\x20color:#666;\x20padding:20px;\x22>Belum\x20ada\x20data\x20jawaban</div>";
        return;
      }
      let _0x1109cc = _0x4d58b2;
      if (_0x1f3c5a) {
        const _0xa0d4a4 = _0x1f3c5a["toLowerCase"]();
        _0x1109cc = _0x4d58b2["filter"]((_0x40bc7c) => {
          const _0x1dc239 = _0x1eb468,
            _0x1069f6 = _0x40bc7c["question"]
              [_0x1dc239(0x2bd)](/<[^>]*>/g, "")
              ["toLowerCase"](),
            _0x241268 = _0x40bc7c[_0x1dc239(0x1c8)]
              [_0x1dc239(0x229)]((_0x375471) => _0x375471[_0x1dc239(0x2ed)])
              [_0x1dc239(0x246)]("\x20")
              [_0x1dc239(0x2d1)]();
          return (
            _0x1069f6[_0x1dc239(0x1e3)](_0xa0d4a4) ||
            _0x241268[_0x1dc239(0x1e3)](_0xa0d4a4)
          );
        });
      }
      if (_0x1109cc[_0x1eb468(0x2cf)] === 0x0) {
        _0x59a5b0[_0x1eb468(0x2ae)] = _0x1eb468(0x20c);
        return;
      }
      _0x1109cc["forEach"]((_0x2fd335, _0xaa89e3) => {
        const _0x3d08a3 = _0x1eb468,
          _0x278fdd = document[_0x3d08a3(0x2c6)](_0x3d08a3(0x245));
        _0x278fdd[_0x3d08a3(0x23c)][_0x3d08a3(0x226)] =
          _0x3d08a3(0x1e8) + _0x467a45 + _0x3d08a3(0x1cc);
        let _0xe5c936 = "";
        if (_0x2fd335[_0x3d08a3(0x2fa)] === _0x3d08a3(0x1d6))
          _0xe5c936 = _0x3d08a3(0x2f5);
        else {
          if (_0x2fd335[_0x3d08a3(0x2fa)] === _0x3d08a3(0x289))
            _0xe5c936 =
              "<span\x20style=\x22background:#ede9fe;\x20color:#7c3aed;\x20font-size:10px;\x20padding:1px\x205px;\x20border-radius:4px;\x20margin-left:4px;\x20font-weight:bold;\x22>ISIAN</span>";
          else {
            if (
              _0x2fd335[_0x3d08a3(0x237)] === _0x3d08a3(0x218) ||
              _0x2fd335["type"] === _0x3d08a3(0x1f8)
            )
              _0xe5c936 = _0x3d08a3(0x202);
            else
              _0x2fd335[_0x3d08a3(0x2fa)] === _0x3d08a3(0x234) &&
                _0x2fd335[_0x3d08a3(0x2db)] &&
                (_0xe5c936 = _0x3d08a3(0x2f5));
          }
        }
        const _0x25b1dd = _0x2fd335[_0x3d08a3(0x27d)]
          ? _0x3d08a3(0x277) + _0x2fd335[_0x3d08a3(0x27d)] + _0x3d08a3(0x1f3)
          : "";
        let _0x2c65af = "";
        _0x2fd335[_0x3d08a3(0x1c8)][_0x3d08a3(0x1b4)]((_0x5cb49e) => {
          const _0x4c6879 = _0x3d08a3;
          let _0xa415b9 = "";
          (_0x5cb49e[_0x4c6879(0x265)] &&
            (_0xa415b9 +=
              _0x4c6879(0x277) +
              _0x5cb49e[_0x4c6879(0x265)] +
              _0x4c6879(0x200)),
            _0x5cb49e["text"] &&
              (_0xa415b9 +=
                _0x4c6879(0x1e9) + _0x1b3e47(_0x5cb49e["text"]) + "</div>"),
            _0xa415b9 &&
              (_0x2c65af += _0x4c6879(0x1f6) + _0xa415b9 + _0x4c6879(0x2a7)));
        });
        !_0x2c65af && (_0x2c65af = _0x3d08a3(0x2fb));
        ((_0x278fdd[_0x3d08a3(0x2ae)] =
          _0x3d08a3(0x1ec) +
          (_0xaa89e3 + 0x1) +
          _0x3d08a3(0x24f) +
          _0xe5c936 +
          _0x3d08a3(0x259) +
          _0x1b3e47(_0x2fd335[_0x3d08a3(0x2b6)]) +
          "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20" +
          _0x25b1dd +
          _0x3d08a3(0x252) +
          _0x2c65af +
          _0x3d08a3(0x201)),
          _0x278fdd["querySelectorAll"](_0x3d08a3(0x1e1))[_0x3d08a3(0x1b4)](
            (_0x5dd0bb) => {
              const _0xc532ee = _0x3d08a3;
              _0x5dd0bb[_0xc532ee(0x276)](_0xc532ee(0x2a0), "1");
            },
          ),
          _0x59a5b0[_0x3d08a3(0x1ce)](_0x278fdd));
        if (!document["getElementById"](_0x3d08a3(0x1f2))) {
          const _0x143f30 = document[_0x3d08a3(0x2c6)](_0x3d08a3(0x1e2));
          ((_0x143f30["id"] = _0x3d08a3(0x1f2)),
            (_0x143f30[_0x3d08a3(0x1c9)] = "stylesheet"),
            (_0x143f30[_0x3d08a3(0x1f1)] = _0x3d08a3(0x22a)),
            document[_0x3d08a3(0x2cd)][_0x3d08a3(0x1ce)](_0x143f30));
        }
        if (!document[_0x3d08a3(0x1cb)]("dithack-math-fix-style")) {
          const _0x208a11 = document["createElement"](_0x3d08a3(0x23c));
          ((_0x208a11["id"] = "dithack-math-fix-style"),
            (_0x208a11[_0x3d08a3(0x242)] = _0x3d08a3(0x2c5)),
            document[_0x3d08a3(0x2cd)][_0x3d08a3(0x1ce)](_0x208a11));
        }
      });
    }
    function _0x2a5e98(_0x1b02c6 = "") {
      const _0x32e367 = _0x595930,
        _0x37361f = _0x37e663(_0x668de3);
      _0x1d6979(_0x37361f, _0x1b02c6, _0x32e367(0x1b6));
    }
    function _0x1e0235(_0x53b897 = "") {
      const _0x2f2ee7 = _0x37e663(_0x668de3);
      _0x1d6979(_0x2f2ee7, _0x53b897, "#ff6b35");
    }
    function _0x51cd82(_0x37c91c) {
      const _0x50538f = _0x595930,
        _0x2357d9 = document[_0x50538f(0x2c6)](_0x50538f(0x245));
      _0x2357d9[_0x50538f(0x23c)][_0x50538f(0x226)] = _0x50538f(0x233);
      const _0x50a21f = document[_0x50538f(0x2c6)](_0x50538f(0x2ec));
      ((_0x50a21f[_0x50538f(0x242)] = "Wayground"),
        (_0x50a21f[_0x50538f(0x238)][_0x50538f(0x2fa)] = _0x50538f(0x20a)),
        (_0x50a21f[_0x50538f(0x23c)][_0x50538f(0x226)] = _0x50538f(0x1da)));
      const _0x16ca0b = document["createElement"](_0x50538f(0x2ec));
      ((_0x16ca0b[_0x50538f(0x242)] = _0x50538f(0x2f9)),
        (_0x16ca0b[_0x50538f(0x238)][_0x50538f(0x2fa)] = _0x50538f(0x224)),
        (_0x16ca0b["style"][_0x50538f(0x226)] = _0x50538f(0x2b5)),
        _0x2357d9[_0x50538f(0x1ce)](_0x50a21f),
        _0x2357d9[_0x50538f(0x1ce)](_0x16ca0b));
      function _0x11385e(_0x380902) {
        const _0x1fdf6a = _0x50538f;
        ((_0x2b3120 = _0x380902),
          _0x380902 === _0x1fdf6a(0x20a)
            ? ((_0x50a21f[_0x1fdf6a(0x23c)]["background"] = _0x1fdf6a(0x1b6)),
              (_0x50a21f[_0x1fdf6a(0x23c)][_0x1fdf6a(0x2c2)] = "white"),
              (_0x16ca0b[_0x1fdf6a(0x23c)]["background"] = _0x1fdf6a(0x291)),
              (_0x16ca0b[_0x1fdf6a(0x23c)][_0x1fdf6a(0x2c2)] =
                _0x1fdf6a(0x1e6)),
              (_0xbacdc6[_0x1fdf6a(0x2d9)] = "Kode\x20Game\x20Wayground"))
            : ((_0x16ca0b[_0x1fdf6a(0x23c)]["background"] = _0x1fdf6a(0x267)),
              (_0x16ca0b[_0x1fdf6a(0x23c)][_0x1fdf6a(0x2c2)] =
                _0x1fdf6a(0x2e9)),
              (_0x50a21f[_0x1fdf6a(0x23c)][_0x1fdf6a(0x23f)] = "#ccc"),
              (_0x50a21f[_0x1fdf6a(0x23c)]["color"] = _0x1fdf6a(0x1e6)),
              (_0xbacdc6[_0x1fdf6a(0x2d9)] = _0x1fdf6a(0x2bc))));
      }
      ((_0x50a21f[_0x50538f(0x1dd)] = () => _0x11385e("quizizz")),
        (_0x16ca0b[_0x50538f(0x1dd)] = () => _0x11385e(_0x50538f(0x224))));
      const _0xbacdc6 = document[_0x50538f(0x2c6)](_0x50538f(0x26c));
      ((_0xbacdc6[_0x50538f(0x2fa)] = "text"),
        (_0xbacdc6["id"] = _0x50538f(0x215)),
        (_0xbacdc6[_0x50538f(0x2d9)] = _0x50538f(0x1c1)),
        (_0xbacdc6[_0x50538f(0x23c)][_0x50538f(0x226)] = _0x50538f(0x1bd)));
      const _0x131056 = document["createElement"]("button");
      return (
        (_0x131056["id"] = _0x50538f(0x247)),
        (_0x131056[_0x50538f(0x242)] = _0x50538f(0x2d5)),
        (_0x131056["style"][_0x50538f(0x226)] =
          "width:80%;\x20padding:10px;\x20background:#4b4bfF;\x20color:white;\x20border:none;\x20border-radius:8px;\x20cursor:pointer;\x20font-size:14px;"),
        (_0x131056[_0x50538f(0x1dd)] = async () => {
          const _0x2334a1 = _0x50538f,
            _0x1de144 = _0xbacdc6[_0x2334a1(0x284)][_0x2334a1(0x1d3)]();
          if (!_0x1de144) return;
          const _0x484edf = document[_0x2334a1(0x1cb)]("quizizz-results");
          _0x484edf[_0x2334a1(0x2ae)] = _0x2334a1(0x1fb);
          if (_0x2b3120 === _0x2334a1(0x20a)) {
            _0x668de3 = await _0x4de6d9(_0x1de144);
            if (_0x668de3?.[_0x2334a1(0x1fe)]) {
              _0x484edf[_0x2334a1(0x2ae)] =
                _0x2334a1(0x220) + _0x668de3[_0x2334a1(0x1fe)] + "</div>";
              return;
            }
            const _0x12f1bd = _0x37e663(_0x668de3);
            _0x12f1bd && _0x12f1bd["length"] > 0x0
              ? _0x1d6979(_0x12f1bd, "", _0x2334a1(0x1b6))
              : (_0x484edf[_0x2334a1(0x2ae)] = _0x2334a1(0x256));
          } else {
            _0x668de3 = await _0xea7a8d(_0x1de144);
            if (_0x668de3?.[_0x2334a1(0x1fe)]) {
              _0x484edf[_0x2334a1(0x2ae)] =
                _0x2334a1(0x220) + _0x668de3["error"] + _0x2334a1(0x2a7);
              return;
            }
            const _0x4ab452 = _0x37e663(_0x668de3);
            _0x4ab452 && _0x4ab452["length"] > 0x0
              ? _0x1d6979(_0x4ab452, "", "#ff6b35")
              : (_0x484edf[_0x2334a1(0x2ae)] = _0x2334a1(0x256));
          }
        }),
        {
          gameTypeSelector: _0x2357d9,
          pinInput: _0xbacdc6,
          fetchBtn: _0x131056,
        }
      );
    }
    async function _0x56fb04() {
      const _0x3a90e7 = _0x595930,
        {
          container: _0xff8546,
          header: _0x5723fb,
          content: _0x102b20,
          searchBar: _0x366a05,
          clearBtn: _0x28132e,
          resultsWrap: _0x25ff29,
          logoutBtn: _0x1c3e51,
          minimizeBtn: _0x5dc49d,
          hideBtn: _0x2300c5,
          resizeHandle: _0x280e8b,
        } = _0x1b6ec9();
      _0x12850f();
      let _0x55dc66 = "";
      const _0x3974ce = window[_0x3a90e7(0x24a)][_0x3a90e7(0x2f7)],
        _0x36381a = _0x3974ce[_0x3a90e7(0x1e3)](_0x3a90e7(0x20a)),
        _0x5c3465 = new URLSearchParams(
          window[_0x3a90e7(0x24a)][_0x3a90e7(0x1c3)],
        ),
        _0x334a00 =
          _0x5c3465["get"]("pin") ||
          _0x5c3465[_0x3a90e7(0x1f7)](_0x3a90e7(0x1d4));
      if (_0x334a00 && _0x36381a) _0x55dc66 = _0x334a00;
      else {
        if (_0x36381a) {
          const _0x547994 = document["querySelector"](_0x3a90e7(0x1c2));
          _0x547994 &&
            (_0x55dc66 =
              _0x547994[_0x3a90e7(0x242)] ||
              _0x547994[_0x3a90e7(0x2e3)](_0x3a90e7(0x1c0)) ||
              "");
        }
      }
      if (!_0x55dc66 || _0x55dc66[_0x3a90e7(0x2cf)] < 0x4) {
        const _0x1d81c1 = document["createElement"]("div");
        _0x1d81c1[_0x3a90e7(0x23c)][_0x3a90e7(0x226)] = _0x3a90e7(0x282);
        const {
          gameTypeSelector: _0x14b636,
          pinInput: _0x13bb41,
          fetchBtn: _0x46e697,
        } = _0x51cd82(_0x1d81c1);
        (_0x1d81c1["appendChild"](_0x14b636),
          _0x1d81c1[_0x3a90e7(0x1ce)](_0x13bb41),
          _0x1d81c1[_0x3a90e7(0x1ce)](_0x46e697),
          _0x25ff29["appendChild"](_0x1d81c1));
      } else {
        const _0x4b57fe = document[_0x3a90e7(0x1cb)](_0x3a90e7(0x1dc));
        ((_0x4b57fe[_0x3a90e7(0x2ae)] =
          "<div\x20style=\x22text-align:center;\x20color:#666;\x20padding:20px;\x22>Memuat\x20data...</div>"),
          (_0x668de3 = await _0x4de6d9(_0x55dc66)));
        if (_0x668de3?.[_0x3a90e7(0x1fe)]) {
          _0x4b57fe[_0x3a90e7(0x2ae)] =
            _0x3a90e7(0x220) + _0x668de3[_0x3a90e7(0x1fe)] + _0x3a90e7(0x2a7);
          return;
        }
        const _0x3b3aee = _0x37e663(_0x668de3);
        if (_0x3b3aee && _0x3b3aee["length"] > 0x0)
          _0x1d6979(_0x3b3aee, "", _0x3a90e7(0x1b6));
        else {
          _0x25ff29[_0x3a90e7(0x2ae)] = _0x3a90e7(0x216);
          const _0x4c0b28 = document["createElement"]("div");
          _0x4c0b28[_0x3a90e7(0x23c)][_0x3a90e7(0x226)] =
            "padding:20px;\x20text-align:center;\x20margin-top:10px;";
          const {
            gameTypeSelector: _0x54b401,
            pinInput: _0x431fba,
            fetchBtn: _0x1cc707,
          } = _0x51cd82(_0x4c0b28);
          (_0x4c0b28[_0x3a90e7(0x1ce)](_0x54b401),
            _0x4c0b28[_0x3a90e7(0x1ce)](_0x431fba),
            _0x4c0b28[_0x3a90e7(0x1ce)](_0x1cc707),
            _0x25ff29["appendChild"](_0x4c0b28));
        }
      }
      (_0x366a05[_0x3a90e7(0x2f3)](_0x3a90e7(0x26c), function () {
        const _0x50dc2f = _0x3a90e7;
        if (!_0x668de3) return;
        const _0x4f78ac = this[_0x50dc2f(0x284)];
        _0x2b3120 === "kahoot" ? _0x1e0235(_0x4f78ac) : _0x2a5e98(_0x4f78ac);
      }),
        _0x28132e[_0x3a90e7(0x2f3)](_0x3a90e7(0x300), function () {
          const _0x52dde8 = _0x3a90e7;
          _0x366a05[_0x52dde8(0x284)] = "";
          if (!_0x668de3) return;
          _0x2b3120 === _0x52dde8(0x224) ? _0x1e0235() : _0x2a5e98();
        }),
        (_0x1c3e51[_0x3a90e7(0x1dd)] = function () {
          _0x3395d1(_0x2d4843);
        }),
        (_0x5dc49d["onclick"] = function () {
          const _0x4ec60d = _0x3a90e7;
          _0x1bf2ff = !_0x1bf2ff;
          const _0x2dd1bf = window[_0x4ec60d(0x1f4)] <= 0x300;
          _0x1bf2ff
            ? ((_0x102b20[_0x4ec60d(0x23c)][_0x4ec60d(0x1be)] =
                _0x4ec60d(0x2eb)),
              (_0xff8546[_0x4ec60d(0x23c)][_0x4ec60d(0x1d8)] = _0x2dd1bf
                ? _0x4ec60d(0x288)
                : _0x4ec60d(0x219)),
              (_0x5dc49d[_0x4ec60d(0x242)] = "▢"))
            : ((_0x102b20["style"][_0x4ec60d(0x1be)] = _0x4ec60d(0x21f)),
              (_0xff8546[_0x4ec60d(0x23c)][_0x4ec60d(0x1d8)] = _0x2dd1bf
                ? _0x4ec60d(0x223)
                : _0x4ec60d(0x2bf)),
              (_0xff8546[_0x4ec60d(0x23c)][_0x4ec60d(0x251)] = _0x2dd1bf
                ? _0x4ec60d(0x1f5)
                : "500px"),
              (_0x5dc49d[_0x4ec60d(0x242)] = "—"));
        }),
        (_0x2300c5[_0x3a90e7(0x1dd)] = function () {
          const _0x286913 = _0x3a90e7;
          _0xff8546["style"][_0x286913(0x1be)] = _0x286913(0x2eb);
          const _0x504181 = document[_0x286913(0x1cb)](_0x286913(0x2c7));
          if (_0x504181)
            _0x504181[_0x286913(0x23c)]["opacity"] = _0x286913(0x2bb);
        }));
      let _0xabb58a = ![],
        _0x1d0301,
        _0x34be0e;
      (_0x5723fb[_0x3a90e7(0x2f3)](_0x3a90e7(0x1fa), function (_0x10a781) {
        const _0x1f7b65 = _0x3a90e7;
        if (
          _0x10a781[_0x1f7b65(0x1ba)] === _0x5dc49d ||
          _0x10a781[_0x1f7b65(0x1ba)] === _0x2300c5 ||
          _0x10a781[_0x1f7b65(0x1ba)] === _0x1c3e51 ||
          _0x1c3e51[_0x1f7b65(0x29a)](_0x10a781["target"])
        )
          return;
        ((_0xabb58a = !![]),
          (_0x1d0301 = _0x10a781[_0x1f7b65(0x2b2)] - _0xff8546["offsetLeft"]),
          (_0x34be0e = _0x10a781["clientY"] - _0xff8546[_0x1f7b65(0x2cc)]),
          (document["body"][_0x1f7b65(0x23c)][_0x1f7b65(0x293)] =
            _0x1f7b65(0x2eb)));
      }),
        document[_0x3a90e7(0x2f3)](_0x3a90e7(0x273), function (_0x13960f) {
          const _0x5edfa1 = _0x3a90e7;
          if (!_0xabb58a) return;
          ((_0xff8546["style"][_0x5edfa1(0x2b8)] =
            _0x13960f[_0x5edfa1(0x2b2)] - _0x1d0301 + "px"),
            (_0xff8546[_0x5edfa1(0x23c)][_0x5edfa1(0x2da)] =
              _0x13960f[_0x5edfa1(0x228)] - _0x34be0e + "px"),
            (_0xff8546[_0x5edfa1(0x23c)][_0x5edfa1(0x2ac)] = _0x5edfa1(0x223)));
        }),
        document[_0x3a90e7(0x2f3)](_0x3a90e7(0x20f), function () {
          const _0x3a5617 = _0x3a90e7;
          ((_0xabb58a = ![]),
            (document[_0x3a5617(0x225)][_0x3a5617(0x23c)]["userSelect"] =
              _0x3a5617(0x223)));
        }),
        _0x5723fb[_0x3a90e7(0x2f3)](
          _0x3a90e7(0x26a),
          function (_0x2f4bf3) {
            const _0x85e2ae = _0x3a90e7;
            if (
              _0x2f4bf3[_0x85e2ae(0x1ba)] === _0x5dc49d ||
              _0x2f4bf3[_0x85e2ae(0x1ba)] === _0x2300c5 ||
              _0x2f4bf3["target"] === _0x1c3e51 ||
              _0x1c3e51[_0x85e2ae(0x29a)](_0x2f4bf3[_0x85e2ae(0x1ba)])
            )
              return;
            const _0x1abcb2 = _0x2f4bf3[_0x85e2ae(0x2e1)][0x0];
            ((_0xabb58a = !![]),
              (_0x1d0301 =
                _0x1abcb2[_0x85e2ae(0x2b2)] - _0xff8546[_0x85e2ae(0x2ab)]),
              (_0x34be0e = _0x1abcb2["clientY"] - _0xff8546[_0x85e2ae(0x2cc)]));
          },
          { passive: ![] },
        ),
        document[_0x3a90e7(0x2f3)](
          _0x3a90e7(0x1bc),
          function (_0x4c0619) {
            const _0x31019c = _0x3a90e7;
            if (!_0xabb58a) return;
            _0x4c0619[_0x31019c(0x2f0)]();
            const _0x8d4886 = _0x4c0619[_0x31019c(0x2e1)][0x0];
            ((_0xff8546["style"][_0x31019c(0x2b8)] =
              _0x8d4886[_0x31019c(0x2b2)] - _0x1d0301 + "px"),
              (_0xff8546[_0x31019c(0x23c)][_0x31019c(0x2da)] =
                _0x8d4886[_0x31019c(0x228)] - _0x34be0e + "px"),
              (_0xff8546[_0x31019c(0x23c)]["right"] = "auto"));
          },
          { passive: ![] },
        ),
        document[_0x3a90e7(0x2f3)](_0x3a90e7(0x2e0), function () {
          _0xabb58a = ![];
        }));
      let _0x2b2dc0 = ![],
        _0x3da933,
        _0x4edb80,
        _0x49b2c1,
        _0x126109;
      const _0x548172 = 0xc8,
        _0x31b18b = 0xc8;
      (_0x280e8b["addEventListener"]("mousedown", function (_0x480fd2) {
        const _0x527ecc = _0x3a90e7;
        (_0x480fd2["preventDefault"](),
          _0x480fd2[_0x527ecc(0x28e)](),
          (_0x2b2dc0 = !![]),
          (_0x3da933 = _0x480fd2[_0x527ecc(0x2b2)]),
          (_0x4edb80 = _0x480fd2["clientY"]),
          (_0x49b2c1 = _0xff8546[_0x527ecc(0x2d8)]),
          (_0x126109 = _0xff8546[_0x527ecc(0x283)]),
          (document[_0x527ecc(0x225)][_0x527ecc(0x23c)][_0x527ecc(0x293)] =
            _0x527ecc(0x2eb)));
      }),
        document[_0x3a90e7(0x2f3)](_0x3a90e7(0x273), function (_0x44567e) {
          const _0x432c15 = _0x3a90e7;
          if (!_0x2b2dc0) return;
          ((_0xff8546["style"][_0x432c15(0x264)] =
            Math[_0x432c15(0x1c5)](
              _0x548172,
              _0x49b2c1 + (_0x44567e[_0x432c15(0x2b2)] - _0x3da933),
            ) + "px"),
            (_0xff8546["style"][_0x432c15(0x1d8)] =
              Math["max"](
                _0x31b18b,
                _0x126109 + (_0x44567e["clientY"] - _0x4edb80),
              ) + "px"),
            (_0xff8546["style"][_0x432c15(0x251)] = "none"));
        }),
        document["addEventListener"]("mouseup", function () {
          const _0x424f40 = _0x3a90e7;
          ((_0x2b2dc0 = ![]),
            (document[_0x424f40(0x225)][_0x424f40(0x23c)][_0x424f40(0x293)] =
              "auto"));
        }),
        _0x280e8b[_0x3a90e7(0x2f3)](
          "touchstart",
          function (_0x1e7ff1) {
            const _0x11af9f = _0x3a90e7;
            (_0x1e7ff1[_0x11af9f(0x2f0)](), _0x1e7ff1[_0x11af9f(0x28e)]());
            const _0x4a909f = _0x1e7ff1[_0x11af9f(0x2e1)][0x0];
            ((_0x2b2dc0 = !![]),
              (_0x3da933 = _0x4a909f[_0x11af9f(0x2b2)]),
              (_0x4edb80 = _0x4a909f["clientY"]),
              (_0x49b2c1 = _0xff8546[_0x11af9f(0x2d8)]),
              (_0x126109 = _0xff8546[_0x11af9f(0x283)]));
          },
          { passive: ![] },
        ),
        document[_0x3a90e7(0x2f3)](
          _0x3a90e7(0x1bc),
          function (_0x4b401c) {
            const _0x3f7eb7 = _0x3a90e7;
            if (!_0x2b2dc0) return;
            _0x4b401c[_0x3f7eb7(0x2f0)]();
            const _0x3de453 = _0x4b401c[_0x3f7eb7(0x2e1)][0x0];
            ((_0xff8546[_0x3f7eb7(0x23c)]["width"] =
              Math[_0x3f7eb7(0x1c5)](
                _0x548172,
                _0x49b2c1 + (_0x3de453[_0x3f7eb7(0x2b2)] - _0x3da933),
              ) + "px"),
              (_0xff8546[_0x3f7eb7(0x23c)][_0x3f7eb7(0x1d8)] =
                Math[_0x3f7eb7(0x1c5)](
                  _0x31b18b,
                  _0x126109 + (_0x3de453[_0x3f7eb7(0x228)] - _0x4edb80),
                ) + "px"),
              (_0xff8546[_0x3f7eb7(0x23c)][_0x3f7eb7(0x251)] = "none"));
          },
          { passive: ![] },
        ),
        document[_0x3a90e7(0x2f3)]("touchend", function () {
          _0x2b2dc0 = ![];
        }));
    }
    (_0x36dfe0(), console[_0x595930(0x2ef)](_0x595930(0x23a)));
  })());
function a0_0x50c6(_0x35a3bf, _0x24dd2f) {
  _0x35a3bf = _0x35a3bf - 0x1b4;
  const _0x1fb2c0 = a0_0x1fb2();
  let _0x50c61a = _0x1fb2c0[_0x35a3bf];
  return _0x50c61a;
}
function a0_0x1fb2() {
  const _0x54f2fc = [
    "media",
    "marginLeft",
    "dithack_device_id",
    "color:\x20#666\x20!important;\x20font-size:\x20",
    "setMockDimensions",
    "mousemove",
    "overflow",
    "100ZNHsJJ",
    "setAttribute",
    "<img\x20src=\x22",
    "fixed",
    "span",
    "data",
    "focus",
    "0\x208px",
    "questionMedia",
    "POST",
    "/quizizz?pin=",
    "dithack-logout-modal",
    "\x0a\x20\x20\x20\x20\x20\x20width:\x20min(320px,\x2092vw)\x20!important;\x20background:\x20#fff\x20!important;\x20color:\x20#111827\x20!important;\x0a\x20\x20\x20\x20\x20\x20border-radius:\x2010px\x20!important;\x20border:\x201px\x20solid\x20#e5e7eb\x20!important;\x0a\x20\x20\x20\x20\x20\x20box-shadow:\x200\x2012px\x2030px\x20rgba(0,0,0,0.25)\x20!important;\x20padding:\x2018px\x20!important;\x0a\x20\x20\x20\x20\x20\x20text-align:\x20center\x20!important;\x0a\x20\x20\x20\x20",
    "padding:20px;\x20text-align:center;",
    "offsetHeight",
    "value",
    "auth",
    "find",
    "fullscreenElement",
    "40px",
    "BLANK",
    "space-between",
    "onfullscreenchange",
    "title",
    "Inter,\x20system-ui,\x20sans-serif",
    "stopPropagation",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%\x20!important;\x20padding:\x20",
    "#008800",
    "#ccc",
    "0\x2010px",
    "userSelect",
    ".hide-tail",
    "Login",
    "font-size:16px\x20!important;\x20font-weight:700\x20!important;\x20margin-bottom:8px\x20!important;",
    "flex",
    "visible",
    "13px",
    "contains",
    "14px",
    "12px",
    "/logout",
    "Logout",
    "url",
    "data-dithack-done",
    "#f9fafb",
    "#ff6b6b",
    ".katex-mathml",
    "keypress",
    "Selamat\x20datang\x20",
    "font-size:13px\x20!important;\x20line-height:1.45\x20!important;\x20color:#4b5563\x20!important;\x20margin-bottom:16px\x20!important;",
    "</div>",
    "10px",
    "\x20!important;\x20text-align:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "scale(1)",
    "offsetLeft",
    "right",
    "column",
    "innerHTML",
    "#00aa00",
    "fullscreenerror",
    "9022940kuLXuE",
    "clientX",
    "randomUUID",
    "reject",
    "flex:1;\x20padding:10px;\x20background:#ccc;\x20color:#333;\x20border:none;\x20border-radius:8px;\x20cursor:pointer;\x20font-size:14px;\x20font-weight:bold;",
    "question",
    "\x20!important;",
    "left",
    "contextmenu",
    "flex:1\x20!important;\x20padding:10px\x20!important;\x20border:none\x20!important;\x20border-radius:7px\x20!important;\x20background:#ef4444\x20!important;\x20color:#fff\x20!important;\x20cursor:pointer\x20!important;\x20font-weight:700\x20!important;",
    "0.1",
    "QuizID\x20Kahoot",
    "replace",
    "31362WcMnrq",
    "500px",
    "dithack-license-modal",
    "onfullscreenerror",
    "color",
    "opacity",
    "#fff",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/*\x20Sembunyikan\x20katex-mathml\x20(duplikat\x20teks)\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#quizizz-hack-frame\x20.katex-mathml\x20{\x20display:\x20none\x20!important;\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/*\x20katex-display:\x20inline\x20agar\x20menyatu\x20dengan\x20teks\x20soal\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#quizizz-hack-frame\x20.katex-display\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20inline-block\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin:\x200\x200.15em\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20vertical-align:\x20middle\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-width:\x20100%\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20overflow:\x20hidden\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/*\x20Kunci\x20fix\x20garis\x20akar:\x20.hide-tail\x20harus\x20overflow:hidden\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#quizizz-hack-frame\x20.hide-tail\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20overflow:\x20hidden\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20inline-block\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/*\x20SVG\x20akar:\x20width=\x22400em\x22\x20dihapus\x20di\x20JS,\x20pastikan\x20max-width\x20via\x20CSS\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#quizizz-hack-frame\x20.katex\x20svg\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-width:\x20100%\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20auto\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/*\x20Pastikan\x20card\x20tidak\x20overflow\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20#quizizz-hack-frame\x20.katex\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-width:\x20100%\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "createElement",
    "quizizz-hack-toggle",
    "Aktif!",
    "Error\x20validasi\x20Token.\x20Pastikan\x20terhubung\x20internet!",
    "dithack-fontawesome",
    "requestFullscreen",
    "offsetTop",
    "head",
    "oncontextmenu",
    "length",
    "webkitExitFullscreen",
    "toLowerCase",
    "toString",
    "Batal",
    "onresize",
    "Ambil\x20Jawaban",
    "valid",
    "75500ajFiIJ",
    "offsetWidth",
    "placeholder",
    "top",
    "multiAnswer",
    "previousSibling",
    ";\x0a\x20\x20\x20\x20\x20\x20display:\x20inline-flex;\x20align-items:\x20center;\x20justify-content:\x20center;\x0a\x20\x20\x20\x20\x20\x20border:\x20none;\x20border-radius:\x206px;\x20background:\x20rgba(255,255,255,0.2);\x0a\x20\x20\x20\x20\x20\x20color:\x20white;\x20cursor:\x20pointer;\x20font-size:\x20",
    ";\x20padding:\x204px\x208px;",
    "4px",
    "touchend",
    "touches",
    "[Bypass]\x20Detection\x20bypass\x20loaded\x20successfully!",
    "getAttribute",
    "onfocus",
    "image",
    "availWidth",
    "dithack-license-message",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20fixed\x20!important;\x20top:\x200\x20!important;\x20left:\x200\x20!important;\x20right:\x200\x20!important;\x20bottom:\x200\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(0,\x200,\x200,\x200.85)\x20!important;\x20display:\x20flex\x20!important;\x20align-items:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20justify-content:\x20center\x20!important;\x20z-index:\x209999999\x20!important;\x20font-family:\x20\x27Segoe\x20UI\x27,\x20Inter,\x20system-ui,\x20sans-serif\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2010px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "white",
    "indexOf",
    "none",
    "button",
    "text",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#ffffff\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x20",
    "log",
    "preventDefault",
    "1236815ggoYWZ",
    "inline-block",
    "addEventListener",
    "18px",
    "<span\x20style=\x22background:#fef3c7;\x20color:#d97706;\x20font-size:10px;\x20padding:1px\x205px;\x20border-radius:4px;\x20margin-left:4px;\x20font-weight:bold;\x22>MULTI</span>",
    "msRequestFullscreen",
    "hostname",
    "15px",
    "Kahoot",
    "type",
    "<div\x20style=\x22color:#999;\x20font-size:12px;\x20font-style:italic;\x22>Tidak\x20ada\x20jawaban\x20tersedia</div>",
    "disabled",
    "color:\x20#333\x20!important;\x20margin:\x200\x200\x20",
    ";\x20font-weight:\x20bold;",
    "status",
    "click",
    "forEach",
    "verticalAlign",
    "#4b4bfF",
    "9qSGwBB",
    "50px",
    "\x20!important;\x20margin-top:\x20",
    "target",
    "stylesheet",
    "touchmove",
    "width:80%;\x20padding:10px;\x20border:1px\x20solid\x20#ccc;\x20border-radius:8px;\x20margin-bottom:10px;\x20font-size:14px;",
    "display",
    "Belum\x20punya\x20token?\x20<a\x20href=\x22https://dithack.vercel.app\x22\x20target=\x22_blank\x22\x20style=\x22color:\x20#4b4bfF;\x20text-decoration:\x20none;\x22>Beli\x20di\x20sini</a>",
    "data-pin",
    "Kode\x20Game\x20Wayground",
    "[data-pin],\x20.game-pin,\x20[class*=\x22pin\x22]",
    "search",
    "active",
    "max",
    "Token\x20tidak\x20aktif!",
    "\x200\x20!important;\x20font-size:\x20",
    "answers",
    "rel",
    "setItem",
    "getElementById",
    ";\x0a\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20overflow:\x20hidden;\x0a\x20\x20\x20\x20\x20\x20\x20\x20box-sizing:\x20border-box;\x0a\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%;\x0a\x20\x20\x20\x20\x20\x20",
    "crypto",
    "appendChild",
    "<i\x20class=\x22fa-solid\x20fa-arrow-right-from-bracket\x22\x20aria-hidden=\x22true\x22></i>",
    "assign",
    "DitHack",
    "string",
    "trim",
    "gamePin",
    "move",
    "MSQ",
    "now",
    "height",
    "font-size:\x20",
    "flex:1;\x20padding:10px;\x20background:#4b4bfF;\x20color:white;\x20border:none;\x20border-radius:8px;\x20cursor:pointer;\x20font-size:14px;\x20font-weight:bold;",
    "center",
    "quizizz-results",
    "onclick",
    "call",
    "Memvalidasi...",
    "success",
    "mjx-container,\x20.MathJax",
    "link",
    "includes",
    "structure",
    "nodeType",
    "#333",
    "\x20!important;\x20min-height:\x2020px\x20!important;",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20background:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x208px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x202px\x204px\x20rgba(0,0,0,0.1);\x0a\x20\x20\x20\x20\x20\x20\x20\x20border-left:\x204px\x20solid\x20",
    "<div>",
    "298nBwOMq",
    "Token\x20akan\x20dilepas\x20dari\x20perangkat\x20ini\x20dan\x20perlu\x20login\x20ulang\x20untuk\x20memakai\x20DitHack.",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22font-size:14px;\x20font-weight:600;\x20color:#111;\x20margin-bottom:8px;\x20word-wrap:break-word;\x20overflow-wrap:break-word;\x20overflow:hidden;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22background:#e5e7eb;\x20padding:2px\x206px;\x20border-radius:4px;\x20margin-right:5px;\x20font-size:12px;\x22>",
    "28px",
    "answer",
    "msExitFullscreen",
    "remove",
    "href",
    "dithack-katex-css",
    "\x22\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20style=\x22max-width:100%;\x20border-radius:8px;\x20margin-top:8px;\x20display:block;\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20onerror=\x22this.style.display=\x27none\x27\x22>",
    "innerWidth",
    "70vh",
    "<div\x20style=\x22border:2px\x20solid\x20#22c55e;\x20border-radius:8px;\x20padding:8px\x2010px;\x20background:#f0fdf4;\x20margin-bottom:6px;\x20font-size:13px;\x20color:#10b981;\x20font-weight:bold;\x20word-wrap:break-word;\x20overflow-wrap:break-word;\x20box-sizing:border-box;\x20overflow:hidden;\x22>",
    "get",
    "true_false",
    "dithack-license-input",
    "mousedown",
    "<div\x20style=\x22text-align:center;\x20color:#666;\x20padding:20px;\x22>Memuat\x20data...</div>",
    "20px",
    "middle",
    "error",
    "dh-",
    "\x22\x20style=\x22width:100%;\x20height:auto;\x20max-height:160px;\x20object-fit:contain;\x20border-radius:6px;\x20margin-bottom:4px;\x20display:block;\x20box-sizing:border-box;\x22\x20onerror=\x22this.style.display=\x27none\x27\x22>",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20",
    "<span\x20style=\x22background:#dbeafe;\x20color:#1d4ed8;\x20font-size:10px;\x20padding:1px\x205px;\x20border-radius:4px;\x20margin-left:4px;\x20font-weight:bold;\x22>B/S</span>",
    "Error\x20fetching\x20Kahoot\x20answers:",
    "resolve",
    "Token\x20sudah\x20digunakan\x20di\x20perangkat\x20lain",
    "999999",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x200\x2012px\x20!important;\x20background:\x20#e5e7eb\x20!important;\x20border:\x201px\x20solid\x20#ccc\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-left:\x20none\x20!important;\x20border-radius:\x200\x208px\x208px\x200\x20!important;\x20cursor:\x20pointer\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x2040px\x20!important;\x20height:\x2040px\x20!important;\x20font-size:\x2014px\x20!important;\x20line-height:\x2040px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-sizing:\x20border-box\x20!important;\x20margin:\x200\x20!important;\x20display:\x20flex\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20align-items:\x20center\x20!important;\x20justify-content:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "8877806vzITTA",
    "\x20!important;\x20border-radius:\x206px\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x20none\x20!important;\x20background:\x20#0066ff\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white\x20!important;\x20font-size:\x20",
    "quizizz",
    "isArray",
    "<div\x20style=\x22text-align:center;\x20color:#666;\x20padding:20px;\x22>Tidak\x20ada\x20hasil\x20pencarian</div>",
    "message",
    "16px",
    "mouseup",
    "DitHack!",
    "prototype",
    "flex:1\x20!important;\x20padding:10px\x20!important;\x20border:1px\x20solid\x20#d1d5db\x20!important;\x20border-radius:7px\x20!important;\x20background:#fff\x20!important;\x20color:#111827\x20!important;\x20cursor:pointer\x20!important;\x20font-weight:600\x20!important;",
    "margin",
    "outerWidth",
    "quizizz-pin-input",
    "<div\x20style=\x22text-align:center;\x20color:#ef4444;\x20padding:20px;\x22>Gagal\x20mengambil\x20data.\x20Coba\x20masukkan\x20PIN\x20manual.</div>",
    "defineProperty",
    "TRUE_FALSE",
    "44px",
    "\x20!important;\x20font-weight:\x20bold\x20!important;",
    "querySelectorAll",
    "getItem",
    "0px",
    "https://dithack.vercel.app/img/icodh.png",
    "block",
    "<div\x20style=\x22text-align:center;\x20color:#ef4444;\x20padding:20px;\x22>",
    "8435048ATygEn",
    "focusout",
    "auto",
    "kahoot",
    "body",
    "cssText",
    "Logout...",
    "clientY",
    "map",
    "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
    "\x0a\x20\x20\x20\x20\x20\x20position:\x20fixed\x20!important;\x20inset:\x200\x20!important;\x20z-index:\x2010000000\x20!important;\x0a\x20\x20\x20\x20\x20\x20background:\x20rgba(0,0,0,0.6)\x20!important;\x20display:\x20flex\x20!important;\x0a\x20\x20\x20\x20\x20\x20align-items:\x20center\x20!important;\x20justify-content:\x20center\x20!important;\x0a\x20\x20\x20\x20\x20\x20font-family:\x20Inter,\x20system-ui,\x20sans-serif\x20!important;\x20padding:\x2014px\x20!important;\x0a\x20\x20\x20\x20",
    "scale(0.95)",
    "webkitRequestFullscreen",
    "innerHeight",
    "Fullscreen\x20request\x20blocked",
    "Bearer\x20",
    "sticky",
    "Server\x20error,\x20hubungi\x20admin!",
    "display:flex;\x20gap:8px;\x20margin-bottom:12px;\x20justify-content:center;",
    "quiz",
    "cursor:\x20pointer;\x20padding:\x206px\x2010px;\x20background:\x20rgba(255,255,255,0.2);\x20border-radius:\x206px;\x20font-size:\x20",
    "json",
    "layout",
    "dataset",
    "onvisibilitychange",
    "DitHack\x20loaded!",
    "options",
    "style",
    "3703404OcfybG",
    ";\x0a\x20\x20\x20\x20\x20\x20flex-shrink:\x200;\x0a\x20\x20\x20\x20",
    "background",
    "hidden",
    "quizizz-hack-frame",
    "textContent",
    "mozExitFullScreen",
    "resize",
    "div",
    "join",
    "quizizz-fetch-btn",
    "visibilityState",
    "exitFullscreen",
    "location",
    "transform",
    "alt",
    "Token\x20Anda",
    "absolute",
    "</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
    "linear-gradient(135deg,\x20transparent\x2050%,\x20#4b4bfF\x2050%)",
    "maxHeight",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22margin-top:8px;\x20overflow:hidden;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22math-answer\x20dithack-nomath\x22>",
    "onblur",
    "8px",
    "expired",
    "<div\x20style=\x22text-align:center;\x20color:#ef4444;\x20padding:20px;\x22>Gagal\x20mengambil\x20data</div>",
    "color:\x20#d00\x20!important;\x20font-size:\x20",
    "visibilitychange",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22dithack-nomath\x22>",
    "\x20!important;\x20outline:\x20none\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-sizing:\x20border-box\x20!important;\x20margin-bottom:\x20",
    "key",
    "Cari\x20soal...",
    "360px",
    "\x20!important;\x20font-weight:\x20bold\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20cursor:\x20pointer\x20!important;\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "6px",
    "Error\x20fetching\x20answers:",
    "stretch",
    "[License]\x20Validation\x20error:",
    "2px\x20solid\x20#fbbf24",
    "width",
    "mediaUrl",
    "100%",
    "#ff6b35",
    "src",
    "[Bypass]\x20Mock\x20dimensions\x20set\x20to:\x20",
    "touchstart",
    "/kahoot?link=",
    "input",
    "owner",
  ];
  a0_0x1fb2 = function () {
    return _0x54f2fc;
  };
  return a0_0x1fb2();
}
