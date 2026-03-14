<?php
/**
 * Plugin Name:       Before After Image Compare Block
 * Description:       A high-performance before and after image comparison block using Block API v3.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Steven Ayo
 * Author URI:        https://steveayo.com
 * License:           GPL-2.0-or-later
 * Text Domain:       before-after-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers the block type and enqueues scripts and styles.
 */
function before_after_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'before_after_block_init' );
