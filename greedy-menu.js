/**
 * 
 * Greedy Menu Jquery plugin
 *
 * @author BrianTweed
 * @version 1.1.5
 * 
 */
(function($) {
    
    $.fn.greedyMenu = function() {
        
        return this.each(function() {

            var $this = $(this),
                limit,
                position,
                area,
                list,
                active;

            setup($this);

            function setup(obj) {
                obj.wrap("<div class='greedy-container'></div>").css("visibility", "hidden");
                if (!obj.find("li.greedy-dropdown").length) {
                    obj.append('<li style="display:none" class="greedy-dropdown"></li>')
                        .find("li.greedy-dropdown")
                        .append('<div class="dropdown"></div>')
                        .find("div.dropdown")
                        .append('<a href="javascript:void(0)" data-toggle="dropdown">More <span class="caret"></span></a>')
                        .append('<ul class="dropdown-menu dropdown-menu-center greedy-menu"></ul>');
                }
                obj.find("li").each(function(index) {
                    $(this).attr("data-index", index);
                });
                limit = obj.find("li").length;
                index = limit - 1;
                active = obj.find("li.active").index();
                create(obj);
            }

            function reset(obj) {
                position = limit;
                $.when(obj.find(".greedy-menu li").appendTo(obj)).done(function() {
                    $.when(sort(obj)).done(function() {
                        create(obj);
                    });
                });
            }

            function sort(obj) {
                obj.each(function() {
                    $(this).html(
                        $(this).children("li").sort(function(a, b) {
                            return $(b).data("index") < $(a).data("index") ? 1 : -1;
                        })
                    );
                });
            }

            function create(obj) {
                area = obj.outerWidth(true);
                list = obj.offset().left + obj.find("li.greedy-dropdown").outerWidth(true) + obj.find("li.active").outerWidth(true);
                obj.find('li:not(".active, .greedy-dropdown")').each(function(index) {
                    list += $(this).outerWidth(true);
                    if (list >= area) {
                        if (index > active) {
                            position = index + 1;
                        }
                        else {
                            position = index;
                        }
                        move(obj, position, index);
                        obj.find(".greedy-dropdown").show();
                        return false;
                    } 
                    else {
                        obj.find(".greedy-dropdown").hide();
                    }
                });
                obj.css("visibility", "visible");
            }

            function move(obj, position, index) {
                for (x = position; x <= limit; x++) {
                    obj.find('li:not(".active, .greedy-dropdown")[data-index="' + x + '"]').appendTo(obj.find(".greedy-menu"));
                }
            }

            $(window).resize(function() {
                reset($this);
            });
        });
    };

})(jQuery);

$(function() {
    $("ul").greedyMenu();
});
