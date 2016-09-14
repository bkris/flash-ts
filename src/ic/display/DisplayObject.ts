namespace ic.display {

    import EventDispatcher = ic.events.EventDispatcher;
    import Event = ic.events.Event;
    import Transform = ic.geom.Transform;
    import Rectangle = ic.geom.Rectangle;
    import Point = ic.geom.Point;
    import Point_v4 = ic.geom.Point_v4;
    import Point_m4 = ic.geom.Point_m4;

    export class DisplayObject extends EventDispatcher {

        public visible: boolean;
        public parent: DisplayObject;
        public stage:Stage;
        public transform: Transform;
        public blendMode: string;

        public x: number;
        public y: number;
        public z: number;

        protected _trect: Rectangle;
        protected _tempP: Point;
        protected _torg;
        protected _tvec4_0;
        protected _tvec4_1;
        protected _tempm;

        protected _atsEv: Event;
        protected _rfsEv: Event;

        private static _tdo: DisplayObject;

        //region Public functions

        public constructor() {
            super();

            this.visible = true;

            this.parent = null;
            this.stage = null;

            this.transform = new Transform();
            this.transform.obj = this;

            this.blendMode = BlendMode.NORMAL;

            //*
            //	for fast access
            this.x = 0;
            this.y = 0;
            this.z = 0;
            //*/

            this._trect = new Rectangle();	// temporary rectangle

            this._tempP = new Point();
            this._torg = Point_v4.create();
            this._tvec4_0 = Point_v4.create();
            this._tvec4_1 = Point_v4.create();

            this._tempm = Point_m4.create();

            this._atsEv = new Event(Event.ADDED_TO_STAGE);
            this._rfsEv = new Event(Event.REMOVED_FROM_STAGE);
            this._atsEv.target = this._rfsEv.target = this;
        }

        public dispatchEvent(e: Event) {
            super.dispatchEvent(e);
            if (e.bubbles && this.parent != null) this.parent.dispatchEvent(e);
        }

        public globalToLocal(p: Point) {
            var lp = new Point();
            this._globalToLocal(p, lp);
            return lp;
        }

        public localToGlobal(p: Point) {
            var org = this._torg;
            Stage.main._getOrigin(org);

            var p1 = this._tvec4_1;
            p1[0] = p.x;
            p1[1] = p.y;
            p1[2] = 0;
            p1[3] = 1;
            Point_m4.multiplyVec4(this._getAbsoluteTransformMatrix(), p1, p1);

            var lp = new Point();
            this._lineIntersection(org, p1, lp);
            return lp;
        }

        // no strokes
        public getRect(tcs) {
            return this._getR(tcs, false).clone();
        }

        // with strokes
        public getBounds(tcs) {
            return this._getR(tcs, true).clone();
        }

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
        public hitTestPoint(x:number, y:number, shapeFlag:boolean = false) {
            //if (shapeFlag == null) shapeFlag = false;
            var org = this._torg;
            Stage.main._getOrigin(org);
            Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), org, org);

            var p1 = this._tvec4_1;
            p1[0] = x;
            p1[1] = y;
            p1[2] = 0;
            p1[3] = 1;
            Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), p1, p1);

            //  org and p1 are in local coordinates
            //  now we have to decide, if line (p0, p1) intersects an object

            if (shapeFlag)   return this._htpLocal(org, p1);
            else            return this._getR(Stage.main, false).contains(x, y);
        }

        /**
         * Evaluates the bounding box of the display object to see if it overlaps or intersects with the bounding box of the obj display object.
         * @param obj The display object to test against.
         * @returns {boolean} if the bounding boxes of the display objects intersect; false if not.
         */
        public hitTestObject(obj):boolean {
            var r0 = this._getR(Stage.main, false);
            var r1 = obj._getR(Stage.main, false);
            return r0.intersects(r1);
        }

        //endregion
        //region Protected functions

        /**
         * Intersection between line p0, p1 and plane z=0  (result has z==0)
         * @param p0
         * @param p1
         * @param tp
         * @private
         */
        protected _lineIntersection(p0: Point, p1: Point, tp: Point) {
            var dx = p1[0] - p0[0], dy = p1[1] - p0[1], dz = p1[2] - p0[2];

            var len = Math.sqrt(dx * dx + dy * dy + dz * dz);
            dx /= len;
            dy /= len;
            dz /= len;

            var d = -p0[2] / dz;
            tp.x = p0[0] + d * dx;
            tp.y = p0[1] + d * dy;
        }

        protected _transfRect(mat, torg, srct, trct) {
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
        }

        protected _getLocRect(): Rectangle {
            // TODO: not sure about this
            return this._trect;
        }

        /**
         * Returns bounding rectangle
         * @param tmat matrix from global to target local
         * @param torg origin in tmat coordinates
         * @param stks
         * @returns {Rectangle}
         * @private
         * result: read-only
         */
        protected _getRect(tmat, torg, stks) {
            Point_m4.multiply(tmat, this._getAbsoluteTransformMatrix(), this._tempm);
            this._transfRect(this._tempm, torg, this._getLocRect(), this._trect);
            return this._trect;
        }

        /**
         * Check, whether object hits a line org, p in local coordinate system
         * @param org
         * @param p
         * @returns {boolean}
         * @private
         */
        protected _htpLocal(org, p) {
            var tp = this._tempP;
            this._lineIntersection(org, p, tp);
            return this._getLocRect().contains(tp.x, tp.y);
        }

        /**
         * Returns the deepest InteractiveObject of subtree with mouseEnabled = true  OR itself, if "hit over" and mouseEnabled = false
         * @param porg
         * @param pp
         * @returns {null}
         * @private
         */
        protected _getTarget(porg, pp) {
            return null;
        }

        /**
         * This method renders the current content
         */
        protected _render(stage) {
        }

        /**
         * This method renders the whole object
         */
        protected _renderAll(stage) {
            if (!this.visible) return;

            this._preRender(stage);
            this._render(stage);
            stage._mstack.pop();
            stage._cmstack.pop();
        }

        /**
         * Absolute Transform matrix
         * @returns {any}
         * @private
         */
        protected _getAbsoluteTransformMatrix() {
            if (this.parent == null) return this.transform.getTMat();
            Point_m4.multiply(this.parent._getAbsoluteTransformMatrix(), this.transform.getTMat(), this.transform._atmat);
            return this.transform._atmat;
        }

        protected setStage(stage:Stage) {
            var previousStage:Stage = this.stage;
            this.stage = stage;
            if (previousStage == null && stage != null) this.dispatchEvent(this._atsEv);
            if (previousStage != null && stage == null) this.dispatchEvent(this._rfsEv);
        }

        protected _loseFocus() {
        }

        //endregion
        //region Private functions
        private _globalToLocal(sp: Point, tp: Point) {
            var org = this._torg;
            Stage.main._getOrigin(org);
            Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), org, org);

            var p1 = this._tvec4_1;
            p1[0] = sp.x;
            p1[1] = sp.y;
            p1[2] = 0;
            p1[3] = 1;
            Point_m4.multiplyVec4(this._getAbsoluteInverseMatrix(), p1, p1);

            this._lineIntersection(org, p1, tp);
        }

        /**
         * Absolute Inverse Transform matrix
         * @returns {any}
         * @private
         */
        private _getAbsoluteInverseMatrix() {
            if (this.parent == null) return this.transform._getIMat();
            Point_m4.multiply(this.transform._getIMat(), this.parent._getAbsoluteInverseMatrix(), this.transform._aimat);
            return this.transform._aimat;
        }

        private _getMouse():Point {
            var lp = this._tempP;
            lp.setTo(Stage._mouseX, Stage._mouseY);
            this._globalToLocal(lp, lp);
            return lp;
        }

        private _getR(tcs, stks) {
            Stage.main._getOrigin(this._torg);
            Point_m4.multiplyVec4(tcs._getAbsoluteInverseMatrix(), this._torg, this._torg);
            return this._getRect(tcs._getAbsoluteInverseMatrix(), this._torg, stks);
        }

        private _getParR(tcs, stks) {
            if (DisplayObject._tdo == null) DisplayObject._tdo = new DisplayObject();
            var nopar = this.parent == null;
            if (nopar) this.parent = DisplayObject._tdo;
            var out = this._getR(this.parent, stks);
            if (nopar) this.parent = null;
            return out;
        }

        /**
         * Adds a drawing matrix onto the OpenGL stack
         */
        private _preRender(stage) {
            var matrix = this.transform.getTMat();
            stage._mstack.push(matrix);
            stage._cmstack.push(this.transform._cmat, this.transform._cvec, this.transform._cID, this.blendMode);
        }

        //endregion
        //region Getters Setters functions

        set scaleX(sx:number) {
            this.transform._checkVals();
            this.transform._scaleX = sx;
            this.transform._mdirty = true;
        }
        set scaleY(sy:number) {
            this.transform._checkVals();
            this.transform._scaleY = sy;
            this.transform._mdirty = true;
        }
        set scaleZ(sz:number) {
            this.transform._checkVals();
            this.transform._scaleZ = sz;
            this.transform._mdirty = true;
        }

        get scaleX():number {
            this.transform._checkVals();
            return this.transform._scaleX;
        }
        get scaleY():number {
            this.transform._checkVals();
            return this.transform._scaleY;
        }
        get scaleZ():number {
            this.transform._checkVals();
            return this.transform._scaleZ;
        }

        set rotationX(r:number) {
            this.transform._checkVals();
            this.transform._rotationX = r;
            this.transform._mdirty = true;
        }
        set rotationY(r:number) {
            this.transform._checkVals();
            this.transform._rotationY = r;
            this.transform._mdirty = true;
        }
        set rotationZ(r:number) {
            this.transform._checkVals();
            this.transform._rotationZ = r;
            this.transform._mdirty = true;
        }


        set rotation(r:number) {
            this.transform._checkVals();
            this.transform._rotationZ = r;
            this.transform._mdirty = true;
        }
        get rotation():number {
            this.transform._checkVals();
            return this.transform._rotationZ;
        }


        get rotationX():number {
            this.transform._checkVals();
            return this.transform._rotationX;
        }
        get rotationY():number {
            this.transform._checkVals();
            return this.transform._rotationY;
        }
        get rotationZ():number {
            this.transform._checkVals();
            return this.transform._rotationZ;
        }


        set width(w:number) {
            var ow = this.width;
            this.transform._postScale(w / ow, 1);
        }
        get width():number {
            this.transform._checkVals();
            return this._getParR(this, true).width;
        }


        set height(h:number) {
            var oh = this.height;
            this.transform._postScale(1, h / oh);
        }
        get height():number {
            this.transform._checkVals();
            return this._getParR(this, true).height;
        }


        set alpha(value: number) {
            this.transform._cmat[15] = value;
            this.transform._checkColorID();
        }
        get alpha():number {
            return this.transform._cmat[15];
        }


        get mouseX():number {
            return this._getMouse().x;
        }
        get mouseY():number {
            return this._getMouse().y;
        }

        //endregion functions
    }

    export const BlendMode =
    {
        NORMAL: "normal",
        ADD: "add",
        SUBTRACT: "subtract",
        MULTIPLY: "multiply",
        SCREEN: "screen",

        ERASE: "erase",
        ALPHA: "alpha"
    }
}
