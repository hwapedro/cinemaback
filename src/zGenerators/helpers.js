"use strict";
exports.__esModule = true;
/**
 * Escape substitutes in text with %...%
 */
function format(text, subst) {
    return text.replace(/__\w+__/g, function (all) {
        var real = all.slice(2, -2);
        return subst[real] || all;
    });
}
exports.format = format;
