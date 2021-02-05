<?php
/**
 * 「ログイン状態を保存する」に予めチェックをいれる
 *
 *　http://wpcj.net/177
 */
function mp_login_rember() {
	echo '
	<script>
  var _rememberme = document.getElementById("rememberme");
  if (_rememberme) {
    _rememberme.checked = true;
  }
	</script>
	';
}
add_filter('login_footer', 'mp_login_rember');