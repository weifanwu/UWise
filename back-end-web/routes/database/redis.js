var express = require('express');
const { connect } = require('mongoose');
var router = express.Router();
const redis = require('redis');
const User = require('../../models/userSchema.js');
const generateCode = require('../../utils/generateCode.js');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }

  router.post('/buyClass', async (req, res) => {
    let client;
    try {
        client = await redis.createClient({
            password: 'Ww@8230882',
            socket: {
                host: 'redis-16359.c289.us-west-1-2.ec2.cloud.redislabs.com',
                port: 16359
            }
        }).connect();

        const secret = generateCode();
        const className = req.body.className;
        await client.set(secret, className);
        res.status(200).send("Your activation code: " + secret);
    } catch(error) {
        console.log(error);
        res.status(500).send("error");
    } finally {
        if (client) {
            await client.disconnect();
        }
    }
});

router.post('/addClass', async (req, res) => {
    let client;
    try {
        client = await redis.createClient({
            password: 'Ww@8230882',
            socket: {
                host: 'redis-16359.c289.us-west-1-2.ec2.cloud.redislabs.com',
                port: 16359
            }
        }).connect();
        console.log(req.body);
        const secret = req.body.secret;
        const email = req.body.email;
        const classname = await client.get(secret);
        await User.updateOne(
          {"email" : email},
          {
            $push: {
              classes: {
                 $each: [ classname ],
              }
            }      
          }
        );
        res.status(200).send("good");
    } catch(error) {
        console.log(error);
        res.status(500).send("error");
    } finally {
        if (client) {
            await client.disconnect();
        }
    }
});


router.post('/removeCode', async (req, res) => {
    let client;
    try {
        client = await redis.createClient({
            password: 'Ww@8230882',
            socket: {
                host: 'redis-16359.c289.us-west-1-2.ec2.cloud.redislabs.com',
                port: 16359
            }
        }).connect();
        const secret = req.body.secret;
        console.log("good: ");
        console.log(secret);
        await client.del(secret);
        res.status(200).send("good");
    } catch(error) {
        console.log(error);
        res.status(500).send("error");
    } finally {
        if (client) {
            await client.disconnect();
        }
    }
});



module.exports = router;
