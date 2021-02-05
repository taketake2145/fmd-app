/*
 *  page animation move
 */
cmn.pgmove = function(pos, speed, func) {
    var pos = pos || 0,
        speed = speed || 300;

    $('html, body').stop();
    $('html').animate({ scrollTop: pos }, speed);
    $('body').animate({ scrollTop: pos }, speed, function(){
        if (func) func();
    });
    return false;
};
