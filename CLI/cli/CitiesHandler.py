from pymongo import MongoClient
import config
# connect to MongoDB
client = MongoClient(config.mongo_connection)
#requests
import requests
from datetime import datetime, timedelta
import simplejson as json
from bson.objectid import ObjectId

from Temperature import Temperature


class CitiesHandler:

	def __init__(self):
		self.cityTempDiffs = {}
		self.oldDays = 730


	def fetchCitiesFromDB(self):
		db = client.EmailApp
		cities_collection = db.cities
		allCities = cities_collection.find()
		cities = []
		for city in allCities:
			cities.append(city['City'])
		client.close()
		return cities

	def fetchTempDiff(self, cities):
		for c in cities:
			historicalAvgTemp = self.calculateAvgTemp(c, self.getOldDate())
			currentAvgTemp = self.calculateAvgTemp(c, self.getCurrentDate())
			self.cityTempDiffs[c] = Temperature(historicalAvgTemp, currentAvgTemp,
													currentAvgTemp-historicalAvgTemp)



	def calculateAvgTemp(self, city, date):
		baseUrl = config.weather_base_url
		formatJ = '&format=json'
		datestr = '&date='
		url = baseUrl + '&q=' + city + formatJ + datestr + str(date)
		dataFromAPI = requests.get(url)
		jsonObj = json.loads(dataFromAPI.content)
		averageTemp = 0
		for v in jsonObj.values():
			minTemp = v['weather'][0]['mintempF']
			maxTemp = v['weather'][0]['maxtempF']
			averageTemp = self.getAverage(minTemp, maxTemp)
		return averageTemp	

	
	def getOldDate(self):
		return datetime.today()-timedelta(days=self.oldDays)

	def getAverage(self,minTemp, maxTemp):
		return (float(minTemp)+float(maxTemp))/2.0

	def getCurrentDate(self):
		return datetime.today()-timedelta(days=1)

	def generateTempDiffs(self):
		print('inside generateTempDiffs')
		allCities = self.fetchCitiesFromDB()
		self.fetchTempDiff(allCities)
		return self.cityTempDiffs


