var ReadyLayer = cc.Layer.extend({
    sprite: null,
    tag: "readyLayer",
    ctor: function () {
        this._super();
        var size = cc.winSize;
        this.sprite = new cc.Sprite("./images/basic_img02.png");
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        this.sprite.tag = 'TouchTarget';

        //Creating Event Listener Object
        var listener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            swallowTouches: true,
            isMouseDown: false,
            onMouseUp: function (event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(event.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    var scene = cc.director.getRunningScene();
                    scene.removeChildByTag("readyLayer");

                    cc.eventManager.removeAllListeners();

                    var gameLayer = new GameLayer();

                    scene.addChild(gameLayer, 0, "gameLayer");
                    gameLayer.init();
                    this.isMouseDown = true;
                }
                return false;
            }
        });

        //Added Event Listener To Sprite
        cc.eventManager.addListener(listener, this.sprite);
        return true;
    }
});