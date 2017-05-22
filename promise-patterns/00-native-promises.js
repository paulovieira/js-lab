

var p = new Promise((resolve, reject) => {
//debugger
	resolve()

})


p = p.then(value => {
//debugger;
	return new Promise((resolve, reject) => {

		setTimeout(() => {

			//reject('z')
			resolve('a')
		}, 1000)

	})
})

p = p.then(value => {
//debugger;
	return new Promise((resolve, reject) => {

		setTimeout(() => {

			//reject('z')
			resolve('b')
		}, 1000)

	})
})

p = p.then(value => {
//debugger;
	return new Promise((resolve, reject) => {

		setTimeout(() => {

			resolve('c')
		}, 1000)

	})
})

p = p.catch((err) => {
//debugger;
})
