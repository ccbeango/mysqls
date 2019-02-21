JOIN方法属于链式调用方法之一，用于联表查询。

### 案例

```js
/**
 * join 语句 
 * @param {String} join 表名 db_test as a
 * @param {String} opt  条件 a.id = b.id
 * @param {String} type 类型 INNER LEFT RIGHT
 */
join(join, opt, type = 'INNER')
```

join方法有三个参数，且都为字符串，例如：
```js 
 sql.table('order')
    .alias('a')
    .field('a.id, a.order_name, b.goods_price')
    .where('a.id = 1')
    .join('goods as b', 'b.orderid = a.id', 'RIGHT')
    .select()
```

最终得到
```js
SELECT a.id, a.order_name, b.goods_price FROM order AS a RIGHT JOIN goods AS b ON b.orderid = a.id WHERE a.id=1  
```





