// 项目入口文件
// 项目同步到iPhone原理:根据单个文件,寻找依赖(require)直至整个目录


const radius = 15
const margin = 20
const height = 40
const width = $device.info.screen.width

// 全局变量
$app.img = null

$ui.render({
    props: {
        title: "Fancy QR",
    },
    views: [{
        type: "scroll",
        props: {
            id: 'container',
            bgcolor: $color("#000000"),
            radius,
        },
        layout: function (make, view) {
            // make.size.equalTo($size(0, 0))
            make.left.right.top.bottom.insets($insets(margin, margin, margin, margin))
        },
        events: {},
        views: [{
                type: "image",
                props: {
                    id: 'image',
                    bgcolor: $color('white'),
                    radius,
                },
                layout: function (make, view) {
                    make.top.inset(margin)
                    make.left.inset(margin)
                    // make.right.inset(margin)
                    make.width.equalTo(width - margin * 4)
                    make.height.equalTo(view.width)
                },
                events: {
                    tapped: function (sender) {
                        $quicklook.open({
                            image: $app.img
                        })
                    }
                }
            }, {
                type: "input",
                props: {
                    id: 'input',
                    type: $kbType.search,
                    darkKeyboard: true,
                    text: 'https://'
                },
                layout: function (make, view) {
                    make.top.equalTo($('image').bottom).offset(margin)
                    make.left.inset(margin)
                    // make.right.inset(margin)
                    make.width.equalTo(width - margin * 4)
                    make.height.equalTo(height)
                },
                events: {
                    // 回车后自动编码
                    returned: function (sender) {
                        $app.img = $qrcode.encode($('input').text);
                        $('image').data = $app.img.png
                    }
                }
            },
            {
                type: "button",
                props: {
                    title: "编码",
                    id: "encode",
                },
                layout: function (make, view) {
                    make.top.equalTo($('input').bottom).offset(margin)
                    make.left.inset(margin)
                    make.width.equalTo((width - margin * 5) / 2)
                    make.height.equalTo(height)
                },
                events: {
                    tapped: function (sender) {
                        $app.img = $qrcode.encode($('input').text);
                        $('image').data = $app.img.png
                    }
                }
            }, {
                type: "button",
                props: {
                    title: "解码",
                    id: "decode",
                },
                layout: function (make, view) {
                    make.top.equalTo($('input').bottom).offset(margin)
                    make.left.equalTo($('encode').right).offset(margin)
                    // make.right.inset(margin)
                    make.width.equalTo((width - margin * 5) / 2)
                    make.height.equalTo(height)
                },
                events: {
                    tapped: function (sender) {
                        $('input').text = $qrcode.decode($app.img);
                    }
                }
            }, {
                type: "button",
                props: {
                    title: "粘贴",
                    id: 'paste'
                },
                layout: function (make, view) {
                    make.top.equalTo($('encode').bottom).offset(margin)
                    make.left.inset(margin)
                    make.width.equalTo((width - margin * 6) / 3)
                    // make.bottom.inset(margin)
                    make.height.equalTo(view.width)
                },
                events: {
                    tapped: function (sender) {
                        $('input').text = $clipboard.text
                    }
                }
            }, {
                type: "button",
                props: {
                    title: "相册",
                    id: 'album'
                },
                layout: function (make, view) {
                    make.top.equalTo($('encode').bottom).offset(margin)
                    make.left.equalTo($('paste').right).offset(margin)
                    make.width.equalTo((width - margin * 6) / 3)
                    // make.bottom.inset(margin)
                    make.height.equalTo(view.width)
                },
                events: {
                    tapped: function (sender) {
                        $photo.pick({
                            handler: ({
                                image
                            }) => {
                                $('input').text = $qrcode.decode(image);
                                $app.img = $qrcode.encode($('input').text);
                                $('image').data = $app.img.png
                            }
                        })
                    }
                }
            }, {
                type: "button",
                props: {
                    title: "扫描",
                    id: 'shot'
                },
                layout: function (make, view) {
                    make.top.equalTo($('encode').bottom).offset(margin)
                    make.left.equalTo($('album').right).offset(margin)
                    make.width.equalTo((width - margin * 6) / 3)
                    make.height.equalTo(view.width)
                },
                events: {
                    tapped: function (sender) {
                        $qrcode.scan(function (text) {
                            $('input').text = text
                            $app.img = $qrcode.encode(text);
                            $('image').data = $app.img.png
                        })
                    }
                }
            }
        ]

    }]
});


(function init() {
    $app.img = $qrcode.encode($('input').text);
    $('image').data = $app.img.png
})();