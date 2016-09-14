module ic.display {

    import Rectangle = ic.geom.Rectangle;

    /**
     * The Bitmap class represents display objects that represent bitmap images.
     */
    export class Bitmap extends InteractiveObject {

        /**
         * The BitmapData object being referenced.
         */
        public bitmapData: BitmapData;

        public constructor(bitmapData:BitmapData) {
            super();
            this.bitmapData = bitmapData;
        }

        protected _getLocRect():Rectangle {
            return this.bitmapData.rect;
        }

        protected _render(stage) {
            var tempBitmapData = this.bitmapData;
            if (!tempBitmapData.loaded) return;
            if (tempBitmapData.dirty) tempBitmapData.syncWithGPU();
            gl.uniformMatrix4fv(stage._sprg.tMatUniform, false, stage._mstack.top());
            stage._cmstack.update();

            Stage.setVC(tempBitmapData.vBuffer);
            Stage.setTC(tempBitmapData.tcBuffer);
            Stage.setUT(1);
            Stage.setTEX(tempBitmapData.texture);
            Stage.setEBF(stage._unitIBuffer);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        }

    }
}
