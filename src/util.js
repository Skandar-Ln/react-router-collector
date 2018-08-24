/**
* @file util.js xx
* @author skandar(zhangtianxing@baidu.com)
*/

export function reportPath(path) {
    window._hmt = window._hmt || [];
    window._hmt.push(['_trackPageview', path]);
}

export function removeDetailId(path = '') {
    const splited = path.split('/');
    const last = splited[splited.length - 1] || '';
    const lastTwo = splited[splited.length - 2] || '';

    if (lastTwo === 'detail' || last.length > 30) {
        return splited.slice(0, -1).join('/');
    }

    if (last === 'edit') {
        return [
            ...splited.slice(0, -2),
            last
        ].join('/');
    }

    return path;
}
