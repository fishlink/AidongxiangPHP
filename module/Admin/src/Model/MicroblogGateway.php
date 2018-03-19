<?php
namespace Admin\Model;
use Zend\Db\Sql\Expression;
use Zend\Db\Sql\Where;

/**
* 微博
*
* @author 系统生成
*
*/
class MicroblogGateway extends BaseGateway {
    /**
    *主键、自动增长
    */
    public $id;

    /**
    *微博内容
    */
    public $content;

    /**
    *点赞总数
    */
    public $praiseNum;

    /**
    *回复总数
    */
    public $commentNum;

    /**
    *转发总数
    */
    public $repeatNum;

    /**
    *是否显示，1显示，2隐藏
    */
    public $display;

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
    *父ID，转发用
    */
    public $parentId;

    /**
    *用户的id
    */
    public $userId;

    /**
    *小视频的id
    */
    public $videoId;

    /**
    *字段数组
    */
    protected $columns_array = ["id","content","praiseNum","commentNum","repeatNum","display","regionId","regionInfo","street","address","longitude","latitude","parentId","userId","videoId","delete","timestamp"];

    public $table = DB_PREFIX . 'microblog';

    public function addData()
    {
        return parent::addData(); // TODO: Change the autogenerated stub
    }

    public function deleteData()
    {
        return parent::deleteData(); // TODO: Change the autogenerated stub
    }

    public function updateData()
    {
        return parent::updateData(); // TODO: Change the autogenerated stub
    }

    public function deleteByIds($ids)
    {
        $where = new Where();
        $where->equalTo('delete',DELETE_FALSE)->equalTo('user_id',$this->userId)->in('id',$ids);
        $res = $this->update(array('delete' => 1), $where);
        return $res?['s'=>0,'d'=>'删除成功']:['s'=>10000,'d'=>'删除失败'];
    }

    public function getSumByUser()
    {
        $where = new Where();
        $where->equalTo('delete',DELETE_FALSE)->equalTo('user_id',$this->userId);
        if($this->display)
        {
            $where->equalTo('display',$this->display);
        }
        $res = $this->getOne($where,new Expression('SUM(1) as total'));
        return $res['total']?$res['total']:0;
    }
}