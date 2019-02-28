from CitiesHandler import CitiesHandler
from EmailHandler import EmailHandler

'''Driver function that handles all the operations '''
def sendEmail():
	c = CitiesHandler()
	cityTempDiffs = c.generateTempDiffs()
	eh = EmailHandler()
	eh.generateMessages(cityTempDiffs)
	eh.sendEmailHelper()
    

