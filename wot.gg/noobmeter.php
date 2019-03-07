<?php

$html =  file_get_contents('https://www.noobmeter.com/player/eu/' . $_GET['name']);



preg_match('/<table class="tablesorter sortTable {sortlist: \[\[5,1\]\]} with-rating-colors">.*<\/table>/', $html, $matches);
echo $matches[0]
?>
