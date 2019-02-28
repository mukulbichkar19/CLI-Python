class EmailMessageByCity:
	''' This is a class for email content for each city at a given time '''
	def __init__(self, city='',message = ''):
		self.city = city
		self.message = message

	def getEmailMessage(self):
		return self.message

	def getCityForEmailMessage(self):
		return self.city

	def display(self):
		return str(self.getEmailMessage()) + ' for city: ' + str(self.getCityForEmailMessage())