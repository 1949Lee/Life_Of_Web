<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/15
 * Time: 14:37
 */
$menuItemFlag = false;
function saveMenuItem(){
    $menuItem = "menuItem.txt";
    $menuItemArray = array("首页","商品","购物车","个人中心");
    $menuItemTxt = fopen($menuItem,"a");
    if (filesize($menuItem) == 0) {
        for ($i = 0; $i < count($menuItemArray) - 1; $i++) {
            fwrite($menuItemTxt, $menuItemArray[$i] . ",");
        }
        fwrite($menuItemTxt, $menuItemArray[count($menuItemArray) - 1]);
    }
    clearstatcache();
    fclose($menuItemTxt);
}
function getMenuItem(){
    $menuItem = "menuItem.txt";
    $menuItemTxt = fopen($menuItem,"r");
    $menuItemStr = "";
    $menuItemStr = fread($menuItemTxt, filesize($menuItem));
    fclose($menuItemTxt);
    return explode(',',$menuItemStr);
}
function putNavBar($arrItem){
    echo "<nav class=\"navbar navbar-default\" role=\"navigation\">
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

    echo "
        <li class=\"active\"><a href=\"#\">$arrItem[0]</a></li>";
    for($i = 1;$i < count($arrItem);$i++) {
        echo "
        <li><a href=\"#\">".$arrItem[$i]."</a></li>";
    }
    echo "
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>";
}
?>
