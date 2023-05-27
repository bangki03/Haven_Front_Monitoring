<template>
    <div style="">
        <div class="dard-header">
            <SelectTool
                v-show="false"
                :selected="activeTool"
                @update="activeTool = $event"
                :scale="image.scale"
                @setcursor="setCursor"
                ref="select"
            />
        </div>
        <div class="" style="display:flex; flex-direction: row; align-items: center; justify-content: flex-end; background-color: #F8F8FA;">
            <div class="form-check form-switch">
                <input class="form-check-input" style="height:1.5em; width:2.5em; margin-top:0.5em; margin-right:1em;" type="checkbox" id="flexSwitchCheckMask">
                <label class="form-check-label" style="font-size: 1.5em; margin-right:3em;" for="flexSwitchCheckMask">Mask</label>
            </div>
        </div>
        <div class="middle-panel" :style="{ cursor: cursor }">
            <div id="frame" class="frame" @wheel="onwheel" >
                <canvas class="canvas" id="editor" ref="image" resize />
            </div>
        </div>

    </div>
</template>

<script>
import paper from "paper";
import SelectTool from "@/components/SelectTool";

export default{
    components: {
      SelectTool,
    },
    props: {
        image_meta: {
            imagepath_origin: String,
            imagepath: String,
            maskpath_origin: String,
            maskpath: String,
        }
    },
    data() {
        return{
            paper: null,
            zoom: 0.2,
            image: {
                raster: {},
                scale: 0,
                // metadata: {},
                ratio: 0,
                rotate: 0,
                id: null,
                url: "",
                dataset: 0,
                previous: null,
                next: null,
                filename: "",
                categoryIds: [],
                data: null,

                // 추가
                width: 0,
                height: 0,
            },
            mask: {
                raster: {},
                scale: 0,
                // metadata: {},
                ratio: 0,
                rotate: 0,
                id: null,
                url: "",
                dataset: 0,
                previous: null,
                next: null,
                filename: "",
                categoryIds: [],
                data: null,

                // 추가
                width: 0,
                height: 0,
            },
            text: {
                topLeft: null,
                topRight: null
            },
        }
    },
    methods: {
        initCanvas() {
            let canvas = document.getElementById("editor");
            this.paper.setup(canvas);
            this.paper.view.viewSize = [
                // this.paper.view.size.width,
                window.innerWidth,
                // 1296,
                window.innerHeight
            ];

            this.paper.activate();
            // this.image.url = this.image_meta.imagepath_img
            // console.log("this.image.url : " + this.image.url)
            this.image.raster = new paper.Raster(this.image.url);
            this.mask.raster = new paper.Raster(this.mask.url);

            this.image.raster.onLoad = () => {
                console.log('[AnnotatorView][initCanvas] - onloaded')
                let width = this.image.raster.width;
                let height = this.image.raster.height;

                this.image.raster.sendToBack();
                this.fit();
                this.image.ratio = (width * height) / 1000000;
                // this.removeProcess(process);

                let tempCtx = document.createElement("canvas").getContext("2d");
                tempCtx.canvas.width = width;
                tempCtx.canvas.height = height;
                tempCtx.drawImage(this.image.raster.image, 0, 0);

                this.image.data = tempCtx.getImageData(0, 0, width, height);
                let fontSize = width * 0.025;

                let positionTopLeft = new paper.Point(
                    -width / 2,
                    -height / 2 - fontSize * 0.5
                );
                this.text.topLeft = new paper.PointText(positionTopLeft);
                this.text.topLeft.fontSize = fontSize;
                this.text.topLeft.fillColor = "black";
                this.text.topLeft.content = this.image.url;

                // let positionTopRight = new paper.Point(
                //     width / 2,
                //     -height / 2 - fontSize * 0.4
                // );
                // this.text.topRight = new paper.PointText(positionTopRight);
                // this.text.topRight.justification = "right";
                // this.text.topRight.fontSize = fontSize;
                // this.text.topRight.fillColor = "black";
                // this.text.topRight.content = width + "x" + height;

            };
        },
        fit() {
            let canvas = document.getElementById("editor");

            let parentX = this.image.raster.width;
            let parentY = this.image.raster.height;

            this.paper.view.zoom = Math.min(
                (canvas.width / parentX) * 0.95,
                (canvas.height / parentY) * 0.8
            );

            this.image.scale = 1 / this.paper.view.zoom;
            this.paper.view.setCenter(0, 0);
        },
        onwheel(e) {
            e.preventDefault();
            // if (!this.doneLoading) return;

            let view = this.paper.view;

            if (e.ctrlKey) {
            // Pan up and down
            let delta = new paper.Point(0, 0.5 * e.deltaY);
            this.paper.view.setCenter(view.center.add(delta));
            } else if (e.shiftKey) {
            // Pan left and right
            let delta = new paper.Point(0.5 * e.deltaY, 0);
            this.paper.view.setCenter(view.center.add(delta));
            } else {
            console.log("onWheel - else(ctrlkey)")
            let viewPosition = view.viewToProject(
                new paper.Point(e.offsetX, e.offsetY)
            );

            let transform = this.changeZoom(e.deltaY, viewPosition);
            if (transform.zoom < 10 && transform.zoom > 0.01) {
                this.image.scale = 1 / transform.zoom;
                this.paper.view.zoom = transform.zoom;
                this.paper.view.center = view.center.add(transform.offset);
            }
            }

            return false;
        },
        changeZoom(delta, p) {
            let oldZoom = this.paper.view.zoom;
            let c = this.paper.view.center;
            let factor = 1 + this.zoom;

            let zoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
            let beta = oldZoom / zoom;
            let pc = p.subtract(c);
            let a = p.subtract(pc.multiply(beta)).subtract(c);

            return { zoom: zoom, offset: a };
        },
    },

    created() {
        this.paper = new paper.PaperScope();

        this.image.url = this.image_meta.imagepath
        this.mask.url = this.image_meta.maskpath
    },

    mounted() {
        this.initCanvas()
    },
}
</script>

<style>
.dard-header {
  width: 100%;
  height: 40px;

  background-color: #BD7C4A;

  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
}
.middle-panel {
    display: block;
    /* width: calc(100% - 250px - 40px); */
    height: 100%;

    /* margin-left: 1em; */

    background-color: white;
    overflow: hidden;
    position: relative;

    /* border-top-left-radius: 1em; */
    border-bottom-left-radius: 1em;
    /* border-top-right-radius: 1em; */
    border-bottom-right-radius: 1em;
}

</style>