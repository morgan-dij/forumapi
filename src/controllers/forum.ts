"use strict";

import { v4 } from "uuid";
import async from "async";
import request from "request";
import { Response, Request, NextFunction } from "express";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { Topic } from "../models/Topic";

export let getTopics = async (req: Request, res: Response) => {
  const mesTopics = await Topic.find({}, ["userId", "date", "title"], {skip: 0, limit: 10, sort: {date: -1}})
                               .populate("userId", "_id profile.pseudo").exec();
  res.json(mesTopics);
};

export let getPosts = async (req: Request, res: Response) => {
  const topicId = req.params.topicId;
  const monTopic = await Topic.findById(topicId);
  const mesPosts = await Post.find({topicId: topicId}, ["date", "userId", "content"], {skip: 0, limit: 10, sort: {date: 1}})
                             .populate("userId", "_id profile.pseudo").exec();
  res.json({title: monTopic.title, posts: mesPosts});
};

export let createPost = async (req: Request, res: Response) => {
  const topicId = req.params.topicId;
  const monTopic = await Topic.findById(topicId);
  if (monTopic === null) {
    res.sendStatus(410);
  }
  else {
    const now = new Date();
    const newPost = new Post({
      _id : v4(),
      userId : req.body.userId,
      topicId : topicId,
      date : now,
      content: req.body.content
    });
    Post.create(newPost)
      .then(r => res.sendStatus(200))
      .catch(e => {
        console.log("Merde : " + e);
        res.sendStatus(500);
      });
  }
};