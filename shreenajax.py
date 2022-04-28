import datetime
import cgi
print("Content-type: text/html\n")
 print "Content-Location: mydata.ttl"
 print "Access-Control-Allow-Origin: *"
form = cgi.FieldStorage()
# if form:
# month = form.getvalue("month")
# day = form.getvalue("day")
# year = form.getvalue("year")
# if month and day and year:
# print(datetime.date(int(year), int(month), int(day)).strftime('%A'))
# print("I m python")
return ("I m python")
