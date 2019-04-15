// API Key
// 46307862
// Project Secret
// 0b5a4e43d5dc7b0b87fa89699c864f71ce813de2
// Session ID
// 1_MX40NjMwNzg2Mn5-MTU1NTE1OTE4Mzk1NH5jYll2K2JMdGFMU01RRGF1N3dSV2pKQ1l-fg
// Token
// T1==cGFydG5lcl9pZD00NjMwNzg2MiZzaWc9ODFmOTMyN2QwZTQxZmZjM2U2YThkODc4NDZkMTk5NmJlNTQwNzUzZTpzZXNzaW9uX2lkPTFfTVg0ME5qTXdOemcyTW41LU1UVTFOVEUxT1RFNE16azFOSDVqWWxsMksySk1kR0ZNVTAxUlJHRjFOM2RTVjJwS1ExbC1mZyZjcmVhdGVfdGltZT0xNTU1MTU5MjEwJm5vbmNlPTAuMzQwNTU3MjE1NjQ4MDM0MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTU1MTgwODEwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9

// replace these values with those generated in your TokBox Account
var apiKey = "46307862";
var sessionId = "1_MX40NjMwNzg2Mn5-MTU1NTM0MzAwNzgyOH5vRW1SdkIreklhcldySE10Uy9UUGRkU2d-fg";
var token = "T1==cGFydG5lcl9pZD00NjMwNzg2MiZzaWc9NjUxM2IwNzU5NzUyZTM5OTRiZDA3NjJmYTE5ZmY2NDZjOGZiZDU0ZTpzZXNzaW9uX2lkPTFfTVg0ME5qTXdOemcyTW41LU1UVTFOVE0wTXpBd056Z3lPSDV2UlcxU2RrSXJla2xoY2xkeVNFMTBVeTlVVUdSa1UyZC1mZyZjcmVhdGVfdGltZT0xNTU1MzQzMDM1Jm5vbmNlPTAuNDg4NTEyMDMzOTEzNzQ3NjUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU1NTM0NjYzMSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
    var subscriber
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        subscriber = session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          subscribeToAudio: true,
          subscribeToVideo: false
        }, handleError);
    });

    if(subscriber) {
        console.log('Here');
        subscriber.setStyle('audioLevelDisplayMode', 'off');
        var movingAvg = null;
        subscriber.on('audioLevelUpdated', function(event) {
            if (movingAvg === null || movingAvg <= event.audioLevel) {
                movingAvg = event.audioLevel;
            } else {
                movingAvg = 0.7 * movingAvg + 0.3 * event.audioLevel;
            }

            // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
            var logLevel = (Math.log(movingAvg) / Math.LN10) / 1.5 + 1;
            logLevel = Math.min(Math.max(logLevel, 0), 1);
            console.log(logLevel);
            // document.getElementById('subscriberMeter').value = logLevel;
        });
    }

    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      publishAudio: true,
      publishVideo: false
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }