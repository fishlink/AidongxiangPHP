<?php
namespace Admin\Model;
/**
* 用户表
*
* @author 系统生成
*
*/
class UserGateway extends BaseGateway {
    /**
    *主键、自动增长
    */
    public $id;

    /**
    *昵称
    */
    public $nickName;

    /**
    *真实姓名
    */
    public $realName;

    /**
    *移动电话（登录账号）
    */
    public $mobile;

    /**
    *余额
    */
    public $cash;

    /**
    *积分
    */
    public $points;

    /**
    *1男，2女 3保密
    */
    public $sex;

    /**
    *密码，md5加密
    */
    public $password;

    /**
    *用户状态:1正常   2停用
    */
    public $status;

    /**
    *上一次登录时间
    */
    public $lastLoginTime;

    /**
    *个性签名
    */
    public $description;

    /**
    *地区ID
    */
    public $regionId;

    /**
    *地区数组
    */
    public $regionInfo;

    /**
    *街道
    */
    public $street;

    /**
    *详细地址
    */
    public $address;

    /**
    *经度
    */
    public $longitude;

    /**
    *纬度
    */
    public $latitude;

    /**
    *用户头像ID
    */
    public $headImageId;

    /**
    *用户中心背景图片ID
    */
    public $backImageId;

    /**
    *字段数组
    */
    protected $columns_array = ["id","nickName","realName","mobile","cash","points","sex","password","status","lastLoginTime","description","regionId","regionInfo","street","address","longitude","latitude","headImageId","backImageId","delete","timestamp"];

    public $table = DB_PREFIX . 'user';

    /**
     * 更新用户状态
     * @return bool|int
     * @throws \Exception
     */
    public function updateStatus()
    {
        if(!$this->id || !$this->status){
            return false;
        }
        return $this->updateData();
    }

    /**
     * 验证手机号码是否存在
     */
    public function checkMobile()
    {
        $where = array('mobile'=>$this->mobile);
        if($this->delete === 0)
        {
            $where['delete'] = 0;
        }
        return $this->getOne($where);
    }

    /**
     * 用户登录
     */
    public function userLogin()
    {
        $where = array("mobile"=>$this->mobile,"password"=>$this->password);
        return $this->getOne($where);
    }

    /**
     * 根据ID更新用户信息
     * @return bool|int
     * @throws \Exception
     */
    public function updateData()
    {
        return parent::updateData();
    }
}