namespace ic.display {

    import Point_m4 = ic.geom.Point_m4;
    import Rectangle = ic.geom.Rectangle;

    export class Sprite extends DisplayObjectContainer {

        public graphics: Graphics;

        private _trect2: Rectangle;

        public constructor() {
            super();

            this._trect2 = new Rectangle();
            this.graphics = new Graphics();
        }

        protected _getRect(tmat, torg, stks) {
            var r1 = super._getRect(tmat, torg, stks);
            var r2 = this.graphics.getLocRect(stks);

            Point_m4.multiply(tmat, this._getAbsoluteTransformMatrix(), this._tempm);
            this._transfRect(this._tempm, torg, r2, this._trect2);
            return r1.union(this._trect2);
        }


        protected _render(st) {
            this.graphics.render(st);
            super._render(st);
        }

        protected _getTarget(porg, pp) {
            if (!this.visible || (!this.mouseChildren && !this.mouseEnabled)) return null;

            var tgt = super._getTarget(porg, pp);

            if (tgt != null) return tgt;

            if (!this.mouseEnabled) return null;

            var org = this._tvec4_0, p = this._tvec4_1, im = this.transform._getIMat();
            Point_m4.multiplyVec4(im, porg, org);
            Point_m4.multiplyVec4(im, pp, p);

            var pt = this._tempP;
            this._lineIntersection(org, p, pt);

            if (this.graphics._hits(pt.x, pt.y)) return this;
            return null;
        }

        protected _htpLocal(org, p) {
            var tp = this._tempP;
            this._lineIntersection(org, p, tp);

            if (this.graphics._hits(tp.x, tp.y)) return true;
            return super._htpLocal(org, p);
        }
    }
}