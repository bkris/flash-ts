namespace ic.geom {

    export class Transform {

        private _obj;

        public _mdirty;
        public _vdirty;

        private _tmat;
        /** Inverse matrix */
        private _imat;
        /** Absolute Transform matrix */
        public _atmat;
        public _aimat;
        private _pscal;

        public _cmat;
        public _cvec;
        public _cID;

        public _scaleX;
        public _scaleY;
        public _scaleZ;
        public _rotationX;
        public _rotationY;
        public _rotationZ;

        public constructor() {
            this._obj = null;

            this._mdirty = false;		// matrix dirty
            this._vdirty = false;		// values dirty

            this._tmat = Point_m4.create();
            this._imat = Point_m4.create();
            this._atmat = Point_m4.create();
            this._aimat = Point_m4.create();
            this._pscal = Point_m4.create();

            this._cmat = Point_m4.create();
            this._cvec = Point_v4.create();
            this._cID = true;

            this._scaleX = 1;
            this._scaleY = 1;
            this._scaleZ = 1;
            this._rotationX = 0;
            this._rotationY = 0;
            this._rotationZ = 0;
        }

        public getTMat() {
            var o = this._obj;
            var m = this._tmat;
            this._checkMat();
            m[12] = o.x;
            m[13] = o.y;
            m[14] = o.z;
            return m;
        }

        public _getIMat() {
            Point_m4.inverse(this.getTMat(), this._imat);
            return this._imat;
        }

        public _postScale(sx, sy) {
            this._checkMat();
            var ps = this._pscal;
            ps[10] = ps[15] = 1;
            ps[0] = sx;
            ps[5] = sy;
            Point_m4.multiply(ps, this._tmat, this._tmat);
            this._vdirty = true;
        }

        private _valsToMat() {
            var m = this._tmat;

            var sx = this._scaleX;
            var sy = this._scaleY;
            var sz = this._scaleZ;

            var r = -0.01745329252;
            var a = this._rotationX * r;	// alpha
            var b = this._rotationY * r;	// beta
            var g = this._rotationZ * r;	// gama

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
        }

        private _matToVals() {
            var a = this._tmat;

            var a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[4], a11 = a[5], a12 = a[6],
                a20 = a[8], a21 = a[9], a22 = a[10];

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
        }

        public _checkVals() {
            if (this._vdirty) {
                this._matToVals();
                this._vdirty = false;
            }
        }

        private _checkMat() {
            if (this._mdirty) {
                this._valsToMat();
                this._mdirty = false;
            }
        }

        private _setOPos() {
            var m = this._tmat;
            this._obj.x = m[12];
            this._obj.y = m[13];
            this._obj.z = m[14];
        }

        public _checkColorID() {
            var m = this._cmat;
            var v = this._cvec;
            this._cID = m[15] == 1 &&
                m[0] == 1 && m[1] == 0 && m[2] == 0 && m[3] == 0 &&
                m[4] == 0 && m[5] == 1 && m[6] == 0 && m[7] == 0 &&
                m[8] == 0 && m[9] == 0 && m[10] == 1 && m[11] == 0 &&
                m[12] == 0 && m[13] == 0 && m[14] == 0 && m[15] == 1 &&
                v[0] == 0 && v[1] == 0 && v[2] == 0 && v[3] == 0;
        }

        private _setMat3(m3) {
            var m4 = this._tmat;
            m4[0] = m3[0];
            m4[1] = m3[1];
            m4[4] = m3[3];
            m4[5] = m3[4];
            m4[12] = m3[6];
            m4[13] = m3[7];
        }

        private _getMat3(m3) {
            var m4 = this._tmat;
            m3[0] = m4[0];
            m3[1] = m4[1];
            m3[3] = m4[4];
            m3[4] = m4[5];
            m3[6] = m4[12];
            m3[7] = m4[13];
        }

        private _setCMat5(m5) {
            var m4 = this._cmat, v4 = this._cvec;
            for (var i = 0; i < 4; i++) {
                v4[i] = m5[20 + i];
                for (var j = 0; j < 4; j++) m4[4 * i + j] = m5[5 * i + j];
            }
        }

        private _getCMat5(m5) {
            var m4 = this._cmat, v4 = this._cvec;
            m5[24] = 1;
            for (var i = 0; i < 4; i++) {
                m5[20 + i] = v4[i];
                for (var j = 0; j < 4; j++) m5[5 * i + j] = m4[4 * i + j];
            }
        }

        set matrix(m) {
            this._checkMat();
            this._setMat3(m);
            this._setOPos();
            this._vdirty = true;
        }

        get matrix() {
            this._checkMat();
            var m = new Float32Array(9);
            this._getMat3(m);
            return m;
        }

        set matrix3D (m) {
            this._checkMat();
            Point_m4.set(m, this._tmat);
            this._setOPos();
            this._vdirty = true;
        }

        get matrix3D () {
            this._checkMat();
            return Point_m4.create(this.getTMat());
        }

        set colorTransform (m) {
            this._setCMat5(m);
            this._checkColorID();
        }

        get colorTransform () {
            var m = new Float32Array(25);
            this._getCMat5(m);
            return m;
        }

        set obj(o) {
            this._obj = o;
        }

    }

}
