<?php

#echo "<pre>"; print_r($_POST); echo "</pre>";

$this_file = dirname(__FILE__);
#echo $this_file;
$file = $this_file.'/log.txt';

file_put_contents ( $file, strip_tags($_POST['info']) ."\n", FILE_APPEND);

#echo file_get_contents($file);