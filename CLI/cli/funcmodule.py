from CitiesHandler import CitiesHandler
from EmailHandler import EmailHandler


def sendEmail():
	c = CitiesHandler()
	cityTempDiffs = c.generateTempDiffs()
	eh = EmailHandler()
	eh.generateMessages(cityTempDiffs)
	eh.sendEmailHelper()
    

