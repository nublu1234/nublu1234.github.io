---
layout: post
title:  "Effect Size"
date:   2019-11-02 00:00:00 +0700
categories: [all, statistics, data_analysis, datascience]
---

# Effect Size  
Effect Size란 비교하려는 집단들 사이의 차이 혹은 관계를 나타내는 '표준화된 지표'를 의미한다.  
가설검정시 이용되는 p값의 경우 표본이 과도하게 큰 경우에, 비교집단과의 차이 또는 연관성이 없는 경우에도 이를 존재한다고 검정하는 경우가 존재한다.  
이를 보완하기 위해 많은 이들이 신뢰구간, 효과크기를 게재하여 p값의 단점을 보완하곤 한다.  

---

#### Cohen's d
- 두 집단 간 평균의 차이를 검정할 시에 이용하는 Effect Size 지표  

$$\text{Cohen's d} = \frac{M_2 - M_1}{SD_{pooled}}$$  

$$95\% \text{ CI for Cohen’s d} = [d − 1.96 \times \sigma(d), d + 1.96  \times \sigma(d)]$$  

$\sigma(d)=\sqrt{\frac{n_1 + n_2}{ n_1 \times n_2} + \frac{d^2}{2(n_1 + n_2 )} }$  
$SD_{pooled}=\sqrt{ \frac{(n_1 -1) s_{1}^2 + (n_2 -1) s_{2}^2}{ n_1 + n_2 - 2 } }$  

Cohen's d를 시각화한 사이트 [link](https://rpsychologist.com/d3/cohend/)

---

#### phi, Cramer's V
- 두 범주형 자료간의 관련성을 검정할 시에 이용하는 Effect Size 지표  

$\phi = \sqrt{ \frac{\chi^{2}}{n} }$  
- 2 x 2 table  

$V = \sqrt{ \frac{\phi^{2}}{min(row − 1, col − 1)} }$  
- 2 x 2 table이 아닌 경우  

---

#### α, β, Statistical Power

![Effect_Size_img1](https://raw.githubusercontent.com/nublu1234/nublu1234.github.io/master/static/img/_posts/Effect_Size/Effect_Size_img1.png)  
![Effect_Size_img2](https://raw.githubusercontent.com/nublu1234/nublu1234.github.io/master/static/img/_posts/Effect_Size/Effect_Size_img2.png)  

![Effect_Size_img3](https://raw.githubusercontent.com/nublu1234/nublu1234.github.io/master/static/img/_posts/Effect_Size/Effect_Size_img3.png)  
 

