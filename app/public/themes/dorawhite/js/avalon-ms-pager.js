avalon
  ? (avalon.component('ms-pager', {
      template:
        "       <ul class='pagination' ms-visible='@totalPages>1'>           <li class='first' ms-class='{disabled: @isDisabled(\"first\", 1)}'>               <a ms-attr='{title:@getTitle(\"first\")}'                  ms-click='@cbProxy($event,\"first\")'               >                   <i class='fa fa-angle-double-left'></i>               </a>           </li>           <li class='prev'               ms-class='{disabled: @isDisabled(\"prev\",1)}'>               <a ms-attr='{title:@getTitle(\"prev\")}'                  ms-click='@cbProxy($event,\"prev\")'               >                   <i class='fa fa-angle-left'></i>               </a>           </li>           <li ms-for='page in @pages'               ms-class='{active: page === @currentPage}' >               <a ms-attr='{title:@getTitle(page)}'                  ms-click='@cbProxy($event,page)'               >                   {{page}}               </a>           </li>           <li class='next'               ms-class='{disabled: @isDisabled(\"next\",@totalPages)}'>               <a ms-attr='{title: @getTitle(\"next\")}'                  ms-click='@cbProxy($event,\"next\")'               >                   <i class='fa fa-angle-right'></i>               </a>           </li>           <li class='last'               ms-class='{disabled: @isDisabled(\"last\",@totalPages)}'>               <a ms-attr='{title: @getTitle(\"last\")}'                  ms-click='@cbProxy($event,\"last\")'               >                   <i class='fa fa-angle-double-right'></i>               </a>           </li>       </ul>",
      defaults: {
        $id: 'ms-pager',
        is_ie: !1,
        is_more: !0,
        hash: '',
        getHref: function (e) {
          if (this.is_more) {
            if (location.hash) {
              var t = location.hash,
                a = (function (e) {
                  var t = location.hash,
                    a = new Object();
                  if (t.indexOf('?'))
                    for (
                      var s = t.substr(t.indexOf('?') + 1).split('&'), i = 0;
                      i < s.length;
                      i++
                    )
                      a[s[i].split('=')[0]] = decodeURI(s[i].split('=')[1]);
                  return a[e];
                })('page');
              return a
                ? (t = t.replace('page=' + a, 'page=' + this.toPage(e)))
                : location.hash + '?page=' + this.toPage(e);
            }
            return '#?page=' + this.toPage(e);
          }
          return '#page-' + this.toPage(e);
        },
        getTitle: function (e) {
          return e;
        },
        isDisabled: function (e, t) {
          return (this.$buttons[e] = this.currentPage === t);
        },
        $buttons: {},
        showPages: 5,
        pages: [],
        totalPages: avalon.noop,
        currentPage: 1,
        firstText: '《',
        prevText: '上一页',
        nextText: '下一页',
        lastText: '》',
        onPageClick: avalon.noop,
        toPage: function (e) {
          var t = this.currentPage,
            a = this.totalPages;
          switch (e) {
            case 'first':
              return 1;
            case 'prev':
              return Math.max(t - 1, 1);
            case 'next':
              return Math.min(t + 1, a);
            case 'last':
              return a;
            default:
              return e;
          }
        },
        cbProxy: function (e, t) {
          var a = this.toPage(t);
          return this.$buttons[t] || t === this.currentPage
            ? 1 === a
              ? this.onPageClick(e, a)
              : void e.preventDefault()
            : (this.render(a), this.onPageClick(e, a));
        },
        render: function (e) {
          var t = function (e) {
            var t = [],
              a = this.showPages,
              s = this.totalPages,
              i = Math.floor(a / 2),
              r = e - i + 1 - (a % 2),
              n = e + i;
            r <= 0 && (r = 1), s < n && (n = s);
            for (var l = r; l <= n; ) t.push(l), l++;
            return { currentPage: e, pages: t };
          }.call(this, e);
          (this.currentPage = t.currentPage), (this.pages = t.pages);
        },
        rpage: function () {
          return this.is_more ? /(?:#|\?)page\=(\d+)/ : /(?:#|\?)page\-(\d+)/;
        },
        cur: function () {
          var e = this.currentPage,
            t = this.rpage && location.href.match(this.rpage());
          return (
            t && t[1] && ((e = ~~t[1]) < 0 || e > this.totalPages) && (e = 1), e
          );
        },
        onInit: function () {
          var e = this;
          this.$watch('totalPages', function () {
            e.render(e.cur());
          }),
            this.$watch('currentPage', function () {
              e.render(e.cur());
            }),
            e.is_ie || e.is_more
              ? !e.is_ie &&
                e.is_more &&
                window.addEventListener(
                  'hashchange',
                  function () {
                    e.render(e.cur());
                  },
                  !1
                )
              : window.addEventListener(
                  'hashchange',
                  function () {
                    e.cbProxy(window.event, e.cur());
                  },
                  !1
                ),
            e.render(e.cur());
        },
      },
    }),
    console.log('成功加载ms-pager组件！'))
  : console.log(
      '请先在当前页面引用avalon.js！另外请保证您引用了与该组件配套的css样式！'
    );
