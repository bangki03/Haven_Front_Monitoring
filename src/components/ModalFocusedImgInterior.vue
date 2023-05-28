<template>
    <!-- <div v-show="isMask" class="middle-panel" :style="{ cursor: cursor }"> -->
    <div class="middle-panel">
        <div id="frame" class="frame" @wheel="onwheel" >
            <canvas class="canvas" id="editor" ref="image" resize />
        </div>
    </div>
    <SelectTool
            v-show="false"
            :selected="activeTool"
            @update="activeTool = $event"
            :scale="image.scale"
            ref="select"
        />
</template>

<!-- <template>
    <div class="dard-container" style="width:98%;  display:flex; flex-direction: column; justify-content: flex-start;">
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
      <div class="dard-main" style="display:flex; flex-direction: row; align-items: center;">
        <div class="form-check form-switch">
            <input class="form-check-input" style="height:1.5em; width:2.5em; margin-top:0.5em; margin-right:1em;" type="checkbox" id="flexSwitchCheckMask">
            <label class="form-check-label" style="font-size: 1.5em; margin-right:3em;" for="flexSwitchCheckMask">Mask</label>
        </div>
      </div>
      <div class="dard-footer" style="display:flex; flex-direction: column; align-items: center;">
        <div id="frame" class="frame" @wheel="onwheel" >
            <canvas class="canvas" id="editor" ref="image" resize />
        </div>
      </div>
    </div>
</template> -->

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
        },
        isMaskSwitch: null,
    },
    data() {
        return{
            paper: null,
            zoom: 0.2,
            activeTool: "Select",
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
            
            const maskImage = new Image();
            maskImage.src = this.mask.url;

            this.image.raster.onLoad = () => {
                console.log('[initCanvas] - onloaded')
                let tempCtx = document.createElement("canvas").getContext("2d");
                let width = this.image.raster.width;
                let height = this.image.raster.height;

                tempCtx.canvas.width = width;
                tempCtx.canvas.height = height;
                
                this.image.raster.sendToBack();
                this.fit();
                this.image.ratio = (width * height) / 1000000;
                // this.removeProcess(process);

                tempCtx.drawImage(this.image.raster.image, 0, 0, width, height);

                maskImage.onLoad = () => {
                    console.log('maskImage onload')
                    tempCtx.globalAlpha = 0.9; // 투명도 조절 값 (0.0 ~ 1.0)
                    tempCtx.drawImage(maskImage, 0, 0, width, height);
                }

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
        initCanvas_with_Mask() {
            let canvas = document.getElementById("editor");
            this.paper.setup(canvas);
            this.paper.view.viewSize = [
                // this.paper.view.size.width,
                // window.innerWidth,
                1296,
                window.innerHeight
            ];


            let imageLayer = new paper.Layer(); // 이미지를 그릴 레이어
            let maskLayer = new paper.Layer(); // 마스크를 그릴 레이어


            this.paper.activate();
            this.image.raster = new paper.Raster(this.image.url);
            
            const maskImage = new Image();
            maskImage.src = this.mask.url;

            this.image.raster.onLoad = () => {
                imageLayer.addChild(this.image.raster)
                this.image.raster.opacity = 1

                let width = this.image.raster.width;
                let height = this.image.raster.height;

                this.mask.raster = new paper.Raster(this.mask.url);

                this.mask.raster.onLoad = () => {
                    maskLayer.addChild(this.mask.raster)
                    this.mask.raster.opacity = 0;

                    imageLayer.position = new paper.Point(0, 0);
                    maskLayer.position = new paper.Point(0, 0);

                    this.image.raster.sendToBack();
                    this.mask.raster.sendToBack();
                    this.fit();
                    this.image.ratio = (width * height) / 1000000;
                    this.mask.ratio = (width * height) / 1000000;
                }
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
            // this.mask.scale = 1 / this.paper.view.zoom; // mask 임시
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
    watch: {
        "isMaskSwitch"(after) {
            if(after == true){
                this.mask.raster.opacity=0.5
            }
            else{
                this.mask.raster.opacity=0
            }
        }
    },

    created() {
        this.paper = new paper.PaperScope();

        this.image.url = this.image_meta.imagepath
        this.mask.url = this.image_meta.maskpath
    },

    mounted() {
        this.initCanvas_with_Mask()
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
.dard-main {
  width: 100%;
  height: 80px;

  background-color: #F8F8FA;

}
.dard-footer {
  width: 100%;

  background-color: white;

  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
}

</style>