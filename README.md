# KTU-Scraper
A webscraping API for KTU website built on Node.js

This has 3 functions

1. Notification check-
This API endpoint performs the webscraping of KTU website and returns the Notifications in the website highlighting the important ones.
  <br> [Notifications check](https://ktualert.now.sh/)


2. Emergency check-
This API endpoint is specifically for emergency situations where the exams might be postponed.The KTU website is checked continously and gives an alert if exams are postponed or rescheduled.
  <br> [Emergency check](https://ktualert.now.sh/emergency)

3. Daily email alerts-
This function performs a daily check on KTU website and sends an email alert to a specified recipient if there are any important notifications like timetable, registration, etc.
