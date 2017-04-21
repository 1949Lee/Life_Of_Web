<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/15
 * Time: 14:37
 */
function putNavBar($arrItem){
    $str = "<nav id='commentNav'class=\"navbar navbar-default\" role=\"navigation\">
  <div class=\"container-fluid\">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class=\"navbar-header\">
      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse-1\">
        <span class=\"sr-only\">Toggle navigation</span>
        <span class=\"icon-bar\"></span>
        <span class=\"icon-bar\"></span>
        <span class=\"icon-bar\"></span>
      </button>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class=\"collapse navbar-collapse\" id=\"navbar-collapse-1\">
      <ul class=\"nav navbar-nav\">";

    $str .= "
        <li class=\"active\"><a href=\"#\">$arrItem[0]</a></li>";
    for($i = 1;$i < count($arrItem);$i++) {
        $str .= "
        <li><a href=\"#\">".$arrItem[$i]."</a></li>";
    }
    $str .="
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>";
    return $str;
}
?>
