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

ClientAI.prototype.countPoint = function (i, j, turn) {
//    var d, direction = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    var d, direction = [[1, 0], [1, 1], [0, 1], [-1, 1]];
    var k, l, cnt, point = 0;
    if (this.board[i][j] !== '') {
        return -10000000;
    }
    if (this.canWin(i, j, turn, this.SIZE, this.board)) {
        return 1000000;
    }

    var ti, tj, limit = 4;
    for (k = 0; k < direction.length; k++) {
        d = direction[k];
        cnt = 0;
        for (l = 1; l < limit; l++) {
            for( m = 0; m < 2; m++){
                if( m % 2 == 0 ){
                    ti = i+(d[0]*l);
                    tj = j+(d[1]*l);
                } else {
                    ti = i-(d[0]*l);
                    tj = j-(d[1]*l);
                }
                if (ti < 0 || ti >= this.SIZE || tj < 0 || tj >= this.SIZE) {
                    break;
                }
                if (this.board[ti][tj] != '') {
                    point += limit - l;
                }
            }
        }
    }

    point += this.calSeqPoint(i, j, turn, this.SIZE, this.board);

    return point;
}

ClientAI.prototype.calculate = function (turn) {
    var i, j, map = [];
    for (i = 0; i < this.SIZE; i++) {
        map[i] = [];
        for (j = 0; j < this.SIZE; j++) {
            map[i][j] = 0;
            map[i][j] += this.countPoint(i, j, turn);
        }
    }
    return map;
}

ClientAI.prototype.getNext = function () {
    var turn = OmokCore.getTurn();
    var i, j, ret;
    var pointMap = this.calculate(turn);

    var maxPoint = -1;
    var result = {stone: turn};
    for (i = 0; i < this.SIZE; i++) {
        for (j = 0; j < this.SIZE; j++) {
            if (pointMap[i][j] > maxPoint) {
                result.i = i;
                result.j = j;
                maxPoint = pointMap[i][j];
            }
        }
    }

    return result;
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
        for (l = 1; l < 5; l++) {
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

        ti = i+(d[0]*5);
        tj = j+(d[1]*5);
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

ClientAI.prototype.calSeqPoint = function (i, j, turn){
    var beforeStone;
    var direction = [[1, 0], [1, 1], [0, 1], [-1, 1]];

    if(turn === 'b'){
        beforeStone = 'w';
    } else {
        beforeStone = 'b';
    }

    var length = 4;
    var result = 0;
    var d, l, k, li, lj, seqCnt;
    for (k = 0; k< direction.length; k++){
        d = direction[k];

        seqCnt = 0;
        for (l = 1; l <= length; l++){
            li = i+(d[0]*l);
            lj = j+(d[1]*l);
            if(li < 0 || li >= this.SIZE || lj < 0 || lj >= this.SIZE || beforeStone !== this.board[li][lj]){
                break;
            }
            seqCnt++;
        }

        d[0] *= -1;
        d[1] *= -1;
        for (l = 1; l <= length; l++){
            li = i+(d[0]*l);
            lj = j+(d[1]*l);
            if(li < 0 || li >= this.SIZE || lj < 0 || lj >= this.SIZE || beforeStone !== this.board[li][lj]){
                break;
            }
            seqCnt++;
        }

        switch (seqCnt) {
            case 1:
                result += 10;
                break;
            case 2:
                result += 100;
                break;
            case 3:
                result += 1000;
                break;
            case 4:
                result += 10000;
                break;
            default:
                break;
        }
    }
    return result;
}