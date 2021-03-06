<?php
namespace Admin\Model;
/**
* 资讯表
*
* @author 系统生成
*
*/
class ArticleGateway extends BaseGateway {
    /**
    *主键、自动增长
    */
    public $id;

    /**
    *标题
    */
    public $title;

    /**
    *内容
    */
    public $content;

    /**
    *内容概述
    */
    public $abstract;

    /**
    *阅读量
    */
    public $readNum;

    /**
    *资讯封面图片ID
    */
    public $imageId;

    /**
    *操作管理员ID
    */
    public $adminId;

    /**
    *标签ID
    */
    public $labelId;

    /**
    *分类ID
    */
    public $categoryId;

    /**
    *字段数组
    */
    protected $columns_array = ["id","title","content","abstract","readNum","imageId","adminId","labelId","categoryId","delete","timestamp"];

    public $table = DB_PREFIX . 'article';

    public function addData()
    {
        return parent::addData(); // TODO: Change the autogenerated stub
    }

    public function updateData()
    {
        return parent::updateData(); // TODO: Change the autogenerated stub
    }

    public function deleteData()
    {
        return parent::deleteData(); // TODO: Change the autogenerated stub
    }
}