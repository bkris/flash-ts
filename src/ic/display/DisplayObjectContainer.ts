namespace ic.display {

    import Rectangle = ic.geom.Rectangle;
    import Point_m4 = ic.geom.Point_m4;

    export class DisplayObjectContainer extends InteractiveObject {

        public numChildren:number;

        private _tempR:Rectangle;
        private _children:Array<any>;

        public constructor() {
            super();

            this._tempR = new Rectangle();

            this.numChildren = 0;
            this._children = [];
        }

        protected _getRect(tmat, torg, stks) {
            var r = this._trect;
            r.setEmpty();

            for (var i = 0; i < this.numChildren; i++) {
                var ch = this._children[i];
                if (!ch.visible) continue;
                r.unionWith(ch._getRect(tmat, torg, stks));
            }
            return r;
        }

        protected _htpLocal(org, p) {
            var n = this._children.length;
            for (var i = 0; i < n; i++) {
                var ch = this._children[i];
                if (!ch.visible) continue;
                var corg = ch._tvec4_0, cp = ch._tvec4_1, im = ch.transform._getIMat();
                Point_m4.multiplyVec4(im, org, corg);
                Point_m4.multiplyVec4(im, p, cp);
                return ch._htpLocal(corg, cp);
            }
            return false;
        }


        /**
         * Adds a child to the container
         *
         * @param child - child object to be added
         */
        public addChild(child) {
            this._children.push(child);
            child.parent = this;
            child.setStage(this.stage);
            ++this.numChildren;
        }

        /**
         * Removes a child from the container
         *
         * @param child    a child object to be removed
         */
        public removeChild(child) {
            var ind = this._children.indexOf(child);
            if (ind < 0) return;
            this._children.splice(ind, 1);
            child.parent = null;
            child.setStage(null);
            --this.numChildren;
        }

        public removeChildAt(i) {
            this.removeChild(this._children[i]);
        }

        /**
         * Checks, if a container contains a certain child
         *
         * @param o    an object for which we check, if it is contained or not
         * @return    true if contains, false if not
         */
        public contains(o) {
            return (this._children.indexOf(o) >= 0);
        }

        public getChildIndex(o) {
            return this._children.indexOf(o);
        }

        /**
         * Sets the child index in the current children list.
         * Child index represents a "depth" - an order, in which children are rendered
         *
         * @param c1    a child object
         * @param i2    a new depth value
         */
        public setChildIndex(c1, i2) {
            var i1 = this._children.indexOf(c1);

            if (i2 > i1) {
                for (var i = i1 + 1; i <= i2; i++) this._children[i - 1] = this._children[i];
                this._children[i2] = c1;
            }
            else if (i2 < i1) {
                for (var i = i1 - 1; i >= i2; i--) this._children[i + 1] = this._children[i];
                this._children[i2] = c1;
            }
        }


        /**
         * Returns the child display object instance that exists at the specified index.
         *
         * @param i    index (depth)
         * @return    an object at this index
         */
        public getChildAt(i) {
            return this._children[i];
        }


        protected _render(stage) {
            for (var i = 0; i < this.numChildren; i++) this._children[i]._renderAll(stage);
        }


        protected _getTarget(parentOrigin, parentPoint)	// parent origin, parent point
        {
            if (!this.visible || (!this.mouseChildren && !this.mouseEnabled)) return null;

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
            if (!this.mouseChildren && topTGT != null) return this;
            return topTGT;
        }

        protected setStage(stage) {
            super.setStage(stage);
            for (var i = 0; i < this.numChildren; i++) this._children[i].setStage(stage);
        }
    }
}

