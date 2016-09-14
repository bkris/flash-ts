///<reference path="../display/InteractiveObject.ts"/>
///<reference path="../display/Stage.ts"/>
///<reference path="../geom/Rectangle.ts"/>
///<reference path="../events/Event.ts"/>

namespace ic.text {

    import gl = ic.display.gl;
    import InteractiveObject = ic.display.InteractiveObject;
    import Stage = ic.display.Stage;
    import Rectangle = ic.geom.Rectangle;
    import KeyboardEvent = ic.events.KeyboardEvent;
    import MouseEvent = ic.events.MouseEvent;
    import Event = ic.events.Event;

    export class TextField extends InteractiveObject {

        private _textArea: HTMLTextAreaElement;
        private _textAreaAdded;
        private _stage: Stage;
        private _type;
        private _selectable: boolean;
        private _mouseDown: boolean;
        private _cursorPosition;
        private _select;
        private _metrics;
        private _wordWrap: boolean;
        private _textWidth: number;
        private _textHeight: number;
        private _areaWidth: number;
        private _areaHeight: number;
        private _text: string;
        private _textFormat: TextFormat;
        private _rwidth;
        private _rheight;
        private _background;
        private _border;
        private _texture: WebGLTexture;
        private _tcArray;
        private _textureCoordinateBuffer;
        private _fArray;
        private _vertexBuffer;
        private _brect: Rectangle;

        public constructor() {
            super();

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
            this._select = null;	// selection
            this._metrics = null;		// metrics of rendered text
            this._wordWrap = false;	// wrap words
            this._textWidth = 0;		// width of text
            this._textHeight = 0;		// height of text
            this._areaWidth = 100;		// width of whole TF area
            this._areaHeight = 100;		// height of whole TF area
            this._text = "";		// current text
            this._textFormat = new TextFormat();
            this._rwidth = 0;
            this._rheight = 0;
            this._background = false;
            this._border = false;

            this._texture = gl.createTexture();	// texture
            this._tcArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]);
            this._textureCoordinateBuffer = gl.createBuffer();	// texture coordinates buffer
            Stage.setBuffer(this._textureCoordinateBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._tcArray, gl.STATIC_DRAW);

            this._fArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            this._vertexBuffer = gl.createBuffer();	// vertices buffer for 4 vertices
            Stage.setBuffer(this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._fArray, gl.STATIC_DRAW);

            this.addEventListener(Event.ADDED_TO_STAGE, this._onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this._onRemoveFromStage, this);
            this.addEventListener(MouseEvent.MOUSE_DOWN, this._onMouseDown, this);

            this.addEventListener(KeyboardEvent.KEY_UP, this._onKeyUp, this);

            this._brect = new Rectangle();
        }

        protected _getLocRect() {
            return this._brect;
        }

        protected _loseFocus() {
            if (this._textAreaAdded) document.body.removeChild(this._textArea);
            this._textAreaAdded = false;
            this._cursorPosition = -1;
            this._update();
        }

        private _onKeyUp(e: KeyboardEvent) {
            this._onInput(null);
        }

        private _onInput(e) {
            if (this._type != TextFieldType.INPUT) return;
            this._text = this._textArea.value;
            this._select = null;
            this._cursorPosition = this._textArea.selectionStart;
            this.setSelection(this._textArea.selectionStart, this._textArea.selectionEnd);
        }

        private _onAddToStage(e: Event) {
            this._stage = this.stage;
        }

        private _onRemoveFromStage(e: Event) {
            this._loseFocus();
        }

        private _onMouseDown(e: MouseEvent) {
            if (!this._selectable) return;
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
        }

        private _onMouseMove(e: MouseEvent) {
            if (!this._selectable || !this._mouseDown) return;
            var ind = this.getCharIndexAtPoint(this.mouseX, this.mouseY);
            this.setSelection(this._cursorPosition, ind);
        }

        private _onMouseUp(e: MouseEvent) {
            if (!this._selectable) return;
            //var sel = this._select;
            //if(sel) if(sel.from != sel.to) this._textArea.setSelectionRange(sel.from, sel.to);
            //this.setSelection(this._cursorPosition, ind);
            this._mouseDown = false;

            if (this._type == TextFieldType.INPUT) this._textArea.focus();

            this._stage.removeEventListener(MouseEvent.MOUSE_MOVE, this._onMouseMove);
            this._stage.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUp);
        }

        public appendText(newText:string) {
            this._text += newText;
            this._update();
        }

        public getCharBoundaries(charIndex) {
            //if(charIndex>=this._text.length) {var lw =  return new Rectangle(0,0,30,30);}
            var ctx = TextFormat.context;
            this._textFormat.setContext(ctx);
            var m = this._metrics;
            var l = this.getLineIndexOfChar(charIndex);
            if (m[l].words.length == 0) return new Rectangle(m[l].x, m[l].y, m[l].width, m[l].height);
            var w = 0;
            while (w + 1 < m[l].words.length && m[l].words[w + 1].charOffset <= charIndex) w++;
            var word = m[l].words[w];
            var pref = word.word.substring(0, charIndex - word.charOffset);
            var rect = new Rectangle(word.x + ctx.measureText(pref).width, word.y, 0, word.height);
            rect.width = ctx.measureText(this._text.charAt(charIndex)).width;
            var nw = m[l].words[w + 1];
            if (nw && nw.charOffset == charIndex + 1) rect.width = nw.x - rect.x;
            return rect;
        }

        public getCharIndexAtPoint(x: number, y: number) {
            if (this._text.length == 0) return 0;
            var ctx = TextFormat.context;
            this._textFormat.setContext(ctx);
            var m = this._metrics;
            var l = this.getLineIndexAtPoint(x, y);
            x = Math.max(m[l].x, Math.min(m[l].x + m[l].width, x));
            var w = 0;
            while (w + 1 < m[l].words.length && m[l].words[w + 1].x <= x) w++;
            var word = m[l].words[w];
            var ci = word.charOffset;
            var cx = word.x;
            while (true) {
                var cw = ctx.measureText(this._text.charAt(ci)).width;
                if (cx + cw * 0.5 < x && cw != 0) {
                    cx += cw;
                    ci++;
                }
                else break;
            }
            return ci;
        }

        public getLineIndexAtPoint(x:number, y:number) {
            var m = this._metrics;
            var index = 0;
            while (index + 1 < m.length && m[index + 1].y <= y) index++;
            return index;
        }

        public getLineIndexOfChar(charIndex:number):number {
            var m = this._metrics;
            var index = 0;
            while (index + 1 < m.length && m[index + 1].charOffset <= charIndex) index++;
            return index;
        }

        public getTextFormat():TextFormat {
            return this._textFormat.clone();
        }

        public setTextFormat(textFormat:TextFormat) {
            this._textFormat.set(textFormat);
            this._textArea.style.fontFamily = textFormat.font;
            this._textArea.style.fontSize = textFormat.size + "px";
            this._textArea.style.textAlign = textFormat.align;
            this._update();
        }

        public setSelection(begin:number, end:number) {
            var a = Math.min(begin, end), b = Math.max(begin, end), s = this._select;

            if (s == null || s.from != a || s.to != b) {
                this._select = {from: a, to: b};
                //this._textArea.setSelectionRange(a,b);
                this._textArea.selectionStart = a;
                this._textArea.selectionEnd = b;
                this._update();
            }
        }

        private _update() {
            var w = this._brect.width = this._areaWidth;
            var h = this._brect.height = this._areaHeight;

            if (w == 0 || h == 0) return;
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
        }

        protected _render(stage) {
            if (this._areaWidth == 0 || this._areaHeight == 0) return;

            gl.uniformMatrix4fv(stage._sprg.tMatUniform, false, stage._mstack.top());
            stage._cmstack.update();

            Stage.setVC(this._vertexBuffer);
            Stage.setTC(this._textureCoordinateBuffer);
            Stage.setUT(1);
            Stage.setTEX(this._texture);
            Stage.setEBF(stage._unitIBuffer);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        }

        get textWidth() {
            return this._textWidth;
        }

        get textHeight() {
            return this._textHeight;
        }

        set wordWrap(value:boolean) {
            this._wordWrap = value;
            this._update();
        }

        get wordWrap():boolean {
            return this._wordWrap;
        }

        set width(value:number) {
            this._areaWidth = Math.max(0, value);
            this._textArea.style.width = this._areaWidth + "px";
            this._update();
        }

        get width() {
            return this._areaWidth;
        }

        set height(x:number) {
            this._areaHeight = Math.max(0, x);
            this._textArea.style.height = this._areaHeight + "px";
            this._update();
        }

        get height() {
            return this._areaHeight;
        }

        set text(value:string) {
            this._text = value + "";
            this._update();
        }

        get text() {
            return this._text;
        }

        set selectable(x) {
            this._selectable = x;
            this._update();
        }

        get selectable() {
            return this._selectable;
        }

        set type(value:string) {
            this._type = value;
            this._update();
        }

        get type() {
            return this._type;
        }

        set background(value:boolean) {
            this._background = value;
            this._update();
        }

        get background() {
            return this._background;
        }

        set border(value:boolean) {
            this._border = value;
            this._update();
        }

        get border() {
            return this._border;
        }

    }

    const TextFieldType = {
        DYNAMIC : "dynamic",
        INPUT : "input"
    }
}
