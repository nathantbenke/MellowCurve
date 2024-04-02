import { React, Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Library from "./Library"
import 'bootstrap/scss/bootstrap.scss'
import './Home.scss'
// import { Song, Track, Instrument, Effect } from 'reactronica';
import { faMinus, faPause, faPlay, faPlus, faUpload, faVolumeMute, faVolumeUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Tone from 'tone';
import WaveSurfer from 'wavesurfer.js';
import _default from 'react-bootstrap/esm/Accordion'

class Home extends Component {

  constructor() {
    super()
    this.nextTrackID = 1; // Incremented as tracks are added
    this.iter = 0;
    this.state = {
      isPlaying: false, // Tracks if the project is currently playing

      // TODO: Change Tone.Transport.bpm.value according to this value
      bpm: 90, // BPM for whole project

      // TODO: Add a whole project volume slider to alter this valume, change this.state.volume.volume accordingly
      volume: new Tone.Volume(), // Volume for the whole project
      
      // TODO: Add a mute button, change its icon according to this value, and set this value when pressed, and mute/unmute Tone.Transport
      isMuted: false, // Tracks if the whole project is muted or not

      tracks: [{ // Array of all tracks in project
        id: this.nextTrackID,
        name: "track " + this.nextTrackID, player: null,
        wavesurfer_id: "track" + this.nextTrackID,
        wavesurfer: undefined,
        details: {
          volume: 7,
          fade_in: 0,
          fade_out: 0,
          duration: 0,
          pitchShift: 0,
          distortion: 0,
          reverb: 0
        },
        pitchShift: new Tone.PitchShift(),
        distortion: new Tone.Distortion(0),
        reverb: new Tone.Freeverb(0.7)
      }],
      selectedTrackIndex: 0, // Index of currently selected track
      currentTime: 0, // Tracks the current time position of the project
      firstPlay: true, // Used to determine if we need to init Tone
      trackIndex: -1,
      anySampleLoaded: false,

      // Set this correctly and set Tone.Transport.loop_end to this value accordingly
      longest_sample: 0, // Used to track the duration of the longest sample currently loaded in a track

      currentTrackDetails: { // Inromation regarding the sample of the currently selected track
        volume: 7,
        fade_in: 0,
        fade_out: 0,
        duration: 1,
        pitchShift: 0,
        distortion: 0,
        reverb: 0
      },
    }
  }

  /**
   * Initializes the audio for the website
   */
  init_tone() {
    if (this.state.firstPlay) {
      Tone.start();
      this.setState({
        firstPlay: false
      })
    }
  }

  /**
   * Sets up Tone.Transport to loop when this page loads
   */
  componentDidMount() {
    if (this.state.trackIndex % 3 || this.state.trackIndex == -1)
    {
      this.setState({trackIndex: this.state.trackIndex++});
      // this.state.tracks[this.state.trackIndex].wavesurfer = WaveSurfer.create({
      //   container: '#' + this.state.tracks[this.state.trackIndex].wavesurfer_id,
      //   waveColor: 'violet',
      //   progressColor: 'purple',
      //   height: 100  
      // });
      console.log("componentMount Container: #" + this.state.tracks[this.state.trackIndex].wavesurfer_id);
//    this.state.tracks[this.state.trackIndex].wavesurfer.isMuted(true);
//      this.setState({trackIndex: this.state.trackIndex--});
    console.log(this.state.trackIndex);
    } else {
      //this.setState({trackIndex: this.state.trackIndex--});
      console.log(this.state.trackIndex);
    }
    console.log(this.state.trackIndex);
    /*
    this.state.tracks[this.state.trackIndex].wavesurfer = WaveSurfer.create({
      container: '#' + this.state.tracks[this.state.trackIndex].wavesurfer_id,
      waveColor: 'violet',
      progressColor: 'purple'
    });*/
    //this.setState({trackIndex: this.state.trackIndex++});
    //console.log(this.state.trackIndex);

    Tone.Transport.loop = true;
    Tone.Transport.loopStart = "0:0:0";
    Tone.Transport.loopEnd = "30:0:0";
    Tone.Transport.on("loop", e => {
      for(const track of this.state.tracks){
        console.log(track)
        if(track.wavesurfer === undefined){
          continue;
        }
        console.log("here")
        track.wavesurfer.seekTo(0)
        track.wavesurfer.play()
        // console.log(track.)
        // if(track.wavesurfer != null){
        //   track.wavesurfer.seekTo(0);
        //   track.wavesurfer.play();
        // }
      }
      
    })
 //   this.state({trackIndex: trackIndex++});
    //console.log(this.state.trackIndex);

    //trackZero.wavesurfer.mute(true);
  }

  /**
   * Sets this.state.currentTrackDetails and selectedTrack.details according to a change
   * made in one of the effects sliders
   * 
   * @param {string} key 
   * @param {*} value 
   */
  setCurrentTrackDetails = (key, value) => {
    if (this.state.selectedTrackIndex !== -1) {
      const selectedTrack = this.state.tracks[this.state.selectedTrackIndex];

      // (Essentially) mute track if volume is at the minimum (-10)
      if (key === "volume" && value <= -9.7) {
        value = -60
      }

      // Initialize the new track details, with the new value set for the key parameter
      var newDetails = selectedTrack.details;
      newDetails[key] = value

      // Tracks take a while for their buffers to load, generally occurs after first play
      // The buffer is how we get the duration of a track
      // If we have not seen a track's duration yet (i.e. a slider is changed before
      // the first play), we set the duration for this track
      if (selectedTrack.details.duration === 0 && selectedTrack.player != null) {
        newDetails.duration = selectedTrack.player.buffer.duration;
        // TODO: Modify this.state.longest_sample if needed
      }
      
      // Store the modified details in the state and in the selectedTrack
      this.setState({
        currentTrackDetails: newDetails
      })
      selectedTrack.details = newDetails;

      // Change player attributes (effects and such) if it has been initialized
      if (selectedTrack.player != null) {
        selectedTrack.player.volume.value = this.state.currentTrackDetails.volume;
        selectedTrack.player.fadeIn = this.state.currentTrackDetails.fade_in;
        selectedTrack.player.fadeOut = this.state.currentTrackDetails.fade_out;
      }

      if(key === "pitchShift"){
        selectedTrack.pitchShift.pitch = value
      }
      if(key === "distortion"){
        selectedTrack.distortion.distortion = value
      }
      if(key === "reverb"){
        selectedTrack.reverb.dampening = value
      }
    }
  }

  /**
   * Play/pause the project
   */
  playButtonClicked = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    });

    this.init_tone();
    if (!this.state.isPlaying) {
      console.log("Playing")

      // Set Tone.Transport.loopend to the longest track's duration
      // Loop through all tracks, find longest one, and set it to that duration instead
      // of just the current track's duration
      var longestDuration = 0;
      this.state.tracks.forEach((track) => {
        if (track.player != null &&track.player.buffer.duration > longestDuration) {
            longestDuration = track.player.buffer.duration;
        }
      });
      if (longestDuration > this.state.longest_sample) {
        this.setState({
          longest_sample: longestDuration
        });
        Tone.Transport.loopEnd = longestDuration;
      }
      Tone.Transport.start();
      for(const track of this.state.tracks){
        if(track.wavesurfer === undefined){
          continue;
        }
        track.wavesurfer.play()
      }
      //this.state.tracks[0].wavesurfer.play();
    } else {
      console.log("Pausing")
      Tone.Transport.pause();
      for(const track of this.state.tracks){
        if(track.wavesurfer === undefined){
          continue;
        }
        track.wavesurfer.pause()
      }
      //this.state.tracks[0].wavesurfer.pause();

      // save current time position for resuming playback
      this.setState({ currentTime: Tone.Transport.position });
    }


  }

  /**
   * Adds track and selects it (max of 8 tracks rn)
   */
  addTrack = () => {
    // this.init_tone(); // In case tone hasn't been initialized yet
    if (this.state.tracks.length < 8) {
      // Add track to the track array with base default values
      console.log(
        "Container: " + "#track" + this.nextTrackID,
        "trackIndex: " + this.state.trackIndex
      );

      this.setState((prevState) => ({
        tracks: [...prevState.tracks, {
          id: this.nextTrackID,
          name: "track " + this.nextTrackID,
          wavesurfer_id: "track" + this.nextTrackID,
          details: {
            volume: 7,
            fade_in: 0,
            fade_out: 0,
            duration: 0,
            pitchShift: 0,
            distortion: 0,
            reverb: 0
          },
          pitchShift: new Tone.PitchShift(),
          distortion: new Tone.Distortion(0),
          reverb: new Tone.Freeverb()
        }],
        // Selects the track by storing the new track's index
        selectedTrackIndex: prevState.tracks.length
      }));
      this.nextTrackID++;
    }
  };

/*
  generateWaveform = (track) => {
    track.wavesurfer = WaveSurfer.create({
      container: '#track' + track.id,
      container: '#waveform'
      waveColor: 'white',
      progressColor: 'red',
    })
  };
*/
  /**
   * Adds sample to the currently selected track
   * @param {*} sample 
   */
  addSampleToSelectedTrack = async (sample) => {
    this.init_tone()
    // this.init_tone();// In case tone hasn't been initialized yet
    if (this.state.selectedTrackIndex !== -1) {
      // Creates a reference to the selected track
      const selectedTrack = this.state.tracks[this.state.selectedTrackIndex];

      // let parent = document.getElementById('track' + selectedTrack.id)
      // parent.style.width  =  (Math.floor(parent.offsetWidth * length_ratio)).toString() + "px"

      selectedTrack.wavesurfer = WaveSurfer.create({
        container: '#track' + selectedTrack.id,
        //container: '#track' + this.nextTrackID,
        waveColor: 'violet',
        progressColor: 'purple',
        height: 100,
        minPxPerSec: 18,
        scrollParent: true,
        fillParent: false,
        normalize: true
      });

      // Initialize new player to create an audio buffer from a sound file
      const player = new Tone.Player(sample.file,() => {       
        selectedTrack.wavesurfer.setMute(true);
        selectedTrack.wavesurfer.loadDecodedBuffer(selectedTrack.player.buffer._buffer);
        player.name = sample.name;

        player.chain(selectedTrack.pitchShift, selectedTrack.reverb, selectedTrack.distortion, Tone.Destination)
        //player.toDestination(); // Links the player to the main audio output
  //      selectedTrack.waveform = new Tone.Waveform(256);
  //      selectedTrack.player.connect(selectedTrack.waveform);
        player.sync().start(); // Syncs the player to the main audio output timescale
        selectedTrack.wavesurfer.seekTo(Tone.Transport.progress)
        if(this.state.isPlaying){
          selectedTrack.wavesurfer.play()
        }

        // let length_ratio = (player.buffer.duration / 30);

        // console.log(parent.offsetWidth)
        // console.log((Math.floor(parent.offsetWidth * length_ratio)).toString())
        // parent.children[0].style.width =  (Math.floor(parent.offsetWidth * length_ratio)).toString() + "px"
        // parent.children[0].children[0].style.width =  (Math.floor(parent.offsetWidth * length_ratio)).toString() + "px"
        // parent.children[0].children[1].style.width  =  (Math.floor(parent.offsetWidth * length_ratio)).toString() + "px"
        // parent.children[0].children[0].children[0].style.width =  (Math.floor(parent.offsetWidth * length_ratio)).toString() + "px"
        
        

      });



      selectedTrack.wavesurfer.on("seek", e => {
        if(e == 0){
          return;
        }
        for(const track of this.state.tracks){
          if(track.wavesurfer === undefined){
            continue;
          }
          if(track.wavesurfer.getCurrentTime() == e * track.wavesurfer.getDuration()){
            continue;
          }
          track.wavesurfer.pause();
          track.wavesurfer.seekTo(e)
        }
        
        for(const track of this.state.tracks){
          if(track.wavesurfer === undefined){
            continue;
          }
          if(this.state.isPlaying){
            track.wavesurfer.play()
          }
        }
        Tone.Transport.seconds = e * Tone.Transport.loopEnd
      })

      selectedTrack.wavesurfer.on("scroll", e => {
        for(const track of this.state.tracks){
          if(track.wavesurfer === undefined){
            continue;
          }
          if(track.wavesurfer.getCurrentTime() == e * track.wavesurfer.getDuration()){
            continue;
          }
          track.wavesurfer.pause();
          track.wavesurfer.seekTo(e)
        }
        
        for(const track of this.state.tracks){
          if(track.wavesurfer === undefined){
            continue;
          }
          if(this.state.isPlaying){
            track.wavesurfer.play()
          }
        }
        Tone.Transport.seconds = e * Tone.Transport.loopEnd
      })



      
      selectedTrack.player = player;
      selectedTrack.name = sample.name;
     // player.context.rawContext.

      
      this.setState((prevState) => ({
        tracks: [...prevState.tracks],
      }));
      this.setState({
        anySampleLoaded: true
      })
    }
  };

  /**
   * Removes sample from whichever track is selected and sets to null
   * TODO: Make a button in each track's ui to trigger this
   * @param {*} index 
   */
  removeSampleFromSelectedTrack = (index) => {
    if (this.state.selectedTrackIndex !== -1) {
      const selectedTrack = this.state.tracks[this.state.selectedTrackIndex];
      selectedTrack.name = "track " + selectedTrack.id; // Resets name of the track
      selectedTrack.player.dispose(); // Gets rid of the player object tied to the audio file
      this.setState((prevState) => ({
        tracks: [...prevState.tracks],
      }));
    }
  };

  /**
   * Selects a track with the given index
   * @param {*} index 
   */
  selectTrack = (index) => {
    // this.init_tone(); // In case tone hasn't been initialized yet
    if (index < this.state.tracks.length) {
      // Stores the newly selected tracks details in state
      const currentDetails = this.state.tracks[index].details
      this.setState({
        selectedTrackIndex: index,
        currentTrackDetails: currentDetails
      })
    } else {
      this.setState({
        selectedTrackIndex: -1
      })
    }
  };
  
  /**
   * Mutes or unmutes track with a given index
   * @param {*} index
   */
  toggleMuteTrack = (index) => {
    const tracks = [...this.state.tracks];
    if (tracks[index].player != null) {
      tracks[index].player.mute = !tracks[index].player.mute;
      this.setState({ tracks });
    }
  }

  /**
   * Deletes track with a given index
   * @param {*} index 
   */
  removeTrack = (index) => {
    if (this.state.tracks[index].player != null) {
      this.state.tracks[index].player.dispose();
    }
    this.setState((prevState) => ({
      tracks: prevState.tracks.filter((track, i) => i !== index)
  
    }));
  };

  /**
   * Determine the correct icon for the play button
   * @returns FontAwesome icon
   */
  determineIcon = () => {
    if (this.state.isPlaying) {
      return faPause;
    } else {
      return faPlay;
    }
  }

  /**
   * Increments the project's BPM
   * TODO: set Tone.Transport.bpm accordingly
   */
  incrementBPM = () => {
    // this.init_tone();
    const newBPM = this.state.bpm + 1;
    this.setState({
      bpm: newBPM
    })
  }

  /**
   * Decrements the project's BPM
   * TODO: set Tone.Transport.bpm accordingly
   */
  decrementBPM = () => {
    // this.init_tone();
    const newBPM = this.state.bpm - 1;
    this.setState({
      bpm: newBPM
    })
  }

  render() {
    return (
      <Container fluid className="p-0 home-container h-100 w-100">
        <Row className='h-50'>
          <Col>
            <Container className="header">
              {/*Header with buttons for adding tracks & samples
                TODO: make buttons & upload page look nicer*/}
              <Row className="justify-content-between align-items-center">
                <button onClick={this.addTrack}>
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>
                  New Track
                </button>
                <button onClick={() => {window.location.href="/upload";}}>
                  <FontAwesomeIcon icon={faUpload} className="mr-1"/>
                  New Sample
                </button>
                <button onClick={() => {window.location.href="/";}}>
                  Logout
                </button>
              </Row>
            </Container>
            <Container>
            {
              <Col>
              <Row className='track-container'>
                {/* TODO: Make some container that has a time measure type of thing at the top, perhaps some form of a table with headers */}
                <Col>
                {/* Maps each track to a HTML component*/}
                  {this.state.tracks.map((track, index) => (
                  <Row key={track.id} onClick={() => this.selectTrack(index)} className={this.state.selectedTrackIndex === index ? 'selected-track' : 'unselected-track'}>
                     <Col md="2">
                        {/* Control panel for each track */}
                        <div>
                          <h4 >{"Track " + track.id}</h4>
                          <button onClick={() => this.toggleMuteTrack(index)}>
                            <FontAwesomeIcon icon={track.player?.mute ? faVolumeMute : faVolumeUp}/>
                          </button>
                          <button onClick={() => this.removeTrack(index)}>
                            <FontAwesomeIcon icon={faTrash}/>
                          </button>
                          <h5>{track.name != "track " + track.id ? track.name : ''}</h5>
                        </div>
                      </Col>
                      <Col>
                      {/* TODO: Make a rectangle with a width scaled scale to the track's duration (should be 0 width to begin)
                          TODO: Make the rectangle start at some offset representing when the track starts playing in relation to
                          the rest of the project (i.e. if the track should start playing 5 seconds after everything else)
                          TODO: Allow for multiple rectangles (samples) to exist in a single track*/}
                     
                      {console.log(track.wavesurfer_id)}
                      <div id={track.wavesurfer_id} className='waveform'></div>
                      {/*div id='waveform'></div>onload={this.generateWaveform.bind(track)*/}
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col className='sample-container' md="4">
                  {/* Library of tracks that have been uploaded*/}
                  <Library addSampleToSelectedTrack={this.addSampleToSelectedTrack}></Library>
                </Col>  
              </Row>
              </Col>
            }
            </Container>
          </Col>
        </Row>
        <Row >
          <Col className='m-0 p-0 w-100'>
            <Row>
              <div className="separator"></div>
            </Row>
            <Row className='m-4 justify-content-center align-items-center'>
              <Col lg="3"></Col>
              <Col lg="auto">
                {/* Play button */}
                <FontAwesomeIcon icon={this.determineIcon()} className='playButton' onClick={this.playButtonClicked} />
              </Col>
              <Col lg="3" className='d-flex justify-content-left align-items-center'>
                {/* BPM display and adjustment buttons */}

              </Col>
            </Row>
            <Row>

              {/* Start of control panel */}
              <Container className="control-panel">
                <Row>
                  <Col>
                    <fieldset id="delay" name="delay" className="params">
                      {/* General settings (volume, fade in, fade out) */}
                      <label htmlFor="delay">General</label>
                      <Container>
                        <Row><label htmlFor="delay-mix">volume</label></Row>
                        <Row>
                          <input
                            id="delay-mix"
                            name="delay-mix"
                            type="range"
                            min="-10"
                            max="25"
                            step="0.5"
                            onChange={(e) =>
                              this.setCurrentTrackDetails("volume", e.target.value)
                            }
                            value={this.state.currentTrackDetails.volume}
                          />
                        </Row>
                      </Container>
                      <Container>
                        <Row>
                          <label htmlFor="delay-time">fade in</label>
                        </Row>
                        <Row>
                          <input
                            id="delay-time"
                            name="delay-time"
                            type="range"
                            min="0"
                            max={this.state.currentTrackDetails.duration}
                            step={this.state.currentTrackDetails.duration / 10}
                            onChange={(e) =>
                              this.setCurrentTrackDetails("fade_in", e.target.value)
                            }
                            defaultValue={this.state.currentTrackDetails.fade_in}
                          />
                        </Row>
                      </Container>

                      <Container>
                        <Row>
                          <label htmlFor="delay-feedback">fade out</label>
                        </Row>
                        <Row>
                          <input
                            id="delay-feedback"
                            name="delay-feedback"
                            type="range"
                            min="0"
                            max="0.99"
                            step="0.01"
                            onChange={(e) =>
                              this.setCurrentTrackDetails("fade_out", e.target.value)
                            }
                            defaultValue={this.state.currentTrackDetails.fade_out}
                          />
                        </Row>
                      </Container>
                    </fieldset>
                  </Col>

                  {/* FX controls */}
                  <Col>
                    <fieldset id="fx" name="fx" className="params">
                      <label htmlFor="fx">FX</label>
                      <Container>
                        <Row>
                          <label htmlFor="reverb">pitch shift</label>
                        </Row>
                        <Row>
                          <input
                            id="reverb"
                            name="reverb"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={(e) =>
                              this.setCurrentTrackDetails("pitchShift", e.target.value)
                            }
                            defaultValue={this.state.currentTrackDetails.pitchShift}
                          />
                        </Row>
                      </Container>
                      <Container>
                        <Row>
                          <label htmlFor="fuzz">reverb</label>
                        </Row>
                        <Row>
                          <input
                            id="fuzz"
                            name="fuzz"
                            type="range"
                            min="1"
                            max="100"
                            step="0.1"
                            onChange={(e) =>
                              this.setCurrentTrackDetails("reverb", e.target.value)
                            }
                            defaultValue={this.state.currentTrackDetails.reverb}
                          />
                        </Row>
                      </Container>
                      <Container>
                        <Row>
                          <label htmlFor="crunch">distortion</label>
                        </Row>
                        <Row>
                          <input
                            id="crunch"
                            name="crunch"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={(e) =>
                              this.setCurrentTrackDetails("distortion", e.target.value)
                            }
                            defaultValue={this.state.currentTrackDetails.distortion}
                          />
                        </Row>
                      </Container>
                    </fieldset>
                  </Col>

                  {/* EQ controls */}
                  <Col>
                    <fieldset id="eq" name="eq" className="params">
                      <label htmlFor="eq">EQ</label>
                      <Container className="h-100 w-100">
                        <Row>
                          <Col xs lg="4" className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="a">low</label>
                          </Col>
                          <Col xs lg="4" className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="d">mid</label>
                          </Col>
                          <Col xs lg="4" className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="s">hi</label>
                          </Col>
                        </Row>
                        <Row className="h-75">
                          <Col xs lg="4">
                            <input
                              className="vertical_3"
                              id="a"
                              name="a"
                              type="range"
                              min="1"
                              max="100"
                              step="5"
                            // onChange={(e) =>
                            // setEq({
                            //     ...eq,
                            //     mid: e.target.value,
                            // })
                            // }
                            // value={eq.low}
                            />
                          </Col>
                          <Col xs lg="4">
                            <input
                              className="vertical_3"
                              id="d"
                              name="d"
                              type="range"
                              min="1"
                              max="100"
                              step="5"
                            // onChange={(e) =>
                            // setEq({
                            //     ...eq,
                            //     mid: e.target.value,
                            // })
                            // }
                            // value={eq.mid}
                            />
                          </Col>
                          <Col xs lg="4">
                            <input
                              className="vertical_3"
                              id="s"
                              name="s"
                              type="range"
                              min="1"
                              max="100"
                              step="5"
                            // onChange={(e) =>
                            // setEq({
                            //     ...eq,
                            //     high: e.target.value,
                            // })
                            // }
                            // value={eq.high}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </fieldset>
                  </Col>

                  {/* ASDR controls */}
                  <Col>
                    <fieldset id="adsr" name="adsr" className="params">
                      <label htmlFor="adsr">ADSR</label>
                      <Container className="h-100 w-100">
                        <Row>
                          <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="a">a</label>
                          </Col>
                          <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="d">d</label>
                          </Col>
                          <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="s">s</label>
                          </Col>
                          <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="r">r</label>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs lg="3" >
                            <input
                              className="vertical_4"
                              id="a"
                              name="a"
                              type="range"
                              min="0"
                              max="100"
                              step="5"
                            // onChange={(e) =>
                            // setAdsr({
                            //     ...adsr,
                            //     a: e.target.value,
                            // })
                            // }
                            // value={adsr.a}
                            />
                          </Col>
                          <Col xs lg="3" >
                            <input
                              className="vertical_4"
                              id="d"
                              name="d"
                              type="range"
                              min="1"
                              max="100"
                              step="5"
                            // onChange={(e) =>
                            // setAdsr({
                            //     ...adsr,
                            //     d: e.target.value,
                            // })
                            // }
                            // value={adsr.d}
                            />
                          </Col>
                          <Col xs lg="3" >
                            <input
                              className="vertical_4"
                              id="s"
                              name="s"
                              type="range"
                              min="1"
                              max="100"
                              step="5"
                            // onChange={(e) =>
                            // setAdsr({
                            //     ...adsr,
                            //     s: e.target.value,
                            // })
                            // }
                            // value={adsr.s}
                            />
                          </Col>
                          <Col xs lg="3" >
                            <input
                              className="vertical_4"
                              id="r"
                              name="r"
                              type="range"
                              min="1"
                              max="100"
                              step="5"
                            // onChange={(e) =>
                            // setAdsr({
                            //     ...adsr,
                            //     r: e.target.value,
                            // })
                            // }
                            // value={adsr.r}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </fieldset>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
