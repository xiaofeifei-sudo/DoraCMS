'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const CryptoJS = require('crypto-js');
const shortId = require('shortid');



class HomeController extends Controller {
    // 获取文档类型
    async getTypeInfo(){
        const {ctx} = this;
        const allCategories = await ctx.helper.reqJsonData(
            'contentCategory/getList'
          );
          ctx.helper.renderSuccess(ctx, {
            data: {
              data: allCategories
            },
          });
    }

    // 获取最新文档
    async getNewestDoc(){
        const {ctx} = this;
        const { docs, pageInfo } = await ctx.helper.reqJsonData(
          'content/getList',
        );
        ctx.helper.renderSuccess(ctx, {
          data: {
            docs,pageInfo
          },
        });
    }

    // 获取文档详情
    async getDocDetail(){
      const {ctx} = this;
      let id = this.ctx.params.id
      if(id){
        if(!shortId.isValid(id)){
          ctx.helper.renderFail(
            ctx,
            {message:"该文档已被删除或已经损坏"}
          )
        }else{
          //挂载钩子函数
          await this.app.hooks(ctx,'messageBoard',{id})
          const detail = await ctx.helper.reqJsonData('content/getContent', {
            id: id,
          });
          ctx.helper.renderSuccess(
            ctx,{data:detail}
          )
        };
      }else{
        ctx.helper.renderFail(ctx,{message:"参数有误"})
      }
    }
}

module.exports = HomeController

