
$(function () {

    //header bar
    $('#header').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 8000,
        prevArrow: '.u_icon_header_l_arrow',
        nextArrow: '.u_icon_header_r_arrow',
    });

    $('#header').on('afterChange', function (event, slick, currentSlide) {
        var header = $('#header');
        var slide = $('#header li').eq(currentSlide + 1);
        var src = slide.attr('data-src');
        var contents = header.siblings('.u_content');
        var pages = contents.find('.u_pages');

        contents.find('a').attr('href', src);

        pages.find('li i.u_icon.u_active').removeClass('u_active');
        pages.find('li').eq(currentSlide).children().addClass('u_active');

    });

    //header bar pages
    $('.u_header').on('click', '.u_pages li', function () {
        var index = $(this).index();
        $('#header').slick('slickGoTo', index);
    });

    $('.u_activity_container').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 8000,
        prevArrow: '.u_icon_act_l_arrow',
        nextArrow: '.u_icon_act_r_arrow'
    });

    $('.u_activity_container').on('afterChange', function (event, slick, currentSlide) {
        var contents = $('.u_activity_container');
        var pages = contents.siblings('.u_pages');

        pages.find('li i.u_icon.u_active').removeClass('u_active');
        pages.find('li').eq(currentSlide).children().addClass('u_active');

    });

    //activity bar pages
    $('.u_activity_section').on('click', '.u_pages li', function () {
        var index = $(this).index();
        console.log(index)
        $('.u_activity_container').slick('slickGoTo', index);
    });

    //tabs
    $('.u_container .u_tabs').on('click', '.u_tab', function () {

        var _this = $(this);
        var index = _this.index();
        var tabs = _this.parent('.u_tabs');
        var panels = tabs.siblings('.u_panels');

        tabs.find('.u_tab.u_active').removeClass('u_active');
        _this.addClass('u_active');

        panels.find('>.u_panel.u_active').removeClass('u_active');
        panels.find('>.u_panel').eq(index).addClass('u_active');

    });

    $('.u_version .u_lists').roundabout({
        minScale: 0.5,
        maxOpacity: 1,
        minOpacity: 0.3,
        childSelector: 'li',
        reflect: false,
        autoplay: true,
        autoplayDuration: 8000,
        autoplayPauseOnHover: true,
        // btnNext: '.u_icon_version_l_arrow',
        // btnPrev: '.u_icon_version_r_arrow',
        autoplayCallback: function (a) {
            autoPlayCallback();
        },
        clickToFocusCallback: function (a, b, c) {
            autoPlayCallback();
        },
        btnNextCallback: function (a) {
            // RenderRoundabout();
        },
        btnPrevCallback: function () {
            // RenderRoundabout();
        }
    });

    function autoPlayCallback() {
        var index = $('.u_version .u_lists').find('.roundabout-in-focus').index();
        var count = $('.u_version .u_lists li').length;

        $('.u_version .u_pages').find('li>i.u_active').removeClass('u_active');
        $('.u_version .u_pages').find('li:eq(' + (index) + ') i').addClass('u_active');
    }

    $('.u_version').on('click', 'i.u_icon_version_r_arrow,i.u_icon_version_l_arrow', function () {
        var self = $(this);
        if (self.is('i.u_icon_version_r_arrow')) navigateSlide('r');
        else navigateSlide();
    });

    function navigateSlide(dir) {
        var index = $('.u_version .u_lists').find('.roundabout-in-focus').index();
        var count = $('.u_version .u_lists li').length;
        if (dir === 'r') {
            index = index == count - 1 ? 0 : index + 1;
        } else {
            index = index == 0 ? count - 1 : index - 1;
        }

        $('.u_version .u_lists').roundabout('animateToChild', index);
        $('.u_version .u_pages').find('li>i.u_active').removeClass('u_active');
        $('.u_version .u_pages li').eq(index).find('i').addClass('u_active');
    }

    $('.u_version').on('click', '.u_pages li', function () {
        var self = $(this),
            dots = self.parents('.u_pages').find('li');
        i = dots.index(self);
        $('.u_version .u_pages').find('li>i.u_active').removeClass('u_active');
        self.find('i.u_icon').addClass('u_active');

        $('.u_version .u_lists').roundabout('animateToChild', i);
    });

    // right float bar
    var J_slide = $('#J_slide');
    // if (clientW <= 1280) {
    //     J_slide.animate({ right: '-146px' }, "slow").removeClass('opened');
    //     J_slide.find('.J-slide-trigger span').text('展开');
    // };
    J_slide.on('click', '.J-slide-trigger', function () {
        var self = $(this);
        var right = 0;
        J_slide[J_slide.hasClass('opened') ? 'removeClass' : 'addClass']('opened');
        J_slide.find('.J-slide-trigger span').text(J_slide.hasClass('opened') ? '收起' : '展开');
        J_slide.animate({ right: (!J_slide.hasClass('opened') ? '-146px' : '0') }, "slow");
    });

    $('.u_call_section').on('click', '.u_icon.u_icon_search', function () {
        $('.u_call_section form').submit();
    });

    //get vedio list.
    try {

        $.ajax({
            url: 'http://dota2.178.com/s/js/20160721.js',
            dataType: 'jsonp',
            jsonp: 'video178callback',
            jsonpCallback: 'video178callback',
        })
            .done(function (data) {

                var container = $('.u_section_vedio .u_panel');
                var pointer = 0;
                for (var d in data) {

                    if (d === 'code') continue;
                    var html = '';
                    var len = data[d].length > 6 ? 6 : data[d].length;
                    for (var i = 0; i < len; i++) {

                        html += tplVideo(data[d][i]);

                    }

                    container.eq(pointer).html(html);
                    pointer++;

                }

            })
            .fail(function (error) {

            })

    } catch (e) {

    } finally {

    }

    function tplVideo(data) {

        var html = '';
        html += ' <a href="' + data.url + '" class="u_item" target="_blank">'
            + '   <span class="u_item_logo">'
            + '       <img src="' + data.picurl + '" alt="' + data.title + '" />'
            + '   </span>'
            + '   <p class="u_item_title">' + data.title + '</p>'
            + '   <span class="u_item_time">' + data.time + '</span>'
            + '</a>';

        return html;

    }

})
