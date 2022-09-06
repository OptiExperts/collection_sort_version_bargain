function testAnim(e) {
    $("#bounce").removeClass().addClass(e + " animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
        $(this).removeClass()
    })
}! function(e, t, i) {
    var n = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = i(n) : "function" == typeof define && define.amd ? define(function() {
        return t[e] = i(n)
    }) : t[e] = i(n)
}("enquire", this, function(n) {
    "use strict";

    function o(e, t) {
        for (var i = 0, n = e.length; i < n && !1 !== t(e[i], i); i++);
    }

    function r(e) {
        return "function" == typeof e
    }

    function t(e) {
        (this.options = e).deferSetup || this.setup()
    }

    function s(e, t) {
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
    }, s.prototype = {
        addHandler: function(e) {
            e = new t(e), this.handlers.push(e), this.matches() && e.on()
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
            return n[t] || (n[t] = new s(t, i)), r(e) && (e = {
                match: e
            }), "[object Array]" === Object.prototype.toString.apply(e) || (e = [e]), o(e, function(e) {
                r(e) && (e = {
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
}("undefined" != typeof window ? window : this, function(k, e) {
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
            return -1 < V.call(i, e) !== n
        })
    }

    function i(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function n() {
        R.removeEventListener("DOMContentLoaded", n), k.removeEventListener("load", n), J.ready()
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
                ve.set(e, t, i)
            } else i = void 0;
        return i
    }

    function c(e, t, i, n) {
        var o, r = 1,
            s = 20,
            a = n ? function() {
                return n.cur()
            } : function() {
                return J.css(e, t, "")
            },
            l = a(),
            c = i && i[3] || (J.cssNumber[t] ? "" : "px"),
            d = (J.cssNumber[t] || "px" !== c && +l) && ke.exec(J.css(e, t));
        if (d && d[3] !== c)
            for (c = c || d[3], i = i || [], d = +l || 1; d /= r = r || ".5", J.style(e, t, d + c), r !== (r = a() / l) && 1 !== r && --s;);
        return i && (d = +d || +l || 0, o = i[1] ? d + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = d, n.end = o)), o
    }

    function m(e, t) {
        var i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && J.nodeName(e, t) ? J.merge([e], i) : i
    }

    function f(e, t) {
        for (var i = 0, n = e.length; i < n; i++) ge.set(e[i], "globalEval", !t || ge.get(t[i], "globalEval"))
    }

    function g(e, t, i, n, o) {
        for (var r, s, a, l, c, d = t.createDocumentFragment(), u = [], p = 0, h = e.length; p < h; p++)
            if ((r = e[p]) || 0 === r)
                if ("object" === J.type(r)) J.merge(u, r.nodeType ? [r] : r);
                else if (Pe.test(r)) {
            for (s = s || d.appendChild(t.createElement("div")), a = (xe.exec(r) || ["", ""])[1].toLowerCase(), a = _e[a] || _e._default, s.innerHTML = a[1] + J.htmlPrefilter(r) + a[2], c = a[0]; c--;) s = s.lastChild;
            J.merge(u, s.childNodes), (s = d.firstChild).textContent = ""
        } else u.push(t.createTextNode(r));
        for (d.textContent = "", p = 0; r = u[p++];)
            if (n && -1 < J.inArray(r, n)) o && o.push(r);
            else if (l = J.contains(r.ownerDocument, r), s = m(d.appendChild(r), "script"), l && f(s), i)
            for (c = 0; r = s[c++];) Se.test(r.type || "") && i.push(r);
        return d
    }

    function r() {
        return !0
    }

    function d() {
        return !1
    }

    function s() {
        try {
            return R.activeElement
        } catch (e) {}
    }

    function u(e, t, i, n, o, r) {
        var s, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof i && (n = n || i, i = void 0), t) u(e, a, i, n, t[a], r);
            return e
        }
        if (null == n && null == o ? (o = i, n = i = void 0) : null == o && ("string" == typeof i ? (o = n, n = void 0) : (o = n, n = i, i = void 0)), !1 === o) o = d;
        else if (!o) return e;
        return 1 === r && (s = o, (o = function(e) {
            return J().off(e), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = J.guid++)), e.each(function() {
            J.event.add(this, t, o, n, i)
        })
    }

    function p(e, t) {
        return J.nodeName(e, "table") && J.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function v(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function y(e) {
        var t = De.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function h(e, t) {
        var i, n, o, r, s, a;
        if (1 === t.nodeType) {
            if (ge.hasData(e) && (r = ge.access(e), s = ge.set(t, r), a = r.events))
                for (o in delete s.handle, s.events = {}, a)
                    for (i = 0, n = a[o].length; i < n; i++) J.event.add(t, o, a[o][i]);
            ve.hasData(e) && (e = ve.access(e), e = J.extend({}, e), ve.set(t, e))
        }
    }

    function w(i, n, o, r) {
        n = U.apply([], n);
        var e, t, s, a, l, c, d = 0,
            u = i.length,
            p = u - 1,
            h = n[0],
            f = J.isFunction(h);
        if (f || 1 < u && "string" == typeof h && !K.checkClone && Le.test(h)) return i.each(function(e) {
            var t = i.eq(e);
            f && (n[0] = h.call(this, e, t.html())), w(t, n, o, r)
        });
        if (u && (t = (e = g(n, i[0].ownerDocument, !1, i, r)).firstChild, 1 === e.childNodes.length && (e = t), t || r)) {
            for (a = (s = J.map(m(e, "script"), v)).length; d < u; d++) l = e, d !== p && (l = J.clone(l, !0, !0), a && J.merge(s, m(l, "script"))), o.call(i[d], l, d);
            if (a)
                for (c = s[s.length - 1].ownerDocument, J.map(s, y), d = 0; d < a; d++) l = s[d], Se.test(l.type || "") && !ge.access(l, "globalEval") && J.contains(c, l) && (l.src ? J._evalUrl && J._evalUrl(l.src) : J.globalEval(l.textContent.replace(Ne, "")))
        }
        return i
    }

    function b(e, t, i) {
        for (var n, o = t ? J.filter(t, e) : e, r = 0; null != (n = o[r]); r++) i || 1 !== n.nodeType || J.cleanData(m(n)), n.parentNode && (i && J.contains(n.ownerDocument, n) && f(m(n, "script")), n.parentNode.removeChild(n));
        return e
    }

    function $(e, t) {
        return e = J(t.createElement(e)).appendTo(t.body), t = J.css(e[0], "display"), e.detach(), t
    }

    function C(e) {
        var t = R,
            i = Ue[e];
        return i || ("none" !== (i = $(e, t)) && i || ((t = (Me = (Me || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), t.close(), i = $(e, t), Me.detach()), Ue[e] = i), i
    }

    function T(e, t, i) {
        var n, o, r = e.style;
        return "" !== (o = (i = i || Qe(e)) ? i.getPropertyValue(t) || i[t] : void 0) && void 0 !== o || J.contains(e.ownerDocument, e) || (o = J.style(e, t)), i && !K.pixelMarginRight() && Ve.test(o) && Xe.test(t) && (n = r.width, e = r.minWidth, t = r.maxWidth, r.minWidth = r.maxWidth = r.width = o, o = i.width, r.width = n, r.minWidth = e, r.maxWidth = t), void 0 !== o ? o + "" : o
    }

    function x(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function S(e) {
        if (e in tt) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), i = et.length; i--;)
            if ((e = et[i] + t) in tt) return e
    }

    function _(e, t, i) {
        var n = ke.exec(t);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t
    }

    function P(e, t, i, n, o) {
        for (var r = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; r < 4; r += 2) "margin" === i && (s += J.css(e, i + Ce[r], !0, o)), n ? ("content" === i && (s -= J.css(e, "padding" + Ce[r], !0, o)), "margin" !== i && (s -= J.css(e, "border" + Ce[r] + "Width", !0, o))) : (s += J.css(e, "padding" + Ce[r], !0, o), "padding" !== i && (s += J.css(e, "border" + Ce[r] + "Width", !0, o)));
        return s
    }

    function E(e, t, i) {
        var n = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            r = Qe(e),
            s = "border-box" === J.css(e, "boxSizing", !1, r);
        if (R.msFullscreenElement && k.top !== k && e.getClientRects().length && (o = Math.round(100 * e.getBoundingClientRect()[t])), o <= 0 || null == o) {
            if (((o = T(e, t, r)) < 0 || null == o) && (o = e.style[t]), Ve.test(o)) return o;
            n = s && (K.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + P(e, t, i || (s ? "border" : "content"), n, r) + "px"
    }

    function A(e, t) {
        for (var i, n, o, r = [], s = 0, a = e.length; s < a; s++)(n = e[s]).style && (r[s] = ge.get(n, "olddisplay"), i = n.style.display, t ? (r[s] || "none" !== i || (n.style.display = ""), "" === n.style.display && be(n) && (r[s] = ge.access(n, "olddisplay", C(n.nodeName)))) : (o = be(n), "none" === i && o || ge.set(n, "olddisplay", o ? i : J.css(n, "display"))));
        for (s = 0; s < a; s++)(n = e[s]).style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? r[s] || "" : "none"));
        return e
    }

    function I(e, t, i, n, o) {
        return new I.prototype.init(e, t, i, n, o)
    }

    function O() {
        return k.setTimeout(function() {
            it = void 0
        }), it = J.now()
    }

    function j(e, t) {
        var i, n = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; n < 4; n += 2 - t) o["margin" + (i = Ce[n])] = o["padding" + i] = e;
        return t && (o.opacity = o.width = e), o
    }

    function L(e, t, i) {
        for (var n, o = (D.tweeners[t] || []).concat(D.tweeners["*"]), r = 0, s = o.length; r < s; r++)
            if (n = o[r].call(i, t, e)) return n
    }

    function D(o, e, t) {
        var i, r, n = 0,
            s = D.prefilters.length,
            a = J.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var e = it || O(), t = 1 - ((e = Math.max(0, c.startTime + c.duration - e)) / c.duration || 0), i = 0, n = c.tweens.length; i < n; i++) c.tweens[i].run(t);
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
                startTime: it || O(),
                duration: t.duration,
                tweens: [],
                createTween: function(e, t) {
                    return e = J.Tween(o, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing), c.tweens.push(e), e
                },
                stop: function(e) {
                    var t = 0,
                        i = e ? c.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; t < i; t++) c.tweens[t].run(1);
                    return e ? (a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c, e])) : a.rejectWith(o, [c, e]), this
                }
            }),
            d = c.props;
        for (function(e, t) {
                var i, n, o, r, s;
                for (i in e)
                    if (o = t[n = J.camelCase(i)], r = e[i], J.isArray(r) && (o = r[1], r = e[i] = r[0]), i !== n && (e[n] = r, delete e[i]), (s = J.cssHooks[n]) && "expand" in s)
                        for (i in r = s.expand(r), delete e[n], r) i in e || (e[i] = r[i], t[i] = o);
                    else t[n] = o
            }(d, c.opts.specialEasing); n < s; n++)
            if (i = D.prefilters[n].call(c, o, d, c.opts)) return J.isFunction(i.stop) && (J._queueHooks(c.elem, c.opts.queue).stop = J.proxy(i.stop, i)), i;
        return J.map(d, L, c), J.isFunction(c.opts.start) && c.opts.start.call(o, c), J.fx.timer(J.extend(l, {
            elem: o,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function N(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function H(r) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var i, n = 0,
                o = e.toLowerCase().match(he) || [];
            if (J.isFunction(t))
                for (; i = o[n++];) "+" === i[0] ? (i = i.slice(1) || "*", (r[i] = r[i] || []).unshift(t)) : (r[i] = r[i] || []).push(t)
        }
    }

    function M(t, n, o, r) {
        function s(e) {
            var i;
            return a[e] = !0, J.each(t[e] || [], function(e, t) {
                return "string" != typeof(t = t(n, o, r)) || l || a[t] ? l ? !(i = t) : void 0 : (n.dataTypes.unshift(t), s(t), !1)
            }), i
        }
        var a = {},
            l = t === Ct;
        return s(n.dataTypes[0]) || !a["*"] && s("*")
    }

    function q(e, t) {
        var i, n, o = J.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((o[i] ? e : n = n || {})[i] = t[i]);
        return n && J.extend(!0, e, n), e
    }

    function z(e) {
        return J.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    function F(e, t) {
        return t.toUpperCase()
    }
    var W = [],
        R = k.document,
        B = W.slice,
        U = W.concat,
        X = W.push,
        V = W.indexOf,
        Q = {},
        Y = Q.toString,
        G = Q.hasOwnProperty,
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
            return (e = J.merge(this.constructor(), e)).prevObject = this, e.context = this.context, e
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
        var e, t, i, n, o, r = arguments[0] || {},
            s = 1,
            a = arguments.length,
            l = !1;
        for ("boolean" == typeof r && (l = r, r = arguments[s] || {}, s++), "object" == typeof r || J.isFunction(r) || (r = {}), s === a && (r = this, s--); s < a; s++)
            if (null != (e = arguments[s]))
                for (t in e) o = r[t], r !== (i = e[t]) && (l && i && (J.isPlainObject(i) || (n = J.isArray(i))) ? (o = n ? (n = !1, o && J.isArray(o) ? o : []) : o && J.isPlainObject(o) ? o : {}, r[t] = J.extend(l, o, i)) : void 0 !== i && (r[t] = i));
        return r
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
            if (e.constructor && !G.call(e, "constructor") && !G.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
            for (var t in e);
            return void 0 === t || G.call(e, t)
        },
        isEmptyObject: function(e) {
            for (var t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Q[Y.call(e)] || "object" : typeof e
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
            return t = t || [], null != e && (a(Object(e)) ? J.merge(t, "string" == typeof e ? [e] : e) : X.call(t, e)), t
        },
        inArray: function(e, t, i) {
            return null == t ? -1 : V.call(t, e, i)
        },
        merge: function(e, t) {
            for (var i = +t.length, n = 0, o = e.length; n < i; n++) e[o++] = t[n];
            return e.length = o, e
        },
        grep: function(e, t, i) {
            for (var n = [], o = 0, r = e.length, s = !i; o < r; o++) !t(e[o], o) != s && n.push(e[o]);
            return n
        },
        map: function(e, t, i) {
            var n, o, r = 0,
                s = [];
            if (a(e))
                for (n = e.length; r < n; r++) null != (o = t(e[r], r, i)) && s.push(o);
            else
                for (r in e) null != (o = t(e[r], r, i)) && s.push(o);
            return U.apply([], s)
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
        Q["[object " + t + "]"] = t.toLowerCase()
    });
    var ie = function(i) {
        function b(e, t, i, n) {
            var o, r, s, a, l, c, d, u, p = t && t.ownerDocument,
                h = t ? t.nodeType : 9;
            if (i = i || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return i;
            if (!n && ((t ? t.ownerDocument || t : H) !== E && P(t), t = t || E, I)) {
                if (11 !== h && (c = pe.exec(e)))
                    if (o = c[1]) {
                        if (9 === h) {
                            if (!(s = t.getElementById(o))) return i;
                            if (s.id === o) return i.push(s), i
                        } else if (p && (s = p.getElementById(o)) && D(t, s) && s.id === o) return i.push(s), i
                    } else {
                        if (c[2]) return Q.apply(i, t.getElementsByTagName(e)), i;
                        if ((o = c[3]) && g.getElementsByClassName && t.getElementsByClassName) return Q.apply(i, t.getElementsByClassName(o)), i
                    } if (g.qsa && !W[e + " "] && (!O || !O.test(e))) {
                    if (1 !== h) p = t, u = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(fe, "\\$&") : t.setAttribute("id", a = N), r = (d = x(e)).length, l = ae.test(a) ? "#" + a : "[id='" + a + "']"; r--;) d[r] = l + " " + m(d[r]);
                        u = d.join(","), p = he.test(e) && f(t.parentNode) || t
                    }
                    if (u) try {
                        return Q.apply(i, p.querySelectorAll(u)), i
                    } catch (e) {} finally {
                        a === N && t.removeAttribute("id")
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
            return e[N] = !0, e
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

        function o(s) {
            return p(function(r) {
                return r = +r, p(function(e, t) {
                    for (var i, n = s([], e.length, r), o = n.length; o--;) e[i = n[o]] && (e[i] = !(t[i] = e[i]))
                })
            })
        }

        function f(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }

        function r() {}

        function m(e) {
            for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
            return n
        }

        function h(s, e, t) {
            var a = e.dir,
                l = t && "parentNode" === a,
                c = q++;
            return e.first ? function(e, t, i) {
                for (; e = e[a];)
                    if (1 === e.nodeType || l) return s(e, t, i)
            } : function(e, t, i) {
                var n, o, r = [M, c];
                if (i) {
                    for (; e = e[a];)
                        if ((1 === e.nodeType || l) && s(e, t, i)) return !0
                } else
                    for (; e = e[a];)
                        if (1 === e.nodeType || l) {
                            if ((o = (n = (o = e[N] || (e[N] = {}))[e.uniqueID] || (o[e.uniqueID] = {}))[a]) && o[0] === M && o[1] === c) return r[2] = o[2];
                            if ((n[a] = r)[2] = s(e, t, i)) return !0
                        }
            }
        }

        function $(o) {
            return 1 < o.length ? function(e, t, i) {
                for (var n = o.length; n--;)
                    if (!o[n](e, t, i)) return !1;
                return !0
            } : o[0]
        }

        function k(e, t, i, n, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)(r = e[a]) && (i && !i(r, n, o) || (s.push(r), c && t.push(a)));
            return s
        }

        function u(e, t, i) {
            var n = "0x" + t - 65536;
            return n != n || i ? t : n < 0 ? String.fromCharCode(65536 + n) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        }

        function s() {
            P()
        }

        function C(e, t) {
            for (var i = 0, n = e.length; i < n; i++)
                if (e[i] === t) return i;
            return -1
        }
        var a, g, T, c, d, x, v, y, S, w, _, P, E, A, I, O, j, L, D, N = "sizzle" + +new Date,
            H = i.document,
            M = 0,
            q = 0,
            z = e(),
            F = e(),
            W = e(),
            R = function(e, t) {
                return e === t && (_ = !0), 0
            },
            B = {}.hasOwnProperty,
            U = [],
            X = U.pop,
            V = U.push,
            Q = U.push,
            Y = U.slice,
            G = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            K = "[\\x20\\t\\r\\n\\f]",
            J = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            Z = "\\[" + K + "*(" + J + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + J + "))|)" + K + "*\\]",
            ee = ":(" + J + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + Z + ")*)|.*)\\)|)",
            te = new RegExp(K + "+", "g"),
            ie = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
            ne = new RegExp("^" + K + "*," + K + "*"),
            oe = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
            re = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
            se = new RegExp(ee),
            ae = new RegExp("^" + J + "$"),
            le = {
                ID: new RegExp("^#(" + J + ")"),
                CLASS: new RegExp("^\\.(" + J + ")"),
                TAG: new RegExp("^(" + J + "|[*])"),
                ATTR: new RegExp("^" + Z),
                PSEUDO: new RegExp("^" + ee),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + G + ")$", "i"),
                needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i")
            },
            ce = /^(?:input|select|textarea|button)$/i,
            de = /^h\d$/i,
            ue = /^[^{]+\{\s*\[native \w/,
            pe = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            he = /[+~]/,
            fe = /'|\\/g,
            me = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig");
        try {
            Q.apply(U = Y.call(H.childNodes), H.childNodes), U[H.childNodes.length].nodeType
        } catch (i) {
            Q = {
                apply: U.length ? function(e, t) {
                    V.apply(e, Y.call(t))
                } : function(e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++];);
                    e.length = i - 1
                }
            }
        }
        for (a in g = b.support = {}, d = b.isXML = function(e) {
                return !!(e = e && (e.ownerDocument || e).documentElement) && "HTML" !== e.nodeName
            }, P = b.setDocument = function(e) {
                return (e = e ? e.ownerDocument || e : H) !== E && 9 === e.nodeType && e.documentElement && (A = (E = e).documentElement, I = !d(E), (e = E.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", s, !1) : e.attachEvent && e.attachEvent("onunload", s)), g.attributes = t(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), g.getElementsByTagName = t(function(e) {
                    return e.appendChild(E.createComment("")), !e.getElementsByTagName("*").length
                }), g.getElementsByClassName = ue.test(E.getElementsByClassName), g.getById = t(function(e) {
                    return A.appendChild(e).id = N, !E.getElementsByName || !E.getElementsByName(N).length
                }), g.getById ? (T.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && I) return (e = t.getElementById(e)) ? [e] : []
                }, T.filter.ID = function(e) {
                    var t = e.replace(me, u);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete T.find.ID, T.filter.ID = function(e) {
                    var t = e.replace(me, u);
                    return function(e) {
                        return (e = void 0 !== e.getAttributeNode && e.getAttributeNode("id")) && e.value === t
                    }
                }), T.find.TAG = g.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : g.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var i, n = [],
                        o = 0,
                        r = t.getElementsByTagName(e);
                    if ("*" !== e) return r;
                    for (; i = r[o++];) 1 === i.nodeType && n.push(i);
                    return n
                }, T.find.CLASS = g.getElementsByClassName && function(e, t) {
                    return void 0 !== t.getElementsByClassName && I ? t.getElementsByClassName(e) : void 0
                }, j = [], O = [], (g.qsa = ue.test(E.querySelectorAll)) && (t(function(e) {
                    A.appendChild(e).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + K + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || O.push("\\[" + K + "*(?:value|" + G + ")"), e.querySelectorAll("[id~=" + N + "-]").length || O.push("~="), e.querySelectorAll(":checked").length || O.push(":checked"), e.querySelectorAll("a#" + N + "+*").length || O.push(".#.+[+~]")
                }), t(function(e) {
                    var t = E.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && O.push("name" + K + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), O.push(",.*:")
                })), (g.matchesSelector = ue.test(L = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && t(function(e) {
                    g.disconnectedMatch = L.call(e, "div"), L.call(e, "[s!='']:x"), j.push("!=", ee)
                }), O = O.length && new RegExp(O.join("|")), j = j.length && new RegExp(j.join("|")), e = ue.test(A.compareDocumentPosition), D = e || ue.test(A.contains) ? function(e, t) {
                    var i = 9 === e.nodeType ? e.documentElement : e;
                    return e === (t = t && t.parentNode) || !(!t || 1 !== t.nodeType || !(i.contains ? i.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, R = e ? function(e, t) {
                    if (e === t) return _ = !0, 0;
                    var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !g.sortDetached && t.compareDocumentPosition(e) === i ? e === E || e.ownerDocument === H && D(H, e) ? -1 : t === E || t.ownerDocument === H && D(H, t) ? 1 : w ? C(w, e) - C(w, t) : 0 : 4 & i ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return _ = !0, 0;
                    var i, n = 0,
                        o = e.parentNode,
                        r = t.parentNode,
                        s = [e],
                        a = [t];
                    if (!o || !r) return e === E ? -1 : t === E ? 1 : o ? -1 : r ? 1 : w ? C(w, e) - C(w, t) : 0;
                    if (o === r) return l(e, t);
                    for (i = e; i = i.parentNode;) s.unshift(i);
                    for (i = t; i = i.parentNode;) a.unshift(i);
                    for (; s[n] === a[n];) n++;
                    return n ? l(s[n], a[n]) : s[n] === H ? -1 : a[n] === H ? 1 : 0
                }), E
            }, b.matches = function(e, t) {
                return b(e, null, null, t)
            }, b.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== E && P(e), t = t.replace(re, "='$1']"), g.matchesSelector && I && !W[t + " "] && (!j || !j.test(t)) && (!O || !O.test(t))) try {
                    var i = L.call(e, t);
                    if (i || g.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (e) {}
                return 0 < b(t, E, null, [e]).length
            }, b.contains = function(e, t) {
                return (e.ownerDocument || e) !== E && P(e), D(e, t)
            }, b.attr = function(e, t) {
                (e.ownerDocument || e) !== E && P(e);
                var i = T.attrHandle[t.toLowerCase()];
                return void 0 !== (i = i && B.call(T.attrHandle, t.toLowerCase()) ? i(e, t, !I) : void 0) ? i : g.attributes || !I ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, b.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, b.uniqueSort = function(e) {
                var t, i = [],
                    n = 0,
                    o = 0;
                if (_ = !g.detectDuplicates, w = !g.sortStable && e.slice(0), e.sort(R), _) {
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
                        return e[1] = e[1].replace(me, u), e[3] = (e[3] || e[4] || e[5] || "").replace(me, u), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || b.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && b.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, i = !e[6] && e[2];
                        return le.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && se.test(i) && (t = x(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(me, u).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = z[e + " "];
                        return t || (t = new RegExp("(^|" + K + ")" + e + "(" + K + "|$)")) && z(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, i, n) {
                        return function(e) {
                            return null == (e = b.attr(e, t)) ? "!=" === i : !i || (e += "", "=" === i ? e === n : "!=" === i ? e !== n : "^=" === i ? n && 0 === e.indexOf(n) : "*=" === i ? n && -1 < e.indexOf(n) : "$=" === i ? n && e.slice(-n.length) === n : "~=" === i ? -1 < (" " + e.replace(te, " ") + " ").indexOf(n) : "|=" === i && (e === n || e.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(f, e, t, m, g) {
                        var v = "nth" !== f.slice(0, 3),
                            y = "last" !== f.slice(-4),
                            w = "of-type" === e;
                        return 1 === m && 0 === g ? function(e) {
                            return !!e.parentNode
                        } : function(e, t, i) {
                            var n, o, r, s, a, l, c = v != y ? "nextSibling" : "previousSibling",
                                d = e.parentNode,
                                u = w && e.nodeName.toLowerCase(),
                                p = !i && !w,
                                h = !1;
                            if (d) {
                                if (v) {
                                    for (; c;) {
                                        for (s = e; s = s[c];)
                                            if (w ? s.nodeName.toLowerCase() === u : 1 === s.nodeType) return !1;
                                        l = c = "only" === f && !l && "nextSibling"
                                    }
                                    return !0
                                }
                                if (l = [y ? d.firstChild : d.lastChild], y && p) {
                                    for (h = (a = (n = (o = (r = (s = d)[N] || (s[N] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[f] || [])[0] === M && n[1]) && n[2], s = a && d.childNodes[a]; s = ++a && s && s[c] || (h = a = 0) || l.pop();)
                                        if (1 === s.nodeType && ++h && s === e) {
                                            o[f] = [M, a, h];
                                            break
                                        }
                                } else if (p && (h = a = (n = (o = (r = (s = e)[N] || (s[N] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[f] || [])[0] === M && n[1]), !1 === h)
                                    for (;
                                        (s = ++a && s && s[c] || (h = a = 0) || l.pop()) && ((w ? s.nodeName.toLowerCase() !== u : 1 !== s.nodeType) || !++h || (p && ((o = (r = s[N] || (s[N] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[f] = [M, h]), s !== e)););
                                return (h -= g) === m || h % m == 0 && 0 <= h / m
                            }
                        }
                    },
                    PSEUDO: function(e, r) {
                        var t, s = T.pseudos[e] || T.setFilters[e.toLowerCase()] || b.error("unsupported pseudo: " + e);
                        return s[N] ? s(r) : 1 < s.length ? (t = [e, e, "", r], T.setFilters.hasOwnProperty(e.toLowerCase()) ? p(function(e, t) {
                            for (var i, n = s(e, r), o = n.length; o--;) e[i = C(e, n[o])] = !(t[i] = n[o])
                        }) : function(e) {
                            return s(e, 0, t)
                        }) : s
                    }
                },
                pseudos: {
                    not: p(function(e) {
                        var n = [],
                            o = [],
                            a = v(e.replace(ie, "$1"));
                        return a[N] ? p(function(e, t, i, n) {
                            for (var o, r = a(e, null, n, []), s = e.length; s--;)(o = r[s]) && (e[s] = !(t[s] = o))
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
                        return t = t.replace(me, u),
                            function(e) {
                                return -1 < (e.textContent || e.innerText || c(e)).indexOf(t)
                            }
                    }),
                    lang: p(function(i) {
                        return ae.test(i || "") || b.error("unsupported lang: " + i), i = i.replace(me, u).toLowerCase(),
                            function(e) {
                                var t;
                                do {
                                    if (t = I ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === i || 0 === t.indexOf(i + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var t = i.location && i.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function(e) {
                        return e === A
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
        return r.prototype = T.filters = T.pseudos, T.setFilters = new r, x = b.tokenize = function(e, t) {
            var i, n, o, r, s, a, l, c = F[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (s = e, a = [], l = T.preFilter; s;) {
                for (r in i && !(n = ne.exec(s)) || (n && (s = s.slice(n[0].length) || s), a.push(o = [])), i = !1, (n = oe.exec(s)) && (i = n.shift(), o.push({
                        value: i,
                        type: n[0].replace(ie, " ")
                    }), s = s.slice(i.length)), T.filter) !(n = le[r].exec(s)) || l[r] && !(n = l[r](n)) || (i = n.shift(), o.push({
                    value: i,
                    type: r,
                    matches: n
                }), s = s.slice(i.length));
                if (!i) break
            }
            return t ? s.length : s ? b.error(e) : F(e, a).slice(0)
        }, v = b.compile = function(e, t) {
            var i, g, v, y, w, n = [],
                o = [],
                r = W[e + " "];
            if (!r) {
                for (i = (t = t || x(e)).length; i--;)((r = function e(t) {
                    for (var n, i, o, r = t.length, s = T.relative[t[0].type], a = s || T.relative[" "], l = s ? 1 : 0, c = h(function(e) {
                            return e === n
                        }, a, !0), d = h(function(e) {
                            return -1 < C(n, e)
                        }, a, !0), u = [function(e, t, i) {
                            return i = !s && (i || t !== S) || ((n = t).nodeType ? c : d)(e, t, i), n = null, i
                        }]; l < r; l++)
                        if (i = T.relative[t[l].type]) u = [h($(u), i)];
                        else {
                            if ((i = T.filter[t[l].type].apply(null, t[l].matches))[N]) {
                                for (o = ++l; o < r && !T.relative[t[o].type]; o++);
                                return function e(h, f, m, g, v, t) {
                                    return g && !g[N] && (g = e(g)), v && !v[N] && (v = e(v, t)), p(function(e, t, i, n) {
                                        var o, r, s, a = [],
                                            l = [],
                                            c = t.length,
                                            d = e || function(e, t, i) {
                                                for (var n = 0, o = t.length; n < o; n++) b(e, t[n], i);
                                                return i
                                            }(f || "*", i.nodeType ? [i] : i, []),
                                            u = !h || !e && f ? d : k(d, a, h, i, n),
                                            p = m ? v || (e ? h : c || g) ? [] : t : u;
                                        if (m && m(u, p, i, n), g)
                                            for (o = k(p, l), g(o, [], i, n), r = o.length; r--;)(s = o[r]) && (p[l[r]] = !(u[l[r]] = s));
                                        if (e) {
                                            if (v || h) {
                                                if (v) {
                                                    for (o = [], r = p.length; r--;)(s = p[r]) && o.push(u[r] = s);
                                                    v(null, p = [], o, n)
                                                }
                                                for (r = p.length; r--;)(s = p[r]) && -1 < (o = v ? C(e, s) : a[r]) && (e[o] = !(t[o] = s))
                                            }
                                        } else p = k(p === t ? p.splice(c, p.length) : p), v ? v(null, t, p, n) : Q.apply(t, p)
                                    })
                                }(1 < l && $(u), 1 < l && m(t.slice(0, l - 1).concat({
                                    value: " " === t[l - 2].type ? "*" : ""
                                })).replace(ie, "$1"), i, l < o && e(t.slice(l, o)), o < r && e(t = t.slice(o)), o < r && m(t))
                            }
                            u.push(i)
                        } return $(u)
                }(t[i]))[N] ? n : o).push(r);
                (r = W(e, (y = 0 < (v = n).length, w = 0 < (g = o).length, y ? p(s) : s))).selector = e
            }

            function s(e, t, i, n, o) {
                var r, s, a, l = 0,
                    c = "0",
                    d = e && [],
                    u = [],
                    p = S,
                    h = e || w && T.find.TAG("*", o),
                    f = M += null == p ? 1 : Math.random() || .1,
                    m = h.length;
                for (o && (S = t === E || t || o); c !== m && null != (r = h[c]); c++) {
                    if (w && r) {
                        for (s = 0, t || r.ownerDocument === E || (P(r), i = !I); a = g[s++];)
                            if (a(r, t || E, i)) {
                                n.push(r);
                                break
                            } o && (M = f)
                    }
                    y && ((r = !a && r) && l--, e && d.push(r))
                }
                if (l += c, y && c !== l) {
                    for (s = 0; a = v[s++];) a(d, u, t, i);
                    if (e) {
                        if (0 < l)
                            for (; c--;) d[c] || u[c] || (u[c] = X.call(n));
                        u = k(u)
                    }
                    Q.apply(n, u), o && !e && 0 < u.length && 1 < l + v.length && b.uniqueSort(n)
                }
                return o && (M = f, S = p), d
            }
            return r
        }, y = b.select = function(e, t, i, n) {
            var o, r, s, a, l, c = "function" == typeof e && e,
                d = !n && x(e = c.selector || e);
            if (i = i || [], 1 === d.length) {
                if (2 < (r = d[0] = d[0].slice(0)).length && "ID" === (s = r[0]).type && g.getById && 9 === t.nodeType && I && T.relative[r[1].type]) {
                    if (!(t = (T.find.ID(s.matches[0].replace(me, u), t) || [])[0])) return i;
                    c && (t = t.parentNode), e = e.slice(r.shift().value.length)
                }
                for (o = le.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !T.relative[a = s.type]);)
                    if ((l = T.find[a]) && (n = l(s.matches[0].replace(me, u), he.test(r[0].type) && f(t.parentNode) || t))) {
                        if (r.splice(o, 1), !(e = n.length && m(r))) return Q.apply(i, n), i;
                        break
                    }
            }
            return (c || v(e, d))(n, t, !I, i, !t || he.test(e) && f(t.parentNode) || t), i
        }, g.sortStable = N.split("").sort(R).join("") === N, g.detectDuplicates = !!_, P(), g.sortDetached = t(function(e) {
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
        }) || n(G, function(e, t, i) {
            return i ? void 0 : !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null
        }), b
    }(k);

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
    var re = J.expr.match.needsContext,
        se = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
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
            return !!t(this, "string" == typeof e && re.test(e) ? J(e) : e || [], !1).length
        }
    });
    var le, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (J.fn.init = function(e, t, i) {
        if (!e) return this;
        if (i = i || le, "string" != typeof e) return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : J.isFunction(e) ? void 0 !== i.ready ? i.ready(e) : e(J) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), J.makeArray(e, this));
        if (!(n = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : ce.exec(e)) || !n[1] && t) return (!t || t.jquery ? t || i : this.constructor(t)).find(e);
        if (n[1]) {
            if (t = t instanceof J ? t[0] : t, J.merge(this, J.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : R, !0)), se.test(n[1]) && J.isPlainObject(t))
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
            for (var i, n = 0, o = this.length, r = [], s = re.test(e) || "string" != typeof e ? J(e, t || this.context) : 0; n < o; n++)
                for (i = this[n]; i && i !== t; i = i.parentNode)
                    if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && J.find.matchesSelector(i, e))) {
                        r.push(i);
                        break
                    } return this.pushStack(1 < r.length ? J.uniqueSort(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? V.call(J(e), this[0]) : V.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(J.uniqueSort(J.merge(this.get(), J(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), J.each({
        parent: function(e) {
            return (e = e.parentNode) && 11 !== e.nodeType ? e : null
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
    var pe, he = /\S+/g;

    function fe(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }
    J.Callbacks = function(n) {
        var i;

        function o() {
            for (s = n.once, t = r = !0; l.length; c = -1)
                for (e = l.shift(); ++c < a.length;) !1 === a[c].apply(e[0], e[1]) && n.stopOnFalse && (c = a.length, e = !1);
            n.memory || (e = !1), r = !1, s && (a = e ? [] : "")
        }
        n = "string" == typeof n ? (i = {}, J.each(n.match(he) || [], function(e, t) {
            i[t] = !0
        }), i) : J.extend({}, n);
        var r, e, t, s, a = [],
            l = [],
            c = -1,
            d = {
                add: function() {
                    return a && (e && !r && (c = a.length - 1, l.push(e)), function i(e) {
                        J.each(e, function(e, t) {
                            J.isFunction(t) ? n.unique && d.has(t) || a.push(t) : t && t.length && "string" !== J.type(t) && i(t)
                        })
                    }(arguments), e && !r && o()), this
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
                    return s = l = [], a = e = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return s = l = [], e || (a = e = ""), this
                },
                locked: function() {
                    return !!s
                },
                fireWith: function(e, t) {
                    return s || (t = [e, (t = t || []).slice ? t.slice() : t], l.push(t), r || o()), this
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
            var r = [
                    ["resolve", "done", J.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", J.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", J.Callbacks("memory")]
                ],
                o = "pending",
                s = {
                    state: function() {
                        return o
                    },
                    always: function() {
                        return a.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var o = arguments;
                        return J.Deferred(function(n) {
                            J.each(r, function(e, t) {
                                var i = J.isFunction(o[e]) && o[e];
                                a[t[1]](function() {
                                    var e = i && i.apply(this, arguments);
                                    e && J.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[t[0] + "With"](this === s ? n.promise() : this, i ? [e] : arguments)
                                })
                            }), o = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? J.extend(e, s) : s
                    }
                },
                a = {};
            return s.pipe = s.then, J.each(r, function(e, t) {
                var i = t[2],
                    n = t[3];
                s[t[1]] = i.add, n && i.add(function() {
                    o = n
                }, r[1 ^ e][2].disable, r[2][2].lock), a[t[0]] = function() {
                    return a[t[0] + "With"](this === a ? s : this, arguments), this
                }, a[t[0] + "With"] = i.fireWith
            }), s.promise(a), e && e.call(a, a), a
        },
        when: function(e) {
            function t(t, i, n) {
                return function(e) {
                    i[t] = this, n[t] = 1 < arguments.length ? B.call(arguments) : e, n === o ? c.notifyWith(i, n) : --l || c.resolveWith(i, n)
                }
            }
            var o, i, n, r = 0,
                s = B.call(arguments),
                a = s.length,
                l = 1 !== a || e && J.isFunction(e.promise) ? a : 0,
                c = 1 === l ? e : J.Deferred();
            if (1 < a)
                for (o = new Array(a), i = new Array(a), n = new Array(a); r < a; r++) s[r] && J.isFunction(s[r].promise) ? s[r].promise().progress(t(r, i, o)).done(t(r, n, s)).fail(c.reject) : --l;
            return l || c.resolveWith(n, s), c.promise()
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
        return pe || (pe = J.Deferred(), "complete" === R.readyState || "loading" !== R.readyState && !R.documentElement.doScroll ? k.setTimeout(J.ready) : (R.addEventListener("DOMContentLoaded", n), k.addEventListener("load", n))), pe.promise(e)
    }, J.ready.promise();
    var me = function(e, t, i, n, o, r, s) {
        var a = 0,
            l = e.length,
            c = null == i;
        if ("object" === J.type(i))
            for (a in o = !0, i) me(e, t, a, i[a], !0, r, s);
        else if (void 0 !== n && (o = !0, J.isFunction(n) || (s = !0), c && (t = s ? (t.call(e, n), null) : (c = t, function(e, t, i) {
                return c.call(J(e), i)
            })), t))
            for (; a < l; a++) t(e[a], i, s ? n : n.call(e[a], a, t(e[a], i)));
        return o ? e : c ? t.call(e) : l ? t(e[0], i) : r
    };
    o.uid = 1, o.prototype = {
        register: function(e, t) {
            return t = t || {}, e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        },
        cache: function(e) {
            if (!fe(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, fe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
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
            var i, n, o, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 === t) this.register(e);
                else {
                    i = (n = J.isArray(t) ? t.concat(t.map(J.camelCase)) : (o = J.camelCase(t), t in r ? [t, o] : (n = o) in r ? [n] : n.match(he) || [])).length;
                    for (; i--;) delete r[n[i]]
                }
                void 0 !== t && !J.isEmptyObject(r) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            return void 0 !== (e = e[this.expando]) && !J.isEmptyObject(e)
        }
    };
    var ge = new o,
        ve = new o,
        ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        we = /[A-Z]/g;

    function be(e, t) {
        return e = t || e, "none" === J.css(e, "display") || !J.contains(e.ownerDocument, e)
    }
    J.extend({
        hasData: function(e) {
            return ve.hasData(e) || ge.hasData(e)
        },
        data: function(e, t, i) {
            return ve.access(e, t, i)
        },
        removeData: function(e, t) {
            ve.remove(e, t)
        },
        _data: function(e, t, i) {
            return ge.access(e, t, i)
        },
        _removeData: function(e, t) {
            ge.remove(e, t)
        }
    }), J.fn.extend({
        data: function(n, e) {
            var t, i, o, r = this[0],
                s = r && r.attributes;
            if (void 0 !== n) return "object" == typeof n ? this.each(function() {
                ve.set(this, n)
            }) : me(this, function(t) {
                var e, i;
                return r && void 0 === t ? void 0 !== (e = ve.get(r, n) || ve.get(r, n.replace(we, "-$&").toLowerCase())) ? e : (i = J.camelCase(n), void 0 !== (e = ve.get(r, i)) || void 0 !== (e = l(r, i, void 0)) ? e : void 0) : (i = J.camelCase(n), void this.each(function() {
                    var e = ve.get(this, i);
                    ve.set(this, i, t), -1 < n.indexOf("-") && void 0 !== e && ve.set(this, n, t)
                }))
            }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (o = ve.get(r), 1 === r.nodeType && !ge.get(r, "hasDataAttrs"))) {
                for (t = s.length; t--;) s[t] && 0 === (i = s[t].name).indexOf("data-") && (i = J.camelCase(i.slice(5)), l(r, i, o[i]));
                ge.set(r, "hasDataAttrs", !0)
            }
            return o
        },
        removeData: function(e) {
            return this.each(function() {
                ve.remove(this, e)
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
                r = J._queueHooks(e, t);
            "inprogress" === o && (o = i.shift(), n--), o && ("fx" === t && i.unshift("inprogress"), delete r.stop, o.call(e, function() {
                J.dequeue(e, t)
            }, r)), !n && r && r.empty.fire()
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
                --o || r.resolveWith(s, [s])
            }
            var n, o = 1,
                r = J.Deferred(),
                s = this,
                a = this.length;
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = ge.get(s[a], e + "queueHooks")) && n.empty && (o++, n.empty.add(i));
            return i(), r.promise(t)
        }
    });
    var $e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ke = new RegExp("^(?:([+-])=|)(" + $e + ")([a-z%]*)$", "i"),
        Ce = ["Top", "Right", "Bottom", "Left"],
        Te = /^(?:checkbox|radio)$/i,
        xe = /<([\w:-]+)/,
        Se = /^$|\/(?:java|ecma)script/i,
        _e = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    _e.optgroup = _e.option, _e.tbody = _e.tfoot = _e.colgroup = _e.caption = _e.thead, _e.th = _e.td;
    var Pe = /<|&#?\w+;/,
        W = R.createDocumentFragment().appendChild(R.createElement("div"));
    (ie = R.createElement("input")).setAttribute("type", "radio"), ie.setAttribute("checked", "checked"), ie.setAttribute("name", "t"), W.appendChild(ie), K.checkClone = W.cloneNode(!0).cloneNode(!0).lastChild.checked, W.innerHTML = "<textarea>x</textarea>", K.noCloneChecked = !!W.cloneNode(!0).lastChild.defaultValue;
    var Ee = /^key/,
        Ae = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ie = /^([^.]*)(?:\.(.+)|)/;
    J.event = {
        global: {},
        add: function(t, e, i, n, o) {
            var r, s, a, l, c, d, u, p, h, f = ge.get(t);
            if (f)
                for (i.handler && (i = (r = i).handler, o = r.selector), i.guid || (i.guid = J.guid++), (a = f.events) || (a = f.events = {}), (s = f.handle) || (s = f.handle = function(e) {
                        return void 0 !== J && J.event.triggered !== e.type ? J.event.dispatch.apply(t, arguments) : void 0
                    }), l = (e = (e || "").match(he) || [""]).length; l--;) u = h = (c = Ie.exec(e[l]) || [])[1], p = (c[2] || "").split(".").sort(), u && (d = J.event.special[u] || {}, u = (o ? d.delegateType : d.bindType) || u, d = J.event.special[u] || {}, c = J.extend({
                    type: u,
                    origType: h,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && J.expr.match.needsContext.test(o),
                    namespace: p.join(".")
                }, r), (h = a[u]) || ((h = a[u] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, n, p, s) || t.addEventListener && t.addEventListener(u, s)), d.add && (d.add.call(t, c), c.handler.guid || (c.handler.guid = i.guid)), o ? h.splice(h.delegateCount++, 0, c) : h.push(c), J.event.global[u] = !0)
        },
        remove: function(e, t, i, n, o) {
            var r, s, a, l, c, d, u, p, h, f, m, g = ge.hasData(e) && ge.get(e);
            if (g && (l = g.events)) {
                for (c = (t = (t || "").match(he) || [""]).length; c--;)
                    if (h = m = (a = Ie.exec(t[c]) || [])[1], f = (a[2] || "").split(".").sort(), h) {
                        for (u = J.event.special[h] || {}, p = l[h = (n ? u.delegateType : u.bindType) || h] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) d = p[r], !o && m !== d.origType || i && i.guid !== d.guid || a && !a.test(d.namespace) || n && n !== d.selector && ("**" !== n || !d.selector) || (p.splice(r, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
                        s && !p.length && (u.teardown && !1 !== u.teardown.call(e, f, g.handle) || J.removeEvent(e, h, g.handle), delete l[h])
                    } else
                        for (h in l) J.event.remove(e, h + t[c], i, n, !0);
                J.isEmptyObject(l) && ge.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            e = J.event.fix(e);
            var t, i, n, o, r, s = B.call(arguments),
                a = (ge.get(this, "events") || {})[e.type] || [],
                l = J.event.special[e.type] || {};
            if ((s[0] = e).delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, e)) {
                for (r = J.event.handlers.call(this, e, a), t = 0;
                    (n = r[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = n.elem, i = 0;
                        (o = n.handlers[i++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o, e.data = o.data, void 0 !== (o = ((J.event.special[o.origType] || {}).handle || o.handler).apply(n.elem, s)) && !1 === (e.result = o) && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var i, n, o, r, s = [],
                a = t.delegateCount,
                l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                        for (n = [], i = 0; i < a; i++) void 0 === n[o = (r = t[i]).selector + " "] && (n[o] = r.needsContext ? -1 < J(o, this).index(l) : J.find(o, this, null, [l]).length), n[o] && n.push(r);
                        n.length && s.push({
                            elem: l,
                            handlers: n
                        })
                    } return a < t.length && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s
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
                r = e,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Ae.test(o) ? this.mouseHooks : Ee.test(o) ? this.keyHooks : {}), n = s.props ? this.props.concat(s.props) : this.props, e = new J.Event(r), t = n.length; t--;) e[i = n[t]] = r[i];
            return e.target || (e.target = R), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== s() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === s() && this.blur ? (this.blur(), !1) : void 0
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
        return this instanceof J.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? r : d) : this.type = e, t && J.extend(this, t), this.timeStamp = e && e.timeStamp || J.now(), void(this[J.expando] = !0)) : new J.Event(e, t)
    }, J.Event.prototype = {
        constructor: J.Event,
        isDefaultPrevented: d,
        isPropagationStopped: d,
        isImmediatePropagationStopped: d,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = r, e && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = r, e && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = r, e && e.stopImmediatePropagation(), this.stopPropagation()
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
    var Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        je = /<script|<style|<link/i,
        Le = /checked\s*(?:[^=]|=\s*.checked.)/i,
        De = /^true\/(.*)/,
        Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function He(e, t, i, n) {
        var o, r = {};
        for (o in t) r[o] = e.style[o], e.style[o] = t[o];
        for (o in n = i.apply(e, n || []), t) e.style[o] = r[o];
        return n
    }
    J.extend({
        htmlPrefilter: function(e) {
            return e.replace(Oe, "<$1></$2>")
        },
        clone: function(e, t, i) {
            var n, o, r, s, a, l, c, d = e.cloneNode(!0),
                u = J.contains(e.ownerDocument, e);
            if (!(K.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || J.isXMLDoc(e)))
                for (s = m(d), n = 0, o = (r = m(e)).length; n < o; n++) a = r[n], "input" === (c = (l = s[n]).nodeName.toLowerCase()) && Te.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (t)
                if (i)
                    for (r = r || m(e), s = s || m(d), n = 0, o = r.length; n < o; n++) h(r[n], s[n]);
                else h(e, d);
            return 0 < (s = m(d, "script")).length && f(s, !u && m(e, "script")), d
        },
        cleanData: function(e) {
            for (var t, i, n, o = J.event.special, r = 0; void 0 !== (i = e[r]); r++)
                if (fe(i)) {
                    if (t = i[ge.expando]) {
                        if (t.events)
                            for (n in t.events) o[n] ? J.event.remove(i, n) : J.removeEvent(i, n, t.handle);
                        i[ge.expando] = void 0
                    }
                    i[ve.expando] && (i[ve.expando] = void 0)
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
            return me(this, function(e) {
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
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (J.cleanData(m(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return J.clone(this, e, t)
            })
        },
        html: function(e) {
            return me(this, function(e) {
                var t = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !je.test(e) && !_e[(xe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = J.htmlPrefilter(e);
                    try {
                        for (; i < n; i++) 1 === (t = this[i] || {}).nodeType && (J.cleanData(m(t, !1)), t.innerHTML = e);
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
                J.inArray(this, i) < 0 && (J.cleanData(m(this)), t && t.replaceChild(e, this))
            }, i)
        }
    }), J.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, s) {
        J.fn[e] = function(e) {
            for (var t, i = [], n = J(e), o = n.length - 1, r = 0; r <= o; r++) t = r === o ? this : this.clone(!0), J(n[r])[s](t), X.apply(i, t.get());
            return this.pushStack(i)
        }
    });
    var Me, qe, ze, Fe, We, Re, Be, Ue = {
            HTML: "block",
            BODY: "block"
        },
        Xe = /^margin/,
        Ve = new RegExp("^(" + $e + ")(?!px)[a-z%]+$", "i"),
        Qe = function(e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = k), t.getComputedStyle(e)
        },
        Ye = R.documentElement;

    function Ge() {
        Be.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", Be.innerHTML = "", Ye.appendChild(Re);
        var e = k.getComputedStyle(Be);
        qe = "1%" !== e.top, We = "2px" === e.marginLeft, ze = "4px" === e.width, Be.style.marginRight = "50%", Fe = "4px" === e.marginRight, Ye.removeChild(Re)
    }
    Re = R.createElement("div"), (Be = R.createElement("div")).style && (Be.style.backgroundClip = "content-box", Be.cloneNode(!0).style.backgroundClip = "", K.clearCloneStyle = "content-box" === Be.style.backgroundClip, Re.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", Re.appendChild(Be), J.extend(K, {
        pixelPosition: function() {
            return Ge(), qe
        },
        boxSizingReliable: function() {
            return null == ze && Ge(), ze
        },
        pixelMarginRight: function() {
            return null == ze && Ge(), Fe
        },
        reliableMarginLeft: function() {
            return null == ze && Ge(), We
        },
        reliableMarginRight: function() {
            var e, t = Be.appendChild(R.createElement("div"));
            return t.style.cssText = Be.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", Be.style.width = "1px", Ye.appendChild(Re), e = !parseFloat(k.getComputedStyle(t).marginRight), Ye.removeChild(Re), Be.removeChild(t), e
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
                    if (t) return "" === (e = T(e, "opacity")) ? "1" : e
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
                var o, r, s, a = J.camelCase(t),
                    l = e.style;
                return t = J.cssProps[a] || (J.cssProps[a] = S(a) || a), s = J.cssHooks[t] || J.cssHooks[a], void 0 === i ? s && "get" in s && void 0 !== (o = s.get(e, !1, n)) ? o : l[t] : ("string" == (r = typeof i) && (o = ke.exec(i)) && o[1] && (i = c(e, t, o), r = "number"), void(null != i && i == i && ("number" === r && (i += o && o[3] || (J.cssNumber[a] ? "" : "px")), K.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (l[t] = "inherit"), s && "set" in s && void 0 === (i = s.set(e, i, n)) || (l[t] = i))))
            }
        },
        css: function(e, t, i, n) {
            var o, r = J.camelCase(t);
            return t = J.cssProps[r] || (J.cssProps[r] = S(r) || r), (r = J.cssHooks[t] || J.cssHooks[r]) && "get" in r && (o = r.get(e, !0, i)), void 0 === o && (o = T(e, t, n)), "normal" === o && t in Ze && (o = Ze[t]), "" === i || i ? (t = parseFloat(o), !0 === i || isFinite(t) ? t || 0 : o) : o
        }
    }), J.each(["height", "width"], function(e, r) {
        J.cssHooks[r] = {
            get: function(e, t, i) {
                return t ? Ke.test(J.css(e, "display")) && 0 === e.offsetWidth ? He(e, Je, function() {
                    return E(e, r, i)
                }) : E(e, r, i) : void 0
            },
            set: function(e, t, i) {
                var n, o = i && Qe(e);
                return (o = i && P(e, r, i, "border-box" === J.css(e, "boxSizing", !1, o), o)) && (n = ke.exec(t)) && "px" !== (n[3] || "px") && (e.style[r] = t, t = J.css(e, r)), _(0, t, o)
            }
        }
    }), J.cssHooks.marginLeft = x(K.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(T(e, "marginLeft")) || e.getBoundingClientRect().left - He(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px" : void 0
    }), J.cssHooks.marginRight = x(K.reliableMarginRight, function(e, t) {
        return t ? He(e, {
            display: "inline-block"
        }, T, [e, "marginRight"]) : void 0
    }), J.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(o, r) {
        J.cssHooks[o + r] = {
            expand: function(e) {
                for (var t = 0, i = {}, n = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) i[o + Ce[t] + r] = n[t] || n[t - 2] || n[0];
                return i
            }
        }, Xe.test(o) || (J.cssHooks[o + r].set = _)
    }), J.fn.extend({
        css: function(e, t) {
            return me(this, function(e, t, i) {
                var n, o, r = {},
                    s = 0;
                if (J.isArray(t)) {
                    for (n = Qe(e), o = t.length; s < o; s++) r[t[s]] = J.css(e, t[s], !1, n);
                    return r
                }
                return void 0 !== i ? J.style(e, t, i) : J.css(e, t)
            }, e, t, 1 < arguments.length)
        },
        show: function() {
            return A(this, !0)
        },
        hide: function() {
            return A(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                be(this) ? J(this).show() : J(this).hide()
            })
        }
    }), ((J.Tween = I).prototype = {
        constructor: I,
        init: function(e, t, i, n, o, r) {
            this.elem = e, this.prop = i, this.easing = o || J.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = r || (J.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = I.propHooks[this.prop];
            return (e && e.get ? e : I.propHooks._default).get(this)
        },
        run: function(e) {
            var t, i = I.propHooks[this.prop];
            return this.options.duration ? this.pos = t = J.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (i && i.set ? i : I.propHooks._default).set(this), this
        }
    }).init.prototype = I.prototype, (I.propHooks = {
        _default: {
            get: function(e) {
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = J.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(e) {
                J.fx.step[e.prop] ? J.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[J.cssProps[e.prop]] && !J.cssHooks[e.prop] ? e.elem[e.prop] = e.now : J.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = I.propHooks.scrollLeft = {
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
    }, J.fx = I.prototype.init, J.fx.step = {};
    var it, nt, ot = /^(?:toggle|show|hide)$/,
        rt = /queueHooks$/;
    J.Animation = J.extend(D, {
        tweeners: {
            "*": [function(e, t) {
                var i = this.createTween(e, t);
                return c(i.elem, e, ke.exec(t), i), i
            }]
        },
        tweener: function(e, t) {
            for (var i, n = 0, o = (e = J.isFunction(e) ? (t = e, ["*"]) : e.match(he)).length; n < o; n++) i = e[n], D.tweeners[i] = D.tweeners[i] || [], D.tweeners[i].unshift(t)
        },
        prefilters: [function(t, e, i) {
            var n, o, r, s, a, l, c, d = this,
                u = {},
                p = t.style,
                h = t.nodeType && be(t),
                f = ge.get(t, "fxshow");
            for (n in i.queue || (null == (a = J._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || l()
                }), a.unqueued++, d.always(function() {
                    d.always(function() {
                        a.unqueued--, J.queue(t, "fx").length || a.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (c = J.css(t, "display")) ? ge.get(t, "olddisplay") || C(t.nodeName) : c) && "none" === J.css(t, "float") && (p.display = "inline-block")), i.overflow && (p.overflow = "hidden", d.always(function() {
                    p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
                })), e)
                if (o = e[n], ot.exec(o)) {
                    if (delete e[n], r = r || "toggle" === o, o === (h ? "hide" : "show")) {
                        if ("show" !== o || !f || void 0 === f[n]) continue;
                        h = !0
                    }
                    u[n] = f && f[n] || J.style(t, n)
                } else c = void 0;
            if (J.isEmptyObject(u)) "inline" === ("none" === c ? C(t.nodeName) : c) && (p.display = c);
            else
                for (n in f ? "hidden" in f && (h = f.hidden) : f = ge.access(t, "fxshow", {}), r && (f.hidden = !h), h ? J(t).show() : d.done(function() {
                        J(t).hide()
                    }), d.done(function() {
                        for (var e in ge.remove(t, "fxshow"), u) J.style(t, e, u[e])
                    }), u) s = L(h ? f[n] : 0, n, d), n in f || (f[n] = s.start, h && (s.end = s.start, s.start = "width" === n || "height" === n ? 1 : 0))
        }],
        prefilter: function(e, t) {
            t ? D.prefilters.unshift(e) : D.prefilters.push(e)
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
                var e = D(this, J.extend({}, t), s);
                (r || ge.get(this, "finish")) && e.stop(!0)
            }
            var r = J.isEmptyObject(t),
                s = J.speed(e, i, n);
            return o.finish = o, r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function(o, e, r) {
            function s(e) {
                var t = e.stop;
                delete e.stop, t(r)
            }
            return "string" != typeof o && (r = e, e = o, o = void 0), e && !1 !== o && this.queue(o || "fx", []), this.each(function() {
                var e = !0,
                    t = null != o && o + "queueHooks",
                    i = J.timers,
                    n = ge.get(this);
                if (t) n[t] && n[t].stop && s(n[t]);
                else
                    for (t in n) n[t] && n[t].stop && rt.test(t) && s(n[t]);
                for (t = i.length; t--;) i[t].elem !== this || null != o && i[t].queue !== o || (i[t].anim.stop(r), e = !1, i.splice(t, 1));
                !e && r || J.dequeue(this, o)
            })
        },
        finish: function(s) {
            return !1 !== s && (s = s || "fx"), this.each(function() {
                var e, t = ge.get(this),
                    i = t[s + "queue"],
                    n = t[s + "queueHooks"],
                    o = J.timers,
                    r = i ? i.length : 0;
                for (t.finish = !0, J.queue(this, s, []), n && n.stop && n.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; e < r; e++) i[e] && i[e].finish && i[e].finish.call(this);
                delete t.finish
            })
        }
    }), J.each(["toggle", "show", "hide"], function(e, n) {
        var o = J.fn[n];
        J.fn[n] = function(e, t, i) {
            return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(j(n, !0), e, t, i)
        }
    }), J.each({
        slideDown: j("show"),
        slideUp: j("hide"),
        slideToggle: j("toggle"),
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
        nt = nt || k.setInterval(J.fx.tick, J.fx.interval)
    }, J.fx.stop = function() {
        k.clearInterval(nt), nt = null
    }, J.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, J.fn.delay = function(n, e) {
        return n = J.fx && J.fx.speeds[n] || n, e = e || "fx", this.queue(e, function(e, t) {
            var i = k.setTimeout(e, n);
            t.stop = function() {
                k.clearTimeout(i)
            }
        })
    }, ie = R.createElement("input"), $e = (W = R.createElement("select")).appendChild(R.createElement("option")), ie.type = "checkbox", K.checkOn = "" !== ie.value, K.optSelected = $e.selected, W.disabled = !0, K.optDisabled = !$e.disabled, (ie = R.createElement("input")).value = "t", ie.type = "radio", K.radioValue = "t" === ie.value;
    var st, at = J.expr.attrHandle;
    J.fn.extend({
        attr: function(e, t) {
            return me(this, J.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                J.removeAttr(this, e)
            })
        }
    }), J.extend({
        attr: function(e, t, i) {
            var n, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? J.prop(e, t, i) : (1 === r && J.isXMLDoc(e) || (t = t.toLowerCase(), o = J.attrHooks[t] || (J.expr.match.bool.test(t) ? st : void 0)), void 0 !== i ? null === i ? void J.removeAttr(e, t) : o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : o && "get" in o && null !== (n = o.get(e, t)) || null != (n = J.find.attr(e, t)) ? n : void 0)
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
                r = t && t.match(he);
            if (r && 1 === e.nodeType)
                for (; i = r[o++];) n = J.propFix[i] || i, J.expr.match.bool.test(i) && (e[n] = !1), e.removeAttribute(i)
        }
    }), st = {
        set: function(e, t, i) {
            return !1 === t ? J.removeAttr(e, i) : e.setAttribute(i, i), i
        }
    }, J.each(J.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var r = at[t] || J.find.attr;
        at[t] = function(e, t, i) {
            var n, o;
            return i || (o = at[t], at[t] = n, n = null != r(e, t, i) ? t.toLowerCase() : null, at[t] = o), n
        }
    });
    var lt = /^(?:input|select|textarea|button)$/i,
        ct = /^(?:a|area)$/i;
    J.fn.extend({
        prop: function(e, t) {
            return me(this, J.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[J.propFix[e] || e]
            })
        }
    }), J.extend({
        prop: function(e, t, i) {
            var n, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && J.isXMLDoc(e) || (t = J.propFix[t] || t, o = J.propHooks[t]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : e[t] = i : o && "get" in o && null !== (n = o.get(e, t)) ? n : e[t]
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
            return (e = e.parentNode) && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(e) {
            (e = e.parentNode) && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        J.propFix[this.toLowerCase()] = this
    });
    var dt = /[\t\r\n\f]/g;
    J.fn.extend({
        addClass: function(t) {
            var e, i, n, o, r, s, a = 0;
            if (J.isFunction(t)) return this.each(function(e) {
                J(this).addClass(t.call(this, e, N(this)))
            });
            if ("string" == typeof t && t)
                for (e = t.match(he) || []; i = this[a++];)
                    if (s = N(i), n = 1 === i.nodeType && (" " + s + " ").replace(dt, " ")) {
                        for (r = 0; o = e[r++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                        s !== (s = J.trim(n)) && i.setAttribute("class", s)
                    } return this
        },
        removeClass: function(t) {
            var e, i, n, o, r, s, a = 0;
            if (J.isFunction(t)) return this.each(function(e) {
                J(this).removeClass(t.call(this, e, N(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(he) || []; i = this[a++];)
                    if (s = N(i), n = 1 === i.nodeType && (" " + s + " ").replace(dt, " ")) {
                        for (r = 0; o = e[r++];)
                            for (; - 1 < n.indexOf(" " + o + " ");) n = n.replace(" " + o + " ", " ");
                        s !== (s = J.trim(n)) && i.setAttribute("class", s)
                    } return this
        },
        toggleClass: function(o, t) {
            var r = typeof o;
            return "boolean" == typeof t && "string" == r ? t ? this.addClass(o) : this.removeClass(o) : J.isFunction(o) ? this.each(function(e) {
                J(this).toggleClass(o.call(this, e, N(this), t), t)
            }) : this.each(function() {
                var e, t, i, n;
                if ("string" == r)
                    for (t = 0, i = J(this), n = o.match(he) || []; e = n[t++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                else void 0 !== o && "boolean" != r || ((e = N(this)) && ge.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== o && ge.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            for (var t, i = 0, n = " " + e + " "; t = this[i++];)
                if (1 === t.nodeType && -1 < (" " + N(t) + " ").replace(dt, " ").indexOf(n)) return !0;
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
                    for (var t, i = e.options, n = e.selectedIndex, o = "select-one" === e.type || n < 0, r = o ? null : [], s = o ? n + 1 : i.length, a = n < 0 ? s : o ? n : 0; a < s; a++)
                        if (((t = i[a]).selected || a === n) && (K.optDisabled ? !t.disabled : null === t.getAttribute("disabled")) && (!t.parentNode.disabled || !J.nodeName(t.parentNode, "optgroup"))) {
                            if (t = J(t).val(), o) return t;
                            r.push(t)
                        } return r
                },
                set: function(e, t) {
                    for (var i, n, o = e.options, r = J.makeArray(t), s = o.length; s--;)((n = o[s]).selected = -1 < J.inArray(J.valHooks.option.get(n), r)) && (i = !0);
                    return i || (e.selectedIndex = -1), r
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
    var ht = /^(?:focusinfocus|focusoutblur)$/;
    J.extend(J.event, {
        trigger: function(e, t, i, n) {
            var o, r, s, a, l, c, d = [i || R],
                u = G.call(e, "type") ? e.type : e,
                p = G.call(e, "namespace") ? e.namespace.split(".") : [],
                h = r = i = i || R;
            if (3 !== i.nodeType && 8 !== i.nodeType && !ht.test(u + J.event.triggered) && (-1 < u.indexOf(".") && (u = (p = u.split(".")).shift(), p.sort()), a = u.indexOf(":") < 0 && "on" + u, (e = e[J.expando] ? e : new J.Event(u, "object" == typeof e && e)).isTrigger = n ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), t = null == t ? [e] : J.makeArray(t, [e]), c = J.event.special[u] || {}, n || !c.trigger || !1 !== c.trigger.apply(i, t))) {
                if (!n && !c.noBubble && !J.isWindow(i)) {
                    for (s = c.delegateType || u, ht.test(s + u) || (h = h.parentNode); h; h = h.parentNode) d.push(h), r = h;
                    r === (i.ownerDocument || R) && d.push(r.defaultView || r.parentWindow || k)
                }
                for (o = 0;
                    (h = d[o++]) && !e.isPropagationStopped();) e.type = 1 < o ? s : c.bindType || u, (l = (ge.get(h, "events") || {})[e.type] && ge.get(h, "handle")) && l.apply(h, t), (l = a && h[a]) && l.apply && fe(h) && (e.result = l.apply(h, t), !1 === e.result && e.preventDefault());
                return e.type = u, n || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), t) || !fe(i) || a && J.isFunction(i[u]) && !J.isWindow(i) && ((r = i[a]) && (i[a] = null), i[J.event.triggered = u](), J.event.triggered = void 0, r && (i[a] = r)), e.result
            }
        },
        simulate: function(e, t, i) {
            e = J.extend(new J.Event, i, {
                type: e,
                isSimulated: !0
            }), J.event.trigger(e, null, t), e.isDefaultPrevented() && i.preventDefault()
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
    }), K.focusin = "onfocusin" in k, K.focusin || J.each({
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
    var ft = k.location,
        mt = J.now(),
        gt = /\?/;
    J.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, J.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new k.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || J.error("Invalid XML: " + e), t
    };
    var vt = /#.*$/,
        yt = /([?&])_=[^&]*/,
        wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        bt = /^(?:GET|HEAD)$/,
        $t = /^\/\//,
        kt = {},
        Ct = {},
        Tt = "*/".concat("*"),
        xt = R.createElement("a");
    xt.href = ft.href, J.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ft.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ft.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Tt,
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
        ajaxPrefilter: H(kt),
        ajaxTransport: H(Ct),
        ajax: function(e, t) {
            function i(e, t, i, n) {
                var o, r, s, a = t;
                2 !== w && (w = 2, u && k.clearTimeout(u), l = void 0, d = n || "", $.readyState = 0 < e ? 4 : 0, n = 200 <= e && e < 300 || 304 === e, i && (s = function(e, t, i) {
                    for (var n, o, r, s, a = e.contents, l = e.dataTypes;
                        "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (n)
                        for (o in a)
                            if (a[o] && a[o].test(n)) {
                                l.unshift(o);
                                break
                            } if (l[0] in i) r = l[0];
                    else {
                        for (o in i) {
                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                r = o;
                                break
                            }
                            s = s || o
                        }
                        r = r || s
                    }
                    return r ? (r !== l[0] && l.unshift(r), i[r]) : void 0
                }(h, $, i)), s = function(e, t, i, n) {
                    var o, r, s, a, l, c = {},
                        d = e.dataTypes.slice();
                    if (d[1])
                        for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                    for (r = d.shift(); r;)
                        if (e.responseFields[r] && (i[e.responseFields[r]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
                            if ("*" === r) r = l;
                            else if ("*" !== l && l !== r) {
                        if (!(s = c[l + " " + r] || c["* " + r]))
                            for (o in c)
                                if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                    !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], d.unshift(a[1]));
                                    break
                                } if (!0 !== s)
                            if (s && e.throws) t = s(t);
                            else try {
                                t = s(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: s ? e : "No conversion from " + l + " to " + r
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(h, s, $, n), n ? (h.ifModified && ((i = $.getResponseHeader("Last-Modified")) && (J.lastModified[c] = i), (i = $.getResponseHeader("etag")) && (J.etag[c] = i)), 204 === e || "HEAD" === h.type ? a = "nocontent" : 304 === e ? a = "notmodified" : (a = s.state, o = s.data, n = !(r = s.error))) : (r = a, !e && a || (a = "error", e < 0 && (e = 0))), $.status = e, $.statusText = (t || a) + "", n ? g.resolveWith(f, [o, a, $]) : g.rejectWith(f, [$, a, r]), $.statusCode(y), y = void 0, p && m.trigger(n ? "ajaxSuccess" : "ajaxError", [$, h, n ? o : r]), v.fireWith(f, [$, a]), p && (m.trigger("ajaxComplete", [$, h]), --J.active || J.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var l, c, d, n, u, o, p, r, h = J.ajaxSetup({}, t),
                f = h.context || h,
                m = h.context && (f.nodeType || f.jquery) ? J(f) : J.event,
                g = J.Deferred(),
                v = J.Callbacks("once memory"),
                y = h.statusCode || {},
                s = {},
                a = {},
                w = 0,
                b = "canceled",
                $ = {
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
                        return w || (e = a[i] = a[i] || e, s[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return w || (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        if (e)
                            if (w < 2)
                                for (var t in e) y[t] = [y[t], e[t]];
                            else $.always(e[$.status]);
                        return this
                    },
                    abort: function(e) {
                        return e = e || b, l && l.abort(e), i(0, e), this
                    }
                };
            if (g.promise($).complete = v.add, $.success = $.done, $.error = $.fail, h.url = ((e || h.url || ft.href) + "").replace(vt, "").replace($t, ft.protocol + "//"), h.type = t.method || t.type || h.method || h.type, h.dataTypes = J.trim(h.dataType || "*").toLowerCase().match(he) || [""], null == h.crossDomain) {
                o = R.createElement("a");
                try {
                    o.href = h.url, o.href, h.crossDomain = xt.protocol + "//" + xt.host != o.protocol + "//" + o.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = J.param(h.data, h.traditional)), M(kt, h, t, $), 2 === w) return $;
            for (r in (p = J.event && h.global) && 0 == J.active++ && J.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !bt.test(h.type), c = h.url, h.hasContent || (h.data && (c = h.url += (gt.test(c) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (h.url = yt.test(c) ? c.replace(yt, "$1_=" + mt++) : c + (gt.test(c) ? "&" : "?") + "_=" + mt++)), h.ifModified && (J.lastModified[c] && $.setRequestHeader("If-Modified-Since", J.lastModified[c]), J.etag[c] && $.setRequestHeader("If-None-Match", J.etag[c])), (h.data && h.hasContent && !1 !== h.contentType || t.contentType) && $.setRequestHeader("Content-Type", h.contentType), $.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Tt + "; q=0.01" : "") : h.accepts["*"]), h.headers) $.setRequestHeader(r, h.headers[r]);
            if (h.beforeSend && (!1 === h.beforeSend.call(f, $, h) || 2 === w)) return $.abort();
            for (r in b = "abort", {
                    success: 1,
                    error: 1,
                    complete: 1
                }) $[r](h[r]);
            if (l = M(Ct, h, t, $)) {
                if ($.readyState = 1, p && m.trigger("ajaxSend", [$, h]), 2 === w) return $;
                h.async && 0 < h.timeout && (u = k.setTimeout(function() {
                    $.abort("timeout")
                }, h.timeout));
                try {
                    w = 1, l.send(s, i)
                } catch (e) {
                    if (!(w < 2)) throw e;
                    i(-1, e)
                }
            } else i(-1, "No Transport");
            return $
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
    var St = /%20/g,
        _t = /\[\]$/,
        Pt = /\r?\n/g,
        Et = /^(?:submit|button|image|reset|file)$/i,
        At = /^(?:input|select|textarea|keygen)/i;
    J.param = function(e, t) {
        function i(e, t) {
            t = J.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        }
        var n, o = [];
        if (void 0 === t && (t = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(e) || e.jquery && !J.isPlainObject(e)) J.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) ! function i(n, e, o, r) {
                if (J.isArray(e)) J.each(e, function(e, t) {
                    o || _t.test(n) ? r(n, t) : i(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, o, r)
                });
                else if (o || "object" !== J.type(e)) r(n, e);
                else
                    for (var t in e) i(n + "[" + t + "]", e[t], o, r)
            }(n, e[n], t, i);
        return o.join("&").replace(St, "+")
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
                return this.name && !J(this).is(":disabled") && At.test(this.nodeName) && !Et.test(e) && (this.checked || !Te.test(e))
            }).map(function(e, t) {
                var i = J(this).val();
                return null == i ? null : J.isArray(i) ? J.map(i, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Pt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: i.replace(Pt, "\r\n")
                }
            }).get()
        }
    }), J.ajaxSettings.xhr = function() {
        try {
            return new k.XMLHttpRequest
        } catch (e) {}
    };
    var It = {
            0: 200,
            1223: 204
        },
        Ot = J.ajaxSettings.xhr();
    K.cors = !!Ot && "withCredentials" in Ot, K.ajax = Ot = !!Ot, J.ajaxTransport(function(o) {
        var r, s;
        return K.cors || Ot && !o.crossDomain ? {
            send: function(e, t) {
                var i, n = o.xhr();
                if (n.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
                    for (i in o.xhrFields) n[i] = o.xhrFields[i];
                for (i in o.mimeType && n.overrideMimeType && n.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) n.setRequestHeader(i, e[i]);
                r = function(e) {
                    return function() {
                        r && (r = s = n.onload = n.onerror = n.onabort = n.onreadystatechange = null, "abort" === e ? n.abort() : "error" === e ? "number" != typeof n.status ? t(0, "error") : t(n.status, n.statusText) : t(It[n.status] || n.status, n.statusText, "text" !== (n.responseType || "text") || "string" != typeof n.responseText ? {
                            binary: n.response
                        } : {
                            text: n.responseText
                        }, n.getAllResponseHeaders()))
                    }
                }, n.onload = r(), s = n.onerror = r("error"), void 0 !== n.onabort ? n.onabort = s : n.onreadystatechange = function() {
                    4 === n.readyState && k.setTimeout(function() {
                        r && s()
                    })
                }, r = r("abort");
                try {
                    n.send(o.hasContent && o.data || null)
                } catch (e) {
                    if (r) throw e
                }
            },
            abort: function() {
                r && r()
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
    var jt = [],
        Lt = /(=)\?(?=&|$)|\?\?/;
    J.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = jt.pop() || J.expando + "_" + mt++;
            return this[e] = !0, e
        }
    }), J.ajaxPrefilter("json jsonp", function(e, t, i) {
        var n, o, r, s = !1 !== e.jsonp && (Lt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Lt.test(e.data) && "data");
        return s || "jsonp" === e.dataTypes[0] ? (n = e.jsonpCallback = J.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Lt, "$1" + n) : !1 !== e.jsonp && (e.url += (gt.test(e.url) ? "&" : "?") + e.jsonp + "=" + n), e.converters["script json"] = function() {
            return r || J.error(n + " was not called"), r[0]
        }, e.dataTypes[0] = "json", o = k[n], k[n] = function() {
            r = arguments
        }, i.always(function() {
            void 0 === o ? J(k).removeProp(n) : k[n] = o, e[n] && (e.jsonpCallback = t.jsonpCallback, jt.push(n)), r && J.isFunction(o) && o(r[0]), r = o = void 0
        }), "script") : void 0
    }), J.parseHTML = function(e, t, i) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (i = t, t = !1), t = t || R;
        var n = se.exec(e),
            i = !i && [];
        return n ? [t.createElement(n[1])] : (n = g([e], t, i), i && i.length && J(i).remove(), J.merge([], n.childNodes))
    };
    var Dt = J.fn.load;
    J.fn.load = function(e, t, i) {
        if ("string" != typeof e && Dt) return Dt.apply(this, arguments);
        var n, o, r, s = this,
            a = e.indexOf(" ");
        return -1 < a && (n = J.trim(e.slice(a)), e = e.slice(0, a)), J.isFunction(t) ? (i = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < s.length && J.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments, s.html(n ? J("<div>").append(J.parseHTML(e)).find(n) : e)
        }).always(i && function(e, t) {
            s.each(function() {
                i.apply(this, r || [e.responseText, t, e])
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
            var n, o, r, s, a = J.css(e, "position"),
                l = J(e),
                c = {};
            "static" === a && (e.style.position = "relative"), r = l.offset(), n = J.css(e, "top"), s = J.css(e, "left"), s = ("absolute" === a || "fixed" === a) && -1 < (n + s).indexOf("auto") ? (o = (a = l.position()).top, a.left) : (o = parseFloat(n) || 0, parseFloat(s) || 0), J.isFunction(t) && (t = t.call(e, i, J.extend({}, r))), null != t.top && (c.top = t.top - r.top + o), null != t.left && (c.left = t.left - r.left + s), "using" in t ? t.using.call(e, c) : l.css(c)
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
            return o ? (e = o.documentElement, J.contains(e, i) ? (n = i.getBoundingClientRect(), o = z(o), {
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
                return e || Ye
            })
        }
    }), J.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, o) {
        var r = "pageYOffset" === o;
        J.fn[t] = function(e) {
            return me(this, function(e, t, i) {
                var n = z(e);
                return void 0 === i ? n ? n[o] : e[t] : void(n ? n.scrollTo(r ? n.pageXOffset : i, r ? i : n.pageYOffset) : e[t] = i)
            }, t, e, arguments.length)
        }
    }), J.each(["top", "left"], function(e, i) {
        J.cssHooks[i] = x(K.pixelPosition, function(e, t) {
            return t ? (t = T(e, i), Ve.test(t) ? J(e).position()[i] + "px" : t) : void 0
        })
    }), J.each({
        Height: "height",
        Width: "width"
    }, function(r, s) {
        J.each({
            padding: "inner" + r,
            content: s,
            "": "outer" + r
        }, function(n, e) {
            J.fn[e] = function(e, t) {
                var i = arguments.length && (n || "boolean" != typeof e),
                    o = n || (!0 === e || !0 === t ? "margin" : "border");
                return me(this, function(e, t, i) {
                    var n;
                    return J.isWindow(e) ? e.document.documentElement["client" + r] : 9 === e.nodeType ? (n = e.documentElement, Math.max(e.body["scroll" + r], n["scroll" + r], e.body["offset" + r], n["offset" + r], n["client" + r])) : void 0 === i ? J.css(e, t, o) : J.style(e, t, i, o)
                }, s, i ? e : void 0, i, null)
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
    var Nt = k.jQuery,
        Ht = k.$;
    return J.noConflict = function(e) {
        return k.$ === J && (k.$ = Ht), e && k.jQuery === J && (k.jQuery = Nt), J
    }, e || (k.jQuery = k.$ = J), J
}),
function(f) {
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
    f.zoom = function(e, t, i, n) {
        var o, r, s, a, l, c, d, u = f(e),
            p = u.css("position"),
            h = f(t);
        return e.style.position = /(absolute|fixed)/.test(p) ? p : "relative", e.style.overflow = "hidden", i.style.width = i.style.height = "", f(i).addClass("zoomImg").css({
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
                r = u.outerWidth(), o = u.outerHeight(), s = t === e ? (a = r, o) : (a = h.outerWidth(), h.outerHeight()), l = (i.width - r) / a, c = (i.height - o) / s, d = h.offset()
            },
            move: function(e) {
                var t = e.pageX - d.left,
                    e = e.pageY - d.top,
                    e = Math.max(Math.min(e, s), 0),
                    t = Math.max(Math.min(t, a), 0);
                i.style.left = t * -l + "px", i.style.top = e * -c + "px"
            }
        }
    }, f.fn.zoom = function(i) {
        return this.each(function() {
            var o = f.extend({}, n, i || {}),
                r = o.target && f(o.target)[0] || this,
                e = this,
                s = f(e),
                a = document.createElement("img"),
                l = f(a),
                c = "mousemove.zoom",
                d = !1,
                u = !1;
            if (!o.url) {
                var t = e.querySelector("img");
                if (t && (o.url = t.getAttribute("data-src") || t.currentSrc || t.src), !o.url) return
            }
            s.one("zoom.destroy", function(e, t) {
                s.off(".zoom"), r.style.position = e, r.style.overflow = t, a.onload = null, l.remove()
            }.bind(this, r.style.position, r.style.overflow)), a.onload = function() {
                function t(e) {
                    n.init(), n.move(e), l.stop().fadeTo(f.support.opacity ? o.duration : 0, 1, !!f.isFunction(o.onZoomIn) && o.onZoomIn.call(a))
                }

                function i() {
                    l.stop().fadeTo(o.duration, 0, !!f.isFunction(o.onZoomOut) && o.onZoomOut.call(a))
                }
                var n = f.zoom(r, e, a, o.magnify);
                "grab" === o.on ? s.on("mousedown.zoom", function(e) {
                    1 === e.which && (f(document).one("mouseup.zoom", function() {
                        i(), f(document).off(c, n.move)
                    }), t(e), f(document).on(c, n.move), e.preventDefault())
                }) : "click" === o.on ? s.on("click.zoom", function(e) {
                    return d ? void 0 : (d = !0, t(e), f(document).on(c, n.move), f(document).one("click.zoom", function() {
                        i(), d = !1, f(document).off(c, n.move)
                    }), !1)
                }) : "toggle" === o.on ? s.on("click.zoom", function(e) {
                    d ? i() : t(e), d = !d
                }) : "mouseover" === o.on && (n.init(), s.on("mouseenter.zoom", t).on("mouseleave.zoom", i).on(c, n.move)), o.touch && s.on("touchstart.zoom", function(e) {
                    e.preventDefault(), u ? (u = !1, i()) : (u = !0, t(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(e) {
                    e.preventDefault(), n.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function(e) {
                    e.preventDefault(), u && (u = !1, i())
                }), f.isFunction(o.callback) && o.callback.call(a)
            }, a.setAttribute("role", "presentation"), a.alt = "", a.src = o.url
        })
    }, f.fn.zoom.defaults = n
}(window.jQuery),
function() {
    function a(e, t) {
        for (var i = -1, n = t.length, o = e.length; ++i < n;) e[o + i] = t[i];
        return e
    }

    function t(e, t, i) {
        for (var n = -1, o = e.length; ++n < o;) {
            var r, s, a = e[n],
                l = t(a);
            null != l && (r === G ? l == l : i(l, r)) && (r = l, s = a)
        }
        return s
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

    function r(e) {
        if (z(e) && !Ee(e)) {
            if (e instanceof n) return e;
            if (ue.call(e, "__wrapped__")) {
                var t = new n(e.__wrapped__, e.__chain__);
                return t.__actions__ = k(e.__actions__), t
            }
        }
        return new n(e)
    }

    function n(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t
    }

    function o(e, t, i, n) {
        var o;
        return (o = e === G) || (o = (e === (o = de[i]) || e != e && o != o) && !ue.call(n, i)), o ? t : e
    }

    function s(e) {
        return q(e) ? ge(e) : {}
    }

    function l(e, t, i) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return setTimeout(function() {
            e.apply(G, i)
        }, t)
    }

    function d(e, n) {
        var o = [];
        return $e(e, function(e, t, i) {
            n(e, t, i) && o.push(e)
        }), o
    }

    function p(e, t, i, n) {
        n = n || [];
        for (var o = -1, r = e.length; ++o < r;) {
            var s = e[o];
            0 < t && z(s) && N(s) && (i || Ee(s) || D(s)) ? 1 < t ? p(s, t - 1, i, n) : a(n, s) : i || (n[n.length] = s)
        }
        return n
    }

    function h(e, t) {
        return e && ke(e, t, U)
    }

    function f(t, e) {
        return d(e, function(e) {
            return H(t[e])
        })
    }

    function m(e, t, i, n, o) {
        return e === t || (null == e || null == t || !q(e) && !z(t) ? e != e && t != t : function(t, e, i, n, o, r) {
            var s = Ee(t),
                a = Ee(e),
                l = "[object Array]",
                c = "[object Array]";
            s || "[object Arguments]" == (l = he.call(t)) && (l = "[object Object]"), a || "[object Arguments]" == (c = he.call(e)) && (c = "[object Object]");
            var d = "[object Object]" == l && !u(t),
                a = "[object Object]" == c && !u(e);
            return !(c = l == c) || s || d ? 2 & o || (l = d && ue.call(t, "__wrapped__"), a = a && ue.call(e, "__wrapped__"), !l && !a) ? !!c && ((l = E(r = r || [], function(e) {
                return e[0] === t
            })) && l[1] ? l[1] == e : (r.push([t, e]), e = (s ? function(e, t, i, n, o, r) {
                var s = -1,
                    a = 1 & o,
                    l = e.length,
                    c = t.length;
                if (l != c && !(2 & o && l < c)) return !1;
                for (c = !0; ++s < l;) {
                    var d = e[s],
                        u = t[s];
                    if (void 0 !== G) {
                        c = !1;
                        break
                    }
                    if (a) {
                        if (!C(t, function(e) {
                                return d === e || i(d, e, n, o, r)
                            })) {
                            c = !1;
                            break
                        }
                    } else if (d !== u && !i(d, u, n, o, r)) {
                        c = !1;
                        break
                    }
                }
                return c
            } : function(e, t, i, n, o, r) {
                var s = 2 & o,
                    a = U(e),
                    l = a.length,
                    c = U(t).length;
                if (l != c && !s) return !1;
                for (var d = l; d--;) {
                    var u = a[d];
                    if (!(s ? u in t : ue.call(t, u))) return !1
                }
                for (c = !0; ++d < l;) {
                    var p = e[u = a[d]],
                        h = t[u];
                    if (void 0 !== G || p !== h && !i(p, h, n, o, r)) {
                        c = !1;
                        break
                    }
                    s = s || "constructor" == u
                }
                return c && !s && (i = e.constructor) != (n = t.constructor) && "constructor" in e && "constructor" in t && !("function" == typeof i && i instanceof i && "function" == typeof n && n instanceof n) && (c = !1), c
            })(t, e, i, n, o, r), r.pop(), e)) : i(l ? t.value() : t, a ? e.value() : e, n, o, r) : function(e, t) {
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
        }(e, t, m, i, n, o))
    }

    function g(e) {
        var t = typeof e;
        return "function" == t ? e : null == e ? Q : ("object" == t ? w : b)(e)
    }

    function v(e) {
        var t, i = [];
        for (t in e = null == e ? e : Object(e)) i.push(t);
        return i
    }

    function y(e, n) {
        var o = -1,
            r = N(e) ? Array(e.length) : [];
        return $e(e, function(e, t, i) {
            r[++o] = n(e, t, i)
        }), r
    }

    function w(n) {
        var o = U(n);
        return function(e) {
            var t = o.length;
            if (null == e) return !t;
            for (e = Object(e); t--;) {
                var i = o[t];
                if (!(i in e && m(n[i], e[i], G, 3))) return !1
            }
            return !0
        }
    }

    function b(t) {
        return function(e) {
            return null == e ? G : e[t]
        }
    }

    function $(e, t, i) {
        var n = -1,
            o = e.length;
        for (t < 0 && (t = o < -t ? 0 : o + t), (i = o < i ? o : i) < 0 && (i += o), o = i < t ? 0 : i - t >>> 0, t >>>= 0, i = Array(o); ++n < o;) i[n] = e[n + t];
        return i
    }

    function k(e) {
        return $(e, 0, e.length)
    }

    function C(e, n) {
        var o;
        return $e(e, function(e, t, i) {
            return !(o = n(e, t, i))
        }), !!o
    }

    function T(e, t, i, n) {
        i = i || {};
        for (var o = -1, r = t.length; ++o < r;) {
            var s = t[o],
                a = n ? n(i[s], e[s], s, i, e) : e[s],
                l = i,
                c = l[s];
            ue.call(l, s) && (c === a || c != c && a != a) && (a !== G || s in l) || (l[s] = a)
        }
        return i
    }

    function x(s) {
        return j(function(e, t) {
            var i = -1,
                n = t.length,
                o = "function" == typeof(o = 1 < n ? t[n - 1] : G) ? (n--, o) : G;
            for (e = Object(e); ++i < n;) {
                var r = t[i];
                r && s(e, r, i, o)
            }
            return e
        })
    }

    function S(e) {
        var t = e ? e.length : G;
        if (M(t) && (Ee(e) || W(e) || D(e))) {
            e = String;
            for (var i = -1, n = Array(t); ++i < t;) n[i] = e(i);
            t = n
        } else t = null;
        return t
    }

    function _(e) {
        return e === (H(e = e && e.constructor) && e.prototype || de)
    }

    function P(e) {
        return e ? e[0] : G
    }

    function E(e, t) {
        return n = g(t), $e(e, function(e, t, i) {
            return n(e, t, i) ? (o = e, !1) : void 0
        }), o;
        var n, o
    }

    function A(e, t) {
        return $e(e, "function" == typeof t ? t : Q)
    }

    function I(e, t, i) {
        return n = e, o = g(t), r = i, s = arguments.length < 3, $e(n, function(e, t, i) {
            r = s ? (s = !1, e) : o(r, e, t, i)
        }), r;
        var n, o, r, s
    }

    function O(e, t) {
        var i;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return e = Ae(e),
            function() {
                return 0 < --e && (i = t.apply(this, arguments)), e <= 1 && (t = G), i
            }
    }

    function j(o) {
        var r;
        if ("function" != typeof o) throw new TypeError("Expected a function");
        return r = be(r === G ? o.length - 1 : Ae(r), 0),
            function() {
                for (var e = arguments, t = -1, i = be(e.length - r, 0), n = Array(i); ++t < i;) n[t] = e[r + t];
                for (i = Array(r + 1), t = -1; ++t < r;) i[t] = e[t];
                return i[r] = n, o.apply(this, i)
            }
    }

    function L(e, t) {
        return t < e
    }

    function D(e) {
        return z(e) && N(e) && ue.call(e, "callee") && (!ve.call(e, "callee") || "[object Arguments]" == he.call(e))
    }

    function N(e) {
        return null != e && !("function" == typeof e && H(e)) && M(Te(e))
    }

    function H(e) {
        return "[object Function]" == (e = q(e) ? he.call(e) : "") || "[object GeneratorFunction]" == e
    }

    function M(e) {
        return "number" == typeof e && -1 < e && 0 == e % 1 && e <= 9007199254740991
    }

    function q(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t)
    }

    function z(e) {
        return !!e && "object" == typeof e
    }

    function F(e) {
        return "number" == typeof e || z(e) && "[object Number]" == he.call(e)
    }

    function W(e) {
        return "string" == typeof e || !Ee(e) && z(e) && "[object String]" == he.call(e)
    }

    function R(e, t) {
        return e < t
    }

    function B(e) {
        return "string" == typeof e ? e : null == e ? "" : e + ""
    }

    function U(e) {
        var t = _(e);
        if (!t && !N(e)) return we(Object(e));
        var i, n, o = !!(n = S(e)),
            r = (n = n || []).length;
        for (i in e) !ue.call(e, i) || o && ("length" == i || c(i, r)) || t && "constructor" == i || n.push(i);
        return n
    }

    function X(e) {
        for (var t, i = -1, n = _(e), o = v(e), r = o.length, s = !!(t = S(e)), a = (t = t || []).length; ++i < r;) {
            var l = o[i];
            s && ("length" == l || c(l, a)) || "constructor" == l && (n || !ue.call(e, l)) || t.push(l)
        }
        return t
    }

    function V(e) {
        return e ? y(U(t = e), function(e) {
            return t[e]
        }) : [];
        var t
    }

    function Q(e) {
        return e
    }

    function Y(n, t, e) {
        var i = U(t),
            o = f(t, i);
        null != e || q(t) && (o.length || !i.length) || (e = t, t = n, n = this, o = f(t, U(t)));
        var r = !(q(e) && "chain" in e) || e.chain,
            s = H(n);
        return $e(o, function(e) {
            var i = t[e];
            n[e] = i, s && (n.prototype[e] = function() {
                var e = this.__chain__;
                if (r || e) {
                    var t = n(this.__wrapped__);
                    return (t.__actions__ = k(this.__actions__)).push({
                        func: i,
                        args: arguments,
                        thisArg: n
                    }), t.__chain__ = e, t
                }
                return i.apply(n, a([this.value()], arguments))
            })
        }), n
    }
    var G, K, J = /[&<>"'`]/g,
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
        ie = (De = {
            function: !0,
            object: !0
        })[typeof exports] && exports && !exports.nodeType ? exports : G,
        ne = De[typeof module] && module && !module.nodeType ? module : G,
        oe = ne && ne.exports === ie ? ie : G,
        re = e(De[typeof self] && self),
        se = e(De[typeof window] && window),
        ae = e(De[typeof this] && this),
        le = e(ie && ne && "object" == typeof global && global) || se !== (ae && ae.window) && se || re || ae || Function("return this")(),
        ce = Array.prototype,
        de = Object.prototype,
        ue = de.hasOwnProperty,
        pe = 0,
        he = de.toString,
        fe = le._,
        me = (Ne = le.Reflect) ? Ne.f : G,
        ge = Object.create,
        ve = de.propertyIsEnumerable,
        ye = le.isFinite,
        we = Object.keys,
        be = Math.max,
        $e = (K = h, function(e, t) {
            if (null == e) return e;
            if (!N(e)) return K(e, t);
            for (var i = e.length, n = -1, o = Object(e); ++n < i && !1 !== t(o[n], n, o););
            return e
        }),
        ke = function(e, t, i) {
            for (var n = -1, o = Object(e), r = (i = i(e)).length; r--;) {
                var s = i[++n];
                if (!1 === t(o[s], s, o)) break
            }
            return e
        };
    me && !ve.call({
        valueOf: 1
    }, "valueOf") && (v = function(e) {
        e = me(e);
        for (var t, i = []; !(t = e.next()).done;) i.push(t.value);
        return i
    });
    var Ce, Te = b("length"),
        xe = j(function(e, t) {
            return Ee(e) || (e = null == e ? [] : [Object(e)]), p(t, 1), a(k(e), V)
        }),
        Se = j(function(a, l, c) {
            if ("function" != typeof a) throw new TypeError("Expected a function");
            var i, d = (i = a, function() {
                var e = arguments,
                    t = s(i.prototype);
                return q(e = i.apply(t, e)) ? e : t
            });
            return function e() {
                for (var t = -1, i = arguments.length, n = -1, o = c.length, r = Array(o + i), s = this && this !== le && this instanceof e ? d : a; ++n < o;) r[n] = c[n];
                for (; i--;) r[n++] = arguments[++t];
                return s.apply(l, r)
            }
        }),
        _e = j(function(e, t) {
            return l(e, 1, t)
        }),
        Pe = j(function(e, t, i) {
            return l(e, Ie(t) || 0, i)
        }),
        Ee = Array.isArray,
        Ae = Number,
        Ie = Number,
        Oe = x(function(e, t) {
            T(t, U(t), e)
        }),
        je = x(function(e, t) {
            T(t, X(t), e)
        }),
        Le = x(function(e, t, i, n) {
            T(t, X(t), e, n)
        }),
        De = j(function(e) {
            return e.push(G, o), Le.apply(G, e)
        }),
        ae = j(function(e, t) {
            return null == e ? {} : (i = e, t = p(t, 1), i = Object(i), I(t, function(e, t) {
                return t in i && (e[t] = i[t]), e
            }, {}));
            var i
        }),
        Ne = g;
    (n.prototype = s(r.prototype)).constructor = n, r.assignIn = je, r.before = O, r.bind = Se, r.chain = function(e) {
        return (e = r(e)).__chain__ = !0, e
    }, r.compact = function(e) {
        return d(e, Boolean)
    }, r.concat = xe, r.create = function(e, t) {
        return e = s(e), t ? Oe(e, t) : e
    }, r.defaults = De, r.defer = _e, r.delay = Pe, r.filter = function(e, t) {
        return d(e, g(t))
    }, r.flatten = function(e) {
        return e && e.length ? p(e, 1) : []
    }, r.flattenDeep = function(e) {
        return e && e.length ? p(e, 1 / 0) : []
    }, r.iteratee = Ne, r.keys = U, r.map = function(e, t) {
        return y(e, g(t))
    }, r.matches = function(e) {
        return w(Oe({}, e))
    }, r.mixin = Y, r.negate = function(e) {
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return function() {
            return !e.apply(this, arguments)
        }
    }, r.once = function(e) {
        return O(2, e)
    }, r.pick = ae, r.slice = function(e, t, i) {
        var n = e ? e.length : 0;
        return i = i === G ? n : +i, n ? $(e, null == t ? 0 : +t, i) : []
    }, r.sortBy = function(e, n) {
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
                        r = i === G,
                        s = i == i,
                        a = null === n,
                        l = n === G,
                        c = n == n;
                    if (n < i && !a || !s || o && !l && c || r && c) {
                        i = 1;
                        break e
                    }
                    if (i < n && !o || !c || a && !r && s || l && s) {
                        i = -1;
                        break e
                    }
                }
                i = 0
            }
            return i || e.b - t.b
        }), b("c"))
    }, r.tap = function(e, t) {
        return t(e), e
    }, r.thru = function(e, t) {
        return t(e)
    }, r.toArray = function(e) {
        return N(e) ? e.length ? k(e) : [] : V(e)
    }, r.values = V, r.extend = je, Y(r, r), r.clone = function(e) {
        return q(e) ? Ee(e) ? k(e) : T(e, U(e)) : e
    }, r.escape = function(e) {
        return (e = B(e)) && Z.test(e) ? e.replace(J, i) : e
    }, r.every = function(e, t, i) {
        return n = g(t = i ? G : t), o = !0, $e(e, function(e, t, i) {
            return o = !!n(e, t, i)
        }), o;
        var n, o
    }, r.find = E, r.forEach = A, r.has = function(e, t) {
        return null != e && ue.call(e, t)
    }, r.head = P, r.identity = Q, r.indexOf = function(e, t, i) {
        var n = e ? e.length : 0;
        i = ((i = "number" == typeof i ? i < 0 ? be(n + i, 0) : i : 0) || 0) - 1;
        for (var o = t == t; ++i < n;) {
            var r = e[i];
            if (o ? r === t : r != r) return i
        }
        return -1
    }, r.isArguments = D, r.isArray = Ee, r.isBoolean = function(e) {
        return !0 === e || !1 === e || z(e) && "[object Boolean]" == he.call(e)
    }, r.isDate = function(e) {
        return z(e) && "[object Date]" == he.call(e)
    }, r.isEmpty = function(e) {
        if (N(e) && (Ee(e) || W(e) || H(e.splice) || D(e))) return !e.length;
        for (var t in e)
            if (ue.call(e, t)) return !1;
        return !0
    }, r.isEqual = function(e, t) {
        return m(e, t)
    }, r.isFinite = function(e) {
        return "number" == typeof e && ye(e)
    }, r.isFunction = H, r.isNaN = function(e) {
        return F(e) && e != +e
    }, r.isNull = function(e) {
        return null === e
    }, r.isNumber = F, r.isObject = q, r.isRegExp = function(e) {
        return q(e) && "[object RegExp]" == he.call(e)
    }, r.isString = W, r.isUndefined = function(e) {
        return e === G
    }, r.last = function(e) {
        var t = e ? e.length : 0;
        return t ? e[t - 1] : G
    }, r.max = function(e) {
        return e && e.length ? t(e, Q, L) : G
    }, r.min = function(e) {
        return e && e.length ? t(e, Q, R) : G
    }, r.noConflict = function() {
        return le._ === this && (le._ = fe), this
    }, r.noop = function() {}, r.reduce = I, r.result = function(e, t, i) {
        return (t = null == e ? G : e[t]) === G && (t = i), H(t) ? t.call(e) : t
    }, r.size = function(e) {
        return null == e ? 0 : (e = N(e) ? e : U(e)).length
    }, r.some = function(e, t, i) {
        return C(e, g(t = i ? G : t))
    }, r.uniqueId = function(e) {
        var t = ++pe;
        return B(e) + t
    }, r.each = A, r.first = P, Y(r, (Ce = {}, h(r, function(e, t) {
        ue.call(r.prototype, t) || (Ce[t] = e)
    }), Ce), {
        chain: !1
    }), r.VERSION = "4.5.1", $e("pop join replace reverse split push shift sort splice unshift".split(" "), function(e) {
        var i = (/^(?:replace|split)$/.test(e) ? String.prototype : ce)[e],
            n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
            o = /^(?:pop|join|replace|shift)$/.test(e);
        r.prototype[e] = function() {
            var t = arguments;
            return o && !this.__chain__ ? i.apply(this.value(), t) : this[n](function(e) {
                return i.apply(e, t)
            })
        }
    }), r.prototype.toJSON = r.prototype.valueOf = r.prototype.value = function() {
        return e = this.__wrapped__, I(this.__actions__, function(e, t) {
            return t.func.apply(t.thisArg, a([e], t.args))
        }, e);
        var e
    }, (se || re || {})._ = r, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return r
    }) : ie && ne ? (oe && ((ne.exports = r)._ = r), ie._ = r) : le._ = r
}.call(this), window.mobileCheck = function() {
        var e = !1,
            t = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
    },
    function(p, h, f) {
        function a(e, t) {
            return typeof e === t
        }

        function m(e) {
            return "function" != typeof h.createElement ? h.createElement(e) : y ? h.createElementNS.call(h, "http://www.w3.org/2000/svg", e) : h.createElement.apply(h, arguments)
        }

        function g(e) {
            return e.replace(/([A-Z])/g, function(e, t) {
                return "-" + t.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function n(e, t, i, n, o) {
            var r = e.charAt(0).toUpperCase() + e.slice(1),
                s = (e + " " + u.join(r + " ") + r).split(" ");
            return a(t, "string") || void 0 === t ? function(e, t, i, n) {
                function o() {
                    s && (delete $.style, delete $.modElem)
                }
                if (n = !(void 0 === n) && n, void 0 !== i) {
                    var r = function(e, t) {
                        var i = e.length;
                        if ("CSS" in p && "supports" in p.CSS) {
                            for (; i--;)
                                if (p.CSS.supports(g(e[i]), t)) return !0;
                            return !1
                        }
                        if ("CSSSupportsRule" in p) {
                            for (var n = []; i--;) n.push("(" + g(e[i]) + ":" + t + ")");
                            return function(e, t) {
                                var i, n, o, r = "modernizr",
                                    s = m("div"),
                                    a = ((o = h.body) || ((o = m(y ? "svg" : "body")).fake = !0), o);
                                if (parseInt(t, 10))
                                    for (; t--;)(i = m("div")).id = r + (t + 1), s.appendChild(i);
                                return (o = m("style")).type = "text/css", o.id = "s" + r, (a.fake ? a : s).appendChild(o), a.appendChild(s), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(h.createTextNode(e)), s.id = r, a.fake && (a.style.background = "", a.style.overflow = "hidden", n = v.style.overflow, v.style.overflow = "hidden", v.appendChild(a)), e = "absolute" == getComputedStyle(s, null).position, a.fake ? (a.parentNode.removeChild(a), v.style.overflow = n, v.offsetHeight) : s.parentNode.removeChild(s), !!e
                            }("@supports (" + (n = n.join(" or ")) + ") { #modernizr { position: absolute; } }")
                        }
                        return f
                    }(e, i);
                    if (void 0 !== r) return r
                }
                for (var s, a, l, c, d, u = ["modernizr", "tspan", "samp"]; !$.style && u.length;) s = !0, $.modElem = m(u.shift()), $.style = $.modElem.style;
                for (l = e.length, a = 0; a < l; a++)
                    if (c = e[a], d = $.style[c], ~("" + c).indexOf("-") && (c = c.replace(/([a-z])-([a-z])/g, function(e, t, i) {
                            return t + i.toUpperCase()
                        }).replace(/^-/, "")), $.style[c] !== f) {
                        if (n || void 0 === i) return o(), "pfx" != t || c;
                        try {
                            $.style[c] = i
                        } catch (e) {}
                        if ($.style[c] != d) return o(), "pfx" != t || c
                    } return o(), !1
            }(s, t, n, o) : function(e, t, i) {
                var n, o;
                for (o in e)
                    if (e[o] in t) return !1 === i ? e[o] : a(n = t[e[o]], "function") ? function(e, t) {
                        return function() {
                            return e.apply(t, arguments)
                        }
                    }(n, i || t) : n;
                return !1
            }(s = (e + " " + w.join(r + " ") + r).split(" "), t, i)
        }

        function e(e, t, i) {
            return n(e, f, f, t, i)
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
        d.prototype = t, (d = new d).addTest("svg", !!h.createElementNS && !!h.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
        var v = h.documentElement,
            y = "svg" === v.nodeName.toLowerCase(),
            i = "Moz O ms Webkit",
            u = t._config.usePrefixes ? i.split(" ") : [];
        t._cssomPrefixes = u;
        var w = t._config.usePrefixes ? i.toLowerCase().split(" ") : [];
        t._domPrefixes = w;
        var o = {
            elem: m("modernizr")
        };
        d._q.push(function() {
            delete o.elem
        });
        var r, s, b, $ = {
            style: o.elem.style
        };
        d._q.unshift(function() {
                delete $.style
            }), t.testAllProps = n, t.testAllProps = e, d.addTest("flexbox", e("flexBasis", "1px", !0)), d.addTest("csstransforms", function() {
                return -1 === navigator.userAgent.indexOf("Android 2.") && e("transform", "scale(1)", !0)
            }),
            function() {
                var e, t, i, n, o, r, s;
                for (s in c)
                    if (c.hasOwnProperty(s)) {
                        if (e = [], (t = c[s]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                            for (i = 0; i < t.options.aliases.length; i++) e.push(t.options.aliases[i].toLowerCase());
                        for (n = a(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) 1 === (r = e[o].split(".")).length ? d[r[0]] = n : (!d[r[0]] || d[r[0]] instanceof Boolean || (d[r[0]] = new Boolean(d[r[0]])), d[r[0]][r[1]] = n), l.push((n ? "" : "no-") + r.join("-"))
                    }
            }(), r = l, s = v.className, b = d._config.classPrefix || "", y && (s = s.baseVal), d._config.enableJSClass && (i = new RegExp("(^|\\s)" + b + "no-js(\\s|$)"), s = s.replace(i, "$1" + b + "js$2")), d._config.enableClasses && (s += " " + b + r.join(" " + b), y ? v.className.baseVal = s : v.className = s), delete t.addTest, delete t.addAsyncTest;
        for (var k = 0; k < d._q.length; k++) d._q[k]();
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
    }(function(s) {
        "use strict";
        var a = window.Slick,
            n = 0;
        (a = function(e, t) {
            var i = this;
            i.defaults = {
                accessibility: !0,
                appendArrows: s(e),
                appendDots: s(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous slide" tabindex="0" role="button">Previous slide</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next slide" tabindex="0" role="button">Next slide</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                cssEase: "ease",
                customPaging: function(e, t) {
                    return s('<button type="button" data-role="none" role="button" tabindex="0" />').text("Slide " + (t + 1))
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
            }, s.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.focussed = !1, i.interrupted = !1, i.hidden = "hidden", i.paused = !0, i.positionProp = null, i.respondTo = null, i.rowCount = 1, i.shouldClick = !0, i.$slider = s(e), i.$slidesCache = null, i.transformType = null, i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, i.windowTimer = null, e = s(e).data("slick") || {}, i.options = s.extend({}, i.defaults, t, e), i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, void 0 !== document.mozHidden ? (i.hidden = "mozHidden", i.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (i.hidden = "webkitHidden", i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = s.proxy(i.autoPlay, i), i.autoPlayClear = s.proxy(i.autoPlayClear, i), i.autoPlayIterator = s.proxy(i.autoPlayIterator, i), i.changeSlide = s.proxy(i.changeSlide, i), i.clickHandler = s.proxy(i.clickHandler, i), i.selectHandler = s.proxy(i.selectHandler, i), i.setPosition = s.proxy(i.setPosition, i), i.swipeHandler = s.proxy(i.swipeHandler, i), i.dragHandler = s.proxy(i.dragHandler, i), i.keyHandler = s.proxy(i.keyHandler, i), i.instanceUid = n++, i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, i.init(!0)
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
            }, n.options.speed, n.options.easing, t) : !1 === n.cssTransitions ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft), s({
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
            return e && null !== e && (e = s(e).not(this.$slider)), e
        }, a.prototype.asNavFor = function(t) {
            var e = this.getNavTarget();
            null !== e && "object" == typeof e && e.each(function() {
                var e = s(this).slick("getSlick");
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
            !0 === e.options.arrows && (e.$prevArrow = s(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = s(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, a.prototype.buildDots = function() {
            var e, t, i = this;
            if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
                for (i.$slider.addClass("slick-dotted"), t = s("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append(s("<li />").append(i.options.customPaging.call(this, i, e)));
                i.$dots = t.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, a.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                s(t).attr("data-slick-index", e).data("originalStyling", s(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? s('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 === e.options.swipeToSlide && (e.options.slidesToScroll = 1), s("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, a.prototype.buildRows = function() {
            var e, t, i, n = this,
                o = document.createDocumentFragment(),
                r = n.$slider.children();
            if (1 < n.options.rows) {
                for (i = n.options.slidesPerRow * n.options.rows, t = Math.ceil(r.length / i), e = 0; e < t; e++) {
                    for (var s = document.createElement("div"), a = 0; a < n.options.rows; a++) {
                        for (var l = document.createElement("div"), c = 0; c < n.options.slidesPerRow; c++) {
                            var d = e * i + (a * n.options.slidesPerRow + c);
                            r.get(d) && l.appendChild(r.get(d))
                        }
                        s.appendChild(l)
                    }
                    o.appendChild(s)
                }
                n.$slider.empty().append(o), n.$slider.children().children().children().css({
                    width: 100 / n.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, a.prototype.changeSlide = function(e, t) {
            var i, n = this,
                o = s(e.currentTarget);
            switch (o.is("a") && e.preventDefault(), o.is("li") || (o = o.closest("li")), i = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
                case "previous":
                    r = 0 == i ? n.options.slidesToScroll : n.options.slidesToShow - i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - r, !1, t);
                    break;
                case "next":
                    r = 0 == i ? n.options.slidesToScroll : i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + r, !1, t);
                    break;
                case "index":
                    var r = 0 === e.data.index ? 0 : e.data.index || o.index() * n.options.slidesToScroll;
                    n.slideHandler(n.checkNavigable(r), !1, t), o.children().trigger("focus");
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
            e.options.dots && null !== e.$dots && s("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", s.proxy(e.interrupt, e, !0)).off("mouseleave.slick", s.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), s(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && s(e.$slideTrack).children().off("click.slick", e.selectHandler), s(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), s(window).off("resize.slick.slick-" + e.instanceUid, e.resize), s("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), s(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), s(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, a.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", s.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", s.proxy(e.interrupt, e, !1))
        }, a.prototype.cleanUpRows = function() {
            var e;
            1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
        }, a.prototype.clickHandler = function(e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, a.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), s(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                s(this).attr("style", s(this).data("originalStyling"))
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
                var t = s(this);
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
                if (+t.offsetLeft + s(t).outerWidth() / 2 > -1 * n.swipeLeft) return i = t, !1
            }), Math.abs(s(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        }, a.prototype.goTo = a.prototype.slickGoTo = function(e, t) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, a.prototype.init = function(e) {
            var t = this;
            s(t.$slider).hasClass("slick-initialized") || (s(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateDots(), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, a.prototype.initADA = function() {
            var i, n, o, r = this;
            r.$slides.not(r.$slideTrack.find(".slick-cloned")).each(function(e) {
                s(this).attr("role", "option");
                var t = Math.floor(e / r.options.slidesToShow);
                !0 === r.options.dots && (n = "" + r.instanceUid + t, i === (o = n) && (n = "" + n + e), s(this).attr("id", "slickSlide" + n).attr("role", "tabpanel").attr("aria-labelledby", "slickDot" + o), i = "" + r.instanceUid + t)
            }), null !== r.$dots && r.$dots.attr("role", "tablist").find("li").each(function(e) {
                s(this).attr({
                    role: "tab",
                    "aria-selected": "false",
                    "aria-controls": "slickSlide" + r.instanceUid + e,
                    id: "slickDot" + r.instanceUid + e
                })
            }).first().attr("aria-selected", "true"), r.activateADA()
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
            !0 === e.options.dots && e.slideCount > e.options.slidesToShow && s("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && s("li", e.$dots).on("mouseenter.slick", s.proxy(e.interrupt, e, !0)).on("mouseleave.slick", s.proxy(e.interrupt, e, !1))
        }, a.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", s.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", s.proxy(e.interrupt, e, !1)))
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
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), s(document).on(e.visibilityChange, s.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && s(e.$slideTrack).children().on("click.slick", e.selectHandler), s(window).on("orientationchange.slick.slick-" + e.instanceUid, s.proxy(e.orientationChange, e)), s(window).on("resize.slick.slick-" + e.instanceUid, s.proxy(e.resize, e)), s("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), s(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), s(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
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
                s("img[data-lazy]", e).each(function() {
                    var e = s(this),
                        t = s(this).attr("data-lazy"),
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
            i.slideCount, i.options.slidesToShow, i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), t = i.currentSlide, i.destroy(!0), s.extend(i, i.initials, {
                currentSlide: t
            }), i.init(), e || i.changeSlide({
                data: {
                    message: "index",
                    index: t
                }
            }, !1)
        }, a.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.setProps(), e.setupInfinite(), e.buildArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), !0 === e.options.focusOnSelect && s(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, a.prototype.resize = function() {
            var e = this;
            s(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = s(window).width(), e.unslicked || e.setPosition()
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
                i = n.slideWidth * e * -1, !0 === n.options.rtl ? s(t).css({
                    position: "relative",
                    right: i,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                }) : s(t).css({
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
            "object" === s.type(arguments[0]) ? (e = arguments[0], o = arguments[1], i = "multiple") : "string" === s.type(arguments[0]) && (e = arguments[0], o = arguments[2], void 0 !== (t = arguments[1]) && (i = "single")), "single" === i ? n.options[e] = t : "multiple" === i && s.each(e, function(e, t) {
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
                for (i = n.options.slidesToShow, e = n.slideCount; e > n.slideCount - i; --e) t = e - 1, s(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < i; e += 1) t = e, s(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
                n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    s(this).attr("id", "")
                })
            }
        }, a.prototype.interrupt = function(e) {
            e || this.autoPlay(), this.interrupted = e
        }, a.prototype.selectHandler = function(e) {
            var t = this,
                e = s(e.target).is(".slick-slide") ? s(e.target) : s(e.target).parents(".slick-slide"),
                e = (e = parseInt(e.attr("data-slick-index"))) || 0;
            return t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(e), void t.asNavFor(e)) : void t.slideHandler(e)
        }, a.prototype.slideHandler = function(e, t, i) {
            var n, o, r, s = this;
            if (t = t || !1, (!0 !== s.animating || !0 !== s.options.waitForAnimate) && !(!0 === s.options.fade && s.currentSlide === e || s.slideCount <= s.options.slidesToShow)) return !1 === t && s.asNavFor(e), t = e, r = s.getLeft(t), e = s.getLeft(s.currentSlide), s.currentLeft = null === s.swipeLeft ? e : s.swipeLeft, s.options.autoplay && clearInterval(s.autoPlayTimer), n = t < 0 ? s.slideCount % s.options.slidesToScroll != 0 ? s.slideCount - s.slideCount % s.options.slidesToScroll : s.slideCount + t : t >= s.slideCount ? s.slideCount % s.options.slidesToScroll != 0 ? 0 : t - s.slideCount : t, s.animating = !0, s.$slider.trigger("beforeChange", [s, s.currentSlide, n]), t = s.currentSlide, s.currentSlide = n, s.setSlideClasses(s.currentSlide), s.options.asNavFor && (o = (o = s.getNavTarget()).slick("getSlick")).slideCount <= o.options.slidesToShow && o.setSlideClasses(s.currentSlide), s.updateDots(), !0 === s.options.fade ? void(!0 !== i ? (s.fadeSlideOut(t), s.fadeSlide(n, function() {
                s.postSlide(n)
            })) : s.postSlide(n)) : void(!0 !== i ? s.animateSlide(r, function() {
                s.postSlide(n)
            }) : s.postSlide(n))
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
            s(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, a.prototype.unslick = function(e) {
            this.$slider.trigger("unslick", [this, e]), this.destroy()
        }, a.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
        }, a.prototype.visibility = function() {
            this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
        }, s.fn.slick = function() {
            for (var e, t = this, i = arguments[0], n = Array.prototype.slice.call(arguments, 1), o = t.length, r = 0; r < o; r++)
                if ("object" == typeof i || void 0 === i ? t[r].slick = new a(t[r], i) : e = t[r].slick[i].apply(t[r].slick, n), void 0 !== e) return e;
            return t
        }
    }),
    function(e, d) {
        var n, t = e.jQuery || e.Cowboy || (e.Cowboy = {});
        t.throttle = n = function(o, r, s, a) {
            function e() {
                function e() {
                    c = +new Date, s.apply(t, n)
                }
                var t = this,
                    i = new Date - c,
                    n = arguments;
                a && !l && e(), l && clearTimeout(l), a === d && o < i ? e() : !0 !== r && (l = setTimeout(a ? function() {
                    l = d
                } : e, a === d ? o - i : o))
            }
            var l, c = 0;
            return "boolean" != typeof r && (a = s, s = r, r = d), t.guid && (e.guid = s.guid = s.guid || t.guid++), e
        }, t.debounce = function(e, t, i) {
            return i === d ? n(e, t, !1) : n(e, i, !1 !== t)
        }
    }(this),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
    }(function(c) {
        function e() {}

        function d(e, t) {
            f.ev.on("mfp" + e + b, t)
        }

        function u(e, t, i, n) {
            var o = document.createElement("div");
            return o.className = "mfp-" + e, i && (o.innerHTML = i), n ? t && t.appendChild(o) : (o = c(o), t && o.appendTo(t)), o
        }

        function p(e, t) {
            f.ev.triggerHandler("mfp" + e, t), f.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), f.st.callbacks[e] && f.st.callbacks[e].apply(f, c.isArray(t) ? t : [t]))
        }

        function h(e) {
            return e === t && f.currTemplate.closeBtn || (f.currTemplate.closeBtn = c(f.st.closeMarkup.replace("%title%", f.st.tClose)), t = e), f.currTemplate.closeBtn
        }

        function r() {
            c.magnificPopup.instance || ((f = new e).init(), c.magnificPopup.instance = f)
        }
        var f, n, m, o, g, t, l = "Close",
            v = "BeforeClose",
            y = "MarkupParse",
            w = "Open",
            b = ".mfp",
            $ = "mfp-ready",
            i = "mfp-removing",
            s = "mfp-prevent-close",
            a = !!window.jQuery,
            k = c(window);

        function C() {
            S && (x.after(S.addClass(T)).detach(), S = null)
        }
        e.prototype = {
            constructor: e,
            init: function() {
                var e = navigator.appVersion;
                f.isIE7 = -1 !== e.indexOf("MSIE 7."), f.isIE8 = -1 !== e.indexOf("MSIE 8."), f.isLowIE = f.isIE7 || f.isIE8, f.isAndroid = /android/gi.test(e), f.isIOS = /iphone|ipad|ipod/gi.test(e), f.supportsTransition = function() {
                    var e = document.createElement("p").style,
                        t = ["ms", "O", "Moz", "Webkit"];
                    if (void 0 !== e.transition) return !0;
                    for (; t.length;)
                        if (t.pop() + "Transition" in e) return !0;
                    return !1
                }(), f.probablyMobile = f.isAndroid || f.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), m = c(document), f.popupsCache = {}
            },
            open: function(e) {
                if (!1 === e.isObj) {
                    f.items = e.items.toArray(), f.index = 0;
                    for (var t, i = e.items, n = 0; n < i.length; n++)
                        if ((t = i[n]).parsed && (t = t.el[0]), t === e.el[0]) {
                            f.index = n;
                            break
                        }
                } else f.items = c.isArray(e.items) ? e.items : [e.items], f.index = e.index || 0;
                if (!f.isOpen) {
                    f.types = [], g = "", f.ev = e.mainEl && e.mainEl.length ? e.mainEl.eq(0) : m, e.key ? (f.popupsCache[e.key] || (f.popupsCache[e.key] = {}), f.currTemplate = f.popupsCache[e.key]) : f.currTemplate = {}, f.st = c.extend(!0, {}, c.magnificPopup.defaults, e), f.fixedContentPos = "auto" === f.st.fixedContentPos ? !f.probablyMobile : f.st.fixedContentPos, f.st.modal && (f.st.closeOnContentClick = !1, f.st.closeOnBgClick = !1, f.st.showCloseBtn = !1, f.st.enableEscapeKey = !1), f.bgOverlay || (f.bgOverlay = u("bg").on("click" + b, function() {
                        f.close()
                    }), f.wrap = u("wrap").attr("tabindex", -1).on("click" + b, function(e) {
                        f._checkIfClose(e.target) && f.close()
                    }), f.container = u("container", f.wrap)), f.contentContainer = u("content"), f.st.preloader && (f.preloader = u("preloader", f.container, f.st.tLoading));
                    for (var o = c.magnificPopup.modules, n = 0; n < o.length; n++) {
                        var r = (r = o[n]).charAt(0).toUpperCase() + r.slice(1);
                        f["init" + r].call(f)
                    }
                    p("BeforeOpen"), f.st.showCloseBtn && (f.st.closeBtnInside ? (d(y, function(e, t, i, n) {
                        i.close_replaceWith = h(n.type)
                    }), g += " mfp-close-btn-in") : f.wrap.append(h())), f.st.alignTop && (g += " mfp-align-top"), f.wrap.css(f.fixedContentPos ? {
                        overflow: f.st.overflowY,
                        overflowX: "hidden",
                        overflowY: f.st.overflowY
                    } : {
                        top: k.scrollTop(),
                        position: "absolute"
                    }), !1 !== f.st.fixedBgPos && ("auto" !== f.st.fixedBgPos || f.fixedContentPos) || f.bgOverlay.css({
                        height: m.height(),
                        position: "absolute"
                    }), f.st.enableEscapeKey && m.on("keyup" + b, function(e) {
                        27 === e.keyCode && f.close()
                    }), k.on("resize" + b, function() {
                        f.updateSize()
                    }), f.st.closeOnContentClick || (g += " mfp-auto-cursor"), g && f.wrap.addClass(g);
                    var s = f.wH = k.height(),
                        a = {};
                    f.fixedContentPos && f._hasScrollBar(s) && (l = f._getScrollbarSize()) && (a.marginRight = l), f.fixedContentPos && (f.isIE7 ? c("body, html").css("overflow", "hidden") : a.overflow = "hidden");
                    var l = f.st.mainClass;
                    return f.isIE7 && (l += " mfp-ie7"), l && f._addClassToMFP(l), f.updateItemHTML(), p("BuildControls"), c("html").css(a), f.bgOverlay.add(f.wrap).prependTo(f.st.prependTo || c(document.body)), f._lastFocusedEl = document.activeElement, setTimeout(function() {
                        f.content ? (f._addClassToMFP($), f._setFocus()) : f.bgOverlay.addClass($), m.on("focusin" + b, f._onFocusIn)
                    }, 16), f.isOpen = !0, f.updateSize(s), p(w), e
                }
                f.updateItemHTML()
            },
            close: function() {
                f.isOpen && (p(v), f.isOpen = !1, f.st.removalDelay && !f.isLowIE && f.supportsTransition ? (f._addClassToMFP(i), setTimeout(function() {
                    f._close()
                }, f.st.removalDelay)) : f._close())
            },
            _close: function() {
                p(l);
                var e = i + " " + $ + " ";
                f.bgOverlay.detach(), f.wrap.detach(), f.container.empty(), f.st.mainClass && (e += f.st.mainClass + " "), f._removeClassFromMFP(e), f.fixedContentPos && (e = {
                    marginRight: ""
                }, f.isIE7 ? c("body, html").css("overflow", "") : e.overflow = "", c("html").css(e)), m.off("keyup.mfp focusin" + b), f.ev.off(b), f.wrap.attr("class", "mfp-wrap").removeAttr("style"), f.bgOverlay.attr("class", "mfp-bg"), f.container.attr("class", "mfp-container"), !f.st.showCloseBtn || f.st.closeBtnInside && !0 !== f.currTemplate[f.currItem.type] || f.currTemplate.closeBtn && f.currTemplate.closeBtn.detach(), f._lastFocusedEl && c(f._lastFocusedEl).focus(), f.currItem = null, f.content = null, f.currTemplate = null, f.prevHeight = 0, p("AfterClose")
            },
            updateSize: function(e) {
                var t;
                f.isIOS ? (t = document.documentElement.clientWidth / window.innerWidth, t = window.innerHeight * t, f.wrap.css("height", t), f.wH = t) : f.wH = e || k.height(), f.fixedContentPos || f.wrap.css("height", f.wH), p("Resize")
            },
            updateItemHTML: function() {
                var e = f.items[f.index];
                f.contentContainer.detach(), f.content && f.content.detach(), e.parsed || (e = f.parseEl(f.index));
                var t = e.type;
                p("BeforeChange", [f.currItem ? f.currItem.type : "", t]), f.currItem = e, f.currTemplate[t] || (p("FirstMarkupParse", i = !!f.st[t] && f.st[t].markup), f.currTemplate[t] = !i || c(i)), o && o !== e.type && f.container.removeClass("mfp-" + o + "-holder");
                var i = f["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, f.currTemplate[t]);
                f.appendContent(i, t), e.preloaded = !0, p("Change", e), o = e.type, f.container.prepend(f.contentContainer), p("AfterChange")
            },
            appendContent: function(e, t) {
                (f.content = e) ? f.st.showCloseBtn && f.st.closeBtnInside && !0 === f.currTemplate[t] ? f.content.find(".mfp-close").length || f.content.append(h()) : f.content = e: f.content = "", p("BeforeAppend"), f.container.addClass("mfp-" + t + "-holder"), f.contentContainer.append(f.content)
            },
            parseEl: function(e) {
                var t, i = f.items[e];
                if ((i = i.tagName ? {
                        el: c(i)
                    } : (t = i.type, {
                        data: i,
                        src: i.src
                    })).el) {
                    for (var n = f.types, o = 0; o < n.length; o++)
                        if (i.el.hasClass("mfp-" + n[o])) {
                            t = n[o];
                            break
                        } i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
                }
                return i.type = t || f.st.type || "inline", i.index = e, i.parsed = !0, p("ElementParse", f.items[e] = i), f.items[e]
            },
            addGroup: function(t, i) {
                function e(e) {
                    e.mfpEl = this, f._openClick(e, t, i)
                }
                var n = "click.magnificPopup";
                (i = i || {}).mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, e)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, e) : (i.items = t).off(n).on(n, e))
            },
            _openClick: function(e, t, i) {
                if ((void 0 !== i.midClick ? i : c.magnificPopup.defaults).midClick || 2 !== e.which && !e.ctrlKey && !e.metaKey) {
                    var n = (void 0 !== i.disableOn ? i : c.magnificPopup.defaults).disableOn;
                    if (n)
                        if (c.isFunction(n)) {
                            if (!n.call(f)) return !0
                        } else if (k.width() < n) return !0;
                    e.type && (e.preventDefault(), f.isOpen && e.stopPropagation()), i.el = c(e.mfpEl), i.delegate && (i.items = t.find(i.delegate)), f.open(i)
                }
            },
            updateStatus: function(e, t) {
                var i;
                f.preloader && (n !== e && f.container.removeClass("mfp-s-" + n), t || "loading" !== e || (t = f.st.tLoading), p("UpdateStatus", i = {
                    status: e,
                    text: t
                }), e = i.status, t = i.text, f.preloader.html(t), f.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), f.container.addClass("mfp-s-" + e), n = e)
            },
            _checkIfClose: function(e) {
                if (!c(e).hasClass(s)) {
                    var t = f.st.closeOnContentClick,
                        i = f.st.closeOnBgClick;
                    if (t && i) return !0;
                    if (!f.content || c(e).hasClass("mfp-close") || f.preloader && e === f.preloader[0]) return !0;
                    if (e === f.content[0] || c.contains(f.content[0], e)) {
                        if (t) return !0
                    } else if (i && c.contains(document, e)) return !0;
                    return !1
                }
            },
            _addClassToMFP: function(e) {
                f.bgOverlay.addClass(e), f.wrap.addClass(e)
            },
            _removeClassFromMFP: function(e) {
                this.bgOverlay.removeClass(e), f.wrap.removeClass(e)
            },
            _hasScrollBar: function(e) {
                return (f.isIE7 ? m.height() : document.body.scrollHeight) > (e || k.height())
            },
            _setFocus: function() {
                (f.st.focus ? f.content.find(f.st.focus).eq(0) : f.wrap).focus()
            },
            _onFocusIn: function(e) {
                return e.target === f.wrap[0] || c.contains(f.wrap[0], e.target) ? void 0 : (f._setFocus(), !1)
            },
            _parseMarkup: function(o, e, t) {
                var r;
                t.data && (e = c.extend(t.data, e)), p(y, [o, e, t]), c.each(e, function(e, t) {
                    return void 0 === t || !1 === t || void(1 < (r = e.split("_")).length ? 0 < (i = o.find(b + "-" + r[0])).length && ("replaceWith" === (n = r[1]) ? i[0] !== t[0] && i.replaceWith(t) : "img" === n ? i.is("img") ? i.attr("src", t) : i.replaceWith('<img src="' + t + '" class="' + i.attr("class") + '" />') : i.attr(r[1], t)) : o.find(b + "-" + e).html(t));
                    var i, n
                })
            },
            _getScrollbarSize: function() {
                var e;
                return void 0 === f.scrollbarSize && ((e = document.createElement("div")).style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), f.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), f.scrollbarSize
            }
        }, c.magnificPopup = {
            instance: null,
            proto: e.prototype,
            modules: [],
            open: function(e, t) {
                return r(), (e = e ? c.extend(!0, {}, e) : {}).isObj = !0, e.index = t || 0, this.instance.open(e)
            },
            close: function() {
                return c.magnificPopup.instance && c.magnificPopup.instance.close()
            },
            registerModule: function(e, t) {
                t.options && (c.magnificPopup.defaults[e] = t.options), c.extend(this.proto, t.proto), this.modules.push(e)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading..."
            }
        }, c.fn.magnificPopup = function(e) {
            r();
            var t, i, n, o = c(this);
            return "string" == typeof e ? "open" === e ? (t = a ? o.data("magnificPopup") : o[0].magnificPopup, i = parseInt(arguments[1], 10) || 0, n = t.items ? t.items[i] : (n = o, t.delegate && (n = n.find(t.delegate)), n.eq(i)), f._openClick({
                mfpEl: n
            }, o, t)) : f.isOpen && f[e].apply(f, Array.prototype.slice.call(arguments, 1)) : (e = c.extend(!0, {}, e), a ? o.data("magnificPopup", e) : o[0].magnificPopup = e, f.addGroup(o, e)), o
        };
        var T, x, S, _ = "inline";

        function P() {
            A && c(document.body).removeClass(A)
        }

        function E() {
            P(), f.req && f.req.abort()
        }
        c.magnificPopup.registerModule(_, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    f.types.push(_), d(l + "." + _, function() {
                        C()
                    })
                },
                getInline: function(e, t) {
                    if (C(), e.src) {
                        var i, n = f.st.inline,
                            o = c(e.src);
                        return o.length ? ((i = o[0].parentNode) && i.tagName && (x || (T = n.hiddenClass, x = u(T), T = "mfp-" + T), S = o.after(x).detach().removeClass(T)), f.updateStatus("ready")) : (f.updateStatus("error", n.tNotFound), o = c("<div>")), e.inlineElement = o
                    }
                    return f.updateStatus("ready"), f._parseMarkup(t, {}, e), t
                }
            }
        });
        var A, I, O, j = "ajax";

        function L(e) {
            var t;
            !f.currTemplate[D] || (t = f.currTemplate[D].find("iframe")).length && (e || (t[0].src = "//about:blank"), f.isIE8 && t.css("display", e ? "block" : "none"))
        }
        c.magnificPopup.registerModule(j, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },
            proto: {
                initAjax: function() {
                    f.types.push(j), A = f.st.ajax.cursor, d(l + "." + j, E), d("BeforeChange." + j, E)
                },
                getAjax: function(n) {
                    A && c(document.body).addClass(A), f.updateStatus("loading");
                    var e = c.extend({
                        url: n.src,
                        success: function(e, t, i) {
                            p("ParseAjax", i = {
                                data: e,
                                xhr: i
                            }), f.appendContent(c(i.data), j), n.finished = !0, P(), f._setFocus(), setTimeout(function() {
                                f.wrap.addClass($)
                            }, 16), f.updateStatus("ready"), p("AjaxContentAdded")
                        },
                        error: function() {
                            P(), n.finished = n.loadError = !0, f.updateStatus("error", f.st.ajax.tError.replace("%url%", n.src))
                        }
                    }, f.st.ajax.settings);
                    return f.req = c.ajax(e), ""
                }
            }
        }), c.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },
            proto: {
                initImage: function() {
                    var e = f.st.image,
                        t = ".image";
                    f.types.push("image"), d(w + t, function() {
                        "image" === f.currItem.type && e.cursor && c(document.body).addClass(e.cursor)
                    }), d(l + t, function() {
                        e.cursor && c(document.body).removeClass(e.cursor), k.off("resize" + b)
                    }), d("Resize" + t, f.resizeImage), f.isLowIE && d("AfterChange", f.resizeImage)
                },
                resizeImage: function() {
                    var e, t = f.currItem;
                    t && t.img && f.st.image.verticalFit && (e = 0, f.isLowIE && (e = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", f.wH - e))
                },
                _onImageHasSize: function(e) {
                    e.img && (e.hasSize = !0, I && clearInterval(I), e.isCheckingImgSize = !1, p("ImageHasSize", e), e.imgHidden && (f.content && f.content.removeClass("mfp-loading"), e.imgHidden = !1))
                },
                findImageSize: function(t) {
                    var i = 0,
                        n = t.img[0],
                        o = function(e) {
                            I && clearInterval(I), I = setInterval(function() {
                                return 0 < n.naturalWidth ? void f._onImageHasSize(t) : (200 < i && clearInterval(I), void(3 == ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)))
                            }, e)
                        };
                    o(1)
                },
                getImage: function(e, t) {
                    var i, n = 0,
                        o = function() {
                            e && (e.img[0].complete ? (e.img.off(".mfploader"), e === f.currItem && (f._onImageHasSize(e), f.updateStatus("ready")), e.hasSize = !0, e.loaded = !0, p("ImageLoadComplete")) : ++n < 200 ? setTimeout(o, 100) : r())
                        },
                        r = function() {
                            e && (e.img.off(".mfploader"), e === f.currItem && (f._onImageHasSize(e), f.updateStatus("error", s.tError.replace("%url%", e.src))), e.hasSize = !0, e.loaded = !0, e.loadError = !0)
                        },
                        s = f.st.image,
                        a = t.find(".mfp-img");
                    return a.length && ((i = document.createElement("img")).className = "mfp-img", e.el && e.el.find("img").length && (i.alt = e.el.find("img").attr("alt")), e.img = c(i).on("load.mfploader", o).on("error.mfploader", r), i.src = e.src, a.is("img") && (e.img = e.img.clone()), 0 < (i = e.img[0]).naturalWidth ? e.hasSize = !0 : i.width || (e.hasSize = !1)), f._parseMarkup(t, {
                        title: function(e) {
                            if (e.data && void 0 !== e.data.title) return e.data.title;
                            var t = f.st.image.titleSrc;
                            if (t) {
                                if (c.isFunction(t)) return t.call(f, e);
                                if (e.el) return e.el.attr(t) || ""
                            }
                            return ""
                        }(e),
                        img_replaceWith: e.img
                    }, e), f.resizeImage(), e.hasSize ? (I && clearInterval(I), e.loadError ? (t.addClass("mfp-loading"), f.updateStatus("error", s.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"), f.updateStatus("ready"))) : (f.updateStatus("loading"), e.loading = !0, e.hasSize || (e.imgHidden = !0, t.addClass("mfp-loading"), f.findImageSize(e))), t
                }
            }
        }), c.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(e) {
                    return e.is("img") ? e : e.find("img")
                }
            },
            proto: {
                initZoom: function() {
                    var e, t, i, n, o = f.st.zoom,
                        r = ".zoom";

                    function s(e) {
                        var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            i = "all " + o.duration / 1e3 + "s " + o.easing,
                            n = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            };
                        return n["-webkit-" + (e = "transition")] = n["-moz-" + e] = n["-o-" + e] = n[e] = i, t.css(n), t
                    }

                    function a() {
                        f.content.css("visibility", "visible")
                    }
                    o.enabled && f.supportsTransition && (n = o.duration, d("BuildControls" + r, function() {
                        f._allowZoom() && (clearTimeout(t), f.content.css("visibility", "hidden"), (e = f._getItemToZoom()) ? ((i = s(e)).css(f._getOffset()), f.wrap.append(i), t = setTimeout(function() {
                            i.css(f._getOffset(!0)), t = setTimeout(function() {
                                a(), setTimeout(function() {
                                    i.remove(), e = i = null, p("ZoomAnimationEnded")
                                }, 16)
                            }, n)
                        }, 16)) : a())
                    }), d(v + r, function() {
                        if (f._allowZoom()) {
                            if (clearTimeout(t), f.st.removalDelay = n, !e) {
                                if (!(e = f._getItemToZoom())) return;
                                i = s(e)
                            }
                            i.css(f._getOffset(!0)), f.wrap.append(i), f.content.css("visibility", "hidden"), setTimeout(function() {
                                i.css(f._getOffset())
                            }, 16)
                        }
                    }), d(l + r, function() {
                        f._allowZoom() && (a(), i && i.remove(), e = null)
                    }))
                },
                _allowZoom: function() {
                    return "image" === f.currItem.type
                },
                _getItemToZoom: function() {
                    return !!f.currItem.hasSize && f.currItem.img
                },
                _getOffset: function(e) {
                    var t, i = (t = e ? f.currItem.img : f.st.zoom.opener(f.currItem.el || f.currItem)).offset(),
                        n = parseInt(t.css("padding-top"), 10),
                        e = parseInt(t.css("padding-bottom"), 10);
                    return i.top -= c(window).scrollTop() - n, n = {
                        width: t.width(),
                        height: (a ? t.innerHeight() : t[0].offsetHeight) - e - n
                    }, void 0 === O && (O = void 0 !== document.createElement("p").style.MozTransform), O ? n["-moz-transform"] = n.transform = "translate(" + i.left + "px," + i.top + "px)" : (n.left = i.left, n.top = i.top), n
                }
            }
        });
        var D = "iframe";

        function N(e) {
            var t = f.items.length;
            return t - 1 < e ? e - t : e < 0 ? t + e : e
        }

        function H(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        }
        c.magnificPopup.registerModule(D, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    f.types.push(D), d("BeforeChange", function(e, t, i) {
                        t !== i && (t === D ? L() : i === D && L(!0))
                    }), d(l + "." + D, function() {
                        L()
                    })
                },
                getIframe: function(e, t) {
                    var i = e.src,
                        n = f.st.iframe;
                    c.each(n.patterns, function() {
                        return -1 < i.indexOf(this.index) ? (this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1) : void 0
                    });
                    var o = {};
                    return n.srcAction && (o[n.srcAction] = i), f._parseMarkup(t, o, e), f.updateStatus("ready"), t
                }
            }
        }), c.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            },
            proto: {
                initGallery: function() {
                    var r = f.st.gallery,
                        e = ".mfp-gallery",
                        n = Boolean(c.fn.mfpFastClick);
                    return f.direction = !0, !(!r || !r.enabled) && (g += " mfp-gallery", d(w + e, function() {
                        r.navigateByImgClick && f.wrap.on("click" + e, ".mfp-img", function() {
                            return 1 < f.items.length ? (f.next(), !1) : void 0
                        }), m.on("keydown" + e, function(e) {
                            37 === e.keyCode ? f.prev() : 39 === e.keyCode && f.next()
                        })
                    }), d("UpdateStatus" + e, function(e, t) {
                        t.text && (t.text = H(t.text, f.currItem.index, f.items.length))
                    }), d(y + e, function(e, t, i, n) {
                        var o = f.items.length;
                        i.counter = 1 < o ? H(r.tCounter, n.index, o) : ""
                    }), d("BuildControls" + e, function() {
                        var e, t, i;
                        1 < f.items.length && r.arrows && !f.arrowLeft && (i = r.arrowMarkup, e = f.arrowLeft = c(i.replace(/%title%/gi, r.tPrev).replace(/%dir%/gi, "left")).addClass(s), t = f.arrowRight = c(i.replace(/%title%/gi, r.tNext).replace(/%dir%/gi, "right")).addClass(s), e[i = n ? "mfpFastClick" : "click"](function() {
                            f.prev()
                        }), t[i](function() {
                            f.next()
                        }), f.isIE7 && (u("b", e[0], !1, !0), u("a", e[0], !1, !0), u("b", t[0], !1, !0), u("a", t[0], !1, !0)), f.container.append(e.add(t)))
                    }), d("Change" + e, function() {
                        f._preloadTimeout && clearTimeout(f._preloadTimeout), f._preloadTimeout = setTimeout(function() {
                            f.preloadNearbyImages(), f._preloadTimeout = null
                        }, 16)
                    }), void d(l + e, function() {
                        m.off(e), f.wrap.off("click" + e), f.arrowLeft && n && f.arrowLeft.add(f.arrowRight).destroyMfpFastClick(), f.arrowRight = f.arrowLeft = null
                    }))
                },
                next: function() {
                    f.direction = !0, f.index = N(f.index + 1), f.updateItemHTML()
                },
                prev: function() {
                    f.direction = !1, f.index = N(f.index - 1), f.updateItemHTML()
                },
                goTo: function(e) {
                    f.direction = e >= f.index, f.index = e, f.updateItemHTML()
                },
                preloadNearbyImages: function() {
                    for (var e = f.st.gallery.preload, t = Math.min(e[0], f.items.length), i = Math.min(e[1], f.items.length), n = 1; n <= (f.direction ? i : t); n++) f._preloadItem(f.index + n);
                    for (n = 1; n <= (f.direction ? t : i); n++) f._preloadItem(f.index - n)
                },
                _preloadItem: function(e) {
                    var t;
                    e = N(e), f.items[e].preloaded || ((t = f.items[e]).parsed || (t = f.parseEl(e)), p("LazyLoad", t), "image" === t.type && (t.img = c('<img class="mfp-img" />').on("load.mfploader", function() {
                        t.hasSize = !0
                    }).on("error.mfploader", function() {
                        t.hasSize = !0, t.loadError = !0, p("LazyLoadError", t)
                    }).attr("src", t.src)), t.preloaded = !0)
                }
            }
        });
        var M, q, z = "retina";

        function F() {
            k.off("touchmove" + q + " touchend" + q)
        }
        c.magnificPopup.registerModule(z, {
            options: {
                replaceSrc: function(e) {
                    return e.src.replace(/\.\w+$/, function(e) {
                        return "@2x" + e
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    var i, n;
                    1 < window.devicePixelRatio && (i = f.st.retina, n = i.ratio, 1 < (n = isNaN(n) ? n() : n) && (d("ImageHasSize." + z, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }), d("ElementParse." + z, function(e, t) {
                        t.src = i.replaceSrc(t, n)
                    })))
                }
            }
        }), M = "ontouchstart" in window, q = ".mfpFastClick", c.fn.mfpFastClick = function(l) {
            return c(this).each(function() {
                var t, i, n, o, r, s, a, e = c(this);
                M && e.on("touchstart" + q, function(e) {
                    r = !1, a = 1, s = (e.originalEvent || e).touches[0], n = s.clientX, o = s.clientY, k.on("touchmove" + q, function(e) {
                        s = (e.originalEvent || e).touches, a = s.length, s = s[0], (10 < Math.abs(s.clientX - n) || 10 < Math.abs(s.clientY - o)) && (r = !0, F())
                    }).on("touchend" + q, function(e) {
                        F(), r || 1 < a || (t = !0, e.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                            t = !1
                        }, 1e3), l())
                    })
                }), e.on("click" + q, function() {
                    t || l()
                })
            })
        }, c.fn.destroyMfpFastClick = function() {
            c(this).off("touchstart" + q + " click" + q), M && k.off("touchmove" + q + " touchend" + q)
        }, r()
    }), window.theme = window.theme || {}, window.theme = window.theme || {}, theme.Sections = function() {
        this.constructors = {}, this.instances = [], $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
    }, theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
        _createInstance: function(e, t) {
            var i = (n = $(e)).attr("data-section-id"),
                n = n.attr("data-section-type");
            t = t || this.constructors[n], _.isUndefined(t) || (e = _.assignIn(new t(e), {
                id: i,
                type: n,
                container: e
            }), this.instances.push(e))
        },
        _onSectionLoad: function(e) {
            (e = $("[data-section-id]", e.target)[0]) && this._createInstance(e)
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
                i = e.$container.find($('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])').filter(":visible")),
                n = i[0],
                o = i[i.length - 1];
            e.$elementToFocus || (e.$elementToFocus = e.$container), e.$container.attr("tabindex", "-1"), e.$elementToFocus.focus(), $(document).off("focusin"), $(document).on(t.focusout, function() {
                $(document).off(t.keydown)
            }), $(document).on(t.focusin, function(e) {
                e.target !== o && e.target !== n || $(document).on(t.keydown, function(e) {
                    e.keyCode === slate.utils.keyboardKeys.TAB && (e.target !== o || e.shiftKey || (e.preventDefault(), n.focus()), e.target === n && e.shiftKey && (e.preventDefault(), o.focus()))
                })
            })
        },
        removeTrapFocus: function(e) {
            var t = e.namespace ? "focusin." + e.namespace : "focusin";
            e.$container && e.$container.length && e.$container.removeAttr("tabindex"), $(document).off(t)
        },
        accessibleLinks: function(e) {
            var o = document.querySelector("body"),
                r = {
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
                    n && e.attr("aria-describedby", r.external), t && (void 0 !== i && -1 !== i.indexOf("noopener") || e.attr("rel", function(e, t) {
                        return (void 0 === t ? "" : t + " ") + "noopener"
                    }), e.attr("aria-describedby", r.newWindow)), n && t && e.attr("aria-describedby", r.newWindowExternal)
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
                    for (t in i) n += "<li id=" + r[t] + ">" + i[t] + "</li>";
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
            return null !== (e = e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/)) ? void 0 !== e[2] ? e[1] + e[2] : e[1] : null
        },
        getSizedImageUrl: function(e, t) {
            if (null === t) return e;
            if ("master" === t) return this.removeProtocol(e);
            var i = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            return null === i ? null : (e = e.split(i[0]), i = i[0], this.removeProtocol(e[0] + "_" + t + i))
        },
        removeProtocol: function(e) {
            return e.replace(/http(s)?:/, "")
        }
    }, theme.Currency = {
        formatMoney: function(e, t) {
            "string" == typeof e && (e = e.replace(".", ""));
            var i = "",
                n = /\{\{\s*(\w+)\s*\}\}/;

            function o(e, t, i, n) {
                return i = i || ",", n = n || ".", isNaN(e) || null === e ? 0 : (e = (e = (e / 100).toFixed(t)).split("."))[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (e[1] ? n + e[1] : "")
            }
            switch ((t = t || "${{amount}}").match(n)[1]) {
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
            r = ".site-nav__link--last",
            s = "site-nav--active-dropdown",
            a = "site-nav__dropdown--right",
            l = "site-nav__dropdown--left",
            c = {};

        function d(e) {
            e.find(o).attr("aria-expanded", "false"), e.removeClass(s), c.$activeDropdown = $(n), $(i).off("click.siteNav"), $(window).off("keyup.siteNav")
        }

        function u(e) {
            e.each(function() {
                var e = $(this).find(".site-nav__dropdown");
                e.length && (Math.ceil($(this).offset().left) > Math.floor(c.$siteHeader.outerWidth()) / 2 ? e.removeClass(l).addClass(a) : e.removeClass(a).addClass(l))
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
                    $nav: $(e),
                    $topLevel: $(o),
                    $parents: $(e).find(t),
                    $subMenuLinks: $(".site-nav__child-link"),
                    $activeDropdown: $(n),
                    $siteHeader: $(".site-header")
                }, u($(t)), p(), c.$parents.on("click.siteNav", function() {
                    var t, e = $(this);
                    e.hasClass(s) ? d(e) : ((t = e).addClass(s), c.$activeDropdown.length && d(c.$activeDropdown), (c.$activeDropdown = t).find(o).attr("aria-expanded", "true"), setTimeout(function() {
                        $(window).on("keyup.siteNav", function(e) {
                            27 === e.keyCode && d(t)
                        }), $(i).on("click.siteNav", function() {
                            d(t)
                        })
                    }, 250))
                }), $(r).on("focusout.siteNav", function() {
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
                $(window).off(".siteNav"), c.$parents.off(".siteNav"), c.$subMenuLinks.off(".siteNav"), c.$topLevel.off(".siteNav"), $(r).off(".siteNav"), $(i).off(".siteNav")
            }
        }
    }(), window.theme = window.theme || {}, theme.MobileNav = function() {
        var s, a, i, l = {
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
            c.$mobileNavToggle.hasClass(l.mobileNavCloseIcon) ? t() : (e = c.$siteHeader.outerHeight(), c.$mobileNavContainer.prepareTransition().addClass(l.navOpen),/* c.$mobileNavContainer.css({
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
            s || (e = (t = $(e.currentTarget)).hasClass(l.return), s = !0, e ? ($("." + l.subNavToggleBtn + '[data-level="' + (d - 1) + '"]').removeClass(l.subNavActive), i && i.length && i.removeClass(l.subNavActive)) : t.addClass(l.subNavActive), function(e) {
                var t = e ? $('.mobile-nav__dropdown[data-parent="' + e + '"]') : c.$mobileNav;
                d = t.data("level") ? t.data("level") : 1, a && a.length && a.prepareTransition().addClass(l.subNavClosing);
                var i = (a = t).outerHeight(),
                    n = 2 < d ? l.thirdNavShowing : l.subNavShowing;
                c.$mobileNavContainer.css("height", i).removeClass(l.thirdNavShowing).addClass(n), e || c.$mobileNavContainer.removeClass(l.thirdNavShowing).removeClass(l.subNavShowing);
                var o = 1 === d ? c.$sectionHeader : t,
                    r = t.find("[data-menu-title=" + d + "]") || t;
                c.$mobileNavContainer.one("TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle", function() {
                    slate.a11y.trapFocus({
                        $container: o,
                        $elementToFocus: r,
                        namespace: "subNavFocus"
                    }), c.$mobileNavContainer.off(".subnavToggle"), s = !1
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

        function r(e) {
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
                }), null !== slate.utils.getParameterByName("q") && $("body").hasClass("template-search") && r.call(this), $("#SearchResultSubmit").on("click", r.bind(this)), $(".search-header__input").add(".search-header__submit").on("focus blur", function() {
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
            return e.preventDefault(), e = t(document.referrer), t(window.location.href) === e && history.back(), !1
        })
    }(), window.theme = window.theme || {}, theme.FormStatus = {
        init: function() {
            this.$statusMessage = $("[data-form-status]"), this.$statusMessage && (this.$statusMessage.attr("tabindex", -1).focus(), this.$statusMessage.on("blur", function() {
                this.$statusMessage.removeAttr("tabindex")
            }.bind(this)))
        }
    },
    function() {
        var e = $("#BlogTagFilter");
        e.length && e.on("change", function() {
            location.href = $(this).val()
        })
    }(), window.theme = theme || {}, theme.customerTemplates = function() {
        function n() {
            $("#RecoverPasswordForm").removeClass("hide"), $("#CustomerLoginForm").addClass("hide"), "true" === this.$RecoverEmail.attr("aria-invalid") && this.$RecoverEmail.focus()
        }
        return {
            init: function() {
                var t, i;
                (function() {
                    this.$RecoverHeading = $("#RecoverHeading"), this.$RecoverEmail = $("#RecoverEmail"), this.$LoginHeading = $("#LoginHeading"), $("#RecoverPassword").on("click", function(e) {
                        e.preventDefault(), n(), this.$RecoverHeading.attr("tabindex", "-1").focus()
                    }.bind(this)), $("#HideRecoverPasswordLink").on("click", function(e) {
                        e.preventDefault(), $("#RecoverPasswordForm").addClass("hide"), $("#CustomerLoginForm").removeClass("hide"), this.$LoginHeading.attr("tabindex", "-1").focus()
                    }.bind(this)), this.$RecoverHeading.on("blur", function() {
                        $(this).removeAttr("tabindex")
                    }), this.$LoginHeading.on("blur", function() {
                        $(this).removeAttr("tabindex")
                    })
                })(),
                function() {
                    "#recover" === window.location.hash && n.bind(this)()
                }(), $(".reset-password-success").length && $("#ResetSuccess").removeClass("hide").focus(), t = $("#AddressNewForm"), i = $("#AddressNewButton"), t.length && (Shopify && new Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", {
                    hideElement: "AddressProvinceContainerNew"
                }), $(".address-country-option").each(function() {
                    var e = "AddressCountry_" + (i = $(this).data("form-id")),
                        t = "AddressProvince_" + i,
                        i = "AddressProvinceContainer_" + i;
                    new Shopify.CountryProvinceSelector(e, t, {
                        hideElement: i
                    })
                }), $(".address-new-toggle").on("click", function() {
                    var e = "true" === i.attr("aria-expanded");
                    t.toggleClass("hide"), i.attr("aria-expanded", !e).focus()
                }), $(".address-edit-toggle").on("click", function() {
                    var e = $(this).data("form-id"),
                        t = $("#EditFormButton_" + e),
                        i = $("#EditAddress_" + e),
                        e = "true" === t.attr("aria-expanded");
                    i.toggleClass("hide"), t.attr("aria-expanded", !e).focus()
                }), $(".address-delete").on("click", function() {
                    var e = (t = $(this)).data("target"),
                        t = t.data("confirm-message");
                    confirm(t || "Are you sure you wish to delete this address?") && Shopify.postLink(e, {
                        parameters: {
                            _method: "delete"
                        }
                    })
                }))
            }
        }
    }(), window.theme = window.theme || {}, theme.Cart = function() {
        var i = "[data-cart-discount-wrapper]",
            t = "[data-cart-error-message]",
            n = "[data-cart-error-message-wrapper]",
            r = "[data-cart-item]",
            o = "[data-cart-item-line-price]",
            s = "[data-cart-item-property-value]",
            a = "[data-cart-notes]",
            l = "[data-cart-quantity-error-message]",
            c = "[data-cart-quantity-error-message-wrapper]",
            d = "[data-cart-remove]",
            u = "[data-quantity-input-mobile]",
            p = "[data-quantity-input-desktop]",
            h = "[data-quantity-input]",
            f = ".cart__image",
            m = "hide",
            g = "input--error",
            v = "data-cart-item-index",
            y = "data-cart-item-key",
            w = "data-cart-item-title",
            b = "data-cart-item-url",
            k = "data-quantity-item",
            C = "(min-width: " + theme.breakpoints.medium + "px)";

        function e(e) {
            this._initDimensionsPopup();
            this.$container = $(e), this.$thumbnails = $(f, this.$container), this.ajaxEnabled = this.$container.data("ajax-enabled"), this.cookiesEnabled() || this.$container.addClass("cart--no-cookies"), this.$thumbnails.css("cursor", "pointer"), this.$container.on("click", f, this._handleThumbnailClick), this.$container.on("change", h, $.debounce(500, this._handleInputQty.bind(this))), this.mql = window.matchMedia(C), this.mql.addListener(this.setQuantityFormControllers.bind(this)), this.setQuantityFormControllers(), this.ajaxEnabled && (this.$container.on("change", a, this._onNoteChange.bind(this)), this.$container.on("click", d, this._onRemoveItem.bind(this)), this._setupCartTemplates())
        }
        return e.prototype = _.assignIn({}, e.prototype, {
            _initDimensionsPopup: function() {
                this.$dimensionsPopup = $('#dimensions-popup-list', this.$container);
                let dimensionButtons = $('.cart__dimension-button', this.$container);
                dimensionButtons.each((index, button) => {
                    let key = button.closest('.cart__row').dataset.cartItemKey;
                    button.addEventListener('click', () => {
                        let popup = this.$dimensionsPopup.find(`[data-cart-item-key="${key}"]`);
                        popup.length && popup.addClass('is-open');
                    })
                });
                if(!this.$dimensionsPopupInitialized){
                    this.$dimensionsPopupInitialized = true;
                    this.$dimensionsPopup.children().each((index,popup) =>{
                        let slider = popup.querySelector(".dimensions-popup_media_slider");
                        let zoomInButtons = popup.querySelectorAll('.js-btn-zoom-in');
                        let zoomOutButtons = popup.querySelectorAll('.js-btn-zoom-out');
                        let mediaMain = popup.querySelector('.dimensions-popup_media_main');
                        let mediaThumbnail = popup.querySelector('.dimensions-popup_media_thumbnail');
                        let zoomMedia = popup.querySelector('.dimensions-popup_media_zoom');
                        let zoomMediaSlider = $(zoomMedia.querySelector('.dimensions-popup_media_zoom_slider'));

                        zoomMediaSlider.slick({
                            infinite: false,
                            dots: true,
                            slidesToShow: 1,
                            arrows: false
                        });

                        zoomInButtons.forEach(button => {
                            button.addEventListener('click', () => {
                                zoomMediaSlider.slick('slickGoTo', +button.dataset.position - 1);
                                mediaThumbnail.style.opacity = '0';
                                mediaMain.style.opacity = '0';
                                zoomMedia.classList.add('show');
                            })
                        })
                        zoomOutButtons.forEach(button => {
                            button.addEventListener('click', () => {
                                zoomMedia.classList.remove('show');
                                mediaThumbnail.style.opacity = '';
                                mediaMain.style.opacity = '';
                            })
                        })

                        popup.querySelector('.btn-close').addEventListener('click', () => {
                            popup.classList.remove('is-open');
                        });
                        if(!slider.classList.contains('slick-initialized')){
                            $(slider).slick({
                                infinite: false,
                                dots: true,
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                prevArrow: popup.querySelector('.dimensions-popup_media_arrows .prev'),
                                nextArrow: popup.querySelector('.dimensions-popup_media_arrows .next'),
                            })
                        }
                    })
                }

            },
            _setupCartTemplates: function() {
                this.$itemTemplate = $(r, this.$container).first().clone(), this.$itemDiscountTemplate = $("[data-cart-item-discount]", this.$itemTemplate).clone(), this.$itemOptionTemplate = $("[data-cart-item-option]", this.$itemTemplate).clone(), this.$itemPropertyTemplate = $("[data-cart-item-property]", this.$itemTemplate).clone(), this.$itemPriceListTemplate = $("[data-cart-item-price-list]", this.$itemTemplate).clone(), this.$itemLinePriceTemplate = $(o, this.$itemTemplate).clone(), this.$cartDiscountTemplate = $("[data-cart-discount]", this.$container).clone()
            },
            _handleInputQty: function(e) {
                var t = (o = $(e.target)).data("quantity-item"),
                    i = o.closest(r),
                    n = $("[data-quantity-item=" + t + "]"),
                    o = !((e = parseInt(o.val())) < 0 || isNaN(e));
                n.val(e), this._hideCartError(), this._hideQuantityErrorMessage(), o ? o && this.ajaxEnabled && this._updateItemQuantity(t, i, n, e) : this._showQuantityErrorMessages(i)
            },
            _updateItemQuantity: function(e, r, t, s) {
                var a = r.attr(y),
                    i = r.attr(v),
                    i = {
                        url: "/cart/change.js",
                        data: {
                            quantity: s,
                            line: i
                        },
                        dataType: "json"
                    };
                $.post(i).done(function(e) {
                    var t, i, n, o;
                    0 === e.item_count ? this._emptyCart() : (this._createCart(e), 0 === s ? this._showRemoveMessage(r.clone()) : (t = $('[data-cart-item-key="' + a + '"]'), i = this.getItem(a, e), n = 100 * $("#shipbarUnique").attr("data-totaltarget") - e.original_total_price, o = theme.Currency.formatMoney(n, theme.moneyFormat), console.log(n), 0 < n ? $("#shipbarUnique #bounce").html('<p class="grid__item ">Spend just <strong data-cart-item-price=""><span class="money">' + o + "</span></strong> To Get FreeShipping </p>") : $("#shipbarUnique #bounce").html('<p class="grid__item anounc-free">Congrats ! You Got Freeshipping !</p>'), $("[data-quantity-input]", t).focus(), this._updateLiveRegion(i))), this._setCartCountBubble(e.item_count), (e = $(".currency-picker").val()) && Currency.convertAll(shopDefaultCurrency, e)
                }.bind(this)).fail(function() {
                    this._showCartError(t)
                }.bind(this))
            },
            getItem: function(t, e) {
                return e.items.find(function(e) {
                    return e.key === t
                })
            },
            _liveRegionText: function(e) {
                var t = (t = theme.strings.update + ": [QuantityLabel]: [Quantity], [Regular] [$$] [DiscountedPrice] [$]. [PriceInformation]").replace("[QuantityLabel]", theme.strings.quantity).replace("[Quantity]", e.quantity),
                    i = "",
                    n = theme.Currency.formatMoney(e.original_line_price, theme.moneyFormat),
                    o = "",
                    r = "",
                    s = "";
                return e.original_line_price > e.final_line_price && (i = theme.strings.regularTotal, o = theme.strings.discountedTotal, r = theme.Currency.formatMoney(e.final_line_price, theme.moneyFormat), s = theme.strings.priceColumn), t.replace("[Regular]", i).replace("[$$]", n).replace("[DiscountedPrice]", o).replace("[$]", r).replace("[PriceInformation]", s).trim()
            },
            _updateLiveRegion: function(e) {
                var t = $("[data-cart-status]");
                t.html(this._liveRegionText(e)).attr("aria-hidden", !1), setTimeout(function() {
                    t.attr("aria-hidden", !0)
                }, 1e3)
            },
            _createCart: function(e) {
                var t = this._createCartDiscountList(e);
                $("[data-cart-line-items]", this.$container).html(this._createLineItemList(e)), this.setQuantityFormControllers(), $(a, this.$container).val(e.note), 0 === t.length ? $(i, this.$container).html("").addClass(m) : $(i, this.$container).html(t).removeClass(m), $("[data-cart-subtotal]", this.$container).html('<span class="money">' + theme.Currency.formatMoney(e.total_price, theme.moneyFormatWithCurrency) + "</span>")
                this._initDimensionsPopup();
            },
            _createCartDiscountList: function(e) {
                return $.map(e.cart_level_discount_applications, function(e) {
                    var t = this.$cartDiscountTemplate.clone();
                    return t.find("[data-cart-discount-title]").text(e.title), t.find("[data-cart-discount-amount]").html(theme.Currency.formatMoney(e.total_allocated_amount, theme.moneyFormat)), t[0]
                }.bind(this))
            },
            _createLineItemList: function(e) {
                return $.map(e.items, function(e, t) {
                    var i = this.$itemTemplate.clone(),
                        n = this.$itemPriceListTemplate.clone();

                    if(this.$dimensionsPopup.find(`[data-cart-item-key="${e.key}"]`).length){
                        i.find('.cart__dimension-button').removeClass('hide');
                    }
                    this._setLineItemAttributes(i, e, t), this._setLineItemImage(i, e.featured_image), $("[data-cart-item-title]", i).text(e.product_title).attr("href", e.url);
                    var o = this._createProductDetailsList(e.product_has_only_default_variant, e.options_with_values, e.properties);
                    return this._setProductDetailsList(i, o), this._setItemRemove(i, e.title), n.html(this._createItemPrice(e.original_price, e.final_price, this.$itemPriceListTemplate)), e.unit_price_measurement && n.append(this._createUnitPrice(e.unit_price, e.unit_price_measurement, this.$itemPriceListTemplate)), this._setItemPrice(i, n), n = this._createItemDiscountList(e), this._setItemDiscountList(i, n), this._setQuantityInputs(i, e, t), e = this._createItemPrice(e.original_line_price, e.final_line_price, this.$itemLinePriceTemplate), this._setItemLinePrice(i, e), i[0]
                }.bind(this))
            },
            _setLineItemAttributes: function(e, t, i) {
                e.attr(y, t.key).attr(b, t.url).attr(w, t.title).attr(v, i + 1).attr("data-cart-item-quantity", t.quantity)
            },
            _setLineItemImage: function(e, t) {
                var i = $("[data-cart-item-image]", e);
                (e = null !== t.url ? theme.Images.getSizedImageUrl(t.url, "x190") : null) ? i.attr("alt", t.alt).attr("src", e).removeClass(m): i.remove()
            },
            _setProductDetailsList: function(e, t) {
                e = $("[data-cart-item-details]", e), 0 === t.length ? e.addClass(m).text("") : e.removeClass(m).html(t)
            },
            _setItemPrice: function(e, t) {
                $("[data-cart-item-price]", e).html(t)
            },
            _setItemDiscountList: function(e, t) {
                e = $("[data-cart-item-discount-list]", e), 0 === t.length ? e.html("").addClass(m) : e.html(t).removeClass(m)
            },
            _setItemRemove: function(e, t) {
                $(d, e).attr("aria-label", theme.strings.removeLabel.replace("[product]", t))
            },
            _setQuantityInputs: function(e, t, i) {
                $(u, e).attr("id", "updates_" + t.key).attr(k, i + 1).val(t.quantity), $(p, e).attr("id", "updates_large_" + t.key).attr(k, i + 1).val(t.quantity), $("[data-quantity-label-mobile]", e).attr("for", "updates_" + t.key), $("[data-quantity-label-desktop]", e).attr("for", "updates_large_" + t.key)
            },
            setQuantityFormControllers: function() {
                this.mql.matches ? ($(p).attr("name", "updates[]"), $(u).removeAttr("name")) : ($(u).attr("name", "updates[]"), $(p).removeAttr("name"))
            },
            _setItemLinePrice: function(e, t) {
                $(o, e).html(t)
            },
            _createProductDetailsList: function(e, t, i) {
                var n = [];
                return e || (n = n.concat(this._getOptionList(t))), null !== i && 0 !== Object.keys(i).length && (n = n.concat(this._getPropertyList(i))), n
            },
            _getOptionList: function(e) {
                return $.map(e, function(e) {
                    var t = this.$itemOptionTemplate.clone();
                    return t.text(e.name + ": " + e.value).removeClass(m), t[0]
                }.bind(this))
            },
            _getPropertyList: function(e) {
                return e = null !== e ? Object.entries(e) : [], $.map(e, function(e) {
                    var t = this.$itemPropertyTemplate.clone();
                    if ("_" !== e[0].charAt(0) && 0 !== e[1].length) return t.find("[data-cart-item-property-name]").text(e[0]), -1 === e[0].indexOf("/uploads/") ? t.find(s).text(": " + e[1]) : t.find(s).html(': <a href="' + e[1] + '"> ' + e[1].split("/").pop() + "</a>"), t.removeClass(m), t[0]
                }.bind(this))
            },
            _createItemPrice: function(e, t, i) {
                if (e === t) return i = $("[data-cart-item-regular-price-group]", i).clone(), $("[data-cart-item-regular-price]", i).html('<span class="money">' + theme.Currency.formatMoney(e, theme.moneyFormat) + "</span>"), i.removeClass(m), i[0];
                i = $("[data-cart-item-discounted-price-group]", i).clone();
                return $("[data-cart-item-original-price]", i).html(theme.Currency.formatMoney(e, theme.moneyFormat)), $("[data-cart-item-final-price]", i).html(theme.Currency.formatMoney(t, theme.moneyFormat)), i.removeClass(m), i[0]
            },
            _createUnitPrice: function(e, t, i) {
                return i = $("[data-unit-price-group]", i).clone(), t = (1 !== t.reference_value ? t.reference_value : "") + t.reference_unit, $("[data-unit-price-base-unit]", i).text(t), $("[data-unit-price]", i).html('<span class="money">' + theme.Currency.formatMoney(e, theme.moneyFormat) + "</span>"), i.removeClass(m), i[0]
            },
            _createItemDiscountList: function(e) {
                return $.map(e.line_level_discount_allocations, function(e) {
                    var t = this.$itemDiscountTemplate.clone();
                    return t.find("[data-cart-item-discount-title]").text(e.discount_application.title), t.find("[data-cart-item-discount-amount]").html(theme.Currency.formatMoney(e.amount, theme.moneyFormat)), t[0]
                }.bind(this))
            },
            _showQuantityErrorMessages: function(e) {
                $(l, e).text(theme.strings.quantityMinimumMessage), $(c, e).removeClass(m), $(h, e).addClass(g).focus()
            },
            _hideQuantityErrorMessage: function() {
                var e = $(c).addClass(m);
                $(l, e).text(""), $(h, this.$container).removeClass(g)
            },
            _handleThumbnailClick: function(e) {
                e = $(e.target).closest(r).data("cart-item-url"), window.location.href = e
            },
            _onNoteChange: function(e) {
                var t = e.currentTarget.value;
                this._hideCartError(), this._hideQuantityErrorMessage(), t = {
                    url: "/cart/update.js",
                    data: {
                        note: t
                    },
                    dataType: "json"
                }, $.post(t).fail(function() {
                    this._showCartError(e.currentTarget)
                }.bind(this))
            },
            _showCartError: function(e) {
                $(t).text(theme.strings.cartError), $(n).removeClass(m), e.focus()
            },
            _hideCartError: function() {
                $(n).addClass(m), $(t).text("")
            },
            _onRemoveItem: function(e) {
                e.preventDefault();
                var t = $(e.target).closest(r),
                    e = t.attr(v);
                this._hideCartError(), e = {
                    url: "/cart/change.js",
                    data: {
                        quantity: 0,
                        line: e
                    },
                    dataType: "json"
                }, $.post(e).done(function(e) {
                    a = 100 * $("#shipbarUnique").attr("data-totaltarget") - e.original_total_price;
                    l = theme.Currency.formatMoney(a, theme.moneyFormat);
                    console.log(a);
                    0 < a ? $("#shipbarUnique #bounce").html('<p class="grid__item ">Spend just <strong data-cart-item-price=""><span class="money">' + l + "</span></strong> To Get FreeShipping </p>") : $("#shipbarUnique #bounce").html('<p class="grid__item anounc-free">Congrats ! You Got Freeshipping !</p>');
                    0 === e.item_count ? this._emptyCart() : (this._createCart(e), this._showRemoveMessage(t.clone())), this._setCartCountBubble(e.item_count);
                    (e = $(".currency-picker").val()) && Currency.convertAll(shopDefaultCurrency, e)
                }.bind(this)).fail(function() {
                    this._showCartError(null)
                }.bind(this))
            },
            _showRemoveMessage: function(e) {
                var t, i = e.data("cart-item-index"),
                    e = this._getRemoveMessage(e);
                i - 1 == 0 ? (t = $('[data-cart-item-index="1"]', this.$container), $(e).insertBefore(t)) : (t = $('[data-cart-item-index="' + (i - 1) + '"]', this.$container), e.insertAfter(t)), e.focus()
            },
            _getRemoveMessage: function(e) {
                var t = this._formatRemoveMessage(e),
                    i = $("[data-cart-table-cell]", e).clone();
                return i.removeClass().addClass("cart__removed-product").attr("colspan", "4").html(t), e.attr("role", "alert").html(i).attr("tabindex", "-1"), e
            },
            _formatRemoveMessage: function(e) {
                var t = e.data("cart-item-quantity"),
                    i = e.attr(b),
                    e = e.attr(w);
                return theme.strings.removedItemMessage.replace("[quantity]", t).replace("[link]", '<a href="' + i + '" class="text-link text-link--accent">' + e + "</a>")
            },
            _setCartCountBubble: function(e) {
                this.$cartCountBubble = this.$cartCountBubble || $("[data-cart-count-bubble]"), this.$cartCount = this.$cartCount || $("[data-cart-count]"), 0 < e ? (this.$cartCountBubble.removeClass(m), this.$cartCount.html(e)) : (this.$cartCountBubble.addClass(m), this.$cartCount.html(""))
            },
            _emptyCart: function() {
                this.$emptyPageContent = this.$emptyPageContent || $("[data-empty-page-content]", this.$container), this.$cartWrapper = this.$cartWrapper || $("[data-cart-wrapper]", this.$container), this.$emptyPageContent.removeClass(m), this.$cartWrapper.addClass(m)
            },
            cookiesEnabled: function() {
                var e = navigator.cookieEnabled;
                return e || (document.cookie = "testcookie", e = -1 !== document.cookie.indexOf("testcookie")), e
            }
        }), e
    }(), theme.LibraryLoader = function() {
        var c = "link",
            d = "script",
            u = {
                requested: "requested",
                loaded: "loaded"
            },
            e = "https://cdn.shopify.com/shopifycloud/",
            p = {
                plyrShopifyStyles: {
                    tagId: "plyr-shopify-styles",
                    src: e + "plyr/v2.0/shopify-plyr.css",
                    type: c
                },
                modelViewerUiStyles: {
                    tagId: "shopify-model-viewer-ui-styles",
                    src: e + "model-viewer-ui/assets/v1.0/model-viewer-ui.css",
                    type: c
                }
            };
        return {
            load: function(e, t) {
                var i, n, o, r, s, a, l = p[e];
                if (l && l.status !== u.requested)
                    if (t = t || function() {}, l.status !== u.loaded) {
                        switch (l.status = u.requested, l.type) {
                            case d:
                                r = l, s = t, (a = document.createElement("script")).src = r.src, a.addEventListener("load", function() {
                                    r.status = u.loaded, s()
                                }), i = a;
                                break;
                            case c:
                                n = l, o = t, (a = document.createElement("link")).href = n.src, a.rel = "stylesheet", a.type = "text/css", a.addEventListener("load", function() {
                                    n.status = u.loaded, o()
                                }), i = a
                        }
                        i.id = l.tagId, l.element = i;
                        e = document.getElementsByTagName(l.type)[0];
                        e.parentNode.insertBefore(i, e)
                    } else t()
            }
        }
    }(), theme.ProductModel = function() {
        var o = {},
            s = {},
            a = {},
            l = "[data-product-single-media-group]",
            c = "[data-shopify-xr]";

        function d(e) {
            if (!e)
                if (window.ShopifyXR) {
                    for (var t in o) {
                        var i, n;
                        o.hasOwnProperty(t) && ((i = o[t]).loaded || (n = document.querySelector("#ModelJson-" + t), window.ShopifyXR.addModels(JSON.parse(n.innerHTML)), i.loaded = !0))
                    }
                    window.ShopifyXR.setupXRElements()
                } else document.addEventListener("shopify_xr_initialized", function() {
                    d()
                })
        }

        function t(e) {
            if (!e)
                for (var t in s) {
                    var i;
                    s.hasOwnProperty(t) && ((i = s[t]).modelViewerUi || (i.modelViewerUi = new Shopify.ModelViewerUI(i.element)), function(e) {
                        var t = a[e.sectionId];
                        e.container.addEventListener("mediaVisible", function() {
                            t.element.setAttribute("data-shopify-model3d-id", e.modelId), theme.Helpers.isTouch() || e.modelViewerUi.play()
                        }), e.container.addEventListener("mediaHidden", function() {
                            t.element.setAttribute("data-shopify-model3d-id", t.defaultId), e.modelViewerUi.pause()
                        }), e.container.addEventListener("xrLaunch", function() {
                            e.modelViewerUi.pause()
                        })
                    }(i))
                }
        }
        return {
            init: function(e, r) {
                o[r] = {
                    loaded: !1
                }, e.forEach(function(e, t) {
                    var i = e.getAttribute("data-media-id"),
                        n = e.querySelector("model-viewer"),
                        o = n.getAttribute("data-model-id");
                    0 === t && (t = e.closest(l), console.log(t), t = t.querySelector(c), a[r] = {
                        element: t,
                        defaultId: o
                    }), s[i] = {
                        modelId: o,
                        sectionId: r,
                        container: e,
                        element: n
                    }
                }), window.Shopify.loadFeatures([{
                    name: "shopify-xr",
                    version: "1.0",
                    onLoad: d
                }, {
                    name: "model-viewer-ui",
                    version: "1.0",
                    onLoad: t
                }]), theme.LibraryLoader.load("modelViewerUiStyles")
            },
            removeSectionModels: function(e) {
                for (var t in s) s.hasOwnProperty(t) && s[t].sectionId === e && (s[t].modelViewerUi.destroy(), delete s[t]);
                delete o[e]
            }
        }
    }(), window.theme = window.theme || {}, theme.Filters = function() {
        var o = "#MainContent",
            t = "#FilterTags",
            i = "#SortBy";

        function e(e) {
            e = this.$container = $(e), this.$filterSelect = $(t, e), this.$sortSelect = $(i, e), this.$selects = $(t, e).add($(i, e)), this.defaultSort = this._getDefaultSortValue(), this.$selects.removeClass("hidden"), this.$filterSelect.on("change", this._onFilterChange.bind(this)), this.$sortSelect.on("change", this._onSortChange.bind(this)), this._initBreakpoints()
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
                    i.appendTo("body"), t = i.width(), i.remove(), e.width(t + 10)
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
    }(), theme.Product = function() {
        function e(e) {
            var t = this.$container = $(e),
                e = t.attr("data-section-id");
            this.ajaxEnabled = t.data("ajax-enabled"), this.settings = {
                mediaQueryMediumUp: "screen and (min-width: 750px)",
                mediaQuerySmall: "screen and (max-width: 749px)",
                bpSmall: !1,
                enableHistoryState: t.data("enable-history-state") || !1,
                namespace: ".slideshow-" + e,
                sectionId: e,
                sliderActive: !1,
                zoomEnabled: !1
            }, this.selectors = {
                addToCart: "[data-add-to-cart]",
                addToCartText: "[data-add-to-cart-text]",
                cartCount: "[data-cart-count]",
                cartCountBubble: "[data-cart-count-bubble]",
                cartPopup: "[data-cart-popup]",
                cartPopupCartQuantity: "[data-cart-popup-cart-quantity]",
                cartPopupClose: "[data-cart-popup-close]",
                cartPopupDismiss: "[data-cart-popup-dismiss]",
                cartPopupImage: "[data-cart-popup-image]",
                cartPopupImageWrapper: "[data-cart-popup-image-wrapper]",
                cartPopupImagePlaceholder: "[data-cart-popup-image-placeholder]",
                cartPopupPlaceholderSize: "[data-placeholder-size]",
                cartPopupProductDetails: "[data-cart-popup-product-details]",
                cartPopupQuantity: "[data-cart-popup-quantity]",
                cartPopupQuantityLabel: "[data-cart-popup-quantity-label]",
                cartPopupTitle: "[data-cart-popup-title]",
                cartPopupWrapper: "[data-cart-popup-wrapper]",
                loader: "[data-loader]",
                loaderStatus: "[data-loader-status]",
                quantity: "[data-quantity-input]",
                SKU: ".variant-sku",
                BARCODE: ".variant-barcode",
                productStatus: "[data-product-status]",
                originalSelectorId: "#ProductSelect-" + e,
                productForm: "[data-product-form]",
                errorMessage: "[data-error-message]",
                errorMessageWrapper: "[data-error-message-wrapper]",
                productImageWraps: ".product-single__photo",
                productThumbImages: ".product-single__thumbnail--" + e,
                productThumbs: ".product-single__thumbnails-" + e,
                productThumbListItem: ".product-single__thumbnails-item",
                productFeaturedImage: ".product-featured-img",
                productThumbsWrapper: ".thumbnails-wrapper",
                singleOptionSelector: ".single-option-selector-" + e,
                shopifyPaymentButton: ".shopify-payment-button",
                productMediaTypeModel: "[data-product-media-type-model]",
                priceContainer: "[data-price]",
                regularPrice: "[data-regular-price]",
                salePrice: "[data-sale-price]",
                unitPrice: "[data-unit-price]",
                unitPriceBaseUnit: "[data-unit-price-base-unit]"
            }, this.classes = {
                cartPopupWrapperHidden: "cart-popup-wrapper--hidden",
                hidden: "hide",
                inputError: "input--error",
                productOnSale: "price--on-sale",
                productUnitAvailable: "price--unit-available",
                productUnavailable: "price--unavailable",
                cartImage: "cart-popup-item__image",
                productFormErrorMessageWrapperHidden: "product-form__error-message-wrapper--hidden",
                activeClass: "active-thumb"
            }, this.eventHandlers = {}, this.$quantityInput = $(this.selectors.quantity, t), this.$errorMessageWrapper = $(this.selectors.errorMessageWrapper, t), this.$addToCart = $(this.selectors.addToCart, t), this.$addToCartText = $(this.selectors.addToCartText, this.$addToCart), this.$shopifyPaymentButton = $(this.selectors.shopifyPaymentButton, t), this.$loader = $(this.selectors.loader, this.$addToCart), this.$loaderStatus = $(this.selectors.loaderStatus, t), $("#ProductJson-" + e).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + e).innerHTML), this.settings.zoomEnabled = $(this.selectors.productImageWraps).hasClass("js-zoom-enabled"), this._initBreakpoints(), this._stringOverrides(), this._initVariants(), this._initImageSwitch(), this._initAddToCart(), this._setActiveThumbnail(), this._initModelViewerLibraries(), this._initShopifyXrLaunch(),this._initAddToCartStikcy())
        }
        return e.prototype = _.assignIn({}, e.prototype, {
          	_initAddToCartStikcy: function(){
                let form = $(this.selectors.productForm, this.$container);
                let formPlaceholder = form.next();
                let formHeight;
                let headerSection = document.querySelector('header.site-header');
                let formOffsetTop;

                $(window).on('scroll', () => {

                    if(!form.hasClass('form-sticky')){
                        formOffsetTop = form.offset().top
                        formHeight = form.innerHeight();
                    }

                    if(window.innerWidth < 750){
                        let headerHeight = headerSection.classList.contains('header-fixed') ? headerSection.offsetHeight : 0;

                        if(window.pageYOffset + headerHeight > formOffsetTop + formHeight){
                            form.addClass('form-sticky');
                            formPlaceholder.css('min-height', formHeight + 'px');
                        }else{
                            form.removeClass('form-sticky');
                            formPlaceholder.css('min-height', '');
                        }
                    }
                });
            },
            _stringOverrides: function() {
                theme.productStrings = theme.productStrings || {}, $.extend(theme.strings, theme.productStrings)
            },
            _initBreakpoints: function() {
                var e = this;
                enquire.register(this.settings.mediaQuerySmall, {
                    match: function() {
                        3 < $(e.selectors.productThumbImages).length && e._initThumbnailSlider(), e.settings.zoomEnabled && $(e.selectors.productImageWraps).each(function() {
                            $(this).trigger("zoom.destroy")
                        }), e.settings.bpSmall = !0
                    },
                    unmatch: function() {
                        e.settings.sliderActive && e._destroyThumbnailSlider(), e.settings.bpSmall = !1
                    }
                }), enquire.register(this.settings.mediaQueryMediumUp, {
                    match: function() {
                        e.settings.zoomEnabled && $(e.selectors.productImageWraps).each(function() {
                            var e = $(this).data("zoom");
                            $(this).zoom({
                                url: e
                            })
                        })
                    }
                })
            },
            _initVariants: function() {
                var e = {
                    $container: this.$container,
                    enableHistoryState: this.$container.data("enable-history-state") || !1,
                    singleOptionSelector: this.selectors.singleOptionSelector,
                    originalSelectorId: this.selectors.originalSelectorId,
                    product: this.productSingleObject
                };
                this.variants = new slate.Variants(e), this.$container.on("variantChange" + this.settings.namespace, this._updateAvailability.bind(this)), this.$container.on("variantImageChange" + this.settings.namespace, this._updateImages.bind(this)), this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)), this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this)), this.$container.on("variantBARCODEChange" + this.settings.namespace, this._updateBARCODE.bind(this))
            },
            _initImageSwitch: function() {
                var t;
                $(this.selectors.productThumbImages).length && (t = this, $(this.selectors.productThumbImages).on("click", function(e) {
                    e.preventDefault(), e = $(this).data("thumbnail-id"), t._switchImage(e), t._setActiveThumbnail(e)
                }).on("keyup", t._handleImageFocus.bind(t)))
            },
            _initAddToCart: function() {
                $(this.selectors.productForm, this.$container).on("submit", function(e) {
                    var t;
                    e.preventDefault(), this.$addToCart.is("[aria-disabled]") || (this.$previouslyFocusedElement = $(":focus"), (t = this.$quantityInput.val() <= 0) ? this._showErrorMessage(theme.strings.quantityMinimumMessage) : t || !this.ajaxEnabled ? t || this.ajaxEnabled || e.target.submit() : (this._handleButtonLoadingState(!0), e = $(this.selectors.productForm, this.$container), this._addItemToCart(e)))
                }.bind(this))
            },
            _initModelViewerLibraries: function() {
                var e = document.querySelectorAll(this.selectors.productMediaTypeModel);
                e.length < 1 || theme.ProductModel.init(e, this.settings.sectionId)
            },
            _initShopifyXrLaunch: function() {
                this.eventHandlers.initShopifyXrLaunchHandler = this._initShopifyXrLaunchHandler.bind(this), document.addEventListener("shopify_xr_launch", this.eventHandlers.initShopifyXrLaunchHandler)
            },
            _initShopifyXrLaunchHandler: function() {
                document.querySelector(this.selectors.productMediaWrapper + ":not(." + self.classes.hidden + ")").dispatchEvent(new CustomEvent("xrLaunch", {
                    bubbles: !0,
                    cancelable: !0
                }))
            },
            _addItemToCart_original: function(e) {
                e = {
                    url: "/cart/add.js",
                    data: $(e).serialize(),
                    dataType: "json"
                }, $.post(e).done(function(e) {
                    this._hideErrorMessage(), this._setupCartPopup(e)
                }.bind(this)).fail(function(e) {
                    this.$previouslyFocusedElement.focus(), this._showErrorMessage(e.responseJSON.description), this._handleButtonLoadingState(!1)
                }.bind(this))
            },
            _addItemToCart: function(e) {
                var t = {
                        type: "POST",
                        contentType: !1,
                        processData: !1,
                        url: "/cart/add.js",
                        data: new FormData(e[0]),
                        dataType: "json",
                        success: function(e) {
                            this._hideErrorMessage();
                          	addToCartSuccess(e);
                            this._handleButtonLoadingState(!1);
                          	//this._setupCartPopup(e);
                        }.bind(this),
                        error: function(e) {
                            this.$previouslyFocusedElement.focus();
                          	e = e.responseJSON ? e.responseJSON.description : theme.strings.cartError;
                          	this._showErrorMessage(e);
                          this._handleButtonLoadingState(!1);
                        }.bind(this)
                    },
                    i = !0;
                if ($.each(e.find("input.required"), function(e, t) {
                        $(t).val() || (i = !1)
                    }), !i) return this._showErrorMessage("missing required fields"), void this._handleButtonLoadingState(!1);
                $.ajax(t)
            },
            _handleButtonLoadingState: function(e) {
                e ? (this.$addToCart.attr("aria-disabled", !0), this.$addToCartText.addClass(this.classes.hidden), this.$loader.removeClass(this.classes.hidden), this.$shopifyPaymentButton.attr("disabled", !0), this.$loaderStatus.attr("aria-hidden", !1)) : (this.$addToCart.removeAttr("aria-disabled"), this.$addToCartText.removeClass(this.classes.hidden), this.$loader.addClass(this.classes.hidden), this.$shopifyPaymentButton.removeAttr("disabled"), this.$loaderStatus.attr("aria-hidden", !0))
            },
            _showErrorMessage: function(e) {
                $(this.selectors.errorMessage, this.$container).html(e), 0 !== this.$quantityInput.length && this.$quantityInput.addClass(this.classes.inputError), this.$errorMessageWrapper.removeClass(this.classes.productFormErrorMessageWrapperHidden).attr("aria-hidden", !0).removeAttr("aria-hidden")
            },
            _hideErrorMessage: function() {
                this.$errorMessageWrapper.addClass(this.classes.productFormErrorMessageWrapperHidden), 0 !== this.$quantityInput.length && this.$quantityInput.removeClass(this.classes.inputError)
            },
            _setupCartPopup: function(e) {
                this.$cartPopup = this.$cartPopup || $(this.selectors.cartPopup), this.$cartPopupWrapper = this.$cartPopupWrapper || $(this.selectors.cartPopupWrapper), this.$cartPopupTitle = this.$cartPopupTitle || $(this.selectors.cartPopupTitle), this.$cartPopupQuantity = this.$cartPopupQuantity || $(this.selectors.cartPopupQuantity), this.$cartPopupQuantityLabel = this.$cartPopupQuantityLabel || $(this.selectors.cartPopupQuantityLabel), this.$cartPopupClose = this.$cartPopupClose || $(this.selectors.cartPopupClose), this.$cartPopupDismiss = this.cartPopupDismiss || $(this.selectors.cartPopupDismiss), this.$cartPopupImagePlaceholder = this.$cartPopupImagePlaceholder || $(this.selectors.cartPopupImagePlaceholder), this._setupCartPopupEventListeners(), this._updateCartPopupContent(e)
            },
            _updateCartPopupContent: function(e) {
                var t = this.$quantityInput.length ? this.$quantityInput.val() : 1;
                this.$cartPopupTitle.text(e.product_title), this.$cartPopupQuantity.text(t), this.$cartPopupQuantityLabel.text(theme.strings.quantityLabel.replace("[count]", t)), this._setCartPopupPlaceholder(e.featured_image.url, e.featured_image.aspect_ratio), this._setCartPopupImage(e.featured_image.url, e.featured_image.alt), this._setCartPopupProductDetails(e.product_has_only_default_variant, e.options_with_values, e.properties), $.getJSON("/cart.js").then(function(e) {
                    this._setCartQuantity(e.item_count), this._setCartCountBubble(e.item_count), this._showCartPopup();
                    var t = $(".text-after-freeship").html();
                    0 < (e = 100 * $("#shipbarUnique").data("totaltarget") - e.total_price) ? (e = theme.Currency.formatMoney(e, theme.moneyFormat), testAnim("bounceIn"), $("#shipbarUnique strong").html(e)) : (testAnim("bounceIn"), $("#shipbarUnique").html('<p class="grid__item anounc-free animated bounceIn">' + t + "</p>"))
                }.bind(this))
            },
            _setupCartPopupEventListeners: function() {
                this.$cartPopupWrapper.on("keyup", function(e) {
                    e.keyCode === slate.utils.keyboardKeys.ESCAPE && this._hideCartPopup(e)
                }.bind(this)), this.$cartPopupClose.on("click", this._hideCartPopup.bind(this)), this.$cartPopupDismiss.on("click", this._hideCartPopup.bind(this)), $("body").on("click", this._onBodyClick.bind(this))
            },
            _setCartPopupPlaceholder: function(e, t) {
                var i;
                this.$cartPopupImageWrapper = this.$cartPopupImageWrapper || $(this.selectors.cartPopupImageWrapper), null !== e ? (i = $(this.selectors.cartPopupPlaceholderSize), e = 95 * t, t = 100 / t, this.$cartPopupImagePlaceholder.css("max-width", e), i.css("padding-top", t + "%")) : this.$cartPopupImageWrapper.addClass(this.classes.hidden)
            },
            _setCartPopupImage: function(e, t) {
                var i;
                null !== e && (this.$cartPopupImageWrapper.removeClass(this.classes.hidden), e = theme.Images.getSizedImageUrl(e, "200x"), (i = document.createElement("img")).src = e, i.alt = t, i.classList.add(this.classes.cartImage), i.dataset.cartPopupImage = "", i.onload = function() {
                    this.$cartPopupImagePlaceholder.addClass(this.classes.hidden), this.$cartPopupImageWrapper.append(i)
                }.bind(this))
            },
            _setCartPopupProductDetails: function(e, t, i) {
                this.$cartPopupProductDetails = this.$cartPopupProductDetails || $(this.selectors.cartPopupProductDetails);
                var n = "";
                e || (n += this._getVariantOptionList(t)), null !== i && 0 !== Object.keys(i).length && (n += this._getPropertyList(i)), 0 === n.length ? (this.$cartPopupProductDetails.html(""), this.$cartPopupProductDetails.attr("hidden", "")) : (this.$cartPopupProductDetails.html(n), this.$cartPopupProductDetails.removeAttr("hidden"))
            },
            _getVariantOptionList: function(e) {
                var t = "";
                return e.forEach(function(e) {
                    t = t + '<li class="product-details__item product-details__item--variant-option">' + e.name + ": " + e.value + "</li>"
                }), t
            },
            _getPropertyList: function(e) {
                var t = "";
                return Object.entries(e).forEach(function(e) {
                    "_" !== e[0].charAt(0) && 0 !== e[1].length && (t = t + '<li class="product-details__item product-details__item--property"><span class="product-details__property-label">' + e[0] + ": </span>" + e[1])
                }), t
            },
            _setCartQuantity: function(e) {
                var t;
                this.$cartPopupCartQuantity = this.$cartPopupCartQuantity || $(this.selectors.cartPopupCartQuantity), 1 === e ? t = theme.strings.oneCartCount : 1 < e && (t = theme.strings.otherCartCount.replace("[count]", e)), this.$cartPopupCartQuantity.text(e).attr("aria-label", t)
            },
            _setCartCountBubble: function(e) {
                this.$cartCountBubble = this.$cartCountBubble || $(this.selectors.cartCountBubble), this.$cartCount = this.$cartCount || $(this.selectors.cartCount), this.$cartCountBubble.removeClass(this.classes.hidden), this.$cartCount.text(e)
            },
            _showCartPopup: function() {
                this.$cartPopupWrapper.prepareTransition().removeClass(this.classes.cartPopupWrapperHidden), this._handleButtonLoadingState(!1), slate.a11y.trapFocus({
                    $container: this.$cartPopupWrapper,
                    $elementToFocus: this.$cartPopup,
                    namespace: "cartPopupFocus"
                })
            },
            _hideCartPopup: function(e) {
                e = 0 === e.detail, this.$cartPopupWrapper.prepareTransition().addClass(this.classes.cartPopupWrapperHidden), $(this.selectors.cartPopupImage).remove(), this.$cartPopupImagePlaceholder.removeClass(this.classes.hidden), slate.a11y.removeTrapFocus({
                    $container: this.$cartPopupWrapper,
                    namespace: "cartPopupFocus"
                }), e && this.$previouslyFocusedElement[0].focus(), this.$cartPopupWrapper.off("keyup"), this.$cartPopupClose.off("click"), this.$cartPopupDismiss.off("click"), $("body").off("click")
            },
            _onBodyClick: function(e) {
                var t = $(e.target);
                t[0] === this.$cartPopupWrapper[0] || t.parents(this.selectors.cartPopup).length || this._hideCartPopup(e)
            },
            _setActiveThumbnail: function(e) {
                void 0 === e && (e = $(this.selectors.productImageWraps + ":not(.hide)", this.$container).data("image-id"));
                var t = $(this.selectors.productThumbListItem + ":not(.slick-cloned)", this.$container),
                    e = t.find(this.selectors.productThumbImages + "[data-thumbnail-id='" + e + "']");
                $(this.selectors.productThumbImages).removeClass(this.classes.activeClass).removeAttr("aria-current"), e.addClass(this.classes.activeClass), e.attr("aria-current", !0), t.hasClass("slick-slide") && (e = e.parent().data("slick-index"), $(this.selectors.productThumbs).slick("slickGoTo", e, !0))
            },
            _switchImage: function(e) {
                var t = $(this.selectors.productImageWraps + "[data-image-id='" + e + "']", this.$container),
                    e = $(this.selectors.productImageWraps + ":not([data-image-id='" + e + "'])", this.$container);
                t.removeClass(this.classes.hidden), e.addClass(this.classes.hidden)
            },
            _handleImageFocus: function(e) {
                e.keyCode === slate.utils.keyboardKeys.ENTER && $(this.selectors.productFeaturedImage + ":visible").focus()
            },
            _initThumbnailSlider: function() {
                var e = {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: !1,
                    prevArrow: ".thumbnails-slider__prev--" + this.settings.sectionId,
                    nextArrow: ".thumbnails-slider__next--" + this.settings.sectionId,
                    responsive: [{
                        breakpoint: 321,
                        settings: {
                            slidesToShow: 3
                        }
                    }]
                };
                $(this.selectors.productThumbs).slick(e), $(this.selectors.productThumbsWrapper, this.$container).find(".slick-list").removeAttr("aria-live"), $(this.selectors.productThumbsWrapper, this.$container).find(".slick-disabled").removeAttr("aria-disabled"), this.settings.sliderActive = !0
            },
            _destroyThumbnailSlider: function() {
                $(this.selectors.productThumbs).slick("unslick"), this.settings.sliderActive = !1, $(this.selectors.productThumbsWrapper, this.$container).find('[tabindex="-1"]').removeAttr("tabindex")
            },
            _liveRegionText: function(e) {
                var t = "[Availability] [Regular] [$$] [Sale] [$]. [UnitPrice] [$$$]";
                if (!e) return theme.strings.unavailable;
                var i = e.available ? "" : theme.strings.soldOut + ",",
                    n = (t = t.replace("[Availability]", i), ""),
                    o = theme.Currency.formatMoney(e.price, theme.moneyFormat),
                    r = "",
                    s = "",
                    a = "",
                    i = "";
                return e.compare_at_price > e.price && (n = theme.strings.regularPrice, o = theme.Currency.formatMoney(e.compare_at_price, theme.moneyFormat) + ",", r = theme.strings.sale, s = theme.Currency.formatMoney(e.price, theme.moneyFormat)), e.unit_price && (a = theme.strings.unitPrice, i = theme.Currency.formatMoney(e.unit_price, theme.moneyFormat) + " " + theme.strings.unitPriceSeparator + " " + this._getBaseUnit(e)), t.replace("[Regular]", n).replace("[$$]", o).replace("[Sale]", r).replace("[$]", s).replace("[UnitPrice]", a).replace("[$$$]", i).trim()
            },
            _updateLiveRegion: function(e) {
                var e = e.variant,
                    t = this.container.querySelector(this.selectors.productStatus);
                t.innerHTML = this._liveRegionText(e), t.setAttribute("aria-hidden", !1), setTimeout(function() {
                    t.setAttribute("aria-hidden", !0)
                }, 1e3)
            },
            _updateAddToCart: function(e) {
                (e = e.variant) ? e.available ? (this.$addToCart.removeAttr("aria-disabled").attr("aria-label", theme.strings.addToCart), $(this.selectors.addToCartText, this.$container).text(theme.strings.addToCart), this.$shopifyPaymentButton.show()) : (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.soldOut), $(this.selectors.addToCartText, this.$container).text(theme.strings.soldOut), this.$shopifyPaymentButton.hide()): (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.unavailable), $(this.selectors.addToCartText, this.$container).text(theme.strings.unavailable), this.$shopifyPaymentButton.hide())
            },
            _updateAvailability: function(e) {
                this._hideErrorMessage(), this._updateAddToCart(e), this._updateLiveRegion(e), this._updatePrice(e)
            },
            _updateImages: function(e) {
                e = e.variant.featured_media.id, this._switchImage(e), this._setActiveThumbnail(e)
            },
            _updatePrice: function(e) {
                var t = e.variant,
                    i = $(this.selectors.priceContainer, this.$container),
                    n = $(this.selectors.regularPrice, i),
                    o = $(this.selectors.salePrice, i),
                    r = $(this.selectors.unitPrice, i),
                    e = $(this.selectors.unitPriceBaseUnit, i);
                i.removeClass(this.classes.productUnavailable).removeClass(this.classes.productOnSale).removeClass(this.classes.productUnitAvailable).removeAttr("aria-hidden"), t ? (t.compare_at_price > t.price ? (n.html('<span class="money">' + theme.Currency.formatMoney(t.compare_at_price, theme.moneyFormat) + "<span>"), o.html('<span class="money">' + theme.Currency.formatMoney(t.price, theme.moneyFormat) + "</span>"), i.addClass(this.classes.productOnSale)) : n.html('<span class="money">' + theme.Currency.formatMoney(t.price, theme.moneyFormat) + "</span>"), t.unit_price && (r.html('<span class="money">' + theme.Currency.formatMoney(t.unit_price, theme.moneyFormat) + "</span>"), e.html(this._getBaseUnit(t)), i.addClass(this.classes.productUnitAvailable))) : i.addClass(this.classes.productUnavailable).attr("aria-hidden", !0), i = Math.round(100 * (t.compare_at_price - t.price) / t.compare_at_price), $(".save1").html(i + "%"), $(".save2").data("baseprice"), t = t.compare_at_price - t.price, $(".save2").html('<span class="money">' + theme.Currency.formatMoney(t, theme.moneyFormatWithCurrency) + "</span>"), (t = $(".currency-picker").val()) && Currency.convertAll(shopDefaultCurrency, t)
            },
            _getBaseUnit: function(e) {
                return 1 === e.unit_price_measurement.reference_value ? e.unit_price_measurement.reference_unit : e.unit_price_measurement.reference_value + e.unit_price_measurement.reference_unit
            },
            _updateSKU: function(e) {
                e = e.variant, $(this.selectors.SKU).html(e.sku)
            },
            _updateBARCODE: function(e) {
                e = e.variant, $(this.selectors.BARCODE).html(e.barcode)
            },
            onUnload: function() {
                this.$container.off(this.settings.namespace)
            }
        }), e
    }(), theme.ProductRecommendations = function() {
        function e(e) {
            this.$container = $(e), e = "/recommendations/products?&section_id=product-recommendations&product_id=" + this.$container.data("productId") + "&limit=4", $.get(e).then(function(e) {
                "" !== (e = $(e).html()).trim() && (this.$container.html(e), this.sendTrekkieEvent())
            }.bind(this))
        }
        return e.prototype = _.assignIn({}, e.prototype, {
            sendTrekkieEvent: function() {
                var e, t;
                window.ShopifyAnalytics && window.ShopifyAnalytics.lib && window.ShopifyAnalytics.lib.track && (e = this.$container[0].getBoundingClientRect().top <= window.innerHeight, t = this.$container.find("[data-product-card]").length, window.ShopifyAnalytics.lib.track("Product Recommendations Displayed", {
                    theme: "Plak",
                    didPageJumpOccur: e,
                    numberOfRecommendationsDisplayed: t
                }))
            }
        }), e
    }(), $(document).ready(function() {
        var e = new theme.Sections;
        e.register("cart-template", theme.Cart), e.register("product", theme.Product), e.register("collection-template", theme.Filters), e.register("product-template", theme.Product), e.register("header-section", theme.HeaderSection), e.register("product-recommendations", theme.ProductRecommendations)
    }), theme.init = function() {
        theme.customerTemplates.init(), slate.rte.wrapTable({
            $tables: $(".rte table,.custom__item-inner--html table"),
            tableWrapperClass: "scrollable-wrapper"
        }), slate.rte.wrapIframe({
            $iframes: $('.rte iframe[src*="youtube.com/embed"],.rte iframe[src*="player.vimeo"],.custom__item-inner--html iframe[src*="youtube.com/embed"],.custom__item-inner--html iframe[src*="player.vimeo"]'),
            iframeWrapperClass: "video-wrapper"
        }), slate.a11y.pageLinkFocus($(window.location.hash)), $(".in-page-link").on("click", function(e) {
            slate.a11y.pageLinkFocus($(e.currentTarget.hash))
        }), $('a[href="#"]').on("click", function(e) {
            e.preventDefault()
        }), slate.a11y.accessibleLinks({
            messages: {
                newWindow: theme.strings.newWindow,
                external: theme.strings.external,
                newWindowExternal: theme.strings.newWindowExternal
            },
            $links: $("a[href]:not([aria-describedby], .product-single__thumbnail)")
        }), theme.FormStatus.init();
        var t = "[data-image]",
            i = "[data-image-placeholder]",
            n = "[data-image-with-placeholder-wrapper]";
        $(document).on("lazyloaded", function(e) {
            (e = $(e.target)).is(t) && e.closest(n).find(i).addClass("hide")
        }), $(t + ".lazyloaded").closest(n).find(i).addClass("hide")
    }, $(theme.init), $(document).ready(function() {
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
    }), $(".size-chart-open-popup").magnificPopup({
        type: "inline",
        midClick: !0
    });
var Shopify = Shopify || {};
Shopify.money_format = "${{amount}}", Shopify.formatMoney = function(e, t) {
        "string" == typeof e && (e = e.replace(".", ""));
        var i = "",
            n = /\{\{\s*(\w+)\s*\}\}/;

        function o(e, t) {
            return void 0 === e ? t : e
        }

        function r(e, t, i, n) {
            return t = o(t, 2), i = o(i, ","), n = o(n, "."), isNaN(e) || null == e ? 0 : (e = (e = (e / 100).toFixed(t)).split("."))[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (e[1] ? n + e[1] : "")
        }
        switch ((t = t || this.money_format).match(n)[1]) {
            case "amount":
                i = r(e, 2);
                break;
            case "amount_no_decimals":
                i = r(e, 0);
                break;
            case "amount_with_comma_separator":
                i = r(e, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                i = r(e, 0, ".", ",")
        }
        return t.replace(n, i)
    }, $(function() {}),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(c) {
        "use strict";
        var r = window.Slick,
            n = 0;
        (r = function(e, t) {
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
        }, r.prototype.addSlide = r.prototype.slickAdd = function(e, t, i) {
            var n = this;
            if ("boolean" == typeof t) i = t, t = null;
            else if (t < 0 || t >= n.slideCount) return !1;
            n.unload(), "number" == typeof t ? 0 === t && 0 === n.$slides.length ? c(e).appendTo(n.$slideTrack) : i ? c(e).insertBefore(n.$slides.eq(t)) : c(e).insertAfter(n.$slides.eq(t)) : !0 === i ? c(e).prependTo(n.$slideTrack) : c(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(e, t) {
                c(t).attr("data-slick-index", e)
            }), n.$slidesCache = n.$slides, n.reinit()
        }, r.prototype.animateHeight = function() {
            var e;
            1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical && (e = this.$slides.eq(this.currentSlide).outerHeight(!0), this.$list.animate({
                height: e
            }, this.options.speed))
        }, r.prototype.animateSlide = function(e, t) {
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
        }, r.prototype.getNavTarget = function() {
            var e = this.options.asNavFor;
            return e && null !== e && (e = c(e).not(this.$slider)), e
        }, r.prototype.asNavFor = function(t) {
            var e = this.getNavTarget();
            null !== e && "object" == typeof e && e.each(function() {
                var e = c(this).slick("getSlick");
                e.unslicked || e.slideHandler(t, !0)
            })
        }, r.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, (!1 === t.options.fade ? t.$slideTrack : t.$slides.eq(e)).css(i)
        }, r.prototype.autoPlay = function() {
            this.autoPlayClear(), this.slideCount > this.options.slidesToShow && (this.autoPlayTimer = setInterval(this.autoPlayIterator, this.options.autoplaySpeed))
        }, r.prototype.autoPlayClear = function() {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer)
        }, r.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
        }, r.prototype.buildArrows = function() {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = c(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = c(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, r.prototype.buildDots = function() {
            var e, t;
            if (!0 === this.options.dots) {
                for (this.$slider.addClass("slick-dotted"), t = c("<ul />").addClass(this.options.dotsClass), e = 0; e <= this.getDotCount(); e += 1) t.append(c("<li />").append(this.options.customPaging.call(this, this, e)));
                this.$dots = t.appendTo(this.options.appendDots), this.$dots.find("li").first().addClass("slick-active")
            }
        }, r.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                c(t).attr("data-slick-index", e).data("originalStyling", c(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? c('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), c("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, r.prototype.buildRows = function() {
            var e, t, i, n = this,
                o = document.createDocumentFragment(),
                r = n.$slider.children();
            if (1 < n.options.rows) {
                for (i = n.options.slidesPerRow * n.options.rows, t = Math.ceil(r.length / i), e = 0; e < t; e++) {
                    for (var s = document.createElement("div"), a = 0; a < n.options.rows; a++) {
                        for (var l = document.createElement("div"), c = 0; c < n.options.slidesPerRow; c++) {
                            var d = e * i + (a * n.options.slidesPerRow + c);
                            r.get(d) && l.appendChild(r.get(d))
                        }
                        s.appendChild(l)
                    }
                    o.appendChild(s)
                }
                n.$slider.empty().append(o), n.$slider.children().children().children().css({
                    width: 100 / n.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, r.prototype.checkResponsive = function(e, t) {
            var i, n, o, r = this,
                s = !1,
                a = r.$slider.width(),
                l = window.innerWidth || c(window).width();
            if ("window" === r.respondTo ? o = l : "slider" === r.respondTo ? o = a : "min" === r.respondTo && (o = Math.min(l, a)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                for (i in n = null, r.breakpoints) r.breakpoints.hasOwnProperty(i) && (!1 === r.originalSettings.mobileFirst ? o < r.breakpoints[i] && (n = r.breakpoints[i]) : o > r.breakpoints[i] && (n = r.breakpoints[i]));
                null !== n ? null !== r.activeBreakpoint && n === r.activeBreakpoint && !t || (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = c.extend({}, r.originalSettings, r.breakpointSettings[n]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), s = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), s = n), e || !1 === s || r.$slider.trigger("breakpoint", [r, s])
            }
        }, r.prototype.changeSlide = function(e, t) {
            var i, n = this,
                o = c(e.currentTarget);
            switch (o.is("a") && e.preventDefault(), o.is("li") || (o = o.closest("li")), i = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message) {
                case "previous":
                    r = 0 == i ? n.options.slidesToScroll : n.options.slidesToShow - i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - r, !1, t);
                    break;
                case "next":
                    r = 0 == i ? n.options.slidesToScroll : i, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + r, !1, t);
                    break;
                case "index":
                    var r = 0 === e.data.index ? 0 : e.data.index || o.index() * n.options.slidesToScroll;
                    n.slideHandler(n.checkNavigable(r), !1, t), o.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, r.prototype.checkNavigable = function(e) {
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
        }, r.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && (c("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", c.proxy(e.interrupt, e, !0)).off("mouseleave.slick", c.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), c(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().off("click.slick", e.selectHandler), c(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), c(window).off("resize.slick.slick-" + e.instanceUid, e.resize), c("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), c(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
        }, r.prototype.cleanUpSlideEvents = function() {
            this.$list.off("mouseenter.slick", c.proxy(this.interrupt, this, !0)), this.$list.off("mouseleave.slick", c.proxy(this.interrupt, this, !1))
        }, r.prototype.cleanUpRows = function() {
            var e;
            1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
        }, r.prototype.clickHandler = function(e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, r.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), c(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                c(this).attr("style", c(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
        }, r.prototype.disableTransition = function(e) {
            var t = {};
            t[this.transitionType] = "", (!1 === this.options.fade ? this.$slideTrack : this.$slides.eq(e)).css(t)
        }, r.prototype.fadeSlide = function(e, t) {
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
        }, r.prototype.fadeSlideOut = function(e) {
            !1 === this.cssTransitions ? this.$slides.eq(e).animate({
                opacity: 0,
                zIndex: this.options.zIndex - 2
            }, this.options.speed, this.options.easing) : (this.applyTransition(e), this.$slides.eq(e).css({
                opacity: 0,
                zIndex: this.options.zIndex - 2
            }))
        }, r.prototype.filterSlides = r.prototype.slickFilter = function(e) {
            null !== e && (this.$slidesCache = this.$slides, this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.filter(e).appendTo(this.$slideTrack), this.reinit())
        }, r.prototype.focusHandler = function() {
            var i = this;
            i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(e) {
                e.stopImmediatePropagation();
                var t = c(this);
                setTimeout(function() {
                    i.options.pauseOnFocus && (i.focussed = t.is(":focus"), i.autoPlay())
                }, 0)
            })
        }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, r.prototype.getDotCount = function() {
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
        }, r.prototype.getLeft = function(e) {
            var t, i, n = this,
                o = 0;
            return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, i = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? i = -1.5 : 1 === n.options.slidesToShow && (i = -2)), o = t * n.options.slidesToShow * i), n.slideCount % n.options.slidesToScroll != 0 && e + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (o = e > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1, (n.options.slidesToShow - (e - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, n.slideCount % n.options.slidesToScroll * t * -1))) : e + n.options.slidesToShow > n.slideCount && (n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth, o = (e + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (o = n.slideOffset = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * t * -1 + o, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1), t = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, t += (n.$list.width() - o.outerWidth()) / 2)), t
        }, r.prototype.getOption = r.prototype.slickGetOption = function(e) {
            return this.options[e]
        }, r.prototype.getNavigableIndexes = function() {
            for (var e = this, t = 0, i = 0, n = [], o = !1 === e.options.infinite ? e.slideCount : (t = -1 * e.options.slidesToScroll, i = -1 * e.options.slidesToScroll, 2 * e.slideCount); t < o;) n.push(t), t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return n
        }, r.prototype.getSlick = function() {
            return this
        }, r.prototype.getSlideCount = function() {
            var i, n = this,
                o = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0;
            return !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(e, t) {
                if (t.offsetLeft - o + c(t).outerWidth() / 2 > -1 * n.swipeLeft) return i = t, !1
            }), Math.abs(c(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        }, r.prototype.goTo = r.prototype.slickGoTo = function(e, t) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, r.prototype.init = function(e) {
            var t = this;
            c(t.$slider).hasClass("slick-initialized") || (c(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, r.prototype.initADA = function() {
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
        }, r.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
        }, r.prototype.initDotEvents = function() {
            var e = this;
            !0 === e.options.dots && (c("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && c("li", e.$dots).on("mouseenter.slick", c.proxy(e.interrupt, e, !0)).on("mouseleave.slick", c.proxy(e.interrupt, e, !1))
        }, r.prototype.initSlideEvents = function() {
            this.options.pauseOnHover && (this.$list.on("mouseenter.slick", c.proxy(this.interrupt, this, !0)), this.$list.on("mouseleave.slick", c.proxy(this.interrupt, this, !1)))
        }, r.prototype.initializeEvents = function() {
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
        }, r.prototype.initUI = function() {
            !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.show(), this.$nextArrow.show()), !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.show()
        }, r.prototype.keyHandler = function(e) {
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === this.options.accessibility ? this.changeSlide({
                data: {
                    message: !0 === this.options.rtl ? "next" : "previous"
                }
            }) : 39 === e.keyCode && !0 === this.options.accessibility && this.changeSlide({
                data: {
                    message: !0 === this.options.rtl ? "previous" : "next"
                }
            }))
        }, r.prototype.lazyLoad = function() {
            function e(e) {
                c("img[data-lazy]", e).each(function() {
                    var e = c(this),
                        t = c(this).attr("data-lazy"),
                        i = c(this).attr("data-srcset"),
                        n = c(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                        o = document.createElement("img");
                    o.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            i && (e.attr("srcset", i), n && e.attr("sizes", n)), e.attr("src", t).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                            }), r.$slider.trigger("lazyLoaded", [r, e, t])
                        })
                    }, o.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
                    }, o.src = t
                })
            }
            var t, i, n, r = this;
            if (!0 === r.options.centerMode ? n = !0 === r.options.infinite ? (i = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (i = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (i = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(i + r.options.slidesToShow), !0 === r.options.fade && (0 < i && i--, n <= r.slideCount && n++)), t = r.$slider.find(".slick-slide").slice(i, n), "anticipated" === r.options.lazyLoad)
                for (var o = i - 1, s = n, a = r.$slider.find(".slick-slide"), l = 0; l < r.options.slidesToScroll; l++) o < 0 && (o = r.slideCount - 1), t = (t = t.add(a.eq(o))).add(a.eq(s)), o--, s++;
            e(t), r.slideCount <= r.options.slidesToShow ? e(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? e(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && e(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
        }, r.prototype.loadSlider = function() {
            this.setPosition(), this.$slideTrack.css({
                opacity: 1
            }), this.$slider.removeClass("slick-loading"), this.initUI(), "progressive" === this.options.lazyLoad && this.progressiveLazyLoad()
        }, r.prototype.next = r.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, r.prototype.orientationChange = function() {
            this.checkResponsive(), this.setPosition()
        }, r.prototype.pause = r.prototype.slickPause = function() {
            this.autoPlayClear(), this.paused = !0
        }, r.prototype.play = r.prototype.slickPlay = function() {
            this.autoPlay(), this.options.autoplay = !0, this.paused = !1, this.focussed = !1, this.interrupted = !1
        }, r.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && c(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
        }, r.prototype.prev = r.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, r.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, r.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var t, i, n, o, r = this,
                s = c("img[data-lazy]", r.$slider);
            s.length ? (t = s.first(), i = t.attr("data-lazy"), n = t.attr("data-srcset"), o = t.attr("data-sizes") || r.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
                n && (t.attr("srcset", n), o && t.attr("sizes", o)), t.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === r.options.adaptiveHeight && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, t, i]), r.progressiveLazyLoad()
            }, s.onerror = function() {
                e < 3 ? setTimeout(function() {
                    r.progressiveLazyLoad(e + 1)
                }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, i]), r.progressiveLazyLoad())
            }, s.src = i) : r.$slider.trigger("allImagesLoaded", [r])
        }, r.prototype.refresh = function(e) {
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
        }, r.prototype.registerBreakpoints = function() {
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
        }, r.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, r.prototype.resize = function() {
            var e = this;
            c(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = c(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, r.prototype.removeSlide = r.prototype.slickRemove = function(e, t, i) {
            var n = this;
            if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e, n.slideCount < 1 || e < 0 || e > n.slideCount - 1) return !1;
            n.unload(), (!0 === i ? n.$slideTrack.children() : n.$slideTrack.children(this.options.slide).eq(e)).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
        }, r.prototype.setCSS = function(e) {
            var t, i, n = {};
            !0 === this.options.rtl && (e = -e), t = "left" == this.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == this.positionProp ? Math.ceil(e) + "px" : "0px", n[this.positionProp] = e, !1 === this.transformsEnabled || (!(n = {}) === this.cssTransitions ? n[this.animType] = "translate(" + t + ", " + i + ")" : n[this.animType] = "translate3d(" + t + ", " + i + ", 0px)"), this.$slideTrack.css(n)
        }, r.prototype.setDimensions = function() {
            var e = this;
            !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, r.prototype.setFade = function() {
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
        }, r.prototype.setHeight = function() {
            var e;
            1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical && (e = this.$slides.eq(this.currentSlide).outerHeight(!0), this.$list.css("height", e))
        }, r.prototype.setOption = r.prototype.slickSetOption = function() {
            var e, t, i, n, o, r = this,
                s = !1;
            if ("object" === c.type(arguments[0]) ? (i = arguments[0], s = arguments[1], o = "multiple") : "string" === c.type(arguments[0]) && (n = arguments[1], s = arguments[2], "responsive" === (i = arguments[0]) && "array" === c.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), "single" === o) r.options[i] = n;
            else if ("multiple" === o) c.each(i, function(e, t) {
                r.options[e] = t
            });
            else if ("responsive" === o)
                for (t in n)
                    if ("array" !== c.type(r.options.responsive)) r.options.responsive = [n[t]];
                    else {
                        for (e = r.options.responsive.length - 1; 0 <= e;) r.options.responsive[e].breakpoint === n[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(n[t])
                    } s && (r.unload(), r.reinit())
        }, r.prototype.setPosition = function() {
            this.setDimensions(), this.setHeight(), !1 === this.options.fade ? this.setCSS(this.getLeft(this.currentSlide)) : this.setFade(), this.$slider.trigger("setPosition", [this])
        }, r.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
        }, r.prototype.setSlideClasses = function(e) {
            var t, i, n, o = this,
                r = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
            o.$slides.eq(e).addClass("slick-current"), !0 === o.options.centerMode ? (i = o.options.slidesToShow % 2 == 0 ? 1 : 0, n = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (n <= e && e <= o.slideCount - 1 - n ? o.$slides.slice(e - n + i, e + n + 1).addClass("slick-active").attr("aria-hidden", "false") : (t = o.options.slidesToShow + e, r.slice(t - n + 1 + i, t + n + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? r.eq(r.length - 1 - o.options.slidesToShow).addClass("slick-center") : e === o.slideCount - 1 && r.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(e).addClass("slick-center")) : 0 <= e && e <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(e, e + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : r.length <= o.options.slidesToShow ? r.addClass("slick-active").attr("aria-hidden", "false") : (n = o.slideCount % o.options.slidesToShow, t = !0 === o.options.infinite ? o.options.slidesToShow + e : e, (o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - e < o.options.slidesToShow ? r.slice(t - (o.options.slidesToShow - n), t + n) : r.slice(t, t + o.options.slidesToShow)).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" !== o.options.lazyLoad && "anticipated" !== o.options.lazyLoad || o.lazyLoad()
        }, r.prototype.setupInfinite = function() {
            var e, t, i, n = this;
            if (!0 === n.options.fade && (n.options.centerMode = !1), !0 === n.options.infinite && !1 === n.options.fade && (t = null, n.slideCount > n.options.slidesToShow)) {
                for (i = !0 === n.options.centerMode ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - i; --e) t = e - 1, c(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < i + n.slideCount; e += 1) t = e, c(n.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
                n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    c(this).attr("id", "")
                })
            }
        }, r.prototype.interrupt = function(e) {
            e || this.autoPlay(), this.interrupted = e
        }, r.prototype.selectHandler = function(e) {
            e = c(e.target).is(".slick-slide") ? c(e.target) : c(e.target).parents(".slick-slide"), e = (e = parseInt(e.attr("data-slick-index"))) || 0, this.slideCount <= this.options.slidesToShow ? this.slideHandler(e, !1, !0) : this.slideHandler(e)
        }, r.prototype.slideHandler = function(e, t, i) {
            var n, o, r, s, a = this;
            if (t = t || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === e))
                if (!1 === t && a.asNavFor(e), n = e, s = a.getLeft(n), t = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? t : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (e < 0 || e > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (n = a.currentSlide, !0 !== i ? a.animateSlide(t, function() {
                    a.postSlide(n)
                }) : a.postSlide(n));
                else if (!1 === a.options.infinite && !0 === a.options.centerMode && (e < 0 || e > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (n = a.currentSlide, !0 !== i ? a.animateSlide(t, function() {
                a.postSlide(n)
            }) : a.postSlide(n));
            else {
                if (a.options.autoplay && clearInterval(a.autoPlayTimer), o = n < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + n : n >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : n - a.slideCount : n, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, o]), t = a.currentSlide, a.currentSlide = o, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (r = (r = a.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== i ? (a.fadeSlideOut(t), a.fadeSlide(o, function() {
                    a.postSlide(o)
                })) : a.postSlide(o), void a.animateHeight();
                !0 !== i ? a.animateSlide(s, function() {
                    a.postSlide(o)
                }) : a.postSlide(o)
            }
        }, r.prototype.startLoad = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, r.prototype.swipeDirection = function() {
            var e = this.touchObject.startX - this.touchObject.curX,
                t = this.touchObject.startY - this.touchObject.curY,
                e = Math.atan2(t, e);
            return (e = Math.round(180 * e / Math.PI)) < 0 && (e = 360 - Math.abs(e)), e <= 45 && 0 <= e || e <= 360 && 315 <= e ? !1 === this.options.rtl ? "left" : "right" : 135 <= e && e <= 225 ? !1 === this.options.rtl ? "right" : "left" : !0 === this.options.verticalSwiping ? 35 <= e && e <= 135 ? "down" : "up" : "vertical"
        }, r.prototype.swipeEnd = function(e) {
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
        }, r.prototype.swipeHandler = function(e) {
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
        }, r.prototype.swipeMove = function(e) {
            var t, i, n = this,
                o = void 0 !== e.originalEvent ? e.originalEvent.touches : null;
            return !(!n.dragging || n.scrolling || o && 1 !== o.length) && (t = n.getLeft(n.currentSlide), n.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX, n.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY, n.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(n.touchObject.curX - n.touchObject.startX, 2))), i = Math.round(Math.sqrt(Math.pow(n.touchObject.curY - n.touchObject.startY, 2))), !n.options.verticalSwiping && !n.swiping && 4 < i ? !(n.scrolling = !0) : (!0 === n.options.verticalSwiping && (n.touchObject.swipeLength = i), o = n.swipeDirection(), void 0 !== e.originalEvent && 4 < n.touchObject.swipeLength && (n.swiping = !0, e.preventDefault()), i = (!1 === n.options.rtl ? 1 : -1) * (n.touchObject.curX > n.touchObject.startX ? 1 : -1), !0 === n.options.verticalSwiping && (i = n.touchObject.curY > n.touchObject.startY ? 1 : -1), e = n.touchObject.swipeLength, (n.touchObject.edgeHit = !1) === n.options.infinite && (0 === n.currentSlide && "right" === o || n.currentSlide >= n.getDotCount() && "left" === o) && (e = n.touchObject.swipeLength * n.options.edgeFriction, n.touchObject.edgeHit = !0), !1 === n.options.vertical ? n.swipeLeft = t + e * i : n.swipeLeft = t + e * (n.$list.height() / n.listWidth) * i, !0 === n.options.verticalSwiping && (n.swipeLeft = t + e * i), !0 !== n.options.fade && !1 !== n.options.touchMove && (!0 === n.animating ? (n.swipeLeft = null, !1) : void n.setCSS(n.swipeLeft))))
        }, r.prototype.swipeStart = function(e) {
            var t, i = this;
            if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return !(i.touchObject = {});
            void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0
        }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
            null !== this.$slidesCache && (this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.appendTo(this.$slideTrack), this.reinit())
        }, r.prototype.unload = function() {
            var e = this;
            c(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, r.prototype.unslick = function(e) {
            this.$slider.trigger("unslick", [this, e]), this.destroy()
        }, r.prototype.updateArrows = function() {
            var e = this;
            Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode || e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode) && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, r.prototype.updateDots = function() {
            null !== this.$dots && (this.$dots.find("li").removeClass("slick-active").end(), this.$dots.find("li").eq(Math.floor(this.currentSlide / this.options.slidesToScroll)).addClass("slick-active"))
        }, r.prototype.visibility = function() {
            this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
        }, c.fn.slick = function() {
            for (var e, t = arguments[0], i = Array.prototype.slice.call(arguments, 1), n = this.length, o = 0; o < n; o++)
                if ("object" == typeof t || void 0 === t ? this[o].slick = new r(this[o], t) : e = this[o].slick[t].apply(this[o].slick, i), void 0 !== e) return e;
            return this
        }
    }), $(document).ready(function() {
        thumbnails = $('img[src*="/products/"]').not(":first"), thumbnails.length && thumbnails.bind("click", function() {
            var e = $(this).attr("src").split("?")[0].split("."),
                t = e.pop(),
                i = e.pop().replace(/_[a-zA-Z0-9@]+$/, ""),
                n = e.join(".") + "." + i + "." + t;
            void 0 !== variantImages[n] && productOptions.forEach(function(e, t) {
                optionValue = variantImages[n]["option-" + t], null !== optionValue && $(".single-option-selector:eq(" + t + ") option").filter(function() {
                    return $(this).text() === optionValue
                }).length && $(".single-option-selector:eq(" + t + ")").val(optionValue).trigger("change")
            })
        })
    }), $(window).on("load", function() {
        $(document).find(".shopify-model-viewer-ui__button--poster").trigger("click")
    });

/**
 * Module to add a shipping rates calculator to cart page.
 *
 * Copyright (c) 2011-2016 Caroline Schnapp (11heavens.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Modified by David Little, 2016
 */

"object"==typeof Countries&&(Countries.updateProvinceLabel=function(e,t){if("string"==typeof e&&Countries[e]&&Countries[e].provinces){if("object"!=typeof t&&(t=document.getElementById("address_province_label"),null===t))return;t.innerHTML=Countries[e].label;var r=jQuery(t).parent();r.find("select");r.find(".custom-style-select-box-inner").html(Countries[e].provinces[0])}}),"undefined"==typeof Shopify.Cart&&(Shopify.Cart={}),Shopify.Cart.ShippingCalculator=function(){var _config={submitButton:"Calculate shipping",submitButtonDisabled:"Calculating...",templateId:"shipping-calculator-response-template",wrapperId:"wrapper-response",customerIsLoggedIn:!1,moneyFormat:"${{amount}}"},_render=function(e){var t=jQuery("#"+_config.templateId),r=jQuery("#"+_config.wrapperId);if(t.length&&r.length){var templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var n=Handlebars.compile(jQuery.trim(t.text())),a=n(e);if(jQuery(a).appendTo(r),"undefined"!=typeof Currency&&"function"==typeof Currency.convertAll){var i="";jQuery("[name=currencies]").size()?i=jQuery("[name=currencies]").val():jQuery("#currencies span.selected").size()&&(i=jQuery("#currencies span.selected").attr("data-currency")),""!==i&&Currency.convertAll(shopCurrency,i,"#wrapper-response span.money, #estimated-shipping span.money")}}},_enableButtons=function(){jQuery(".get-rates").removeAttr("disabled").removeClass("disabled").val(_config.submitButton)},_disableButtons=function(){jQuery(".get-rates").val(_config.submitButtonDisabled).attr("disabled","disabled").addClass("disabled")},_getCartShippingRatesForDestination=function(e){var t={type:"POST",url:"/cart/prepare_shipping_rates",data:jQuery.param({shipping_address:e}),success:_pollForCartShippingRatesForDestination(e),error:_onError};jQuery.ajax(t)},_pollForCartShippingRatesForDestination=function(e){var t=function(){jQuery.ajax("/cart/async_shipping_rates",{dataType:"json",success:function(r,n,a){200===a.status?_onCartShippingRatesUpdate(r.shipping_rates,e):setTimeout(t,500)},error:_onError})};return t},_fullMessagesFromErrors=function(e){var t=[];return jQuery.each(e,function(e,r){jQuery.each(r,function(r,n){t.push(e+" "+n)})}),t},_onError=function(XMLHttpRequest,textStatus){jQuery("#estimated-shipping").hide(),jQuery("#estimated-shipping em").empty(),_enableButtons();var feedback="",data=eval("("+XMLHttpRequest.responseText+")");feedback=data.message?data.message+"("+data.status+"): "+data.description:"Error : "+_fullMessagesFromErrors(data).join("; ")+".","Error : country is not supported."===feedback&&(feedback="We do not ship to this destination."),_render({rates:[],errorFeedback:feedback,success:!1}),jQuery("#"+_config.wrapperId).show()},_onCartShippingRatesUpdate=function(e,t){_enableButtons();var r="";if(t.zip&&(r+=t.zip+", "),t.province&&(r+=t.province+", "),r+=t.country,e.length){"0.00"==e[0].price?jQuery("#estimated-shipping em").html("FREE"):jQuery("#estimated-shipping em").html(_formatRate(e[0].price));for(var n=0;n<e.length;n++)e[n].price=_formatRate(e[n].price)}_render({rates:e,address:r,success:!0}),jQuery("#"+_config.wrapperId+", #estimated-shipping").fadeIn()},_formatRate=function(e){function t(e,t){return"undefined"==typeof e?t:e}function r(e,r,n,a){if(r=t(r,2),n=t(n,","),a=t(a,"."),isNaN(e)||null==e)return 0;e=(e/100).toFixed(r);var i=e.split("."),o=i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+n),s=i[1]?a+i[1]:"";return o+s}if("function"==typeof Shopify.formatMoney)return Shopify.formatMoney(e,_config.moneyFormat);"string"==typeof e&&(e=e.replace(".",""));var n="",a=/\{\{\s*(\w+)\s*\}\}/,i=_config.moneyFormat;switch(i.match(a)[1]){case"amount":n=r(e,2);break;case"amount_no_decimals":n=r(e,0);break;case"amount_with_comma_separator":n=r(e,2,".",",");break;case"amount_no_decimals_with_comma_separator":n=r(e,0,".",",")}return i.replace(a,n)};return _init=function(){new Shopify.CountryProvinceSelector("address_country","address_province",{hideElement:"address_province_container"});var e=jQuery("#address_country"),t=jQuery("#address_province_label").get(0);"undefined"!=typeof Countries&&(Countries.updateProvinceLabel(e.val(),t),e.change(function(){Countries.updateProvinceLabel(e.val(),t)})),jQuery(".get-rates").click(function(){_disableButtons(),jQuery("#"+_config.wrapperId).empty().hide();var e={};e.zip=jQuery("#address_zip").val()||"",e.country=jQuery("#address_country").val()||"",e.province=jQuery("#address_province").val()||"",_getCartShippingRatesForDestination(e)}),_config.customerIsLoggedIn&&jQuery(".get-rates:eq(0)").trigger("click")},{show:function(e){e=e||{},jQuery.extend(_config,e),jQuery(function(){_init()})},getConfig:function(){return _config},formatRate:function(e){return _formatRate(e)}}}();