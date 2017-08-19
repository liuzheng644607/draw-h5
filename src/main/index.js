//index.js
var brushes = require('./brush');
var pen;
var app = {
    initCanvas: function() {
        var canvas = (this.myCanvas = document.getElementById('my-canvas'));
        var ctx = (this.canvasCtx = canvas.getContext('2d'));
        ctx.setStrokeStyle = function(s) {
            this.strokeStyle = s;
        }
        ctx.setLineCap = function(s) {
            this.lienCap = s;
        }
        ctx.setLineWidth = function(s) {
            this.lineWidth = s;
        }
        ctx.setStrokeStyle('#000000');
        ctx.setLineCap('round');
        ctx.setLineWidth(4);
        brushes.init(ctx);
        pen = brushes.getBrush('pen');
    },

    bindEvents: function() {
        this.myCanvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.myCanvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.myCanvas.addEventListener('touchend', this.onTouchEnd.bind(this));
    },

    onTouchStart: function(e) {
        console.log(e);
        pen.start(e);
    },

    onTouchMove: function(e) {
        pen.move(e);
    },

    onTouchEnd: function(e) {
        pen.end(e);

        var self = this;
        self.drawHistory = this.drawHistory || [];
        wx.canvasToTempFilePath({
            canvasId: 'my-canvas',
            success: function(res) {
                self.drawHistory.push(res.tempFilePath);
            }
        });
    },

    revoke: function() {
        this.drawHistory.pop();
        console.log(this.drawHistory);
        console.log(this.canvasCtx);
        var lastIndex = this.drawHistory.length - 1;
        var path = this.drawHistory[lastIndex];
        if (path) {
            this.canvasCtx.drawImage(path);
        } else {
            this.canvasCtx.clearRect(
                0,
                0,
                this.data.sysInfo.windowWidth,
                this.data.sysInfo.windowWidth
            );
        }
        this.canvasCtx.draw();
    },

    /**
     * 使用橡皮擦
     * @return {[type]} [description]
     */
    useEraser: function() {
        this.canvasCtx.setStrokeStyle('#ffffff');
    },

    initApp: function() {
        this.drawHistory = [];
    },

    onReady: function() {
        this.initApp();
        this.initCanvas();
        this.bindEvents();
    }
};

module.exports = app;
