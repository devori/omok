var GameScene = (function () {

    var GameLayer = cc.Layer.extend({
        clients: [],
        setStone: function (x, y, stone) {

            if (OmokCore.check()) {
                return;
            }

            var i;
            if (!OmokCore.push(x, y, stone)) {
                return false;
            }

            this.clients[1].push(x, y, stone);
            this.clients[0].push(x, y, stone);


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

            if (OmokCore.check()) {
                setTimeout(function () {
                    alert("win : " + (stone === 'b' ? "Black" : "White"));
                }, 10);
                return true;
            }

            var self = this;
            if (stone === 'b') {
                var next = this.clients[1].getNext();
                if (next) {
                    setTimeout(function () {
                        self.setStone(next.i, next.j, next.stone);
                    }, 100);
                }
            }

            return true;
        },
        init: function (clientA, clientB) {
            var size = cc.director.getWinSize();
            var board = cc.Sprite.create("./images/go_board.png");
            board.setPosition(size.width / 2, size.height / 2);
            board.setScale(0.4);
            this.addChild(board, 0);

            this.clients = [clientA, clientB];
            OmokCore.start();

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

                    var stone = OmokCore.getTurn();
                    layer.setStone(x+9, y+9, stone);
                }
            });
            cc.eventManager.addListener(listener, board);
        }
    });
    
    return cc.Scene.extend({
        layer: null,
        init: function () {
        },
        onEnter: function () {
            this._super();
            this.layer = new GameLayer();
            this.addChild(this.layer, 0)
            this.layer.init({push: function () {}, getNext: function () {}}, new ClientAI());
        }
    });
})();