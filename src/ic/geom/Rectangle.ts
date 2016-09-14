namespace ic.geom {

    export class Rectangle {

        static _temp = new Float32Array(2);

        public x: number;
        public y: number;
        public width: number;
        public height: number;

        public constructor(x:number = 0, y:number = 0, w:number = 0, h:number = 0) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }

        public clone() {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }

        public contains(x: number, y: number):boolean {
            return (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height);
        }

        public containsPoint(p: Point):boolean {
            return this.contains(p.x, p.y);
        }

        public containsRect(r: Rectangle):boolean {
            return (this.x <= r.x && this.y <= r.y && r.x + r.width <= this.x + this.width && r.y + r.height <= this.y + this.height);
        }

        public copyFrom(r: Rectangle) {
            this.x = r.x;
            this.y = r.y;
            this.width = r.width;
            this.height = r.height;
        }

        public equals(r: Rectangle):boolean {
            return (this.x == r.x && this.y == r.y && this.width == r.width && this.height == r.height);
        }

        public inflate(dx: number, dy: number) {
            this.x -= dx;
            this.y -= dy;
            this.width += 2 * dx;
            this.height += 2 * dy;
        }

        public inflatePoint(p: Point) {
            this.inflate(p.x, p.y);
        }

        public intersection(rec: Rectangle):Rectangle	// : Boolean
        {
            var l = Math.max(this.x, rec.x);
            var u = Math.max(this.y, rec.y);
            var r = Math.min(this.x + this.width, rec.x + rec.width);
            var d = Math.min(this.y + this.height, rec.y + rec.height);
            if (r < l || d < u) return new Rectangle();
            else return new Rectangle(l, u, r - l, d - u);
        }

        public intersects(r: Rectangle): boolean	// : Boolean
        {
            return !(r.y + r.height < this.y || r.x > this.x + this.width || r.y > this.y + this.height || r.x + r.width < this.x);

        }

        public isEmpty(): boolean {
            return (this.width <= 0 || this.height <= 0);
        }

        public offset(dx: number, dy: number) {
            this.x += dx;
            this.y += dy;
        }

        public offsetPoint(p) {
            this.offset(p.x, p.y)
        }

        public setEmpty() {
            this.x = this.y = this.width = this.height = 0;
        }

        public setTo(x: number, y: number, w: number, h: number) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
        }

        public union(r: Rectangle): Rectangle	// : Rectangle
        {
            if (this.isEmpty()) return r.clone();
            if (r.isEmpty()) return this.clone();
            var nr = this.clone();
            nr.unionWith(r);
            return nr;
        }

        public unionWith(r: Rectangle) // : void
        {
            if (r.isEmpty()) return;
            if (this.isEmpty()) {
                this.copyFrom(r);
                return;
            }
            this._unionWP(r.x, r.y);
            this._unionWP(r.x + r.width, r.y + r.height);
        }

        private _unionWP(x: number, y: number)	// union with point
        {
            var minx = Math.min(this.x, x);
            var miny = Math.min(this.y, y);
            this.width = Math.max(this.x + this.width, x) - minx;
            this.height = Math.max(this.y + this.height, y) - miny;
            this.x = minx;
            this.y = miny;
        }

        private _unionWL(x0: number, y0: number, x1: number, y1: number)	// union with point
        {
            if (this.width == 0 && this.height == 0) this._setP(x0, y0);
            else  this._unionWP(x0, y0);
            this._unionWP(x1, y1);
        }


        private _setP(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.width = this.height = 0;
        }
    }

}
