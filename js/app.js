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
var sessionId = "1_MX40NjMwNzg2Mn5-MTU1NTE1OTE4Mzk1NH5jYll2K2JMdGFMU01RRGF1N3dSV2pKQ1l-fg";
var token = "T1==cGFydG5lcl9pZD00NjMwNzg2MiZzaWc9ODFmOTMyN2QwZTQxZmZjM2U2YThkODc4NDZkMTk5NmJlNTQwNzUzZTpzZXNzaW9uX2lkPTFfTVg0ME5qTXdOemcyTW41LU1UVTFOVEUxT1RFNE16azFOSDVqWWxsMksySk1kR0ZNVTAxUlJHRjFOM2RTVjJwS1ExbC1mZyZjcmVhdGVfdGltZT0xNTU1MTU5MjEwJm5vbmNlPTAuMzQwNTU3MjE1NjQ4MDM0MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTU1MTgwODEwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

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
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          subscribeToAudio: true,
          subscribeToVideo: false
        }, handleError);
    });

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