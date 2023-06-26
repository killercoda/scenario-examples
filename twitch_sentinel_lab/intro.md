
![TwitchTV and ScyllaDB Logo](./images/1-scylla_twitch.png)

---

This lab demonstrates, using a hands-on example, how you can create a high availability application using Twitch chat as a target. You’ll create your own environment with Scylla and connect it to many Twitch chats as you can, and dump all the chat messages at the time.

We will use NodeJS but the example is valid to any language/technology you want that has a Driver available.


## About the Project

The app that we're about to build is called "Twitch Sentinel", a bot that will scrap all messages inside any channel that you want.

The idea is to show how the "real world" throughput can work based on your demand.

Before we start, let's understand how the Killercoda works in the snippet below.

```sh
echo "Let's begin the course :p"
```{{execute}}

It runs all the commands you need without need to type it. Happy coding! 🥳

