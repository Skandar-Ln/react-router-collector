/**
* @file util.test.js
* @author skandar(zhangtianxing@baidu.com)
*/
import test from 'ava';

import {reportPath, removeDetailId} from './util';

const temp = {};
let collector;
/* eslint-disable */
let _hmt;
/* eslint-disable */

function getLast(arr = []) {
    return arr[arr.length - 1];
}
/* eslint-disable */
test.before(() => {
    temp.window = global.window;
    global.window = {_hmt: []};
    _hmt = global.window._hmt;
});
/* eslint-disable */

test.after(() => {
    global.window = temp.window;
});

test('reportPath() is good', t => {
    reportPath('/customer/list');
    t.deepEqual(getLast(_hmt), ['_trackPageview', '/customer/list']);
});

test('removeDetailId() is good', t => {
    let path = removeDetailId('/customer/detail/xxxxx');
    t.is(path, '/customer/detail');

    path = removeDetailId('/customer/account/1234567890123456789012345678901');
    t.is(path, '/customer/account');

    path = removeDetailId('/customer/1234567890123456789012345678901/edit');
    t.is(path, '/customer/edit');

    path = removeDetailId('/analysis/customer-consumption');
    t.is(path, '/analysis/customer-consumption');
});
