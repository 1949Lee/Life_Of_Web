<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2016/9/14
 * Time: 15:55
 */
function putTable($row,$col){
    $table = "<table>";
    for ($i = 0;$i < $row;$i++){
        $table =$table."<tr>";
        for ($j = 0;$j < $col;$j++){
            $table = $table."<td>"."$i,$j"."</td>";
        }
        $table =$table."</tr>";
    }
    $table =$table."</table>";
    echo $table;
}
?>