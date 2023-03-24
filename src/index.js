"use strict";
const express = require('express');
const app = express();
const port = 5000;
app.get('/', (req, res) => {
    res.send('Hello1121');
});
app.listen(port, () => {
    console.log(`kkkkkk${port}`);
});
