---
layout: post
title: CSDN-Markdown语法集锦
date: 2015-08-20T00:00:00.000Z
categories: jekyll
tagline: markdown
tags:
  - jekyll
  - markdown
---

# 表格：

标题1 | 标题2            | 标题3
:-- | :------------: | --:
abc | 上面的虚线可用多个减号代替  | efg
123 | 英文冒号可以调节居左、中、右 | 456
左   | 中              |   右

# 数学公式（MathJax）
## MathJax语法
### 希腊字母
1. 一些希腊字母具有变体形式，如 epsilon varepsilon : $ \epsilon \varepsilon, \phi \varphi $。

序号 | 希腊字母大写 | 语法         | 希腊字母小写 | 语法            | 中文名称   | 示例                         | 意义
-: | :----: | :--------- | :----: | :-----------: | :----: | :------------------------: | :--------------------:
 1 | A      | A          | α      | `\alhpa`      | 阿尔法    | $A \qquad \alpha$          | 角度，系数，角加速度
 2 | B      | B          | β      | `\beta`       | 贝塔     | $B \qquad \beta$           | 磁通系数，角度，系数
 3 | Γ      | `\Gamma`   | γ      | `\gamma`      | 伽马     | $\Gamma \qquad \gamma$     | 电导系数，角度，比热容比
 4 | Δ      | `\Delta`   | δ      | `\delta`      | 德尔塔    | $\Delta \qquad \delta$     | 变化量，屈光度，一元二次方程中的判别式
 5 | E      | E          | ϵ      | `\epsilon`    | 伊普西隆   | $E \qquad \epsilon$        | 对数之基数，介电常数
 6 | Z      | Z          | ζ      | `\zeta`       | 泽塔     | $Z \qquad \zeta$           | 系数，方位角，阻抗，相对粘度
 7 | H      | H          | η      | `\eta`        | 伊塔     | $H \qquad \eta $           | 迟滞系数，效率
 8 | Θ      | `\Theta`   | θ      | `\theta`      | 西塔     | $\Theta \qquad \theta$     | 温度，角度
 9 | I      | I          | ι      | `\iota`       | 约塔     | $I \qquad \iota$           | 微小，一点
10 | K      | K          | κ      | `\kappa`      | 卡帕     | $K \qquad \kappa$          | 介质常数，绝热指数
11 | Λ      | `\Lambda`  | λ      | `\lambda`     | 兰姆达    | $\Lambda \qquad \lambda$   | 波长，体积，导热系数
12 | M      | M          | μ      | `\mu`         | 谬      | $M \qquad \mu$             | 磁导系数，微，动摩擦系（因）数，流体动力粘度
13 | N      | N          | ν      | `\nu`         | 纽      | $N \qquad \nu$             | 磁阻系数，流体运动粘度,光子频率
14 | Ξ      | `\Xi`      | ξ      | `\xi`         | 克西     | $\Xi \qquad \xi$           | 随机数，（小）区间内的一个未知特定值
15 | O      | O          | ο      | `\omicron`    | 欧米克隆   | $O \qquad \omicron$        | 高阶无穷小函数
16 | Π      | `\Pi`      | π      | `\pi`         | 派      | $\Pi \qquad \pi$           | 圆周率，π(n)表示不大于n的质数个数
17 | R      | R          | ρ      | `\rho`        | 柔      | $P \qquad \rho$            | 电阻系数，柱坐标和极坐标中的极径，密度
18 | Σ      | `\Sigma`   | σ      | `\sigma`      | 西格玛    | $\Sigma \qquad \sigma$     | 总和，表面密度，跨导，正应力
19 | T      | T          | τ      | `\tau`        | 陶      | $T \qquad \tau$            | 时间常数，切应力
20 | Υ      | `\Upsilon` | υ      | `\upsilon`    | 宇普西隆   | $\Upsilon \qquad \upsilon$ | 位移
21 | Φ      | `\Phi`     | ϕ      | `\phi`        | 弗爱     | $\Phi \qquad \phi$         | 磁通，角，透镜焦度，热流量
22 | X      | X          | χ      | `\chi`        | 卡      | $X \qquad \chi$            | 统计学中有卡方(χ^2)分布
23 | Ψ      | `\Psi`     | ψ      | `\psi`        | 普赛     | $\Psi \qquad \psi$         | 角速，介质电通量
24 | Ω      | `\Omega`   | ω      | `\omega`      | 欧米伽    | $\Omega \qquad \omega$     | 欧姆，角速度，交流电的电角度
异体 | E      | E          | ε      | `\varepsilon` | 异体伊普西隆 | $E \qquad \varepsilon$     |
异体 | K      | K          | ϰ      | `\varkappa`   | 异体卡帕   | $K \qquad \varkappa$       |
异体 | Θ      | `\Theta`   | ϑ      | `\vartheta`   | 异体西塔   | $\Theta \qquad \vartheta$  |
异体 | Π      | `\Pi`      | ϖ      | `\varpi`      | 异体派    | $P \qquad \varpi$          |
异体 | R      | R          | ϱ      | `\varrho`     | 异体柔    | $R \qquad \varrho$         |
异体 | Σ      | `\Sigma`   | ς      | `\varsigma`   | 异体西格玛  | $\Sigma \qquad \varsigma$  |
异体 | Φ      | `\Phi`     | φ      | `\varphi`     | 异体弗爱   | $\Phi \qquad \varphi$      |

### 数学符号
#### 上标与下标
上标和下标分别使用^与_，例如x_i^2：$x_i^2$。  

默认情况下，上下标符号仅仅对下一个组起作用。一个组即单个字符或者使用{..}包裹起来的内容。  

也就是说，如果使用10^10，会得到 $10^10$，而10^{10}才是 $10^{10}$。  

同时，大括号还能消除二义性，如`x^5^6`将得到一个错误$x^5^6$，必须使用大括号来界定^的结合性，  

如`{x^5}^6`：${x^5}^6$ 或者 `x^{5^6}`：$x^{5^6}$。

运算符 | 说明 | 代码      | 示例
:-- | :- | :------ | :-----:
`^` | 上标 | `x ^ y` | $x ^ y$
`_` | 下标 | `x _ y` | $x _ y$

1. 表示排列使用`{n+1 choose 2k}` 或 `binom{n+1}{2k}`，  
2. $${n+1 \choose 2k}$$。

#### 括号
1. 小括号与方括号：使用原始的`( )`，`[ ]`即可，如, `(2+3)[4+4]`：$(2+3)[4+4]$  
2. 大括号：时由于大括号`{}`被用来分组，因此需要使用`\{`和`\}`表示大括号，也可以使用`\lbrace` 和`\rbrace`来表示。如, `\{a _ b\}`: ${a_b}$，`\lbrace a_b \rbrace`： $\lbrace a_b \rbrace$。  
3. 尖括号：使用`\langle` 和 `\rangle`表示左尖括号和右尖括号。如, `\langle x \rangle`：$\langle x \rangle$。  
4. 上取整：使用`\lceil` 和 `\rceil` 表示。如，`\lceil x \rceil`：$\lceil x \rceil$。  
5. 下取整：使用`\lfloor` 和 `\rfloor` 表示。如，`\lfloor x \rfloor`：$\lfloor x \rfloor$。  
6. 不可见括号：使用.表示。
7. 需要注意的是，原始符号并不会随着公式大小缩放。如，`(\frac12)`：$(\frac12)$。

可以使用`\left(...\right)`来自适应的调整括号大小。
- $\lbrace\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}\rbrace\tag{1.1}$
- $\left \lbrace \sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6} \right\rbrace\tag{1.2}$  
- 可以看到，公式1.2中的括号是经过缩放的。

运算符                 | 说明  | 代码                              | 示例
:------------------ | :-- | :------------------------------ | :-----------------------------:
`\lceil`和`\rceil`   | 上取整 | `\lceil\frac{1}{2}\rceil = 1`   | $\lceil\frac{1}{2}\rceil = 1$
`\lfloor`和`\rfloor` | 下取整 | `\lfloor\frac{1}{2}\rfloor = 0` | $\lfloor\frac{1}{2}\rfloor = 0$

#### 分式与根式
- 分式表示第一种，使用`\frac` {a}{b}，`\frac`作用于其后的两个组a，b，结果为$\frac {a}{b}$。如果你的分子或分母不是单个字符，请使用`{..}`来分组。
- 分式表示第二种，使用`\over`来分隔一个组的前后两部分，如`{a+1 \over b+1}`：${a+1 \over b+1}$。
- 根式使用`\sqrt`来表示。如，`\sqrt[4]{\frac x y}` ：$\sqrt[4]{\frac x y} $

运算符      | 说明       | 代码            | 示例
:------- | :------- | :------------ | :-----------:
`\frac ` | -分式      | `\frac{x}{y}` | $\frac{x}{y}$
`\sqrt`  | x√‾开二次方  | `\sqrt x`     | $\sqrt x$
`\sqrt`  | x√n‾开n次方 | `\sqrt[n]{x}` | $\sqrt[n]{x}$

#### 算术运算符
1. `\times` `\div` `\pm` `\mp`表示：$\times \div \pm \mp$，`\cdot`表示居中的点，`x \cdot y` : $x \cdot y$。
2. 模运算 `\pmod`, 如，`a \equiv b \pmod n`：$a \equiv b \pmod n$。
3. 自定义运算 `\oplus`：$\oplus$，`\odot`： $\odot$，`\otimes` ：$\otimes$。

运算符          | 说明    | 代码                            | 示例
:----------- | :---- | :---------------------------- | :-----------------------------:
`\+`         | +加    | `x + y`                       | $x + y$
`\-`         | -减    | `x - y`                       | $x - y$
`\times`     | ×乘    | `x \times y`                  | $x \times y$
`\cdot`      | ⋅乘    | `x \cdot y`                   | $x \cdot y$
`\ast`       | ∗乘    | `x \ast y`                    | $x \ast y$
`\div`       | ÷除    | `x \div y`                    | $x \div y$
`\pmode`     | mod取模 | `a \equiv b \pmod n`          | $a \equiv b \pmod n$
`\pm`        | ±加减   | `x \pm y`                     | $x \pm y$
`\mp`        | ∓减加   | `x \mp y`                     | $x \mp y$
`\=`         | =等于   | `x = y`                       | $x = y$
`\mid`       | ∣或    | `x \mid y`                    | $x \mid y$
`\nmid`      | ∤非或   | `x \mid y`                    | $x \nmid y$
`\sum`       | ∑连加求和 | `sum_{i=0}^n frac{1}{i^2}`    | $\sum_{i=0}^n \frac{1}{i^2}$
`\prod`      | ∏连乘求积 | `prod_{i=0}^n frac{1}{i^2}`   | $\prod_{i=0}^n \frac{1}{i^2}$
`\coprod`    | ∐     | `coprod_{i=0}^n frac{1}{i^2}` | $\coprod_{i=0}^n \frac{1}{i^2}$
`\oplus`     | ⊕圆加   | `x \oplus y`                  | $x \oplus y$
`\odot`      | ⨀圆点   | `x \odot y`                   | $x \odot y$
`\otimes`    | ⨂圆乘   | `x \otimes y`                 | $x \otimes y$
`\bigoplus`  | ⨁圆加   | `x \bigoplus y`               | $x \bigoplus y$
`\bigodot`   | ⨀圆点   | `x \bigodot y`                | $x \bigodot y$
`\bigotimes` | ⨂圆乘   | `x \bigotimes y`              | $x \bigotimes y$

#### 比较运算符
1. 比较运算符：`\lt` `\gt` `\le` `\ge` `\neq` ： $\lt \gt \le \ge \neq$。可以在这些运算符前面加上`\not`，如`\not\lt`：$\not\lt$。
2. `\approx` `\sim` `\cong` `\equiv` `\prec` ： $\approx \sim \cong \equiv \prec$。

运算符       | 说明     | 代码                     | 示例
:-------- | :----- | :--------------------- | :--------------------:
`\=`      | =等于    | `x = y`                | $x = y$
`\neq`    | ≠不等于   | `x \neq y \not= z`     | $x \neq y \not= z$
`\<\lt`   | <小于    | `x < y \lt z`          | $x < y \lt z$
`\not\<`  | ≮不小于   | `x \not\< y \not\lt z` | $x \not\< y \not\lt z$
`\leq`    | ≤小于等于  | `x \leq y`             | $x \leq y$
`\nleq`   | ≰不小于等于 | `x \nleq y \not\leq z` | $x \nleq y \not\leq z$
`\>`      | >大于    | `x > y \gt z`          | $x > y\gt z$
`\not\>`  | ≯不大于   | `x \not> y \not\gt z`  | $x \not\> y \not\gt z$
`\geq`    | ≥大于等于  | `x \geq y`             | $x \geq y$
`\ngeq`   | ≱不大于等于 | `x \ngeq y \not\geq z` | $x \ngeq y \not\geq z$
`\approx` | ≈约等于   | `x \approx y`          | $x \approx y$
`\equiv`  | ≡恒等于   | `x \equiv y`           | $x \equiv y$
`\sim`    | ∼      | `\sim`                 | $\sim$
`\cong`   | ≅      | `\cong`                | $\cong$
`\prec`   | ≺      | `\prec`                | $\prec$

#### 集合运算符
1. 集合关系与运算：`\cup` `\cap` `\setminus` `\subset` `\subseteq` `\subsetneq` `\supset` `\in` `\notin` `\emptyset` `\varnothing` ：$\cup \cap \setminus \subset \subseteq \subsetneq \supset \in \notin \emptyset \varnothing$.

运算符             | 说明                     | 代码                  | 示例
:-------------- | :--------------------- | :------------------ | :-----------------:
`\emptyset`     | ∅空集                    | `\emptyset`         | $\emptyset$
`\in`           | ∈属于                    | `x \in y`           | $x \in y$
`\notin`        | ∉不属于                   | `x \notin y`        | $x \notin y$
`\subset`       | ⊂子集                    | `x \subset y`       | $x \subset y$
`\not\subset`   | ⊄非子集                   | `x \not\subset y`   | $x \not\subset y$
`\subseteq`     | ⊆子等集                   | `x \subseteq y`     | $x \subseteq y$
`\not\subseteq` | ⊈非子等集                  | `x \not\subseteq y` | $x \not\subseteq y$
`\supset`       | ⊃超集                    | `x \supset y`       | $x \supset y$
`\not\supset`   | ⊅非超集                   | `x \not\supset y`   | $x \not\supset y$
`\supseteq`     | ⊇超等集                   | `x \supseteq y`     | $x \supseteq y$
`\not\supseteq` | ⊉非超等集                  | `x \not\supseteq y` | $x \not\supseteq y$
`\cup`          | ∪并                     | `x \cup y`          | $x \cup y$
`\not\cup`      | ∪̸非并                   | `x \not\cup y`      | $x \not\cup y$
`\cap`          | ∩交                     | `x \cap y`          | $x \cap y$
`\not\cap`      | ∩̸非交                   | `x \not\cap y`      | $x \not\cap y$
`\vee`          | ∨合取                    | `x \vee y`          | $x \vee y$
`\not\vee`      | ∨̸非合取                  | `x \not\vee y`      | $x \not\vee y$
`\wedge`        | ∧析取                    | `x \wedge y`        | $x \wedge y$
`\not\wedge`    | ∧̸非析取                  | `x \not\wedge y`    | $x \not\wedge y$
`\uplus`        | ⊎                      | `x \uplus y`        | $x \uplus y$
`\not\uplus`    | ⊎̸                     | `x \not\uplus y`    | $x \not\uplus y$
`\sqcup`        | ⊔                      | `x \sqcup y`        | $x \sqcup y$
`\not\sqcup`    | ⊔̸                     | `x \not\sqcup y`    | $x \not\sqcup y$
`\bigcup`       | ⋃大并                    | `x \bigcup y`       | $x \bigcup y$
`\not\bigcup`   | ⧸⋃大非并                  | `x \not\bigcup y`   | $x \not\bigcup y$
`\bigcap`       | ⋂大交                    | `x \bigcap y`       | $x \bigcap y$
`\not\bigcap`   | ⧸⋂大非交                  | `x \not\bigcap y`   | $x \not\bigcap y$
`\bigvee`       | ⋁命题的“合取”（“与”）运算        | `x \bigvee y`       | $x \bigvee y$
`\not\bigvee`   | ⧸⋁命题的“合取”（“与”）运算       | `x \not\bigvee y`   | $x \not\bigvee y$
`\bigwedge`     | ⋀命题的“析取”（“或”，“可兼或”）运算  | `x \bigwedge y`     | $x \bigwedge y$
`\not\bigwedge` | ⧸⋀命题的“析取”（“或”，“可兼或”）运算 | `x \not\bigwedge y` | $x \not\bigwedge y$
`\biguplus`     | ⨄                      | `x \biguplus y`     | $x \biguplus y$
`\not\biguplus` | ⧸⨄                     | `x \not\biguplus y` | $x \not\biguplus y$
`\bigsqcup`     | ⨆                      | `x \bigsqcup y`     | $x \bigsqcup y$
`\not\bigsqcup` | ⧸⨆                     | `x \not\bigsqcup y` | $x \not\bigsqcup y$

#### 对数运算符

运算符    | 说明    | 代码        | 示例
:----- | :---- | :-------- | :-------:
`\log` | log对数 | `\log(x)` | $\log(x)$
`\lg`  | lg对数  | `\lg(x)`  | $\lg(x)$
`\ln`  | ln对数  | `\ln(x)`  | $\ln(x)$

#### 三角运算符
1. 常见的三角函数，求极限符号可直接使用+缩写即可。如$\sin x$,$\arctan x$,$\lim_{1\to\infty}$。

运算符       | 说明        | 代码           | 示例
:-------- | :-------- | :----------- | :----------:
`\bot`    | ⊥垂直       | `A \bot B`   | $A \bot B$
`\angle`  | ∠角        | `\angle 45`  | $\angle 45$
`\circ`   | ∘度        | `45^\circ`   | $45^\circ$
`\sin`    | sin正弦     | `\sin 45`    | $\sin 45$
`\cos`    | cos余弦     | `\cos 45`    | $\cos 45$
`\tan`    | tan正切     | `\tan 45`    | $\tan 45$
`\arcsin` | arcsin反正弦 | `\arcsin 45` | $\arcsin 45$
`\arccos` | arccos反余弦 | `\arccos 45` | $\arccos 45$
`\arctan` | arctan反正切 | `\arctan 45` | $\arctan 45$
`\cot`    | cot       | `\cot`       | $\cot$
`\sec`    | sec       | `\sec`       | $\sec$
`\csc`    | csc       | `\csc`       | $\csc$

#### 微积分运算符

运算符             | 说明          | 代码                                | 示例
:-------------- | :---------- | :-------------------------------- | :-------------------------------:
`\prime`        | ′           | `\prime`                          | $\prime$
`\int`          | ∫积分         | `\int_0^1 x^2 {\rm d}x `          | $\int_0^1 x^2 {\rm d}x$
`\iint`         | ∬二重积分       | `\iint_D f(x,y)d\sigma`           | $\iint_D f(x,y)d\sigma$
`\iiint`        | ∭三重积分       | `\iiint_D f(x,y)d\sigma`          | $\iiint_D f(x,y)d\sigma$
`\iiiint`       | ⨌四重积分       | `\iiiint_D f(x,y)d\sigma`         | $\iiiint_D f(x,y)d\sigma$
`\oint`         | ∮闭合曲面（曲线）积分 | `\oint e^{x+y} ds`                | $\oint e^{x+y} ds$
`\lim`          | lim极限       | `\lim*{x\to\infty}`               | $\lim*{x\to\infty}$
`\infty`        | ∞极限         | `\sum_{i=0}^\infty i^2`           | $\sum_{i=0}^\infty i^2$
`\nabla`        | ∇           | `\nabla`                          | $\nabla$
`\partial`      | ∂部分         | `\frac{\partial x}{\partial y}`   | $\frac{\partial x}{\partial y}$
`\displaystyle` | 块公式格式       | `\displaystyle \lim*{x\to\infty}` | $\displaystyle \lim*{x\to\infty}$

#### 逻辑运算符
1. 逻辑运算符：`\land` `\lor` `\lnot` `\forall` `\exists` `\top` `\bot` `\vdash` `\vDash`： $\land \lor \lnot \forall \exists \top \bot \vdash \vDash$。

运算符          | 说明    | 代码           | 示例
:----------- | :---- | :----------- | :----------:
`\because`   | ∵因为   | `\because`   | $\because$
`\therefore` | ∴所以   | `\therefore` | $\therefore$
`\forall`    | ∀全称量词 | `\forall`    | $\forall$
`\exists`    | ∃存在量词 | `\exists`    | $\exists$
`\top `      | ⊤     | `\top`       | $\top$
`\bot`       | ⊥     | `\bot `      | $\bot$
`\vdash`     | ⊢     | `\vdash`     | $\vdash$
`\vDash`     | ⊨     | `\vDash`     | $\vDash$
`\land`      | ∧     | `\land`      | $\land$
`\lor`       | ∨     | `\lor`       | $\lor$
`\lnot`      | ¬     | `\lnot`      | $\lnot$

#### 顶部符号&连线符号
- 对于单字符，`hat`：$\hat x$，多字符可以使用`widehat`,$\widehat {xy}$.
- 类似的还有`hat`,`overline`,`vec`,`overrightarrow`, `dot` `ddot` :$ \hat x \quad \overline {xyz} \quad \vec a \quad \overrightarrow {x} \quad \dot x \quad \ddot x $。

运算符               | 说明      | 代码                                             | 示例
:---------------- | :------ | :--------------------------------------------- | :-------------------------------------:
`\hat`            | ŷ      | `\hat{y}`                                      | $\hat{y}$
`\check`          | yˇ      | `\check{y}`                                    | $\check{y}$
`\breve`          | y˘      | `\breve{y}`                                    | $\breve{y}$
`\widehat`        | xyzˆ    | `\widehat{xyz}`                                | $\widehat{xyz}$
`\overline`       | y⎯      | `\overline{y}`                                 | $\overline{y}$
`\overrightarrow` | y→      | `\overrightarrow{y} `                          | $\overrightarrow{y}$
`\overleftarrow`  | y←      | `\overleftarrow{y}`                            | $\overleftarrow{y}$
`\dot`            | y˙      | `\dot{y}`                                      | $\dot{y}$
`\ddot`           | y¨      | `\ddot{y}`                                     | $\ddot{y}$
`\hat`            | Ŷ拟合值   | `\hat Y = \hat \beta_0 + \hat \beta_1X`        | $\hat Y = \hat \beta_0 + \hat \beta_1X$
`\vec`            | a⃗ 向量   | `\vec{a}`                                      | $\vec{a}$
`\overline`       | ⎯⎯⎯平均数  | `\overline{x}`                                 | $\overline{x}$
`\overline`       | ⎯⎯⎯连线符号 | `\overline{a+b+c+d}`                           | $\overline{a+b+c+d}$
`\underline`      | ⎯⎯⎯下划线  | `\underline{a+b+c+d}`                          | $\underline{a+b+c+d}$
`\overbrace`      | ⏞上大括号   | `\overbrace{a+\underbrace{b+c}*{1.5}+d}^{2.0}` | $\overbrace{a+d}^{2.0}$
`\underbrace`     | ⏟下大括号   | `\underbrace{b+c} * {1.5}`                     | $\underbrace{b+c} * {1.5}$

#### 箭头符号
1. 箭头：`to` `rightarrow` `leftarrow` `Rightarrow` `Leftarrow` `mapsto` : $\to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto$。

运算符               | 说明     | 代码                | 示例
:---------------- | :----- | :---------------- | :---------------:
`\to`             | →右箭头   | `\to`             | $\to$
`\mapsto`         | ↦左顶右箭头 | `\to`             | $\mapsto$
`\uparrow`        | ↑上箭头   | `\uparrow`        | $\uparrow$
`\Uparrow`        | ⇑上双箭头  | `\Uparrow`        | $\Uparrow$
`\downarrow`      | ↓下箭头   | `\downarrow`      | $\downarrow$
`\Downarrow`      | ⇓下双箭头  | `\Downarrow`      | $\Downarrow$
`\leftarrow`      | ←左箭头   | `\leftarrow`      | $\leftarrow$
`\Leftarrow`      | ⇐左双箭头  | `\Leftarrow`      | $\Leftarrow$
`\longleftarrow`  | ⟵长左箭头  | `\longleftarrow`  | $\longleftarrow$
`\Longleftarrow`  | ⟸长左双箭头 | `\Longleftarrow`  | $\Longleftarrow$
`\rightarrow`     | →右箭头   | `\rightarrow`     | $\rightarrow$
`\Rightarrow`     | ⇒右双箭头  | `\Rightarrow`     | $\Rightarrow$
`\longrightarrow` | ⟶长右箭头  | `\longrightarrow` | $\longrightarrow$
`\Longrightarrow` | ⟹长右双箭头 | `\Longrightarrow` | $\Longrightarrow$

#### 其他
1. `ldots`与`cdots`，其区别是`dots`的位置不同，`ldots`位置稍低，`cdots`位置居中。$a_1 + a_2 + \cdots + a_n$，$a_1, a_2, \ldots, a_n$。
2. 可以使用cdots：$\cdots$，ddots：$\ddots$，vdots：$\vdots$ 来省略矩阵中的元素。
3. `star`： $\star$，`ast`： $\ast$，`circ`： $\circ$，`bullet`：$\bullet$。
4. `aleph_0`：$\aleph_0$， `Im`：$\Im$，`Re`：$\Re$。
5. 要输出字符　空格　# 　%　&　_　{　}　，用命令：`$ . # \$ \% \& \_ { } $`

运算符        | 说明       | 代码                               | 示例
:--------- | :------- | :------------------------------- | :------------------------------:
`\ldots`   | …底端对齐的省略号 | `1,2,\ldots,n`                   | $1,2,\ldots,n$
`\cdots`   | ⋯中线对齐的省略号 | `x_1^2 + x_2^2 + \cdots + x_n^2` | $x_1^2 + x_2^2 + \cdots + x_n^2$
`\vdots`   | ⋮竖对齐的省略号  | `1,2,\vdots,n`                   | $1,2,\vdots,n$
`\ddots`   | ⋱矩阵对齐的省略号 | `1,2,\ddots,n`                   | $1,2,\ddots,n$
`\star`    | ⋆五角星     | `\star`                          | $\star$
`\ast`     | ∗雪花      | `\ast`                           | $\ast$
`\circ`    | ∘圆点      | `\circ`                          | $\circ$
`\bullet`  | ∙实着重号    | `\bullet`                        | $\bullet$
`\bigstar` | ⋆五角星     | `\bigstar`                       | $\bigstar$
`\bigcirc` | ∘圆点      | `\bigcirc`                       | $\bigcirc$
`\aleph_0` | ℵ0       | `\aleph_0`                       | $\aleph_0$
`\Im`      | ℑ        | `\Im`                            | $\Im$
`\Re`      | ℜ        | `\Re`                            | $\Re$

#### 表格
使用 `begin{array} {列样式} end{array}` 这样的形式来创建表格，列样式可以是`c`、`l`、`r`表示居中、左对齐、右对齐，还可以使用`|`表示一条竖线。表格中 各行使用`\`分隔，各列使用`&`分隔。使用`\hline`在本行前加入一条直线。例如，

$$ \begin{array}<br>{c |l c r}<br>n & \text{Left} & \text{Center} & \text{Right} \<br>\hline<br>1 & 0.24 & 1 & 125 \<br>2 & -1 & 189 & -8 \<br>3 & -20 & 2000 & 1+10i \<br>\end{array}<br>$$

结果：

$$ \begin{array} {c |l c r} n & \text{Left} & \text{Center} & \text{Right} \<br>\hline<br>1 & 0.24 & 1 & 125 \<br>2 & -1 & 189 & -8 \<br>3 & -20 & 2000 & 1+10i \<br>\end{array}<br>$$

一个复杂的例子如下：<br>$$<br>% outer vertical array of arrays<br>\begin{array}<br>{c} % inner horizontal array of arrays<br>\begin{array}<br>{c c}<br>% inner array of minimum values<br>\begin{array}<br>{c |c c c c}<br>\text{min} & 0 & 1 & 2 & 3 \<br>\hline<br>0 & 0 & 0 & 0 & 0 \<br>1 & 0 & 1 & 1 & 1 \<br>2 & 0 & 1 & 2 & 2 \<br>3 & 0 & 1 & 2 & 3<br>\end{array}<br>&<br>% inner array of maximum values<br>\begin{array}<br>{c |c c c c}<br>\text{max} & 0 & 1 & 2 & 3 \<br>\hline<br>0 & 0 & 1 & 2 & 3 \<br>1 & 1 & 1 & 2 & 3 \<br>2 & 2 & 2 & 2 & 3 \<br>3 & 3 & 3 & 3 & 3<br>\end{array}<br>\end{array} \<br>% inner array of delta values<br>\begin{array}<br>{c |c c c c}<br>\Delta & 0 & 1 & 2 & 3 \<br>\hline<br>0 & 0 & 1 & 2 & 3 \<br>1 & 1 & 0 & 1 & 2 \<br>2 & 2 & 1 & 0 & 1 \<br>3 & 3 & 2 & 1 & 0<br>\end{array}<br>\end{array}<br>$$

### 矩阵
#### 基本用法
使用 begin{matrix} end{matrix} 这样的形式来表示矩阵，在\begin与\end之间加入矩阵中的元素即可。<br>矩阵的行之间使用\分隔，列之间使用&分隔。<br>例如

```
\begin{matrix}  
1 & x & x^2 \\  
1 & y & y^2 \\  
1 & z & z^2 \\  
\end{matrix}
```

结果：<br>$$<br>\begin{matrix}<br>1 & x & x^2 \<br>1 & y & y^2 \<br>1 & z & z^2 \<br>\end{matrix}<br>$$

#### 加括号
如果要对矩阵加括号，可以像上文中提到的一样，使用\left与\right配合表示括号符号。<br>$$ \left( \begin{matrix} 1 & 2 \ 3 & 4 \ \end{matrix} \right) $$<br>$$ \left[ \begin{matrix} 1 & 2 \ 3 & 4 \ \end{matrix} \right] $$<br>$$ \left{ \begin{matrix} 1 & 2 \ 3 & 4 \ \end{matrix} \right} $$<br>也可以使用特殊的matrix。即替换begin{matrix}...end{matrix}中的matrix为pmatrix，bmatrix，Bmatrix，vmatrix,Vmatrix. 如<br>pmatrix: $$\begin{pmatrix} 1 & 2 \ 3 & 4 \ \end{pmatrix}$$<br>bmatrix: $$\begin{bmatrix} 1 & 2 \ 3 & 4 \ \end{bmatrix}$$<br>Bmatrix: $$\begin{Bmatrix} 1 & 2 \ 3 & 4 \ \end{Bmatrix}$$<br>vmatrix: $$\begin{vmatrix} 1 & 2 \ 3 & 4 \ \end{vmatrix}$$<br>Vmatrix: $$\begin{Vmatrix} 1 & 2 \ 3 & 4 \ \end{Vmatrix}$$

#### 省略元素
可以使用\cdots $\cdots$ \ddots $\ddots$ \vdots $\vdots$来省略矩阵中的元素，<br>如：<br>$$<br>\begin{pmatrix}<br>1 & a_1 & a_1^2 & \cdots & a_1^n \<br>1 & a_2 & a_2^2 & \cdots & a_2^n \<br>\vdots & \vdots& \vdots & \ddots & \vdots \<br>1 & a_m & a_m^2 & \cdots & a_m^n<br>\end{pmatrix}<br>$$

#### 增广矩阵
增广矩阵需要使用前面的array来实现，如<br>\left[<br>\begin{array}{cc|c}<br>1 & 2 & 3 \<br>4 & 5 & 6<br>\end{array}<br>\right]<br>结果：<br>$$<br>\left[<br>\begin{array}{cc|c}<br>1 & 2 & 3 \<br>4 & 5 & 6<br>\end{array}<br>\right]<br>$$

#### 对齐的公式
有时候可能需要一系列的公式中等号对齐，如：<br>$$<br>\begin{align}<br>\sqrt{37}<br>& = \sqrt{\frac{73^2-1}{12^2}} \<br>& = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}} \<br>& = \sqrt{\frac{73^2}{12^2}}\sqrt{\frac{73^2-1}{73^2}} \<br>& = \frac{73}{12}\sqrt{1 - \frac{1}{73^2}} \<br>& \approx \frac{73}{12}\left(1 - \frac{1}{2\cdot73^2}\right)<br>\end{align}<br>$$<br>这需要使用形如begin{align}...end{align}的格式，其中需要使用&来指示需要对齐的位置。请使用右键查看上述公式的代码。

#### 分类表达式
定义函数的时候经常需要分情况给出表达式，可使用begin{cases}...end{cases}。其中，使用\来分类，使用&指示需要对齐的位置。如：<br>$$<br>f(n) =<br>\begin{cases}<br>n/2, & \text{if $n$ is even} \<br>3n+1, & \text{if $n$ is odd} \<br>\end{cases}<br>$$<br>上述公式的括号也可以移动到右侧，不过需要使用array来实现，如下：<br>$$<br>\left.<br>\begin{array}<br>{l}<br>\text{if $n$ is even:} & n/2 \<br>\text{if $n$ is odd:} & 3n+1<br>\end{array}<br>\right}<br>=f(n)<br>$$<br>最后，如果想分类之间的垂直间隔变大，可以使用[2ex]代替\来分隔不同的情况。(3ex,4ex也可以用，1ex相当于原始距离）。

#### 不要在再指数或者积分中使用
\frac 在指数或者积分表达式中使用\frac会使表达式看起来不清晰，因此在专业的数学排版中很少被使用。应该使用一个水平的/来代替，效果如下：

$$<br>\begin{array}<br>{|c|c|}<br>\hline \<br>\mathrm{Bad} & \mathrm{Better} \<br>\hline \<br>e^{i\frac{\pi}2} \quad e^{\frac{i\pi}2} & e^{i\pi/2} \<br>\int_{-\frac\pi2}^\frac\pi2 \sin x\,dx & \int_{-\pi/2}^{\pi/2}\sin x\,dx \<br>\hline<br>\end{array}<br>$$

#### 使用 \mid 代替 |作为分隔符
符号|作为分隔符时有排版空间大小的问题，应该使用\mid代替。效果如下：<br>$$<br>\begin{array}<br>{c |c}<br>\mathrm{Bad} & \mathrm{Better} \<br>\hline \<br>{x|x^2\in\Bbb Z} & {x\mid x^2\in\Bbb Z} \<br>\end{array}<br>$$

#### 多重积分
对于多重积分，不要使用\int\int此类的表达，应该使用\iint \iiint等特殊形式。效果如下：<br>$$<br>\begin{array}<br>{c |c}<br>\mathrm{Bad} & \mathrm{Better} \<br>\hline \<br>\int\int_S f(x)\,dy\,dx & \iint_S f(x)\,dy\,dx \<br>\int\int\int_V f(x)\,dz\,dy\,dx & \iiint_V f(x)\,dz\,dy\,dx<br>\end{array}<br>$$<br>此外，在微分前应该使用\,来增加些许空间，否则$\TeX$会将微分紧凑地排列在一起。如下：<br>$$<br>\begin{array}<br>{c |c}<br>\mathrm{Bad} & \mathrm{Better} \<br>\hline \<br>\iiint_V f(x)dz dy dx & \iiint_V f(x)\,dz\,dy\,dx<br>\end{array}<br>$$

#### 连分数
书写连分数表达式时，请使用\cfrac代替\frac或者\over两者效果对比如下：<br>$$<br>x = a_0 + \cfrac{1^2}{a_1 + \cfrac{2^2}{a_2 + \cfrac{3^2}{a_3 + \cfrac{4^4}{a_4 + \cdots}}}} \tag{\cfrac}<br>$$<br>$$<br>x = a_0 + \frac{1^2}{a_1 + \frac{2^2}{a_2 + \frac{3^2}{a_3 + \frac{4^4}{a_4 + \cdots}}}} \tag{\frac}<br>$$

#### 方程组
使用begin{array} ... end{array}与left{...right.配合，表示方程组，如：

$$<br>\left{<br> \begin{array}<br> {c}<br> a_1x+b_1y+c_1z=d_1 \<br> a_2x+b_2y+c_2z=d_2 \<br> a_3x+b_3y+c_3z=d_3<br> \end{array}<br>\right.<br>$$<br>同时，还可以使用begin{cases}...end{cases}表达同样的方程组，如：

$$<br>\begin{cases}<br>a_1x+b_1y+c_1z=d_1 \<br>a_2x+b_2y+c_2z=d_2 \<br>a_3x+b_3y+c_3z=d_3<br>\end{cases}<br>$$<br>对齐方程组中的 = 号，可以使用 being{aligned} .. end{aligned}，如：<br>$$<br>\left{<br> \begin{aligned}<br> a_1x+b_1y+c_1z & = d_1+e_1 \<br> a_2x+b_2y& = d_2 \<br> a_3x+b_3y+c_3z & = d_3<br> \end{aligned}<br>\right.<br>$$<br>如果要对齐 = 号 和项，可以使用being{array}{列样式} .. end{array}，如：<br>$$<br>\left{<br> \begin{array}<br> {l l}<br> a_1x+b_1y+c_1z & = d_1+e_1 \<br> a_2x+b_2y & = d_2 \<br> a_3x+b_3y+c_3z & = d_3<br> \end{array}<br>\right.<br>$$

#### 公式标记与引用
使用tag{yourtag}来标记公式，如果想在之后引用该公式，则还需要加上label{yourlabel}在\tag之后，如：<br>$$<br>a := x^2-y^3 \tag{1000}\label{1000}<br>$$<br>为了引用公式，可以使用eqref{rlabel}，如：<br>$$<br>a+y^3 \stackrel{\eqref{1000}}= x^2<br>$$<br>可以看到，通过超链接可以跳转到被引用公式位置。

#### 使用方法：
1. 在 $ \$...\$ $ 中插入MathJax语法(只能在行内输入，不能换行）：$S = \pi r^2$  
2. 在 $ \$\$...\$\$ $ 中插入MathJax语法（可以换行）：  
3. $$\Gamma(z) =  
4. \int_0^\infty t^{z-1} e^{-t} dt $$

#### 附加内容：
1. 需要注意的是一些MathJax使用的特殊字符，可以使用\ 转义为原来的含义。如 \ $ \$ $ 表示$ \$ $，_ 表示下划线。
2. $\sideset{^1_2}{^3_4}\bigotimes$----12⨂34
- 空间：  

  通常MathJax通过内部策略自己管理公式内部的空间，因此a...b与a.......b（.表示空格）都会显示为$ab$。  

  可以通过在ab间加入\,增加些许间隙，\;增加较宽的间隙，\quad 与 \qquad 会增加更大的间隙，  

  如，$a\ bcd\quad efghij\qquad k$----a bcdefghijk

- 换行：\  

  $$1234\567$$ ----1234567

- 括号自适应大小：  

  $(\frac12)$----(12)  

  $\left(\frac12\right)$----(12)

- 方程组：  

$$  
\left{  
\begin{array} \  
y=2x^2+1; \  
{y=4x;} \  
y-z=x;  
\end{array}  
\right.  
$$

# 字体：

语法        | 字体                | 例子                       | 效果
:-------- | :---------------- | :----------------------- | --------------------------------------------:
`\rm`     | 罗马体               | {`\rm 你好，World，123`}     |     {$\rm 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\mathrm` | 罗马体               | {`\mathrm 你好，World，123`} | {$\mathrm 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\bf`     | 黑体                | {`\bf 你好，World，123`}     |     {$\bf 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\Bbb`    | 黑板粗体字             | {`\Bbb 你好，World，123`}    |    {$\Bbb 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\mit`    | 数学斜体              | {`\mit 你好，World，123`}    |    {$\mit 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\scr`    | 小体大写字母            | {`\scr 你好，World，123`}    |    {$\scr 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\it`     | 意大利体              | {`\it 你好，World，123`}     |     {$\it 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\cal`    | 花体                | {`\cal 你好，World，123`}    |    {$\cal 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\sf`     | 等线体               | {`\sf 你好，World，123`}     |     {$\sf 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\tt`     | 打字机字体             | {`\tt 你好，World，123`}     |     {$\tt 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}
`\frak `  | Fraktur字母（一种德国字体） | {`\frak 你好，World，123`}   |   {$\frak 你好，ABCDEFGHIJKLMNOPQRSTUVWXYZ，123$}

# 颜色：

代码                              | 效果
:------------------------------ | :------------------------------
`\color{black}{Hello World!}`   | $\color{black}{Hello World!}$
`\color{gray}{Hello World!}`    | $\color{gray}{Hello World!}$
`\color{silver}{Hello World!}`  | $\color{silver}{Hello World!}$
`\color{white}{Hello World!}`   | $\color{white}{Hello World!}$
`\color{maroon}{Hello World!}`  | $\color{maroon}{Hello World!}$
`\color{red}{Hello World!}`     | $\color{red}{Hello World!}$
`\color{yellow}{Hello World!}`  | $\color{yellow}{Hello World!}$
`\color{lime}{Hello World!}`    | $\color{lime}{Hello World!}$
`\color{olive}{Hello World!}`   | $\color{olive}{Hello World!}$
`\color{green}{Hello World!}`   | $\color{green}{Hello World!}$
`\color{teal}{Hello World!}`    | $\color{teal}{Hello World!}$
`\color{aqua}{Hello World!}`    | $\color{aqua}{Hello World!}$
`\color{blue}{Hello World!}`    | $\color{blue}{Hello World!}$
`\color{navy}{Hello World!}`    | $\color{navy}{Hello World!}$
`\color{purple}{Hello World!}`  | $\color{purple}{Hello World!}$
`\color{fuchsia}{Hello World!}` | $\color{fuchsia}{Hello World!}$

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [
        ['$', '$'],
        ['\\(', '\\)']
      ]
    },
    TeX: {
      equationNumbers: {
        autoNumber: ["AMS"],
        useLabelIds: true
      }
    },
    "HTML-CSS": {
      linebreaks: {
        automatic: true
      }
    },
    SVG: {
      linebreaks: {
        automatic: true
      }
    }
  });
</script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
