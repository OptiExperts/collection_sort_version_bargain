! function(e, t, i) {
    var n = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = i(n) : "function" == typeof define && define.amd ? define(function() {
        return t[e] = i(n)
    }) : t[e] = i(n)
}("enquire", this, function(n) {
    "use strict";

    function o(e, t) {
        for (var i = 0, n = e.length; i < n && !1 !== t(e[i], i); i++);
    }

    function s(e) {
        return "function" == typeof e
    }

    function t(e) {
        (this.options = e).deferSetup || this.setup()
    }

    function r(e, t) {
        this.query = e, this.isUnconditional = t, this.handlers = [], this.mql = n(e);
        var i = this;
        this.listener = function(e) {
            i.mql = e, i.assess()
        }, this.mql.addListener(this.listener)
    }

    function e() {
        if (!n) throw new Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {}, this.browserIsIncapable = !n("only all").matches
    }
    return t.prototype = {
        setup: function() {
            this.options.setup && this.options.setup(), this.initialised = !0
        },
        on: function() {
            this.initialised || this.setup(), this.options.match && this.options.match()
        },
        off: function() {
            this.options.unmatch && this.options.unmatch()
        },
        destroy: function() {
            this.options.destroy ? this.options.destroy() : this.off()
        },
        equals: function(e) {
            return this.options === e || this.options.match === e
        }
    }, r.prototype = {
        addHandler: function(e) {
            e = new t(e);
            this.handlers.push(e), this.matches() && e.on()
        },
        removeHandler: function(i) {
            var n = this.handlers;
            o(n, function(e, t) {
                return e.equals(i) ? (e.destroy(), !n.splice(t, 1)) : void 0
            })
        },
        matches: function() {
            return this.mql.matches || this.isUnconditional
        },
        clear: function() {
            o(this.handlers, function(e) {
                e.destroy()
            }), this.mql.removeListener(this.listener), this.handlers.length = 0
        },
        assess: function() {
            var t = this.matches() ? "on" : "off";
            o(this.handlers, function(e) {
                e[t]()
            })
        }
    }, e.prototype = {
        register: function(t, e, i) {
            var n = this.queries,
                i = i && this.browserIsIncapable;
            return n[t] || (n[t] = new r(t, i)), s(e) && (e = {
                match: e
            }), "[object Array]" === Object.prototype.toString.apply(e) || (e = [e]), o(e, function(e) {
                s(e) && (e = {
                    match: e
                }), n[t].addHandler(e)
            }), this
        },
        unregister: function(e, t) {
            var i = this.queries[e];
            return i && (t ? i.removeHandler(t) : (i.clear(), delete this.queries[e])), this
        }
    }, new e
}),
function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(x, e) {
    function a(e) {
        var t = !!e && "length" in e && e.length,
            i = J.type(e);
        return "function" !== i && !J.isWindow(e) && ("array" === i || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }

    function t(e, i, n) {
        if (J.isFunction(i)) return J.grep(e, function(e, t) {
            return !!i.call(e, t, e) !== n
        });
        if (i.nodeType) return J.grep(e, function(e) {
            return e === i !== n
        });
        if ("string" == typeof i) {
            if (ae.test(i)) return J.filter(i, e, n);
            i = J.filter(i, e)
        }
        return J.grep(e, function(e) {
            return -1 < Y.call(i, e) !== n
        })
    }

    function i(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function n() {
        R.removeEventListener("DOMContentLoaded", n), x.removeEventListener("load", n), J.ready()
    }

    function o() {
        this.expando = J.expando + o.uid++
    }

    function l(e, t, i) {
        var n;
        if (void 0 === i && 1 === e.nodeType)
            if (n = "data-" + t.replace(we, "-$&").toLowerCase(), "string" == typeof(i = e.getAttribute(n))) {
                try {
                    i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : ye.test(i) ? J.parseJSON(i) : i)
                } catch (e) {}
                me.set(e, t, i)
            } else i = void 0;
        return i
    }

    function c(e, t, i, n) {
        var o, s = 1,
            r = 20,
            a = n ? function() {
                return n.cur()
            } : function() {
                return J.css(e, t, "")
            },
            l = a(),
            c = i && i[3] || (J.cssNumber[t] ? "" : "px"),
            d = (J.cssNumber[t] || "px" !== c && +l) && xe.exec(J.css(e, t));
        if (d && d[3] !== c)
            for (c = c || d[3], i = i || [], d = +l || 1; d /= s = s || ".5", J.style(e, t, d + c), s !== (s = a() / l) && 1 !== s && --r;);
        return i && (d = +d || +l || 0, o = i[1] ? d + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = d, n.end = o)), o
    }

    function v(e, t) {
        var i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && J.nodeName(e, t) ? J.merge([e], i) : i
    }

    function h(e, t) {
        for (var i = 0, n = e.length; i < n; i++) ge.set(e[i], "globalEval", !t || ge.get(t[i], "globalEval"))
    }

    function g(e, t, i, n, o) {
        for (var s, r, a, l, c, d = t.createDocumentFragment(), u = [], p = 0, f = e.length; p < f; p++)
            if ((s = e[p]) || 0 === s)
                if ("object" === J.type(s)) J.merge(u, s.nodeType ? [s] : s);
                else if (Ee.test(s)) {
            for (r = r || d.appendChild(t.createElement("div")), a = ($e.exec(s) || ["", ""])[1].toLowerCase(), a = Ae[a] || Ae._default, r.innerHTML = a[1] + J.htmlPrefilter(s) + a[2], c = a[0]; c--;) r = r.lastChild;
            J.merge(u, r.childNodes), (r = d.firstChild).textContent = ""
        } else u.push(t.createTextNode(s));
        for (d.textContent = "", p = 0; s = u[p++];)
            if (n && -1 < J.inArray(s, n)) o && o.push(s);
            else if (l = J.contains(s.ownerDocument, s), r = v(d.appendChild(s), "script"), l && h(r), i)
            for (c = 0; s = r[c++];) Ce.test(s.type || "") && i.push(s);
        return d
    }

    function s() {
        return !0
    }

    function d() {
        return !1
    }

    function r() {
        try {
            return R.activeElement
        } catch (e) {}
    }

    function u(e, t, i, n, o, s) {
        var r, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof i && (n = n || i, i = void 0), t) u(e, a, i, n, t[a], s);
            return e
        }
        if (null == n && null == o ? (o = i, n = i = void 0) : null == o && ("string" == typeof i ? (o = n, n = void 0) : (o = n, n = i, i = void 0)), !1 === o) o = d;
        else if (!o) return e;
        return 1 === s && (r = o, (o = function(e) {
            return J().off(e), r.apply(this, arguments)
        }).guid = r.guid || (r.guid = J.guid++)), e.each(function() {
            J.event.add(this, t, o, n, i)
        })
    }

    function p(e, t) {
        return J.nodeName(e, "table") && J.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function m(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function y(e) {
        var t = Pe.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function f(e, t) {
        var i, n, o, s, r, a;
        if (1 === t.nodeType) {
            if (ge.hasData(e) && (s = ge.access(e), r = ge.set(t, s), a = s.events))
                for (o in delete r.handle, r.events = {}, a)
                    for (i = 0, n = a[o].length; i < n; i++) J.event.add(t, o, a[o][i]);
            me.hasData(e) && (e = me.access(e), e = J.extend({}, e), me.set(t, e))
        }
    }

    function w(i, n, o, s) {
        n = U.apply([], n);
        var e, t, r, a, l, c, d = 0,
            u = i.length,
            p = u - 1,
            f = n[0],
            h = J.isFunction(f);
        if (h || 1 < u && "string" == typeof f && !K.checkClone && He.test(f)) return i.each(function(e) {
            var t = i.eq(e);
            h && (n[0] = f.call(this, e, t.html())), w(t, n, o, s)
        });
        if (u && (t = (e = g(n, i[0].ownerDocument, !1, i, s)).firstChild, 1 === e.childNodes.length && (e = t), t || s)) {
            for (a = (r = J.map(v(e, "script"), m)).length; d < u; d++) l = e, d !== p && (l = J.clone(l, !0, !0), a && J.merge(r, v(l, "script"))), o.call(i[d], l, d);
            if (a)
                for (c = r[r.length - 1].ownerDocument, J.map(r, y), d = 0; d < a; d++) l = r[d], Ce.test(l.type || "") && !ge.access(l, "globalEval") && J.contains(c, l) && (l.src ? J._evalUrl && J._evalUrl(l.src) : J.globalEval(l.textContent.replace(Le, "")))
        }
        return i
    }

    function b(e, t, i) {
        for (var n, o = t ? J.filter(t, e) : e, s = 0; null != (n = o[s]); s++) i || 1 !== n.nodeType || J.cleanData(v(n)), n.parentNode && (i && J.contains(n.ownerDocument, n) && h(v(n, "script")), n.parentNode.removeChild(n));
        return e
    }

    function k(e, t) {
        e = J(t.createElement(e)).appendTo(t.body), t = J.css(e[0], "display");
        return e.detach(), t
    }

    function T(e) {
        var t = R,
            i = Ue[e];
        return i || ("none" !== (i = k(e, t)) && i || ((t = (ze = (ze || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), t.close(), i = k(e, t), ze.detach()), Ue[e] = i), i
    }

    function S(e, t, i) {
        var n, o, s = e.style;
        return "" !== (o = (i = i || Ve(e)) ? i.getPropertyValue(t) || i[t] : void 0) && void 0 !== o || J.contains(e.ownerDocument, e) || (o = J.style(e, t)), i && !K.pixelMarginRight() && Ye.test(o) && Xe.test(t) && (n = s.width, e = s.minWidth, t = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = i.width, s.width = n, s.minWidth = e, s.maxWidth = t), void 0 !== o ? o + "" : o
    }

    function $(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function C(e) {
        if (e in tt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), i = et.length; i--;)
            if ((e = et[i] + t) in tt) return e
    }

    function A(e, t, i) {
        var n = xe.exec(t);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
    }

    function E(e, t, i, n, o) {
        for (var s = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, r = 0; s < 4; s += 2) "margin" === i && (r += J.css(e, i + Te[s], !0, o)), n ? ("content" === i && (r -= J.css(e, "padding" + Te[s], !0, o)), "margin" !== i && (r -= J.css(e, "border" + Te[s] + "Width", !0, o))) : (r += J.css(e, "padding" + Te[s], !0, o), "padding" !== i && (r += J.css(e, "border" + Te[s] + "Width", !0, o)));
        return r
    }

    function j(e, t, i) {
        var n = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            s = Ve(e),
            r = "border-box" === J.css(e, "boxSizing", !1, s);
        if (R.msFullscreenElement && x.top !== x && e.getClientRects().length && (o = Math.round(100 * e.getBoundingClientRect()[t])), o <= 0 || null == o) {
            if (((o = S(e, t, s)) < 0 || null == o) && (o = e.style[t]), Ye.test(o)) return o;
            n = r && (K.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + E(e, t, i || (r ? "border" : "content"), n, s) + "px"
    }

    function O(e, t) {
        for (var i, n, o, s = [], r = 0, a = e.length; r < a; r++)(n = e[r]).style && (s[r] = ge.get(n, "olddisplay"), i = n.style.display, t ? (s[r] || "none" !== i || (n.style.display = ""), "" === n.style.display && be(n) && (s[r] = ge.access(n, "olddisplay", T(n.nodeName)))) : (o = be(n), "none" === i && o || ge.set(n, "olddisplay", o ? i : J.css(n, "display"))));
        for (r = 0; r < a; r++)(n = e[r]).style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? s[r] || "" : "none"));
        return e
    }

    function N(e, t, i, n, o) {
        return new N.prototype.init(e, t, i, n, o)
    }

    function _() {
        return x.setTimeout(function() {
            it = void 0
        }), it = J.now()
    }

    function D(e, t) {
        var i, n = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; n < 4; n += 2 - t) o["margin" + (i = Te[n])] = o["padding" + i] = e;
        return t && (o.opacity = o.width = e), o
    }

    function H(e, t, i) {
        for (var n, o = (P.tweeners[t] || []).concat(P.tweeners["*"]), s = 0, r = o.length; s < r; s++)
            if (n = o[s].call(i, t, e)) return n
    }

    function P(o, e, t) {
        var i, s, n = 0,
            r = P.prefilters.length,
            a = J.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (s) return !1;
                for (var e = it || _(), e = Math.max(0, c.startTime + c.duration - e), t = 1 - (e / c.duration || 0), i = 0, n = c.tweens.length; i < n; i++) c.tweens[i].run(t);
                return a.notifyWith(o, [c, t, e]), t < 1 && n ? e : (a.resolveWith(o, [c]), !1)
            },
            c = a.promise({
                elem: o,
                props: J.extend({}, e),
                opts: J.extend(!0, {
                    specialEasing: {},
                    easing: J.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: it || _(),
                duration: t.duration,
                tweens: [],
                createTween: function(e, t) {
                    e = J.Tween(o, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(e), e
                },
                stop: function(e) {
                    var t = 0,
                        i = e ? c.tweens.length : 0;
                    if (s) return this;
                    for (s = !0; t < i; t++) c.tweens[t].run(1);
                    return e ? (a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c, e])) : a.rejectWith(o, [c, e]), this
                }
            }),
            d = c.props;
        for (function(e, t) {
                var i, n, o, s, r;
                for (i in e)
                    if (o = t[n = J.camelCase(i)], s = e[i], J.isArray(s) && (o = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), (r = J.cssHooks[n]) && "expand" in r)
                        for (i in s = r.expand(s), delete e[n], s) i in e || (e[i] = s[i], t[i] = o);
                    else t[n] = o
            }(d, c.opts.specialEasing); n < r; n++)
            if (i = P.prefilters[n].call(c, o, d, c.opts)) return J.isFunction(i.stop) && (J._queueHooks(c.elem, c.opts.queue).stop = J.proxy(i.stop, i)), i;
        return J.map(d, H, c), J.isFunction(c.opts.start) && c.opts.start.call(o, c), J.fx.timer(J.extend(l, {
            elem: o,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function L(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function I(s) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var i, n = 0,
                o = e.toLowerCase().match(fe) || [];
            if (J.isFunction(t))
                for (; i = o[n++];) "+" === i[0] ? (i = i.slice(1) || "*", (s[i] = s[i] || []).unshift(t)) : (s[i] = s[i] || []).push(t)
        }
    }

    function z(t, n, o, s) {
        function r(e) {
            var i;
            return a[e] = !0, J.each(t[e] || [], function(e, t) {
                t = t(n, o, s);
                return "string" != typeof t || l || a[t] ? l ? !(i = t) : void 0 : (n.dataTypes.unshift(t), r(t), !1)
            }), i
        }
        var a = {},
            l = t === Tt;
        return r(n.dataTypes[0]) || !a["*"] && r("*")
    }

    function q(e, t) {
        var i, n, o = J.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((o[i] ? e : n = n || {})[i] = t[i]);
        return n && J.extend(!0, e, n), e
    }

    function M(e) {
        return J.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    function F(e, t) {
        return t.toUpperCase()
    }
    var W = [],
        R = x.document,
        B = W.slice,
        U = W.concat,
        X = W.push,
        Y = W.indexOf,
        V = {},
        G = V.toString,
        Q = V.hasOwnProperty,
        K = {},
        J = function(e, t) {
            return new J.fn.init(e, t)
        },
        Z = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ee = /^-ms-/,
        te = /-([\da-z])/gi;
    J.fn = J.prototype = {
        jquery: "2.2.3",
        constructor: J,
        selector: "",
        length: 0,
        toArray: function() {
            return B.call(this)
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : B.call(this)
        },
        pushStack: function(e) {
            e = J.merge(this.constructor(), e);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(e) {
            return J.each(this, e)
        },
        map: function(i) {
            return this.pushStack(J.map(this, function(e, t) {
                return i.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(B.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                e = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= e && e < t ? [this[e]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: X,
        sort: W.sort,
        splice: W.splice
    }, J.extend = J.fn.extend = function() {
        var e, t, i, n, o, s = arguments[0] || {},
            r = 1,
            a = arguments.length,
            l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[r] || {}, r++), "object" == typeof s || J.isFunction(s) || (s = {}), r === a && (s = this, r--); r < a; r++)
            if (null != (e = arguments[r]))
                for (t in e) o = s[t], s !== (i = e[t]) && (l && i && (J.isPlainObject(i) || (n = J.isArray(i))) ? (o = n ? (n = !1, o && J.isArray(o) ? o : []) : o && J.isPlainObject(o) ? o : {}, s[t] = J.extend(l, o, i)) : void 0 !== i && (s[t] = i));
        return s
    }, J.extend({
        expando: "jQuery" + ("2.2.3" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === J.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !J.isArray(e) && 0 <= t - parseFloat(t) + 1
        },
        isPlainObject: function(e) {
            if ("object" !== J.type(e) || e.nodeType || J.isWindow(e)) return !1;
            if (e.constructor && !Q.call(e, "constructor") && !Q.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
            for (var t in e);
            return void 0 === t || Q.call(e, t)
        },
        isEmptyObject: function(e) {
            for (var t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? V[G.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            var t, i = eval;
            (e = J.trim(e)) && (1 === e.indexOf("use strict") ? ((t = R.createElement("script")).text = e, R.head.appendChild(t).parentNode.removeChild(t)) : i(e))
        },
        camelCase: function(e) {
            return e.replace(ee, "ms-").replace(te, F)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var i, n = 0;
            if (a(e))
                for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
            else
                for (n in e)
                    if (!1 === t.call(e[n], n, e[n])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(Z, "")
        },
        makeArray: function(e, t) {
            t = t || [];
            return null != e && (a(Object(e)) ? J.merge(t, "string" == typeof e ? [e] : e) : X.call(t, e)), t
        },
        inArray: function(e, t, i) {
            return null == t ? -1 : Y.call(t, e, i)
        },
        merge: function(e, t) {
            for (var i = +t.length, n = 0, o = e.length; n < i; n++) e[o++] = t[n];
            return e.length = o, e
        },
        grep: function(e, t, i) {
            for (var n = [], o = 0, s = e.length, r = !i; o < s; o++) !t(e[o], o) != r && n.push(e[o]);
            return n
        },
        map: function(e, t, i) {
            var n, o, s = 0,
                r = [];
            if (a(e))
                for (n = e.length; s < n; s++) null != (o = t(e[s], s, i)) && r.push(o);
            else
                for (s in e) null != (o = t(e[s], s, i)) && r.push(o);
            return U.apply([], r)
        },
        guid: 1,
        proxy: function(e, t) {
            var i, n;
            return "string" == typeof t && (n = e[t], t = e, e = n), J.isFunction(e) ? (i = B.call(arguments, 2), (n = function() {
                return e.apply(t || this, i.concat(B.call(arguments)))
            }).guid = e.guid = e.guid || J.guid++, n) : void 0
        },
        now: Date.now,
        support: K
    }), "function" == typeof Symbol && (J.fn[Symbol.iterator] = W[Symbol.iterator]), J.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        V["[object " + t + "]"] = t.toLowerCase()
    });
    var ie = function(i) {
        function b(e, t, i, n) {
            var o, s, r, a, l, c, d, u, p = t && t.ownerDocument,
                f = t ? t.nodeType : 9;
            if (i = i || [], "string" != typeof e || !e || 1 !== f && 9 !== f && 11 !== f) return i;
            if (!n && ((t ? t.ownerDocument || t : L) !== E && A(t), t = t || E, O)) {
                if (11 !== f && (c = pe.exec(e)))
                    if (o = c[1]) {
                        if (9 === f) {
                            if (!(r = t.getElementById(o))) return i;
                            if (r.id === o) return i.push(r), i
                        } else if (p && (r = p.getElementById(o)) && H(t, r) && r.id === o) return i.push(r), i
                    } else {
                        if (c[2]) return Y.apply(i, t.getElementsByTagName(e)), i;
                        if ((o = c[3]) && g.getElementsByClassName && t.getElementsByClassName) return Y.apply(i, t.getElementsByClassName(o)), i
                    } if (g.qsa && !F[e + " "] && (!N || !N.test(e))) {
                    if (1 !== f) p = t, u = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(he, "\\$&") : t.setAttribute("id", a = P), s = (d = S(e)).length, l = ae.test(a) ? "#" + a : "[id='" + a + "']"; s--;) d[s] = l + " " + v(d[s]);
                        u = d.join(","), p = fe.test(e) && h(t.parentNode) || t
                    }
                    if (u) try {
                        return Y.apply(i, p.querySelectorAll(u)), i
                    } catch (e) {} finally {
                        a === P && t.removeAttribute("id")
                    }
                }
            }
            return y(e.replace(ie, "$1"), t, i, n)
        }

        function e() {
            var n = [];
            return function e(t, i) {
                return n.push(t + " ") > T.cacheLength && delete e[n.shift()], e[t + " "] = i
            }
        }

        function p(e) {
            return e[P] = !0, e
        }

        function t(e) {
            var t = E.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function n(e, t) {
            for (var i = e.split("|"), n = i.length; n--;) T.attrHandle[i[n]] = t
        }

        function l(e, t) {
            var i = t && e,
                n = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || 1 << 31) - (~e.sourceIndex || 1 << 31);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === t) return -1;
            return e ? 1 : -1
        }

        function o(r) {
            return p(function(s) {
                return s = +s, p(function(e, t) {
                    for (var i, n = r([], e.length, s), o = n.length; o--;) e[i = n[o]] && (e[i] = !(t[i] = e[i]))
                })
            })
        }

        function h(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }

        function s() {}

        function v(e) {
            for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
            return n
        }

        function f(r, e, t) {
            var a = e.dir,
                l = t && "parentNode" === a,
                c = z++;
            return e.first ? function(e, t, i) {
                for (; e = e[a];)
                    if (1 === e.nodeType || l) return r(e, t, i)
            } : function(e, t, i) {
                var n, o, s = [I, c];
                if (i) {
                    for (; e = e[a];)
                        if ((1 === e.nodeType || l) && r(e, t, i)) return !0
                } else
                    for (; e = e[a];)
                        if (1 === e.nodeType || l) {
                            if ((o = (n = (o = e[P] || (e[P] = {}))[e.uniqueID] || (o[e.uniqueID] = {}))[a]) && o[0] === I && o[1] === c) return s[2] = o[2];
                            if ((n[a] = s)[2] = r(e, t, i)) return !0
                        }
            }
        }

        function k(o) {
            return 1 < o.length ? function(e, t, i) {
                for (var n = o.length; n--;)
                    if (!o[n](e, t, i)) return !1;
                return !0
            } : o[0]
        }

        function x(e, t, i, n, o) {
            for (var s, r = [], a = 0, l = e.length, c = null != t; a < l; a++)(s = e[a]) && (i && !i(s, n, o) || (r.push(s), c && t.push(a)));
            return r
        }

        function u(e, t, i) {
            var n = "0x" + t - 65536;
            return n != n || i ? t : n < 0 ? String.fromCharCode(65536 + n) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        }

        function r() {
            A()
        }
        var a, g, T, c, d, S, m, y, $, w, C, A, E, j, O, N, _, D, H, P = "sizzle" + +new Date,
            L = i.document,
            I = 0,
            z = 0,
            q = e(),
            M = e(),
            F = e(),
            W = function(e, t) {
                return e === t && (C = !0), 0
            },
            R = {}.hasOwnProperty,
            B = [],
            U = B.pop,
            X = B.push,
            Y = B.push,
            V = B.slice,
            G = function(e, t) {
                for (var i = 0, n = e.length; i < n; i++)
                    if (e[i] === t) return i;
                return -1
            },
            Q = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            K = "[\\x20\\t\\r\\n\\f]",
            J = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            Z = "\\[" + K + "*(" + J + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + J + "))|)" + K + "*\\]",
            ee = ":(" + J + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + Z + ")*)|.*)\\)|)",
            te = new RegExp(K + "+", "g"),
            ie = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
            ne = new RegExp("^" + K + "*," + K + "*"),
            oe = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
            se = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
            re = new RegExp(ee),
            ae = new RegExp("^" + J + "$"),
            le = {
                ID: new RegExp("^#(" + J + ")"),
                CLASS: new RegExp("^\\.(" + J + ")"),
                TAG: new RegExp("^(" + J + "|[*])"),
                ATTR: new RegExp("^" + Z),
                PSEUDO: new RegExp("^" + ee),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + Q + ")$", "i"),
                needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i")
            },
            ce = /^(?:input|select|textarea|button)$/i,
            de = /^h\d$/i,
            ue = /^[^{]+\{\s*\[native \w/,
            pe = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            fe = /[+~]/,
            he = /'|\\/g,
            ve = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig");
        try {
            Y.apply(B = V.call(L.childNodes), L.childNodes), B[L.childNodes.length].nodeType
        } catch (i) {
            Y = {
                apply: B.length ? function(e, t) {
                    X.apply(e, V.call(t))
                } : function(e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++];);
                    e.length = i - 1
                }
            }
        }
        for (a in g = b.support = {}, d = b.isXML = function(e) {
                e = e && (e.ownerDocument || e).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, A = b.setDocument = function(e) {
                var e = e ? e.ownerDocument || e : L;
                return e !== E && 9 === e.nodeType && e.documentElement && (j = (E = e).documentElement, O = !d(E), (e = E.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", r, !1) : e.attachEvent && e.attachEvent("onunload", r)), g.attributes = t(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), g.getElementsByTagName = t(function(e) {
                    return e.appendChild(E.createComment("")), !e.getElementsByTagName("*").length
                }), g.getElementsByClassName = ue.test(E.getElementsByClassName), g.getById = t(function(e) {
                    return j.appendChild(e).id = P, !E.getElementsByName || !E.getElementsByName(P).length
                }), g.getById ? (T.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && O) {
                        e = t.getElementById(e);
                        return e ? [e] : []
                    }
                }, T.filter.ID = function(e) {
                    var t = e.replace(ve, u);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete T.find.ID, T.filter.ID = function(e) {
                    var t = e.replace(ve, u);
                    return function(e) {
                        e = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return e && e.value === t
                    }
                }), T.find.TAG = g.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : g.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var i, n = [],
                        o = 0,
                        s = t.getElementsByTagName(e);
                    if ("*" !== e) return s;
                    for (; i = s[o++];) 1 === i.nodeType && n.push(i);
                    return n
                }, T.find.CLASS = g.getElementsByClassName && function(e, t) {
                    return void 0 !== t.getElementsByClassName && O ? t.getElementsByClassName(e) : void 0
                }, _ = [], N = [], (g.qsa = ue.test(E.querySelectorAll)) && (t(function(e) {
                    j.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && N.push("[*^$]=" + K + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || N.push("\\[" + K + "*(?:value|" + Q + ")"), e.querySelectorAll("[id~=" + P + "-]").length || N.push("~="), e.querySelectorAll(":checked").length || N.push(":checked"), e.querySelectorAll("a#" + P + "+*").length || N.push(".#.+[+~]")
                }), t(function(e) {
                    var t = E.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && N.push("name" + K + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), N.push(",.*:")
                })), (g.matchesSelector = ue.test(D = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && t(function(e) {
                    g.disconnectedMatch = D.call(e, "div"), D.call(e, "[s!='']:x"), _.push("!=", ee)
                }), N = N.length && new RegExp(N.join("|")), _ = _.length && new RegExp(_.join("|")), e = ue.test(j.compareDocumentPosition), H = e || ue.test(j.contains) ? function(e, t) {
                    var i = 9 === e.nodeType ? e.documentElement : e,
                        t = t && t.parentNode;
                    return e === t || !(!t || 1 !== t.nodeType || !(i.contains ? i.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, W = e ? function(e, t) {
                    if (e === t) return C = !0, 0;
                    var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !g.sortDetached && t.compareDocumentPosition(e) === i ? e === E || e.ownerDocument === L && H(L, e) ? -1 : t === E || t.ownerDocument === L && H(L, t) ? 1 : w ? G(w, e) - G(w, t) : 0 : 4 & i ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return C = !0, 0;
                    var i, n = 0,
                        o = e.parentNode,
                        s = t.parentNode,
                        r = [e],
                        a = [t];
                    if (!o || !s) return e === E ? -1 : t === E ? 1 : o ? -1 : s ? 1 : w ? G(w, e) - G(w, t) : 0;
                    if (o === s) return l(e, t);
                    for (i = e; i = i.parentNode;) r.unshift(i);
                    for (i = t; i = i.parentNode;) a.unshift(i);
                    for (; r[n] === a[n];) n++;
                    return n ? l(r[n], a[n]) : r[n] === L ? -1 : a[n] === L ? 1 : 0
                }), E
            }, b.matches = function(e, t) {
                return b(e, null, null, t)
            }, b.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== E && A(e), t = t.replace(se, "='$1']"), g.matchesSelector && O && !F[t + " "] && (!_ || !_.test(t)) && (!N || !N.test(t))) try {
                    var i = D.call(e, t);
                    if (i || g.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (e) {}
                return 0 < b(t, E, null, [e]).length
            }, b.contains = function(e, t) {
                return (e.ownerDocument || e) !== E && A(e), H(e, t)
            }, b.attr = function(e, t) {
                (e.ownerDocument || e) !== E && A(e);
                var i = T.attrHandle[t.toLowerCase()],
                    i = i && R.call(T.attrHandle, t.toLowerCase()) ? i(e, t, !O) : void 0;
                return void 0 !== i ? i : g.attributes || !O ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, b.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, b.uniqueSort = function(e) {
                var t, i = [],
                    n = 0,
                    o = 0;
                if (C = !g.detectDuplicates, w = !g.sortStable && e.slice(0), e.sort(W), C) {
                    for (; t = e[o++];) t === e[o] && (n = i.push(o));
                    for (; n--;) e.splice(i[n], 1)
                }
                return w = null, e
            }, c = b.getText = function(e) {
                var t, i = "",
                    n = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) i += c(e)
                    } else if (3 === o || 4 === o) return e.nodeValue
                } else
                    for (; t = e[n++];) i += c(t);
                return i
            }, (T = b.selectors = {
                cacheLength: 50,
                createPseudo: p,
                match: le,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(ve, u), e[3] = (e[3] || e[4] || e[5] || "").replace(ve, u), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || b.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && b.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, i = !e[6] && e[2];
                        return le.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && re.test(i) && (t = S(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(ve, u).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = q[e + " "];
                        return t || (t = new RegExp("(^|" + K + ")" + e + "(" + K + "|$)")) && q(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, i, n) {
                        return function(e) {
                            e = b.attr(e, t);
                            return null == e ? "!=" === i : !i || (e += "", "=" === i ? e === n : "!=" === i ? e !== n : "^=" === i ? n && 0 === e.indexOf(n) : "*=" === i ? n && -1 < e.indexOf(n) : "$=" === i ? n && e.slice(-n.length) === n : "~=" === i ? -1 < (" " + e.replace(te, " ") + " ").indexOf(n) : "|=" === i && (e === n || e.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(h, e, t, v, g) {
                        var m = "nth" !== h.slice(0, 3),
                            y = "last" !== h.slice(-4),
                            w = "of-type" === e;
                        return 1 === v && 0 === g ? function(e) {
                            return !!e.parentNode
                        } : function(e, t, i) {
                            var n, o, s, r, a, l, c = m != y ? "nextSibling" : "previousSibling",
                                d = e.parentNode,
                                u = w && e.nodeName.toLowerCase(),
                                p = !i && !w,
                                f = !1;
                            if (d) {
                                if (m) {
                                    for (; c;) {
                                        for (r = e; r = r[c];)
                                            if (w ? r.nodeName.toLowerCase() === u : 1 === r.nodeType) return !1;
                                        l = c = "only" === h && !l && "nextSibling"
                                    }
                                    return !0
                                }
                                if (l = [y ? d.firstChild : d.lastChild], y && p) {
                                    for (f = (a = (n = (o = (s = (r = d)[P] || (r[P] = {}))[r.uniqueID] || (s[r.uniqueID] = {}))[h] || [])[0] === I && n[1]) && n[2], r = a && d.childNodes[a]; r = ++a && r && r[c] || (f = a = 0) || l.pop();)
                                        if (1 === r.nodeType && ++f && r === e) {
                                            o[h] = [I, a, f];
                                            break
                                        }
                                } else if (p && (f = a = (n = (o = (s = (r = e)[P] || (r[P] = {}))[r.uniqueID] || (s[r.uniqueID] = {}))[h] || [])[0] === I && n[1]), !1 === f)
                                    for (;
                                        (r = ++a && r && r[c] || (f = a = 0) || l.pop()) && ((w ? r.nodeName.toLowerCase() !== u : 1 !== r.nodeType) || !++f || (p && ((o = (s = r[P] || (r[P] = {}))[r.uniqueID] || (s[r.uniqueID] = {}))[h] = [I, f]), r !== e)););
                                return (f -= g) === v || f % v == 0 && 0 <= f / v
                            }
                        }
                    },
                    PSEUDO: function(e, s) {
                        var t, r = T.pseudos[e] || T.setFilters[e.toLowerCase()] || b.error("unsupported pseudo: " + e);
                        return r[P] ? r(s) : 1 < r.length ? (t = [e, e, "", s], T.setFilters.hasOwnProperty(e.toLowerCase()) ? p(function(e, t) {
                            for (var i, n = r(e, s), o = n.length; o--;) e[i = G(e, n[o])] = !(t[i] = n[o])
                        }) : function(e) {
                            return r(e, 0, t)
                        }) : r
                    }
                },
                pseudos: {
                    not: p(function(e) {
                        var n = [],
                            o = [],
                            a = m(e.replace(ie, "$1"));
                        return a[P] ? p(function(e, t, i, n) {
                            for (var o, s = a(e, null, n, []), r = e.length; r--;)(o = s[r]) && (e[r] = !(t[r] = o))
                        }) : function(e, t, i) {
                            return n[0] = e, a(n, null, i, o), n[0] = null, !o.pop()
                        }
                    }),
                    has: p(function(t) {
                        return function(e) {
                            return 0 < b(t, e).length
                        }
                    }),
                    contains: p(function(t) {
                        return t = t.replace(ve, u),
                            function(e) {
                                return -1 < (e.textContent || e.innerText || c(e)).indexOf(t)
                            }
                    }),
                    lang: p(function(i) {
                        return ae.test(i || "") || b.error("unsupported lang: " + i), i = i.replace(ve, u).toLowerCase(),
                            function(e) {
                                var t;
                                do {
                                    if (t = O ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === i || 0 === t.indexOf(i + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var t = i.location && i.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function(e) {
                        return e === j
                    },
                    focus: function(e) {
                        return e === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return !1 === e.disabled
                    },
                    disabled: function(e) {
                        return !0 === e.disabled
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !T.pseudos.empty(e)
                    },
                    header: function(e) {
                        return de.test(e.nodeName)
                    },
                    input: function(e) {
                        return ce.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: o(function() {
                        return [0]
                    }),
                    last: o(function(e, t) {
                        return [t - 1]
                    }),
                    eq: o(function(e, t, i) {
                        return [i < 0 ? i + t : i]
                    }),
                    even: o(function(e, t) {
                        for (var i = 0; i < t; i += 2) e.push(i);
                        return e
                    }),
                    odd: o(function(e, t) {
                        for (var i = 1; i < t; i += 2) e.push(i);
                        return e
                    }),
                    lt: o(function(e, t, i) {
                        for (var n = i < 0 ? i + t : i; 0 <= --n;) e.push(n);
                        return e
                    }),
                    gt: o(function(e, t, i) {
                        for (var n = i < 0 ? i + t : i; ++n < t;) e.push(n);
                        return e
                    })
                }
            }).pseudos.nth = T.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) T.pseudos[a] = function(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }(a);
        for (a in {
                submit: !0,
                reset: !0
            }) T.pseudos[a] = function(i) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === i
            }
        }(a);
        return s.prototype = T.filters = T.pseudos, T.setFilters = new s, S = b.tokenize = function(e, t) {
            var i, n, o, s, r, a, l, c = M[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (r = e, a = [], l = T.preFilter; r;) {
                for (s in i && !(n = ne.exec(r)) || (n && (r = r.slice(n[0].length) || r), a.push(o = [])), i = !1, (n = oe.exec(r)) && (i = n.shift(), o.push({
                        value: i,
                        type: n[0].replace(ie, " ")
                    }), r = r.slice(i.length)), T.filter) !(n = le[s].exec(r)) || l[s] && !(n = l[s](n)) || (i = n.shift(), o.push({
                    value: i,
                    type: s,
                    matches: n
                }), r = r.slice(i.length));
                if (!i) break
            }
            return t ? r.length : r ? b.error(e) : M(e, a).slice(0)
        }, m = b.compile = function(e, t) {
            var i, g, m, y, w, n = [],
                o = [],
                s = F[e + " "];
            if (!s) {
                for (i = (t = t || S(e)).length; i--;)((s = function e(t) {
                    for (var n, i, o, s = t.length, r = T.relative[t[0].type], a = r || T.relative[" "], l = r ? 1 : 0, c = f(function(e) {
                            return e === n
                        }, a, !0), d = f(function(e) {
                            return -1 < G(n, e)
                        }, a, !0), u = [function(e, t, i) {
                            return i = !r && (i || t !== $) || ((n = t).nodeType ? c : d)(e, t, i), n = null, i
                        }]; l < s; l++)
                        if (i = T.relative[t[l].type]) u = [f(k(u), i)];
                        else {
                            if ((i = T.filter[t[l].type].apply(null, t[l].matches))[P]) {
                                for (o = ++l; o < s && !T.relative[t[o].type]; o++);
                                return function e(f, h, v, g, m, t) {
                                    return g && !g[P] && (g = e(g)), m && !m[P] && (m = e(m, t)), p(function(e, t, i, n) {
                                        var o, s, r, a = [],
                                            l = [],
                                            c = t.length,
                                            d = e || function(e, t, i) {
                                                for (var n = 0, o = t.length; n < o; n++) b(e, t[n], i);
                                                return i
                                            }(h || "*", i.nodeType ? [i] : i, []),
                                            u = !f || !e && h ? d : x(d, a, f, i, n),
                                            p = v ? m || (e ? f : c || g) ? [] : t : u;
                                        if (v && v(u, p, i, n), g)
                                            for (o = x(p, l), g(o, [], i, n), s = o.length; s--;)(r = o[s]) && (p[l[s]] = !(u[l[s]] = r));
                                        if (e) {
                                            if (m || f) {
                                                if (m) {
                                                    for (o = [], s = p.length; s--;)(r = p[s]) && o.push(u[s] = r);
                                                    m(null, p = [], o, n)
                                                }
                                                for (s = p.length; s--;)(r = p[s]) && -1 < (o = m ? G(e, r) : a[s]) && (e[o] = !(t[o] = r))
                                            }
                                        } else p = x(p === t ? p.splice(c, p.length) : p), m ? m(null, t, p, n) : Y.apply(t, p)
                                    })
                                }(1 < l && k(u), 1 < l && v(t.slice(0, l - 1).concat({
                                    value: " " === t[l - 2].type ? "*" : ""
                                })).replace(ie, "$1"), i, l < o && e(t.slice(l, o)), o < s && e(t = t.slice(o)), o < s && v(t))
                            }
                            u.push(i)
                        } return k(u)
                }(t[i]))[P] ? n : o).push(s);
                (s = F(e, (g = o, y = 0 < (m = n).length, w = 0 < g.length, y ? p(r) : r))).selector = e
            }

            function r(e, t, i, n, o) {
                var s, r, a, l = 0,
                    c = "0",
                    d = e && [],
                    u = [],
                    p = $,
                    f = e || w && T.find.TAG("*", o),
                    h = I += null == p ? 1 : Math.random() || .1,
                    v = f.length;
                for (o && ($ = t === E || t || o); c !== v && null != (s = f[c]); c++) {
                    if (w && s) {
                        for (r = 0, t || s.ownerDocument === E || (A(s), i = !O); a = g[r++];)
                            if (a(s, t || E, i)) {
                                n.push(s);
                                break
                            } o && (I = h)
                    }
                    y && ((s = !a && s) && l--, e && d.push(s))
                }
                if (l += c, y && c !== l) {
                    for (r = 0; a = m[r++];) a(d, u, t, i);
                    if (e) {
                        if (0 < l)
                            for (; c--;) d[c] || u[c] || (u[c] = U.call(n));
                        u = x(u)
                    }
                    Y.apply(n, u), o && !e && 0 < u.length && 1 < l + m.length && b.uniqueSort(n)
                }
                return o && (I = h, $ = p), d
            }
            return s
        }, y = b.select = function(e, t, i, n) {
            var o, s, r, a, l, c = "function" == typeof e && e,
                d = !n && S(e = c.selector || e);
            if (i = i || [], 1 === d.length) {
                if (2 < (s = d[0] = d[0].slice(0)).length && "ID" === (r = s[0]).type && g.getById && 9 === t.nodeType && O && T.relative[s[1].type]) {
                    if (!(t = (T.find.ID(r.matches[0].replace(ve, u), t) || [])[0])) return i;
                    c && (t = t.parentNode), e = e.slice(s.shift().value.length)
                }
                for (o = le.needsContext.test(e) ? 0 : s.length; o-- && (r = s[o], !T.relative[a = r.type]);)
                    if ((l = T.find[a]) && (n = l(r.matches[0].replace(ve, u), fe.test(s[0].type) && h(t.parentNode) || t))) {
                        if (s.splice(o, 1), !(e = n.length && v(s))) return Y.apply(i, n), i;
                        break
                    }
            }
            return (c || m(e, d))(n, t, !O, i, !t || fe.test(e) && h(t.parentNode) || t), i
        }, g.sortStable = P.split("").sort(W).join("") === P, g.detectDuplicates = !!C, A(), g.sortDetached = t(function(e) {
            return 1 & e.compareDocumentPosition(E.createElement("div"))
        }), t(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || n("type|href|height|width", function(e, t, i) {
            return i ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), g.attributes && t(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || n("value", function(e, t, i) {
            return i || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), t(function(e) {
            return null == e.getAttribute("disabled")
        }) || n(Q, function(e, t, i) {
            return i ? void 0 : !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null
        }), b
    }(x);

    function ne(e, t, i) {
        for (var n = [], o = void 0 !== i;
            (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (o && J(e).is(i)) break;
                n.push(e)
            } return n
    }

    function oe(e, t) {
        for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
        return i
    }
    J.find = ie, J.expr = ie.selectors, J.expr[":"] = J.expr.pseudos, J.uniqueSort = J.unique = ie.uniqueSort, J.text = ie.getText, J.isXMLDoc = ie.isXML, J.contains = ie.contains;
    var se = J.expr.match.needsContext,
        re = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        ae = /^.[^:#\[\.,]*$/;
    J.filter = function(e, t, i) {
        var n = t[0];
        return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? J.find.matchesSelector(n, e) ? [n] : [] : J.find.matches(e, J.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, J.fn.extend({
        find: function(e) {
            var t, i = this.length,
                n = [],
                o = this;
            if ("string" != typeof e) return this.pushStack(J(e).filter(function() {
                for (t = 0; t < i; t++)
                    if (J.contains(o[t], this)) return !0
            }));
            for (t = 0; t < i; t++) J.find(e, o[t], n);
            return (n = this.pushStack(1 < i ? J.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function(e) {
            return this.pushStack(t(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(t(this, e || [], !0))
        },
        is: function(e) {
            return !!t(this, "string" == typeof e && se.test(e) ? J(e) : e || [], !1).length
        }
    });
    var le, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (J.fn.init = function(e, t, i) {
        if (!e) return this;
        if (i = i || le, "string" != typeof e) return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : J.isFunction(e) ? void 0 !== i.ready ? i.ready(e) : e(J) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), J.makeArray(e, this));
        if (!(n = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : ce.exec(e)) || !n[1] && t) return (!t || t.jquery ? t || i : this.constructor(t)).find(e);
        if (n[1]) {
            if (t = t instanceof J ? t[0] : t, J.merge(this, J.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : R, !0)), re.test(n[1]) && J.isPlainObject(t))
                for (var n in t) J.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
            return this
        }
        return (i = R.getElementById(n[2])) && i.parentNode && (this.length = 1, this[0] = i), this.context = R, this.selector = e, this
    }).prototype = J.fn, le = J(R);
    var de = /^(?:parents|prev(?:Until|All))/,
        ue = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    J.fn.extend({
        has: function(e) {
            var t = J(e, this),
                i = t.length;
            return this.filter(function() {
                for (var e = 0; e < i; e++)
                    if (J.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            for (var i, n = 0, o = this.length, s = [], r = se.test(e) || "string" != typeof e ? J(e, t || this.context) : 0; n < o; n++)
                for (i = this[n]; i && i !== t; i = i.parentNode)
                    if (i.nodeType < 11 && (r ? -1 < r.index(i) : 1 === i.nodeType && J.find.matchesSelector(i, e))) {
                        s.push(i);
                        break
                    } return this.pushStack(1 < s.length ? J.uniqueSort(s) : s)
        },
        index: function(e) {
            return e ? "string" == typeof e ? Y.call(J(e), this[0]) : Y.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(J.uniqueSort(J.merge(this.get(), J(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), J.each({
        parent: function(e) {
            e = e.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(e) {
            return ne(e, "parentNode")
        },
        parentsUntil: function(e, t, i) {
            return ne(e, "parentNode", i)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return ne(e, "nextSibling")
        },
        prevAll: function(e) {
            return ne(e, "previousSibling")
        },
        nextUntil: function(e, t, i) {
            return ne(e, "nextSibling", i)
        },
        prevUntil: function(e, t, i) {
            return ne(e, "previousSibling", i)
        },
        siblings: function(e) {
            return oe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return oe(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || J.merge([], e.childNodes)
        }
    }, function(n, o) {
        J.fn[n] = function(e, t) {
            var i = J.map(this, o, e);
            return "Until" !== n.slice(-5) && (t = e), t && "string" == typeof t && (i = J.filter(t, i)), 1 < this.length && (ue[n] || J.uniqueSort(i), de.test(n) && i.reverse()), this.pushStack(i)
        }
    });
    var pe, fe = /\S+/g;

    function he(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }
    J.Callbacks = function(n) {
        var i;

        function o() {
            for (r = n.once, t = s = !0; l.length; c = -1)
                for (e = l.shift(); ++c < a.length;) !1 === a[c].apply(e[0], e[1]) && n.stopOnFalse && (c = a.length, e = !1);
            n.memory || (e = !1), s = !1, r && (a = e ? [] : "")
        }
        n = "string" == typeof n ? (i = {}, J.each(n.match(fe) || [], function(e, t) {
            i[t] = !0
        }), i) : J.extend({}, n);
        var s, e, t, r, a = [],
            l = [],
            c = -1,
            d = {
                add: function() {
                    return a && (e && !s && (c = a.length - 1, l.push(e)), function i(e) {
                        J.each(e, function(e, t) {
                            J.isFunction(t) ? n.unique && d.has(t) || a.push(t) : t && t.length && "string" !== J.type(t) && i(t)
                        })
                    }(arguments), e && !s && o()), this
                },
                remove: function() {
                    return J.each(arguments, function(e, t) {
                        for (var i; - 1 < (i = J.inArray(t, a, i));) a.splice(i, 1), i <= c && c--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < J.inArray(e, a) : 0 < a.length
                },
                empty: function() {
                    return a = a && [], this
                },
                disable: function() {
                    return r = l = [], a = e = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return r = l = [], e || (a = e = ""), this
                },
                locked: function() {
                    return !!r
                },
                fireWith: function(e, t) {
                    return r || (t = [e, (t = t || []).slice ? t.slice() : t], l.push(t), s || o()), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!t
                }
            };
        return d
    }, J.extend({
        Deferred: function(e) {
            var s = [
                    ["resolve", "done", J.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", J.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", J.Callbacks("memory")]
                ],
                o = "pending",
                r = {
                    state: function() {
                        return o
                    },
                    always: function() {
                        return a.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var o = arguments;
                        return J.Deferred(function(n) {
                            J.each(s, function(e, t) {
                                var i = J.isFunction(o[e]) && o[e];
                                a[t[1]](function() {
                                    var e = i && i.apply(this, arguments);
                                    e && J.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[t[0] + "With"](this === r ? n.promise() : this, i ? [e] : arguments)
                                })
                            }), o = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? J.extend(e, r) : r
                    }
                },
                a = {};
            return r.pipe = r.then, J.each(s, function(e, t) {
                var i = t[2],
                    n = t[3];
                r[t[1]] = i.add, n && i.add(function() {
                    o = n
                }, s[1 ^ e][2].disable, s[2][2].lock), a[t[0]] = function() {
                    return a[t[0] + "With"](this === a ? r : this, arguments), this
                }, a[t[0] + "With"] = i.fireWith
            }), r.promise(a), e && e.call(a, a), a
        },
        when: function(e) {
            function t(t, i, n) {
                return function(e) {
                    i[t] = this, n[t] = 1 < arguments.length ? B.call(arguments) : e, n === o ? c.notifyWith(i, n) : --l || c.resolveWith(i, n)
                }
            }
            var o, i, n, s = 0,
                r = B.call(arguments),
                a = r.length,
                l = 1 !== a || e && J.isFunction(e.promise) ? a : 0,
                c = 1 === l ? e : J.Deferred();
            if (1 < a)
                for (o = new Array(a), i = new Array(a), n = new Array(a); s < a; s++) r[s] && J.isFunction(r[s].promise) ? r[s].promise().progress(t(s, i, o)).done(t(s, n, r)).fail(c.reject) : --l;
            return l || c.resolveWith(n, r), c.promise()
        }
    }), J.fn.ready = function(e) {
        return J.ready.promise().done(e), this
    }, J.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? J.readyWait++ : J.ready(!0)
        },
        ready: function(e) {
            (!0 === e ? --J.readyWait : J.isReady) || (J.isReady = !0) !== e && 0 < --J.readyWait || (pe.resolveWith(R, [J]), J.fn.triggerHandler && (J(R).triggerHandler("ready"), J(R).off("ready")))
        }
    }), J.ready.promise = function(e) {
        return pe || (pe = J.Deferred(), "complete" === R.readyState || "loading" !== R.readyState && !R.documentElement.doScroll ? x.setTimeout(J.ready) : (R.addEventListener("DOMContentLoaded", n), x.addEventListener("load", n))), pe.promise(e)
    }, J.ready.promise();
    var ve = function(e, t, i, n, o, s, r) {
        var a = 0,
            l = e.length,
            c = null == i;
        if ("object" === J.type(i))
            for (a in o = !0, i) ve(e, t, a, i[a], !0, s, r);
        else if (void 0 !== n && (o = !0, J.isFunction(n) || (r = !0), c && (t = r ? (t.call(e, n), null) : (c = t, function(e, t, i) {
                return c.call(J(e), i)
            })), t))
            for (; a < l; a++) t(e[a], i, r ? n : n.call(e[a], a, t(e[a], i)));
        return o ? e : c ? t.call(e) : l ? t(e[0], i) : s
    };
    o.uid = 1, o.prototype = {
        register: function(e, t) {
            t = t || {};
            return e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        },
        cache: function(e) {
            if (!he(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, he(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, i) {
            var n, o = this.cache(e);
            if ("string" == typeof t) o[t] = i;
            else
                for (n in t) o[n] = t[n];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        },
        access: function(e, t, i) {
            var n;
            return void 0 === t || t && "string" == typeof t && void 0 === i ? void 0 !== (n = this.get(e, t)) ? n : this.get(e, J.camelCase(t)) : (this.set(e, t, i), void 0 !== i ? i : t)
        },
        remove: function(e, t) {
            var i, n, o, s = e[this.expando];
            if (void 0 !== s) {
                if (void 0 === t) this.register(e);
                else {
                    i = (n = J.isArray(t) ? t.concat(t.map(J.camelCase)) : (o = J.camelCase(t), t in s ? [t, o] : (n = o) in s ? [n] : n.match(fe) || [])).length;
                    for (; i--;) delete s[n[i]]
                }
                void 0 !== t && !J.isEmptyObject(s) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            e = e[this.expando];
            return void 0 !== e && !J.isEmptyObject(e)
        }
    };
    var ge = new o,
        me = new o,
        ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        we = /[A-Z]/g;

    function be(e, t) {
        return e = t || e, "none" === J.css(e, "display") || !J.contains(e.ownerDocument, e)
    }
    J.extend({
        hasData: function(e) {
            return me.hasData(e) || ge.hasData(e)
        },
        data: function(e, t, i) {
            return me.access(e, t, i)
        },
        removeData: function(e, t) {
            me.remove(e, t)
        },
        _data: function(e, t, i) {
            return ge.access(e, t, i)
        },
        _removeData: function(e, t) {
            ge.remove(e, t)
        }
    }), J.fn.extend({
        data: function(n, e) {
            var t, i, o, s = this[0],
                r = s && s.attributes;
            if (void 0 !== n) return "object" == typeof n ? this.each(function() {
                me.set(this, n)
            }) : ve(this, function(t) {
                var e, i;
                return s && void 0 === t ? void 0 !== (e = me.get(s, n) || me.get(s, n.replace(we, "-$&").toLowerCase())) ? e : (i = J.camelCase(n), void 0 !== (e = me.get(s, i)) || void 0 !== (e = l(s, i, void 0)) ? e : void 0) : (i = J.camelCase(n), void this.each(function() {
                    var e = me.get(this, i);
                    me.set(this, i, t), -1 < n.indexOf("-") && void 0 !== e && me.set(this, n, t)
                }))
            }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (o = me.get(s), 1 === s.nodeType && !ge.get(s, "hasDataAttrs"))) {
                for (t = r.length; t--;) r[t] && 0 === (i = r[t].name).indexOf("data-") && (i = J.camelCase(i.slice(5)), l(s, i, o[i]));
                ge.set(s, "hasDataAttrs", !0)
            }
            return o
        },
        removeData: function(e) {
            return this.each(function() {
                me.remove(this, e)
            })
        }
    }), J.extend({
        queue: function(e, t, i) {
            var n;
            return e ? (t = (t || "fx") + "queue", n = ge.get(e, t), i && (!n || J.isArray(i) ? n = ge.access(e, t, J.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = J.queue(e, t),
                n = i.length,
                o = i.shift(),
                s = J._queueHooks(e, t);
            "inprogress" === o && (o = i.shift(), n--), o && ("fx" === t && i.unshift("inprogress"), delete s.stop, o.call(e, function() {
                J.dequeue(e, t)
            }, s)), !n && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return ge.get(e, i) || ge.access(e, i, {
                empty: J.Callbacks("once memory").add(function() {
                    ge.remove(e, [t + "queue", i])
                })
            })
        }
    }), J.fn.extend({
        queue: function(t, i) {
            var e = 2;
            return "string" != typeof t && (i = t, t = "fx", e--), arguments.length < e ? J.queue(this[0], t) : void 0 === i ? this : this.each(function() {
                var e = J.queue(this, t, i);
                J._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && J.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                J.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            function i() {
                --o || s.resolveWith(r, [r])
            }
            var n, o = 1,
                s = J.Deferred(),
                r = this,
                a = this.length;
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = ge.get(r[a], e + "queueHooks")) && n.empty && (o++, n.empty.add(i));
            return i(), s.promise(t)
        }
    });
    var ke = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        xe = new RegExp("^(?:([+-])=|)(" + ke + ")([a-z%]*)$", "i"),
        Te = ["Top", "Right", "Bottom", "Left"],
        Se = /^(?:checkbox|radio)$/i,
        $e = /<([\w:-]+)/,
        Ce = /^$|\/(?:java|ecma)script/i,
        Ae = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ae.optgroup = Ae.option, Ae.tbody = Ae.tfoot = Ae.colgroup = Ae.caption = Ae.thead, Ae.th = Ae.td;
    var Ee = /<|&#?\w+;/,
        W = R.createDocumentFragment().appendChild(R.createElement("div"));
    (ie = R.createElement("input")).setAttribute("type", "radio"), ie.setAttribute("checked", "checked"), ie.setAttribute("name", "t"), W.appendChild(ie), K.checkClone = W.cloneNode(!0).cloneNode(!0).lastChild.checked, W.innerHTML = "<textarea>x</textarea>", K.noCloneChecked = !!W.cloneNode(!0).lastChild.defaultValue;
    var je = /^key/,
        Oe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ne = /^([^.]*)(?:\.(.+)|)/;
    J.event = {
        global: {},
        add: function(t, e, i, n, o) {
            var s, r, a, l, c, d, u, p, f, h = ge.get(t);
            if (h)
                for (i.handler && (i = (s = i).handler, o = s.selector), i.guid || (i.guid = J.guid++), (a = h.events) || (a = h.events = {}), (r = h.handle) || (r = h.handle = function(e) {
                        return void 0 !== J && J.event.triggered !== e.type ? J.event.dispatch.apply(t, arguments) : void 0
                    }), l = (e = (e || "").match(fe) || [""]).length; l--;) u = f = (c = Ne.exec(e[l]) || [])[1], p = (c[2] || "").split(".").sort(), u && (d = J.event.special[u] || {}, u = (o ? d.delegateType : d.bindType) || u, d = J.event.special[u] || {}, c = J.extend({
                    type: u,
                    origType: f,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && J.expr.match.needsContext.test(o),
                    namespace: p.join(".")
                }, s), (f = a[u]) || ((f = a[u] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, n, p, r) || t.addEventListener && t.addEventListener(u, r)), d.add && (d.add.call(t, c), c.handler.guid || (c.handler.guid = i.guid)), o ? f.splice(f.delegateCount++, 0, c) : f.push(c), J.event.global[u] = !0)
        },
        remove: function(e, t, i, n, o) {
            var s, r, a, l, c, d, u, p, f, h, v, g = ge.hasData(e) && ge.get(e);
            if (g && (l = g.events)) {
                for (c = (t = (t || "").match(fe) || [""]).length; c--;)
                    if (f = v = (a = Ne.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
                        for (u = J.event.special[f] || {}, p = l[f = (n ? u.delegateType : u.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = s = p.length; s--;) d = p[s], !o && v !== d.origType || i && i.guid !== d.guid || a && !a.test(d.namespace) || n && n !== d.selector && ("**" !== n || !d.selector) || (p.splice(s, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                        r && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, g.handle) || J.removeEvent(e, f, g.handle), delete l[f])
                    } else
                        for (f in l) J.event.remove(e, f + t[c], i, n, !0);
                J.isEmptyObject(l) && ge.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            e = J.event.fix(e);
            var t, i, n, o, s, r = B.call(arguments),
                a = (ge.get(this, "events") || {})[e.type] || [],
                l = J.event.special[e.type] || {};
            if ((r[0] = e).delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, e)) {
                for (s = J.event.handlers.call(this, e, a), t = 0;
                    (n = s[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = n.elem, i = 0;
                        (o = n.handlers[i++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o, e.data = o.data, void 0 !== (o = ((J.event.special[o.origType] || {}).handle || o.handler).apply(n.elem, r)) && !1 === (e.result = o) && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var i, n, o, s, r = [],
                a = t.delegateCount,
                l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                        for (n = [], i = 0; i < a; i++) void 0 === n[o = (s = t[i]).selector + " "] && (n[o] = s.needsContext ? -1 < J(o, this).index(l) : J.find(o, this, null, [l]).length), n[o] && n.push(s);
                        n.length && r.push({
                            elem: l,
                            handlers: n
                        })
                    } return a < t.length && r.push({
                elem: this,
                handlers: t.slice(a)
            }), r
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var i, n, o = t.button;
                return null == e.pageX && null != t.clientX && (i = (n = e.target.ownerDocument || R).documentElement, n = n.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[J.expando]) return e;
            var t, i, n, o = e.type,
                s = e,
                r = this.fixHooks[o];
            for (r || (this.fixHooks[o] = r = Oe.test(o) ? this.mouseHooks : je.test(o) ? this.keyHooks : {}), n = r.props ? this.props.concat(r.props) : this.props, e = new J.Event(s), t = n.length; t--;) e[i = n[t]] = s[i];
            return e.target || (e.target = R), 3 === e.target.nodeType && (e.target = e.target.parentNode), r.filter ? r.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== r() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === r() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && J.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return J.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, J.removeEvent = function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i)
    }, J.Event = function(e, t) {
        return this instanceof J.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? s : d) : this.type = e, t && J.extend(this, t), this.timeStamp = e && e.timeStamp || J.now(), void(this[J.expando] = !0)) : new J.Event(e, t)
    }, J.Event.prototype = {
        constructor: J.Event,
        isDefaultPrevented: d,
        isPropagationStopped: d,
        isImmediatePropagationStopped: d,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = s, e && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = s, e && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = s, e && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, J.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, o) {
        J.event.special[e] = {
            delegateType: o,
            bindType: o,
            handle: function(e) {
                var t, i = e.relatedTarget,
                    n = e.handleObj;
                return i && (i === this || J.contains(this, i)) || (e.type = n.origType, t = n.handler.apply(this, arguments), e.type = o), t
            }
        }
    }), J.fn.extend({
        on: function(e, t, i, n) {
            return u(this, e, t, i, n)
        },
        one: function(e, t, i, n) {
            return u(this, e, t, i, n, 1)
        },
        off: function(e, t, i) {
            var n, o;
            if (e && e.preventDefault && e.handleObj) return n = e.handleObj, J(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = d), this.each(function() {
                J.event.remove(this, e, i, t)
            });
            for (o in e) this.off(o, t, e[o]);
            return this
        }
    });
    var _e = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        De = /<script|<style|<link/i,
        He = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Pe = /^true\/(.*)/,
        Le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Ie(e, t, i, n) {
        var o, s = {};
        for (o in t) s[o] = e.style[o], e.style[o] = t[o];
        for (o in n = i.apply(e, n || []), t) e.style[o] = s[o];
        return n
    }
    J.extend({
        htmlPrefilter: function(e) {
            return e.replace(_e, "<$1></$2>")
        },
        clone: function(e, t, i) {
            var n, o, s, r, a, l, c, d = e.cloneNode(!0),
                u = J.contains(e.ownerDocument, e);
            if (!(K.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || J.isXMLDoc(e)))
                for (r = v(d), n = 0, o = (s = v(e)).length; n < o; n++) a = s[n], "input" === (c = (l = r[n]).nodeName.toLowerCase()) && Se.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (t)
                if (i)
                    for (s = s || v(e), r = r || v(d), n = 0, o = s.length; n < o; n++) f(s[n], r[n]);
                else f(e, d);
            return 0 < (r = v(d, "script")).length && h(r, !u && v(e, "script")), d
        },
        cleanData: function(e) {
            for (var t, i, n, o = J.event.special, s = 0; void 0 !== (i = e[s]); s++)
                if (he(i)) {
                    if (t = i[ge.expando]) {
                        if (t.events)
                            for (n in t.events) o[n] ? J.event.remove(i, n) : J.removeEvent(i, n, t.handle);
                        i[ge.expando] = void 0
                    }
                    i[me.expando] && (i[me.expando] = void 0)
                }
        }
    }), J.fn.extend({
        domManip: w,
        detach: function(e) {
            return b(this, e, !0)
        },
        remove: function(e) {
            return b(this, e)
        },
        text: function(e) {
            return ve(this, function(e) {
                return void 0 === e ? J.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return w(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || p(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return w(this, arguments, function(e) {
                var t;
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = p(this, e)).insertBefore(e, t.firstChild)
            })
        },
        before: function() {
            return w(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return w(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (J.cleanData(v(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return J.clone(this, e, t)
            })
        },
        html: function(e) {
            return ve(this, function(e) {
                var t = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !De.test(e) && !Ae[($e.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = J.htmlPrefilter(e);
                    try {
                        for (; i < n; i++) 1 === (t = this[i] || {}).nodeType && (J.cleanData(v(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var i = [];
            return w(this, arguments, function(e) {
                var t = this.parentNode;
                J.inArray(this, i) < 0 && (J.cleanData(v(this)), t && t.replaceChild(e, this))
            }, i)
        }
    }), J.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, r) {
        J.fn[e] = function(e) {
            for (var t, i = [], n = J(e), o = n.length - 1, s = 0; s <= o; s++) t = s === o ? this : this.clone(!0), J(n[s])[r](t), X.apply(i, t.get());
            return this.pushStack(i)
        }
    });
    var ze, qe, Me, Fe, We, Re, Be, Ue = {
            HTML: "block",
            BODY: "block"
        },
        Xe = /^margin/,
        Ye = new RegExp("^(" + ke + ")(?!px)[a-z%]+$", "i"),
        Ve = function(e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = x), t.getComputedStyle(e)
        },
        Ge = R.documentElement;

    function Qe() {
        Be.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", Be.innerHTML = "", Ge.appendChild(Re);
        var e = x.getComputedStyle(Be);
        qe = "1%" !== e.top, We = "2px" === e.marginLeft, Me = "4px" === e.width, Be.style.marginRight = "50%", Fe = "4px" === e.marginRight, Ge.removeChild(Re)
    }
    Re = R.createElement("div"), (Be = R.createElement("div")).style && (Be.style.backgroundClip = "content-box", Be.cloneNode(!0).style.backgroundClip = "", K.clearCloneStyle = "content-box" === Be.style.backgroundClip, Re.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", Re.appendChild(Be), J.extend(K, {
        pixelPosition: function() {
            return Qe(), qe
        },
        boxSizingReliable: function() {
            return null == Me && Qe(), Me
        },
        pixelMarginRight: function() {
            return null == Me && Qe(), Fe
        },
        reliableMarginLeft: function() {
            return null == Me && Qe(), We
        },
        reliableMarginRight: function() {
            var e, t = Be.appendChild(R.createElement("div"));
            return t.style.cssText = Be.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", Be.style.width = "1px", Ge.appendChild(Re), e = !parseFloat(x.getComputedStyle(t).marginRight), Ge.removeChild(Re), Be.removeChild(t), e
        }
    }));
    var Ke = /^(none|table(?!-c[ea]).+)/,
        Je = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ze = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        et = ["Webkit", "O", "Moz", "ms"],
        tt = R.createElement("div").style;
    J.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        e = S(e, "opacity");
                        return "" === e ? "1" : e
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(e, t, i, n) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, s, r, a = J.camelCase(t),
                    l = e.style;
                return t = J.cssProps[a] || (J.cssProps[a] = C(a) || a), r = J.cssHooks[t] || J.cssHooks[a], void 0 === i ? r && "get" in r && void 0 !== (o = r.get(e, !1, n)) ? o : l[t] : ("string" == (s = typeof i) && (o = xe.exec(i)) && o[1] && (i = c(e, t, o), s = "number"), void(null != i && i == i && ("number" === s && (i += o && o[3] || (J.cssNumber[a] ? "" : "px")), K.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (l[t] = "inherit"), r && "set" in r && void 0 === (i = r.set(e, i, n)) || (l[t] = i))))
            }
        },
        css: function(e, t, i, n) {
            var o, s = J.camelCase(t);
            return t = J.cssProps[s] || (J.cssProps[s] = C(s) || s), (s = J.cssHooks[t] || J.cssHooks[s]) && "get" in s && (o = s.get(e, !0, i)), void 0 === o && (o = S(e, t, n)), "normal" === o && t in Ze && (o = Ze[t]), "" === i || i ? (t = parseFloat(o), !0 === i || isFinite(t) ? t || 0 : o) : o
        }
    }), J.each(["height", "width"], function(e, s) {
        J.cssHooks[s] = {
            get: function(e, t, i) {
                return t ? Ke.test(J.css(e, "display")) && 0 === e.offsetWidth ? Ie(e, Je, function() {
                    return j(e, s, i)
                }) : j(e, s, i) : void 0
            },
            set: function(e, t, i) {
                var n, o = i && Ve(e),
                    o = i && E(e, s, i, "border-box" === J.css(e, "boxSizing", !1, o), o);
                return o && (n = xe.exec(t)) && "px" !== (n[3] || "px") && (e.style[s] = t, t = J.css(e, s)), A(0, t, o)
            }
        }
    }), J.cssHooks.marginLeft = $(K.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(S(e, "marginLeft")) || e.getBoundingClientRect().left - Ie(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px" : void 0
    }), J.cssHooks.marginRight = $(K.reliableMarginRight, function(e, t) {
        return t ? Ie(e, {
            display: "inline-block"
        }, S, [e, "marginRight"]) : void 0
    }), J.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(o, s) {
        J.cssHooks[o + s] = {
            expand: function(e) {
                for (var t = 0, i = {}, n = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) i[o + Te[t] + s] = n[t] || n[t - 2] || n[0];
                return i
            }
        }, Xe.test(o) || (J.cssHooks[o + s].set = A)
    }), J.fn.extend({
        css: function(e, t) {
            return ve(this, function(e, t, i) {
                var n, o, s = {},
                    r = 0;
                if (J.isArray(t)) {
                    for (n = Ve(e), o = t.length; r < o; r++) s[t[r]] = J.css(e, t[r], !1, n);
                    return s
                }
                return void 0 !== i ? J.style(e, t, i) : J.css(e, t)
            }, e, t, 1 < arguments.length)
        },
        show: function() {
            return O(this, !0)
        },
        hide: function() {
            return O(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                be(this) ? J(this).show() : J(this).hide()
            })
        }
    }), ((J.Tween = N).prototype = {
        constructor: N,
        init: function(e, t, i, n, o, s) {
            this.elem = e, this.prop = i, this.easing = o || J.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = s || (J.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = N.propHooks[this.prop];
            return (e && e.get ? e : N.propHooks._default).get(this)
        },
        run: function(e) {
            var t, i = N.propHooks[this.prop];
            return this.options.duration ? this.pos = t = J.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (i && i.set ? i : N.propHooks._default).set(this), this
        }
    }).init.prototype = N.prototype, (N.propHooks = {
        _default: {
            get: function(e) {
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = J.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(e) {
                J.fx.step[e.prop] ? J.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[J.cssProps[e.prop]] && !J.cssHooks[e.prop] ? e.elem[e.prop] = e.now : J.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = N.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, J.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, J.fx = N.prototype.init, J.fx.step = {};
    var it, nt, ot = /^(?:toggle|show|hide)$/,
        st = /queueHooks$/;
    J.Animation = J.extend(P, {
        tweeners: {
            "*": [function(e, t) {
                var i = this.createTween(e, t);
                return c(i.elem, e, xe.exec(t), i), i
            }]
        },
        tweener: function(e, t) {
            for (var i, n = 0, o = (e = J.isFunction(e) ? (t = e, ["*"]) : e.match(fe)).length; n < o; n++) i = e[n], P.tweeners[i] = P.tweeners[i] || [], P.tweeners[i].unshift(t)
        },
        prefilters: [function(t, e, i) {
            var n, o, s, r, a, l, c, d = this,
                u = {},
                p = t.style,
                f = t.nodeType && be(t),
                h = ge.get(t, "fxshow");
            for (n in i.queue || (null == (a = J._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || l()
                }), a.unqueued++, d.always(function() {
                    d.always(function() {
                        a.unqueued--, J.queue(t, "fx").length || a.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (c = J.css(t, "display")) ? ge.get(t, "olddisplay") || T(t.nodeName) : c) && "none" === J.css(t, "float") && (p.display = "inline-block")), i.overflow && (p.overflow = "hidden", d.always(function() {
                    p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
                })), e)
                if (o = e[n], ot.exec(o)) {
                    if (delete e[n], s = s || "toggle" === o, o === (f ? "hide" : "show")) {
                        if ("show" !== o || !h || void 0 === h[n]) continue;
                        f = !0
                    }
                    u[n] = h && h[n] || J.style(t, n)
                } else c = void 0;
            if (J.isEmptyObject(u)) "inline" === ("none" === c ? T(t.nodeName) : c) && (p.display = c);
            else
                for (n in h ? "hidden" in h && (f = h.hidden) : h = ge.access(t, "fxshow", {}), s && (h.hidden = !f), f ? J(t).show() : d.done(function() {
                        J(t).hide()
                    }), d.done(function() {
                        for (var e in ge.remove(t, "fxshow"), u) J.style(t, e, u[e])
                    }), u) r = H(f ? h[n] : 0, n, d), n in h || (h[n] = r.start, f && (r.end = r.start, r.start = "width" === n || "height" === n ? 1 : 0))
        }],
        prefilter: function(e, t) {
            t ? P.prefilters.unshift(e) : P.prefilters.push(e)
        }
    }), J.speed = function(e, t, i) {
        var n = e && "object" == typeof e ? J.extend({}, e) : {
            complete: i || !i && t || J.isFunction(e) && e,
            duration: e,
            easing: i && t || t && !J.isFunction(t) && t
        };
        return n.duration = J.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in J.fx.speeds ? J.fx.speeds[n.duration] : J.fx.speeds._default, null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
            J.isFunction(n.old) && n.old.call(this), n.queue && J.dequeue(this, n.queue)
        }, n
    }, J.fn.extend({
        fadeTo: function(e, t, i, n) {
            return this.filter(be).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n)
        },
        animate: function(t, e, i, n) {
            function o() {
                var e = P(this, J.extend({}, t), r);
                (s || ge.get(this, "finish")) && e.stop(!0)
            }
            var s = J.isEmptyObject(t),
                r = J.speed(e, i, n);
            return o.finish = o, s || !1 === r.queue ? this.each(o) : this.queue(r.queue, o)
        },
        stop: function(o, e, s) {
            function r(e) {
                var t = e.stop;
                delete e.stop, t(s)
            }
            return "string" != typeof o && (s = e, e = o, o = void 0), e && !1 !== o && this.queue(o || "fx", []), this.each(function() {
                var e = !0,
                    t = null != o && o + "queueHooks",
                    i = J.timers,
                    n = ge.get(this);
                if (t) n[t] && n[t].stop && r(n[t]);
                else
                    for (t in n) n[t] && n[t].stop && st.test(t) && r(n[t]);
                for (t = i.length; t--;) i[t].elem !== this || null != o && i[t].queue !== o || (i[t].anim.stop(s), e = !1, i.splice(t, 1));
                !e && s || J.dequeue(this, o)
            })
        },
        finish: function(r) {
            return !1 !== r && (r = r || "fx"), this.each(function() {
                var e, t = ge.get(this),
                    i = t[r + "queue"],
                    n = t[r + "queueHooks"],
                    o = J.timers,
                    s = i ? i.length : 0;
                for (t.finish = !0, J.queue(this, r, []), n && n.stop && n.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === r && (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; e < s; e++) i[e] && i[e].finish && i[e].finish.call(this);
                delete t.finish
            })
        }
    }), J.each(["toggle", "show", "hide"], function(e, n) {
        var o = J.fn[n];
        J.fn[n] = function(e, t, i) {
            return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(D(n, !0), e, t, i)
        }
    }), J.each({
        slideDown: D("show"),
        slideUp: D("hide"),
        slideToggle: D("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, n) {
        J.fn[e] = function(e, t, i) {
            return this.animate(n, e, t, i)
        }
    }), J.timers = [], J.fx.tick = function() {
        var e, t = 0,
            i = J.timers;
        for (it = J.now(); t < i.length; t++)(e = i[t])() || i[t] !== e || i.splice(t--, 1);
        i.length || J.fx.stop(), it = void 0
    }, J.fx.timer = function(e) {
        J.timers.push(e), e() ? J.fx.start() : J.timers.pop()
    }, J.fx.interval = 13, J.fx.start = function() {
        nt = nt || x.setInterval(J.fx.tick, J.fx.interval)
    }, J.fx.stop = function() {
        x.clearInterval(nt), nt = null
    }, J.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, J.fn.delay = function(n, e) {
        return n = J.fx && J.fx.speeds[n] || n, e = e || "fx", this.queue(e, function(e, t) {
            var i = x.setTimeout(e, n);
            t.stop = function() {
                x.clearTimeout(i)
            }
        })
    }, ie = R.createElement("input"), ke = (W = R.createElement("select")).appendChild(R.createElement("option")), ie.type = "checkbox", K.checkOn = "" !== ie.value, K.optSelected = ke.selected, W.disabled = !0, K.optDisabled = !ke.disabled, (ie = R.createElement("input")).value = "t", ie.type = "radio", K.radioValue = "t" === ie.value;
    var rt, at = J.expr.attrHandle;
    J.fn.extend({
        attr: function(e, t) {
            return ve(this, J.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                J.removeAttr(this, e)
            })
        }
    }), J.extend({
        attr: function(e, t, i) {
            var n, o, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return void 0 === e.getAttribute ? J.prop(e, t, i) : (1 === s && J.isXMLDoc(e) || (t = t.toLowerCase(), o = J.attrHooks[t] || (J.expr.match.bool.test(t) ? rt : void 0)), void 0 !== i ? null === i ? void J.removeAttr(e, t) : o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : o && "get" in o && null !== (n = o.get(e, t)) || null != (n = J.find.attr(e, t)) ? n : void 0)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!K.radioValue && "radio" === t && J.nodeName(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var i, n, o = 0,
                s = t && t.match(fe);
            if (s && 1 === e.nodeType)
                for (; i = s[o++];) n = J.propFix[i] || i, J.expr.match.bool.test(i) && (e[n] = !1), e.removeAttribute(i)
        }
    }), rt = {
        set: function(e, t, i) {
            return !1 === t ? J.removeAttr(e, i) : e.setAttribute(i, i), i
        }
    }, J.each(J.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var s = at[t] || J.find.attr;
        at[t] = function(e, t, i) {
            var n, o;
            return i || (o = at[t], at[t] = n, n = null != s(e, t, i) ? t.toLowerCase() : null, at[t] = o), n
        }
    });
    var lt = /^(?:input|select|textarea|button)$/i,
        ct = /^(?:a|area)$/i;
    J.fn.extend({
        prop: function(e, t) {
            return ve(this, J.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[J.propFix[e] || e]
            })
        }
    }), J.extend({
        prop: function(e, t, i) {
            var n, o, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s) return 1 === s && J.isXMLDoc(e) || (t = J.propFix[t] || t, o = J.propHooks[t]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : e[t] = i : o && "get" in o && null !== (n = o.get(e, t)) ? n : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = J.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : lt.test(e.nodeName) || ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), K.optSelected || (J.propHooks.selected = {
        get: function(e) {
            e = e.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(e) {
            e = e.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        J.propFix[this.toLowerCase()] = this
    });
    var dt = /[\t\r\n\f]/g;
    J.fn.extend({
        addClass: function(t) {
            var e, i, n, o, s, r, a = 0;
            if (J.isFunction(t)) return this.each(function(e) {
                J(this).addClass(t.call(this, e, L(this)))
            });
            if ("string" == typeof t && t)
                for (e = t.match(fe) || []; i = this[a++];)
                    if (r = L(i), n = 1 === i.nodeType && (" " + r + " ").replace(dt, " ")) {
                        for (s = 0; o = e[s++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                        r !== (r = J.trim(n)) && i.setAttribute("class", r)
                    } return this
        },
        removeClass: function(t) {
            var e, i, n, o, s, r, a = 0;
            if (J.isFunction(t)) return this.each(function(e) {
                J(this).removeClass(t.call(this, e, L(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(fe) || []; i = this[a++];)
                    if (r = L(i), n = 1 === i.nodeType && (" " + r + " ").replace(dt, " ")) {
                        for (s = 0; o = e[s++];)
                            for (; - 1 < n.indexOf(" " + o + " ");) n = n.replace(" " + o + " ", " ");
                        r !== (r = J.trim(n)) && i.setAttribute("class", r)
                    } return this
        },
        toggleClass: function(o, t) {
            var s = typeof o;
            return "boolean" == typeof t && "string" == s ? t ? this.addClass(o) : this.removeClass(o) : J.isFunction(o) ? this.each(function(e) {
                J(this).toggleClass(o.call(this, e, L(this), t), t)
            }) : this.each(function() {
                var e, t, i, n;
                if ("string" == s)
                    for (t = 0, i = J(this), n = o.match(fe) || []; e = n[t++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                else void 0 !== o && "boolean" != s || ((e = L(this)) && ge.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== o && ge.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            for (var t, i = 0, n = " " + e + " "; t = this[i++];)
                if (1 === t.nodeType && -1 < (" " + L(t) + " ").replace(dt, " ").indexOf(n)) return !0;
            return !1
        }
    });
    var ut = /\r/g,
        pt = /[\x20\t\r\n\f]+/g;
    J.fn.extend({
        val: function(t) {
            var i, e, n, o = this[0];
            return arguments.length ? (n = J.isFunction(t), this.each(function(e) {
                1 === this.nodeType && (null == (e = n ? t.call(this, e, J(this).val()) : t) ? e = "" : "number" == typeof e ? e += "" : J.isArray(e) && (e = J.map(e, function(e) {
                    return null == e ? "" : e + ""
                })), (i = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, e, "value") || (this.value = e))
            })) : o ? (i = J.valHooks[o.type] || J.valHooks[o.nodeName.toLowerCase()]) && "get" in i && void 0 !== (e = i.get(o, "value")) ? e : "string" == typeof(e = o.value) ? e.replace(ut, "") : null == e ? "" : e : void 0
        }
    }), J.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = J.find.attr(e, "value");
                    return null != t ? t : J.trim(J.text(e)).replace(pt, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, i = e.options, n = e.selectedIndex, o = "select-one" === e.type || n < 0, s = o ? null : [], r = o ? n + 1 : i.length, a = n < 0 ? r : o ? n : 0; a < r; a++)
                        if (((t = i[a]).selected || a === n) && (K.optDisabled ? !t.disabled : null === t.getAttribute("disabled")) && (!t.parentNode.disabled || !J.nodeName(t.parentNode, "optgroup"))) {
                            if (t = J(t).val(), o) return t;
                            s.push(t)
                        } return s
                },
                set: function(e, t) {
                    for (var i, n, o = e.options, s = J.makeArray(t), r = o.length; r--;)((n = o[r]).selected = -1 < J.inArray(J.valHooks.option.get(n), s)) && (i = !0);
                    return i || (e.selectedIndex = -1), s
                }
            }
        }
    }), J.each(["radio", "checkbox"], function() {
        J.valHooks[this] = {
            set: function(e, t) {
                return J.isArray(t) ? e.checked = -1 < J.inArray(J(e).val(), t) : void 0
            }
        }, K.checkOn || (J.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var ft = /^(?:focusinfocus|focusoutblur)$/;
    J.extend(J.event, {
        trigger: function(e, t, i, n) {
            var o, s, r, a, l, c, d = [i || R],
                u = Q.call(e, "type") ? e.type : e,
                p = Q.call(e, "namespace") ? e.namespace.split(".") : [],
                f = s = i = i || R;
            if (3 !== i.nodeType && 8 !== i.nodeType && !ft.test(u + J.event.triggered) && (-1 < u.indexOf(".") && (u = (p = u.split(".")).shift(), p.sort()), a = u.indexOf(":") < 0 && "on" + u, (e = e[J.expando] ? e : new J.Event(u, "object" == typeof e && e)).isTrigger = n ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), t = null == t ? [e] : J.makeArray(t, [e]), c = J.event.special[u] || {}, n || !c.trigger || !1 !== c.trigger.apply(i, t))) {
                if (!n && !c.noBubble && !J.isWindow(i)) {
                    for (r = c.delegateType || u, ft.test(r + u) || (f = f.parentNode); f; f = f.parentNode) d.push(f), s = f;
                    s === (i.ownerDocument || R) && d.push(s.defaultView || s.parentWindow || x)
                }
                for (o = 0;
                    (f = d[o++]) && !e.isPropagationStopped();) e.type = 1 < o ? r : c.bindType || u, (l = (ge.get(f, "events") || {})[e.type] && ge.get(f, "handle")) && l.apply(f, t), (l = a && f[a]) && l.apply && he(f) && (e.result = l.apply(f, t), !1 === e.result && e.preventDefault());
                return e.type = u, n || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), t) || !he(i) || a && J.isFunction(i[u]) && !J.isWindow(i) && ((s = i[a]) && (i[a] = null), i[J.event.triggered = u](), J.event.triggered = void 0, s && (i[a] = s)), e.result
            }
        },
        simulate: function(e, t, i) {
            e = J.extend(new J.Event, i, {
                type: e,
                isSimulated: !0
            });
            J.event.trigger(e, null, t), e.isDefaultPrevented() && i.preventDefault()
        }
    }), J.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                J.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var i = this[0];
            return i ? J.event.trigger(e, t, i, !0) : void 0
        }
    }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, i) {
        J.fn[i] = function(e, t) {
            return 0 < arguments.length ? this.on(i, null, e, t) : this.trigger(i)
        }
    }), J.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), K.focusin = "onfocusin" in x, K.focusin || J.each({
        focus: "focusin",
        blur: "focusout"
    }, function(i, n) {
        function o(e) {
            J.event.simulate(n, e.target, J.event.fix(e))
        }
        J.event.special[n] = {
            setup: function() {
                var e = this.ownerDocument || this,
                    t = ge.access(e, n);
                t || e.addEventListener(i, o, !0), ge.access(e, n, (t || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this,
                    t = ge.access(e, n) - 1;
                t ? ge.access(e, n, t) : (e.removeEventListener(i, o, !0), ge.remove(e, n))
            }
        }
    });
    var ht = x.location,
        vt = J.now(),
        gt = /\?/;
    J.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, J.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new x.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || J.error("Invalid XML: " + e), t
    };
    var mt = /#.*$/,
        yt = /([?&])_=[^&]*/,
        wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        bt = /^(?:GET|HEAD)$/,
        kt = /^\/\//,
        xt = {},
        Tt = {},
        St = "*/".concat("*"),
        $t = R.createElement("a");
    $t.href = ht.href, J.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ht.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ht.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": St,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": J.parseJSON,
                "text xml": J.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? q(q(e, J.ajaxSettings), t) : q(J.ajaxSettings, e)
        },
        ajaxPrefilter: I(xt),
        ajaxTransport: I(Tt),
        ajax: function(e, t) {
            function i(e, t, i, n) {
                var o, s, r, a = t;
                2 !== w && (w = 2, u && x.clearTimeout(u), l = void 0, d = n || "", k.readyState = 0 < e ? 4 : 0, n = 200 <= e && e < 300 || 304 === e, i && (r = function(e, t, i) {
                    for (var n, o, s, r, a = e.contents, l = e.dataTypes;
                        "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (n)
                        for (o in a)
                            if (a[o] && a[o].test(n)) {
                                l.unshift(o);
                                break
                            } if (l[0] in i) s = l[0];
                    else {
                        for (o in i) {
                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                s = o;
                                break
                            }
                            r = r || o
                        }
                        s = s || r
                    }
                    return s ? (s !== l[0] && l.unshift(s), i[s]) : void 0
                }(f, k, i)), r = function(e, t, i, n) {
                    var o, s, r, a, l, c = {},
                        d = e.dataTypes.slice();
                    if (d[1])
                        for (r in e.converters) c[r.toLowerCase()] = e.converters[r];
                    for (s = d.shift(); s;)
                        if (e.responseFields[s] && (i[e.responseFields[s]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = s, s = d.shift())
                            if ("*" === s) s = l;
                            else if ("*" !== l && l !== s) {
                        if (!(r = c[l + " " + s] || c["* " + s]))
                            for (o in c)
                                if ((a = o.split(" "))[1] === s && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                                    !0 === r ? r = c[o] : !0 !== c[o] && (s = a[0], d.unshift(a[1]));
                                    break
                                } if (!0 !== r)
                            if (r && e.throws) t = r(t);
                            else try {
                                t = r(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: r ? e : "No conversion from " + l + " to " + s
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(f, r, k, n), n ? (f.ifModified && ((i = k.getResponseHeader("Last-Modified")) && (J.lastModified[c] = i), (i = k.getResponseHeader("etag")) && (J.etag[c] = i)), 204 === e || "HEAD" === f.type ? a = "nocontent" : 304 === e ? a = "notmodified" : (a = r.state, o = r.data, n = !(s = r.error))) : (s = a, !e && a || (a = "error", e < 0 && (e = 0))), k.status = e, k.statusText = (t || a) + "", n ? g.resolveWith(h, [o, a, k]) : g.rejectWith(h, [k, a, s]), k.statusCode(y), y = void 0, p && v.trigger(n ? "ajaxSuccess" : "ajaxError", [k, f, n ? o : s]), m.fireWith(h, [k, a]), p && (v.trigger("ajaxComplete", [k, f]), --J.active || J.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var l, c, d, n, u, o, p, s, f = J.ajaxSetup({}, t),
                h = f.context || f,
                v = f.context && (h.nodeType || h.jquery) ? J(h) : J.event,
                g = J.Deferred(),
                m = J.Callbacks("once memory"),
                y = f.statusCode || {},
                r = {},
                a = {},
                w = 0,
                b = "canceled",
                k = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === w) {
                            if (!n)
                                for (n = {}; t = wt.exec(d);) n[t[1].toLowerCase()] = t[2];
                            t = n[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? d : null
                    },
                    setRequestHeader: function(e, t) {
                        var i = e.toLowerCase();
                        return w || (e = a[i] = a[i] || e, r[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return w || (f.mimeType = e), this
                    },
                    statusCode: function(e) {
                        if (e)
                            if (w < 2)
                                for (var t in e) y[t] = [y[t], e[t]];
                            else k.always(e[k.status]);
                        return this
                    },
                    abort: function(e) {
                        e = e || b;
                        return l && l.abort(e), i(0, e), this
                    }
                };
            if (g.promise(k).complete = m.add, k.success = k.done, k.error = k.fail, f.url = ((e || f.url || ht.href) + "").replace(mt, "").replace(kt, ht.protocol + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = J.trim(f.dataType || "*").toLowerCase().match(fe) || [""], null == f.crossDomain) {
                o = R.createElement("a");
                try {
                    o.href = f.url, o.href, f.crossDomain = $t.protocol + "//" + $t.host != o.protocol + "//" + o.host
                } catch (e) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = J.param(f.data, f.traditional)), z(xt, f, t, k), 2 === w) return k;
            for (s in (p = J.event && f.global) && 0 == J.active++ && J.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !bt.test(f.type), c = f.url, f.hasContent || (f.data && (c = f.url += (gt.test(c) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (f.url = yt.test(c) ? c.replace(yt, "$1_=" + vt++) : c + (gt.test(c) ? "&" : "?") + "_=" + vt++)), f.ifModified && (J.lastModified[c] && k.setRequestHeader("If-Modified-Since", J.lastModified[c]), J.etag[c] && k.setRequestHeader("If-None-Match", J.etag[c])), (f.data && f.hasContent && !1 !== f.contentType || t.contentType) && k.setRequestHeader("Content-Type", f.contentType), k.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + St + "; q=0.01" : "") : f.accepts["*"]), f.headers) k.setRequestHeader(s, f.headers[s]);
            if (f.beforeSend && (!1 === f.beforeSend.call(h, k, f) || 2 === w)) return k.abort();
            for (s in b = "abort", {
                    success: 1,
                    error: 1,
                    complete: 1
                }) k[s](f[s]);
            if (l = z(Tt, f, t, k)) {
                if (k.readyState = 1, p && v.trigger("ajaxSend", [k, f]), 2 === w) return k;
                f.async && 0 < f.timeout && (u = x.setTimeout(function() {
                    k.abort("timeout")
                }, f.timeout));
                try {
                    w = 1, l.send(r, i)
                } catch (e) {
                    if (!(w < 2)) throw e;
                    i(-1, e)
                }
            } else i(-1, "No Transport");
            return k
        },
        getJSON: function(e, t, i) {
            return J.get(e, t, i, "json")
        },
        getScript: function(e, t) {
            return J.get(e, void 0, t, "script")
        }
    }), J.each(["get", "post"], function(e, o) {
        J[o] = function(e, t, i, n) {
            return J.isFunction(t) && (n = n || i, i = t, t = void 0), J.ajax(J.extend({
                url: e,
                type: o,
                dataType: n,
                data: t,
                success: i
            }, J.isPlainObject(e) && e))
        }
    }), J._evalUrl = function(e) {
        return J.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    }, J.fn.extend({
        wrapAll: function(t) {
            var e;
            return J.isFunction(t) ? this.each(function(e) {
                J(this).wrapAll(t.call(this, e))
            }) : (this[0] && (e = J(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(i) {
            return J.isFunction(i) ? this.each(function(e) {
                J(this).wrapInner(i.call(this, e))
            }) : this.each(function() {
                var e = J(this),
                    t = e.contents();
                t.length ? t.wrapAll(i) : e.append(i)
            })
        },
        wrap: function(t) {
            var i = J.isFunction(t);
            return this.each(function(e) {
                J(this).wrapAll(i ? t.call(this, e) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
            }).end()
        }
    }), J.expr.filters.hidden = function(e) {
        return !J.expr.filters.visible(e)
    }, J.expr.filters.visible = function(e) {
        return 0 < e.offsetWidth || 0 < e.offsetHeight || 0 < e.getClientRects().length
    };
    var Ct = /%20/g,
        At = /\[\]$/,
        Et = /\r?\n/g,
        jt = /^(?:submit|button|image|reset|file)$/i,
        Ot = /^(?:input|select|textarea|keygen)/i;
    J.param = function(e, t) {
        function i(e, t) {
            t = J.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        }
        var n, o = [];
        if (void 0 === t && (t = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(e) || e.jquery && !J.isPlainObject(e)) J.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) ! function i(n, e, o, s) {
                if (J.isArray(e)) J.each(e, function(e, t) {
                    o || At.test(n) ? s(n, t) : i(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, o, s)
                });
                else if (o || "object" !== J.type(e)) s(n, e);
                else
                    for (var t in e) i(n + "[" + t + "]", e[t], o, s)
            }(n, e[n], t, i);
        return o.join("&").replace(Ct, "+")
    }, J.fn.extend({
        serialize: function() {
            return J.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = J.prop(this, "elements");
                return e ? J.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !J(this).is(":disabled") && Ot.test(this.nodeName) && !jt.test(e) && (this.checked || !Se.test(e))
            }).map(function(e, t) {
                var i = J(this).val();
                return null == i ? null : J.isArray(i) ? J.map(i, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Et, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: i.replace(Et, "\r\n")
                }
            }).get()
        }
    }), J.ajaxSettings.xhr = function() {
        try {
            return new x.XMLHttpRequest
        } catch (e) {}
    };
    var Nt = {
            0: 200,
            1223: 204
        },
        _t = J.ajaxSettings.xhr();
    K.cors = !!_t && "withCredentials" in _t, K.ajax = _t = !!_t, J.ajaxTransport(function(o) {
        var s, r;
        return K.cors || _t && !o.crossDomain ? {
            send: function(e, t) {
                var i, n = o.xhr();
                if (n.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
                    for (i in o.xhrFields) n[i] = o.xhrFields[i];
                for (i in o.mimeType && n.overrideMimeType && n.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) n.setRequestHeader(i, e[i]);
                s = function(e) {
                    return function() {
                        s && (s = r = n.onload = n.onerror = n.onabort = n.onreadystatechange = null, "abort" === e ? n.abort() : "error" === e ? "number" != typeof n.status ? t(0, "error") : t(n.status, n.statusText) : t(Nt[n.status] || n.status, n.statusText, "text" !== (n.responseType || "text") || "string" != typeof n.responseText ? {
                            binary: n.response
                        } : {
                            text: n.responseText
                        }, n.getAllResponseHeaders()))
                    }
                }, n.onload = s(), r = n.onerror = s("error"), void 0 !== n.onabort ? n.onabort = r : n.onreadystatechange = function() {
                    4 === n.readyState && x.setTimeout(function() {
                        s && r()
                    })
                }, s = s("abort");
                try {
                    n.send(o.hasContent && o.data || null)
                } catch (e) {
                    if (s) throw e
                }
            },
            abort: function() {
                s && s()
            }
        } : void 0
    }), J.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return J.globalEval(e), e
            }
        }
    }), J.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), J.ajaxTransport("script", function(i) {
        var n, o;
        if (i.crossDomain) return {
            send: function(e, t) {
                n = J("<script>").prop({
                    charset: i.scriptCharset,
                    src: i.url
                }).on("load error", o = function(e) {
                    n.remove(), o = null, e && t("error" === e.type ? 404 : 200, e.type)
                }), R.head.appendChild(n[0])
            },
            abort: function() {
                o && o()
            }
        }
    });
    var Dt = [],
        Ht = /(=)\?(?=&|$)|\?\?/;
    J.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Dt.pop() || J.expando + "_" + vt++;
            return this[e] = !0, e
        }
    }), J.ajaxPrefilter("json jsonp", function(e, t, i) {
        var n, o, s, r = !1 !== e.jsonp && (Ht.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ht.test(e.data) && "data");
        return r || "jsonp" === e.dataTypes[0] ? (n = e.jsonpCallback = J.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, r ? e[r] = e[r].replace(Ht, "$1" + n) : !1 !== e.jsonp && (e.url += (gt.test(e.url) ? "&" : "?") + e.jsonp + "=" + n), e.converters["script json"] = function() {
            return s || J.error(n + " was not called"), s[0]
        }, e.dataTypes[0] = "json", o = x[n], x[n] = function() {
            s = arguments
        }, i.always(function() {
            void 0 === o ? J(x).removeProp(n) : x[n] = o, e[n] && (e.jsonpCallback = t.jsonpCallback, Dt.push(n)), s && J.isFunction(o) && o(s[0]), s = o = void 0
        }), "script") : void 0
    }), J.parseHTML = function(e, t, i) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (i = t, t = !1), t = t || R;
        var n = re.exec(e),
            i = !i && [];
        return n ? [t.createElement(n[1])] : (n = g([e], t, i), i && i.length && J(i).remove(), J.merge([], n.childNodes))
    };
    var Pt = J.fn.load;
    J.fn.load = function(e, t, i) {
        if ("string" != typeof e && Pt) return Pt.apply(this, arguments);
        var n, o, s, r = this,
            a = e.indexOf(" ");
        return -1 < a && (n = J.trim(e.slice(a)), e = e.slice(0, a)), J.isFunction(t) ? (i = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < r.length && J.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            s = arguments, r.html(n ? J("<div>").append(J.parseHTML(e)).find(n) : e)
        }).always(i && function(e, t) {
            r.each(function() {
                i.apply(this, s || [e.responseText, t, e])
            })
        }), this
    }, J.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        J.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), J.expr.filters.animated = function(t) {
        return J.grep(J.timers, function(e) {
            return t === e.elem
        }).length
    }, J.offset = {
        setOffset: function(e, t, i) {
            var n, o, s, r, a = J.css(e, "position"),
                l = J(e),
                c = {};
            "static" === a && (e.style.position = "relative"), s = l.offset(), n = J.css(e, "top"), r = J.css(e, "left"), r = ("absolute" === a || "fixed" === a) && -1 < (n + r).indexOf("auto") ? (o = (a = l.position()).top, a.left) : (o = parseFloat(n) || 0, parseFloat(r) || 0), J.isFunction(t) && (t = t.call(e, i, J.extend({}, s))), null != t.top && (c.top = t.top - s.top + o), null != t.left && (c.left = t.left - s.left + r), "using" in t ? t.using.call(e, c) : l.css(c)
        }
    }, J.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                J.offset.setOffset(this, t, e)
            });
            var e, i = this[0],
                n = {
                    top: 0,
                    left: 0
                },
                o = i && i.ownerDocument;
            return o ? (e = o.documentElement, J.contains(e, i) ? (n = i.getBoundingClientRect(), o = M(o), {
                top: n.top + o.pageYOffset - e.clientTop,
                left: n.left + o.pageXOffset - e.clientLeft
            }) : n) : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, i = this[0],
                    n = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === J.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), J.nodeName(e[0], "html") || (n = e.offset()), n.top += J.css(e[0], "borderTopWidth", !0), n.left += J.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - J.css(i, "marginTop", !0),
                    left: t.left - n.left - J.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === J.css(e, "position");) e = e.offsetParent;
                return e || Ge
            })
        }
    }), J.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, o) {
        var s = "pageYOffset" === o;
        J.fn[t] = function(e) {
            return ve(this, function(e, t, i) {
                var n = M(e);
                return void 0 === i ? n ? n[o] : e[t] : void(n ? n.scrollTo(s ? n.pageXOffset : i, s ? i : n.pageYOffset) : e[t] = i)
            }, t, e, arguments.length)
        }
    }), J.each(["top", "left"], function(e, i) {
        J.cssHooks[i] = $(K.pixelPosition, function(e, t) {
            return t ? (t = S(e, i), Ye.test(t) ? J(e).position()[i] + "px" : t) : void 0
        })
    }), J.each({
        Height: "height",
        Width: "width"
    }, function(s, r) {
        J.each({
            padding: "inner" + s,
            content: r,
            "": "outer" + s
        }, function(n, e) {
            J.fn[e] = function(e, t) {
                var i = arguments.length && (n || "boolean" != typeof e),
                    o = n || (!0 === e || !0 === t ? "margin" : "border");
                return ve(this, function(e, t, i) {
                    var n;
                    return J.isWindow(e) ? e.document.documentElement["client" + s] : 9 === e.nodeType ? (n = e.documentElement, Math.max(e.body["scroll" + s], n["scroll" + s], e.body["offset" + s], n["offset" + s], n["client" + s])) : void 0 === i ? J.css(e, t, o) : J.style(e, t, i, o)
                }, r, i ? e : void 0, i, null)
            }
        })
    }), J.fn.extend({
        bind: function(e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
        },
        size: function() {
            return this.length
        }
    }), J.fn.andSelf = J.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return J
    });
    var Lt = x.jQuery,
        It = x.$;
    return J.noConflict = function(e) {
        return x.$ === J && (x.$ = It), e && x.jQuery === J && (x.jQuery = Lt), J
    }, e || (x.jQuery = x.$ = J), J
}),
function(h) {
    var n = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    h.zoom = function(e, t, i, n) {
        var o, s, r, a, l, c, d, u = h(e),
            p = u.css("position"),
            f = h(t);
        return e.style.position = /(absolute|fixed)/.test(p) ? p : "relative", e.style.overflow = "hidden", i.style.width = i.style.height = "", h(i).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: i.width * n,
            height: i.height * n,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(e), {
            init: function() {
                s = u.outerWidth(), o = u.outerHeight(), r = t === e ? (a = s, o) : (a = f.outerWidth(), f.outerHeight()), l = (i.width - s) / a, c = (i.height - o) / r, d = f.offset()
            },
            move: function(e) {
                var t = e.pageX - d.left,
                    e = e.pageY - d.top,
                    e = Math.max(Math.min(e, r), 0),
                    t = Math.max(Math.min(t, a), 0);
                i.style.left = t * -l + "px", i.style.top = e * -c + "px"
            }
        }
    }, h.fn.zoom = function(i) {
        return this.each(function() {
            var o = h.extend({}, n, i || {}),
                s = o.target && h(o.target)[0] || this,
                e = this,
                r = h(e),
                a = document.createElement("img"),
                l = h(a),
                c = "mousemove.zoom",
                d = !1,
                u = !1;
            if (!o.url) {
                var t = e.querySelector("img");
                if (t && (o.url = t.getAttribute("data-src") || t.currentSrc || t.src), !o.url) return
            }
            r.one("zoom.destroy", function(e, t) {
                r.off(".zoom"), s.style.position = e, s.style.overflow = t, a.onload = null, l.remove()
            }.bind(this, s.style.position, s.style.overflow)), a.onload = function() {
                function t(e) {
                    n.init(), n.move(e), l.stop().fadeTo(h.support.opacity ? o.duration : 0, 1, !!h.isFunction(o.onZoomIn) && o.onZoomIn.call(a))
                }

                function i() {
                    l.stop().fadeTo(o.duration, 0, !!h.isFunction(o.onZoomOut) && o.onZoomOut.call(a))
                }
                var n = h.zoom(s, e, a, o.magnify);
                "grab" === o.on ? r.on("mousedown.zoom", function(e) {
                    1 === e.which && (h(document).one("mouseup.zoom", function() {
                        i(), h(document).off(c, n.move)
                    }), t(e), h(document).on(c, n.move), e.preventDefault())
                }) : "click" === o.on ? r.on("click.zoom", function(e) {
                    return d ? void 0 : (d = !0, t(e), h(document).on(c, n.move), h(document).one("click.zoom", function() {
                        i(), d = !1, h(document).off(c, n.move)
                    }), !1)
                }) : "toggle" === o.on ? r.on("click.zoom", function(e) {
                    d ? i() : t(e), d = !d
                }) : "mouseover" === o.on && (n.init(), r.on("mouseenter.zoom", t).on("mouseleave.zoom", i).on(c, n.move)), o.touch && r.on("touchstart.zoom", function(e) {
                    e.preventDefault(), u ? (u = !1, i()) : (u = !0, t(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(e) {
                    e.preventDefault(), n.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function(e) {
                    e.preventDefault(), u && (u = !1, i())
                }), h.isFunction(o.callback) && o.callback.call(a)
            }, a.setAttribute("role", "presentation"), a.alt = "", a.src = o.url
        })
    }, h.fn.zoom.defaults = n
}(window.jQuery),
function() {
    function a(e, t) {
        for (var i = -1, n = t.length, o = e.length; ++i < n;) e[o + i] = t[i];
        return e
    }

    function t(e, t, i) {
        for (var n = -1, o = e.length; ++n < o;) {
            var s, r, a = e[n],
                l = t(a);
            null != l && (s === Q ? l == l : i(l, s)) && (s = l, r = a)
        }
        return r
    }

    function e(e) {
        return e && e.Object === Object ? e : null
    }

    function i(e) {
        return te[e]
    }

    function u(e) {
        var t = !1;
        if (null != e && "function" != typeof e.toString) try {
            t = !!(e + "")
        } catch (e) {}
        return t
    }

    function c(e, t) {
        return -1 < (e = "number" == typeof e || ee.test(e) ? +e : -1) && 0 == e % 1 && e < (null == t ? 9007199254740991 : t)
    }

    function s(e) {
        if (M(e) && !Ne(e)) {
            if (e instanceof n) return e;
            if (pe.call(e, "__wrapped__")) {
                var t = new n(e.__wrapped__, e.__chain__);
                return t.__actions__ = x(e.__actions__), t
            }
        }
        return new n(e)
    }

    function n(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t
    }

    function o(e, t, i, n) {
        var o;
        return (o = e === Q) || (o = (e === (o = ue[i]) || e != e && o != o) && !pe.call(n, i)), o ? t : e
    }

    function r(e) {
        return q(e) ? ye(e) : {}
    }

    function l(e, t, i) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return setTimeout(function() {
            e.apply(Q, i)
        }, t)
    }

    function d(e, n) {
        var o = [];
        return Te(e, function(e, t, i) {
            n(e, t, i) && o.push(e)
        }), o
    }

    function p(e, t, i, n) {
        n = n || [];
        for (var o = -1, s = e.length; ++o < s;) {
            var r = e[o];
            0 < t && M(r) && L(r) && (i || Ne(r) || P(r)) ? 1 < t ? p(r, t - 1, i, n) : a(n, r) : i || (n[n.length] = r)
        }
        return n
    }

    function f(e, t) {
        return e && Se(e, t, U)
    }

    function h(t, e) {
        return d(e, function(e) {
            return I(t[e])
        })
    }

    function v(e, t, i, n, o) {
        return e === t || (null == e || null == t || !q(e) && !M(t) ? e != e && t != t : function(t, e, i, n, o, s) {
            var r = Ne(t),
                a = Ne(e),
                l = "[object Array]",
                c = "[object Array]";
            r || "[object Arguments]" == (l = he.call(t)) && (l = "[object Object]"), a || "[object Arguments]" == (c = he.call(e)) && (c = "[object Object]");
            var d = "[object Object]" == l && !u(t),
                a = "[object Object]" == c && !u(e);
            return !(c = l == c) || r || d ? 2 & o || (l = d && pe.call(t, "__wrapped__"), a = a && pe.call(e, "__wrapped__"), !l && !a) ? !!c && ((l = j(s = s || [], function(e) {
                return e[0] === t
            })) && l[1] ? l[1] == e : (s.push([t, e]), e = (r ? function(e, t, i, n, o, s) {
                var r = -1,
                    a = 1 & o,
                    l = e.length,
                    c = t.length;
                if (l != c && !(2 & o && l < c)) return !1;
                for (c = !0; ++r < l;) {
                    var d = e[r],
                        u = t[r];
                    if (void 0 !== Q) {
                        c = !1;
                        break
                    }
                    if (a) {
                        if (!T(t, function(e) {
                                return d === e || i(d, e, n, o, s)
                            })) {
                            c = !1;
                            break
                        }
                    } else if (d !== u && !i(d, u, n, o, s)) {
                        c = !1;
                        break
                    }
                }
                return c
            } : function(e, t, i, n, o, s) {
                var r = 2 & o,
                    a = U(e),
                    l = a.length,
                    c = U(t).length;
                if (l != c && !r) return !1;
                for (var d = l; d--;) {
                    var u = a[d];
                    if (!(r ? u in t : pe.call(t, u))) return !1
                }
                for (c = !0; ++d < l;) {
                    var p = e[u = a[d]],
                        f = t[u];
                    if (void 0 !== Q || p !== f && !i(p, f, n, o, s)) {
                        c = !1;
                        break
                    }
                    r = r || "constructor" == u
                }
                return c && !r && (i = e.constructor) != (n = t.constructor) && "constructor" in e && "constructor" in t && !("function" == typeof i && i instanceof i && "function" == typeof n && n instanceof n) && (c = !1), c
            })(t, e, i, n, o, s), s.pop(), e)) : i(l ? t.value() : t, a ? e.value() : e, n, o, s) : function(e, t) {
                switch (l) {
                    case "[object Boolean]":
                    case "[object Date]":
                        return +e == +t;
                    case "[object Error]":
                        return e.name == t.name && e.message == t.message;
                    case "[object Number]":
                        return e != +e ? t != +t : e == +t;
                    case "[object RegExp]":
                    case "[object String]":
                        return e == t + ""
                }
                return !1
            }(t, e)
        }(e, t, v, i, n, o))
    }

    function g(e) {
        var t = typeof e;
        return "function" == t ? e : null == e ? V : ("object" == t ? w : b)(e)
    }

    function m(e) {
        var t, i = [];
        for (t in e = null == e ? e : Object(e)) i.push(t);
        return i
    }

    function y(e, n) {
        var o = -1,
            s = L(e) ? Array(e.length) : [];
        return Te(e, function(e, t, i) {
            s[++o] = n(e, t, i)
        }), s
    }

    function w(n) {
        var o = U(n);
        return function(e) {
            var t = o.length;
            if (null == e) return !t;
            for (e = Object(e); t--;) {
                var i = o[t];
                if (!(i in e && v(n[i], e[i], Q, 3))) return !1
            }
            return !0
        }
    }

    function b(t) {
        return function(e) {
            return null == e ? Q : e[t]
        }
    }

    function k(e, t, i) {
        var n = -1,
            o = e.length;
        for (t < 0 && (t = o < -t ? 0 : o + t), (i = o < i ? o : i) < 0 && (i += o), o = i < t ? 0 : i - t >>> 0, t >>>= 0, i = Array(o); ++n < o;) i[n] = e[n + t];
        return i
    }

    function x(e) {
        return k(e, 0, e.length)
    }

    function T(e, n) {
        var o;
        return Te(e, function(e, t, i) {
            return !(o = n(e, t, i))
        }), !!o
    }

    function S(e, t, i, n) {
        i = i || {};
        for (var o = -1, s = t.length; ++o < s;) {
            var r = t[o],
                a = n ? n(i[r], e[r], r, i, e) : e[r],
                l = i,
                c = l[r];
            pe.call(l, r) && (c === a || c != c && a != a) && (a !== Q || r in l) || (l[r] = a)
        }
        return i
    }

    function $(r) {
        return D(function(e, t) {
            var i = -1,
                n = t.length,
                o = "function" == typeof(o = 1 < n ? t[n - 1] : Q) ? (n--, o) : Q;
            for (e = Object(e); ++i < n;) {
                var s = t[i];
                s && r(e, s, i, o)
            }
            return e
        })
    }

    function C(e) {
        var t = e ? e.length : Q;
        if (z(t) && (Ne(e) || W(e) || P(e))) {
            e = String;
            for (var i = -1, n = Array(t); ++i < t;) n[i] = e(i);
            t = n
        } else t = null;
        return t
    }

    function A(e) {
        return e === (I(e = e && e.constructor) && e.prototype || ue)
    }

    function E(e) {
        return e ? e[0] : Q
    }

    function j(e, t) {
        return e = e, n = g(t), Te(e, function(e, t, i) {
            return n(e, t, i) ? (o = e, !1) : void 0
        }), o;
        var n, o
    }

    function O(e, t) {
        return Te(e, "function" == typeof t ? t : V)
    }

    function N(e, t, i) {
        return n = e, o = g(t), s = i, r = arguments.length < 3, Te(n, function(e, t, i) {
            s = r ? (r = !1, e) : o(s, e, t, i)
        }), s;
        var n, o, s, r
    }

    function _(e, t) {
        var i;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return e = _e(e),
            function() {
                return 0 < --e && (i = t.apply(this, arguments)), e <= 1 && (t = Q), i
            }
    }

    function D(o) {
        var s;
        if ("function" != typeof o) throw new TypeError("Expected a function");
        return s = xe(s === Q ? o.length - 1 : _e(s), 0),
            function() {
                for (var e = arguments, t = -1, i = xe(e.length - s, 0), n = Array(i); ++t < i;) n[t] = e[s + t];
                for (i = Array(s + 1), t = -1; ++t < s;) i[t] = e[t];
                return i[s] = n, o.apply(this, i)
            }
    }

    function H(e, t) {
        return t < e
    }

    function P(e) {
        return M(e) && L(e) && pe.call(e, "callee") && (!we.call(e, "callee") || "[object Arguments]" == he.call(e))
    }

    function L(e) {
        return null != e && !("function" == typeof e && I(e)) && z(Ce(e))
    }

    function I(e) {
        return "[object Function]" == (e = q(e) ? he.call(e) : "") || "[object GeneratorFunction]" == e
    }

    function z(e) {
        return "number" == typeof e && -1 < e && 0 == e % 1 && e <= 9007199254740991
    }

    function q(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t)
    }

    function M(e) {
        return !!e && "object" == typeof e
    }

    function F(e) {
        return "number" == typeof e || M(e) && "[object Number]" == he.call(e)
    }

    function W(e) {
        return "string" == typeof e || !Ne(e) && M(e) && "[object String]" == he.call(e)
    }

    function R(e, t) {
        return e < t
    }

    function B(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
    }

    function U(e) {
        var t = A(e);
        if (!t && !L(e)) return ke(Object(e));
        var i, n, o = !!(n = C(e)),
            s = (n = n || []).length;
        for (i in e) !pe.call(e, i) || o && ("length" == i || c(i, s)) || t && "constructor" == i || n.push(i);
        return n
    }

    function X(e) {
        for (var t, i = -1, n = A(e), o = m(e), s = o.length, r = !!(t = C(e)), a = (t = t || []).length; ++i < s;) {
            var l = o[i];
            r && ("length" == l || c(l, a)) || "constructor" == l && (n || !pe.call(e, l)) || t.push(l)
        }
        return t
    }

    function Y(e) {
        return e ? y(U(t = e), function(e) {
            return t[e]
        }) : [];
        var t
    }

    function V(e) {
        return e
    }

    function G(n, t, e) {
        var i = U(t),
            o = h(t, i);
        null != e || q(t) && (o.length || !i.length) || (e = t, t = n, n = this, o = h(t, U(t)));
        var s = !(q(e) && "chain" in e) || e.chain,
            r = I(n);
        return Te(o, function(e) {
            var i = t[e];
            n[e] = i, r && (n.prototype[e] = function() {
                var e = this.__chain__;
                if (s || e) {
                    var t = n(this.__wrapped__);
                    return (t.__actions__ = x(this.__actions__)).push({
                        func: i,
                        args: arguments,
                        thisArg: n
                    }), t.__chain__ = e, t
                }
                return i.apply(n, a([this.value()], arguments))
            })
        }), n
    }
    var Q, K, J = /[&<>"'`]/g,
        Z = RegExp(J.source),
        ee = /^(?:0|[1-9]\d*)$/,
        te = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "`": "&#96;"
        },
        ie = {
            function: !0,
            object: !0
        },
        ne = ie[typeof exports] && exports && !exports.nodeType ? exports : Q,
        oe = ie[typeof module] && module && !module.nodeType ? module : Q,
        se = oe && oe.exports === ne ? ne : Q,
        re = e(ie[typeof self] && self),
        ae = e(ie[typeof window] && window),
        le = e(ie[typeof this] && this),
        ce = e(ne && oe && "object" == typeof global && global) || ae !== (le && le.window) && ae || re || le || Function("return this")(),
        de = Array.prototype,
        ue = Object.prototype,
        pe = ue.hasOwnProperty,
        fe = 0,
        he = ue.toString,
        ve = ce._,
        ge = ce.Reflect,
        me = ge ? ge.f : Q,
        ye = Object.create,
        we = ue.propertyIsEnumerable,
        be = ce.isFinite,
        ke = Object.keys,
        xe = Math.max,
        Te = (K = f, function(e, t) {
            if (null == e) return e;
            if (!L(e)) return K(e, t);
            for (var i = e.length, n = -1, o = Object(e); ++n < i && !1 !== t(o[n], n, o););
            return e
        }),
        Se = function(e, t, i) {
            for (var n = -1, o = Object(e), s = (i = i(e)).length; s--;) {
                var r = i[++n];
                if (!1 === t(o[r], r, o)) break
            }
            return e
        };
    me && !we.call({
        valueOf: 1
    }, "valueOf") && (m = function(e) {
        e = me(e);
        for (var t, i = []; !(t = e.next()).done;) i.push(t.value);
        return i
    });
    var $e, Ce = b("length"),
        Ae = D(function(e, t) {
            return Ne(e) || (e = null == e ? [] : [Object(e)]), p(t, 1), a(x(e), Y)
        }),
        Ee = D(function(a, l, c) {
            if ("function" != typeof a) throw new TypeError("Expected a function");
            var i, d = (i = a, function() {
                var e = arguments,
                    t = r(i.prototype);
                return q(e = i.apply(t, e)) ? e : t
            });
            return function e() {
                for (var t = -1, i = arguments.length, n = -1, o = c.length, s = Array(o + i), r = this && this !== ce && this instanceof e ? d : a; ++n < o;) s[n] = c[n];
                for (; i--;) s[n++] = arguments[++t];
                return r.apply(l, s)
            }
        }),
        je = D(function(e, t) {
            return l(e, 1, t)
        }),
        Oe = D(function(e, t, i) {
            return l(e, De(t) || 0, i)
        }),
        Ne = Array.isArray,
        _e = Number,
        De = Number,
        He = $(function(e, t) {
            S(t, U(t), e)
        }),
        Pe = $(function(e, t) {
            S(t, X(t), e)
        }),
        Le = $(function(e, t, i, n) {
            S(t, X(t), e, n)
        }),
        ie = D(function(e) {
            return e.push(Q, o), Le.apply(Q, e)
        }),
        le = D(function(e, t) {
            return null == e ? {} : (i = e, t = p(t, 1), i = Object(i), N(t, function(e, t) {
                return t in i && (e[t] = i[t]), e
            }, {}));
            var i
        }),
        ge = g;
    (n.prototype = r(s.prototype)).constructor = n, s.assignIn = Pe, s.before = _, s.bind = Ee, s.chain = function(e) {
        return (e = s(e)).__chain__ = !0, e
    }, s.compact = function(e) {
        return d(e, Boolean)
    }, s.concat = Ae, s.create = function(e, t) {
        e = r(e);
        return t ? He(e, t) : e
    }, s.defaults = ie, s.defer = je, s.delay = Oe, s.filter = function(e, t) {
        return d(e, g(t))
    }, s.flatten = function(e) {
        return e && e.length ? p(e, 1) : []
    }, s.flattenDeep = function(e) {
        return e && e.length ? p(e, 1 / 0) : []
    }, s.iteratee = ge, s.keys = U, s.map = function(e, t) {
        return y(e, g(t))
    }, s.matches = function(e) {
        return w(He({}, e))
    }, s.mixin = G, s.negate = function(e) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return function() {
            return !e.apply(this, arguments)
        }
    }, s.once = function(e) {
        return _(2, e)
    }, s.pick = le, s.slice = function(e, t, i) {
        var n = e ? e.length : 0;
        return i = i === Q ? n : +i, n ? k(e, null == t ? 0 : +t, i) : []
    }, s.sortBy = function(e, n) {
        var o = 0;
        return n = g(n), y(y(e, function(e, t, i) {
            return {
                c: e,
                b: o++,
                a: n(e, t, i)
            }
        }).sort(function(e, t) {
            var i;
            e: {
                i = e.a;
                var n = t.a;
                if (i !== n) {
                    var o = null === i,
                        s = i === Q,
                        r = i == i,
                        a = null === n,
                        l = n === Q,
                        c = n == n;
                    if (n < i && !a || !r || o && !l && c || s && c) {
                        i = 1;
                        break e
                    }
                    if (i < n && !o || !c || a && !s && r || l && r) {
                        i = -1;
                        break e
                    }
                }
                i = 0
            }
            return i || e.b - t.b
        }), b("c"))
    }, s.tap = function(e, t) {
        return t(e), e
    }, s.thru = function(e, t) {
        return t(e)
    }, s.toArray = function(e) {
        return L(e) ? e.length ? x(e) : [] : Y(e)
    }, s.values = Y, s.extend = Pe, G(s, s), s.clone = function(e) {
        return q(e) ? Ne(e) ? x(e) : S(e, U(e)) : e
    }, s.escape = function(e) {
        return (e = B(e)) && Z.test(e) ? e.replace(J, i) : e
    }, s.every = function(e, t, i) {
        return e = e, n = g(t = i ? Q : t), o = !0, Te(e, function(e, t, i) {
            return o = !!n(e, t, i)
        }), o;
        var n, o
    }, s.find = j, s.forEach = O, s.has = function(e, t) {
        return null != e && pe.call(e, t)
    }, s.head = E, s.identity = V, s.indexOf = function(e, t, i) {
        var n = e ? e.length : 0;
        i = ((i = "number" == typeof i ? i < 0 ? xe(n + i, 0) : i : 0) || 0) - 1;
        for (var o = t == t; ++i < n;) {
            var s = e[i];
            if (o ? s === t : s != s) return i
        }
        return -1
    }, s.isArguments = P, s.isArray = Ne, s.isBoolean = function(e) {
        return !0 === e || !1 === e || M(e) && "[object Boolean]" == he.call(e)
    }, s.isDate = function(e) {
        return M(e) && "[object Date]" == he.call(e)
    }, s.isEmpty = function(e) {
        if (L(e) && (Ne(e) || W(e) || I(e.splice) || P(e))) return !e.length;
        for (var t in e)
            if (pe.call(e, t)) return !1;
        return !0
    }, s.isEqual = function(e, t) {
        return v(e, t)
    }, s.isFinite = function(e) {
        return "number" == typeof e && be(e)
    }, s.isFunction = I, s.isNaN = function(e) {
        return F(e) && e != +e
    }, s.isNull = function(e) {
        return null === e
    }, s.isNumber = F, s.isObject = q, s.isRegExp = function(e) {
        return q(e) && "[object RegExp]" == he.call(e)
    }, s.isString = W, s.isUndefined = function(e) {
        return e === Q
    }, s.last = function(e) {
        var t = e ? e.length : 0;
        return t ? e[t - 1] : Q
    }, s.max = function(e) {
        return e && e.length ? t(e, V, H) : Q
    }, s.min = function(e) {
        return e && e.length ? t(e, V, R) : Q
    }, s.noConflict = function() {
        return ce._ === this && (ce._ = ve), this
    }, s.noop = function() {}, s.reduce = N, s.result = function(e, t, i) {
        return (t = null == e ? Q : e[t]) === Q && (t = i), I(t) ? t.call(e) : t
    }, s.size = function(e) {
        return null == e ? 0 : (e = L(e) ? e : U(e)).length
    }, s.some = function(e, t, i) {
        return T(e, g(t = i ? Q : t))
    }, s.uniqueId = function(e) {
        var t = ++fe;
        return B(e) + t
    }, s.each = O, s.first = E, G(s, ($e = {}, f(s, function(e, t) {
        pe.call(s.prototype, t) || ($e[t] = e)
    }), $e), {
        chain: !1
    }), s.VERSION = "4.5.1", Te("pop join replace reverse split push shift sort splice unshift".split(" "), function(e) {
        var i = (/^(?:replace|split)$/.test(e) ? String.prototype : de)[e],
            n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
            o = /^(?:pop|join|replace|shift)$/.test(e);
        s.prototype[e] = function() {
            var t = arguments;
            return o && !this.__chain__ ? i.apply(this.value(), t) : this[n](function(e) {
                return i.apply(e, t)
            })
        }
    }), s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = function() {
        return e = this.__wrapped__, N(this.__actions__, function(e, t) {
            return t.func.apply(t.thisArg, a([e], t.args))
        }, e);
        var e
    }, (ae || re || {})._ = s, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return s
    }) : ne && oe ? (se && ((oe.exports = s)._ = s), ne._ = s) : ce._ = s
}.call(this), window.mobileCheck = function() {
        var e = !1,
            t = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
    },
    function(p, f, h) {
        function a(e, t) {
            return typeof e === t
        }

        function v(e) {
            return "function" != typeof f.createElement ? f.createElement(e) : y ? f.createElementNS.call(f, "http://www.w3.org/2000/svg", e) : f.createElement.apply(f, arguments)
        }

        function g(e) {
            return e.replace(/([A-Z])/g, function(e, t) {
                return "-" + t.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function n(e, t, i, n, o) {
            var s = e.charAt(0).toUpperCase() + e.slice(1),
                r = (e + " " + u.join(s + " ") + s).split(" ");
            return a(t, "string") || void 0 === t ? function(e, t, i, n) {
                function o() {
                    r && (delete k.style, delete k.modElem)
                }
                if (n = !(void 0 === n) && n, void 0 !== i) {
                    var s = function(e, t) {
                        var i = e.length;
                        if ("CSS" in p && "supports" in p.CSS) {
                            for (; i--;)
                                if (p.CSS.supports(g(e[i]), t)) return !0;
                            return !1
                        }
                        if ("CSSSupportsRule" in p) {
                            for (var n = []; i--;) n.push("(" + g(e[i]) + ":" + t + ")");
                            return function(e, t) {
                                var i, n, o, s = "modernizr",
                                    r = v("div"),
                                    a = ((o = f.body) || ((o = v(y ? "svg" : "body")).fake = !0), o);
                                if (parseInt(t, 10))
                                    for (; t--;)(i = v("div")).id = s + (t + 1), r.appendChild(i);
                                return (o = v("style")).type = "text/css", o.id = "s" + s, (a.fake ? a : r).appendChild(o), a.appendChild(r), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(f.createTextNode(e)), r.id = s, a.fake && (a.style.background = "", a.style.overflow = "hidden", n = m.style.overflow, m.style.overflow = "hidden", m.appendChild(a)), e = "absolute" == getComputedStyle(r, null).position, a.fake ? (a.parentNode.removeChild(a), m.style.overflow = n, m.offsetHeight) : r.parentNode.removeChild(r), !!e
                            }("@supports (" + (n = n.join(" or ")) + ") { #modernizr { position: absolute; } }")
                        }
                        return h
                    }(e, i);
                    if (void 0 !== s) return s
                }
                for (var r, a, l, c, d, u = ["modernizr", "tspan", "samp"]; !k.style && u.length;) r = !0, k.modElem = v(u.shift()), k.style = k.modElem.style;
                for (l = e.length, a = 0; a < l; a++)
                    if (c = e[a], d = k.style[c], ~("" + c).indexOf("-") && (c = c.replace(/([a-z])-([a-z])/g, function(e, t, i) {
                            return t + i.toUpperCase()
                        }).replace(/^-/, "")), k.style[c] !== h) {
                        if (n || void 0 === i) return o(), "pfx" != t || c;
                        try {
                            k.style[c] = i
                        } catch (e) {}
                        if (k.style[c] != d) return o(), "pfx" != t || c
                    } return o(), !1
            }(r, t, n, o) : function(e, t, i) {
                var n, o;
                for (o in e)
                    if (e[o] in t) return !1 === i ? e[o] : a(n = t[e[o]], "function") ? function(e, t) {
                        return function() {
                            return e.apply(t, arguments)
                        }
                    }(n, i || t) : n;
                return !1
            }(r = (e + " " + w.join(s + " ") + s).split(" "), t, i)
        }

        function e(e, t, i) {
            return n(e, h, h, t, i)
        }
        var l = [],
            c = [],
            t = {
                _version: "3.3.1",
                _config: {
                    classPrefix: "",
                    enableClasses: !0,
                    enableJSClass: !0,
                    usePrefixes: !0
                },
                _q: [],
                on: function(e, t) {
                    var i = this;
                    setTimeout(function() {
                        t(i[e])
                    }, 0)
                },
                addTest: function(e, t, i) {
                    c.push({
                        name: e,
                        fn: t,
                        options: i
                    })
                },
                addAsyncTest: function(e) {
                    c.push({
                        name: null,
                        fn: e
                    })
                }
            },
            d = function() {};
        d.prototype = t, (d = new d).addTest("svg", !!f.createElementNS && !!f.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
        var m = f.documentElement,
            y = "svg" === m.nodeName.toLowerCase(),
            i = "Moz O ms Webkit",
            u = t._config.usePrefixes ? i.split(" ") : [];
        t._cssomPrefixes = u;
        var w = t._config.usePrefixes ? i.toLowerCase().split(" ") : [];
        t._domPrefixes = w;
        var o = {
            elem: v("modernizr")
        };
        d._q.push(function() {
            delete o.elem
        });
        var s, r, b, k = {
            style: o.elem.style
        };
        d._q.unshift(function() {
                delete k.style
            }), t.testAllProps = n, t.testAllProps = e, d.addTest("flexbox", e("flexBasis", "1px", !0)), d.addTest("csstransforms", function() {
                return -1 === navigator.userAgent.indexOf("Android 2.") && e("transform", "scale(1)", !0)
            }),
            function() {
                var e, t, i, n, o, s, r;
                for (r in c)
                    if (c.hasOwnProperty(r)) {
                        if (e = [], (t = c[r]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                            for (i = 0; i < t.options.aliases.length; i++) e.push(t.options.aliases[i].toLowerCase());
                        for (n = a(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) 1 === (s = e[o].split(".")).length ? d[s[0]] = n : (!d[s[0]] || d[s[0]] instanceof Boolean || (d[s[0]] = new Boolean(d[s[0]])), d[s[0]][s[1]] = n), l.push((n ? "" : "no-") + s.join("-"))
                    }
            }(), s = l, r = m.className, b = d._config.classPrefix || "", y && (r = r.baseVal), d._config.enableJSClass && (i = new RegExp("(^|\\s)" + b + "no-js(\\s|$)"), r = r.replace(i, "$1" + b + "js$2")), d._config.enableClasses && (r += " " + b + s.join(" " + b), y ? m.className.baseVal = r : m.className = r), delete t.addTest, delete t.addAsyncTest;
        for (var x = 0; x < d._q.length; x++) d._q[x]();
        p.Modernizr = d
    }(window, document),
    function(e) {
        e.fn.prepareTransition = function() {
            return this.each(function() {
                var i = e(this);
                i.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd", function() {
                    i.removeClass("is-transitioning")
                });
                var n = 0;
                e.each(["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"], function(e, t) {
                    n = n || parseFloat(i.css(t))
                }), 0 != n && (i.addClass("is-transitioning"), i[0].offsetWidth)
            })
        }
    }(jQuery),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(r) {
        "use strict";
        var a = window.Slick,
            n = 0;
        (a = function(e, t) {
            var i = this;
            i.defaults = {
                accessibility: !0,
                appendArrows: r(e),
                appendDots: r(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous slide" tabindex="0" role="button">Previous slide</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next slide" tabindex="0" role="button">Next slide</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                cssEase: "ease",
                customPaging: function(e, t) {
                    return r('<button type="button" data-role="none" role="button" tabindex="0" />').text("Slide " + (t + 1))
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                initialSlide: 0,
                lazyLoad: !0,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                waitForAnimate: !0,
                zIndex: 1e3
            }, i.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, r.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.focussed = !1, i.interrupted = !1, i.hidden = "hidden", i.paused = !0, i.positionProp = null, i.respondTo = null, i.rowCount = 1, i.shouldClick = !0, i.$slider = r(e), i.$slidesCache = null, i.transformType = null, i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, i.windowTimer = null, e = r(e).data("slick") || {}, i.options = r.extend({}, i.defaults, t, e), i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, void 0 !== document.mozHidden ? (i.hidden = "mozHidden", i.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (i.hidden = "webkitHidden", i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = r.proxy(i.autoPlay, i), i.autoPlayClear = r.proxy(i.autoPlayClear, i), i.autoPlayIterator = r.proxy(i.autoPlayIterator, i), i.changeSlide = r.proxy(i.changeSlide, i), i.clickHandler = r.proxy(i.clickHandler, i), i.selectHandler = r.proxy(i.selectHandler, i), i.setPosition = r.proxy(i.setPosition, i), i.swipeHandler = r.proxy(i.swipeHandler, i), i.dragHandler = r.proxy(i.dragHandler, i), i.keyHandler = r.proxy(i.keyHandler, i), i.instanceUid = n++, i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, i.init(!0)
        }).prototype.activateADA = function() {
            this.$slides.add(this.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, a.prototype.animateSlide = function(e, t) {
            var i = {},
                n = this;
            !0 === n.options.rtl && (e = -e), !1 === n.transformsEnabled ? n.$slideTrack.animate({
                left: e
            }, n.options.speed, n.options.easing, t) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), r({
                animStart: n.currentLeft
            }).animate({
                animStart: e
            }, {
                duration: n.options.speed,
                easing: n.options.easing,
                step: function(e) {
                    e = Math.ceil(e), i[n.animType] = "translate(" + e + "px, 0px)", n.$slideTrack.css(i)
                },
                complete: function() {
                    t && t.call()
                }
            })) : (n.applyTransition(), e = Math.ceil(e), i[n.animType] = "translate3d(" + e + "px, 0px, 0px)", n.$slideTrack.css(i), t && setTimeout(function() {
                n.disableTransition(), t.call()
            }, n.options.speed))
        }, a.prototype.getNavTarget = function() {
            var e = this.options.asNavFor;
            return e && null !== e && (e = r(e).not(this.$slider)), e
        }, a.prototype.asNavFor = function(t) {
            var e = this.getNavTarget();
            null !== e && "object" == typeof e && e.each(function() {
                var e = r(this).slick("getSlick");
                e.unslicked || e.slideHandler(t, !0)
            })
        }, a.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, (!1 === t.options.fade ? t.$slideTrack : t.$slides.eq(e)).css(i)
        }, a.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, a.prototype.autoPlayClear = function() {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer)
        }, a.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || e.slideHandler(t)
        }, a.prototype.buildArrows = function() {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = r(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = r(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, a.prototype.buildDots = function() {
            var e, t, i = this;
            if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
                for (i.$slider.addClass("slick-dotted"), t = r("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append(r("<li />").append(i.options.customPaging.call(this, i, e)));
                i.$dots = t.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, a.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                r(t).attr("data-slick-index", e).data("originalStyling", r(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? r('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 === e.options.swipeToSlide && (e.options.slidesToScroll = 1), r("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, a.prototype.buildRows = function() {
            var e, t, i, n = this,
                o = document.createDocumentFragment(),
                s = n.$slider.children();
            if (1 < n.options.rows) {
                for (i = n.options.slidesPerRow * n.options.rows, t = Math.ceil(s.length / i), e = 0; e < t; e++) {
                    for (var r = document.createElement("div"), a = 0; a < n.options.rows; a++) {
                        for (var l = document.createElement("div"), c = 0; c < n.options.slidesPerRow; c++) {
                            var d = e * i + (a * n.options.slidesPerRow + c);
                            s.get(d) && l.appendChild(s.get(d))
                        }
                        r.appendChild(l)
                    }
                    o.appendChild(r)
                }
                n.$slider.empty().append(o), n.$slider.children().children().children().css({
                    width: 100 / n.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, a.prototype.changeSlide = function(e, t) {
            var i, n = this,
                o = r(e.currentTarget);
            switch (o.is("a") && e.preventDefault(), o.is("li") || (o = o.closest("li")), i = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
                case "previous":
                    s = 0 == i ? n.options.slidesToScroll : n.options.slidesToShow - i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - s, !1, t);
                    break;
                case "next":
                    s = 0 == i ? n.options.slidesToScroll : i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + s, !1, t);
                    break;
                case "index":
                    var s = 0 === e.data.index ? 0 : e.data.index || o.index() * n.options.slidesToScroll;
                    n.slideHandler(n.checkNavigable(s), !1, t), o.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, a.prototype.checkNavigable = function(e) {
            var t, i = 0;
            if (e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
            else
                for (var n in t) {
                    if (e < t[n]) {
                        e = i;
                        break
                    }
                    i = t[n]
                }
            return e
        }, a.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && r("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", r.proxy(e.interrupt, e, !0)).off("mouseleave.slick", r.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), r(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && r(e.$slideTrack).children().off("click.slick", e.selectHandler), r(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), r(window).off("resize.slick.slick-" + e.instanceUid, e.resize), r("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), r(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), r(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, a.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", r.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", r.proxy(e.interrupt, e, !1))
        }, a.prototype.cleanUpRows = function() {
            var e;
            1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
        }, a.prototype.clickHandler = function(e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, a.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), r(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                r(this).attr("style", r(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
        }, a.prototype.disableTransition = function(e) {
            var t = {};
            t[this.transitionType] = "", (!1 === this.options.fade ? this.$slideTrack : this.$slides.eq(e)).css(t)
        }, a.prototype.fadeSlide = function(e, t) {
            var i = this;
            !1 === i.cssTransitions ? (i.$slides.eq(e).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(e), t.call()
            }, i.options.speed))
        }, a.prototype.fadeSlideOut = function(e) {
            var t = this;
            !1 === t.cssTransitions ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, a.prototype.filterSlides = a.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, a.prototype.focusHandler = function() {
            var i = this;
            i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(e) {
                e.stopImmediatePropagation();
                var t = r(this);
                setTimeout(function() {
                    i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay())
                }, 0)
            })
        }, a.prototype.getCurrent = a.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, a.prototype.getDotCount = function() {
            for (var e = this, t = 0, i = 0, n = 0; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return n - 1
        }, a.prototype.getLeft = function(e) {
            var t = this;
            return t.slideOffset = 0, t.$slides.first().outerHeight(!0), t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, t.options.slidesToShow), t.slideCount % t.options.slidesToScroll != 0 && e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (e > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (e - t.slideCount)) * t.slideWidth * -1, t.options.slidesToShow, t.slideCount) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, t.slideCount, t.options.slidesToScroll)), t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0), e * t.slideWidth * -1 + t.slideOffset
        }, a.prototype.getOption = a.prototype.slickGetOption = function(e) {
            return this.options[e]
        }, a.prototype.getNavigableIndexes = function() {
            for (var e = this, t = 0, i = 0, n = [], o = (t = -1 * e.options.slidesToScroll, i = -1 * e.options.slidesToScroll, 2 * e.slideCount); t < o;) n.push(t), t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return n
        }, a.prototype.getSlick = function() {
            return this
        }, a.prototype.getSlideCount = function() {
            var i, n = this;
            return !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(e, t) {
                if (+t.offsetLeft + r(t).outerWidth() / 2 > -1 * n.swipeLeft) return i = t, !1
            }), Math.abs(r(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        }, a.prototype.goTo = a.prototype.slickGoTo = function(e, t) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, a.prototype.init = function(e) {
            var t = this;
            r(t.$slider).hasClass("slick-initialized") || (r(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateDots(), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, a.prototype.initADA = function() {
            var i, n, o, s = this;
            s.$slides.not(s.$slideTrack.find(".slick-cloned")).each(function(e) {
                r(this).attr("role", "option");
                var t = Math.floor(e / s.options.slidesToShow);
                !0 === s.options.dots && (n = "" + s.instanceUid + t, i === (o = n) && (n = "" + n + e), r(this).attr("id", "slickSlide" + n).attr("role", "tabpanel").attr("aria-labelledby", "slickDot" + o), i = "" + s.instanceUid + t)
            }), null !== s.$dots && s.$dots.attr("role", "tablist").find("li").each(function(e) {
                r(this).attr({
                    role: "tab",
                    "aria-selected": "false",
                    "aria-controls": "slickSlide" + s.instanceUid + e,
                    id: "slickDot" + s.instanceUid + e
                })
            }).first().attr("aria-selected", "true"), s.activateADA()
        }, a.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, a.prototype.updateADA = function() {
            null !== this.$dots && (this.$dots.find("li").attr("aria-selected", "false"), this.$dots.find(".slick-active").attr("aria-selected", "true")), this.activateADA()
        }, a.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, a.prototype.initDotEvents = function() {
            var e = this;
            !0 === e.options.dots && e.slideCount > e.options.slidesToShow && r("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && r("li", e.$dots).on("mouseenter.slick", r.proxy(e.interrupt, e, !0)).on("mouseleave.slick", r.proxy(e.interrupt, e, !1))
        }, a.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", r.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", r.proxy(e.interrupt, e, !1)))
        }, a.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), r(document).on(e.visibilityChange, r.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && r(e.$slideTrack).children().on("click.slick", e.selectHandler), r(window).on("orientationchange.slick.slick-" + e.instanceUid, r.proxy(e.orientationChange, e)), r(window).on("resize.slick.slick-" + e.instanceUid, r.proxy(e.resize, e)), r("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), r(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), r(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, a.prototype.initUI = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
        }, a.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "next" : "previous"
                }
            }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "previous" : "next"
                }
            }))
        }, a.prototype.lazyLoad = function() {
            function e(e) {
                r("img[data-lazy]", e).each(function() {
                    var e = r(this),
                        t = r(this).attr("data-lazy"),
                        i = document.createElement("img");
                    i.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            e.attr("src", t).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy").removeClass("slick-loading")
                            }), n.$slider.trigger("lazyLoaded", [n, e, t])
                        })
                    }, i.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                    }, i.src = t
                })
            }
            var n = this,
                t = n.options.slidesToShow,
                i = Math.ceil(t + n.options.slidesToShow);
            !0 === n.options.fade && (0 < t && t--, i <= n.slideCount && i++), e(n.$slider.find(".slick-slide").slice(t, i)), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
        }, a.prototype.loadSlider = function() {
            this.setPosition(), this.$slideTrack.css({
                opacity: 1
            }), this.$slider.removeClass("slick-loading"), this.initUI()
        }, a.prototype.next = a.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, a.prototype.orientationChange = function() {
            this.setPosition()
        }, a.prototype.pause = a.prototype.slickPause = function() {
            this.autoPlayClear(), this.paused = !0
        }, a.prototype.play = a.prototype.slickPlay = function() {
            var e = this;
            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
        }, a.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && t.updateADA())
        }, a.prototype.prev = a.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, a.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, a.prototype.refresh = function(e) {
            var t, i = this;
            i.slideCount, i.options.slidesToShow, i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), t = i.currentSlide, i.destroy(!0), r.extend(i, i.initials, {
                currentSlide: t
            }), i.init(), e || i.changeSlide({
                data: {
                    message: "index",
                    index: t
                }
            }, !1)
        }, a.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.setProps(), e.setupInfinite(), e.buildArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), !0 === e.options.focusOnSelect && r(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, a.prototype.resize = function() {
            var e = this;
            r(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = r(window).width(), e.unslicked || e.setPosition()
            }, 50))
        }, a.prototype.setCSS = function(e) {
            var t, i, n = this,
                o = {};
            !0 === n.options.rtl && (e = -e), t = "left" == n.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(e) + "px" : "0px", o[n.positionProp] = e, !1 === n.transformsEnabled || (!(o = {}) === n.cssTransitions ? o[n.animType] = "translate(" + t + ", " + i + ")" : o[n.animType] = "translate3d(" + t + ", " + i + ", 0px)"), n.$slideTrack.css(o)
        }, a.prototype.setDimensions = function() {
            var e = this;
            e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, a.prototype.setFade = function() {
            var i, n = this;
            n.$slides.each(function(e, t) {
                i = n.slideWidth * e * -1, !0 === n.options.rtl ? r(t).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                }) : r(t).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                })
            }), n.$slides.eq(n.currentSlide).css({
                zIndex: n.options.zIndex - 1,
                opacity: 1
            })
        }, a.prototype.setOption = a.prototype.slickSetOption = function() {
            var e, t, i, n = this,
                o = !1;
            "object" === r.type(arguments[0]) ? (e = arguments[0], o = arguments[1], i = "multiple") : "string" === r.type(arguments[0]) && (e = arguments[0], o = arguments[2], void 0 !== (t = arguments[1]) && (i = "single")), "single" === i ? n.options[e] = t : "multiple" === i && r.each(e, function(e, t) {
                n.options[e] = t
            }), o && (n.unload(), n.reinit())
        }, a.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, a.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = "left", e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
        }, a.prototype.setSlideClasses = function(e) {
            var t, i, n = this,
                o = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
            n.$slides.eq(e).addClass("slick-current"), 0 <= e && e <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(e, e + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : o.length <= n.options.slidesToShow ? o.addClass("slick-active").attr("aria-hidden", "false") : (i = n.slideCount % n.options.slidesToShow, t = n.options.slidesToShow + e, (n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - e < n.options.slidesToShow ? o.slice(t - (n.options.slidesToShow - i), t + i) : o.slice(t, t + n.options.slidesToShow)).addClass("slick-active").attr("aria-hidden", "false")), !0 === n.options.lazyLoad && n.lazyLoad()
        }, a.prototype.setupInfinite = function() {
            var e, t, i, n = this;
            if (!1 === n.options.fade && (t = null, n.slideCount > n.options.slidesToShow)) {
                for (i = n.options.slidesToShow, e = n.slideCount; e > n.slideCount - i; --e) t = e - 1, r(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < i; e += 1) t = e, r(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
                n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    r(this).attr("id", "")
                })
            }
        }, a.prototype.interrupt = function(e) {
            e || this.autoPlay(), this.interrupted = e
        }, a.prototype.selectHandler = function(e) {
            var t = this,
                e = r(e.target).is(".slick-slide") ? r(e.target) : r(e.target).parents(".slick-slide"),
                e = (e = parseInt(e.attr("data-slick-index"))) || 0;
            return t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(e), void t.asNavFor(e)) : void t.slideHandler(e)
        }, a.prototype.slideHandler = function(e, t, i) {
            var n, o, s, r = this;
            if (t = t || !1, (!0 !== r.animating || !0 !== r.options.waitForAnimate) && !(!0 === r.options.fade && r.currentSlide === e || r.slideCount <= r.options.slidesToShow)) return !1 === t && r.asNavFor(e), t = e, s = r.getLeft(t), e = r.getLeft(r.currentSlide), r.currentLeft = null === r.swipeLeft ? e : r.swipeLeft, r.options.autoplay && clearInterval(r.autoPlayTimer), n = t < 0 ? r.slideCount % r.options.slidesToScroll != 0 ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + t : t >= r.slideCount ? r.slideCount % r.options.slidesToScroll != 0 ? 0 : t - r.slideCount : t, r.animating = !0, r.$slider.trigger("beforeChange", [r, r.currentSlide, n]), t = r.currentSlide, r.currentSlide = n, r.setSlideClasses(r.currentSlide), r.options.asNavFor && (o = (o = r.getNavTarget()).slick("getSlick")).slideCount <= o.options.slidesToShow && o.setSlideClasses(r.currentSlide), r.updateDots(), !0 === r.options.fade ? void(!0 !== i ? (r.fadeSlideOut(t), r.fadeSlide(n, function() {
                r.postSlide(n)
            })) : r.postSlide(n)) : void(!0 !== i ? r.animateSlide(s, function() {
                r.postSlide(n)
            }) : r.postSlide(n))
        }, a.prototype.startLoad = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, a.prototype.swipeDirection = function() {
            var e = this,
                t = e.touchObject.startX - e.touchObject.curX,
                i = e.touchObject.startY - e.touchObject.curY,
                t = Math.atan2(i, t);
            return (t = Math.round(180 * t / Math.PI)) < 0 && (t = 360 - Math.abs(t)), t <= 45 && 0 <= t || t <= 360 && 315 <= t ? !1 === e.options.rtl ? "left" : "right" : 135 <= t && t <= 225 ? !1 === e.options.rtl ? "right" : "left" : "vertical"
        }, a.prototype.swipeEnd = function(e) {
            var t, i, n = this;
            if (n.dragging = !1, n.interrupted = !1, n.shouldClick = !(10 < n.touchObject.swipeLength), void 0 === n.touchObject.curX) return !1;
            if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
                switch (i = n.swipeDirection()) {
                    case "left":
                    case "down":
                        t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
                }
                "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
            } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
        }, a.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, a.prototype.swipeMove = function(e) {
            var t, i = this,
                n = void 0 !== e.originalEvent ? e.originalEvent.touches : null;
            return !(!i.dragging || n && 1 !== n.length) && (t = i.getLeft(i.currentSlide), i.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX, i.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY, i.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(i.touchObject.curX - i.touchObject.startX, 2))), "vertical" !== i.swipeDirection() ? (void 0 !== e.originalEvent && 4 < i.touchObject.swipeLength && e.preventDefault(), n = (!1 === i.options.rtl ? 1 : -1) * (i.touchObject.curX > i.touchObject.startX ? 1 : -1), !0 === i.options.verticalSwiping && (n = i.touchObject.curY > i.touchObject.startY ? 1 : -1), e = i.touchObject.swipeLength, i.touchObject.edgeHit = !1, i.swipeLeft = t + e * n, !0 !== i.options.fade && !1 !== i.options.touchMove && (!0 === i.animating ? (i.swipeLeft = null, !1) : void i.setCSS(i.swipeLeft))) : void 0)
        }, a.prototype.swipeStart = function(e) {
            var t, i = this;
            return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? !(i.touchObject = {}) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(i.dragging = !0))
        }, a.prototype.unfilterSlides = a.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, a.prototype.unload = function() {
            var e = this;
            r(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, a.prototype.unslick = function(e) {
            this.$slider.trigger("unslick", [this, e]), this.destroy()
        }, a.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
        }, a.prototype.visibility = function() {
            this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
        }, r.fn.slick = function() {
            for (var e, t = this, i = arguments[0], n = Array.prototype.slice.call(arguments, 1), o = t.length, s = 0; s < o; s++)
                if ("object" == typeof i || void 0 === i ? t[s].slick = new a(t[s], i) : e = t[s].slick[i].apply(t[s].slick, n), void 0 !== e) return e;
            return t
        }
    }),
    function(e, d) {
        var n, t = e.jQuery || e.Cowboy || (e.Cowboy = {});
        t.throttle = n = function(o, s, r, a) {
            function e() {
                function e() {
                    c = +new Date, r.apply(t, n)
                }
                var t = this,
                    i = new Date - c,
                    n = arguments;
                a && !l && e(), l && clearTimeout(l), a === d && o < i ? e() : !0 !== s && (l = setTimeout(a ? function() {
                    l = d
                } : e, a === d ? o - i : o))
            }
            var l, c = 0;
            return "boolean" != typeof s && (a = r, r = s, s = d), t.guid && (e.guid = r.guid = r.guid || t.guid++), e
        }, t.debounce = function(e, t, i) {
            return i === d ? n(e, t, !1) : n(e, i, !1 !== t)
        }
    }(this), window.theme = window.theme || {}, theme.Sections = function() {
        this.constructors = {}, this.instances = [], $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
    }, theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
        _createInstance: function(e, t) {
            var i = $(e),
                n = i.attr("data-section-id"),
                i = i.attr("data-section-type");
            t = t || this.constructors[i], _.isUndefined(t) || (e = _.assignIn(new t(e), {
                id: n,
                type: i,
                container: e
            }), this.instances.push(e))
        },
        _onSectionLoad: function(e) {
            e = $("[data-section-id]", e.target)[0];
            e && this._createInstance(e)
        },
        _onSectionUnload: function(i) {
            this.instances = _.filter(this.instances, function(e) {
                var t = e.id === i.detail.sectionId;
                return t && _.isFunction(e.onUnload) && e.onUnload(i), !t
            })
        },
        _onSelect: function(t) {
            var e = _.find(this.instances, function(e) {
                return e.id === t.detail.sectionId
            });
            !_.isUndefined(e) && _.isFunction(e.onSelect) && e.onSelect(t)
        },
        _onDeselect: function(t) {
            var e = _.find(this.instances, function(e) {
                return e.id === t.detail.sectionId
            });
            !_.isUndefined(e) && _.isFunction(e.onDeselect) && e.onDeselect(t)
        },
        _onBlockSelect: function(t) {
            var e = _.find(this.instances, function(e) {
                return e.id === t.detail.sectionId
            });
            !_.isUndefined(e) && _.isFunction(e.onBlockSelect) && e.onBlockSelect(t)
        },
        _onBlockDeselect: function(t) {
            var e = _.find(this.instances, function(e) {
                return e.id === t.detail.sectionId
            });
            !_.isUndefined(e) && _.isFunction(e.onBlockDeselect) && e.onBlockDeselect(t)
        },
        register: function(e, i) {
            this.constructors[e] = i, $("[data-section-type=" + e + "]").each(function(e, t) {
                this._createInstance(t, i)
            }.bind(this))
        }
    }), window.slate = window.slate || {}, slate.utils = {
        getParameterByName: function(e, t) {
            t = t || window.location.href, e = e.replace(/[[\]]/g, "\\$&");
            t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
            return t ? t[2] ? decodeURIComponent(t[2].replace(/\+/g, " ")) : "" : null
        },
        keyboardKeys: {
            TAB: 9,
            ENTER: 13,
            ESCAPE: 27,
            LEFTARROW: 37,
            RIGHTARROW: 39
        }
    }, window.slate = window.slate || {}, slate.rte = {
        wrapTable: function(e) {
            e.$tables.wrap('<div class="' + e.tableWrapperClass + '"></div>')
        },
        wrapIframe: function(e) {
            e.$iframes.each(function() {
                $(this).wrap('<div class="' + e.iframeWrapperClass + '"></div>'), this.src
            })
        }
    }, window.slate = window.slate || {}, slate.a11y = {
        pageLinkFocus: function(e) {
            var t = "js-focus-hidden";
            e.first().attr("tabIndex", "-1").focus().addClass(t).one("blur", function() {
                e.first().removeClass(t).removeAttr("tabindex")
            })
        },
        focusHash: function() {
            var e = window.location.hash;
            e && document.getElementById(e.slice(1)) && this.pageLinkFocus($(e))
        },
        bindInPageLinks: function() {
            $("a[href*=#]").on("click", function(e) {
                this.pageLinkFocus($(e.currentTarget.hash))
            }.bind(this))
        },
        trapFocus: function(e) {
            var t = {
                    focusin: e.namespace ? "focusin." + e.namespace : "focusin",
                    focusout: e.namespace ? "focusout." + e.namespace : "focusout",
                    keydown: e.namespace ? "keydown." + e.namespace : "keydown.handleFocus"
                },
                i = e.$container.find($('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])').filter(":visible")),
                n = i[0],
                o = i[i.length - 1];
            e.$elementToFocus || (e.$elementToFocus = e.$container), e.$container.attr("tabindex", "-1"), e.$elementToFocus.focus(), $(document).off("focusin"), $(document).on(t.focusout, function() {
                $(document).off(t.keydown)
            }), $(document).on(t.focusin, function(e) {
                e.target !== o && e.target !== n || $(document).on(t.keydown, function(e) {
                    (e = e).keyCode === slate.utils.keyboardKeys.TAB && (e.target !== o || e.shiftKey || (e.preventDefault(), n.focus()), e.target === n && e.shiftKey && (e.preventDefault(), o.focus()))
                })
            })
        },
        removeTrapFocus: function(e) {
            var t = e.namespace ? "focusin." + e.namespace : "focusin";
            e.$container && e.$container.length && e.$container.removeAttr("tabindex"), $(document).off(t)
        },
        accessibleLinks: function(e) {
            var o = document.querySelector("body"),
                s = {
                    newWindow: "a11y-new-window-message",
                    external: "a11y-external-message",
                    newWindowExternal: "a11y-new-window-external-message"
                };
            void 0 !== e.$links && e.$links.jquery || (e.$links = $("a[href]:not([aria-describedby])")), $.each(e.$links, function() {
                    var e = $(this),
                        t = e.attr("target"),
                        i = e.attr("rel"),
                        n = (n = window.location.hostname, e[0].hostname !== n),
                        t = "_blank" === t;
                    n && e.attr("aria-describedby", s.external), t && (void 0 !== i && -1 !== i.indexOf("noopener") || e.attr("rel", function(e, t) {
                        return (void 0 === t ? "" : t + " ") + "noopener"
                    }), e.attr("aria-describedby", s.newWindow)), n && t && e.attr("aria-describedby", s.newWindowExternal)
                }),
                function(e) {
                    "object" != typeof e && (e = {});
                    var t, i = $.extend({
                            newWindow: "Opens in a new window.",
                            external: "Opens external website.",
                            newWindowExternal: "Opens external website in a new window."
                        }, e),
                        e = document.createElement("ul"),
                        n = "";
                    for (t in i) n += "<li id=" + s[t] + ">" + i[t] + "</li>";
                    e.setAttribute("hidden", !0), e.innerHTML = n, o.appendChild(e)
                }(e.messages)
        }
    }, theme.Images = {
        preload: function(e, t) {
            "string" == typeof e && (e = [e]);
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                this.loadImage(this.getSizedImageUrl(n, t))
            }
        },
        loadImage: function(e) {
            (new Image).src = e
        },
        switchImage: function(e, t, i) {
            var n = this.imageSize(t.src),
                n = this.getSizedImageUrl(e.src, n);
            i ? i(n, e, t) : t.src = n
        },
        imageSize: function(e) {
            e = e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/);
            return null !== e ? void 0 !== e[2] ? e[1] + e[2] : e[1] : null
        },
        getSizedImageUrl: function(e, t) {
            if (null === t) return e;
            if ("master" === t) return this.removeProtocol(e);
            var i = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null === i) return null;
            e = e.split(i[0]), i = i[0];
            return this.removeProtocol(e[0] + "_" + t + i)
        },
        removeProtocol: function(e) {
            return e.replace(/http(s)?:/, "")
        }
    }, theme.Currency = {
        formatMoney: function(e, t) {
            "string" == typeof e && (e = e.replace(".", ""));
            var i = "",
                n = /\{\{\s*(\w+)\s*\}\}/,
                t = t || "${{amount}}";

            function o(e, t, i, n) {
                if (i = i || ",", n = n || ".", isNaN(e) || null === e) return 0;
                e = (e = (e / 100).toFixed(t)).split(".");
                return e[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (e[1] ? n + e[1] : "")
            }
            switch (t.match(n)[1]) {
                case "amount":
                    i = o(e, 2);
                    break;
                case "amount_no_decimals":
                    i = o(e, 0);
                    break;
                case "amount_with_comma_separator":
                    i = o(e, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    i = o(e, 0, ".", ",");
                    break;
                case "amount_no_decimals_with_space_separator":
                    i = o(e, 0, " ");
                    break;
                case "amount_with_apostrophe_separator":
                    i = o(e, 2, "'")
            }
            return t.replace(n, i)
        }
    }, slate.Variants = function() {
        function e(e) {
            this.$container = e.$container, this.product = e.product, this.singleOptionSelector = e.singleOptionSelector, this.originalSelectorId = e.originalSelectorId, this.enableHistoryState = e.enableHistoryState, this.currentVariant = this._getVariantFromOptions(), $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
        }
        return e.prototype = _.assignIn({}, e.prototype, {
            _getCurrentOptions: function() {
                var e = _.map($(this.singleOptionSelector, this.$container), function(e) {
                    var t = $(e),
                        i = t.attr("type"),
                        e = {};
                    return ("radio" !== i && "checkbox" !== i || !!t[0].checked) && (e.value = t.val(), e.index = t.data("index"), e)
                });
                return _.compact(e)
            },
            _getVariantFromOptions: function() {
                var e = this._getCurrentOptions(),
                    t = this.product.variants;
                return _.find(t, function(t) {
                    return e.every(function(e) {
                        return _.isEqual(t[e.index], e.value)
                    })
                })
            },
            _onSelectChange: function() {
                var e = this._getVariantFromOptions();
                this.$container.trigger({
                    type: "variantChange",
                    variant: e
                }), e && (this._updateMasterSelect(e), this._updateImages(e), this._updatePrice(e), this._updateSKU(e), this._updateBARCODE(e), this.currentVariant = e, this.enableHistoryState && this._updateHistoryState(e))
            },
            _updateImages: function(e) {
                var t = e.featured_image || {},
                    i = this.currentVariant.featured_image || {};
                e.featured_image && t.src !== i.src && this.$container.trigger({
                    type: "variantImageChange",
                    variant: e
                })
            },
            _updatePrice: function(e) {
                e.price === this.currentVariant.price && e.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
                    type: "variantPriceChange",
                    variant: e
                })
            },
            _updateSKU: function(e) {
                e.sku !== this.currentVariant.sku && this.$container.trigger({
                    type: "variantSKUChange",
                    variant: e
                })
            },
            _updateBARCODE: function(e) {
                e.barcode !== this.currentVariant.barcode && this.$container.trigger({
                    type: "variantBARCODEChange",
                    variant: e
                })
            },
            _updateHistoryState: function(e) {
                history.replaceState && e && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + e.id, window.history.replaceState({
                    path: e
                }, "", e))
            },
            _updateMasterSelect: function(e) {
                $(this.originalSelectorId, this.$container).val(e.id)
            }
        }), e
    }(), theme.Drawers = function() {
        function e(e, t, i) {
            var n = {
                close: ".js-drawer-close",
                open: ".js-drawer-open-" + t,
                openClass: "js-drawer-open",
                dirOpenClass: "js-drawer-open-" + t
            };
            if (this.nodes = {
                    $parent: $("html").add("body"),
                    $page: $("#PageContainer")
                }, this.config = $.extend(n, i), this.position = t, this.$drawer = $("#" + e), !this.$drawer.length) return !1;
            this.drawerIsOpen = !1, this.init()
        }
        return e.prototype.init = function() {
            $(this.config.open).on("click", $.proxy(this.open, this)), this.$drawer.on("click", this.config.close, $.proxy(this.close, this))
        }, e.prototype.open = function(e) {
            var t = !1;
            return e ? e.preventDefault() : t = !0, e && e.stopPropagation && (e.stopPropagation(), this.$activeSource = $(e.currentTarget)), this.drawerIsOpen && !t ? this.close() : (this.$drawer.prepareTransition(), this.nodes.$parent.addClass(this.config.openClass + " " + this.config.dirOpenClass), this.drawerIsOpen = !0, slate.a11y.trapFocus({
                $container: this.$drawer,
                namespace: "drawer_focus"
            }), this.config.onDrawerOpen && "function" == typeof this.config.onDrawerOpen && (t || this.config.onDrawerOpen()), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "true"), this.bindEvents(), this)
        }, e.prototype.close = function() {
            this.drawerIsOpen && ($(document.activeElement).trigger("blur"), this.$drawer.prepareTransition(), this.nodes.$parent.removeClass(this.config.dirOpenClass + " " + this.config.openClass), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "false"), this.drawerIsOpen = !1, slate.a11y.removeTrapFocus({
                $container: this.$drawer,
                namespace: "drawer_focus"
            }), this.unbindEvents(), this.config.onDrawerClose && "function" == typeof this.config.onDrawerClose && this.config.onDrawerClose())
        }, e.prototype.bindEvents = function() {
            this.nodes.$parent.on("keyup.drawer", $.proxy(function(e) {
                return 27 !== e.keyCode || (this.close(), !1)
            }, this)), this.nodes.$page.on("touchmove.drawer", function() {
                return !1
            }), this.nodes.$page.on("click.drawer", $.proxy(function() {
                return this.close(), !1
            }, this))
        }, e.prototype.unbindEvents = function() {
            this.nodes.$page.off(".drawer"), this.nodes.$parent.off(".drawer")
        }, e
    }(), window.theme = window.theme || {}, theme.Header = function() {
        var i = "body",
            e = "#AccessibleNav",
            t = "[data-has-dropdowns]",
            n = ".site-nav--active-dropdown",
            o = ".site-nav__link--main",
            s = ".site-nav__link--last",
            r = "site-nav--active-dropdown",
            a = "site-nav__dropdown--right",
            l = "site-nav__dropdown--left",
            c = {};

        function d(e) {
            e.find(o).attr("aria-expanded", "false"), e.removeClass(r), c.$activeDropdown = $(n), $(i).off("click.siteNav"), $(window).off("keyup.siteNav")
        }

        function u(e) {
            e.each(function() {
                var e = $(this).find(".site-nav__dropdown");
                e.length && (Math.ceil($(this).offset().left) > Math.floor(c.$siteHeader.outerWidth()) / 2 ? e.removeClass(l).addClass(a) : e.removeClass(a).addClass(l))
            })
        }

        function p() {
            $(".site-nav--has-centered-dropdown").each(function() {
                var e = $(this),
                    t = e.find(".site-nav__dropdown--centered"),
                    e = e.position().top + 41;
                t.css("top", e)
            })
        }
        return {
            init: function() {
                c = {
                    $nav: $(e),
                    $topLevel: $(o),
                    $parents: $(e).find(t),
                    $subMenuLinks: $(".site-nav__child-link"),
                    $activeDropdown: $(n),
                    $siteHeader: $(".site-header")
                }, u($(t)), p(), c.$parents.on("click.siteNav", function() {
                    var t, e = $(this);
                    e.hasClass(r) ? d(e) : ((t = e).addClass(r), c.$activeDropdown.length && d(c.$activeDropdown), (c.$activeDropdown = t).find(o).attr("aria-expanded", "true"), setTimeout(function() {
                        $(window).on("keyup.siteNav", function(e) {
                            27 === e.keyCode && d(t)
                        }), $(i).on("click.siteNav", function() {
                            d(t)
                        })
                    }, 250))
                }), $(s).on("focusout.siteNav", function() {
                    setTimeout(function() {
                        !$(document.activeElement).hasClass("site-nav__child-link") && c.$activeDropdown.length && d(c.$activeDropdown)
                    })
                }), c.$topLevel.on("focus.siteNav", function() {
                    c.$activeDropdown.length && d(c.$activeDropdown)
                }), c.$subMenuLinks.on("click.siteNav", function(e) {
                    e.stopImmediatePropagation()
                }), $("[data-currency-selector]").on("change", function() {
                    $(this).parents("form").submit()
                }), $(window).resize($.debounce(50, function() {
                    u($(t)), p()
                }))
            },
            unload: function() {
                $(window).off(".siteNav"), c.$parents.off(".siteNav"), c.$subMenuLinks.off(".siteNav"), c.$topLevel.off(".siteNav"), $(s).off(".siteNav"), $(i).off(".siteNav")
            }
        }
    }(), window.theme = window.theme || {}, theme.MobileNav = function() {
        var r, a, i, l = {
                mobileNavOpenIcon: "mobile-nav--open",
                mobileNavCloseIcon: "mobile-nav--close",
          		mobileNavOpenBody: "mobile-menu-open",
                navLinkWrapper: "mobile-nav__item",
                navLink: "mobile-nav__link",
                subNavLink: "mobile-nav__sublist-link",
                return: "mobile-nav__return-btn",
                subNavActive: "is-active",
                subNavClosing: "is-closing",
                navOpen: "js-menu--is-open",
                subNavShowing: "sub-nav--is-open",
                thirdNavShowing: "third-nav--is-open",
                subNavToggleBtn: "js-toggle-submenu"
            },
            c = {},
            d = 1;

        function e() {
            var e;
            c.$mobileNavToggle.hasClass(l.mobileNavCloseIcon) ? t() : (e = c.$siteHeader.outerHeight(), c.$mobileNavContainer.prepareTransition().addClass(l.navOpen), /*c.$mobileNavContainer.css({
                transform: "translateY(" + e + "px)"
            }), c.$pageContainer.css({
                transform: "translate3d(0, " + c.$mobileNavContainer[0].scrollHeight + "px, 0)"
            }),*/ c.$bodyContainer.addClass(l.mobileNavOpenBody), slate.a11y.trapFocus({
                $container: c.$sectionHeader,
                $elementToFocus: c.$mobileNavToggle,
                namespace: "navFocus"
            }), c.$mobileNavToggle.addClass(l.mobileNavCloseIcon).removeClass(l.mobileNavOpenIcon).attr("aria-expanded", !0), $(window).on("keyup.mobileNav", function(e) {
                27 === e.which && t()
            }))
        }

        function t() {
            c.$mobileNavContainer.prepareTransition().removeClass(l.navOpen), /*c.$mobileNavContainer.css({
                transform: "translateY(-100%)"
            }), c.$pageContainer.removeAttr("style"),*/ c.$bodyContainer.removeClass(l.mobileNavOpenBody), slate.a11y.trapFocus({
                $container: $("html"),
                $elementToFocus: $("body")
            }), c.$mobileNavContainer.one("TransitionEnd.navToggle webkitTransitionEnd.navToggle transitionend.navToggle oTransitionEnd.navToggle", function() {
                slate.a11y.removeTrapFocus({
                    $container: c.$mobileNav,
                    namespace: "navFocus"
                })
            }), c.$mobileNavToggle.addClass(l.mobileNavOpenIcon).removeClass(l.mobileNavCloseIcon).attr("aria-expanded", !1).focus(), $(window).off("keyup.mobileNav"), scrollTo(0, 0)
        }

        function n(e) {
            var t;
            r || (e = (t = $(e.currentTarget)).hasClass(l.return), r = !0, e ? ($("." + l.subNavToggleBtn + '[data-level="' + (d - 1) + '"]').removeClass(l.subNavActive), i && i.length && i.removeClass(l.subNavActive)) : t.addClass(l.subNavActive), function(e) {
                var t = e ? $('.mobile-nav__dropdown[data-parent="' + e + '"]') : c.$mobileNav;
                d = t.data("level") ? t.data("level") : 1, a && a.length && a.prepareTransition().addClass(l.subNavClosing);
                var i = (a = t).outerHeight(),
                    n = 2 < d ? l.thirdNavShowing : l.subNavShowing;
                c.$mobileNavContainer.css("height", i).removeClass(l.thirdNavShowing).addClass(n), e || c.$mobileNavContainer.removeClass(l.thirdNavShowing).removeClass(l.subNavShowing);
                var o = 1 === d ? c.$sectionHeader : t,
                    s = t.find("[data-menu-title=" + d + "]") || t;
                c.$mobileNavContainer.one("TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle", function() {
                    slate.a11y.trapFocus({
                        $container: o,
                        $elementToFocus: s,
                        namespace: "subNavFocus"
                    }), c.$mobileNavContainer.off(".subnavToggle"), r = !1
                }),/* c.$pageContainer.css({
                    transform: "translateY(" + i + "px)"
                }),*/ a.removeClass(l.subNavClosing)
            }((i = t).data("target")))
        }
        return {
            init: function() {
                (c = {
                    $pageContainer: $("#PageContainer"),
                    $bodyContainer: $("body"),
                    $siteHeader: $(".site-header"),
                    $mobileNavToggle: $(".js-mobile-nav-toggle, .mobile-nav-wrapper .menu-mobile-close"),
                    $mobileNavContainer: $(".mobile-nav-wrapper"),
                    $mobileNav: $("#MobileNav"),
                    $sectionHeader: $("#shopify-section-header"),
                    $subNavToggleBtn: $("." + l.subNavToggleBtn)
                }).$mobileNavToggle.on("click", e), c.$subNavToggleBtn.on("click.subNav", n), enquire.register("screen and (max-width: 749px)", {
                    unmatch: function() {
                        c.$mobileNavContainer.hasClass(l.navOpen) && t()
                    }
                })
            },
            closeMobileNav: t
        }
    }(jQuery), window.theme = window.theme || {}, theme.Search = function() {
        var i = ".site-header",
            e = ".site-header__search-toggle";

        function t() {
            n($(".search-bar__input")), $(".mobile-nav-wrapper").hasClass("js-menu--is-open") && theme.MobileNav.closeMobileNav()
        }

        function n(e) {
            e.focus(), e[0].setSelectionRange(0, e[0].value.length)
        }

        function o() {
            $(e).focus()
        }

        function s(e) {
            0 === this.$searchResultInput.val().trim().length ? (void 0 !== e && e.preventDefault(), n(this.$searchResultInput), function() {
                this.$searchErrorMessage.removeClass("hide"), this.$searchResultInput.attr("aria-describedby", "error-search-form").attr("aria-invalid", !0)
            }.call(this)) : function() {
                this.$searchErrorMessage.addClass("hide"), this.$searchResultInput.removeAttr("aria-describedby").removeAttr("aria-invalid")
            }.call(this)
        }
        return {
            init: function() {
                $(i).length && (this.$searchResultInput = $("#SearchInput"), this.$searchErrorMessage = $("[data-search-error-message]"), $("#PageContainer").addClass("drawer-page-content"), $(".js-drawer-open-top").attr("aria-controls", "SearchDrawer").attr("aria-expanded", "false").attr("aria-haspopup", "dialog"), theme.SearchDrawer = new theme.Drawers("SearchDrawer", "top", {
                    onDrawerOpen: t,
                    onDrawerClose: o
                }), null !== slate.utils.getParameterByName("q") && $("body").hasClass("template-search") && s.call(this), $("#SearchResultSubmit").on("click", s.bind(this)), $(".search-header__input").add(".search-header__submit").on("focus blur", function() {
                    $(".search-header").toggleClass("search--focus")
                }), $(e).on("click", function() {
                    var e = $(i).outerHeight(),
                        t = $(i).offset().top - e;
                    $(".search-bar").css({
                        height: e + "px",
                        top: t + "px"
                    })
                }))
            }
        }
    }(),
    function() {
        var e = $(".return-link");

        function t(e) {
            var t = document.createElement("a");
            return t.ref = e, t.hostname
        }
        document.referrer && e.length && window.history.length && e.one("click", function(e) {
            e.preventDefault();
            e = t(document.referrer);
            return t(window.location.href) === e && history.back(), !1
        })
    }(), window.theme = window.theme || {}, theme.FormStatus = {
        init: function() {
            this.$statusMessage = $("[data-form-status]"), this.$statusMessage && (this.$statusMessage.attr("tabindex", -1).focus(), this.$statusMessage.on("blur", function() {
                this.$statusMessage.removeAttr("tabindex")
            }.bind(this)))
        }
    }, window.theme = theme || {}, window.theme = window.theme || {}, theme.Filters = function() {
        var o = "#MainContent",
            t = "#FilterTags",
            i = "#SortBy";

        function e(e) {
            e = this.$container = $(e);
            this.$filterSelect = $(t, e), this.$sortSelect = $(i, e), this.$selects = $(t, e).add($(i, e)), this.defaultSort = this._getDefaultSortValue(), this.$selects.removeClass("hidden"), this.$filterSelect.on("change", this._onFilterChange.bind(this)), this.$sortSelect.on("change", this._onSortChange.bind(this)), this._initBreakpoints();
        }
        return e.prototype = _.assignIn({}, e.prototype, {
            _initBreakpoints: function() {
                var e = this;
                enquire.register("screen and (min-width: 750px)", {
                    match: function() {
                        e._resizeSelect(e.$selects)
                    }
                })
            },
            _onSortChange: function() {
                var e = this._sortValue(),
                    t = window.location.href.replace(window.location.search, ""),
                    i = slate.utils.getParameterByName("q"),
                    n = null !== i ? i : "";

                e.length ? (i = t.replace(window.location.hash, ""), n = "" !== n ? "?q=" + n + "&" : "?", window.location.href = i + n + e + o) : window.location.href = t
            },
            _onFilterChange: function() {
                var e = this._getFilterValue(),
                    t = "" !== (t = document.location.search.replace(/\?(page=\w+)?&?/, "")) ? "?" + t : "";
                document.location.href = e + t + o
            },
            _getFilterValue: function() {
                return this.$filterSelect.val()
            },
            _getSortValue: function() {
                return this.$sortSelect.val() || this.defaultSort
            },
            _getDefaultSortValue: function() {
                return this.$sortSelect.attr("data-default-sortby")
            },
            _sortValue: function() {
                var e = this._getSortValue(),
                    t = "";
                return e !== this.defaultSort && (t = "sort_by=" + e), t
            },
            _resizeSelect: function(e) {
                e.each(function() {
                    var e = $(this),
                        t = e.find("option:selected").text(),
                        i = $("<span>").html(t);
                    i.appendTo("body");
                    t = i.width();
                    i.remove(), e.width(t + 10)
                })
            },
            onUnload: function() {
                this.$filterSelect.off("change", this._onFilterChange), this.$sortSelect.off("change", this._onSortChange)
            }
        }), e
    }(), window.theme = window.theme || {}, theme.HeaderSection = function() {
        function e() {
            theme.Header.init(), theme.MobileNav.init(), theme.Search.init()
        }
        return e.prototype = _.assignIn({}, e.prototype, {
            onUnload: function() {
                theme.Header.unload()
            }
        }), e
    }(), $(document).ready(function() {
        var e = new theme.Sections;
        e.register("collection-template", theme.Filters), e.register("header-section", theme.HeaderSection)
    }), $(document).ready(function() {
        $("ul.tabs").each(function() {
            var e = $(this).find("a"),
                t = e.first().addClass("active"),
                i = $(t.attr("href"));
            e.not(":first").each(function() {
                $($(this).attr("href")).hide()
            }), $(this).find("a").click(function(e) {
                return t.removeClass("active"), i.hide(), t = $(this), i = $($(this).attr("href")), t.addClass("active"), i.show(), !1
            })
        })
    });
var Shopify = Shopify || {};
Shopify.money_format = "${{amount}}", Shopify.formatMoney = function(e, t) {
        "string" == typeof e && (e = e.replace(".", ""));
        var i = "",
            n = /\{\{\s*(\w+)\s*\}\}/,
            t = t || this.money_format;

        function o(e, t) {
            return void 0 === e ? t : e
        }

        function s(e, t, i, n) {
            if (t = o(t, 2), i = o(i, ","), n = o(n, "."), isNaN(e) || null == e) return 0;
            e = (e = (e / 100).toFixed(t)).split(".");
            return e[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (e[1] ? n + e[1] : "")
        }
        switch (t.match(n)[1]) {
            case "amount":
                i = s(e, 2);
                break;
            case "amount_no_decimals":
                i = s(e, 0);
                break;
            case "amount_with_comma_separator":
                i = s(e, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                i = s(e, 0, ".", ",")
        }
        return t.replace(n, i)
    }, $(function() {}),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(c) {
        "use strict";
        var s = window.Slick,
            n = 0;
        (s = function(e, t) {
            var i = this;
            i.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: c(e),
                appendDots: c(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return c('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, i.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, c.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.focussed = !1, i.interrupted = !1, i.hidden = "hidden", i.paused = !0, i.positionProp = null, i.respondTo = null, i.rowCount = 1, i.shouldClick = !0, i.$slider = c(e), i.$slidesCache = null, i.transformType = null, i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, i.windowTimer = null, e = c(e).data("slick") || {}, i.options = c.extend({}, i.defaults, t, e), i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, void 0 !== document.mozHidden ? (i.hidden = "mozHidden", i.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (i.hidden = "webkitHidden", i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = c.proxy(i.autoPlay, i), i.autoPlayClear = c.proxy(i.autoPlayClear, i), i.autoPlayIterator = c.proxy(i.autoPlayIterator, i), i.changeSlide = c.proxy(i.changeSlide, i), i.clickHandler = c.proxy(i.clickHandler, i), i.selectHandler = c.proxy(i.selectHandler, i), i.setPosition = c.proxy(i.setPosition, i), i.swipeHandler = c.proxy(i.swipeHandler, i), i.dragHandler = c.proxy(i.dragHandler, i), i.keyHandler = c.proxy(i.keyHandler, i), i.instanceUid = n++, i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, i.registerBreakpoints(), i.init(!0)
        }).prototype.activateADA = function() {
            this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, s.prototype.addSlide = s.prototype.slickAdd = function(e, t, i) {
            var n = this;
            if ("boolean" == typeof t) i = t, t = null;
            else if (t < 0 || t >= n.slideCount) return !1;
            n.unload(), "number" == typeof t ? 0 === t && 0 === n.$slides.length ? c(e).appendTo(n.$slideTrack) : i ? c(e).insertBefore(n.$slides.eq(t)) : c(e).insertAfter(n.$slides.eq(t)) : !0 === i ? c(e).prependTo(n.$slideTrack) : c(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(e, t) {
                c(t).attr("data-slick-index", e)
            }), n.$slidesCache = n.$slides, n.reinit()
        }, s.prototype.animateHeight = function() {
            var e;
            1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical && (e = this.$slides.eq(this.currentSlide).outerHeight(!0), this.$list.animate({
                height: e
            }, this.options.speed))
        }, s.prototype.animateSlide = function(e, t) {
            var i = {},
                n = this;
            n.animateHeight(), !0 === n.options.rtl && !1 === n.options.vertical && (e = -e), !1 === n.transformsEnabled ? !1 === n.options.vertical ? n.$slideTrack.animate({
                left: e
            }, n.options.speed, n.options.easing, t) : n.$slideTrack.animate({
                top: e
            }, n.options.speed, n.options.easing, t) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), c({
                animStart: n.currentLeft
            }).animate({
                animStart: e
            }, {
                duration: n.options.speed,
                easing: n.options.easing,
                step: function(e) {
                    e = Math.ceil(e), !1 === n.options.vertical ? i[n.animType] = "translate(" + e + "px, 0px)" : i[n.animType] = "translate(0px," + e + "px)", n.$slideTrack.css(i)
                },
                complete: function() {
                    t && t.call()
                }
            })) : (n.applyTransition(), e = Math.ceil(e), !1 === n.options.vertical ? i[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(i), t && setTimeout(function() {
                n.disableTransition(), t.call()
            }, n.options.speed))
        }, s.prototype.getNavTarget = function() {
            var e = this.options.asNavFor;
            return e && null !== e && (e = c(e).not(this.$slider)), e
        }, s.prototype.asNavFor = function(t) {
            var e = this.getNavTarget();
            null !== e && "object" == typeof e && e.each(function() {
                var e = c(this).slick("getSlick");
                e.unslicked || e.slideHandler(t, !0)
            })
        }, s.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, (!1 === t.options.fade ? t.$slideTrack : t.$slides.eq(e)).css(i)
        }, s.prototype.autoPlay = function() {
            this.autoPlayClear(), this.slideCount > this.options.slidesToShow && (this.autoPlayTimer = setInterval(this.autoPlayIterator, this.options.autoplaySpeed))
        }, s.prototype.autoPlayClear = function() {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer)
        }, s.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
        }, s.prototype.buildArrows = function() {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = c(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = c(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, s.prototype.buildDots = function() {
            var e, t;
            if (!0 === this.options.dots) {
                for (this.$slider.addClass("slick-dotted"), t = c("<ul />").addClass(this.options.dotsClass), e = 0; e <= this.getDotCount(); e += 1) t.append(c("<li />").append(this.options.customPaging.call(this, this, e)));
                this.$dots = t.appendTo(this.options.appendDots), this.$dots.find("li").first().addClass("slick-active")
            }
        }, s.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                c(t).attr("data-slick-index", e).data("originalStyling", c(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? c('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), c("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, s.prototype.buildRows = function() {
            var e, t, i, n = this,
                o = document.createDocumentFragment(),
                s = n.$slider.children();
            if (1 < n.options.rows) {
                for (i = n.options.slidesPerRow * n.options.rows, t = Math.ceil(s.length / i), e = 0; e < t; e++) {
                    for (var r = document.createElement("div"), a = 0; a < n.options.rows; a++) {
                        for (var l = document.createElement("div"), c = 0; c < n.options.slidesPerRow; c++) {
                            var d = e * i + (a * n.options.slidesPerRow + c);
                            s.get(d) && l.appendChild(s.get(d))
                        }
                        r.appendChild(l)
                    }
                    o.appendChild(r)
                }
                n.$slider.empty().append(o), n.$slider.children().children().children().css({
                    width: 100 / n.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, s.prototype.checkResponsive = function(e, t) {
            var i, n, o, s = this,
                r = !1,
                a = s.$slider.width(),
                l = window.innerWidth || c(window).width();
            if ("window" === s.respondTo ? o = l : "slider" === s.respondTo ? o = a : "min" === s.respondTo && (o = Math.min(l, a)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
                for (i in n = null, s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? o < s.breakpoints[i] && (n = s.breakpoints[i]) : o > s.breakpoints[i] && (n = s.breakpoints[i]));
                null !== n ? null !== s.activeBreakpoint && n === s.activeBreakpoint && !t || (s.activeBreakpoint = n, "unslick" === s.breakpointSettings[n] ? s.unslick(n) : (s.options = c.extend({}, s.originalSettings, s.breakpointSettings[n]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), r = n) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e), r = n), e || !1 === r || s.$slider.trigger("breakpoint", [s, r])
            }
        }, s.prototype.changeSlide = function(e, t) {
            var i, n = this,
                o = c(e.currentTarget);
            switch (o.is("a") && e.preventDefault(), o.is("li") || (o = o.closest("li")), i = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
                case "previous":
                    s = 0 == i ? n.options.slidesToScroll : n.options.slidesToShow - i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - s, !1, t);
                    break;
                case "next":
                    s = 0 == i ? n.options.slidesToScroll : i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + s, !1, t);
                    break;
                case "index":
                    var s = 0 === e.data.index ? 0 : e.data.index || o.index() * n.options.slidesToScroll;
                    n.slideHandler(n.checkNavigable(s), !1, t), o.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, s.prototype.checkNavigable = function(e) {
            var t, i = 0;
            if (e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
            else
                for (var n in t) {
                    if (e < t[n]) {
                        e = i;
                        break
                    }
                    i = t[n]
                }
            return e
        }, s.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && (c("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", c.proxy(e.interrupt, e, !0)).off("mouseleave.slick", c.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), c(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().off("click.slick", e.selectHandler), c(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), c(window).off("resize.slick.slick-" + e.instanceUid, e.resize), c("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), c(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
        }, s.prototype.cleanUpSlideEvents = function() {
            this.$list.off("mouseenter.slick", c.proxy(this.interrupt, this, !0)), this.$list.off("mouseleave.slick", c.proxy(this.interrupt, this, !1))
        }, s.prototype.cleanUpRows = function() {
            var e;
            1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
        }, s.prototype.clickHandler = function(e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, s.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), c(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                c(this).attr("style", c(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
        }, s.prototype.disableTransition = function(e) {
            var t = {};
            t[this.transitionType] = "", (!1 === this.options.fade ? this.$slideTrack : this.$slides.eq(e)).css(t)
        }, s.prototype.fadeSlide = function(e, t) {
            var i = this;
            !1 === i.cssTransitions ? (i.$slides.eq(e).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(e), t.call()
            }, i.options.speed))
        }, s.prototype.fadeSlideOut = function(e) {
            !1 === this.cssTransitions ? this.$slides.eq(e).animate({
                opacity: 0,
                zIndex: this.options.zIndex - 2
            }, this.options.speed, this.options.easing) : (this.applyTransition(e), this.$slides.eq(e).css({
                opacity: 0,
                zIndex: this.options.zIndex - 2
            }))
        }, s.prototype.filterSlides = s.prototype.slickFilter = function(e) {
            null !== e && (this.$slidesCache = this.$slides, this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.filter(e).appendTo(this.$slideTrack), this.reinit())
        }, s.prototype.focusHandler = function() {
            var i = this;
            i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(e) {
                e.stopImmediatePropagation();
                var t = c(this);
                setTimeout(function() {
                    i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay())
                }, 0)
            })
        }, s.prototype.getCurrent = s.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, s.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                i = 0,
                n = 0;
            if (!0 === e.options.infinite)
                if (e.slideCount <= e.options.slidesToShow) ++n;
                else
                    for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (!0 === e.options.centerMode) n = e.slideCount;
            else if (e.options.asNavFor)
                for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return n - 1
        }, s.prototype.getLeft = function(e) {
            var t, i, n = this,
                o = 0;
            return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, i = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? i = -1.5 : 1 === n.options.slidesToShow && (i = -2)), o = t * n.options.slidesToShow * i), n.slideCount % n.options.slidesToScroll != 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (o = e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1, (n.options.slidesToShow - (e - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, n.slideCount % n.options.slidesToScroll * t * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth, o = (e + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (o = n.slideOffset = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * t * -1 + o, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, t += (n.$list.width() - o.outerWidth()) / 2)), t
        }, s.prototype.getOption = s.prototype.slickGetOption = function(e) {
            return this.options[e]
        }, s.prototype.getNavigableIndexes = function() {
            for (var e = this, t = 0, i = 0, n = [], o = !1 === e.options.infinite ? e.slideCount : (t = -1 * e.options.slidesToScroll, i = -1 * e.options.slidesToScroll, 2 * e.slideCount); t < o;) n.push(t), t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return n
        }, s.prototype.getSlick = function() {
            return this
        }, s.prototype.getSlideCount = function() {
            var i, n = this,
                o = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0;
            return !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(e, t) {
                if (t.offsetLeft - o + c(t).outerWidth() / 2 > -1 * n.swipeLeft) return i = t, !1
            }), Math.abs(c(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        }, s.prototype.goTo = s.prototype.slickGoTo = function(e, t) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, s.prototype.init = function(e) {
            var t = this;
            c(t.$slider).hasClass("slick-initialized") || (c(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, s.prototype.initADA = function() {
            var i = this,
                n = Math.ceil(i.slideCount / i.options.slidesToShow),
                o = i.getNavigableIndexes().filter(function(e) {
                    return 0 <= e && e < i.slideCount
                });
            i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function(e) {
                var t = o.indexOf(e);
                c(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + i.instanceUid + e,
                    tabindex: -1
                }), -1 !== t && c(this).attr({
                    "aria-describedby": "slick-slide-control" + i.instanceUid + t
                })
            }), i.$dots.attr("role", "tablist").find("li").each(function(e) {
                var t = o[e];
                c(this).attr({
                    role: "presentation"
                }), c(this).find("button").first().attr({
                    role: "tab",
                    id: "slick-slide-control" + i.instanceUid + e,
                    "aria-controls": "slick-slide" + i.instanceUid + t,
                    "aria-label": e + 1 + " of " + n,
                    "aria-selected": null,
                    tabindex: "-1"
                })
            }).eq(i.currentSlide).find("button").attr({
                "aria-selected": "true",
                tabindex: "0"
            }).end());
            for (var e = i.currentSlide, t = e + i.options.slidesToShow; e < t; e++) i.$slides.eq(e).attr("tabindex", 0);
            i.activateADA()
        }, s.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
        }, s.prototype.initDotEvents = function() {
            var e = this;
            !0 === e.options.dots && (c("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && c("li", e.$dots).on("mouseenter.slick", c.proxy(e.interrupt, e, !0)).on("mouseleave.slick", c.proxy(e.interrupt, e, !1))
        }, s.prototype.initSlideEvents = function() {
            this.options.pauseOnHover && (this.$list.on("mouseenter.slick", c.proxy(this.interrupt, this, !0)), this.$list.on("mouseleave.slick", c.proxy(this.interrupt, this, !1)))
        }, s.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), c(document).on(e.visibilityChange, c.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), c(window).on("orientationchange.slick.slick-" + e.instanceUid, c.proxy(e.orientationChange, e)), c(window).on("resize.slick.slick-" + e.instanceUid, c.proxy(e.resize, e)), c("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), c(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), c(e.setPosition)
        }, s.prototype.initUI = function() {
            !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.show(), this.$nextArrow.show()), !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.show()
        }, s.prototype.keyHandler = function(e) {
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === this.options.accessibility ? this.changeSlide({
                data: {
                    message: !0 === this.options.rtl ? "next" : "previous"
                }
            }) : 39 === e.keyCode && !0 === this.options.accessibility && this.changeSlide({
                data: {
                    message: !0 === this.options.rtl ? "previous" : "next"
                }
            }))
        }, s.prototype.lazyLoad = function() {
            function e(e) {
                c("img[data-lazy]", e).each(function() {
                    var e = c(this),
                        t = c(this).attr("data-lazy"),
                        i = c(this).attr("data-srcset"),
                        n = c(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
                        o = document.createElement("img");
                    o.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            i && (e.attr("srcset", i), n && e.attr("sizes", n)), e.attr("src", t).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                            }), s.$slider.trigger("lazyLoaded", [s, e, t])
                        })
                    }, o.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t])
                    }, o.src = t
                })
            }
            var t, i, n, s = this;
            if (!0 === s.options.centerMode ? n = !0 === s.options.infinite ? (i = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (i = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (i = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, n = Math.ceil(i + s.options.slidesToShow), !0 === s.options.fade && (0 < i && i--, n <= s.slideCount && n++)), t = s.$slider.find(".slick-slide").slice(i, n), "anticipated" === s.options.lazyLoad)
                for (var o = i - 1, r = n, a = s.$slider.find(".slick-slide"), l = 0; l < s.options.slidesToScroll; l++) o < 0 && (o = s.slideCount - 1), t = (t = t.add(a.eq(o))).add(a.eq(r)), o--, r++;
            e(t), s.slideCount <= s.options.slidesToShow ? e(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && e(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
        }, s.prototype.loadSlider = function() {
            this.setPosition(), this.$slideTrack.css({
                opacity: 1
            }), this.$slider.removeClass("slick-loading"), this.initUI(), "progressive" === this.options.lazyLoad && this.progressiveLazyLoad()
        }, s.prototype.next = s.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, s.prototype.orientationChange = function() {
            this.checkResponsive(), this.setPosition()
        }, s.prototype.pause = s.prototype.slickPause = function() {
            this.autoPlayClear(), this.paused = !0
        }, s.prototype.play = s.prototype.slickPlay = function() {
            this.autoPlay(), this.options.autoplay = !0, this.paused = !1, this.focussed = !1, this.interrupted = !1
        }, s.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && c(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
        }, s.prototype.prev = s.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, s.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, s.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var t, i, n, o, s = this,
                r = c("img[data-lazy]", s.$slider);
            r.length ? (t = r.first(), i = t.attr("data-lazy"), n = t.attr("data-srcset"), o = t.attr("data-sizes") || s.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
                n && (t.attr("srcset", n), o && t.attr("sizes", o)), t.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === s.options.adaptiveHeight && s.setPosition(), s.$slider.trigger("lazyLoaded", [s, t, i]), s.progressiveLazyLoad()
            }, r.onerror = function() {
                e < 3 ? setTimeout(function() {
                    s.progressiveLazyLoad(e + 1)
                }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, t, i]), s.progressiveLazyLoad())
            }, r.src = i) : s.$slider.trigger("allImagesLoaded", [s])
        }, s.prototype.refresh = function(e) {
            var t = this,
                i = t.slideCount - t.options.slidesToShow;
            !t.options.infinite && t.currentSlide > i && (t.currentSlide = i), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), i = t.currentSlide, t.destroy(!0), c.extend(t, t.initials, {
                currentSlide: i
            }), t.init(), e || t.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !1)
        }, s.prototype.registerBreakpoints = function() {
            var e, t, i, n = this,
                o = n.options.responsive || null;
            if ("array" === c.type(o) && o.length) {
                for (e in n.respondTo = n.options.respondTo || "window", o)
                    if (i = n.breakpoints.length - 1, o.hasOwnProperty(e)) {
                        for (t = o[e].breakpoint; 0 <= i;) n.breakpoints[i] && n.breakpoints[i] === t && n.breakpoints.splice(i, 1), i--;
                        n.breakpoints.push(t), n.breakpointSettings[t] = o[e].settings
                    } n.breakpoints.sort(function(e, t) {
                    return n.options.mobileFirst ? e - t : t - e
                })
            }
        }, s.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, s.prototype.resize = function() {
            var e = this;
            c(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = c(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, s.prototype.removeSlide = s.prototype.slickRemove = function(e, t, i) {
            var n = this;
            if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e, n.slideCount < 1 || e < 0 || e > n.slideCount - 1) return !1;
            n.unload(), (!0 === i ? n.$slideTrack.children() : n.$slideTrack.children(this.options.slide).eq(e)).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
        }, s.prototype.setCSS = function(e) {
            var t, i, n = {};
            !0 === this.options.rtl && (e = -e), t = "left" == this.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == this.positionProp ? Math.ceil(e) + "px" : "0px", n[this.positionProp] = e, !1 === this.transformsEnabled || (!(n = {}) === this.cssTransitions ? n[this.animType] = "translate(" + t + ", " + i + ")" : n[this.animType] = "translate3d(" + t + ", " + i + ", 0px)"), this.$slideTrack.css(n)
        }, s.prototype.setDimensions = function() {
            var e = this;
            !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, s.prototype.setFade = function() {
            var i, n = this;
            n.$slides.each(function(e, t) {
                i = n.slideWidth * e * -1, !0 === n.options.rtl ? c(t).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                }) : c(t).css({
                    position: "relative",
                    left: i,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                })
            }), n.$slides.eq(n.currentSlide).css({
                zIndex: n.options.zIndex - 1,
                opacity: 1
            })
        }, s.prototype.setHeight = function() {
            var e;
            1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical && (e = this.$slides.eq(this.currentSlide).outerHeight(!0), this.$list.css("height", e))
        }, s.prototype.setOption = s.prototype.slickSetOption = function() {
            var e, t, i, n, o, s = this,
                r = !1;
            if ("object" === c.type(arguments[0]) ? (i = arguments[0], r = arguments[1], o = "multiple") : "string" === c.type(arguments[0]) && (n = arguments[1], r = arguments[2], "responsive" === (i = arguments[0]) && "array" === c.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), "single" === o) s.options[i] = n;
            else if ("multiple" === o) c.each(i, function(e, t) {
                s.options[e] = t
            });
            else if ("responsive" === o)
                for (t in n)
                    if ("array" !== c.type(s.options.responsive)) s.options.responsive = [n[t]];
                    else {
                        for (e = s.options.responsive.length - 1; 0 <= e;) s.options.responsive[e].breakpoint === n[t].breakpoint && s.options.responsive.splice(e, 1), e--;
                        s.options.responsive.push(n[t])
                    } r && (s.unload(), s.reinit())
        }, s.prototype.setPosition = function() {
            this.setDimensions(), this.setHeight(), !1 === this.options.fade ? this.setCSS(this.getLeft(this.currentSlide)) : this.setFade(), this.$slider.trigger("setPosition", [this])
        }, s.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
        }, s.prototype.setSlideClasses = function(e) {
            var t, i, n, o = this,
                s = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
            o.$slides.eq(e).addClass("slick-current"), !0 === o.options.centerMode ? (i = o.options.slidesToShow % 2 == 0 ? 1 : 0, n = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (n <= e && e <= o.slideCount - 1 - n ? o.$slides.slice(e - n + i, e + n + 1).addClass("slick-active").attr("aria-hidden", "false") : (t = o.options.slidesToShow + e, s.slice(t - n + 1 + i, t + n + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? s.eq(s.length - 1 - o.options.slidesToShow).addClass("slick-center") : e === o.slideCount - 1 && s.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(e).addClass("slick-center")) : 0 <= e && e <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(e, e + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : s.length <= o.options.slidesToShow ? s.addClass("slick-active").attr("aria-hidden", "false") : (n = o.slideCount % o.options.slidesToShow, t = !0 === o.options.infinite ? o.options.slidesToShow + e : e, (o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - e < o.options.slidesToShow ? s.slice(t - (o.options.slidesToShow - n), t + n) : s.slice(t, t + o.options.slidesToShow)).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" !== o.options.lazyLoad && "anticipated" !== o.options.lazyLoad || o.lazyLoad()
        }, s.prototype.setupInfinite = function() {
            var e, t, i, n = this;
            if (!0 === n.options.fade && (n.options.centerMode = !1), !0 === n.options.infinite && !1 === n.options.fade && (t = null, n.slideCount > n.options.slidesToShow)) {
                for (i = !0 === n.options.centerMode ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - i; --e) t = e - 1, c(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < i + n.slideCount; e += 1) t = e, c(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
                n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    c(this).attr("id", "")
                })
            }
        }, s.prototype.interrupt = function(e) {
            e || this.autoPlay(), this.interrupted = e
        }, s.prototype.selectHandler = function(e) {
            e = c(e.target).is(".slick-slide") ? c(e.target) : c(e.target).parents(".slick-slide"), e = (e = parseInt(e.attr("data-slick-index"))) || 0;
            this.slideCount <= this.options.slidesToShow ? this.slideHandler(e, !1, !0) : this.slideHandler(e)
        }, s.prototype.slideHandler = function(e, t, i) {
            var n, o, s, r, a = this;
            if (t = t || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === e))
                if (!1 === t && a.asNavFor(e), n = e, r = a.getLeft(n), t = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? t : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (e < 0 || e > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (n = a.currentSlide, !0 !== i ? a.animateSlide(t, function() {
                    a.postSlide(n)
                }) : a.postSlide(n));
                else if (!1 === a.options.infinite && !0 === a.options.centerMode && (e < 0 || e > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (n = a.currentSlide, !0 !== i ? a.animateSlide(t, function() {
                a.postSlide(n)
            }) : a.postSlide(n));
            else {
                if (a.options.autoplay && clearInterval(a.autoPlayTimer), o = n < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + n : n >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : n - a.slideCount : n, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, o]), t = a.currentSlide, a.currentSlide = o, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (s = (s = a.getNavTarget()).slick("getSlick")).slideCount <= s.options.slidesToShow && s.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== i ? (a.fadeSlideOut(t), a.fadeSlide(o, function() {
                    a.postSlide(o)
                })) : a.postSlide(o), void a.animateHeight();
                !0 !== i ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o)
            }
        }, s.prototype.startLoad = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, s.prototype.swipeDirection = function() {
            var e = this.touchObject.startX - this.touchObject.curX,
                t = this.touchObject.startY - this.touchObject.curY,
                e = Math.atan2(t, e);
            return (e = Math.round(180 * e / Math.PI)) < 0 && (e = 360 - Math.abs(e)), e <= 45 && 0 <= e || e <= 360 && 315 <= e ? !1 === this.options.rtl ? "left" : "right" : 135 <= e && e <= 225 ? !1 === this.options.rtl ? "right" : "left" : !0 === this.options.verticalSwiping ? 35 <= e && e <= 135 ? "down" : "up" : "vertical"
        }, s.prototype.swipeEnd = function(e) {
            var t, i, n = this;
            if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1;
            if (n.interrupted = !1, n.shouldClick = !(10 < n.touchObject.swipeLength), void 0 === n.touchObject.curX) return !1;
            if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
                switch (i = n.swipeDirection()) {
                    case "left":
                    case "down":
                        t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
                }
                "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
            } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
        }, s.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, s.prototype.swipeMove = function(e) {
            var t, i, n = this,
                o = void 0 !== e.originalEvent ? e.originalEvent.touches : null;
            return !(!n.dragging || n.scrolling || o && 1 !== o.length) && (t = n.getLeft(n.currentSlide), n.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX, n.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY, n.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(n.touchObject.curX - n.touchObject.startX, 2))), i = Math.round(Math.sqrt(Math.pow(n.touchObject.curY - n.touchObject.startY, 2))), !n.options.verticalSwiping && !n.swiping && 4 < i ? !(n.scrolling = !0) : (!0 === n.options.verticalSwiping && (n.touchObject.swipeLength = i), o = n.swipeDirection(), void 0 !== e.originalEvent && 4 < n.touchObject.swipeLength && (n.swiping = !0, e.preventDefault()), i = (!1 === n.options.rtl ? 1 : -1) * (n.touchObject.curX > n.touchObject.startX ? 1 : -1), !0 === n.options.verticalSwiping && (i = n.touchObject.curY > n.touchObject.startY ? 1 : -1), e = n.touchObject.swipeLength, (n.touchObject.edgeHit = !1) === n.options.infinite && (0 === n.currentSlide && "right" === o || n.currentSlide >= n.getDotCount() && "left" === o) && (e = n.touchObject.swipeLength * n.options.edgeFriction, n.touchObject.edgeHit = !0), !1 === n.options.vertical ? n.swipeLeft = t + e * i : n.swipeLeft = t + e * (n.$list.height() / n.listWidth) * i, !0 === n.options.verticalSwiping && (n.swipeLeft = t + e * i), !0 !== n.options.fade && !1 !== n.options.touchMove && (!0 === n.animating ? (n.swipeLeft = null, !1) : void n.setCSS(n.swipeLeft))))
        }, s.prototype.swipeStart = function(e) {
            var t, i = this;
            if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return !(i.touchObject = {});
            void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0
        }, s.prototype.unfilterSlides = s.prototype.slickUnfilter = function() {
            null !== this.$slidesCache && (this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.appendTo(this.$slideTrack), this.reinit())
        }, s.prototype.unload = function() {
            var e = this;
            c(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, s.prototype.unslick = function(e) {
            this.$slider.trigger("unslick", [this, e]), this.destroy()
        }, s.prototype.updateArrows = function() {
            var e = this;
            Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode || e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode) && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, s.prototype.updateDots = function() {
            null !== this.$dots && (this.$dots.find("li").removeClass("slick-active").end(), this.$dots.find("li").eq(Math.floor(this.currentSlide / this.options.slidesToScroll)).addClass("slick-active"))
        }, s.prototype.visibility = function() {
            this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
        }, c.fn.slick = function() {
            for (var e, t = arguments[0], i = Array.prototype.slice.call(arguments, 1), n = this.length, o = 0; o < n; o++)
                if ("object" == typeof t || void 0 === t ? this[o].slick = new s(this[o], t) : e = this[o].slick[t].apply(this[o].slick, i), void 0 !== e) return e;
            return this
        }
    });