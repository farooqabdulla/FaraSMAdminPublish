//pagination
$.fn.pageMe = function (opts) {
    var $this = this,
        defaults = {
            perPage: 15,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage;
    var children = listElement.children();
    var pager = $('.pager');

    if (typeof settings.childSelector != "undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector != "undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.size();
    var numPages = Math.ceil(numItems / perPage);


    if (numPages <= 10) {
        pager.data("curr", 0);

        if (settings.showPrevNext) {
            $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
        }

        var curr = 0;
        while (numPages > curr && (settings.hidePageNumbers == false)) {
            $('<li><a href="#" class="page_link">' + (curr + 1) + '</a></li>').appendTo(pager);
            curr++;
        }

        if (settings.showPrevNext) {
            $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
        }

        pager.find('.page_link:first').addClass('active');
        pager.find('.prev_link').hide();
        if (numPages <= 1) {
            pager.find('.next_link').hide();
        }
        pager.children().eq(1).addClass("active");

        children.hide();
        children.slice(0, perPage).show();

        pager.find('li .page_link').click(function () {
            var clickedPage = $(this).html().valueOf() - 1;
            goTo(clickedPage, perPage);
            return false;
        });
        pager.find('li .prev_link').click(function () {
            previous();
            return false;
        });
        pager.find('li .next_link').click(function () {
            next();
            return false;
        });

        function previous() {
            var goToPage = parseInt(pager.data("curr")) - 1;
            goTo(goToPage);
        }

        function next() {
            goToPage = parseInt(pager.data("curr")) + 1;
            goTo(goToPage);
        }

        function goTo(page) {
            var startAt = page * perPage,
                endOn = startAt + perPage;

            children.css('display', 'none').slice(startAt, endOn).show();

            if (page >= 1) {
                pager.find('.prev_link').show();
            }
            else {
                pager.find('.prev_link').hide();
            }

            if (page < (numPages - 1)) {
                pager.find('.next_link').show();
            }
            else {
                pager.find('.next_link').hide();
            }

            pager.data("curr", page);
            pager.children().removeClass("active");
            pager.children().eq(page + 1).addClass("active");

        }
    }

    else {
        pager.data("curr", 0);

        if (settings.showPrevNext) {
            $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
        }


        var curr = 0;
        var pagescrncount = 10;
        pagesDisplay(curr, pagescrncount);
        function pagesDisplay(curr, pagescrncount) {
            // var curr = 0;
            if (numPages > curr) {
                $('.pager').html('');
                if (settings.showPrevNext) {
                    $('<li><a href="#" class="prev_link">PREV«</a></li>').appendTo(pager);
                }
                if (curr == 0) {
                    pager.find('.prev_link').hide();
                }
                //var pagecurr = curr;
                if (numPages - pagescrncount < 0) {
                    pagescrncount = numPages;
                    pager.find('.next_link').hide();
                }
                else {
                    pagescrncount;
                }
                for (var i = curr; i < pagescrncount; i++) {
                    var html = '<li><a href="#" class="page_link" pagenum="' + (curr + 1) + '">' + (curr + 1) + '</a></li>'
                    $('.pager').append(html);
                    curr++;
                }
                pager.children().eq(1).addClass("active");
            }
            if (settings.showPrevNext && numPages - pagescrncount > 0) {
                $('<li><a href="#" class="next_link">»NEXT</a></li>').appendTo(pager);
            }

            //if (settings.showPrevNext) {
            //    $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
            //}
            //pager.find('.page_link:first').addClass('active');
            //pager.find('.prev_link').hide();
            //if (numPages <= 1) {
            //    pager.find('.next_link').hide();
            //}
            //pager.children().eq(0).addClass("active");

            children.hide();
            children.slice(0, perPage).show();

            pager.find('li .page_link').click(function () {
                var clickedPage = $(this).html().valueOf() - 1;
                goTo(clickedPage, perPage);
                return false;
            });
            pager.find('li .prev_link').click(function () {
                previous();
                return false;
            });
            pager.find('li .next_link').click(function () {
                next();
                return false;
            });
        }



        function previous() {
            var pgnum = pager.find('.active .page_link').attr('pagenum');
            //alert(Math.floor(pgnum / 10));
            pagescrncount = Math.floor(pgnum / 10) * 10;
            curr = pagescrncount - 10;
            pagesDisplay(curr, pagescrncount);
        }

        function next() {
            var pgnum = pager.find('.active .page_link').attr('pagenum');
            //alert(Math.ceil(pgnum /     10));
            curr = Math.ceil(pgnum / 10) * 10;
            pagescrncount = curr + 10;
            pagesDisplay(curr, pagescrncount);
            //goToPage = parseInt(pager.data("curr")) + 10;
            //goTo(goToPage);
        }
        function goTo(page) {
            var startAt = page * perPage,
                endOn = startAt + perPage;

            children.css('display', 'none').slice(startAt, endOn).show();

            //if (page >= 1) {
            //    pager.find('.prev_link').show();
            //}
            //else {
            //    pager.find('.prev_link').hide();
            //}

            //if (page < (numPages - 1)) {
            //    pager.find('.next_link').show();
            //}
            //else {
            //    pager.find('.next_link').hide();
            //}

            pager.data("curr", page);
            pager.children().removeClass("active");
            var val = page % 10;
            pager.children().eq(val + 1).addClass("active");

        }

    }

};

