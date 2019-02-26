from EmailMessageByCity import EmailMessageByCity
import config
from pymongo import MongoClient
# connect to MongoDB
client = MongoClient(config.mongo_connection)
import simplejson as json
from bson.objectid import ObjectId
import smtplib, ssl
import os
import sendgrid
from sendgrid.helpers.mail import *

class EmailHandler:

	def __init__(self):
		self.messageByCity = {}


	def generateMessages(self, cityTempDiffs):
		for city,temp in cityTempDiffs.items():
			delta = temp.getAverageTempDelta()
			message = ''
			if(delta >= 5):
				message = 'It\'s nice out! Good day for a walk'
			elif(delta <= -5):
				message = 'Not so nice out ?Indoor activity to stay fit'
			else:
				message = 'Enjoy a warm cuisine'
			self.messageByCity[city] = message



	def sendEmailHelper(self):
		sg = sendgrid.SendGridAPIClient(apikey=config.sendgrid_api)
		from_email = Email(config.from_email)
		content = Content("text/plain", "Here's a test email sent from Python.")
		db = client.EmailApp
		cities_collection = db.cities
		user_collection = db.users
		allCities = cities_collection.find()
		for city in allCities:
			print(city)
			subscribersList = city['SubscribersList']
			msg = self.messageByCity[city['City']]
			print(msg)
			for subscriber in subscribersList:
				cur = user_collection.find({'_id':ObjectId(subscriber)})
				for u in cur:
					to_email = Email(str(u['EmailId']))
					subjectMessage = 'Subject: ' + msg
					mail = Mail(from_email, subjectMessage,to_email, content)
					response = sg.client.mail.send.post(request_body=mail.get())

		
