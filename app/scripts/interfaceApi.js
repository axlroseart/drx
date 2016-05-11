/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-11 14:56:47
 * @version $Id$
 */

var Api = Api || {};

Api = {
    url: ctx,
    apimap: {
        route: {
            'getNoticeTitle': '/mkg/adminCommon/getAdminNotice.do',
            'getptList': '/pay/getPcodeCbBaseList',
            'getPtBalance': '/pay/getPlayerBalance'
        }
    },
    getUrl: function(apiName) {
        var params;
        if (arguments.length > 1) {
            params = arguments[1];
        }

        if (typeof Api.apimap.route[apiName] == 'object') {
            if (params) {
                if (arguments.length > 2) {
                    pageparams = arguments[2];
                    return [String(Api.apimap.route[apiName][params]).replace('.json', (pageparams.page > 1 ? '_' + pageparams.page : '') + '.json')].join('');
                }

                return [Api.apimap.route[apiName][params].join('')];
            }
        }
        return [Api.url, Api.apimap.route[apiName]].join('');
    },
    getCommon: function(route, p, fn) {
        $.ajax({
            url: Api.getUrl(route, p),
            type : "GET",
            dataType : "json",
            data: p
        }).done(function(res) {
            fn(res);
        }).fail(function() {
            fn('error');
        });
    },
    getNoticeTitle: function(p, fn) {
        Api.getCommon('getNoticeTitle', p, fn);
    },
    getptList: function(p, fn) {
        Api.getCommon('getptList', p, fn);
    },
    getPtBalance: function(p, fn) {
        Api.getCommon('getPtBalance', p, fn);
    }
}
