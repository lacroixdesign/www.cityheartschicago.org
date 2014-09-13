<?php

require_once('../vendor/autoload.php');
$root_dir = dirname(dirname(__FILE__));

if (file_exists($root_dir . '/.env')) {
  Dotenv::load($root_dir);
  Dotenv::required(array('DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST'));
}

// Path to your craft/ folder
$craftPath = '../craft';

// Custom settings http://buildwithcraft.com/docs/php-constants
define('CRAFT_TEMPLATES_PATH', "../templates");
// define('CRAFT_CONFIG_PATH', "../config");

// ----------------------------------------------------------------------------

// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
  exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
