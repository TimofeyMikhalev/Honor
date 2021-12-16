(() => {
  // Это файлик для подключения библиотек-файлов

  !(function(t, e) {
    'function' == typeof define && define.amd
      ? define([], e())
      : 'object' == typeof module && module.exports
      ? (module.exports = e())
      : (function n() {
          document && document.body ? (t.zenscroll = e()) : setTimeout(n, 9);
        })();
  })(this, function() {
    'use strict';
    var t = function(t) {
      return (
        t &&
        'getComputedStyle' in window &&
        'smooth' === window.getComputedStyle(t)['scroll-behavior']
      );
    };
    if ('undefined' == typeof window || !('document' in window)) return {};
    var e = function(e, n, o) {
        (n = n || 999), o || 0 === o || (o = 9);
        var i,
          r = function(t) {
            i = t;
          },
          u = function() {
            clearTimeout(i), r(0);
          },
          c = function(t) {
            return Math.max(0, e.getTopOf(t) - o);
          },
          a = function(o, i, c) {
            if ((u(), 0 === i || (i && i < 0) || t(e.body))) e.toY(o), c && c();
            else {
              var a = e.getY(),
                f = Math.max(0, o) - a,
                s = new Date().getTime();
              (i = i || Math.min(Math.abs(f), n)),
                (function t() {
                  r(
                    setTimeout(function() {
                      var n = Math.min(1, (new Date().getTime() - s) / i),
                        o = Math.max(
                          0,
                          Math.floor(
                            a + f * (n < 0.5 ? 2 * n * n : n * (4 - 2 * n) - 1),
                          ),
                        );
                      e.toY(o),
                        n < 1 && e.getHeight() + o < e.body.scrollHeight
                          ? t()
                          : (setTimeout(u, 99), c && c());
                    }, 9),
                  );
                })();
            }
          },
          f = function(t, e, n) {
            a(c(t), e, n);
          },
          s = function(t, n, i) {
            var r = t.getBoundingClientRect().height,
              u = e.getTopOf(t) + r,
              s = e.getHeight(),
              l = e.getY(),
              d = l + s;
            c(t) < l || r + o > s
              ? f(t, n, i)
              : u + o > d
              ? a(u - s + o, n, i)
              : i && i();
          },
          l = function(t, n, o, i) {
            a(
              Math.max(
                0,
                e.getTopOf(t) -
                  e.getHeight() / 2 +
                  (o || t.getBoundingClientRect().height / 2),
              ),
              n,
              i,
            );
          };
        return {
          setup: function(t, e) {
            return (
              (0 === t || t) && (n = t),
              (0 === e || e) && (o = e),
              { defaultDuration: n, edgeOffset: o }
            );
          },
          to: f,
          toY: a,
          intoView: s,
          center: l,
          stop: u,
          moving: function() {
            return !!i;
          },
          getY: e.getY,
          getTopOf: e.getTopOf,
        };
      },
      n = document.documentElement,
      o = function() {
        return window.scrollY || n.scrollTop;
      },
      i = e({
        body: document.scrollingElement || document.body,
        toY: function(t) {
          window.scrollTo(0, t);
        },
        getY: o,
        getHeight: function() {
          return window.innerHeight || n.clientHeight;
        },
        getTopOf: function(t) {
          return t.getBoundingClientRect().top + o() - n.offsetTop;
        },
      });
    if (
      ((i.createScroller = function(t, o, i) {
        return e(
          {
            body: t,
            toY: function(e) {
              t.scrollTop = e;
            },
            getY: function() {
              return t.scrollTop;
            },
            getHeight: function() {
              return Math.min(
                t.clientHeight,
                window.innerHeight || n.clientHeight,
              );
            },
            getTopOf: function(t) {
              return t.offsetTop;
            },
          },
          o,
          i,
        );
      }),
      'addEventListener' in window && !window.noZensmooth && !t(document.body))
    ) {
      var r = 'history' in window && 'pushState' in history,
        u = r && 'scrollRestoration' in history;
      u && (history.scrollRestoration = 'auto'),
        window.addEventListener(
          'load',
          function() {
            u &&
              (setTimeout(function() {
                history.scrollRestoration = 'manual';
              }, 9),
              window.addEventListener(
                'popstate',
                function(t) {
                  t.state &&
                    'zenscrollY' in t.state &&
                    i.toY(t.state.zenscrollY);
                },
                !1,
              )),
              window.location.hash &&
                setTimeout(function() {
                  var t = i.setup().edgeOffset;
                  if (t) {
                    var e = document.getElementById(
                      window.location.href.split('#')[1],
                    );
                    if (e) {
                      var n = Math.max(0, i.getTopOf(e) - t),
                        o = i.getY() - n;
                      0 <= o && o < 9 && window.scrollTo(0, n);
                    }
                  }
                }, 9);
          },
          !1,
        );
      var c = new RegExp('(^|\\s)noZensmooth(\\s|$)');
      window.addEventListener(
        'click',
        function(t) {
          for (var e = t.target; e && 'A' !== e.tagName; ) e = e.parentNode;
          if (
            !(
              !e ||
              1 !== t.which ||
              t.shiftKey ||
              t.metaKey ||
              t.ctrlKey ||
              t.altKey
            )
          ) {
            if (u) {
              var n =
                history.state && 'object' == typeof history.state
                  ? history.state
                  : {};
              n.zenscrollY = i.getY();
              try {
                history.replaceState(n, '');
              } catch (t) {}
            }
            var o = e.getAttribute('href') || '';
            if (0 === o.indexOf('#') && !c.test(e.className)) {
              var a = 0,
                f = document.getElementById(o.substring(1));
              if ('#' !== o) {
                if (!f) return;
                a = i.getTopOf(f);
              }
              t.preventDefault();
              var s = function() {
                  window.location = o;
                },
                l = i.setup().edgeOffset;
              l &&
                ((a = Math.max(0, a - l)),
                r &&
                  (s = function() {
                    history.pushState({}, '', o);
                  })),
                i.toY(a, null, s);
            }
          }
        },
        !1,
      );
    }
    return i;
  });

  !(function(e, t) {
    'object' == typeof exports && 'object' == typeof module
      ? (module.exports = t())
      : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
      ? (exports.AOS = t())
      : (e.AOS = t());
  })(this, function() {
    return (function(e) {
      function t(o) {
        if (n[o]) return n[o].exports;
        var i = (n[o] = { exports: {}, id: o, loaded: !1 });
        return (
          e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports
        );
      }
      var n = {};
      return (t.m = e), (t.c = n), (t.p = 'dist/'), t(0);
    })([
      function(e, t, n) {
        'use strict';
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var i =
            Object.assign ||
            function(e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n)
                  Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
              }
              return e;
            },
          r = n(1),
          a = (o(r), n(6)),
          u = o(a),
          c = n(7),
          f = o(c),
          s = n(8),
          d = o(s),
          l = n(9),
          p = o(l),
          m = n(10),
          b = o(m),
          v = n(11),
          y = o(v),
          g = n(14),
          h = o(g),
          w = [],
          k = !1,
          x = document.all && !window.atob,
          j = {
            offset: 120,
            delay: 0,
            easing: 'ease',
            duration: 400,
            disable: !1,
            once: !1,
            startEvent: 'DOMContentLoaded',
            throttleDelay: 99,
            debounceDelay: 50,
            disableMutationObserver: !1,
          },
          O = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if ((e && (k = !0), k))
              return (w = (0, y.default)(w, j)), (0, b.default)(w, j.once), w;
          },
          _ = function() {
            (w = (0, h.default)()), O();
          },
          S = function() {
            w.forEach(function(e, t) {
              e.node.removeAttribute('data-aos'),
                e.node.removeAttribute('data-aos-easing'),
                e.node.removeAttribute('data-aos-duration'),
                e.node.removeAttribute('data-aos-delay');
            });
          },
          z = function(e) {
            return (
              e === !0 ||
              ('mobile' === e && p.default.mobile()) ||
              ('phone' === e && p.default.phone()) ||
              ('tablet' === e && p.default.tablet()) ||
              ('function' == typeof e && e() === !0)
            );
          },
          A = function(e) {
            return (
              (j = i(j, e)),
              (w = (0, h.default)()),
              z(j.disable) || x
                ? S()
                : (document
                    .querySelector('body')
                    .setAttribute('data-aos-easing', j.easing),
                  document
                    .querySelector('body')
                    .setAttribute('data-aos-duration', j.duration),
                  document
                    .querySelector('body')
                    .setAttribute('data-aos-delay', j.delay),
                  'DOMContentLoaded' === j.startEvent &&
                  ['complete', 'interactive'].indexOf(document.readyState) > -1
                    ? O(!0)
                    : 'load' === j.startEvent
                    ? window.addEventListener(j.startEvent, function() {
                        O(!0);
                      })
                    : document.addEventListener(j.startEvent, function() {
                        O(!0);
                      }),
                  window.addEventListener(
                    'resize',
                    (0, f.default)(O, j.debounceDelay, !0),
                  ),
                  window.addEventListener(
                    'orientationchange',
                    (0, f.default)(O, j.debounceDelay, !0),
                  ),
                  window.addEventListener(
                    'scroll',
                    (0, u.default)(function() {
                      (0, b.default)(w, j.once);
                    }, j.throttleDelay),
                  ),
                  j.disableMutationObserver || (0, d.default)('[data-aos]', _),
                  w)
            );
          };
        e.exports = { init: A, refresh: O, refreshHard: _ };
      },
      function(e, t) {},
      ,
      ,
      ,
      ,
      function(e, t) {
        (function(t) {
          'use strict';
          function n(e, t, n) {
            function o(t) {
              var n = b,
                o = v;
              return (b = v = void 0), (k = t), (g = e.apply(o, n));
            }
            function r(e) {
              return (k = e), (h = setTimeout(s, t)), _ ? o(e) : g;
            }
            function a(e) {
              var n = e - w,
                o = e - k,
                i = t - n;
              return S ? j(i, y - o) : i;
            }
            function c(e) {
              var n = e - w,
                o = e - k;
              return void 0 === w || n >= t || n < 0 || (S && o >= y);
            }
            function s() {
              var e = O();
              return c(e) ? d(e) : void (h = setTimeout(s, a(e)));
            }
            function d(e) {
              return (h = void 0), z && b ? o(e) : ((b = v = void 0), g);
            }
            function l() {
              void 0 !== h && clearTimeout(h),
                (k = 0),
                (b = w = v = h = void 0);
            }
            function p() {
              return void 0 === h ? g : d(O());
            }
            function m() {
              var e = O(),
                n = c(e);
              if (((b = arguments), (v = this), (w = e), n)) {
                if (void 0 === h) return r(w);
                if (S) return (h = setTimeout(s, t)), o(w);
              }
              return void 0 === h && (h = setTimeout(s, t)), g;
            }
            var b,
              v,
              y,
              g,
              h,
              w,
              k = 0,
              _ = !1,
              S = !1,
              z = !0;
            if ('function' != typeof e) throw new TypeError(f);
            return (
              (t = u(t) || 0),
              i(n) &&
                ((_ = !!n.leading),
                (S = 'maxWait' in n),
                (y = S ? x(u(n.maxWait) || 0, t) : y),
                (z = 'trailing' in n ? !!n.trailing : z)),
              (m.cancel = l),
              (m.flush = p),
              m
            );
          }
          function o(e, t, o) {
            var r = !0,
              a = !0;
            if ('function' != typeof e) throw new TypeError(f);
            return (
              i(o) &&
                ((r = 'leading' in o ? !!o.leading : r),
                (a = 'trailing' in o ? !!o.trailing : a)),
              n(e, t, { leading: r, maxWait: t, trailing: a })
            );
          }
          function i(e) {
            var t = 'undefined' == typeof e ? 'undefined' : c(e);
            return !!e && ('object' == t || 'function' == t);
          }
          function r(e) {
            return (
              !!e && 'object' == ('undefined' == typeof e ? 'undefined' : c(e))
            );
          }
          function a(e) {
            return (
              'symbol' == ('undefined' == typeof e ? 'undefined' : c(e)) ||
              (r(e) && k.call(e) == d)
            );
          }
          function u(e) {
            if ('number' == typeof e) return e;
            if (a(e)) return s;
            if (i(e)) {
              var t = 'function' == typeof e.valueOf ? e.valueOf() : e;
              e = i(t) ? t + '' : t;
            }
            if ('string' != typeof e) return 0 === e ? e : +e;
            e = e.replace(l, '');
            var n = m.test(e);
            return n || b.test(e)
              ? v(e.slice(2), n ? 2 : 8)
              : p.test(e)
              ? s
              : +e;
          }
          var c =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function(e) {
                    return typeof e;
                  }
                : function(e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  },
            f = 'Expected a function',
            s = NaN,
            d = '[object Symbol]',
            l = /^\s+|\s+$/g,
            p = /^[-+]0x[0-9a-f]+$/i,
            m = /^0b[01]+$/i,
            b = /^0o[0-7]+$/i,
            v = parseInt,
            y =
              'object' == ('undefined' == typeof t ? 'undefined' : c(t)) &&
              t &&
              t.Object === Object &&
              t,
            g =
              'object' ==
                ('undefined' == typeof self ? 'undefined' : c(self)) &&
              self &&
              self.Object === Object &&
              self,
            h = y || g || Function('return this')(),
            w = Object.prototype,
            k = w.toString,
            x = Math.max,
            j = Math.min,
            O = function() {
              return h.Date.now();
            };
          e.exports = o;
        }.call(
          t,
          (function() {
            return this;
          })(),
        ));
      },
      function(e, t) {
        (function(t) {
          'use strict';
          function n(e, t, n) {
            function i(t) {
              var n = b,
                o = v;
              return (b = v = void 0), (O = t), (g = e.apply(o, n));
            }
            function r(e) {
              return (O = e), (h = setTimeout(s, t)), _ ? i(e) : g;
            }
            function u(e) {
              var n = e - w,
                o = e - O,
                i = t - n;
              return S ? x(i, y - o) : i;
            }
            function f(e) {
              var n = e - w,
                o = e - O;
              return void 0 === w || n >= t || n < 0 || (S && o >= y);
            }
            function s() {
              var e = j();
              return f(e) ? d(e) : void (h = setTimeout(s, u(e)));
            }
            function d(e) {
              return (h = void 0), z && b ? i(e) : ((b = v = void 0), g);
            }
            function l() {
              void 0 !== h && clearTimeout(h),
                (O = 0),
                (b = w = v = h = void 0);
            }
            function p() {
              return void 0 === h ? g : d(j());
            }
            function m() {
              var e = j(),
                n = f(e);
              if (((b = arguments), (v = this), (w = e), n)) {
                if (void 0 === h) return r(w);
                if (S) return (h = setTimeout(s, t)), i(w);
              }
              return void 0 === h && (h = setTimeout(s, t)), g;
            }
            var b,
              v,
              y,
              g,
              h,
              w,
              O = 0,
              _ = !1,
              S = !1,
              z = !0;
            if ('function' != typeof e) throw new TypeError(c);
            return (
              (t = a(t) || 0),
              o(n) &&
                ((_ = !!n.leading),
                (S = 'maxWait' in n),
                (y = S ? k(a(n.maxWait) || 0, t) : y),
                (z = 'trailing' in n ? !!n.trailing : z)),
              (m.cancel = l),
              (m.flush = p),
              m
            );
          }
          function o(e) {
            var t = 'undefined' == typeof e ? 'undefined' : u(e);
            return !!e && ('object' == t || 'function' == t);
          }
          function i(e) {
            return (
              !!e && 'object' == ('undefined' == typeof e ? 'undefined' : u(e))
            );
          }
          function r(e) {
            return (
              'symbol' == ('undefined' == typeof e ? 'undefined' : u(e)) ||
              (i(e) && w.call(e) == s)
            );
          }
          function a(e) {
            if ('number' == typeof e) return e;
            if (r(e)) return f;
            if (o(e)) {
              var t = 'function' == typeof e.valueOf ? e.valueOf() : e;
              e = o(t) ? t + '' : t;
            }
            if ('string' != typeof e) return 0 === e ? e : +e;
            e = e.replace(d, '');
            var n = p.test(e);
            return n || m.test(e)
              ? b(e.slice(2), n ? 2 : 8)
              : l.test(e)
              ? f
              : +e;
          }
          var u =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function(e) {
                    return typeof e;
                  }
                : function(e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  },
            c = 'Expected a function',
            f = NaN,
            s = '[object Symbol]',
            d = /^\s+|\s+$/g,
            l = /^[-+]0x[0-9a-f]+$/i,
            p = /^0b[01]+$/i,
            m = /^0o[0-7]+$/i,
            b = parseInt,
            v =
              'object' == ('undefined' == typeof t ? 'undefined' : u(t)) &&
              t &&
              t.Object === Object &&
              t,
            y =
              'object' ==
                ('undefined' == typeof self ? 'undefined' : u(self)) &&
              self &&
              self.Object === Object &&
              self,
            g = v || y || Function('return this')(),
            h = Object.prototype,
            w = h.toString,
            k = Math.max,
            x = Math.min,
            j = function() {
              return g.Date.now();
            };
          e.exports = n;
        }.call(
          t,
          (function() {
            return this;
          })(),
        ));
      },
      function(e, t) {
        'use strict';
        function n(e, t) {
          var n = new r(o);
          (a = t),
            n.observe(i.documentElement, {
              childList: !0,
              subtree: !0,
              removedNodes: !0,
            });
        }
        function o(e) {
          e &&
            e.forEach(function(e) {
              var t = Array.prototype.slice.call(e.addedNodes),
                n = Array.prototype.slice.call(e.removedNodes),
                o = t.concat(n).filter(function(e) {
                  return e.hasAttribute && e.hasAttribute('data-aos');
                }).length;
              o && a();
            });
        }
        Object.defineProperty(t, '__esModule', { value: !0 });
        var i = window.document,
          r =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver,
          a = function() {};
        t.default = n;
      },
      function(e, t) {
        'use strict';
        function n(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        }
        function o() {
          return navigator.userAgent || navigator.vendor || window.opera || '';
        }
        Object.defineProperty(t, '__esModule', { value: !0 });
        var i = (function() {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  'value' in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function(t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
          a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
          c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          f = (function() {
            function e() {
              n(this, e);
            }
            return (
              i(e, [
                {
                  key: 'phone',
                  value: function() {
                    var e = o();
                    return !(!r.test(e) && !a.test(e.substr(0, 4)));
                  },
                },
                {
                  key: 'mobile',
                  value: function() {
                    var e = o();
                    return !(!u.test(e) && !c.test(e.substr(0, 4)));
                  },
                },
                {
                  key: 'tablet',
                  value: function() {
                    return this.mobile() && !this.phone();
                  },
                },
              ]),
              e
            );
          })();
        t.default = new f();
      },
      function(e, t) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n = function(e, t, n) {
            var o = e.node.getAttribute('data-aos-once');
            t > e.position
              ? e.node.classList.add('aos-animate')
              : 'undefined' != typeof o &&
                ('false' === o || (!n && 'true' !== o)) &&
                e.node.classList.remove('aos-animate');
          },
          o = function(e, t) {
            var o = window.pageYOffset,
              i = window.innerHeight;
            e.forEach(function(e, r) {
              n(e, i + o, t);
            });
          };
        t.default = o;
      },
      function(e, t, n) {
        'use strict';
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        Object.defineProperty(t, '__esModule', { value: !0 });
        var i = n(12),
          r = o(i),
          a = function(e, t) {
            return (
              e.forEach(function(e, n) {
                e.node.classList.add('aos-init'),
                  (e.position = (0, r.default)(e.node, t.offset));
              }),
              e
            );
          };
        t.default = a;
      },
      function(e, t, n) {
        'use strict';
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        Object.defineProperty(t, '__esModule', { value: !0 });
        var i = n(13),
          r = o(i),
          a = function(e, t) {
            var n = 0,
              o = 0,
              i = window.innerHeight,
              a = {
                offset: e.getAttribute('data-aos-offset'),
                anchor: e.getAttribute('data-aos-anchor'),
                anchorPlacement: e.getAttribute('data-aos-anchor-placement'),
              };
            switch (
              (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
              a.anchor &&
                document.querySelectorAll(a.anchor) &&
                (e = document.querySelectorAll(a.anchor)[0]),
              (n = (0, r.default)(e).top),
              a.anchorPlacement)
            ) {
              case 'top-bottom':
                break;
              case 'center-bottom':
                n += e.offsetHeight / 2;
                break;
              case 'bottom-bottom':
                n += e.offsetHeight;
                break;
              case 'top-center':
                n += i / 2;
                break;
              case 'bottom-center':
                n += i / 2 + e.offsetHeight;
                break;
              case 'center-center':
                n += i / 2 + e.offsetHeight / 2;
                break;
              case 'top-top':
                n += i;
                break;
              case 'bottom-top':
                n += e.offsetHeight + i;
                break;
              case 'center-top':
                n += e.offsetHeight / 2 + i;
            }
            return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
          };
        t.default = a;
      },
      function(e, t) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n = function(e) {
          for (
            var t = 0, n = 0;
            e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

          )
            (t += e.offsetLeft - ('BODY' != e.tagName ? e.scrollLeft : 0)),
              (n += e.offsetTop - ('BODY' != e.tagName ? e.scrollTop : 0)),
              (e = e.offsetParent);
          return { top: n, left: t };
        };
        t.default = n;
      },
      function(e, t) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var n = function(e) {
          return (
            (e = e || document.querySelectorAll('[data-aos]')),
            Array.prototype.map.call(e, function(e) {
              return { node: e };
            })
          );
        };
        t.default = n;
      },
    ]);
  });

  const deviceType = {
    isMobile: () => window.innerWidth < 650,
    isTablet: () => window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: () => window.innerWidth >= 1024,
    isNotDesktop: () => window.innerWidth < 1024,
  };

  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  // получаем координаты элемента в контексте документа
  function getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right + pageXOffset,
      bottom: box.bottom + pageYOffset,
    };
  }

  //Функция отправки событий в GA
  function gaPushEvent(action, category, label, nonInteraction) {
    let event = nonInteraction ? 'eventWithNonInteraction' : 'event';

    window['dataLayer']
      ? window.dataLayer.push({
          event: event,
          eventCategory: category,
          eventAction: action,
          eventLabel: label,
        })
      : console.log(action, category, label, nonInteraction);
  }

  //установка и удаление ивент листнеров
  let configOfEventListeners = (function() {
    let arrOfEventsObj = [];

    return function(destroy, eventObj) {
      if (!destroy) {
        eventObj.target.addEventListener(eventObj.type, eventObj.func);

        arrOfEventsObj.push(eventObj);
      } else if (destroy == 'current' && arrOfEventsObj.length != 0) {
        arrOfEventsObj.forEach((eventObjCopy) => {
          let index = arrOfEventsObj.indexOf(eventObjCopy);

          if (
            eventObj.type == eventObjCopy.type &&
            eventObj.target == eventObjCopy.target &&
            eventObj.func == eventObjCopy.func
          ) {
            eventObjCopy.target.removeEventListener(
              eventObjCopy.type,
              eventObjCopy.func,
            );

            arrOfEventsObj.splice(index, 1);
          }
        });
      } else {
        arrOfEventsObj.forEach((eventObjCopy) => {
          eventObjCopy.target.removeEventListener(
            eventObjCopy.type,
            eventObjCopy.func,
          );
        });

        arrOfEventsObj = [];
      }
    };
  })();
  //**OVER**

  if (document.readyState === 'loading') {
    //Так как события LOCATION/PAGE_READY на обычном локолхосте нет, мы его эмулируем с помощью события load
    !window.location.href.includes('localhost')
      ? configOfEventListeners(false, {
          target: window,
          type: 'LOCATION/PAGE_READY',
          func: initJs,
        })
      : configOfEventListeners(false, {
          target: window,
          type: 'load',
          func: initJs,
        });
    //END
  } else {
    initJs();
  }

  function initJs() {
    // Тут начинается твой js-код

    //Меню

    let tabs = [...document.querySelectorAll('.menu__container_inner')], //пункты меню
      tabsContent = document.querySelectorAll('.content__container'); // содержимое меню

    // //скрыть пункты меню
    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show');
        item.classList.remove('fade');
      });
      tabs.forEach((item) => {
        item.classList.remove('action');
      });
    }
    // function removeAction(i = 0) {
    //   tabs[i].classList.remove('action');
    // }
    function addAction(i = 0) {
      tabs[i].classList.add('action');
    }

    //будет показывать содержимое меню
    function showTabContent(i = 0) {
      tabsContent[i].classList.add('fade', 'show');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('action');

      zenscroll.to(tabsContent[i]);
    }

    // клик по кнопкам

    function trackClick(event) {
      let target = event.currentTarget;
      let target__index = tabs.indexOf(target);

      hideTabContent(target__index);
      showTabContent(target__index);
      // removeAction(target__index);
      addAction(target__index);
    }

    tabs.forEach((tab) => {
      configOfEventListeners(false, {
        target: tab,
        type: 'click',
        func: trackClick,
      });
    });

    //Попапы

    let popapBtn = [...document.querySelectorAll('.content__button_popap')], //кнопки раскрыть
      popapContent = document.querySelectorAll('.content__popap'), // попапы
      btnClose = document.querySelectorAll('.popap__menu_close'), //Крестик
      popapNextBtnOne = document.querySelector('.content__button_next1'),
      popapNextBtn2 = document.querySelector('.content__button_next2'),
      popapNextBtn3 = document.querySelector('.content__button_next3'),
      popapNextBtn4 = document.querySelector('.content__button_next4'),
      popapNextBtn5 = document.querySelector('.content__button_next5'),
      popapNextBtn6 = document.querySelector('.content__button_next6'),
      popapBtnClose = document.querySelectorAll('.content__button_close');

    // //скрыть пункты меню
    function hideTabPopap() {
      popapContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show');
        item.classList.remove('fade');
      });
    }

    //будет показывать содержимое меню
    function showTabPopap(i = 0) {
      popapContent[i].classList.add('anim', 'show');
      popapContent[i].classList.remove('hide');

      zenscroll.to(popapContent[i]);
    }

    // клик по кнопкам

    function trackClickPopap(event) {
      let target = event.currentTarget;
      let target__index_popap = popapBtn.indexOf(target);

      hideTabPopap(target__index_popap);
      showTabPopap(target__index_popap);
    }
    function closePopap() {
      for (let i = 0; i < popapContent.length; i++) {
        popapContent[i].classList.remove('anim', 'show');
        popapContent[i].classList.add('hide');
      }
    }

    popapBtn.forEach((popap) => {
      configOfEventListeners(false, {
        target: popap,
        type: 'click',
        func: trackClickPopap,
      });
    });

    btnClose.forEach((btn) => {
      configOfEventListeners(false, {
        target: btn,
        type: 'click',
        func: closePopap,
      });
    });

    popapBtnClose.forEach((close) => {
      configOfEventListeners(false, {
        target: close,
        type: 'click',
        func: closePopap,
      });
    });

    // function openPopap() {
    //   for(let i = 0; i < popapContent.length; i++){
    //     popapContent[i].classList.remove('anim', 'show');
    //     popapContent[i].classList.add('hide');
    //   }

    // }
    // btnClose.forEach(btn  => {
    //   configOfEventListeners(false, {target: btn, type: 'click', func: openPopap})
    // })

    //Переход с первого на второй попап
    function popapOne() {
      popapContent[0].classList.remove('show');
      popapContent[0].classList.add('hide');

      popapContent[1].classList.remove('hide');
      popapContent[1].classList.add('show', 'anim');

      zenscroll.to(popapContent[1]);
    }
    popapNextBtnOne.addEventListener('click', popapOne);

    function popap2() {
      popapContent[2].classList.remove('show');
      popapContent[2].classList.add('hide');

      popapContent[3].classList.remove('hide');
      popapContent[3].classList.add('show', 'anim');

      zenscroll.to(popapContent[3]);
    }
    popapNextBtn2.addEventListener('click', popap2);

    function popap3() {
      popapContent[3].classList.remove('show');
      popapContent[3].classList.add('hide');

      popapContent[4].classList.remove('hide');
      popapContent[4].classList.add('show', 'anim');

      zenscroll.to(popapContent[4]);
    }
    popapNextBtn3.addEventListener('click', popap3);

    function popap4() {
      popapContent[5].classList.remove('show');
      popapContent[5].classList.add('hide');

      popapContent[6].classList.remove('hide');
      popapContent[6].classList.add('show', 'anim');

      zenscroll.to(popapContent[6]);
    }
    popapNextBtn4.addEventListener('click', popap4);

    function popap5() {
      popapContent[6].classList.remove('show');
      popapContent[6].classList.add('hide');

      popapContent[7].classList.remove('hide');
      popapContent[7].classList.add('show', 'anim');

      zenscroll.to(popapContent[7]);
    }
    popapNextBtn5.addEventListener('click', popap5);

    function popap6() {
      popapContent[7].classList.remove('show');
      popapContent[7].classList.add('hide');

      popapContent[8].classList.remove('hide');
      popapContent[8].classList.add('show', 'anim');

      zenscroll.to(popapContent[8]);
    }
    popapNextBtn6.addEventListener('click', popap6);

    // console.log(popapNextBtnOne)

    //Работа кнопак далее и завершить
    // function nextPopapOne(event) {
    //   let target = event.currentTarget;
    //   let target__index_next = popapNextBtn.indexOf(target);
    //     hideNextPopap(target__index_next)

    // }
    // function hideNextPopap() {
    //   popapContent.forEach(item => {
    //     item.classList.remove('action');

    //   });
    //   popapContent.forEach(item => {
    //     item.classList.remove('action');
    //     item.classList.add('action');

    //   });
    // }

    // popapNextBtnOne.forEach(close  => {
    //   configOfEventListeners(false, {target: close, type: 'click', func: nextPopapOne})
    // })

    //End
  }

  configOfEventListeners(false, {
    target: window,
    type: 'LOCATION/PATHNAME_CHANGED',
    func: destroyJs,
  });
  function destroyJs() {
    // Удаляем все ивенты
    configOfEventListeners(true, true);
  }
})();
