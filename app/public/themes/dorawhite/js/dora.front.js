function watchCreator(e, t) {
  getAjaxData('/api/user/followCreator?creatorId=' + e, function (e) {
    200 == e.status &&
      ($('#' + t)
        .find('i')
        .remove(),
      $('#' + t).text('已关注'),
      $('#' + t).attr('href', 'javascript:void(0)'));
  });
}
function reportDocument(e) {
  getAjaxData(
    '/api/user/report',
    function (e) {
      200 == e.status &&
        layer.msg(e.message, { icon: 1, time: msgTime, anim: 1 });
    },
    'post',
    {
      contentId: e,
      type:
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : '0',
    }
  );
}
function getScrollTop() {
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  );
}
function initCheckModal(e, t, n) {
  $('#checkIfDo')
    .on('show.bs.modal', function (e) {
      $(this).find('.modal-msg').text(t);
    })
    .on('hide.bs.modal', function (e) {}),
    $('#checkIfDo').modal('show'),
    (e.confirmDo = function () {
      $('#checkIfDo').modal('hide'), n();
    });
}
function renderParams(e) {
  var t = '';
  for (var n in e) t += '&' + n + '=' + e[n];
  return t.substring(1, t.length);
}
function getQueryString(e) {
  var t = new RegExp('(^|&)' + e + '=([^&]*)(&|$)'),
    n = window.location.search.substr(1).match(t);
  return null != n ? unescape(n[2]) : null;
}
(avalon.filters.cutwords = function (e, t) {
  return e
    ? e.replace(/[\u0391-\uFFE5]/g, 'aa').length > t
      ? e.substring(0, t) + '...'
      : e
    : '';
}),
  (avalon.filters.formatDateByType = function (e, t) {
    return 'mini' == t
      ? e.substring(e.length - 8, e.length - 3)
      : ((t = 'date'), e.substring(0, 9));
  }),
  (avalon.filters.renderJob = function (e, t) {
    var n = '',
      a = [];
    if (!e) return '';
    'industry' == t
      ? (a = personInfoVm.industryArr)
      : 'profession' == t
      ? (a = personInfoVm.professionArr)
      : 'experience' == t && (a = personInfoVm.experienceArr);
    var s = !0,
      o = !1,
      r = void 0;
    try {
      for (
        var i, p = a[Symbol.iterator]();
        !(s = (i = p.next()).done);
        s = !0
      ) {
        var c = i.value;
        if (c.value == e) {
          n = c.text;
          break;
        }
      }
    } catch (e) {
      (o = !0), (r = e);
    } finally {
      try {
        !s && p.return && p.return();
      } finally {
        if (o) throw r;
      }
    }
    return n;
  });
var searchVm = avalon.define({
    $id: 'headerCtr',
    lsk: [],
    searchkey: '',
    message: '',
    activeSearch: !1,
    showErr: !1,
    postArticel: function () {
      'true' == $('#logined').val()
        ? (window.location.href = '/users/userAddContent')
        : (window.location.href = '/users/login');
    },
    searchMe: function () {
      searchVm.activeSearch = !searchVm.activeSearch;
    },
    searchOpt: function () {
      searchVm.searchkey
        ? (window.location.href = '/search/' + searchVm.searchkey)
        : layer.msg(getSysValueByKey('sys_layer_validate_keyword'), {
            icon: 0,
            time: msgTime,
          });
    },
    onKeyUp: function (e) {
      e && 13 === e.keyCode && searchVm.searchOpt();
    },
  }),
  postArticelVm = avalon.define({
    $id: 'documentInfo',
    message: '',
    showErr: !1,
  });
function askContentThu(e) {
  getAjaxData('/api/user/askContentThumbsUp', function (e) {});
}
var rcStaticlVm = avalon.define({
  $id: 'rcStatic',
  askLike: function (e, t, n) {
    var a = $('#thumbs_' + n).text(),
      s = ($('#reword_' + n).text(), $('#despises_' + n).text()),
      o = $('#favoriteCommunity_' + n).text();
    '1' == t
      ? getAjaxData(
          '/api/user/askContentThumbsUp?contentId=' + n,
          function (e) {
            200 == e.status && $('#thumbs_' + n).text(Number(a) + 1);
          }
        )
      : '2' == t
      ? getAjaxData('/api/user/despiseContent?contentId=' + n, function (e) {
          200 == e.status && $('#despises_' + n).text(Number(s) + 1);
        })
      : '3' == t
      ? (window.location.href = '/details/' + n + '.html?id=comments')
      : '4' == t &&
        getAjaxData('/api/user/favoriteContent?contentId=' + n, function (e) {
          200 == e.status && $('#favoriteCommunity_' + n).text(Number(o) + 1);
        });
  },
});
function getAppendList() {
  var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : '1';
  '1' == t
    ? ((appendNewsVm.loadingState = !0), appendNewsVm.current++)
    : '2' == t &&
      ((appendNewsVm.current = 2),
      (appendNewsVm.pageSize = appendNewsVm.current * appendNewsVm.pageSize));
  var e = $('#appendType').val(),
    n = '';
  'reCommend' == e
    ? (n =
        '/api/content/getList?type=1&current=' +
        appendNewsVm.current +
        '&pageSize=' +
        appendNewsVm.pageSize +
        '&isTop=1')
    : 'hot' == e
    ? (n =
        '/api/content/getList?type=1&current=' +
        appendNewsVm.current +
        '&pageSize=' +
        appendNewsVm.pageSize +
        '&sortby=clickNum')
    : 'community' == e
    ? (n =
        '/api/community/getCommunityContents?current=' +
        appendNewsVm.current +
        '&pageSize=' +
        appendNewsVm.pageSize +
        appendNewsVm.current)
    : 'special' == e
    ? (n =
        '/api/special/getList?current=' +
        appendNewsVm.current +
        '&pageSize=' +
        appendNewsVm.pageSize)
    : 'search' == e
    ? (n =
        '/api/content/getList?current=' +
        appendNewsVm.current +
        '&pageSize=' +
        appendNewsVm.pageSize +
        '&searchkey=' +
        $('#searchkey').val())
    : 'tag' == e
    ? (n =
        '/api/content/getList?current=' +
        appendNewsVm.current +
        '&pageSize=' +
        appendNewsVm.pageSize +
        '&tagName=' +
        $('#tagName').val())
    : 'creatorContents' == e &&
      (n =
        '/api/content/getList?type=1&current=' +
        appendNewsVm.current +
        '&pageSize=' +
        appendNewsVm.pageSize),
    getAjaxData(n, function (e) {
      '1' == t && (appendNewsVm.loadingState = !1),
        0 < e.data.docs.length
          ? '1' == t
            ? (appendNewsVm.appendDocumentList =
                appendNewsVm.appendDocumentList.concat(e.data.docs))
            : '2' == t && (appendNewsVm.appendDocumentList = e.data.docs)
          : appendNewsVm.current--;
    });
}
var appendNewsVm = avalon.define({
  $id: 'appendItems',
  current: 1,
  pageSize: '',
  appendDocumentList: [],
  loadingState: !1,
  showAuthor: function (e, t, n) {
    var a = e[t];
    return a ? a[n] : '';
  },
  getMoreNews: function () {
    getAppendList();
  },
  appLike: function (e, t) {
    '1' == e
      ? getAjaxData(
          '/api/user/askContentThumbsUp?contentId=' + t,
          function (e) {
            200 == e.status && getAppendList('2');
          }
        )
      : '0' == e
      ? getAjaxData(
          '/api/user/rewordContent',
          function (e) {
            200 == e.status && getAppendList('2');
          },
          'post',
          { coins: 10, unit: 'MEC', contentId: t }
        )
      : '2' == e
      ? getAjaxData('/api/user/despiseContent?contentId=' + t, function (e) {
          200 == e.status && getAppendList('2');
        })
      : '3' == e
      ? (window.location.href = '/details/' + t + '.html?id=comments')
      : '4' == e &&
        getAjaxData('/api/user/favoriteContent?contentId=' + t, function (e) {
          200 == e.status && getAppendList('2');
        });
  },
});
function getPostMessages() {
  getAjaxData(
    '/api/contentMessage/getMessages?pageSize=100&contentId=' +
      $('#contentId').val(),
    function (e) {
      200 == e.status && (postMsgVm.messageList = e.data.docs);
    }
  );
}

var postMsgVm = avalon.define({
  $id: 'postMessage',
  content: '',
  logined: !1,
  message: '',
  showErr: !1,
  messageList: [],
  replyState: !1,
  relationMsgId: '',
  replyAuthor: '',
  adminReplyAuthor: '',
  praise_num: 0,
  despises_num: 0,
  getAuthor: function (e, t, n) {
    if (e) {
      var a = e[t];
      return a ? a : e[n] ? e[n] : '';
    }
    return '';
  },
  reSetData: function () {
    (postMsgVm.content = ''),
      (postMsgVm.relationMsgId = ''),
      (postMsgVm.replyAuthor = ''),
      (postMsgVm.adminReplyAuthor = ''),
      (postMsgVm.showErr = !1),
      (postMsgVm.message = '');
  },
  reply: function (e, t, n) {
    e &&
      t &&
      (postMsgVm.reSetData(),
      (postMsgVm.replyState = !0),
      (postMsgVm.relationMsgId = e),
      '0' == n
        ? (postMsgVm.replyAuthor = t._id)
        : (postMsgVm.adminReplyAuthor = t._id),
      $('#msgSendBox').appendTo($('#msglist_' + e)));
  },
  cancelReply: function () {
    postMsgVm.reSetData(),
      (postMsgVm.replyState = !1),
      $('#postMessage').prepend($('#msgSendBox'));
  },
  validate: {
    onError: function (e) {
      e.forEach(function (e) {
        console.log(e.getMessage());
      });
    },
    onValidateAll: function (e) {
      var t;
      e.length
        ? ((postMsgVm.showErr = !0), (postMsgVm.message = e[0].message))
        : (console.log('全部通过'),
          'true' == $('#logined').val()
            ? ((t = {
                contentId: $('#contentId').val(),
                replyAuthor: postMsgVm.replyAuthor,
                adminReplyAuthor: postMsgVm.adminReplyAuthor,
                relationMsgId: postMsgVm.relationMsgId,
                content: postMsgVm.content,
              }),
              getAjaxData(
                '/api/contentMessage/postMessages',
                function (e) {
                  200 == e.status &&
                    ($('#postMessage').prepend($('#msgSendBox')),
                    postMsgVm.reSetData(),
                    getPostMessages());
                },
                'post',
                t
              ))
            : (window.location.href = '/users/login'));
    },
  },
});
