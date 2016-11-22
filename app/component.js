module.exports = function() {
	var element = document.createElement('h1');
	element.innerHTML = 'Hello world <a class="pure-button" href="#">A Pure Button</a>';
	return element;
};