namespace ic.display {

    import Rectangle = ic.geom.Rectangle;
    import EventDispatcher = ic.events.EventDispatcher;
    import Event = ic.events.Event;

    declare class CanvasPixelArray {}

    export class BitmapData {

        public width: number;
        public height: number;
        public rect: Rectangle;
        public loader: EventDispatcher;
        public loaded;

        private _rwidth;
        private _rheight;
        private _rrect;
        public texture;
        public tcBuffer;
        public vBuffer;
        public dirty;
        private _gpuAllocated;
        private _buffer;
        private _ubuffer;

        private static _canv = document.createElement("canvas");
        private static _ctx = BitmapData._canv.getContext("2d");

        protected static fbo:WebGLFramebuffer;

        //region Public functions

        public constructor(imgURL: string) {

            this.width = 0;							// size of texture
            this.height = 0;

            this.rect = new Rectangle();
            this.loader = new EventDispatcher();
            (<any>this.loader).bitmapData = this;
            //this.loader.bytesLoaded = 0;
            //this.loader.bytesTotal = 0;

            this._rwidth = 0;						// real size of bitmap in memory (power of two)
            this._rheight = 0;
            this._rrect = null;
            this.texture = null;
            this.tcBuffer = null;		//	texture coordinates buffer
            this.vBuffer = null;		//	four vertices of bitmap
            this.loaded = false;
            this.dirty = true;
            this._gpuAllocated = false;
            this._buffer = null;					//  Uint8 container for texture
            this._ubuffer = null;					//  Uint32 container for texture

            /*
             this._opEv = new Event(Event.OPEN);
             this._pgEv = new Event(Event.PROGRESS);
             this._cpEv = new Event(Event.COMPLETE);

             this._opEv.target = this._pgEv.target = this._cpEv.target = this.loader;
             */

            if (imgURL == null) return;

            var img = document.createElement("img");
            img.crossOrigin = "Anonymous";
            img.onload = function (e) {
                this._initFromImg(img, img.width, img.height);
                var ev = new Event(Event.COMPLETE);
                this.loader.dispatchEvent(ev);
            }.bind(this);
            img.src = imgURL;
        }

        public static empty(w, h, fc) {
            if (fc == null) fc = 0xffffffff;
            var bd = new BitmapData(null);
            bd._initFromImg(null, w, h, fc);
            return bd;
        }

        public setPixel(x, y, color) {
            var i = y * this.width + x, b = this._ubuffer;
            b[i] = (b[i] & 0xff000000) + color;
            this.dirty = true;
        }

        public setPixel32(x, y, color) {
            var i = y * this.width + x;
            this._ubuffer[i] = color;
            this.dirty = true;
        }

        public setPixels(r, buff) {
            this._copyRectBuff(buff, r, this._buffer, this.rect);
            this.dirty = true;
        }

        public getPixel(x, y) {
            var i = y * this.width + x;
            return this._ubuffer[i] & 0xffffff;
        }

        public getPixel32(x, y) {
            var i = y * this.width + x;
            return this._ubuffer[i];
        }

        public getPixels(r, buff) {
            if (!buff) buff = new Uint8Array(r.width * r.height * 4);
            this._copyRectBuff(this._buffer, this.rect, buff, r);
            return buff;
        }

        public draw(dobj) {
            if (this.dirty) this.syncWithGPU();
            this._setTexAsFB();
            Stage.setTEX(null);
            dobj._render(Stage.main);

            var buff = this._buffer, r = this.rect;
            gl.readPixels(r.x, r.y, r.width, r.height, gl.RGBA, gl.UNSIGNED_BYTE, buff);
            Stage.main._setFramebuffer(null, Stage.main.stageWidth, Stage.main.stageHeight, false);

            Stage.setTEX(this.texture);
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        public syncWithGPU() {
            var r = this.rect, buff = this._buffer;

            if (!this._gpuAllocated) {
                var w = r.width, h = r.height;
                var xsc = w / this._rwidth;
                var ysc = h / this._rheight;

                this.texture = gl.createTexture();
                this.tcBuffer = gl.createBuffer();		//	texture coordinates buffer
                this.vBuffer = gl.createBuffer();		//	four vertices of bitmap

                Stage.setBuffer(this.tcBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, xsc, 0, 0, ysc, xsc, ysc]), gl.STATIC_DRAW);

                Stage.setBuffer(this.vBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, w, 0, 0, 0, h, 0, w, h, 0]), gl.STATIC_DRAW);

                var ebuff = new Uint8Array(this._rwidth * this._rheight * 4);
                var ebuff32 = new Uint32Array(ebuff.buffer);
                for (var i = 0; i < ebuff32.length; i++) ebuff32[i] = 0x00ffffff;

                Stage.setTEX(this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
                    this._rwidth, this._rheight, 0, gl.RGBA,
                    gl.UNSIGNED_BYTE, ebuff);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                this._gpuAllocated = true;
            }

            Stage.setTEX(this.texture);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, r.x, r.y, r.width, r.height, gl.RGBA, gl.UNSIGNED_BYTE, buff);
            gl.generateMipmap(gl.TEXTURE_2D);
            this.dirty = false;
        }

        //endregion
        //region Private functions

        private _initFromImg(img, w, h, fc) {
            this.loaded = true;
            this.width = w;		// image width
            this.height = h;		// image.height
            this.rect = new Rectangle(0, 0, w, h);
            this._rwidth = BitmapData._nhpot(w);	// width - power of Two
            this._rheight = BitmapData._nhpot(h);	// height - power of Two
            this._rrect = new Rectangle(0, 0, this._rwidth, this._rheight);

            var cnv = BitmapData._canv;
            cnv.width = w;
            cnv.height = h;
            var ctx = BitmapData._ctx;
            if (img != null) ctx.drawImage(img, 0, 0);
            var imgd = ctx.getImageData(0, 0, w, h);

            if ((<any>window).CanvasPixelArray && imgd.data instanceof CanvasPixelArray)	// old standard, implemented in IE11
            {
                this._buffer = new Uint8Array(imgd.data);
            }
            else this._buffer = new Uint8Array(imgd.data.buffer);

            this._ubuffer = new Uint32Array(this._buffer.buffer);	// another ArrayBufferView for the same buffer4

            if (img == null) for (var i = 0, b = this._ubuffer; i < b.length; i++) b[i] = fc;
        }

        private _copyRectBuff(sc, sr, tc, tr) // from buffer, from rect, to buffer, to rect
        {
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
        }

        private _setTexAsFB() {
            if (BitmapData.fbo == null) {
                BitmapData.fbo = gl.createFramebuffer();
                var rbo = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, rbo);
                gl.bindFramebuffer(gl.FRAMEBUFFER, BitmapData.fbo);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rbo);
            }

            Stage.main._setFramebuffer(BitmapData.fbo, this._rwidth, this._rheight, true);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        }

        private static _ipot(x) {
            return (x & (x - 1)) == 0;
        }

        private static _nhpot(x) {
            --x;
            for (var i = 1; i < 32; i <<= 1)   x = x | x >> i;
            return x + 1;
        }

        //endregion
    }
}