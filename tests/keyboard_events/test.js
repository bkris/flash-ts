var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ic;
(function (ic) {
    var geom;
    (function (geom) {
        var Point = (function () {
            function Point(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Point.prototype.add = function (point) {
                return new Point(this.x + point.x, this.y + point.y);
            };
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            Point.prototype.copyFrom = function (point) {
                this.x = point.x;
                this.y = point.y;
            };
            Point.prototype.equals = function (point) {
                return (this.x == point.x && this.y == point.y);
            };
            Point.prototype.normalize = function (tickness) {
                var length = Math.sqrt(this.x * this.x + this.y * this.y);
                this.x *= tickness / length;
                this.y *= tickness / length;
            };
            Point.prototype.offset = function (x, y) {
                this.x += x;
                this.y += y;
            };
            Point.prototype.setTo = function (xa, ya) {
                this.x = xa;
                this.y = ya;
            };
            Point.prototype.subtract = function (point) {
                return new Point(this.x - point.x, this.y - point.y);
            };
            Point.distance = function (a, b) {
                return Point._distance(a.x, a.y, b.x, b.y);
            };
            Point.interpolate = function (a, b, f) {
                return new Point(a.x + f * (b.x - a.x), a.y + f * (b.y - a.y));
            };
            Point.polar = function (len, ang) {
                return new Point(len * Math.cos(ang), len * Math.sin(ang));
            };
            Point._distance = function (x1, y1, x2, y2) {
                return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            };
            Point._v4 = {};
            Point._m4 = {};
            return Point;
        }());
        geom.Point = Point;
        geom.Point_v4 = {
            create: function () {
                return new Float32Array(4);
            },
            add: function (a, b, out) {
                out[0] = a[0] + b[0];
                out[1] = a[1] + b[1];
                out[2] = a[2] + b[2];
                out[3] = a[3] + b[3];
            },
            set: function (a, out) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
            }
        };
        geom.Point_m4 = {
            create: function (mat) {
                var d = new Float32Array(16);
                d[0] = d[5] = d[10] = d[15] = 1.0;
                if (mat)
                    geom.Point_m4.set(mat, d);
                return d;
            },
            set: function (m, d) {
                d[0] = m[0];
                d[1] = m[1];
                d[2] = m[2];
                d[3] = m[3];
                d[4] = m[4];
                d[5] = m[5];
                d[6] = m[6];
                d[7] = m[7];
                d[8] = m[8];
                d[9] = m[9];
                d[10] = m[10];
                d[11] = m[11];
                d[12] = m[12];
                d[13] = m[13];
                d[14] = m[14];
                d[15] = m[15];
            },
            multiply: function (a, b, out) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
                // Cache only the current line of the second matrix
                var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
                out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b[4];
                b1 = b[5];
                b2 = b[6];
                b3 = b[7];
                out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b[8];
                b1 = b[9];
                b2 = b[10];
                b3 = b[11];
                out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b[12];
                b1 = b[13];
                b2 = b[14];
                b3 = b[15];
                out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                return out;
            },
            inverse: function (a, out) {
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, 
                // Calculate the determinant
                det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
                if (!det) {
                    return null;
                }
                det = 1.0 / det;
                out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
                out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
                out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
                out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
                out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
                out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
                out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
                out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
                out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
                out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
                out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
                out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
                out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
                out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
                out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
                out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
                return out;
            },
            multiplyVec2: function (m, vec, dest) {
                var x = vec[0], y = vec[1];
                dest[0] = x * m[0] + y * m[4] + m[12];
                dest[1] = x * m[1] + y * m[5] + m[13];
            },
            multiplyVec4: function (m, v, out) {
                var v0 = v[0], v1 = v[1], v2 = v[2], v3 = v[3];
                out[0] = m[0] * v0 + m[4] * v1 + m[8] * v2 + m[12] * v3;
                out[1] = m[1] * v0 + m[5] * v1 + m[9] * v2 + m[13] * v3;
                out[2] = m[2] * v0 + m[6] * v1 + m[10] * v2 + m[14] * v3;
                out[3] = m[3] * v0 + m[7] * v1 + m[11] * v2 + m[15] * v3;
            }
        };
    })(geom = ic.geom || (ic.geom = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var geom;
    (function (geom) {
        var Rectangle = (function () {
            function Rectangle(x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = 0; }
                if (h === void 0) { h = 0; }
                this.x = x;
                this.y = y;
                this.width = w;
                this.height = h;
            }
            Rectangle.prototype.clone = function () {
                return new Rectangle(this.x, this.y, this.width, this.height);
            };
            Rectangle.prototype.contains = function (x, y) {
                return (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height);
            };
            Rectangle.prototype.containsPoint = function (p) {
                return this.contains(p.x, p.y);
            };
            Rectangle.prototype.containsRect = function (r) {
                return (this.x <= r.x && this.y <= r.y && r.x + r.width <= this.x + this.width && r.y + r.height <= this.y + this.height);
            };
            Rectangle.prototype.copyFrom = function (r) {
                this.x = r.x;
                this.y = r.y;
                this.width = r.width;
                this.height = r.height;
            };
            Rectangle.prototype.equals = function (r) {
                return (this.x == r.x && this.y == r.y && this.width == r.width && this.height == r.height);
            };
            Rectangle.prototype.inflate = function (dx, dy) {
                this.x -= dx;
                this.y -= dy;
                this.width += 2 * dx;
                this.height += 2 * dy;
            };
            Rectangle.prototype.inflatePoint = function (p) {
                this.inflate(p.x, p.y);
            };
            Rectangle.prototype.intersection = function (rec) {
                var l = Math.max(this.x, rec.x);
                var u = Math.max(this.y, rec.y);
                var r = Math.min(this.x + this.width, rec.x + rec.width);
                var d = Math.min(this.y + this.height, rec.y + rec.height);
                if (r < l || d < u)
                    return new Rectangle();
                else
                    return new Rectangle(l, u, r - l, d - u);
            };
            Rectangle.prototype.intersects = function (r) {
                return !(r.y + r.height < this.y || r.x > this.x + this.width || r.y > this.y + this.height || r.x + r.width < this.x);
            };
            Rectangle.prototype.isEmpty = function () {
                return (this.width <= 0 || this.height <= 0);
            };
            Rectangle.prototype.offset = function (dx, dy) {
                this.x += dx;
                this.y += dy;
            };
            Rectangle.prototype.offsetPoint = function (p) {
                this.offset(p.x, p.y);
            };
            Rectangle.prototype.setEmpty = function () {
                this.x = this.y = this.width = this.height = 0;
            };
            Rectangle.prototype.setTo = function (x, y, w, h) {
                this.x = x;
                this.y = y;
                this.width = w;
                this.height = h;
            };
            Rectangle.prototype.union = function (r) {
                if (this.isEmpty())
                    return r.clone();
                if (r.isEmpty())
                    return this.clone();
                var nr = this.clone();
                nr.unionWith(r);
                return nr;
            };
            Rectangle.prototype.unionWith = function (r) {
                if (r.isEmpty())
                    return;
                if (this.isEmpty()) {
                    this.copyFrom(r);
                    return;
                }
                this._unionWP(r.x, r.y);
                this._unionWP(r.x + r.width, r.y + r.height);
            };
            Rectangle.prototype._unionWP = function (x, y) {
                var minx = Math.min(this.x, x);
                var miny = Math.min(this.y, y);
                this.width = Math.max(this.x + this.width, x) - minx;
                this.height = Math.max(this.y + this.height, y) - miny;
                this.x = minx;
                this.y = miny;
            };
            Rectangle.prototype._unionWL = function (x0, y0, x1, y1) {
                if (this.width == 0 && this.height == 0)
                    this._setP(x0, y0);
                else
                    this._unionWP(x0, y0);
                this._unionWP(x1, y1);
            };
            Rectangle.prototype._setP = function (x, y) {
                this.x = x;
                this.y = y;
                this.width = this.height = 0;
            };
            Rectangle._temp = new Float32Array(2);
            return Rectangle;
        }());
        geom.Rectangle = Rectangle;
    })(geom = ic.geom || (ic.geom = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var geom;
    (function (geom) {
        var Transform = (function () {
            function Transform() {
                this._obj = null;
                this._mdirty = false; // matrix dirty
                this._vdirty = false; // values dirty
                this._tmat = geom.Point_m4.create();
                this._imat = geom.Point_m4.create();
                this._atmat = geom.Point_m4.create();
                this._aimat = geom.Point_m4.create();
                this._pscal = geom.Point_m4.create();
                this._cmat = geom.Point_m4.create();
                this._cvec = geom.Point_v4.create();
                this._cID = true;
                this._scaleX = 1;
                this._scaleY = 1;
                this._scaleZ = 1;
                this._rotationX = 0;
                this._rotationY = 0;
                this._rotationZ = 0;
            }
            Transform.prototype.getTMat = function () {
                var o = this._obj;
                var m = this._tmat;
                this._checkMat();
                m[12] = o.x;
                m[13] = o.y;
                m[14] = o.z;
                return m;
            };
            Transform.prototype._getIMat = function () {
                geom.Point_m4.inverse(this.getTMat(), this._imat);
                return this._imat;
            };
            Transform.prototype._postScale = function (sx, sy) {
                this._checkMat();
                var ps = this._pscal;
                ps[10] = ps[15] = 1;
                ps[0] = sx;
                ps[5] = sy;
                geom.Point_m4.multiply(ps, this._tmat, this._tmat);
                this._vdirty = true;
            };
            Transform.prototype._valsToMat = function () {
                var m = this._tmat;
                var sx = this._scaleX;
                var sy = this._scaleY;
                var sz = this._scaleZ;
                var r = -0.01745329252;
                var a = this._rotationX * r; // alpha
                var b = this._rotationY * r; // beta
                var g = this._rotationZ * r; // gama
                var ca = Math.cos(a), cb = Math.cos(b), cg = Math.cos(g);
                var sa = Math.sin(a), sb = Math.sin(b), sg = Math.sin(g);
                m[0] = cb * cg * sx;
                m[1] = -cb * sg * sx;
                m[2] = sb * sx;
                m[4] = (ca * sg + sa * sb * cg) * sy;
                m[5] = (ca * cg - sa * sb * sg) * sy;
                m[6] = -sa * cb * sy;
                m[8] = (sa * sg - ca * sb * cg) * sz;
                m[9] = (sa * cg + ca * sb * sg) * sz;
                m[10] = ca * cb * sz;
            };
            Transform.prototype._matToVals = function () {
                var a = this._tmat;
                var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[4], a11 = a[5], a12 = a[6], a20 = a[8], a21 = a[9], a22 = a[10];
                this._scaleX = Math.sqrt(a00 * a00 + a01 * a01 + a02 * a02);
                this._scaleY = Math.sqrt(a10 * a10 + a11 * a11 + a12 * a12);
                this._scaleZ = Math.sqrt(a20 * a20 + a21 * a21 + a22 * a22);
                var isX = 1 / this._scaleX, isY = 1 / this._scaleY, isZ = 1 / this._scaleZ;
                a00 *= isX;
                a01 *= isX;
                a02 *= isX;
                a10 *= isY;
                a11 *= isY;
                a12 *= isY;
                a20 *= isZ;
                a21 *= isZ;
                a22 *= isZ;
                var r = -57.29577951308;
                this._rotationX = r * Math.atan2(-a12, a22);
                this._rotationY = r * Math.atan2(a02, Math.sqrt(a12 * a12 + a22 * a22));
                this._rotationZ = r * Math.atan2(-a01, a00);
            };
            Transform.prototype._checkVals = function () {
                if (this._vdirty) {
                    this._matToVals();
                    this._vdirty = false;
                }
            };
            Transform.prototype._checkMat = function () {
                if (this._mdirty) {
                    this._valsToMat();
                    this._mdirty = false;
                }
            };
            Transform.prototype._setOPos = function () {
                var m = this._tmat;
                this._obj.x = m[12];
                this._obj.y = m[13];
                this._obj.z = m[14];
            };
            Transform.prototype._checkColorID = function () {
                var m = this._cmat;
                var v = this._cvec;
                this._cID = m[15] == 1 &&
                    m[0] == 1 && m[1] == 0 && m[2] == 0 && m[3] == 0 &&
                    m[4] == 0 && m[5] == 1 && m[6] == 0 && m[7] == 0 &&
                    m[8] == 0 && m[9] == 0 && m[10] == 1 && m[11] == 0 &&
                    m[12] == 0 && m[13] == 0 && m[14] == 0 && m[15] == 1 &&
                    v[0] == 0 && v[1] == 0 && v[2] == 0 && v[3] == 0;
            };
            Transform.prototype._setMat3 = function (m3) {
                var m4 = this._tmat;
                m4[0] = m3[0];
                m4[1] = m3[1];
                m4[4] = m3[3];
                m4[5] = m3[4];
                m4[12] = m3[6];
                m4[13] = m3[7];
            };
            Transform.prototype._getMat3 = function (m3) {
                var m4 = this._tmat;
                m3[0] = m4[0];
                m3[1] = m4[1];
                m3[3] = m4[4];
                m3[4] = m4[5];
                m3[6] = m4[12];
                m3[7] = m4[13];
            };
            Transform.prototype._setCMat5 = function (m5) {
                var m4 = this._cmat, v4 = this._cvec;
                for (var i = 0; i < 4; i++) {
                    v4[i] = m5[20 + i];
                    for (var j = 0; j < 4; j++)
                        m4[4 * i + j] = m5[5 * i + j];
                }
            };
            Transform.prototype._getCMat5 = function (m5) {
                var m4 = this._cmat, v4 = this._cvec;
                m5[24] = 1;
                for (var i = 0; i < 4; i++) {
                    m5[20 + i] = v4[i];
                    for (var j = 0; j < 4; j++)
                        m5[5 * i + j] = m4[4 * i + j];
                }
            };
            Object.defineProperty(Transform.prototype, "matrix", {
                get: function () {
                    this._checkMat();
                    var m = new Float32Array(9);
                    this._getMat3(m);
                    return m;
                },
                set: function (m) {
                    this._checkMat();
                    this._setMat3(m);
                    this._setOPos();
                    this._vdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "matrix3D", {
                get: function () {
                    this._checkMat();
                    return geom.Point_m4.create(this.getTMat());
                },
                set: function (m) {
                    this._checkMat();
                    geom.Point_m4.set(m, this._tmat);
                    this._setOPos();
                    this._vdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "colorTransform", {
                get: function () {
                    var m = new Float32Array(25);
                    this._getCMat5(m);
                    return m;
                },
                set: function (m) {
                    this._setCMat5(m);
                    this._checkColorID();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "obj", {
                set: function (o) {
                    this._obj = o;
                },
                enumerable: true,
                configurable: true
            });
            return Transform;
        }());
        geom.Transform = Transform;
    })(geom = ic.geom || (ic.geom = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var events;
    (function (events) {
        var Event = (function () {
            function Event(type, bubbles) {
                if (bubbles === void 0) { bubbles = false; }
                this.type = type;
                this.target = null;
                this.currentTarget = null;
                this.bubbles = bubbles;
            }
            Event.ENTER_FRAME = "enterFrame";
            Event.RESIZE = "resize";
            Event.ADDED_TO_STAGE = "addedToStage";
            Event.REMOVED_FROM_STAGE = "removedFromStage";
            Event.CHANGE = "change";
            Event.OPEN = "open";
            Event.PROGRESS = "progress";
            Event.COMPLETE = "complete";
            return Event;
        }());
        events.Event = Event;
    })(events = ic.events || (ic.events = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var events;
    (function (events) {
        /**
         * Base class for dispatching events
         *
         * @class EventDispatcher
         */
        var EventDispatcher = (function () {
            function EventDispatcher() {
                /** hash table for listeners ... Key (Event type) : Array of functions */
                this._listeners = {};
                /** hash table for objects   ... Key (Event type) : Array of Objects, on which function should be called */
                this._targetObjects = {};
            }
            /**
             * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
             * @param type
             * @param callback
             * @param object
             */
            EventDispatcher.prototype.addEventListener = function (type, callback, object) {
                if (object === void 0) { object = null; }
                if (this._listeners[type] == null) {
                    this._listeners[type] = [];
                    this._targetObjects[type] = [];
                }
                this._listeners[type].push(callback);
                this._targetObjects[type].push(object);
                if (type == events.Event.ENTER_FRAME) {
                    var arEF = EventDispatcher.efbc;
                    if (arEF.indexOf(this) < 0)
                        arEF.push(this);
                }
            };
            /**
             * Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the
             * dispatchEvent() method is called.
             * @param event The event object dispatched into the event flow.
             */
            EventDispatcher.prototype.dispatchEvent = function (event) {
                event.currentTarget = this;
                if (event.target == null)
                    event.target = this;
                var fs = this._listeners[event.type];
                if (fs == null)
                    return;
                var cs = this._targetObjects[event.type];
                for (var i = 0; i < fs.length; i++) {
                    if (cs[i] == null)
                        fs[i](event);
                    else
                        fs[i].call(cs[i], event);
                }
            };
            /**
             * Checks whether the EventDispatcher object has any listeners registered for a specific type of event.
             * @param type
             * @returns {boolean}
             */
            EventDispatcher.prototype.hasEventListener = function (type) {
                var fs = this._listeners[type]; // functions for this event
                if (fs == null)
                    return false;
                return (fs.length > 0);
            };
            /**
             * Removes a listener from the EventDispatcher object.
             * @param type
             * @param callback
             */
            EventDispatcher.prototype.removeEventListener = function (type, callback) {
                var fs = this._listeners[type]; // functions for this event
                if (fs == null)
                    return;
                var ind = fs.indexOf(callback);
                if (ind < 0)
                    return;
                var cs = this._targetObjects[type];
                fs.splice(ind, 1);
                cs.splice(ind, 1);
                if (type == events.Event.ENTER_FRAME && fs.length == 0) {
                    var arEF = EventDispatcher.efbc;
                    arEF.splice(arEF.indexOf(this), 1);
                }
            };
            /** objects, on which EnterFrame will be broadcast */
            EventDispatcher.efbc = [];
            return EventDispatcher;
        }());
        events.EventDispatcher = EventDispatcher;
    })(events = ic.events || (ic.events = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var events;
    (function (events) {
        var MouseEvent = (function (_super) {
            __extends(MouseEvent, _super);
            function MouseEvent(type, bubbles) {
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, bubbles);
                this.movementX = 0;
                this.movementY = 0;
            }
            MouseEvent.CLICK = "click";
            MouseEvent.MOUSE_DOWN = "mouseDown";
            MouseEvent.MOUSE_UP = "mouseUp";
            MouseEvent.MIDDLE_CLICK = "middleClick";
            MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
            MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
            MouseEvent.RIGHT_CLICK = "rightClick";
            MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
            MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
            MouseEvent.MOUSE_MOVE = "mouseMove";
            MouseEvent.MOUSE_OVER = "mouseOver";
            MouseEvent.MOUSE_OUT = "mouseOut";
            return MouseEvent;
        }(events.Event));
        events.MouseEvent = MouseEvent;
    })(events = ic.events || (ic.events = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var events;
    (function (events) {
        var TouchEvent = (function (_super) {
            __extends(TouchEvent, _super);
            function TouchEvent(type, bubbles) {
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, bubbles);
                this.stageX = 0;
                this.stageY = 0;
                this.touchPointID = -1;
            }
            TouchEvent.prototype._setFromDom = function (touchEvent) {
                var devicePixelRatio = window.devicePixelRatio || 1;
                this.stageX = touchEvent.clientX * devicePixelRatio;
                this.stageY = touchEvent.clientY * devicePixelRatio;
                this.touchPointID = touchEvent.identifier;
            };
            TouchEvent.TOUCH_BEGIN = "touchBegin";
            TouchEvent.TOUCH_END = "touchEnd";
            TouchEvent.TOUCH_MOVE = "touchMove";
            TouchEvent.TOUCH_OUT = "touchOut";
            TouchEvent.TOUCH_OVER = "touchOver";
            //public static TOUCH_ROLL_OUT = "touchRollOut";
            //public static TOUCH_ROLL_OVER = "touchRollOver";
            TouchEvent.TOUCH_TAP = "touchTap";
            return TouchEvent;
        }(events.Event));
        events.TouchEvent = TouchEvent;
    })(events = ic.events || (ic.events = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var events;
    (function (events) {
        var KeyboardEvent = (function (_super) {
            __extends(KeyboardEvent, _super);
            function KeyboardEvent(type, bubbles) {
                if (bubbles === void 0) { bubbles = false; }
                _super.call(this, type, bubbles);
                this.altKey = false;
                this.ctrlKey = false;
                this.shiftKey = false;
                this.keyCode = 0;
                this.charCode = 0;
            }
            KeyboardEvent.prototype._setFromDom = function (event) {
                this.altKey = event.altKey;
                this.ctrlKey = event.ctrlKey;
                this.shiftKey = event.shiftKey;
                this.keyCode = event.keyCode;
                this.charCode = event.charCode;
            };
            KeyboardEvent.KEY_DOWN = "keyDown";
            KeyboardEvent.KEY_UP = "keyUp";
            return KeyboardEvent;
        }(events.Event));
        events.KeyboardEvent = KeyboardEvent;
    })(events = ic.events || (ic.events = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var display;
    (function (display) {
        var Rectangle = ic.geom.Rectangle;
        var Point = ic.geom.Point;
        var Graphics = (function () {
            function Graphics() {
                this._conf = {
                    // type: 0 - none, 1 - color, 2 - bitmap;
                    ftype: 0,
                    fbdata: null,
                    fcolor: null,
                    lwidth: 0,
                    lcolor: null
                };
                this._points = [0, 0];
                this._fills = [];
                this._afills = []; // _fills + triangles
                this._lfill = null; // last fill (Graphics.Fill or Graphics.Tgs)
                this._rect = new Rectangle(0, 0, 0, 0); // fill rect
                this._srect = new Rectangle(0, 0, 0, 0); // stroke rect
                this._startNewFill();
            }
            Graphics.prototype._startNewFill = function () {
                this._endLine();
                var len = this._points.length / 2;
                var fill = new Fill(len - 1, this._conf);
                this._fills.push(fill);
                this._afills.push(fill);
                this._lfill = fill;
            };
            Graphics.prototype._startLine = function () {
                var len = this._points.length / 2;
                var fill = this._fills[this._fills.length - 1];
                var fllen = fill.lines.length;
                if (fllen > 0 && fill.lines[fllen - 1].isEmpty())
                    fill.lines[fllen - 1].Set(len - 1, this._conf);
                else
                    fill.lines.push(new Line(len - 1, this._conf));
            };
            Graphics.prototype._endLine = function () {
                if (this._fills.length == 0)
                    return;
                var len = this._points.length / 2;
                var fill = this._fills[this._fills.length - 1];
                if (fill.lines.length != 0)
                    fill.lines[fill.lines.length - 1].end = len - 1;
            };
            /**
             * Renders a vector content
             */
            Graphics.prototype.render = function (st) {
                this._endLine();
                display.gl.uniformMatrix4fv(st._sprg.tMatUniform, false, st._mstack.top());
                st._cmstack.update();
                for (var i = 0; i < this._afills.length; i++)
                    this._afills[i].render(st, this._points, this._rect);
            };
            Graphics.prototype.lineStyle = function (thickness, color, alpha) {
                if (color === void 0) { color = 0x000000; }
                if (alpha === void 0) { alpha = 1; }
                //if(this._conf.lwidth==thickness && Graphics.equalColor(this._conf.color, Graphics.makeColor(color, alpha))) return;
                //////////
                this._conf.lwidth = thickness;
                this._conf.lcolor = Graphics.makeColor(color, alpha);
                this._endLine();
                this._startLine();
                //////////
            };
            /**
             * Begin to fill some shape
             * @param color    color
             * @param alpha
             */
            Graphics.prototype.beginFill = function (color, alpha) {
                if (alpha === void 0) { alpha = 1; }
                this._conf.ftype = 1;
                this._conf.fcolor = Graphics.makeColor(color, alpha);
                this._startNewFill();
            };
            Graphics.prototype.beginBitmapFill = function (bdata) {
                this._conf.ftype = 2;
                this._conf.fbdata = bdata;
                this._startNewFill();
            };
            /**
             * End filling some shape
             */
            Graphics.prototype.endFill = function () {
                this._conf.ftype = 0;
                this._startNewFill();
            };
            /**
             * Move a "drawing brush" to some position
             * @param x
             * @param y
             */
            Graphics.prototype.moveTo = function (x, y) {
                this._endLine();
                this._points.push(x, y);
                this._startLine();
            };
            /**
             * Draw a line to some position
             * @param x2
             * @param y2
             */
            Graphics.prototype.lineTo = function (x2, y2) {
                var ps = this._points;
                if (x2 == ps[ps.length - 2] && y2 == ps[ps.length - 1])
                    return;
                if (ps.length > 0)
                    if (this._conf.ftype > 0)
                        this._rect._unionWL(ps[ps.length - 2], ps[ps.length - 1], x2, y2);
                if (this._conf.lwidth > 0)
                    this._srect._unionWL(ps[ps.length - 2], ps[ps.length - 1], x2, y2);
                ps.push(x2, y2);
            };
            Graphics.prototype.curveTo = function (bx, by, cx, cy) {
                var ps = this._points;
                var ax = ps[ps.length - 2];
                var ay = ps[ps.length - 1];
                var t = 2 / 3;
                this.cubicCurveTo(ax + t * (bx - ax), ay + t * (by - ay), cx + t * (bx - cx), cy + t * (by - cy), cx, cy);
            };
            Graphics.prototype.cubicCurveTo = function (bx, by, cx, cy, dx, dy, parts) {
                if (parts === void 0) { parts = 40; }
                /*
                        b --- q --- c
                       / 			 \
                      p				  r
                     /				   \
                    a					d
                 */
                var ps = this._points;
                var ax = ps[ps.length - 2], ay = ps[ps.length - 1];
                var tobx = bx - ax, toby = by - ay; // directions
                var tocx = cx - bx, tocy = cy - by;
                var todx = dx - cx, tody = dy - cy;
                var step = 1 / parts;
                for (var i = 1; i < parts; i++) {
                    var d = i * step;
                    var px = ax + d * tobx, py = ay + d * toby;
                    var qx = bx + d * tocx, qy = by + d * tocy;
                    var rx = cx + d * todx, ry = cy + d * tody;
                    var toqx = qx - px, toqy = qy - py;
                    var torx = rx - qx, tory = ry - qy;
                    var sx = px + d * toqx, sy = py + d * toqy;
                    var tx = qx + d * torx, ty = qy + d * tory;
                    var totx = tx - sx, toty = ty - sy;
                    this.lineTo(sx + d * totx, sy + d * toty);
                }
                this.lineTo(dx, dy);
            };
            /**
             * Draw a circle
             * @param x        X coordinate of a center
             * @param y        Y coordinate of a center
             * @param r        radius
             */
            Graphics.prototype.drawCircle = function (x, y, r) {
                this.drawEllipse(x, y, r * 2, r * 2);
            };
            /**
             * Draw an ellipse
             * @param x        X coordinate of a center
             * @param y        Y coordinate of a center
             * @param w        ellipse width
             * @param h        ellipse height
             */
            Graphics.prototype.drawEllipse = function (x, y, w, h) {
                var hw = w / 2, hh = h / 2;
                var c = 0.553;
                this.moveTo(x, y - hh);
                this.cubicCurveTo(x + c * hw, y - hh, x + hw, y - c * hh, x + hw, y, 16);
                this.cubicCurveTo(x + hw, y + c * hh, x + c * hw, y + hh, x, y + hh, 16);
                this.cubicCurveTo(x - c * hw, y + hh, x - hw, y + c * hh, x - hw, y, 16);
                this.cubicCurveTo(x - hw, y - c * hh, x - c * hw, y - hh, x, y - hh, 16);
            };
            Graphics.prototype.drawRect = function (x, y, w, h) {
                this.moveTo(x, y);
                this.lineTo(x + w, y);
                this.lineTo(x + w, y + h);
                this.lineTo(x, y + h);
                this.lineTo(x, y);
            };
            /**
             * Draws a rectangle with round corners
             * @param x        X coordinate of top left corner
             * @param y        Y coordinate of top left corner
             * @param w        width
             * @param h        height
             * @param ew
             * @param eh
             */
            Graphics.prototype.drawRoundRect = function (x, y, w, h, ew, eh) {
                var hw = ew / 2, hh = eh / 2;
                var c = 0.553;
                var x0 = x + hw, x1 = x + w - hw;
                var y0 = y + hh, y1 = y + h - hh;
                this.moveTo(x0, y);
                this.lineTo(x1, y);
                this.cubicCurveTo(x1 + c * hw, y, x + w, y0 - c * hh, x + w, y0, 16);
                this.lineTo(x + w, y1);
                this.cubicCurveTo(x + w, y1 + c * hh, x1 + c * hw, y + h, x1, y + h, 16);
                this.lineTo(x0, y + h);
                this.cubicCurveTo(x0 - c * hw, y + h, x, y1 + c * hh, x, y1, 16);
                this.lineTo(x, y0);
                this.cubicCurveTo(x, y0 - c * hh, x0 - c * hw, y, x0, y, 16);
            };
            Graphics.prototype.drawTriangles = function (vrt, ind, uvt) {
                if (uvt === void 0) { uvt = null; }
                Fill.updateRect(vrt, this._rect);
                var nvrt = [];
                for (var i = 0; i < vrt.length; i += 2)
                    nvrt.push(vrt[i], vrt[i + 1], 0);
                var tgs = Graphics.makeTgs(nvrt, ind, uvt, this._conf.fcolor, this._conf.fbdata);
                this._afills.push(tgs);
                this._lfill = tgs;
            };
            Graphics.prototype.drawTriangles3D = function (vrt, ind, uvt) {
                var tgs = Graphics.makeTgs(vrt, ind, uvt, this._conf.fcolor, this._conf.fbdata);
                this._afills.push(tgs);
                this._lfill = tgs;
            };
            Graphics.prototype.clear = function () {
                //console.log("clearing");
                this._conf.ftype = 0;
                this._conf.bdata = null;
                this._conf.fcolor = null;
                this._conf.lwidth = 0;
                this._points = [0, 0];
                this._fills = [];
                for (var i = 0; i < this._afills.length; i++) {
                    var f = this._afills[i];
                    if (f instanceof Fill) {
                        if (f.tgs)
                            Graphics._freeTgs(f.tgs);
                        for (var j = 0; j < f.lineTGS.length; j++)
                            Graphics._freeTgs(f.lineTGS[j]);
                    }
                    else
                        Graphics._freeTgs(f);
                }
                this._afills = []; // _fills + triangles
                this._lfill = null;
                this._rect.setEmpty();
                this._startNewFill();
            };
            /**
             * Returns a bounding rectangle of a vector content
             * @return    a bounding rectangle
             */
            Graphics.prototype.getLocRect = function (stks) {
                if (stks == false)
                    return this._rect;
                else
                    return this._rect.union(this._srect);
            };
            Graphics.prototype._hits = function (x, y) {
                return this._rect.contains(x, y);
            };
            Graphics.makeColor = function (c, a) {
                var col = new Float32Array(4);
                col[0] = (c >> 16 & 255) * 0.0039215686;
                col[1] = (c >> 8 & 255) * 0.0039215686;
                col[2] = (c & 255) * 0.0039215686;
                col[3] = a;
                return col;
            };
            Graphics.equalColor = function (a, b) {
                return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
            };
            Graphics.len = function (x, y) {
                return Math.sqrt(x * x + y * y);
            };
            Graphics.makeTgs = function (vrt, ind, uvt, color, bdata) {
                var name = "t_" + vrt.length + "_" + ind.length;
                var arr = Graphics._delTgs[name];
                if (arr == null || arr.length == 0)
                    return new Tgs(vrt, ind, uvt, color, bdata);
                var t = arr.pop();
                Graphics._delNum--;
                t.Set(vrt, ind, uvt, color, bdata);
                return t;
            };
            Graphics._freeTgs = function (tgs) {
                var arr = Graphics._delTgs[tgs.name];
                if (arr == null)
                    arr = [];
                arr.push(tgs);
                Graphics._delNum++;
                Graphics._delTgs[tgs.name] = arr;
            };
            Graphics._delTgs = {};
            Graphics._delNum = 0;
            return Graphics;
        }());
        display.Graphics = Graphics;
        var Fill = (function () {
            function Fill(begin, conf) {
                // type: 0 - none, 1 - color, 2 - bitmap;
                this.type = conf.ftype;
                this.color = conf.fcolor;
                this.bdata = conf.fbdata;
                this.lines = [new Line(begin, conf)];
                this.lineTGS = [];
                this.dirty = true;
                this.tgs = null;
            }
            Fill.prototype.Build = function (ps, rect) {
                var tvrt = [];
                var tind = [];
                var lTGS = []; // array of { vrt:[], ind:[], color:[] }
                var cline = null;
                var lwidth = -1;
                var lcolor = null;
                for (var l = 0; l < this.lines.length; l++) {
                    var line = this.lines[l];
                    if (line.begin == line.end)
                        continue;
                    var lbeg = line.begin * 2;
                    var lend = line.end * 2;
                    var firstEqLast = (ps[lbeg] == ps[lend] && ps[lbeg + 1] == ps[lend + 1]);
                    if (firstEqLast)
                        lend -= 2;
                    if (line.width > 0) {
                        if (cline == null || line.width != lwidth || !Graphics.equalColor(lcolor, line.color)) {
                            cline = { vrt: [], ind: [], color: line.color };
                            lTGS.push(cline);
                            lwidth = line.width;
                            lcolor = line.color;
                        }
                        Line.GetTriangles(ps, lbeg, lend, line, (this.type != 0 || firstEqLast), cline.ind, cline.vrt);
                    }
                    if (this.type != 0 && lend - lbeg > 2) {
                        var vts = ps.slice(line.begin * 2, line.end * 2 + 2);
                        if (firstEqLast) {
                            vts.pop();
                            vts.pop();
                        }
                        if (PolyK.GetArea(vts) < 0)
                            vts = PolyK.Reverse(vts);
                        //Graphics.Fill.updateRect(vts, rect);
                        var vnum = tvrt.length / 3;
                        var ind = PolyK.Triangulate(vts);
                        for (var i = 0; i < ind.length; i++)
                            tind.push(ind[i] + vnum);
                        for (var i = 0; i < vts.length / 2; i++)
                            tvrt.push(vts[2 * i], vts[2 * i + 1], 0);
                    }
                }
                for (var i = 0; i < lTGS.length; i++) {
                    this.lineTGS.push(Graphics.makeTgs(lTGS[i].vrt, lTGS[i].ind, null, lTGS[i].color));
                }
                if (tvrt.length > 0)
                    this.tgs = Graphics.makeTgs(tvrt, tind, null, this.color, this.bdata);
            };
            Fill.prototype.isEmpty = function () {
                if (this.lines.length == 0)
                    return true;
                return this.lines[0].isEmpty();
            };
            Fill.prototype.render = function (st, ps, rect) {
                if (this.dirty) {
                    this.Build(ps, rect);
                    this.dirty = false;
                }
                if (this.tgs)
                    this.tgs.render(st);
                for (var i = 0; i < this.lineTGS.length; i++)
                    this.lineTGS[i].render(st);
            };
            Fill.updateRect = function (vts, rect) {
                var minx = Infinity, miny = Infinity;
                var maxx = -Infinity, maxy = -Infinity;
                if (!rect.isEmpty()) {
                    minx = rect.x;
                    miny = rect.y;
                    maxx = rect.x + rect.width;
                    maxy = rect.y + rect.height;
                }
                for (var i = 0; i < vts.length; i += 2) {
                    minx = Math.min(minx, vts[i]);
                    miny = Math.min(miny, vts[i + 1]);
                    maxx = Math.max(maxx, vts[i]);
                    maxy = Math.max(maxy, vts[i + 1]);
                }
                rect.x = minx;
                rect.y = miny;
                rect.width = maxx - minx;
                rect.height = maxy - miny;
            };
            return Fill;
        }());
        var Line = (function () {
            function Line(begin, conf) {
                this.begin = begin; // index to first point
                this.end = -1; // index to last point
                this.width = conf.lwidth;
                this.color = conf.lcolor;
                //this.dirty = true;
            }
            Line.prototype.Set = function (begin, conf) {
                this.begin = begin; // index to first point
                this.end = -1; // index to last point
                this.width = conf.lwidth;
                this.color = conf.lcolor;
            };
            Line.prototype.isEmpty = function () {
                return this.begin == this.end;
            };
            Line.GetTriangles = function (ps, lbeg, lend, line, close, ind, vrt) {
                var vnum = vrt.length / 3;
                var l = lend - lbeg - 2;
                if (close)
                    Line.AddJoint(ps, lend, lbeg, lbeg + 2, line.width, vrt);
                else
                    Line.AddEnd(ps, lbeg, lbeg + 2, true, line.width, vrt);
                for (var i = 0; i < l; i += 2) {
                    Line.AddJoint(ps, lbeg + i, lbeg + i + 2, lbeg + i + 4, line.width, vrt);
                    ind.push(vnum + i, vnum + i + 1, vnum + i + 2, vnum + i + 1, vnum + i + 2, vnum + i + 3);
                }
                if (close) {
                    Line.AddJoint(ps, lbeg + l, lbeg + l + 2, lbeg, line.width, vrt);
                    ind.push(vnum + l, vnum + l + 1, vnum + l + 2, vnum + l + 1, vnum + l + 2, vnum + l + 3);
                    ind.push(vnum + l + 2, vnum + l + 3, vnum, vnum + l + 3, vnum, vnum + 1);
                }
                else {
                    Line.AddEnd(ps, lbeg + l, lbeg + l + 2, false, line.width, vrt);
                    ind.push(vnum + l, vnum + 1 + l, vnum + 2 + l, vnum + 1 + l, vnum + 2 + l, vnum + 3 + l);
                }
            };
            Line.AddEnd = function (ps, i0, i1, start, width, vrt) {
                var x1 = ps[i0], y1 = ps[i0 + 1];
                var x2 = ps[i1], y2 = ps[i1 + 1];
                var il = 0.5 * width / Graphics.len(x1 - x2, y1 - y2);
                var dx = il * (y1 - y2);
                var dy = -il * (x1 - x2);
                //if(start) {vrt.push(x1+dx); vrt.push(y1+dy); vrt.push(0); vrt.push(x1-dx); vrt.push(y1-dy); vrt.push(0);}
                //else	  {vrt.push(x2+dx); vrt.push(y2+dy); vrt.push(0); vrt.push(x2-dx); vrt.push(y2-dy); vrt.push(0);}
                if (start)
                    vrt.push(x1 + dx, y1 + dy, 0, x1 - dx, y1 - dy, 0);
                else
                    vrt.push(x2 + dx, y2 + dy, 0, x2 - dx, y2 - dy, 0);
            };
            Line.AddJoint = function (ps, i0, i1, i2, width, vrt) {
                var a1 = new Point(), a2 = new Point(), b1 = new Point(), b2 = new Point(), c = new Point();
                var x1 = ps[i0], y1 = ps[i0 + 1];
                var x2 = ps[i1], y2 = ps[i1 + 1];
                var x3 = ps[i2], y3 = ps[i2 + 1];
                var ilA = 0.5 * width / Graphics.len(x1 - x2, y1 - y2);
                var ilB = 0.5 * width / Graphics.len(x2 - x3, y2 - y3);
                var dxA = ilA * (y1 - y2), dyA = -ilA * (x1 - x2);
                var dxB = ilB * (y2 - y3), dyB = -ilB * (x2 - x3);
                //if(dxA==dxB && dyA==dyB)
                if (Math.abs(dxA - dxB) + Math.abs(dyA - dyB) < 0.0000001) {
                    vrt.push(x2 + dxA, y2 + dyA, 0);
                    vrt.push(x2 - dxA, y2 - dyA, 0);
                    return;
                }
                a1.setTo(x1 + dxA, y1 + dyA);
                a2.setTo(x2 + dxA, y2 + dyA);
                b1.setTo(x2 + dxB, y2 + dyB);
                b2.setTo(x3 + dxB, y3 + dyB);
                PolyK.GetLineIntersection(a1, a2, b1, b2, c);
                vrt.push(c.x, c.y, 0);
                a1.setTo(x1 - dxA, y1 - dyA);
                a2.setTo(x2 - dxA, y2 - dyA);
                b1.setTo(x2 - dxB, y2 - dyB);
                b2.setTo(x3 - dxB, y3 - dyB);
                PolyK.GetLineIntersection(a1, a2, b1, b2, c);
                vrt.push(c.x, c.y, 0);
            };
            return Line;
        }());
        var Tgs = (function () {
            function Tgs(vrt, ind, uvt, color, bdata) {
                this.color = color;
                this.bdata = bdata;
                this.name = "t_" + vrt.length + "_" + ind.length;
                this.useTex = (bdata != null);
                this.dirtyUVT = true;
                this.emptyUVT = (uvt == null);
                this.useIndex = vrt.length / 3 <= 65536; // use index array for drawing triangles
                if (this.useIndex) {
                    this.ind = new Uint16Array(ind);
                    this.vrt = new Float32Array(vrt);
                    if (uvt)
                        this.uvt = new Float32Array(uvt);
                    else
                        this.uvt = new Float32Array(vrt.length * 2 / 3);
                    this.ibuf = display.gl.createBuffer();
                    display.Stage.setEBF(this.ibuf);
                    display.gl.bufferData(display.gl.ELEMENT_ARRAY_BUFFER, this.ind, display.gl.STATIC_DRAW);
                }
                else {
                    this.vrt = new Float32Array(ind.length * 3);
                    Tgs.unwrapF32(ind, vrt, 3, this.vrt); //new Float32Array(Tgs.unwrap(ind, vrt, 3));
                    this.uvt = new Float32Array(ind.length * 2);
                    if (uvt)
                        Tgs.unwrapF32(ind, uvt, 2, this.uvt); //new Float32Array(Tgs.unwrap(ind, uvt, 2));
                }
                this.vbuf = display.gl.createBuffer();
                display.Stage.setBuffer(this.vbuf);
                display.gl.bufferData(display.gl.ARRAY_BUFFER, this.vrt, display.gl.STATIC_DRAW);
                this.tbuf = display.gl.createBuffer();
                display.Stage.setBuffer(this.tbuf);
                display.gl.bufferData(display.gl.ARRAY_BUFFER, this.uvt, display.gl.STATIC_DRAW);
            }
            Tgs.prototype.Set = function (vrt, ind, uvt, color, bdata) {
                this.color = color;
                this.bdata = bdata;
                //this.name = "t_"+vrt.length+"_"+ind.length;
                this.useTex = (bdata != null);
                this.dirtyUVT = true;
                this.emptyUVT = (uvt == null);
                //this.useIndex = vrt.length/3 <= 65536;	// use index array for drawing triangles
                if (this.useIndex) {
                    var il = ind.length, vl = vrt.length;
                    for (var i = 0; i < il; i++)
                        this.ind[i] = ind[i];
                    for (var i = 0; i < vl; i++)
                        this.vrt[i] = vrt[i];
                    if (uvt)
                        for (var i = 0; i < uvt.length; i++)
                            this.uvt[i] = uvt[i];
                    /*
                     this.ind = new Uint16Array (ind);
                     this.vrt = new Float32Array(vrt);
                     if(uvt) this.uvt = new Float32Array(uvt);
                     else    this.uvt = new Float32Array(vrt.length * 2/3);
    
                     this.ibuf = gl.createBuffer();
                     */
                    display.Stage.setEBF(this.ibuf);
                    display.gl.bufferData(display.gl.ELEMENT_ARRAY_BUFFER, this.ind, display.gl.STATIC_DRAW);
                }
                else {
                    Tgs.unwrapF32(ind, vrt, 3, this.vrt);
                    if (uvt)
                        Tgs.unwrapF32(ind, uvt, 2, this.uvt);
                }
                //this.vbuf = gl.createBuffer();
                display.Stage.setBuffer(this.vbuf);
                display.gl.bufferData(display.gl.ARRAY_BUFFER, this.vrt, display.gl.STATIC_DRAW);
                //this.tbuf = gl.createBuffer();
                display.Stage.setBuffer(this.tbuf);
                display.gl.bufferData(display.gl.ARRAY_BUFFER, this.uvt, display.gl.STATIC_DRAW);
            };
            Tgs.prototype.render = function (st) {
                if (this.useTex) {
                    var bd = this.bdata;
                    if (bd.loaded == false)
                        return;
                    if (bd.dirty)
                        bd.syncWithGPU();
                    if (this.dirtyUVT) {
                        this.dirtyUVT = false;
                        if (this.emptyUVT) {
                            this.emptyUVT = false;
                            var cw = 1 / bd._rwidth, ch = 1 / bd._rheight;
                            for (var i = 0; i < this.uvt.length; i++) {
                                this.uvt[2 * i] = cw * this.vrt[3 * i];
                                this.uvt[2 * i + 1] = ch * this.vrt[3 * i + 1];
                            }
                        }
                        else if (bd.width != bd._rwidth || bd.height != bd._rheight) {
                            var cw = bd.width / bd._rwidth, ch = bd.height / bd._rheight;
                            for (var i = 0; i < this.uvt.length; i++) {
                                this.uvt[2 * i] *= cw;
                                this.uvt[2 * i + 1] *= ch;
                            }
                        }
                        display.Stage.setBuffer(this.tbuf);
                        display.gl.bufferSubData(display.gl.ARRAY_BUFFER, 0, this.uvt);
                    }
                    display.Stage.setUT(1);
                    display.Stage.setTEX(bd.texture);
                }
                else {
                    display.Stage.setUT(0);
                    display.gl.uniform4fv(st._sprg.color, this.color);
                }
                display.Stage.setTC(this.tbuf);
                display.Stage.setVC(this.vbuf);
                if (this.useIndex) {
                    display.Stage.setEBF(this.ibuf);
                    display.gl.drawElements(display.gl.TRIANGLES, this.ind.length, display.gl.UNSIGNED_SHORT, 0); // druhý parametr - počet indexů
                }
                else
                    display.gl.drawArrays(display.gl.TRIANGLES, 0, this.vrt.length / 3);
            };
            Tgs.unwrapF32 = function (ind, crd, cpi, ncrd) {
                var il = ind.length;
                for (var i = 0; i < il; i++)
                    for (var j = 0; j < cpi; j++)
                        ncrd[i * cpi + j] = crd[ind[i] * cpi + j];
            };
            return Tgs;
        }());
        var PolyK = (function () {
            function PolyK() {
            }
            PolyK.Triangulate = function (p) {
                var n = p.length >> 1;
                if (n < 3)
                    return [];
                var tgs = [];
                if (PolyK.IsConvex(p)) {
                    for (var i = 1; i < n - 1; i++)
                        tgs.push(0, i, i + 1);
                    return tgs;
                }
                var avl = [];
                for (var i = 0; i < n; i++)
                    avl.push(i);
                var i = 0;
                var al = n;
                while (al > 3) {
                    var i0 = avl[(i + 0) % al];
                    var i1 = avl[(i + 1) % al];
                    var i2 = avl[(i + 2) % al];
                    var ax = p[2 * i0], ay = p[2 * i0 + 1];
                    var bx = p[2 * i1], by = p[2 * i1 + 1];
                    var cx = p[2 * i2], cy = p[2 * i2 + 1];
                    var earFound = false;
                    if (PolyK._convex(ax, ay, bx, by, cx, cy)) {
                        earFound = true;
                        for (var j = 0; j < al; j++) {
                            var vi = avl[j];
                            if (vi == i0 || vi == i1 || vi == i2)
                                continue;
                            if (PolyK._PointInTriangle(p[2 * vi], p[2 * vi + 1], ax, ay, bx, by, cx, cy)) {
                                earFound = false;
                                break;
                            }
                        }
                    }
                    if (earFound) {
                        tgs.push(i0, i1, i2);
                        avl.splice((i + 1) % al, 1);
                        al--;
                        i = 0;
                    }
                    else if (i++ > 3 * al)
                        break; // no convex angles :(
                }
                tgs.push(avl[0], avl[1], avl[2]);
                return tgs;
            };
            PolyK.IsConvex = function (p) {
                if (p.length < 6)
                    return true;
                var l = p.length - 4;
                for (var i = 0; i < l; i += 2)
                    if (!PolyK._convex(p[i], p[i + 1], p[i + 2], p[i + 3], p[i + 4], p[i + 5]))
                        return false;
                if (!PolyK._convex(p[l], p[l + 1], p[l + 2], p[l + 3], p[0], p[1]))
                    return false;
                return PolyK._convex(p[l + 2], p[l + 3], p[0], p[1], p[2], p[3]);
            };
            PolyK._convex = function (ax, ay, bx, by, cx, cy) {
                return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0;
            };
            PolyK._PointInTriangle = function (px, py, ax, ay, bx, by, cx, cy) {
                var v0x = cx - ax, v0y = cy - ay;
                var v1x = bx - ax, v1y = by - ay;
                var v2x = px - ax, v2y = py - ay;
                var dot00 = v0x * v0x + v0y * v0y;
                var dot01 = v0x * v1x + v0y * v1y;
                var dot02 = v0x * v2x + v0y * v2y;
                var dot11 = v1x * v1x + v1y * v1y;
                var dot12 = v1x * v2x + v1y * v2y;
                var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
                var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
                var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
                // Check if point is in triangle
                return (u >= 0) && (v >= 0) && (u + v < 1);
            };
            PolyK.GetLineIntersection = function (a1, a2, b1, b2, c) {
                var dax = (a1.x - a2.x), dbx = (b1.x - b2.x);
                var day = (a1.y - a2.y), dby = (b1.y - b2.y);
                var Den = dax * dby - day * dbx;
                if (Den == 0)
                    return null; // parallel
                var A = (a1.x * a2.y - a1.y * a2.x);
                var B = (b1.x * b2.y - b1.y * b2.x);
                c.x = (A * dbx - dax * B) / Den;
                c.y = (A * dby - day * B) / Den;
            };
            PolyK.GetArea = function (p) {
                if (p.length < 6)
                    return 0;
                var l = p.length - 2;
                var sum = 0;
                for (var i = 0; i < l; i += 2)
                    sum += (p[i + 2] - p[i]) * (p[i + 1] + p[i + 3]);
                sum += (p[0] - p[l]) * (p[l + 1] + p[1]);
                return -sum * 0.5;
            };
            PolyK.Reverse = function (p) {
                var np = [];
                for (var j = p.length - 2; j >= 0; j -= 2)
                    np.push(p[j], p[j + 1]);
                return np;
            };
            return PolyK;
        }());
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var display;
    (function (display) {
        var EventDispatcher = ic.events.EventDispatcher;
        var Event = ic.events.Event;
        var Transform = ic.geom.Transform;
        var Rectangle = ic.geom.Rectangle;
        var Point = ic.geom.Point;
        var Point_v4 = ic.geom.Point_v4;
        var Point_m4 = ic.geom.Point_m4;
        var DisplayObject = (function (_super) {
            __extends(DisplayObject, _super);
            //region Public functions
            function DisplayObject() {
                _super.call(this);
                this.visible = true;
                this.parent = null;
                this.stage = null;
                this.transform = new Transform();
                this.transform.obj = this;
                this.blendMode = display.BlendMode.NORMAL;
                //*
                //	for fast access
                this.x = 0;
                this.y = 0;
                this.z = 0;
                //*/
                this._trect = new Rectangle(); // temporary rectangle
                this._tempP = new Point();
                this._torg = Point_v4.create();
                this._tvec4_0 = Point_v4.create();
                this._tvec4_1 = Point_v4.create();
                this._tempm = Point_m4.create();
                this._atsEv = new Event(Event.ADDED_TO_STAGE);
                this._rfsEv = new Event(Event.REMOVED_FROM_STAGE);
                this._atsEv.target = this._rfsEv.target = this;
            }
            DisplayObject.prototype.dispatchEvent = function (e) {
                _super.prototype.dispatchEvent.call(this, e);
                if (e.bubbles && this.parent != null)
                    this.parent.dispatchEvent(e);
            };
            DisplayObject.prototype.globalToLocal = function (p) {
                var lp = new Point();
                this._globalToLocal(p, lp);
                return lp;
            };
            DisplayObject.prototype.localToGlobal = function (p) {
                var org = this._torg;
                display.Stage.main._getOrigin(org);
                var p1 = this._tvec4_1;
                p1[0] = p.x;
                p1[1] = p.y;
                p1[2] = 0;
                p1[3] = 1;
                Point_m4.multiplyVec4(this._getAbsoluteTransformMatrix(), p1, p1);
                var lp = new Point();
                this._lineIntersection(org, p1, lp);
                return lp;
            };
            // no strokes
            DisplayObject.prototype.getRect = function (tcs) {
                return this._getR(tcs, false).clone();
            };
            // with strokes
            DisplayObject.prototype.getBounds = function (tcs) {
                return this._getR(tcs, true).clone();
            };
            /**
             * Evaluates the display object to see if it overlaps or intersects with the point specified by the x and y
             * parameters. The x and y parameters specify a point in the coordinate space of the Stage, not the display
             * object container that contains the display object (unless that display object container is the Stage).
             *
             * @param x             The x coordinate to test against this object.
             * @param y             The y coordinate to test against this object.
             * @param shapeFlag     Whether to check against the actual pixels of the object (true) or the bounding box (false).
             * @returns {boolean}   true if the display object overlaps or intersects with the specified point; false otherwise.
             */
            DisplayObject.prototype.hitTestPoint = function (x, y, shapeFlag) {
                if (shapeFlag === void 0) { shapeFlag = false; }
                //if (shapeFlag == null) shapeFlag = false;
                var org = this._torg;
                display.Stage.main._getOrigin(org);
                Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), org, org);
                var p1 = this._tvec4_1;
                p1[0] = x;
                p1[1] = y;
                p1[2] = 0;
                p1[3] = 1;
                Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), p1, p1);
                //  org and p1 are in local coordinates
                //  now we have to decide, if line (p0, p1) intersects an object
                if (shapeFlag)
                    return this._htpLocal(org, p1);
                else
                    return this._getR(display.Stage.main, false).contains(x, y);
            };
            /**
             * Evaluates the bounding box of the display object to see if it overlaps or intersects with the bounding box of the obj display object.
             * @param obj The display object to test against.
             * @returns {boolean} if the bounding boxes of the display objects intersect; false if not.
             */
            DisplayObject.prototype.hitTestObject = function (obj) {
                var r0 = this._getR(display.Stage.main, false);
                var r1 = obj._getR(display.Stage.main, false);
                return r0.intersects(r1);
            };
            //endregion
            //region Protected functions
            /**
             * Intersection between line p0, p1 and plane z=0  (result has z==0)
             * @param p0
             * @param p1
             * @param tp
             * @private
             */
            DisplayObject.prototype._lineIntersection = function (p0, p1, tp) {
                var dx = p1[0] - p0[0], dy = p1[1] - p0[1], dz = p1[2] - p0[2];
                var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                dx /= len;
                dy /= len;
                dz /= len;
                var d = -p0[2] / dz;
                tp.x = p0[0] + d * dx;
                tp.y = p0[1] + d * dy;
            };
            DisplayObject.prototype._transfRect = function (mat, torg, srct, trct) {
                var sp = this._tvec4_0;
                var tp = this._tvec4_1;
                var p = new Point();
                var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
                sp[0] = srct.x;
                sp[1] = srct.y;
                sp[2] = 0;
                sp[3] = 1;
                Point_m4.multiplyVec4(mat, sp, tp);
                this._lineIntersection(torg, tp, p);
                minx = Math.min(minx, p.x);
                miny = Math.min(miny, p.y);
                maxx = Math.max(maxx, p.x);
                maxy = Math.max(maxy, p.y);
                sp[0] = srct.x + srct.width;
                sp[1] = srct.y;
                sp[2] = 0;
                sp[3] = 1;
                Point_m4.multiplyVec4(mat, sp, tp);
                this._lineIntersection(torg, tp, p);
                minx = Math.min(minx, p.x);
                miny = Math.min(miny, p.y);
                maxx = Math.max(maxx, p.x);
                maxy = Math.max(maxy, p.y);
                sp[0] = srct.x;
                sp[1] = srct.y + srct.height;
                sp[2] = 0;
                sp[3] = 1;
                Point_m4.multiplyVec4(mat, sp, tp);
                this._lineIntersection(torg, tp, p);
                minx = Math.min(minx, p.x);
                miny = Math.min(miny, p.y);
                maxx = Math.max(maxx, p.x);
                maxy = Math.max(maxy, p.y);
                sp[0] = srct.x + srct.width;
                sp[1] = srct.y + srct.height;
                sp[2] = 0;
                sp[3] = 1;
                Point_m4.multiplyVec4(mat, sp, tp);
                this._lineIntersection(torg, tp, p);
                minx = Math.min(minx, p.x);
                miny = Math.min(miny, p.y);
                maxx = Math.max(maxx, p.x);
                maxy = Math.max(maxy, p.y);
                trct.x = minx;
                trct.y = miny;
                trct.width = maxx - minx;
                trct.height = maxy - miny;
            };
            DisplayObject.prototype._getLocRect = function () {
                // TODO: not sure about this
                return this._trect;
            };
            /**
             * Returns bounding rectangle
             * @param tmat matrix from global to target local
             * @param torg origin in tmat coordinates
             * @param stks
             * @returns {Rectangle}
             * @private
             * result: read-only
             */
            DisplayObject.prototype._getRect = function (tmat, torg, stks) {
                Point_m4.multiply(tmat, this._getAbsoluteTransformMatrix(), this._tempm);
                this._transfRect(this._tempm, torg, this._getLocRect(), this._trect);
                return this._trect;
            };
            /**
             * Check, whether object hits a line org, p in local coordinate system
             * @param org
             * @param p
             * @returns {boolean}
             * @private
             */
            DisplayObject.prototype._htpLocal = function (org, p) {
                var tp = this._tempP;
                this._lineIntersection(org, p, tp);
                return this._getLocRect().contains(tp.x, tp.y);
            };
            /**
             * Returns the deepest InteractiveObject of subtree with mouseEnabled = true  OR itself, if "hit over" and mouseEnabled = false
             * @param porg
             * @param pp
             * @returns {null}
             * @private
             */
            DisplayObject.prototype._getTarget = function (porg, pp) {
                return null;
            };
            /**
             * This method renders the current content
             */
            DisplayObject.prototype._render = function (stage) {
            };
            /**
             * This method renders the whole object
             */
            DisplayObject.prototype._renderAll = function (stage) {
                if (!this.visible)
                    return;
                this._preRender(stage);
                this._render(stage);
                stage._mstack.pop();
                stage._cmstack.pop();
            };
            /**
             * Absolute Transform matrix
             * @returns {any}
             * @private
             */
            DisplayObject.prototype._getAbsoluteTransformMatrix = function () {
                if (this.parent == null)
                    return this.transform.getTMat();
                Point_m4.multiply(this.parent._getAbsoluteTransformMatrix(), this.transform.getTMat(), this.transform._atmat);
                return this.transform._atmat;
            };
            DisplayObject.prototype.setStage = function (stage) {
                var previousStage = this.stage;
                this.stage = stage;
                if (previousStage == null && stage != null)
                    this.dispatchEvent(this._atsEv);
                if (previousStage != null && stage == null)
                    this.dispatchEvent(this._rfsEv);
            };
            DisplayObject.prototype._loseFocus = function () {
            };
            //endregion
            //region Private functions
            DisplayObject.prototype._globalToLocal = function (sp, tp) {
                var org = this._torg;
                display.Stage.main._getOrigin(org);
                Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), org, org);
                var p1 = this._tvec4_1;
                p1[0] = sp.x;
                p1[1] = sp.y;
                p1[2] = 0;
                p1[3] = 1;
                Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), p1, p1);
                this._lineIntersection(org, p1, tp);
            };
            /**
             * Absolute Inverse Transform matrix
             * @returns {any}
             * @private
             */
            DisplayObject.prototype._getAbsoluteInverseMatrix = function () {
                if (this.parent == null)
                    return this.transform._getIMat();
                Point_m4.multiply(this.transform._getIMat(), this.parent._getAbsoluteInverseMatrix(), this.transform._aimat);
                return this.transform._aimat;
            };
            DisplayObject.prototype._getMouse = function () {
                var lp = this._tempP;
                lp.setTo(display.Stage._mouseX, display.Stage._mouseY);
                this._globalToLocal(lp, lp);
                return lp;
            };
            DisplayObject.prototype._getR = function (tcs, stks) {
                display.Stage.main._getOrigin(this._torg);
                Point_m4.multiplyVec4(tcs._getAbsoluteInverseMatrix(), this._torg, this._torg);
                return this._getRect(tcs._getAbsoluteInverseMatrix(), this._torg, stks);
            };
            DisplayObject.prototype._getParR = function (tcs, stks) {
                if (DisplayObject._tdo == null)
                    DisplayObject._tdo = new DisplayObject();
                var nopar = this.parent == null;
                if (nopar)
                    this.parent = DisplayObject._tdo;
                var out = this._getR(this.parent, stks);
                if (nopar)
                    this.parent = null;
                return out;
            };
            /**
             * Adds a drawing matrix onto the OpenGL stack
             */
            DisplayObject.prototype._preRender = function (stage) {
                var matrix = this.transform.getTMat();
                stage._mstack.push(matrix);
                stage._cmstack.push(this.transform._cmat, this.transform._cvec, this.transform._cID, this.blendMode);
            };
            Object.defineProperty(DisplayObject.prototype, "scaleX", {
                get: function () {
                    this.transform._checkVals();
                    return this.transform._scaleX;
                },
                //endregion
                //region Getters Setters functions
                set: function (sx) {
                    this.transform._checkVals();
                    this.transform._scaleX = sx;
                    this.transform._mdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "scaleY", {
                get: function () {
                    this.transform._checkVals();
                    return this.transform._scaleY;
                },
                set: function (sy) {
                    this.transform._checkVals();
                    this.transform._scaleY = sy;
                    this.transform._mdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "scaleZ", {
                get: function () {
                    this.transform._checkVals();
                    return this.transform._scaleZ;
                },
                set: function (sz) {
                    this.transform._checkVals();
                    this.transform._scaleZ = sz;
                    this.transform._mdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotationX", {
                get: function () {
                    this.transform._checkVals();
                    return this.transform._rotationX;
                },
                set: function (r) {
                    this.transform._checkVals();
                    this.transform._rotationX = r;
                    this.transform._mdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotationY", {
                get: function () {
                    this.transform._checkVals();
                    return this.transform._rotationY;
                },
                set: function (r) {
                    this.transform._checkVals();
                    this.transform._rotationY = r;
                    this.transform._mdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotationZ", {
                get: function () {
                    this.transform._checkVals();
                    return this.transform._rotationZ;
                },
                set: function (r) {
                    this.transform._checkVals();
                    this.transform._rotationZ = r;
                    this.transform._mdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotation", {
                get: function () {
                    this.transform._checkVals();
                    return this.transform._rotationZ;
                },
                set: function (r) {
                    this.transform._checkVals();
                    this.transform._rotationZ = r;
                    this.transform._mdirty = true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "width", {
                get: function () {
                    this.transform._checkVals();
                    return this._getParR(this, true).width;
                },
                set: function (w) {
                    var ow = this.width;
                    this.transform._postScale(w / ow, 1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "height", {
                get: function () {
                    this.transform._checkVals();
                    return this._getParR(this, true).height;
                },
                set: function (h) {
                    var oh = this.height;
                    this.transform._postScale(1, h / oh);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "alpha", {
                get: function () {
                    return this.transform._cmat[15];
                },
                set: function (value) {
                    this.transform._cmat[15] = value;
                    this.transform._checkColorID();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "mouseX", {
                get: function () {
                    return this._getMouse().x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "mouseY", {
                get: function () {
                    return this._getMouse().y;
                },
                enumerable: true,
                configurable: true
            });
            return DisplayObject;
        }(EventDispatcher));
        display.DisplayObject = DisplayObject;
        display.BlendMode = {
            NORMAL: "normal",
            ADD: "add",
            SUBTRACT: "subtract",
            MULTIPLY: "multiply",
            SCREEN: "screen",
            ERASE: "erase",
            ALPHA: "alpha"
        };
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
///<reference path="DisplayObject.ts"/>
///<reference path="../geom/Point.ts"/>
var ic;
(function (ic) {
    var display;
    (function (display) {
        var Point_m4 = ic.geom.Point_m4;
        var InteractiveObject = (function (_super) {
            __extends(InteractiveObject, _super);
            function InteractiveObject() {
                _super.call(this);
                this.buttonMode = false;
                this.mouseEnabled = true;
                this.mouseChildren = true;
            }
            InteractiveObject.prototype._getTarget = function (porg, pp) {
                if (!this.visible || !this.mouseEnabled)
                    return null;
                var r = this._getLocRect();
                if (r == null)
                    return null;
                var org = this._tvec4_0, p = this._tvec4_1;
                Point_m4.multiplyVec4(this.transform._getIMat(), porg, org);
                Point_m4.multiplyVec4(this.transform._getIMat(), pp, p);
                var pt = this._tempP;
                this._lineIntersection(org, p, pt);
                if (r.contains(pt.x, pt.y))
                    return this;
                return null;
            };
            return InteractiveObject;
        }(display.DisplayObject));
        display.InteractiveObject = InteractiveObject;
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var display;
    (function (display) {
        var Rectangle = ic.geom.Rectangle;
        var Point_m4 = ic.geom.Point_m4;
        var DisplayObjectContainer = (function (_super) {
            __extends(DisplayObjectContainer, _super);
            function DisplayObjectContainer() {
                _super.call(this);
                this._tempR = new Rectangle();
                this.numChildren = 0;
                this._children = [];
            }
            DisplayObjectContainer.prototype._getRect = function (tmat, torg, stks) {
                var r = this._trect;
                r.setEmpty();
                for (var i = 0; i < this.numChildren; i++) {
                    var ch = this._children[i];
                    if (!ch.visible)
                        continue;
                    r.unionWith(ch._getRect(tmat, torg, stks));
                }
                return r;
            };
            DisplayObjectContainer.prototype._htpLocal = function (org, p) {
                var n = this._children.length;
                for (var i = 0; i < n; i++) {
                    var ch = this._children[i];
                    if (!ch.visible)
                        continue;
                    var corg = ch._tvec4_0, cp = ch._tvec4_1, im = ch.transform._getIMat();
                    Point_m4.multiplyVec4(im, org, corg);
                    Point_m4.multiplyVec4(im, p, cp);
                    return ch._htpLocal(corg, cp);
                }
                return false;
            };
            /**
             * Adds a child to the container
             *
             * @param child - child object to be added
             */
            DisplayObjectContainer.prototype.addChild = function (child) {
                this._children.push(child);
                child.parent = this;
                child.setStage(this.stage);
                ++this.numChildren;
            };
            /**
             * Removes a child from the container
             *
             * @param child    a child object to be removed
             */
            DisplayObjectContainer.prototype.removeChild = function (child) {
                var ind = this._children.indexOf(child);
                if (ind < 0)
                    return;
                this._children.splice(ind, 1);
                child.parent = null;
                child.setStage(null);
                --this.numChildren;
            };
            DisplayObjectContainer.prototype.removeChildAt = function (i) {
                this.removeChild(this._children[i]);
            };
            /**
             * Checks, if a container contains a certain child
             *
             * @param o    an object for which we check, if it is contained or not
             * @return    true if contains, false if not
             */
            DisplayObjectContainer.prototype.contains = function (o) {
                return (this._children.indexOf(o) >= 0);
            };
            DisplayObjectContainer.prototype.getChildIndex = function (o) {
                return this._children.indexOf(o);
            };
            /**
             * Sets the child index in the current children list.
             * Child index represents a "depth" - an order, in which children are rendered
             *
             * @param c1    a child object
             * @param i2    a new depth value
             */
            DisplayObjectContainer.prototype.setChildIndex = function (c1, i2) {
                var i1 = this._children.indexOf(c1);
                if (i2 > i1) {
                    for (var i = i1 + 1; i <= i2; i++)
                        this._children[i - 1] = this._children[i];
                    this._children[i2] = c1;
                }
                else if (i2 < i1) {
                    for (var i = i1 - 1; i >= i2; i--)
                        this._children[i + 1] = this._children[i];
                    this._children[i2] = c1;
                }
            };
            /**
             * Returns the child display object instance that exists at the specified index.
             *
             * @param i    index (depth)
             * @return    an object at this index
             */
            DisplayObjectContainer.prototype.getChildAt = function (i) {
                return this._children[i];
            };
            DisplayObjectContainer.prototype._render = function (stage) {
                for (var i = 0; i < this.numChildren; i++)
                    this._children[i]._renderAll(stage);
            };
            DisplayObjectContainer.prototype._getTarget = function (parentOrigin, parentPoint) {
                if (!this.visible || (!this.mouseChildren && !this.mouseEnabled))
                    return null;
                var org = this._tvec4_0, p = this._tvec4_1, im = this.transform._getIMat();
                Point_m4.multiplyVec4(im, parentOrigin, org);
                Point_m4.multiplyVec4(im, parentPoint, p);
                var topTGT = null;
                var n = this.numChildren - 1;
                for (var i = n; i > -1; i--) {
                    var ntg = this._children[i]._getTarget(org, p);
                    if (ntg != null) {
                        topTGT = ntg;
                        break;
                    }
                }
                if (!this.mouseChildren && topTGT != null)
                    return this;
                return topTGT;
            };
            DisplayObjectContainer.prototype.setStage = function (stage) {
                _super.prototype.setStage.call(this, stage);
                for (var i = 0; i < this.numChildren; i++)
                    this._children[i].setStage(stage);
            };
            return DisplayObjectContainer;
        }(display.InteractiveObject));
        display.DisplayObjectContainer = DisplayObjectContainer;
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
///<reference path="DisplayObjectContainer.ts"/>
///<reference path="../geom/Point.ts"/>
var ic;
(function (ic) {
    var display;
    (function (display) {
        var EventDispatcher = ic.events.EventDispatcher;
        var Point_v4 = ic.geom.Point_v4;
        var Point_m4 = ic.geom.Point_m4;
        var Event = ic.events.Event;
        var MouseEvent = ic.events.MouseEvent;
        var TouchEvent = ic.events.TouchEvent;
        var KeyboardEvent = ic.events.KeyboardEvent;
        var Stage = (function (_super) {
            __extends(Stage, _super);
            function Stage(canvasId) {
                _super.call(this);
                document.body.setAttribute("style", "margin:0; overflow:hidden");
                //<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                var meta = document.createElement('meta');
                meta.setAttribute("name", "viewport");
                meta.setAttribute("content", "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0");
                document.getElementsByTagName('head')[0].appendChild(meta);
                this.stage = this;
                this.stageWidth = 0;
                this.stageHeight = 0;
                this.focus = null; // keyboard focus, never Stage
                this._focii = [null, null, null];
                this._mousefocus = null; // mouse focus of last mouse move, used to detect MOUSE_OVER / OUT, never Stage
                this._knM = false; // know mouse
                this._mstack = new _MStack(); // transform matrix stack
                this._cmstack = new _CMStack(); // color matrix stack
                this._sprg = null;
                this._svec4_0 = Point_v4.create();
                this._svec4_1 = Point_v4.create();
                this._pmat = Point_m4.create([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 1,
                    0, 0, 0, 1
                ]); // project matrix
                this._umat = Point_m4.create([
                    2, 0, 0, 0,
                    0, -2, 0, 0,
                    0, 0, 2, 0,
                    -1, 1, 0, 1
                ]); // unit matrix
                this._smat = Point_m4.create([
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0.001, 0,
                    0, 0, 0, 1
                ]); // scale matrix
                //this._efEv = new Event(Event.ENTER_FRAME);
                //this._rsEv = new Event(Event.RESIZE);
                this._mcEvs = [new MouseEvent(MouseEvent.CLICK, true),
                    new MouseEvent(MouseEvent.MIDDLE_CLICK, true),
                    new MouseEvent(MouseEvent.RIGHT_CLICK, true)];
                this._mdEvs = [new MouseEvent(MouseEvent.MOUSE_DOWN, true),
                    new MouseEvent(MouseEvent.MIDDLE_MOUSE_DOWN, true),
                    new MouseEvent(MouseEvent.RIGHT_MOUSE_DOWN, true)];
                this._muEvs = [new MouseEvent(MouseEvent.MOUSE_UP, true),
                    new MouseEvent(MouseEvent.MIDDLE_MOUSE_UP, true),
                    new MouseEvent(MouseEvent.RIGHT_MOUSE_UP, true)];
                this._smd = [false, false, false]; // stage mouse down, for each mouse button
                this._smu = [false, false, false]; // stage mouse up, for each mouse button
                this._smm = false; // stage mouse move
                this._srs = false; // stage resized
                this._touches = {};
                //this._touches = [];
                //for(var i=0; i<30; i++) this._touches.push({touch:null, target:null, act:0});	// down: 0 - nothing, 1 - is down, 2 - was moved, 3 - is up
                this._canvas = this.canvas = document.getElementById(canvasId);
                //this.canvas.setAttribute("style", "user-select: none;");
                Stage.main = this;
                var par = { alpha: true, antialias: true, depth: true, premultipliedAlpha: true };
                var c = this.canvas;
                display.gl = c.getContext("webgl", par);
                if (!display.gl)
                    display.gl = c.getContext("experimental-webgl", par);
                if (!display.gl)
                    alert("Could not initialize WebGL. Try to update your browser or graphic drivers.");
                display.gl.pixelStorei(display.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                //if(WebGLDebugUtils) WebGLDebugUtils.makeDebugContext(gl);
                //c.style["-webkit-user-select"] = "none";
                var d = document;
                d.addEventListener("contextmenu", Stage._ctxt, false);
                d.addEventListener("dragstart", Stage._blck, false);
                //if(Stage._isTD())
                {
                    c.addEventListener("touchstart", Stage._onTD, false);
                    c.addEventListener("touchmove", Stage._onTM, false);
                    c.addEventListener("touchend", Stage._onTU, false);
                    d.addEventListener("touchstart", Stage._blck, false);
                    c.addEventListener("touchmove", Stage._blck, false);
                    c.addEventListener("touchend", Stage._blck, false);
                }
                //else
                {
                    c.addEventListener("mousedown", Stage._onMD, false);
                    c.addEventListener("mousemove", Stage._onMM, false);
                    c.addEventListener("mouseup", Stage._onMU, false);
                    //c.addEventListener("mousedown",		Stage._blck, false);	// prevents IFRAME from getting focus = receiving keyboard events
                    c.addEventListener("mousemove", Stage._blck, false);
                    c.addEventListener("mouseup", Stage._blck, false);
                }
                //c.onselect=function(){alert("onselect");}
                d.addEventListener("keydown", Stage._onKD, false);
                d.addEventListener("keyup", Stage._onKU, false);
                d.addEventListener("keydown", Stage._blck, false);
                d.addEventListener("keyup", Stage._blck, false);
                window.addEventListener("resize", Stage._onRS, false);
                this._initShaders();
                this._initBuffers();
                display.gl.clearColor(0, 0, 0, 0);
                display.gl.enable(display.gl.BLEND);
                display.gl.blendEquation(display.gl.FUNC_ADD);
                display.gl.blendFunc(display.gl.ONE, display.gl.ONE_MINUS_SRC_ALPHA);
                display.gl.enable(display.gl.DEPTH_TEST);
                display.gl.depthFunc(display.gl.LEQUAL);
                this._resize();
                this._srs = true;
                requestAnimFrame(Stage._tick);
            }
            Stage.prototype._getOrigin = function (org) {
                org[0] = this.stageWidth / 2;
                org[1] = this.stageHeight / 2;
                org[2] = -500;
                org[3] = 1;
            };
            Stage.setBuffer = function (buffer) {
                if (Stage._curBF != buffer) {
                    display.gl.bindBuffer(display.gl.ARRAY_BUFFER, buffer);
                    Stage._curBF = buffer;
                }
            };
            Stage.setEBF = function (ebf) {
                if (Stage._curEBF != ebf) {
                    display.gl.bindBuffer(display.gl.ELEMENT_ARRAY_BUFFER, ebf);
                    Stage._curEBF = ebf;
                }
            };
            Stage.setVC = function (vc) {
                if (Stage._curVC != vc) {
                    display.gl.bindBuffer(display.gl.ARRAY_BUFFER, vc);
                    display.gl.vertexAttribPointer(Stage.main._sprg.vpa, 3, display.gl.FLOAT, false, 0, 0);
                    Stage._curVC = Stage._curBF = vc;
                }
            };
            Stage.setTC = function (tc) {
                if (Stage._curTC != tc) {
                    display.gl.bindBuffer(display.gl.ARRAY_BUFFER, tc);
                    display.gl.vertexAttribPointer(Stage.main._sprg.tca, 2, display.gl.FLOAT, false, 0, 0);
                    Stage._curTC = Stage._curBF = tc;
                }
            };
            Stage.setUT = function (ut) {
                if (Stage._curUT != ut) {
                    display.gl.uniform1i(Stage.main._sprg.useTex, ut);
                    Stage._curUT = ut;
                }
            };
            Stage.setTEX = function (tex) {
                if (Stage._curTEX != tex) {
                    display.gl.bindTexture(display.gl.TEXTURE_2D, tex);
                    Stage._curTEX = tex;
                }
            };
            Stage.setBMD = function (bmd) {
                if (Stage._curBMD != bmd) {
                    if (bmd == display.BlendMode.NORMAL) {
                        display.gl.blendEquation(display.gl.FUNC_ADD);
                        display.gl.blendFunc(display.gl.ONE, display.gl.ONE_MINUS_SRC_ALPHA);
                    }
                    else if (bmd == display.BlendMode.MULTIPLY) {
                        display.gl.blendEquation(display.gl.FUNC_ADD);
                        display.gl.blendFunc(display.gl.DST_COLOR, display.gl.ONE_MINUS_SRC_ALPHA);
                    }
                    else if (bmd == display.BlendMode.ADD) {
                        display.gl.blendEquation(display.gl.FUNC_ADD);
                        display.gl.blendFunc(display.gl.ONE, display.gl.ONE);
                    }
                    else if (bmd == display.BlendMode.SUBTRACT) {
                        display.gl.blendEquationSeparate(display.gl.FUNC_REVERSE_SUBTRACT, display.gl.FUNC_ADD);
                        display.gl.blendFunc(display.gl.ONE, display.gl.ONE);
                    }
                    else if (bmd == display.BlendMode.SCREEN) {
                        display.gl.blendEquation(display.gl.FUNC_ADD);
                        display.gl.blendFunc(display.gl.ONE, display.gl.ONE_MINUS_SRC_COLOR);
                    }
                    else if (bmd == display.BlendMode.ERASE) {
                        display.gl.blendEquation(display.gl.FUNC_ADD);
                        display.gl.blendFunc(display.gl.ZERO, display.gl.ONE_MINUS_SRC_ALPHA);
                    }
                    else if (bmd == display.BlendMode.ALPHA) {
                        display.gl.blendEquation(display.gl.FUNC_ADD);
                        display.gl.blendFunc(display.gl.ZERO, display.gl.SRC_ALPHA);
                    }
                    Stage._curBMD = bmd;
                }
            };
            /**
             * Is Touchscreen Device
             * @returns {boolean}
             */
            Stage._isTD = function () {
                return !!('ontouchstart' in window);
            };
            Stage._ctxt = function (e) {
                if (Stage.main.hasEventListener(MouseEvent.RIGHT_CLICK))
                    e.preventDefault();
            };
            Stage.prototype._getMakeTouch = function (id) {
                var t = this._touches["t" + id];
                if (t == null) {
                    t = { touch: null, target: null, act: 0 };
                    this._touches["t" + id] = t;
                }
                return t;
            };
            Stage._onTD = function (e) {
                Stage._setStageMouse(e.touches.item(0));
                Stage.main._smd[0] = true;
                Stage.main._knM = true;
                var main = Stage.main;
                for (var i = 0; i < e.changedTouches.length; i++) {
                    var tdom = e.changedTouches.item(i);
                    var t = main._getMakeTouch(tdom.identifier);
                    t.touch = tdom;
                    t.act = 1;
                }
                main._processMouseTouch();
            };
            Stage._onTM = function (e) {
                Stage._setStageMouse(e.touches.item(0));
                Stage.main._smm = true;
                Stage.main._knM = true;
                var main = Stage.main;
                for (var i = 0; i < e.changedTouches.length; i++) {
                    var tdom = e.changedTouches.item(i);
                    var t = main._getMakeTouch(tdom.identifier);
                    t.touch = tdom;
                    t.act = 2;
                }
                main._processMouseTouch();
            };
            Stage._onTU = function (e) {
                Stage.main._smu[0] = true;
                Stage.main._knM = true;
                var main = Stage.main;
                for (var i = 0; i < e.changedTouches.length; i++) {
                    var tdom = e.changedTouches.item(i);
                    var t = main._getMakeTouch(tdom.identifier);
                    t.touch = tdom;
                    t.act = 3;
                }
                main._processMouseTouch();
            };
            Stage._onMD = function (e) {
                Stage._setStageMouse(e);
                Stage.main._smd[e.button] = true;
                Stage.main._knM = true;
                Stage.main._processMouseTouch();
            };
            Stage._onMM = function (e) {
                Stage._setStageMouse(e);
                Stage.main._smm = true;
                Stage.main._knM = true;
                Stage.main._processMouseTouch();
            };
            Stage._onMU = function (e) {
                Stage.main._smu[e.button] = true;
                Stage.main._knM = true;
                Stage.main._processMouseTouch();
            };
            Stage._onKD = function (e) {
                var st = Stage.main;
                var ev = new KeyboardEvent(KeyboardEvent.KEY_DOWN, true);
                ev._setFromDom(e);
                if (st.focus && st.focus.stage)
                    st.focus.dispatchEvent(ev);
                else
                    st.dispatchEvent(ev);
            };
            Stage._onKU = function (e) {
                var st = Stage.main;
                var ev = new KeyboardEvent(KeyboardEvent.KEY_UP, true);
                ev._setFromDom(e);
                if (st.focus && st.focus.stage)
                    st.focus.dispatchEvent(ev);
                else
                    st.dispatchEvent(ev);
            };
            Stage._blck = function (e) {
                if (e.keyCode != null) {
                    if (e.target.tagName.toLowerCase() == "textarea") {
                    }
                    else if (Stage._okKeys.indexOf(e.keyCode) == -1)
                        e.preventDefault();
                }
                else
                    e.preventDefault();
            };
            Stage._onRS = function (e) {
                Stage.main._srs = true;
            };
            Stage._getDPR = function () {
                return window.devicePixelRatio || 1;
            };
            Stage.prototype._resize = function () {
                var dpr = Stage._getDPR();
                var w = window.innerWidth * dpr;
                var h = window.innerHeight * dpr;
                this._canvas.style.width = window.innerWidth + "px";
                this._canvas.style.height = window.innerHeight + "px";
                this.stageWidth = w;
                this.stageHeight = h;
                this._canvas.width = w;
                this._canvas.height = h;
                this._setFramebuffer(null, w, h, false);
            };
            Stage.prototype._getShader = function (gl, str, fs) {
                var shader;
                if (fs)
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                else
                    shader = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(shader, str);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert(gl.getShaderInfoLog(shader));
                    return null;
                }
                return shader;
            };
            Stage.prototype._initShaders = function () {
                var fs = "\
			precision mediump float;\
			varying vec2 texCoord;\
			\
			uniform sampler2D uSampler;\
			uniform vec4 color;\
			uniform bool useTex;\
			\
			uniform mat4 cMat;\
			uniform vec4 cVec;\
			\
			void main(void) {\
				vec4 c;\
				if(useTex) { c = texture2D(uSampler, texCoord);  c.xyz *= (1.0/c.w); }\
				else c = color;\
				c = (cMat*c)+cVec;\n\
				c.xyz *= min(c.w, 1.0);\n\
				gl_FragColor = c;\
			}";
                var vs = "\
			attribute vec3 verPos;\
			attribute vec2 texPos;\
			\
			uniform mat4 tMat;\
			\
			varying vec2 texCoord;\
			\
			void main(void) {\
				gl_Position = tMat * vec4(verPos, 1.0);\
				texCoord = texPos;\
			}";
                var fShader = this._getShader(display.gl, fs, true);
                var vShader = this._getShader(display.gl, vs, false);
                this._sprg = display.gl.createProgram();
                display.gl.attachShader(this._sprg, vShader);
                display.gl.attachShader(this._sprg, fShader);
                display.gl.linkProgram(this._sprg);
                if (!display.gl.getProgramParameter(this._sprg, display.gl.LINK_STATUS)) {
                    alert("Could not initialise shaders");
                }
                display.gl.useProgram(this._sprg);
                this._sprg.vpa = display.gl.getAttribLocation(this._sprg, "verPos");
                this._sprg.tca = display.gl.getAttribLocation(this._sprg, "texPos");
                display.gl.enableVertexAttribArray(this._sprg.tca);
                display.gl.enableVertexAttribArray(this._sprg.vpa);
                this._sprg.tMatUniform = display.gl.getUniformLocation(this._sprg, "tMat");
                this._sprg.cMatUniform = display.gl.getUniformLocation(this._sprg, "cMat");
                this._sprg.cVecUniform = display.gl.getUniformLocation(this._sprg, "cVec");
                this._sprg.samplerUniform = display.gl.getUniformLocation(this._sprg, "uSampler");
                this._sprg.useTex = display.gl.getUniformLocation(this._sprg, "useTex");
                this._sprg.color = display.gl.getUniformLocation(this._sprg, "color");
            };
            Stage.prototype._initBuffers = function () {
                this._unitIBuffer = display.gl.createBuffer();
                Stage.setEBF(this._unitIBuffer);
                display.gl.bufferData(display.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 2, 3]), display.gl.STATIC_DRAW);
            };
            Stage.prototype._setFramebuffer = function (fbo, w, h, flip) {
                this._mstack.clear();
                this._mstack.push(this._pmat, 0);
                if (flip) {
                    this._umat[5] = 2;
                    this._umat[13] = -1;
                }
                else {
                    this._umat[5] = -2;
                    this._umat[13] = 1;
                }
                this._mstack.push(this._umat);
                this._smat[0] = 1 / w;
                this._smat[5] = 1 / h;
                this._mstack.push(this._smat);
                display.gl.bindFramebuffer(display.gl.FRAMEBUFFER, fbo);
                if (fbo)
                    display.gl.renderbufferStorage(display.gl.RENDERBUFFER, display.gl.DEPTH_COMPONENT16, w, h);
                display.gl.viewport(0, 0, w, h);
            };
            Stage._setStageMouse = function (t) {
                var dpr = Stage._getDPR();
                Stage._mouseX = t.clientX * dpr;
                Stage._mouseY = t.clientY * dpr;
                //console.log(Stage._mouseX, Stage._mouseY);
            };
            Stage.prototype._drawScene = function () {
                if (this._srs) {
                    this._resize();
                    this.dispatchEvent(new Event(Event.RESIZE));
                    this._srs = false;
                }
                display.gl.clear(display.gl.COLOR_BUFFER_BIT | display.gl.DEPTH_BUFFER_BIT);
                //this._processMouseTouch();
                //	proceeding EnterFrame
                var efs = EventDispatcher.efbc;
                var ev = new Event(Event.ENTER_FRAME, false);
                for (var i = 0; i < efs.length; i++) {
                    ev.target = efs[i];
                    efs[i].dispatchEvent(ev);
                }
                this._renderAll(this);
            };
            Stage.prototype._processMouseTouch = function () {
                if (this._knM) {
                    var org = this._svec4_0;
                    this._getOrigin(org);
                    var p = this._svec4_1;
                    p[0] = Stage._mouseX;
                    p[1] = Stage._mouseY;
                    p[2] = 0;
                    p[3] = 1;
                    //	proceeding Mouse Events
                    var newf = this._getTarget(org, p);
                    var fa = this._mousefocus || this;
                    var fb = newf || this;
                    if (newf != this._mousefocus) {
                        if (fa != this) {
                            var mouseEvent = new MouseEvent(MouseEvent.MOUSE_OUT, true);
                            mouseEvent.target = fa;
                            fa.dispatchEvent(mouseEvent);
                        }
                        if (fb != this) {
                            var mouseEvent = new MouseEvent(MouseEvent.MOUSE_OVER, true);
                            mouseEvent.target = fb;
                            fb.dispatchEvent(mouseEvent);
                        }
                    }
                    if (this._smd[0] && this.focus && newf != this.focus)
                        this.focus._loseFocus();
                    for (var i = 0; i < 3; i++) {
                        this._mcEvs[i].target = this._mdEvs[i].target = this._muEvs[i].target = fb;
                        if (this._smd[i]) {
                            fb.dispatchEvent(this._mdEvs[i]);
                            this._focii[i] = this.focus = newf;
                        }
                        if (this._smu[i]) {
                            fb.dispatchEvent(this._muEvs[i]);
                            if (newf == this._focii[i])
                                fb.dispatchEvent(this._mcEvs[i]);
                        }
                        this._smd[i] = this._smu[i] = false;
                    }
                    if (this._smm) {
                        var mouseEvent = new MouseEvent(MouseEvent.MOUSE_MOVE, true);
                        mouseEvent.target = fb;
                        fb.dispatchEvent(mouseEvent);
                        this._smm = false;
                    }
                    this._mousefocus = newf;
                    //	checking buttonMode
                    var uh = false, ob = fb;
                    while (ob.parent != null) {
                        uh |= ob.buttonMode;
                        ob = ob.parent;
                    }
                    var cursor = uh ? "pointer" : "default";
                    if (fb instanceof ic.text.TextField && fb.selectable)
                        cursor = "text";
                    this._canvas.style.cursor = cursor;
                }
                var dpr = Stage._getDPR();
                //for(var i=0; i<this._touches.length; i++)
                for (var tind in this._touches) {
                    var t = this._touches[tind];
                    if (t.act == 0)
                        continue;
                    var org = this._svec4_0;
                    this._getOrigin(org);
                    var p = this._svec4_1;
                    p[0] = t.touch.clientX * dpr;
                    p[1] = t.touch.clientY * dpr;
                    p[2] = 0;
                    p[3] = 1;
                    var newf = this._getTarget(org, p);
                    var fa = t.target || this;
                    var fb = newf || this;
                    if (newf != t.target) {
                        if (fa != this) {
                            var ev = new TouchEvent(TouchEvent.TOUCH_OUT, true);
                            ev._setFromDom(t.touch);
                            ev.target = fa;
                            fa.dispatchEvent(ev);
                        }
                        if (fb != this) {
                            var ev = new TouchEvent(TouchEvent.TOUCH_OVER, true);
                            ev._setFromDom(t.touch);
                            ev.target = fb;
                            fb.dispatchEvent(ev);
                        }
                    }
                    var ev;
                    if (t.act == 1)
                        ev = new TouchEvent(TouchEvent.TOUCH_BEGIN, true);
                    if (t.act == 2)
                        ev = new TouchEvent(TouchEvent.TOUCH_MOVE, true);
                    if (t.act == 3)
                        ev = new TouchEvent(TouchEvent.TOUCH_END, true);
                    ev._setFromDom(t.touch);
                    ev.target = fb;
                    fb.dispatchEvent(ev);
                    if (t.act == 3 && newf == t.target) {
                        ev = new TouchEvent(TouchEvent.TOUCH_TAP, true);
                        ev._setFromDom(t.touch);
                        ev.target = fb;
                        fb.dispatchEvent(ev);
                    }
                    t.act = 0;
                    t.target = (t.act == 3) ? null : newf;
                }
            };
            Stage._tick = function () {
                requestAnimFrame(Stage._tick);
                Stage.prototype._drawScene.call(Stage.main);
            };
            Stage._mouseX = 0;
            Stage._mouseY = 0;
            Stage._curBF = -1;
            Stage._curEBF = -1;
            Stage._curVC = -1;
            Stage._curTC = -1;
            Stage._curUT = -1;
            Stage._curTEX = -1;
            Stage._curBMD = "normal";
            Stage._okKeys = [
                112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
                13,
                16,
                //17,	// Ctrl
                18,
                27 // Esc
            ];
            return Stage;
        }(display.DisplayObjectContainer));
        display.Stage = Stage;
        var _MStack = (function () {
            function _MStack() {
                this.mats = [];
                this.size = 1;
                for (var i = 0; i < 30; i++)
                    this.mats.push(Point_m4.create());
            }
            _MStack.prototype.clear = function () {
                this.size = 1;
            };
            _MStack.prototype.push = function (m) {
                var s = this.size++;
                Point_m4.multiply(this.mats[s - 1], m, this.mats[s]);
            };
            _MStack.prototype.pop = function () {
                this.size--;
            };
            _MStack.prototype.top = function () {
                return (this.mats[this.size - 1]);
            };
            return _MStack;
        }());
        /**
         * Color matrix stack
         */
        var _CMStack = (function () {
            function _CMStack() {
                this.mats = []; //	linear transform matrix
                this.vecs = []; //  affine shift column
                this.isID = []; //	is Identity
                this.bmds = []; //	blend modes
                this.lnnm = []; //	last not NORMAL blend mode
                this.size = 1;
                this.dirty = true; // if top matrix is different than shader value
                for (var i = 0; i < 30; i++) {
                    this.mats.push(Point_m4.create());
                    this.vecs.push(new Float32Array(4));
                    this.isID.push(true);
                    this.bmds.push(display.BlendMode.NORMAL);
                    this.lnnm.push(0);
                }
            }
            _CMStack.prototype.push = function (m, v, id, bmd) {
                var s = this.size++;
                this.isID[s] = id;
                if (id) {
                    Point_m4.set(this.mats[s - 1], this.mats[s]);
                    Point_v4.set(this.vecs[s - 1], this.vecs[s]);
                }
                else {
                    Point_m4.multiply(this.mats[s - 1], m, this.mats[s]);
                    Point_m4.multiplyVec4(this.mats[s - 1], v, this.vecs[s]);
                    Point_v4.add(this.vecs[s - 1], this.vecs[s], this.vecs[s]);
                }
                if (!id)
                    this.dirty = true;
                this.bmds[s] = bmd;
                this.lnnm[s] = (bmd == display.BlendMode.NORMAL) ? this.lnnm[s - 1] : s;
            };
            _CMStack.prototype.update = function () {
                if (this.dirty) {
                    var st = Stage.main, s = this.size - 1;
                    display.gl.uniformMatrix4fv(st._sprg.cMatUniform, false, this.mats[s]);
                    display.gl.uniform4fv(st._sprg.cVecUniform, this.vecs[s]);
                    this.dirty = false;
                }
                var n = this.lnnm[this.size - 1];
                Stage.setBMD(this.bmds[n]);
            };
            _CMStack.prototype.pop = function () {
                if (!this.isID[this.size - 1])
                    this.dirty = true;
                this.size--;
            };
            return _CMStack;
        }());
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var display;
    (function (display) {
        /**
         * The Bitmap class represents display objects that represent bitmap images.
         */
        var Bitmap = (function (_super) {
            __extends(Bitmap, _super);
            function Bitmap(bitmapData) {
                _super.call(this);
                this.bitmapData = bitmapData;
            }
            Bitmap.prototype._getLocRect = function () {
                return this.bitmapData.rect;
            };
            Bitmap.prototype._render = function (stage) {
                var tempBitmapData = this.bitmapData;
                if (!tempBitmapData.loaded)
                    return;
                if (tempBitmapData.dirty)
                    tempBitmapData.syncWithGPU();
                display.gl.uniformMatrix4fv(stage._sprg.tMatUniform, false, stage._mstack.top());
                stage._cmstack.update();
                display.Stage.setVC(tempBitmapData.vBuffer);
                display.Stage.setTC(tempBitmapData.tcBuffer);
                display.Stage.setUT(1);
                display.Stage.setTEX(tempBitmapData.texture);
                display.Stage.setEBF(stage._unitIBuffer);
                display.gl.drawElements(display.gl.TRIANGLES, 6, display.gl.UNSIGNED_SHORT, 0);
            };
            return Bitmap;
        }(display.InteractiveObject));
        display.Bitmap = Bitmap;
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var display;
    (function (display) {
        var Rectangle = ic.geom.Rectangle;
        var EventDispatcher = ic.events.EventDispatcher;
        var Event = ic.events.Event;
        var BitmapData = (function () {
            //region Public functions
            function BitmapData(imgURL) {
                this.width = 0; // size of texture
                this.height = 0;
                this.rect = new Rectangle();
                this.loader = new EventDispatcher();
                this.loader.bitmapData = this;
                //this.loader.bytesLoaded = 0;
                //this.loader.bytesTotal = 0;
                this._rwidth = 0; // real size of bitmap in memory (power of two)
                this._rheight = 0;
                this._rrect = null;
                this.texture = null;
                this.tcBuffer = null; //	texture coordinates buffer
                this.vBuffer = null; //	four vertices of bitmap
                this.loaded = false;
                this.dirty = true;
                this._gpuAllocated = false;
                this._buffer = null; //  Uint8 container for texture
                this._ubuffer = null; //  Uint32 container for texture
                /*
                 this._opEv = new Event(Event.OPEN);
                 this._pgEv = new Event(Event.PROGRESS);
                 this._cpEv = new Event(Event.COMPLETE);
    
                 this._opEv.target = this._pgEv.target = this._cpEv.target = this.loader;
                 */
                if (imgURL == null)
                    return;
                var img = document.createElement("img");
                img.crossOrigin = "Anonymous";
                img.onload = function (e) {
                    this._initFromImg(img, img.width, img.height);
                    var ev = new Event(Event.COMPLETE);
                    this.loader.dispatchEvent(ev);
                }.bind(this);
                img.src = imgURL;
            }
            BitmapData.empty = function (w, h, fc) {
                if (fc == null)
                    fc = 0xffffffff;
                var bd = new BitmapData(null);
                bd._initFromImg(null, w, h, fc);
                return bd;
            };
            BitmapData.prototype.setPixel = function (x, y, color) {
                var i = y * this.width + x, b = this._ubuffer;
                b[i] = (b[i] & 0xff000000) + color;
                this.dirty = true;
            };
            BitmapData.prototype.setPixel32 = function (x, y, color) {
                var i = y * this.width + x;
                this._ubuffer[i] = color;
                this.dirty = true;
            };
            BitmapData.prototype.setPixels = function (r, buff) {
                this._copyRectBuff(buff, r, this._buffer, this.rect);
                this.dirty = true;
            };
            BitmapData.prototype.getPixel = function (x, y) {
                var i = y * this.width + x;
                return this._ubuffer[i] & 0xffffff;
            };
            BitmapData.prototype.getPixel32 = function (x, y) {
                var i = y * this.width + x;
                return this._ubuffer[i];
            };
            BitmapData.prototype.getPixels = function (r, buff) {
                if (!buff)
                    buff = new Uint8Array(r.width * r.height * 4);
                this._copyRectBuff(this._buffer, this.rect, buff, r);
                return buff;
            };
            BitmapData.prototype.draw = function (dobj) {
                if (this.dirty)
                    this.syncWithGPU();
                this._setTexAsFB();
                display.Stage.setTEX(null);
                dobj._render(display.Stage.main);
                var buff = this._buffer, r = this.rect;
                display.gl.readPixels(r.x, r.y, r.width, r.height, display.gl.RGBA, display.gl.UNSIGNED_BYTE, buff);
                display.Stage.main._setFramebuffer(null, display.Stage.main.stageWidth, display.Stage.main.stageHeight, false);
                display.Stage.setTEX(this.texture);
                display.gl.generateMipmap(display.gl.TEXTURE_2D);
            };
            BitmapData.prototype.syncWithGPU = function () {
                var r = this.rect, buff = this._buffer;
                if (!this._gpuAllocated) {
                    var w = r.width, h = r.height;
                    var xsc = w / this._rwidth;
                    var ysc = h / this._rheight;
                    this.texture = display.gl.createTexture();
                    this.tcBuffer = display.gl.createBuffer(); //	texture coordinates buffer
                    this.vBuffer = display.gl.createBuffer(); //	four vertices of bitmap
                    display.Stage.setBuffer(this.tcBuffer);
                    display.gl.bufferData(display.gl.ARRAY_BUFFER, new Float32Array([0, 0, xsc, 0, 0, ysc, xsc, ysc]), display.gl.STATIC_DRAW);
                    display.Stage.setBuffer(this.vBuffer);
                    display.gl.bufferData(display.gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, w, 0, 0, 0, h, 0, w, h, 0]), display.gl.STATIC_DRAW);
                    var ebuff = new Uint8Array(this._rwidth * this._rheight * 4);
                    var ebuff32 = new Uint32Array(ebuff.buffer);
                    for (var i = 0; i < ebuff32.length; i++)
                        ebuff32[i] = 0x00ffffff;
                    display.Stage.setTEX(this.texture);
                    display.gl.texImage2D(display.gl.TEXTURE_2D, 0, display.gl.RGBA, this._rwidth, this._rheight, 0, display.gl.RGBA, display.gl.UNSIGNED_BYTE, ebuff);
                    display.gl.texParameteri(display.gl.TEXTURE_2D, display.gl.TEXTURE_MAG_FILTER, display.gl.LINEAR);
                    display.gl.texParameteri(display.gl.TEXTURE_2D, display.gl.TEXTURE_MIN_FILTER, display.gl.LINEAR_MIPMAP_LINEAR);
                    this._gpuAllocated = true;
                }
                display.Stage.setTEX(this.texture);
                display.gl.texSubImage2D(display.gl.TEXTURE_2D, 0, r.x, r.y, r.width, r.height, display.gl.RGBA, display.gl.UNSIGNED_BYTE, buff);
                display.gl.generateMipmap(display.gl.TEXTURE_2D);
                this.dirty = false;
            };
            //endregion
            //region Private functions
            BitmapData.prototype._initFromImg = function (img, w, h, fc) {
                this.loaded = true;
                this.width = w; // image width
                this.height = h; // image.height
                this.rect = new Rectangle(0, 0, w, h);
                this._rwidth = BitmapData._nhpot(w); // width - power of Two
                this._rheight = BitmapData._nhpot(h); // height - power of Two
                this._rrect = new Rectangle(0, 0, this._rwidth, this._rheight);
                var cnv = BitmapData._canv;
                cnv.width = w;
                cnv.height = h;
                var ctx = BitmapData._ctx;
                if (img != null)
                    ctx.drawImage(img, 0, 0);
                var imgd = ctx.getImageData(0, 0, w, h);
                if (window.CanvasPixelArray && imgd.data instanceof CanvasPixelArray) {
                    this._buffer = new Uint8Array(imgd.data);
                }
                else
                    this._buffer = new Uint8Array(imgd.data.buffer);
                this._ubuffer = new Uint32Array(this._buffer.buffer); // another ArrayBufferView for the same buffer4
                if (img == null)
                    for (var i = 0, b = this._ubuffer; i < b.length; i++)
                        b[i] = fc;
            };
            BitmapData.prototype._copyRectBuff = function (sc, sr, tc, tr) {
                sc = new Uint32Array(sc.buffer);
                tc = new Uint32Array(tc.buffer);
                var ar = sr.intersection(tr);
                var sl = Math.max(0, ar.x - sr.x);
                var tl = Math.max(0, ar.x - tr.x);
                var st = Math.max(0, ar.y - sr.y);
                var tt = Math.max(0, ar.y - tr.y);
                var w = ar.width;
                var h = ar.height;
                for (var i = 0; i < h; i++) {
                    var sind = (st + i) * sr.width + sl;
                    var tind = (tt + i) * tr.width + tl;
                    for (var j = 0; j < w; j++)
                        tc[tind++] = sc[sind++];
                }
            };
            BitmapData.prototype._setTexAsFB = function () {
                if (BitmapData.fbo == null) {
                    BitmapData.fbo = display.gl.createFramebuffer();
                    var rbo = display.gl.createRenderbuffer();
                    display.gl.bindRenderbuffer(display.gl.RENDERBUFFER, rbo);
                    display.gl.bindFramebuffer(display.gl.FRAMEBUFFER, BitmapData.fbo);
                    display.gl.framebufferRenderbuffer(display.gl.FRAMEBUFFER, display.gl.DEPTH_ATTACHMENT, display.gl.RENDERBUFFER, rbo);
                }
                display.Stage.main._setFramebuffer(BitmapData.fbo, this._rwidth, this._rheight, true);
                display.gl.framebufferTexture2D(display.gl.FRAMEBUFFER, display.gl.COLOR_ATTACHMENT0, display.gl.TEXTURE_2D, this.texture, 0);
            };
            BitmapData._ipot = function (x) {
                return (x & (x - 1)) == 0;
            };
            BitmapData._nhpot = function (x) {
                --x;
                for (var i = 1; i < 32; i <<= 1)
                    x = x | x >> i;
                return x + 1;
            };
            BitmapData._canv = document.createElement("canvas");
            BitmapData._ctx = BitmapData._canv.getContext("2d");
            return BitmapData;
        }());
        display.BitmapData = BitmapData;
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var display;
    (function (display) {
        var Point_m4 = ic.geom.Point_m4;
        var Rectangle = ic.geom.Rectangle;
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite() {
                _super.call(this);
                this._trect2 = new Rectangle();
                this.graphics = new display.Graphics();
            }
            Sprite.prototype._getRect = function (tmat, torg, stks) {
                var r1 = _super.prototype._getRect.call(this, tmat, torg, stks);
                var r2 = this.graphics.getLocRect(stks);
                Point_m4.multiply(tmat, this._getAbsoluteTransformMatrix(), this._tempm);
                this._transfRect(this._tempm, torg, r2, this._trect2);
                return r1.union(this._trect2);
            };
            Sprite.prototype._render = function (st) {
                this.graphics.render(st);
                _super.prototype._render.call(this, st);
            };
            Sprite.prototype._getTarget = function (porg, pp) {
                if (!this.visible || (!this.mouseChildren && !this.mouseEnabled))
                    return null;
                var tgt = _super.prototype._getTarget.call(this, porg, pp);
                if (tgt != null)
                    return tgt;
                if (!this.mouseEnabled)
                    return null;
                var org = this._tvec4_0, p = this._tvec4_1, im = this.transform._getIMat();
                Point_m4.multiplyVec4(im, porg, org);
                Point_m4.multiplyVec4(im, pp, p);
                var pt = this._tempP;
                this._lineIntersection(org, p, pt);
                if (this.graphics._hits(pt.x, pt.y))
                    return this;
                return null;
            };
            Sprite.prototype._htpLocal = function (org, p) {
                var tp = this._tempP;
                this._lineIntersection(org, p, tp);
                if (this.graphics._hits(tp.x, tp.y))
                    return true;
                return _super.prototype._htpLocal.call(this, org, p);
            };
            return Sprite;
        }(display.DisplayObjectContainer));
        display.Sprite = Sprite;
    })(display = ic.display || (ic.display = {}));
})(ic || (ic = {}));
///<reference path="../display/InteractiveObject.ts"/>
///<reference path="../display/Stage.ts"/>
///<reference path="../geom/Rectangle.ts"/>
///<reference path="../events/Event.ts"/>
var ic;
(function (ic) {
    var text;
    (function (text) {
        var gl = ic.display.gl;
        var InteractiveObject = ic.display.InteractiveObject;
        var Stage = ic.display.Stage;
        var Rectangle = ic.geom.Rectangle;
        var KeyboardEvent = ic.events.KeyboardEvent;
        var MouseEvent = ic.events.MouseEvent;
        var Event = ic.events.Event;
        var TextField = (function (_super) {
            __extends(TextField, _super);
            function TextField() {
                _super.call(this);
                this._textArea = document.createElement("textarea");
                this._textAreaAdded = false;
                this._textArea.setAttribute("style", "font-family:Times New Roman; font-size:12px; z-index:-1; \
											position:absolute; top:0px; left:0px; opacity:0; pointer-events:none; user-select:none; width:100px; height:100px;");
                this._textArea.addEventListener("input", this._onInput.bind(this), false);
                //this._textArea.addEventListener("mousedown(e){e.preventDefault();});
                this._stage = null;
                this._type = TextFieldType.DYNAMIC;
                this._selectable = true;
                this._mouseDown = false;
                this._cursorPosition = -1;
                this._select = null; // selection
                this._metrics = null; // metrics of rendered text
                this._wordWrap = false; // wrap words
                this._textWidth = 0; // width of text
                this._textHeight = 0; // height of text
                this._areaWidth = 100; // width of whole TF area
                this._areaHeight = 100; // height of whole TF area
                this._text = ""; // current text
                this._textFormat = new text.TextFormat();
                this._rwidth = 0;
                this._rheight = 0;
                this._background = false;
                this._border = false;
                this._texture = gl.createTexture(); // texture
                this._tcArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]);
                this._textureCoordinateBuffer = gl.createBuffer(); // texture coordinates buffer
                Stage.setBuffer(this._textureCoordinateBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, this._tcArray, gl.STATIC_DRAW);
                this._fArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                this._vertexBuffer = gl.createBuffer(); // vertices buffer for 4 vertices
                Stage.setBuffer(this._vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, this._fArray, gl.STATIC_DRAW);
                this.addEventListener(Event.ADDED_TO_STAGE, this._onAddToStage, this);
                this.addEventListener(Event.REMOVED_FROM_STAGE, this._onRemoveFromStage, this);
                this.addEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown, this);
                this.addEventListener(KeyboardEvent.KEY_UP, this._onKeyUp, this);
                this._brect = new Rectangle();
            }
            TextField.prototype._getLocRect = function () {
                return this._brect;
            };
            TextField.prototype._loseFocus = function () {
                if (this._textAreaAdded)
                    document.body.removeChild(this._textArea);
                this._textAreaAdded = false;
                this._cursorPosition = -1;
                this._update();
            };
            TextField.prototype._onKeyUp = function (e) {
                this._onInput(null);
            };
            TextField.prototype._onInput = function (e) {
                if (this._type != TextFieldType.INPUT)
                    return;
                this._text = this._textArea.value;
                this._select = null;
                this._cursorPosition = this._textArea.selectionStart;
                this.setSelection(this._textArea.selectionStart, this._textArea.selectionEnd);
            };
            TextField.prototype._onAddToStage = function (e) {
                this._stage = this.stage;
            };
            TextField.prototype._onRemoveFromStage = function (e) {
                this._loseFocus();
            };
            TextField.prototype._onMouseDown = function (e) {
                if (!this._selectable)
                    return;
                if (this._type == TextFieldType.INPUT) {
                    this._textAreaAdded = true;
                    document.body.appendChild(this._textArea);
                    this._textArea.value = this._text;
                    this._textArea.focus();
                }
                var ind = this.getCharIndexAtPoint(this.mouseX, this.mouseY);
                this._mouseDown = true;
                this._cursorPosition = ind;
                this.setSelection(ind, ind);
                this._update();
                this.stage.addEventListener(MouseEvent.MOUSE_MOVE, this._onMouseMove, this);
                this.stage.addEventListener(MouseEvent.MOUSE_UP, this._onMouseUp, this);
            };
            TextField.prototype._onMouseMove = function (e) {
                if (!this._selectable || !this._mouseDown)
                    return;
                var ind = this.getCharIndexAtPoint(this.mouseX, this.mouseY);
                this.setSelection(this._cursorPosition, ind);
            };
            TextField.prototype._onMouseUp = function (e) {
                if (!this._selectable)
                    return;
                //var sel = this._select;
                //if(sel) if(sel.from != sel.to) this._textArea.setSelectionRange(sel.from, sel.to);
                //this.setSelection(this._cursorPosition, ind);
                this._mouseDown = false;
                if (this._type == TextFieldType.INPUT)
                    this._textArea.focus();
                this._stage.removeEventListener(MouseEvent.MOUSE_MOVE, this._onMouseMove);
                this._stage.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
            };
            TextField.prototype.appendText = function (newText) {
                this._text += newText;
                this._update();
            };
            TextField.prototype.getCharBoundaries = function (charIndex) {
                //if(charIndex>=this._text.length) {var lw =  return new Rectangle(0,0,30,30);}
                var ctx = text.TextFormat.context;
                this._textFormat.setContext(ctx);
                var m = this._metrics;
                var l = this.getLineIndexOfChar(charIndex);
                if (m[l].words.length == 0)
                    return new Rectangle(m[l].x, m[l].y, m[l].width, m[l].height);
                var w = 0;
                while (w + 1 < m[l].words.length && m[l].words[w + 1].charOffset <= charIndex)
                    w++;
                var word = m[l].words[w];
                var pref = word.word.substring(0, charIndex - word.charOffset);
                var rect = new Rectangle(word.x + ctx.measureText(pref).width, word.y, 0, word.height);
                rect.width = ctx.measureText(this._text.charAt(charIndex)).width;
                var nw = m[l].words[w + 1];
                if (nw && nw.charOffset == charIndex + 1)
                    rect.width = nw.x - rect.x;
                return rect;
            };
            TextField.prototype.getCharIndexAtPoint = function (x, y) {
                if (this._text.length == 0)
                    return 0;
                var ctx = text.TextFormat.context;
                this._textFormat.setContext(ctx);
                var m = this._metrics;
                var l = this.getLineIndexAtPoint(x, y);
                x = Math.max(m[l].x, Math.min(m[l].x + m[l].width, x));
                var w = 0;
                while (w + 1 < m[l].words.length && m[l].words[w + 1].x <= x)
                    w++;
                var word = m[l].words[w];
                var ci = word.charOffset;
                var cx = word.x;
                while (true) {
                    var cw = ctx.measureText(this._text.charAt(ci)).width;
                    if (cx + cw * 0.5 < x && cw != 0) {
                        cx += cw;
                        ci++;
                    }
                    else
                        break;
                }
                return ci;
            };
            TextField.prototype.getLineIndexAtPoint = function (x, y) {
                var m = this._metrics;
                var index = 0;
                while (index + 1 < m.length && m[index + 1].y <= y)
                    index++;
                return index;
            };
            TextField.prototype.getLineIndexOfChar = function (charIndex) {
                var m = this._metrics;
                var index = 0;
                while (index + 1 < m.length && m[index + 1].charOffset <= charIndex)
                    index++;
                return index;
            };
            TextField.prototype.getTextFormat = function () {
                return this._textFormat.clone();
            };
            TextField.prototype.setTextFormat = function (textFormat) {
                this._textFormat.set(textFormat);
                this._textArea.style.fontFamily = textFormat.font;
                this._textArea.style.fontSize = textFormat.size + "px";
                this._textArea.style.textAlign = textFormat.align;
                this._update();
            };
            TextField.prototype.setSelection = function (begin, end) {
                var a = Math.min(begin, end), b = Math.max(begin, end), s = this._select;
                if (s == null || s.from != a || s.to != b) {
                    this._select = { from: a, to: b };
                    //this._textArea.setSelectionRange(a,b);
                    this._textArea.selectionStart = a;
                    this._textArea.selectionEnd = b;
                    this._update();
                }
            };
            TextField.prototype._update = function () {
                var w = this._brect.width = this._areaWidth;
                var h = this._brect.height = this._areaHeight;
                if (w == 0 || h == 0)
                    return;
                var data = this._textFormat.getImageData(this._text, this);
                this._textWidth = data.tw;
                this._textHeight = data.th;
                if (data.rw != this._rwidth || data.rh != this._rheight) {
                    gl.deleteTexture(this._texture);
                    this._texture = gl.createTexture();
                }
                Stage.setTEX(this._texture);
                //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.image);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, data.rw, data.rh, 0, gl.RGBA, gl.UNSIGNED_BYTE, data.ui8buff);
                //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.imageData);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
                this._rwidth = data.rw;
                this._rheight = data.rh;
                var sx = w / data.rw;
                var sy = h / data.rh;
                var ta = this._tcArray;
                ta[2] = ta[6] = sx;
                ta[5] = ta[7] = sy;
                Stage.setBuffer(this._textureCoordinateBuffer);
                gl.vertexAttribPointer(Stage.main._sprg.tca, 2, gl.FLOAT, false, 0, 0);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, ta);
                var fa = this._fArray;
                fa[3] = fa[9] = w;
                fa[7] = fa[10] = h;
                Stage.setBuffer(this._vertexBuffer);
                gl.vertexAttribPointer(Stage.main._sprg.vpa, 3, gl.FLOAT, false, 0, 0);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, fa);
            };
            TextField.prototype._render = function (stage) {
                if (this._areaWidth == 0 || this._areaHeight == 0)
                    return;
                gl.uniformMatrix4fv(stage._sprg.tMatUniform, false, stage._mstack.top());
                stage._cmstack.update();
                Stage.setVC(this._vertexBuffer);
                Stage.setTC(this._textureCoordinateBuffer);
                Stage.setUT(1);
                Stage.setTEX(this._texture);
                Stage.setEBF(stage._unitIBuffer);
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            };
            Object.defineProperty(TextField.prototype, "textWidth", {
                get: function () {
                    return this._textWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "textHeight", {
                get: function () {
                    return this._textHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "wordWrap", {
                get: function () {
                    return this._wordWrap;
                },
                set: function (value) {
                    this._wordWrap = value;
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "width", {
                get: function () {
                    return this._areaWidth;
                },
                set: function (value) {
                    this._areaWidth = Math.max(0, value);
                    this._textArea.style.width = this._areaWidth + "px";
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "height", {
                get: function () {
                    return this._areaHeight;
                },
                set: function (x) {
                    this._areaHeight = Math.max(0, x);
                    this._textArea.style.height = this._areaHeight + "px";
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    this._text = value + "";
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "selectable", {
                get: function () {
                    return this._selectable;
                },
                set: function (x) {
                    this._selectable = x;
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "type", {
                get: function () {
                    return this._type;
                },
                set: function (value) {
                    this._type = value;
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "background", {
                get: function () {
                    return this._background;
                },
                set: function (value) {
                    this._background = value;
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextField.prototype, "border", {
                get: function () {
                    return this._border;
                },
                set: function (value) {
                    this._border = value;
                    this._update();
                },
                enumerable: true,
                configurable: true
            });
            return TextField;
        }(InteractiveObject));
        text.TextField = TextField;
        var TextFieldType = {
            DYNAMIC: "dynamic",
            INPUT: "input"
        };
    })(text = ic.text || (ic.text = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var text;
    (function (text) {
        var TextFormat = (function () {
            /**
             * A constructor of text format
             * @param font        URL of font
             * @param size        size of text
             * @param color        color of text
             * @param bold
             * @param italic
             * @param align
             * @param leading
             */
            function TextFormat(font, size, color, bold, italic, align, leading) {
                if (font === void 0) { font = "Times New Roman"; }
                if (size === void 0) { size = 12; }
                if (color === void 0) { color = 0x000000; }
                if (bold === void 0) { bold = false; }
                if (italic === void 0) { italic = false; }
                if (align === void 0) { align = text.TextFormatAlign.LEFT; }
                if (leading === void 0) { leading = 0; }
                this.font = font;
                this.size = size;
                this.color = color;
                this.bold = bold;
                this.italic = italic;
                this.align = align;
                this.leading = leading;
                this.maxW = 0;
                this.data = { image: null, tw: 0, th: 0, rw: 0, rh: 0 }; // image, text width/height, real width/height
            }
            TextFormat.prototype.clone = function () {
                return (new TextFormat(this.font, this.size, this.color, this.bold, this.italic, this.align, this.leading));
            };
            TextFormat.prototype.set = function (textFormat) {
                this.font = textFormat.font;
                this.size = textFormat.size;
                this.color = textFormat.color;
                this.bold = textFormat.bold;
                this.italic = textFormat.italic;
                this.align = textFormat.align;
                this.leading = textFormat.leading;
            };
            /*
             metrics = 	// for each line
             [
             {
             x, y, width, height,
             charOffset  // int
             words =  // for each word
             [
             {
             x, y, width, height
             word // String
             }
             , ...
             ]
             }
             , ...
             ]
             */
            TextFormat.prototype.setContext = function (context) {
                var c = this.color;
                var r = (c >> 16 & 0x0000ff);
                var g = (c >> 8 & 0x0000ff);
                var b = (c & 0x0000ff);
                context.textBaseline = "top";
                context.fillStyle = context.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
                context.font = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.size + "px " + this.font;
            };
            TextFormat.prototype.getImageData = function (str, textField) {
                var canvas = TextFormat._canvas;
                var ctx = TextFormat._context;
                var data = this.data;
                canvas.width = data.rw = this._nhpt(textField._areaW); //console.log(tf._areaW, canv.width);
                canvas.height = data.rh = this._nhpt(textField._areaH); //console.log(tf._areaH, canv.height);
                if (textField._background) {
                    //console.log("has background");
                    ctx.fillStyle = "rgba(255,255,255,1)";
                    ctx.fillRect(0, 0, textField._areaW, textField._areaH);
                }
                if (textField._border) {
                    ctx.strokeStyle = "rgb(0,0,0)";
                    ctx.beginPath();
                    //ctx.moveTo(Math.round(b0.x)+0.5, b0.y);
                    //ctx.lineTo(Math.round(b0.x)+0.5, b0.y+b0.height);
                    ctx.rect(0.5, 0.5, textField._areaW - 1, textField._areaH - 1);
                    ctx.stroke();
                }
                this.setContext(ctx);
                var metrics = [];
                this.maxW = 0;
                var pars = str.split("\n");
                var line = 0;
                var posY = 0;
                var lineH = this.size * 1.25;
                var characterOffset = 0; // character offset
                for (var i = 0; i < pars.length; i++) {
                    var lc = this.renderPar(pars[i], posY, lineH, ctx, textField, characterOffset, metrics);
                    line += lc;
                    posY += lc * (lineH + this.leading);
                    characterOffset += pars[i].length + 1;
                }
                if (this.align == text.TextFormatAlign.JUSTIFY)
                    this.maxW = Math.max(this.maxW, textField._areaW);
                data.tw = this.maxW;
                data.th = (lineH + this.leading) * line - this.leading;
                textField._metrics = metrics;
                if (textField._selectable && textField._select && textField._select.from < textField._select.to) {
                    var sel = textField._select;
                    var m = metrics;
                    var l0 = textField.getLineIndexOfChar(sel.from);
                    var l1 = textField.getLineIndexOfChar(sel.to - 1);
                    var b0 = textField.getCharBoundaries(sel.from);
                    var b1 = textField.getCharBoundaries(sel.to - 1);
                    ctx.fillStyle = "rgba(0,0,0,0.25)";
                    if (l0 == l1) {
                        ctx.fillRect(b0.x, b0.y, b1.x + b1.width - b0.x, b1.y + b1.height - b0.y);
                    }
                    else {
                        ctx.fillRect(b0.x, b0.y, m[l0].x + m[l0].width - b0.x, m[l0].y + m[l0].height - b0.y);
                        for (var l = l0 + 1; l < l1; l++)
                            ctx.fillRect(m[l].x, m[l].y, m[l].width, m[l].height);
                        ctx.fillRect(m[l1].x, m[l1].y, b1.x + b1.width - m[l1].x, b1.y + b1.height - m[l1].y);
                    }
                }
                else if (textField._type == "input" && textField._curPos > -1) {
                    var b0 = textField.getCharBoundaries(textField._curPos);
                    ctx.beginPath();
                    ctx.moveTo(Math.round(b0.x) + 0.5, b0.y);
                    ctx.lineTo(Math.round(b0.x) + 0.5, b0.y + b0.height);
                    ctx.stroke();
                }
                data.canvas = canvas;
                var imgd = ctx.getImageData(0, 0, data.rw, data.rh);
                if (window.CanvasPixelArray && imgd.data instanceof CanvasPixelArray) {
                    data.ui8buff = new Uint8Array(imgd.data);
                }
                else
                    data.ui8buff = new Uint8Array(imgd.data.buffer);
                //var ui8buff = new Uint8Array(imgd.data);
                //data.ui8buff = ui8buff;
                return data;
            };
            TextFormat.prototype.renderPar = function (s, posY, lineH, ctx, tf, coff, metrics) {
                var words;
                if (tf._wordWrap)
                    words = s.split(" ");
                else
                    words = [s];
                var spaceWidth = ctx.measureText(" ").width;
                var currentLineWidth = 0; // current line width
                var maxLineWidth = tf._areaW; // maximum line width
                var currentLine = 0; // current line
                var lines = [[]]; // array of lines , line = (arrays of words)
                var freeLineSpaces = []; // free line space
                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    var wordWidth = ctx.measureText(word).width;
                    if (currentLineWidth + wordWidth <= maxLineWidth || currentLineWidth == 0) {
                        lines[currentLine].push(word);
                        currentLineWidth += wordWidth + spaceWidth;
                    }
                    else {
                        freeLineSpaces.push(maxLineWidth - currentLineWidth + spaceWidth);
                        lines.push([]);
                        currentLine++;
                        currentLineWidth = 0;
                        i--;
                    }
                }
                freeLineSpaces.push(maxLineWidth - currentLineWidth + spaceWidth);
                for (var i = 0; i < lines.length; i++) {
                    var mline = { x: 0, y: 0, width: 0, height: 0, charOffset: coff, words: [] };
                    mline.height = this.size * 1.25 + this.leading;
                    var line = lines[i];
                    //while(line[line.length-1] == "") {line.pop(); lspace[i] += spacew; }
                    this.maxW = Math.max(this.maxW, maxLineWidth - freeLineSpaces[i]);
                    var lineY = posY + (lineH + this.leading) * i;
                    var gap = spaceWidth;
                    currentLineWidth = 0;
                    if (this.align == text.TextFormatAlign.CENTER)
                        currentLineWidth = freeLineSpaces[i] * 0.5;
                    if (this.align == text.TextFormatAlign.RIGHT)
                        currentLineWidth = freeLineSpaces[i];
                    if (this.align == text.TextFormatAlign.JUSTIFY)
                        gap = spaceWidth + freeLineSpaces[i] / (line.length - 1);
                    mline.x = currentLineWidth;
                    mline.y = lineY;
                    for (var j = 0; j < line.length; j++) {
                        var word = line[j];
                        ctx.fillText(word, currentLineWidth, lineY);
                        var wordWidth = ctx.measureText(word).width;
                        mline.words.push({
                            x: currentLineWidth,
                            y: lineY,
                            width: wordWidth,
                            height: mline.height,
                            charOffset: coff,
                            word: word
                        });
                        if (i < lines.length - 1)
                            currentLineWidth += wordWidth + gap; // not last line
                        else {
                            currentLineWidth += wordWidth + spaceWidth;
                        } // last line
                        coff += word.length + 1;
                    }
                    mline.width = currentLineWidth - mline.x;
                    if (i == lines.length - 1)
                        mline.width -= spaceWidth;
                    metrics.push(mline);
                }
                return currentLine + 1;
            };
            TextFormat.prototype._nhpt = function (x) {
                --x;
                for (var i = 1; i < 32; i <<= 1)
                    x = x | x >> i;
                return x + 1;
            };
            Object.defineProperty(TextFormat, "context", {
                get: function () {
                    return this._context;
                },
                enumerable: true,
                configurable: true
            });
            TextFormat._canvas = document.createElement("canvas");
            TextFormat._context = TextFormat._canvas.getContext("2d");
            return TextFormat;
        }());
        text.TextFormat = TextFormat;
        text.TextFormatAlign = {
            LEFT: "left",
            CENTER: "center",
            RIGHT: "right",
            JUSTIFY: "justify"
        };
    })(text = ic.text || (ic.text = {}));
})(ic || (ic = {}));
var ic;
(function (ic) {
    var geom;
    (function (geom) {
        var Vector3D = (function () {
            function Vector3D(x, y, z, w) {
                if (x === void 0) { x = 0.0; }
                if (y === void 0) { y = 0.0; }
                if (z === void 0) { z = 0.0; }
                if (w === void 0) { w = 0.0; }
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
            Vector3D.prototype.add = function (p) {
                return new Vector3D(this.x + p.x, this.y + p.y, this.z + p.z, this.w + p.w);
            };
            Vector3D.prototype.clone = function () {
                return new Vector3D(this.x, this.y, this.z, this.w);
            };
            Vector3D.prototype.copyFrom = function (p) {
                this.x = p.x;
                this.y = p.y;
                this.z = p.z;
                this.w = p.w;
            };
            Vector3D.prototype.equals = function (p) {
                return (this.x == p.x && this.y == p.y && this.z == p.z);
            };
            Vector3D.prototype.normalize = function () {
                var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
                this.x *= 1 / l;
                this.y *= 1 / l;
                this.z *= 1 / l;
                return l;
            };
            Vector3D.prototype.setTo = function (xa, ya, za) {
                this.x = xa;
                this.y = ya;
                this.z = za;
            };
            Vector3D.prototype.subtract = function (p) {
                return new Vector3D(this.x - p.x, this.y - p.y, this.z - p.z, 0);
            };
            Vector3D.distance = function (a, b) {
                return Vector3D._distance(a.x, a.y, a.z, b.x, b.y, b.z);
            };
            Vector3D._distance = function (x1, y1, z1, x2, y2, z2) {
                return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
            };
            return Vector3D;
        }());
        geom.Vector3D = Vector3D;
    })(geom = ic.geom || (ic.geom = {}));
})(ic || (ic = {}));
///<reference path="ic/geom/Point.ts"/>
///<reference path="ic/geom/Rectangle.ts"/>
///<reference path="ic/geom/Transform.ts"/>
///<reference path="ic/events/Event.ts"/>
///<reference path="ic/events/EventDispatcher.ts"/>
///<reference path="ic/events/MouseEvent.ts"/>
///<reference path="ic/events/TouchEvent.ts"/>
///<reference path="ic/events/KeyboardEvent.ts"/>
///<reference path="ic/display/Graphics.ts"/>
///<reference path="ic/display/DisplayObject.ts"/>
///<reference path="ic/display/InteractiveObject.ts"/>
///<reference path="ic/display/DisplayObjectContainer.ts"/>
///<reference path="ic/display/Stage.ts"/>
///<reference path="ic/display/Bitmap.ts"/>
///<reference path="ic/display/BitmapData.ts"/>
///<reference path="ic/display/Sprite.ts"/>
///<reference path="ic/text/TextField.ts"/>
///<reference path="ic/text/TextFormat.ts"/>
///<reference path="ic/geom/Vector3D.ts"/>
/**
 * Secure replacement of the requestAnimationFrame if not available in the browser.
 */
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60, new Date().getTime());
        };
})();
///<reference path='../../src/engine.ts'/>
/*// /// <reference path='../../build/engine.d.ts'/>*/
var game;
(function (game) {
    var Stage = ic.display.Stage;
    var Sprite = ic.display.Sprite;
    var BitmapData = ic.display.BitmapData;
    var Bitmap = ic.display.Bitmap;
    var Event = ic.events.Event;
    var KeyboardEvent = ic.events.KeyboardEvent;
    var stage, car, angle = 0, speed = 0;
    var l, r, u, d;
    function onKD(e) {
        console.log(e.keyCode);
        if (e.keyCode == 37)
            l = true;
        if (e.keyCode == 38)
            u = true;
        if (e.keyCode == 39)
            r = true;
        if (e.keyCode == 40)
            d = true;
    }
    function onKU(e) {
        if (e.keyCode == 37)
            l = false;
        if (e.keyCode == 38)
            u = false;
        if (e.keyCode == 39)
            r = false;
        if (e.keyCode == 40)
            d = false;
    }
    function onEF(e) {
        speed *= 0.9;
        if (u)
            speed += 1 + speed * 0.06;
        if (d)
            speed -= 1;
        if (r)
            angle += speed * 0.003;
        if (l)
            angle -= speed * 0.003;
        car.rotation = angle * 180 / Math.PI;
        car.x += Math.cos(angle) * speed;
        car.y += Math.sin(angle) * speed;
    }
    window.onload = function () {
        stage = new Stage("gameCanvas");
        // background
        var s = new Sprite();
        s.graphics.beginBitmapFill(new BitmapData("asphalt.jpg"));
        s.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
        stage.addChild(s);
        // car
        car = new Sprite();
        car.x = stage.stageWidth / 2;
        car.y = stage.stageHeight / 2;
        var cb = new Bitmap(new BitmapData("car.png"));
        cb.x = -123;
        cb.y = -50;
        car.addChild(cb);
        stage.addChild(car);
        // events
        stage.addEventListener(KeyboardEvent.KEY_DOWN, onKD);
        stage.addEventListener(KeyboardEvent.KEY_UP, onKU);
        stage.addEventListener(Event.ENTER_FRAME, onEF);
    };
})(game || (game = {}));
//# sourceMappingURL=test.js.map