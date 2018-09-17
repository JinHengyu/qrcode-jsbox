// 项目入口文件
// 项目同步到iPhone原理:根据单个文件,寻找依赖(require)直至整个目录

// $app.test = 123

const radius = 15

// require('./test/mine.js')


$ui.render({
    props: {
        title: "Tetris",
    },
    views: [{
        type: "button",
        props: {
            id: 'str2img',
            bgcolor: $color("#FF0000"),
            radius: 15,
            title: 'string2image'
        },
        layout: function (make, view) {
            make.size.equalTo($size(100, 200))
            // console.log(typeof (view.super.height))
            // make.height.equalTo(view.super.height/3)
            make.left.top.right.inset(20)
            // make.height.equalTo(view.width)
        },
        events: {
            tapped: function (sender) {
                // $('test3').updateLayout((make, view) => {
                //     make.left.right.top.bottom.insets($insets(20, 20, 20, 20))

                // })

                $('str2img').super.add({
                    type: "button",
                    props: {
                        id: 'test3',
                        bgcolor: $color("#000000"),
                        radius: 15,
                    },
                    layout: function (make, view) {
                        // make.size.equalTo($size(0, 0))
                        make.left.right.top.bottom.insets($insets(20, 20, 20, 20))
                    },
                    events: {
                        tapped: function (sender) {
                            $('test3').remove()
                        }
                    },
                    views: [{
                        type: "input",
                        props: {
                            id: 'input',
                            type: $kbType.search,
                            darkKeyboard: true,
                            text: 'https://'
                        },
                        layout: function (make, view) {
                            make.top.equalTo(view.super).offset(20)
                            make.width.equalTo($size(150, 40))
                            make.height.equalTo(40)
                            make.left.right.insets($insets(20, 20, 20, 20))
                        },
                        events: {
                            returned: function (sender) {
                                $('image').data = $qrcode.encode($('input').text).png
                            }
                        }
                    }, {
                        type: "button",
                        props: {
                            title: "paste",
                            id: 'paste'
                        },
                        layout: function (make, view) {
                            make.top.equalTo($('input').bottom).offset(20)
                            make.left.inset(20)
                            make.width.equalTo(64)
                            make.height.equalTo(40)
                        },
                        events: {
                            tapped: function (sender) {
                                $('input').text = $clipboard.text
                            }
                        }
                    }, {
                        type: "button",
                        props: {
                            title: "generate",
                            id: "generate",
                        },
                        layout: function (make, view) {
                            make.top.equalTo($('input').bottom).offset(20)
                            make.left.equalTo($('paste').right).offset(20)
                            make.right.inset(20)
                            make.height.equalTo(40)
                        },
                        events: {
                            tapped: function (sender) {
                                let img = $qrcode.encode($('input').text);
                                $('image').data = img.png
                            }
                        }
                    }, {
                        type: "image",
                        props: {
                            id: 'image',
                            bgcolor: $color('white'),
                            radius: 15,
                            // size:$size(200,200)
                        },
                        layout: function (make, view) {
                            make.top.equalTo($('paste').bottom).offset(20)
                            make.left.inset(20)
                            make.right.inset(20)
                            // make.bottom.inset(20)
                            make.height.equalTo(view.width)
                        },
                        events: {
                            tapped: function (sender) {

                            }
                        }
                    }]
                })

            }
        }
    }, {
        type: "button",
        props: {
            id: 'test2',
            bgcolor: $color("#FF0000"),
            radius: 15,
            title: 'image2string'
        },
        layout: function (make, view) {
            make.top.equalTo($('str2img').bottom).offset(20)
            make.size.equalTo($size(100, 200))
            make.left.right.inset(20)
        },
        events: {
            tapped: function (sender) {

            }
        }
    }]
})