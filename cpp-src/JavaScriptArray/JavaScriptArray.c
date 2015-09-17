// JavaScript数组算法的C语言实现

// 使用没有指针的语言，个人觉得无法将数据结构和算法的精髓讲的出来，
// 而且js底层已将数组相关算法封装好，所以这里不使用原生的js或者java等，而是使用c语言来实现。
// 为了照顾没有学过指针的同学，我会尽可能的简单实现，并写好注释，画好图解，大家可以体会一下。

#include <stdio.h>
//#include <malloc.h>  //包含了malloc函数
#include <mm_malloc.h>
#include <stdlib.h>  //包含了exit函数

//定义了一个数据类型，该数据类型的名字叫做struct Arr, 该数据类型含有三个成员，分别是pBase, len, cnt
struct Arr
{
    int * pBase; //存储的是数组第一个元素的地址
    int len; //数组所能容纳的最大元素的个数
    int cnt; //当前数组有效元素的个数
};

void init_arr(struct Arr *, int);  //初始化数组
bool is_empty(struct Arr *); // 数组是否为空
bool is_full(struct Arr *); // 数组是否已满
bool push(struct Arr *, int); //追加元素
void sort(struct Arr *); // 排序
void reverse(struct Arr *); // 逆序
bool insert(struct Arr *, int, int); // 插入元素
bool del(struct Arr *, int, int *); // 删除元素
void show_arr(struct Arr *); // 打印数组

int main(void) {
    struct Arr arr;

    int val; // 存储删除元素

    init_arr(&arr, 6); // 初始化数组
    show_arr(&arr);

    push(&arr, 4); // 在尾部追加元素
    push(&arr, 1);
    push(&arr, -1);
    push(&arr, 10);
    push(&arr, 0);
    push(&arr, 6);
    show_arr(&arr);

    sort(&arr); // 排序
    show_arr(&arr);

    reverse(&arr); // 逆序
    show_arr(&arr);

    del(&arr, 4, &val); // 删除指定位置元素
    printf("您删除的元素是: %d\n", val);
    show_arr(&arr);

    insert(&arr, 4, 20); // 在指定位置插入元素
    show_arr(&arr);

    return 0;
}

void init_arr(struct Arr * pArr, int length) {
    pArr->pBase = (int *)malloc(sizeof(int) * length);
    if(NULL == pArr->pBase) {
        printf("动态内存分配失败!\n");
        exit(-1); //终止整个程序
    }
    else {
        pArr->len = length;
        pArr->cnt = 0;
    }
    return;
}

bool is_empty(struct Arr * pArr) {
    if(0 == pArr->cnt) {
        return true;
    } else {
        return false;
    }
}

bool is_full(struct Arr * pArr) {
    if (pArr->cnt == pArr->len) {
        return true;
    } else {
        return false;
    }
}

void show_arr(struct Arr * pArr) {
    if(is_empty(pArr)) {
        printf("数组为空!\n");
    } else {
        for(int i=0; i<pArr->cnt; ++i) {
            printf("%d  ", pArr->pBase[i]);
        }
        printf("\n");
    }
}

bool push(struct Arr * pArr, int val) {
    //满了就返回false
    if(is_full(pArr)) {
        return false;
    }
    //不满时追加
    pArr->pBase[pArr->cnt] = val;
    (pArr->cnt)++;
    return true;
}

void sort(struct Arr * pArr) {
    int i, j, t;
    // 简单的冒泡排序法实现，后面的章节会单独讲排序算法
    for(i=0; i<pArr->cnt; ++i) {
        for(j=i+1; j<pArr->cnt; ++j) {
            if(pArr->pBase[i] > pArr->pBase[j]) {
                t = pArr->pBase[i];
                pArr->pBase[i] = pArr->pBase[j];
                pArr->pBase[j] = t;
            }
        }
    }
}

void reverse(struct Arr * pArr) {
    int i = 0;
    int j = pArr->cnt-1;
    int t;
    // 当i<j时，置换i和j位置的元素
    while(i < j) {
        t = pArr->pBase[i];
        pArr->pBase[i] = pArr->pBase[j];
        pArr->pBase[j] = t;
        ++i;
        --j;
    }
    return;
}

bool insert(struct Arr * pArr, int pos, int val) {
    int i;
    // 满了就算了
    if(is_full(pArr)) {
        return false;
    }
    // 如果插入的位置不在数组有效范围内就算了
    if(pos<1 || pos>pArr->cnt+1) {
        return false;
    }
    // 从插入位置开始后移各元素，将插入位置空出
    for(i=pArr->cnt-1; i>=pos-1; --i) {
        pArr->pBase[i+1] = pArr->pBase[i];
    }
    // 给插入位置的元素赋值
    pArr->pBase[pos-1] = val;
    //数组有效长度自增
    (pArr->cnt)++;
    return true;
}

bool del(struct Arr * pArr, int pos, int * pVal) {
    int i;
    // 空就算了
    if(is_empty(pArr)) {
        return false;
    }
    // 不在有效范围内就算了
    if (pos<1 || pos>pArr->cnt) {
        return false;
    }
    // 存储被删除元素
    *pVal = pArr->pBase[pos-1];
    // 从删除位置开始，前移各元素，将删除位置堵死
    for (i=pos; i<pArr->cnt; ++i) {
        pArr->pBase[i-1] = pArr->pBase[i];
    }
    // 数组有效长度自减
    pArr->cnt--;
    return true;
}
