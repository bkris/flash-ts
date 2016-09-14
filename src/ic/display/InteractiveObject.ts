///<reference path="DisplayObject.ts"/>
///<reference path="../geom/Point.ts"/>

namespace ic.display {

    import Point_m4 = ic.geom.Point_m4;

    export class InteractiveObject extends DisplayObject {

        public buttonMode: boolean;
        public mouseEnabled: boolean;
        public mouseChildren: boolean;

        public constructor() {
            super();

            this.buttonMode = false;
            this.mouseEnabled = true;
            this.mouseChildren = true;
        }

        protected _getTarget(porg, pp) {
            if (!this.visible || !this.mouseEnabled) return null;

            var r = this._getLocRect();
            if (r == null) return null;

            var org = this._tvec4_0, p = this._tvec4_1;
            Point_m4.multiplyVec4(this.transform._getIMat(), porg, org);
            Point_m4.multiplyVec4(this.transform._getIMat(), pp, p);

            var pt = this._tempP;
            this._lineIntersection(org, p, pt);

            if (r.contains(pt.x, pt.y)) return this;
            return null;
        }

    }
}