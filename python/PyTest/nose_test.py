#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 扩展 unittest，nose 让测试更简单。

# 自古（1970）以来，任何标榜“更简单”的工具所使用的手段基本都是隐藏细节，nose 也不例外。
# nose 不使用特定的格式、不需要一个类容器，甚至不需要 import nose ~
# （这也就意味着它在写测试用例时不需要使用额外的 api）
# $ nosetests test.py
# $ python -m nose test.py
# nosetests 兼容对 doctest 和 unittest 测试脚本的解析运行。
