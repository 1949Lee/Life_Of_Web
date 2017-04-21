<?php
/**
  * wechat php test
  */

//define your token
define("TOKEN", "weiXin");
$wechatObj = new wechatCallbackapiTest();
if(isset( $_GET["echostr"])) {
	$wechatObj->valid();
}
else{
	$wechatObj->responseMsg();
}

class wechatCallbackapiTest
{
	public function valid()
    {
        $echoStr = $_GET["echostr"];

        //valid signature , option
        if($this->checkSignature()){
        	header('content-type:text');
        	echo $echoStr;
        	exit;
        }
    }

    public function responseMsg()
    {
		//get post data, May be due to the different environments
		$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

      	//extract post data
		if (!empty($postStr)){
                libxml_disable_entity_loader(true);
              	$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
                $fromUsername = $postObj->FromUserName;
                $toUsername = $postObj->ToUserName;
                $keyword = trim($postObj->Content);
                $time = time();
				if(!empty( $keyword ))
                {
					if($keyword=="HTML5") {
						$textTpl = "<xml>
									<ToUserName><![CDATA[%s]]></ToUserName>
									<FromUserName><![CDATA[%s]]></FromUserName>
									<CreateTime>%s</CreateTime>
									<MsgType><![CDATA[%s]]></MsgType>
									<Image>
										<MediaId><![CDATA[%s]]></MediaId>
									</Image>
									</xml>
							</xml>";
						$msgType = "image";
						$imageID= "pE1vU50aLVfGNfqsO7pGn3cCQnS375vfrJoQkjtGh2g4MALwIWOvwvhtw5FNjj-G";
						$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $imageID);
						echo $resultStr;
					}
					if($keyword=="程序员游戏") {
					$textTpl = "
<xml>
<ToUserName><![CDATA[%s]]></ToUserName>
<FromUserName><![CDATA[%s]]></FromUserName>
<CreateTime>%s</CreateTime>
<MsgType><![CDATA[%s]]></MsgType>
<ArticleCount>4</ArticleCount>
<Articles>
<item>
<Title><![CDATA[HTML5工程师平时玩的热门游戏Top3]]></Title> 
<Description><![CDATA[HTML5工程师平时玩的热门游戏Top3]]></Description>
<PicUrl><![CDATA[%s]]></PicUrl>
<Url><![CDATA[http://www.h5edu.cn/]]></Url>
</item>
<item>
<Title><![CDATA[守望先锋——我们爱‘屁股’]]></Title>
<Description><![CDATA[HTML5工程师平时玩的热门游戏Top3]]></Description>
<PicUrl><![CDATA[%s]]></PicUrl>
<Url><![CDATA[http://ow.blizzard.cn/home]]></Url>
</item>
<item>
<Title><![CDATA[DOTA2——我们爱‘反补’]]></Title>
<Description><![CDATA[HTML5工程师平时玩的热门游戏Top3]]></Description>
<PicUrl><![CDATA[%s]]></PicUrl>
<Url><![CDATA[http://www.dota2.com.cn/main.htm]]></Url>
</item>
<item>
<Title><![CDATA[英雄联盟——我们爱‘上Miss’]]></Title>
<Description><![CDATA[HTML5工程师平时玩的热门游戏Top3]]></Description>
<PicUrl><![CDATA[%s]]></PicUrl>
<Url><![CDATA[http://ow.blizzard.cn/home]]></Url>
</item>
</Articles>
</xml>
							";
					$msgType = "news";
					$imageID0= "http://lee0811.duapp.com/tianjin/weixin/images/testArticle0.jpg";
					$imageID1= "http://lee0811.duapp.com/tianjin/weixin/images/testArticle1.jpg";
					$imageID2= "http://lee0811.duapp.com/tianjin/weixin/images/testArticle2.jpg";
					$imageID3= "http://lee0811.duapp.com/tianjin/weixin/images/testArticle3.jpg";
					$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType,$imageID0,$imageID1,$imageID2,$imageID3);
					echo $resultStr;
				}
                }
        }else {
        	echo "";
        	exit;
        }
		
    }
		
	private function checkSignature()
	{
        // you must define TOKEN by yourself
        if (!defined("TOKEN")) {
            throw new Exception('TOKEN is not defined!');
        }
        
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
        		
		$token = TOKEN;
		$tmpArr = array($token, $timestamp, $nonce);
        // use SORT_STRING rule
		sort($tmpArr, SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );
		
		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}
	}
}

?>