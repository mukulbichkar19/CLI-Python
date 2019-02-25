from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb://127.0.0.1:27017")
import config
#requests
import requests
from datetime import datetime, timedelta
import simplejson as json
from bson.objectid import ObjectId
import smtplib, ssl
import os
import sendgrid
from sendgrid.helpers.mail import *

oldDays = 730

cityTempDiffs = {}

sg = sendgrid.SendGridAPIClient(apikey=config.sendgrid_api)
from_email = Email("mukulbichkar19@gmail.com")
content = Content("text/plain", "Here's a test email sent from Python.")


def connectToMongo():
    print('Inside connectToMongo')
    db=client.EmailApp
    # Issue the serverStatus command and print the results
    serverStatusResult=db.command("serverStatus")



def fetchCitiesFromDB():
	db = client.EmailApp
	cities_collection = db.cities
	allCities =cities_collection.find()
	cities = []
	for city in allCities:
		cities.append(city['City'])
	client.close()

	return cities



def fetchTempDiff(cities):
	baseUrl = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=0ecd317431964b70a9c184410192302&'
	formatJ = '&format=json'
	date = '&date='
	oldDate = getOldDate()
	newDate = getCurrentDate()
	for city in cities:
		oldDataUrl = baseUrl + '&q=' + city + formatJ + date + str(oldDate)
		oldData = requests.get(oldDataUrl)
		jsonObj = json.loads(oldData.content)
		for v in jsonObj.values():
			minTemp = v['weather'][0]['mintempF']
			maxTemp = v['weather'][0]['maxtempF']
			averageTemp = getAverage(minTemp, maxTemp)
			cityTempDiffs[city] = ["historicalAvg="+str(averageTemp), "Units=F"]

		#new Data url
		newDataUrl = baseUrl + '&q=' + city + formatJ + date + str(newDate)
		newData = requests.get(newDataUrl)
		jsonNew = json.loads(newData.content)
		for v in jsonNew.values():
			minTemp = v['weather'][0]['mintempF']
			maxTemp = v['weather'][0]['maxtempF']
			averageTemp = getAverage(minTemp, maxTemp)
			cityTempDiffs[city].append("currentAvg="+str(averageTemp))
			cityTempDiffs[city].append("lastUpdatedTime="+str(datetime.today()))



def generateEmailContentForCity(cityTempDiffs):

	for k,v in cityTempDiffs.items():
		split_old_temp = v[0].split('=')
		split_current_temp = v[2].split('=')
		delta = float(split_current_temp[1]) - float(split_old_temp[1])
		message = ''
		if(delta >= 5):
			message = 'It\'s nice out! Good day for a walk'
		elif(delta <= -5):
			message = 'Not so nice out ?Indoor activity to stay fit'
		else:
			message = 'Enjoy a warm cuisine'
		v.append("message="+message)




def sendEmailHelper(cityTempDiffs):
	db = client.EmailApp
	cities_collection = db.cities
	user_collection = db.users
	allCities =cities_collection.find()
	for city in allCities:
		subscribersList = city['SubscribersList']
		content_for_city = cityTempDiffs[city['City']][4]
		msg = content_for_city.split('=')[1]
		for subscriber in subscribersList:
			cur = user_collection.find({'_id':ObjectId(subscriber)})
			for u in cur:
				to_email = Email(str(u['EmailId']))
				subjectMessage = 'Subject: ' + msg
				mail = Mail(from_email, subjectMessage,to_email, content)
				response = sg.client.mail.send.post(request_body=mail.get())


def getAverage(minTemp, maxTemp):
	return (float(minTemp)+float(maxTemp))/2.0

def getOldDate():
	return datetime.today()-timedelta(days=oldDays)

def getCurrentDate():
	return datetime.today()-timedelta(days=1)

#connectToMongo()

fetchTempDiff(['Boston', 'Seattle'])

def sendEmail():
    connectToMongo()
    print('Inside sendEmail')
    """cities = fetchCitiesFromDB()
    fetchTempDiff(cities)
    generateEmailContentForCity(cities)
    sendEmailHelper(cityTempDiffs)"""
