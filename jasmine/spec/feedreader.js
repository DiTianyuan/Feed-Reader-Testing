/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('all have a non-null URL', function() {
            for(feed of allFeeds) {
                // expect(feed.url).not.toBeNull();
                expect(feed.url).not.toBe("");

            }
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
         it('all have a non-null name', function() {
            for(feed of allFeeds) {
                // expect(feed.name).not.toBeNull();
                expect(feed.name).not.toBe("");
            }
        });
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The Menu', function() {
        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
        it('should be hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
        });


         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 当点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
        it('should be displayed when the menu icon is clicked', function() {
            //点击，菜单显示
            $(".menu-icon-link").triggerHandler("click");//触发click事件
            expect($("body").hasClass("menu-hidden")).toBeFalsy();//期望body拥有"menu-hidden"类

            //再点击，菜单隐藏
            $(".menu-icon-link").triggerHandler("click");//再次触发click事件
            expect($("body").hasClass("menu-hidden")).toBeTruthy();//期望body没有"menu-hidden"类
        });

    });


    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function() {
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
        beforeEach(function(done) {
            //调用loadFeed函数
            loadFeed(0, done);
        });

        it('should not be empty', function() {
            expect($(".feed").find(".entry").length).toBeGreaterThan(0);//期望.feed 容器元素中.entry子元素个数不为0
        });

    });


    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function() {
        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */
        var entries1,//存储一次loadFeed函数调用后的feed html
            entries2,//存储另一次loadFeed函数调用后的feed html
            len = allFeeds.length,//4
            id1 = parseInt(Math.random() * len);//获取一个0~4之间的随机整数，不包括4，即0 1 2 3中随机的一个
            id2 = parseInt(Math.random() * len);//获取一个0~4之间的随机整数，不包括4，即0 1 2 3中随机的一个

        window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;//增加等待异步操作完成的时间间隔

        beforeEach(function(done) {
           //获得一个与id1值不同的id2
            while(id2 === id1) {
                id2 = parseInt(Math.random() * len);
            }

            //随机加载两个不同的源，分别存储相应feed html
            loadFeed(id1, function() {
                entries1 = $(".feed").html();
                loadFeed(id2, function() {
                    entries2 = $(".feed").html();
                    done();
                });
            });
        });

        it('should change the entries', function(done) {
            expect(entries1).not.toEqual(entries2);//期望两个html不相同
            done();
        });

    });

    //使用未定义变量会抛出错误
    describe('Undefined Variables', function() {
        it('should not be used', function() {
            expect(function() { return aaa; }).toThrowError("aaa is not defined");
        });
    });


    //越界数据访问会抛出错误
    describe('Transborder Data', function() {
        it('should not be accessed', function() {
            expect(function() { return allFeeds[4].name; }).toThrowError("Cannot read property 'name' of undefined");
        });
    });

}());
