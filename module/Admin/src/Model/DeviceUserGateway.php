<?php
namespace Admin\Model;
/**
* 设备用户表（多对一）
*
* @author 系统生成
*
*/
class DeviceUserGateway extends BaseGateway {
    /**
    *主键、自动增长
    */
    public $id;

    /**
    *设备号（唯一）
    */
    public $deviceToken;

    /**
    *设备类型：1Ios；2Android；4WindowsPhone 16 wap端 32 获取不到设备号
    */
    public $deviceType;

    /**
    *是否接受通知。1接受；2不接受；若badge，alert，sound都为2则标记为删除
    */
    public $notification;

    /**
    *数字提示。0表示关闭
    */
    public $badge;

    /**
    *消息框提示。0表示关闭
    */
    public $alert;

    /**
    *声音提示。0表示关闭
    */
    public $sound;

    /**
    *免打扰开始时间
    */
    public $quietStartTime;

    /**
    *免打扰开始时间
    */
    public $quietEndTime;

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
    protected $columns_array = ["id","deviceToken","deviceType","notification","badge","alert","sound","quietStartTime","quietEndTime","userId","userType","delete","timestamp"];

    public $table = DB_PREFIX . 'device_user';
}