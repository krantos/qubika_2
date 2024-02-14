const { writeFile } = require('fs');

const save = (data = {}, path = './src/test_files/data.json') => {
	writeFile(path, JSON.stringify(data), (error) => {
		if(error) {
			console.log('An error has occurred ', error);
			return;
		}
		console.log('Data written successfully');
	})
}

module.exports = { save }
