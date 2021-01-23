module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");

  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类",
    });

    const cats = await Category.find()
      .where({
        parent: parent,
      })
      .lean();

    const newsTitile = [
      "《斗破苍穹手游》年度资料片“远古八族“上线，炎族归位，圣灵争锋！",
      "王者荣耀官方客服招聘",
      "王者荣耀周年庆表现道具设计大赛现已开启！",
      "百力滋X王者荣耀 大手笔赠送上百个英雄手办、永久皮肤！",
      "蓝方惊现自走机甲？为你揭秘蜀地木流牛马的精妙机关",
      "7月28日全服不停机更新公告",
      "7月28日英雄平衡性调整公告",
      "7月25日体验服不停机更新公告",
      "7月24日体验服停机更新公告",
      "体验服赛季体验积分奖励发放公告",
      "夏日有好礼，峡谷乐不停",
      "【微信用户专属】张飞新皮肤上线抽免单活动",
      "张飞-虎魄五虎上将限定皮肤即将上架，参与活动领好礼",
      "【手Q用户专属】李信-一念神魔限时抽免单活动",
      "李信世冠皮肤即将上架，参与活动赢好礼",
      "7月13日【比赛服】版本更新公告",
      "2020年王者荣耀世界冠军杯小组赛赛程出炉",
      "2020年王者荣耀世界冠军杯第二轮选拔赛 加赛及抽签规则",
      "世冠小组赛抽签仪式6月28日现场直播，小组赛之战一触即发！",
      "2020年王者荣耀世界冠军杯（KCC）赛事规则",
    ];

    const newList = newsTitile.map((_) => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);

      return {
        categories: randomCats.slice(0, 2),
        title: _,
      };
    });

    await Article.deleteMany({});
    await Article.insertMany(newList);

    res.send(newList);
  });

  router.get("news/list", async (req, res) => {
    
    res.send("ok");
  });

  app.use("/web/api", router);
};
