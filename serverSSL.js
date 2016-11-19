const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const options = {
    //    key  : fs.readFileSync('server.key'),
    key: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAt2ajZr4np9j0q5glqjSLRjQuKxQaUdRtefRnYkHtDy5m62Sj\npmOyI02wPkshgPbGkzyAMDiE32PKRDYOwQVNLWQCJYZNsVDfNb8W2QK2dvosXgpl\nk3jLMJzKOdTRm7ZtPROHgpUF4UubF0OtLSW0n1GOVoTVaYNxcAMbmgn+mJvwJiSX\n58TwMGMVXk1oxbXbrY3hsSTBhxFHK8Q6Tnydf4J2kWUrCHA2yDw6UOyyFG433Lm9\nneQIZ4zNMyPH8/rFXeHAaXNmAolZJBokF9DSgELxblTHITMU9kYgI/mqnN7iPFqn\ng8M2DCxWM/oIZznD0yVwJQqol8//Va+lCjiqLwIDAQABAoIBAHlw2Vo7J/8Yxkqp\noKcny+FcxAV6dkMhKqzKjXqetN6Ml1Hffg27jkWaN83H6hN/VNZCBY/onPNfHJw2\nP2bIn+YihtlaKS/0oRjxw6tHBJOb7K0IrWINZl52M+I/bdxx27vJpr1s+EvKyJOL\nGK0Afq3QTzQzGS2ZABBvvmMtowxhdpkxSk8l7Pyzofij+/qTM7+lao8QpYOFQfN0\nBWpNiJHjE8LawtTJGrn1g28miV3YC0DKf8sNaUBegcqKAxhD0IG6HuGxs3CWhGqC\n5qvl4xt7i8L68yy1CuLpdN+NtmbYRsRK3ih144Lkg793uNAn600qxvCh7YgHWk3S\n9Yg0XYECgYEA2ab3a8csbXV/wxBxREru+AzNhErGCoBiddhJ5iXcX969oBYzLzd7\nr1nO8ApeHSx4n+6Ygb1RANLK+nGrEX230cw43URoU/dNCDORsVcriseZvAWe9x8R\nzsZZKTG5jasP/Upw//Vt0nfZ9slKhXdwdItBthHGwZgktU6CcJPASlECgYEA17bL\nXgIPb9xeMnJyYPFUzy0rDk0UPZK8eLFhf/zQLBNVKzSURv9w4t+2hqHFHEcdxafT\nOE4USk1IyIhANnXX3YVHkjWUwA4+k1WgA6qmd0KviXgOPXOa3r1isIcnUzarxeNw\nNjOgtarhSDKfguPjq5urQmuPC329ojOmGCbYDH8CgYEAxQquZglrxDCimLLTCBOa\noj/c8w5Kmgk+mhdUV6IhDz30h/BxKCbft5Djklage2LeVVPJB3Of2NH85pxvVadt\n+eYb+N1MYe+58lnVZSpYhgxLtneUQX8EPSE+aNfWd1XNZO62vFKxuN++GPiEma3W\nxfuoYq9XM76MRQOtfUOVyvECgYBk9oeE/o3fG1NzZSGnwgyh01A9p1H757wS+WLb\nFqcQmhPY3wkvmctqRK8XoIuzSo3iv0QbLGBOzpFsWmlDlDBu3Dy9cBqpMYGUUBVO\n4gZ791hVjT2NAZjQ++8/FGMRjZskSelxVQS5QruioR8LkkIzRe8IbXNMO5QQYQAy\neavRXQKBgQC212EJIOahy9tUJ7IlWOvRIfwnRaeroh+PNlk11mNBA2Trn7RZVNZG\n+ahCRx6H/Lgn20Qp9HQzFhxaFn7Jaf1DQok8v1MMCmFByWf9Ul3G7L1Rcv8P5+3O\nHuTSEbA5EqJfn+d5c5O+bUDTkQMFwmYw7/TUmVHjDR20Q16xr5J4aw==\n-----END RSA PRIVATE KEY-----\n",
    // cert: fs.readFileSync('server.crt')
    cert: "-----BEGIN CERTIFICATE-----\nMIIDkjCCAnoCCQC5uav2NMImuTANBgkqhkiG9w0BAQsFADCBijELMAkGA1UEBhMC\nQ04xDTALBgNVBAgMBE5vbmUxDTALBgNVBAcMBE5vbmUxEjAQBgNVBAoMCWxvY2Fs\naG9zdDESMBAGA1UECwwJbG9jYWxob3N0MRIwEAYDVQQDDAlsb2NhbGhvc3QxITAf\nBgkqhkiG9w0BCQEWEnJhaW5AbG9jYWxob3N0LmNvbTAeFw0xNjA4MjQxNTI5MDNa\nFw0xNzA4MjQxNTI5MDNaMIGKMQswCQYDVQQGEwJDTjENMAsGA1UECAwETm9uZTEN\nMAsGA1UEBwwETm9uZTESMBAGA1UECgwJbG9jYWxob3N0MRIwEAYDVQQLDAlsb2Nh\nbGhvc3QxEjAQBgNVBAMMCWxvY2FsaG9zdDEhMB8GCSqGSIb3DQEJARYScmFpbkBs\nb2NhbGhvc3QuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt2aj\nZr4np9j0q5glqjSLRjQuKxQaUdRtefRnYkHtDy5m62SjpmOyI02wPkshgPbGkzyA\nMDiE32PKRDYOwQVNLWQCJYZNsVDfNb8W2QK2dvosXgplk3jLMJzKOdTRm7ZtPROH\ngpUF4UubF0OtLSW0n1GOVoTVaYNxcAMbmgn+mJvwJiSX58TwMGMVXk1oxbXbrY3h\nsSTBhxFHK8Q6Tnydf4J2kWUrCHA2yDw6UOyyFG433Lm9neQIZ4zNMyPH8/rFXeHA\naXNmAolZJBokF9DSgELxblTHITMU9kYgI/mqnN7iPFqng8M2DCxWM/oIZznD0yVw\nJQqol8//Va+lCjiqLwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAiMAoMFuzo55iG\nsSGkzMmJrQNlTwJme0CstyTmU7KAuEWUm+gkclxAytVoR2AucTdrppSa/vASdsW6\nUFWjIL3fTE8HnEWVwvmazYrdaGmE7Hm76ONXrR0QAYvXNqLuL7Q0li/BHjgRMzvm\nPw68VD5Wa4L7QIKN5cdJ5Pw9QVtkfHw/48UaX7g4uJ0pVWeJLtNmlSzAQrRAt18y\n0ElBVeo9eGicCVt2nD1zIcvmskoZ4D40dNvTXq63p0mVWw+W0aq0jBuZa4zI8ylF\n4uf/N8TEJyKxRjetCT4qmDKMLkLE0JFJ5Gtiy/OloWqxwLvh8gYz8fYj3o1kYi8V\n6TPR4DFW\n-----END CERTIFICATE-----\n"
};
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})
app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

https.createServer(options, app).listen(3000, function() {
    console.log('Started on 3000 https!');
});