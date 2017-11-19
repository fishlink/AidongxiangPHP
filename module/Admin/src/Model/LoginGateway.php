<?php
namespace Admin\Model;
/**
* 用户登录表
*
* @author 系统生成
*
*/
class LoginGateway extends BaseGateway {
    /**
    *主键、自动增长
    */
    public $id;

    /**
    *会话id（不能为空）
    */
    public $sessionId;

    /**
    *语言2502:zh_CN 华 -中国1033:en_US 英国 - 美国3076:zh_HK 华 - 香港的 SAR语言的 ISO 639-1（两个字母）或 ISO 639-2（三个字母）标识符。见规范
    */
    public $lang;

    /**
    *机型型号。如:iPhone/iPad/Android
    */
    public $model;

    /**
    *协议版本号
    */
    public $version;

    /**
    *屏幕分辨率。如:320x480
    */
    public $resolution;

    /**
    *屏幕大小。如:3.7寸
    */
    public $screenSize;

    /**
    *设备号
    */
    public $deviceToken;

    /**
    *设备类型：1Ios；2Android；4WindowsPhone 16 wap 32 获取不到设备号
    */
    public $deviceType;

    /**
    *设备详细信息字符串
    */
    public $info;

    /**
    *登录过期时间。默认＋1个月
    */
    public $expire;

    /**
    *状态：1临时；2登录；3登出；4自动注销（同一账号在其它设备上登录了）
    */
    public $status;

    /**
    *
    */
    public $userId;

    /**
    *1用户；2商家；
    */
    public $userType;

    /**
    *字段数组
    */
    protected $columns_array = ["id","sessionId","lang","model","version","resolution","screenSize","deviceToken","deviceType","info","expire","status","userId","userType","delete","timestamp"];

    public $table = DB_PREFIX . 'login';
}