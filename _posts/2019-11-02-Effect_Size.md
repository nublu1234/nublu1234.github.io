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

![Effect_Size_img1](https://images.squarespace-cdn.com/content/591e58f72994cab66b93f891/1495241679756-N45YXM495Q81FFSSE55I/Essoe-PowerAlpha9.png?content-type=image%2Fpng)  
![Effect_Size_img2](https://images.squarespace-cdn.com/content/v1/591e58f72994cab66b93f891/1495241678055-YP4TSRS2WVVN374UDK21/ke17ZwdGBToddI8pDm48kLq6S97H2J2IulzdbnSFZyxZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxnBCR0i8XdYBl1mkHhd-RuP-r6LIw7LO947GnRHFuvbAc3goqYrdAlDAWlimUB9hc/Essoe-PowerAlpha10.png?format=750w)  


$\alpha$: $H_0$가 옳지만 기각할 확률(1종 오류)  
$\beta$: $H_1$에 가깝지만 $H_0$를 채택할 확률(2종 오류) 

<!--
$\alpha = P[H_0: \text{Reject} \, | \, H_0: \text{True}]$: $H_0$에 가깝지만 기각할 확률  
$\beta = P[H_0: \text{accept} \, | \, H_0: \text{Reject}]$: $H_1$에 가깝지만 $H_0$를 채택할 확률  
-->

![Effect_Size_img3](https://rpsychologist.com/img/stat_power_base.png)  

$\text{Statistical Power} = 1 - \beta$: $H_1$에 가깝지만 $H_0$를 채택할 확률  

