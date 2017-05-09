---
layout: post
title: Apache Spark
lead: null
date: 2016-09-08T00:00:00.000Z
categories: Hadoop
tagline: Hadoop
tags:
  - Hadoop
  - Spark
  - Apache
---

# 介绍

Apache Spark是一个高速的通用型计算引擎，用来实现分布式的大规模数据的处理任务。分布式的处理方式可以使以前单台计算机面对大规模数据时处理不了的情况成为可能。

## Spark是什么?

UCBerkeley AMPlab所开源的类Hadoop MapReduce的通用的并行计算框架

dfsSpark基于mapreduce算法实现的分布式计算，拥有Hadoop MapReduce所具有的优点；但不同于MapReduce的是Job中间输出和结果可以保存在内存中，从而不再需要读写HDFS，因此Spark能更好地适用于数据挖掘与机器学习等需要迭代的map reduce的算法。

## Spark与Hadoop的对比(Spark的优势)

1. Spark的中间数据放到内存中，对于迭代运算效率更高
2. Spark比Hadoop更通用
3. Spark提供了统一的编程接口
4. **容错性**：在分布式数据集计算时通过checkpoint来实现容错
5. **可用性**：Spark通过提供丰富的Scala, Java，Python API及交互式Shell来提高可用性

## Spark有那些组件

1. Spark Streaming：支持高吞吐量、支持容错的实时流数据处理
2. Spark SQL， Data frames: 结构化数据查询
3. MLLib：Spark 生态系统里用来解决大数据机器学习问题的模块
4. GraphX是构建于Spark上的图计算模型
5. SparkR是一个R语言包，它提供了轻量级的方式使得可以在R语言中使用 Spark
