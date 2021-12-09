var _avalon$define, _avalon$define2;
function _defineProperty(e, s, o) {
  return (
    s in e
      ? Object.defineProperty(e, s, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[s] = o),
    e
  );
}
$(function () {
  (window.__lk = ''),
    $('#sysKeys').val() &&
      ((window.__lk = JSON.parse($('#sysKeys').val())), $('#sysKeys').remove()),
    $('#userLoginOut').click(function () {
      loginOut();
    }),
    $('#gotop').click(function () {
      return $('body,html').animate({ scrollTop: 0 }, 800), !1;
    }),
    $(window).scroll(function (e) {
      200 <
      (document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop)
        ? $('#gotop').css('opacity', 1)
        : $('#gotop').css('opacity', 0);
    });
});
var msgTime = 800;
function checkIfMobile() {
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}
function getAjaxData(e) {
  var s =
      1 < arguments.length && void 0 !== arguments[1]
        ? arguments[1]
        : function () {},
    o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 'get',
    n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {},
    t =
      4 < arguments.length && void 0 !== arguments[4]
        ? arguments[4]
        : function () {};
  layer.load(2, { shade: [0.3, '#000'] });
  var a = {
    url: e,
    type: o.toLocaleUpperCase(),
    success: function (e) {
      layer.closeAll('loading'),
        500 === e.status
          ? (layer.msg(e.message, {
              icon: 2,
              shade: [0.001, '#000'],
              zIndex: 999999999,
              time: msgTime,
            }),
            t && t())
          : 401 === e.status
          ? layer.confirm(e.message, {
              title: getSysValueByKey('sys_layer_confirm_title'),
              btn: getSysValueByKey('sys_layer_confirm_btn_yes'),
              yes: function (e) {
                layer.close(e);
              },
            })
          : s && s(e);
    },
    error: function (e) {
      layer.closeAll('loading');
      var s = e.message || 'Server error!';
      layer.msg(s, { icon: 2, time: msgTime });
    },
  };
  'post' == o
    ? (a = Object.assign({}, a, { data: n }))
    : (e.indexOf('?'), (a.url = e)),
    $.ajax(a);
}
function getSysValueByKey(e) {
  return window.__lk ? window.__lk[e] : '';
}
function loginOut() {
  layer.confirm(getSysValueByKey('sys_layer_confirm_logOut'), {
    title: getSysValueByKey('sys_layer_confirm_title'),
    btn: getSysValueByKey('sys_layer_confirm_btn_yes'),
    yes: function (e) {
      layer.close(e),
        getAjaxData('/api/user/logOut', function (e) {
          200 == e.status &&
            layer.msg(e.message, { icon: 1, time: msgTime }, function () {
              window.location = '/';
            });
        });
    },
  });
}
function renderParams(e) {
  var s = '';
  for (var o in e) s += '&' + o + '=' + e[o];
  return s.substring(1, s.length);
}
function getQueryString(e) {
  var s = new RegExp('(^|&)' + e + '=([^&]*)(&|$)'),
    o = window.location.search.substr(1).match(s);
  return null != o ? unescape(o[2]) : null;
}
layer.config({ extend: 'blue/layer.css', skin: 'layui-layer-blue' });
var _oldValuesOfPersonInfoVM = {},
  personInfoVm = avalon.define({
    $id: 'personInfo',
    message: '',
    showErr: !1,
    industry: '',
    introduction: '',
    profession: '1',
    experience: '1',
    comments: '',
    gender: '0',
    userName: '',
    userId: '',
    selected: '1',
    follow_num: 0,
    total_despiseNum: 0,
    total_likeNum: 0,
    total_reward_num: 0,
    approveCreatorIndentify: function () {
      layer.alert(getSysValueByKey('label_system_waitfor_update'));
    },
    industryArr: [],
    professionArr: [],
    experienceArr: [],
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        var s;
        e.length
          ? (console.log('有表单没有通过', e),
            layer.msg(e[0].message, {
              icon: 2,
              shade: [0.001, '#000'],
              time: msgTime,
            }))
          : (console.log('全部通过'),
            (s = {}),
            personInfoVm.userName && (s.userName = personInfoVm.userName),
            personInfoVm.introduction &&
              (s.introduction = personInfoVm.introduction),
            personInfoVm.gender && (s.gender = personInfoVm.gender),
            personInfoVm.profession && (s.profession = personInfoVm.profession),
            personInfoVm.industry && (s.industry = personInfoVm.industry),
            personInfoVm.experience && (s.experience = personInfoVm.experience),
            personInfoVm.label_introduction &&
              (s.label_introduction = personInfoVm.label_introduction),
            personInfoVm.comments && (s.comments = personInfoVm.comments),
            $('.form_datetime').data('datetimepicker').getDate() &&
              (s.birth = $('.form_datetime').data('datetimepicker').getDate()),
            getAjaxData(
              '/api/user/updateInfo',
              function (e) {
                200 == e.status &&
                  (layer.msg(e.message, { icon: 1, time: msgTime }),
                  personInfoVm.getUserInfo(personInfoVm.userId));
              },
              'post',
              s
            ));
      },
    },
    getUserInfo: function (e) {
      getAjaxData('/api/user/getUserInfoById?id=' + e, function (e) {
        var s = e.data,
          o = s.id,
          n = s.industry,
          t = s.profession,
          a = s.experience,
          r = s.comments,
          i = s.gender,
          m = s.userName,
          l = s.birth,
          d = s.introduction,
          g = s.follow_num,
          u = s.total_despiseNum,
          c = s.total_likeNum,
          f = s.total_reward_num;
        (personInfoVm.introduction = d || ''),
          (personInfoVm.industry = n || ''),
          (personInfoVm.profession = t || ''),
          (personInfoVm.experience = a || ''),
          (personInfoVm.comments = r || ''),
          (personInfoVm.gender = i),
          (personInfoVm.userName = m),
          (personInfoVm.userId = o),
          (personInfoVm.follow_num = g),
          (personInfoVm.total_despiseNum = u),
          (personInfoVm.total_likeNum = c),
          (personInfoVm.total_reward_num = f),
          l && $('.form_datetime').datetimepicker('update', l);
      });
    },
  }),
  confirmEmailVm = avalon.define({
    $id: 'confirmEmail',
    email: '',
    message: '',
    showErr: !1,
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            (confirmEmailVm.showErr = !0),
            (confirmEmailVm.message = e[0].message))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/sentConfirmEmail',
              function (e) {
                200 == e.status
                  ? layer.msg(
                      e.message,
                      { icon: 1, anim: 1, time: msgTime },
                      function () {
                        window.location.href = '/';
                      }
                    )
                  : ((confirmEmailVm.showErr = !0),
                    (confirmEmailVm.message = e.message));
              },
              'post',
              { email: confirmEmailVm.email }
            ));
      },
    },
  }),
  userTellLoginVm = avalon.define({
    $id: 'userTellLogin',
    phoneNum: '',
    countryCode: '',
    message: '',
    showErr: !1,
    basetime: 120,
    targetPanel: '1',
    reset: function () {
      (userTellLoginVm.phoneNum = ' '), (userTellLoginVm.messageCode = ' ');
    },
    messageCode: '',
    lateResendTxt: ' s',
    reSendBtnTxt: getSysValueByKey('label_system_resend'),
    sendMsgCode: function () {
      if (120 != userTellLoginVm.basetime) return !1;
      /^[0-9]*$/.test(userTellLoginVm.phoneNum)
        ? ($('#get-v-code').prop('disabled', 'disabled'),
          getAjaxData(
            '/api/user/sendVerificationCode',
            function (e) {
              var s = setInterval(function () {
                $('#get-v-code').html(
                  --userTellLoginVm.basetime + userTellLoginVm.lateResendTxt
                );
              }, 1e3);
              setTimeout(function () {
                clearInterval(s),
                  $('#get-v-code').removeAttr('disabled'),
                  $('#get-v-code').html(
                    getSysValueByKey('label_system_resend')
                  ),
                  (userTellLoginVm.basetime = 120);
              }, 1e3 * userTellLoginVm.basetime);
            },
            'post',
            {
              phoneNum: userTellLoginVm.phoneNum,
              countryCode: userTellLoginVm.countryCode || '86',
              messageType: '1',
            }
          ))
        : layer.open({
            content: getSysValueByKey('sys_layer_validate_phoneNum'),
            skin: 'msg',
            time: 1,
            anim: !1,
          });
    },
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            layer.msg(e[0].message, {
              icon: 2,
              shade: [0.001, '#000'],
              time: msgTime,
            }))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/doLogin',
              function (e) {
                200 == e.status &&
                  layer.msg(
                    e.message,
                    _defineProperty({ icon: 1, time: 1 }, 'time', msgTime),
                    function () {
                      window.location.href = '/ ';
                    }
                  );
              },
              'post',
              {
                loginType: '1',
                phoneNum: userTellLoginVm.phoneNum,
                messageCode: userTellLoginVm.messageCode,
                countryCode: userTellLoginVm.countryCode || '86',
              }
            ));
      },
    },
  }),
  userPwdLoginVm = avalon.define({
    $id: 'userPwdLogin',
    password: '',
    countryCode: '',
    phoneNum: '',
    message: '',
    showErr: !1,
    reset: function () {
      (userPwdLoginVm.phoneNum = ' '), (userPwdLoginVm.password = ' ');
    },
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            layer.msg(e[0].message, {
              icon: 2,
              shade: [0.001, '#000'],
              time: msgTime,
            }))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/doLogin',
              function (e) {
                200 == e.status &&
                  layer.msg(e.message, { icon: 1, time: msgTime }, function () {
                    window.location.href = '/ ';
                  });
              },
              'post',
              {
                loginType: '2',
                countryCode: userTellLoginVm.countryCode,
                phoneNum: userPwdLoginVm.phoneNum,
                password: userPwdLoginVm.password,
              }
            ));
      },
    },
  }),
  userEmailLoginVm = avalon.define({
    $id: 'userEmailLogin',
    email: '',
    message: '',
    showErr: !1,
    targetPanel: '3',
    reset: function () {
      (userEmailLoginVm.email = ' '), (userEmailLoginVm.messageCode = ' ');
    },
    password: '',
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? layer.msg(e[0].message, {
              icon: 2,
              shade: [0.001, '#000'],
              time: msgTime,
            })
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/doLogin',
              function (e) {
                200 == e.status &&
                  layer.msg(
                    e.message,
                    _defineProperty({ icon: 1, time: 1 }, 'time', msgTime),
                    function () {
                      window.location.href = '/ ';
                    }
                  );
              },
              'post',
              {
                loginType: '3',
                email: userEmailLoginVm.email,
                password: userEmailLoginVm.password,
              }
            ));
      },
    },
  });
function getUserRelevantList(e, s, o) {
  var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {},
    t = '';
  n && (t = renderParams(n)),
    getAjaxData('/api' + e + '?current=' + o + '&' + t, function (e) {
      200 == e.status &&
        ('myContents' == s
          ? ((myContentsVm.myContentList = e.data.docs),
            (myContentsVm.contentTotalPage = e.data.pageInfo.totalPage))
          : 'myMessages' == s
          ? ((myContentsVm.myMessageList = e.data.docs),
            (myContentsVm.messageTotalPage = e.data.pageInfo.totalPage))
          : 'myJoinTopics' == s &&
            ((myContentsVm.myJoinTopicsList = e.data.docs),
            (myContentsVm.joinTopicsTotalPage = e.data.pageInfo.totalPage)));
    });
}
var myContentsVm = avalon.define({
    $id: 'my-contents',
    myContentList: [],
    myMessageList: [],
    myJoinTopicsList: [],
    contentTotalPage: 1,
    messageTotalPage: 1,
    joinTopicsTotalPage: 1,
    contentPageClick: function (e, s) {
      getUserRelevantList('/content/getUserContents', 'myContents', s, {
        userId: $('#userId').val(),
        listState: 'all',
      });
    },
    messagePageClick: function (e, s) {
      getUserRelevantList('/systemNotify/getUserNotifys', 'myMessages', s, {
        userId: $('#userId').val(),
      });
    },
    joinTopicPageClick: function (e, s) {
      getUserRelevantList('/contentMessage/getMessages', 'myJoinTopics', s, {
        userId: $('#userId').val(),
      });
    },
    showMessageDetails: function (e, s) {
      e.preventDefault();
      var o = e.target;
      $(o).toggleClass('fa-angle-down'),
        $(o).parent().next().toggleClass('show'),
        s.isRead ||
          getAjaxData(
            '/api/systemNotify/setNoticeRead?ids=' + s.id,
            function (e) {
              200 == e.status &&
                getUserRelevantList(
                  '/systemNotify/getUserNotifys',
                  'myMessages',
                  1
                );
            }
          );
    },
    deleteNotify: function (s) {
      layer.confirm(getSysValueByKey('sys_layer_confirm_delete'), {
        title: getSysValueByKey('sys_layer_confirm_title'),
        btn: getSysValueByKey('sys_layer_confirm_btn_yes'),
        yes: function (e) {
          layer.close(e),
            getAjaxData(
              '/api/systemNotify/delUserNotify?ids=' + s,
              function (e) {
                200 == e.status &&
                  layer.msg(
                    getSysValueByKey('sys_layer_option_success'),
                    { icon: 1 },
                    function () {
                      getUserRelevantList(
                        '/systemNotify/getUserNotifys',
                        'myMessages',
                        1
                      );
                    }
                  );
              }
            );
        },
      });
    },
  }),
  regVm = avalon.define({
    $id: 'regAction',
    regType: '2',
    userName: '',
    phoneNum: '',
    email: '',
    password: '',
    countryCode: '',
    message: '',
    showErr: !1,
    basetime: 120,
    targetPanel: '1',
    reset: function () {
      (regVm.userName = ''),
        (regVm.email = ''),
        (regVm.phoneNum = ''),
        (regVm.messageCode = ''),
        (regVm.password = '');
    },
    messageCode: '',
    lateResendTxt: ' s',
    reSendBtnTxt: getSysValueByKey('label_system_resend'),
    mytask: '',
    clearSmsBtn: function () {
      regVm.task &&
        (clearInterval(regVm.mytask),
        $('#vCodeBtn').removeAttr('disabled'),
        $('#vCodeBtn').html(getSysValueByKey('label_system_resend')),
        (regVm.basetime = 120)),
        regVm.reset();
    },
    sendMsgCode: function () {
      if (120 != regVm.basetime) return !1;
      if ('1' == regVm.regType) {
        if (!/^[0-9]*$/.test(regVm.phoneNum))
          return (
            layer.open({
              content: getSysValueByKey('sys_layer_validate_phoneNum'),
              skin: 'msg',
            }),
            !1
          );
      } else if (
        '2' == regVm.regType &&
        !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          regVm.email
        )
      )
        return (
          layer.open({
            content: getSysValueByKey('sys_layer_validate_email'),
            skin: 'msg',
          }),
          !1
        );
      if (!regVm.password)
        return (
          layer.open({
            content: getSysValueByKey('sys_layer_validate_password'),
            skin: 'msg',
          }),
          !1
        );
      $('.vCodeBtn').prop('disabled', 'disabled');
      var e = { messageType: '0', sendType: regVm.regType };
      '1' == regVm.regType
        ? ((e.phoneNum = regVm.phoneNum),
          (e.countryCode = regVm.countryCode || '86'))
        : '2' == regVm.regType && (e.email = regVm.email),
        getAjaxData(
          '/api/user/sendVerificationCode',
          function (e) {
            layer.msg('已发送验证码', { icon: 1, time: msgTime }),
              (regVm.mytask = setInterval(function () {
                $('.vCodeBtn').html(--regVm.basetime + regVm.lateResendTxt);
              }, 1e3)),
              setTimeout(function () {
                clearInterval(regVm.mytask),
                  $('.vCodeBtn').removeAttr('disabled'),
                  $('.vCodeBtn').html(getSysValueByKey('label_system_resend')),
                  (regVm.basetime = 120);
              }, 1e3 * regVm.basetime);
          },
          'post',
          e
        );
    },
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        var s;
        e.length
          ? (console.log('有表单没有通过', e),
            layer.msg(e[0].message, {
              icon: 2,
              shade: [0.001, '#000'],
              time: msgTime,
            }))
          : (console.log('全部通过'),
            (s = {
              regType: regVm.regType,
              password: regVm.password,
              messageCode: regVm.messageCode,
            }),
            '1' == regVm.regType
              ? ((s.phoneNum = regVm.phoneNum),
                (s.countryCode = regVm.countryCode || '86'))
              : '2' == regVm.regType &&
                ((s.email = regVm.email), (s.userName = regVm.userName)),
            getAjaxData(
              '/api/user/doReg',
              function (e) {
                200 == e.status &&
                  layer.msg(e.message, { icon: 1, time: msgTime }, function () {
                    window.location.href = '/users/login';
                  });
              },
              'post',
              s,
              function () {
                regVm.clearSmsBtn();
              }
            ));
      },
    },
  }),
  getBackPsdVm = avalon.define({
    $id: 'getBackPsd',
    password: '',
    confirmPassword: '',
    message: '',
    showErr: !1,
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            (getBackPsdVm.showErr = !0),
            (getBackPsdVm.message = e[0].message))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/updateNewPsd',
              function (e) {
                200 == e.status &&
                  layer.msg(e.message, { icon: 1 }, function () {
                    window.location.href = '/users/login';
                  });
              },
              'post',
              {
                tokenId: $('#tokenId').val(),
                confirmPassword: getBackPsdVm.confirmPassword,
                password: getBackPsdVm.password,
              }
            ));
      },
    },
  }),
  reSetPsdVm = avalon.define(
    (_defineProperty(
      (_avalon$define = {
        $id: 'reSetPsd',
        password: '',
        confirmPassword: '',
        phoneNum: '',
        countryCode: '',
        messageCode: '',
        message: '',
        showErr: !1,
        basetime: 120,
        targetPanel: '1',
        reset: function () {
          (reSetPsdVm.phoneNum = ' '), (reSetPsdVm.messageCode = ' ');
        },
      }),
      'messageCode',
      ''
    ),
    _defineProperty(_avalon$define, 'lateResendTxt', ' s'),
    _defineProperty(
      _avalon$define,
      'reSendBtnTxt',
      getSysValueByKey('label_system_resend')
    ),
    _defineProperty(_avalon$define, 'sendMsgCode', function () {
      if (120 != reSetPsdVm.basetime) return !1;
      /^[0-9]*$/.test(reSetPsdVm.phoneNum)
        ? ($('#get-v-code').prop('disabled', 'disabled'),
          getAjaxData(
            '/api/user/sendVerificationCode',
            function () {
              var e = setInterval(function () {
                $('#get-v-code').html(
                  --reSetPsdVm.basetime + reSetPsdVm.lateResendTxt
                );
              }, 1e3);
              setTimeout(function () {
                clearInterval(e),
                  $('#get-v-code').removeAttr('disabled'),
                  $('#get-v-code').html(
                    getSysValueByKey('label_system_resend')
                  ),
                  (reSetPsdVm.basetime = 120);
              }, 1e3 * reSetPsdVm.basetime);
            },
            'post',
            {
              phoneNum: reSetPsdVm.phoneNum,
              countryCode: reSetPsdVm.countryCode || '86',
              messageType: '3',
            }
          ))
        : layer.msg(getSysValueByKey('sys_layer_validate_phoneNum'), {
            icon: 1,
            time: msgTime,
          });
    }),
    _defineProperty(_avalon$define, 'validate', {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            (reSetPsdVm.showErr = !0),
            (reSetPsdVm.message = e[0].message))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/resetPassword',
              function (e) {
                200 == e.status &&
                  layer.msg(e.message, { icon: 1, time: msgTime }, function () {
                    window.location.href = '/ ';
                  });
              },
              'post',
              {
                password: reSetPsdVm.password,
                confirmPassword: reSetPsdVm.confirmPassword,
                phoneNum: reSetPsdVm.phoneNum,
                messageCode: reSetPsdVm.messageCode,
                countryCode: reSetPsdVm.countryCode || '86',
              }
            ));
      },
    }),
    _avalon$define)
  ),
  reSetPsdByEmailVm = avalon.define(
    (_defineProperty(
      (_avalon$define2 = {
        $id: 'reSetPsdByEmail',
        password: '',
        confirmPassword: '',
        email: '',
        messageCode: '',
        message: '',
        showErr: !1,
        basetime: 120,
        targetPanel: '1',
        reset: function () {
          reSetPsdByEmailVm.email = ' ';
        },
      }),
      'messageCode',
      ''
    ),
    _defineProperty(_avalon$define2, 'lateResendTxt', ' s'),
    _defineProperty(
      _avalon$define2,
      'reSendBtnTxt',
      getSysValueByKey('label_system_resend')
    ),
    _defineProperty(_avalon$define2, 'sendMsgCode', function () {
      return (
        120 == reSetPsdByEmailVm.basetime &&
        (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          reSetPsdByEmailVm.email
        )
          ? ($('#get-v-code').prop('disabled', 'disabled'),
            void getAjaxData(
              '/api/user/sendVerificationCode',
              function () {
                var e = setInterval(function () {
                  $('#get-v-code').html(
                    --reSetPsdByEmailVm.basetime +
                      reSetPsdByEmailVm.lateResendTxt
                  );
                }, 1e3);
                setTimeout(function () {
                  clearInterval(e),
                    $('#get-v-code').removeAttr('disabled'),
                    $('#get-v-code').html(
                      getSysValueByKey('label_system_resend')
                    ),
                    (reSetPsdByEmailVm.basetime = 120);
                }, 1e3 * reSetPsdByEmailVm.basetime);
              },
              'post',
              {
                email: reSetPsdByEmailVm.email,
                sendType: '2',
                messageType: '3',
              }
            ))
          : (layer.msg(getSysValueByKey('sys_layer_validate_email'), {
              icon: 1,
              time: msgTime,
            }),
            !1))
      );
    }),
    _defineProperty(_avalon$define2, 'validate', {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            (reSetPsdByEmailVm.showErr = !0),
            (reSetPsdByEmailVm.message = e[0].message))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/resetPassword',
              function (e) {
                200 == e.status &&
                  layer.msg(e.message, { icon: 1, time: msgTime }, function () {
                    window.location.href = '/ ';
                  });
              },
              'post',
              {
                password: reSetPsdByEmailVm.password,
                confirmPassword: reSetPsdByEmailVm.confirmPassword,
                email: reSetPsdByEmailVm.email,
                messageCode: reSetPsdByEmailVm.messageCode,
                type: '2',
              }
            ));
      },
    }),
    _avalon$define2)
  ),
  setPsdVm = avalon.define({
    $id: 'setPsd',
    password: '',
    confirmPassword: '',
    message: '',
    showErr: !1,
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            (setPsdVm.showErr = !0),
            (setPsdVm.message = e[0].message))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/updateInfo',
              function (e) {
                200 == e.status &&
                  layer.msg(e.message, { icon: 1, time: msgTime });
              },
              'post',
              {
                confirmPassword: setPsdVm.confirmPassword,
                password: setPsdVm.password,
              }
            ));
      },
    },
  }),
  userInfoVm = avalon.define({
    $id: 'user-info',
    userName: '',
    name: '',
    email: '',
    comments: '',
    phoneNum: '',
    message: '',
    showErr: !1,
    validate: {
      onError: function (e) {
        e.forEach(function (e) {
          console.log(e.getMessage());
        });
      },
      onValidateAll: function (e) {
        e.length
          ? (console.log('有表单没有通过', e),
            (userInfoVm.showErr = !0),
            (userInfoVm.message = e[0].message))
          : (console.log('全部通过'),
            getAjaxData(
              '/api/user/updateInfo',
              function (e) {
                200 == e.status && layer.msg(e.message, { icon: 1 });
              },
              'post',
              {
                userName: userInfoVm.userName,
                email: userInfoVm.email,
                name: userInfoVm.name,
                phoneNum: userInfoVm.phoneNum,
                comments: userInfoVm.comments,
              }
            ));
      },
    },
  }),
  userNavVm = avalon.define({
    $id: 'user-nav',
    currentPath: window.location.pathname,
    menu_body_2_show: function () {
      return (
        0 < userNavVm.currentPath.indexOf('personInfo') ||
        0 < userNavVm.currentPath.indexOf('setUserPsd')
      );
    },
    menu_body_1_show: function () {
      return (
        0 < userNavVm.currentPath.indexOf('userContents') ||
        0 < userNavVm.currentPath.indexOf('joinComments') ||
        0 < userNavVm.currentPath.indexOf('notify') ||
        0 < userNavVm.currentPath.indexOf('userAddContent')
      );
    },
  });
