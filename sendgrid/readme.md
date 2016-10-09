## sendgrid-promise

1. place the API key (or the SMTP credentials) in `config/sendgrid-key.txt`
2. the `sendgrid-promise` module will take care of reading the key and export an instance of the Sendgrid object, ready to be used
3. use that configured instance in the rest of the application (`./send-example.js`)