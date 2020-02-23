---
layout: post
title:  "SQL에서의 RANGE와 ROWS의 차이"
date:   2020-02-23 00:00:00 +0700
categories: [all, sql, data_analysis]
---

SQL에서 분석함수를 익히게 될 때 RANGE와 ROWS에 차이에 대해 어려움을 느끼게 됩니다.  
간단한 SQL 예시를 통해 이를 설명하고자 합니다.  

```sql
WITH TEST AS (
    SELECT 200801 YYYYMM, 100 AMT FROM DUAL
    UNION ALL 
	 SELECT 200802, 200 FROM DUAL
    UNION ALL 
	 SELECT 200803, 300 FROM DUAL
    UNION ALL 
	 SELECT 200804, 400 FROM DUAL
    UNION ALL 
	 SELECT 200805, 500 FROM DUAL
    UNION ALL 
	 SELECT 200806, 600 FROM DUAL
    UNION ALL 
	 SELECT 200808, 800 FROM DUAL
    UNION ALL 
	 SELECT 200809, 900 FROM DUAL
    UNION ALL 
	 SELECT 200810, 100 FROM DUAL
    UNION ALL 
	 SELECT 200811, 200 FROM DUAL
    UNION ALL 
	 SELECT 200812, 300 FROM DUAL
)
SELECT YYYYMM
      ,AMT
      ,SUM(AMT) OVER(ORDER BY YYYYMM
                RANGE BETWEEN 3 PRECEDING
                          AND 1 PRECEDING) RNG_PRE3
      ,SUM(AMT) OVER(ORDER BY YYYYMM
                RANGE BETWEEN 1 FOLLOWING
                          AND 3 FOLLOWING) RNG_FOL3
      ,SUM(AMT) OVER(ORDER BY YYYYMM
                ROWS BETWEEN 3 PRECEDING
                         AND 1 PRECEDING) ROW_PRE3
      ,SUM(AMT) OVER(ORDER BY YYYYMM
                ROWS BETWEEN 1 FOLLOWING
                         AND 3 FOLLOWING) ROW_FOL3
FROM TEST
```  

| YYYYMM | AMT | RNG_PRE3 | RNG_FOL3 | ROW_PRE3 | ROW_FOL3 | 
| ---: | ---: | ---: | ---: | ---: | ---: | 
| 200801 | 100 | \N | 900 | \N | 900 | 
| 200802 | 200 | 100 | 1200 | 100 | 1200 | 
| 200803 | 300 | 300 | 1500 | 300 | 1500 | 
| 200804 | 400 | 600 | 1100 | 600 | 1900 | 
| 200805 | 500 | 900 | 1400 | 900 | 2300 | 
| 200806 | 600 | 1200 | 1700 | 1200 | 1800 | 
| 200808 | 800 | 1100 | 1200 | 1500 | 1200 | 
| 200809 | 900 | 1400 | 600 | 1900 | 600 | 
| 200810 | 100 | 1700 | 500 | 2300 | 500 | 
| 200811 | 200 | 1800 | 300 | 1800 | 300 | 
| 200812 | 300 | 1200 | \N | 1200 | \N | 

위 테이블의 YYYYMM 컬럼을 봐주시기 바랍니다.  
RANGE와 ROWS에 차이를 보기좋게 설명하기 위해 200807행을 제외하였습니다.  
RANGE와 ROWS를 통해 해당년월의 이전 3개월동안의 AMT 총합(RNG_PRE3, ROW_PRE3), 이후 3개월동안의 AMT 총합(RNG_FOL3, ROW_FOL3)을 계산하였습니다.  
다른 부분이 확인이 되시나요?  

200804 ~ 200806 구간에서 RNG_FOL3, ROW_FOL3 값 간에 차이가 존재하며  
200808 ~ 200810 구간에서 RNG_PRE3, ROW_PRE3 값 간에 차이가 존재합니다.  
왜 이러한 차이가 날까요?  

ROWS는 물리적, RANGE는 논리적으로 데이터를 계산한다는 점에서 두 명령어 간에 차이가 있습니다.  
200808에서의 RNG_PRE3, ROW_PRE3는 400이라는 값만큼 차이가 납니다.  
RANGE는 이전 3개월의 합을 '논리적으로' 계산하므로 현재 데이터에서 누락되어 있는 200807까지 카운트합니다.  
반면 ROWS는 이전 3개월의 합을 '물리적으로' 계산하기 때문에 200804 ~ 200806의 데이터를 합산하여 값을 출력합니다.  

