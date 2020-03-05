---
layout: post
title:  "DBeaver에서 BigQuery 이용하기"
date:   2020-03-05 00:00:00 +0700
categories: [all, sql, bigquery]
---

# Connecting to Google BigQuery with DBeaver with JDBC Drivers

## 1. jdbc 드라이버 설치
https://cloud.google.com/bigquery/providers/simba-drivers

## 2. DBeaver 내의 '드라이버 관리자' 설정
- Driver Name = BigQuery
- Class Name = com.simba.googlebigquery.jdbc42.Driver
- URL Template = jdbc:bigquery://https://www.googleapis.com/bigquery/v2:443;ProjectId={server};OAuthType=0;OAuthServiceAcctEmail={user};OAuthPvtKeyPath={host};
- Default Port = 443

## 3. DBeaver 내의 '새 데이터베이스 연결' 설정
- Host = D:\google_bigquery_key_directory\your_service_account_key.json
- Server = your-projectID
- User name = bqtest1@your-projectID.iam.gserviceaccount.com

## Environment
- Window10
- DBeaver 7.0.0

## Reference
https://justnumbersandthings.com/post/2018-09-22-dbeaver-bigquery/
https://www.simba.com/products/BigQuery/doc/JDBC_InstallGuide/content/jdbc/bq/authenticating/serviceaccount.htm