/**
 *  History API
 */
const is_history_api = (history && history.pushState && history.state !== undefined);
let is_history_push = false;

const history_push_state = function (data, title, url) {
  if (is_history_api) {
    history.pushState(data, title, url);
    is_history_push = true;
  }
}

const history_set = function (func) {
  if (is_history_api) {
    $(window).on('popstate', function(event){
      if (func && is_history_push) func(event.originalEvent.state);
    });
  }
}
