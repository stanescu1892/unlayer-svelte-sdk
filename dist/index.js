import { createEventDispatcher as Yt, onMount as Bt, onDestroy as Vt } from "svelte";
const Wt = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Wt);
const Gt = 1, Kt = 4, Jt = 8, Zt = 16, Qt = 2, k = Symbol(), ct = !1;
var dt = Array.isArray, Xt = Array.prototype.indexOf, Ae = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, $t = Object.prototype, en = Array.prototype, tn = Object.getPrototypeOf;
function nn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function rn() {
  var e, t, n = new Promise((r, l) => {
    e = r, t = l;
  });
  return { promise: n, resolve: e, reject: t };
}
const O = 2, qe = 4, He = 8, ge = 16, B = 32, ae = 64, vt = 128, A = 256, Ee = 512, T = 1024, I = 2048, J = 4096, G = 8192, ne = 16384, je = 32768, ze = 65536, Xe = 1 << 17, ln = 1 << 18, Ye = 1 << 19, _t = 1 << 20, Ie = 1 << 21, Be = 1 << 22, X = 1 << 23, de = Symbol("$state"), on = Symbol("legacy props"), Ve = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function sn() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
}
function an() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function un(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function fn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function cn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function dn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function vn(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function _n() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function hn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function pn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ht(e) {
  return e === this.v;
}
function gn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function wn(e) {
  return !gn(e, this.v);
}
let mn = !1, q = null;
function ke(e) {
  q = e;
}
function bn(e, t = !1, n) {
  q = {
    p: q,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function yn(e) {
  var t = (
    /** @type {ComponentContext} */
    q
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Mt(r);
  }
  return e !== void 0 && (t.x = e), q = t.p, e ?? /** @type {T} */
  {};
}
function pt() {
  return !0;
}
const xn = /* @__PURE__ */ new WeakMap();
function En(e) {
  var t = h;
  if (t === null)
    return _.f |= X, e;
  if ((t.f & je) === 0) {
    if ((t.f & vt) === 0)
      throw !t.parent && e instanceof Error && gt(e), e;
    t.b.error(e);
  } else
    We(e, t);
}
function We(e, t) {
  for (; t !== null; ) {
    if ((t.f & vt) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e instanceof Error && gt(e), e;
}
function gt(e) {
  const t = xn.get(e);
  t && (Ae(e, "message", {
    value: t.message
  }), Ae(e, "stack", {
    value: t.stack
  }));
}
let Te = [];
function kn() {
  var e = Te;
  Te = [], nn(e);
}
function wt(e) {
  Te.length === 0 && queueMicrotask(kn), Te.push(e);
}
function Tn() {
  for (var e = (
    /** @type {Effect} */
    h.b
  ); e !== null && !e.has_pending_snippet(); )
    e = e.parent;
  return e === null && sn(), e;
}
// @__NO_SIDE_EFFECTS__
function Ge(e) {
  var t = O | I, n = _ !== null && (_.f & O) !== 0 ? (
    /** @type {Derived} */
    _
  ) : null;
  return h === null || n !== null && (n.f & A) !== 0 ? t |= A : h.f |= Ye, {
    ctx: q,
    deps: null,
    effects: null,
    equals: ht,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      k
    ),
    wv: 0,
    parent: n ?? h,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Mn(e, t) {
  let n = (
    /** @type {Effect | null} */
    h
  );
  n === null && an();
  var r = (
    /** @type {Boundary} */
    n.b
  ), l = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = Et(
    /** @type {V} */
    k
  ), s = null, a = !_;
  return zn(() => {
    try {
      var o = e();
    } catch (c) {
      o = Promise.reject(c);
    }
    var u = () => o;
    l = s?.then(u, u) ?? Promise.resolve(o), s = l;
    var f = (
      /** @type {Batch} */
      x
    ), d = r.pending;
    a && (r.update_pending_count(1), d || f.increment());
    const v = (c, p = void 0) => {
      s = null, d || f.activate(), p ? p !== Ve && (i.f |= X, Fe(i, p)) : ((i.f & X) !== 0 && (i.f ^= X), Fe(i, c)), a && (r.update_pending_count(-1), d || f.decrement()), yt();
    };
    if (l.then(v, (c) => v(null, c || "unknown")), f)
      return () => {
        queueMicrotask(() => f.neuter());
      };
  }), new Promise((o) => {
    function u(f) {
      function d() {
        f === l ? o(i) : u(l);
      }
      f.then(d, d);
    }
    u(l);
  });
}
// @__NO_SIDE_EFFECTS__
function Sn(e) {
  const t = /* @__PURE__ */ Ge(e);
  return t.equals = wn, t;
}
function mt(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      we(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Dn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & O) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Ke(e) {
  var t, n = h;
  K(Dn(e));
  try {
    mt(e), t = At(e);
  } finally {
    K(n);
  }
  return t;
}
function bt(e) {
  var t = Ke(e);
  if (e.equals(t) || (e.v = t, e.wv = Pt()), !re)
    if (se !== null)
      se.set(e, e.v);
    else {
      var n = (W || (e.f & A) !== 0) && e.deps !== null ? J : T;
      L(e, n);
    }
}
function Ln(e, t, n) {
  const r = Ge;
  if (t.length === 0) {
    n(e.map(r));
    return;
  }
  var l = x, i = (
    /** @type {Effect} */
    h
  ), s = Cn(), a = Tn();
  Promise.all(t.map((o) => /* @__PURE__ */ Mn(o))).then((o) => {
    l?.activate(), s();
    try {
      n([...e.map(r), ...o]);
    } catch (u) {
      (i.f & ne) === 0 && We(u, i);
    }
    l?.deactivate(), yt();
  }).catch((o) => {
    a.error(o);
  });
}
function Cn() {
  var e = h, t = _, n = q;
  return function() {
    K(e), H(t), ke(n);
  };
}
function yt() {
  K(null), H(null), ke(null);
}
const ce = /* @__PURE__ */ new Set();
let x = null, se = null, $e = /* @__PURE__ */ new Set(), Me = [];
function xt() {
  const e = (
    /** @type {() => void} */
    Me.shift()
  );
  Me.length > 0 && queueMicrotask(xt), e();
}
let _e = [], Je = null, Ue = !1;
class he {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #i = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #l = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #e = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #u = null;
  /**
   * True if an async effect inside this batch resolved and
   * its parent branch was already deleted
   */
  #f = !1;
  /**
   * Async effects (created inside `async_derived`) encountered during processing.
   * These run after the rest of the batch has updated, since they should
   * always have the latest values
   * @type {Effect[]}
   */
  #n = [];
  /**
   * The same as `#async_effects`, but for effects inside a newly-created
   * `<svelte:boundary>` — these do not prevent the batch from committing
   * @type {Effect[]}
   */
  #o = [];
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #r = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #t = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #s = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #c = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #d = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    _e = [];
    var n = null;
    if (ce.size > 1) {
      n = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map();
      for (const [i, s] of this.current)
        n.set(i, { v: i.v, wv: i.wv }), i.v = s;
      for (const i of ce)
        if (i !== this)
          for (const [s, a] of i.#i)
            n.has(s) || (n.set(s, { v: s.v, wv: s.wv }), s.v = a);
    }
    for (const i of t)
      this.#_(i);
    if (this.#n.length === 0 && this.#e === 0) {
      this.#v();
      var r = this.#r, l = this.#t;
      this.#r = [], this.#t = [], this.#s = [], x = null, et(r), et(l), x === null ? x = this : ce.delete(this), this.#u?.resolve();
    } else
      this.#a(this.#r), this.#a(this.#t), this.#a(this.#s);
    if (n) {
      for (const [i, { v: s, wv: a }] of n)
        i.wv <= a && (i.v = s);
      se = null;
    }
    for (const i of this.#n)
      ve(i);
    for (const i of this.#o)
      ve(i);
    this.#n = [], this.#o = [];
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #_(t) {
    t.f ^= T;
    for (var n = t.first; n !== null; ) {
      var r = n.f, l = (r & (B | ae)) !== 0, i = l && (r & T) !== 0, s = i || (r & G) !== 0 || this.skipped_effects.has(n);
      if (!s && n.fn !== null) {
        if (l)
          n.f ^= T;
        else if ((r & T) === 0)
          if ((r & qe) !== 0)
            this.#t.push(n);
          else if ((r & Be) !== 0) {
            var a = n.b?.pending ? this.#o : this.#n;
            a.push(n);
          } else De(n) && ((n.f & ge) !== 0 && this.#s.push(n), ve(n));
        var o = n.first;
        if (o !== null) {
          n = o;
          continue;
        }
      }
      var u = n.parent;
      for (n = n.next; n === null && u !== null; )
        n = u.next, u = u.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #a(t) {
    for (const n of t)
      ((n.f & I) !== 0 ? this.#c : this.#d).push(n), L(n, T);
    t.length = 0;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    this.#i.has(t) || this.#i.set(t, n), this.current.set(t, t.v);
  }
  activate() {
    x = this;
  }
  deactivate() {
    x = null;
    for (const t of $e)
      if ($e.delete(t), t(), x !== null)
        break;
  }
  neuter() {
    this.#f = !0;
  }
  flush() {
    _e.length > 0 ? Nn() : this.#v(), x === this && (this.#e === 0 && ce.delete(this), this.deactivate());
  }
  /**
   * Append and remove branches to/from the DOM
   */
  #v() {
    if (!this.#f)
      for (const t of this.#l)
        t();
    this.#l.clear();
  }
  increment() {
    this.#e += 1;
  }
  decrement() {
    if (this.#e -= 1, this.#e === 0) {
      for (const t of this.#c)
        L(t, I), te(t);
      for (const t of this.#d)
        L(t, J), te(t);
      this.#r = [], this.#t = [], this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    this.#l.add(t);
  }
  settled() {
    return (this.#u ??= rn()).promise;
  }
  static ensure() {
    if (x === null) {
      const t = x = new he();
      ce.add(x), he.enqueue(() => {
        x === t && t.flush();
      });
    }
    return x;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    Me.length === 0 && queueMicrotask(xt), Me.unshift(t);
  }
}
function Nn() {
  var e = oe;
  Ue = !0;
  try {
    var t = 0;
    for (lt(!0); _e.length > 0; ) {
      var n = he.ensure();
      if (t++ > 1e3) {
        var r, l;
        On();
      }
      n.process(_e), $.clear();
    }
  } finally {
    Ue = !1, lt(e), Je = null;
  }
}
function On() {
  try {
    dn();
  } catch (e) {
    We(e, Je);
  }
}
function et(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (ne | G)) === 0 && De(r)) {
        var l = x ? x.current.size : 0;
        if (ve(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Lt(r) : r.fn = null), x !== null && x.current.size > l && (r.f & _t) !== 0)
          break;
      }
    }
    for (; n < t; )
      te(e[n++]);
  }
}
function te(e) {
  for (var t = Je = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (Ue && t === h && (n & ge) !== 0)
      return;
    if ((n & (ae | B)) !== 0) {
      if ((n & T) === 0) return;
      t.f ^= T;
    }
  }
  _e.push(t);
}
const $ = /* @__PURE__ */ new Map();
function Et(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: ht,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function U(e, t) {
  const n = Et(e);
  return Zn(n), n;
}
function D(e, t, n = !1) {
  _ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!F || (_.f & Xe) !== 0) && pt() && (_.f & (O | ge | Be | Xe)) !== 0 && !Y?.includes(e) && pn();
  let r = n ? le(t) : t;
  return Fe(e, r);
}
function Fe(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    re ? $.set(e, t) : $.set(e, n), e.v = t;
    var r = he.ensure();
    r.capture(e, n), (e.f & O) !== 0 && ((e.f & I) !== 0 && Ke(
      /** @type {Derived} */
      e
    ), L(e, (e.f & A) === 0 ? T : J)), e.wv = Pt(), kt(e, I), h !== null && (h.f & T) !== 0 && (h.f & (B | ae)) === 0 && (R === null ? Qn([e]) : R.push(e));
  }
  return t;
}
function Ne(e) {
  D(e, e.v + 1);
}
function kt(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, l = 0; l < r; l++) {
      var i = n[l], s = i.f, a = (s & I) === 0;
      a && L(i, t), (s & O) !== 0 ? kt(
        /** @type {Derived} */
        i,
        J
      ) : a && te(
        /** @type {Effect} */
        i
      );
    }
}
function le(e) {
  if (typeof e != "object" || e === null || de in e)
    return e;
  const t = tn(e);
  if (t !== $t && t !== en)
    return e;
  var n = /* @__PURE__ */ new Map(), r = dt(e), l = /* @__PURE__ */ U(0), i = ee, s = (a) => {
    if (ee === i)
      return a();
    var o = _, u = ee;
    H(null), st(i);
    var f = a();
    return H(o), st(u), f;
  };
  return r && n.set("length", /* @__PURE__ */ U(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, o, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && _n();
        var f = n.get(o);
        return f === void 0 ? f = s(() => {
          var d = /* @__PURE__ */ U(u.value);
          return n.set(o, d), d;
        }) : D(f, u.value, !0), !0;
      },
      deleteProperty(a, o) {
        var u = n.get(o);
        if (u === void 0) {
          if (o in a) {
            const f = s(() => /* @__PURE__ */ U(k));
            n.set(o, f), Ne(l);
          }
        } else
          D(u, k), Ne(l);
        return !0;
      },
      get(a, o, u) {
        if (o === de)
          return e;
        var f = n.get(o), d = o in a;
        if (f === void 0 && (!d || xe(a, o)?.writable) && (f = s(() => {
          var c = le(d ? a[o] : k), p = /* @__PURE__ */ U(c);
          return p;
        }), n.set(o, f)), f !== void 0) {
          var v = y(f);
          return v === k ? void 0 : v;
        }
        return Reflect.get(a, o, u);
      },
      getOwnPropertyDescriptor(a, o) {
        var u = Reflect.getOwnPropertyDescriptor(a, o);
        if (u && "value" in u) {
          var f = n.get(o);
          f && (u.value = y(f));
        } else if (u === void 0) {
          var d = n.get(o), v = d?.v;
          if (d !== void 0 && v !== k)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return u;
      },
      has(a, o) {
        if (o === de)
          return !0;
        var u = n.get(o), f = u !== void 0 && u.v !== k || Reflect.has(a, o);
        if (u !== void 0 || h !== null && (!f || xe(a, o)?.writable)) {
          u === void 0 && (u = s(() => {
            var v = f ? le(a[o]) : k, c = /* @__PURE__ */ U(v);
            return c;
          }), n.set(o, u));
          var d = y(u);
          if (d === k)
            return !1;
        }
        return f;
      },
      set(a, o, u, f) {
        var d = n.get(o), v = o in a;
        if (r && o === "length")
          for (var c = u; c < /** @type {Source<number>} */
          d.v; c += 1) {
            var p = n.get(c + "");
            p !== void 0 ? D(p, k) : c in a && (p = s(() => /* @__PURE__ */ U(k)), n.set(c + "", p));
          }
        if (d === void 0)
          (!v || xe(a, o)?.writable) && (d = s(() => /* @__PURE__ */ U(void 0)), D(d, le(u)), n.set(o, d));
        else {
          v = d.v !== k;
          var M = s(() => le(u));
          D(d, M);
        }
        var E = Reflect.getOwnPropertyDescriptor(a, o);
        if (E?.set && E.set.call(f, u), !v) {
          if (r && typeof o == "string") {
            var P = (
              /** @type {Source<number>} */
              n.get("length")
            ), m = Number(o);
            Number.isInteger(m) && m >= P.v && D(P, m + 1);
          }
          Ne(l);
        }
        return !0;
      },
      ownKeys(a) {
        y(l);
        var o = Reflect.ownKeys(a).filter((d) => {
          var v = n.get(d);
          return v === void 0 || v.v !== k;
        });
        for (var [u, f] of n)
          f.v !== k && !(u in a) && o.push(u);
        return o;
      },
      setPrototypeOf() {
        hn();
      }
    }
  );
}
var Pn, Rn, An;
function Tt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return Rn.call(e);
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return An.call(e);
}
function Oe(e, t) {
  return /* @__PURE__ */ Ze(e);
}
function tt(e, t) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Ze(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Qe(n) : n;
  }
}
function nt(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Qe(r);
  return r;
}
function In() {
  return !1;
}
function Un(e) {
  h === null && _ === null && cn(), _ !== null && (_.f & A) !== 0 && h === null && fn(), re && un();
}
function Fn(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Z(e, t, n, r = !0) {
  var l = h;
  l !== null && (l.f & G) !== 0 && (e |= G);
  var i = {
    ctx: q,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | I,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: l,
    b: l && l.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      ve(i), i.f |= je;
    } catch (o) {
      throw we(i), o;
    }
  else t !== null && te(i);
  var s = n && i.deps === null && i.first === null && i.nodes_start === null && i.teardown === null && (i.f & Ye) === 0;
  if (!s && r && (l !== null && Fn(i, l), _ !== null && (_.f & O) !== 0 && (e & ae) === 0)) {
    var a = (
      /** @type {Derived} */
      _
    );
    (a.effects ??= []).push(i);
  }
  return i;
}
function qn(e) {
  const t = Z(He, null, !1);
  return L(t, T), t.teardown = e, t;
}
function Hn(e) {
  Un();
  var t = (
    /** @type {Effect} */
    h.f
  ), n = !_ && (t & B) !== 0 && (t & je) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      q
    );
    (r.e ??= []).push(e);
  } else
    return Mt(e);
}
function Mt(e) {
  return Z(qe | _t, e, !1);
}
function jn(e) {
  return Z(qe, e, !1);
}
function zn(e) {
  return Z(Be | Ye, e, !0);
}
function Yn(e, t = 0) {
  return Z(He | t, e, !0);
}
function rt(e, t = [], n = []) {
  Ln(t, n, (r) => {
    Z(He, () => e(...r.map(y)), !0);
  });
}
function Bn(e, t = 0) {
  var n = Z(ge | t, e, !0);
  return n;
}
function it(e, t = !0) {
  return Z(B, e, !0, t);
}
function St(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = re, r = _;
    ot(!0), H(null);
    try {
      t.call(null);
    } finally {
      ot(n), H(r);
    }
  }
}
function Dt(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    n.ac?.abort(Ve);
    var r = n.next;
    (n.f & ae) !== 0 ? n.parent = null : we(n, t), n = r;
  }
}
function Vn(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & B) === 0 && we(t), t = n;
  }
}
function we(e, t = !0) {
  var n = !1;
  (t || (e.f & ln) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (Wn(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), n = !0), Dt(e, t && !n), Se(e, 0), L(e, ne);
  var r = e.transitions;
  if (r !== null)
    for (const i of r)
      i.stop();
  St(e);
  var l = e.parent;
  l !== null && l.first !== null && Lt(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function Wn(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Qe(e)
    );
    e.remove(), e = n;
  }
}
function Lt(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Gn(e, t) {
  var n = [];
  Ct(e, n, !0), Kn(n, () => {
    we(e), t && t();
  });
}
function Kn(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var l of e)
      l.out(r);
  } else
    t();
}
function Ct(e, t, n) {
  if ((e.f & G) === 0) {
    if (e.f ^= G, e.transitions !== null)
      for (const s of e.transitions)
        (s.is_global || n) && t.push(s);
    for (var r = e.first; r !== null; ) {
      var l = r.next, i = (r.f & ze) !== 0 || (r.f & B) !== 0;
      Ct(r, t, i ? n : !1), r = l;
    }
  }
}
function Jn(e) {
  Nt(e, !0);
}
function Nt(e, t) {
  if ((e.f & G) !== 0) {
    e.f ^= G, (e.f & T) === 0 && (L(e, I), te(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, l = (n.f & ze) !== 0 || (n.f & B) !== 0;
      Nt(n, l ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || t) && i.in();
  }
}
let oe = !1;
function lt(e) {
  oe = e;
}
let re = !1;
function ot(e) {
  re = e;
}
let _ = null, F = !1;
function H(e) {
  _ = e;
}
let h = null;
function K(e) {
  h = e;
}
let Y = null;
function Zn(e) {
  _ !== null && (Y === null ? Y = [e] : Y.push(e));
}
let S = null, N = 0, R = null;
function Qn(e) {
  R = e;
}
let Ot = 1, pe = 0, ee = pe;
function st(e) {
  ee = e;
}
let W = !1;
function Pt() {
  return ++Ot;
}
function De(e) {
  var t = e.f;
  if ((t & I) !== 0)
    return !0;
  if ((t & J) !== 0) {
    var n = e.deps, r = (t & A) !== 0;
    if (n !== null) {
      var l, i, s = (t & Ee) !== 0, a = r && h !== null && !W, o = n.length;
      if ((s || a) && (h === null || (h.f & ne) === 0)) {
        var u = (
          /** @type {Derived} */
          e
        ), f = u.parent;
        for (l = 0; l < o; l++)
          i = n[l], (s || !i?.reactions?.includes(u)) && (i.reactions ??= []).push(u);
        s && (u.f ^= Ee), a && f !== null && (f.f & A) === 0 && (u.f ^= A);
      }
      for (l = 0; l < o; l++)
        if (i = n[l], De(
          /** @type {Derived} */
          i
        ) && bt(
          /** @type {Derived} */
          i
        ), i.wv > e.wv)
          return !0;
    }
    (!r || h !== null && !W) && L(e, T);
  }
  return !1;
}
function Rt(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !Y?.includes(e))
    for (var l = 0; l < r.length; l++) {
      var i = r[l];
      (i.f & O) !== 0 ? Rt(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? L(i, I) : (i.f & T) !== 0 && L(i, J), te(
        /** @type {Effect} */
        i
      ));
    }
}
function At(e) {
  var t = S, n = N, r = R, l = _, i = W, s = Y, a = q, o = F, u = ee, f = e.f;
  S = /** @type {null | Value[]} */
  null, N = 0, R = null, W = (f & A) !== 0 && (F || !oe || _ === null), _ = (f & (B | ae)) === 0 ? e : null, Y = null, ke(e.ctx), F = !1, ee = ++pe, e.ac !== null && (e.ac.abort(Ve), e.ac = null);
  try {
    e.f |= Ie;
    var d = (
      /** @type {Function} */
      (0, e.fn)()
    ), v = e.deps;
    if (S !== null) {
      var c;
      if (Se(e, N), v !== null && N > 0)
        for (v.length = N + S.length, c = 0; c < S.length; c++)
          v[N + c] = S[c];
      else
        e.deps = v = S;
      if (!W || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (f & O) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (c = N; c < v.length; c++)
          (v[c].reactions ??= []).push(e);
    } else v !== null && N < v.length && (Se(e, N), v.length = N);
    if (pt() && R !== null && !F && v !== null && (e.f & (O | J | I)) === 0)
      for (c = 0; c < /** @type {Source[]} */
      R.length; c++)
        Rt(
          R[c],
          /** @type {Effect} */
          e
        );
    return l !== null && l !== e && (pe++, R !== null && (r === null ? r = R : r.push(.../** @type {Source[]} */
    R))), (e.f & X) !== 0 && (e.f ^= X), d;
  } catch (p) {
    return En(p);
  } finally {
    e.f ^= Ie, S = t, N = n, R = r, _ = l, W = i, Y = s, ke(a), F = o, ee = u;
  }
}
function Xn(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Xt.call(n, e);
    if (r !== -1) {
      var l = n.length - 1;
      l === 0 ? n = t.reactions = null : (n[r] = n[l], n.pop());
    }
  }
  n === null && (t.f & O) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (S === null || !S.includes(t)) && (L(t, J), (t.f & (A | Ee)) === 0 && (t.f ^= Ee), mt(
    /** @type {Derived} **/
    t
  ), Se(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Se(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Xn(e, n[r]);
}
function ve(e) {
  var t = e.f;
  if ((t & ne) === 0) {
    L(e, T);
    var n = h, r = oe;
    h = e, oe = !0;
    try {
      (t & ge) !== 0 ? Vn(e) : Dt(e), St(e);
      var l = At(e);
      e.teardown = typeof l == "function" ? l : null, e.wv = Ot;
      var i;
      ct && mn && (e.f & I) !== 0 && e.deps;
    } finally {
      oe = r, h = n;
    }
  }
}
function y(e) {
  var t = e.f, n = (t & O) !== 0;
  if (_ !== null && !F) {
    var r = h !== null && (h.f & ne) !== 0;
    if (!r && !Y?.includes(e)) {
      var l = _.deps;
      if ((_.f & Ie) !== 0)
        e.rv < pe && (e.rv = pe, S === null && l !== null && l[N] === e ? N++ : S === null ? S = [e] : (!W || !S.includes(e)) && S.push(e));
      else {
        (_.deps ??= []).push(e);
        var i = e.reactions;
        i === null ? e.reactions = [_] : i.includes(_) || i.push(_);
      }
    }
  } else if (n && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var s = (
      /** @type {Derived} */
      e
    ), a = s.parent;
    a !== null && (a.f & A) === 0 && (s.f ^= A);
  }
  if (re) {
    if ($.has(e))
      return $.get(e);
    if (n) {
      s = /** @type {Derived} */
      e;
      var o = s.v;
      return ((s.f & T) === 0 && s.reactions !== null || It(s)) && (o = Ke(s)), $.set(s, o), o;
    }
  } else if (n) {
    if (s = /** @type {Derived} */
    e, se?.has(s))
      return se.get(s);
    De(s) && bt(s);
  }
  if ((e.f & X) !== 0)
    throw e.v;
  return e.v;
}
function It(e) {
  if (e.v === k) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if ($.has(t) || (t.f & O) !== 0 && It(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Ut(e) {
  var t = F;
  try {
    return F = !0, e();
  } finally {
    F = t;
  }
}
const $n = -7169;
function L(e, t) {
  e.f = e.f & $n | t;
}
function er(e) {
  var t = _, n = h;
  H(null), K(null);
  try {
    return e();
  } finally {
    H(t), K(n);
  }
}
function tr(e, t, n, r = {}) {
  function l(i) {
    if (r.capture || rr.call(t, i), !i.cancelBubble)
      return er(() => n?.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? wt(() => {
    t.addEventListener(e, l, r);
  }) : t.addEventListener(e, l, r), l;
}
function nr(e, t, n, r, l) {
  var i = { capture: r, passive: l }, s = tr(e, t, n, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && qn(() => {
    t.removeEventListener(e, s, i);
  });
}
let at = null;
function rr(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, l = e.composedPath?.() || [], i = (
    /** @type {null | Element} */
    l[0] || e.target
  );
  at = e;
  var s = 0, a = at === e && e.__root;
  if (a) {
    var o = l.indexOf(a);
    if (o !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var u = l.indexOf(t);
    if (u === -1)
      return;
    o <= u && (s = o);
  }
  if (i = /** @type {Element} */
  l[s] || e.target, i !== t) {
    Ae(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var f = _, d = h;
    H(null), K(null);
    try {
      for (var v, c = []; i !== null; ) {
        var p = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var M = i["__" + r];
          if (M != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i))
            if (dt(M)) {
              var [E, ...P] = M;
              E.apply(i, [e, ...P]);
            } else
              M.call(i, e);
        } catch (m) {
          v ? c.push(m) : v = m;
        }
        if (e.cancelBubble || p === t || p === null)
          break;
        i = p;
      }
      if (v) {
        for (let m of c)
          queueMicrotask(() => {
            throw m;
          });
        throw v;
      }
    } finally {
      e.__root = t, delete e.currentTarget, H(f), K(d);
    }
  }
}
function ir(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function Ft(e, t) {
  var n = (
    /** @type {Effect} */
    h
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function Le(e, t) {
  var n = (t & Qt) !== 0, r, l = !e.startsWith("<!>");
  return () => {
    r === void 0 && (r = ir(l ? e : "<!>" + e), r = /** @type {Node} */
    /* @__PURE__ */ Ze(r));
    var i = (
      /** @type {TemplateNode} */
      n || Pn ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    return Ft(i, i), i;
  };
}
function ut() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = Tt();
  return e.append(t, n), Ft(t, n), e;
}
function ie(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function lr(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = n + "");
}
function Pe(e, t, n = !1) {
  var r = e, l = null, i = null, s = k, a = n ? ze : 0, o = !1;
  const u = (c, p = !0) => {
    o = !0, v(p, c);
  };
  var f = null;
  function d() {
    f !== null && (f.lastChild.remove(), r.before(f), f = null);
    var c = s ? l : i, p = s ? i : l;
    c && Jn(c), p && Gn(p, () => {
      s ? i = null : l = null;
    });
  }
  const v = (c, p) => {
    if (s !== (s = c)) {
      var M = In(), E = r;
      if (M && (f = document.createDocumentFragment(), f.append(E = Tt())), s ? l ??= p && it(() => p(E)) : i ??= p && it(() => p(E)), M) {
        var P = (
          /** @type {Batch} */
          x
        ), m = s ? l : i, j = s ? i : l;
        m && P.skipped_effects.delete(m), j && P.skipped_effects.add(j), P.add_callback(d);
      } else
        d();
    }
  };
  Bn(() => {
    o = !1, t(u), o || v(null, null);
  }, a);
}
function or(e, t, n) {
  var r = e == null ? "" : "" + e;
  return r = r ? r + " " + t : t, r === "" ? null : r;
}
function sr(e, t, n, r, l, i) {
  var s = e.__className;
  if (s !== n || s === void 0) {
    var a = or(n, r);
    a == null ? e.removeAttribute("class") : e.className = a, e.__className = n;
  }
  return i;
}
function ft(e, t) {
  return e === t || e?.[de] === t;
}
function ar(e = {}, t, n, r) {
  return jn(() => {
    var l, i;
    return Yn(() => {
      l = i, i = [], Ut(() => {
        e !== n(...i) && (t(e, ...i), l && ft(n(...l), e) && t(null, ...l));
      });
    }), () => {
      wt(() => {
        i && ft(n(...i), e) && t(null, ...i);
      });
    };
  }), e;
}
let ye = !1;
function ur(e) {
  var t = ye;
  try {
    return ye = !1, [e(), ye];
  } finally {
    ye = t;
  }
}
function Re(e, t, n, r) {
  var l = (n & Jt) !== 0, i = (n & Zt) !== 0, s = (
    /** @type {V} */
    r
  ), a = !0, o = () => (a && (a = !1, s = i ? Ut(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), s), u;
  if (l) {
    var f = de in e || on in e;
    u = xe(e, t)?.set ?? (f && t in e ? (m) => e[t] = m : void 0);
  }
  var d, v = !1;
  l ? [d, v] = ur(() => (
    /** @type {V} */
    e[t]
  )) : d = /** @type {V} */
  e[t], d === void 0 && r !== void 0 && (d = o(), u && (vn(), u(d)));
  var c;
  if (c = () => {
    var m = (
      /** @type {V} */
      e[t]
    );
    return m === void 0 ? o() : (a = !0, m);
  }, (n & Kt) === 0)
    return c;
  if (u) {
    var p = e.$$legacy;
    return function(m, j) {
      return arguments.length > 0 ? ((!j || p || v) && u(j ? c() : m), m) : c();
    };
  }
  var M = !1, E = ((n & Gt) !== 0 ? Ge : Sn)(() => (M = !1, c()));
  l && y(E);
  var P = (
    /** @type {Effect} */
    h
  );
  return function(m, j) {
    if (arguments.length > 0) {
      const ue = j ? y(E) : l ? le(m) : m;
      return D(E, ue), M = !0, s !== void 0 && (s = ue), m;
    }
    return re && M || (P.f & ne) !== 0 ? E.v : y(E);
  };
}
var fr = /* @__PURE__ */ Le('<div class="loading-overlay svelte-ik7c9f"><div class="loading-spinner svelte-ik7c9f"></div> <p class="svelte-ik7c9f">Loading Unlayer Editor...</p></div>'), cr = /* @__PURE__ */ Le('<div class="error-overlay svelte-ik7c9f"><div class="error-icon svelte-ik7c9f">⚠️</div> <h3 class="svelte-ik7c9f">Failed to Load Editor</h3> <p class="svelte-ik7c9f"> </p> <button class="retry-btn svelte-ik7c9f">Retry Loading</button></div>'), dr = /* @__PURE__ */ Le('<div class="loading-overlay svelte-ik7c9f"><div class="loading-spinner svelte-ik7c9f"></div> <p class="svelte-ik7c9f">Initializing Editor...</p></div>'), vr = /* @__PURE__ */ Le('<div style="width: 100%; height: 100%; min-height: 600px;"><!></div>');
function gr(e, t) {
  bn(t, !0);
  let n = Re(t, "options", 19, () => ({})), r = Re(t, "autoLoad", 3, !0), l = Re(t, "class", 3, "");
  const i = Yt();
  let s, a = null, o = /* @__PURE__ */ U(!1), u = /* @__PURE__ */ U(!1), f = /* @__PURE__ */ U("");
  const v = { ...{
    displayMode: "email",
    locale: "en-US",
    customJS: [],
    customCSS: [],
    features: {
      preview: !0,
      imageEditor: !0,
      stockImages: !0,
      textEditor: { spellChecker: !0, thesaurus: !0 }
    }
  }, ...n() }, c = [
    "https://editor.unlayer.com/embed.js",
    "https://unpkg.com/react-email-editor@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/react-email-editor@latest/dist/index.js"
  ];
  async function p() {
    return new Promise((w, b) => {
      if (window.UnlayerEditor || window.EmailEditor) {
        w();
        return;
      }
      let g = 0;
      const C = () => {
        if (g >= c.length) {
          console.warn("All CDN sources failed, creating mock editor"), M(), w();
          return;
        }
        const z = document.createElement("script");
        z.src = c[g], z.type = "text/javascript", z.onload = () => {
          console.log(`Script loaded successfully from: ${c[g]}`), window.UnlayerEditor ? (console.log("UnlayerEditor global found"), w()) : window.EmailEditor ? (console.log("EmailEditor global found"), window.UnlayerEditor = window.EmailEditor, w()) : (console.warn("No expected global variable found, trying next source"), g++, C());
        }, z.onerror = () => {
          console.warn(`Failed to load from: ${c[g]}`), g++, C();
        }, document.head.appendChild(z);
      };
      C();
    });
  }
  function M() {
    console.log("Creating mock Unlayer editor"), window.UnlayerEditor = class {
      options;
      currentDesign;
      constructor(b) {
        console.log("Mock editor initialized with options:", b), this.options = b, this.currentDesign = t.design || { body: { rows: [] }, design: { width: "600px" } };
      }
      addEventListener(b, g) {
        console.log(`Mock editor: ${b} event listener added`);
      }
      loadDesign(b) {
        console.log("Mock editor: Loading design", b), console.log("Mock editor: Options:", this.options), console.log("Mock editor: Container element:", this.options.id), console.log("Mock editor: Current container HTML before update:", this.options.id?.innerHTML), this.currentDesign = b, setTimeout(
          () => {
            const g = this.options.id;
            if (console.log("Mock editor: Using container directly:", g), g && g instanceof HTMLElement) {
              console.log("Mock editor: Setting innerHTML on container");
              const C = [
                "#ff6b6b",
                "#4ecdc4",
                "#45b7d1",
                "#96ceb4",
                "#feca57",
                "#ff9ff3"
              ], z = C[Math.floor(Math.random() * C.length)], V = (/* @__PURE__ */ new Date()).toLocaleTimeString(), Q = `
              <div style="padding: 20px; text-align: center; background: ${z}; border: 3px solid #333; border-radius: 8px; min-height: 400px; animation: fadeIn 0.5s ease-in;">
                <h3 style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); font-size: 24px;">🎨 Mock Unlayer Editor - DESIGN LOADED!</h3>
                <p style="color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">This is a mock editor because the CDN failed to load.</p>
                <p style="color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Your design has been loaded and can be exported.</p>
                
                <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 6px; text-align: left; max-width: 100%; overflow-x: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                  <strong style="color: #333;">Loaded Design:</strong>
                  <pre style="font-size: 12px; overflow-x: auto; white-space: pre-wrap; word-break: break-word; color: #333;">${JSON.stringify(b, null, 2)}</pre>
                </div>
                
                <div style="margin: 20px 0; padding: 15px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                  <strong style="color: #1976d2;">📧 Email Preview:</strong>
                  <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 4px; text-align: left;">
                    <h2 style="color: #333; margin: 0 0 15px 0; text-align: center;">Welcome to Our Platform!</h2>
                    <p style="color: #666; margin: 0 0 20px 0; line-height: 1.5;">We're excited to have you on board. This is a sample email template that you can customize using the Unlayer editor.</p>
                    <div style="text-align: center;">
                      <button style="background: #007bff; color: white; border: none; padding: 15px 30px; border-radius: 5px; font-size: 18px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">Get Started</button>
                    </div>
                  </div>
                </div>
                
                <p style="color: white; font-style: italic; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Note: This is a demo mode. In production, the real Unlayer editor would be loaded.</p>
                <p style="color: #28a745; font-weight: bold; background: white; padding: 10px; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">✅ Design loaded successfully at ${V}</p>
                <p style="color: white; font-size: 14px; margin-top: 15px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">🎯 Click the button again to see a new color!</p>
              </div>
              
              <style>
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(-20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              </style>
            `;
              g.innerHTML = Q, console.log("Mock editor: innerHTML set successfully"), console.log("Mock editor: New container HTML after update:", g.innerHTML.substring(0, 200) + "...");
            } else
              console.error("Container is not a valid HTMLElement:", g);
          },
          100
        );
      }
      exportHtml(b) {
        console.log("Mock editor: Exporting HTML"), console.log("Mock editor: Dispatching export-html event"), setTimeout(
          () => {
            const g = {
              html: '<div style="padding: 20px; background: #f8f9fa; border-radius: 8px;"><h2>Mock Email Template</h2><p>This is a mock HTML export from the demo editor.</p></div>',
              design: this.currentDesign
            };
            if (console.log("Mock editor: Export result:", g), b(g), this.options.id && this.options.id.dispatchEvent) {
              const C = new CustomEvent("export-html", { detail: g, bubbles: !0 });
              this.options.id.dispatchEvent(C), console.log("Mock editor: Custom event dispatched");
            }
          },
          500
        );
      }
      saveDesign(b) {
        console.log("Mock editor: Saving design"), setTimeout(
          () => {
            b(this.currentDesign);
          },
          300
        );
      }
      removeEventListener(b, g) {
        console.log(`Mock editor: ${b} event listener removed`);
      }
    };
  }
  async function E() {
    if (!(y(u) || y(o)))
      try {
        if (D(u, !0), D(f, ""), await p(), !s || !window.UnlayerEditor)
          throw new Error("Container or UnlayerEditor not available");
        a = new window.UnlayerEditor({ id: s, ...v, tools: t.tools }), a.addEventListener("design:updated", (w) => {
          i("design-updated", { design: w });
        }), t.design && r() && a.loadDesign(t.design), D(o, !0), D(u, !1), i("loaded", { editor: a });
      } catch (w) {
        D(u, !1), D(f, w instanceof Error ? w.message : "Unknown error", !0), console.error("Failed to initialize Unlayer editor:", w), i("error", { message: y(f) });
      }
  }
  function P() {
    return new Promise((w, b) => {
      if (!a || !y(o)) {
        b(new Error("Editor not loaded"));
        return;
      }
      a.exportHtml((g) => {
        if (g.html) {
          const C = { html: g.html, design: g.design };
          i("export-html", C), w(C);
        } else
          b(new Error("Failed to export HTML"));
      });
    });
  }
  function m(w) {
    a && y(o) && a.loadDesign(w);
  }
  function j() {
    return new Promise((w, b) => {
      if (!a || !y(o)) {
        b(new Error("Editor not loaded"));
        return;
      }
      a.saveDesign((g) => {
        w(g);
      });
    });
  }
  function ue() {
    y(u) || E();
  }
  Bt(() => {
    E();
  }), Vt(() => {
    a && (a.removeEventListener("design:updated", () => {
    }), a = null);
  }), Hn(() => {
    r() && y(o) && a && t.design && a.loadDesign(t.design);
  });
  var me = vr(), qt = Oe(me);
  {
    var Ht = (w) => {
      var b = fr();
      ie(w, b);
    }, jt = (w) => {
      var b = ut(), g = tt(b);
      {
        var C = (V) => {
          var Q = cr(), be = nt(Oe(Q), 4), Ce = Oe(be), fe = nt(be, 2);
          rt(() => lr(Ce, y(f))), nr("click", fe, ue), ie(V, Q);
        }, z = (V) => {
          var Q = ut(), be = tt(Q);
          {
            var Ce = (fe) => {
              var zt = dr();
              ie(fe, zt);
            };
            Pe(
              be,
              (fe) => {
                y(o) || fe(Ce);
              },
              !0
            );
          }
          ie(V, Q);
        };
        Pe(
          g,
          (V) => {
            y(f) ? V(C) : V(z, !1);
          },
          !0
        );
      }
      ie(w, b);
    };
    Pe(qt, (w) => {
      y(u) ? w(Ht) : w(jt, !1);
    });
  }
  return ar(me, (w) => s = w, () => s), rt(() => sr(me, 1, `unlayer-editor-container ${l() ?? ""}`, "svelte-ik7c9f")), ie(e, me), yn({ exportHtml: P, loadDesign: m, saveDesign: j, retryLoad: ue });
}
export {
  gr as UnlayerEditor
};
//# sourceMappingURL=index.js.map
