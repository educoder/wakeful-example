# wakeful-example
A simple wakeful usage example

## Purpose
This simple Wakeful example shows how a Browser client can connect to a Faye/WakefulWeasel server, subscribe to a channel, and send and receive messages over the channel

## Dependencies
* a working WakefulWeasel server with persistance turned off
* jQuery (loaded in HTML from CDN)
* Faye client.js (loaded in HTML from Faye server)

## Caveats
In order to make this example work right out of the box the URL to the WakefulWeasel test server (with persistance turned off) is set to http://coati.encorelab.org:7890/faye

In a later version the Faye client.js might be pulled in via Bower and the WakefulWeasel URL will be configurable but this requires more tools like bower and http-server (via npm) to run the code.

All messages go via channel `foo` since the channel is hard coded. This might change in future examples.

## Run example
Open the index.html file in two modern browsers like Chrome or Firefox and send message.

