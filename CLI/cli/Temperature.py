class Temperature:
	'''This is a temperature class '''
	def __init__(self, historicalAvgTemp = 0, currentAvgTemp =0, 
		         avgTempDelta = 0, tempUnit = 'F'):
		self.historicalAvgTemp = historicalAvgTemp
		self.currentAvgTemp = currentAvgTemp
		self.avgTempDelta = avgTempDelta
		self.tempUnit = tempUnit

	def getHistoricalAvgTemp(self):
		return self.historicalAvgTemp

	def getCurrentAvgTemp(self):
		return self.currentAvgTemp

	def getAverageTempDelta(self):
		return self.avgTempDelta

	def getTempUnit(self):
		return self.tempUnit

	def display(self):
		return  'Historical: ' + str(self.getHistoricalAvgTemp()) + ' Current: ' + str(self.getCurrentAvgTemp()) + ' Delta: '+ str(self.getAverageTempDelta())

