<!-- Print out a list month with links -->
<ul>
<?php for ($m=1; $m<=12; $m++): ?>
  <li><a href="?d="<?php echo sprintf("%02d",$i) ?>><?php print date('F', mktime(0,0,0,$m, 1, date('Y'))); ?></a></li>
<?php endfor; ?>
</ul>
