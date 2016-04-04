var ReadyScene = (function () {

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
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(event.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    //Check the click area
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        cc.director.pushScene(new GameScene());
                    }
                    return false;
                }
            });

            //Added Event Listener To Sprite
            cc.eventManager.addListener(listener, this.sprite);
            return true;
        }
    });

    return cc.Scene.extend({
        layer: {},
        init: function () {
        },
        onEnter: function () {
            this._super();
            var layer = new ReadyLayer();
            this.addChild(layer, 0)
            layer.init();
        }
    });
})();