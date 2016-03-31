var GameLayer = cc.Layer.extend({
    _board: [],
    _turn: 'b',
    setStone: function (x, y) {
        if (this._board[x][y] !== '') {
            return;
        }

        var size = cc.director.getWinSize();
        var hCenter = size.width / 2;
        var vCenter = size.height / 2;
        var unitWidth = size.width/19.2;
        var unitHeight = size.height/19.2;

        var sprite;
        if (this._turn === 'b') {
            sprite = cc.Sprite.create("./images/black_stone.png");
        } else {
            sprite = cc.Sprite.create("./images/white_stone.png");
        }
        sprite.setPosition(hCenter + ((x-9) * unitWidth), vCenter + ((y-9) * unitHeight));
        sprite.setScale(0.08);
        this.addChild(sprite, 0);
        this._board[x][y] = this._turn;
        this._turn = this._turn === 'b' ? 'w' : 'b';
    },
    init: function () {
        var layer = this;

        for (var i = 0; i < 19; i++) {
            var row = [];
            this._board.push(row);
            for (var j = 0; j < 19; j++) {
                row[j] = '';
            }
        }

        var size = cc.director.getWinSize();
        var board = cc.Sprite.create("./images/go_board.png");
        board.setPosition(size.width / 2, size.height / 2);
        board.setScale(0.4);
        this.addChild(board, 0);

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

                layer.setStone(x + 9, y + 9);
            }
        });
        cc.eventManager.addListener(listener, board);
    }
});