function Slider(boxDom, width, height, imgs, btnColor, btnHighColor, btnSize, isCircle, timeSpace) {
    this.boxDom = boxDom;
    this.width = width;
    this.height = height;
    this.imgs = imgs; //要播放的图片数组

    this.btnColor = btnColor;
    this.btnHighColor = btnHighColor;
    this.btnSize = btnSize;
    this.isCircle = isCircle;

    this.timeSpace = timeSpace;
    this.currIndex = 0;
    this.myTimer = null;

    this.createUI = function () {
        this.boxDom.width = this.width + "px";
        this.boxDom.height = this.height + "px";
        this.boxDom.style.overflow = "hidden";
        this.boxDom.style.position = "relative";
        for (let i = 0; i < imgs.length; i++) {
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = "position:absolute;top:0;";
            if (i == 0) {
                imgDom.style.left = "0";
            } else {
                imgDom.style.left = this.width + "px";
            }
            imgDom.style.width = this.width + "px";
            imgDom.style.height = this.height + "px";
            this.boxDom.appendChild(imgDom);
        }
        let ulDom = document.createElement("ul");
        ulDom.style.cssText = "position:absolute;list-style:none;right:50px;bottom:10px;z-Index:2";
        this.boxDom.appendChild(ulDom);

        for (let i = 0; i < imgs.length; i++) {
            let liDom = document.createElement("li");
            liDom.style.cssText = "margin-right:20px;float:left";
            liDom.style.width = this.btnSize + "px";
            liDom.style.height = this.btnSize + "px";
            if (this.isCircle) {
                liDom.style.borderRadius = "50%";
            }
            if (i == 0) {
                liDom.style.backgroundColor = this.btnHighColor;
            } else {
                liDom.style.backgroundColor = this.btnColor;
            }
            ulDom.appendChild(liDom);
        }
    }
    //添加事件
    this.addEvent = function () {
        let that = this;
        this.onmouseover = function () {
            that.stop();
        };
        this.onmouseout = function () {
            that.autoPlay();
        };
        let lis = this.boxDom.lastElementChild.children;
        for (let i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                that.goImg(i)
            };
        }
    }
    //自动播放
    this.autoPlay = function () {
        if (this.myTimer != null) {
            return;
        }
        this.myTimer = setInterval(() => {
            //改变数据
            let outIndex = this.currIndex;
            this.currIndex++;
            //边界处理
            if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
                this.currIndex = 0;
            }
            //改变外观
            this.showImg(outIndex, this.currIndex);
        }, this.timeSpace);
    }
    //移上停止
    this.stop = function () {
        if (this.myTimer != null) {
            window.clearInterval(this.myTimer);
            this.myTimer = null;
        }
    }
    //跳转指定的图片
    this.goImg = function (transIndex) {
        //处理数据
        let outIndex = this.currIndex;
        this.currIndex = transIndex;
        //处理边界
        if (this.currIndex < 0 || this.currIndex > this.imgs.length - 1) {
            this.currIndex = 0;
        }
        //改变外观
        this.showImg(outIndex, this.currIndex);
    }
    //改变外观
    this.showImg = function (outIndex, inIndex) {
        //图片
        let imgs = this.boxDom.children;
        imgs[inIndex].style.left = this.width + "px";
        //让inIndex滑入
        linearMove3(imgs[inIndex], "left", this.width, 0, this.timeSpace * 1 / 10);
        //让outIndex滑出
        linearMove3(imgs[outIndex], "left", 0, -1 * this.width, this.timeSpace * 1 / 10);

        //改豆豆
        let lis = this.boxDom.lastElementChild.children;
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.backgroundColor = this.btnColor;
        }
        lis[this.currIndex].style.backgroundColor = this.btnHighColor;
    }
    this.createUI();
    this.addEvent();
}