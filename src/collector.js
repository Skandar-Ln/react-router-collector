/**
* @file collectir.js
* @author skandar(zhangtianxing@baidu.com)
*/
import {reportPath, removeDetailId} from './util';

let lastPath = '';
let prefix = '';

function fixAndReportPath(path) {
    path = removeDetailId(path);
    path = `${prefix}${path}`;
    reportPath(path);
}

function setPrefix(value = '') {
    if (value[0] !== '/') {
        value = `/${value}`;
    }

    prefix = value;
}

export const createRouteCollector = (history, prefix) => {
    // 禁掉自动收集
    window._hmt = window._hmt || [];
    window._hmt.push(['_setAutoPageview', false]);

    // 首次加载页面时触发
    setPrefix(prefix);
    const pathname = history.location.pathname;

    if (pathname && pathname !== '/') {
        lastPath = pathname;
        fixAndReportPath(lastPath);
    }

    // 监听变化
    return (location, action) => {
        if (lastPath === location.pathname) {
            return;
        }
        lastPath = location.pathname;

        setTimeout(() => {
            // 忽略掉重定向的过程
            if (lastPath === location.pathname) {
                fixAndReportPath(lastPath);
            }
        }, 2000); // 目前认为稳定2秒为有效访问，目前从线索todo页面重定向到其他页面时可能有偏差
    };
};
