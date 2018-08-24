/**
* @file collector.test.js
* @author skandar(zhangtianxing@baidu.com)
*/
import test from 'ava';

import {createRouteCollector} from './collector';
const temp = {};
let collector;
/* eslint-disable */
let _hmt;
/* eslint-disable */

function getLast(arr = []) {
    return arr[arr.length - 1];
}

test.beforeEach(() => {
    temp.window = global.window;
    /* eslint-disable */
    global.window = {_hmt: []};
    _hmt = global.window._hmt;
    /* eslint-disable */
});

test.afterEach(() => {
    global.window = temp.window;
});

test('init / should not be report', t => {
    collector = createRouteCollector({location: {
        pathname: '/'
    }});
    t.is(_hmt.length, 1); // 第一个是禁止自动统计的配置
});

test('init /home should not be report', t => {
    collector = createRouteCollector({location: {
        pathname: '/home'
    }}, 'xx-web');
    t.deepEqual(getLast(_hmt), ['_trackPageview', '/xx-web/home']);
});

test.cb('changes should not be report', t => {
    collector = createRouteCollector({location: {
        pathname: '/home'
    }}, '/xx-web');

    collector({pathname: '/redirect/list'});
    collector({pathname: '/redirect/list'});
    collector({pathname: '/target/list'});
    setTimeout(() => {
        t.deepEqual(getLast(_hmt), ['_trackPageview', '/xx-web/target/list']);
        t.end();
    }, 2000);
});
