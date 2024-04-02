const shortlinkService = require("../models/shortlink.model");
const { redisSetEx, redisGet } = require("../services/redis.service");
const { responseSend, generateLink } = require("../utils/server.util");

exports.createShortLink = async (req, res, next) => {
  try {
    const {url, expiry} = req.body
    const currentTime = Date.now()
    if (expiry < currentTime) {
      return responseSend(res,400,{success:false,message:"Expiry provided should be greater than current time"})
    }

    const isUrlPresent = await shortlinkService.readOneDocument({"url.original":url, is_active:true});
    if (isUrlPresent) {
      return responseSend(res,400,{success:false,message:"Short link Already Present"})
    }
    
    const {shortlink,hash} = generateLink()
    const insertData = {
      url: {
        alias: shortlink,
        original:url,
        hash
      },
      expire_at: expiry // time in milliseconds 
    }
    const shortlinkData = await shortlinkService.createDocument(insertData)

    const cacheKey = `short_link:${hash}`;
    const timeDifference = expiry - currentTime
    const ttl = Math.floor(timeDifference/1000);
    await redisSetEx(cacheKey,JSON.stringify(shortlinkData),ttl)  

    return responseSend(res,201,{success:true,message:"Short link created",data:shortlinkData})
  } catch (error) {
    return responseSend(res,400,{success:false,message:error.message,data:null})
  }
};

exports.getShortLink = async (req, res) => {
  try {
    const {shortlink_hash} = req.params
    const cacheKey = `short_link:${shortlink_hash}`;
    const cacheData = await redisGet(cacheKey)
    const currentTime = Date.now();

    // if (cacheData) {
      
    // }

    const isShortLinkActive = await shortlinkService.readOneDocument({"url.hash":shortlink_hash,is_active:true});
    if (!isShortLinkActive) {
      return res.send("Short Link Expired")
    }

    // if short link is expired and the is_active flag is not updated, 
    // then update the flag using the expire_at value
    if (isShortLinkActive.expire_at < currentTime) {
      await shortlinkService.updateDocument({url_id:isShortLinkActive.url_id},{$set:{is_active:false}})
      return res.send("Short Link Expired time")
    }

    return res.redirect(isShortLinkActive.url.original)
  } catch (error) {
    return responseSend(res,400,{success:false,message:error.message, data:null})
  }
}


