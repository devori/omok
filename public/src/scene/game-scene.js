var GameScene = (function () {

    var GameLayer = cc.Layer.extend({
        setStone: function (x, y, stone) {
            var size = cc.director.getWinSize();
            var hCenter = size.width / 2;
            var vCenter = size.height / 2;
            var unitWidth = size.width/19.2;
            var unitHeight = size.height/19.2;

            var sprite;
            if (stone === 'b') {
                sprite = cc.Sprite.create("./images/black_stone.png");
            } else {
                sprite = cc.Sprite.create("./images/white_stone.png");
            }
            sprite.setPosition(hCenter + ((x-9) * unitWidth), vCenter + ((y-9) * unitHeight));
            sprite.setScale(0.08);
            this.addChild(sprite, 0);
        },
        init: function () {
            var size = cc.director.getWinSize();
            var board = cc.Sprite.create("./images/go_board.png");
            board.setPosition(size.width / 2, size.height / 2);
            board.setScale(0.4);
            this.addChild(board, 0);

            var layer = this;
            var listener = cc.EventListener.create({
                event : cc.EventListener.MOUSE,
                onMouseUp : function (event) {
                    var hCenter = size.width / 2;
                    var vCenter = size.height / 2;
                    var unitWidth = size.width/19.2;
                    var unitHeight = size.height/19.2;

                    var target = event.getLocation();

                    var x = (target.x - hCenter)/unitWidth;
                    x = Math.round(x);
                    var y = (target.y - vCenter)/unitHeight;
                    y = Math.round(y);

                    if (Math.abs(x) > 9 || Math.abs(y) > 9) {
                        return;
                    }
                    if (OmokCore.check()) {
                        return;
                    }

                    var stone = OmokCore.getTurn();
                    if (OmokCore.push(x+9, y+9, stone)) {
                        layer.setStone(x + 9, y + 9, stone);
                        if (OmokCore.check()) {
                            setTimeout(function () {
                                alert("win : " + (stone === 'b' ? "Black" : "White"));Jeep8walrus

                            }, 100);
                        }
                    }
                }
            });
            cc.eventManager.addListener(listener, board);

            OmokCore.start();
        }
    });
    
    return cc.Scene.extend({
        layer: {},
        init: function () {
        },
        onEnter: function () {
            this._super();
            var layer = new GameLayer();
            this.addChild(layer, 0)
            layer.init();
        }
    });
})();