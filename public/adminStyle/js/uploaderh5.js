function ksort(inputArr, sort_flags) {
	var sorter, i, k, tmp_arr = {},
		keys = [],
		that = this,
		strictForIn = !1,
		populateArr = {};
	switch (sort_flags) {
	case "SORT_STRING":
		sorter = function(a, b) {
			return that.strnatcmp(a, b)
		};
		break;
	case "SORT_LOCALE_STRING":
		var loc = this.i18n_loc_get_default();
		sorter = this.php_js.i18nLocales[loc].sorting;
		break;
	case "SORT_NUMERIC":
		sorter = function(a, b) {
			return a + 0 - (b + 0)
		};
		break;
	default:
		sorter = function(a, b) {
			var aFloat = parseFloat(a),
				bFloat = parseFloat(b),
				aNumeric = aFloat + "" === a,
				bNumeric = bFloat + "" === b;
			return aNumeric && bNumeric ? aFloat > bFloat ? 1 : bFloat > aFloat ? -1 : 0 : aNumeric && !bNumeric ? 1 : !aNumeric && bNumeric ? -1 : a > b ? 1 : b > a ? -1 : 0
		}
	}
	for (k in inputArr) inputArr.hasOwnProperty(k) && keys.push(k);
	for (keys.sort(sorter), this.php_js = this.php_js || {}, this.php_js.ini = this.php_js.ini || {}, strictForIn = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && "off" !== this.php_js.ini["phpjs.strictForIn"].local_value, populateArr = strictForIn ? inputArr : populateArr, i = 0; i < keys.length; i++) k = keys[i], tmp_arr[k] = inputArr[k], strictForIn && delete inputArr[k];
	for (i in tmp_arr) tmp_arr.hasOwnProperty(i) && (populateArr[i] = tmp_arr[i]);
	return strictForIn || populateArr
}!window.qcVideo &&
function(global) {
	function getMappingArgs(fn) {
		var args = fn.toString().split("{")[0].replace(/\s|function|\(|\)/g, "").split(","),
			i = 0;
		for (args[0] || (args = []); args[i];) args[i] = require(args[i]), i += 1;
		return args
	}
	function newInst(key, ifExist) {
		(ifExist ? ns.instances[key] : !ns.instances[key]) && ns.modules[key] && (ns.instances[key] = ns.modules[key].apply(window, getMappingArgs(ns.modules[key])))
	}
	function require(key) {
		return newInst(key, !1), ns.instances[key] || {}
	}
	function loadJs(url) {
		var el = document.createElement("script");
		el.setAttribute("type", "text/javascript"), el.setAttribute("src", url), el.setAttribute("async", !0), document.getElementsByTagName("head")[0].appendChild(el)
	}
	function core(key, target) {
		if (ns.modules[key] = target, newInst(key, !0), waiter[key]) {
			for (var i = 0; waiter[key][i];) waiter[key][i](require(key)), i += 1;
			delete waiter[key]
		}
	}
	var ns = {
		modules: {},
		instances: {}
	},
		waiter = {};
	core.use = function(key, cb) {
		if (cb = cb ||
		function() {}, ns.modules[key]) cb(require(key));
		else {
			var config = require("config");
			config[key] && (waiter[key] || (waiter[key] = [], loadJs(config[key])), waiter[key].push(cb))
		}
	}, core.get = function(key) {
		return require(key)
	}, core.loadJs = loadJs, global.qcVideo = core
}(window);
var CryptoJS = CryptoJS ||
function(h, r) {
	var k = {},
		l = k.lib = {},
		n = function() {},
		f = l.Base = {
			extend: function(a) {
				n.prototype = this;
				var b = new n;
				return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() {
					b.$super.init.apply(this, arguments)
				}), b.init.prototype = b, b.$super = this, b
			},
			create: function() {
				var a = this.extend();
				return a.init.apply(a, arguments), a
			},
			init: function() {},
			mixIn: function(a) {
				for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
				a.hasOwnProperty("toString") && (this.toString = a.toString)
			},
			clone: function() {
				return this.init.prototype.extend(this)
			}
		},
		j = l.WordArray = f.extend({
			init: function(a, b) {
				a = this.words = a || [], this.sigBytes = b != r ? b : 4 * a.length
			},
			toString: function(a) {
				return (a || s).stringify(this)
			},
			concat: function(a) {
				var b = this.words,
					d = a.words,
					c = this.sigBytes;
				if (a = a.sigBytes, this.clamp(), c % 4) for (var e = 0; a > e; e++) b[c + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((c + e) % 4);
				else if (65535 < d.length) for (e = 0; a > e; e += 4) b[c + e >>> 2] = d[e >>> 2];
				else b.push.apply(b, d);
				return this.sigBytes += a, this
			},
			clamp: function() {
				var a = this.words,
					b = this.sigBytes;
				a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4), a.length = h.ceil(b / 4)
			},
			clone: function() {
				var a = f.clone.call(this);
				return a.words = this.words.slice(0), a
			},
			random: function(a) {
				for (var b = [], d = 0; a > d; d += 4) b.push(4294967296 * h.random() | 0);
				return new j.init(b, a)
			}
		}),
		m = k.enc = {},
		s = m.Hex = {
			stringify: function(a) {
				var b = a.words;
				a = a.sigBytes;
				for (var d = [], c = 0; a > c; c++) {
					var e = b[c >>> 2] >>> 24 - 8 * (c % 4) & 255;
					d.push((e >>> 4).toString(16)), d.push((15 & e).toString(16))
				}
				return d.join("")
			},
			parse: function(a) {
				for (var b = a.length, d = [], c = 0; b > c; c += 2) d[c >>> 3] |= parseInt(a.substr(c, 2), 16) << 24 - 4 * (c % 8);
				return new j.init(d, b / 2)
			}
		},
		p = m.Latin1 = {
			stringify: function(a) {
				var b = a.words;
				a = a.sigBytes;
				for (var d = [], c = 0; a > c; c++) d.push(String.fromCharCode(b[c >>> 2] >>> 24 - 8 * (c % 4) & 255));
				return d.join("")
			},
			parse: function(a) {
				for (var b = a.length, d = [], c = 0; b > c; c++) d[c >>> 2] |= (255 & a.charCodeAt(c)) << 24 - 8 * (c % 4);
				return new j.init(d, b)
			}
		},
		t = m.Utf8 = {
			stringify: function(a) {
				try {
					return decodeURIComponent(escape(p.stringify(a)))
				} catch (b) {
					throw Error("Malformed UTF-8 data")
				}
			},
			parse: function(a) {
				return p.parse(unescape(encodeURIComponent(a)))
			}
		},
		q = l.BufferedBlockAlgorithm = f.extend({
			reset: function() {
				this._data = new j.init, this._nDataBytes = 0
			},
			_append: function(a) {
				"string" == typeof a && (a = t.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
			},
			_process: function(a) {
				var b = this._data,
					d = b.words,
					c = b.sigBytes,
					e = this.blockSize,
					f = c / (4 * e),
					f = a ? h.ceil(f) : h.max((0 | f) - this._minBufferSize, 0);
				if (a = f * e, c = h.min(4 * a, c), a) {
					for (var g = 0; a > g; g += e) this._doProcessBlock(d, g);
					g = d.splice(0, a), b.sigBytes -= c
				}
				return new j.init(g, c)
			},
			clone: function() {
				var a = f.clone.call(this);
				return a._data = this._data.clone(), a
			},
			_minBufferSize: 0
		});
	l.Hasher = q.extend({
		cfg: f.extend(),
		init: function(a) {
			this.cfg = this.cfg.extend(a), this.reset()
		},
		reset: function() {
			q.reset.call(this), this._doReset()
		},
		update: function(a) {
			return this._append(a), this._process(), this
		},
		finalize: function(a) {
			return a && this._append(a), this._doFinalize()
		},
		blockSize: 16,
		_createHelper: function(a) {
			return function(b, d) {
				return new a.init(d).finalize(b)
			}
		},
		_createHmacHelper: function(a) {
			return function(b, d) {
				return new u.HMAC.init(a, d).finalize(b)
			}
		}
	});
	var u = k.algo = {};
	return k
}(Math);
!
function() {
	var h = CryptoJS,
		j = h.lib.WordArray;
	h.enc.Base64 = {
		stringify: function(b) {
			var e = b.words,
				f = b.sigBytes,
				c = this._map;
			b.clamp(), b = [];
			for (var a = 0; f > a; a += 3) for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && f > a + .75 * g; g++) b.push(c.charAt(d >>> 6 * (3 - g) & 63));
			if (e = c.charAt(64)) for (; b.length % 4;) b.push(e);
			return b.join("")
		},
		parse: function(b) {
			var e = b.length,
				f = this._map,
				c = f.charAt(64);
			c && (c = b.indexOf(c), -1 != c && (e = c));
			for (var c = [], a = 0, d = 0; e > d; d++) if (d % 4) {
				var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4),
					h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
				c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4), a++
			}
			return j.create(c, a)
		},
		_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	}
}();
var CryptoJS = CryptoJS ||
function(g, l) {
	var e = {},
		d = e.lib = {},
		m = function() {},
		k = d.Base = {
			extend: function(a) {
				m.prototype = this;
				var c = new m;
				return a && c.mixIn(a), c.hasOwnProperty("init") || (c.init = function() {
					c.$super.init.apply(this, arguments)
				}), c.init.prototype = c, c.$super = this, c
			},
			create: function() {
				var a = this.extend();
				return a.init.apply(a, arguments), a
			},
			init: function() {},
			mixIn: function(a) {
				for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
				a.hasOwnProperty("toString") && (this.toString = a.toString)
			},
			clone: function() {
				return this.init.prototype.extend(this)
			}
		},
		p = d.WordArray = k.extend({
			init: function(a, c) {
				a = this.words = a || [], this.sigBytes = c != l ? c : 4 * a.length
			},
			toString: function(a) {
				return (a || n).stringify(this)
			},
			concat: function(a) {
				var c = this.words,
					q = a.words,
					f = this.sigBytes;
				if (a = a.sigBytes, this.clamp(), f % 4) for (var b = 0; a > b; b++) c[f + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4);
				else if (65535 < q.length) for (b = 0; a > b; b += 4) c[f + b >>> 2] = q[b >>> 2];
				else c.push.apply(c, q);
				return this.sigBytes += a, this
			},
			clamp: function() {
				var a = this.words,
					c = this.sigBytes;
				a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), a.length = g.ceil(c / 4)
			},
			clone: function() {
				var a = k.clone.call(this);
				return a.words = this.words.slice(0), a
			},
			random: function(a) {
				for (var c = [], b = 0; a > b; b += 4) c.push(4294967296 * g.random() | 0);
				return new p.init(c, a)
			}
		}),
		b = e.enc = {},
		n = b.Hex = {
			stringify: function(a) {
				var c = a.words;
				a = a.sigBytes;
				for (var b = [], f = 0; a > f; f++) {
					var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255;
					b.push((d >>> 4).toString(16)), b.push((15 & d).toString(16))
				}
				return b.join("")
			},
			parse: function(a) {
				for (var c = a.length, b = [], f = 0; c > f; f += 2) b[f >>> 3] |= parseInt(a.substr(f, 2), 16) << 24 - 4 * (f % 8);
				return new p.init(b, c / 2)
			}
		},
		j = b.Latin1 = {
			stringify: function(a) {
				var c = a.words;
				a = a.sigBytes;
				for (var b = [], f = 0; a > f; f++) b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255));
				return b.join("")
			},
			parse: function(a) {
				for (var c = a.length, b = [], f = 0; c > f; f++) b[f >>> 2] |= (255 & a.charCodeAt(f)) << 24 - 8 * (f % 4);
				return new p.init(b, c)
			}
		},
		h = b.Utf8 = {
			stringify: function(a) {
				try {
					return decodeURIComponent(escape(j.stringify(a)))
				} catch (c) {
					throw Error("Malformed UTF-8 data")
				}
			},
			parse: function(a) {
				return j.parse(unescape(encodeURIComponent(a)))
			}
		},
		r = d.BufferedBlockAlgorithm = k.extend({
			reset: function() {
				this._data = new p.init, this._nDataBytes = 0
			},
			_append: function(a) {
				"string" == typeof a && (a = h.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
			},
			_process: function(a) {
				var c = this._data,
					b = c.words,
					f = c.sigBytes,
					d = this.blockSize,
					e = f / (4 * d),
					e = a ? g.ceil(e) : g.max((0 | e) - this._minBufferSize, 0);
				if (a = e * d, f = g.min(4 * a, f), a) {
					for (var k = 0; a > k; k += d) this._doProcessBlock(b, k);
					k = b.splice(0, a), c.sigBytes -= f
				}
				return new p.init(k, f)
			},
			clone: function() {
				var a = k.clone.call(this);
				return a._data = this._data.clone(), a
			},
			_minBufferSize: 0
		});
	d.Hasher = r.extend({
		cfg: k.extend(),
		init: function(a) {
			this.cfg = this.cfg.extend(a), this.reset()
		},
		reset: function() {
			r.reset.call(this), this._doReset()
		},
		update: function(a) {
			return this._append(a), this._process(), this
		},
		finalize: function(a) {
			return a && this._append(a), this._doFinalize()
		},
		blockSize: 16,
		_createHelper: function(a) {
			return function(b, d) {
				return new a.init(d).finalize(b)
			}
		},
		_createHmacHelper: function(a) {
			return function(b, d) {
				return new s.HMAC.init(a, d).finalize(b)
			}
		}
	});
	var s = e.algo = {};
	return e
}(Math);
!
function() {
	var g = CryptoJS,
		l = g.lib,
		e = l.WordArray,
		d = l.Hasher,
		m = [],
		l = g.algo.SHA1 = d.extend({
			_doReset: function() {
				this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
			},
			_doProcessBlock: function(d, e) {
				for (var b = this._hash.words, n = b[0], j = b[1], h = b[2], g = b[3], l = b[4], a = 0; 80 > a; a++) {
					if (16 > a) m[a] = 0 | d[e + a];
					else {
						var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16];
						m[a] = c << 1 | c >>> 31
					}
					c = (n << 5 | n >>> 27) + l + m[a], c = 20 > a ? c + ((j & h | ~j & g) + 1518500249) : 40 > a ? c + ((j ^ h ^ g) + 1859775393) : 60 > a ? c + ((j & h | j & g | h & g) - 1894007588) : c + ((j ^ h ^ g) - 899497514), l = g, g = h, h = j << 30 | j >>> 2, j = n, n = c
				}
				b[0] = b[0] + n | 0, b[1] = b[1] + j | 0, b[2] = b[2] + h | 0, b[3] = b[3] + g | 0, b[4] = b[4] + l | 0
			},
			_doFinalize: function() {
				var d = this._data,
					e = d.words,
					b = 8 * this._nDataBytes,
					g = 8 * d.sigBytes;
				return e[g >>> 5] |= 128 << 24 - g % 32, e[(g + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296), e[(g + 64 >>> 9 << 4) + 15] = b, d.sigBytes = 4 * e.length, this._process(), this._hash
			},
			clone: function() {
				var e = d.clone.call(this);
				return e._hash = this._hash.clone(), e
			}
		});
	g.SHA1 = d._createHelper(l), g.HmacSHA1 = d._createHmacHelper(l)
}(), function() {
	var g = CryptoJS,
		l = g.enc.Utf8;
	g.algo.HMAC = g.lib.Base.extend({
		init: function(e, d) {
			e = this._hasher = new e.init, "string" == typeof d && (d = l.parse(d));
			var g = e.blockSize,
				k = 4 * g;
			d.sigBytes > k && (d = e.finalize(d)), d.clamp();
			for (var p = this._oKey = d.clone(), b = this._iKey = d.clone(), n = p.words, j = b.words, h = 0; g > h; h++) n[h] ^= 1549556828, j[h] ^= 909522486;
			p.sigBytes = b.sigBytes = k, this.reset()
		},
		reset: function() {
			var e = this._hasher;
			e.reset(), e.update(this._iKey)
		},
		update: function(e) {
			return this._hasher.update(e), this
		},
		finalize: function(e) {
			var d = this._hasher;
			return e = d.finalize(e), d.reset(), d.finalize(this._oKey.clone().concat(e))
		}
	})
}(), qcVideo("$", function() {
	var g_win = window;
	return g_win.jQuery ? g_win.jQuery : (function(e, t) {
		function _(e) {
			var t = M[e] = {};
			return v.each(e.split(y), function(e, n) {
				t[n] = !0
			}), t
		}
		function H(e, n, r) {
			if (r === t && 1 === e.nodeType) {
				var i = "data-" + n.replace(P, "-$1").toLowerCase();
				if (r = e.getAttribute(i), "string" == typeof r) {
					try {
						r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
					} catch (s) {}
					v.data(e, n, r)
				} else r = t
			}
			return r
		}
		function B(e) {
			var t;
			for (t in e) if (("data" !== t || !v.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
			return !0
		}
		function et() {
			return !1
		}
		function tt() {
			return !0
		}
		function ut(e) {
			return !e || !e.parentNode || 11 === e.parentNode.nodeType
		}
		function at(e, t) {
			do e = e[t];
			while (e && 1 !== e.nodeType);
			return e
		}
		function ft(e, t, n) {
			if (t = t || 0, v.isFunction(t)) return v.grep(e, function(e, r) {
				var i = !! t.call(e, r, e);
				return i === n
			});
			if (t.nodeType) return v.grep(e, function(e, r) {
				return e === t === n
			});
			if ("string" == typeof t) {
				var r = v.grep(e, function(e) {
					return 1 === e.nodeType
				});
				if (it.test(t)) return v.filter(t, r, !n);
				t = v.filter(t, r)
			}
			return v.grep(e, function(e, r) {
				return v.inArray(e, t) >= 0 === n
			})
		}
		function lt(e) {
			var t = ct.split("|"),
				n = e.createDocumentFragment();
			if (n.createElement) for (; t.length;) n.createElement(t.pop());
			return n
		}
		function Lt(e, t) {
			return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
		}
		function At(e, t) {
			if (1 === t.nodeType && v.hasData(e)) {
				var n, r, i, s = v._data(e),
					o = v._data(t, s),
					u = s.events;
				if (u) {
					delete o.handle, o.events = {};
					for (n in u) for (r = 0, i = u[n].length; i > r; r++) v.event.add(t, n, u[n][r])
				}
				o.data && (o.data = v.extend({}, o.data))
			}
		}
		function Ot(e, t) {
			var n;
			1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.selected = e.defaultSelected : "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue : "script" === n && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando))
		}
		function Mt(e) {
			return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
		}
		function _t(e) {
			Et.test(e.type) && (e.defaultChecked = e.checked)
		}
		function Qt(e, t) {
			if (t in e) return t;
			for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Jt.length; i--;) if (t = Jt[i] + n, t in e) return t;
			return r
		}
		function Gt(e, t) {
			return e = t || e, "none" === v.css(e, "display") || !v.contains(e.ownerDocument, e)
		}
		function Yt(e, t) {
			for (var n, r, i = [], s = 0, o = e.length; o > s; s++) n = e[s], n.style && (i[s] = v._data(n, "olddisplay"), t ? (!i[s] && "none" === n.style.display && (n.style.display = ""), "" === n.style.display && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && "none" !== r && v._data(n, "olddisplay", r)));
			for (s = 0; o > s; s++) n = e[s], n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? i[s] || "" : "none"));
			return e
		}
		function Zt(e, t, n) {
			var r = Rt.exec(t);
			return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
		}
		function en(e, t, n, r) {
			for (var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > i; i += 2)"margin" === n && (s += v.css(e, n + $t[i], !0)), r ? ("content" === n && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), "margin" !== n && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, "padding" !== n && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
			return s
		}
		function tn(e, t, n) {
			var r = "width" === t ? e.offsetWidth : e.offsetHeight,
				i = !0,
				s = v.support.boxSizing && "border-box" === v.css(e, "boxSizing");
			if (0 >= r || null == r) {
				if (r = Dt(e, t), (0 > r || null == r) && (r = e.style[t]), Ut.test(r)) return r;
				i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
			}
			return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
		}
		function nn(e) {
			if (Wt[e]) return Wt[e];
			var t = v("<" + e + ">").appendTo(i.body),
				n = t.css("display");
			return t.remove(), ("none" === n || "" === n) && (Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})), Ht && Pt.createElement || (Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close()), t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt)), Wt[e] = n, n
		}
		function fn(e, t, n, r) {
			var i;
			if (v.isArray(t)) v.each(t, function(t, i) {
				n || sn.test(e) ? r(e, i) : fn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
			});
			else if (n || "object" !== v.type(t)) r(e, t);
			else for (i in t) fn(e + "[" + i + "]", t[i], n, r)
		}
		function Cn(e) {
			return function(t, n) {
				"string" != typeof t && (n = t, t = "*");
				var r, i, s, o = t.toLowerCase().split(y),
					u = 0,
					a = o.length;
				if (v.isFunction(n)) for (; a > u; u++) r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n)
			}
		}
		function kn(e, n, r, i, s, o) {
			s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
			for (var u, a = e[s], f = 0, l = a ? a.length : 0, c = e === Sn; l > f && (c || !u); f++) u = a[f](n, r, i), "string" == typeof u && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
			return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u
		}
		function Ln(e, n) {
			var r, i, s = v.ajaxSettings.flatOptions || {};
			for (r in n) n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
			i && v.extend(!0, e, i)
		}
		function An(e, n, r) {
			var i, s, o, u, a = e.contents,
				f = e.dataTypes,
				l = e.responseFields;
			for (s in l) s in r && (n[l[s]] = r[s]);
			for (;
			"*" === f[0];) f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
			if (i) for (s in a) if (a[s] && a[s].test(i)) {
				f.unshift(s);
				break
			}
			if (f[0] in r) o = f[0];
			else {
				for (s in r) {
					if (!f[0] || e.converters[s + " " + f[0]]) {
						o = s;
						break
					}
					u || (u = s)
				}
				o = o || u
			}
			return o ? (o !== f[0] && f.unshift(o), r[o]) : void 0
		}
		function On(e, t) {
			var n, r, i, s, o = e.dataTypes.slice(),
				u = o[0],
				a = {},
				f = 0;
			if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), o[1]) for (n in e.converters) a[n.toLowerCase()] = e.converters[n];
			for (; i = o[++f];) if ("*" !== i) {
				if ("*" !== u && u !== i) {
					if (n = a[u + " " + i] || a["* " + i], !n) for (r in a) if (s = r.split(" "), s[1] === i && (n = a[u + " " + s[0]] || a["* " + s[0]])) {
						n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
						break
					}
					if (n !== !0) if (n && e["throws"]) t = n(t);
					else try {
						t = n(t)
					} catch (l) {
						return {
							state: "parsererror",
							error: n ? l : "No conversion from " + u + " to " + i
						}
					}
				}
				u = i
			}
			return {
				state: "success",
				data: t
			}
		}
		function Fn() {
			try {
				return new e.XMLHttpRequest
			} catch (t) {}
		}
		function In() {
			try {
				return new e.ActiveXObject("Microsoft.XMLHTTP")
			} catch (t) {}
		}
		function $n() {
			return setTimeout(function() {
				qn = t
			}, 0), qn = v.now()
		}
		function Jn(e, t) {
			v.each(t, function(t, n) {
				for (var r = (Vn[t] || []).concat(Vn["*"]), i = 0, s = r.length; s > i; i++) if (r[i].call(e, t, n)) return
			})
		}
		function Kn(e, t, n) {
			var r, i = 0,
				o = Xn.length,
				u = v.Deferred().always(function() {
					delete a.elem
				}),
				a = function() {
					for (var t = qn || $n(), n = Math.max(0, f.startTime + f.duration - t), r = n / f.duration || 0, i = 1 - r, s = 0, o = f.tweens.length; o > s; s++) f.tweens[s].run(i);
					return u.notifyWith(e, [f, i, n]), 1 > i && o ? n : (u.resolveWith(e, [f]), !1)
				},
				f = u.promise({
					elem: e,
					props: v.extend({}, t),
					opts: v.extend(!0, {
						specialEasing: {}
					}, n),
					originalProperties: t,
					originalOptions: n,
					startTime: qn || $n(),
					duration: n.duration,
					tweens: [],
					createTween: function(t, n, r) {
						var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
						return f.tweens.push(i), i
					},
					stop: function(t) {
						for (var n = 0, r = t ? f.tweens.length : 0; r > n; n++) f.tweens[n].run(1);
						return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
					}
				}),
				l = f.props;
			for (Qn(l, f.opts.specialEasing); o > i; i++) if (r = Xn[i].call(f, e, l, f.opts)) return r;
			return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {
				anim: f,
				queue: f.opts.queue,
				elem: e
			})), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
		}
		function Qn(e, t) {
			var n, r, i, s, o;
			for (n in e) if (r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r], o && "expand" in o) {
				s = o.expand(s), delete e[r];
				for (n in s) n in e || (e[n] = s[n], t[n] = i)
			} else t[r] = i
		}
		function Gn(e, t, n) {
			var r, i, s, o, u, a, f, l, c, h = this,
				p = e.style,
				d = {},
				m = [],
				g = e.nodeType && Gt(e);
			n.queue || (l = v._queueHooks(e, "fx"), null == l.unqueued && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function() {
				l.unqueued || c()
			}), l.unqueued++, h.always(function() {
				h.always(function() {
					l.unqueued--, v.queue(e, "fx").length || l.empty.fire()
				})
			})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === v.css(e, "display") && "none" === v.css(e, "float") && (v.support.inlineBlockNeedsLayout && "inline" !== nn(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function() {
				p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
			}));
			for (r in t) if (s = t[r], Un.exec(s)) {
				if (delete t[r], a = a || "toggle" === s, s === (g ? "hide" : "show")) continue;
				m.push(r)
			}
			if (o = m.length) {
				u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function() {
					v(e).hide()
				}), h.done(function() {
					var t;
					v.removeData(e, "fxshow", !0);
					for (t in d) v.style(e, t, d[t])
				});
				for (r = 0; o > r; r++) i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = "width" === i || "height" === i ? 1 : 0))
			}
		}
		function Yn(e, t, n, r, i) {
			return new Yn.prototype.init(e, t, n, r, i)
		}
		function Zn(e, t) {
			var n, r = {
				height: e
			},
				i = 0;
			for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = $t[i], r["margin" + n] = r["padding" + n] = e;
			return t && (r.opacity = r.width = e), r
		}
		function tr(e) {
			return v.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
		}
		var n, r, i = e.document,
			s = e.location,
			o = e.navigator,
			u = e.jQuery,
			a = e.$,
			f = Array.prototype.push,
			l = Array.prototype.slice,
			c = Array.prototype.indexOf,
			h = Object.prototype.toString,
			p = Object.prototype.hasOwnProperty,
			d = String.prototype.trim,
			v = function(e, t) {
				return new v.fn.init(e, t, n)
			},
			m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
			g = /\S/,
			y = /\s+/,
			b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
			E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			S = /^[\],:{}\s]*$/,
			x = /(?:^|:|,)(?:\s*\[)+/g,
			T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
			N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
			C = /^-ms-/,
			k = /-([\da-z])/gi,
			L = function(e, t) {
				return (t + "").toUpperCase()
			},
			A = function() {
				i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : "complete" === i.readyState && (i.detachEvent("onreadystatechange", A), v.ready())
			},
			O = {};
		v.fn = v.prototype = {
			constructor: v,
			init: function(e, n, r) {
				var s, o, a;
				if (!e) return this;
				if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
				if ("string" == typeof e) {
					if (s = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : w.exec(e), s && (s[1] || !n)) {
						if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);
						if (o = i.getElementById(s[2]), o && o.parentNode) {
							if (o.id !== s[2]) return r.find(e);
							this.length = 1, this[0] = o
						}
						return this.context = i, this.selector = e, this
					}
					return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
				}
				return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
			},
			selector: "",
			jquery: "1.8.3",
			length: 0,
			size: function() {
				return this.length
			},
			toArray: function() {
				return l.call(this)
			},
			get: function(e) {
				return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
			},
			pushStack: function(e, t, n) {
				var r = v.merge(this.constructor(), e);
				return r.prevObject = this, r.context = this.context, "find" === t ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
			},
			each: function(e, t) {
				return v.each(this, e, t)
			},
			ready: function(e) {
				return v.ready.promise().done(e), this
			},
			eq: function(e) {
				return e = +e, -1 === e ? this.slice(e) : this.slice(e, e + 1)
			},
			first: function() {
				return this.eq(0)
			},
			last: function() {
				return this.eq(-1)
			},
			slice: function() {
				return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
			},
			map: function(e) {
				return this.pushStack(v.map(this, function(t, n) {
					return e.call(t, n, t)
				}))
			},
			end: function() {
				return this.prevObject || this.constructor(null)
			},
			push: f,
			sort: [].sort,
			splice: [].splice
		}, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function() {
			var e, n, r, i, s, o, u = arguments[0] || {},
				a = 1,
				f = arguments.length,
				l = !1;
			for ("boolean" == typeof u && (l = u, u = arguments[1] || {}, a = 2), "object" != typeof u && !v.isFunction(u) && (u = {}), f === a && (u = this, --a); f > a; a++) if (null != (e = arguments[a])) for (n in e) r = u[n], i = e[n], u !== i && (l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i));
			return u
		}, v.extend({
			noConflict: function(t) {
				return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v
			},
			isReady: !1,
			readyWait: 1,
			holdReady: function(e) {
				e ? v.readyWait++ : v.ready(!0)
			},
			ready: function(e) {
				if (e === !0 ? !--v.readyWait : !v.isReady) {
					if (!i.body) return setTimeout(v.ready, 1);
					v.isReady = !0, e !== !0 && --v.readyWait > 0 || (r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready"))
				}
			},
			isFunction: function(e) {
				return "function" === v.type(e)
			},
			isArray: Array.isArray ||
			function(e) {
				return "array" === v.type(e)
			},
			isWindow: function(e) {
				return null != e && e == e.window
			},
			isNumeric: function(e) {
				return !isNaN(parseFloat(e)) && isFinite(e)
			},
			type: function(e) {
				return null == e ? String(e) : O[h.call(e)] || "object"
			},
			isPlainObject: function(e) {
				if (!e || "object" !== v.type(e) || e.nodeType || v.isWindow(e)) return !1;
				try {
					if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1
				} catch (n) {
					return !1
				}
				var r;
				for (r in e);
				return r === t || p.call(e, r)
			},
			isEmptyObject: function(e) {
				var t;
				for (t in e) return !1;
				return !0
			},
			error: function(e) {
				throw new Error(e)
			},
			parseHTML: function(e, t, n) {
				var r;
				return e && "string" == typeof e ? ("boolean" == typeof t && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes))) : null
			},
			parseJSON: function(t) {
				return t && "string" == typeof t ? (t = v.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : S.test(t.replace(T, "@").replace(N, "]").replace(x, "")) ? new Function("return " + t)() : void v.error("Invalid JSON: " + t)) : null
			},
			parseXML: function(n) {
				var r, i;
				if (!n || "string" != typeof n) return null;
				try {
					e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
				} catch (s) {
					r = t
				}
				return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r
			},
			noop: function() {},
			globalEval: function(t) {
				t && g.test(t) && (e.execScript ||
				function(t) {
					e.eval.call(e, t)
				})(t)
			},
			camelCase: function(e) {
				return e.replace(C, "ms-").replace(k, L)
			},
			nodeName: function(e, t) {
				return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
			},
			each: function(e, n, r) {
				var i, s = 0,
					o = e.length,
					u = o === t || v.isFunction(e);
				if (r) if (u) {
					for (i in e) if (n.apply(e[i], r) === !1) break
				} else for (; o > s && n.apply(e[s++], r) !== !1;);
				else if (u) {
					for (i in e) if (n.call(e[i], i, e[i]) === !1) break
				} else for (; o > s && n.call(e[s], s, e[s++]) !== !1;);
				return e
			},
			trim: d && !d.call("\ufeff ") ?
			function(e) {
				return null == e ? "" : d.call(e)
			} : function(e) {
				return null == e ? "" : (e + "").replace(b, "")
			},
			makeArray: function(e, t) {
				var n, r = t || [];
				return null != e && (n = v.type(e), null == e.length || "string" === n || "function" === n || "regexp" === n || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r
			},
			inArray: function(e, t, n) {
				var r;
				if (t) {
					if (c) return c.call(t, e, n);
					for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n
				}
				return -1
			},
			merge: function(e, n) {
				var r = n.length,
					i = e.length,
					s = 0;
				if ("number" == typeof r) for (; r > s; s++) e[i++] = n[s];
				else for (; n[s] !== t;) e[i++] = n[s++];
				return e.length = i, e
			},
			grep: function(e, t, n) {
				var r, i = [],
					s = 0,
					o = e.length;
				for (n = !! n; o > s; s++) r = !! t(e[s], s), n !== r && i.push(e[s]);
				return i
			},
			map: function(e, n, r) {
				var i, s, o = [],
					u = 0,
					a = e.length,
					f = e instanceof v || a !== t && "number" == typeof a && (a > 0 && e[0] && e[a - 1] || 0 === a || v.isArray(e));
				if (f) for (; a > u; u++) i = n(e[u], u, r), null != i && (o[o.length] = i);
				else for (s in e) i = n(e[s], s, r), null != i && (o[o.length] = i);
				return o.concat.apply([], o)
			},
			guid: 1,
			proxy: function(e, n) {
				var r, i, s;
				return "string" == typeof n && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function() {
					return e.apply(n, i.concat(l.call(arguments)))
				}, s.guid = e.guid = e.guid || v.guid++, s) : t
			},
			access: function(e, n, r, i, s, o, u) {
				var a, f = null == r,
					l = 0,
					c = e.length;
				if (r && "object" == typeof r) {
					for (l in r) v.access(e, n, l, r[l], 1, o, i);
					s = 1
				} else if (i !== t) {
					if (a = u === t && v.isFunction(i), f && (a ? (a = n, n = function(e, t, n) {
						return a.call(v(e), n)
					}) : (n.call(e, i), n = null)), n) for (; c > l; l++) n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
					s = 1
				}
				return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
			},
			now: function() {
				return (new Date).getTime()
			}
		}), v.ready.promise = function(t) {
			if (!r) if (r = v.Deferred(), "complete" === i.readyState) setTimeout(v.ready, 1);
			else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);
			else {
				i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
				var n = !1;
				try {
					n = null == e.frameElement && i.documentElement
				} catch (s) {}
				n && n.doScroll &&
				function o() {
					if (!v.isReady) {
						try {
							n.doScroll("left")
						} catch (e) {
							return setTimeout(o, 50)
						}
						v.ready()
					}
				}()
			}
			return r.promise(t)
		}, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
			O["[object " + t + "]"] = t.toLowerCase()
		}), n = v(i);
		var M = {};
		v.Callbacks = function(e) {
			e = "string" == typeof e ? M[e] || _(e) : v.extend({}, e);
			var n, r, i, s, o, u, a = [],
				f = !e.once && [],
				l = function(t) {
					for (n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0; a && o > u; u++) if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
						n = !1;
						break
					}
					i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
				},
				c = {
					add: function() {
						if (a) {
							var t = a.length;
							!
							function r(t) {
								v.each(t, function(t, n) {
									var i = v.type(n);
									"function" === i ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && "string" !== i && r(n)
								})
							}(arguments), i ? o = a.length : n && (s = t, l(n))
						}
						return this
					},
					remove: function() {
						return a && v.each(arguments, function(e, t) {
							for (var n;
							(n = v.inArray(t, a, n)) > -1;) a.splice(n, 1), i && (o >= n && o--, u >= n && u--)
						}), this
					},
					has: function(e) {
						return v.inArray(e, a) > -1
					},
					empty: function() {
						return a = [], this
					},
					disable: function() {
						return a = f = n = t, this
					},
					disabled: function() {
						return !a
					},
					lock: function() {
						return f = t, n || c.disable(), this
					},
					locked: function() {
						return !f
					},
					fireWith: function(e, t) {
						return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this
					},
					fire: function() {
						return c.fireWith(this, arguments), this
					},
					fired: function() {
						return !!r
					}
				};
			return c
		}, v.extend({
			Deferred: function(e) {
				var t = [
					["resolve", "done", v.Callbacks("once memory"), "resolved"],
					["reject", "fail", v.Callbacks("once memory"), "rejected"],
					["notify", "progress", v.Callbacks("memory")]
				],
					n = "pending",
					r = {
						state: function() {
							return n
						},
						always: function() {
							return i.done(arguments).fail(arguments), this
						},
						then: function() {
							var e = arguments;
							return v.Deferred(function(n) {
								v.each(t, function(t, r) {
									var s = r[0],
										o = e[t];
									i[r[1]](v.isFunction(o) ?
									function() {
										var e = o.apply(this, arguments);
										e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e])
									} : n[s])
								}), e = null
							}).promise()
						},
						promise: function(e) {
							return null != e ? v.extend(e, r) : r
						}
					},
					i = {};
				return r.pipe = r.then, v.each(t, function(e, s) {
					var o = s[2],
						u = s[3];
					r[s[1]] = o.add, u && o.add(function() {
						n = u
					}, t[1 ^ e][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith
				}), r.promise(i), e && e.call(i, i), i
			},
			when: function(e) {
				var u, a, f, t = 0,
					n = l.call(arguments),
					r = n.length,
					i = 1 !== r || e && v.isFunction(e.promise) ? r : 0,
					s = 1 === i ? e : v.Deferred(),
					o = function(e, t, n) {
						return function(r) {
							t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
						}
					};
				if (r > 1) for (u = new Array(r), a = new Array(r), f = new Array(r); r > t; t++) n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i;
				return i || s.resolveWith(f, n), s.promise()
			}
		}), v.support = function() {
			var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
			if (p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
			s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
				leadingWhitespace: 3 === p.firstChild.nodeType,
				tbody: !p.getElementsByTagName("tbody").length,
				htmlSerialize: !! p.getElementsByTagName("link").length,
				style: /top/.test(r.getAttribute("style")),
				hrefNormalized: "/a" === r.getAttribute("href"),
				opacity: /^0.5/.test(r.style.opacity),
				cssFloat: !! r.style.cssFloat,
				checkOn: "on" === u.value,
				optSelected: o.selected,
				getSetAttribute: "t" !== p.className,
				enctype: !! i.createElement("form").enctype,
				html5Clone: "<:nav></:nav>" !== i.createElement("nav").cloneNode(!0).outerHTML,
				boxModel: "CSS1Compat" === i.compatMode,
				submitBubbles: !0,
				changeBubbles: !0,
				focusinBubbles: !1,
				deleteExpando: !0,
				noCloneEvent: !0,
				inlineBlockNeedsLayout: !1,
				shrinkWrapBlocks: !1,
				reliableMarginRight: !0,
				boxSizingReliable: !0,
				pixelPosition: !1
			}, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
			try {
				delete p.test
			} catch (d) {
				t.deleteExpando = !1
			}
			if (!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function() {
				t.noCloneEvent = !1
			}), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = "t" === u.value, u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p), p.attachEvent) for (l in {
				submit: !0,
				change: !0,
				focusin: !0
			}) f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = "function" == typeof p[f]), t[l + "Bubbles"] = c;
			return v(function() {
				var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
					a = i.getElementsByTagName("body")[0];
				a && (n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === s[0].offsetHeight, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === s[0].offsetHeight, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === r.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== a.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(r, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(r, null) || {
					width: "4px"
				}).width, o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), "undefined" != typeof r.style.zoom && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === r.offsetWidth, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== r.offsetWidth, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null)
			}), a.removeChild(p), n = r = s = o = u = a = p = null, t
		}();
		var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
			P = /([A-Z])/g;
		v.extend({
			cache: {},
			deletedIds: [],
			uuid: 0,
			expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
			noData: {
				embed: !0,
				object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
				applet: !0
			},
			hasData: function(e) {
				return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !! e && !B(e)
			},
			data: function(e, n, r, i) {
				if (v.acceptData(e)) {
					var s, o, u = v.expando,
						a = "string" == typeof n,
						f = e.nodeType,
						l = f ? v.cache : e,
						c = f ? e[u] : e[u] && u;
					if (c && l[c] && (i || l[c].data) || !a || r !== t) return c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop)), ("object" == typeof n || "function" == typeof n) && (i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n)), s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], null == o && (o = s[v.camelCase(n)])) : o = s, o
				}
			},
			removeData: function(e, t, n) {
				if (v.acceptData(e)) {
					var r, i, s, o = e.nodeType,
						u = o ? v.cache : e,
						a = o ? e[v.expando] : v.expando;
					if (u[a]) {
						if (t && (r = n ? u[a] : u[a].data)) {
							v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t = t in r ? [t] : t.split(" ")));
							for (i = 0, s = t.length; s > i; i++) delete r[t[i]];
							if (!(n ? B : v.isEmptyObject)(r)) return
						}(n || (delete u[a].data, B(u[a]))) && (o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null)
					}
				}
			},
			_data: function(e, t, n) {
				return v.data(e, t, n, !0)
			},
			acceptData: function(e) {
				var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
				return !t || t !== !0 && e.getAttribute("classid") === t
			}
		}), v.fn.extend({
			data: function(e, n) {
				var r, i, s, o, u, a = this[0],
					f = 0,
					l = null;
				if (e === t) {
					if (this.length && (l = v.data(a), 1 === a.nodeType && !v._data(a, "parsedAttrs"))) {
						for (s = a.attributes, u = s.length; u > f; f++) o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
						v._data(a, "parsedAttrs", !0)
					}
					return l
				}
				return "object" == typeof e ? this.each(function() {
					v.data(this, e)
				}) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function(n) {
					return n === t ? (l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l) : (r[1] = n, void this.each(function() {
						var t = v(this);
						t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r)
					}))
				}, null, n, arguments.length > 1, null, !1))
			},
			removeData: function(e) {
				return this.each(function() {
					v.removeData(this, e)
				})
			}
		}), v.extend({
			queue: function(e, t, n) {
				var r;
				return e ? (t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || []) : void 0
			},
			dequeue: function(e, t) {
				t = t || "fx";
				var n = v.queue(e, t),
					r = n.length,
					i = n.shift(),
					s = v._queueHooks(e, t),
					o = function() {
						v.dequeue(e, t)
					};
				"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
			},
			_queueHooks: function(e, t) {
				var n = t + "queueHooks";
				return v._data(e, n) || v._data(e, n, {
					empty: v.Callbacks("once memory").add(function() {
						v.removeData(e, t + "queue", !0), v.removeData(e, n, !0)
					})
				})
			}
		}), v.fn.extend({
			queue: function(e, n) {
				var r = 2;
				return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function() {
					var t = v.queue(this, e, n);
					v._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && v.dequeue(this, e)
				})
			},
			dequeue: function(e) {
				return this.each(function() {
					v.dequeue(this, e)
				})
			},
			delay: function(e, t) {
				return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
					var r = setTimeout(t, e);
					n.stop = function() {
						clearTimeout(r)
					}
				})
			},
			clearQueue: function(e) {
				return this.queue(e || "fx", [])
			},
			promise: function(e, n) {
				var r, i = 1,
					s = v.Deferred(),
					o = this,
					u = this.length,
					a = function() {
						--i || s.resolveWith(o, [o])
					};
				for ("string" != typeof e && (n = e, e = t), e = e || "fx"; u--;) r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
				return a(), s.promise(n)
			}
		});
		var j, F, I, q = /[\t\r\n]/g,
			R = /\r/g,
			U = /^(?:button|input)$/i,
			z = /^(?:button|input|object|select|textarea)$/i,
			W = /^a(?:rea|)$/i,
			X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
			V = v.support.getSetAttribute;
		v.fn.extend({
			attr: function(e, t) {
				return v.access(this, v.attr, e, t, arguments.length > 1)
			},
			removeAttr: function(e) {
				return this.each(function() {
					v.removeAttr(this, e)
				})
			},
			prop: function(e, t) {
				return v.access(this, v.prop, e, t, arguments.length > 1)
			},
			removeProp: function(e) {
				return e = v.propFix[e] || e, this.each(function() {
					try {
						this[e] = t, delete this[e]
					} catch (n) {}
				})
			},
			addClass: function(e) {
				var t, n, r, i, s, o, u;
				if (v.isFunction(e)) return this.each(function(t) {
					v(this).addClass(e.call(this, t, this.className))
				});
				if (e && "string" == typeof e) for (t = e.split(y), n = 0, r = this.length; r > n; n++) if (i = this[n], 1 === i.nodeType) if (i.className || 1 !== t.length) {
					for (s = " " + i.className + " ", o = 0, u = t.length; u > o; o++) s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
					i.className = v.trim(s)
				} else i.className = e;
				return this
			},
			removeClass: function(e) {
				var n, r, i, s, o, u, a;
				if (v.isFunction(e)) return this.each(function(t) {
					v(this).removeClass(e.call(this, t, this.className))
				});
				if (e && "string" == typeof e || e === t) for (n = (e || "").split(y), u = 0, a = this.length; a > u; u++) if (i = this[u], 1 === i.nodeType && i.className) {
					for (r = (" " + i.className + " ").replace(q, " "), s = 0, o = n.length; o > s; s++) for (; r.indexOf(" " + n[s] + " ") >= 0;) r = r.replace(" " + n[s] + " ", " ");
					i.className = e ? v.trim(r) : ""
				}
				return this
			},
			toggleClass: function(e, t) {
				var n = typeof e,
					r = "boolean" == typeof t;
				return v.isFunction(e) ? this.each(function(n) {
					v(this).toggleClass(e.call(this, n, this.className, t), t)
				}) : this.each(function() {
					if ("string" === n) for (var i, s = 0, o = v(this), u = t, a = e.split(y); i = a[s++];) u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i);
					else("undefined" === n || "boolean" === n) && (this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || "")
				})
			},
			hasClass: function(e) {
				for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
				return !1
			},
			val: function(e) {
				var n, r, i, s = this[0]; {
					if (arguments.length) return i = v.isFunction(e), this.each(function(r) {
						var s, o = v(this);
						1 === this.nodeType && (s = i ? e.call(this, r, o.val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : v.isArray(s) && (s = v.map(s, function(e) {
							return null == e ? "" : e + ""
						})), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, s, "value") !== t || (this.value = s))
					});
					if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, "string" == typeof r ? r.replace(R, "") : null == r ? "" : r)
				}
			}
		}), v.extend({
			valHooks: {
				option: {
					get: function(e) {
						var t = e.attributes.value;
						return !t || t.specified ? e.value : e.text
					}
				},
				select: {
					get: function(e) {
						for (var t, n, r = e.options, i = e.selectedIndex, s = "select-one" === e.type || 0 > i, o = s ? null : [], u = s ? i + 1 : r.length, a = 0 > i ? u : s ? i : 0; u > a; a++) if (n = r[a], (n.selected || a === i) && (v.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
							if (t = v(n).val(), s) return t;
							o.push(t)
						}
						return o
					},
					set: function(e, t) {
						var n = v.makeArray(t);
						return v(e).find("option").each(function() {
							this.selected = v.inArray(v(this).val(), n) >= 0
						}), n.length || (e.selectedIndex = -1), n
					}
				}
			},
			attrFn: {},
			attr: function(e, n, r, i) {
				var s, o, u, a = e.nodeType;
				if (e && 3 !== a && 8 !== a && 2 !== a) return i && v.isFunction(v.fn[n]) ? v(e)[n](r) : "undefined" == typeof e.getAttribute ? v.prop(e, n, r) : (u = 1 !== a || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j)), r !== t ? null === r ? void v.removeAttr(e, n) : o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r) : o && "get" in o && u && null !== (s = o.get(e, n)) ? s : (s = e.getAttribute(n), null === s ? t : s))
			},
			removeAttr: function(e, t) {
				var n, r, i, s, o = 0;
				if (t && 1 === e.nodeType) for (r = t.split(y); o < r.length; o++) i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1))
			},
			attrHooks: {
				type: {
					set: function(e, t) {
						if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");
						else if (!v.support.radioValue && "radio" === t && v.nodeName(e, "input")) {
							var n = e.value;
							return e.setAttribute("type", t), n && (e.value = n), t
						}
					}
				},
				value: {
					get: function(e, t) {
						return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null
					},
					set: function(e, t, n) {
						return j && v.nodeName(e, "button") ? j.set(e, t, n) : void(e.value = t)
					}
				}
			},
			propFix: {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			prop: function(e, n, r) {
				var i, s, o, u = e.nodeType;
				if (e && 3 !== u && 8 !== u && 2 !== u) return o = 1 !== u || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && null !== (i = s.get(e, n)) ? i : e[n]
			},
			propHooks: {
				tabIndex: {
					get: function(e) {
						var n = e.getAttributeNode("tabindex");
						return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
					}
				}
			}
		}), F = {
			get: function(e, n) {
				var r, i = v.prop(e, n);
				return i === !0 || "boolean" != typeof i && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
			},
			set: function(e, t, n) {
				var r;
				return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
			}
		}, V || (I = {
			name: !0,
			id: !0,
			coords: !0
		}, j = v.valHooks.button = {
			get: function(e, n) {
				var r;
				return r = e.getAttributeNode(n), r && (I[n] ? "" !== r.value : r.specified) ? r.value : t
			},
			set: function(e, t, n) {
				var r = e.getAttributeNode(n);
				return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + ""
			}
		}, v.each(["width", "height"], function(e, t) {
			v.attrHooks[t] = v.extend(v.attrHooks[t], {
				set: function(e, n) {
					return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
				}
			})
		}), v.attrHooks.contenteditable = {
			get: j.get,
			set: function(e, t, n) {
				"" === t && (t = "false"), j.set(e, t, n)
			}
		}), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function(e, n) {
			v.attrHooks[n] = v.extend(v.attrHooks[n], {
				get: function(e) {
					var r = e.getAttribute(n, 2);
					return null === r ? t : r
				}
			})
		}), v.support.style || (v.attrHooks.style = {
			get: function(e) {
				return e.style.cssText.toLowerCase() || t
			},
			set: function(e, t) {
				return e.style.cssText = t + ""
			}
		}), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
			get: function(e) {
				var t = e.parentNode;
				return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
			}
		})), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function() {
			v.valHooks[this] = {
				get: function(e) {
					return null === e.getAttribute("value") ? "on" : e.value
				}
			}
		}), v.each(["radio", "checkbox"], function() {
			v.valHooks[this] = v.extend(v.valHooks[this], {
				set: function(e, t) {
					return v.isArray(t) ? e.checked = v.inArray(v(e).val(), t) >= 0 : void 0
				}
			})
		});
		var $ = /^(?:textarea|input|select)$/i,
			J = /^([^\.]*|)(?:\.(.+)|)$/,
			K = /(?:^|\s)hover(\.\S+|)\b/,
			Q = /^key/,
			G = /^(?:mouse|contextmenu)|click/,
			Y = /^(?:focusinfocus|focusoutblur)$/,
			Z = function(e) {
				return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
			};
		v.event = {
			add: function(e, n, r, i, s) {
				var o, u, a, f, l, c, h, p, d, m, g;
				if (3 !== e.nodeType && 8 !== e.nodeType && n && r && (o = v._data(e))) {
					for (r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function(e) {
						return "undefined" == typeof v || e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
					}, u.elem = e), n = v.trim(Z(n)).split(" "), f = 0; f < n.length; f++) l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({
						type: c,
						origType: l[1],
						data: i,
						handler: r,
						guid: r.guid,
						selector: s,
						needsContext: s && v.expr.match.needsContext.test(s),
						namespace: h.join(".")
					}, d), m = a[c], m || (m = a[c] = [], m.delegateCount = 0, g.setup && g.setup.call(e, i, h, u) !== !1 || (e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u))), g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0;
					e = null
				}
			},
			global: {},
			remove: function(e, t, n, r, i) {
				var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
				if (g && (h = g.events)) {
					for (t = v.trim(Z(t || "")).split(" "), s = 0; s < t.length; s++) if (o = J.exec(t[s]) || [], u = a = o[1], f = o[2], u) {
						for (p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c = 0; c < d.length; c++) m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || "**" === r && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
						0 === d.length && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u])
					} else for (u in h) v.event.remove(e, u + t[s], n, r, !0);
					v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0))
				}
			},
			customEvent: {
				getData: !0,
				setData: !0,
				changeData: !0
			},
			trigger: function(n, r, s, o) {
				if (!s || 3 !== s.nodeType && 8 !== s.nodeType) {
					var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
						b = [];
					if (Y.test(y + v.event.triggered)) return;
					if (y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort()), (!s || v.event.customEvent[y]) && !v.event.global[y]) return;
					if (n = "object" == typeof n ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "", !s) {
						u = v.cache;
						for (f in u) u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
						return
					}
					if (n.result = t, n.target || (n.target = s), r = null != r ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {}, p.trigger && p.trigger.apply(s, r) === !1) return;
					if (m = [
						[s, p.bindType || y]
					], !o && !p.noBubble && !v.isWindow(s)) {
						for (g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode, c = s; l; l = l.parentNode) m.push([l, g]), c = l;
						c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
					}
					for (f = 0; f < m.length && !n.isPropagationStopped(); f++) l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
					return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && ("click" !== y || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && ("focus" !== y && "blur" !== y || 0 !== n.target.offsetWidth) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result
				}
			},
			dispatch: function(n) {
				n = v.event.fix(n || e.event);
				var r, i, s, o, u, a, f, c, h, d = (v._data(this, "events") || {})[n.type] || [],
					m = d.delegateCount,
					g = l.call(arguments),
					y = !n.exclusive && !n.namespace,
					b = v.event.special[n.type] || {},
					w = [];
				if (g[0] = n, n.delegateTarget = this, !b.preDispatch || b.preDispatch.call(this, n) !== !1) {
					if (m && (!n.button || "click" !== n.type)) for (s = n.target; s != this; s = s.parentNode || this) if (s.disabled !== !0 || "click" !== n.type) {
						for (u = {}, f = [], r = 0; m > r; r++) c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
						f.length && w.push({
							elem: s,
							matches: f
						})
					}
					for (d.length > m && w.push({
						elem: this,
						matches: d.slice(m)
					}), r = 0; r < w.length && !n.isPropagationStopped(); r++) for (a = w[r], n.currentTarget = a.elem, i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) c = a.matches[i], (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) && (n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation())));
					return b.postDispatch && b.postDispatch.call(this, n), n.result
				}
			},
			props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(e, t) {
					return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
				filter: function(e, n) {
					var r, s, o, u = n.button,
						a = n.fromElement;
					return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = 1 & u ? 1 : 2 & u ? 3 : 4 & u ? 2 : 0), e
				}
			},
			fix: function(e) {
				if (e[v.expando]) return e;
				var t, n, r = e,
					s = v.event.fixHooks[e.type] || {},
					o = s.props ? this.props.concat(s.props) : this.props;
				for (e = v.Event(r), t = o.length; t;) n = o[--t], e[n] = r[n];
				return e.target || (e.target = r.srcElement || i), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, s.filter ? s.filter(e, r) : e
			},
			special: {
				load: {
					noBubble: !0
				},
				focus: {
					delegateType: "focusin"
				},
				blur: {
					delegateType: "focusout"
				},
				beforeunload: {
					setup: function(e, t, n) {
						v.isWindow(this) && (this.onbeforeunload = n)
					},
					teardown: function(e, t) {
						this.onbeforeunload === t && (this.onbeforeunload = null)
					}
				}
			},
			simulate: function(e, t, n, r) {
				var i = v.extend(new v.Event, n, {
					type: e,
					isSimulated: !0,
					originalEvent: {}
				});
				r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
			}
		}, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ?
		function(e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n, !1)
		} : function(e, t, n) {
			var r = "on" + t;
			e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
		}, v.Event = function(e, t) {
			return this instanceof v.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0, void 0) : new v.Event(e, t)
		}, v.Event.prototype = {
			preventDefault: function() {
				this.isDefaultPrevented = tt;
				var e = this.originalEvent;
				e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
			},
			stopPropagation: function() {
				this.isPropagationStopped = tt;
				var e = this.originalEvent;
				e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = tt, this.stopPropagation()
			},
			isDefaultPrevented: et,
			isPropagationStopped: et,
			isImmediatePropagationStopped: et
		}, v.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function(e, t) {
			v.event.special[e] = {
				delegateType: t,
				bindType: t,
				handle: function(e) {
					var n, r = this,
						i = e.relatedTarget,
						s = e.handleObj;
					s.selector;
					return (!i || i !== r && !v.contains(r, i)) && (e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t), n
				}
			}
		}), v.support.submitBubbles || (v.event.special.submit = {
			setup: function() {
				return v.nodeName(this, "form") ? !1 : void v.event.add(this, "click._submit keypress._submit", function(e) {
					var n = e.target,
						r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
					r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function(e) {
						e._submit_bubble = !0
					}), v._data(r, "_submit_attached", !0))
				})
			},
			postDispatch: function(e) {
				e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
			},
			teardown: function() {
				return v.nodeName(this, "form") ? !1 : void v.event.remove(this, "._submit")
			}
		}), v.support.changeBubbles || (v.event.special.change = {
			setup: function() {
				return $.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (v.event.add(this, "propertychange._change", function(e) {
					"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
				}), v.event.add(this, "click._change", function(e) {
					this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0)
				})), !1) : void v.event.add(this, "beforeactivate._change", function(e) {
					var t = e.target;
					$.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function(e) {
						this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
					}), v._data(t, "_change_attached", !0))
				})
			},
			handle: function(e) {
				var t = e.target;
				return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
			},
			teardown: function() {
				return v.event.remove(this, "._change"), !$.test(this.nodeName)
			}
		}), v.support.focusinBubbles || v.each({
			focus: "focusin",
			blur: "focusout"
		}, function(e, t) {
			var n = 0,
				r = function(e) {
					v.event.simulate(t, e.target, v.event.fix(e), !0)
				};
			v.event.special[t] = {
				setup: function() {
					0 === n++ && i.addEventListener(e, r, !0)
				},
				teardown: function() {
					0 === --n && i.removeEventListener(e, r, !0)
				}
			}
		}), v.fn.extend({
			on: function(e, n, r, i, s) {
				var o, u;
				if ("object" == typeof e) {
					"string" != typeof n && (r = r || n, n = t);
					for (u in e) this.on(u, n, r, e[u], s);
					return this
				}
				if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = et;
				else if (!i) return this;
				return 1 === s && (o = i, i = function(e) {
					return v().off(e), o.apply(this, arguments)
				}, i.guid = o.guid || (o.guid = v.guid++)), this.each(function() {
					v.event.add(this, e, i, r, n)
				})
			},
			one: function(e, t, n, r) {
				return this.on(e, t, n, r, 1)
			},
			off: function(e, n, r) {
				var i, s;
				if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
				if ("object" == typeof e) {
					for (s in e) this.off(s, n, e[s]);
					return this
				}
				return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = et), this.each(function() {
					v.event.remove(this, e, r, n)
				})
			},
			bind: function(e, t, n) {
				return this.on(e, null, t, n)
			},
			unbind: function(e, t) {
				return this.off(e, null, t)
			},
			live: function(e, t, n) {
				return v(this.context).on(e, this.selector, t, n), this
			},
			die: function(e, t) {
				return v(this.context).off(e, this.selector || "**", t), this
			},
			delegate: function(e, t, n, r) {
				return this.on(t, e, n, r)
			},
			undelegate: function(e, t, n) {
				return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
			},
			trigger: function(e, t) {
				return this.each(function() {
					v.event.trigger(e, t, this)
				})
			},
			triggerHandler: function(e, t) {
				return this[0] ? v.event.trigger(e, t, this[0], !0) : void 0
			},
			toggle: function(e) {
				var t = arguments,
					n = e.guid || v.guid++,
					r = 0,
					i = function(n) {
						var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
						return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
					};
				for (i.guid = n; r < t.length;) t[r++].guid = n;
				return this.click(i)
			},
			hover: function(e, t) {
				return this.mouseenter(e).mouseleave(t || e)
			}
		}), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
			v.fn[t] = function(e, n) {
				return null == n && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
			}, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
		}), function(e, t) {
			function nt(e, t, n, r) {
				n = n || [], t = t || g;
				var i, s, a, f, l = t.nodeType;
				if (!e || "string" != typeof e) return n;
				if (1 !== l && 9 !== l) return [];
				if (a = o(t), !a && !r && (i = R.exec(e))) if (f = i[1]) {
					if (9 === l) {
						if (s = t.getElementById(f), !s || !s.parentNode) return n;
						if (s.id === f) return n.push(s), n
					} else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s), n
				} else {
					if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;
					if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n
				}
				return vt(e.replace(j, "$1"), t, n, r, a)
			}
			function rt(e) {
				return function(t) {
					var n = t.nodeName.toLowerCase();
					return "input" === n && t.type === e
				}
			}
			function it(e) {
				return function(t) {
					var n = t.nodeName.toLowerCase();
					return ("input" === n || "button" === n) && t.type === e
				}
			}
			function st(e) {
				return N(function(t) {
					return t = +t, N(function(n, r) {
						for (var i, s = e([], n.length, t), o = s.length; o--;) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
					})
				})
			}
			function ot(e, t, n) {
				if (e === t) return n;
				for (var r = e.nextSibling; r;) {
					if (r === t) return -1;
					r = r.nextSibling
				}
				return 1
			}
			function ut(e, t) {
				var n, r, s, o, u, a, f, l = L[d][e + " "];
				if (l) return t ? 0 : l.slice(0);
				for (u = e, a = [], f = i.preFilter; u;) {
					(!n || (r = F.exec(u))) && (r && (u = u.slice(r[0].length) || u), a.push(s = [])), n = !1, (r = I.exec(u)) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " "));
					for (o in i.filter)(r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
					if (!n) break
				}
				return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
			}
			function at(e, t, r) {
				var i = t.dir,
					s = r && "parentNode" === t.dir,
					o = w++;
				return t.first ?
				function(t, n, r) {
					for (; t = t[i];) if (s || 1 === t.nodeType) return e(t, n, r)
				} : function(t, r, u) {
					if (u) {
						for (; t = t[i];) if ((s || 1 === t.nodeType) && e(t, r, u)) return t
					} else for (var a, f = b + " " + o + " ", l = f + n; t = t[i];) if (s || 1 === t.nodeType) {
						if ((a = t[d]) === l) return t.sizset;
						if ("string" == typeof a && 0 === a.indexOf(f)) {
							if (t.sizset) return t
						} else {
							if (t[d] = l, e(t, r, u)) return t.sizset = !0, t;
							t.sizset = !1
						}
					}
				}
			}
			function ft(e) {
				return e.length > 1 ?
				function(t, n, r) {
					for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
					return !0
				} : e[0]
			}
			function lt(e, t, n, r, i) {
				for (var s, o = [], u = 0, a = e.length, f = null != t; a > u; u++)(s = e[u]) && (!n || n(s, r, i)) && (o.push(s), f && t.push(u));
				return o
			}
			function ct(e, t, n, r, i, s) {
				return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function(s, o, u, a) {
					var f, l, c, h = [],
						p = [],
						d = o.length,
						v = s || dt(t || "*", u.nodeType ? [u] : u, []),
						m = !e || !s && t ? v : lt(v, h, e, u, a),
						g = n ? i || (s ? e : d || r) ? [] : o : m;
					if (n && n(m, g, u, a), r) for (f = lt(g, p), r(f, [], u, a), l = f.length; l--;)(c = f[l]) && (g[p[l]] = !(m[p[l]] = c));
					if (s) {
						if (i || e) {
							if (i) {
								for (f = [], l = g.length; l--;)(c = g[l]) && f.push(m[l] = c);
								i(null, g = [], f, a)
							}
							for (l = g.length; l--;)(c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
						}
					} else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g)
				})
			}
			function ht(e) {
				for (var t, n, r, s = e.length, o = i.relative[e[0].type], u = o || i.relative[" "], a = o ? 1 : 0, f = at(function(e) {
					return e === t
				}, u, !0), l = at(function(e) {
					return T.call(t, e) > -1
				}, u, !0), h = [function(e, n, r) {
					return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
				}]; s > a; a++) if (n = i.relative[e[a].type]) h = [at(ft(h), n)];
				else {
					if (n = i.filter[e[a].type].apply(null, e[a].matches), n[d]) {
						for (r = ++a; s > r && !i.relative[e[r].type]; r++);
						return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, r > a && ht(e.slice(a, r)), s > r && ht(e = e.slice(r)), s > r && e.join(""))
					}
					h.push(n)
				}
				return ft(h)
			}
			function pt(e, t) {
				var r = t.length > 0,
					s = e.length > 0,
					o = function(u, a, f, l, h) {
						var p, d, v, m = [],
							y = 0,
							w = "0",
							x = u && [],
							T = null != h,
							N = c,
							C = u || s && i.find.TAG("*", h && a.parentNode || a),
							k = b += null == N ? 1 : Math.E;
						for (T && (c = a !== g && a, n = o.el); null != (p = C[w]); w++) {
							if (s && p) {
								for (d = 0; v = e[d]; d++) if (v(p, a, f)) {
									l.push(p);
									break
								}
								T && (b = k, n = ++o.el)
							}
							r && ((p = !v && p) && y--, u && x.push(p))
						}
						if (y += w, r && w !== y) {
							for (d = 0; v = t[d]; d++) v(x, m, a, f);
							if (u) {
								if (y > 0) for (; w--;)!x[w] && !m[w] && (m[w] = E.call(l));
								m = lt(m)
							}
							S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
						}
						return T && (b = k, c = N), x
					};
				return o.el = 0, r ? N(o) : o
			}
			function dt(e, t, n) {
				for (var r = 0, i = t.length; i > r; r++) nt(e, t[r], n);
				return n
			}
			function vt(e, t, n, r, s) {
				var o, u, f, l, c, h = ut(e);
				h.length;
				if (!r && 1 === h.length) {
					if (u = h[0] = h[0].slice(0), u.length > 2 && "ID" === (f = u[0]).type && 9 === t.nodeType && !s && i.relative[u[1].type]) {
						if (t = i.find.ID(f.matches[0].replace($, ""), t, s)[0], !t) return n;
						e = e.slice(u.shift().length)
					}
					for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0 && (f = u[o], !i.relative[l = f.type]); o--) if ((c = i.find[l]) && (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s))) {
						if (u.splice(o, 1), e = r.length && u.join(""), !e) return S.apply(n, x.call(r, 0)), n;
						break
					}
				}
				return a(e, h)(r, t, s, n, z.test(e)), n
			}
			function mt() {}
			var n, r, i, s, o, u, a, f, l, c, h = !0,
				p = "undefined",
				d = ("sizcache" + Math.random()).replace(".", ""),
				m = String,
				g = e.document,
				y = g.documentElement,
				b = 0,
				w = 0,
				E = [].pop,
				S = [].push,
				x = [].slice,
				T = [].indexOf ||
			function(e) {
				for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
				return -1
			}, N = function(e, t) {
				return e[d] = null == t || t, e
			}, C = function() {
				var e = {},
					t = [];
				return N(function(n, r) {
					return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r
				}, e)
			}, k = C(), L = C(), A = C(), O = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", _ = M.replace("w", "w#"), D = "([*^$|!~]?=)", P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]", H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)", B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"), F = new RegExp("^" + O + "*," + O + "*"), I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"), q = new RegExp(H), R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, z = /[\x20\t\r\n\f]*[+~]/, X = /h\d/i, V = /input|select|textarea|button/i, $ = /\\(?!\\)/g, J = {
				ID: new RegExp("^#(" + M + ")"),
				CLASS: new RegExp("^\\.(" + M + ")"),
				NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
				TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
				ATTR: new RegExp("^" + P),
				PSEUDO: new RegExp("^" + H),
				POS: new RegExp(B, "i"),
				CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
				needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
			}, K = function(e) {
				var t = g.createElement("div");
				try {
					return e(t)
				} catch (n) {
					return !1
				} finally {
					t = null
				}
			}, Q = K(function(e) {
				return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length
			}), G = K(function(e) {
				return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && "#" === e.firstChild.getAttribute("href")
			}), Y = K(function(e) {
				e.innerHTML = "<select></select>";
				var t = typeof e.lastChild.getAttribute("multiple");
				return "boolean" !== t && "string" !== t
			}), Z = K(function(e) {
				return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
			}), et = K(function(e) {
				e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
				var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
				return r = !g.getElementById(d), y.removeChild(e), t
			});
			try {
				x.call(y.childNodes, 0)[0].nodeType
			} catch (tt) {
				x = function(e) {
					for (var t, n = []; t = this[e]; e++) n.push(t);
					return n
				}
			}
			nt.matches = function(e, t) {
				return nt(e, null, null, t)
			}, nt.matchesSelector = function(e, t) {
				return nt(t, null, null, [e]).length > 0
			}, s = nt.getText = function(e) {
				var t, n = "",
					r = 0,
					i = e.nodeType;
				if (i) {
					if (1 === i || 9 === i || 11 === i) {
						if ("string" == typeof e.textContent) return e.textContent;
						for (e = e.firstChild; e; e = e.nextSibling) n += s(e)
					} else if (3 === i || 4 === i) return e.nodeValue
				} else for (; t = e[r]; r++) n += s(t);
				return n
			}, o = nt.isXML = function(e) {
				var t = e && (e.ownerDocument || e).documentElement;
				return t ? "HTML" !== t.nodeName : !1
			}, u = nt.contains = y.contains ?
			function(e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
					r = t && t.parentNode;
				return e === r || !! (r && 1 === r.nodeType && n.contains && n.contains(r))
			} : y.compareDocumentPosition ?
			function(e, t) {
				return t && !! (16 & e.compareDocumentPosition(t))
			} : function(e, t) {
				for (; t = t.parentNode;) if (t === e) return !0;
				return !1
			}, nt.attr = function(e, t) {
				var n, r = o(e);
				return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? "boolean" == typeof e[t] ? e[t] ? t : null : n.specified ? n.value : null : null)
			}, i = nt.selectors = {
				cacheLength: 50,
				createPseudo: N,
				match: J,
				attrHandle: G ? {} : {
					href: function(e) {
						return e.getAttribute("href", 2)
					},
					type: function(e) {
						return e.getAttribute("type")
					}
				},
				find: {
					ID: r ?
					function(e, t, n) {
						if (typeof t.getElementById !== p && !n) {
							var r = t.getElementById(e);
							return r && r.parentNode ? [r] : []
						}
					} : function(e, n, r) {
						if (typeof n.getElementById !== p && !r) {
							var i = n.getElementById(e);
							return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
						}
					},
					TAG: Q ?
					function(e, t) {
						return typeof t.getElementsByTagName !== p ? t.getElementsByTagName(e) : void 0
					} : function(e, t) {
						var n = t.getElementsByTagName(e);
						if ("*" === e) {
							for (var r, i = [], s = 0; r = n[s]; s++) 1 === r.nodeType && i.push(r);
							return i
						}
						return n
					},
					NAME: et &&
					function(e, t) {
						return typeof t.getElementsByName !== p ? t.getElementsByName(name) : void 0
					},
					CLASS: Z &&
					function(e, t, n) {
						return typeof t.getElementsByClassName === p || n ? void 0 : t.getElementsByClassName(e)
					}
				},
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
						return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), "nth" === e[1] ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && nt.error(e[0]), e
					},
					PSEUDO: function(e) {
						var t, n;
						return J.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (t = e[4]) && (q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t), e.slice(0, 3))
					}
				},
				filter: {
					ID: r ?
					function(e) {
						return e = e.replace($, ""), function(t) {
							return t.getAttribute("id") === e
						}
					} : function(e) {
						return e = e.replace($, ""), function(t) {
							var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
							return n && n.value === e
						}
					},
					TAG: function(e) {
						return "*" === e ?
						function() {
							return !0
						} : (e = e.replace($, "").toLowerCase(), function(t) {
							return t.nodeName && t.nodeName.toLowerCase() === e
						})
					},
					CLASS: function(e) {
						var t = k[d][e + " "];
						return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function(e) {
							return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
						})
					},
					ATTR: function(e, t, n) {
						return function(r, i) {
							var s = nt.attr(r, e);
							return null == s ? "!=" === t : t ? (s += "", "=" === t ? s === n : "!=" === t ? s !== n : "^=" === t ? n && 0 === s.indexOf(n) : "*=" === t ? n && s.indexOf(n) > -1 : "$=" === t ? n && s.substr(s.length - n.length) === n : "~=" === t ? (" " + s + " ").indexOf(n) > -1 : "|=" === t ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
						}
					},
					CHILD: function(e, t, n, r) {
						return "nth" === e ?
						function(e) {
							var t, i, s = e.parentNode;
							if (1 === n && 0 === r) return !0;
							if (s) for (i = 0, t = s.firstChild; t && (1 !== t.nodeType || (i++, e !== t)); t = t.nextSibling);
							return i -= r, i === n || i % n === 0 && i / n >= 0
						} : function(t) {
							var n = t;
							switch (e) {
							case "only":
							case "first":
								for (; n = n.previousSibling;) if (1 === n.nodeType) return !1;
								if ("first" === e) return !0;
								n = t;
							case "last":
								for (; n = n.nextSibling;) if (1 === n.nodeType) return !1;
								return !0
							}
						}
					},
					PSEUDO: function(e, t) {
						var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
						return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function(e, n) {
							for (var i, s = r(e, t), o = s.length; o--;) i = T.call(e, s[o]), e[i] = !(n[i] = s[o])
						}) : function(e) {
							return r(e, 0, n)
						}) : r
					}
				},
				pseudos: {
					not: N(function(e) {
						var t = [],
							n = [],
							r = a(e.replace(j, "$1"));
						return r[d] ? N(function(e, t, n, i) {
							for (var s, o = r(e, null, i, []), u = e.length; u--;)(s = o[u]) && (e[u] = !(t[u] = s))
						}) : function(e, i, s) {
							return t[0] = e, r(t, null, s, n), !n.pop()
						}
					}),
					has: N(function(e) {
						return function(t) {
							return nt(e, t).length > 0
						}
					}),
					contains: N(function(e) {
						return function(t) {
							return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
						}
					}),
					enabled: function(e) {
						return e.disabled === !1
					},
					disabled: function(e) {
						return e.disabled === !0
					},
					checked: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && !! e.checked || "option" === t && !! e.selected
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
					},
					parent: function(e) {
						return !i.pseudos.empty(e)
					},
					empty: function(e) {
						var t;
						for (e = e.firstChild; e;) {
							if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t) return !1;
							e = e.nextSibling
						}
						return !0
					},
					header: function(e) {
						return X.test(e.nodeName)
					},
					text: function(e) {
						var t, n;
						return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (n = e.getAttribute("type")) || n.toLowerCase() === t)
					},
					radio: rt("radio"),
					checkbox: rt("checkbox"),
					file: rt("file"),
					password: rt("password"),
					image: rt("image"),
					submit: it("submit"),
					reset: it("reset"),
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					input: function(e) {
						return V.test(e.nodeName)
					},
					focus: function(e) {
						var t = e.ownerDocument;
						return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
					},
					active: function(e) {
						return e === e.ownerDocument.activeElement
					},
					first: st(function() {
						return [0]
					}),
					last: st(function(e, t) {
						return [t - 1]
					}),
					eq: st(function(e, t, n) {
						return [0 > n ? n + t : n]
					}),
					even: st(function(e, t) {
						for (var n = 0; t > n; n += 2) e.push(n);
						return e
					}),
					odd: st(function(e, t) {
						for (var n = 1; t > n; n += 2) e.push(n);
						return e
					}),
					lt: st(function(e, t, n) {
						for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
						return e
					}),
					gt: st(function(e, t, n) {
						for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
						return e
					})
				}
			}, f = y.compareDocumentPosition ?
			function(e, t) {
				return e === t ? (l = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
			} : function(e, t) {
				if (e === t) return l = !0, 0;
				if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
				var n, r, i = [],
					s = [],
					o = e.parentNode,
					u = t.parentNode,
					a = o;
				if (o === u) return ot(e, t);
				if (!o) return -1;
				if (!u) return 1;
				for (; a;) i.unshift(a), a = a.parentNode;
				for (a = u; a;) s.unshift(a), a = a.parentNode;
				n = i.length, r = s.length;
				for (var f = 0; n > f && r > f; f++) if (i[f] !== s[f]) return ot(i[f], s[f]);
				return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
			}, [0, 0].sort(f), h = !l, nt.uniqueSort = function(e) {
				var t, n = [],
					r = 1,
					i = 0;
				if (l = h, e.sort(f), l) {
					for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
					for (; i--;) e.splice(n[i], 1)
				}
				return e
			}, nt.error = function(e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, a = nt.compile = function(e, t) {
				var n, r = [],
					i = [],
					s = A[d][e + " "];
				if (!s) {
					for (t || (t = ut(e)), n = t.length; n--;) s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
					s = A(e, pt(i, r))
				}
				return s
			}, g.querySelectorAll &&
			function() {
				var e, t = vt,
					n = /'|\\/g,
					r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
					i = [":focus"],
					s = [":active"],
					u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
				K(function(e) {
					e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
				}), K(function(e) {
					e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
				}), i = new RegExp(i.join("|")), vt = function(e, r, s, o, u) {
					if (!o && !u && !i.test(e)) {
						var a, f, l = !0,
							c = d,
							h = r,
							p = 9 === r.nodeType && e;
						if (1 === r.nodeType && "object" !== r.nodeName.toLowerCase()) {
							for (a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length; f--;) a[f] = c + a[f].join("");
							h = z.test(e) && r.parentNode || r, p = a.join(",")
						}
						if (p) try {
							return S.apply(s, x.call(h.querySelectorAll(p), 0)), s
						} catch (v) {} finally {
							l || r.removeAttribute("id")
						}
					}
					return t(e, r, s, o, u)
				}, u && (K(function(t) {
					e = u.call(t, "div");
					try {
						u.call(t, "[test!='']:sizzle"), s.push("!=", H)
					} catch (n) {}
				}), s = new RegExp(s.join("|")), nt.matchesSelector = function(t, n) {
					if (n = n.replace(r, "='$1']"), !o(t) && !s.test(n) && !i.test(n)) try {
						var a = u.call(t, n);
						if (a || e || t.document && 11 !== t.document.nodeType) return a
					} catch (f) {}
					return nt(n, null, null, [t]).length > 0
				})
			}(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt, nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains
		}(e);
		var nt = /Until$/,
			rt = /^(?:parents|prev(?:Until|All))/,
			it = /^.[^:#\[\.,]*$/,
			st = v.expr.match.needsContext,
			ot = {
				children: !0,
				contents: !0,
				next: !0,
				prev: !0
			};
		v.fn.extend({
			find: function(e) {
				var t, n, r, i, s, o, u = this;
				if ("string" != typeof e) return v(e).filter(function() {
					for (t = 0, n = u.length; n > t; t++) if (v.contains(u[t], this)) return !0
				});
				for (o = this.pushStack("", "find", e), t = 0, n = this.length; n > t; t++) if (r = o.length, v.find(e, this[t], o), t > 0) for (i = r; i < o.length; i++) for (s = 0; r > s; s++) if (o[s] === o[i]) {
					o.splice(i--, 1);
					break
				}
				return o
			},
			has: function(e) {
				var t, n = v(e, this),
					r = n.length;
				return this.filter(function() {
					for (t = 0; r > t; t++) if (v.contains(this, n[t])) return !0
				})
			},
			not: function(e) {
				return this.pushStack(ft(this, e, !1), "not", e)
			},
			filter: function(e) {
				return this.pushStack(ft(this, e, !0), "filter", e)
			},
			is: function(e) {
				return !!e && ("string" == typeof e ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
			},
			closest: function(e, t) {
				for (var n, r = 0, i = this.length, s = [], o = st.test(e) || "string" != typeof e ? v(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
					if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
						s.push(n);
						break
					}
					n = n.parentNode
				}
				return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e)
			},
			index: function(e) {
				return e ? "string" == typeof e ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
			},
			add: function(e, t) {
				var n = "string" == typeof e ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
					r = v.merge(this.get(), n);
				return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
			},
			addBack: function(e) {
				return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
			}
		}), v.fn.andSelf = v.fn.addBack, v.each({
			parent: function(e) {
				var t = e.parentNode;
				return t && 11 !== t.nodeType ? t : null
			},
			parents: function(e) {
				return v.dir(e, "parentNode")
			},
			parentsUntil: function(e, t, n) {
				return v.dir(e, "parentNode", n)
			},
			next: function(e) {
				return at(e, "nextSibling")
			},
			prev: function(e) {
				return at(e, "previousSibling")
			},
			nextAll: function(e) {
				return v.dir(e, "nextSibling")
			},
			prevAll: function(e) {
				return v.dir(e, "previousSibling")
			},
			nextUntil: function(e, t, n) {
				return v.dir(e, "nextSibling", n)
			},
			prevUntil: function(e, t, n) {
				return v.dir(e, "previousSibling", n)
			},
			siblings: function(e) {
				return v.sibling((e.parentNode || {}).firstChild, e)
			},
			children: function(e) {
				return v.sibling(e.firstChild)
			},
			contents: function(e) {
				return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
			}
		}, function(e, t) {
			v.fn[e] = function(n, r) {
				var i = v.map(this, t, n);
				return nt.test(e) || (r = n), r && "string" == typeof r && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","))
			}
		}), v.extend({
			filter: function(e, t, n) {
				return n && (e = ":not(" + e + ")"), 1 === t.length ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
			},
			dir: function(e, n, r) {
				for (var i = [], s = e[n]; s && 9 !== s.nodeType && (r === t || 1 !== s.nodeType || !v(s).is(r));) 1 === s.nodeType && i.push(s), s = s[n];
				return i
			},
			sibling: function(e, t) {
				for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
				return n
			}
		});
		var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
			ht = / jQuery\d+="(?:null|\d+)"/g,
			pt = /^\s+/,
			dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			vt = /<([\w:]+)/,
			mt = /<tbody/i,
			gt = /<|&#?\w+;/,
			yt = /<(?:script|style|link)/i,
			bt = /<(?:script|object|embed|option|style)/i,
			wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
			Et = /^(?:checkbox|radio)$/,
			St = /checked\s*(?:[^=]|=\s*.checked.)/i,
			xt = /\/(java|ecma)script/i,
			Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
			Nt = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				thead: [1, "<table>", "</table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				area: [1, "<map>", "</map>"],
				_default: [0, "", ""]
			},
			Ct = lt(i),
			kt = Ct.appendChild(i.createElement("div"));
		Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({
			text: function(e) {
				return v.access(this, function(e) {
					return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
				}, null, e, arguments.length)
			},
			wrapAll: function(e) {
				if (v.isFunction(e)) return this.each(function(t) {
					v(this).wrapAll(e.call(this, t))
				});
				if (this[0]) {
					var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
					this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
						for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
						return e
					}).append(this)
				}
				return this
			},
			wrapInner: function(e) {
				return v.isFunction(e) ? this.each(function(t) {
					v(this).wrapInner(e.call(this, t))
				}) : this.each(function() {
					var t = v(this),
						n = t.contents();
					n.length ? n.wrapAll(e) : t.append(e)
				})
			},
			wrap: function(e) {
				var t = v.isFunction(e);
				return this.each(function(n) {
					v(this).wrapAll(t ? e.call(this, n) : e)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
				}).end()
			},
			append: function() {
				return this.domManip(arguments, !0, function(e) {
					(1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
				})
			},
			prepend: function() {
				return this.domManip(arguments, !0, function(e) {
					(1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
				})
			},
			before: function() {
				if (!ut(this[0])) return this.domManip(arguments, !1, function(e) {
					this.parentNode.insertBefore(e, this)
				});
				if (arguments.length) {
					var e = v.clean(arguments);
					return this.pushStack(v.merge(e, this), "before", this.selector)
				}
			},
			after: function() {
				if (!ut(this[0])) return this.domManip(arguments, !1, function(e) {
					this.parentNode.insertBefore(e, this.nextSibling)
				});
				if (arguments.length) {
					var e = v.clean(arguments);
					return this.pushStack(v.merge(this, e), "after", this.selector)
				}
			},
			remove: function(e, t) {
				for (var n, r = 0; null != (n = this[r]); r++)(!e || v.filter(e, [n]).length) && (!t && 1 === n.nodeType && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
				return this
			},
			empty: function() {
				for (var e, t = 0; null != (e = this[t]); t++) for (1 === e.nodeType && v.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
				return this
			},
			clone: function(e, t) {
				return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
					return v.clone(this, e, t)
				})
			},
			html: function(e) {
				return v.access(this, function(e) {
					var n = this[0] || {},
						r = 0,
						i = this.length;
					if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(ht, "") : t;
					if ("string" == typeof e && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
						e = e.replace(dt, "<$1></$2>");
						try {
							for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
							n = 0
						} catch (s) {}
					}
					n && this.empty().append(e)
				}, null, e, arguments.length)
			},
			replaceWith: function(e) {
				return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function(t) {
					var n = v(this),
						r = n.html();
					n.replaceWith(e.call(this, t, r))
				}) : ("string" != typeof e && (e = v(e).detach()), this.each(function() {
					var t = this.nextSibling,
						n = this.parentNode;
					v(this).remove(), t ? v(t).before(e) : v(n).append(e)
				}))
			},
			detach: function(e) {
				return this.remove(e, !0)
			},
			domManip: function(e, n, r) {
				e = [].concat.apply([], e);
				var i, s, o, u, a = 0,
					f = e[0],
					l = [],
					c = this.length;
				if (!v.support.checkClone && c > 1 && "string" == typeof f && St.test(f)) return this.each(function() {
					v(this).domManip(e, n, r)
				});
				if (v.isFunction(f)) return this.each(function(i) {
					var s = v(this);
					e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r)
				});
				if (this[0]) {
					if (i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, 1 === o.childNodes.length && (o = s), s) for (n = n && v.nodeName(s, "tr"), u = i.cacheable || c - 1; c > a; a++) r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0));
					o = s = null, l.length && v.each(l, function(e, t) {
						t.src ? v.ajax ? v.ajax({
							url: t.src,
							type: "GET",
							dataType: "script",
							async: !1,
							global: !1,
							"throws": !0
						}) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t)
					})
				}
				return this
			}
		}), v.buildFragment = function(e, n, r) {
			var s, o, u, a = e[0];
			return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, 1 === e.length && "string" == typeof a && a.length < 512 && n === i && "<" === a.charAt(0) && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), {
				fragment: s,
				cacheable: o
			}
		}, v.fragments = {}, v.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(e, t) {
			v.fn[e] = function(n) {
				var r, i = 0,
					s = [],
					o = v(n),
					u = o.length,
					a = 1 === this.length && this[0].parentNode;
				if ((null == a || a && 11 === a.nodeType && 1 === a.childNodes.length) && 1 === u) return o[t](this[0]), this;
				for (; u > i; i++) r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
				return this.pushStack(s, e, o.selector)
			}
		}), v.extend({
			clone: function(e, t, n) {
				var r, i, s, o;
				if (v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild)), !(v.support.noCloneEvent && v.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || v.isXMLDoc(e))) for (Ot(e, o), r = Mt(e), i = Mt(o), s = 0; r[s]; ++s) i[s] && Ot(r[s], i[s]);
				if (t && (At(e, o), n)) for (r = Mt(e), i = Mt(o), s = 0; r[s]; ++s) At(r[s], i[s]);
				return r = i = null, o
			},
			clean: function(e, t, n, r) {
				var s, o, u, a, f, l, c, h, p, m, g, y = t === i && Ct,
					b = [];
				for (t && "undefined" != typeof t.createDocumentFragment || (t = i), s = 0; null != (u = e[s]); s++) if ("number" == typeof u && (u += ""), u) {
					if ("string" == typeof u) if (gt.test(u)) {
						for (y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2]; l--;) c = c.lastChild;
						if (!v.support.tbody) for (h = mt.test(u), p = "table" !== a || h ? "<table>" !== f[1] || h ? [] : c.childNodes : c.firstChild && c.firstChild.childNodes, o = p.length - 1; o >= 0; --o) v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o]);
						!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c)
					} else u = t.createTextNode(u);
					u.nodeType ? b.push(u) : v.merge(b, u)
				}
				if (c && (u = c = y = null), !v.support.appendChecked) for (s = 0; null != (u = b[s]); s++) v.nodeName(u, "input") ? _t(u) : "undefined" != typeof u.getElementsByTagName && v.grep(u.getElementsByTagName("input"), _t);
				if (n) for (m = function(e) {
					return !e.type || xt.test(e.type) ? r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e) : void 0
				}, s = 0; null != (u = b[s]); s++) v.nodeName(u, "script") && m(u) || (n.appendChild(u), "undefined" != typeof u.getElementsByTagName && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length));
				return b
			},
			cleanData: function(e, t) {
				for (var n, r, i, s, o = 0, u = v.expando, a = v.cache, f = v.support.deleteExpando, l = v.event.special; null != (i = e[o]); o++) if ((t || v.acceptData(i)) && (r = i[u], n = r && a[r])) {
					if (n.events) for (s in n.events) l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
					a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
				}
			}
		}), function() {
			var e, t;
			v.uaMatch = function(e) {
				e = e.toLowerCase();
				var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
				return {
					browser: t[1] || "",
					version: t[2] || "0"
				}
			}, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function() {
				function e(t, n) {
					return new e.fn.init(t, n)
				}
				v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(r, i) {
					return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t)
				}, e.fn.init.prototype = e.fn;
				var t = e(i);
				return e
			}
		}();
		var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
			jt = /opacity=([^)]*)/,
			Ft = /^(top|right|bottom|left)$/,
			It = /^(none|table(?!-c[ea]).+)/,
			qt = /^margin/,
			Rt = new RegExp("^(" + m + ")(.*)$", "i"),
			Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
			zt = new RegExp("^([-+])=(" + m + ")", "i"),
			Wt = {
				BODY: "block"
			},
			Xt = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			Vt = {
				letterSpacing: 0,
				fontWeight: 400
			},
			$t = ["Top", "Right", "Bottom", "Left"],
			Jt = ["Webkit", "O", "Moz", "ms"],
			Kt = v.fn.toggle;
		v.fn.extend({
			css: function(e, n) {
				return v.access(this, function(e, n, r) {
					return r !== t ? v.style(e, n, r) : v.css(e, n)
				}, e, n, arguments.length > 1)
			},
			show: function() {
				return Yt(this, !0)
			},
			hide: function() {
				return Yt(this)
			},
			toggle: function(e, t) {
				var n = "boolean" == typeof e;
				return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function() {
					(n ? e : Gt(this)) ? v(this).show() : v(this).hide()
				})
			}
		}), v.extend({
			cssHooks: {
				opacity: {
					get: function(e, t) {
						if (t) {
							var n = Dt(e, "opacity");
							return "" === n ? "1" : n
						}
					}
				}
			},
			cssNumber: {
				fillOpacity: !0,
				fontWeight: !0,
				lineHeight: !0,
				opacity: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {
				"float": v.support.cssFloat ? "cssFloat" : "styleFloat"
			},
			style: function(e, n, r, i) {
				if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
					var s, o, u, a = v.camelCase(n),
						f = e.style;
					if (n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a], r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
					if (o = typeof r, "string" === o && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number"), !(null == r || "number" === o && isNaN(r) || ("number" === o && !v.cssNumber[a] && (r += "px"), u && "set" in u && (r = u.set(e, r, i)) === t))) try {
						f[n] = r
					} catch (l) {}
				}
			},
			css: function(e, n, r, i) {
				var s, o, u, a = v.camelCase(n);
				return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), "normal" === s && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s
			},
			swap: function(e, t, n) {
				var r, i, s = {};
				for (i in t) s[i] = e.style[i], e.style[i] = t[i];
				r = n.call(e);
				for (i in t) e.style[i] = s[i];
				return r
			}
		}), e.getComputedStyle ? Dt = function(t, n) {
			var r, i, s, o, u = e.getComputedStyle(t, null),
				a = t.style;
			return u && (r = u.getPropertyValue(n) || u[n], "" === r && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r
		} : i.documentElement.currentStyle && (Dt = function(e, t) {
			var n, r, i = e.currentStyle && e.currentStyle[t],
				s = e.style;
			return null == i && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), "" === i ? "auto" : i
		}), v.each(["height", "width"], function(e, t) {
			v.cssHooks[t] = {
				get: function(e, n, r) {
					return n ? 0 === e.offsetWidth && It.test(Dt(e, "display")) ? v.swap(e, Xt, function() {
						return tn(e, t, r)
					}) : tn(e, t, r) : void 0
				},
				set: function(e, n, r) {
					return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && "border-box" === v.css(e, "boxSizing")) : 0)
				}
			}
		}), v.support.opacity || (v.cssHooks.opacity = {
			get: function(e, t) {
				return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
			},
			set: function(e, t) {
				var n = e.style,
					r = e.currentStyle,
					i = v.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
					s = r && r.filter || n.filter || "";
				n.zoom = 1, t >= 1 && "" === v.trim(s.replace(Bt, "")) && n.removeAttribute && (n.removeAttribute("filter"), r && !r.filter) || (n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i)
			}
		}), v(function() {
			v.support.reliableMarginRight || (v.cssHooks.marginRight = {
				get: function(e, t) {
					return v.swap(e, {
						display: "inline-block"
					}, function() {
						return t ? Dt(e, "marginRight") : void 0
					})
				}
			}), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function(e, t) {
				v.cssHooks[t] = {
					get: function(e, n) {
						if (n) {
							var r = Dt(e, t);
							return Ut.test(r) ? v(e).position()[t] + "px" : r
						}
					}
				}
			})
		}), v.expr && v.expr.filters && (v.expr.filters.hidden = function(e) {
			return 0 === e.offsetWidth && 0 === e.offsetHeight || !v.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || Dt(e, "display"))
		}, v.expr.filters.visible = function(e) {
			return !v.expr.filters.hidden(e)
		}), v.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(e, t) {
			v.cssHooks[e + t] = {
				expand: function(n) {
					var r, i = "string" == typeof n ? n.split(" ") : [n],
						s = {};
					for (r = 0; 4 > r; r++) s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
					return s
				}
			}, qt.test(e) || (v.cssHooks[e + t].set = Zt)
		});
		var rn = /%20/g,
			sn = /\[\]$/,
			on = /\r?\n/g,
			un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
			an = /^(?:select|textarea)/i;
		v.fn.extend({
			serialize: function() {
				return v.param(this.serializeArray())
			},
			serializeArray: function() {
				return this.map(function() {
					return this.elements ? v.makeArray(this.elements) : this
				}).filter(function() {
					return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
				}).map(function(e, t) {
					var n = v(this).val();
					return null == n ? null : v.isArray(n) ? v.map(n, function(e, n) {
						return {
							name: t.name,
							value: e.replace(on, "\r\n")
						}
					}) : {
						name: t.name,
						value: n.replace(on, "\r\n")
					}
				}).get()
			}
		}), v.param = function(e, n) {
			var r, i = [],
				s = function(e, t) {
					t = v.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
				};
			if (n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional), v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function() {
				s(this.name, this.value)
			});
			else for (r in e) fn(r, e[r], n, s);
			return i.join("&").replace(rn, "+")
		};
		var ln, cn, hn = /#.*$/,
			pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
			dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
			vn = /^(?:GET|HEAD)$/,
			mn = /^\/\//,
			gn = /\?/,
			yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			bn = /([?&])_=[^&]*/,
			wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
			En = v.fn.load,
			Sn = {},
			xn = {},
			Tn = ["*/"] + ["*"];
		try {
			cn = s.href
		} catch (Nn) {
			cn = i.createElement("a"), cn.href = "", cn = cn.href
		}
		ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function(e, n, r) {
			if ("string" != typeof e && En) return En.apply(this, arguments);
			if (!this.length) return this;
			var i, s, o, u = this,
				a = e.indexOf(" ");
			return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (s = "POST"), v.ajax({
				url: e,
				type: s,
				dataType: "html",
				data: n,
				complete: function(e, t) {
					r && u.each(r, o || [e.responseText, t, e])
				}
			}).done(function(e) {
				o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
			}), this
		}, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
			v.fn[t] = function(e) {
				return this.on(t, e)
			}
		}), v.each(["get", "post"], function(e, n) {
			v[n] = function(e, r, i, s) {
				return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({
					type: n,
					url: e,
					data: r,
					success: i,
					dataType: s
				})
			}
		}), v.extend({
			getScript: function(e, n) {
				return v.get(e, t, n, "script")
			},
			getJSON: function(e, t, n) {
				return v.get(e, t, n, "json")
			},
			ajaxSetup: function(e, t) {
				return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e
			},
			ajaxSettings: {
				url: cn,
				isLocal: dn.test(ln[1]),
				global: !0,
				type: "GET",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				processData: !0,
				async: !0,
				accepts: {
					xml: "application/xml, text/xml",
					html: "text/html",
					text: "text/plain",
					json: "application/json, text/javascript",
					"*": Tn
				},
				contents: {
					xml: /xml/,
					html: /html/,
					json: /json/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText"
				},
				converters: {
					"* text": e.String,
					"text html": !0,
					"text json": v.parseJSON,
					"text xml": v.parseXML
				},
				flatOptions: {
					context: !0,
					url: !0
				}
			},
			ajaxPrefilter: Cn(Sn),
			ajaxTransport: Cn(xn),
			ajax: function(e, n) {
				function T(e, n, s, a) {
					var l, y, b, w, S, T = n;
					2 !== E && (E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s)), e >= 200 && 300 > e || 304 === e ? (c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), 304 === e ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b)) : (b = T, (!T || e) && (T = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop")))
				}
				"object" == typeof e && (n = e, e = t), n = n || {};
				var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n),
					h = c.context || c,
					p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
					d = v.Deferred(),
					m = v.Callbacks("once memory"),
					g = c.statusCode || {},
					b = {},
					w = {},
					E = 0,
					S = "canceled",
					x = {
						readyState: 0,
						setRequestHeader: function(e, t) {
							if (!E) {
								var n = e.toLowerCase();
								e = w[n] = w[n] || e, b[e] = t
							}
							return this
						},
						getAllResponseHeaders: function() {
							return 2 === E ? i : null
						},
						getResponseHeader: function(e) {
							var n;
							if (2 === E) {
								if (!s) for (s = {}; n = pn.exec(i);) s[n[1].toLowerCase()] = n[2];
								n = s[e.toLowerCase()]
							}
							return n === t ? null : n
						},
						overrideMimeType: function(e) {
							return E || (c.mimeType = e), this
						},
						abort: function(e) {
							return e = e || S, o && o.abort(e), T(0, e), this
						}
					};
				if (d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function(e) {
					if (e) {
						var t;
						if (2 > E) for (t in e) g[t] = [g[t], e[t]];
						else t = e[x.status], x.always(t)
					}
					return this
				}, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), null == c.crossDomain && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || ("https:" === a[1] ? 80 : 443)) == (ln[3] || ("https:" === ln[1] ? 80 : 443)))), c.data && c.processData && "string" != typeof c.data && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x), 2 === E) return x;
				if (f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && 0 === v.active++ && v.event.trigger("ajaxStart"), !c.hasContent && (c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url, c.cache === !1)) {
					var N = v.now(),
						C = c.url.replace(bn, "$1_=" + N);
					c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
				}(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
				for (l in c.headers) x.setRequestHeader(l, c.headers[l]);
				if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && 2 !== E) {
					S = "abort";
					for (l in {
						success: 1,
						error: 1,
						complete: 1
					}) x[l](c[l]);
					if (o = kn(xn, c, n, x)) {
						x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function() {
							x.abort("timeout")
						}, c.timeout));
						try {
							E = 1, o.send(b, T)
						} catch (k) {
							if (!(2 > E)) throw k;
							T(-1, k)
						}
					} else T(-1, "No Transport");
					return x
				}
				return x.abort()
			},
			active: 0,
			lastModified: {},
			etag: {}
		});
		var Mn = [],
			_n = /\?/,
			Dn = /(=)\?(?=&|$)|\?\?/,
			Pn = v.now();
		v.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var e = Mn.pop() || v.expando + "_" + Pn++;
				return this[e] = !0, e
			}
		}), v.ajaxPrefilter("json jsonp", function(n, r, i) {
			var s, o, u, a = n.data,
				f = n.url,
				l = n.jsonp !== !1,
				c = l && Dn.test(f),
				h = l && !c && "string" == typeof a && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
			return "jsonp" === n.dataTypes[0] || c || h ? (s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function() {
				return u || v.error(s + " was not called"), u[0]
			}, n.dataTypes[0] = "json", e[s] = function() {
				u = arguments
			}, i.always(function() {
				e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t
			}), "script") : void 0
		}), v.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /javascript|ecmascript/
			},
			converters: {
				"text script": function(e) {
					return v.globalEval(e), e
				}
			}
		}), v.ajaxPrefilter("script", function(e) {
			e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
		}), v.ajaxTransport("script", function(e) {
			if (e.crossDomain) {
				var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
				return {
					send: function(s, o) {
						n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, i) {
							(i || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success"))
						}, r.insertBefore(n, r.firstChild)
					},
					abort: function() {
						n && n.onload(0, 1)
					}
				}
			}
		});
		var Hn, Bn = e.ActiveXObject ?
		function() {
			for (var e in Hn) Hn[e](0, 1);
		} : !1, jn = 0;
		v.ajaxSettings.xhr = e.ActiveXObject ?
		function() {
			return !this.isLocal && Fn() || In()
		} : Fn, function(e) {
			v.extend(v.support, {
				ajax: !! e,
				cors: !! e && "withCredentials" in e
			})
		}(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function(n) {
			if (!n.crossDomain || v.support.cors) {
				var r;
				return {
					send: function(i, s) {
						var o, u, a = n.xhr();
						if (n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async), n.xhrFields) for (u in n.xhrFields) a[u] = n.xhrFields[u];
						n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
						try {
							for (u in i) a.setRequestHeader(u, i[u])
						} catch (f) {}
						a.send(n.hasContent && n.data || null), r = function(e, i) {
							var u, f, l, c, h;
							try {
								if (r && (i || 4 === a.readyState)) if (r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]), i) 4 !== a.readyState && a.abort();
								else {
									u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);
									try {
										c.text = a.responseText
									} catch (p) {}
									try {
										f = a.statusText
									} catch (p) {
										f = ""
									}
									u || !n.isLocal || n.crossDomain ? 1223 === u && (u = 204) : u = c.text ? 200 : 404
								}
							} catch (d) {
								i || s(-1, d)
							}
							c && s(u, f, c, l)
						}, n.async ? 4 === a.readyState ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r()
					},
					abort: function() {
						r && r(0, 1)
					}
				}
			}
		});
		var qn, Rn, Un = /^(?:toggle|show|hide)$/,
			zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
			Wn = /queueHooks$/,
			Xn = [Gn],
			Vn = {
				"*": [function(e, t) {
					var n, r, i = this.createTween(e, t),
						s = zn.exec(t),
						o = i.cur(),
						u = +o || 0,
						a = 1,
						f = 20;
					if (s) {
						if (n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px"), "px" !== r && u) {
							u = v.css(i.elem, e, !0) || n || 1;
							do a = a || ".5", u /= a, v.style(i.elem, e, u + r);
							while (a !== (a = i.cur() / o) && 1 !== a && --f)
						}
						i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n
					}
					return i
				}]
			};
		v.Animation = v.extend(Kn, {
			tweener: function(e, t) {
				v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
				for (var n, r = 0, i = e.length; i > r; r++) n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t)
			},
			prefilter: function(e, t) {
				t ? Xn.unshift(e) : Xn.push(e)
			}
		}), v.Tween = Yn, Yn.prototype = {
			constructor: Yn,
			init: function(e, t, n, r, i, s) {
				this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px")
			},
			cur: function() {
				var e = Yn.propHooks[this.prop];
				return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
			},
			run: function(e) {
				var t, n = Yn.propHooks[this.prop];
				return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this
			}
		}, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {
			_default: {
				get: function(e) {
					var t;
					return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = v.css(e.elem, e.prop, !1, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
				},
				set: function(e) {
					v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[v.cssProps[e.prop]] || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
				}
			}
		}, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
			set: function(e) {
				e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
			}
		}, v.each(["toggle", "show", "hide"], function(e, t) {
			var n = v.fn[t];
			v.fn[t] = function(r, i, s) {
				return null == r || "boolean" == typeof r || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
			}
		}), v.fn.extend({
			fadeTo: function(e, t, n, r) {
				return this.filter(Gt).css("opacity", 0).show().end().animate({
					opacity: t
				}, e, n, r)
			},
			animate: function(e, t, n, r) {
				var i = v.isEmptyObject(e),
					s = v.speed(t, n, r),
					o = function() {
						var t = Kn(this, v.extend({}, e), s);
						i && t.stop(!0)
					};
				return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
			},
			stop: function(e, n, r) {
				var i = function(e) {
						var t = e.stop;
						delete e.stop, t(r)
					};
				return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
					var t = !0,
						n = null != e && e + "queueHooks",
						s = v.timers,
						o = v._data(this);
					if (n) o[n] && o[n].stop && i(o[n]);
					else for (n in o) o[n] && o[n].stop && Wn.test(n) && i(o[n]);
					for (n = s.length; n--;) s[n].elem === this && (null == e || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
					(t || !r) && v.dequeue(this, e)
				})
			}
		}), v.each({
			slideDown: Zn("show"),
			slideUp: Zn("hide"),
			slideToggle: Zn("toggle"),
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
			v.fn[e] = function(e, n, r) {
				return this.animate(t, e, n, r)
			}
		}), v.speed = function(e, t, n) {
			var r = e && "object" == typeof e ? v.extend({}, e) : {
				complete: n || !n && t || v.isFunction(e) && e,
				duration: e,
				easing: n && t || t && !v.isFunction(t) && t
			};
			return r.duration = v.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
				v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue)
			}, r
		}, v.easing = {
			linear: function(e) {
				return e
			},
			swing: function(e) {
				return .5 - Math.cos(e * Math.PI) / 2
			}
		}, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function() {
			var e, n = v.timers,
				r = 0;
			for (qn = v.now(); r < n.length; r++) e = n[r], !e() && n[r] === e && n.splice(r--, 1);
			n.length || v.fx.stop(), qn = t
		}, v.fx.timer = function(e) {
			e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
		}, v.fx.interval = 13, v.fx.stop = function() {
			clearInterval(Rn), Rn = null
		}, v.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function(e) {
			return v.grep(v.timers, function(t) {
				return e === t.elem
			}).length
		});
		var er = /^(?:body|html)$/i;
		v.fn.offset = function(e) {
			if (arguments.length) return e === t ? this : this.each(function(t) {
				v.offset.setOffset(this, e, t)
			});
			var n, r, i, s, o, u, a, f = {
				top: 0,
				left: 0
			},
				l = this[0],
				c = l && l.ownerDocument;
			if (c) return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? ("undefined" != typeof l.getBoundingClientRect && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
				top: f.top + u - s,
				left: f.left + a - o
			}) : f)
		}, v.offset = {
			bodyOffset: function(e) {
				var t = e.offsetTop,
					n = e.offsetLeft;
				return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), {
					top: t,
					left: n
				}
			},
			setOffset: function(e, t, n) {
				var r = v.css(e, "position");
				"static" === r && (e.style.position = "relative");
				var c, h, i = v(e),
					s = i.offset(),
					o = v.css(e, "top"),
					u = v.css(e, "left"),
					a = ("absolute" === r || "fixed" === r) && v.inArray("auto", [o, u]) > -1,
					f = {},
					l = {};
				a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + c), null != t.left && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f)
			}
		}, v.fn.extend({
			position: function() {
				if (this[0]) {
					var e = this[0],
						t = this.offsetParent(),
						n = this.offset(),
						r = er.test(t[0].nodeName) ? {
							top: 0,
							left: 0
						} : t.offset();
					return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {
						top: n.top - r.top,
						left: n.left - r.left
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var e = this.offsetParent || i.body; e && !er.test(e.nodeName) && "static" === v.css(e, "position");) e = e.offsetParent;
					return e || i.body
				})
			}
		}), v.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(e, n) {
			var r = /Y/.test(n);
			v.fn[e] = function(i) {
				return v.access(this, function(e, i, s) {
					var o = tr(e);
					return s === t ? o ? n in o ? o[n] : o.document.documentElement[i] : e[i] : void(o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s)
				}, e, i, arguments.length, null)
			}
		}), v.each({
			Height: "height",
			Width: "width"
		}, function(e, n) {
			v.each({
				padding: "inner" + e,
				content: n,
				"": "outer" + e
			}, function(r, i) {
				v.fn[i] = function(i, s) {
					var o = arguments.length && (r || "boolean" != typeof i),
						u = r || (i === !0 || s === !0 ? "margin" : "border");
					return v.access(this, function(n, r, i) {
						var s;
						return v.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
					}, n, o ? i : t, o, null)
				}
			})
		}), e.jQuery = e.$ = v, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
			return v
		})
	}(window), g_win.jQuery)
}), "object" != typeof JSON && (JSON = {}), function() {
	"use strict";

	function f(n) {
		return 10 > n ? "0" + n : n
	}
	function quote(string) {
		return escapable.lastIndex = 0, escapable.test(string) ? '"' + string.replace(escapable, function(a) {
			var c = meta[a];
			return "string" == typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + string + '"'
	}
	function str(key, holder) {
		var i, k, v, length, partial, mind = gap,
			value = holder[key];
		switch (value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), "function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
		case "string":
			return quote(value);
		case "number":
			return isFinite(value) ? String(value) : "null";
		case "boolean":
		case "null":
			return String(value);
		case "object":
			if (!value) return "null";
			if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
				for (length = value.length, i = 0; length > i; i += 1) partial[i] = str(i, value) || "null";
				return v = 0 === partial.length ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]", gap = mind, v
			}
			if (rep && "object" == typeof rep) for (length = rep.length, i = 0; length > i; i += 1)"string" == typeof rep[i] && (k = rep[i], v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
			else for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
			return v = 0 === partial.length ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}", gap = mind, v
		}
	}
	"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	});
	var cx, escapable, gap, indent, meta, rep;
	"function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
		"\b": "\\b",
		"	": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		'"': '\\"',
		"\\": "\\\\"
	}, JSON.stringify = function(value, replacer, space) {
		var i;
		if (gap = "", indent = "", "number" == typeof space) for (i = 0; space > i; i += 1) indent += " ";
		else "string" == typeof space && (indent = space);
		if (rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw new Error("JSON.stringify");
		return str("", {
			"": value
		})
	}), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
		function walk(holder, key) {
			var k, v, value = holder[key];
			if (value && "object" == typeof value) for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), void 0 !== v ? value[k] = v : delete value[k]);
			return reviver.call(holder, key, value)
		}
		var j;
		if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
			return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
			"": j
		}, "") : j;
		throw new SyntaxError("JSON.parse")
	})
}(), qcVideo("JSON", function() {
	return JSON
}), function(factory) {
	if ("object" == typeof exports) module.exports = factory();
	else if ("function" == typeof define && define.amd) define(factory);
	else {
		var glob;
		try {
			glob = window
		} catch (e) {
			glob = self
		}
		glob.SparkMD5 = factory()
	}
}(function(undefined) {
	"use strict";

	function cmn(q, a, b, x, s, t) {
		return a = add32(add32(a, q), add32(x, t)), add32(a << s | a >>> 32 - s, b)
	}
	function ff(a, b, c, d, x, s, t) {
		return cmn(b & c | ~b & d, a, b, x, s, t)
	}
	function gg(a, b, c, d, x, s, t) {
		return cmn(b & d | c & ~d, a, b, x, s, t)
	}
	function hh(a, b, c, d, x, s, t) {
		return cmn(b ^ c ^ d, a, b, x, s, t)
	}
	function ii(a, b, c, d, x, s, t) {
		return cmn(c ^ (b | ~d), a, b, x, s, t)
	}
	function md5cycle(x, k) {
		var a = x[0],
			b = x[1],
			c = x[2],
			d = x[3];
		a = ff(a, b, c, d, k[0], 7, -680876936), d = ff(d, a, b, c, k[1], 12, -389564586), c = ff(c, d, a, b, k[2], 17, 606105819), b = ff(b, c, d, a, k[3], 22, -1044525330), a = ff(a, b, c, d, k[4], 7, -176418897), d = ff(d, a, b, c, k[5], 12, 1200080426), c = ff(c, d, a, b, k[6], 17, -1473231341), b = ff(b, c, d, a, k[7], 22, -45705983), a = ff(a, b, c, d, k[8], 7, 1770035416), d = ff(d, a, b, c, k[9], 12, -1958414417), c = ff(c, d, a, b, k[10], 17, -42063), b = ff(b, c, d, a, k[11], 22, -1990404162), a = ff(a, b, c, d, k[12], 7, 1804603682), d = ff(d, a, b, c, k[13], 12, -40341101), c = ff(c, d, a, b, k[14], 17, -1502002290), b = ff(b, c, d, a, k[15], 22, 1236535329), a = gg(a, b, c, d, k[1], 5, -165796510), d = gg(d, a, b, c, k[6], 9, -1069501632), c = gg(c, d, a, b, k[11], 14, 643717713), b = gg(b, c, d, a, k[0], 20, -373897302), a = gg(a, b, c, d, k[5], 5, -701558691), d = gg(d, a, b, c, k[10], 9, 38016083), c = gg(c, d, a, b, k[15], 14, -660478335), b = gg(b, c, d, a, k[4], 20, -405537848), a = gg(a, b, c, d, k[9], 5, 568446438), d = gg(d, a, b, c, k[14], 9, -1019803690), c = gg(c, d, a, b, k[3], 14, -187363961), b = gg(b, c, d, a, k[8], 20, 1163531501), a = gg(a, b, c, d, k[13], 5, -1444681467), d = gg(d, a, b, c, k[2], 9, -51403784), c = gg(c, d, a, b, k[7], 14, 1735328473), b = gg(b, c, d, a, k[12], 20, -1926607734), a = hh(a, b, c, d, k[5], 4, -378558), d = hh(d, a, b, c, k[8], 11, -2022574463), c = hh(c, d, a, b, k[11], 16, 1839030562), b = hh(b, c, d, a, k[14], 23, -35309556), a = hh(a, b, c, d, k[1], 4, -1530992060), d = hh(d, a, b, c, k[4], 11, 1272893353), c = hh(c, d, a, b, k[7], 16, -155497632), b = hh(b, c, d, a, k[10], 23, -1094730640), a = hh(a, b, c, d, k[13], 4, 681279174), d = hh(d, a, b, c, k[0], 11, -358537222), c = hh(c, d, a, b, k[3], 16, -722521979), b = hh(b, c, d, a, k[6], 23, 76029189), a = hh(a, b, c, d, k[9], 4, -640364487), d = hh(d, a, b, c, k[12], 11, -421815835), c = hh(c, d, a, b, k[15], 16, 530742520), b = hh(b, c, d, a, k[2], 23, -995338651), a = ii(a, b, c, d, k[0], 6, -198630844), d = ii(d, a, b, c, k[7], 10, 1126891415), c = ii(c, d, a, b, k[14], 15, -1416354905), b = ii(b, c, d, a, k[5], 21, -57434055), a = ii(a, b, c, d, k[12], 6, 1700485571), d = ii(d, a, b, c, k[3], 10, -1894986606), c = ii(c, d, a, b, k[10], 15, -1051523), b = ii(b, c, d, a, k[1], 21, -2054922799), a = ii(a, b, c, d, k[8], 6, 1873313359), d = ii(d, a, b, c, k[15], 10, -30611744), c = ii(c, d, a, b, k[6], 15, -1560198380), b = ii(b, c, d, a, k[13], 21, 1309151649), a = ii(a, b, c, d, k[4], 6, -145523070), d = ii(d, a, b, c, k[11], 10, -1120210379), c = ii(c, d, a, b, k[2], 15, 718787259), b = ii(b, c, d, a, k[9], 21, -343485551), x[0] = add32(a, x[0]), x[1] = add32(b, x[1]), x[2] = add32(c, x[2]), x[3] = add32(d, x[3])
	}
	function md5blk(s) {
		var i, md5blks = [];
		for (i = 0; 64 > i; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
		return md5blks
	}
	function md5blk_array(a) {
		var i, md5blks = [];
		for (i = 0; 64 > i; i += 4) md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
		return md5blks
	}
	function md51(s) {
		var i, length, tail, tmp, lo, hi, n = s.length,
			state = [1732584193, -271733879, -1732584194, 271733878];
		for (i = 64; n >= i; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)));
		for (s = s.substring(i - 64), length = s.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i = 0; length > i; i += 1) tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
		if (tail[i >> 2] |= 128 << (i % 4 << 3), i > 55) for (md5cycle(state, tail), i = 0; 16 > i; i += 1) tail[i] = 0;
		return tmp = 8 * n, tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/), lo = parseInt(tmp[2], 16), hi = parseInt(tmp[1], 16) || 0, tail[14] = lo, tail[15] = hi, md5cycle(state, tail), state
	}
	function md51_array(a) {
		var i, length, tail, tmp, lo, hi, n = a.length,
			state = [1732584193, -271733879, -1732584194, 271733878];
		for (i = 64; n >= i; i += 64) md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
		for (a = n > i - 64 ? a.subarray(i - 64) : new Uint8Array(0), length = a.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i = 0; length > i; i += 1) tail[i >> 2] |= a[i] << (i % 4 << 3);
		if (tail[i >> 2] |= 128 << (i % 4 << 3), i > 55) for (md5cycle(state, tail), i = 0; 16 > i; i += 1) tail[i] = 0;
		return tmp = 8 * n, tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/), lo = parseInt(tmp[2], 16), hi = parseInt(tmp[1], 16) || 0, tail[14] = lo, tail[15] = hi, md5cycle(state, tail), state
	}
	function rhex(n) {
		var j, s = "";
		for (j = 0; 4 > j; j += 1) s += hex_chr[n >> 8 * j + 4 & 15] + hex_chr[n >> 8 * j & 15];
		return s
	}
	function hex(x) {
		var i;
		for (i = 0; i < x.length; i += 1) x[i] = rhex(x[i]);
		return x.join("")
	}
	function toUtf8(str) {
		return /[\u0080-\uFFFF]/.test(str) && (str = unescape(encodeURIComponent(str))), str
	}
	function utf8Str2ArrayBuffer(str, returnUInt8Array) {
		var i, length = str.length,
			buff = new ArrayBuffer(length),
			arr = new Uint8Array(buff);
		for (i = 0; length > i; i += 1) arr[i] = str.charCodeAt(i);
		return returnUInt8Array ? arr : buff
	}
	function arrayBuffer2Utf8Str(buff) {
		return String.fromCharCode.apply(null, new Uint8Array(buff))
	}
	function concatenateArrayBuffers(first, second, returnUInt8Array) {
		var result = new Uint8Array(first.byteLength + second.byteLength);
		return result.set(new Uint8Array(first)), result.set(new Uint8Array(second), first.byteLength), returnUInt8Array ? result : result.buffer
	}
	function hexToBinaryString(hex) {
		var x, bytes = [],
			length = hex.length;
		for (x = 0; length - 1 > x; x += 2) bytes.push(parseInt(hex.substr(x, 2), 16));
		return String.fromCharCode.apply(String, bytes)
	}
	function SparkMD5() {
		this.reset()
	}
	var add32 = function(a, b) {
			return a + b & 4294967295
		},
		hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	return "5d41402abc4b2a76b9719d911017c592" !== hex(md51("hello")) && (add32 = function(x, y) {
		var lsw = (65535 & x) + (65535 & y),
			msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | 65535 & lsw
	}), "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || !
	function() {
		function clamp(val, length) {
			return val = 0 | val || 0, 0 > val ? Math.max(val + length, 0) : Math.min(val, length)
		}
		ArrayBuffer.prototype.slice = function(from, to) {
			var num, target, targetArray, sourceArray, length = this.byteLength,
				begin = clamp(from, length),
				end = length;
			return to !== undefined && (end = clamp(to, length)), begin > end ? new ArrayBuffer(0) : (num = end - begin, target = new ArrayBuffer(num), targetArray = new Uint8Array(target), sourceArray = new Uint8Array(this, begin, num), targetArray.set(sourceArray), target)
		}
	}(), SparkMD5.prototype.append = function(str) {
		return this.appendBinary(toUtf8(str)), this
	}, SparkMD5.prototype.appendBinary = function(contents) {
		this._buff += contents, this._length += contents.length;
		var i, length = this._buff.length;
		for (i = 64; length >= i; i += 64) md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
		return this._buff = this._buff.substring(i - 64), this
	}, SparkMD5.prototype.end = function(raw) {
		var i, ret, buff = this._buff,
			length = buff.length,
			tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (i = 0; length > i; i += 1) tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
		return this._finish(tail, length), ret = hex(this._hash), raw && (ret = hexToBinaryString(ret)), this.reset(), ret
	}, SparkMD5.prototype.reset = function() {
		return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
	}, SparkMD5.prototype.getState = function() {
		return {
			buff: this._buff,
			length: this._length,
			hash: this._hash
		}
	}, SparkMD5.prototype.setState = function(state) {
		return this._buff = state.buff, this._length = state.length, this._hash = state.hash, this
	}, SparkMD5.prototype.destroy = function() {
		delete this._hash, delete this._buff, delete this._length
	}, SparkMD5.prototype._finish = function(tail, length) {
		var tmp, lo, hi, i = length;
		if (tail[i >> 2] |= 128 << (i % 4 << 3), i > 55) for (md5cycle(this._hash, tail), i = 0; 16 > i; i += 1) tail[i] = 0;
		tmp = 8 * this._length, tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/), lo = parseInt(tmp[2], 16), hi = parseInt(tmp[1], 16) || 0, tail[14] = lo, tail[15] = hi, md5cycle(this._hash, tail)
	}, SparkMD5.hash = function(str, raw) {
		return SparkMD5.hashBinary(toUtf8(str), raw)
	}, SparkMD5.hashBinary = function(content, raw) {
		var hash = md51(content),
			ret = hex(hash);
		return raw ? hexToBinaryString(ret) : ret
	}, SparkMD5.ArrayBuffer = function() {
		this.reset()
	}, SparkMD5.ArrayBuffer.prototype.append = function(arr) {
		var i, buff = concatenateArrayBuffers(this._buff.buffer, arr, !0),
			length = buff.length;
		for (this._length += arr.byteLength, i = 64; length >= i; i += 64) md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
		return this._buff = length > i - 64 ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0), this
	}, SparkMD5.ArrayBuffer.prototype.end = function(raw) {
		var i, ret, buff = this._buff,
			length = buff.length,
			tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (i = 0; length > i; i += 1) tail[i >> 2] |= buff[i] << (i % 4 << 3);
		return this._finish(tail, length), ret = hex(this._hash), raw && (ret = hexToBinaryString(ret)), this.reset(), ret
	}, SparkMD5.ArrayBuffer.prototype.reset = function() {
		return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
	}, SparkMD5.ArrayBuffer.prototype.getState = function() {
		var state = SparkMD5.prototype.getState.call(this);
		return state.buff = arrayBuffer2Utf8Str(state.buff), state
	}, SparkMD5.ArrayBuffer.prototype.setState = function(state) {
		return state.buff = utf8Str2ArrayBuffer(state.buff, !0), SparkMD5.prototype.setState.call(this, state)
	}, SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy, SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish, SparkMD5.ArrayBuffer.hash = function(arr, raw) {
		var hash = md51_array(new Uint8Array(arr)),
			ret = hex(hash);
		return raw ? hexToBinaryString(ret) : ret
	}, SparkMD5
});
var MXI_DEBUG = !0;
!
function(exports, undefined) {
	"use strict";

	function require(ids, callback) {
		for (var module, defs = [], i = 0; i < ids.length; ++i) {
			if (module = modules[ids[i]] || resolve(ids[i]), !module) throw "module definition dependecy not found: " + ids[i];
			defs.push(module)
		}
		callback.apply(null, defs)
	}
	function define(id, dependencies, definition) {
		if ("string" != typeof id) throw "invalid module definition, module id must be defined and be a string";
		if (dependencies === undefined) throw "invalid module definition, dependencies must be specified";
		if (definition === undefined) throw "invalid module definition, definition function must be specified";
		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments)
		})
	}
	function resolve(id) {
		for (var target = exports, fragments = id.split(/[.\/]/), fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) return;
			target = target[fragments[fi]]
		}
		return target
	}
	function expose(ids) {
		for (var i = 0; i < ids.length; i++) {
			for (var target = exports, id = ids[i], fragments = id.split(/[.\/]/), fi = 0; fi < fragments.length - 1; ++fi) target[fragments[fi]] === undefined && (target[fragments[fi]] = {}), target = target[fragments[fi]];
			target[fragments[fragments.length - 1]] = modules[id]
		}
	}
	var modules = {};
	define("moxie/core/utils/Basic", [], function() {
		var typeOf = function(o) {
				var undef;
				return o === undef ? "undefined" : null === o ? "null" : o.nodeType ? "node" : {}.toString.call(o).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
			},
			extend = function(target) {
				var undef;
				return each(arguments, function(arg, i) {
					i > 0 && each(arg, function(value, key) {
						value !== undef && (typeOf(target[key]) === typeOf(value) && ~inArray(typeOf(value), ["array", "object"]) ? extend(target[key], value) : target[key] = value)
					})
				}), target
			},
			each = function(obj, callback) {
				var length, key, i;
				if (obj) if ("number" === typeOf(obj.length)) {
					for (i = 0, length = obj.length; length > i; i++) if (callback(obj[i], i) === !1) return
				} else if ("object" === typeOf(obj)) for (key in obj) if (obj.hasOwnProperty(key) && callback(obj[key], key) === !1) return
			},
			isEmptyObj = function(obj) {
				var prop;
				if (!obj || "object" !== typeOf(obj)) return !0;
				for (prop in obj) return !1;
				return !0
			},
			inSeries = function(queue, cb) {
				function callNext(i) {
					"function" === typeOf(queue[i]) && queue[i](function(error) {
						++i < length && !error ? callNext(i) : cb(error)
					})
				}
				var i = 0,
					length = queue.length;
				"function" !== typeOf(cb) && (cb = function() {}), queue && queue.length || cb(), callNext(i)
			},
			inParallel = function(queue, cb) {
				var count = 0,
					num = queue.length,
					cbArgs = new Array(num);
				each(queue, function(fn, i) {
					fn(function(error) {
						if (error) return cb(error);
						var args = [].slice.call(arguments);
						args.shift(), cbArgs[i] = args, count++, count === num && (cbArgs.unshift(null), cb.apply(this, cbArgs))
					})
				})
			},
			inArray = function(needle, array) {
				if (array) {
					if (Array.prototype.indexOf) return Array.prototype.indexOf.call(array, needle);
					for (var i = 0, length = array.length; length > i; i++) if (array[i] === needle) return i
				}
				return -1
			},
			arrayDiff = function(needles, array) {
				var diff = [];
				"array" !== typeOf(needles) && (needles = [needles]), "array" !== typeOf(array) && (array = [array]);
				for (var i in needles) - 1 === inArray(needles[i], array) && diff.push(needles[i]);
				return diff.length ? diff : !1
			},
			arrayIntersect = function(array1, array2) {
				var result = [];
				return each(array1, function(item) {
					-1 !== inArray(item, array2) && result.push(item)
				}), result.length ? result : null
			},
			toArray = function(obj) {
				var i, arr = [];
				for (i = 0; i < obj.length; i++) arr[i] = obj[i];
				return arr
			},
			guid = function() {
				var counter = 0;
				return function(prefix) {
					var i, guid = (new Date).getTime().toString(32);
					for (i = 0; 5 > i; i++) guid += Math.floor(65535 * Math.random()).toString(32);
					return (prefix || "o_") + guid + (counter++).toString(32)
				}
			}(),
			trim = function(str) {
				return str ? String.prototype.trim ? String.prototype.trim.call(str) : str.toString().replace(/^\s*/, "").replace(/\s*$/, "") : str
			},
			parseSizeStr = function(size) {
				if ("string" != typeof size) return size;
				var mul, muls = {
					t: 1099511627776,
					g: 1073741824,
					m: 1048576,
					k: 1024
				};
				return size = /^([0-9\.]+)([tmgk]?)$/.exec(size.toLowerCase().replace(/[^0-9\.tmkg]/g, "")), mul = size[2], size = +size[1], muls.hasOwnProperty(mul) && (size *= muls[mul]), Math.floor(size)
			},
			sprintf = function(str) {
				var args = [].slice.call(arguments, 1);
				return str.replace(/%[a-z]/g, function() {
					var value = args.shift();
					return "undefined" !== typeOf(value) ? value : ""
				})
			};
		return {
			guid: guid,
			typeOf: typeOf,
			extend: extend,
			each: each,
			isEmptyObj: isEmptyObj,
			inSeries: inSeries,
			inParallel: inParallel,
			inArray: inArray,
			arrayDiff: arrayDiff,
			arrayIntersect: arrayIntersect,
			toArray: toArray,
			trim: trim,
			sprintf: sprintf,
			parseSizeStr: parseSizeStr
		}
	}), define("moxie/core/utils/Env", ["moxie/core/utils/Basic"], function(Basic) {
		function version_compare(v1, v2, operator) {
			var i = 0,
				x = 0,
				compare = 0,
				vm = {
					dev: -6,
					alpha: -5,
					a: -5,
					beta: -4,
					b: -4,
					RC: -3,
					rc: -3,
					"#": -2,
					p: 1,
					pl: 1
				},
				prepVersion = function(v) {
					return v = ("" + v).replace(/[_\-+]/g, "."), v = v.replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, "."), v.length ? v.split(".") : [-8]
				},
				numVersion = function(v) {
					return v ? isNaN(v) ? vm[v] || -7 : parseInt(v, 10) : 0
				};
			for (v1 = prepVersion(v1), v2 = prepVersion(v2), x = Math.max(v1.length, v2.length), i = 0; x > i; i++) if (v1[i] != v2[i]) {
				if (v1[i] = numVersion(v1[i]), v2[i] = numVersion(v2[i]), v1[i] < v2[i]) {
					compare = -1;
					break
				}
				if (v1[i] > v2[i]) {
					compare = 1;
					break
				}
			}
			if (!operator) return compare;
			switch (operator) {
			case ">":
			case "gt":
				return compare > 0;
			case ">=":
			case "ge":
				return compare >= 0;
			case "<=":
			case "le":
				return 0 >= compare;
			case "==":
			case "=":
			case "eq":
				return 0 === compare;
			case "<>":
			case "!=":
			case "ne":
				return 0 !== compare;
			case "":
			case "<":
			case "lt":
				return 0 > compare;
			default:
				return null
			}
		}
		var UAParser = function(undefined) {
				var EMPTY = "",
					UNKNOWN = "?",
					FUNC_TYPE = "function",
					UNDEF_TYPE = "undefined",
					OBJ_TYPE = "object",
					NAME = "name",
					VERSION = "version",
					util = {
						has: function(str1, str2) {
							return -1 !== str2.toLowerCase().indexOf(str1.toLowerCase())
						},
						lowerize: function(str) {
							return str.toLowerCase()
						}
					},
					mapper = {
						rgx: function() {
							for (var result, j, k, p, q, matches, match, i = 0, args = arguments; i < args.length; i += 2) {
								var regex = args[i],
									props = args[i + 1];
								if (typeof result === UNDEF_TYPE) {
									result = {};
									for (p in props) q = props[p], typeof q === OBJ_TYPE ? result[q[0]] = undefined : result[q] = undefined
								}
								for (j = k = 0; j < regex.length; j++) if (matches = regex[j].exec(this.getUA())) {
									for (p = 0; p < props.length; p++) match = matches[++k], q = props[p], typeof q === OBJ_TYPE && q.length > 0 ? 2 == q.length ? typeof q[1] == FUNC_TYPE ? result[q[0]] = q[1].call(this, match) : result[q[0]] = q[1] : 3 == q.length ? typeof q[1] !== FUNC_TYPE || q[1].exec && q[1].test ? result[q[0]] = match ? match.replace(q[1], q[2]) : undefined : result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined : 4 == q.length && (result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined) : result[q] = match ? match : undefined;
									break
								}
								if (matches) break
							}
							return result
						},
						str: function(str, map) {
							for (var i in map) if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
								for (var j = 0; j < map[i].length; j++) if (util.has(map[i][j], str)) return i === UNKNOWN ? undefined : i
							} else if (util.has(map[i], str)) return i === UNKNOWN ? undefined : i;
							return str
						}
					},
					maps = {
						browser: {
							oldsafari: {
								major: {
									1: ["/8", "/1", "/3"],
									2: "/4",
									"?": "/"
								},
								version: {
									"1.0": "/8",
									1.2: "/1",
									1.3: "/3",
									"2.0": "/412",
									"2.0.2": "/416",
									"2.0.3": "/417",
									"2.0.4": "/419",
									"?": "/"
								}
							}
						},
						device: {
							sprint: {
								model: {
									"Evo Shift 4G": "7373KT"
								},
								vendor: {
									HTC: "APA",
									Sprint: "Sprint"
								}
							}
						},
						os: {
							windows: {
								version: {
									ME: "4.90",
									"NT 3.11": "NT3.51",
									"NT 4.0": "NT4.0",
									2000: "NT 5.0",
									XP: ["NT 5.1", "NT 5.2"],
									Vista: "NT 6.0",
									7: "NT 6.1",
									8: "NT 6.2",
									8.1: "NT 6.3",
									RT: "ARM"
								}
							}
						}
					},
					regexes = {
						browser: [
							[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
							[NAME, VERSION],
							[/\s(opr)\/([\w\.]+)/i],
							[
								[NAME, "Opera"], VERSION],
							[/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i],
							[NAME, VERSION],
							[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
							[
								[NAME, "IE"], VERSION],
							[/(edge)\/((\d+)?[\w\.]+)/i],
							[NAME, VERSION],
							[/(yabrowser)\/([\w\.]+)/i],
							[
								[NAME, "Yandex"], VERSION],
							[/(comodo_dragon)\/([\w\.]+)/i],
							[
								[NAME, /_/g, " "], VERSION],
							[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],
							[NAME, VERSION],
							[/(dolfin)\/([\w\.]+)/i],
							[
								[NAME, "Dolphin"], VERSION],
							[/((?:android.+)crmo|crios)\/([\w\.]+)/i],
							[
								[NAME, "Chrome"], VERSION],
							[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
							[VERSION, [NAME, "MIUI Browser"]],
							[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
							[VERSION, [NAME, "Android Browser"]],
							[/FBAV\/([\w\.]+);/i],
							[VERSION, [NAME, "Facebook"]],
							[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
							[VERSION, [NAME, "Mobile Safari"]],
							[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
							[VERSION, NAME],
							[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
							[NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]],
							[/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
							[NAME, VERSION],
							[/(navigator|netscape)\/([\w\.-]+)/i],
							[
								[NAME, "Netscape"], VERSION],
							[/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
							[NAME, VERSION]
						],
						engine: [
							[/windows.+\sedge\/([\w\.]+)/i],
							[VERSION, [NAME, "EdgeHTML"]],
							[/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
							[NAME, VERSION],
							[/rv\:([\w\.]+).*(gecko)/i],
							[VERSION, NAME]
						],
						os: [
							[/microsoft\s(windows)\s(vista|xp)/i],
							[NAME, VERSION],
							[/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
							[NAME, [VERSION, mapper.str, maps.os.windows.version]],
							[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
							[
								[NAME, "Windows"],
								[VERSION, mapper.str, maps.os.windows.version]
							],
							[/\((bb)(10);/i],
							[
								[NAME, "BlackBerry"], VERSION],
							[/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i],
							[NAME, VERSION],
							[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
							[
								[NAME, "Symbian"], VERSION],
							[/\((series40);/i],
							[NAME],
							[/mozilla.+\(mobile;.+gecko.+firefox/i],
							[
								[NAME, "Firefox OS"], VERSION],
							[/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i],
							[NAME, VERSION],
							[/(cros)\s[\w]+\s([\w\.]+\w)/i],
							[
								[NAME, "Chromium OS"], VERSION],
							[/(sunos)\s?([\w\.]+\d)*/i],
							[
								[NAME, "Solaris"], VERSION],
							[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
							[NAME, VERSION],
							[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],
							[
								[NAME, "iOS"],
								[VERSION, /_/g, "."]
							],
							[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
							[
								[NAME, "Mac OS"],
								[VERSION, /_/g, "."]
							],
							[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i],
							[NAME, VERSION]
						]
					},
					UAParser = function(uastring) {
						var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
						this.getBrowser = function() {
							return mapper.rgx.apply(this, regexes.browser)
						}, this.getEngine = function() {
							return mapper.rgx.apply(this, regexes.engine)
						}, this.getOS = function() {
							return mapper.rgx.apply(this, regexes.os);
						}, this.getResult = function() {
							return {
								ua: this.getUA(),
								browser: this.getBrowser(),
								engine: this.getEngine(),
								os: this.getOS()
							}
						}, this.getUA = function() {
							return ua
						}, this.setUA = function(uastring) {
							return ua = uastring, this
						}, this.setUA(ua)
					};
				return UAParser
			}(),
			can = function() {
				var caps = {
					define_property: function() {
						return !1
					}(),
					create_canvas: function() {
						var el = document.createElement("canvas");
						return !(!el.getContext || !el.getContext("2d"))
					}(),
					return_response_type: function(responseType) {
						try {
							if (-1 !== Basic.inArray(responseType, ["", "text", "document"])) return !0;
							if (window.XMLHttpRequest) {
								var xhr = new XMLHttpRequest;
								if (xhr.open("get", "/"), "responseType" in xhr) return xhr.responseType = responseType, xhr.responseType !== responseType ? !1 : !0
							}
						} catch (ex) {}
						return !1
					},
					use_data_uri: function() {
						var du = new Image;
						return du.onload = function() {
							caps.use_data_uri = 1 === du.width && 1 === du.height
						}, setTimeout(function() {
							du.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
						}, 1), !1
					}(),
					use_data_uri_over32kb: function() {
						return caps.use_data_uri && ("IE" !== Env.browser || Env.version >= 9)
					},
					use_data_uri_of: function(bytes) {
						return caps.use_data_uri && 33e3 > bytes || caps.use_data_uri_over32kb()
					},
					use_fileinput: function() {
						if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) return !1;
						var el = document.createElement("input");
						return el.setAttribute("type", "file"), !el.disabled
					}
				};
				return function(cap) {
					var args = [].slice.call(arguments);
					return args.shift(), "function" === Basic.typeOf(caps[cap]) ? caps[cap].apply(this, args) : !! caps[cap]
				}
			}(),
			uaResult = (new UAParser).getResult(),
			Env = {
				can: can,
				uaParser: UAParser,
				browser: uaResult.browser.name,
				version: uaResult.browser.version,
				os: uaResult.os.name,
				osVersion: uaResult.os.version,
				verComp: version_compare,
				swf_url: "../flash/Moxie.swf",
				xap_url: "../silverlight/Moxie.xap",
				global_event_dispatcher: "moxie.core.EventTarget.instance.dispatchEvent"
			};
			console.log(Env);
		return Env.OS = Env.os, MXI_DEBUG && (Env.debug = {
			runtime: !0,
			events: !1
		}, Env.log = function() {
			function logObj(data) {
				console.appendChild(document.createTextNode(data + "\n"))
			}
			var data = arguments[0];
			if ("string" === Basic.typeOf(data) && (data = Basic.sprintf.apply(this, arguments)), window && window.console && window.console.log) window.console.log(data);
			else if (document) {
				var console = document.getElementById("moxie-console");
				console || (console = document.createElement("pre"), console.id = "moxie-console", document.body.appendChild(console)), -1 !== Basic.inArray(Basic.typeOf(data), ["object", "array"]) ? logObj(data) : console.appendChild(document.createTextNode(data + "\n"))
			}
		}), Env
	}), define("moxie/core/I18n", ["moxie/core/utils/Basic"], function(Basic) {
		var i18n = {};
		return {
			addI18n: function(pack) {
				return Basic.extend(i18n, pack)
			},
			translate: function(str) {
				return i18n[str] || str
			},
			_: function(str) {
				return this.translate(str)
			},
			sprintf: function(str) {
				var args = [].slice.call(arguments, 1);
				return str.replace(/%[a-z]/g, function() {
					var value = args.shift();
					return "undefined" !== Basic.typeOf(value) ? value : ""
				})
			}
		}
	}), define("moxie/core/utils/Mime", ["moxie/core/utils/Basic", "moxie/core/I18n"], function(Basic, I18n) {
		var mimeData = "application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mp3 mpga mpega mp2,audio/x-wav,wav,audio/x-m4a,m4a,audio/ogg,oga ogg,audio/aiff,aiff aif,audio/flac,flac,audio/aac,aac,audio/ac3,ac3,audio/x-ms-wma,wma,image/bmp,bmp,image/gif,gif,image/jpeg,jpg jpeg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gpp 3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,video/ogg,ogv,video/x-matroska,mkv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe",
			Mime = {
				mimes: {},
				extensions: {},
				addMimeType: function(mimeData) {
					var i, ii, ext, items = mimeData.split(/,/);
					for (i = 0; i < items.length; i += 2) {
						for (ext = items[i + 1].split(/ /), ii = 0; ii < ext.length; ii++) this.mimes[ext[ii]] = items[i];
						this.extensions[items[i]] = ext
					}
				},
				extList2mimes: function(filters, addMissingExtensions) {
					var ext, i, ii, type, self = this,
						mimes = [];
					for (i = 0; i < filters.length; i++) for (ext = filters[i].extensions.split(/\s*,\s*/), ii = 0; ii < ext.length; ii++) {
						if ("*" === ext[ii]) return [];
						if (type = self.mimes[ext[ii]], type && -1 === Basic.inArray(type, mimes) && mimes.push(type), addMissingExtensions && /^\w+$/.test(ext[ii])) mimes.push("." + ext[ii]);
						else if (!type) return []
					}
					return mimes
				},
				mimes2exts: function(mimes) {
					var self = this,
						exts = [];
					return Basic.each(mimes, function(mime) {
						if ("*" === mime) return exts = [], !1;
						var m = mime.match(/^(\w+)\/(\*|\w+)$/);
						m && ("*" === m[2] ? Basic.each(self.extensions, function(arr, mime) {
							new RegExp("^" + m[1] + "/").test(mime) && [].push.apply(exts, self.extensions[mime])
						}) : self.extensions[mime] && [].push.apply(exts, self.extensions[mime]))
					}), exts
				},
				mimes2extList: function(mimes) {
					var accept = [],
						exts = [];
					return "string" === Basic.typeOf(mimes) && (mimes = Basic.trim(mimes).split(/\s*,\s*/)), exts = this.mimes2exts(mimes), accept.push({
						title: I18n.translate("Files"),
						extensions: exts.length ? exts.join(",") : "*"
					}), accept.mimes = mimes, accept
				},
				getFileExtension: function(fileName) {
					var matches = fileName && fileName.match(/\.([^.]+)$/);
					return matches ? matches[1].toLowerCase() : ""
				},
				getFileMime: function(fileName) {
					return this.mimes[this.getFileExtension(fileName)] || ""
				}
			};
		return Mime.addMimeType(mimeData), Mime
	}), define("moxie/core/utils/Dom", ["moxie/core/utils/Env"], function(Env) {
		var get = function(id) {
				return "string" != typeof id ? id : document.getElementById(id)
			},
			hasClass = function(obj, name) {
				if (!obj.className) return !1;
				var regExp = new RegExp("(^|\\s+)" + name + "(\\s+|$)");
				return regExp.test(obj.className)
			},
			addClass = function(obj, name) {
				hasClass(obj, name) || (obj.className = obj.className ? obj.className.replace(/\s+$/, "") + " " + name : name)
			},
			removeClass = function(obj, name) {
				if (obj.className) {
					var regExp = new RegExp("(^|\\s+)" + name + "(\\s+|$)");
					obj.className = obj.className.replace(regExp, function($0, $1, $2) {
						return " " === $1 && " " === $2 ? " " : ""
					})
				}
			},
			getStyle = function(obj, name) {
				return obj.currentStyle ? obj.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(obj, null)[name] : void 0
			},
			getPos = function(node, root) {
				function getIEPos(node) {
					var bodyElm, rect, x = 0,
						y = 0;
					return node && (rect = node.getBoundingClientRect(), bodyElm = "CSS1Compat" === doc.compatMode ? doc.documentElement : doc.body, x = rect.left + bodyElm.scrollLeft, y = rect.top + bodyElm.scrollTop), {
						x: x,
						y: y
					}
				}
				var parent, nodeRect, rootRect, x = 0,
					y = 0,
					doc = document;
				if (node = node, root = root || doc.body, node && node.getBoundingClientRect && "IE" === Env.browser && (!doc.documentMode || doc.documentMode < 8)) return nodeRect = getIEPos(node), rootRect = getIEPos(root), {
					x: nodeRect.x - rootRect.x,
					y: nodeRect.y - rootRect.y
				};
				for (parent = node; parent && parent != root && parent.nodeType;) x += parent.offsetLeft || 0, y += parent.offsetTop || 0, parent = parent.offsetParent;
				for (parent = node.parentNode; parent && parent != root && parent.nodeType;) x -= parent.scrollLeft || 0, y -= parent.scrollTop || 0, parent = parent.parentNode;
				return {
					x: x,
					y: y
				}
			},
			getSize = function(node) {
				return {
					w: node.offsetWidth || node.clientWidth,
					h: node.offsetHeight || node.clientHeight
				}
			};
		return {
			get: get,
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			getStyle: getStyle,
			getPos: getPos,
			getSize: getSize
		}
	}), define("moxie/core/Exceptions", ["moxie/core/utils/Basic"], function(Basic) {
		function _findKey(obj, value) {
			var key;
			for (key in obj) if (obj[key] === value) return key;
			return null
		}
		return {
			RuntimeError: function() {
				function RuntimeError(code) {
					this.code = code, this.name = _findKey(namecodes, code), this.message = this.name + ": RuntimeError " + this.code
				}
				var namecodes = {
					NOT_INIT_ERR: 1,
					NOT_SUPPORTED_ERR: 9,
					JS_ERR: 4
				};
				return Basic.extend(RuntimeError, namecodes), RuntimeError.prototype = Error.prototype, RuntimeError
			}(),
			OperationNotAllowedException: function() {
				function OperationNotAllowedException(code) {
					this.code = code, this.name = "OperationNotAllowedException"
				}
				return Basic.extend(OperationNotAllowedException, {
					NOT_ALLOWED_ERR: 1
				}), OperationNotAllowedException.prototype = Error.prototype, OperationNotAllowedException
			}(),
			ImageError: function() {
				function ImageError(code) {
					this.code = code, this.name = _findKey(namecodes, code), this.message = this.name + ": ImageError " + this.code
				}
				var namecodes = {
					WRONG_FORMAT: 1,
					MAX_RESOLUTION_ERR: 2,
					INVALID_META_ERR: 3
				};
				return Basic.extend(ImageError, namecodes), ImageError.prototype = Error.prototype, ImageError
			}(),
			FileException: function() {
				function FileException(code) {
					this.code = code, this.name = _findKey(namecodes, code), this.message = this.name + ": FileException " + this.code
				}
				var namecodes = {
					NOT_FOUND_ERR: 1,
					SECURITY_ERR: 2,
					ABORT_ERR: 3,
					NOT_READABLE_ERR: 4,
					ENCODING_ERR: 5,
					NO_MODIFICATION_ALLOWED_ERR: 6,
					INVALID_STATE_ERR: 7,
					SYNTAX_ERR: 8
				};
				return Basic.extend(FileException, namecodes), FileException.prototype = Error.prototype, FileException
			}(),
			DOMException: function() {
				function DOMException(code) {
					this.code = code, this.name = _findKey(namecodes, code), this.message = this.name + ": DOMException " + this.code
				}
				var namecodes = {
					INDEX_SIZE_ERR: 1,
					DOMSTRING_SIZE_ERR: 2,
					HIERARCHY_REQUEST_ERR: 3,
					WRONG_DOCUMENT_ERR: 4,
					INVALID_CHARACTER_ERR: 5,
					NO_DATA_ALLOWED_ERR: 6,
					NO_MODIFICATION_ALLOWED_ERR: 7,
					NOT_FOUND_ERR: 8,
					NOT_SUPPORTED_ERR: 9,
					INUSE_ATTRIBUTE_ERR: 10,
					INVALID_STATE_ERR: 11,
					SYNTAX_ERR: 12,
					INVALID_MODIFICATION_ERR: 13,
					NAMESPACE_ERR: 14,
					INVALID_ACCESS_ERR: 15,
					VALIDATION_ERR: 16,
					TYPE_MISMATCH_ERR: 17,
					SECURITY_ERR: 18,
					NETWORK_ERR: 19,
					ABORT_ERR: 20,
					URL_MISMATCH_ERR: 21,
					QUOTA_EXCEEDED_ERR: 22,
					TIMEOUT_ERR: 23,
					INVALID_NODE_TYPE_ERR: 24,
					DATA_CLONE_ERR: 25
				};
				return Basic.extend(DOMException, namecodes), DOMException.prototype = Error.prototype, DOMException
			}(),
			EventException: function() {
				function EventException(code) {
					this.code = code, this.name = "EventException"
				}
				return Basic.extend(EventException, {
					UNSPECIFIED_EVENT_TYPE_ERR: 0
				}), EventException.prototype = Error.prototype, EventException
			}()
		}
	}), define("moxie/core/EventTarget", ["moxie/core/utils/Env", "moxie/core/Exceptions", "moxie/core/utils/Basic"], function(Env, x, Basic) {
		function EventTarget() {
			var eventpool = {};
			Basic.extend(this, {
				uid: null,
				init: function() {
					this.uid || (this.uid = Basic.guid("uid_"))
				},
				addEventListener: function(type, fn, priority, scope) {
					var list, self = this;
					return this.hasOwnProperty("uid") || (this.uid = Basic.guid("uid_")), type = Basic.trim(type), /\s/.test(type) ? void Basic.each(type.split(/\s+/), function(type) {
						self.addEventListener(type, fn, priority, scope)
					}) : (type = type.toLowerCase(), priority = parseInt(priority, 10) || 0, list = eventpool[this.uid] && eventpool[this.uid][type] || [], list.push({
						fn: fn,
						priority: priority,
						scope: scope || this
					}), eventpool[this.uid] || (eventpool[this.uid] = {}), void(eventpool[this.uid][type] = list))
				},
				hasEventListener: function(type) {
					var list = type ? eventpool[this.uid] && eventpool[this.uid][type] : eventpool[this.uid];
					return list ? list : !1
				},
				removeEventListener: function(type, fn) {
					type = type.toLowerCase();
					var i, list = eventpool[this.uid] && eventpool[this.uid][type];
					if (list) {
						if (fn) {
							for (i = list.length - 1; i >= 0; i--) if (list[i].fn === fn) {
								list.splice(i, 1);
								break
							}
						} else list = [];
						list.length || (delete eventpool[this.uid][type], Basic.isEmptyObj(eventpool[this.uid]) && delete eventpool[this.uid])
					}
				},
				removeAllEventListeners: function() {
					eventpool[this.uid] && delete eventpool[this.uid]
				},
				dispatchEvent: function(type) {
					var uid, list, args, tmpEvt, undef, evt = {},
						result = !0;
					if ("string" !== Basic.typeOf(type)) {
						if (tmpEvt = type, "string" !== Basic.typeOf(tmpEvt.type)) throw new x.EventException(x.EventException.UNSPECIFIED_EVENT_TYPE_ERR);
						type = tmpEvt.type, tmpEvt.total !== undef && tmpEvt.loaded !== undef && (evt.total = tmpEvt.total, evt.loaded = tmpEvt.loaded), evt.async = tmpEvt.async || !1
					}
					if (-1 !== type.indexOf("::") ? !
					function(arr) {
						uid = arr[0], type = arr[1]
					}(type.split("::")) : uid = this.uid, type = type.toLowerCase(), list = eventpool[uid] && eventpool[uid][type]) {
						list.sort(function(a, b) {
							return b.priority - a.priority
						}), args = [].slice.call(arguments), args.shift(), evt.type = type, args.unshift(evt), MXI_DEBUG && Env.debug.events && Env.log("Event '%s' fired on %u", evt.type, uid);
						var queue = [];
						Basic.each(list, function(handler) {
							args[0].target = handler.scope, evt.async ? queue.push(function(cb) {
								setTimeout(function() {
									cb(handler.fn.apply(handler.scope, args) === !1)
								}, 1)
							}) : queue.push(function(cb) {
								cb(handler.fn.apply(handler.scope, args) === !1)
							})
						}), queue.length && Basic.inSeries(queue, function(err) {
							result = !err
						})
					}
					return result
				},
				bind: function() {
					this.addEventListener.apply(this, arguments)
				},
				unbind: function() {
					this.removeEventListener.apply(this, arguments)
				},
				unbindAll: function() {
					this.removeAllEventListeners.apply(this, arguments)
				},
				trigger: function() {
					return this.dispatchEvent.apply(this, arguments)
				},
				handleEventProps: function(dispatches) {
					var self = this;
					this.bind(dispatches.join(" "), function(e) {
						var prop = "on" + e.type.toLowerCase();
						"function" === Basic.typeOf(this[prop]) && this[prop].apply(this, arguments)
					}), Basic.each(dispatches, function(prop) {
						prop = "on" + prop.toLowerCase(prop), "undefined" === Basic.typeOf(self[prop]) && (self[prop] = null)
					})
				}
			})
		}
		return EventTarget.instance = new EventTarget, EventTarget
	}), define("moxie/runtime/Runtime", ["moxie/core/utils/Env", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/EventTarget"], function(Env, Basic, Dom, EventTarget) {
		function Runtime(options, type, caps, modeCaps, preferredMode) {
			var _shim, self = this,
				_uid = Basic.guid(type + "_"),
				defaultMode = preferredMode || "browser";
			options = options || {}, runtimes[_uid] = this, caps = Basic.extend({
				access_binary: !1,
				access_image_binary: !1,
				display_media: !1,
				do_cors: !1,
				drag_and_drop: !1,
				filter_by_extension: !0,
				resize_image: !1,
				report_upload_progress: !1,
				return_response_headers: !1,
				return_response_type: !1,
				return_status_code: !0,
				send_custom_headers: !1,
				select_file: !1,
				select_folder: !1,
				select_multiple: !0,
				send_binary_string: !1,
				send_browser_cookies: !0,
				send_multipart: !0,
				slice_blob: !1,
				stream_upload: !1,
				summon_file_dialog: !1,
				upload_filesize: !0,
				use_http_method: !0
			}, caps), options.preferred_caps && (defaultMode = Runtime.getMode(modeCaps, options.preferred_caps, defaultMode)), MXI_DEBUG && Env.debug.runtime && Env.log("	default mode: %s", defaultMode), _shim = function() {
				var objpool = {};
				return {
					exec: function(uid, comp, fn, args) {
						return _shim[comp] && (objpool[uid] || (objpool[uid] = {
							context: this,
							instance: new _shim[comp]
						}), objpool[uid].instance[fn]) ? objpool[uid].instance[fn].apply(this, args) : void 0
					},
					removeInstance: function(uid) {
						delete objpool[uid]
					},
					removeAllInstances: function() {
						var self = this;
						Basic.each(objpool, function(obj, uid) {
							"function" === Basic.typeOf(obj.instance.destroy) && obj.instance.destroy.call(obj.context), self.removeInstance(uid)
						})
					}
				}
			}(), Basic.extend(this, {
				initialized: !1,
				uid: _uid,
				type: type,
				mode: Runtime.getMode(modeCaps, options.required_caps, defaultMode),
				shimid: _uid + "_container",
				clients: 0,
				options: options,
				can: function(cap, value) {
					var refCaps = arguments[2] || caps;
					if ("string" === Basic.typeOf(cap) && "undefined" === Basic.typeOf(value) && (cap = Runtime.parseCaps(cap)), "object" === Basic.typeOf(cap)) {
						for (var key in cap) if (!this.can(key, cap[key], refCaps)) return !1;
						return !0
					}
					return "function" === Basic.typeOf(refCaps[cap]) ? refCaps[cap].call(this, value) : value === refCaps[cap]
				},
				getShimContainer: function() {
					var container, shimContainer = Dom.get(this.shimid);
					return shimContainer || (container = this.options.container ? Dom.get(this.options.container) : document.body, shimContainer = document.createElement("div"), shimContainer.id = this.shimid, shimContainer.className = "moxie-shim moxie-shim-" + this.type, Basic.extend(shimContainer.style, {
						position: "absolute",
						top: "0px",
						left: "0px",
						width: "1px",
						height: "1px",
						overflow: "hidden"
					}), container.appendChild(shimContainer), container = null), shimContainer
				},
				getShim: function() {
					return _shim
				},
				shimExec: function(component, action) {
					var args = [].slice.call(arguments, 2);
					return self.getShim().exec.call(this, this.uid, component, action, args)
				},
				exec: function(component, action) {
					var args = [].slice.call(arguments, 2);
					return self[component] && self[component][action] ? self[component][action].apply(this, args) : self.shimExec.apply(this, arguments)
				},
				destroy: function() {
					if (self) {
						var shimContainer = Dom.get(this.shimid);
						shimContainer && shimContainer.parentNode.removeChild(shimContainer), _shim && _shim.removeAllInstances(), this.unbindAll(), delete runtimes[this.uid], this.uid = null, _uid = self = _shim = shimContainer = null
					}
				}
			}), this.mode && options.required_caps && !this.can(options.required_caps) && (this.mode = !1)
		}
		var runtimeConstructors = {},
			runtimes = {};
		return Runtime.order = "html5,flash,silverlight,html4", Runtime.getRuntime = function(uid) {
			return runtimes[uid] ? runtimes[uid] : !1
		}, Runtime.addConstructor = function(type, constructor) {
			constructor.prototype = EventTarget.instance, runtimeConstructors[type] = constructor
		}, Runtime.getConstructor = function(type) {
			return runtimeConstructors[type] || null
		}, Runtime.getInfo = function(uid) {
			var runtime = Runtime.getRuntime(uid);
			return runtime ? {
				uid: runtime.uid,
				type: runtime.type,
				mode: runtime.mode,
				can: function() {
					return runtime.can.apply(runtime, arguments)
				}
			} : null
		}, Runtime.parseCaps = function(capStr) {
			var capObj = {};
			return "string" !== Basic.typeOf(capStr) ? capStr || {} : (Basic.each(capStr.split(","), function(key) {
				capObj[key] = !0
			}), capObj)
		}, Runtime.can = function(type, caps) {
			var runtime, mode, constructor = Runtime.getConstructor(type);
			return constructor ? (runtime = new constructor({
				required_caps: caps
			}), mode = runtime.mode, runtime.destroy(), !! mode) : !1
		}, Runtime.thatCan = function(caps, runtimeOrder) {
			var types = (runtimeOrder || Runtime.order).split(/\s*,\s*/);
			for (var i in types) if (Runtime.can(types[i], caps)) return types[i];
			return null
		}, Runtime.getMode = function(modeCaps, requiredCaps, defaultMode) {
			var mode = null;
			if ("undefined" === Basic.typeOf(defaultMode) && (defaultMode = "browser"), requiredCaps && !Basic.isEmptyObj(modeCaps)) {
				if (Basic.each(requiredCaps, function(value, cap) {
					if (modeCaps.hasOwnProperty(cap)) {
						var capMode = modeCaps[cap](value);
						if ("string" == typeof capMode && (capMode = [capMode]), mode) {
							if (!(mode = Basic.arrayIntersect(mode, capMode))) return MXI_DEBUG && Env.debug.runtime && Env.log("		%c: %v (conflicting mode requested: %s)", cap, value, capMode), mode = !1
						} else mode = capMode
					}
					MXI_DEBUG && Env.debug.runtime && Env.log("		%c: %v (compatible modes: %s)", cap, value, mode)
				}), mode) return -1 !== Basic.inArray(defaultMode, mode) ? defaultMode : mode[0];
				if (mode === !1) return !1
			}
			return defaultMode
		}, Runtime.capTrue = function() {
			return !0
		}, Runtime.capFalse = function() {
			return !1
		}, Runtime.capTest = function(expr) {
			return function() {
				return !!expr
			}
		}, Runtime
	}), define("moxie/runtime/RuntimeClient", ["moxie/core/utils/Env", "moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/Runtime"], function(Env, x, Basic, Runtime) {
		return function() {
			var runtime;
			Basic.extend(this, {
				connectRuntime: function(options) {
					function initialize(items) {
						var type, constructor;
						return items.length ? (type = items.shift().toLowerCase(), (constructor = Runtime.getConstructor(type)) ? (MXI_DEBUG && Env.debug.runtime && (Env.log("Trying runtime: %s", type), Env.log(options)), runtime = new constructor(options), runtime.bind("Init", function() {
							runtime.initialized = !0, MXI_DEBUG && Env.debug.runtime && Env.log("Runtime '%s' initialized", runtime.type), setTimeout(function() {
								runtime.clients++, comp.trigger("RuntimeInit", runtime)
							}, 1)
						}), runtime.bind("Error", function() {
							MXI_DEBUG && Env.debug.runtime && Env.log("Runtime '%s' failed to initialize", runtime.type), runtime.destroy(), initialize(items)
						}), MXI_DEBUG && Env.debug.runtime && Env.log("	selected mode: %s", runtime.mode), runtime.mode ? void runtime.init() : void runtime.trigger("Error")) : void initialize(items)) : (comp.trigger("RuntimeError", new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR)), void(runtime = null))
					}
					var ruid, comp = this;
					if ("string" === Basic.typeOf(options) ? ruid = options : "string" === Basic.typeOf(options.ruid) && (ruid = options.ruid), ruid) {
						if (runtime = Runtime.getRuntime(ruid)) return runtime.clients++, runtime;
						throw new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR)
					}
					initialize((options.runtime_order || Runtime.order).split(/\s*,\s*/))
				},
				disconnectRuntime: function() {
					runtime && --runtime.clients <= 0 && runtime.destroy(), runtime = null
				},
				getRuntime: function() {
					return runtime && runtime.uid ? runtime : runtime = null
				},
				exec: function() {
					return runtime ? runtime.exec.apply(this, arguments) : null
				}
			})
		}
	}), define("moxie/file/FileInput", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Mime", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/I18n", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient"], function(Basic, Env, Mime, Dom, x, EventTarget, I18n, Runtime, RuntimeClient) {
		function FileInput(options) {
			MXI_DEBUG && Env.log("Instantiating FileInput...");
			var container, browseButton, defaults, self = this;
			if (-1 !== Basic.inArray(Basic.typeOf(options), ["string", "node"]) && (options = {
				browse_button: options
			}), browseButton = Dom.get(options.browse_button), !browseButton) throw new x.DOMException(x.DOMException.NOT_FOUND_ERR);
			defaults = {
				accept: [{
					title: I18n.translate("All Files"),
					extensions: "*"
				}],
				name: "file",
				multiple: !1,
				required_caps: !1,
				container: browseButton.parentNode || document.body
			}, options = Basic.extend({}, defaults, options), "string" == typeof options.required_caps && (options.required_caps = Runtime.parseCaps(options.required_caps)), "string" == typeof options.accept && (options.accept = Mime.mimes2extList(options.accept)), container = Dom.get(options.container), container || (container = document.body), "static" === Dom.getStyle(container, "position") && (container.style.position = "relative"), container = browseButton = null, RuntimeClient.call(self), Basic.extend(self, {
				uid: Basic.guid("uid_"),
				ruid: null,
				shimid: null,
				files: null,
				init: function() {
					self.bind("RuntimeInit", function(e, runtime) {
						self.ruid = runtime.uid, self.shimid = runtime.shimid, self.bind("Ready", function() {
							self.trigger("Refresh")
						}, 999), self.bind("Refresh", function() {
							var pos, size, browseButton, shimContainer;
							browseButton = Dom.get(options.browse_button), shimContainer = Dom.get(runtime.shimid), browseButton && (pos = Dom.getPos(browseButton, Dom.get(options.container)), size = Dom.getSize(browseButton), shimContainer && Basic.extend(shimContainer.style, {
								top: pos.y + "px",
								left: pos.x + "px",
								width: size.w + "px",
								height: size.h + "px"
							})), shimContainer = browseButton = null
						}), runtime.exec.call(self, "FileInput", "init", options)
					}), self.connectRuntime(Basic.extend({}, options, {
						required_caps: {
							select_file: !0
						}
					}))
				},
				disable: function(state) {
					var runtime = this.getRuntime();
					runtime && runtime.exec.call(this, "FileInput", "disable", "undefined" === Basic.typeOf(state) ? !0 : state)
				},
				refresh: function() {
					self.trigger("Refresh")
				},
				destroy: function() {
					var runtime = this.getRuntime();
					runtime && (runtime.exec.call(this, "FileInput", "destroy"), this.disconnectRuntime()), "array" === Basic.typeOf(this.files) && Basic.each(this.files, function(file) {
						file.destroy()
					}), this.files = null, this.unbindAll()
				}
			}), this.handleEventProps(dispatches)
		}
		var dispatches = ["ready", "change", "cancel", "mouseenter", "mouseleave", "mousedown", "mouseup"];
		return FileInput.prototype = EventTarget.instance, FileInput
	}), define("moxie/core/utils/Encode", [], function() {
		var utf8_encode = function(str) {
				return unescape(encodeURIComponent(str))
			},
			utf8_decode = function(str_data) {
				return decodeURIComponent(escape(str_data))
			},
			atob = function(data, utf8) {
				if ("function" == typeof window.atob) return utf8 ? utf8_decode(window.atob(data)) : window.atob(data);
				var o1, o2, o3, h1, h2, h3, h4, bits, b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
					i = 0,
					ac = 0,
					dec = "",
					tmp_arr = [];
				if (!data) return data;
				data += "";
				do h1 = b64.indexOf(data.charAt(i++)), h2 = b64.indexOf(data.charAt(i++)), h3 = b64.indexOf(data.charAt(i++)), h4 = b64.indexOf(data.charAt(i++)), bits = h1 << 18 | h2 << 12 | h3 << 6 | h4, o1 = bits >> 16 & 255, o2 = bits >> 8 & 255, o3 = 255 & bits, 64 == h3 ? tmp_arr[ac++] = String.fromCharCode(o1) : 64 == h4 ? tmp_arr[ac++] = String.fromCharCode(o1, o2) : tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
				while (i < data.length);
				return dec = tmp_arr.join(""), utf8 ? utf8_decode(dec) : dec
			},
			btoa = function(data, utf8) {
				if (utf8 && (data = utf8_encode(data)), "function" == typeof window.btoa) return window.btoa(data);
				var o1, o2, o3, h1, h2, h3, h4, bits, b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
					i = 0,
					ac = 0,
					enc = "",
					tmp_arr = [];
				if (!data) return data;
				do o1 = data.charCodeAt(i++), o2 = data.charCodeAt(i++), o3 = data.charCodeAt(i++), bits = o1 << 16 | o2 << 8 | o3, h1 = bits >> 18 & 63, h2 = bits >> 12 & 63, h3 = bits >> 6 & 63, h4 = 63 & bits, tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
				while (i < data.length);
				enc = tmp_arr.join("");
				var r = data.length % 3;
				return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3)
			};
		return {
			utf8_encode: utf8_encode,
			utf8_decode: utf8_decode,
			atob: atob,
			btoa: btoa
		}
	}), define("moxie/file/Blob", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient"], function(Basic, Encode, RuntimeClient) {
		function Blob(ruid, blob) {
			function _sliceDetached(start, end, type) {
				var blob, data = blobpool[this.uid];
				return "string" === Basic.typeOf(data) && data.length ? (blob = new Blob(null, {
					type: type,
					size: end - start
				}), blob.detach(data.substr(start, blob.size)), blob) : null
			}
			RuntimeClient.call(this), ruid && this.connectRuntime(ruid), blob ? "string" === Basic.typeOf(blob) && (blob = {
				data: blob
			}) : blob = {}, Basic.extend(this, {
				uid: blob.uid || Basic.guid("uid_"),
				ruid: ruid,
				size: blob.size || 0,
				type: blob.type || "",
				slice: function(start, end, type) {
					return this.isDetached() ? _sliceDetached.apply(this, arguments) : this.getRuntime().exec.call(this, "Blob", "slice", this.getSource(), start, end, type)
				},
				getSource: function() {
					return blobpool[this.uid] ? blobpool[this.uid] : null
				},
				detach: function(data) {
					if (this.ruid && (this.getRuntime().exec.call(this, "Blob", "destroy"), this.disconnectRuntime(), this.ruid = null), data = data || "", "data:" == data.substr(0, 5)) {
						var base64Offset = data.indexOf(";base64,");
						this.type = data.substring(5, base64Offset), data = Encode.atob(data.substring(base64Offset + 8))
					}
					this.size = data.length, blobpool[this.uid] = data
				},
				isDetached: function() {
					return !this.ruid && "string" === Basic.typeOf(blobpool[this.uid])
				},
				destroy: function() {
					this.detach(), delete blobpool[this.uid]
				}
			}), blob.data ? this.detach(blob.data) : blobpool[this.uid] = blob
		}
		var blobpool = {};
		return Blob
	}), define("moxie/file/File", ["moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/file/Blob"], function(Basic, Mime, Blob) {
		function File(ruid, file) {
			file || (file = {}), Blob.apply(this, arguments), this.type || (this.type = Mime.getFileMime(file.name));
			var name;
			if (file.name) name = file.name.replace(/\\/g, "/"), name = name.substr(name.lastIndexOf("/") + 1);
			else if (this.type) {
				var prefix = this.type.split("/")[0];
				name = Basic.guid(("" !== prefix ? prefix : "file") + "_"), Mime.extensions[this.type] && (name += "." + Mime.extensions[this.type][0])
			}
			Basic.extend(this, {
				name: name || Basic.guid("file_"),
				relativePath: "",
				lastModifiedDate: file.lastModifiedDate || (new Date).toLocaleString()
			})
		}
		return File.prototype = Blob.prototype, File
	}), define("moxie/file/FileDrop", ["moxie/core/I18n", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/file/File", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget", "moxie/core/utils/Mime"], function(I18n, Dom, x, Basic, Env, File, RuntimeClient, EventTarget, Mime) {
		function FileDrop(options) {
			MXI_DEBUG && Env.log("Instantiating FileDrop...");
			var defaults, self = this;
			"string" == typeof options && (options = {
				drop_zone: options
			}), defaults = {
				accept: [{
					title: I18n.translate("All Files"),
					extensions: "*"
				}],
				required_caps: {
					drag_and_drop: !0
				}
			}, options = "object" == typeof options ? Basic.extend({}, defaults, options) : defaults, options.container = Dom.get(options.drop_zone) || document.body, "static" === Dom.getStyle(options.container, "position") && (options.container.style.position = "relative"), "string" == typeof options.accept && (options.accept = Mime.mimes2extList(options.accept)), RuntimeClient.call(self), Basic.extend(self, {
				uid: Basic.guid("uid_"),
				ruid: null,
				files: null,
				init: function() {
					self.bind("RuntimeInit", function(e, runtime) {
						self.ruid = runtime.uid, runtime.exec.call(self, "FileDrop", "init", options), self.dispatchEvent("ready")
					}), self.connectRuntime(options)
				},
				destroy: function() {
					var runtime = this.getRuntime();
					runtime && (runtime.exec.call(this, "FileDrop", "destroy"), this.disconnectRuntime()), this.files = null, this.unbindAll()
				}
			}), this.handleEventProps(dispatches)
		}
		var dispatches = ["ready", "dragenter", "dragleave", "drop", "error"];
		return FileDrop.prototype = EventTarget.instance, FileDrop
	}), define("moxie/file/FileReader", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/runtime/RuntimeClient"], function(Basic, Encode, x, EventTarget, Blob, RuntimeClient) {
		function FileReader() {
			function _read(op, blob) {
				if (this.trigger("loadstart"), this.readyState === FileReader.LOADING) return this.trigger("error", new x.DOMException(x.DOMException.INVALID_STATE_ERR)), void this.trigger("loadend");
				if (!(blob instanceof Blob)) return this.trigger("error", new x.DOMException(x.DOMException.NOT_FOUND_ERR)), void this.trigger("loadend");
				if (this.result = null, this.readyState = FileReader.LOADING, blob.isDetached()) {
					var src = blob.getSource();
					switch (op) {
					case "readAsText":
					case "readAsBinaryString":
						this.result = src;
						break;
					case "readAsDataURL":
						this.result = "data:" + blob.type + ";base64," + Encode.btoa(src)
					}
					this.readyState = FileReader.DONE, this.trigger("load"), this.trigger("loadend")
				} else this.connectRuntime(blob.ruid), this.exec("FileReader", "read", op, blob)
			}
			RuntimeClient.call(this), Basic.extend(this, {
				uid: Basic.guid("uid_"),
				readyState: FileReader.EMPTY,
				result: null,
				error: null,
				readAsBinaryString: function(blob) {
					_read.call(this, "readAsBinaryString", blob)
				},
				readAsDataURL: function(blob) {
					_read.call(this, "readAsDataURL", blob)
				},
				readAsText: function(blob) {
					_read.call(this, "readAsText", blob)
				},
				abort: function() {
					this.result = null, -1 === Basic.inArray(this.readyState, [FileReader.EMPTY, FileReader.DONE]) && (this.readyState === FileReader.LOADING && (this.readyState = FileReader.DONE), this.exec("FileReader", "abort"), this.trigger("abort"), this.trigger("loadend"))
				},
				destroy: function() {
					this.abort(), this.exec("FileReader", "destroy"), this.disconnectRuntime(), this.unbindAll()
				}
			}), this.handleEventProps(dispatches), this.bind("Error", function(e, err) {
				this.readyState = FileReader.DONE, this.error = err
			}, 999), this.bind("Load", function(e) {
				this.readyState = FileReader.DONE
			}, 999)
		}
		var dispatches = ["loadstart", "progress", "load", "abort", "error", "loadend"];
		return FileReader.EMPTY = 0, FileReader.LOADING = 1, FileReader.DONE = 2, FileReader.prototype = EventTarget.instance, FileReader
	}), define("moxie/core/utils/Url", [], function() {
		var parseUrl = function(url, currentUrl) {
				for (var key = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], i = key.length, ports = {
					http: 80,
					https: 443
				}, uri = {}, regex = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/, m = regex.exec(url || ""); i--;) m[i] && (uri[key[i]] = m[i]);
				if (!uri.scheme) {
					currentUrl && "string" != typeof currentUrl || (currentUrl = parseUrl(currentUrl || document.location.href)), uri.scheme = currentUrl.scheme, uri.host = currentUrl.host, uri.port = currentUrl.port;
					var path = "";
					/^[^\/]/.test(uri.path) && (path = currentUrl.path, path = /\/[^\/]*\.[^\/]*$/.test(path) ? path.replace(/\/[^\/]+$/, "/") : path.replace(/\/?$/, "/")), uri.path = path + (uri.path || "")
				}
				return uri.port || (uri.port = ports[uri.scheme] || 80), uri.port = parseInt(uri.port, 10), uri.path || (uri.path = "/"), delete uri.source, uri
			},
			resolveUrl = function(url) {
				var ports = {
					http: 80,
					https: 443
				},
					urlp = "object" == typeof url ? url : parseUrl(url);
				return urlp.scheme + "://" + urlp.host + (urlp.port !== ports[urlp.scheme] ? ":" + urlp.port : "") + urlp.path + (urlp.query ? urlp.query : "")
			},
			hasSameOrigin = function(url) {
				function origin(url) {
					return [url.scheme, url.host, url.port].join("/")
				}
				return "string" == typeof url && (url = parseUrl(url)), origin(parseUrl()) === origin(url)
			};
		return {
			parseUrl: parseUrl,
			resolveUrl: resolveUrl,
			hasSameOrigin: hasSameOrigin
		}
	}), define("moxie/runtime/RuntimeTarget", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function(Basic, RuntimeClient, EventTarget) {
		function RuntimeTarget() {
			this.uid = Basic.guid("uid_"), RuntimeClient.call(this), this.destroy = function() {
				this.disconnectRuntime(), this.unbindAll()
			}
		}
		return RuntimeTarget.prototype = EventTarget.instance, RuntimeTarget
	}), define("moxie/file/FileReaderSync", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/utils/Encode"], function(Basic, RuntimeClient, Encode) {
		return function() {
			function _read(op, blob) {
				if (!blob.isDetached()) {
					var result = this.connectRuntime(blob.ruid).exec.call(this, "FileReaderSync", "read", op, blob);
					return this.disconnectRuntime(), result
				}
				var src = blob.getSource();
				switch (op) {
				case "readAsBinaryString":
					return src;
				case "readAsDataURL":
					return "data:" + blob.type + ";base64," + Encode.btoa(src);
				case "readAsText":
					for (var txt = "", i = 0, length = src.length; length > i; i++) txt += String.fromCharCode(src[i]);
					return txt
				}
			}
			RuntimeClient.call(this), Basic.extend(this, {
				uid: Basic.guid("uid_"),
				readAsBinaryString: function(blob) {
					return _read.call(this, "readAsBinaryString", blob)
				},
				readAsDataURL: function(blob) {
					return _read.call(this, "readAsDataURL", blob)
				},
				readAsText: function(blob) {
					return _read.call(this, "readAsText", blob)
				}
			})
		}
	}), define("moxie/xhr/FormData", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/file/Blob"], function(x, Basic, Blob) {
		function FormData() {
			var _blob, _fields = [];
			Basic.extend(this, {
				append: function(name, value) {
					var self = this,
						valueType = Basic.typeOf(value);
					value instanceof Blob ? _blob = {
						name: name,
						value: value
					} : "array" === valueType ? (name += "[]", Basic.each(value, function(value) {
						self.append(name, value)
					})) : "object" === valueType ? Basic.each(value, function(value, key) {
						self.append(name + "[" + key + "]", value)
					}) : "null" === valueType || "undefined" === valueType || "number" === valueType && isNaN(value) ? self.append(name, "false") : _fields.push({
						name: name,
						value: value.toString()
					})
				},
				hasBlob: function() {
					return !!this.getBlob()
				},
				getBlob: function() {
					return _blob && _blob.value || null
				},
				getBlobName: function() {
					return _blob && _blob.name || null
				},
				each: function(cb) {
					Basic.each(_fields, function(field) {
						cb(field.value, field.name)
					}), _blob && cb(_blob.value, _blob.name)
				},
				destroy: function() {
					_blob = null, _fields = []
				}
			})
		}
		return FormData
	}), define("moxie/xhr/XMLHttpRequest", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/utils/Encode", "moxie/core/utils/Url", "moxie/runtime/Runtime", "moxie/runtime/RuntimeTarget", "moxie/file/Blob", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/core/utils/Env", "moxie/core/utils/Mime"], function(Basic, x, EventTarget, Encode, Url, Runtime, RuntimeTarget, Blob, FileReaderSync, FormData, Env, Mime) {
		function XMLHttpRequestUpload() {
			this.uid = Basic.guid("uid_")
		}
		function XMLHttpRequest() {
			function _p(prop, value) {
				return props.hasOwnProperty(prop) ? 1 === arguments.length ? Env.can("define_property") ? props[prop] : self[prop] : void(Env.can("define_property") ? props[prop] = value : self[prop] = value) : void 0
			}
			function _doXHR(data) {
				function loadEnd() {
					_xhr && (_xhr.destroy(), _xhr = null), self.dispatchEvent("loadend"), self = null
				}
				function exec(runtime) {
					_xhr.bind("LoadStart", function(e) {
						_p("readyState", XMLHttpRequest.LOADING), self.dispatchEvent("readystatechange"), self.dispatchEvent(e), _upload_events_flag && self.upload.dispatchEvent(e)
					}), _xhr.bind("Progress", function(e) {
						_p("readyState") !== XMLHttpRequest.LOADING && (_p("readyState", XMLHttpRequest.LOADING), self.dispatchEvent("readystatechange")), self.dispatchEvent(e)
					}), _xhr.bind("UploadProgress", function(e) {
						_upload_events_flag && self.upload.dispatchEvent({
							type: "progress",
							lengthComputable: !1,
							total: e.total,
							loaded: e.loaded
						})
					}), _xhr.bind("Load", function(e) {
						_p("readyState", XMLHttpRequest.DONE), _p("status", Number(runtime.exec.call(_xhr, "XMLHttpRequest", "getStatus") || 0)), _p("statusText", httpCode[_p("status")] || ""), _p("response", runtime.exec.call(_xhr, "XMLHttpRequest", "getResponse", _p("responseType"))), ~Basic.inArray(_p("responseType"), ["text", ""]) ? _p("responseText", _p("response")) : "document" === _p("responseType") && _p("responseXML", _p("response")), _responseHeaders = runtime.exec.call(_xhr, "XMLHttpRequest", "getAllResponseHeaders"), self.dispatchEvent("readystatechange"), _p("status") > 0 ? (_upload_events_flag && self.upload.dispatchEvent(e), self.dispatchEvent(e)) : (_error_flag = !0, self.dispatchEvent("error")), loadEnd()
					}), _xhr.bind("Abort", function(e) {
						self.dispatchEvent(e), loadEnd()
					}), _xhr.bind("Error", function(e) {
						_error_flag = !0, _p("readyState", XMLHttpRequest.DONE), self.dispatchEvent("readystatechange"), _upload_complete_flag = !0, self.dispatchEvent(e), loadEnd()
					}), runtime.exec.call(_xhr, "XMLHttpRequest", "send", {
						url: _url,
						method: _method,
						async: _async,
						user: _user,
						password: _password,
						headers: _headers,
						mimeType: _mimeType,
						encoding: _encoding,
						responseType: self.responseType,
						withCredentials: self.withCredentials,
						options: _options
					}, data)
				}
				var self = this;
				_start_time = (new Date).getTime(), _xhr = new RuntimeTarget, "string" == typeof _options.required_caps && (_options.required_caps = Runtime.parseCaps(_options.required_caps)), _options.required_caps = Basic.extend({}, _options.required_caps, {
					return_response_type: self.responseType
				}), data instanceof FormData && (_options.required_caps.send_multipart = !0), Basic.isEmptyObj(_headers) || (_options.required_caps.send_custom_headers = !0), _same_origin_flag || (_options.required_caps.do_cors = !0), _options.ruid ? exec(_xhr.connectRuntime(_options)) : (_xhr.bind("RuntimeInit", function(e, runtime) {
					exec(runtime)
				}), _xhr.bind("RuntimeError", function(e, err) {
					self.dispatchEvent("RuntimeError", err)
				}), _xhr.connectRuntime(_options))
			}
			function _reset() {
				_p("responseText", ""), _p("responseXML", null), _p("response", null), _p("status", 0), _p("statusText", ""), _start_time = _timeoutset_time = null
			}
			var _url, _method, _user, _password, _start_time, _timeoutset_time, _xhr, _responseHeadersBag, self = this,
				props = {
					timeout: 0,
					readyState: XMLHttpRequest.UNSENT,
					withCredentials: !1,
					status: 0,
					statusText: "",
					responseType: "",
					responseXML: null,
					responseText: null,
					response: null
				},
				_async = !0,
				_headers = {},
				_encoding = null,
				_mimeType = null,
				_sync_flag = !1,
				_send_flag = !1,
				_upload_events_flag = !1,
				_upload_complete_flag = !1,
				_error_flag = !1,
				_same_origin_flag = !1,
				_finalMime = null,
				_finalCharset = null,
				_options = {},
				_responseHeaders = "";
			Basic.extend(this, props, {
				uid: Basic.guid("uid_"),
				upload: new XMLHttpRequestUpload,
				open: function(method, url, async, user, password) {
					var urlp;
					if (!method || !url) throw new x.DOMException(x.DOMException.SYNTAX_ERR);
					if (/[\u0100-\uffff]/.test(method) || Encode.utf8_encode(method) !== method) throw new x.DOMException(x.DOMException.SYNTAX_ERR);
					if (~Basic.inArray(method.toUpperCase(), ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT", "TRACE", "TRACK"]) && (_method = method.toUpperCase()), ~Basic.inArray(_method, ["CONNECT", "TRACE", "TRACK"])) throw new x.DOMException(x.DOMException.SECURITY_ERR);
					if (url = Encode.utf8_encode(url), urlp = Url.parseUrl(url), _same_origin_flag = Url.hasSameOrigin(urlp), _url = Url.resolveUrl(url), (user || password) && !_same_origin_flag) throw new x.DOMException(x.DOMException.INVALID_ACCESS_ERR);
					if (_user = user || urlp.user, _password = password || urlp.pass, _async = async || !0, _async === !1 && (_p("timeout") || _p("withCredentials") || "" !== _p("responseType"))) throw new x.DOMException(x.DOMException.INVALID_ACCESS_ERR);
					_sync_flag = !_async, _send_flag = !1, _headers = {}, _reset.call(this), _p("readyState", XMLHttpRequest.OPENED), this.dispatchEvent("readystatechange")
				},
				setRequestHeader: function(header, value) {
					var uaHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
					if (_p("readyState") !== XMLHttpRequest.OPENED || _send_flag) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					if (/[\u0100-\uffff]/.test(header) || Encode.utf8_encode(header) !== header) throw new x.DOMException(x.DOMException.SYNTAX_ERR);
					return header = Basic.trim(header).toLowerCase(), ~Basic.inArray(header, uaHeaders) || /^(proxy\-|sec\-)/.test(header) ? !1 : (_headers[header] ? _headers[header] += ", " + value : _headers[header] = value, !0)
				},
				getAllResponseHeaders: function() {
					return _responseHeaders || ""
				},
				getResponseHeader: function(header) {
					return header = header.toLowerCase(), _error_flag || ~Basic.inArray(header, ["set-cookie", "set-cookie2"]) ? null : _responseHeaders && "" !== _responseHeaders && (_responseHeadersBag || (_responseHeadersBag = {}, Basic.each(_responseHeaders.split(/\r\n/), function(line) {
						var pair = line.split(/:\s+/);
						2 === pair.length && (pair[0] = Basic.trim(pair[0]), _responseHeadersBag[pair[0].toLowerCase()] = {
							header: pair[0],
							value: Basic.trim(pair[1])
						})
					})), _responseHeadersBag.hasOwnProperty(header)) ? _responseHeadersBag[header].header + ": " + _responseHeadersBag[header].value : null
				},
				overrideMimeType: function(mime) {
					var matches, charset;
					if (~Basic.inArray(_p("readyState"), [XMLHttpRequest.LOADING, XMLHttpRequest.DONE])) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					if (mime = Basic.trim(mime.toLowerCase()), /;/.test(mime) && (matches = mime.match(/^([^;]+)(?:;\scharset\=)?(.*)$/)) && (mime = matches[1], matches[2] && (charset = matches[2])), !Mime.mimes[mime]) throw new x.DOMException(x.DOMException.SYNTAX_ERR);
					_finalMime = mime, _finalCharset = charset
				},
				send: function(data, options) {
					if (_options = "string" === Basic.typeOf(options) ? {
						ruid: options
					} : options ? options : {}, this.readyState !== XMLHttpRequest.OPENED || _send_flag) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					if (data instanceof Blob) _options.ruid = data.ruid, _mimeType = data.type || "application/octet-stream";
					else if (data instanceof FormData) {
						if (data.hasBlob()) {
							var blob = data.getBlob();
							_options.ruid = blob.ruid, _mimeType = blob.type || "application/octet-stream"
						}
					} else "string" == typeof data && (_encoding = "UTF-8", _mimeType = "text/plain;charset=UTF-8", data = Encode.utf8_encode(data));
					this.withCredentials || (this.withCredentials = _options.required_caps && _options.required_caps.send_browser_cookies && !_same_origin_flag), _upload_events_flag = !_sync_flag && this.upload.hasEventListener(), _error_flag = !1, _upload_complete_flag = !data, _sync_flag || (_send_flag = !0), _doXHR.call(this, data)
				},
				abort: function() {
					if (_error_flag = !0, _sync_flag = !1, ~Basic.inArray(_p("readyState"), [XMLHttpRequest.UNSENT, XMLHttpRequest.OPENED, XMLHttpRequest.DONE])) _p("readyState", XMLHttpRequest.UNSENT);
					else {
						if (_p("readyState", XMLHttpRequest.DONE), _send_flag = !1, !_xhr) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
						_xhr.getRuntime().exec.call(_xhr, "XMLHttpRequest", "abort", _upload_complete_flag), _upload_complete_flag = !0
					}
				},
				destroy: function() {
					_xhr && ("function" === Basic.typeOf(_xhr.destroy) && _xhr.destroy(), _xhr = null), this.unbindAll(), this.upload && (this.upload.unbindAll(), this.upload = null)
				}
			}), this.handleEventProps(dispatches.concat(["readystatechange"])), this.upload.handleEventProps(dispatches)
		}
		var httpCode = {
			100: "Continue",
			101: "Switching Protocols",
			102: "Processing",
			200: "OK",
			201: "Created",
			202: "Accepted",
			203: "Non-Authoritative Information",
			204: "No Content",
			205: "Reset Content",
			206: "Partial Content",
			207: "Multi-Status",
			226: "IM Used",
			300: "Multiple Choices",
			301: "Moved Permanently",
			302: "Found",
			303: "See Other",
			304: "Not Modified",
			305: "Use Proxy",
			306: "Reserved",
			307: "Temporary Redirect",
			400: "Bad Request",
			401: "Unauthorized",
			402: "Payment Required",
			403: "Forbidden",
			404: "Not Found",
			405: "Method Not Allowed",
			406: "Not Acceptable",
			407: "Proxy Authentication Required",
			408: "Request Timeout",
			409: "Conflict",
			410: "Gone",
			411: "Length Required",
			412: "Precondition Failed",
			413: "Request Entity Too Large",
			414: "Request-URI Too Long",
			415: "Unsupported Media Type",
			416: "Requested Range Not Satisfiable",
			417: "Expectation Failed",
			422: "Unprocessable Entity",
			423: "Locked",
			424: "Failed Dependency",
			426: "Upgrade Required",
			500: "Internal Server Error",
			501: "Not Implemented",
			502: "Bad Gateway",
			503: "Service Unavailable",
			504: "Gateway Timeout",
			505: "HTTP Version Not Supported",
			506: "Variant Also Negotiates",
			507: "Insufficient Storage",
			510: "Not Extended"
		};
		XMLHttpRequestUpload.prototype = EventTarget.instance;
		var dispatches = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];
		return XMLHttpRequest.UNSENT = 0, XMLHttpRequest.OPENED = 1, XMLHttpRequest.HEADERS_RECEIVED = 2, XMLHttpRequest.LOADING = 3, XMLHttpRequest.DONE = 4, XMLHttpRequest.prototype = EventTarget.instance, XMLHttpRequest
	}), define("moxie/runtime/Transporter", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function(Basic, Encode, RuntimeClient, EventTarget) {
		function Transporter() {
			function _reset() {
				_size = _pos = 0, _data = this.result = null
			}
			function _run(type, runtime) {
				var self = this;
				_runtime = runtime, self.bind("TransportingProgress", function(e) {
					_pos = e.loaded, _size > _pos && -1 === Basic.inArray(self.state, [Transporter.IDLE, Transporter.DONE]) && _transport.call(self)
				}, 999), self.bind("TransportingComplete", function() {
					_pos = _size, self.state = Transporter.DONE, _data = null, self.result = _runtime.exec.call(self, "Transporter", "getAsBlob", type || "")
				}, 999), self.state = Transporter.BUSY, self.trigger("TransportingStarted"), _transport.call(self)
			}
			function _transport() {
				var chunk, self = this,
					bytesLeft = _size - _pos;
				_chunk_size > bytesLeft && (_chunk_size = bytesLeft), chunk = Encode.btoa(_data.substr(_pos, _chunk_size)), _runtime.exec.call(self, "Transporter", "receive", chunk, _size)
			}
			var mod, _runtime, _data, _size, _pos, _chunk_size;
			RuntimeClient.call(this), Basic.extend(this, {
				uid: Basic.guid("uid_"),
				state: Transporter.IDLE,
				result: null,
				transport: function(data, type, options) {
					var self = this;
					if (options = Basic.extend({
						chunk_size: 204798
					}, options), (mod = options.chunk_size % 3) && (options.chunk_size += 3 - mod), _chunk_size = options.chunk_size, _reset.call(this), _data = data, _size = data.length, "string" === Basic.typeOf(options) || options.ruid) _run.call(self, type, this.connectRuntime(options));
					else {
						var cb = function(e, runtime) {
								self.unbind("RuntimeInit", cb), _run.call(self, type, runtime)
							};
						this.bind("RuntimeInit", cb), this.connectRuntime(options)
					}
				},
				abort: function() {
					var self = this;
					self.state = Transporter.IDLE, _runtime && (_runtime.exec.call(self, "Transporter", "clear"), self.trigger("TransportingAborted")), _reset.call(self)
				},
				destroy: function() {
					this.unbindAll(), _runtime = null, this.disconnectRuntime(), _reset.call(this)
				}
			})
		}
		return Transporter.IDLE = 0, Transporter.BUSY = 1, Transporter.DONE = 2, Transporter.prototype = EventTarget.instance, Transporter
	}), define("moxie/image/Image", ["moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/file/FileReaderSync", "moxie/xhr/XMLHttpRequest", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/runtime/Transporter", "moxie/core/utils/Env", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/file/File", "moxie/core/utils/Encode"], function(Basic, Dom, x, FileReaderSync, XMLHttpRequest, Runtime, RuntimeClient, Transporter, Env, EventTarget, Blob, File, Encode) {
		function Image() {
			function _updateInfo(info) {
				info || (info = this.exec("Image", "getInfo")), this.size = info.size, this.width = info.width, this.height = info.height, this.type = info.type, this.meta = info.meta, "" === this.name && (this.name = info.name)
			}
			function _load(src) {
				var srcType = Basic.typeOf(src);
				try {
					if (src instanceof Image) {
						if (!src.size) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
						_loadFromImage.apply(this, arguments)
					} else if (src instanceof Blob) {
						if (!~Basic.inArray(src.type, ["image/jpeg", "image/png"])) throw new x.ImageError(x.ImageError.WRONG_FORMAT);
						_loadFromBlob.apply(this, arguments)
					} else if (-1 !== Basic.inArray(srcType, ["blob", "file"])) _load.call(this, new File(null, src), arguments[1]);
					else if ("string" === srcType)"data:" === src.substr(0, 5) ? _load.call(this, new Blob(null, {
						data: src
					}), arguments[1]) : _loadFromUrl.apply(this, arguments);
					else {
						if ("node" !== srcType || "img" !== src.nodeName.toLowerCase()) throw new x.DOMException(x.DOMException.TYPE_MISMATCH_ERR);
						_load.call(this, src.src, arguments[1])
					}
				} catch (ex) {
					this.trigger("error", ex.code)
				}
			}
			function _loadFromImage(img, exact) {
				var runtime = this.connectRuntime(img.ruid);
				this.ruid = runtime.uid, runtime.exec.call(this, "Image", "loadFromImage", img, "undefined" === Basic.typeOf(exact) ? !0 : exact)
			}
			function _loadFromBlob(blob, options) {
				function exec(runtime) {
					self.ruid = runtime.uid, runtime.exec.call(self, "Image", "loadFromBlob", blob)
				}
				var self = this;
				self.name = blob.name || "", blob.isDetached() ? (this.bind("RuntimeInit", function(e, runtime) {
					exec(runtime)
				}), options && "string" == typeof options.required_caps && (options.required_caps = Runtime.parseCaps(options.required_caps)), this.connectRuntime(Basic.extend({
					required_caps: {
						access_image_binary: !0,
						resize_image: !0
					}
				}, options))) : exec(this.connectRuntime(blob.ruid))
			}
			function _loadFromUrl(url, options) {
				var xhr, self = this;
				xhr = new XMLHttpRequest, xhr.open("get", url), xhr.responseType = "blob", xhr.onprogress = function(e) {
					self.trigger(e)
				}, xhr.onload = function() {
					_loadFromBlob.call(self, xhr.response, !0)
				}, xhr.onerror = function(e) {
					self.trigger(e)
				}, xhr.onloadend = function() {
					xhr.destroy()
				}, xhr.bind("RuntimeError", function(e, err) {
					self.trigger("RuntimeError", err)
				}), xhr.send(null, options)
			}
			RuntimeClient.call(this), Basic.extend(this, {
				uid: Basic.guid("uid_"),
				ruid: null,
				name: "",
				size: 0,
				width: 0,
				height: 0,
				type: "",
				meta: {},
				clone: function() {
					this.load.apply(this, arguments)
				},
				load: function() {
					_load.apply(this, arguments)
				},
				downsize: function(opts) {
					var defaults = {
						width: this.width,
						height: this.height,
						type: this.type || "image/jpeg",
						quality: 90,
						crop: !1,
						preserveHeaders: !0,
						resample: !1
					};
					opts = "object" == typeof opts ? Basic.extend(defaults, opts) : Basic.extend(defaults, {
						width: arguments[0],
						height: arguments[1],
						crop: arguments[2],
						preserveHeaders: arguments[3]
					});
					try {
						if (!this.size) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
						if (this.width > Image.MAX_RESIZE_WIDTH || this.height > Image.MAX_RESIZE_HEIGHT) throw new x.ImageError(x.ImageError.MAX_RESOLUTION_ERR);
						this.exec("Image", "downsize", opts.width, opts.height, opts.crop, opts.preserveHeaders)
					} catch (ex) {
						this.trigger("error", ex.code)
					}
				},
				crop: function(width, height, preserveHeaders) {
					this.downsize(width, height, !0, preserveHeaders)
				},
				getAsCanvas: function() {
					if (!Env.can("create_canvas")) throw new x.RuntimeError(x.RuntimeError.NOT_SUPPORTED_ERR);
					var runtime = this.connectRuntime(this.ruid);
					return runtime.exec.call(this, "Image", "getAsCanvas")
				},
				getAsBlob: function(type, quality) {
					if (!this.size) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					return this.exec("Image", "getAsBlob", type || "image/jpeg", quality || 90)
				},
				getAsDataURL: function(type, quality) {
					if (!this.size) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					return this.exec("Image", "getAsDataURL", type || "image/jpeg", quality || 90)
				},
				getAsBinaryString: function(type, quality) {
					var dataUrl = this.getAsDataURL(type, quality);
					return Encode.atob(dataUrl.substring(dataUrl.indexOf("base64,") + 7))
				},
				embed: function(el, opts) {
					function render(type, quality) {
						var img = this;
						if (Env.can("create_canvas")) {
							var canvas = img.getAsCanvas();
							if (canvas) return el.appendChild(canvas), canvas = null, img.destroy(), void self.trigger("embedded")
						}
						var dataUrl = img.getAsDataURL(type, quality);
						if (!dataUrl) throw new x.ImageError(x.ImageError.WRONG_FORMAT);
						if (Env.can("use_data_uri_of", dataUrl.length)) el.innerHTML = '<img src="' + dataUrl + '" width="' + img.width + '" height="' + img.height + '" />', img.destroy(), self.trigger("embedded");
						else {
							var tr = new Transporter;
							tr.bind("TransportingComplete", function() {
								runtime = self.connectRuntime(this.result.ruid), self.bind("Embedded", function() {
									Basic.extend(runtime.getShimContainer().style, {
										top: "0px",
										left: "0px",
										width: img.width + "px",
										height: img.height + "px"
									}), runtime = null
								}, 999), runtime.exec.call(self, "ImageView", "display", this.result.uid, width, height), img.destroy()
							}), tr.transport(Encode.atob(dataUrl.substring(dataUrl.indexOf("base64,") + 7)), type, {
								required_caps: {
									display_media: !0
								},
								runtime_order: "flash,silverlight",
								container: el
							})
						}
					}
					var runtime, self = this;
					opts = Basic.extend({
						width: this.width,
						height: this.height,
						type: this.type || "image/jpeg",
						quality: 90
					}, opts || {});
					try {
						if (!(el = Dom.get(el))) throw new x.DOMException(x.DOMException.INVALID_NODE_TYPE_ERR);
						if (!this.size) throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
						this.width > Image.MAX_RESIZE_WIDTH || this.height > Image.MAX_RESIZE_HEIGHT;
						var imgCopy = new Image;
						return imgCopy.bind("Resize", function() {
							render.call(this, opts.type, opts.quality)
						}), imgCopy.bind("Load", function() {
							imgCopy.downsize(opts)
						}), this.meta.thumb && this.meta.thumb.width >= opts.width && this.meta.thumb.height >= opts.height ? imgCopy.load(this.meta.thumb.data) : imgCopy.clone(this, !1), imgCopy
					} catch (ex) {
						this.trigger("error", ex.code)
					}
				},
				destroy: function() {
					this.ruid && (this.getRuntime().exec.call(this, "Image", "destroy"), this.disconnectRuntime()), this.unbindAll()
				}
			}), this.handleEventProps(dispatches), this.bind("Load Resize", function() {
				_updateInfo.call(this)
			}, 999)
		}
		var dispatches = ["progress", "load", "error", "resize", "embedded"];
		return Image.MAX_RESIZE_WIDTH = 8192, Image.MAX_RESIZE_HEIGHT = 8192, Image.prototype = EventTarget.instance, Image
	}), define("moxie/runtime/html5/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function(Basic, x, Runtime, Env) {
		function Html5Runtime(options) {
			var I = this,
				Test = Runtime.capTest,
				True = Runtime.capTrue,
				caps = Basic.extend({
					access_binary: Test(window.FileReader || window.File && window.File.getAsDataURL),
					access_image_binary: function() {
						return I.can("access_binary") && !! extensions.Image
					},
					display_media: Test(Env.can("create_canvas") || Env.can("use_data_uri_over32kb")),
					do_cors: Test(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
					drag_and_drop: Test(function() {
						var div = document.createElement("div");
						return ("draggable" in div || "ondragstart" in div && "ondrop" in div) && ("IE" !== Env.browser || Env.verComp(Env.version, 9, ">"))
					}()),
					filter_by_extension: Test(function() {
						return "Chrome" === Env.browser && Env.verComp(Env.version, 28, ">=") || "IE" === Env.browser && Env.verComp(Env.version, 10, ">=") || "Safari" === Env.browser && Env.verComp(Env.version, 7, ">=")
					}()),
					return_response_headers: True,
					return_response_type: function(responseType) {
						return "json" === responseType && window.JSON ? !0 : Env.can("return_response_type", responseType)
					},
					return_status_code: True,
					report_upload_progress: Test(window.XMLHttpRequest && (new XMLHttpRequest).upload),
					resize_image: function() {
						return I.can("access_binary") && Env.can("create_canvas")
					},
					select_file: function() {
						return Env.can("use_fileinput") && window.File
					},
					select_folder: function() {
						return I.can("select_file") && "Chrome" === Env.browser && Env.verComp(Env.version, 21, ">=")
					},
					select_multiple: function() {
						return I.can("select_file") && !("Safari" === Env.browser && "Windows" === Env.os) && !("iOS" === Env.os && Env.verComp(Env.osVersion, "7.0.0", ">") && Env.verComp(Env.osVersion, "8.0.0", "<"))
					},
					send_binary_string: Test(window.XMLHttpRequest && ((new XMLHttpRequest).sendAsBinary || window.Uint8Array && window.ArrayBuffer)),
					send_custom_headers: Test(window.XMLHttpRequest),
					send_multipart: function() {
						return !!(window.XMLHttpRequest && (new XMLHttpRequest).upload && window.FormData) || I.can("send_binary_string")
					},
					slice_blob: Test(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
					stream_upload: function() {
						return I.can("slice_blob") && I.can("send_multipart")
					},
					summon_file_dialog: function() {
						return I.can("select_file") && ("Firefox" === Env.browser && Env.verComp(Env.version, 4, ">=") || "Opera" === Env.browser && Env.verComp(Env.version, 12, ">=") || "IE" === Env.browser && Env.verComp(Env.version, 10, ">=") || !! ~Basic.inArray(Env.browser, ["Chrome", "Safari"]))
					},
					upload_filesize: True
				}, arguments[2]);
			Runtime.call(this, options, arguments[1] || type, caps), Basic.extend(this, {
				init: function() {
					this.trigger("Init")
				},
				destroy: function(destroy) {
					return function() {
						destroy.call(I), destroy = I = null
					}
				}(this.destroy)
			}), Basic.extend(this.getShim(), extensions)
		}
		var type = "html5",
			extensions = {};
		return Runtime.addConstructor(type, Html5Runtime), extensions
	}), define("moxie/core/utils/Events", ["moxie/core/utils/Basic"], function(Basic) {
		function preventDefault() {
			this.returnValue = !1
		}
		function stopPropagation() {
			this.cancelBubble = !0
		}
		var eventhash = {},
			uid = "moxie_" + Basic.guid(),
			addEvent = function(obj, name, callback, key) {
				var func, events;
				name = name.toLowerCase(), obj.addEventListener ? (func = callback, obj.addEventListener(name, func, !1)) : obj.attachEvent && (func = function() {
					var evt = window.event;
					evt.target || (evt.target = evt.srcElement), evt.preventDefault = preventDefault, evt.stopPropagation = stopPropagation, callback(evt)
				}, obj.attachEvent("on" + name, func)), obj[uid] || (obj[uid] = Basic.guid()), eventhash.hasOwnProperty(obj[uid]) || (eventhash[obj[uid]] = {}), events = eventhash[obj[uid]], events.hasOwnProperty(name) || (events[name] = []), events[name].push({
					func: func,
					orig: callback,
					key: key
				})
			},
			removeEvent = function(obj, name, callback) {
				var type, undef;
				if (name = name.toLowerCase(), obj[uid] && eventhash[obj[uid]] && eventhash[obj[uid]][name]) {
					type = eventhash[obj[uid]][name];
					for (var i = type.length - 1; i >= 0 && (type[i].orig !== callback && type[i].key !== callback || (obj.removeEventListener ? obj.removeEventListener(name, type[i].func, !1) : obj.detachEvent && obj.detachEvent("on" + name, type[i].func), type[i].orig = null, type[i].func = null, type.splice(i, 1), callback === undef)); i--);
					if (type.length || delete eventhash[obj[uid]][name], Basic.isEmptyObj(eventhash[obj[uid]])) {
						delete eventhash[obj[uid]];
						try {
							delete obj[uid]
						} catch (e) {
							obj[uid] = undef
						}
					}
				}
			},
			removeAllEvents = function(obj, key) {
				obj && obj[uid] && Basic.each(eventhash[obj[uid]], function(events, name) {
					removeEvent(obj, name, key)
				})
			};
		return {
			addEvent: addEvent,
			removeEvent: removeEvent,
			removeAllEvents: removeAllEvents
		}
	}), define("moxie/runtime/html5/file/FileInput", ["moxie/runtime/html5/Runtime", "moxie/file/File", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function(extensions, File, Basic, Dom, Events, Mime, Env) {
		function FileInput() {
			var _options;
			Basic.extend(this, {
				init: function(options) {
					var input, shimContainer, mimes, browseButton, zIndex, top, comp = this,
						I = comp.getRuntime();
					_options = options, mimes = _options.accept.mimes || Mime.extList2mimes(_options.accept, I.can("filter_by_extension")), shimContainer = I.getShimContainer(), shimContainer.innerHTML = '<input id="' + I.uid + '" type="file" style="font-size:999px;opacity:0;"' + (_options.multiple && I.can("select_multiple") ? "multiple" : "") + (_options.directory && I.can("select_folder") ? "webkitdirectory directory" : "") + (mimes ? ' accept="' + mimes.join(",") + '"' : "") + " />", input = Dom.get(I.uid), Basic.extend(input.style, {
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%"
					}), browseButton = Dom.get(_options.browse_button), I.can("summon_file_dialog") && ("static" === Dom.getStyle(browseButton, "position") && (browseButton.style.position = "relative"), zIndex = parseInt(Dom.getStyle(browseButton, "z-index"), 10) || 1, browseButton.style.zIndex = zIndex, shimContainer.style.zIndex = zIndex - 1, Events.addEvent(browseButton, "click", function(e) {
						var input = Dom.get(I.uid);
						input && !input.disabled && input.click(), e.preventDefault()
					}, comp.uid)), top = I.can("summon_file_dialog") ? browseButton : shimContainer, Events.addEvent(top, "mouseover", function() {
						comp.trigger("mouseenter")
					}, comp.uid), Events.addEvent(top, "mouseout", function() {
						comp.trigger("mouseleave")
					}, comp.uid), Events.addEvent(top, "mousedown", function() {
						comp.trigger("mousedown")
					}, comp.uid), Events.addEvent(Dom.get(_options.container), "mouseup", function() {
						comp.trigger("mouseup")
					}, comp.uid), input.onchange = function onChange(e) {
						if (comp.files = [], Basic.each(this.files, function(file) {
							var relativePath = "";
							return _options.directory && "." == file.name ? !0 : (file.webkitRelativePath && (relativePath = "/" + file.webkitRelativePath.replace(/^\//, "")), file = new File(I.uid, file), file.relativePath = relativePath, void comp.files.push(file))
						}), "IE" !== Env.browser && "IEMobile" !== Env.browser) this.value = "";
						else {
							var clone = this.cloneNode(!0);
							this.parentNode.replaceChild(clone, this), clone.onchange = onChange
						}
						comp.files.length && comp.trigger("change")
					}, comp.trigger({
						type: "ready",
						async: !0
					}), shimContainer = null
				},
				disable: function(state) {
					var input, I = this.getRuntime();
					(input = Dom.get(I.uid)) && (input.disabled = !! state)
				},
				destroy: function() {
					var I = this.getRuntime(),
						shim = I.getShim(),
						shimContainer = I.getShimContainer();
					Events.removeAllEvents(shimContainer, this.uid), Events.removeAllEvents(_options && Dom.get(_options.container), this.uid), Events.removeAllEvents(_options && Dom.get(_options.browse_button), this.uid), shimContainer && (shimContainer.innerHTML = ""), shim.removeInstance(this.uid), _options = shimContainer = shim = null
				}
			})
		}
		return extensions.FileInput = FileInput
	}), define("moxie/runtime/html5/file/Blob", ["moxie/runtime/html5/Runtime", "moxie/file/Blob"], function(extensions, Blob) {
		function HTML5Blob() {
			function w3cBlobSlice(blob, start, end) {
				var blobSlice;
				if (!window.File.prototype.slice) return (blobSlice = window.File.prototype.webkitSlice || window.File.prototype.mozSlice) ? blobSlice.call(blob, start, end) : null;
				try {
					return blob.slice(), blob.slice(start, end)
				} catch (e) {
					return blob.slice(start, end - start)
				}
			}
			this.slice = function() {
				return new Blob(this.getRuntime().uid, w3cBlobSlice.apply(this, arguments))
			}
		}
		return extensions.Blob = HTML5Blob
	}), define("moxie/runtime/html5/file/FileDrop", ["moxie/runtime/html5/Runtime", "moxie/file/File", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime"], function(extensions, File, Basic, Dom, Events, Mime) {
		function FileDrop() {
			function _hasFiles(e) {
				if (!e.dataTransfer || !e.dataTransfer.types) return !1;
				var types = Basic.toArray(e.dataTransfer.types || []);
				return -1 !== Basic.inArray("Files", types) || -1 !== Basic.inArray("public.file-url", types) || -1 !== Basic.inArray("application/x-moz-file", types)
			}
			function _addFile(file, relativePath) {
				if (_isAcceptable(file)) {
					var fileObj = new File(_ruid, file);
					fileObj.relativePath = relativePath || "", _files.push(fileObj)
				}
			}
			function _extractExts(accept) {
				for (var exts = [], i = 0; i < accept.length; i++)[].push.apply(exts, accept[i].extensions.split(/\s*,\s*/));
				return -1 === Basic.inArray("*", exts) ? exts : []
			}
			function _isAcceptable(file) {
				if (!_allowedExts.length) return !0;
				var ext = Mime.getFileExtension(file.name);
				return !ext || -1 !== Basic.inArray(ext, _allowedExts)
			}
			function _readItems(items, cb) {
				var entries = [];
				Basic.each(items, function(item) {
					var entry = item.webkitGetAsEntry();
					entry && (entry.isFile ? _addFile(item.getAsFile(), entry.fullPath) : entries.push(entry))
				}), entries.length ? _readEntries(entries, cb) : cb()
			}
			function _readEntries(entries, cb) {
				var queue = [];
				Basic.each(entries, function(entry) {
					queue.push(function(cbcb) {
						_readEntry(entry, cbcb)
					})
				}), Basic.inSeries(queue, function() {
					cb()
				})
			}
			function _readEntry(entry, cb) {
				entry.isFile ? entry.file(function(file) {
					_addFile(file, entry.fullPath), cb()
				}, function() {
					cb()
				}) : entry.isDirectory ? _readDirEntry(entry, cb) : cb()
			}
			function _readDirEntry(dirEntry, cb) {
				function getEntries(cbcb) {
					dirReader.readEntries(function(moreEntries) {
						moreEntries.length ? ([].push.apply(entries, moreEntries), getEntries(cbcb)) : cbcb()
					}, cbcb)
				}
				var entries = [],
					dirReader = dirEntry.createReader();
				getEntries(function() {
					_readEntries(entries, cb)
				})
			}
			var _options, _ruid, _files = [],
				_allowedExts = [];
			Basic.extend(this, {
				init: function(options) {
					var dropZone, comp = this;
					_options = options, _ruid = comp.ruid, _allowedExts = _extractExts(_options.accept), dropZone = _options.container, Events.addEvent(dropZone, "dragover", function(e) {
						_hasFiles(e) && (e.preventDefault(), e.dataTransfer.dropEffect = "copy")
					}, comp.uid), Events.addEvent(dropZone, "drop", function(e) {
						_hasFiles(e) && (e.preventDefault(), _files = [], e.dataTransfer.items && e.dataTransfer.items[0].webkitGetAsEntry ? _readItems(e.dataTransfer.items, function() {
							comp.files = _files, comp.trigger("drop")
						}) : (Basic.each(e.dataTransfer.files, function(file) {
							_addFile(file)
						}), comp.files = _files, comp.trigger("drop")))
					}, comp.uid), Events.addEvent(dropZone, "dragenter", function(e) {
						comp.trigger("dragenter")
					}, comp.uid), Events.addEvent(dropZone, "dragleave", function(e) {
						comp.trigger("dragleave")
					}, comp.uid)
				},
				destroy: function() {
					Events.removeAllEvents(_options && Dom.get(_options.container), this.uid), _ruid = _files = _allowedExts = _options = null
				}
			})
		}
		return extensions.FileDrop = FileDrop
	}), define("moxie/runtime/html5/file/FileReader", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Encode", "moxie/core/utils/Basic"], function(extensions, Encode, Basic) {
		function FileReader() {
			function _toBinary(str) {
				return Encode.atob(str.substring(str.indexOf("base64,") + 7))
			}
			var _fr, _convertToBinary = !1;
			Basic.extend(this, {
				read: function(op, blob) {
					var comp = this;
					comp.result = "", _fr = new window.FileReader, _fr.addEventListener("progress", function(e) {
						comp.trigger(e)
					}), _fr.addEventListener("load", function(e) {
						comp.result = _convertToBinary ? _toBinary(_fr.result) : _fr.result, comp.trigger(e)
					}), _fr.addEventListener("error", function(e) {
						comp.trigger(e, _fr.error)
					}), _fr.addEventListener("loadend", function(e) {
						_fr = null, comp.trigger(e)
					}), "function" === Basic.typeOf(_fr[op]) ? (_convertToBinary = !1, _fr[op](blob.getSource())) : "readAsBinaryString" === op && (_convertToBinary = !0, _fr.readAsDataURL(blob.getSource()))
				},
				abort: function() {
					_fr && _fr.abort()
				},
				destroy: function() {
					_fr = null
				}
			})
		}
		return extensions.FileReader = FileReader
	}), define("moxie/runtime/html5/xhr/XMLHttpRequest", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/core/utils/Url", "moxie/file/File", "moxie/file/Blob", "moxie/xhr/FormData", "moxie/core/Exceptions", "moxie/core/utils/Env"], function(extensions, Basic, Mime, Url, File, Blob, FormData, x, Env) {
		function XMLHttpRequest() {
			function _preloadAndSend(meta, data) {
				var blob, fr, target = this;
				blob = data.getBlob().getSource(), fr = new window.FileReader, fr.onload = function() {
					data.append(data.getBlobName(), new Blob(null, {
						type: blob.type,
						data: fr.result
					})), self.send.call(target, meta, data)
				}, fr.readAsBinaryString(blob)
			}
			function _getNativeXHR() {
				return !window.XMLHttpRequest || "IE" === Env.browser && Env.verComp(Env.version, 8, "<") ?
				function() {
					for (var progIDs = ["Msxml2.XMLHTTP.6.0", "Microsoft.XMLHTTP"], i = 0; i < progIDs.length; i++) try {
						return new ActiveXObject(progIDs[i])
					} catch (ex) {}
				}() : new window.XMLHttpRequest
			}
			function _getDocument(xhr) {
				var rXML = xhr.responseXML,
					rText = xhr.responseText;
				return "IE" === Env.browser && rText && rXML && !rXML.documentElement && /[^\/]+\/[^\+]+\+xml/.test(xhr.getResponseHeader("Content-Type")) && (rXML = new window.ActiveXObject("Microsoft.XMLDOM"), rXML.async = !1, rXML.validateOnParse = !1, rXML.loadXML(rText)), rXML && ("IE" === Env.browser && 0 !== rXML.parseError || !rXML.documentElement || "parsererror" === rXML.documentElement.tagName) ? null : rXML
			}
			function _prepareMultipart(fd) {
				var boundary = "----moxieboundary" + (new Date).getTime(),
					dashdash = "--",
					crlf = "\r\n",
					multipart = "",
					I = this.getRuntime();
				if (!I.can("send_binary_string")) throw new x.RuntimeError(x.RuntimeError.NOT_SUPPORTED_ERR);
				return _xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary), fd.each(function(value, name) {
					multipart += value instanceof Blob ? dashdash + boundary + crlf + 'Content-Disposition: form-data; name="' + name + '"; filename="' + unescape(encodeURIComponent(value.name || "blob")) + '"' + crlf + "Content-Type: " + (value.type || "application/octet-stream") + crlf + crlf + value.getSource() + crlf : dashdash + boundary + crlf + 'Content-Disposition: form-data; name="' + name + '"' + crlf + crlf + unescape(encodeURIComponent(value)) + crlf
				}), multipart += dashdash + boundary + dashdash + crlf
			}
			var _xhr, _filename, self = this;
			Basic.extend(this, {
				send: function(meta, data) {
					var target = this,
						isGecko2_5_6 = "Mozilla" === Env.browser && Env.verComp(Env.version, 4, ">=") && Env.verComp(Env.version, 7, "<"),
						isAndroidBrowser = "Android Browser" === Env.browser,
						mustSendAsBinary = !1;
					if (_filename = meta.url.replace(/^.+?\/([\w\-\.]+)$/, "$1").toLowerCase(), _xhr = _getNativeXHR(), _xhr.open(meta.method, meta.url, meta.async, meta.user, meta.password), data instanceof Blob) data.isDetached() && (mustSendAsBinary = !0), data = data.getSource();
					else if (data instanceof FormData) {
						if (data.hasBlob()) if (data.getBlob().isDetached()) data = _prepareMultipart.call(target, data), mustSendAsBinary = !0;
						else if ((isGecko2_5_6 || isAndroidBrowser) && "blob" === Basic.typeOf(data.getBlob().getSource()) && window.FileReader) return void _preloadAndSend.call(target, meta, data);
						if (data instanceof FormData) {
							var fd = new window.FormData;
							data.each(function(value, name) {
								value instanceof Blob ? fd.append(name, value.getSource()) : fd.append(name, value)
							}), data = fd
						}
					}
					_xhr.upload ? (meta.withCredentials && (_xhr.withCredentials = !0), _xhr.addEventListener("load", function(e) {
						target.trigger(e)
					}), _xhr.addEventListener("error", function(e) {
						target.trigger(e)
					}), _xhr.addEventListener("progress", function(e) {
						target.trigger(e)
					}), _xhr.upload.addEventListener("progress", function(e) {
						target.trigger({
							type: "UploadProgress",
							loaded: e.loaded,
							total: e.total
						})
					})) : _xhr.onreadystatechange = function() {
						switch (_xhr.readyState) {
						case 1:
							break;
						case 2:
							break;
						case 3:
							var total, loaded;
							try {
								Url.hasSameOrigin(meta.url) && (total = _xhr.getResponseHeader("Content-Length") || 0), _xhr.responseText && (loaded = _xhr.responseText.length)
							} catch (ex) {
								total = loaded = 0
							}
							target.trigger({
								type: "progress",
								lengthComputable: !! total,
								total: parseInt(total, 10),
								loaded: loaded
							});
							break;
						case 4:
							_xhr.onreadystatechange = function() {}, 0 === _xhr.status ? target.trigger("error") : target.trigger("load")
						}
					}, Basic.isEmptyObj(meta.headers) || Basic.each(meta.headers, function(value, header) {
						_xhr.setRequestHeader(header, value)
					}), "" !== meta.responseType && "responseType" in _xhr && ("json" !== meta.responseType || Env.can("return_response_type", "json") ? _xhr.responseType = meta.responseType : _xhr.responseType = "text"), mustSendAsBinary ? _xhr.sendAsBinary ? _xhr.sendAsBinary(data) : !
					function() {
						for (var ui8a = new Uint8Array(data.length), i = 0; i < data.length; i++) ui8a[i] = 255 & data.charCodeAt(i);
						_xhr.send(ui8a.buffer)
					}() : _xhr.send(data), target.trigger("loadstart")
				},
				getStatus: function() {
					try {
						if (_xhr) return _xhr.status
					} catch (ex) {}
					return 0
				},
				getResponse: function(responseType) {
					var I = this.getRuntime();
					try {
						switch (responseType) {
						case "blob":
							var file = new File(I.uid, _xhr.response),
								disposition = _xhr.getResponseHeader("Content-Disposition");
							if (disposition) {
								var match = disposition.match(/filename=([\'\"'])([^\1]+)\1/);
								match && (_filename = match[2])
							}
							return file.name = _filename, file.type || (file.type = Mime.getFileMime(_filename)), file;
						case "json":
							return Env.can("return_response_type", "json") ? _xhr.response : 200 === _xhr.status && window.JSON ? JSON.parse(_xhr.responseText) : null;
						case "document":
							return _getDocument(_xhr);
						default:
							return "" !== _xhr.responseText ? _xhr.responseText : null
						}
					} catch (ex) {
						return null
					}
				},
				getAllResponseHeaders: function() {
					try {
						return _xhr.getAllResponseHeaders()
					} catch (ex) {}
					return ""
				},
				abort: function() {
					_xhr && _xhr.abort()
				},
				destroy: function() {
					self = _filename = null
				}
			})
		}
		return extensions.XMLHttpRequest = XMLHttpRequest
	}), define("moxie/runtime/html5/utils/BinaryReader", ["moxie/core/utils/Basic"], function(Basic) {
		function BinaryReader(data) {
			data instanceof ArrayBuffer ? ArrayBufferReader.apply(this, arguments) : UTF16StringReader.apply(this, arguments)
		}
		function ArrayBufferReader(data) {
			var _dv = new DataView(data);
			Basic.extend(this, {
				readByteAt: function(idx) {
					return _dv.getUint8(idx)
				},
				writeByteAt: function(idx, value) {
					_dv.setUint8(idx, value)
				},
				SEGMENT: function(idx, size, value) {
					switch (arguments.length) {
					case 2:
						return data.slice(idx, idx + size);
					case 1:
						return data.slice(idx);
					case 3:
						if (null === value && (value = new ArrayBuffer), value instanceof ArrayBuffer) {
							var arr = new Uint8Array(this.length() - size + value.byteLength);
							idx > 0 && arr.set(new Uint8Array(data.slice(0, idx)), 0), arr.set(new Uint8Array(value), idx), arr.set(new Uint8Array(data.slice(idx + size)), idx + value.byteLength), this.clear(), data = arr.buffer, _dv = new DataView(data);
							break
						}
					default:
						return data
					}
				},
				length: function() {
					return data ? data.byteLength : 0
				},
				clear: function() {
					_dv = data = null
				}
			})
		}
		function UTF16StringReader(data) {
			function putstr(segment, idx, length) {
				length = 3 === arguments.length ? length : data.length - idx - 1, data = data.substr(0, idx) + segment + data.substr(length + idx)
			}
			Basic.extend(this, {
				readByteAt: function(idx) {
					return data.charCodeAt(idx)
				},
				writeByteAt: function(idx, value) {
					putstr(String.fromCharCode(value), idx, 1)
				},
				SEGMENT: function(idx, length, segment) {
					switch (arguments.length) {
					case 1:
						return data.substr(idx);
					case 2:
						return data.substr(idx, length);
					case 3:
						putstr(null !== segment ? segment : "", idx, length);
						break;
					default:
						return data
					}
				},
				length: function() {
					return data ? data.length : 0
				},
				clear: function() {
					data = null
				}
			})
		}
		return Basic.extend(BinaryReader.prototype, {
			littleEndian: !1,
			read: function(idx, size) {
				var sum, mv, i;
				if (idx + size > this.length()) throw new Error("You are trying to read outside the source boundaries.");
				for (mv = this.littleEndian ? 0 : -8 * (size - 1), i = 0, sum = 0; size > i; i++) sum |= this.readByteAt(idx + i) << Math.abs(mv + 8 * i);
				return sum
			},
			write: function(idx, num, size) {
				var mv, i;
				if (idx > this.length()) throw new Error("You are trying to write outside the source boundaries.");
				for (mv = this.littleEndian ? 0 : -8 * (size - 1), i = 0; size > i; i++) this.writeByteAt(idx + i, num >> Math.abs(mv + 8 * i) & 255)
			},
			BYTE: function(idx) {
				return this.read(idx, 1)
			},
			SHORT: function(idx) {
				return this.read(idx, 2)
			},
			LONG: function(idx) {
				return this.read(idx, 4)
			},
			SLONG: function(idx) {
				var num = this.read(idx, 4);
				return num > 2147483647 ? num - 4294967296 : num
			},
			CHAR: function(idx) {
				return String.fromCharCode(this.read(idx, 1))
			},
			STRING: function(idx, count) {
				return this.asArray("CHAR", idx, count).join("")
			},
			asArray: function(type, idx, count) {
				for (var values = [], i = 0; count > i; i++) values[i] = this[type](idx + i);
				return values
			}
		}), BinaryReader
	}), define("moxie/runtime/html5/image/JPEGHeaders", ["moxie/runtime/html5/utils/BinaryReader", "moxie/core/Exceptions"], function(BinaryReader, x) {
		return function JPEGHeaders(data) {
			var _br, idx, marker, headers = [],
				length = 0;
			if (_br = new BinaryReader(data), 65496 !== _br.SHORT(0)) throw _br.clear(), new x.ImageError(x.ImageError.WRONG_FORMAT);
			for (idx = 2; idx <= _br.length();) if (marker = _br.SHORT(idx), marker >= 65488 && 65495 >= marker) idx += 2;
			else {
				if (65498 === marker || 65497 === marker) break;
				length = _br.SHORT(idx + 2) + 2, marker >= 65505 && 65519 >= marker && headers.push({
					hex: marker,
					name: "APP" + (15 & marker),
					start: idx,
					length: length,
					segment: _br.SEGMENT(idx, length)
				}), idx += length
			}
			return _br.clear(), {
				headers: headers,
				restore: function(data) {
					var max, i, br;
					for (br = new BinaryReader(data), idx = 65504 == br.SHORT(2) ? 4 + br.SHORT(4) : 2, i = 0, max = headers.length; max > i; i++) br.SEGMENT(idx, 0, headers[i].segment), idx += headers[i].length;
					return data = br.SEGMENT(), br.clear(), data
				},
				strip: function(data) {
					var br, headers, jpegHeaders, i;
					for (jpegHeaders = new JPEGHeaders(data), headers = jpegHeaders.headers, jpegHeaders.purge(), br = new BinaryReader(data), i = headers.length; i--;) br.SEGMENT(headers[i].start, headers[i].length, "");
					return data = br.SEGMENT(), br.clear(), data
				},
				get: function(name) {
					for (var array = [], i = 0, max = headers.length; max > i; i++) headers[i].name === name.toUpperCase() && array.push(headers[i].segment);
					return array
				},
				set: function(name, segment) {
					var i, ii, max, array = [];
					for ("string" == typeof segment ? array.push(segment) : array = segment, i = ii = 0, max = headers.length; max > i && (headers[i].name === name.toUpperCase() && (headers[i].segment = array[ii], headers[i].length = array[ii].length, ii++), !(ii >= array.length)); i++);
				},
				purge: function() {
					this.headers = headers = []
				}
			}
		}
	}), define("moxie/runtime/html5/image/ExifParser", ["moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader", "moxie/core/Exceptions"], function(Basic, BinaryReader, x) {
		function ExifParser(data) {
			function extractTags(IFD_offset, tags2extract) {
				var length, i, tag, type, count, size, offset, value, data = this,
					values = [],
					hash = {},
					types = {
						1: "BYTE",
						7: "UNDEFINED",
						2: "ASCII",
						3: "SHORT",
						4: "LONG",
						5: "RATIONAL",
						9: "SLONG",
						10: "SRATIONAL"
					},
					sizes = {
						BYTE: 1,
						UNDEFINED: 1,
						ASCII: 1,
						SHORT: 2,
						LONG: 4,
						RATIONAL: 8,
						SLONG: 4,
						SRATIONAL: 8
					};
				for (length = data.SHORT(IFD_offset), i = 0; length > i; i++) if (values = [], offset = IFD_offset + 2 + 12 * i, tag = tags2extract[data.SHORT(offset)], tag !== undefined) {
					if (type = types[data.SHORT(offset += 2)], count = data.LONG(offset += 2), size = sizes[type], !size) throw new x.ImageError(x.ImageError.INVALID_META_ERR);
					if (offset += 4, size * count > 4 && (offset = data.LONG(offset) + offsets.tiffHeader), offset + size * count >= this.length()) throw new x.ImageError(x.ImageError.INVALID_META_ERR);
					"ASCII" !== type ? (values = data.asArray(type, offset, count), value = 1 == count ? values[0] : values, tagDescs.hasOwnProperty(tag) && "object" != typeof value ? hash[tag] = tagDescs[tag][value] : hash[tag] = value) : hash[tag] = Basic.trim(data.STRING(offset, count).replace(/\0$/, ""))
				}
				return hash
			}
			function setTag(ifd, tag, value) {
				var offset, length, tagOffset, valueOffset = 0;
				if ("string" == typeof tag) {
					var tmpTags = tags[ifd.toLowerCase()];
					for (var hex in tmpTags) if (tmpTags[hex] === tag) {
						tag = hex;
						break
					}
				}
				offset = offsets[ifd.toLowerCase() + "IFD"], length = this.SHORT(offset);
				for (var i = 0; length > i; i++) if (tagOffset = offset + 12 * i + 2, this.SHORT(tagOffset) == tag) {
					valueOffset = tagOffset + 8;
					break
				}
				if (!valueOffset) return !1;
				try {
					this.write(valueOffset, value, 4)
				} catch (ex) {
					return !1
				}
				return !0
			}
			var __super__, tags, tagDescs, offsets, idx, Tiff;
			if (BinaryReader.call(this, data), tags = {
				tiff: {
					274: "Orientation",
					270: "ImageDescription",
					271: "Make",
					272: "Model",
					305: "Software",
					34665: "ExifIFDPointer",
					34853: "GPSInfoIFDPointer"
				},
				exif: {
					36864: "ExifVersion",
					40961: "ColorSpace",
					40962: "PixelXDimension",
					40963: "PixelYDimension",
					36867: "DateTimeOriginal",
					33434: "ExposureTime",
					33437: "FNumber",
					34855: "ISOSpeedRatings",
					37377: "ShutterSpeedValue",
					37378: "ApertureValue",
					37383: "MeteringMode",
					37384: "LightSource",
					37385: "Flash",
					37386: "FocalLength",
					41986: "ExposureMode",
					41987: "WhiteBalance",
					41990: "SceneCaptureType",
					41988: "DigitalZoomRatio",
					41992: "Contrast",
					41993: "Saturation",
					41994: "Sharpness"
				},
				gps: {
					0: "GPSVersionID",
					1: "GPSLatitudeRef",
					2: "GPSLatitude",
					3: "GPSLongitudeRef",
					4: "GPSLongitude"
				},
				thumb: {
					513: "JPEGInterchangeFormat",
					514: "JPEGInterchangeFormatLength"
				}
			}, tagDescs = {
				ColorSpace: {
					1: "sRGB",
					0: "Uncalibrated"
				},
				MeteringMode: {
					0: "Unknown",
					1: "Average",
					2: "CenterWeightedAverage",
					3: "Spot",
					4: "MultiSpot",
					5: "Pattern",
					6: "Partial",
					255: "Other"
				},
				LightSource: {
					1: "Daylight",
					2: "Fliorescent",
					3: "Tungsten",
					4: "Flash",
					9: "Fine weather",
					10: "Cloudy weather",
					11: "Shade",
					12: "Daylight fluorescent (D 5700 - 7100K)",
					13: "Day white fluorescent (N 4600 -5400K)",
					14: "Cool white fluorescent (W 3900 - 4500K)",
					15: "White fluorescent (WW 3200 - 3700K)",
					17: "Standard light A",
					18: "Standard light B",
					19: "Standard light C",
					20: "D55",
					21: "D65",
					22: "D75",
					23: "D50",
					24: "ISO studio tungsten",
					255: "Other"
				},
				Flash: {
					0: "Flash did not fire",
					1: "Flash fired",
					5: "Strobe return light not detected",
					7: "Strobe return light detected",
					9: "Flash fired, compulsory flash mode",
					13: "Flash fired, compulsory flash mode, return light not detected",
					15: "Flash fired, compulsory flash mode, return light detected",
					16: "Flash did not fire, compulsory flash mode",
					24: "Flash did not fire, auto mode",
					25: "Flash fired, auto mode",
					29: "Flash fired, auto mode, return light not detected",
					31: "Flash fired, auto mode, return light detected",
					32: "No flash function",
					65: "Flash fired, red-eye reduction mode",
					69: "Flash fired, red-eye reduction mode, return light not detected",
					71: "Flash fired, red-eye reduction mode, return light detected",
					73: "Flash fired, compulsory flash mode, red-eye reduction mode",
					77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
					79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
					89: "Flash fired, auto mode, red-eye reduction mode",
					93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
					95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
				},
				ExposureMode: {
					0: "Auto exposure",
					1: "Manual exposure",
					2: "Auto bracket"
				},
				WhiteBalance: {
					0: "Auto white balance",
					1: "Manual white balance"
				},
				SceneCaptureType: {
					0: "Standard",
					1: "Landscape",
					2: "Portrait",
					3: "Night scene"
				},
				Contrast: {
					0: "Normal",
					1: "Soft",
					2: "Hard"
				},
				Saturation: {
					0: "Normal",
					1: "Low saturation",
					2: "High saturation"
				},
				Sharpness: {
					0: "Normal",
					1: "Soft",
					2: "Hard"
				},
				GPSLatitudeRef: {
					N: "North latitude",
					S: "South latitude"
				},
				GPSLongitudeRef: {
					E: "East longitude",
					W: "West longitude"
				}
			}, offsets = {
				tiffHeader: 10
			}, idx = offsets.tiffHeader, __super__ = {
				clear: this.clear
			}, Basic.extend(this, {
				read: function() {
					try {
						return ExifParser.prototype.read.apply(this, arguments)
					} catch (ex) {
						throw new x.ImageError(x.ImageError.INVALID_META_ERR)
					}
				},
				write: function() {
					try {
						return ExifParser.prototype.write.apply(this, arguments)
					} catch (ex) {
						throw new x.ImageError(x.ImageError.INVALID_META_ERR)
					}
				},
				UNDEFINED: function() {
					return this.BYTE.apply(this, arguments)
				},
				RATIONAL: function(idx) {
					return this.LONG(idx) / this.LONG(idx + 4)
				},
				SRATIONAL: function(idx) {
					return this.SLONG(idx) / this.SLONG(idx + 4)
				},
				ASCII: function(idx) {
					return this.CHAR(idx)
				},
				TIFF: function() {
					return Tiff || null
				},
				EXIF: function() {
					var Exif = null;
					if (offsets.exifIFD) {
						try {
							Exif = extractTags.call(this, offsets.exifIFD, tags.exif)
						} catch (ex) {
							return null
						}
						if (Exif.ExifVersion && "array" === Basic.typeOf(Exif.ExifVersion)) {
							for (var i = 0, exifVersion = ""; i < Exif.ExifVersion.length; i++) exifVersion += String.fromCharCode(Exif.ExifVersion[i]);
							Exif.ExifVersion = exifVersion
						}
					}
					return Exif
				},
				GPS: function() {
					var GPS = null;
					if (offsets.gpsIFD) {
						try {
							GPS = extractTags.call(this, offsets.gpsIFD, tags.gps)
						} catch (ex) {
							return null
						}
						GPS.GPSVersionID && "array" === Basic.typeOf(GPS.GPSVersionID) && (GPS.GPSVersionID = GPS.GPSVersionID.join("."))
					}
					return GPS
				},
				thumb: function() {
					if (offsets.IFD1) try {
						var IFD1Tags = extractTags.call(this, offsets.IFD1, tags.thumb);
						if ("JPEGInterchangeFormat" in IFD1Tags) return this.SEGMENT(offsets.tiffHeader + IFD1Tags.JPEGInterchangeFormat, IFD1Tags.JPEGInterchangeFormatLength)
					} catch (ex) {}
					return null
				},
				setExif: function(tag, value) {
					return "PixelXDimension" !== tag && "PixelYDimension" !== tag ? !1 : setTag.call(this, "exif", tag, value)
				},
				clear: function() {
					__super__.clear(), data = tags = tagDescs = Tiff = offsets = __super__ = null
				}
			}), 65505 !== this.SHORT(0) || "EXIF\x00" !== this.STRING(4, 5).toUpperCase()) throw new x.ImageError(x.ImageError.INVALID_META_ERR);
			if (this.littleEndian = 18761 == this.SHORT(idx), 42 !== this.SHORT(idx += 2)) throw new x.ImageError(x.ImageError.INVALID_META_ERR);
			offsets.IFD0 = offsets.tiffHeader + this.LONG(idx += 2), Tiff = extractTags.call(this, offsets.IFD0, tags.tiff), "ExifIFDPointer" in Tiff && (offsets.exifIFD = offsets.tiffHeader + Tiff.ExifIFDPointer, delete Tiff.ExifIFDPointer), "GPSInfoIFDPointer" in Tiff && (offsets.gpsIFD = offsets.tiffHeader + Tiff.GPSInfoIFDPointer, delete Tiff.GPSInfoIFDPointer), Basic.isEmptyObj(Tiff) && (Tiff = null);
			var IFD1Offset = this.LONG(offsets.IFD0 + 12 * this.SHORT(offsets.IFD0) + 2);
			IFD1Offset && (offsets.IFD1 = offsets.tiffHeader + IFD1Offset)
		}
		return ExifParser.prototype = BinaryReader.prototype, ExifParser
	}), define("moxie/runtime/html5/image/JPEG", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEGHeaders", "moxie/runtime/html5/utils/BinaryReader", "moxie/runtime/html5/image/ExifParser"], function(Basic, x, JPEGHeaders, BinaryReader, ExifParser) {
		function JPEG(data) {
			function _getDimensions(br) {
				var marker, length, idx = 0;
				for (br || (br = _br); idx <= br.length();) {
					if (marker = br.SHORT(idx += 2), marker >= 65472 && 65475 >= marker) return idx += 5, {
						height: br.SHORT(idx),
						width: br.SHORT(idx += 2)
					};
					length = br.SHORT(idx += 2), idx += length - 2
				}
				return null
			}
			function _getThumb() {
				var br, info, data = _ep.thumb();
				return data && (br = new BinaryReader(data), info = _getDimensions(br), br.clear(), info) ? (info.data = data, info) : null
			}
			function _purge() {
				_ep && _hm && _br && (_ep.clear(), _hm.purge(), _br.clear(), _info = _hm = _ep = _br = null)
			}
			var _br, _hm, _ep, _info;
			if (_br = new BinaryReader(data), 65496 !== _br.SHORT(0)) throw new x.ImageError(x.ImageError.WRONG_FORMAT);
			_hm = new JPEGHeaders(data);
			try {
				_ep = new ExifParser(_hm.get("app1")[0])
			} catch (ex) {}
			_info = _getDimensions.call(this), Basic.extend(this, {
				type: "image/jpeg",
				size: _br.length(),
				width: _info && _info.width || 0,
				height: _info && _info.height || 0,
				setExif: function(tag, value) {
					return _ep ? ("object" === Basic.typeOf(tag) ? Basic.each(tag, function(value, tag) {
						_ep.setExif(tag, value)
					}) : _ep.setExif(tag, value), void _hm.set("app1", _ep.SEGMENT())) : !1
				},
				writeHeaders: function() {
					return arguments.length ? _hm.restore(arguments[0]) : _hm.restore(data)
				},
				stripHeaders: function(data) {
					return _hm.strip(data)
				},
				purge: function() {
					_purge.call(this)
				}
			}), _ep && (this.meta = {
				tiff: _ep.TIFF(),
				exif: _ep.EXIF(),
				gps: _ep.GPS(),
				thumb: _getThumb()
			})
		}
		return JPEG
	}), define("moxie/runtime/html5/image/PNG", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader"], function(x, Basic, BinaryReader) {
		function PNG(data) {
			function _getDimensions() {
				var chunk, idx;
				return chunk = _getChunkAt.call(this, 8), "IHDR" == chunk.type ? (idx = chunk.start, {
					width: _br.LONG(idx),
					height: _br.LONG(idx += 4)
				}) : null
			}
			function _purge() {
				_br && (_br.clear(), data = _info = _hm = _ep = _br = null)
			}
			function _getChunkAt(idx) {
				var length, type, start, CRC;
				return length = _br.LONG(idx), type = _br.STRING(idx += 4, 4), start = idx += 4, CRC = _br.LONG(idx + length), {
					length: length,
					type: type,
					start: start,
					CRC: CRC
				}
			}
			var _br, _hm, _ep, _info;
			_br = new BinaryReader(data), function() {
				var idx = 0,
					i = 0,
					signature = [35152, 20039, 3338, 6666];
				for (i = 0; i < signature.length; i++, idx += 2) if (signature[i] != _br.SHORT(idx)) throw new x.ImageError(x.ImageError.WRONG_FORMAT)
			}(), _info = _getDimensions.call(this), Basic.extend(this, {
				type: "image/png",
				size: _br.length(),
				width: _info.width,
				height: _info.height,
				purge: function() {
					_purge.call(this)
				}
			}), _purge.call(this)
		}
		return PNG
	}), define("moxie/runtime/html5/image/ImageInfo", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEG", "moxie/runtime/html5/image/PNG"], function(Basic, x, JPEG, PNG) {
		return function(data) {
			var _img, _cs = [JPEG, PNG];
			_img = function() {
				for (var i = 0; i < _cs.length; i++) try {
					return new _cs[i](data)
				} catch (ex) {}
				throw new x.ImageError(x.ImageError.WRONG_FORMAT)
			}(), Basic.extend(this, {
				type: "",
				size: 0,
				width: 0,
				height: 0,
				setExif: function() {},
				writeHeaders: function(data) {
					return data
				},
				stripHeaders: function(data) {
					return data
				},
				purge: function() {
					data = null
				}
			}), Basic.extend(this, _img), this.purge = function() {
				_img.purge(), _img = null
			}
		}
	}), define("moxie/runtime/html5/image/MegaPixel", [], function() {
		function renderImageToCanvas(img, canvas, options) {
			var iw = img.naturalWidth,
				ih = img.naturalHeight,
				width = options.width,
				height = options.height,
				x = options.x || 0,
				y = options.y || 0,
				ctx = canvas.getContext("2d");
			detectSubsampling(img) && (iw /= 2, ih /= 2);
			var d = 1024,
				tmpCanvas = document.createElement("canvas");
			tmpCanvas.width = tmpCanvas.height = d;
			for (var tmpCtx = tmpCanvas.getContext("2d"), vertSquashRatio = detectVerticalSquash(img, iw, ih), sy = 0; ih > sy;) {
				for (var sh = sy + d > ih ? ih - sy : d, sx = 0; iw > sx;) {
					var sw = sx + d > iw ? iw - sx : d;
					tmpCtx.clearRect(0, 0, d, d), tmpCtx.drawImage(img, -sx, -sy);
					var dx = sx * width / iw + x << 0,
						dw = Math.ceil(sw * width / iw),
						dy = sy * height / ih / vertSquashRatio + y << 0,
						dh = Math.ceil(sh * height / ih / vertSquashRatio);
					ctx.drawImage(tmpCanvas, 0, 0, sw, sh, dx, dy, dw, dh), sx += d
				}
				sy += d
			}
			tmpCanvas = tmpCtx = null
		}
		function detectSubsampling(img) {
			var iw = img.naturalWidth,
				ih = img.naturalHeight;
			if (iw * ih > 1048576) {
				var canvas = document.createElement("canvas");
				canvas.width = canvas.height = 1;
				var ctx = canvas.getContext("2d");
				return ctx.drawImage(img, -iw + 1, 0), 0 === ctx.getImageData(0, 0, 1, 1).data[3]
			}
			return !1
		}
		function detectVerticalSquash(img, iw, ih) {
			var canvas = document.createElement("canvas");
			canvas.width = 1, canvas.height = ih;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);
			for (var data = ctx.getImageData(0, 0, 1, ih).data, sy = 0, ey = ih, py = ih; py > sy;) {
				var alpha = data[4 * (py - 1) + 3];
				0 === alpha ? ey = py : sy = py, py = ey + sy >> 1
			}
			canvas = null;
			var ratio = py / ih;
			return 0 === ratio ? 1 : ratio
		}
		return {
			isSubsampled: detectSubsampling,
			renderTo: renderImageToCanvas
		}
	}), define("moxie/runtime/html5/image/Image", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/utils/Encode", "moxie/file/Blob", "moxie/file/File", "moxie/runtime/html5/image/ImageInfo", "moxie/runtime/html5/image/MegaPixel", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function(extensions, Basic, x, Encode, Blob, File, ImageInfo, MegaPixel, Mime, Env) {
		function HTML5Image() {
			function _getImg() {
				if (!_canvas && !_img) throw new x.ImageError(x.DOMException.INVALID_STATE_ERR);
				return _canvas || _img
			}
			function _toBinary(str) {
				return Encode.atob(str.substring(str.indexOf("base64,") + 7))
			}
			function _toDataUrl(str, type) {
				return "data:" + (type || "") + ";base64," + Encode.btoa(str)
			}
			function _preload(str) {
				var comp = this;
				_img = new Image, _img.onerror = function() {
					_purge.call(this), comp.trigger("error", x.ImageError.WRONG_FORMAT)
				}, _img.onload = function() {
					comp.trigger("load")
				}, _img.src = "data:" == str.substr(0, 5) ? str : _toDataUrl(str, _blob.type)
			}
			function _readAsDataUrl(file, callback) {
				var fr, comp = this;
				return window.FileReader ? (fr = new FileReader, fr.onload = function() {
					callback(this.result)
				}, fr.onerror = function() {
					comp.trigger("error", x.ImageError.WRONG_FORMAT)
				}, fr.readAsDataURL(file), void 0) : callback(file.getAsDataURL())
			}
			function _downsize(width, height, crop, preserveHeaders) {
				var scale, img, destWidth, destHeight, orientation, self = this,
					x = 0,
					y = 0;
				if (_preserveHeaders = preserveHeaders, orientation = this.meta && this.meta.tiff && this.meta.tiff.Orientation || 1, -1 !== Basic.inArray(orientation, [5, 6, 7, 8])) {
					var tmp = width;
					width = height, height = tmp
				}
				return img = _getImg(), crop ? (width = Math.min(width, img.width), height = Math.min(height, img.height), scale = Math.max(width / img.width, height / img.height)) : scale = Math.min(width / img.width, height / img.height), scale > 1 && !crop && preserveHeaders ? void this.trigger("Resize") : (_canvas || (_canvas = document.createElement("canvas")), destWidth = Math.round(img.width * scale), destHeight = Math.round(img.height * scale), crop ? (_canvas.width = width, _canvas.height = height, destWidth > width && (x = Math.round((destWidth - width) / 2)), destHeight > height && (y = Math.round((destHeight - height) / 2))) : (_canvas.width = destWidth, _canvas.height = destHeight), _preserveHeaders || _rotateToOrientaion(_canvas.width, _canvas.height, orientation), _drawToCanvas.call(this, img, _canvas, -x, -y, destWidth, destHeight), this.width = _canvas.width, this.height = _canvas.height, _modified = !0, void self.trigger("Resize"))
			}
			function _drawToCanvas(img, canvas, x, y, w, h) {
				if ("iOS" === Env.OS) MegaPixel.renderTo(img, canvas, {
					width: w,
					height: h,
					x: x,
					y: y
				});
				else {
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, x, y, w, h)
				}
			}
			function _rotateToOrientaion(width, height, orientation) {
				switch (orientation) {
				case 5:
				case 6:
				case 7:
				case 8:
					_canvas.width = height, _canvas.height = width;
					break;
				default:
					_canvas.width = width, _canvas.height = height
				}
				var ctx = _canvas.getContext("2d");
				switch (orientation) {
				case 2:
					ctx.translate(width, 0), ctx.scale(-1, 1);
					break;
				case 3:
					ctx.translate(width, height), ctx.rotate(Math.PI);
					break;
				case 4:
					ctx.translate(0, height), ctx.scale(1, -1);
					break;
				case 5:
					ctx.rotate(.5 * Math.PI), ctx.scale(1, -1);
					break;
				case 6:
					ctx.rotate(.5 * Math.PI), ctx.translate(0, -height);
					break;
				case 7:
					ctx.rotate(.5 * Math.PI), ctx.translate(width, -height), ctx.scale(-1, 1);
					break;
				case 8:
					ctx.rotate(-.5 * Math.PI), ctx.translate(-width, 0)
				}
			}
			function _purge() {
				_imgInfo && (_imgInfo.purge(), _imgInfo = null), _binStr = _img = _canvas = _blob = null, _modified = !1
			}
			var _img, _imgInfo, _canvas, _binStr, _blob, me = this,
				_modified = !1,
				_preserveHeaders = !0;
			Basic.extend(this, {
				loadFromBlob: function(blob) {
					var comp = this,
						I = comp.getRuntime(),
						asBinary = arguments.length > 1 ? arguments[1] : !0;
					if (!I.can("access_binary")) throw new x.RuntimeError(x.RuntimeError.NOT_SUPPORTED_ERR);
					return _blob = blob, blob.isDetached() ? (_binStr = blob.getSource(), void _preload.call(this, _binStr)) : void _readAsDataUrl.call(this, blob.getSource(), function(dataUrl) {
						asBinary && (_binStr = _toBinary(dataUrl)), _preload.call(comp, dataUrl)
					})
				},
				loadFromImage: function(img, exact) {
					this.meta = img.meta, _blob = new File(null, {
						name: img.name,
						size: img.size,
						type: img.type
					}), _preload.call(this, exact ? _binStr = img.getAsBinaryString() : img.getAsDataURL())
				},
				getInfo: function() {
					var info, I = this.getRuntime();
					return !_imgInfo && _binStr && I.can("access_image_binary") && (_imgInfo = new ImageInfo(_binStr)), info = {
						width: _getImg().width || 0,
						height: _getImg().height || 0,
						type: _blob.type || Mime.getFileMime(_blob.name),
						size: _binStr && _binStr.length || _blob.size || 0,
						name: _blob.name || "",
						meta: _imgInfo && _imgInfo.meta || this.meta || {}
					}, !info.meta || !info.meta.thumb || info.meta.thumb.data instanceof Blob || (info.meta.thumb.data = new Blob(null, {
						type: "image/jpeg",
						data: info.meta.thumb.data
					})), info
				},
				downsize: function() {
					_downsize.apply(this, arguments)
				},
				getAsCanvas: function() {
					return _canvas && (_canvas.id = this.uid + "_canvas"), _canvas
				},
				getAsBlob: function(type, quality) {
					return type !== this.type && _downsize.call(this, this.width, this.height, !1), new File(null, {
						name: _blob.name || "",
						type: type,
						data: me.getAsBinaryString.call(this, type, quality)
					})
				},
				getAsDataURL: function(type) {
					var quality = arguments[1] || 90;
					if (!_modified) return _img.src;
					if ("image/jpeg" !== type) return _canvas.toDataURL("image/png");
					try {
						return _canvas.toDataURL("image/jpeg", quality / 100)
					} catch (ex) {
						return _canvas.toDataURL("image/jpeg")
					}
				},
				getAsBinaryString: function(type, quality) {
					if (!_modified) return _binStr || (_binStr = _toBinary(me.getAsDataURL(type, quality))), _binStr;
					if ("image/jpeg" !== type) _binStr = _toBinary(me.getAsDataURL(type, quality));
					else {
						var dataUrl;
						quality || (quality = 90);
						try {
							dataUrl = _canvas.toDataURL("image/jpeg", quality / 100)
						} catch (ex) {
							dataUrl = _canvas.toDataURL("image/jpeg")
						}
						_binStr = _toBinary(dataUrl), _imgInfo && (_binStr = _imgInfo.stripHeaders(_binStr), _preserveHeaders && (_imgInfo.meta && _imgInfo.meta.exif && _imgInfo.setExif({
							PixelXDimension: this.width,
							PixelYDimension: this.height
						}), _binStr = _imgInfo.writeHeaders(_binStr)), _imgInfo.purge(), _imgInfo = null)
					}
					return _modified = !1, _binStr
				},
				destroy: function() {
					me = null, _purge.call(this), this.getRuntime().getShim().removeInstance(this.uid)
				}
			})
		}
		return extensions.Image = HTML5Image
	}), define("moxie/runtime/flash/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/runtime/Runtime"], function(Basic, Env, Dom, x, Runtime) {
		function getShimVersion() {
			var version;
			try {
				version = navigator.plugins["Shockwave Flash"], version = version.description
			} catch (e1) {
				try {
					version = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
				} catch (e2) {
					version = "0.0"
				}
			}
			return version = version.match(/\d+/g), parseFloat(version[0] + "." + version[1])
		}
		function removeSWF(id) {
			var obj = Dom.get(id);
			obj && "OBJECT" == obj.nodeName && ("IE" === Env.browser ? (obj.style.display = "none", function onInit() {
				4 == obj.readyState ? removeObjectInIE(id) : setTimeout(onInit, 10)
			}()) : obj.parentNode.removeChild(obj))
		}
		function removeObjectInIE(id) {
			var obj = Dom.get(id);
			if (obj) {
				for (var i in obj)"function" == typeof obj[i] && (obj[i] = null);
				obj.parentNode.removeChild(obj)
			}
		}
		function FlashRuntime(options) {
			var initTimer, I = this;
			options = Basic.extend({
				swf_url: Env.swf_url
			}, options), Runtime.call(this, options, type, {
				access_binary: function(value) {
					return value && "browser" === I.mode
				},
				access_image_binary: function(value) {
					return value && "browser" === I.mode
				},
				display_media: Runtime.capTrue,
				do_cors: Runtime.capTrue,
				drag_and_drop: !1,
				report_upload_progress: function() {
					return "client" === I.mode
				},
				resize_image: Runtime.capTrue,
				return_response_headers: !1,
				return_response_type: function(responseType) {
					return "json" === responseType && window.JSON ? !0 : !Basic.arrayDiff(responseType, ["", "text", "document"]) || "browser" === I.mode
				},
				return_status_code: function(code) {
					return "browser" === I.mode || !Basic.arrayDiff(code, [200, 404])
				},
				select_file: Runtime.capTrue,
				select_multiple: Runtime.capTrue,
				send_binary_string: function(value) {
					return value && "browser" === I.mode
				},
				send_browser_cookies: function(value) {
					return value && "browser" === I.mode
				},
				send_custom_headers: function(value) {
					return value && "browser" === I.mode
				},
				send_multipart: Runtime.capTrue,
				slice_blob: function(value) {
					return value && "browser" === I.mode
				},
				stream_upload: function(value) {
					return value && "browser" === I.mode
				},
				summon_file_dialog: !1,
				upload_filesize: function(size) {
					return Basic.parseSizeStr(size) <= 2097152 || "client" === I.mode
				},
				use_http_method: function(methods) {
					return !Basic.arrayDiff(methods, ["GET", "POST"])
				}
			}, {
				access_binary: function(value) {
					return value ? "browser" : "client"
				},
				access_image_binary: function(value) {
					return value ? "browser" : "client"
				},
				report_upload_progress: function(value) {
					return value ? "browser" : "client"
				},
				return_response_type: function(responseType) {
					return Basic.arrayDiff(responseType, ["", "text", "json", "document"]) ? "browser" : ["client", "browser"]
				},
				return_status_code: function(code) {
					return Basic.arrayDiff(code, [200, 404]) ? "browser" : ["client", "browser"]
				},
				send_binary_string: function(value) {
					return value ? "browser" : "client"
				},
				send_browser_cookies: function(value) {
					return value ? "browser" : "client"
				},
				send_custom_headers: function(value) {
					return value ? "browser" : "client"
				},
				stream_upload: function(value) {
					return value ? "client" : "browser"
				},
				upload_filesize: function(size) {
					return Basic.parseSizeStr(size) >= 2097152 ? "client" : "browser"
				}
			}, "client"), getShimVersion() < 10 && (MXI_DEBUG && Env.debug.runtime && Env.log("	Flash didn't meet minimal version requirement (10)."), this.mode = !1), Basic.extend(this, {
				getShim: function() {
					return Dom.get(this.uid)
				},
				shimExec: function(component, action) {
					var args = [].slice.call(arguments, 2);
					return I.getShim().exec(this.uid, component, action, args)
				},
				init: function() {
					var html, el, container;
					container = this.getShimContainer(), Basic.extend(container.style, {
						position: "absolute",
						top: "-8px",
						left: "-8px",
						width: "9px",
						height: "9px",
						overflow: "hidden"
					}), html = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + options.swf_url + '" ', "IE" === Env.browser && (html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), html += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + options.swf_url + '" /><param name="flashvars" value="uid=' + escape(this.uid) + "&target=" + Env.global_event_dispatcher + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', "IE" === Env.browser ? (el = document.createElement("div"), container.appendChild(el), el.outerHTML = html, el = container = null) : container.innerHTML = html, initTimer = setTimeout(function() {
						I && !I.initialized && (I.trigger("Error", new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR)), MXI_DEBUG && Env.debug.runtime && Env.log("	Flash failed to initialize within a specified period of time (typically 5s)."))
					}, 5e3)
				},
				destroy: function(destroy) {
					return function() {
						removeSWF(I.uid), destroy.call(I), clearTimeout(initTimer), options = initTimer = destroy = I = null
					}
				}(this.destroy)
			}, extensions)
		}
		var type = "flash",
			extensions = {};
		return Runtime.addConstructor(type, FlashRuntime), extensions
	}), define("moxie/runtime/flash/file/FileInput", ["moxie/runtime/flash/Runtime", "moxie/file/File", "moxie/core/utils/Basic"], function(extensions, File, Basic) {
		var FileInput = {
			init: function(options) {
				var comp = this,
					I = this.getRuntime();
				this.bind("Change", function() {
					var files = I.shimExec.call(comp, "FileInput", "getFiles");
					comp.files = [], Basic.each(files, function(file) {
						comp.files.push(new File(I.uid, file))
					})
				}, 999), this.getRuntime().shimExec.call(this, "FileInput", "init", {
					name: options.name,
					accept: options.accept,
					multiple: options.multiple
				}), this.trigger("ready")
			}
		};
		return extensions.FileInput = FileInput
	}), define("moxie/runtime/flash/file/Blob", ["moxie/runtime/flash/Runtime", "moxie/file/Blob"], function(extensions, Blob) {
		var FlashBlob = {
			slice: function(blob, start, end, type) {
				var self = this.getRuntime();
				return 0 > start ? start = Math.max(blob.size + start, 0) : start > 0 && (start = Math.min(start, blob.size)), 0 > end ? end = Math.max(blob.size + end, 0) : end > 0 && (end = Math.min(end, blob.size)), blob = self.shimExec.call(this, "Blob", "slice", start, end, type || ""), blob && (blob = new Blob(self.uid, blob)), blob
			}
		};
		return extensions.Blob = FlashBlob
	}), define("moxie/runtime/flash/file/FileReader", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Encode"], function(extensions, Encode) {
		function _formatData(data, op) {
			switch (op) {
			case "readAsText":
				return Encode.atob(data, "utf8");
			case "readAsBinaryString":
				return Encode.atob(data);
			case "readAsDataURL":
				return data
			}
			return null
		}
		var FileReader = {
			read: function(op, blob) {
				var comp = this;
				return comp.result = "", "readAsDataURL" === op && (comp.result = "data:" + (blob.type || "") + ";base64,"), comp.bind("Progress", function(e, data) {
					data && (comp.result += _formatData(data, op))
				}, 999), comp.getRuntime().shimExec.call(this, "FileReader", "readAsBase64", blob.uid)
			}
		};
		return extensions.FileReader = FileReader
	}), define("moxie/runtime/flash/file/FileReaderSync", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Encode"], function(extensions, Encode) {
		function _formatData(data, op) {
			switch (op) {
			case "readAsText":
				return Encode.atob(data, "utf8");
			case "readAsBinaryString":
				return Encode.atob(data);
			case "readAsDataURL":
				return data
			}
			return null
		}
		var FileReaderSync = {
			read: function(op, blob) {
				var result, self = this.getRuntime();
				return (result = self.shimExec.call(this, "FileReaderSync", "readAsBase64", blob.uid)) ? ("readAsDataURL" === op && (result = "data:" + (blob.type || "") + ";base64," + result), _formatData(result, op, blob.type)) : null
			}
		};
		return extensions.FileReaderSync = FileReaderSync
	}), define("moxie/runtime/flash/xhr/XMLHttpRequest", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Basic", "moxie/file/Blob", "moxie/file/File", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/runtime/Transporter"], function(extensions, Basic, Blob, File, FileReaderSync, FormData, Transporter) {
		var XMLHttpRequest = {
			send: function(meta, data) {
				function send() {
					meta.transport = self.mode, self.shimExec.call(target, "XMLHttpRequest", "send", meta, data)
				}
				function appendBlob(name, blob) {
					self.shimExec.call(target, "XMLHttpRequest", "appendBlob", name, blob.uid), data = null, send()
				}
				function attachBlob(blob, cb) {
					var tr = new Transporter;
					tr.bind("TransportingComplete", function() {
						cb(this.result)
					}), tr.transport(blob.getSource(), blob.type, {
						ruid: self.uid
					})
				}
				var target = this,
					self = target.getRuntime();
				if (Basic.isEmptyObj(meta.headers) || Basic.each(meta.headers, function(value, header) {
					self.shimExec.call(target, "XMLHttpRequest", "setRequestHeader", header, value.toString())
				}), data instanceof FormData) {
					var blobField;
					if (data.each(function(value, name) {
						value instanceof Blob ? blobField = name : self.shimExec.call(target, "XMLHttpRequest", "append", name, value)
					}), data.hasBlob()) {
						var blob = data.getBlob();
						blob.isDetached() ? attachBlob(blob, function(attachedBlob) {
							blob.destroy(), appendBlob(blobField, attachedBlob)
						}) : appendBlob(blobField, blob)
					} else data = null, send()
				} else data instanceof Blob ? data.isDetached() ? attachBlob(data, function(attachedBlob) {
					data.destroy(), data = attachedBlob.uid, send()
				}) : (data = data.uid, send()) : send()
			},
			getResponse: function(responseType) {
				var frs, blob, self = this.getRuntime();
				if (blob = self.shimExec.call(this, "XMLHttpRequest", "getResponseAsBlob")) {
					if (blob = new File(self.uid, blob), "blob" === responseType) return blob;
					try {
						if (frs = new FileReaderSync, ~Basic.inArray(responseType, ["", "text"])) return frs.readAsText(blob);
						if ("json" === responseType && window.JSON) return JSON.parse(frs.readAsText(blob))
					} finally {
						blob.destroy()
					}
				}
				return null
			},
			abort: function(upload_complete_flag) {
				var self = this.getRuntime();
				self.shimExec.call(this, "XMLHttpRequest", "abort"), this.dispatchEvent("readystatechange"), this.dispatchEvent("abort")
			}
		};
		return extensions.XMLHttpRequest = XMLHttpRequest
	}), define("moxie/runtime/flash/runtime/Transporter", ["moxie/runtime/flash/Runtime", "moxie/file/Blob"], function(extensions, Blob) {
		var Transporter = {
			getAsBlob: function(type) {
				var self = this.getRuntime(),
					blob = self.shimExec.call(this, "Transporter", "getAsBlob", type);
				return blob ? new Blob(self.uid, blob) : null
			}
		};
		return extensions.Transporter = Transporter
	}), define("moxie/runtime/flash/image/Image", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Basic", "moxie/runtime/Transporter", "moxie/file/Blob", "moxie/file/FileReaderSync"], function(extensions, Basic, Transporter, Blob, FileReaderSync) {
		var Image = {
			loadFromBlob: function(blob) {
				function exec(srcBlob) {
					self.shimExec.call(comp, "Image", "loadFromBlob", srcBlob.uid), comp = self = null
				}
				var comp = this,
					self = comp.getRuntime();
				if (blob.isDetached()) {
					var tr = new Transporter;
					tr.bind("TransportingComplete", function() {
						exec(tr.result.getSource())
					}), tr.transport(blob.getSource(), blob.type, {
						ruid: self.uid
					})
				} else exec(blob.getSource())
			},
			loadFromImage: function(img) {
				var self = this.getRuntime();
				return self.shimExec.call(this, "Image", "loadFromImage", img.uid)
			},
			getInfo: function() {
				var self = this.getRuntime(),
					info = self.shimExec.call(this, "Image", "getInfo");
				return !info.meta || !info.meta.thumb || info.meta.thumb.data instanceof Blob || (info.meta.thumb.data = new Blob(self.uid, info.meta.thumb.data)), info
			},
			getAsBlob: function(type, quality) {
				var self = this.getRuntime(),
					blob = self.shimExec.call(this, "Image", "getAsBlob", type, quality);
				return blob ? new Blob(self.uid, blob) : null
			},
			getAsDataURL: function() {
				var frs, self = this.getRuntime(),
					blob = self.Image.getAsBlob.apply(this, arguments);
				return blob ? (frs = new FileReaderSync, frs.readAsDataURL(blob)) : null
			}
		};
		return extensions.Image = Image
	}), define("moxie/runtime/silverlight/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/runtime/Runtime"], function(Basic, Env, Dom, x, Runtime) {
		function isInstalled(version) {
			var actualVer, actualVerArray, reqVerArray, requiredVersionPart, actualVersionPart, isVersionSupported = !1,
				control = null,
				index = 0;
			try {
				try {
					control = new ActiveXObject("AgControl.AgControl"), control.IsVersionSupported(version) && (isVersionSupported = !0), control = null
				} catch (e) {
					var plugin = navigator.plugins["Silverlight Plug-In"];
					if (plugin) {
						for (actualVer = plugin.description, "1.0.30226.2" === actualVer && (actualVer = "2.0.30226.2"), actualVerArray = actualVer.split("."); actualVerArray.length > 3;) actualVerArray.pop();
						for (; actualVerArray.length < 4;) actualVerArray.push(0);
						for (reqVerArray = version.split("."); reqVerArray.length > 4;) reqVerArray.pop();
						do requiredVersionPart = parseInt(reqVerArray[index], 10), actualVersionPart = parseInt(actualVerArray[index], 10), index++;
						while (index < reqVerArray.length && requiredVersionPart === actualVersionPart);
						actualVersionPart >= requiredVersionPart && !isNaN(requiredVersionPart) && (isVersionSupported = !0)
					}
				}
			} catch (e2) {
				isVersionSupported = !1
			}
			return isVersionSupported
		}
		function SilverlightRuntime(options) {
			var initTimer, I = this;
			options = Basic.extend({
				xap_url: Env.xap_url
			}, options), Runtime.call(this, options, type, {
				access_binary: Runtime.capTrue,
				access_image_binary: Runtime.capTrue,
				display_media: Runtime.capTrue,
				do_cors: Runtime.capTrue,
				drag_and_drop: !1,
				report_upload_progress: Runtime.capTrue,
				resize_image: Runtime.capTrue,
				return_response_headers: function(value) {
					return value && "client" === I.mode
				},
				return_response_type: function(responseType) {
					return "json" !== responseType ? !0 : !! window.JSON
				},
				return_status_code: function(code) {
					return "client" === I.mode || !Basic.arrayDiff(code, [200, 404])
				},
				select_file: Runtime.capTrue,
				select_multiple: Runtime.capTrue,
				send_binary_string: Runtime.capTrue,
				send_browser_cookies: function(value) {
					return value && "browser" === I.mode
				},
				send_custom_headers: function(value) {
					return value && "client" === I.mode
				},
				send_multipart: Runtime.capTrue,
				slice_blob: Runtime.capTrue,
				stream_upload: !0,
				summon_file_dialog: !1,
				upload_filesize: Runtime.capTrue,
				use_http_method: function(methods) {
					return "client" === I.mode || !Basic.arrayDiff(methods, ["GET", "POST"])
				}
			}, {
				return_response_headers: function(value) {
					return value ? "client" : "browser"
				},
				return_status_code: function(code) {
					return Basic.arrayDiff(code, [200, 404]) ? "client" : ["client", "browser"]
				},
				send_browser_cookies: function(value) {
					return value ? "browser" : "client"
				},
				send_custom_headers: function(value) {
					return value ? "client" : "browser"
				},
				use_http_method: function(methods) {
					return Basic.arrayDiff(methods, ["GET", "POST"]) ? "client" : ["client", "browser"]
				}
			}), isInstalled("2.0.31005.0") && "Opera" !== Env.browser || (MXI_DEBUG && Env.debug.runtime && Env.log("	Silverlight is not installed or minimal version (2.0.31005.0) requirement not met (not likely)."), this.mode = !1), Basic.extend(this, {
				getShim: function() {
					return Dom.get(this.uid).content.Moxie
				},
				shimExec: function(component, action) {
					var args = [].slice.call(arguments, 2);
					return I.getShim().exec(this.uid, component, action, args)
				},
				init: function() {
					var container;
					container = this.getShimContainer(), container.innerHTML = '<object id="' + this.uid + '" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;"><param name="source" value="' + options.xap_url + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="uid=' + this.uid + ",target=" + Env.global_event_dispatcher + '"/></object>', initTimer = setTimeout(function() {
						I && !I.initialized && (I.trigger("Error", new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR)), MXI_DEBUG && Env.debug.runtime && Env.log("Silverlight failed to initialize within a specified period of time (5-10s)."))
					}, "Windows" !== Env.OS ? 1e4 : 5e3)
				},
				destroy: function(destroy) {
					return function() {
						destroy.call(I), clearTimeout(initTimer), options = initTimer = destroy = I = null
					}
				}(this.destroy)
			}, extensions)
		}
		var type = "silverlight",
			extensions = {};
		return Runtime.addConstructor(type, SilverlightRuntime), extensions
	}), define("moxie/runtime/silverlight/file/FileInput", ["moxie/runtime/silverlight/Runtime", "moxie/file/File", "moxie/core/utils/Basic"], function(extensions, File, Basic) {
		var FileInput = {
			init: function(options) {
				function toFilters(accept) {
					for (var filter = "", i = 0; i < accept.length; i++) filter += ("" !== filter ? "|" : "") + accept[i].title + " | *." + accept[i].extensions.replace(/,/g, ";*.");
					return filter
				}
				var comp = this,
					I = this.getRuntime();
				this.bind("Change", function() {
					var files = I.shimExec.call(comp, "FileInput", "getFiles");
					comp.files = [], Basic.each(files, function(file) {
						comp.files.push(new File(I.uid, file))
					})
				}, 999), this.getRuntime().shimExec.call(this, "FileInput", "init", toFilters(options.accept), options.name, options.multiple), this.trigger("ready")
			}
		};
		return extensions.FileInput = FileInput
	}), define("moxie/runtime/silverlight/file/Blob", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/Blob"], function(extensions, Basic, Blob) {
		return extensions.Blob = Basic.extend({}, Blob)
	}), define("moxie/runtime/silverlight/file/FileDrop", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Dom", "moxie/core/utils/Events"], function(extensions, Dom, Events) {
		var FileDrop = {
			init: function() {
				var dropZone, comp = this,
					self = comp.getRuntime();
				return dropZone = self.getShimContainer(), Events.addEvent(dropZone, "dragover", function(e) {
					e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy"
				}, comp.uid), Events.addEvent(dropZone, "dragenter", function(e) {
					e.preventDefault();
					var flag = Dom.get(self.uid).dragEnter(e);
					flag && e.stopPropagation()
				}, comp.uid), Events.addEvent(dropZone, "drop", function(e) {
					e.preventDefault();
					var flag = Dom.get(self.uid).dragDrop(e);
					flag && e.stopPropagation()
				}, comp.uid), self.shimExec.call(this, "FileDrop", "init")
			}
		};
		return extensions.FileDrop = FileDrop
	}), define("moxie/runtime/silverlight/file/FileReader", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/FileReader"], function(extensions, Basic, FileReader) {
		return extensions.FileReader = Basic.extend({}, FileReader)
	}), define("moxie/runtime/silverlight/file/FileReaderSync", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/FileReaderSync"], function(extensions, Basic, FileReaderSync) {
		return extensions.FileReaderSync = Basic.extend({}, FileReaderSync)
	}), define("moxie/runtime/silverlight/xhr/XMLHttpRequest", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/xhr/XMLHttpRequest"], function(extensions, Basic, XMLHttpRequest) {
		return extensions.XMLHttpRequest = Basic.extend({}, XMLHttpRequest)
	}), define("moxie/runtime/silverlight/runtime/Transporter", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/runtime/Transporter"], function(extensions, Basic, Transporter) {
		return extensions.Transporter = Basic.extend({}, Transporter)
	}), define("moxie/runtime/silverlight/image/Image", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/file/Blob", "moxie/runtime/flash/image/Image"], function(extensions, Basic, Blob, Image) {
		return extensions.Image = Basic.extend({}, Image, {
			getInfo: function() {
				var self = this.getRuntime(),
					grps = ["tiff", "exif", "gps", "thumb"],
					info = {
						meta: {}
					},
					rawInfo = self.shimExec.call(this, "Image", "getInfo");
				return rawInfo.meta && (Basic.each(grps, function(grp) {
					var tag, i, length, value, meta = rawInfo.meta[grp];
					if (meta && meta.keys) for (info.meta[grp] = {}, i = 0, length = meta.keys.length; length > i; i++) tag = meta.keys[i], value = meta[tag], value && (/^(\d|[1-9]\d+)$/.test(value) ? value = parseInt(value, 10) : /^\d*\.\d+$/.test(value) && (value = parseFloat(value)), info.meta[grp][tag] = value)
				}), !info.meta || !info.meta.thumb || info.meta.thumb.data instanceof Blob || (info.meta.thumb.data = new Blob(self.uid, info.meta.thumb.data))), info.width = parseInt(rawInfo.width, 10), info.height = parseInt(rawInfo.height, 10), info.size = parseInt(rawInfo.size, 10), info.type = rawInfo.type, info.name = rawInfo.name, info
			}
		})
	}), define("moxie/runtime/html4/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function(Basic, x, Runtime, Env) {
		function Html4Runtime(options) {
			var I = this,
				Test = Runtime.capTest,
				True = Runtime.capTrue;
			Runtime.call(this, options, type, {
				access_binary: Test(window.FileReader || window.File && File.getAsDataURL),
				access_image_binary: !1,
				display_media: Test(extensions.Image && (Env.can("create_canvas") || Env.can("use_data_uri_over32kb"))),
				do_cors: !1,
				drag_and_drop: !1,
				filter_by_extension: Test(function() {
					return "Chrome" === Env.browser && Env.verComp(Env.version, 28, ">=") || "IE" === Env.browser && Env.verComp(Env.version, 10, ">=") || "Safari" === Env.browser && Env.verComp(Env.version, 7, ">=")
				}()),
				resize_image: function() {
					return extensions.Image && I.can("access_binary") && Env.can("create_canvas")
				},
				report_upload_progress: !1,
				return_response_headers: !1,
				return_response_type: function(responseType) {
					return "json" === responseType && window.JSON ? !0 : !! ~Basic.inArray(responseType, ["text", "document", ""])
				},
				return_status_code: function(code) {
					return !Basic.arrayDiff(code, [200, 404])
				},
				select_file: function() {
					return Env.can("use_fileinput")
				},
				select_multiple: !1,
				send_binary_string: !1,
				send_custom_headers: !1,
				send_multipart: !0,
				slice_blob: !1,
				stream_upload: function() {
					return I.can("select_file")
				},
				summon_file_dialog: function() {
					return I.can("select_file") && ("Firefox" === Env.browser && Env.verComp(Env.version, 4, ">=") || "Opera" === Env.browser && Env.verComp(Env.version, 12, ">=") || "IE" === Env.browser && Env.verComp(Env.version, 10, ">=") || !! ~Basic.inArray(Env.browser, ["Chrome", "Safari"]))
				},
				upload_filesize: True,
				use_http_method: function(methods) {
					return !Basic.arrayDiff(methods, ["GET", "POST"])
				}
			}), Basic.extend(this, {
				init: function() {
					this.trigger("Init")
				},
				destroy: function(destroy) {
					return function() {
						destroy.call(I), destroy = I = null
					}
				}(this.destroy)
			}), Basic.extend(this.getShim(), extensions)
		}
		var type = "html4",
			extensions = {};
		return Runtime.addConstructor(type, Html4Runtime), extensions
	}), define("moxie/runtime/html4/file/FileInput", ["moxie/runtime/html4/Runtime", "moxie/file/File", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function(extensions, File, Basic, Dom, Events, Mime, Env) {
		function FileInput() {
			function addInput() {
				var shimContainer, browseButton, currForm, form, input, uid, comp = this,
					I = comp.getRuntime();
				uid = Basic.guid("uid_"), shimContainer = I.getShimContainer(), _uid && (currForm = Dom.get(_uid + "_form"), currForm && Basic.extend(currForm.style, {
					top: "100%"
				})), form = document.createElement("form"), form.setAttribute("id", uid + "_form"), form.setAttribute("method", "post"), form.setAttribute("enctype", "multipart/form-data"), form.setAttribute("encoding", "multipart/form-data"), Basic.extend(form.style, {
					overflow: "hidden",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				}), input = document.createElement("input"), input.setAttribute("id", uid), input.setAttribute("type", "file"), input.setAttribute("name", _options.name || "Filedata"), input.setAttribute("accept", _mimes.join(",")), Basic.extend(input.style, {
					fontSize: "999px",
					opacity: 0
				}), form.appendChild(input), shimContainer.appendChild(form), Basic.extend(input.style, {
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				}), "IE" === Env.browser && Env.verComp(Env.version, 10, "<") && Basic.extend(input.style, {
					filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
				}), input.onchange = function() {
					var file;
					if (this.value) {
						if (this.files) {
							if (file = this.files[0], 0 === file.size) return void form.parentNode.removeChild(form)
						} else file = {
							name: this.value
						};
						file = new File(I.uid, file), this.onchange = function() {}, addInput.call(comp), comp.files = [file], input.setAttribute("id", file.uid), form.setAttribute("id", file.uid + "_form"), comp.trigger("change"), input = form = null
					}
				}, I.can("summon_file_dialog") && (browseButton = Dom.get(_options.browse_button), Events.removeEvent(browseButton, "click", comp.uid), Events.addEvent(browseButton, "click", function(e) {
					input && !input.disabled && input.click(), e.preventDefault()
				}, comp.uid)), _uid = uid, shimContainer = currForm = browseButton = null
			}
			var _uid, _options, _mimes = [];
			Basic.extend(this, {
				init: function(options) {
					var shimContainer, comp = this,
						I = comp.getRuntime();
					_options = options, _mimes = options.accept.mimes || Mime.extList2mimes(options.accept, I.can("filter_by_extension")), shimContainer = I.getShimContainer(), function() {
						var browseButton, zIndex, top;
						browseButton = Dom.get(options.browse_button), I.can("summon_file_dialog") && ("static" === Dom.getStyle(browseButton, "position") && (browseButton.style.position = "relative"), zIndex = parseInt(Dom.getStyle(browseButton, "z-index"), 10) || 1, browseButton.style.zIndex = zIndex, shimContainer.style.zIndex = zIndex - 1), top = I.can("summon_file_dialog") ? browseButton : shimContainer, Events.addEvent(top, "mouseover", function() {
							comp.trigger("mouseenter")
						}, comp.uid), Events.addEvent(top, "mouseout", function() {
							comp.trigger("mouseleave")
						}, comp.uid), Events.addEvent(top, "mousedown", function() {
							comp.trigger("mousedown")
						}, comp.uid), Events.addEvent(Dom.get(options.container), "mouseup", function() {
							comp.trigger("mouseup")
						}, comp.uid), browseButton = null
					}(), addInput.call(this), shimContainer = null, comp.trigger({
						type: "ready",
						async: !0
					})
				},
				disable: function(state) {
					var input;
					(input = Dom.get(_uid)) && (input.disabled = !! state)
				},
				destroy: function() {
					var I = this.getRuntime(),
						shim = I.getShim(),
						shimContainer = I.getShimContainer();
					Events.removeAllEvents(shimContainer, this.uid), Events.removeAllEvents(_options && Dom.get(_options.container), this.uid), Events.removeAllEvents(_options && Dom.get(_options.browse_button), this.uid), shimContainer && (shimContainer.innerHTML = ""), shim.removeInstance(this.uid), _uid = _mimes = _options = shimContainer = shim = null
				}
			})
		}
		return extensions.FileInput = FileInput
	}), define("moxie/runtime/html4/file/FileReader", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/file/FileReader"], function(extensions, FileReader) {
		return extensions.FileReader = FileReader
	}), define("moxie/runtime/html4/xhr/XMLHttpRequest", ["moxie/runtime/html4/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Url", "moxie/core/Exceptions", "moxie/core/utils/Events", "moxie/file/Blob", "moxie/xhr/FormData"], function(extensions, Basic, Dom, Url, x, Events, Blob, FormData) {
		function XMLHttpRequest() {
			function cleanup(cb) {
				var uid, form, inputs, i, target = this,
					hasFile = !1;
				if (_iframe) {
					if (uid = _iframe.id.replace(/_iframe$/, ""), form = Dom.get(uid + "_form")) {
						for (inputs = form.getElementsByTagName("input"), i = inputs.length; i--;) switch (inputs[i].getAttribute("type")) {
						case "hidden":
							inputs[i].parentNode.removeChild(inputs[i]);
							break;
						case "file":
							hasFile = !0
						}
						inputs = [], hasFile || form.parentNode.removeChild(form), form = null
					}
					setTimeout(function() {
						Events.removeEvent(_iframe, "load", target.uid), _iframe.parentNode && _iframe.parentNode.removeChild(_iframe);
						var shimContainer = target.getRuntime().getShimContainer();
						shimContainer.children.length || shimContainer.parentNode.removeChild(shimContainer), shimContainer = _iframe = null, cb()
					}, 1)
				}
			}
			var _status, _response, _iframe;
			Basic.extend(this, {
				send: function(meta, data) {
					function createIframe() {
						var container = I.getShimContainer() || document.body,
							temp = document.createElement("div");
						temp.innerHTML = '<iframe id="' + uid + '_iframe" name="' + uid + '_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>', _iframe = temp.firstChild, container.appendChild(_iframe), Events.addEvent(_iframe, "load", function() {
							var el;
							try {
								el = _iframe.contentWindow.document || _iframe.contentDocument || window.frames[_iframe.id].document, /^4(0[0-9]|1[0-7]|2[2346])\s/.test(el.title) ? _status = el.title.replace(/^(\d+).*$/, "$1") : (_status = 200, _response = Basic.trim(el.body.innerHTML), target.trigger({
									type: "progress",
									loaded: _response.length,
									total: _response.length
								}), blob && target.trigger({
									type: "uploadprogress",
									loaded: blob.size || 1025,
									total: blob.size || 1025
								}))
							} catch (ex) {
								if (!Url.hasSameOrigin(meta.url)) return void cleanup.call(target, function() {
									target.trigger("error")
								});
								_status = 404
							}
							cleanup.call(target, function() {
								target.trigger("load")
							})
						}, target.uid)
					}
					var uid, form, input, blob, target = this,
						I = target.getRuntime();
					if (_status = _response = null, data instanceof FormData && data.hasBlob()) {
						if (blob = data.getBlob(), uid = blob.uid, input = Dom.get(uid), form = Dom.get(uid + "_form"), !form) throw new x.DOMException(x.DOMException.NOT_FOUND_ERR)
					} else uid = Basic.guid("uid_"), form = document.createElement("form"), form.setAttribute("id", uid + "_form"), form.setAttribute("method", meta.method), form.setAttribute("enctype", "multipart/form-data"), form.setAttribute("encoding", "multipart/form-data"), I.getShimContainer().appendChild(form);
					form.setAttribute("target", uid + "_iframe"), data instanceof FormData && data.each(function(value, name) {
						if (value instanceof Blob) input && input.setAttribute("name", name);
						else {
							var hidden = document.createElement("input");
							Basic.extend(hidden, {
								type: "hidden",
								name: name,
								value: value
							}), input ? form.insertBefore(hidden, input) : form.appendChild(hidden)
						}
					}), form.setAttribute("action", meta.url), createIframe(), form.submit(), target.trigger("loadstart")
				},
				getStatus: function() {
					return _status
				},
				getResponse: function(responseType) {
					if ("json" === responseType && "string" === Basic.typeOf(_response) && window.JSON) try {
						return JSON.parse(_response.replace(/^\s*<pre[^>]*>/, "").replace(/<\/pre>\s*$/, ""))
					} catch (ex) {
						return null
					}
					return _response
				},
				abort: function() {
					var target = this;
					_iframe && _iframe.contentWindow && (_iframe.contentWindow.stop ? _iframe.contentWindow.stop() : _iframe.contentWindow.document.execCommand ? _iframe.contentWindow.document.execCommand("Stop") : _iframe.src = "about:blank"), cleanup.call(this, function() {
						target.dispatchEvent("abort")
					})
				}
			})
		}
		return extensions.XMLHttpRequest = XMLHttpRequest
	}), define("moxie/runtime/html4/image/Image", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/image/Image"], function(extensions, Image) {
		return extensions.Image = Image
	}), expose(["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/I18n", "moxie/core/utils/Mime", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/file/FileInput", "moxie/core/utils/Encode", "moxie/file/Blob", "moxie/file/File", "moxie/file/FileDrop", "moxie/file/FileReader", "moxie/core/utils/Url", "moxie/runtime/RuntimeTarget", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/xhr/XMLHttpRequest", "moxie/runtime/Transporter", "moxie/image/Image", "moxie/core/utils/Events"])
}(this), function(exports) {
	"use strict";
	var o = {},
		inArray = exports.moxie.core.utils.Basic.inArray;
	return function addAlias(ns) {
		var name, itemType;
		for (name in ns) itemType = typeof ns[name], "object" !== itemType || ~inArray(name, ["Exceptions", "Env", "Mime"]) ? "function" === itemType && (o[name] = ns[name]) : addAlias(ns[name])
	}(exports.moxie), o.Env = exports.moxie.core.utils.Env, o.Mime = exports.moxie.core.utils.Mime, o.Exceptions = exports.moxie.core.Exceptions, exports.mOxie = o, exports.o || (exports.o = o), o
}(this), function(window, o, undef) {
	function normalizeCaps(settings) {
		function resolve(feature, value, strict) {
			var map = {
				chunks: "slice_blob",
				jpgresize: "send_binary_string",
				pngresize: "send_binary_string",
				progress: "report_upload_progress",
				multi_selection: "select_multiple",
				dragdrop: "drag_and_drop",
				drop_element: "drag_and_drop",
				headers: "send_custom_headers",
				urlstream_upload: "send_binary_string",
				canSendBinary: "send_binary",
				triggerDialog: "summon_file_dialog"
			};
			map[feature] ? caps[map[feature]] = value : strict || (caps[feature] = value)
		}
		var features = settings.required_features,
			caps = {};
		return "string" == typeof features ? plupload.each(features.split(/\s*,\s*/), function(feature) {
			resolve(feature, !0)
		}) : "object" == typeof features ? plupload.each(features, function(value, feature) {
			resolve(feature, value)
		}) : features === !0 && (settings.chunk_size > 0 && (caps.slice_blob = !0), (settings.resize.enabled || !settings.multipart) && (caps.send_binary_string = !0), plupload.each(settings, function(value, feature) {
			resolve(feature, !! value, !0)
		})), caps
	}
	var delay = window.setTimeout,
		fileFilters = {},
		plupload = {
			VERSION: "2.1.9",
			STOPPED: 1,
			STARTED: 2,
			QUEUED: 1,
			UPLOADING: 2,
			FAILED: 4,
			DONE: 5,
			HASHING: 10,
			DELETED: 11,
			SUSPEND: 1e5,
			NETWORK_TIMEOUT: -50001,
			GENERIC_ERROR: -100,
			HTTP_ERROR: -200,
			IO_ERROR: -300,
			SECURITY_ERROR: -400,
			INIT_ERROR: -500,
			FILE_SIZE_ERROR: -600,
			FILE_EXTENSION_ERROR: -601,
			FILE_DUPLICATE_ERROR: -602,
			IMAGE_FORMAT_ERROR: -700,
			MEMORY_ERROR: -701,
			IMAGE_DIMENSIONS_ERROR: -702,
			mimeTypes: o.mimes,
			ua: o.ua,
			typeOf: o.typeOf,
			extend: o.extend,
			guid: o.guid,
			getAll: function(ids) {
				var el, els = [];
				"array" !== plupload.typeOf(ids) && (ids = [ids]);
				for (var i = ids.length; i--;) el = plupload.get(ids[i]), el && els.push(el);
				return els.length ? els : null
			},
			get: o.get,
			each: o.each,
			getPos: o.getPos,
			getSize: o.getSize,
			xmlEncode: function(str) {
				var xmlEncodeChars = {
					"<": "lt",
					">": "gt",
					"&": "amp",
					'"': "quot",
					"'": "#39"
				},
					xmlEncodeRegExp = /[<>&\"\']/g;
				return str ? ("" + str).replace(xmlEncodeRegExp, function(chr) {
					return xmlEncodeChars[chr] ? "&" + xmlEncodeChars[chr] + ";" : chr
				}) : str
			},
			toArray: o.toArray,
			inArray: o.inArray,
			addI18n: o.addI18n,
			translate: o.translate,
			isEmptyObj: o.isEmptyObj,
			hasClass: o.hasClass,
			addClass: o.addClass,
			removeClass: o.removeClass,
			getStyle: o.getStyle,
			addEvent: o.addEvent,
			removeEvent: o.removeEvent,
			removeAllEvents: o.removeAllEvents,
			cleanName: function(name) {
				var i, lookup;
				for (lookup = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"], i = 0; i < lookup.length; i += 2) name = name.replace(lookup[i], lookup[i + 1]);
				return name = name.replace(/\s+/g, "_"), name = name.replace(/[^a-z0-9_\-\.]+/gi, "")
			},
			buildUrl: function(url, items) {
				var query = "";
				return plupload.each(items, function(value, name) {
					query += (query ? "&" : "") + encodeURIComponent(name) + "=" + encodeURIComponent(value)
				}), query && (url += (url.indexOf("?") > 0 ? "&" : "?") + query), url
			},
			formatSize: function(size) {
				function round(num, precision) {
					return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
				}
				if (size === undef || /\D/.test(size)) return plupload.translate("N/A");
				var boundary = Math.pow(1024, 4);
				return size > boundary ? round(size / boundary, 1) + " " + plupload.translate("tb") : size > (boundary /= 1024) ? round(size / boundary, 1) + " " + plupload.translate("gb") : size > (boundary /= 1024) ? round(size / boundary, 1) + " " + plupload.translate("mb") : size > 1024 ? Math.round(size / 1024) + " " + plupload.translate("kb") : size + " " + plupload.translate("b")
			},
			parseSize: o.parseSizeStr,
			predictRuntime: function(config, runtimes) {
				var up, runtime;
				return up = new plupload.Uploader(config), runtime = o.Runtime.thatCan(up.getOption().required_features, runtimes || config.runtimes), up.destroy(), runtime
			},
			addFileFilter: function(name, cb) {
				fileFilters[name] = cb
			}
		};
	plupload.addFileFilter("mime_types", function(filters, file, cb) {
		filters.length && !filters.regexp.test(file.name) ? (this.trigger("Error", {
			code: plupload.FILE_EXTENSION_ERROR,
			message: plupload.translate("File extension error."),
			file: file
		}), cb(!1)) : cb(!0)
	}), plupload.addFileFilter("max_file_size", function(maxSize, file, cb) {
		var undef;
		maxSize = plupload.parseSize(maxSize), file.size !== undef && maxSize && file.size > maxSize ? (this.trigger("Error", {
			code: plupload.FILE_SIZE_ERROR,
			message: plupload.translate("File size error."),
			file: file
		}), cb(!1)) : cb(!0)
	}), plupload.addFileFilter("prevent_duplicates", function(value, file, cb) {
		if (value) for (var ii = this.files.length; ii--;) if (file.name === this.files[ii].name && file.size === this.files[ii].size) return this.trigger("Error", {
			code: plupload.FILE_DUPLICATE_ERROR,
			message: plupload.translate("Duplicate file error."),
			file: file
		}), void cb(!1);
		cb(!0)
	}), plupload.Uploader = function(options) {
		function uploadNext() {
			var file, i, count = 0;
			if (this.state == plupload.STARTED) {
				for (i = 0; i < files.length; i++) file || files[i].status != plupload.QUEUED ? count++ : (file = files[i], this.trigger("BeforeUpload", file) && (file.status = plupload.UPLOADING, this.trigger("UploadFile", file)));
				count == files.length && (this.state !== plupload.STOPPED && (this.state = plupload.STOPPED, this.trigger("StateChanged")), this.trigger("UploadComplete", files))
			}
		}
		function calcFile(file) {
			file.percent = file.size > 0 ? Math.ceil(file.loaded / file.size * 100) : 100, calc();
		}
		function calc() {
			var i, file;
			for (total.reset(), i = 0; i < files.length; i++) file = files[i], file.size !== undef ? (total.size += file.origSize, total.loaded += file.loaded * file.origSize / file.size) : total.size = undef, file.status == plupload.DONE ? total.uploaded++ : file.status == plupload.FAILED ? total.failed++ : total.queued++;
			total.size === undef ? total.percent = files.length > 0 ? Math.ceil(total.uploaded / files.length * 100) : 0 : (total.bytesPerSec = Math.ceil(total.loaded / ((+new Date - startTime || 1) / 1e3)), total.percent = total.size > 0 ? Math.ceil(total.loaded / total.size * 100) : 0)
		}
		function getRUID() {
			var ctrl = fileInputs[0] || fileDrops[0];
			return ctrl ? ctrl.getRuntime().uid : !1
		}
		function runtimeCan(file, cap) {
			if (file.ruid) {
				var info = o.Runtime.getInfo(file.ruid);
				if (info) return info.can(cap)
			}
			return !1
		}
		function bindEventListeners() {
			this.bind("FilesAdded FilesRemoved", function(up) {
				up.trigger("QueueChanged"), up.refresh()
			}), this.bind("CancelUpload", onCancelUpload), this.bind("BeforeUpload", onBeforeUpload), this.bind("UploadFile", onUploadFile), this.bind("UploadProgress", onUploadProgress), this.bind("StateChanged", onStateChanged), this.bind("QueueChanged", calc), this.bind("Error", onError), this.bind("FileUploaded", onFileUploaded), this.bind("Destroy", onDestroy)
		}
		function initControls(settings, cb) {
			var self = this,
				inited = 0,
				queue = [],
				options = {
					runtime_order: settings.runtimes,
					required_caps: settings.required_features,
					preferred_caps: preferred_caps,
					swf_url: settings.flash_swf_url,
					xap_url: settings.silverlight_xap_url
				};
			plupload.each(settings.runtimes.split(/\s*,\s*/), function(runtime) {
				settings[runtime] && (options[runtime] = settings[runtime])
			}), settings.browse_button && plupload.each(settings.browse_button, function(el) {
				queue.push(function(cb) {
					var fileInput = new o.FileInput(plupload.extend({}, options, {
						accept: settings.filters.mime_types,
						name: settings.file_data_name,
						multiple: settings.multi_selection,
						container: settings.container,
						browse_button: el
					}));
					fileInput.onready = function() {
						var info = o.Runtime.getInfo(this.ruid);
						o.extend(self.features, {
							chunks: info.can("slice_blob"),
							multipart: info.can("send_multipart"),
							multi_selection: info.can("select_multiple")
						}), inited++, fileInputs.push(this), cb()
					}, fileInput.onchange = function() {
						self.addFile(this.files)
					}, fileInput.bind("mouseenter mouseleave mousedown mouseup", function(e) {
						disabled || (settings.browse_button_hover && ("mouseenter" === e.type ? o.addClass(el, settings.browse_button_hover) : "mouseleave" === e.type && o.removeClass(el, settings.browse_button_hover)), settings.browse_button_active && ("mousedown" === e.type ? o.addClass(el, settings.browse_button_active) : "mouseup" === e.type && o.removeClass(el, settings.browse_button_active)))
					}), fileInput.bind("mousedown", function() {
						self.trigger("Browse")
					}), fileInput.bind("error runtimeerror", function() {
						fileInput = null, cb()
					}), fileInput.init()
				})
			}), settings.drop_element && plupload.each(settings.drop_element, function(el) {
				queue.push(function(cb) {
					var fileDrop = new o.FileDrop(plupload.extend({}, options, {
						drop_zone: el
					}));
					fileDrop.onready = function() {
						var info = o.Runtime.getInfo(this.ruid);
						o.extend(self.features, {
							chunks: info.can("slice_blob"),
							multipart: info.can("send_multipart"),
							dragdrop: info.can("drag_and_drop")
						}), inited++, fileDrops.push(this), cb()
					}, fileDrop.ondrop = function() {
						self.addFile(this.files)
					}, fileDrop.bind("error runtimeerror", function() {
						fileDrop = null, cb()
					}), fileDrop.init()
				})
			}), o.inSeries(queue, function() {
				"function" == typeof cb && cb(inited)
			})
		}
		function resizeImage(blob, params, cb) {
			var img = new o.Image;
			try {
				img.onload = function() {
					return params.width > this.width && params.height > this.height && params.quality === undef && params.preserve_headers && !params.crop ? (this.destroy(), cb(blob)) : void img.downsize(params.width, params.height, params.crop, params.preserve_headers)
				}, img.onresize = function() {
					cb(this.getAsBlob(blob.type, params.quality)), this.destroy()
				}, img.onerror = function() {
					cb(blob)
				}, img.load(blob)
			} catch (ex) {
				cb(blob)
			}
		}
		function setOption(option, value, init) {
			function _setOption(option, value, init) {
				var oldValue = settings[option];
				switch (option) {
				case "max_file_size":
					"max_file_size" === option && (settings.max_file_size = settings.filters.max_file_size = value);
					break;
				case "chunk_size":
				case "chunk_size_part1":
				case "chunk_size_step":
					(value = plupload.parseSize(value)) && (settings[option] = value, settings.send_file_name = !0);
					break;
				case "multipart":
					settings[option] = value, value || (settings.send_file_name = !0);
					break;
				case "unique_names":
					settings[option] = value, value && (settings.send_file_name = !0);
					break;
				case "filters":
					"array" === plupload.typeOf(value) && (value = {
						mime_types: value
					}), init ? plupload.extend(settings.filters, value) : settings.filters = value, value.mime_types && (settings.filters.mime_types.regexp = function(filters) {
						var extensionsRegExp = [];
						return plupload.each(filters, function(filter) {
							plupload.each(filter.extensions.split(/,/), function(ext) {
								/^\s*\*\s*$/.test(ext) ? extensionsRegExp.push("\\.*") : extensionsRegExp.push("\\." + ext.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"))
							})
						}), new RegExp("(" + extensionsRegExp.join("|") + ")$", "i")
					}(settings.filters.mime_types));
					break;
				case "resize":
					init ? plupload.extend(settings.resize, value, {
						enabled: !0
					}) : settings.resize = value;
					break;
				case "prevent_duplicates":
					settings.prevent_duplicates = settings.filters.prevent_duplicates = !! value;
					break;
				case "container":
				case "browse_button":
				case "drop_element":
					value = "container" === option ? plupload.get(value) : plupload.getAll(value);
				case "runtimes":
				case "multi_selection":
				case "flash_swf_url":
				case "silverlight_xap_url":
					settings[option] = value, init || (reinitRequired = !0);
					break;
				default:
					settings[option] = value
				}
				init || self.trigger("OptionChanged", option, value, oldValue)
			}
			var self = this,
				reinitRequired = !1;
			"object" == typeof option ? plupload.each(option, function(value, option) {
				_setOption(option, value, init)
			}) : _setOption(option, value, init), init ? (settings.required_features = normalizeCaps(plupload.extend({}, settings)), preferred_caps = normalizeCaps(plupload.extend({}, settings, {
				required_features: !0
			}))) : reinitRequired && (self.trigger("Destroy"), initControls.call(self, settings, function(inited) {
				inited ? (self.runtime = o.Runtime.getInfo(getRUID()).type, self.trigger("Init", {
					runtime: self.runtime
				}), self.trigger("PostInit")) : self.trigger("Error", {
					code: plupload.INIT_ERROR,
					message: plupload.translate("Init error.")
				})
			}))
		}
		function onBeforeUpload(up, file) {
			if (up.settings.unique_names) {
				var matches = file.name.match(/\.([^.]+)$/),
					ext = "part";
				matches && (ext = matches[1]), file.target_name = file.id + "." + ext
			}
		}
		function onUploadFile(up, file) {
			function handleError(errorCode) {
				retries-- > 0 ? delay(uploadNextChunk, 1e3) : (file.loaded = offset, up.trigger("Error", {
					code: errorCode || plupload.HTTP_ERROR,
					message: plupload.translate("HTTP Error."),
					file: file,
					response: xhr.responseText,
					status: xhr.status,
					responseHeaders: xhr.getAllResponseHeaders()
				}))
			}
			function uploadNextChunk() {
				function startXhr() {
					xhr = new o.XMLHttpRequest;
					var tid = setTimeout(function() {
						xhr && 4 == xhr.readyState || handleError(plupload.NETWORK_TIMEOUT)
					}, 12e4);
					xhr.upload && (xhr.upload.onprogress = function(e) {
						file.loaded = Math.min(file.size, offset + e.loaded), up.trigger("UploadProgress", file)
					}), xhr.onabort = function() {
						clearTimeout(tid)
					}, xhr.onload = function() {
						if (xhr.status >= 400) return void handleError();
						if (xhr.responseText) try {
							var retJson = JSON.parse(xhr.responseText),
								code = retJson.hasOwnProperty("code") && retJson.code,
								__offset = retJson.hasOwnProperty("offset") && retJson.offset;
							if (0 != code) return __offset !== !1 && (offset = __offset), handleError(retJson.code);
							if (__offset !== !1 && 0 === __offset) return handleError(-5e4)
						} catch (xe) {}
						retries = up.settings.max_retries, currChunkSize < blob.size ? (chunkBlob.destroy(), offset += currChunkSize, file.loaded = Math.min(offset, blob.size), up.trigger("ChunkUploaded", file, {
							offset: file.loaded,
							total: blob.size,
							response: xhr.responseText,
							status: xhr.status,
							responseHeaders: xhr.getAllResponseHeaders()
						}), "Android Browser" === o.Env.browser && up.trigger("UploadProgress", file)) : file.loaded = file.size, chunkBlob = formData = null, !offset || offset >= blob.size ? (file.size != file.origSize && (blob.destroy(), blob = null), up.trigger("UploadProgress", file), file.status = plupload.DONE, up.trigger("FileUploaded", file, {
							response: xhr.responseText,
							status: xhr.status,
							responseHeaders: xhr.getAllResponseHeaders()
						})) : (file.currChunkStartUpTime = +new Date, delay(uploadNextChunk, 1))
					}, xhr.onerror = function() {
						handleError()
					}, xhr.onloadend = function() {
						clearTimeout(tid), this.destroy(), xhr = null
					}, up.settings.multipart && features.multipart ? (xhr.open("post", url, !0), plupload.each(up.settings.headers, function(value, name) {
						xhr.setRequestHeader(name, value)
					}), formData = new o.FormData, plupload.each(args, function(value, name) {
						formData.append(name, value)
					}), formData.append(up.settings.file_data_name, chunkBlob), xhr.send(formData, {
						runtime_order: up.settings.runtimes,
						required_caps: up.settings.required_features,
						preferred_caps: preferred_caps,
						swf_url: up.settings.flash_swf_url,
						xap_url: up.settings.silverlight_xap_url
					})) : (url = plupload.buildUrl(up.settings.url, args), xhr.open("post", url, !0), xhr.setRequestHeader("Content-Type", "application/octet-stream"), plupload.each(up.settings.headers, function(value, name) {
						xhr.setRequestHeader(name, value)
					}), xhr.send(chunkBlob, {
						runtime_order: up.settings.runtimes,
						required_caps: up.settings.required_features,
						preferred_caps: preferred_caps,
						swf_url: up.settings.flash_swf_url,
						xap_url: up.settings.silverlight_xap_url
					}))
				}
				file.loaded != offset && (offset = file.loaded);
				var chunkBlob, formData, currChunkSize, args = plupload.extend({}, up.settings.multipart_params);
				if (file.status === plupload.UPLOADING && up.state !== plupload.STOPPED) {
					up.settings.send_file_name && (args.name = file.target_name || file.name), file.speedInKB && (chunkSizeMax = file.speedInKB < 50 ? 524288 : file.speedInKB < 100 ? 1048576 : file.speedInKB < 250 ? 2097152 : file.speedInKB < 500 ? 4194304 : 5242880);
					var useChunkSize = 0;
					0 == file.loaded || file.is_from_resume ? useChunkSize = file.currChunkSize = chunkSizePart1 : (file.currChunkSize += chunkSizeStep, file.currChunkSize >= chunkSizeMax && (file.currChunkSize = chunkSizeMax), useChunkSize = file.currChunkSize), delete file.is_from_resume, useChunkSize && features.chunks && blob.size > useChunkSize ? (currChunkSize = Math.min(useChunkSize, blob.size - offset), chunkBlob = blob.slice(offset, offset + currChunkSize)) : (currChunkSize = blob.size, chunkBlob = blob), file.currChunkSize = currChunkSize;
					var waitSignature = !1;
					if (useChunkSize && features.chunks) {
						up.settings.send_chunk_number ? args.offset = offset : (args.offset = offset, args.total = blob.size), args.dataSize = currChunkSize ? currChunkSize : 0, args.Action = "MultipartUploadVodFile", args.Region = "gz", args.Timestamp = String(parseInt(+new Date / 1e3)), args.Nonce = Math.ceil(1e4 * Math.random()), args.utype = 1, extBusiness.transcodeNotifyUrl && (args.notifyUrl = extBusiness.transcodeNotifyUrl), file.hasOwnProperty("isTranscode") && (args.isTranscode = file.isTranscode), file.hasOwnProperty("isWatermark") && (args.isWatermark = file.isWatermark), file.hasOwnProperty("classId") && (args.classId = file.classId), args = ksort(args);
						var sigString = "POST" + extBusiness.web_upload_url.replace("https://", "") + "?";
						plupload.each(args, function(e, i) {
							sigString += i + "=" + e + "&"
						}), sigString = sigString.substr(0, sigString.length - 1), waitSignature = !0
					}
					waitSignature ? up.settings.signature(sigString, function(Signature) {
						args.Signature = Signature, startXhr()
					}) : startXhr()
				}
			}
			var blob, url = up.settings.url,
				chunkSizeMax = up.settings.chunk_size,
				chunkSizePart1 = up.settings.chunk_size_part1,
				chunkSizeStep = up.settings.chunk_size_step,
				extBusiness = up.settings.extBusiness,
				retries = up.settings.max_retries,
				features = up.features,
				offset = 0;
			file.currChunkSize = 0, file.currChunkStartUpTime = +new Date, file.loaded && (offset = file.loaded = chunkSizePart1 ? chunkSizePart1 * Math.floor(file.loaded / chunkSizePart1) : 0), blob = file.getSource(), up.settings.resize.enabled && runtimeCan(blob, "send_binary_string") && ~o.inArray(blob.type, ["image/jpeg", "image/png"]) ? resizeImage.call(this, blob, up.settings.resize, function(resizedBlob) {
				blob = resizedBlob, file.size = resizedBlob.size, uploadNextChunk()
			}) : uploadNextChunk()
		}
		function onUploadProgress(up, file) {
			calcFile(file)
		}
		function onStateChanged(up) {
			if (up.state == plupload.STARTED) startTime = +new Date;
			else if (up.state == plupload.STOPPED) for (var i = up.files.length - 1; i >= 0; i--) up.files[i].status == plupload.UPLOADING && (up.files[i].status = plupload.QUEUED, calc())
		}
		function onCancelUpload() {
			xhr && (xhr.abort(), xhr.onabort && xhr.onabort())
		}
		function onFileUploaded(up) {
			calc(), delay(function() {
				uploadNext.call(up)
			}, 1)
		}
		function onError(up, err) {
			err.code === plupload.INIT_ERROR ? up.destroy() : err.file && (err.file.status = plupload.FAILED, calcFile(err.file), up.state == plupload.STARTED && (up.trigger("CancelUpload"), delay(function() {
				uploadNext.call(up)
			}, 1)))
		}
		function onDestroy(up) {
			up.stop(), plupload.each(files, function(file) {
				file.destroy()
			}), files = [], fileInputs.length && (plupload.each(fileInputs, function(fileInput) {
				fileInput.destroy()
			}), fileInputs = []), fileDrops.length && (plupload.each(fileDrops, function(fileDrop) {
				fileDrop.destroy()
			}), fileDrops = []), preferred_caps = {}, disabled = !1, startTime = xhr = null, total.reset()
		}
		var settings, startTime, total, xhr, uid = plupload.guid(),
			files = [],
			preferred_caps = {},
			fileInputs = [],
			fileDrops = [],
			disabled = !1;
		settings = {
			runtimes: o.Runtime.order,
			max_retries: 0,
			chunk_size: 0,
			multipart: !0,
			multi_selection: !0,
			file_data_name: "file",
			flash_swf_url: "js/Moxie.swf",
			silverlight_xap_url: "js/Moxie.xap",
			filters: {
				mime_types: [],
				prevent_duplicates: !1,
				max_file_size: 0
			},
			resize: {
				enabled: !1,
				preserve_headers: !0,
				crop: !1
			},
			send_file_name: !0,
			send_chunk_number: !0
		}, setOption.call(this, options, null, !0), total = new plupload.QueueProgress, plupload.extend(this, {
			id: uid,
			uid: uid,
			state: plupload.STOPPED,
			features: {},
			runtime: null,
			files: files,
			settings: settings,
			total: total,
			init: function() {
				var preinitOpt, err, self = this;
				return preinitOpt = self.getOption("preinit"), "function" == typeof preinitOpt ? preinitOpt(self) : plupload.each(preinitOpt, function(func, name) {
					self.bind(name, func)
				}), bindEventListeners.call(self), plupload.each(["container", "browse_button", "drop_element"], function(el) {
					return null === self.getOption(el) ? (err = {
						code: plupload.INIT_ERROR,
						message: plupload.translate("'%' specified, but cannot be found.")
					}, !1) : void 0
				}), err ? self.trigger("Error", err) : settings.browse_button || settings.drop_element ? void initControls.call(self, settings, function(inited) {
					var initOpt = self.getOption("init");
					"function" == typeof initOpt ? initOpt(self) : plupload.each(initOpt, function(func, name) {
						self.bind(name, func)
					}), inited ? (self.runtime = o.Runtime.getInfo(getRUID()).type, self.trigger("Init", {
						runtime: self.runtime
					}), self.trigger("PostInit")) : self.trigger("Error", {
						code: plupload.INIT_ERROR,
						message: plupload.translate("Init error.")
					})
				}) : self.trigger("Error", {
					code: plupload.INIT_ERROR,
					message: plupload.translate("You must specify either 'browse_button' or 'drop_element'.")
				})
			},
			setOption: function(option, value) {
				setOption.call(this, option, value, !this.runtime)
			},
			getOption: function(option) {
				return option ? settings[option] : settings
			},
			refresh: function() {
				fileInputs.length && plupload.each(fileInputs, function(fileInput) {
					fileInput.trigger("Refresh")
				}), this.trigger("Refresh")
			},
			start: function() {
				this.state != plupload.STARTED && (this.state = plupload.STARTED, this.trigger("StateChanged"), uploadNext.call(this))
			},
			stop: function() {
				this.state != plupload.STOPPED && (this.state = plupload.STOPPED, this.trigger("StateChanged"), this.trigger("CancelUpload"))
			},
			disableBrowse: function() {
				disabled = arguments[0] !== undef ? arguments[0] : !0, fileInputs.length && plupload.each(fileInputs, function(fileInput) {
					fileInput.disable(disabled)
				}), this.trigger("DisableBrowse", disabled)
			},
			getFile: function(id) {
				var i;
				for (i = files.length - 1; i >= 0; i--) if (files[i].id === id) return files[i]
			},
			addFile: function(file, fileName) {
				function filterFile(file, cb) {
					var queue = [];
					o.each(self.settings.filters, function(rule, name) {
						fileFilters[name] && queue.push(function(cb) {
							fileFilters[name].call(self, rule, file, function(res) {
								cb(!res)
							})
						})
					}), o.inSeries(queue, cb)
				}
				function resolveFile(file) {
					var type = o.typeOf(file);
					if (file instanceof o.File) {
						if (!file.ruid && !file.isDetached()) {
							if (!ruid) return !1;
							file.ruid = ruid, file.connectRuntime(ruid)
						}
						resolveFile(new plupload.File(file))
					} else file instanceof o.Blob ? (resolveFile(file.getSource()), file.destroy()) : file instanceof plupload.File ? (fileName && (file.name = fileName), queue.push(function(cb) {
						filterFile(file, function(err) {
							err || (files.push(file), filesAdded.push(file), self.trigger("FileFiltered", file)), delay(cb, 1)
						})
					})) : -1 !== o.inArray(type, ["file", "blob"]) ? resolveFile(new o.File(null, file)) : "node" === type && "filelist" === o.typeOf(file.files) ? o.each(file.files, resolveFile) : "array" === type && (fileName = null, o.each(file, resolveFile))
				}
				var ruid, self = this,
					queue = [],
					filesAdded = [];
				ruid = getRUID(), resolveFile(file), queue.length && o.inSeries(queue, function() {
					filesAdded.length && self.trigger("FilesAdded", filesAdded)
				})
			},
			removeFile: function(file) {
				for (var id = "string" == typeof file ? file : file.id, i = files.length - 1; i >= 0; i--) if (files[i].id === id) return this.splice(i, 1)[0]
			},
			splice: function(start, length) {
				var removed = files.splice(start === undef ? 0 : start, length === undef ? files.length : length),
					restartRequired = !1;
				return this.state == plupload.STARTED && (plupload.each(removed, function(file) {
					return file.status === plupload.UPLOADING ? (restartRequired = !0, !1) : void 0
				}), restartRequired && this.stop()), this.trigger("FilesRemoved", removed), plupload.each(removed, function(file) {
					file.destroy()
				}), restartRequired && this.start(), removed
			},
			dispatchEvent: function(type) {
				var list, args;
				if (type = type.toLowerCase(), list = this.hasEventListener(type)) {
					list.sort(function(a, b) {
						return b.priority - a.priority
					}), args = [].slice.call(arguments), args.shift(), args.unshift(this);
					for (var i = 0; i < list.length; i++) if (list[i].fn.apply(list[i].scope, args) === !1) return !1
				}
				return !0
			},
			bind: function(name, fn, scope, priority) {
				plupload.Uploader.prototype.bind.call(this, name, fn, priority, scope)
			},
			destroy: function() {
				this.trigger("Destroy"), settings = total = null, this.unbindAll()
			}
		})
	}, plupload.Uploader.prototype = o.EventTarget.instance, plupload.File = function() {
		function PluploadFile(file) {
			plupload.extend(this, {
				id: plupload.guid(),
				name: file.name || file.fileName,
				type: file.type || "",
				size: file.size || file.fileSize,
				origSize: file.size || file.fileSize,
				loaded: 0,
				percent: 0,
				status: plupload.QUEUED,
				lastModifiedDate: file.lastModifiedDate || (new Date).toLocaleString(),
				getNative: function() {
					var file = this.getSource().getSource();
					return -1 !== o.inArray(o.typeOf(file), ["blob", "file"]) ? file : null
				},
				getSource: function() {
					return filepool[this.id] ? filepool[this.id] : null
				},
				destroy: function() {
					var src = this.getSource();
					src && (src.destroy(), delete filepool[this.id])
				}
			}), filepool[this.id] = file
		}
		var filepool = {};
		return PluploadFile
	}(), plupload.QueueProgress = function() {
		var self = this;
		self.size = 0, self.loaded = 0, self.uploaded = 0, self.failed = 0, self.queued = 0, self.percent = 0, self.bytesPerSec = 0, self.reset = function() {
			self.size = self.loaded = self.uploaded = self.failed = self.queued = self.percent = self.bytesPerSec = 0
		}
	}, window.plupload = plupload
}(window, mOxie), qcVideo("AS3_Worker", function(Log, $) {
	var getASObject = function(fn) {
			var id = "trump_test",
				one = null;
			try {
				var ctx1 = document.getElementById(id + "_object"),
					ctx2 = document.getElementById(id + "_embed");
				ctx1 && ctx1.getSHAandResult ? one = ctx1 : ctx2 && ctx2.getSHAandResult && (one = ctx2)
			} catch (xe) {} !! one && fn(one)
		},
		makeUploaderSwf = function(opt) {
			var eid = "trump_test",
				address = "//qzonestyle.gtimg.cn/open/qcloud/js/vod/sdk/FileUploader.swf?max_age=20000013",
				__ = [],
				_ = function(str) {
					__.push(str)
				};
			_('<object data="' + address + '" id="' + eid + '_object" width="' + opt.width + 'px" height="' + opt.height + 'px"  style="background-color:#000000;" '), _('align="middle" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=9,0,0,0">'), _('<param name="flashVars" value="' + (opt.flashvars || "") + '"  />'), _('<param name="src" value="' + address + '"  />'), _('<param name="wmode" value="window"/>'), _('<param name="quality" value="High"/>'), _('<param name="allowScriptAccess" value="always"/>'), _('<param name="allowNetworking" value="all"/>'), _('<param name="allowFullScreen" value="true"/>'), _('<embed style="background-color:#000000;"  id="' + eid + '_embed" width="' + opt.width + 'px" height="' + opt.height + 'px" flashvars="' + (opt.flashvars || "") + '"'), _('align="middle" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowfullscreen="true" bgcolor="#000000" quality="high"'), _('src="' + address + '"'), _('wmode="window" allowfullscreen="true" invokeurls="false" allownetworking="all" allowscriptaccess="always">'), _("</object>");
			var style = "position: absolute;top: 0px;left: 0px;width: 1px;height: 1px;overflow: hidden;";
			return '<div style="' + style + '">' + __.join("") + "</div>"
		},
		Cache = {},
		uuid = 1e3;
	window.FileUploaderCallback = function(cmd, opt) {
		var worker = Cache[opt.id];
		worker && worker.callback(cmd, opt)
	};
	var Worker = function() {
			this._event = {}, this._id = uuid += 1
		};
	return Worker.getInstance = function() {
		var worker = new Worker;
		return Cache[worker.getId()] = worker
	}, Worker.loadSwf = function() {
		var $body = $("body");
		$body.get(0) ? $body.append(makeUploaderSwf({
			width: 1,
			height: 1
		})) : $(function() {
			$("body").append(makeUploaderSwf({
				width: 1,
				height: 1
			}))
		})
	}, $.extend(Worker.prototype, {
		getId: function() {
			return this._id
		},
		callback: function(cmd, opt) {
			"0" == cmd && this.eachMessageHandler(function(fn) {
				fn({
					data: {
						result: opt.sha
					}
				})
			})
		},
		eachMessageHandler: function(fn) {
			for (var list = this._event && this._event.message ? this._event.message : [], i = 0, j = list.length; j > i; i++) fn(list[i])
		},
		addEventListener: function(event, handler) {
			this._event[event] || (this._event[event] = []), this._event[event].push(handler)
		},
		terminate: function() {
			delete Cache[this.getId()]
		},
		postMessage: function(event) {
			var message = event.message,
				isEnd = event.block.end == event.block.file_size,
				opt = {
					data: {
						block: event.block
					}
				},
				id = this.getId();
			if (getASObject(function(aso) {
				aso.updateSHA(id, message.slice(message.indexOf("base64,") + 7))
			}), isEnd) {
				var id = this.getId();
				getASObject(function(aso) {
					aso.getSHAandResult(id)
				})
			} else this.eachMessageHandler(function(fn) {
				fn(opt)
			})
		}
	}), Worker
}), qcVideo("Code", function() {
	return {
		CODE_NAME: {
			1: "准备计算SHA",
			2: "等待上传",
			3: "SHA计算中",
			4: "即将上传",
			5: "上传进度更新",
			6: "上传完成",
			7: "上传失败"
		},
		READY_TO_SHA: 1,
		UPLOAD_WAIT: 2,
		UPLOAD_SHA: 3,
		WILL_UPLOAD: 4,
		UPLOAD_PROGRESS: 5,
		UPLOAD_DONE: 6,
		UPLOAD_FAIL: 7,
		UPLOADER_STATUS_CHANGE: 8,
		ILLEGAL_TYPE: -1,
		ILLEGAL_NAME: -2,
		OVER_MAX_SIZE: -3
	}
}), qcVideo("constants", function(Code) {
	var audioTypes = ["MP3", "WMA", "WAV", "ASF", "AU", "SND", "RAW", "AFC", "ACC"],
		videoTypes = ["WMV", "WM", "ASF", "ASX", "RM", "RMVB", "RA", "RAM", "MPG", "MPEG", "MPE", "VOB", "DAT", "MOV", "3GP", "MP4", "MP4V", "M4V", "MKV", "AVI", "FLV", "F4V"];
	return {
		ALLOW_AUDIO_TYPES: audioTypes,
		ALLOW_VIDEO_TYPES: videoTypes,
		ALLOW_UPLOAD_FILE_TYPE: videoTypes.concat(audioTypes),
		FILE_STATUS: {
			HASHING: "HASHING"
		},
		HIGH_FREQUENCY_STATUS: [Code.UPLOAD_SHA, Code.UPLOAD_PROGRESS]
	}
}), qcVideo("ErrorCode", function() {
	return {
		UN_SUPPORT_BROWSE: -1,
		REQUIRE_SIGNATURE: -2
	}
}), qcVideo("FILE_STATUS", function() {
	return {
		WAIT_UPLOAD: 1,
		UPLOADING: 2,
		DONE: 5,
		FAIL: 4,
		SHA_ING: 10
	}
}), qcVideo("Log", function() {
	var empty = function() {},
		realConsole = window.console,
		console = realConsole || {},
		wrap = function(fn) {
			return function() {
				try {
					fn.apply(realConsole, arguments)
				} catch (xe) {}
			}
		};
	return {
		debug: wrap(console.debug || empty),
		log: wrap(console.log || empty),
		error: wrap(console.error || empty),
		info: wrap(console.info || empty)
	}
}), qcVideo("Reporter", function(util) {
	function jshash(str) {
		for (var hash = 1315423911, i = 0, length = str.length; length > i; i++) {
			var tmp = hash << 5 >>> 0;
			tmp += str.charCodeAt(i), tmp += hash >>> 2, hash = tmp ^ hash
		}
		return 2147483647 & hash
	}
	var secrectId = "",
		reporter = function() {
			function reportRet(params) {
				var type = 1;
				params.error_code == plupload.HTTP_ERROR || params.error_code == plupload.NETWORK_TIMEOUT ? type = 2 : 0 != params.error_code && (type = 3);
				var urlParams = {
					domain: "vod.qcloud.com",
					cgi: "upload",
					type: type,
					code: params.error_code,
					time: 1e3 * params.cost_time
				};
				0 == params.action && (urlParams.cgi = "sha_calc"), report("https://huatuocode.huatuo.qq.com/code.cgi", urlParams)
			}
			var reportInterfaceUrl = "//video.qcloud.com/dcreport",
				tool = {
					cookie: {
						get: function(name) {
							var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
								m = document.cookie.match(r);
							return m ? m[1] : ""
						}
					}
				},
				_objectToParams = function(obj) {
					var paramList = [];
					for (var key in obj) {
						var value = obj[key];
						paramList.push(key + "=" + value)
					}
					return paramList.join("&")
				},
				http_img_sender = function() {
					var img = new Image;
					return function(src) {
						img.onload = img.onerror = img.onabort = function() {
							img.onload = img.onerror = img.onabort = null, img = null
						}, img.src = src
					}
				},
				report = function(url, params) {
					try {
						var _url = url.split("?")[0];
						_url = _url.replace(/\/$/, ""), params._ = +new Date, _url = _url + "?" + _objectToParams(params, !0);
						var sender = http_img_sender();
						sender(_url)
					} catch (xe) {}
				};
			return function(params) {
				params.interfacename = "Vod_Upload_DcReport", params.uin = tool.cookie.get("ownerUin") || "111", params.appid = tool.cookie.get("appid") || secrectId || "11111", reportRet(params), 0 == params.error_code && 1 != params.upload_flag && params.chunk_flag > 5 && params.cost_time < 30 || report(reportInterfaceUrl, params)
			}
		}(),
		Item = function(obj) {
			var data = this.data = {};
			data.browser = (obj.sdkver || "") + "_" + util.browser(), data.file_sha = 0, data.file_size = obj.size, data.file_name = obj.name, obj.secrectId && (secrectId = jshash(obj.secrectId)), this._reset()
		};
	return $.extend(Item.prototype, {
		_reset: function() {
			var data = this.data;
			data.action = 0, data.chunk_flag = 0, data.upload_flag = 0, data.data_size = 0, data.offset = 0, data.cost_time = 0, data.error_code = 0
		},
		set: function(key, value) {
			return this.data[key] = value, this
		},
		bSet: function(obj) {
			for (var key in obj) this.set(key, obj[key]);
			return this
		},
		submit: function() {
			return reporter(this.data), this
		}
	}), function(obj) {
		return new Item(obj)
	}
}), qcVideo("SHA", function(Log, $, Version, AS3_Worker) {
	function hash_file(file, fileId, worker, bs) {
		var buffer_size, block, reader, handle_hash_block, handle_load_block, clean = function() {
				Log.debug("SHA ，clear"), reader && (reader.onload = null), file = null;
				try {
					worker.terminate()
				} catch (xe) {}
				worker = null
			};
		handle_load_block = function(event) {
			cache.ingMap[fileId] ? worker.postMessage({
				message: event.target.result,
				block: block
			}) : (Log.debug("SHA ，继续计算时，发现已经被删除", fileId), clean(), startFileSha())
		}, handle_hash_block = function(event) {
			block.end !== file.size ? (block.start += buffer_size, block.end += buffer_size, block.end > file.size && (block.end = file.size), reader && (reader.onload = null), reader = new FileReader, reader.onload = handle_load_block, readFile(reader, file, block)) : clean()
		}, buffer_size = bs, block = {
			file_size: file.size,
			start: 0,
			end: buffer_size > file.size ? file.size : buffer_size
		}, worker.addEventListener("message", handle_hash_block), reader = new FileReader, reader.onload = handle_load_block, readFile(reader, file, block)
	}
	function isUseSwfCal() {
		return Version.canUseSwf
	}
	function readFile(reader, file, block) {
		isUseSwfCal() ? reader.readAsDataURL(file.slice(block.start, block.end)) : reader.readAsArrayBuffer(file.slice(block.start, block.end))
	}
	function getWorker() {
		return isUseSwfCal() ? new AS3_Worker.getInstance : new Worker(SETTING.WORK_JS)
	}
	function getBuffer(file) {
		var M = Math.pow(2, 20);
		return isUseSwfCal() ? 3 * M : .5 * M
	}
	function handle_worker_event(file) {
		return function(event) {
			if (file.status == plupload.HASHING && cache.ingMap[file.id]) if (event.data.result) {
				file._sha_end_time = +new Date;
				var cost = file._sha_end_time - file._sha_start_time;
				cache.shaMap[file.id] = event.data.result, file._report_timer && (clearInterval(file._report_timer), delete file.report_timer), file._hashed_size = file.size, Log.log("cost second :", Math.ceil(cost / 1e3), ";文件大小:", (file.size / Math.pow(2, 20)).toFixed(2) + "M", ";sha:", event.data.result), getReport(file).bSet({
					file_sha: cache.shaMap[file.id],
					cost_time: Math.ceil(cost / 1e3),
					data_size: file.size
				}).submit(), SpeedLimit.del(file.id), dispatchSHA(file, 100, {
					sha: event.data.result,
					cost: cost
				}), cache.ingMap[file.id] && (delete cache.ingMap[file.id], cache.ingMap.__length -= 1), startFileSha()
			} else {
				var block = event.data.block;
				file._hashed_size = block.end, SpeedLimit.set(file, (100 * block.end / block.file_size).toFixed(2))
			}
		}
	}
	function ableStart(file) {
		var k, calSize = 0;
		for (k in cache.ingMap)"__length" !== k && (calSize += cache.ingMap[k].size - cache.ingMap[k]._hashed_size);
		return calSize += file ? file.size : 0, 0 === cache.ingMap.__length || SETTING.MAX_DOING_SHA1 > cache.ingMap.__length && SETTING.MAX_SHA_SIZE > calSize
	}
	function startFileSha() {
		var length = cache.waitList.length;
		if (length > 0 && ableStart(cache.waitList[0])) {
			var file = cache.waitList.shift();
			file._sha_start_time = +new Date, file._hashed_size = 0, file._report_timer = setInterval(function() {
				file && file._report_timer && getReport(file).bSet({
					offset: file._hashed_size,
					cost_time: Math.ceil((new Date - file._sha_start_time) / 1e3),
					data_size: file._hashed_size
				}).submit()
			}, SETTING.REPORT_INTERVAL), cache.ingMap[file.id] = file, cache.ingMap.__length += 1;
			var worker = getWorker();
			worker.addEventListener("message", handle_worker_event(file)), hash_file(file.getNative(), file.id, worker, getBuffer(file))
		}
	}
	var SETTING = {
		WORK_JS: "/calculator_worker_sha1.js",
		MAX_DOING_SHA1: 3,
		MAX_SHA_SIZE: 4 * Math.pow(2, 30),
		REPORT_INTERVAL: 6e4
	},
		cache = {
			waitList: [],
			ingMap: {
				__length: 0
			},
			shaMap: {}
		},
		getReport = function(file) {
			return file._report
		},
		SpeedLimit = function() {
			var cache = {};
			return {
				set: function(file, percent) {
					var id = file.id,
						now = +new Date;
					cache.hasOwnProperty(id) || (cache[id] = {
						_time: now
					}), cache[id].percent = percent, now - cache[id]._time > 1e3 && (cache[id]._time = now, dispatchSHA(file, percent))
				},
				del: function(id) {
					delete cache[id]
				}
			}
		}();
	isUseSwfCal() && (SETTING.MAX_DOING_SHA1 = 1);
	var handler = $.noop,
		dispatchSHA = function(file, precent, result) {
			handler(file, precent ? precent : 0, result)
		};
	return {
		setWorkPath: function(path) {
			SETTING.WORK_JS = path
		},
		addListener: function(fn) {
			handler = fn
		},
		getSha1: function(id) {
			return cache.shaMap[id] || 0
		},
		add: function(file) {
			dispatchSHA(file, 0), ableStart(file) ? (cache.waitList = [file].concat(cache.waitList), startFileSha()) : cache.waitList.push(file)
		},
		del: function(fid) {
			Log.debug("SHA,将删除文件", fid);
			var index = -1;
			$.each(cache.waitList, function(i, file) {
				return file.id == fid ? (file._report_timer && (clearInterval(file._report_timer), delete file._report_timer), index = i, !1) : void 0
			}), -1 !== index && cache.waitList.splice(index, 1);
			var ingFile = cache.ingMap[fid];
			ingFile && (clearInterval(ingFile._report_timer), delete ingFile._report_timer, delete cache.ingMap[fid], cache.ingMap.__length -= 1, Log.debug("SHA,已删除文件", fid))
		}
	}
}), qcVideo("util", function(FILE_STATUS) {
	return {
		browser: function() {
			if (window.mOxie && mOxie.Env) {
				var v = mOxie.Env;
				return v.browser + "_" + v.version + "_" + v.os + "_" + v.osVersion
			}
			var br = navigator.userAgent.toLowerCase(),
				ver = (br.match(/.+(?:rv|it|ra|ie)[\/: ]([\\d.]+)/) || [0, "0"])[1],
				ret = "";
			return ret = /msie/i.test(br) && !/opera/.test(br) ? "IE" : /firefox/i.test(br) ? "Firefox" : /chrome/i.test(br) && /webkit/i.test(br) && /mozilla/i.test(br) ? "Chrome" : /opera/i.test(br) ? "Opera" : "ipad", (ret + " " + ver).replace(/\\s|\\./g, "_")
		},
		compute_speed: function(num) {
			var step = [{
				level: Math.pow(1024, 0),
				unit: "B/s"
			}, {
				level: Math.pow(1024, 1),
				unit: "KB/s"
			}, {
				level: Math.pow(1024, 2),
				unit: "MB/s"
			}],
				unit = "B",
				level = 1;
			return $.each(step, function(i, e) {
				num >= e.level && (unit = e.unit, level = e.level)
			}), (num / level).toFixed(2) + unit
		},
		getHStorage: function(stroage) {
			var KB = 1e3,
				MB = 1e3 * KB,
				GB = 1e3 * MB,
				TB = 1e3 * GB;
			return MB > stroage ? (stroage / KB).toFixed(2) + "KB" : GB > stroage ? (stroage / MB).toFixed(2) + "MB" : TB > stroage ? (stroage / GB).toFixed(2) + "GB" : (stroage / TB).toFixed(2) + "TB"
		},
		getFileStatusName: function(s) {
			switch (s) {
			case FILE_STATUS.WAIT_UPLOAD:
				return "等待上传";
			case FILE_STATUS.UPLOADING:
				return "上传中";
			case FILE_STATUS.DONE:
				return "上传完成";
			case FILE_STATUS.FAIL:
				return "上传失败";
			case FILE_STATUS.SHA_ING:
				return "计算SHA"
			}
		}
	}
}), qcVideo("validate", function() {
	return {
		checkFileName: function(n) {
			return "" == n || /[,<>\'\"]/g.test(n) || n.length > 40 ? !1 : !0
		}
	}
}), qcVideo("Version", function() {
	var agent = navigator.userAgent,
		Version = {
			IOS: !! agent.match(/iP(od|hone|ad)/i),
			ANDROID: !! /Android/i.test(agent)
		};
	return Version.IS_MAC = window.navigator && navigator.appVersion && navigator.appVersion.indexOf("Mac") > -1, Version.IS_MOBILE = Version.IOS || Version.ANDROID, Version.FLASH_VERSION = -1, Version.IS_IE = "ActiveXObject" in window, Version.ABLE_FLASH = function() {
		var swf;
		if (document.all) try {
			if (swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) return Version.FLASH_VERSION = parseInt(swf.GetVariable("$version").split(" ")[1].split(",")[0]), !0
		} catch (e) {
			return !1
		} else try {
			if (navigator.plugins && navigator.plugins.length > 0 && (swf = navigator.plugins["Shockwave Flash"])) {
				for (var words = swf.description.split(" "), i = 0; i < words.length; ++i) isNaN(parseInt(words[i])) || (Version.FLASH_VERSION = parseInt(words[i]));
				return !0
			}
		} catch (e) {
			return !1
		}
		return !1
	}(), Version.canUseSwf = Version.ABLE_FLASH && Version.FLASH_VERSION >= 19, Version
}), qcVideo("uploader", function(Log, SHA, constants, validate, Code, util, Reporter, ErrorCode, Version, AS3_Worker) {
	window.MXI_DEBUG = !1;
	var uploader, SDKVersion = "20161101",
		FinalFileTypes = constants.ALLOW_UPLOAD_FILE_TYPE,
		MAX_RETRY_TIME = 5,
		file_retry_time = {},
		chunk_seqs = {},
		useLoadedAsOffsetErrorCode = ["-28996"],
		listeners = [],
		dispatch = function(args) {
			for (var i = 0, j = listeners.length; j > i; i++) listeners[i](args)
		},
		getReport = function(file) {
			return file._report
		},
		_coverBack = function() {
			if (uploader && uploader.files && uploader.files.length) {
				var files = uploader.files;
				for (var k in files) files[k].is_from_resume = !0
			}
		},
		_PostInit = function() {},
		_FilesAdded = function(up, files) {
			var deleteIds = [],
				illegalType = !1;
			plupload.each(files, function(file) {
				var fileInfo = file.getNative(),
					name = fileInfo.name.split(".");
				file.filename = name.slice(0, -1).join("."), file.type = name[name.length - 1].toUpperCase(), -1 == $.inArray(file.type, FinalFileTypes) ? (deleteIds.push(file.id), illegalType = !0) : (validate.checkFileName(file.filename) || (Log.log(file.name, file.filename), file.filename = "请重命名！"), file.status = plupload.HASHING, file._report = Reporter({
					name: file.filename,
					size: file.size,
					secrectId: up.settings.multipart_params.SecretId,
					sdkver: SDKVersion
				}), dispatch({
					code: Code.READY_TO_SHA,
					file: file
				}), SHA.add(file), chunk_seqs[file.id] = 0)
			}), $.each(deleteIds, function(_, id) {
				uploader.removeFile(id)
			}), illegalType && dispatch({
				code: Code.ILLEGAL_TYPE,
				message: "只能上传视频文件，已自动过滤掉非视频文件",
				solution: ""
			})
		},
		_UploadProgress = function(up, file) {
			var isValidPercent = file.virtualPercent > 0,
				nativePercent = file.loaded / file.size * 100,
				percent = isValidPercent ? Math.min(file.virtualPercent, nativePercent) : nativePercent;
			percent = percent.toFixed(2), dispatch({
				code: Code.UPLOAD_PROGRESS,
				message: "文件进度更新",
				file: file,
				virtualPercent: percent,
				speed: file.speed
			})
		},
		_BeforeUpload = function(up, file) {
			file.usedTime = void 0 == file.usedTime ? 0 : file.usedTime, $.extend(up.settings.multipart_params, {
				fileName: file.filename,
				fileSha: SHA.getSha1(file.id),
				fileSize: file.size,
				fileType: file.type
			}), dispatch({
				code: Code.WILL_UPLOAD,
				message: "文件准备上传",
				file: file
			})
		},
		_FileUploaded = function(up, file, result) {
			var res = result.response;
			return res && (res = $.parseJSON(res), 0 == res.code && 1 == res.flag) ? (dispatch({
				code: Code.UPLOAD_DONE,
				message: "文件上传完成",
				file: file,
				serverFileId: res.fileId
			}), !0) : (file.status = plupload.FAILED, void dispatch({
				code: Code.UPLOAD_FAIL,
				message: "文件上传失败",
				file: file
			}))
		},
		_StateChanged = function(up) {
			(up.state == plupload.QUEUED || up.state == plupload.STARTED) && dispatch({
				code: Code.UPLOADER_STATUS_CHANGE,
				message: "上传状态已切换"
			})
		},
		_ChunkUploaded = function(up, file, result) {
			var res = result.response,
				code = -1,
				reportParam = {
					data_size: file.currChunkSize,
					chunk_flag: 0,
					upload_flag: 0,
					cost_time: Math.ceil((new Date - file.currChunkStartUpTime) / 1e3),
					action: 1,
					error_code: 0
				};
			if (res) {
				if (res = $.parseJSON(res), 0 == res.code) {
					if (clearInterval(file.speedTimer), 1 == res.flag) {
						if (100 == file.percent) return getReport(file).bSet($.extend(reportParam, {
							offset: file.size,
							chunk_flag: ++chunk_seqs[file.id],
							upload_flag: 1
						})).submit(), !0;
						file.status = plupload.DONE, file.loaded = file.size - 0, reportParam.offset = file.loaded, reportParam.chunk_flag = ++chunk_seqs[file.id], up.trigger("FileUploaded", file, result)
					} else res.offset > 0 && (file.loaded = res.offset - 0, reportParam.chunk_flag = ++chunk_seqs[file.id], reportParam.upload_flag = 0, reportParam.offset = file.loaded);
					return void 0 == file.startUploadOffset && (file.startUploadOffset = file.loaded - up.settings.chunk_size_part1), file.realFlux = file.loaded - file.startUploadOffset, file.usedTime += new Date - file.currChunkStartUpTime, file.speedInKB = parseInt(file.realFlux / file.usedTime) || 0, file.speed = util.compute_speed(file.realFlux / file.usedTime * 1e3), file.loaded != file.size ? (file_retry_time[file.id] = 0, file.speedTimer = setInterval(function() {
						var virtualPercent, virtualLoaded, maxPercent, maxLoaded = file.loaded + file.currChunkSize;
						maxPercent = maxLoaded / file.size * 100, virtualLoaded = (new Date - file.currChunkStartUpTime + file.usedTime) * (file.realFlux / file.usedTime) + file.startUploadOffset, virtualPercent = virtualLoaded / file.size * 100, virtualPercent = virtualPercent > maxPercent ? maxPercent : virtualPercent, virtualPercent = virtualPercent > 100 ? 100 : virtualPercent, 100 != virtualPercent && (virtualPercent = virtualPercent.toFixed(2)), file.virtualPercent = virtualPercent > 0 ? virtualPercent : 0, up.trigger("UploadProgress", file)
					}, 1e3 / 3)) : file.virtualPercent = 100, getReport(file).bSet(reportParam).submit(), !0
				}
				code = res.code
			}
			up.trigger("Error", {
				code: code,
				message: "upload error",
				file: file
			})
		},
		_Error = function(up, err) {
			var code = (err.code || "") + "";
			if (Log.error("code", code), code == plupload.FILE_SIZE_ERROR) dispatch({
				code: Code.OVER_MAX_SIZE,
				message: "文件大小超出限制，" + err.file.name + "(" + util.getHStorage(err.file.size) + ")已被自动过滤",
				file: err.file
			});
			else if (code == plupload.FILE_EXTENSION_ERROR) dispatch({
				code: Code.ILLEGAL_TYPE,
				message: "文件格式不符合要求",
				file: err.file
			});
			else {
				var file = err.file,
					fileId = file.id;
				getReport(file) && getReport(file).bSet({
					data_size: file.currChunkSize,
					offset: file.loaded ? file.loaded : 0,
					chunk_flag: ++chunk_seqs[file.id],
					upload_flag: 0,
					cost_time: Math.ceil((new Date - file.currChunkStartUpTime) / 1e3),
					action: 1,
					error_code: code
				}).submit(), file_retry_time.hasOwnProperty(fileId) || (file_retry_time[fileId] = 0), file_retry_time[fileId] > MAX_RETRY_TIME ? dispatch({
					code: Code.UPLOAD_FAIL,
					message: "文件上传失败",
					file: file,
					errorCode: code
				}) : setTimeout(function() {
					_coverBack(), file_retry_time[fileId] += 1, $.extend(file, {
						status: plupload.QUEUED,
						loaded: $.inArray(code, useLoadedAsOffsetErrorCode) > -1 ? file.loaded || 0 : 0
					}), dispatch({
						code: Code.UPLOAD_WAIT,
						message: "文件等待上传",
						file: file
					}), Log.debug("retry", fileId, file_retry_time[fileId]), uploader.start()
				}, 5e3)
			}
		},
		eachFiles = function(fn) {
			for (var k in uploader.files) fn(uploader.files[k])
		};
	return Version.canUseSwf && AS3_Worker.loadSwf(), Log.log("Version.FLASH_VERSION", Version.FLASH_VERSION, Version.canUseSwf), Log.log("uploadsdk", SDKVersion), {
		version: SDKVersion,
		eachFiles: function(fn) {
			eachFiles(function(file) {
				fn(file)
			})
		},
		setSuspend: function(fid) {
			var file = this.getFile(fid);
			file && (file.status = plupload.SUSPEND)
		},
		isSuspend: function(fid) {
			var file = this.getFile(fid);
			return file ? file.status == plupload.SUSPEND : !1
		},
		setQueued: function(fid) {
			var file = this.getFile(fid);
			file && (file.status = plupload.QUEUED)
		},
		addListener: function(l) {
			listeners.push(l)
		},
		startUpload: function() {
			uploader.start(), dispatch({
				code: Code.UPLOADER_STATUS_CHANGE,
				message: "文件开始上传"
			})
		},
		reUpload: function() {
			eachFiles(function(file) {
				file.status == plupload.FAILED && (file.status = plupload.QUEUED, file.loaded = 0, file_retry_time[file.id] = 0), file.is_from_resume = !0
			}), uploader.start(), dispatch({
				code: Code.UPLOADER_STATUS_CHANGE,
				message: "文件开始重新上传"
			})
		},
		deleteFile: function(fid) {
			var file = this.getFile(fid);
			file.speedTimer && (clearInterval(file.speedTimer), file.speedTimer = null), SHA.del(fid), uploader.removeFile(fid), dispatch({
				code: Code.UPLOADER_STATUS_CHANGE,
				message: "文件被删除"
			}), this._dispatchStatus()
		},
		stopUpload: function() {
			for (var k in uploader.files) {
				var file = uploader.files[k];
				if (file.speedTimer) {
					delete file.speed;
					try {
						clearInterval(file.speedTimer)
					} catch (_) {}
				}
			}
			uploader.stop(), dispatch({
				code: Code.UPLOADER_STATUS_CHANGE,
				message: "暂停上传"
			})
		},
		getOriginalFile: function(fid) {
			var ret;
			return eachFiles(function(file) {
				file.id == fid && (ret = file.getNative())
			}), ret
		},
		getFile: function(fid) {
			var ret;
			return eachFiles(function(file) {
				file.id == fid && (ret = file)
			}), ret
		},
		setClass: function(fid, classId) {
			var file = this.getFile(fid);
			file && classId && (file.classId = classId)
		},
		supportBrowser: function() {
			return "undefined" != typeof File && ("undefined" != typeof Worker || Version.canUseSwf)
		},
		init: function(setting, handlers) {
			var self = this,
				empty = function() {};
			if (!self.supportBrowser()) return ErrorCode.UN_SUPPORT_BROWSE;
			File.prototype.slice || (File.prototype.webkitSlice ? File.prototype.slice = File.prototype.webkitSlice : File.prototype.mozSlice && (File.prototype.slice = File.prototype.mozSlice)), setting.isTranscode || delete setting.transcodeNotifyUrl, setting.secretKey || setting.getSignature || alert("您还没配置上传签名的获取获取方式，请参考api文档说明，补充签名串"), setting.sha1js_path && SHA.setWorkPath(setting.sha1js_path), SHA.addListener(function(file, percent, info) {
				100 == percent && info && info.sha ? (file.status = plupload.QUEUED, file.hashed_size = info.sha, dispatch({
					code: Code.UPLOAD_WAIT,
					message: "文件等待上传",
					cost_time: info.cost,
					file: file
				}), setting.after_sha_start_upload && self.startUpload()) : percent >= 0 && 100 >= percent && dispatch({
					code: Code.UPLOAD_SHA,
					message: "文件SHA计算中",
					file: file,
					percent: percent
				})
			});
			var multipart_params = {
				SecretId: setting.secretId,
				isTranscode: setting.isTranscode && "0" != setting.isTranscode ? 1 : 0,
				isScreenshot: setting.isTranscode && "0" != setting.isTranscode ? 1 : 0,
				isWatermark: setting.isWatermark && "0" != setting.isWatermark ? 1 : 0
			};
			setting.classId && (multipart_params.classId = setting.classId);
			var disableMultiSelection = "iOS" === mOxie.Env.os && /MicroMessenger/i.test(navigator.userAgent),
				mimeTypes = setting.filters && setting.filters.mime_types,
				videoOnly = setting.filters && setting.filters.video_only;
			FinalFileTypes = videoOnly ? constants.ALLOW_VIDEO_TYPES : constants.ALLOW_UPLOAD_FILE_TYPE;
			var exts = [];
			mimeTypes && mimeTypes.length > 0 ? mimeTypes.forEach(function(e, i) {
				e = e.toUpperCase(), FinalFileTypes.indexOf(e) > -1 && exts.push(e)
			}) : exts = FinalFileTypes, (uploader = new plupload.Uploader({
				multi_selection: !(disableMultiSelection || setting.disable_multi_selection),
				extBusiness: setting,
				max_retries: 0,
				runtimes: "html5",
				browse_button: setting.upBtnId,
				url: setting.web_upload_url,
				multipart: !1,
				chunk_size: "5mb",
				chunk_size_part1: "512kb",
				chunk_size_step: "2mb",
				multipart_params: multipart_params,
				filters: {
					max_file_size: setting.filters && setting.filters.max_file_size || "8gb",
					mime_types: "Windows" === mOxie.Env.OS ? [{
						title: "media files",
						extensions: exts.join(",")
					}] : []
				},
				init: {
					PostInit: _PostInit,
					FilesAdded: _FilesAdded,
					UploadProgress: _UploadProgress,
					BeforeUpload: _BeforeUpload,
					FileUploaded: _FileUploaded,
					StateChanged: _StateChanged,
					ChunkUploaded: _ChunkUploaded,
					Error: _Error
				},
				signature: function(argStr, cb) {
					setting.secretKey ? cb(CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(argStr, setting.secretKey))) : setting.getSignature ? setting.getSignature(argStr, function(signature) {
						cb(signature)
					}) : alert("无签名串，请参考api文档说明，补充签名串")
				}
			})).init();
			var updateFile = handlers.onFileUpdate || empty,
				getUpdateFileArgs = function(code, file, percent, speed, errorCode, serverFileId) {
					return {
						code: code,
						code_name: Code.CODE_NAME[code],
						id: file.id,
						size: file.size,
						size_text: util.getHStorage(file.size),
						name: file.name,
						filename: file.filename || file.name,
						status: file.status,
						percent: percent,
						speed: speed,
						errorCode: errorCode,
						serverFileId: serverFileId,
						watermark: "1" == file.isWatermark
					}
				};
			self.addListener(function(args) {
				if (!args.file || self.getFile(args.file.id)) switch (args.code) {
				case Code.READY_TO_SHA:
					updateFile(getUpdateFileArgs(args.code, args.file, 0));
					break;
				case Code.UPLOAD_SHA:
					updateFile(getUpdateFileArgs(args.code, args.file, args.percent ? args.percent : 0));
					break;
				case Code.UPLOAD_WAIT:
					updateFile(getUpdateFileArgs(args.code, args.file)), Log.debug(args.file.id, args.message, args.file.name, (args.cost_time / 1e3).toFixed(2));
					break;
				case Code.WILL_UPLOAD:
					Log.debug(args.file.id, args.message), updateFile(getUpdateFileArgs(args.code, args.file));
					break;
				case Code.UPLOAD_PROGRESS:
					updateFile(getUpdateFileArgs(args.code, args.file, args.virtualPercent, args.speed));
					break;
				case Code.UPLOAD_DONE:
					updateFile(getUpdateFileArgs(args.code, args.file, null, null, null, args.serverFileId));
					break;
				case Code.UPLOAD_FAIL:
					updateFile(getUpdateFileArgs(args.code, args.file, null, null, args.errorCode))
				}
			});
			var _dispatchStatus = this._dispatchStatus = function() {
					var count = {
						done: 0,
						fail: 0,
						sha: 0,
						wait: 0,
						uploading: 0
					};
					eachFiles(function(file) {
						var s = file.status;
						s == plupload.DONE ? count.done += 1 : s == plupload.HASHING ? count.sha += 1 : s == plupload.FAILED ? count.fail += 1 : s == plupload.QUEUED ? count.wait += 1 : s == plupload.UPLOADING && (count.uploading += 1)
					}), updateStatus(count)
				},
				updateStatus = handlers.onFileStatus || empty;
			self.addListener(function(args) {
				-1 === $.inArray(args.code, constants.HIGH_FREQUENCY_STATUS) && _dispatchStatus()
			});
			var filterError = handlers.onFilterError || empty;
			self.addListener(function(args) {
				(args.code == Code.ILLEGAL_TYPE || args.code == Code.ILLEGAL_NAME || args.code == Code.OVER_MAX_SIZE) && filterError(args)
			})
		}
	}
}), qcVideo.uploader = qcVideo.get("uploader"); /*  |xGv00|081b5e3a5702d3a1b4447b72c6e16d10 */