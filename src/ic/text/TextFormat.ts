namespace ic.text {

    declare class CanvasPixelArray {}

    export class TextFormat {

        private static _canvas = document.createElement("canvas");
        private static _context = TextFormat._canvas.getContext("2d");

        public font: string;
        public size: number;
        public color: number;
        public bold: boolean;
        public italic: boolean;
        public align: string;
        public leading: number;

        public maxW: number;
        public data;

        /**
         * A constructor of text format
         * @param font        URL of font
         * @param size        size of text
         * @param color        color of text
         * @param bold
         * @param italic
         * @param align
         * @param leading
         */
        public constructor(font = "Times New Roman",
                           size = 12,
                           color = 0x000000,
                           bold: boolean = false,
                           italic: boolean = false,
                           align = TextFormatAlign.LEFT,
                           leading = 0) {
            this.font = font;
            this.size = size;
            this.color = color;
            this.bold = bold;
            this.italic = italic;
            this.align = align;
            this.leading = leading;

            this.maxW = 0;
            this.data = {image: null, tw: 0, th: 0, rw: 0, rh: 0};	// image, text width/height, real width/height
        }

        public clone(): TextFormat {
            return (new TextFormat(this.font, this.size, this.color, this.bold, this.italic, this.align, this.leading));
        }

        public set(textFormat: TextFormat) {
            this.font = textFormat.font;
            this.size = textFormat.size;
            this.color = textFormat.color;
            this.bold = textFormat.bold;
            this.italic = textFormat.italic;
            this.align = textFormat.align;
            this.leading = textFormat.leading;
        }

        /*
         metrics = 	// for each line
         [
         {
         x, y, width, height,
         charOffset  // int
         words =  // for each word
         [
         {
         x, y, width, height
         word // String
         }
         , ...
         ]
         }
         , ...
         ]
         */

        public setContext(context) {
            var c = this.color;
            var r = (c >> 16 & 0x0000ff);
            var g = (c >> 8 & 0x0000ff);
            var b = (c & 0x0000ff);

            context.textBaseline = "top";
            context.fillStyle = context.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
            context.font = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.size + "px " + this.font;
        }

        public getImageData(str, textField)	// string, TextField - read only
        {
            var canvas = TextFormat._canvas;
            var ctx = TextFormat._context;
            var data = this.data;

            canvas.width = data.rw = this._nhpt(textField._areaW); //console.log(tf._areaW, canv.width);
            canvas.height = data.rh = this._nhpt(textField._areaH); //console.log(tf._areaH, canv.height);

            if (textField._background) {
                //console.log("has background");
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fillRect(0, 0, textField._areaW, textField._areaH);
            }
            if (textField._border) {
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.beginPath();
                //ctx.moveTo(Math.round(b0.x)+0.5, b0.y);
                //ctx.lineTo(Math.round(b0.x)+0.5, b0.y+b0.height);

                ctx.rect(0.5, 0.5, textField._areaW - 1, textField._areaH - 1);
                ctx.stroke();
            }

            this.setContext(ctx);

            var metrics = [];
            this.maxW = 0;
            var pars = str.split("\n");
            var line = 0;
            var posY = 0;
            var lineH = this.size * 1.25;
            var characterOffset = 0;	// character offset

            for (var i = 0; i < pars.length; i++) {
                var lc = this.renderPar(pars[i], posY, lineH, ctx, textField, characterOffset, metrics);
                line += lc;
                posY += lc * (lineH + this.leading);
                characterOffset += pars[i].length + 1;
            }
            if (this.align == TextFormatAlign.JUSTIFY) this.maxW = Math.max(this.maxW, textField._areaW);

            data.tw = this.maxW;
            data.th = (lineH + this.leading) * line - this.leading;
            textField._metrics = metrics;

            if (textField._selectable && textField._select && textField._select.from < textField._select.to) {
                var sel = textField._select;
                var m = metrics;
                var l0 = textField.getLineIndexOfChar(sel.from);
                var l1 = textField.getLineIndexOfChar(sel.to - 1);
                var b0 = textField.getCharBoundaries(sel.from);
                var b1 = textField.getCharBoundaries(sel.to - 1);
                ctx.fillStyle = "rgba(0,0,0,0.25)";
                if (l0 == l1) {
                    ctx.fillRect(b0.x, b0.y, b1.x + b1.width - b0.x, b1.y + b1.height - b0.y);
                }
                else {
                    ctx.fillRect(b0.x, b0.y, m[l0].x + m[l0].width - b0.x, m[l0].y + m[l0].height - b0.y);
                    for (var l = l0 + 1; l < l1; l++) ctx.fillRect(m[l].x, m[l].y, m[l].width, m[l].height);
                    ctx.fillRect(m[l1].x, m[l1].y, b1.x + b1.width - m[l1].x, b1.y + b1.height - m[l1].y);
                }
            }
            else if (textField._type == "input" && textField._curPos > -1) {
                var b0 = textField.getCharBoundaries(textField._curPos);
                ctx.beginPath();
                ctx.moveTo(Math.round(b0.x) + 0.5, b0.y);
                ctx.lineTo(Math.round(b0.x) + 0.5, b0.y + b0.height);
                ctx.stroke();
            }

            data.canvas = canvas;
            var imgd = ctx.getImageData(0, 0, data.rw, data.rh);

            if ((<any>window).CanvasPixelArray && imgd.data instanceof CanvasPixelArray)	// old standard, implemented in IE11
            {
                data.ui8buff = new Uint8Array(imgd.data);
            }
            else data.ui8buff = new Uint8Array(imgd.data.buffer);

            //var ui8buff = new Uint8Array(imgd.data);
            //data.ui8buff = ui8buff;

            return data;
        }

        public renderPar(s, posY, lineH, ctx, tf, coff, metrics): number	// returns number of lines
        {
            var words;
            if (tf._wordWrap) words = s.split(" ");
            else words = [s];

            var spaceWidth = ctx.measureText(" ").width;
            var currentLineWidth = 0;			// current line width
            var maxLineWidth = tf._areaW;	// maximum line width
            var currentLine = 0;				// current line

            var lines = [[]];		// array of lines , line = (arrays of words)
            var freeLineSpaces = [];		// free line space

            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                var wordWidth = ctx.measureText(word).width;
                if (currentLineWidth + wordWidth <= maxLineWidth || currentLineWidth == 0) {
                    lines[currentLine].push(word);
                    currentLineWidth += wordWidth + spaceWidth;
                }
                else {
                    freeLineSpaces.push(maxLineWidth - currentLineWidth + spaceWidth);
                    lines.push([]);
                    currentLine++;
                    currentLineWidth = 0;
                    i--;
                }
            }
            freeLineSpaces.push(maxLineWidth - currentLineWidth + spaceWidth);

            for (var i = 0; i < lines.length; i++) {
                var mline = {x: 0, y: 0, width: 0, height: 0, charOffset: coff, words: []};
                mline.height = this.size * 1.25 + this.leading;
                var line = lines[i];
                //while(line[line.length-1] == "") {line.pop(); lspace[i] += spacew; }
                this.maxW = Math.max(this.maxW, maxLineWidth - freeLineSpaces[i]);

                var lineY = posY + (lineH + this.leading) * i;
                var gap = spaceWidth;
                currentLineWidth = 0;

                if (this.align == TextFormatAlign.CENTER) currentLineWidth = freeLineSpaces[i] * 0.5;
                if (this.align == TextFormatAlign.RIGHT) currentLineWidth = freeLineSpaces[i];
                if (this.align == TextFormatAlign.JUSTIFY) gap = spaceWidth + freeLineSpaces[i] / (line.length - 1);

                mline.x = currentLineWidth;
                mline.y = lineY;

                for (var j = 0; j < line.length; j++) {
                    var word = line[j];
                    ctx.fillText(word, currentLineWidth, lineY);
                    var wordWidth = ctx.measureText(word).width;

                    mline.words.push({
                        x: currentLineWidth,
                        y: lineY,
                        width: wordWidth,
                        height: mline.height,
                        charOffset: coff,
                        word: word
                    });

                    if (i < lines.length - 1) currentLineWidth += wordWidth + gap;	// not last line
                    else {
                        currentLineWidth += wordWidth + spaceWidth;
                    }		// last line
                    coff += word.length + 1;
                }

                mline.width = currentLineWidth - mline.x;
                if (i == lines.length - 1) mline.width -= spaceWidth;
                metrics.push(mline);
            }
            return currentLine + 1;
        }

        private _nhpt(x) {
            --x;
            for (var i = 1; i < 32; i <<= 1) x = x | x >> i;
            return x + 1;
        }

        static get context() {
            return this._context;
        }

    }

    export const TextFormatAlign = {
        LEFT: "left",
        CENTER: "center",
        RIGHT: "right",
        JUSTIFY: "justify"
    }
}

