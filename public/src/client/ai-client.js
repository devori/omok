var ClientAI = function (size) {
    var i, j;

    this.SIZE = size || 19;
    this.board = [];
    for (i = 0; i < this.SIZE; i++) {
        this.board[i] = [];
        for (j = 0; j < this.SIZE; j++) {
            this.board[i][j] = '';
        }
    }
};

ClientAI.prototype.getNext = function () {
    nextStone = OmokCore.getTurn();
    for (i = 0; i < this.SIZE; i++) {
        for (j = 0; j < this.SIZE; j++) {
            if (this.board[i][j] !== '') {
                continue;
            }
            if (this.canWin(i, j, nextStone)) {
                return {i:i, j:j, stone:nextStone};
            }
        }
    }

    for (i = 0; i < this.SIZE; i++) {
        for (j = 0; j < this.SIZE; j++) {
            if (this.board[i][j] !== '') {
                continue;
            }
            return {i:i, j:j, stone:nextStone};
        }
    }
}

ClientAI.prototype.push = function (x, y, stone) {
    var i, j, nextStone;
    var scene = cc.director.getRunningScene();
    this.board[x][y] = stone;
}

ClientAI.prototype.canWin = function (i, j, stone) {
    var d, i, j, k, l, ti, tj;
    var stone, win;
    var direction = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

    var result = false;
    this.board[i][j] = stone;
    for (k = 0; k < direction.length; k++) {
        d = direction[k];
        win = true;
        for (l = 1; l < length; l++) {
            ti = i+(d[0]*l);
            tj = j+(d[1]*l);
            if (ti < 0 || ti >= this.SIZE || tj < 0 || tj >= this.SIZE || stone !== this.board[ti][tj]) {
                win = false;
                break;
            }
        }

        ti = i - d[0];
        tj = j - d[1];
        if (ti < 0 || ti >= this.SIZE || tj < 0 || tj >= this.SIZE || stone === this.board[ti][tj]) {
            win = false;
        }

        ti = i+(d[0]*length);
        tj = j+(d[1]*length);
        if (ti < 0 || ti >= this.SIZE || tj < 0 || tj >= this.SIZE || stone === this.board[ti][tj]) {
            win = false;
        }
        if (win) {
            result = true;
            break;
        }
    }
    this.board[i][j] = '';

    return result;
}