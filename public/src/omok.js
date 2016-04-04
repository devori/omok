var OmokCore = (function () {
    var _SIZE = 19
        , _turn
        , _board = []
        , _seqStack = []
        , _validators = [];
    
    return {
        start: function () {
            var i, j;
            for (i = 0; i < _SIZE; i++) {
                _board[i] = [];
                for (j = 0; j < _SIZE; j++) {
                    _board[i][j] = '';
                }
            }
            _seqStack = [];
            _turn = 'b';
        },
        push: function (i, j, stone) {
            var idx;
            if (_board[i][j] !== '') {
                return false;
            }

            for (idx = 0; idx < _validators.length; idx++) {
                if (!_validators[idx](i, j, stone)) {
                    return false;
                }
            }

            _board[i][j] = stone;
            _seqStack.push({i: i, j: j, stone: stone});
            _turn = stone === 'b' ? 'w' : 'b';
            return true;
        },
        pop: function () {
            var step = this._seqStack.pop();
            _board[step.i][step.j] = '';
            _turn = step.stone;
        },
        check: function (length) {
            length = length || 5;

            var d, i, j, k, l, ti, tj;
            var stone, win;
            var direction = [[0, 1], [1, 0], [1, 1], [1, -1]]
            for (i = 0; i < _SIZE; i++) {
                for (j = 0; j < _SIZE; j++) {
                    if (_board[i][j] === '') {
                        continue;
                    }
                    
                    stone = _board[i][j];
                    for (k = 0; k < direction.length; k++) {
                        d = direction[k];
                        win = true;
                        for (l = 1; l < length; l++) {
                            ti = i+(d[0]*l);
                            tj = j+(d[1]*l);
                            if (ti < 0 || ti >= _SIZE || tj < 0 || tj >= _SIZE || stone !== _board[ti][tj]) {
                                win = false;
                                break;
                            }
                        }

                        ti = i - d[0];
                        tj = j - d[1];
                        if (ti < 0 || ti >= _SIZE || tj < 0 || tj >= _SIZE || stone === _board[ti][tj]) {
                            win = false;
                        }

                        ti = i+(d[0]*length);
                        tj = j+(d[1]*length);
                        if (ti < 0 || ti >= _SIZE || tj < 0 || tj >= _SIZE || stone === _board[ti][tj]) {
                            win = false;
                        }
                        if (win) {
                            return true;
                        }
                    }
                }
            }
            
            return false;
        },
        getTurn: function () {
            return _turn;
        }
    };
})();