<?php
/**
 * wp_head() で自動追加される使用しないCSSやJSなどを削除する
 * https://www.allinthemind.biz/design/wordpress/wp_head_clear.html
 * 5.4 で確認済み
 */
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'wp_oembed_add_host_js');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'noindex', 1);
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'rel_canonical');

function mp_remove_dns_prefetch( $hints, $relation_type ) {
	if ( 'dns-prefetch' === $relation_type ) {
		return array_diff( wp_dependencies_unique_hosts(), $hints);
	}
	return $hints;
}
add_filter('wp_resource_hints', 'mp_remove_dns_prefetch', 10, 2);

function mp_my_delete_head() {
	wp_deregister_script('jquery');
	wp_deregister_style('contact-form-7');
	wp_deregister_style('dashicons');
	wp_deregister_style('wp-block-library');
	wp_deregister_style('wordpress-popular-posts-css');
}
add_action('wp_enqueue_scripts', 'mp_my_delete_head');

// ツールバーを削除する
add_filter('show_admin_bar', '__return_false');