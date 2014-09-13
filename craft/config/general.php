<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

// Public root: $_SERVER['DOCUMENT_ROOT']

$url = getenv('SITE_URL');
if ( empty($url) ) {
  exit('URL environment variable has not been set.');
}

$dev = getenv('CRAFT_ENV') == 'development' ? true : false;

return array(

  '*' => array(
    'omitScriptNameInUrls' => true,
    'cacheMethod' => 'file',
    'devMode' => $dev,
    'siteUrl' => $url,
    'environmentVariables' => array()
  ),

  '.dev' => array(
    'cacheMethod' => 'file'
  )

);
