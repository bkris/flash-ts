namespace ic.geom {

    export class Vector3D {

        public x:number;
        public y:number;
        public z:number;
        public w:number;

        public constructor(x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 0.0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        public add(p:Vector3D):Vector3D {
            return new Vector3D(this.x + p.x, this.y + p.y, this.z + p.z, this.w + p.w);
        }

        public clone():Vector3D {
            return new Vector3D(this.x, this.y, this.z, this.w);
        }

        public copyFrom(p:Vector3D) {
            this.x = p.x;
            this.y = p.y;
            this.z = p.z;
            this.w = p.w;
        }

        public equals(p:Vector3D):boolean {
            return (this.x == p.x && this.y == p.y && this.z == p.z);
        }

        public normalize():number {
            var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            this.x *= 1 / l;
            this.y *= 1 / l;
            this.z *= 1 / l;
            return l;
        }

        public setTo(xa:number, ya:number, za:number):void {
            this.x = xa;
            this.y = ya;
            this.z = za;
        }

        public subtract(p:Vector3D):Vector3D {
            return new Vector3D(this.x - p.x, this.y - p.y, this.z - p.z, 0);
        }

        public static distance(a:Vector3D, b:Vector3D):number {
            return Vector3D._distance(a.x, a.y, a.z, b.x, b.y, b.z);
        }

        protected static _distance(x1:number, y1:number, z1:number, x2:number, y2:number, z2:number):number {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
        }

    }
}
