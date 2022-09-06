! function(e, t, n) {
    var r = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = n(r) : "function" == typeof define && define.amd ? define(function() {
        return t[e] = n(r)
    }) : t[e] = n(r)
}("enquire", this, function(e) {
    "use strict";

    function t(e, t) {
        for (var n = 0, r = e.length; n < r && !1 !== t(e[n], n); n++);
    }

    function n(e) {
        return "function" == typeof e
    }

    function r(e) {
        (this.options = e).deferSetup || this.setup() 
    }

    function o(t, n) {
        this.query = t, this.isUnconditional = n, this.handlers = [], this.mql = e(t);
        var r = this;
        this.listener = function(e) {
            r.mql = e, r.assess()
        }, this.mql.addListener(this.listener)
    }

    function i() {
        if (!e) throw new Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {}, this.browserIsIncapable = !e("only all").matches
    }
    return r.prototype = {
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
    }, o.prototype = {
        addHandler: function(e) {
            e = new r(e), this.handlers.push(e), this.matches() && e.on()
        },
        removeHandler: function(e) {
            var n = this.handlers;
            t(n, function(t, r) {
                return t.equals(e) ? (t.destroy(), !n.splice(r, 1)) : void 0
            })
        },
        matches: function() {
            return this.mql.matches || this.isUnconditional
        },
        clear: function() {
            t(this.handlers, function(e) {
                e.destroy()
            }), this.mql.removeListener(this.listener), this.handlers.length = 0
        },
        assess: function() {
            var e = this.matches() ? "on" : "off";
            t(this.handlers, function(t) {
                t[e]()
            })
        }
    }, i.prototype = {
        register: function(e, r, i) {
            var a = this.queries;
            i = i && this.browserIsIncapable;
            return a[e] || (a[e] = new o(e, i)), n(r) && (r = {
                match: r
            }), "[object Array]" === Object.prototype.toString.apply(r) || (r = [r]), t(r, function(t) {
                n(t) && (t = {
                    match: t
                }), a[e].addHandler(t)
            }), this
        },
        unregister: function(e, t) {
            var n = this.queries[e];
            return n && (t ? n.removeHandler(t) : (n.clear(), delete this.queries[e])), this
        }
    }, new i
}),
function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length,
            n = K.type(e);
        return "function" !== n && !K.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }

    function r(e, t, n) {
        if (K.isFunction(t)) return K.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return K.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (se.test(t)) return K.filter(t, e, n);
            t = K.filter(t, e)
        }
        return K.grep(e, function(e) {
            return -1 < V.call(t, e) !== n
        })
    }

    function o(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function i() {
        W.removeEventListener("DOMContentLoaded", i), e.removeEventListener("load", i), K.ready()
    }

    function a() {
        this.expando = K.expando + a.uid++
    }

    function s(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(be, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : ye.test(n) ? K.parseJSON(n) : n)
                } catch (e) {}
                ge.set(e, t, n)
            } else n = void 0;
        return n
    }

    function u(e, t, n, r) {
        var o, i = 1,
            a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return K.css(e, t, "")
            },
            u = s(),
            c = n && n[3] || (K.cssNumber[t] ? "" : "px"),
            l = (K.cssNumber[t] || "px" !== c && +u) && Ce.exec(K.css(e, t));
        if (l && l[3] !== c)
            for (c = c || l[3], n = n || [], l = +u || 1; l /= i = i || ".5", K.style(e, t, l + c), i !== (i = s() / u) && 1 !== i && --a;);
        return n && (l = +l || +u || 0, o = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = c, r.start = l, r.end = o)), o
    }

    function c(e, t) {
        var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && K.nodeName(e, t) ? K.merge([e], n) : n
    }

    function l(e, t) {
        for (var n = 0, r = e.length; n < r; n++) ve.set(e[n], "globalEval", !t || ve.get(t[n], "globalEval"))
    }

    function f(e, t, n, r, o) {
        for (var i, a, s, u, f, p = t.createDocumentFragment(), d = [], h = 0, m = e.length; h < m; h++)
            if ((i = e[h]) || 0 === i)
                if ("object" === K.type(i)) K.merge(d, i.nodeType ? [i] : i);
                else if (Se.test(i)) {
            for (a = a || p.appendChild(t.createElement("div")), s = ($e.exec(i) || ["", ""])[1].toLowerCase(), s = _e[s] || _e._default, a.innerHTML = s[1] + K.htmlPrefilter(i) + s[2], f = s[0]; f--;) a = a.lastChild;
            K.merge(d, a.childNodes), (a = p.firstChild).textContent = ""
        } else d.push(t.createTextNode(i));
        for (p.textContent = "", h = 0; i = d[h++];)
            if (r && -1 < K.inArray(i, r)) o && o.push(i);
            else if (u = K.contains(i.ownerDocument, i), a = c(p.appendChild(i), "script"), u && l(a), n)
            for (f = 0; i = a[f++];) Ne.test(i.type || "") && n.push(i);
        return p
    }

    function p() {
        return !0
    }

    function d() {
        return !1
    }

    function h() {
        try {
            return W.activeElement
        } catch (e) {}
    }

    function m(e, t, n, r, o, i) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = void 0), t) m(e, s, n, r, t[s], i);
            return e
        }
        if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), !1 === o) o = d;
        else if (!o) return e;
        return 1 === i && (a = o, (o = function(e) {
            return K().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = K.guid++)), e.each(function() {
            K.event.add(this, t, o, r, n)
        })
    }

    function v(e, t) {
        return K.nodeName(e, "table") && K.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function g(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function y(e) {
        var t = Le.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function b(e, t) {
        var n, r, o, i, a, s;
        if (1 === t.nodeType) {
            if (ve.hasData(e) && (i = ve.access(e), a = ve.set(t, i), s = i.events))
                for (o in delete a.handle, a.events = {}, s)
                    for (n = 0, r = s[o].length; n < r; n++) K.event.add(t, o, s[o][n]);
            ge.hasData(e) && (e = ge.access(e), e = K.extend({}, e), ge.set(t, e))
        }
    }

    function w(e, t, n, r) {
        t = U.apply([], t);
        var o, i, a, s, u, l, p = 0,
            d = e.length,
            h = d - 1,
            m = t[0],
            v = K.isFunction(m);
        if (v || 1 < d && "string" == typeof m && !J.checkClone && Oe.test(m)) return e.each(function(o) {
            var i = e.eq(o);
            v && (t[0] = m.call(this, o, i.html())), w(i, t, n, r)
        });
        if (d && (i = (o = f(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === o.childNodes.length && (o = i), i || r)) {
            for (s = (a = K.map(c(o, "script"), g)).length; p < d; p++) u = o, p !== h && (u = K.clone(u, !0, !0), s && K.merge(a, c(u, "script"))), n.call(e[p], u, p);
            if (s)
                for (l = a[a.length - 1].ownerDocument, K.map(a, y), p = 0; p < s; p++) u = a[p], Ne.test(u.type || "") && !ve.access(u, "globalEval") && K.contains(l, u) && (u.src ? K._evalUrl && K._evalUrl(u.src) : K.globalEval(u.textContent.replace(He, "")))
        }
        return e
    }

    function x(e, t, n) {
        for (var r, o = t ? K.filter(t, e) : e, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || K.cleanData(c(r)), r.parentNode && (n && K.contains(r.ownerDocument, r) && l(c(r, "script")), r.parentNode.removeChild(r));
        return e
    }

    function C(e, t) {
        return e = K(t.createElement(e)).appendTo(t.body), t = K.css(e[0], "display"), e.detach(), t
    }

    function T(e) {
        var t = W,
            n = Ue[e];
        return n || ("none" !== (n = C(e, t)) && n || ((t = (Ie = (Ie || K("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), t.close(), n = C(e, t), Ie.detach()), Ue[e] = n), n
    }

    function k(e, t, n) {
        var r, o, i = e.style;
        return "" !== (o = (n = n || Ye(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== o || K.contains(e.ownerDocument, e) || (o = K.style(e, t)), n && !J.pixelMarginRight() && Ve.test(o) && Xe.test(t) && (r = i.width, e = i.minWidth, t = i.maxWidth, i.minWidth = i.maxWidth = i.width = o, o = n.width, i.width = r, i.minWidth = e, i.maxWidth = t), void 0 !== o ? o + "" : o
    }

    function $(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function N(e) {
        if (e in tt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = et.length; n--;)
            if ((e = et[n] + t) in tt) return e
    }

    function _(e, t, n) {
        var r = Ce.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function S(e, t, n, r, o) {
        for (var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; i < 4; i += 2) "margin" === n && (a += K.css(e, n + Te[i], !0, o)), r ? ("content" === n && (a -= K.css(e, "padding" + Te[i], !0, o)), "margin" !== n && (a -= K.css(e, "border" + Te[i] + "Width", !0, o))) : (a += K.css(e, "padding" + Te[i], !0, o), "padding" !== n && (a += K.css(e, "border" + Te[i] + "Width", !0, o)));
        return a
    }

    function E(t, n, r) {
        var o = !0,
            i = "width" === n ? t.offsetWidth : t.offsetHeight,
            a = Ye(t),
            s = "border-box" === K.css(t, "boxSizing", !1, a);
        if (W.msFullscreenElement && e.top !== e && t.getClientRects().length && (i = Math.round(100 * t.getBoundingClientRect()[n])), i <= 0 || null == i) {
            if (((i = k(t, n, a)) < 0 || null == i) && (i = t.style[n]), Ve.test(i)) return i;
            o = s && (J.boxSizingReliable() || i === t.style[n]), i = parseFloat(i) || 0
        }
        return i + S(t, n, r || (s ? "border" : "content"), o, a) + "px"
    }

    function j(e, t) {
        for (var n, r, o, i = [], a = 0, s = e.length; a < s; a++)(r = e[a]).style && (i[a] = ve.get(r, "olddisplay"), n = r.style.display, t ? (i[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && we(r) && (i[a] = ve.access(r, "olddisplay", T(r.nodeName)))) : (o = we(r), "none" === n && o || ve.set(r, "olddisplay", o ? n : K.css(r, "display"))));
        for (a = 0; a < s; a++)(r = e[a]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? i[a] || "" : "none"));
        return e
    }

    function D(e, t, n, r, o) {
        return new D.prototype.init(e, t, n, r, o)
    }

    function A() {
        return e.setTimeout(function() {
            nt = void 0
        }), nt = K.now()
    }

    function q(e, t) {
        var n, r = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) o["margin" + (n = Te[r])] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function O(e, t, n) {
        for (var r, o = (L.tweeners[t] || []).concat(L.tweeners["*"]), i = 0, a = o.length; i < a; i++)
            if (r = o[i].call(n, t, e)) return r
    }

    function L(e, t, n) {
        var r, o, i = 0,
            a = L.prefilters.length,
            s = K.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (o) return !1;
                for (var t = nt || A(), n = 1 - ((t = Math.max(0, c.startTime + c.duration - t)) / c.duration || 0), r = 0, i = c.tweens.length; r < i; r++) c.tweens[r].run(n);
                return s.notifyWith(e, [c, n, t]), n < 1 && i ? t : (s.resolveWith(e, [c]), !1)
            },
            c = s.promise({
                elem: e,
                props: K.extend({}, t),
                opts: K.extend(!0, {
                    specialEasing: {},
                    easing: K.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: nt || A(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    return t = K.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing), c.tweens.push(t), t
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < r; n++) c.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                }
            }),
            l = c.props;
        for (function(e, t) {
                var n, r, o, i, a;
                for (n in e)
                    if (o = t[r = K.camelCase(n)], i = e[n], K.isArray(i) && (o = i[1], i = e[n] = i[0]), n !== r && (e[r] = i, delete e[n]), (a = K.cssHooks[r]) && "expand" in a)
                        for (n in i = a.expand(i), delete e[r], i) n in e || (e[n] = i[n], t[n] = o);
                    else t[r] = o
            }(l, c.opts.specialEasing); i < a; i++)
            if (r = L.prefilters[i].call(c, e, l, c.opts)) return K.isFunction(r.stop) && (K._queueHooks(c.elem, c.opts.queue).stop = K.proxy(r.stop, r)), r;
        return K.map(l, O, c), K.isFunction(c.opts.start) && c.opts.start.call(e, c), K.fx.timer(K.extend(u, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function H(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function F(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, o = 0,
                i = t.toLowerCase().match(de) || [];
            if (K.isFunction(n))
                for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function I(e, t, n, r) {
        function o(s) {
            var u;
            return i[s] = !0, K.each(e[s] || [], function(e, s) {
                return "string" != typeof(s = s(t, n, r)) || a || i[s] ? a ? !(u = s) : void 0 : (t.dataTypes.unshift(s), o(s), !1)
            }), u
        }
        var i = {},
            a = e === Tt;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function P(e, t) {
        var n, r, o = K.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : r = r || {})[n] = t[n]);
        return r && K.extend(!0, e, r), e
    }

    function R(e) {
        return K.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    function M(e, t) {
        return t.toUpperCase()
    }
    var B = [],
        W = e.document,
        z = B.slice,
        U = B.concat,
        X = B.push,
        V = B.indexOf,
        Y = {},
        G = Y.toString,
        Q = Y.hasOwnProperty,
        J = {},
        K = function(e, t) {
            return new K.fn.init(e, t)
        },
        Z = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ee = /^-ms-/,
        te = /-([\da-z])/gi;
    K.fn = K.prototype = {
        jquery: "3.5.1",
        constructor: K,
        selector: "",
        length: 0,
        toArray: function() {
            return z.call(this)
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : z.call(this)
        },
        pushStack: function(e) {
            return (e = K.merge(this.constructor(), e)).prevObject = this, e.context = this.context, e
        },
        each: function(e) {
            return K.each(this, e)
        },
        map: function(e) {
            return this.pushStack(K.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(z.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length;
            e = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= e && e < t ? [this[e]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: X,
        sort: B.sort,
        splice: B.splice
    }, K.extend = K.fn.extend = function() {
        var e, t, n, r, o, i = arguments[0] || {},
            a = 1,
            s = arguments.length,
            u = !1;
        for ("boolean" == typeof i && (u = i, i = arguments[a] || {}, a++), "object" == typeof i || K.isFunction(i) || (i = {}), a === s && (i = this, a--); a < s; a++)
            if (null != (e = arguments[a]))
                for (t in e) o = i[t], i !== (n = e[t]) && (u && n && (K.isPlainObject(n) || (r = K.isArray(n))) ? (o = r ? (r = !1, o && K.isArray(o) ? o : []) : o && K.isPlainObject(o) ? o : {}, i[t] = K.extend(u, o, n)) : void 0 !== n && (i[t] = n));
        return i
    }, K.extend({
        expando: "jQuery" + ("2.2.3" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === K.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !K.isArray(e) && 0 <= t - parseFloat(t) + 1
        },
        isPlainObject: function(e) {
            if ("object" !== K.type(e) || e.nodeType || K.isWindow(e)) return !1;
            if (e.constructor && !Q.call(e, "constructor") && !Q.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
            for (var t in e);
            return void 0 === t || Q.call(e, t)
        },
        isEmptyObject: function(e) {
            for (var t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[G.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            var t, n = eval;
            (e = K.trim(e)) && (1 === e.indexOf("use strict") ? ((t = W.createElement("script")).text = e, W.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(ee, "ms-").replace(te, M)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var r, o = 0;
            if (n(e))
                for (r = e.length; o < r && !1 !== t.call(e[o], o, e[o]); o++);
            else
                for (o in e)
                    if (!1 === t.call(e[o], o, e[o])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(Z, "")
        },
        makeArray: function(e, t) {
            return t = t || [], null != e && (n(Object(e)) ? K.merge(t, "string" == typeof e ? [e] : e) : X.call(t, e)), t
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : V.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var r = [], o = 0, i = e.length, a = !n; o < i; o++) !t(e[o], o) != a && r.push(e[o]);
            return r
        },
        map: function(e, t, r) {
            var o, i, a = 0,
                s = [];
            if (n(e))
                for (o = e.length; a < o; a++) null != (i = t(e[a], a, r)) && s.push(i);
            else
                for (a in e) null != (i = t(e[a], a, r)) && s.push(i);
            return U.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r;
            return "string" == typeof t && (r = e[t], t = e, e = r), K.isFunction(e) ? (n = z.call(arguments, 2), (r = function() {
                return e.apply(t || this, n.concat(z.call(arguments)))
            }).guid = e.guid = e.guid || K.guid++, r) : void 0
        },
        now: Date.now,
        support: J
    }), "function" == typeof Symbol && (K.fn[Symbol.iterator] = B[Symbol.iterator]), K.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        Y["[object " + t + "]"] = t.toLowerCase()
    });
    var ne = function(e) {
        function t(e, t, n, r) {
            var o, i, a, s, c, f, p, d, h = t && t.ownerDocument,
                m = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m) return n;
            if (!r && ((t ? t.ownerDocument || t : F) !== E && S(t), t = t || E, D)) {
                if (11 !== m && (f = pe.exec(e)))
                    if (o = f[1]) {
                        if (9 === m) {
                            if (!(a = t.getElementById(o))) return n;
                            if (a.id === o) return n.push(a), n
                        } else if (h && (a = h.getElementById(o)) && L(t, a) && a.id === o) return n.push(a), n
                    } else {
                        if (f[2]) return Y.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = f[3]) && y.getElementsByClassName && t.getElementsByClassName) return Y.apply(n, t.getElementsByClassName(o)), n
                    } if (y.qsa && !B[e + " "] && (!A || !A.test(e))) {
                    if (1 !== m) h = t, d = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(he, "\\$&") : t.setAttribute("id", s = H), i = (p = C(e)).length, c = se.test(s) ? "#" + s : "[id='" + s + "']"; i--;) p[i] = c + " " + l(p[i]);
                        d = p.join(","), h = de.test(e) && u(t.parentNode) || t
                    }
                    if (d) try {
                        return Y.apply(n, h.querySelectorAll(d)), n
                    } catch (e) {} finally {
                        s === H && t.removeAttribute("id")
                    }
                }
            }
            return k(e.replace(ne, "$1"), t, n, r)
        }

        function n() {
            var e = [];
            return function t(n, r) {
                return e.push(n + " ") > b.cacheLength && delete t[e.shift()], t[n + " "] = r
            }
        }

        function r(e) {
            return e[H] = !0, e
        }

        function o(e) {
            var t = E.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function i(e, t) {
            for (var n = e.split("|"), r = n.length; r--;) b.attrHandle[n[r]] = t
        }

        function a(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || 1 << 31) - (~e.sourceIndex || 1 << 31);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var o, i = e([], n.length, t), a = i.length; a--;) n[o = i[a]] && (n[o] = !(r[o] = n[o]))
                })
            })
        }

        function u(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }

        function c() {}

        function l(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function f(e, t, n) {
            var r = t.dir,
                o = n && "parentNode" === r,
                i = P++;
            return t.first ? function(t, n, i) {
                for (; t = t[r];)
                    if (1 === t.nodeType || o) return e(t, n, i)
            } : function(t, n, a) {
                var s, u, c = [I, i];
                if (a) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || o) && e(t, n, a)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || o) {
                            if ((u = (s = (u = t[H] || (t[H] = {}))[t.uniqueID] || (u[t.uniqueID] = {}))[r]) && u[0] === I && u[1] === i) return c[2] = u[2];
                            if ((s[r] = c)[2] = e(t, n, a)) return !0
                        }
            }
        }

        function p(e) {
            return 1 < e.length ? function(t, n, r) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function d(e, t, n, r, o) {
            for (var i, a = [], s = 0, u = e.length, c = null != t; s < u; s++)(i = e[s]) && (n && !n(i, r, o) || (a.push(i), c && t.push(s)));
            return a
        }

        function h(e, t, n) {
            var r = "0x" + t - 65536;
            return r != r || n ? t : r < 0 ? String.fromCharCode(65536 + r) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }

        function m() {
            S()
        }

        function v(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t) return n;
            return -1
        }
        var g, y, b, w, x, C, T, k, $, N, _, S, E, j, D, A, q, O, L, H = "sizzle" + +new Date,
            F = e.document,
            I = 0,
            P = 0,
            R = n(),
            M = n(),
            B = n(),
            W = function(e, t) {
                return e === t && (_ = !0), 0
            },
            z = {}.hasOwnProperty,
            U = [],
            X = U.pop,
            V = U.push,
            Y = U.push,
            G = U.slice,
            Q = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            J = "[\\x20\\t\\r\\n\\f]",
            K = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            Z = "\\[" + J + "*(" + K + ")(?:" + J + "*([*^$|!~]?=)" + J + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + K + "))|)" + J + "*\\]",
            ee = ":(" + K + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + Z + ")*)|.*)\\)|)",
            te = new RegExp(J + "+", "g"),
            ne = new RegExp("^" + J + "+|((?:^|[^\\\\])(?:\\\\.)*)" + J + "+$", "g"),
            re = new RegExp("^" + J + "*," + J + "*"),
            oe = new RegExp("^" + J + "*([>+~]|" + J + ")" + J + "*"),
            ie = new RegExp("=" + J + "*([^\\]'\"]*?)" + J + "*\\]", "g"),
            ae = new RegExp(ee),
            se = new RegExp("^" + K + "$"),
            ue = {
                ID: new RegExp("^#(" + K + ")"),
                CLASS: new RegExp("^\\.(" + K + ")"),
                TAG: new RegExp("^(" + K + "|[*])"),
                ATTR: new RegExp("^" + Z),
                PSEUDO: new RegExp("^" + ee),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + J + "*(even|odd|(([+-]|)(\\d*)n|)" + J + "*(?:([+-]|)" + J + "*(\\d+)|))" + J + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + Q + ")$", "i"),
                needsContext: new RegExp("^" + J + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + J + "*((?:-\\d)?\\d*)" + J + "*\\)|)(?=[^-]|$)", "i")
            },
            ce = /^(?:input|select|textarea|button)$/i,
            le = /^h\d$/i,
            fe = /^[^{]+\{\s*\[native \w/,
            pe = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            de = /[+~]/,
            he = /'|\\/g,
            me = new RegExp("\\\\([\\da-f]{1,6}" + J + "?|(" + J + ")|.)", "ig");
        try {
            Y.apply(U = G.call(F.childNodes), F.childNodes), U[F.childNodes.length].nodeType
        } catch (e) {
            Y = {
                apply: U.length ? function(e, t) {
                    V.apply(e, G.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        for (g in y = t.support = {}, x = t.isXML = function(e) {
                return !!(e = e && (e.ownerDocument || e).documentElement) && "HTML" !== e.nodeName
            }, S = t.setDocument = function(e) {
                return (e = e ? e.ownerDocument || e : F) !== E && 9 === e.nodeType && e.documentElement && (j = (E = e).documentElement, D = !x(E), (e = E.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", m, !1) : e.attachEvent && e.attachEvent("onunload", m)), y.attributes = o(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), y.getElementsByTagName = o(function(e) {
                    return e.appendChild(E.createComment("")), !e.getElementsByTagName("*").length
                }), y.getElementsByClassName = fe.test(E.getElementsByClassName), y.getById = o(function(e) {
                    return j.appendChild(e).id = H, !E.getElementsByName || !E.getElementsByName(H).length
                }), y.getById ? (b.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && D) return (e = t.getElementById(e)) ? [e] : []
                }, b.filter.ID = function(e) {
                    var t = e.replace(me, h);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete b.find.ID, b.filter.ID = function(e) {
                    var t = e.replace(me, h);
                    return function(e) {
                        return (e = void 0 !== e.getAttributeNode && e.getAttributeNode("id")) && e.value === t
                    }
                }), b.find.TAG = y.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : y.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, r = [],
                        o = 0,
                        i = t.getElementsByTagName(e);
                    if ("*" !== e) return i;
                    for (; n = i[o++];) 1 === n.nodeType && r.push(n);
                    return r
                }, b.find.CLASS = y.getElementsByClassName && function(e, t) {
                    return void 0 !== t.getElementsByClassName && D ? t.getElementsByClassName(e) : void 0
                }, q = [], A = [], (y.qsa = fe.test(E.querySelectorAll)) && (o(function(e) {
                    j.appendChild(e).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && A.push("[*^$]=" + J + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || A.push("\\[" + J + "*(?:value|" + Q + ")"), e.querySelectorAll("[id~=" + H + "-]").length || A.push("~="), e.querySelectorAll(":checked").length || A.push(":checked"), e.querySelectorAll("a#" + H + "+*").length || A.push(".#.+[+~]")
                }), o(function(e) {
                    var t = E.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && A.push("name" + J + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), A.push(",.*:")
                })), (y.matchesSelector = fe.test(O = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && o(function(e) {
                    y.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), q.push("!=", ee)
                }), A = A.length && new RegExp(A.join("|")), q = q.length && new RegExp(q.join("|")), e = fe.test(j.compareDocumentPosition), L = e || fe.test(j.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e;
                    return e === (t = t && t.parentNode) || !(!t || 1 !== t.nodeType || !(n.contains ? n.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, W = e ? function(e, t) {
                    if (e === t) return _ = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !y.sortDetached && t.compareDocumentPosition(e) === n ? e === E || e.ownerDocument === F && L(F, e) ? -1 : t === E || t.ownerDocument === F && L(F, t) ? 1 : N ? v(N, e) - v(N, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return _ = !0, 0;
                    var n, r = 0,
                        o = e.parentNode,
                        i = t.parentNode,
                        s = [e],
                        u = [t];
                    if (!o || !i) return e === E ? -1 : t === E ? 1 : o ? -1 : i ? 1 : N ? v(N, e) - v(N, t) : 0;
                    if (o === i) return a(e, t);
                    for (n = e; n = n.parentNode;) s.unshift(n);
                    for (n = t; n = n.parentNode;) u.unshift(n);
                    for (; s[r] === u[r];) r++;
                    return r ? a(s[r], u[r]) : s[r] === F ? -1 : u[r] === F ? 1 : 0
                }), E
            }, t.matches = function(e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== E && S(e), n = n.replace(ie, "='$1']"), y.matchesSelector && D && !B[n + " "] && (!q || !q.test(n)) && (!A || !A.test(n))) try {
                    var r = O.call(e, n);
                    if (r || y.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                } catch (e) {}
                return 0 < t(n, E, null, [e]).length
            }, t.contains = function(e, t) {
                return (e.ownerDocument || e) !== E && S(e), L(e, t)
            }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== E && S(e);
                var n = b.attrHandle[t.toLowerCase()];
                return void 0 !== (n = n && z.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !D) : void 0) ? n : y.attributes || !D ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
            }, t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function(e) {
                var t, n = [],
                    r = 0,
                    o = 0;
                if (_ = !y.detectDuplicates, N = !y.sortStable && e.slice(0), e.sort(W), _) {
                    for (; t = e[o++];) t === e[o] && (r = n.push(o));
                    for (; r--;) e.splice(n[r], 1)
                }
                return N = null, e
            }, w = t.getText = function(e) {
                var t, n = "",
                    r = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += w(e)
                    } else if (3 === o || 4 === o) return e.nodeValue
                } else
                    for (; t = e[r++];) n += w(t);
                return n
            }, (b = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: ue,
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
                        return e[1] = e[1].replace(me, h), e[3] = (e[3] || e[4] || e[5] || "").replace(me, h), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return ue.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ae.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(me, h).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = R[e + " "];
                        return t || (t = new RegExp("(^|" + J + ")" + e + "(" + J + "|$)")) && R(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, r) {
                        return function(o) {
                            return null == (o = t.attr(o, e)) ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && -1 < o.indexOf(r) : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? -1 < (" " + o.replace(te, " ") + " ").indexOf(r) : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                        }
                    },
                    CHILD: function(e, t, n, r, o) {
                        var i = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === r && 0 === o ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var c, l, f, p, d, h, m = i != a ? "nextSibling" : "previousSibling",
                                v = t.parentNode,
                                g = s && t.nodeName.toLowerCase(),
                                y = !u && !s,
                                b = !1;
                            if (v) {
                                if (i) {
                                    for (; m;) {
                                        for (p = t; p = p[m];)
                                            if (s ? p.nodeName.toLowerCase() === g : 1 === p.nodeType) return !1;
                                        h = m = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [a ? v.firstChild : v.lastChild], a && y) {
                                    for (b = (d = (c = (l = (f = (p = v)[H] || (p[H] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === I && c[1]) && c[2], p = d && v.childNodes[d]; p = ++d && p && p[m] || (b = d = 0) || h.pop();)
                                        if (1 === p.nodeType && ++b && p === t) {
                                            l[e] = [I, d, b];
                                            break
                                        }
                                } else if (y && (b = d = (c = (l = (f = (p = t)[H] || (p[H] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === I && c[1]), !1 === b)
                                    for (;
                                        (p = ++d && p && p[m] || (b = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== g : 1 !== p.nodeType) || !++b || (y && ((l = (f = p[H] || (p[H] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [I, b]), p !== t)););
                                return (b -= o) === r || b % r == 0 && 0 <= b / r
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var o, i = b.pseudos[e] || b.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return i[H] ? i(n) : 1 < i.length ? (o = [e, e, "", n], b.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                            for (var r, o = i(e, n), a = o.length; a--;) e[r = v(e, o[a])] = !(t[r] = o[a])
                        }) : function(e) {
                            return i(e, 0, o)
                        }) : i
                    }
                },
                pseudos: {
                    not: r(function(e) {
                        var t = [],
                            n = [],
                            o = T(e.replace(ne, "$1"));
                        return o[H] ? r(function(e, t, n, r) {
                            for (var i, a = o(e, null, r, []), s = e.length; s--;)(i = a[s]) && (e[s] = !(t[s] = i))
                        }) : function(e, r, i) {
                            return t[0] = e, o(t, null, i, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: r(function(e) {
                        return function(n) {
                            return 0 < t(e, n).length
                        }
                    }),
                    contains: r(function(e) {
                        return e = e.replace(me, h),
                            function(t) {
                                return -1 < (t.textContent || t.innerText || w(t)).indexOf(e)
                            }
                    }),
                    lang: r(function(e) {
                        return se.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(me, h).toLowerCase(),
                            function(t) {
                                var n;
                                do {
                                    if (n = D ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
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
                        return !b.pseudos.empty(e)
                    },
                    header: function(e) {
                        return le.test(e.nodeName)
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
                    first: s(function() {
                        return [0]
                    }),
                    last: s(function(e, t) {
                        return [t - 1]
                    }),
                    eq: s(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: s(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: s(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: s(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; 0 <= --r;) e.push(r);
                        return e
                    }),
                    gt: s(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = b.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) b.pseudos[g] = function(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }(g);
        for (g in {
                submit: !0,
                reset: !0
            }) b.pseudos[g] = function(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }(g);
        return c.prototype = b.filters = b.pseudos, b.setFilters = new c, C = t.tokenize = function(e, n) {
            var r, o, i, a, s, u, c, l = M[e + " "];
            if (l) return n ? 0 : l.slice(0);
            for (s = e, u = [], c = b.preFilter; s;) {
                for (a in r && !(o = re.exec(s)) || (o && (s = s.slice(o[0].length) || s), u.push(i = [])), r = !1, (o = oe.exec(s)) && (r = o.shift(), i.push({
                        value: r,
                        type: o[0].replace(ne, " ")
                    }), s = s.slice(r.length)), b.filter) !(o = ue[a].exec(s)) || c[a] && !(o = c[a](o)) || (r = o.shift(), i.push({
                    value: r,
                    type: a,
                    matches: o
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : M(e, u).slice(0)
        }, T = t.compile = function(e, n) {
            var o, i, a, s, u, c = [],
                h = [],
                m = B[e + " "];
            if (!m) {
                for (o = (n = n || C(e)).length; o--;)((m = function e(n) {
                    for (var o, i, a, s = n.length, u = b.relative[n[0].type], c = u || b.relative[" "], h = u ? 1 : 0, m = f(function(e) {
                            return e === o
                        }, c, !0), g = f(function(e) {
                            return -1 < v(o, e)
                        }, c, !0), y = [function(e, t, n) {
                            return n = !u && (n || t !== $) || ((o = t).nodeType ? m : g)(e, t, n), o = null, n
                        }]; h < s; h++)
                        if (i = b.relative[n[h].type]) y = [f(p(y), i)];
                        else {
                            if ((i = b.filter[n[h].type].apply(null, n[h].matches))[H]) {
                                for (a = ++h; a < s && !b.relative[n[a].type]; a++);
                                return function e(n, o, i, a, s, u) {
                                    return a && !a[H] && (a = e(a)), s && !s[H] && (s = e(s, u)), r(function(e, r, u, c) {
                                        var l, f, p, h = [],
                                            m = [],
                                            g = r.length,
                                            y = e || function(e, n, r) {
                                                for (var o = 0, i = n.length; o < i; o++) t(e, n[o], r);
                                                return r
                                            }(o || "*", u.nodeType ? [u] : u, []),
                                            b = !n || !e && o ? y : d(y, h, n, u, c),
                                            w = i ? s || (e ? n : g || a) ? [] : r : b;
                                        if (i && i(b, w, u, c), a)
                                            for (l = d(w, m), a(l, [], u, c), f = l.length; f--;)(p = l[f]) && (w[m[f]] = !(b[m[f]] = p));
                                        if (e) {
                                            if (s || n) {
                                                if (s) {
                                                    for (l = [], f = w.length; f--;)(p = w[f]) && l.push(b[f] = p);
                                                    s(null, w = [], l, c)
                                                }
                                                for (f = w.length; f--;)(p = w[f]) && -1 < (l = s ? v(e, p) : h[f]) && (e[l] = !(r[l] = p))
                                            }
                                        } else w = d(w === r ? w.splice(g, w.length) : w), s ? s(null, r, w, c) : Y.apply(r, w)
                                    })
                                }(1 < h && p(y), 1 < h && l(n.slice(0, h - 1).concat({
                                    value: " " === n[h - 2].type ? "*" : ""
                                })).replace(ne, "$1"), i, h < a && e(n.slice(h, a)), a < s && e(n = n.slice(a)), a < s && l(n))
                            }
                            y.push(i)
                        } return p(y)
                }(n[o]))[H] ? c : h).push(m);
                (m = B(e, (s = 0 < (a = c).length, u = 0 < (i = h).length, s ? r(g) : g))).selector = e
            }

            function g(e, n, r, o, c) {
                var l, f, p, h = 0,
                    m = "0",
                    v = e && [],
                    g = [],
                    y = $,
                    w = e || u && b.find.TAG("*", c),
                    x = I += null == y ? 1 : Math.random() || .1,
                    C = w.length;
                for (c && ($ = n === E || n || c); m !== C && null != (l = w[m]); m++) {
                    if (u && l) {
                        for (f = 0, n || l.ownerDocument === E || (S(l), r = !D); p = i[f++];)
                            if (p(l, n || E, r)) {
                                o.push(l);
                                break
                            } c && (I = x)
                    }
                    s && ((l = !p && l) && h--, e && v.push(l))
                }
                if (h += m, s && m !== h) {
                    for (f = 0; p = a[f++];) p(v, g, n, r);
                    if (e) {
                        if (0 < h)
                            for (; m--;) v[m] || g[m] || (g[m] = X.call(o));
                        g = d(g)
                    }
                    Y.apply(o, g), c && !e && 0 < g.length && 1 < h + a.length && t.uniqueSort(o)
                }
                return c && (I = x, $ = y), v
            }
            return m
        }, k = t.select = function(e, t, n, r) {
            var o, i, a, s, c, f = "function" == typeof e && e,
                p = !r && C(e = f.selector || e);
            if (n = n || [], 1 === p.length) {
                if (2 < (i = p[0] = p[0].slice(0)).length && "ID" === (a = i[0]).type && y.getById && 9 === t.nodeType && D && b.relative[i[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(me, h), t) || [])[0])) return n;
                    f && (t = t.parentNode), e = e.slice(i.shift().value.length)
                }
                for (o = ue.needsContext.test(e) ? 0 : i.length; o-- && (a = i[o], !b.relative[s = a.type]);)
                    if ((c = b.find[s]) && (r = c(a.matches[0].replace(me, h), de.test(i[0].type) && u(t.parentNode) || t))) {
                        if (i.splice(o, 1), !(e = r.length && l(i))) return Y.apply(n, r), n;
                        break
                    }
            }
            return (f || T(e, p))(r, t, !D, n, !t || de.test(e) && u(t.parentNode) || t), n
        }, y.sortStable = H.split("").sort(W).join("") === H, y.detectDuplicates = !!_, S(), y.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(E.createElement("div"))
        }), o(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || i("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), y.attributes && o(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || i("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), o(function(e) {
            return null == e.getAttribute("disabled")
        }) || i(Q, function(e, t, n) {
            return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null
        }), t
    }(e);

    function re(e, t, n) {
        for (var r = [], o = void 0 !== n;
            (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (o && K(e).is(n)) break;
                r.push(e)
            } return r
    }

    function oe(e, t) {
        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n
    }
    K.find = ne, K.expr = ne.selectors, K.expr[":"] = K.expr.pseudos, K.uniqueSort = K.unique = ne.uniqueSort, K.text = ne.getText, K.isXMLDoc = ne.isXML, K.contains = ne.contains;
    var ie = K.expr.match.needsContext,
        ae = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        se = /^.[^:#\[\.,]*$/;
    K.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? K.find.matchesSelector(r, e) ? [r] : [] : K.find.matches(e, K.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, K.fn.extend({
        find: function(e) {
            var t, n = this.length,
                r = [],
                o = this;
            if ("string" != typeof e) return this.pushStack(K(e).filter(function() {
                for (t = 0; t < n; t++)
                    if (K.contains(o[t], this)) return !0
            }));
            for (t = 0; t < n; t++) K.find(e, o[t], r);
            return (r = this.pushStack(1 < n ? K.unique(r) : r)).selector = this.selector ? this.selector + " " + e : e, r
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && ie.test(e) ? K(e) : e || [], !1).length
        }
    });
    var ue, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (K.fn.init = function(e, t, n) {
        if (!e) return this;
        if (n = n || ue, "string" != typeof e) return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : K.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(K) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), K.makeArray(e, this));
        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : ce.exec(e)) || !r[1] && t) return (!t || t.jquery ? t || n : this.constructor(t)).find(e);
        if (r[1]) {
            if (t = t instanceof K ? t[0] : t, K.merge(this, K.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : W, !0)), ae.test(r[1]) && K.isPlainObject(t))
                for (var r in t) K.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this
        }
        return (n = W.getElementById(r[2])) && n.parentNode && (this.length = 1, this[0] = n), this.context = W, this.selector = e, this
    }).prototype = K.fn, ue = K(W);
    var le = /^(?:parents|prev(?:Until|All))/,
        fe = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    K.fn.extend({
        has: function(e) {
            var t = K(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (K.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, o = this.length, i = [], a = ie.test(e) || "string" != typeof e ? K(e, t || this.context) : 0; r < o; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && K.find.matchesSelector(n, e))) {
                        i.push(n);
                        break
                    } return this.pushStack(1 < i.length ? K.uniqueSort(i) : i)
        },
        index: function(e) {
            return e ? "string" == typeof e ? V.call(K(e), this[0]) : V.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(K.uniqueSort(K.merge(this.get(), K(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), K.each({
        parent: function(e) {
            return (e = e.parentNode) && 11 !== e.nodeType ? e : null
        },
        parents: function(e) {
            return re(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return re(e, "parentNode", n)
        },
        next: function(e) {
            return o(e, "nextSibling")
        },
        prev: function(e) {
            return o(e, "previousSibling")
        },
        nextAll: function(e) {
            return re(e, "nextSibling")
        },
        prevAll: function(e) {
            return re(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return re(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return re(e, "previousSibling", n)
        },
        siblings: function(e) {
            return oe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return oe(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || K.merge([], e.childNodes)
        }
    }, function(e, t) {
        K.fn[e] = function(n, r) {
            var o = K.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = K.filter(r, o)), 1 < this.length && (fe[e] || K.uniqueSort(o), le.test(e) && o.reverse()), this.pushStack(o)
        }
    });
    var pe, de = /\S+/g;

    function he(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }
    K.Callbacks = function(e) {
        var t;

        function n() {
            for (a = e.once, i = r = !0; u.length; c = -1)
                for (o = u.shift(); ++c < s.length;) !1 === s[c].apply(o[0], o[1]) && e.stopOnFalse && (c = s.length, o = !1);
            e.memory || (o = !1), r = !1, a && (s = o ? [] : "")
        }
        e = "string" == typeof e ? (t = {}, K.each(e.match(de) || [], function(e, n) {
            t[n] = !0
        }), t) : K.extend({}, e);
        var r, o, i, a, s = [],
            u = [],
            c = -1,
            l = {
                add: function() {
                    return s && (o && !r && (c = s.length - 1, u.push(o)), function t(n) {
                        K.each(n, function(n, r) {
                            K.isFunction(r) ? e.unique && l.has(r) || s.push(r) : r && r.length && "string" !== K.type(r) && t(r)
                        })
                    }(arguments), o && !r && n()), this
                },
                remove: function() {
                    return K.each(arguments, function(e, t) {
                        for (var n; - 1 < (n = K.inArray(t, s, n));) s.splice(n, 1), n <= c && c--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < K.inArray(e, s) : 0 < s.length
                },
                empty: function() {
                    return s = s && [], this
                },
                disable: function() {
                    return a = u = [], s = o = "", this
                },
                disabled: function() {
                    return !s
                },
                lock: function() {
                    return a = u = [], o || (s = o = ""), this
                },
                locked: function() {
                    return !!a
                },
                fireWith: function(e, t) {
                    return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), r || n()), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return l
    }, K.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", K.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", K.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", K.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return K.Deferred(function(n) {
                            K.each(t, function(t, i) {
                                var a = K.isFunction(e[t]) && e[t];
                                o[i[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && K.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[i[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? K.extend(e, r) : r
                    }
                },
                o = {};
            return r.pipe = r.then, K.each(t, function(e, i) {
                var a = i[2],
                    s = i[3];
                r[i[1]] = a.add, s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), o[i[0]] = function() {
                    return o[i[0] + "With"](this === o ? r : this, arguments), this
                }, o[i[0] + "With"] = a.fireWith
            }), r.promise(o), e && e.call(o, o), o
        },
        when: function(e) {
            function t(e, t, r) {
                return function(o) {
                    t[e] = this, r[e] = 1 < arguments.length ? z.call(arguments) : o, r === n ? c.notifyWith(t, r) : --u || c.resolveWith(t, r)
                }
            }
            var n, r, o, i = 0,
                a = z.call(arguments),
                s = a.length,
                u = 1 !== s || e && K.isFunction(e.promise) ? s : 0,
                c = 1 === u ? e : K.Deferred();
            if (1 < s)
                for (n = new Array(s), r = new Array(s), o = new Array(s); i < s; i++) a[i] && K.isFunction(a[i].promise) ? a[i].promise().progress(t(i, r, n)).done(t(i, o, a)).fail(c.reject) : --u;
            return u || c.resolveWith(o, a), c.promise()
        }
    }), K.fn.ready = function(e) {
        return K.ready.promise().done(e), this
    }, K.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? K.readyWait++ : K.ready(!0)
        },
        ready: function(e) {
            (!0 === e ? --K.readyWait : K.isReady) || (K.isReady = !0) !== e && 0 < --K.readyWait || (pe.resolveWith(W, [K]), K.fn.triggerHandler && (K(W).triggerHandler("ready"), K(W).off("ready")))
        }
    }), K.ready.promise = function(t) {
        return pe || (pe = K.Deferred(), "complete" === W.readyState || "loading" !== W.readyState && !W.documentElement.doScroll ? e.setTimeout(K.ready) : (W.addEventListener("DOMContentLoaded", i), e.addEventListener("load", i))), pe.promise(t)
    }, K.ready.promise();
    var me = function(e, t, n, r, o, i, a) {
        var s = 0,
            u = e.length,
            c = null == n;
        if ("object" === K.type(n))
            for (s in o = !0, n) me(e, t, s, n[s], !0, i, a);
        else if (void 0 !== r && (o = !0, K.isFunction(r) || (a = !0), c && (t = a ? (t.call(e, r), null) : (c = t, function(e, t, n) {
                return c.call(K(e), n)
            })), t))
            for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return o ? e : c ? t.call(e) : u ? t(e[0], n) : i
    };
    a.uid = 1, a.prototype = {
        register: function(e, t) {
            return t = t || {}, e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
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
        set: function(e, t, n) {
            var r, o = this.cache(e);
            if ("string" == typeof t) o[t] = n;
            else
                for (r in t) o[r] = t[r];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        },
        access: function(e, t, n) {
            var r;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? void 0 !== (r = this.get(e, t)) ? r : this.get(e, K.camelCase(t)) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r, o, i = e[this.expando];
            if (void 0 !== i) {
                if (void 0 === t) this.register(e);
                else {
                    n = (r = K.isArray(t) ? t.concat(t.map(K.camelCase)) : (o = K.camelCase(t), t in i ? [t, o] : (r = o) in i ? [r] : r.match(de) || [])).length;
                    for (; n--;) delete i[r[n]]
                }
                void 0 !== t && !K.isEmptyObject(i) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            return void 0 !== (e = e[this.expando]) && !K.isEmptyObject(e)
        }
    };
    var ve = new a,
        ge = new a,
        ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        be = /[A-Z]/g;

    function we(e, t) {
        return e = t || e, "none" === K.css(e, "display") || !K.contains(e.ownerDocument, e)
    }
    K.extend({
        hasData: function(e) {
            return ge.hasData(e) || ve.hasData(e)
        },
        data: function(e, t, n) {
            return ge.access(e, t, n)
        },
        removeData: function(e, t) {
            ge.remove(e, t)
        },
        _data: function(e, t, n) {
            return ve.access(e, t, n)
        },
        _removeData: function(e, t) {
            ve.remove(e, t)
        }
    }), K.fn.extend({
        data: function(e, t) {
            var n, r, o, i = this[0],
                a = i && i.attributes;
            if (void 0 !== e) return "object" == typeof e ? this.each(function() {
                ge.set(this, e)
            }) : me(this, function(t) {
                var n, r;
                return i && void 0 === t ? void 0 !== (n = ge.get(i, e) || ge.get(i, e.replace(be, "-$&").toLowerCase())) ? n : (r = K.camelCase(e), void 0 !== (n = ge.get(i, r)) || void 0 !== (n = s(i, r, void 0)) ? n : void 0) : (r = K.camelCase(e), void this.each(function() {
                    var n = ge.get(this, r);
                    ge.set(this, r, t), -1 < e.indexOf("-") && void 0 !== n && ge.set(this, e, t)
                }))
            }, null, t, 1 < arguments.length, null, !0);
            if (this.length && (o = ge.get(i), 1 === i.nodeType && !ve.get(i, "hasDataAttrs"))) {
                for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = K.camelCase(r.slice(5)), s(i, r, o[r]));
                ve.set(i, "hasDataAttrs", !0)
            }
            return o
        },
        removeData: function(e) {
            return this.each(function() {
                ge.remove(this, e)
            })
        }
    }), K.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = ve.get(e, t), n && (!r || K.isArray(n) ? r = ve.access(e, t, K.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = K.queue(e, t),
                r = n.length,
                o = n.shift(),
                i = K._queueHooks(e, t);
            "inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, function() {
                K.dequeue(e, t)
            }, i)), !r && i && i.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ve.get(e, n) || ve.access(e, n, {
                empty: K.Callbacks("once memory").add(function() {
                    ve.remove(e, [t + "queue", n])
                })
            })
        }
    }), K.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? K.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = K.queue(this, e, t);
                K._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && K.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                K.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            function n() {
                --o || i.resolveWith(a, [a])
            }
            var r, o = 1,
                i = K.Deferred(),
                a = this,
                s = this.length;
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(r = ve.get(a[s], e + "queueHooks")) && r.empty && (o++, r.empty.add(n));
            return n(), i.promise(t)
        }
    });
    var xe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ce = new RegExp("^(?:([+-])=|)(" + xe + ")([a-z%]*)$", "i"),
        Te = ["Top", "Right", "Bottom", "Left"],
        ke = /^(?:checkbox|radio)$/i,
        $e = /<([\w:-]+)/,
        Ne = /^$|\/(?:java|ecma)script/i,
        _e = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    _e.optgroup = _e.option, _e.tbody = _e.tfoot = _e.colgroup = _e.caption = _e.thead, _e.th = _e.td;
    var Se = /<|&#?\w+;/;
    B = W.createDocumentFragment().appendChild(W.createElement("div"));
    (ne = W.createElement("input")).setAttribute("type", "radio"), ne.setAttribute("checked", "checked"), ne.setAttribute("name", "t"), B.appendChild(ne), J.checkClone = B.cloneNode(!0).cloneNode(!0).lastChild.checked, B.innerHTML = "<textarea>x</textarea>", J.noCloneChecked = !!B.cloneNode(!0).lastChild.defaultValue;
    var Ee = /^key/,
        je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        De = /^([^.]*)(?:\.(.+)|)/;
    K.event = {
        global: {},
        add: function(e, t, n, r, o) {
            var i, a, s, u, c, l, f, p, d, h = ve.get(e);
            if (h)
                for (n.handler && (n = (i = n).handler, o = i.selector), n.guid || (n.guid = K.guid++), (s = h.events) || (s = h.events = {}), (a = h.handle) || (a = h.handle = function(t) {
                        return void 0 !== K && K.event.triggered !== t.type ? K.event.dispatch.apply(e, arguments) : void 0
                    }), u = (t = (t || "").match(de) || [""]).length; u--;) f = d = (c = De.exec(t[u]) || [])[1], p = (c[2] || "").split(".").sort(), f && (l = K.event.special[f] || {}, f = (o ? l.delegateType : l.bindType) || f, l = K.event.special[f] || {}, c = K.extend({
                    type: f,
                    origType: d,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && K.expr.match.needsContext.test(o),
                    namespace: p.join(".")
                }, i), (d = s[f]) || ((d = s[f] = []).delegateCount = 0, l.setup && !1 !== l.setup.call(e, r, p, a) || e.addEventListener && e.addEventListener(f, a)), l.add && (l.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), o ? d.splice(d.delegateCount++, 0, c) : d.push(c), K.event.global[f] = !0)
        },
        remove: function(e, t, n, r, o) {
            var i, a, s, u, c, l, f, p, d, h, m, v = ve.hasData(e) && ve.get(e);
            if (v && (u = v.events)) {
                for (c = (t = (t || "").match(de) || [""]).length; c--;)
                    if (d = m = (s = De.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
                        for (f = K.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = i = p.length; i--;) l = p[i], !o && m !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (p.splice(i, 1), l.selector && p.delegateCount--, f.remove && f.remove.call(e, l));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || K.removeEvent(e, d, v.handle), delete u[d])
                    } else
                        for (d in u) K.event.remove(e, d + t[c], n, r, !0);
                K.isEmptyObject(u) && ve.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            e = K.event.fix(e);
            var t, n, r, o, i, a = z.call(arguments),
                s = (ve.get(this, "events") || {})[e.type] || [],
                u = K.event.special[e.type] || {};
            if ((a[0] = e).delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                for (i = K.event.handlers.call(this, e, s), t = 0;
                    (r = i[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = r.elem, n = 0;
                        (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o, e.data = o.data, void 0 !== (o = ((K.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, a)) && !1 === (e.result = o) && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, o, i, a = [],
                s = t.delegateCount,
                u = e.target;
            if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; u !== this; u = u.parentNode || this)
                    if (1 === u.nodeType && (!0 !== u.disabled || "click" !== e.type)) {
                        for (r = [], n = 0; n < s; n++) void 0 === r[o = (i = t[n]).selector + " "] && (r[o] = i.needsContext ? -1 < K(o, this).index(u) : K.find(o, this, null, [u]).length), r[o] && r.push(i);
                        r.length && a.push({
                            elem: u,
                            handlers: r
                        })
                    } return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }), a
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
                var n, r, o = t.button;
                return null == e.pageX && null != t.clientX && (n = (r = e.target.ownerDocument || W).documentElement, r = r.body, e.pageX = t.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[K.expando]) return e;
            var t, n, r, o = e.type,
                i = e,
                a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = je.test(o) ? this.mouseHooks : Ee.test(o) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new K.Event(i), t = r.length; t--;) e[n = r[t]] = i[n];
            return e.target || (e.target = W), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, i) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== h() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === h() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && K.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return K.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, K.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, K.Event = function(e, t) {
        return this instanceof K.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? p : d) : this.type = e, t && K.extend(this, t), this.timeStamp = e && e.timeStamp || K.now(), void(this[K.expando] = !0)) : new K.Event(e, t)
    }, K.Event.prototype = {
        constructor: K.Event,
        isDefaultPrevented: d,
        isPropagationStopped: d,
        isImmediatePropagationStopped: d,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = p, e && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = p, e && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, K.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        K.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = e.relatedTarget,
                    o = e.handleObj;
                return r && (r === this || K.contains(this, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), K.fn.extend({
        on: function(e, t, n, r) {
            return m(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return m(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, o;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, K(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = d), this.each(function() {
                K.event.remove(this, e, n, t)
            });
            for (o in e) this.off(o, t, e[o]);
            return this
        }
    });
    var Ae = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        qe = /<script|<style|<link/i,
        Oe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Le = /^true\/(.*)/,
        He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Fe(e, t, n, r) {
        var o, i = {};
        for (o in t) i[o] = e.style[o], e.style[o] = t[o];
        for (o in r = n.apply(e, r || []), t) e.style[o] = i[o];
        return r
    }
    K.extend({
        htmlPrefilter: function(e) {
            return e.replace(Ae, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, o, i, a, s, u, f, p = e.cloneNode(!0),
                d = K.contains(e.ownerDocument, e);
            if (!(J.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || K.isXMLDoc(e)))
                for (a = c(p), r = 0, o = (i = c(e)).length; r < o; r++) s = i[r], "input" === (f = (u = a[r]).nodeName.toLowerCase()) && ke.test(s.type) ? u.checked = s.checked : "input" !== f && "textarea" !== f || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (i = i || c(e), a = a || c(p), r = 0, o = i.length; r < o; r++) b(i[r], a[r]);
                else b(e, p);
            return 0 < (a = c(p, "script")).length && l(a, !d && c(e, "script")), p
        },
        cleanData: function(e) {
            for (var t, n, r, o = K.event.special, i = 0; void 0 !== (n = e[i]); i++)
                if (he(n)) {
                    if (t = n[ve.expando]) {
                        if (t.events)
                            for (r in t.events) o[r] ? K.event.remove(n, r) : K.removeEvent(n, r, t.handle);
                        n[ve.expando] = void 0
                    }
                    n[ge.expando] && (n[ge.expando] = void 0)
                }
        }
    }), K.fn.extend({
        domManip: w,
        detach: function(e) {
            return x(this, e, !0)
        },
        remove: function(e) {
            return x(this, e)
        },
        text: function(e) {
            return me(this, function(e) {
                return void 0 === e ? K.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return w(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || v(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return w(this, arguments, function(e) {
                var t;
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = v(this, e)).insertBefore(e, t.firstChild)
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
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (K.cleanData(c(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return K.clone(this, e, t)
            })
        },
        html: function(e) {
            return me(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !qe.test(e) && !_e[($e.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = K.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (K.cleanData(c(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return w(this, arguments, function(t) {
                var n = this.parentNode;
                K.inArray(this, e) < 0 && (K.cleanData(c(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), K.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        K.fn[e] = function(e) {
            for (var n, r = [], o = K(e), i = o.length - 1, a = 0; a <= i; a++) n = a === i ? this : this.clone(!0), K(o[a])[t](n), X.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Ie, Pe, Re, Me, Be, We, ze, Ue = {
            HTML: "block",
            BODY: "block"
        },
        Xe = /^margin/,
        Ve = new RegExp("^(" + xe + ")(?!px)[a-z%]+$", "i"),
        Ye = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        Ge = W.documentElement;

    function Qe() {
        ze.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", ze.innerHTML = "", Ge.appendChild(We);
        var t = e.getComputedStyle(ze);
        Pe = "1%" !== t.top, Be = "2px" === t.marginLeft, Re = "4px" === t.width, ze.style.marginRight = "50%", Me = "4px" === t.marginRight, Ge.removeChild(We)
    }
    We = W.createElement("div"), (ze = W.createElement("div")).style && (ze.style.backgroundClip = "content-box", ze.cloneNode(!0).style.backgroundClip = "", J.clearCloneStyle = "content-box" === ze.style.backgroundClip, We.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", We.appendChild(ze), K.extend(J, {
        pixelPosition: function() {
            return Qe(), Pe
        },
        boxSizingReliable: function() {
            return null == Re && Qe(), Re
        },
        pixelMarginRight: function() {
            return null == Re && Qe(), Me
        },
        reliableMarginLeft: function() {
            return null == Re && Qe(), Be
        },
        reliableMarginRight: function() {
            var t, n = ze.appendChild(W.createElement("div"));
            return n.style.cssText = ze.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", ze.style.width = "1px", Ge.appendChild(We), t = !parseFloat(e.getComputedStyle(n).marginRight), Ge.removeChild(We), ze.removeChild(n), t
        }
    }));
    var Je = /^(none|table(?!-c[ea]).+)/,
        Ke = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ze = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        et = ["Webkit", "O", "Moz", "ms"],
        tt = W.createElement("div").style;
    K.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) return "" === (e = k(e, "opacity")) ? "1" : e
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
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, i, a, s = K.camelCase(t),
                    c = e.style;
                return t = K.cssProps[s] || (K.cssProps[s] = N(s) || s), a = K.cssHooks[t] || K.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (o = a.get(e, !1, r)) ? o : c[t] : ("string" == (i = typeof n) && (o = Ce.exec(n)) && o[1] && (n = u(e, t, o), i = "number"), void(null != n && n == n && ("number" === i && (n += o && o[3] || (K.cssNumber[s] ? "" : "px")), J.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (c[t] = n))))
            }
        },
        css: function(e, t, n, r) {
            var o, i = K.camelCase(t);
            return t = K.cssProps[i] || (K.cssProps[i] = N(i) || i), (i = K.cssHooks[t] || K.cssHooks[i]) && "get" in i && (o = i.get(e, !0, n)), void 0 === o && (o = k(e, t, r)), "normal" === o && t in Ze && (o = Ze[t]), "" === n || n ? (t = parseFloat(o), !0 === n || isFinite(t) ? t || 0 : o) : o
        }
    }), K.each(["height", "width"], function(e, t) {
        K.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? Je.test(K.css(e, "display")) && 0 === e.offsetWidth ? Fe(e, Ke, function() {
                    return E(e, t, r)
                }) : E(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var o, i = r && Ye(e);
                return (i = r && S(e, t, r, "border-box" === K.css(e, "boxSizing", !1, i), i)) && (o = Ce.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = K.css(e, t)), _(0, n, i)
            }
        }
    }), K.cssHooks.marginLeft = $(J.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(k(e, "marginLeft")) || e.getBoundingClientRect().left - Fe(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px" : void 0
    }), K.cssHooks.marginRight = $(J.reliableMarginRight, function(e, t) {
        return t ? Fe(e, {
            display: "inline-block"
        }, k, [e, "marginRight"]) : void 0
    }), K.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        K.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) o[e + Te[r] + t] = i[r] || i[r - 2] || i[0];
                return o
            }
        }, Xe.test(e) || (K.cssHooks[e + t].set = _)
    }), K.fn.extend({
        css: function(e, t) {
            return me(this, function(e, t, n) {
                var r, o, i = {},
                    a = 0;
                if (K.isArray(t)) {
                    for (r = Ye(e), o = t.length; a < o; a++) i[t[a]] = K.css(e, t[a], !1, r);
                    return i
                }
                return void 0 !== n ? K.style(e, t, n) : K.css(e, t)
            }, e, t, 1 < arguments.length)
        },
        show: function() {
            return j(this, !0)
        },
        hide: function() {
            return j(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                we(this) ? K(this).show() : K(this).hide()
            })
        }
    }), ((K.Tween = D).prototype = {
        constructor: D,
        init: function(e, t, n, r, o, i) {
            this.elem = e, this.prop = n, this.easing = o || K.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (K.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = D.propHooks[this.prop];
            return (e && e.get ? e : D.propHooks._default).get(this)
        },
        run: function(e) {
            var t, n = D.propHooks[this.prop];
            return this.options.duration ? this.pos = t = K.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (n && n.set ? n : D.propHooks._default).set(this), this
        }
    }).init.prototype = D.prototype, (D.propHooks = {
        _default: {
            get: function(e) {
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = K.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(e) {
                K.fx.step[e.prop] ? K.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[K.cssProps[e.prop]] && !K.cssHooks[e.prop] ? e.elem[e.prop] = e.now : K.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = D.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, K.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, K.fx = D.prototype.init, K.fx.step = {};
    var nt, rt, ot = /^(?:toggle|show|hide)$/,
        it = /queueHooks$/;
    K.Animation = K.extend(L, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return u(n.elem, e, Ce.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            for (var n, r = 0, o = (e = K.isFunction(e) ? (t = e, ["*"]) : e.match(de)).length; r < o; r++) n = e[r], L.tweeners[n] = L.tweeners[n] || [], L.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, o, i, a, s, u, c, l = this,
                f = {},
                p = e.style,
                d = e.nodeType && we(e),
                h = ve.get(e, "fxshow");
            for (r in n.queue || (null == (s = K._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || u()
                }), s.unqueued++, l.always(function() {
                    l.always(function() {
                        s.unqueued--, K.queue(e, "fx").length || s.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (c = K.css(e, "display")) ? ve.get(e, "olddisplay") || T(e.nodeName) : c) && "none" === K.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", l.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                })), t)
                if (o = t[r], ot.exec(o)) {
                    if (delete t[r], i = i || "toggle" === o, o === (d ? "hide" : "show")) {
                        if ("show" !== o || !h || void 0 === h[r]) continue;
                        d = !0
                    }
                    f[r] = h && h[r] || K.style(e, r)
                } else c = void 0;
            if (K.isEmptyObject(f)) "inline" === ("none" === c ? T(e.nodeName) : c) && (p.display = c);
            else
                for (r in h ? "hidden" in h && (d = h.hidden) : h = ve.access(e, "fxshow", {}), i && (h.hidden = !d), d ? K(e).show() : l.done(function() {
                        K(e).hide()
                    }), l.done(function() {
                        for (var t in ve.remove(e, "fxshow"), f) K.style(e, t, f[t])
                    }), f) a = O(d ? h[r] : 0, r, l), r in h || (h[r] = a.start, d && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }],
        prefilter: function(e, t) {
            t ? L.prefilters.unshift(e) : L.prefilters.push(e)
        }
    }), K.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? K.extend({}, e) : {
            complete: n || !n && t || K.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !K.isFunction(t) && t
        };
        return r.duration = K.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in K.fx.speeds ? K.fx.speeds[r.duration] : K.fx.speeds._default, null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            K.isFunction(r.old) && r.old.call(this), r.queue && K.dequeue(this, r.queue)
        }, r
    }, K.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(we).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            function o() {
                var t = L(this, K.extend({}, e), a);
                (i || ve.get(this, "finish")) && t.stop(!0)
            }
            var i = K.isEmptyObject(e),
                a = K.speed(t, n, r);
            return o.finish = o, i || !1 === a.queue ? this.each(o) : this.queue(a.queue, o)
        },
        stop: function(e, t, n) {
            function r(e) {
                var t = e.stop;
                delete e.stop, t(n)
            }
            return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    o = null != e && e + "queueHooks",
                    i = K.timers,
                    a = ve.get(this);
                if (o) a[o] && a[o].stop && r(a[o]);
                else
                    for (o in a) a[o] && a[o].stop && it.test(o) && r(a[o]);
                for (o = i.length; o--;) i[o].elem !== this || null != e && i[o].queue !== e || (i[o].anim.stop(n), t = !1, i.splice(o, 1));
                !t && n || K.dequeue(this, e)
            })
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"), this.each(function() {
                var t, n = ve.get(this),
                    r = n[e + "queue"],
                    o = n[e + "queueHooks"],
                    i = K.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, K.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = i.length; t--;) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
                for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), K.each(["toggle", "show", "hide"], function(e, t) {
        var n = K.fn[t];
        K.fn[t] = function(e, r, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, r, o)
        }
    }), K.each({
        slideDown: q("show"),
        slideUp: q("hide"),
        slideToggle: q("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        K.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), K.timers = [], K.fx.tick = function() {
        var e, t = 0,
            n = K.timers;
        for (nt = K.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || K.fx.stop(), nt = void 0
    }, K.fx.timer = function(e) {
        K.timers.push(e), e() ? K.fx.start() : K.timers.pop()
    }, K.fx.interval = 13, K.fx.start = function() {
        rt = rt || e.setInterval(K.fx.tick, K.fx.interval)
    }, K.fx.stop = function() {
        e.clearInterval(rt), rt = null
    }, K.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, K.fn.delay = function(t, n) {
        return t = K.fx && K.fx.speeds[t] || t, n = n || "fx", this.queue(n, function(n, r) {
            var o = e.setTimeout(n, t);
            r.stop = function() {
                e.clearTimeout(o)
            }
        })
    }, ne = W.createElement("input"), xe = (B = W.createElement("select")).appendChild(W.createElement("option")), ne.type = "checkbox", J.checkOn = "" !== ne.value, J.optSelected = xe.selected, B.disabled = !0, J.optDisabled = !xe.disabled, (ne = W.createElement("input")).value = "t", ne.type = "radio", J.radioValue = "t" === ne.value;
    var at, st = K.expr.attrHandle;
    K.fn.extend({
        attr: function(e, t) {
            return me(this, K.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                K.removeAttr(this, e)
            })
        }
    }), K.extend({
        attr: function(e, t, n) {
            var r, o, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return void 0 === e.getAttribute ? K.prop(e, t, n) : (1 === i && K.isXMLDoc(e) || (t = t.toLowerCase(), o = K.attrHooks[t] || (K.expr.match.bool.test(t) ? at : void 0)), void 0 !== n ? null === n ? void K.removeAttr(e, t) : o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (r = o.get(e, t)) || null != (r = K.find.attr(e, t)) ? r : void 0)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!J.radioValue && "radio" === t && K.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r, o = 0,
                i = t && t.match(de);
            if (i && 1 === e.nodeType)
                for (; n = i[o++];) r = K.propFix[n] || n, K.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        }
    }), at = {
        set: function(e, t, n) {
            return !1 === t ? K.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, K.each(K.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = st[t] || K.find.attr;
        st[t] = function(e, t, r) {
            var o, i;
            return r || (i = st[t], st[t] = o, o = null != n(e, t, r) ? t.toLowerCase() : null, st[t] = i), o
        }
    });
    var ut = /^(?:input|select|textarea|button)$/i,
        ct = /^(?:a|area)$/i;
    K.fn.extend({
        prop: function(e, t) {
            return me(this, K.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[K.propFix[e] || e]
            })
        }
    }), K.extend({
        prop: function(e, t, n) {
            var r, o, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return 1 === i && K.isXMLDoc(e) || (t = K.propFix[t] || t, o = K.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = K.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ut.test(e.nodeName) || ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), J.optSelected || (K.propHooks.selected = {
        get: function(e) {
            return (e = e.parentNode) && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(e) {
            (e = e.parentNode) && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), K.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        K.propFix[this.toLowerCase()] = this
    });
    var lt = /[\t\r\n\f]/g;
    K.fn.extend({
        addClass: function(e) {
            var t, n, r, o, i, a, s = 0;
            if (K.isFunction(e)) return this.each(function(t) {
                K(this).addClass(e.call(this, t, H(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(de) || []; n = this[s++];)
                    if (a = H(n), r = 1 === n.nodeType && (" " + a + " ").replace(lt, " ")) {
                        for (i = 0; o = t[i++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        a !== (a = K.trim(r)) && n.setAttribute("class", a)
                    } return this
        },
        removeClass: function(e) {
            var t, n, r, o, i, a, s = 0;
            if (K.isFunction(e)) return this.each(function(t) {
                K(this).removeClass(e.call(this, t, H(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(de) || []; n = this[s++];)
                    if (a = H(n), r = 1 === n.nodeType && (" " + a + " ").replace(lt, " ")) {
                        for (i = 0; o = t[i++];)
                            for (; - 1 < r.indexOf(" " + o + " ");) r = r.replace(" " + o + " ", " ");
                        a !== (a = K.trim(r)) && n.setAttribute("class", a)
                    } return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" == n ? t ? this.addClass(e) : this.removeClass(e) : K.isFunction(e) ? this.each(function(n) {
                K(this).toggleClass(e.call(this, n, H(this), t), t)
            }) : this.each(function() {
                var t, r, o, i;
                if ("string" == n)
                    for (r = 0, o = K(this), i = e.match(de) || []; t = i[r++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else void 0 !== e && "boolean" != n || ((t = H(this)) && ve.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", !t && !1 !== e && ve.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            for (var t, n = 0, r = " " + e + " "; t = this[n++];)
                if (1 === t.nodeType && -1 < (" " + H(t) + " ").replace(lt, " ").indexOf(r)) return !0;
            return !1
        }
    });
    var ft = /\r/g,
        pt = /[\x20\t\r\n\f]+/g;
    K.fn.extend({
        val: function(e) {
            var t, n, r, o = this[0];
            return arguments.length ? (r = K.isFunction(e), this.each(function(n) {
                1 === this.nodeType && (null == (n = r ? e.call(this, n, K(this).val()) : e) ? n = "" : "number" == typeof n ? n += "" : K.isArray(n) && (n = K.map(n, function(e) {
                    return null == e ? "" : e + ""
                })), (t = K.valHooks[this.type] || K.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, n, "value") || (this.value = n))
            })) : o ? (t = K.valHooks[o.type] || K.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(ft, "") : null == n ? "" : n : void 0
        }
    }), K.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = K.find.attr(e, "value");
                    return null != t ? t : K.trim(K.text(e)).replace(pt, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, n = e.options, r = e.selectedIndex, o = "select-one" === e.type || r < 0, i = o ? null : [], a = o ? r + 1 : n.length, s = r < 0 ? a : o ? r : 0; s < a; s++)
                        if (((t = n[s]).selected || s === r) && (J.optDisabled ? !t.disabled : null === t.getAttribute("disabled")) && (!t.parentNode.disabled || !K.nodeName(t.parentNode, "optgroup"))) {
                            if (t = K(t).val(), o) return t;
                            i.push(t)
                        } return i
                },
                set: function(e, t) {
                    for (var n, r, o = e.options, i = K.makeArray(t), a = o.length; a--;)((r = o[a]).selected = -1 < K.inArray(K.valHooks.option.get(r), i)) && (n = !0);
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), K.each(["radio", "checkbox"], function() {
        K.valHooks[this] = {
            set: function(e, t) {
                return K.isArray(t) ? e.checked = -1 < K.inArray(K(e).val(), t) : void 0
            }
        }, J.checkOn || (K.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var dt = /^(?:focusinfocus|focusoutblur)$/;
    K.extend(K.event, {
        trigger: function(t, n, r, o) {
            var i, a, s, u, c, l, f = [r || W],
                p = Q.call(t, "type") ? t.type : t,
                d = Q.call(t, "namespace") ? t.namespace.split(".") : [],
                h = a = r = r || W;
            if (3 !== r.nodeType && 8 !== r.nodeType && !dt.test(p + K.event.triggered) && (-1 < p.indexOf(".") && (p = (d = p.split(".")).shift(), d.sort()), u = p.indexOf(":") < 0 && "on" + p, (t = t[K.expando] ? t : new K.Event(p, "object" == typeof t && t)).isTrigger = o ? 2 : 3, t.namespace = d.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : K.makeArray(n, [t]), l = K.event.special[p] || {}, o || !l.trigger || !1 !== l.trigger.apply(r, n))) {
                if (!o && !l.noBubble && !K.isWindow(r)) {
                    for (s = l.delegateType || p, dt.test(s + p) || (h = h.parentNode); h; h = h.parentNode) f.push(h), a = h;
                    a === (r.ownerDocument || W) && f.push(a.defaultView || a.parentWindow || e)
                }
                for (i = 0;
                    (h = f[i++]) && !t.isPropagationStopped();) t.type = 1 < i ? s : l.bindType || p, (c = (ve.get(h, "events") || {})[t.type] && ve.get(h, "handle")) && c.apply(h, n), (c = u && h[u]) && c.apply && he(h) && (t.result = c.apply(h, n), !1 === t.result && t.preventDefault());
                return t.type = p, o || t.isDefaultPrevented() || l._default && !1 !== l._default.apply(f.pop(), n) || !he(r) || u && K.isFunction(r[p]) && !K.isWindow(r) && ((a = r[u]) && (r[u] = null), r[K.event.triggered = p](), K.event.triggered = void 0, a && (r[u] = a)), t.result
            }
        },
        simulate: function(e, t, n) {
            e = K.extend(new K.Event, n, {
                type: e,
                isSimulated: !0
            }), K.event.trigger(e, null, t), e.isDefaultPrevented() && n.preventDefault()
        }
    }), K.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                K.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? K.event.trigger(e, t, n, !0) : void 0
        }
    }), K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        K.fn[t] = function(e, n) {
            return 0 < arguments.length ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), K.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), J.focusin = "onfocusin" in e, J.focusin || K.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        function n(e) {
            K.event.simulate(t, e.target, K.event.fix(e))
        }
        K.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    o = ve.access(r, t);
                o || r.addEventListener(e, n, !0), ve.access(r, t, (o || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    o = ve.access(r, t) - 1;
                o ? ve.access(r, t, o) : (r.removeEventListener(e, n, !0), ve.remove(r, t))
            }
        }
    });
    var ht = e.location,
        mt = K.now(),
        vt = /\?/;
    K.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, K.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (t) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || K.error("Invalid XML: " + t), n
    };
    var gt = /#.*$/,
        yt = /([?&])_=[^&]*/,
        bt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        wt = /^(?:GET|HEAD)$/,
        xt = /^\/\//,
        Ct = {},
        Tt = {},
        kt = "*/".concat("*"),
        $t = W.createElement("a");
    $t.href = ht.href, K.extend({
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
                "*": kt,
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
                "text json": K.parseJSON,
                "text xml": K.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? P(P(e, K.ajaxSettings), t) : P(K.ajaxSettings, e)
        },
        ajaxPrefilter: F(Ct),
        ajaxTransport: F(Tt),
        ajax: function(t, n) {
            function r(t, n, r, s) {
                var c, f, y, b = n;
                2 !== w && (w = 2, u && e.clearTimeout(u), o = void 0, a = s || "", C.readyState = 0 < t ? 4 : 0, s = 200 <= t && t < 300 || 304 === t, r && (y = function(e, t, n) {
                    for (var r, o, i, a, s = e.contents, u = e.dataTypes;
                        "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (o in s)
                            if (s[o] && s[o].test(r)) {
                                u.unshift(o);
                                break
                            } if (u[0] in n) i = u[0];
                    else {
                        for (o in n) {
                            if (!u[0] || e.converters[o + " " + u[0]]) {
                                i = o;
                                break
                            }
                            a = a || o
                        }
                        i = i || a
                    }
                    return i ? (i !== u[0] && u.unshift(i), n[i]) : void 0
                }(p, C, r)), y = function(e, t, n, r) {
                    var o, i, a, s, u, c = {},
                        l = e.dataTypes.slice();
                    if (l[1])
                        for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
                    for (i = l.shift(); i;)
                        if (e.responseFields[i] && (n[e.responseFields[i]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = i, i = l.shift())
                            if ("*" === i) i = u;
                            else if ("*" !== u && u !== i) {
                        if (!(a = c[u + " " + i] || c["* " + i]))
                            for (o in c)
                                if ((s = o.split(" "))[1] === i && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
                                    !0 === a ? a = c[o] : !0 !== c[o] && (i = s[0], l.unshift(s[1]));
                                    break
                                } if (!0 !== a)
                            if (a && e.throws) t = a(t);
                            else try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + i
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(p, y, C, s), s ? (p.ifModified && ((r = C.getResponseHeader("Last-Modified")) && (K.lastModified[i] = r), (r = C.getResponseHeader("etag")) && (K.etag[i] = r)), 204 === t || "HEAD" === p.type ? b = "nocontent" : 304 === t ? b = "notmodified" : (b = y.state, c = y.data, s = !(f = y.error))) : (f = b, !t && b || (b = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (n || b) + "", s ? m.resolveWith(d, [c, b, C]) : m.rejectWith(d, [C, b, f]), C.statusCode(g), g = void 0, l && h.trigger(s ? "ajaxSuccess" : "ajaxError", [C, p, s ? c : f]), v.fireWith(d, [C, b]), l && (h.trigger("ajaxComplete", [C, p]), --K.active || K.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var o, i, a, s, u, c, l, f, p = K.ajaxSetup({}, n),
                d = p.context || p,
                h = p.context && (d.nodeType || d.jquery) ? K(d) : K.event,
                m = K.Deferred(),
                v = K.Callbacks("once memory"),
                g = p.statusCode || {},
                y = {},
                b = {},
                w = 0,
                x = "canceled",
                C = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === w) {
                            if (!s)
                                for (s = {}; t = bt.exec(a);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return w || (e = b[n] = b[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return w || (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        if (e)
                            if (w < 2)
                                for (var t in e) g[t] = [g[t], e[t]];
                            else C.always(e[C.status]);
                        return this
                    },
                    abort: function(e) {
                        return e = e || x, o && o.abort(e), r(0, e), this
                    }
                };
            if (m.promise(C).complete = v.add, C.success = C.done, C.error = C.fail, p.url = ((t || p.url || ht.href) + "").replace(gt, "").replace(xt, ht.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = K.trim(p.dataType || "*").toLowerCase().match(de) || [""], null == p.crossDomain) {
                c = W.createElement("a");
                try {
                    c.href = p.url, c.href, p.crossDomain = $t.protocol + "//" + $t.host != c.protocol + "//" + c.host
                } catch (t) {
                    p.crossDomain = !0
                }
            }
            if (p.data && p.processData && "string" != typeof p.data && (p.data = K.param(p.data, p.traditional)), I(Ct, p, n, C), 2 === w) return C;
            for (f in (l = K.event && p.global) && 0 == K.active++ && K.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !wt.test(p.type), i = p.url, p.hasContent || (p.data && (i = p.url += (vt.test(i) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (p.url = yt.test(i) ? i.replace(yt, "$1_=" + mt++) : i + (vt.test(i) ? "&" : "?") + "_=" + mt++)), p.ifModified && (K.lastModified[i] && C.setRequestHeader("If-Modified-Since", K.lastModified[i]), K.etag[i] && C.setRequestHeader("If-None-Match", K.etag[i])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + kt + "; q=0.01" : "") : p.accepts["*"]), p.headers) C.setRequestHeader(f, p.headers[f]);
            if (p.beforeSend && (!1 === p.beforeSend.call(d, C, p) || 2 === w)) return C.abort();
            for (f in x = "abort", {
                    success: 1,
                    error: 1,
                    complete: 1
                }) C[f](p[f]);
            if (o = I(Tt, p, n, C)) {
                if (C.readyState = 1, l && h.trigger("ajaxSend", [C, p]), 2 === w) return C;
                p.async && 0 < p.timeout && (u = e.setTimeout(function() {
                    C.abort("timeout")
                }, p.timeout));
                try {
                    w = 1, o.send(y, r)
                } catch (t) {
                    if (!(w < 2)) throw t;
                    r(-1, t)
                }
            } else r(-1, "No Transport");
            return C
        },
        getJSON: function(e, t, n) {
            return K.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return K.get(e, void 0, t, "script")
        }
    }), K.each(["get", "post"], function(e, t) {
        K[t] = function(e, n, r, o) {
            return K.isFunction(n) && (o = o || r, r = n, n = void 0), K.ajax(K.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: r
            }, K.isPlainObject(e) && e))
        }
    }), K._evalUrl = function(e) {
        return K.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    }, K.fn.extend({
        wrapAll: function(e) {
            var t;
            return K.isFunction(e) ? this.each(function(t) {
                K(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = K(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return K.isFunction(e) ? this.each(function(t) {
                K(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = K(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = K.isFunction(e);
            return this.each(function(n) {
                K(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
            }).end()
        }
    }), K.expr.filters.hidden = function(e) {
        return !K.expr.filters.visible(e)
    }, K.expr.filters.visible = function(e) {
        return 0 < e.offsetWidth || 0 < e.offsetHeight || 0 < e.getClientRects().length
    };
    var Nt = /%20/g,
        _t = /\[\]$/,
        St = /\r?\n/g,
        Et = /^(?:submit|button|image|reset|file)$/i,
        jt = /^(?:input|select|textarea|keygen)/i;
    K.param = function(e, t) {
        function n(e, t) {
            t = K.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        }
        var r, o = [];
        if (void 0 === t && (t = K.ajaxSettings && K.ajaxSettings.traditional), K.isArray(e) || e.jquery && !K.isPlainObject(e)) K.each(e, function() {
            n(this.name, this.value)
        });
        else
            for (r in e) ! function e(t, n, r, o) {
                if (K.isArray(n)) K.each(n, function(n, i) {
                    r || _t.test(t) ? o(t, i) : e(t + "[" + ("object" == typeof i && null != i ? n : "") + "]", i, r, o)
                });
                else if (r || "object" !== K.type(n)) o(t, n);
                else
                    for (var i in n) e(t + "[" + i + "]", n[i], r, o)
            }(r, e[r], t, n);
        return o.join("&").replace(Nt, "+")
    }, K.fn.extend({
        serialize: function() {
            return K.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = K.prop(this, "elements");
                return e ? K.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !K(this).is(":disabled") && jt.test(this.nodeName) && !Et.test(e) && (this.checked || !ke.test(e))
            }).map(function(e, t) {
                var n = K(this).val();
                return null == n ? null : K.isArray(n) ? K.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(St, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(St, "\r\n")
                }
            }).get()
        }
    }), K.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Dt = {
            0: 200,
            1223: 204
        },
        At = K.ajaxSettings.xhr();
    J.cors = !!At && "withCredentials" in At, J.ajax = At = !!At, K.ajaxTransport(function(t) {
        var n, r;
        return J.cors || At && !t.crossDomain ? {
            send: function(o, i) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                for (a in t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) s.setRequestHeader(a, o[a]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? i(0, "error") : i(s.status, s.statusText) : i(Dt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (o) {
                    if (n) throw o
                }
            },
            abort: function() {
                n && n()
            }
        } : void 0
    }), K.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return K.globalEval(e), e
            }
        }
    }), K.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), K.ajaxTransport("script", function(e) {
        var t, n;
        if (e.crossDomain) return {
            send: function(r, o) {
                t = K("<script>").prop({
                    charset: e.scriptCharset,
                    src: e.url
                }).on("load error", n = function(e) {
                    t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                }), W.head.appendChild(t[0])
            },
            abort: function() {
                n && n()
            }
        }
    });
    var qt = [],
        Ot = /(=)\?(?=&|$)|\?\?/;
    K.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = qt.pop() || K.expando + "_" + mt++;
            return this[e] = !0, e
        }
    }), K.ajaxPrefilter("json jsonp", function(t, n, r) {
        var o, i, a, s = !1 !== t.jsonp && (Ot.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ot.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = K.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Ot, "$1" + o) : !1 !== t.jsonp && (t.url += (vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return a || K.error(o + " was not called"), a[0]
        }, t.dataTypes[0] = "json", i = e[o], e[o] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === i ? K(e).removeProp(o) : e[o] = i, t[o] && (t.jsonpCallback = n.jsonpCallback, qt.push(o)), a && K.isFunction(i) && i(a[0]), a = i = void 0
        }), "script") : void 0
    }), K.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || W;
        var r = ae.exec(e);
        n = !n && [];
        return r ? [t.createElement(r[1])] : (r = f([e], t, n), n && n.length && K(n).remove(), K.merge([], r.childNodes))
    };
    var Lt = K.fn.load;
    K.fn.load = function(e, t, n) {
        if ("string" != typeof e && Lt) return Lt.apply(this, arguments);
        var r, o, i, a = this,
            s = e.indexOf(" ");
        return -1 < s && (r = K.trim(e.slice(s)), e = e.slice(0, s)), K.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < a.length && K.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments, a.html(r ? K("<div>").append(K.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, i || [e.responseText, t, e])
            })
        }), this
    }, K.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        K.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), K.expr.filters.animated = function(e) {
        return K.grep(K.timers, function(t) {
            return e === t.elem
        }).length
    }, K.offset = {
        setOffset: function(e, t, n) {
            var r, o, i, a, s = K.css(e, "position"),
                u = K(e),
                c = {};
            "static" === s && (e.style.position = "relative"), i = u.offset(), r = K.css(e, "top"), a = K.css(e, "left"), a = ("absolute" === s || "fixed" === s) && -1 < (r + a).indexOf("auto") ? (o = (s = u.position()).top, s.left) : (o = parseFloat(r) || 0, parseFloat(a) || 0), K.isFunction(t) && (t = t.call(e, n, K.extend({}, i))), null != t.top && (c.top = t.top - i.top + o), null != t.left && (c.left = t.left - i.left + a), "using" in t ? t.using.call(e, c) : u.css(c)
        }
    }, K.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                K.offset.setOffset(this, e, t)
            });
            var t, n = this[0],
                r = {
                    top: 0,
                    left: 0
                },
                o = n && n.ownerDocument;
            return o ? (t = o.documentElement, K.contains(t, n) ? (r = n.getBoundingClientRect(), o = R(o), {
                top: r.top + o.pageYOffset - t.clientTop,
                left: r.left + o.pageXOffset - t.clientLeft
            }) : r) : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === K.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), K.nodeName(e[0], "html") || (r = e.offset()), r.top += K.css(e[0], "borderTopWidth", !0), r.left += K.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - K.css(n, "marginTop", !0),
                    left: t.left - r.left - K.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === K.css(e, "position");) e = e.offsetParent;
                return e || Ge
            })
        }
    }), K.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        K.fn[e] = function(r) {
            return me(this, function(e, r, o) {
                var i = R(e);
                return void 0 === o ? i ? i[t] : e[r] : void(i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : e[r] = o)
            }, e, r, arguments.length)
        }
    }), K.each(["top", "left"], function(e, t) {
        K.cssHooks[t] = $(J.pixelPosition, function(e, n) {
            return n ? (n = k(e, t), Ve.test(n) ? K(e).position()[t] + "px" : n) : void 0
        })
    }), K.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        K.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            K.fn[r] = function(r, o) {
                var i = arguments.length && (n || "boolean" != typeof r),
                    a = n || (!0 === r || !0 === o ? "margin" : "border");
                return me(this, function(t, n, r) {
                    var o;
                    return K.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === r ? K.css(t, n, a) : K.style(t, n, r, a)
                }, t, i ? r : void 0, i, null)
            }
        })
    }), K.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        size: function() {
            return this.length
        }
    }), K.fn.andSelf = K.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return K
    });
    var Ht = e.jQuery,
        Ft = e.$;
    return K.noConflict = function(t) {
        return e.$ === K && (e.$ = Ft), t && e.jQuery === K && (e.jQuery = Ht), K
    }, t || (e.jQuery = e.$ = K), K
}),
function(e) {
    var t = {
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
    e.zoom = function(t, n, r, o) {
        var i, a, s, u, c, l, f, p = e(t),
            d = p.css("position"),
            h = e(n);
        return t.style.position = /(absolute|fixed)/.test(d) ? d : "relative", t.style.overflow = "hidden", r.style.width = r.style.height = "", e(r).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: r.width * o,
            height: r.height * o,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(t), {
            init: function() {
                a = p.outerWidth(), i = p.outerHeight(), s = n === t ? (u = a, i) : (u = h.outerWidth(), h.outerHeight()), c = (r.width - a) / u, l = (r.height - i) / s, f = h.offset()
            },
            move: function(e) {
                var t = e.pageX - f.left;
                e = e.pageY - f.top, e = Math.max(Math.min(e, s), 0), t = Math.max(Math.min(t, u), 0);
                r.style.left = t * -c + "px", r.style.top = e * -l + "px"
            }
        }
    }, e.fn.zoom = function(n) {
        return this.each(function() {
            var r = e.extend({}, t, n || {}),
                o = r.target && e(r.target)[0] || this,
                i = this,
                a = e(i),
                s = document.createElement("img"),
                u = e(s),
                c = "mousemove.zoom",
                l = !1,
                f = !1;
            if (!r.url) {
                var p = i.querySelector("img");
                if (p && (r.url = p.getAttribute("data-src") || p.currentSrc || p.src), !r.url) return
            }
            a.one("zoom.destroy", function(e, t) {
                a.off(".zoom"), o.style.position = e, o.style.overflow = t, s.onload = null, u.remove()
            }.bind(this, o.style.position, o.style.overflow)), s.onload = function() {
                function t(t) {
                    p.init(), p.move(t), u.stop().fadeTo(e.support.opacity ? r.duration : 0, 1, !!e.isFunction(r.onZoomIn) && r.onZoomIn.call(s))
                }

                function n() {
                    u.stop().fadeTo(r.duration, 0, !!e.isFunction(r.onZoomOut) && r.onZoomOut.call(s))
                }
                var p = e.zoom(o, i, s, r.magnify);
                "grab" === r.on ? a.on("mousedown.zoom", function(r) {
                    1 === r.which && (e(document).one("mouseup.zoom", function() {
                        n(), e(document).off(c, p.move)
                    }), t(r), e(document).on(c, p.move), r.preventDefault())
                }) : "click" === r.on ? a.on("click.zoom", function(r) {
                    return l ? void 0 : (l = !0, t(r), e(document).on(c, p.move), e(document).one("click.zoom", function() {
                        n(), l = !1, e(document).off(c, p.move)
                    }), !1)
                }) : "toggle" === r.on ? a.on("click.zoom", function(e) {
                    l ? n() : t(e), l = !l
                }) : "mouseover" === r.on && (p.init(), a.on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(c, p.move)), r.touch && a.on("touchstart.zoom", function(e) {
                    e.preventDefault(), f ? (f = !1, n()) : (f = !0, t(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(e) {
                    e.preventDefault(), p.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function(e) {
                    e.preventDefault(), f && (f = !1, n())
                }), e.isFunction(r.callback) && r.callback.call(s)
            }, s.setAttribute("role", "presentation"), s.alt = "", s.src = r.url
        })
    }, e.fn.zoom.defaults = t
}(window.jQuery),
function() {
    function e(e, t) {
        for (var n = -1, r = t.length, o = e.length; ++n < r;) e[o + n] = t[n];
        return e
    }

    function t(e, t, n) {
        for (var r = -1, o = e.length; ++r < o;) {
            var i, a, s = e[r],
                u = t(s);
            null != u && (i === Q ? u == u : n(u, i)) && (i = u, a = s)
        }
        return a
    }

    function n(e) {
        return e && e.Object === Object ? e : null
    }

    function r(e) {
        return te[e]
    }

    function o(e) {
        var t = !1;
        if (null != e && "function" != typeof e.toString) try {
            t = !!(e + "")
        } catch (e) {}
        return t
    }

    function i(e, t) {
        return -1 < (e = "number" == typeof e || ee.test(e) ? +e : -1) && 0 == e % 1 && e < (null == t ? 9007199254740991 : t)
    }

    function a(e) {
        if (R(e) && !Ee(e)) {
            if (e instanceof s) return e;
            if (fe.call(e, "__wrapped__")) {
                var t = new s(e.__wrapped__, e.__chain__);
                return t.__actions__ = C(e.__actions__), t
            }
        }
        return new s(e)
    }

    function s(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t
    }

    function u(e, t, n, r) {
        var o;
        return (o = e === Q) || (o = (e === (o = le[n]) || e != e && o != o) && !fe.call(r, n)), o ? t : e
    }

    function c(e) {
        return P(e) ? ve(e) : {}
    }

    function l(e, t, n) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return setTimeout(function() {
            e.apply(Q, n)
        }, t)
    }

    function f(e, t) {
        var n = [];
        return xe(e, function(e, r, o) {
            t(e, r, o) && n.push(e)
        }), n
    }

    function p(t, n, r, o) {
        o = o || [];
        for (var i = -1, a = t.length; ++i < a;) {
            var s = t[i];
            0 < n && R(s) && H(s) && (r || Ee(s) || L(s)) ? 1 < n ? p(s, n - 1, r, o) : e(o, s) : r || (o[o.length] = s)
        }
        return o
    }

    function d(e, t) {
        return e && Ce(e, t, U)
    }

    function h(e, t) {
        return f(t, function(t) {
            return F(e[t])
        })
    }

    function m(e, t, n, r, i) {
        return e === t || (null == e || null == t || !P(e) && !R(t) ? e != e && t != t : function(e, t, n, r, i, a) {
            var s = Ee(e),
                u = Ee(t),
                c = "[object Array]",
                l = "[object Array]";
            s || "[object Arguments]" == (c = de.call(e)) && (c = "[object Object]"), u || "[object Arguments]" == (l = de.call(t)) && (l = "[object Object]");
            var f = "[object Object]" == c && !o(e);
            u = "[object Object]" == l && !o(t);
            return !(l = c == l) || s || f ? 2 & i || (c = f && fe.call(e, "__wrapped__"), u = u && fe.call(t, "__wrapped__"), !c && !u) ? !!l && ((c = E(a = a || [], function(t) {
                return t[0] === e
            })) && c[1] ? c[1] == t : (a.push([e, t]), t = (s ? function(e, t, n, r, o, i) {
                var a = -1,
                    s = 1 & o,
                    u = e.length,
                    c = t.length;
                if (u != c && !(2 & o && u < c)) return !1;
                for (c = !0; ++a < u;) {
                    var l = e[a],
                        f = t[a];
                    if (void 0 !== Q) {
                        c = !1;
                        break
                    }
                    if (s) {
                        if (!T(t, function(e) {
                                return l === e || n(l, e, r, o, i)
                            })) {
                            c = !1;
                            break
                        }
                    } else if (l !== f && !n(l, f, r, o, i)) {
                        c = !1;
                        break
                    }
                }
                return c
            } : function(e, t, n, r, o, i) {
                var a = 2 & o,
                    s = U(e),
                    u = s.length,
                    c = U(t).length;
                if (u != c && !a) return !1;
                for (var l = u; l--;) {
                    var f = s[l];
                    if (!(a ? f in t : fe.call(t, f))) return !1
                }
                for (c = !0; ++l < u;) {
                    var p = e[f = s[l]],
                        d = t[f];
                    if (void 0 !== Q || p !== d && !n(p, d, r, o, i)) {
                        c = !1;
                        break
                    }
                    a = a || "constructor" == f
                }
                return c && !a && (n = e.constructor) != (r = t.constructor) && "constructor" in e && "constructor" in t && !("function" == typeof n && n instanceof n && "function" == typeof r && r instanceof r) && (c = !1), c
            })(e, t, n, r, i, a), a.pop(), t)) : n(c ? e.value() : e, u ? t.value() : t, r, i, a) : function(e, t) {
                switch (c) {
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
            }(e, t)
        }(e, t, m, n, r, i))
    }

    function v(e) {
        var t = typeof e;
        return "function" == t ? e : null == e ? Y : ("object" == t ? b : w)(e)
    }

    function g(e) {
        var t, n = [];
        for (t in e = null == e ? e : Object(e)) n.push(t);
        return n
    }

    function y(e, t) {
        var n = -1,
            r = H(e) ? Array(e.length) : [];
        return xe(e, function(e, o, i) {
            r[++n] = t(e, o, i)
        }), r
    }

    function b(e) {
        var t = U(e);
        return function(n) {
            var r = t.length;
            if (null == n) return !r;
            for (n = Object(n); r--;) {
                var o = t[r];
                if (!(o in n && m(e[o], n[o], Q, 3))) return !1
            }
            return !0
        }
    }

    function w(e) {
        return function(t) {
            return null == t ? Q : t[e]
        }
    }

    function x(e, t, n) {
        var r = -1,
            o = e.length;
        for (t < 0 && (t = o < -t ? 0 : o + t), (n = o < n ? o : n) < 0 && (n += o), o = n < t ? 0 : n - t >>> 0, t >>>= 0, n = Array(o); ++r < o;) n[r] = e[r + t];
        return n
    }

    function C(e) {
        return x(e, 0, e.length)
    }

    function T(e, t) {
        var n;
        return xe(e, function(e, r, o) {
            return !(n = t(e, r, o))
        }), !!n
    }

    function k(e, t, n, r) {
        n = n || {};
        for (var o = -1, i = t.length; ++o < i;) {
            var a = t[o],
                s = r ? r(n[a], e[a], a, n, e) : e[a],
                u = n,
                c = u[a];
            fe.call(u, a) && (c === s || c != c && s != s) && (s !== Q || a in u) || (u[a] = s)
        }
        return n
    }

    function $(e) {
        return q(function(t, n) {
            var r = -1,
                o = n.length,
                i = "function" == typeof(i = 1 < o ? n[o - 1] : Q) ? (o--, i) : Q;
            for (t = Object(t); ++r < o;) {
                var a = n[r];
                a && e(t, a, r, i)
            }
            return t
        })
    }

    function N(e) {
        var t = e ? e.length : Q;
        if (I(t) && (Ee(e) || B(e) || L(e))) {
            e = String;
            for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
            t = r
        } else t = null;
        return t
    }

    function _(e) {
        return e === (F(e = e && e.constructor) && e.prototype || le)
    }

    function S(e) {
        return e ? e[0] : Q
    }

    function E(e, t) {
        return n = v(t), xe(e, function(e, t, o) {
            return n(e, t, o) ? (r = e, !1) : void 0
        }), r;
        var n, r
    }

    function j(e, t) {
        return xe(e, "function" == typeof t ? t : Y)
    }

    function D(e, t, n) {
        return r = e, o = v(t), i = n, a = arguments.length < 3, xe(r, function(e, t, n) {
            i = a ? (a = !1, e) : o(i, e, t, n)
        }), i;
        var r, o, i, a
    }

    function A(e, t) {
        var n;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return e = je(e),
            function() {
                return 0 < --e && (n = t.apply(this, arguments)), e <= 1 && (t = Q), n
            }
    }

    function q(e) {
        var t;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return t = we(t === Q ? e.length - 1 : je(t), 0),
            function() {
                for (var n = arguments, r = -1, o = we(n.length - t, 0), i = Array(o); ++r < o;) i[r] = n[t + r];
                for (o = Array(t + 1), r = -1; ++r < t;) o[r] = n[r];
                return o[t] = i, e.apply(this, o)
            }
    }

    function O(e, t) {
        return t < e
    }

    function L(e) {
        return R(e) && H(e) && fe.call(e, "callee") && (!ge.call(e, "callee") || "[object Arguments]" == de.call(e))
    }

    function H(e) {
        return null != e && !("function" == typeof e && F(e)) && I(ke(e))
    }

    function F(e) {
        return "[object Function]" == (e = P(e) ? de.call(e) : "") || "[object GeneratorFunction]" == e
    }

    function I(e) {
        return "number" == typeof e && -1 < e && 0 == e % 1 && e <= 9007199254740991
    }

    function P(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t)
    }

    function R(e) {
        return !!e && "object" == typeof e
    }

    function M(e) {
        return "number" == typeof e || R(e) && "[object Number]" == de.call(e)
    }

    function B(e) {
        return "string" == typeof e || !Ee(e) && R(e) && "[object String]" == de.call(e)
    }

    function W(e, t) {
        return e < t
    }

    function z(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
    }

    function U(e) {
        var t = _(e);
        if (!t && !H(e)) return be(Object(e));
        var n, r, o = !!(r = N(e)),
            a = (r = r || []).length;
        for (n in e) !fe.call(e, n) || o && ("length" == n || i(n, a)) || t && "constructor" == n || r.push(n);
        return r
    }

    function X(e) {
        for (var t, n = -1, r = _(e), o = g(e), a = o.length, s = !!(t = N(e)), u = (t = t || []).length; ++n < a;) {
            var c = o[n];
            s && ("length" == c || i(c, u)) || "constructor" == c && (r || !fe.call(e, c)) || t.push(c)
        }
        return t
    }

    function V(e) {
        return e ? y(U(t = e), function(e) {
            return t[e]
        }) : [];
        var t
    }

    function Y(e) {
        return e
    }

    function G(t, n, r) {
        var o = U(n),
            i = h(n, o);
        null != r || P(n) && (i.length || !o.length) || (r = n, n = t, t = this, i = h(n, U(n)));
        var a = !(P(r) && "chain" in r) || r.chain,
            s = F(t);
        return xe(i, function(r) {
            var o = n[r];
            t[r] = o, s && (t.prototype[r] = function() {
                var n = this.__chain__;
                if (a || n) {
                    var r = t(this.__wrapped__);
                    return (r.__actions__ = C(this.__actions__)).push({
                        func: o,
                        args: arguments,
                        thisArg: t
                    }), r.__chain__ = n, r
                }
                return o.apply(t, e([this.value()], arguments))
            })
        }), t
    }
    var Q, J, K = /[&<>"'`]/g,
        Z = RegExp(K.source),
        ee = /^(?:0|[1-9]\d*)$/,
        te = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "`": "&#96;"
        },
        ne = (Le = {
            function: !0,
            object: !0
        })[typeof exports] && exports && !exports.nodeType ? exports : Q,
        re = Le[typeof module] && module && !module.nodeType ? module : Q,
        oe = re && re.exports === ne ? ne : Q,
        ie = n(Le[typeof self] && self),
        ae = n(Le[typeof window] && window),
        se = n(Le[typeof this] && this),
        ue = n(ne && re && "object" == typeof global && global) || ae !== (se && se.window) && ae || ie || se || Function("return this")(),
        ce = Array.prototype,
        le = Object.prototype,
        fe = le.hasOwnProperty,
        pe = 0,
        de = le.toString,
        he = ue._,
        me = (He = ue.Reflect) ? He.f : Q,
        ve = Object.create,
        ge = le.propertyIsEnumerable,
        ye = ue.isFinite,
        be = Object.keys,
        we = Math.max,
        xe = (J = d, function(e, t) {
            if (null == e) return e;
            if (!H(e)) return J(e, t);
            for (var n = e.length, r = -1, o = Object(e); ++r < n && !1 !== t(o[r], r, o););
            return e
        }),
        Ce = function(e, t, n) {
            for (var r = -1, o = Object(e), i = (n = n(e)).length; i--;) {
                var a = n[++r];
                if (!1 === t(o[a], a, o)) break
            }
            return e
        };
    me && !ge.call({
        valueOf: 1
    }, "valueOf") && (g = function(e) {
        e = me(e);
        for (var t, n = []; !(t = e.next()).done;) n.push(t.value);
        return n
    });
    var Te, ke = w("length"),
        $e = q(function(t, n) {
            return Ee(t) || (t = null == t ? [] : [Object(t)]), p(n, 1), e(C(t), V)
        }),
        Ne = q(function(e, t, n) {
            if ("function" != typeof e) throw new TypeError("Expected a function");
            var r, o = (r = e, function() {
                var e = arguments,
                    t = c(r.prototype);
                return P(e = r.apply(t, e)) ? e : t
            });
            return function r() {
                for (var i = -1, a = arguments.length, s = -1, u = n.length, c = Array(u + a), l = this && this !== ue && this instanceof r ? o : e; ++s < u;) c[s] = n[s];
                for (; a--;) c[s++] = arguments[++i];
                return l.apply(t, c)
            }
        }),
        _e = q(function(e, t) {
            return l(e, 1, t)
        }),
        Se = q(function(e, t, n) {
            return l(e, De(t) || 0, n)
        }),
        Ee = Array.isArray,
        je = Number,
        De = Number,
        Ae = $(function(e, t) {
            k(t, U(t), e)
        }),
        qe = $(function(e, t) {
            k(t, X(t), e)
        }),
        Oe = $(function(e, t, n, r) {
            k(t, X(t), e, r)
        }),
        Le = q(function(e) {
            return e.push(Q, u), Oe.apply(Q, e)
        }),
        He = (se = q(function(e, t) {
            return null == e ? {} : (n = e, t = p(t, 1), n = Object(n), D(t, function(e, t) {
                return t in n && (e[t] = n[t]), e
            }, {}));
            var n
        }), v);
    (s.prototype = c(a.prototype)).constructor = s, a.assignIn = qe, a.before = A, a.bind = Ne, a.chain = function(e) {
        return (e = a(e)).__chain__ = !0, e
    }, a.compact = function(e) {
        return f(e, Boolean)
    }, a.concat = $e, a.create = function(e, t) {
        return e = c(e), t ? Ae(e, t) : e
    }, a.defaults = Le, a.defer = _e, a.delay = Se, a.filter = function(e, t) {
        return f(e, v(t))
    }, a.flatten = function(e) {
        return e && e.length ? p(e, 1) : []
    }, a.flattenDeep = function(e) {
        return e && e.length ? p(e, 1 / 0) : []
    }, a.iteratee = He, a.keys = U, a.map = function(e, t) {
        return y(e, v(t))
    }, a.matches = function(e) {
        return b(Ae({}, e))
    }, a.mixin = G, a.negate = function(e) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return function() {
            return !e.apply(this, arguments)
        }
    }, a.once = function(e) {
        return A(2, e)
    }, a.pick = se, a.slice = function(e, t, n) {
        var r = e ? e.length : 0;
        return n = n === Q ? r : +n, r ? x(e, null == t ? 0 : +t, n) : []
    }, a.sortBy = function(e, t) {
        var n = 0;
        return t = v(t), y(y(e, function(e, r, o) {
            return {
                c: e,
                b: n++,
                a: t(e, r, o)
            }
        }).sort(function(e, t) {
            var n;
            e: {
                n = e.a;
                var r = t.a;
                if (n !== r) {
                    var o = null === n,
                        i = n === Q,
                        a = n == n,
                        s = null === r,
                        u = r === Q,
                        c = r == r;
                    if (r < n && !s || !a || o && !u && c || i && c) {
                        n = 1;
                        break e
                    }
                    if (n < r && !o || !c || s && !i && a || u && a) {
                        n = -1;
                        break e
                    }
                }
                n = 0
            }
            return n || e.b - t.b
        }), w("c"))
    }, a.tap = function(e, t) {
        return t(e), e
    }, a.thru = function(e, t) {
        return t(e)
    }, a.toArray = function(e) {
        return H(e) ? e.length ? C(e) : [] : V(e)
    }, a.values = V, a.extend = qe, G(a, a), a.clone = function(e) {
        return P(e) ? Ee(e) ? C(e) : k(e, U(e)) : e
    }, a.escape = function(e) {
        return (e = z(e)) && Z.test(e) ? e.replace(K, r) : e
    }, a.every = function(e, t, n) {
        return r = v(t = n ? Q : t), o = !0, xe(e, function(e, t, n) {
            return o = !!r(e, t, n)
        }), o;
        var r, o
    }, a.find = E, a.forEach = j, a.has = function(e, t) {
        return null != e && fe.call(e, t)
    }, a.head = S, a.identity = Y, a.indexOf = function(e, t, n) {
        var r = e ? e.length : 0;
        n = ((n = "number" == typeof n ? n < 0 ? we(r + n, 0) : n : 0) || 0) - 1;
        for (var o = t == t; ++n < r;) {
            var i = e[n];
            if (o ? i === t : i != i) return n
        }
        return -1
    }, a.isArguments = L, a.isArray = Ee, a.isBoolean = function(e) {
        return !0 === e || !1 === e || R(e) && "[object Boolean]" == de.call(e)
    }, a.isDate = function(e) {
        return R(e) && "[object Date]" == de.call(e)
    }, a.isEmpty = function(e) {
        if (H(e) && (Ee(e) || B(e) || F(e.splice) || L(e))) return !e.length;
        for (var t in e)
            if (fe.call(e, t)) return !1;
        return !0
    }, a.isEqual = function(e, t) {
        return m(e, t)
    }, a.isFinite = function(e) {
        return "number" == typeof e && ye(e)
    }, a.isFunction = F, a.isNaN = function(e) {
        return M(e) && e != +e
    }, a.isNull = function(e) {
        return null === e
    }, a.isNumber = M, a.isObject = P, a.isRegExp = function(e) {
        return P(e) && "[object RegExp]" == de.call(e)
    }, a.isString = B, a.isUndefined = function(e) {
        return e === Q
    }, a.last = function(e) {
        var t = e ? e.length : 0;
        return t ? e[t - 1] : Q
    }, a.max = function(e) {
        return e && e.length ? t(e, Y, O) : Q
    }, a.min = function(e) {
        return e && e.length ? t(e, Y, W) : Q
    }, a.noConflict = function() {
        return ue._ === this && (ue._ = he), this
    }, a.noop = function() {}, a.reduce = D, a.result = function(e, t, n) {
        return (t = null == e ? Q : e[t]) === Q && (t = n), F(t) ? t.call(e) : t
    }, a.size = function(e) {
        return null == e ? 0 : (e = H(e) ? e : U(e)).length
    }, a.some = function(e, t, n) {
        return T(e, v(t = n ? Q : t))
    }, a.uniqueId = function(e) {
        var t = ++pe;
        return z(e) + t
    }, a.each = j, a.first = S, G(a, (Te = {}, d(a, function(e, t) {
        fe.call(a.prototype, t) || (Te[t] = e)
    }), Te), {
        chain: !1
    }), a.VERSION = "4.17.20", xe("pop join replace reverse split push shift sort splice unshift".split(" "), function(e) {
        var t = (/^(?:replace|split)$/.test(e) ? String.prototype : ce)[e],
            n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
            r = /^(?:pop|join|replace|shift)$/.test(e);
        a.prototype[e] = function() {
            var e = arguments;
            return r && !this.__chain__ ? t.apply(this.value(), e) : this[n](function(n) {
                return t.apply(n, e)
            })
        }
    }), a.prototype.toJSON = a.prototype.valueOf = a.prototype.value = function() {
        return t = this.__wrapped__, D(this.__actions__, function(t, n) {
            return n.func.apply(n.thisArg, e([t], n.args))
        }, t);
        var t
    }, (ae || ie || {})._ = a, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return a
    }) : ne && re ? (oe && ((re.exports = a)._ = a), ne._ = a) : ue._ = a
}.call(this), window.mobileCheck = function() {
        var e = !1,
            t = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
    },
    function(e, t, n) {
        function r(e, t) {
            return typeof e === t
        }

        function o(e) {
            return "function" != typeof t.createElement ? t.createElement(e) : d ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", e) : t.createElement.apply(t, arguments)
        }

        function i(e) {
            return e.replace(/([A-Z])/g, function(e, t) {
                return "-" + t.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function a(a, s, u, c, l) {
            var f = a.charAt(0).toUpperCase() + a.slice(1),
                h = (a + " " + m.join(f + " ") + f).split(" ");
            return r(s, "string") || void 0 === s ? function(r, a, s, u) {
                function c() {
                    f && (delete x.style, delete x.modElem)
                }
                if (u = !(void 0 === u) && u, void 0 !== s) {
                    var l = function(r, a) {
                        var s = r.length;
                        if ("CSS" in e && "supports" in e.CSS) {
                            for (; s--;)
                                if (e.CSS.supports(i(r[s]), a)) return !0;
                            return !1
                        }
                        if ("CSSSupportsRule" in e) {
                            for (var u = []; s--;) u.push("(" + i(r[s]) + ":" + a + ")");
                            return function(e, n) {
                                var r, i, a, s = "modernizr",
                                    u = o("div"),
                                    c = ((a = t.body) || ((a = o(d ? "svg" : "body")).fake = !0), a);
                                if (parseInt(n, 10))
                                    for (; n--;)(r = o("div")).id = s + (n + 1), u.appendChild(r);
                                return (a = o("style")).type = "text/css", a.id = "s" + s, (c.fake ? c : u).appendChild(a), c.appendChild(u), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(t.createTextNode(e)), u.id = s, c.fake && (c.style.background = "", c.style.overflow = "hidden", i = p.style.overflow, p.style.overflow = "hidden", p.appendChild(c)), e = "absolute" == getComputedStyle(u, null).position, c.fake ? (c.parentNode.removeChild(c), p.style.overflow = i, p.offsetHeight) : u.parentNode.removeChild(u), !!e
                            }("@supports (" + (u = u.join(" or ")) + ") { #modernizr { position: absolute; } }")
                        }
                        return n
                    }(r, s);
                    if (void 0 !== l) return l
                }
                for (var f, h, m, v, g, y = ["modernizr", "tspan", "samp"]; !x.style && y.length;) f = !0, x.modElem = o(y.shift()), x.style = x.modElem.style;
                for (m = r.length, h = 0; h < m; h++)
                    if (v = r[h], g = x.style[v], ~("" + v).indexOf("-") && (v = v.replace(/([a-z])-([a-z])/g, function(e, t, n) {
                            return t + n.toUpperCase()
                        }).replace(/^-/, "")), x.style[v] !== n) {
                        if (u || void 0 === s) return c(), "pfx" != a || v;
                        try {
                            x.style[v] = s
                        } catch (r) {}
                        if (x.style[v] != g) return c(), "pfx" != a || v
                    } return c(), !1
            }(h, s, c, l) : function(e, t, n) {
                var o, i;
                for (i in e)
                    if (e[i] in t) return !1 === n ? e[i] : r(o = t[e[i]], "function") ? function(e, t) {
                        return function() {
                            return e.apply(t, arguments)
                        }
                    }(o, n || t) : o;
                return !1
            }(h = (a + " " + v.join(f + " ") + f).split(" "), s, u)
        }

        function s(e, t, r) {
            return a(e, n, n, t, r)
        }
        var u = [],
            c = [],
            l = {
                _version: "3.3.1",
                _config: {
                    classPrefix: "",
                    enableClasses: !0,
                    enableJSClass: !0,
                    usePrefixes: !0
                },
                _q: [],
                on: function(e, t) {
                    var n = this;
                    setTimeout(function() {
                        t(n[e])
                    }, 0)
                },
                addTest: function(e, t, n) {
                    c.push({
                        name: e,
                        fn: t,
                        options: n
                    })
                },
                addAsyncTest: function(e) {
                    c.push({
                        name: null,
                        fn: e
                    })
                }
            },
            f = function() {};
        f.prototype = l, (f = new f).addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
        var p = t.documentElement,
            d = "svg" === p.nodeName.toLowerCase(),
            h = "Moz O ms Webkit",
            m = l._config.usePrefixes ? h.split(" ") : [];
        l._cssomPrefixes = m;
        var v = l._config.usePrefixes ? h.toLowerCase().split(" ") : [];
        l._domPrefixes = v;
        var g = {
            elem: o("modernizr")
        };
        f._q.push(function() {
            delete g.elem
        });
        var y, b, w, x = {
            style: g.elem.style
        };
        f._q.unshift(function() {
                delete x.style
            }), l.testAllProps = a, l.testAllProps = s, f.addTest("flexbox", s("flexBasis", "1px", !0)), f.addTest("csstransforms", function() {
                return -1 === navigator.userAgent.indexOf("Android 2.") && s("transform", "scale(1)", !0)
            }),
            function() {
                var e, t, n, o, i, a, s;
                for (s in c)
                    if (c.hasOwnProperty(s)) {
                        if (e = [], (t = c[s]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                            for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                        for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) 1 === (a = e[i].split(".")).length ? f[a[0]] = o : (!f[a[0]] || f[a[0]] instanceof Boolean || (f[a[0]] = new Boolean(f[a[0]])), f[a[0]][a[1]] = o), u.push((o ? "" : "no-") + a.join("-"))
                    }
            }(), y = u, b = p.className, w = f._config.classPrefix || "", d && (b = b.baseVal), f._config.enableJSClass && (h = new RegExp("(^|\\s)" + w + "no-js(\\s|$)"), b = b.replace(h, "$1" + w + "js$2")), f._config.enableClasses && (b += " " + w + y.join(" " + w), d ? p.className.baseVal = b : p.className = b), delete l.addTest, delete l.addAsyncTest;
        for (var C = 0; C < f._q.length; C++) f._q[C]();
        e.Modernizr = f
    }(window, document),
    function(e) {
        e.fn.prepareTransition = function() {
            return this.each(function() {
                var t = e(this);
                t.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd", function() {
                    t.removeClass("is-transitioning")
                });
                var n = 0;
                e.each(["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-o-transition-duration"], function(e, r) {
                    n = n || parseFloat(t.css(r))
                }), 0 != n && (t.addClass("is-transitioning"), t[0].offsetWidth)
            })
        }
    }(jQuery),
    function(e, t) {
        var n, r = e.jQuery || e.Cowboy || (e.Cowboy = {});
        r.throttle = n = function(e, n, o, i) {
            function a() {
                function r() {
                    u = +new Date, o.apply(a, l)
                }
                var a = this,
                    c = new Date - u,
                    l = arguments;
                i && !s && r(), s && clearTimeout(s), i === t && e < c ? r() : !0 !== n && (s = setTimeout(i ? function() {
                    s = t
                } : r, i === t ? e - c : e))
            }
            var s, u = 0;
            return "boolean" != typeof n && (i = o, o = n, n = t), r.guid && (a.guid = o.guid = o.guid || r.guid++), a
        }, r.debounce = function(e, r, o) {
            return o === t ? n(e, r, !1) : n(e, o, !1 !== r)
        }
    }(this), window.theme = window.theme || {}, theme.Sections = function() {
        this.constructors = {}, this.instances = [], $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
    }, theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
        _createInstance: function(e, t) {
            var n = (r = $(e)).attr("data-section-id"),
                r = r.attr("data-section-type");
            t = t || this.constructors[r], _.isUndefined(t) || (e = _.assignIn(new t(e), {
                id: n,
                type: r,
                container: e
            }), this.instances.push(e))
        },
        _onSectionLoad: function(e) {
            (e = $("[data-section-id]", e.target)[0]) && this._createInstance(e)
        },
        _onSectionUnload: function(e) {
            this.instances = _.filter(this.instances, function(t) {
                var n = t.id === e.detail.sectionId;
                return n && _.isFunction(t.onUnload) && t.onUnload(e), !n
            })
        },
        _onSelect: function(e) {
            var t = _.find(this.instances, function(t) {
                return t.id === e.detail.sectionId
            });
            !_.isUndefined(t) && _.isFunction(t.onSelect) && t.onSelect(e)
        },
        _onDeselect: function(e) {
            var t = _.find(this.instances, function(t) {
                return t.id === e.detail.sectionId
            });
            !_.isUndefined(t) && _.isFunction(t.onDeselect) && t.onDeselect(e)
        },
        _onBlockSelect: function(e) {
            var t = _.find(this.instances, function(t) {
                return t.id === e.detail.sectionId
            });
            !_.isUndefined(t) && _.isFunction(t.onBlockSelect) && t.onBlockSelect(e)
        },
        _onBlockDeselect: function(e) {
            var t = _.find(this.instances, function(t) {
                return t.id === e.detail.sectionId
            });
            !_.isUndefined(t) && _.isFunction(t.onBlockDeselect) && t.onBlockDeselect(e)
        },
        register: function(e, t) {
            this.constructors[e] = t, $("[data-section-type=" + e + "]").each(function(e, n) {
                this._createInstance(n, t)
            }.bind(this))
        }
    }), window.slate = window.slate || {}, slate.utils = {
        getParameterByName: function(e, t) {
            return t = t || window.location.href, e = e.replace(/[[\]]/g, "\\$&"), (t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t)) ? t[2] ? decodeURIComponent(t[2].replace(/\+/g, " ")) : "" : null
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
                n = e.$container.find($('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])').filter(":visible")),
                r = n[0],
                o = n[n.length - 1];
            e.$elementToFocus || (e.$elementToFocus = e.$container), e.$container.attr("tabindex", "-1"), e.$elementToFocus.focus(), $(document).off("focusin"), $(document).on(t.focusout, function() {
                $(document).off(t.keydown)
            }), $(document).on(t.focusin, function(e) {
                e.target !== o && e.target !== r || $(document).on(t.keydown, function(e) {
                    e.keyCode === slate.utils.keyboardKeys.TAB && (e.target !== o || e.shiftKey || (e.preventDefault(), r.focus()), e.target === r && e.shiftKey && (e.preventDefault(), o.focus()))
                })
            })
        },
        removeTrapFocus: function(e) {
            var t = e.namespace ? "focusin." + e.namespace : "focusin";
            e.$container && e.$container.length && e.$container.removeAttr("tabindex"), $(document).off(t)
        },
        accessibleLinks: function(e) {
            var t = document.querySelector("body"),
                n = {
                    newWindow: "a11y-new-window-message",
                    external: "a11y-external-message",
                    newWindowExternal: "a11y-new-window-external-message"
                };
            void 0 !== e.$links && e.$links.jquery || (e.$links = $("a[href]:not([aria-describedby])")), $.each(e.$links, function() {
                    var e = $(this),
                        t = e.attr("target"),
                        r = e.attr("rel"),
                        o = (o = window.location.hostname, e[0].hostname !== o);
                    t = "_blank" === t;
                    o && e.attr("aria-describedby", n.external), t && (void 0 !== r && -1 !== r.indexOf("noopener") || e.attr("rel", function(e, t) {
                        return (void 0 === t ? "" : t + " ") + "noopener"
                    }), e.attr("aria-describedby", n.newWindow)), o && t && e.attr("aria-describedby", n.newWindowExternal)
                }),
                function(e) {
                    "object" != typeof e && (e = {});
                    var r, o = $.extend({
                            newWindow: "Opens in a new window.",
                            external: "Opens external website.",
                            newWindowExternal: "Opens external website in a new window."
                        }, e),
                        i = (e = document.createElement("ul"), "");
                    for (r in o) i += "<li id=" + n[r] + ">" + o[r] + "</li>";
                    e.setAttribute("hidden", !0), e.innerHTML = i, t.appendChild(e)
                }(e.messages)
        }
    }, theme.Images = {
        preload: function(e, t) {
            "string" == typeof e && (e = [e]);
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                this.loadImage(this.getSizedImageUrl(r, t))
            }
        },
        loadImage: function(e) {
            (new Image).src = e
        },
        switchImage: function(e, t, n) {
            var r = this.imageSize(t.src);
            r = this.getSizedImageUrl(e.src, r);
            n ? n(r, e, t) : t.src = r
        },
        imageSize: function(e) {
            return null !== (e = e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/)) ? void 0 !== e[2] ? e[1] + e[2] : e[1] : null
        },
        getSizedImageUrl: function(e, t) {
            if (null === t) return e;
            if ("master" === t) return this.removeProtocol(e);
            var n = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            return null === n ? null : (e = e.split(n[0]), n = n[0], this.removeProtocol(e[0] + "_" + t + n))
        },
        removeProtocol: function(e) {
            return e.replace(/http(s)?:/, "")
        }
    }, theme.Currency = {
        formatMoney: function(e, t) {
            "string" == typeof e && (e = e.replace(".", ""));
            var n = "",
                r = /\{\{\s*(\w+)\s*\}\}/;

            function o(e, t, n, r) {
                return n = n || ",", r = r || ".", isNaN(e) || null === e ? 0 : (e = (e = (e / 100).toFixed(t)).split("."))[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n) + (e[1] ? r + e[1] : "")
            }
            switch ((t = t || "${{amount}}").match(r)[1]) {
                case "amount":
                    n = o(e, 2);
                    break;
                case "amount_no_decimals":
                    n = o(e, 0);
                    break;
                case "amount_with_comma_separator":
                    n = o(e, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    n = o(e, 0, ".", ",");
                    break;
                case "amount_no_decimals_with_space_separator":
                    n = o(e, 0, " ");
                    break;
                case "amount_with_apostrophe_separator":
                    n = o(e, 2, "'")
            }
            return t.replace(r, n)
        }
    }, theme.Drawers = function() {
        function e(e, t, n) {
            var r = {
                close: ".js-drawer-close",
                open: ".js-drawer-open-" + t,
                openClass: "js-drawer-open",
                dirOpenClass: "js-drawer-open-" + t
            };
            if (this.nodes = {
                    $parent: $("html").add("body"),
                    $page: $("#PageContainer")
                }, this.config = $.extend(r, n), this.position = t, this.$drawer = $("#" + e), !this.$drawer.length) return !1;
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
        var e = "body",
            t = "#AccessibleNav",
            n = "[data-has-dropdowns]",
            r = ".site-nav--active-dropdown",
            o = ".site-nav__link--main",
            i = ".site-nav__link--last",
            a = "site-nav--active-dropdown",
            s = "site-nav__dropdown--right",
            u = "site-nav__dropdown--left",
            c = {};

        function l(t) {
            t.find(o).attr("aria-expanded", "false"), t.removeClass(a), c.$activeDropdown = $(r), $(e).off("click.siteNav"), $(window).off("keyup.siteNav")
        }

        function f(e) {
            e.each(function() {
                var e = $(this).find(".site-nav__dropdown");
                e.length && (Math.ceil($(this).offset().left) > Math.floor(c.$siteHeader.outerWidth()) / 2 ? e.removeClass(u).addClass(s) : e.removeClass(s).addClass(u))
            })
        }

        function p() {
            $(".site-nav--has-centered-dropdown").each(function() {
                var e = (t = $(this)).find(".site-nav__dropdown--centered"),
                    t = t.position().top + 41;
                e.css("top", t)
            })
        }
        return {
            init: function() {
                c = {
                    $nav: $(t),
                    $topLevel: $(o),
                    $parents: $(t).find(n),
                    $subMenuLinks: $(".site-nav__child-link"),
                    $activeDropdown: $(r),
                    $siteHeader: $(".site-header")
                }, f($(n)), p(), c.$parents.on("click.siteNav", function() {
                    var t, n = $(this);
                    n.hasClass(a) ? l(n) : ((t = n).addClass(a), c.$activeDropdown.length && l(c.$activeDropdown), (c.$activeDropdown = t).find(o).attr("aria-expanded", "true"), setTimeout(function() {
                        $(window).on("keyup.siteNav", function(e) {
                            27 === e.keyCode && l(t)
                        }), $(e).on("click.siteNav", function() {
                            l(t)
                        })
                    }, 250))
                }), $(i).on("focusout.siteNav", function() {
                    setTimeout(function() {
                        !$(document.activeElement).hasClass("site-nav__child-link") && c.$activeDropdown.length && l(c.$activeDropdown)
                    })
                }), c.$topLevel.on("focus.siteNav", function() {
                    c.$activeDropdown.length && l(c.$activeDropdown)
                }), c.$subMenuLinks.on("click.siteNav", function(e) {
                    e.stopImmediatePropagation()
                }), $("[data-currency-selector]").on("change", function() {
                    $(this).parents("form").submit()
                }), $(window).resize($.debounce(50, function() {
                    f($(n)), p()
                }))
            },
            unload: function() {
                $(window).off(".siteNav"), c.$parents.off(".siteNav"), c.$subMenuLinks.off(".siteNav"), c.$topLevel.off(".siteNav"), $(i).off(".siteNav"), $(e).off(".siteNav")
            }
        }
    }(), window.theme = window.theme || {}, theme.MobileNav = function() {
        var e, t, n, r = {
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
            o = {},
            i = 1;

        function a() {
            var e;
            o.$mobileNavToggle.hasClass(r.mobileNavCloseIcon) ? s() : (e = o.$siteHeader.outerHeight(), o.$mobileNavContainer.prepareTransition().addClass(r.navOpen), /*o.$mobileNavContainer.css({
                transform: "translateY(" + e + "px)"
            }), o.$pageContainer.css({
                transform: "translate3d(0, " + o.$mobileNavContainer[0].scrollHeight + "px, 0)"
            }),*/ o.$bodyContainer.addClass(r.mobileNavOpenBody), slate.a11y.trapFocus({
                $container: o.$sectionHeader,
                $elementToFocus: o.$mobileNavToggle,
                namespace: "navFocus"
            }), o.$mobileNavToggle.addClass(r.mobileNavCloseIcon).removeClass(r.mobileNavOpenIcon).attr("aria-expanded", !0), $(window).on("keyup.mobileNav", function(e) {
                27 === e.which && s()
            }))
        }

        function s() {
            o.$mobileNavContainer.prepareTransition().removeClass(r.navOpen), /*o.$mobileNavContainer.css({
                transform: "translateY(-100%)"
            }), o.$pageContainer.removeAttr("style"),*/ o.$bodyContainer.removeClass(r.mobileNavOpenBody), slate.a11y.trapFocus({
                $container: $("html"),
                $elementToFocus: $("body")
            }), o.$mobileNavContainer.one("TransitionEnd.navToggle webkitTransitionEnd.navToggle transitionend.navToggle oTransitionEnd.navToggle", function() {
                slate.a11y.removeTrapFocus({
                    $container: o.$mobileNav,
                    namespace: "navFocus"
                })
            }), o.$mobileNavToggle.addClass(r.mobileNavOpenIcon).removeClass(r.mobileNavCloseIcon).attr("aria-expanded", !1).focus(), $(window).off("keyup.mobileNav"), scrollTo(0, 0)
        }

        function u(a) {
            var s;
            e || (a = (s = $(a.currentTarget)).hasClass(r.return), e = !0, a ? ($("." + r.subNavToggleBtn + '[data-level="' + (i - 1) + '"]').removeClass(r.subNavActive), n && n.length && n.removeClass(r.subNavActive)) : s.addClass(r.subNavActive), function(n) {
                var a = n ? $('.mobile-nav__dropdown[data-parent="' + n + '"]') : o.$mobileNav;
                i = a.data("level") ? a.data("level") : 1, t && t.length && t.prepareTransition().addClass(r.subNavClosing);
                var s = (t = a).outerHeight(),
                    u = 2 < i ? r.thirdNavShowing : r.subNavShowing;
                o.$mobileNavContainer.css("height", s).removeClass(r.thirdNavShowing).addClass(u), n || o.$mobileNavContainer.removeClass(r.thirdNavShowing).removeClass(r.subNavShowing);
                var c = 1 === i ? o.$sectionHeader : a,
                    l = a.find("[data-menu-title=" + i + "]") || a;
                o.$mobileNavContainer.one("TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle", function() {
                    slate.a11y.trapFocus({
                        $container: c,
                        $elementToFocus: l,
                        namespace: "subNavFocus"
                    }), o.$mobileNavContainer.off(".subnavToggle"), e = !1
                }), /*o.$pageContainer.css({
                    transform: "translateY(" + s + "px)"
                }),*/ t.removeClass(r.subNavClosing)
            }((n = s).data("target")))
        }
        return {
            init: function() {
                (o = {
                    $pageContainer: $("#PageContainer"),
                    $bodyContainer: $("body"),
                    $siteHeader: $(".site-header"),
                    $mobileNavToggle: $(".js-mobile-nav-toggle, .mobile-nav-wrapper .menu-mobile-close"),
                    $mobileNavContainer: $(".mobile-nav-wrapper"),
                    $mobileNav: $("#MobileNav"),
                    $sectionHeader: $("#shopify-section-header"),
                    $subNavToggleBtn: $("." + r.subNavToggleBtn)
                }).$mobileNavToggle.on("click", a), o.$subNavToggleBtn.on("click.subNav", u), enquire.register("screen and (max-width: 749px)", {
                    unmatch: function() {
                        o.$mobileNavContainer.hasClass(r.navOpen) && s()
                    }
                })
            },
            closeMobileNav: s
        }
    }(jQuery), window.theme = window.theme || {}, theme.Search = function() {
        var e = ".site-header",
            t = ".site-header__search-toggle";

        function n() {
            r($(".search-bar__input")), $(".mobile-nav-wrapper").hasClass("js-menu--is-open") && theme.MobileNav.closeMobileNav()
        }

        function r(e) {
            e.focus(), e[0].setSelectionRange(0, e[0].value.length)
        }

        function o() {
            $(t).focus()
        }

        function i(e) {
            0 === this.$searchResultInput.val().trim().length ? (void 0 !== e && e.preventDefault(), r(this.$searchResultInput), function() {
                this.$searchErrorMessage.removeClass("hide"), this.$searchResultInput.attr("aria-describedby", "error-search-form").attr("aria-invalid", !0)
            }.call(this)) : function() {
                this.$searchErrorMessage.addClass("hide"), this.$searchResultInput.removeAttr("aria-describedby").removeAttr("aria-invalid")
            }.call(this)
        }
        return {
            init: function() {
                $(e).length && (this.$searchResultInput = $("#SearchInput"), this.$searchErrorMessage = $("[data-search-error-message]"), $("#PageContainer").addClass("drawer-page-content"), $(".js-drawer-open-top").attr("aria-controls", "SearchDrawer").attr("aria-expanded", "false").attr("aria-haspopup", "dialog"), theme.SearchDrawer = new theme.Drawers("SearchDrawer", "top", {
                    onDrawerOpen: n,
                    onDrawerClose: o
                }), null !== slate.utils.getParameterByName("q") && $("body").hasClass("template-search") && i.call(this), $("#SearchResultSubmit").on("click", i.bind(this)), $(".search-header__input").add(".search-header__submit").on("focus blur", function() {
                    $(".search-header").toggleClass("search--focus")
                }), $(t).on("click", function() {
                    var t = $(e).outerHeight(),
                        n = $(e).offset().top - t;
                    $(".search-bar").css({
                        height: t + "px",
                        top: n + "px"
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
            return e.preventDefault(), e = t(document.referrer), t(window.location.href) === e && history.back(), !1
        })
    }(), window.theme = window.theme || {}, theme.FormStatus = {
        init: function() {
            this.$statusMessage = $("[data-form-status]"), this.$statusMessage && (this.$statusMessage.attr("tabindex", -1).focus(), this.$statusMessage.on("blur", function() {
                this.$statusMessage.removeAttr("tabindex")
            }.bind(this)))
        }
    }, window.theme = window.theme || {}, theme.HeaderSection = function() {
        function e() {
            theme.Header.init(), theme.MobileNav.init(), theme.Search.init()
        }
        return e.prototype = _.assignIn({}, e.prototype, {
            onUnload: function() {
                theme.Header.unload()
            }
        }), e
    }(), $(document).ready(function() {
        (new theme.Sections).register("header-section", theme.HeaderSection)
    }), $(document).ready(function() {
        $("ul.tabs").each(function() {
            var e = $(this).find("a"),
                t = e.first().addClass("active"),
                n = $(t.attr("href"));
            e.not(":first").each(function() {
                $($(this).attr("href")).hide()
            }), $(this).find("a").click(function(e) {
                return t.removeClass("active"), n.hide(), t = $(this), n = $($(this).attr("href")), t.addClass("active"), n.show(), !1
            })
        })
    });
var Shopify = Shopify || {};
Shopify.money_format = "${{amount}}", Shopify.formatMoney = function(e, t) {
    "string" == typeof e && (e = e.replace(".", ""));
    var n = "",
        r = /\{\{\s*(\w+)\s*\}\}/;

    function o(e, t) {
        return void 0 === e ? t : e
    }

    function i(e, t, n, r) {
        return t = o(t, 2), n = o(n, ","), r = o(r, "."), isNaN(e) || null == e ? 0 : (e = (e = (e / 100).toFixed(t)).split("."))[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n) + (e[1] ? r + e[1] : "")
    }
    switch ((t = t || this.money_format).match(r)[1]) {
        case "amount":
            n = i(e, 2);
            break;
        case "amount_no_decimals":
            n = i(e, 0);
            break;
        case "amount_with_comma_separator":
            n = i(e, 2, ".", ",");
            break;
        case "amount_no_decimals_with_comma_separator":
            n = i(e, 0, ".", ",")
    }
    return t.replace(r, n)
};