## use_rxjs_inReact-demo

Rxjs是响应式编程思想的产物，其提供的关于“数据流”的操作符非常的丰富：数据流的产生、数据流之间的关系处理、高阶数据流等都能非常优雅的帮助解决业务上的一些复杂的数据变更场景。

Rxjs的实现基于两种设计模式：「观察订阅模式」 + 「迭代器模式」。

其主要的几个概念是：Observer、Subject、Observable、Operator、弹珠图。[查阅官网](https://rxjs.dev/guide/overview)

(推荐一个学习Rxjs的网站，针对每个概念、operator都有demo：[LearnRxjs](https://www.learnrxjs.io/))

#### 代码Demo 

* 参考[Thinkrx](https://thinkrx.io/rxjs/) 使用弹珠图可视化了两个操作符的工作方式；
* 常见场景使用rxjs来解决的姿势：对数据（比如store）以流集合的方式进行管理、通过SwitchMap解决input搜索问题；
* 结合业务场景使用redux-observable：统一变更为数据流个管理，比如轮训、store变更等。

当然其实这些都是很简单的小demo，如果想要使用好rxjs还是要多实践、多结合自己的业务场景输出解决方案的。