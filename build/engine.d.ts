declare namespace ic.geom {
    class Point {
        x: number;
        y: number;
        static _v4: {};
        static _m4: {};
        constructor(x?: number, y?: number);
        add(point: Point): Point;
        clone(): Point;
        copyFrom(point: Point): void;
        equals(point: Point): boolean;
        normalize(tickness: number): void;
        offset(x: number, y: number): void;
        setTo(xa: number, ya: number): void;
        subtract(point: Point): Point;
        static distance(a: any, b: any): number;
        static interpolate(a: any, b: any, f: any): Point;
        static polar(len: any, ang: any): Point;
        private static _distance(x1, y1, x2, y2);
    }
    var Point_v4: {
        create: () => Float32Array;
        add: (a: any, b: any, out: any) => void;
        set: (a: any, out: any) => void;
    };
    var Point_m4: {
        create: (mat?: any) => Float32Array;
        set: (m: any, d: any) => void;
        multiply: (a: any, b: any, out: any) => any;
        inverse: (a: any, out: any) => any;
        multiplyVec2: (m: any, vec: any, dest: any) => void;
        multiplyVec4: (m: any, v: any, out: any) => void;
    };
}
declare namespace ic.geom {
    class Rectangle {
        static _temp: Float32Array;
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, w?: number, h?: number);
        clone(): Rectangle;
        contains(x: number, y: number): boolean;
        containsPoint(p: Point): boolean;
        containsRect(r: Rectangle): boolean;
        copyFrom(r: Rectangle): void;
        equals(r: Rectangle): boolean;
        inflate(dx: number, dy: number): void;
        inflatePoint(p: Point): void;
        intersection(rec: Rectangle): Rectangle;
        intersects(r: Rectangle): boolean;
        isEmpty(): boolean;
        offset(dx: number, dy: number): void;
        offsetPoint(p: any): void;
        setEmpty(): void;
        setTo(x: number, y: number, w: number, h: number): void;
        union(r: Rectangle): Rectangle;
        unionWith(r: Rectangle): void;
        private _unionWP(x, y);
        private _unionWL(x0, y0, x1, y1);
        private _setP(x, y);
    }
}
declare namespace ic.geom {
    class Transform {
        private _obj;
        _mdirty: any;
        _vdirty: any;
        private _tmat;
        private _imat;
        _atmat: any;
        _aimat: any;
        private _pscal;
        _cmat: any;
        _cvec: any;
        _cID: any;
        _scaleX: any;
        _scaleY: any;
        _scaleZ: any;
        _rotationX: any;
        _rotationY: any;
        _rotationZ: any;
        constructor();
        getTMat(): any;
        _getIMat(): any;
        _postScale(sx: any, sy: any): void;
        private _valsToMat();
        private _matToVals();
        _checkVals(): void;
        private _checkMat();
        private _setOPos();
        _checkColorID(): void;
        private _setMat3(m3);
        private _getMat3(m3);
        private _setCMat5(m5);
        private _getCMat5(m5);
        matrix: Float32Array;
        matrix3D: Float32Array;
        colorTransform: Float32Array;
        obj: any;
    }
}
declare namespace ic.events {
    class Event {
        static ENTER_FRAME: string;
        static RESIZE: string;
        static ADDED_TO_STAGE: string;
        static REMOVED_FROM_STAGE: string;
        static CHANGE: string;
        static OPEN: string;
        static PROGRESS: string;
        static COMPLETE: string;
        type: string;
        bubbles: boolean;
        target: any;
        currentTarget: any;
        constructor(type: string, bubbles?: boolean);
    }
}
declare namespace ic.events {
    class EventDispatcher {
        private _listeners;
        private _targetObjects;
        static efbc: any[];
        addEventListener(type: string, callback: Function, object?: Object): void;
        dispatchEvent(event: Event): void;
        hasEventListener(type: string): boolean;
        removeEventListener(type: string, callback: Function): void;
    }
}
declare namespace ic.events {
    class MouseEvent extends Event {
        static CLICK: string;
        static MOUSE_DOWN: string;
        static MOUSE_UP: string;
        static MIDDLE_CLICK: string;
        static MIDDLE_MOUSE_DOWN: string;
        static MIDDLE_MOUSE_UP: string;
        static RIGHT_CLICK: string;
        static RIGHT_MOUSE_DOWN: string;
        static RIGHT_MOUSE_UP: string;
        static MOUSE_MOVE: string;
        static MOUSE_OVER: string;
        static MOUSE_OUT: string;
        movementX: number;
        movementY: number;
        constructor(type: string, bubbles?: boolean);
    }
}
declare namespace ic.events {
    class TouchEvent extends Event {
        static TOUCH_BEGIN: string;
        static TOUCH_END: string;
        static TOUCH_MOVE: string;
        static TOUCH_OUT: string;
        static TOUCH_OVER: string;
        static TOUCH_TAP: string;
        stageX: number;
        stageY: number;
        touchPointID: any;
        constructor(type: string, bubbles?: boolean);
        _setFromDom(touchEvent: any): void;
    }
}
declare namespace ic.events {
    class KeyboardEvent extends Event {
        static KEY_DOWN: string;
        static KEY_UP: string;
        altKey: boolean;
        ctrlKey: boolean;
        shiftKey: boolean;
        keyCode: number;
        charCode: number;
        constructor(type: string, bubbles?: boolean);
        _setFromDom(event: any): void;
    }
}
declare namespace ic.display {
    class Graphics {
        static _delTgs: {};
        static _delNum: number;
        private _conf;
        private _points;
        private _fills;
        private _afills;
        private _lfill;
        private _rect;
        private _srect;
        constructor();
        private _startNewFill();
        private _startLine();
        private _endLine();
        render(st: any): void;
        lineStyle(thickness: any, color?: number, alpha?: number): void;
        beginFill(color: any, alpha?: number): void;
        beginBitmapFill(bdata: any): void;
        endFill(): void;
        moveTo(x: any, y: any): void;
        lineTo(x2: any, y2: any): void;
        curveTo(bx: any, by: any, cx: any, cy: any): void;
        cubicCurveTo(bx: any, by: any, cx: any, cy: any, dx: any, dy: any, parts?: number): void;
        drawCircle(x: any, y: any, r: any): void;
        drawEllipse(x: any, y: any, w: any, h: any): void;
        drawRect(x: any, y: any, w: any, h: any): void;
        drawRoundRect(x: any, y: any, w: any, h: any, ew: any, eh: any): void;
        drawTriangles(vrt: any, ind: any, uvt?: any): void;
        drawTriangles3D(vrt: any, ind: any, uvt: any): void;
        clear(): void;
        getLocRect(stks: any): any;
        _hits(x: any, y: any): boolean;
        static makeColor(c: any, a: any): Float32Array;
        static equalColor(a: any, b: any): boolean;
        static len(x: any, y: any): number;
        static makeTgs(vrt: any, ind: any, uvt: any, color: any, bdata?: any): any;
        private static _freeTgs(tgs);
    }
}
declare namespace ic.display {
    import EventDispatcher = ic.events.EventDispatcher;
    import Event = ic.events.Event;
    import Transform = ic.geom.Transform;
    import Rectangle = ic.geom.Rectangle;
    import Point = ic.geom.Point;
    class DisplayObject extends EventDispatcher {
        visible: boolean;
        parent: DisplayObject;
        stage: any;
        transform: Transform;
        blendMode: string;
        x: number;
        y: number;
        z: number;
        protected _trect: Rectangle;
        protected _tempP: Point;
        protected _torg: any;
        protected _tvec4_0: any;
        protected _tvec4_1: any;
        protected _tempm: any;
        protected _atsEv: Event;
        protected _rfsEv: Event;
        private static _tdo;
        constructor();
        dispatchEvent(e: Event): void;
        globalToLocal(p: Point): Point;
        localToGlobal(p: Point): Point;
        getRect(tcs: any): Rectangle;
        getBounds(tcs: any): Rectangle;
        hitTestPoint(x: number, y: number, shapeFlag?: boolean): boolean;
        hitTestObject(obj: any): boolean;
        protected _lineIntersection(p0: Point, p1: Point, tp: Point): void;
        protected _transfRect(mat: any, torg: any, srct: any, trct: any): void;
        protected _getLocRect(): Rectangle;
        protected _getRect(tmat: any, torg: any, stks: any): Rectangle;
        protected _htpLocal(org: any, p: any): boolean;
        protected _getTarget(porg: any, pp: any): any;
        protected _render(stage: any): void;
        protected _renderAll(stage: any): void;
        protected _getAbsoluteTransformMatrix(): any;
        protected setStage(stage: Stage): void;
        protected _loseFocus(): void;
        private _globalToLocal(sp, tp);
        private _getAbsoluteInverseMatrix();
        private _getMouse();
        private _getR(tcs, stks);
        private _getParR(tcs, stks);
        private _preRender(stage);
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        rotation: number;
        width: number;
        height: number;
        alpha: number;
        mouseX: number;
        mouseY: number;
    }
    const BlendMode: {
        NORMAL: string;
        ADD: string;
        SUBTRACT: string;
        MULTIPLY: string;
        SCREEN: string;
        ERASE: string;
        ALPHA: string;
    };
}
declare namespace ic.display {
    class InteractiveObject extends DisplayObject {
        buttonMode: boolean;
        mouseEnabled: boolean;
        mouseChildren: boolean;
        constructor();
        protected _getTarget(porg: any, pp: any): this;
    }
}
declare namespace ic.display {
    import Rectangle = ic.geom.Rectangle;
    class DisplayObjectContainer extends InteractiveObject {
        numChildren: number;
        private _tempR;
        private _children;
        constructor();
        protected _getRect(tmat: any, torg: any, stks: any): Rectangle;
        protected _htpLocal(org: any, p: any): any;
        addChild(child: any): void;
        removeChild(child: any): void;
        removeChildAt(i: any): void;
        contains(o: any): boolean;
        getChildIndex(o: any): number;
        setChildIndex(c1: any, i2: any): void;
        getChildAt(i: any): any;
        protected _render(stage: any): void;
        protected _getTarget(parentOrigin: any, parentPoint: any): any;
        protected setStage(stage: any): void;
    }
}
declare module ic.display {
    import Rectangle = ic.geom.Rectangle;
    class Bitmap extends InteractiveObject {
        bitmapData: BitmapData;
        constructor(bitmapData: BitmapData);
        protected _getLocRect(): Rectangle;
        protected _render(stage: any): void;
    }
}
declare namespace ic.display {
    import Rectangle = ic.geom.Rectangle;
    import EventDispatcher = ic.events.EventDispatcher;
    class BitmapData {
        width: number;
        height: number;
        rect: Rectangle;
        loader: EventDispatcher;
        loaded: any;
        private _rwidth;
        private _rheight;
        private _rrect;
        texture: any;
        tcBuffer: any;
        vBuffer: any;
        dirty: any;
        private _gpuAllocated;
        private _buffer;
        private _ubuffer;
        private static _canv;
        private static _ctx;
        protected static fbo: WebGLFramebuffer;
        constructor(imgURL: string);
        static empty(w: any, h: any, fc: any): BitmapData;
        setPixel(x: any, y: any, color: any): void;
        setPixel32(x: any, y: any, color: any): void;
        setPixels(r: any, buff: any): void;
        getPixel(x: any, y: any): number;
        getPixel32(x: any, y: any): any;
        getPixels(r: any, buff: any): any;
        draw(dobj: any): void;
        syncWithGPU(): void;
        private _initFromImg(img, w, h, fc);
        private _copyRectBuff(sc, sr, tc, tr);
        private _setTexAsFB();
        private static _ipot(x);
        private static _nhpot(x);
    }
}
declare namespace ic.display {
    import Rectangle = ic.geom.Rectangle;
    class Sprite extends DisplayObjectContainer {
        graphics: Graphics;
        private _trect2;
        constructor();
        protected _getRect(tmat: any, torg: any, stks: any): Rectangle;
        protected _render(st: any): void;
        protected _getTarget(porg: any, pp: any): any;
        protected _htpLocal(org: any, p: any): any;
    }
}
declare namespace ic.text {
    import InteractiveObject = ic.display.InteractiveObject;
    import Rectangle = ic.geom.Rectangle;
    class TextField extends InteractiveObject {
        private _textArea;
        private _textAreaAdded;
        private _stage;
        private _type;
        private _selectable;
        private _mouseDown;
        private _cursorPosition;
        private _select;
        private _metrics;
        private _wordWrap;
        private _textWidth;
        private _textHeight;
        private _areaWidth;
        private _areaHeight;
        private _text;
        private _textFormat;
        private _rwidth;
        private _rheight;
        private _background;
        private _border;
        private _texture;
        private _tcArray;
        private _textureCoordinateBuffer;
        private _fArray;
        private _vertexBuffer;
        private _brect;
        constructor();
        protected _getLocRect(): Rectangle;
        protected _loseFocus(): void;
        private _onKeyUp(e);
        private _onInput(e);
        private _onAddToStage(e);
        private _onRemoveFromStage(e);
        private _onMouseDown(e);
        private _onMouseMove(e);
        private _onMouseUp(e);
        appendText(newText: string): void;
        getCharBoundaries(charIndex: any): Rectangle;
        getCharIndexAtPoint(x: number, y: number): any;
        getLineIndexAtPoint(x: number, y: number): number;
        getLineIndexOfChar(charIndex: number): number;
        getTextFormat(): TextFormat;
        setTextFormat(textFormat: TextFormat): void;
        setSelection(begin: number, end: number): void;
        private _update();
        protected _render(stage: any): void;
        textWidth: number;
        textHeight: number;
        wordWrap: boolean;
        width: number;
        height: number;
        text: string;
        selectable: boolean;
        type: string;
        background: boolean;
        border: boolean;
    }
}
declare namespace ic.text {
    class TextFormat {
        private static _canvas;
        private static _context;
        font: string;
        size: number;
        color: number;
        bold: boolean;
        italic: boolean;
        align: string;
        leading: number;
        maxW: number;
        data: any;
        constructor(font?: string, size?: number, color?: number, bold?: boolean, italic?: boolean, align?: string, leading?: number);
        clone(): TextFormat;
        set(textFormat: TextFormat): void;
        setContext(context: any): void;
        getImageData(str: any, textField: any): any;
        renderPar(s: any, posY: any, lineH: any, ctx: any, tf: any, coff: any, metrics: any): number;
        private _nhpt(x);
        static context: CanvasRenderingContext2D;
    }
    const TextFormatAlign: {
        LEFT: string;
        CENTER: string;
        RIGHT: string;
        JUSTIFY: string;
    };
}
declare namespace ic.display {
    var gl: WebGLRenderingContext;
    class Stage extends DisplayObjectContainer {
        stageWidth: number;
        stageHeight: number;
        focus: any;
        private _focii;
        private _mousefocus;
        private _knM;
        private _mstack;
        private _cmstack;
        private _sprg;
        private _svec4_0;
        private _svec4_1;
        private _pmat;
        private _umat;
        private _smat;
        private _mcEvs;
        private _mdEvs;
        private _muEvs;
        private _smd;
        private _smu;
        private _smm;
        private _srs;
        private _touches;
        private _unitIBuffer;
        canvas: any;
        private _canvas;
        static main: any;
        static _mouseX: number;
        static _mouseY: number;
        private static _curBF;
        private static _curEBF;
        private static _curVC;
        private static _curTC;
        private static _curUT;
        private static _curTEX;
        private static _curBMD;
        constructor(canvasId: string);
        private _getOrigin(org);
        static setBuffer(buffer: any): void;
        static setEBF(ebf: any): void;
        static setVC(vc: any): void;
        static setTC(tc: any): void;
        static setUT(ut: any): void;
        static setTEX(tex: any): void;
        static setBMD(bmd: any): void;
        private static _okKeys;
        private static _isTD();
        private static _ctxt(e);
        private _getMakeTouch(id);
        private static _onTD(e);
        private static _onTM(e);
        private static _onTU(e);
        private static _onMD(e);
        private static _onMM(e);
        private static _onMU(e);
        private static _onKD(e);
        private static _onKU(e);
        private static _blck(e);
        private static _onRS(e);
        private static _getDPR();
        private _resize();
        private _getShader(gl, str, fs);
        private _initShaders();
        private _initBuffers();
        private _setFramebuffer(fbo, w, h, flip);
        private static _setStageMouse(t);
        private _drawScene();
        private _processMouseTouch();
        private static _tick();
    }
}
declare namespace ic.geom {
    class Vector3D {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
        add(p: Vector3D): Vector3D;
        clone(): Vector3D;
        copyFrom(p: Vector3D): void;
        equals(p: Vector3D): boolean;
        normalize(): number;
        setTo(xa: number, ya: number, za: number): void;
        subtract(p: Vector3D): Vector3D;
        static distance(a: Vector3D, b: Vector3D): number;
        protected static _distance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
    }
}
declare var requestAnimFrame: (callback: () => void) => void;
