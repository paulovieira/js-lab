// aes-js: A pure JavaScript implementation of the AES block cipher 
// https://github.com/ricmoo/aes-js

function encrypt (utf8Text, key) {

	var aesCtr = new aesjs.ModeOfOperation.ctr(key);

	// 1 - convert from utf8 text (representing the plain text) to bytes
	var textBytes = aesjs.utils.utf8.toBytes(utf8Text);

	// 2 - encrypt the bytes
	var encryptedBytes = aesCtr.encrypt(textBytes);

	// 3 - convert from bytes to hex text (to print or store the encrypted data)
	var hexText = aesjs.utils.hex.fromBytes(encryptedBytes);	

	return hexText;
}

function decrypt (hexText, key){

	var aesCtr = new aesjs.ModeOfOperation.ctr(key);

	// 1 - convert from hex text (representing encrypted bytes) to bytes 
	var encryptedBytes = aesjs.utils.hex.toBytes(hexText);

	// 2 - decrypt the bytes
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);

	// 3 - convert from bytes to utf8 text
	var utf8Text = aesjs.utils.utf8.fromBytes(decryptedBytes);

	return utf8Text;
}

// 128-bit key (16 bytes * 8 bits/byte = 128 bits)
var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

var originalText = 'Text may be any length you wish, no padding is required.';
console.log(originalText);

var encryptedText = encrypt(originalText, key);
console.log(encryptedText);

var backToOriginal = decrypt(encryptedText, key);
console.log(backToOriginal);

console.log('text is equal: ', originalText === backToOriginal)
