export default{
    debounce(handle, delay) {
		let self = this;
		return function() {
			clearTimeout(self.time);
			self.time = setTimeout(() => {
				handle.apply(this, arguments);
			}, delay)
		}
	},
}