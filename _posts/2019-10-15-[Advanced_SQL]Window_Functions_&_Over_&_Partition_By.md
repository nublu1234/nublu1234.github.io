---
layout: post
title:  "[Advanced SQL] Window Functions & Over & Partition By"
date:   2019-10-15 00:00:00 +0700
categories: [all, sql, mysql, data_analysis]
---


## [Advanced SQL] Window Functions & Over & Partition By  

### Default Range  
```sql
SELECT
  o.OrderNumber, o.CustomerID, o.OrderTotal,
  SUM(o.OrderTotal) OVER (
    PARTITION BY o.CustomerID
    ORDER BY o.OrderNumber, o.CustomerID
    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS TotalByCustomer,
  SUM(o.OrderTotal) OVER (
    PARTITION BY o.CustomerID
    /* RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING */
    ) AS TotalOverall,
  SUM(o.OrderTotal) OVER (
    PARTITION BY o.CustomerID
    RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS TotalOverall2
FROM Orders o
ORDER BY o.CustomerID, o.OrderNumber
LIMIT 10
```  

| OrderNumber | CustomerID | OrderTotal | TotalByCustomer | TotalOverall | TotalOverall2 | 
| ---: | ---: | ---: | ---: | ---: | ---: | 
| 2 | 1001 | 816.00 | 816.00 | 34807.96 | 34807.96 | 
| 7 | 1001 | 467.85 | 1283.85 | 34807.96 | 34807.96 | 
| 16 | 1001 | 2007.54 | 3291.39 | 34807.96 | 34807.96 | 
| 52 | 1001 | 261.90 | 3553.29 | 34807.96 | 34807.96 | 
| 55 | 1001 | 36.00 | 3589.29 | 34807.96 | 34807.96 | 
| 107 | 1001 | 1240.40 | 4829.69 | 34807.96 | 34807.96 | 
| 137 | 1001 | 1235.65 | 6065.34 | 34807.96 | 34807.96 | 
| 138 | 1001 | 1122.70 | 7188.04 | 34807.96 | 34807.96 | 
| 151 | 1001 | 276.00 | 7464.04 | 34807.96 | 34807.96 | 
| 154 | 1001 | 1360.05 | 8824.09 | 34807.96 | 34807.96 |   

> BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW: [Start : Now]  
> BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING: [Now : End]  
> BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING: [Start : Now]  
> UNBOUNDED PRECEDING: [Start : Now]  
> UNBOUNDED FOLLOWING: [Now : End]  
> Default: BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING

---  

### RANGE *vs* ROWS  
```sql
WITH PurchaseStatistics AS (
	SELECT 
		p.CustomerID,
		EXTRACT(YEAR FROM p.PurchaseDate) AS PurchaseYear,
		EXTRACT(MONTH FROM p.PurchaseDate) AS PurchaseMonth,
		SUM(p.PurchaseAmount) AS PurchaseTotal,
		COUNT(p.PurchaseID) AS PurchaseCount
	FROM Purchases p
	GROUP BY 
		p.CustomerID, 
		EXTRACT(YEAR FROM p.PurchaseDate),
		EXTRACT(MONTH FROM p.PurchaseDate)
ORDER BY p.CustomerID, PurchaseYear, PurchaseMonth
)
-- SELECT * FROM PurchaseStatistics;

SELECT
  s.CustomerID, s.PurchaseYear, s.PurchaseMonth, s.PurchaseTotal, s.PurchaseCount,
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID
    ) AS CountByRange1,
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID 
    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS CountByRange2,
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID
    RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING 
    ) AS CountByRange3,
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID
    RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING 
    ) AS CountByRange4,
    
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID
    ) AS CountByRows1,
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS CountByRows2,
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID
    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
    ) AS CountByRows3,
  SUM(s.PurchaseCount) OVER (
    PARTITION BY s.PurchaseYear
    ORDER BY s.CustomerID
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS CountByRows4
FROM PurchaseStatistics s
ORDER BY s.CustomerID, s.PurchaseYear, s.PurchaseMonth
LIMIT 20
```  

| CustomerID | PurchaseYear | PurchaseMonth | PurchaseTotal | PurchaseCount | CountByRange1 | CountByRange2 | CountByRange3 | CountByRange4 | CountByRows1 | CountByRows2 | CountByRows3 | CountByRows4 | 
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | 
| 1 | 2011 | 1 | 9660.8633 | 12 | 181 | 181 | 1991 | 1991 | 181 | 12 | 1991 | 1991 | 
| 1 | 2011 | 2 | 5056.6903 | 12 | 181 | 181 | 1991 | 1991 | 181 | 24 | 1979 | 1991 | 
| 1 | 2011 | 3 | 3191.9213 | 10 | 181 | 181 | 1991 | 1991 | 181 | 34 | 1967 | 1991 | 
| 1 | 2011 | 4 | 1830.6725 | 28 | 181 | 181 | 1991 | 1991 | 181 | 62 | 1957 | 1991 | 
| 1 | 2011 | 5 | 1641.1647 | 19 | 181 | 181 | 1991 | 1991 | 181 | 81 | 1929 | 1991 | 
| 1 | 2011 | 6 | 1402.5289 | 11 | 181 | 181 | 1991 | 1991 | 181 | 92 | 1910 | 1991 | 
| 1 | 2011 | 7 | 2517.8133 | 15 | 181 | 181 | 1991 | 1991 | 181 | 107 | 1899 | 1991 | 
| 1 | 2011 | 8 | 2086.0633 | 10 | 181 | 181 | 1991 | 1991 | 181 | 117 | 1884 | 1991 | 
| 1 | 2011 | 9 | 4235.6822 | 18 | 181 | 181 | 1991 | 1991 | 181 | 135 | 1874 | 1991 | 
| 1 | 2011 | 10 | 2944.6052 | 11 | 181 | 181 | 1991 | 1991 | 181 | 146 | 1856 | 1991 | 
| 1 | 2011 | 11 | 6494.7465 | 21 | 181 | 181 | 1991 | 1991 | 181 | 167 | 1845 | 1991 | 
| 1 | 2011 | 12 | 4669.6470 | 14 | 181 | 181 | 1991 | 1991 | 181 | 181 | 1824 | 1991 | 
| 1 | 2012 | 1 | 5899.8256 | 16 | 190 | 190 | 2031 | 2031 | 190 | 16 | 2031 | 2031 | 
| 1 | 2012 | 2 | 6067.5733 | 15 | 190 | 190 | 2031 | 2031 | 190 | 31 | 2015 | 2031 | 
| 1 | 2012 | 3 | 5574.9718 | 13 | 190 | 190 | 2031 | 2031 | 190 | 44 | 2000 | 2031 | 
| 1 | 2012 | 4 | 7749.3873 | 17 | 190 | 190 | 2031 | 2031 | 190 | 61 | 1987 | 2031 | 
| 1 | 2012 | 5 | 9631.9369 | 19 | 190 | 190 | 2031 | 2031 | 190 | 80 | 1970 | 2031 | 
| 1 | 2012 | 6 | 6254.6390 | 12 | 190 | 190 | 2031 | 2031 | 190 | 92 | 1951 | 2031 | 
| 1 | 2012 | 7 | 10202.2599 | 18 | 190 | 190 | 2031 | 2031 | 190 | 110 | 1939 | 2031 | 
| 1 | 2012 | 8 | 7106.4336 | 12 | 190 | 190 | 2031 | 2031 | 190 | 122 | 1921 | 2031 |   
 

---  

### ROW_NUMBER, RANK, DENSE_RANK  
```sql
SELECT JOB, ENAME, MGR, HIREDATE, SAL
      ,ROW_NUMBER() OVER (ORDER BY SAL DESC) AS RN_
      ,RANK( ) OVER (ORDER BY SAL DESC) AS RANK_
      ,DENSE_RANK( ) OVER (ORDER BY SAL DESC) AS DENSE_RANK_
FROM EMP
```  

| JOB | ENAME | MGR | HIREDATE | SAL | RN_ | RANK_ | DENSE_RANK_ | 
| --- | --- | ---: | --- | ---: | ---: | ---: | ---: | 
| PRESIDENT | KING | \N | 1981-11-17 | 5000 | 1 | 1 | 1 | 
| ANALYST | SCOTT | 7566 | 1982-12-09 | 3000 | 2 | 2 | 2 | 
| ANALYST | FORD | 7566 | 1981-12-03 | 3000 | 3 | 2 | 2 | 
| MANAGER | JONES | 7839 | 1981-04-02 | 2975 | 4 | 4 | 3 | 
| MANAGER | BLAKE | 7839 | 1981-05-01 | 2850 | 5 | 5 | 4 | 
| MANAGER | CLARK | 7839 | 1981-06-09 | 2450 | 6 | 6 | 5 | 
| SALESMAN | ALLEN | 7698 | 1981-02-20 | 1600 | 7 | 7 | 6 | 
| SALESMAN | TURNER | 7698 | 1981-09-08 | 1500 | 8 | 8 | 7 | 
| CLERK | MILLER | 7782 | 1982-01-23 | 1300 | 9 | 9 | 8 | 
| SALESMAN | WARD | 7698 | 1981-02-22 | 1250 | 10 | 10 | 9 | 
| SALESMAN | MARTIN | 7698 | 1981-09-28 | 1250 | 11 | 10 | 9 | 
| CLERK | ADAMS | 7788 | 1983-01-12 | 1100 | 12 | 12 | 10 | 
| CLERK | JAMES | 7698 | 1981-12-03 | 950 | 13 | 13 | 11 | 
| CLERK | SMITH | 7902 | 1980-12-17 | 800 | 14 | 14 | 12 |   

> ROW_NUMBER: Sequential Row Number  
> RANK, DENSE_RANK: Joint Ranking  

---

### SUM, MAX, MIN with Partition  
```sql
SELECT JOB, ENAME, MGR, HIREDATE, SAL
      ,SUM(SAL) OVER (PARTITION BY MGR) AS MGR_SUM
      ,SUM(SAL) OVER (PARTITION BY MGR ORDER BY SAL RANGE UNBOUNDED PRECEDING) AS MGR_SUM2 
      ,SUM(SAL) OVER (PARTITION BY MGR ORDER BY HIREDATE ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS MGR_SUM3
      ,MAX(SAL) OVER (PARTITION BY MGR) AS MGR_MAX 
      ,MIN(SAL) OVER(PARTITION BY MGR) as MGR_MIN
      ,MIN(SAL) OVER(PARTITION BY MGR ORDER BY HIREDATE) as MGR_MIN2
FROM EMP
```  

| JOB | ENAME | MGR | HIREDATE | SAL | MGR_SUM | MGR_SUM2 | MGR_SUM3 | MGR_MAX | MGR_MIN | MGR_MIN2 | 
| --- | --- | ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | 
| PRESIDENT | KING | \N | 1981-11-17 | 5000 | 5000 | 5000 | 5000 | 5000 | 5000 | 5000 | 
| ANALYST | FORD | 7566 | 1981-12-03 | 3000 | 6000 | 6000 | 6000 | 3000 | 3000 | 3000 | 
| ANALYST | SCOTT | 7566 | 1982-12-09 | 3000 | 6000 | 6000 | 6000 | 3000 | 3000 | 3000 | 
| SALESMAN | ALLEN | 7698 | 1981-02-20 | 1600 | 6550 | 6550 | 2850 | 1600 | 950 | 1600 | 
| SALESMAN | WARD | 7698 | 1981-02-22 | 1250 | 6550 | 3450 | 4350 | 1600 | 950 | 1250 | 
| SALESMAN | TURNER | 7698 | 1981-09-08 | 1500 | 6550 | 4950 | 4000 | 1600 | 950 | 1250 | 
| SALESMAN | MARTIN | 7698 | 1981-09-28 | 1250 | 6550 | 3450 | 3700 | 1600 | 950 | 1250 | 
| CLERK | JAMES | 7698 | 1981-12-03 | 950 | 6550 | 950 | 2200 | 1600 | 950 | 950 | 
| CLERK | MILLER | 7782 | 1982-01-23 | 1300 | 1300 | 1300 | 1300 | 1300 | 1300 | 1300 | 
| CLERK | ADAMS | 7788 | 1983-01-12 | 1100 | 1100 | 1100 | 1100 | 1100 | 1100 | 1100 | 
| MANAGER | JONES | 7839 | 1981-04-02 | 2975 | 8275 | 8275 | 5825 | 2975 | 2450 | 2975 | 
| MANAGER | BLAKE | 7839 | 1981-05-01 | 2850 | 8275 | 5300 | 8275 | 2975 | 2450 | 2850 | 
| MANAGER | CLARK | 7839 | 1981-06-09 | 2450 | 8275 | 2450 | 5300 | 2975 | 2450 | 2450 | 
| CLERK | SMITH | 7902 | 1980-12-17 | 800 | 800 | 800 | 800 | 800 | 800 | 800 |   

> MGR_SUM: Implement 'GROUP BY & SUM' without using 'GROUP BY'  
> MGR_SUM2: Sequential Partition [Now : End]  
> MGR_SUM3: Sequential Partition [Now - 1  : Now + 1]  
> MGR_MAX: Implement 'GROUP BY & MAX' without using 'GROUP BY'  
> MGR_MIN: Implement 'GROUP BY & MIN' without using 'GROUP BY'  
> MGR_MIN2: Sequential Partition [Start : Now] Using 'PARTITION BY & ORDER BY'  

---

### COUNT with OVER  
```sql
SELECT JOB, ENAME, MGR, HIREDATE, SAL
      ,COUNT(*) OVER (ORDER BY SAL) AS SIM_CNT0
		,COUNT(*) OVER (ORDER BY SAL RANGE BETWEEN 50 PRECEDING AND 150 FOLLOWING) AS SIM_CNT 
FROM EMP
ORDER BY SAL;
```  

| JOB | ENAME | MGR | HIREDATE | SAL | SIM_CNT0 | SIM_CNT | 
| --- | --- | ---: | --- | ---: | ---: | ---: | 
| CLERK | SMITH | 7902 | 1980-12-17 | 800 | 1 | 2 | 
| CLERK | JAMES | 7698 | 1981-12-03 | 950 | 2 | 2 | 
| CLERK | ADAMS | 7788 | 1983-01-12 | 1100 | 3 | 3 | 
| SALESMAN | WARD | 7698 | 1981-02-22 | 1250 | 5 | 3 | 
| SALESMAN | MARTIN | 7698 | 1981-09-28 | 1250 | 5 | 3 | 
| CLERK | MILLER | 7782 | 1982-01-23 | 1300 | 6 | 3 | 
| SALESMAN | TURNER | 7698 | 1981-09-08 | 1500 | 7 | 2 | 
| SALESMAN | ALLEN | 7698 | 1981-02-20 | 1600 | 8 | 1 | 
| MANAGER | CLARK | 7839 | 1981-06-09 | 2450 | 9 | 1 | 
| MANAGER | BLAKE | 7839 | 1981-05-01 | 2850 | 10 | 4 | 
| MANAGER | JONES | 7839 | 1981-04-02 | 2975 | 11 | 3 | 
| ANALYST | SCOTT | 7566 | 1982-12-09 | 3000 | 13 | 3 | 
| ANALYST | FORD | 7566 | 1981-12-03 | 3000 | 13 | 3 | 
| PRESIDENT | KING | \N | 1981-11-17 | 5000 | 14 | 1 |   

> SIM_CNT0: Sequential Counting  
> SIM_CNT: Sequential Counting & Range (lower 50, upper 150)  

---

### FIRST_VALUE, LAST_VALUE  
```sql
SELECT JOB, ENAME, MGR, HIREDATE, DEPTNO, SAL
      ,FIRST_VALUE(ENAME) OVER (PARTITION BY DEPTNO ORDER BY SAL DESC ROWS UNBOUNDED PRECEDING) AS DEPT_RICH 
		,FIRST_VALUE(ENAME) OVER (PARTITION BY DEPTNO ORDER BY SAL DESC, ENAME ASC ROWS UNBOUNDED PRECEDING) AS RICH_EMP
		,LAST_VALUE(ENAME) OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) AS DEPT_POOR
		,LAST_VALUE(ENAME) OVER (PARTITION BY DEPTNO ORDER BY SAL DESC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS DEPT_POOR2
FROM EMP
ORDER BY DEPTNO, SAL DESC
```  

| JOB | ENAME | MGR | HIREDATE | DEPTNO | SAL | DEPT_RICH | RICH_EMP | DEPT_POOR | DEPT_POOR2 | 
| --- | --- | ---: | --- | ---: | ---: | --- | --- | --- | --- | 
| PRESIDENT | KING | \N | 1981-11-17 | 10 | 5000 | KING | KING | KING | MILLER | 
| MANAGER | CLARK | 7839 | 1981-06-09 | 10 | 2450 | KING | KING | CLARK | MILLER | 
| CLERK | MILLER | 7782 | 1982-01-23 | 10 | 1300 | KING | KING | MILLER | MILLER | 
| ANALYST | FORD | 7566 | 1981-12-03 | 20 | 3000 | SCOTT | FORD | FORD | SMITH | 
| ANALYST | SCOTT | 7566 | 1982-12-09 | 20 | 3000 | SCOTT | FORD | FORD | SMITH | 
| MANAGER | JONES | 7839 | 1981-04-02 | 20 | 2975 | SCOTT | FORD | JONES | SMITH | 
| CLERK | ADAMS | 7788 | 1983-01-12 | 20 | 1100 | SCOTT | FORD | ADAMS | SMITH | 
| CLERK | SMITH | 7902 | 1980-12-17 | 20 | 800 | SCOTT | FORD | SMITH | SMITH | 
| MANAGER | BLAKE | 7839 | 1981-05-01 | 30 | 2850 | BLAKE | BLAKE | BLAKE | JAMES | 
| SALESMAN | ALLEN | 7698 | 1981-02-20 | 30 | 1600 | BLAKE | BLAKE | ALLEN | JAMES | 
| SALESMAN | TURNER | 7698 | 1981-09-08 | 30 | 1500 | BLAKE | BLAKE | TURNER | JAMES | 
| SALESMAN | MARTIN | 7698 | 1981-09-28 | 30 | 1250 | BLAKE | BLAKE | MARTIN | JAMES | 
| SALESMAN | WARD | 7698 | 1981-02-22 | 30 | 1250 | BLAKE | BLAKE | MARTIN | JAMES | 
| CLERK | JAMES | 7698 | 1981-12-03 | 30 | 950 | BLAKE | BLAKE | JAMES | JAMES |  

---

### LAG, LEAD  
```sql
SELECT JOB, ENAME, MGR, HIREDATE, DEPTNO, SAL
      ,LAG(SAL) OVER (ORDER BY HIREDATE) AS PREV_SAL 
      ,LAG(SAL, 2) OVER (ORDER BY HIREDATE) AS PREV_SAL2
      ,LAG(SAL, 2, 0) OVER (ORDER BY HIREDATE) AS PREV_SAL3
      ,LEAD(HIREDATE, 1) OVER (ORDER BY HIREDATE) AS "NEXTHIRED"
FROM EMP
ORDER BY HIREDATE;
```

| JOB | ENAME | MGR | HIREDATE | DEPTNO | SAL | PREV_SAL | PREV_SAL2 | PREV_SAL3 | NEXTHIRED | 
| --- | --- | ---: | --- | ---: | ---: | ---: | ---: | ---: | --- | 
| CLERK | SMITH | 7902 | 1980-12-17 | 20 | 800 | \N | \N | 0 | 1981-02-20 | 
| SALESMAN | ALLEN | 7698 | 1981-02-20 | 30 | 1600 | 800 | \N | 0 | 1981-02-22 | 
| SALESMAN | WARD | 7698 | 1981-02-22 | 30 | 1250 | 1600 | 800 | 800 | 1981-04-02 | 
| MANAGER | JONES | 7839 | 1981-04-02 | 20 | 2975 | 1250 | 1600 | 1600 | 1981-05-01 | 
| MANAGER | BLAKE | 7839 | 1981-05-01 | 30 | 2850 | 2975 | 1250 | 1250 | 1981-06-09 | 
| MANAGER | CLARK | 7839 | 1981-06-09 | 10 | 2450 | 2850 | 2975 | 2975 | 1981-09-08 | 
| SALESMAN | TURNER | 7698 | 1981-09-08 | 30 | 1500 | 2450 | 2850 | 2850 | 1981-09-28 | 
| SALESMAN | MARTIN | 7698 | 1981-09-28 | 30 | 1250 | 1500 | 2450 | 2450 | 1981-11-17 | 
| PRESIDENT | KING | \N | 1981-11-17 | 10 | 5000 | 1250 | 1500 | 1500 | 1981-12-03 | 
| CLERK | JAMES | 7698 | 1981-12-03 | 30 | 950 | 5000 | 1250 | 1250 | 1981-12-03 | 
| ANALYST | FORD | 7566 | 1981-12-03 | 20 | 3000 | 950 | 5000 | 5000 | 1982-01-23 | 
| CLERK | MILLER | 7782 | 1982-01-23 | 10 | 1300 | 3000 | 950 | 950 | 1982-12-09 | 
| ANALYST | SCOTT | 7566 | 1982-12-09 | 20 | 3000 | 1300 | 3000 | 3000 | 1983-01-12 | 
| CLERK | ADAMS | 7788 | 1983-01-12 | 20 | 1100 | 3000 | 1300 | 1300 | \N | 

---

### PERCENT_RANK, NTILE  
```sql
SELECT JOB, ENAME, MGR, HIREDATE, DEPTNO, SAL
      ,PERCENT_RANK() OVER (ORDER BY SAL DESC) as PER_RANK
      ,NTILE(4) OVER (ORDER BY SAL DESC) as QUAR_TILE 
FROM EMP
ORDER BY SAL DESC
```  

| JOB | ENAME | MGR | HIREDATE | DEPTNO | SAL | PER_RANK | QUAR_TILE | 
| --- | --- | ---: | --- | ---: | ---: | ---: | ---: | 
| PRESIDENT | KING | \N | 1981-11-17 | 10 | 5000 | 0 | 1 | 
| ANALYST | SCOTT | 7566 | 1982-12-09 | 20 | 3000 | 0.07692307692307693 | 1 | 
| ANALYST | FORD | 7566 | 1981-12-03 | 20 | 3000 | 0.07692307692307693 | 1 | 
| MANAGER | JONES | 7839 | 1981-04-02 | 20 | 2975 | 0.23076923076923078 | 1 | 
| MANAGER | BLAKE | 7839 | 1981-05-01 | 30 | 2850 | 0.3076923076923077 | 2 | 
| MANAGER | CLARK | 7839 | 1981-06-09 | 10 | 2450 | 0.38461538461538464 | 2 | 
| SALESMAN | ALLEN | 7698 | 1981-02-20 | 30 | 1600 | 0.46153846153846156 | 2 | 
| SALESMAN | TURNER | 7698 | 1981-09-08 | 30 | 1500 | 0.5384615384615384 | 2 | 
| CLERK | MILLER | 7782 | 1982-01-23 | 10 | 1300 | 0.6153846153846154 | 3 | 
| SALESMAN | WARD | 7698 | 1981-02-22 | 30 | 1250 | 0.6923076923076923 | 3 | 
| SALESMAN | MARTIN | 7698 | 1981-09-28 | 30 | 1250 | 0.6923076923076923 | 3 | 
| CLERK | ADAMS | 7788 | 1983-01-12 | 20 | 1100 | 0.8461538461538461 | 4 | 
| CLERK | JAMES | 7698 | 1981-12-03 | 30 | 950 | 0.9230769230769231 | 4 | 
| CLERK | SMITH | 7902 | 1980-12-17 | 20 | 800 | 1 | 4 |   

> PERCENT_RANK: Percentile  
> NTILE: N-tile  