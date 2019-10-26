---
layout: post
title:  "Recursive CTE in SQL"
date:   2019-10-26 00:00:00 +0700
categories: [all, data_analysis, mysql, sql]
---

#### RECURSIVE CTE  
```sql
WITH RECURSIVE SeqNumTbl(SeqNum) AS 
  (SELECT 1
   UNION ALL
   SELECT SeqNum + 1 AS SeqNum
   FROM SeqNumTbl
   WHERE SeqNum < 10)
SELECT SeqNum 
FROM SeqNumTbl
```  
| SeqNum | 
| ---: | 
| 1 | 
| 2 | 
| 3 | 
| 4 | 
| 5 | 
| 6 | 
| 7 | 
| 8 | 
| 9 | 
| 10 | 