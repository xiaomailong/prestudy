#include <stdio.h>

static void foo(float x)
{
    float xx = x * 0.01f;
    printf("%d\n", (int)(x * 0.01f));
    printf("%d\n", (int)xx);
}

int main()
{
    foo(2000.0f);
    return 0;
}

// gcc floattest.c -mfpmath=387
