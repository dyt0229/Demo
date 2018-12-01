function MirrorBox(bigBox, width, height, img, mirrorBoxWidth, mirrorBoxHeight, mirrorBoxColor, n) {
    this.bigBox = bigBox;
    this.width = width;
    this.height = height;
    this.img = img;
    this.mirrorBoxWidth = mirrorBoxWidth;
    this.mirrorBoxHeight = mirrorBoxHeight;
    this.mirrorBoxColor = mirrorBoxColor;
    this.n = n;

    this.mirrorBox = null;
    this.showBox = null;

    this.initUI = function () {
        this.bigBox.style.width = this.width + "px";
        this.bigBox.style.height = this.height + "px";
        this.bigBox.style.position = "relative";
        let imgDom = document.createElement("img");
        imgDom.src = this.img;
        imgDom.style.cssText = "position:absoulte;";
        imgDom.style.width = this.width + "px";
        imgDom.style.height = this.height + "px";
        this.bigBox.appendChild(imgDom);

        //创建镜子
        this.mirrorBox = document.createElement("div");
        this.mirrorBox.style.cssText = "position:absolute;opacity:0.3;z-Index:2;top:0;left:0;";
        this.mirrorBox.style.width = this.mirrorBoxWidth + "px";
        this.mirrorBox.style.height = this.mirrorBoxHeight + "px";
        this.mirrorBox.style.backgroundColor = this.mirrorBoxColor;
        this.mirrorBox.style.display = "none";
        this.bigBox.appendChild(this.mirrorBox);

        //创建显示盒
        this.showBox = document.createElement("div");
        this.showBox.style.cssText = "position:absolute;top:0;";
        this.showBox.style.width = this.mirrorBoxWidth * n + "px";
        this.showBox.style.height = this.mirrorBoxHeight * n + "px";
        this.showBox.style.left = this.width + "px";
        // this.showBox.style.background="red";
        this.showBox.style.background = "url(" + this.img + ")";

        this.showBox.style.backgroundSize = this.n * this.width + "px " + this.n * this.height + "px";
        this.showBox.style.display = "none";
        this.bigBox.appendChild(this.showBox);
    };
    this.addEvent = function () {
        let that = this;
        this.bigBox.onmousemove = function (event) {
            let evt = event || window.event;
            let left1 = evt.pageX - that.bigBox.offsetLeft - that.mirrorBoxWidth / 2;
            let top1 = evt.pageY - that.bigBox.offsetTop - that.mirrorBoxHeight / 2;
            if (left1 < 0) {
                left1 = 0;
            }
            if (left1 > that.width - that.mirrorBoxWidth) {
                left1 = that.width - that.mirrorBoxWidth;
            }
            if (top1 < 0) {
                top1 = 0;
            }
            if (top1 > that.height - that.mirrorBoxHeight) {
                top1 = that.height - that.mirrorBoxHeight;
            }
            that.mirrorBox.style.left = left1 + "px";
            that.mirrorBox.style.top = top1 + "px";

            that.showBox.style.backgroundPosition = (- 1 * that.n * left1) + "px " + (-1 * that.n * top1) + "px";
        }
        this.bigBox.onmouseenter = function () {
            that.mirrorBox.style.display = "block";
            that.showBox.style.display = "block";
        }
        this.bigBox.onmouseleave = function () {
            that.mirrorBox.style.display = "none";
            that.showBox.style.display = "none";
        }
    };
    this.initUI();
    this.addEvent();
}