---
layout: post
title:  "Effect Size"
date:   2019-11-02 00:00:00 +0700
categories: [all, statistics, data_analysis, datascience]
---

# Effect Size  
Effect Size: 비교하려는 집단 사이에 얼마나 차이가 있는지를 나타내 주는 지표

### Cohen's d
Cohen's d: 두 집단 간 평균의 차이를 검정할 시에 이용하는 Effect Size 지표  

$$\text{Cohen's d} = \frac{M_2 - M_1}{SD_{pooled}}$$  

$$SD_{pooled}=\sqrt{ \frac{(n_1 -1) s_{1}^2 + (n_2 -1) s_{2}^2}{ n_1 + n_2 - 2 } }$$  

$$95\% \text{ CI for Cohen’s d} = [d − 1.96 \times \sigma(d), d + 1.96  \times \sigma(d)]$$  

$$\sigma(d)=\sqrt{\frac{n_1 + n_2}{ n_1 \times n_2} + \frac{d^2}{2(n_1 + n_2 )} }$$  

Cohen's d = 0.5 -> 0.5 표준편차 만큼의 차이가 난다는 의미  

Cohen's d를 시각화한 사이트 [link](https://rpsychologist.com/d3/cohend/)

### α, β, Statistical Power

![Effect_Size_img1](https://raw.githubusercontent.com/nublu1234/nublu1234.github.io/master/static/img/_posts/Effect_Size/Effect_Size_img1.png)  
![Effect_Size_img2](https://raw.githubusercontent.com/nublu1234/nublu1234.github.io/master/static/img/_posts/Effect_Size/Effect_Size_img2.png)  


$\alpha$: $H_0$가 옳지만 기각할 확률(1종 오류)  
$\beta$: $H_1$에 가깝지만 $H_0$를 채택할 확률(2종 오류) 

<!--
$\alpha = P[H_0: \text{Reject} \, | \, H_0: \text{True}]$: $H_0$에 가깝지만 기각할 확률  
$\beta = P[H_0: \text{accept} \, | \, H_0: \text{Reject}]$: $H_1$에 가깝지만 $H_0$를 채택할 확률  
-->

![Effect_Size_img3](https://raw.githubusercontent.com/nublu1234/nublu1234.github.io/master/static/img/_posts/Effect_Size/Effect_Size_img3.png)  

$\text{Statistical Power} = 1 - \beta$: $H_1$에 가깝지만 $H_0$를 채택할 확률  

