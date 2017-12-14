new Vue({
    el: '.main',
    watch: {
        choose: function (newValue, oldValue) {
            // choose改变就进行结果验证
            // 从point 中 抽离 X 和 O
            let x = [];
            let o = [];
            this.point.map((val) => {
                if (val[Object.keys(val)[0]] === "X") {
                    x.push(parseInt(Object.keys(val)[0]))
                } else if (val[Object.keys(val)[0]] === "O") {
                    o.push(parseInt(Object.keys(val)[0]))
                }
            });
            console.log(x, o);
            if (x.length + x.length === 9) {
                this.toaTitle = "You Win!";
                this.$message({
                    message: 'Oh!DogFail',
                });
                this.restart();
            }
            if (this.checkSuccess(x)) {
                if (this.youChoose === 'X') {
                    this.toaTitle = "You Win!";
                    this.uwincount++;
                    this.$message({
                        message: 'Well Done! You win!',
                        type: 'success'
                    });
                    this.restart();
                } else {
                    this.toaTitle = "You Loss!";
                    this.cwincount++;
                    this.$message({
                        message: 'Sorry! You loss!',
                        type: 'warning'
                    });
                    this.restart();
                }
            } else if (this.checkSuccess(o)) {
                if (this.youChoose === 'O') {
                    this.toaTitle = "You Win!";
                    this.uwincount++;
                    this.$message({
                        message: 'Well Done! You win!',
                        type: 'success'
                    });
                    this.restart();
                } else {
                    this.toaTitle = "You Loss!";
                    this.cwincount++;
                    this.$message({
                        message: 'Sorry! You loss!',
                        type: 'warning'
                    });
                    this.restart();
                }
            }
        },
        toaTitle: function (newValue, oldValue) {
            if (newValue === "You Turn!") {
                this.youCanChoose = true;
            } else {
                this.youCanChoose = false;
            }
            if (newValue === "Computer Turn!") {
                this.computerTurn();
            }
        }
    },
    data() {
        return {
            title: "MIFind TicTacToeGame",
            uwincount: 0,
            cwincount: 0,
            youChoose: '',
            loading: false,
            youCanChoose: false,
            you: '', //flag : true "O" false "X" 你选择使用x or o
            toaTitle: "Please Choose Your Letter",
            choose: true, //flag:  true "O" false "X"
            toeChooseShow: true,
            point: [
                {"0": "", frozen: false},
                {"1": "", frozen: false},
                {"2": "", frozen: false},
                {"3": "", frozen: false},
                {"4": "", frozen: false},
                {"5": "", frozen: false},
                {"6": "", frozen: false},
                {"7": "", frozen: false},
                {"8": "", frozen: false},
            ],
            rules: [
                [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [6, 7, 8], [3, 4, 5]
            ]
        }
    },
    methods: {
        strike(id) {
            if (this.youChoose === '') {
                return;
            }
            if (!this.point[id].frozen && this.youCanChoose) {
                this.point[id][id] = this.youChoose === 'O' ? "O" : "X";
                this.point[id]["frozen"] = true;
                this.choose = !this.choose;
                // choose == true ==> "O" ==> header 改变
                this.you = !this.you;
                if (this.you) {
                    this.toaTitle = "You Turn!"
                } else {
                    this.toaTitle = "Computer Turn!";
                }
            }
        },
        checkSuccess(arr) {
            let result = false;
            this.rules.forEach((p) => {
                let temp = 0;
                p.map((item) => {
                    if (arr.indexOf(item) >= 0) {
                        temp++;
                    }
                });
                if (temp === 3) {
                    result = true;
                }
            });
            return result;
        },
        toaChoose(e) {
            this.toaTitle = `You Choose ${e.target.innerText}`;
            this.you = e.target.innerText === "O";
            this.youChoose = e.target.innerText;
            if (e.target.innerText === "O") {
                this.toaTitle = "You Turn!";
                this.you = true;
            } else {
                this.toaTitle = "Computer Turn!";
                this.you = false;
            }
        },
        // 模拟电脑输入
        computerTurn() {
            setTimeout(() => {
                let rest = [];
                this.point.map((v, index) => {
                    // frozen 如果是 true 则已经被选择了
                    if (!v.frozen) {
                        rest.push(index);
                    }
                });
                let index = parseInt((rest.length) * Math.random());
                let id = rest[index];
                this.point[id][id] = this.youChoose === 'X' ? "O" : "X";
                this.point[id]["frozen"] = true;
                this.choose = !this.choose;
                this.you = !this.you;
                // 获取0-rest.length之间的随机数
                if (this.you) {
                    this.toaTitle = "You Turn!"
                } else {
                    this.toaTitle = "Computer Turn!"
                }
            }, 800);
        },
        restart() {
            this.loading = true;
            setTimeout(() => {
                this.you = ''; //flag : true "O" false "X" 你选择使用x or o
                this.toaTitle = "Please Choose Your Letter";
                this.frozen = false;
                this.toeChooseShow = true;
                this.youChoose = '';
                this.loading = false;
                this.point = [
                    {"0": "", frozen: false},
                    {"1": "", frozen: false},
                    {"2": "", frozen: false},
                    {"3": "", frozen: false},
                    {"4": "", frozen: false},
                    {"5": "", frozen: false},
                    {"6": "", frozen: false},
                    {"7": "", frozen: false},
                    {"8": "", frozen: false},
                ];
            }, 1500);
        }
    }
});
