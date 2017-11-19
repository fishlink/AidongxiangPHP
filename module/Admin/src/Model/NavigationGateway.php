<?php
namespace Admin\Model;
/**
* 导航
*
* @author 系统生成
*
*/
class NavigationGateway extends BaseGateway {
    /**
    *主键、自动增长
    */
    public $id;

    /**
    *导航名称
    */
    public $name;

    /**
    *导航链接
    */
    public $link;

    /**
    *导航图标
    */
    public $icon;

    /**
    *模块分类，1首页
    */
    public $type;

    /**
    *排序
    */
    public $sort;

    /**
    *字段数组
    */
    protected $columns_array = ["id","name","link","icon","type","sort","delete","timestamp"];

    public $table = DB_PREFIX . 'navigation';

}