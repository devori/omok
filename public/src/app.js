cc.game.onStart = function () {
    cc.director.pushScene(new ReadyScene());
};
cc.game.run("gameCanvas");