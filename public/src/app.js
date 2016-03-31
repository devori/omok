cc.game.onStart = function () {
    //load resources
    cc.LoaderScene.preload(["./images/go_board.png"], function () {

        var App = cc.Scene.extend({
            init: function () {

            },
            onEnter: function () {
                this._super();

                var layer = new ReadyLayer();
                this.addChild(layer, 0)
                layer.init();
            }
        });

        cc.director.runScene(new App());
    }, this);
};
cc.game.run("gameCanvas");