///<reference path='../../src/engine.ts'/>
/*// /// <reference path='../../build/engine.d.ts'/>*/

namespace game {

    import Stage = ic.display.Stage;
    import TextFormatAlign = ic.text.TextFormatAlign;
    import TextFormat = ic.text.TextFormat;
    import TextField = ic.text.TextField;

    window.onload = () => {
        var stage = new Stage("gameCanvas");
        // TextFormat(font, size, color, bold, italic, align, leading)
        var f1 = new TextFormat("Times new Roman", 45, 0x880099, true, true);

        var t1 = new TextField();
        t1.selectable = false;	// default is true
        t1.setTextFormat(f1);
        t1.text = "TextField Class";
        t1.width = t1.textWidth; t1.height = t1.textHeight;
        stage.addChild(t1);  t1.x = t1.y = 20;

        var txt = "Every TextField has its \"area\", defined by width and height properties. "
            + "Default area size is 100 x 100 pixels. Text is rendered into that area. "
            + "Words are \"wrapped\" into that area, when you set wordWrap = true.\nWidth "
            + "and height of the current text is stored in textWidth and textHeight properties, "
            + "so you can change the area depending on current text.";

        var f2 = new TextFormat("Verdana", 20, 0xdd8800);
        f2.align = TextFormatAlign.JUSTIFY;

        var t2 = new TextField();
        t2.type = "input";  // default type is "dynamic"
        t2.wordWrap = true;
        t2.setTextFormat(f2);
        t2.text = txt;
        t2.width = 600; t2.height = 300;
        stage.addChild(t2);  t2.x = 20; t2.y = 90;

        var t3 = new TextField();	// default text format
        t3.wordWrap = true;
        t3.text = txt;
        t3.width = 600; t3.height = 300;
        stage.addChild(t3); t3.x = 20; t3.y = t2.y + t2.textHeight + 20;
    }
}
