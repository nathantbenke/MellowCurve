import React, { Component } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPause, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/scss/bootstrap.scss';
import './Library.scss';

class Library extends Component {
  state = {
    samples: [],
    playingSample: null,
    isPlaying: false
  };

  componentDidMount() {
    // Make an API call to get the samples associated with the user's session
    fetch('http://localhost:8000/api/samples/', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        this.setState({ samples: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDelete = sampleId => {
    // Make an API call to delete the sample
    fetch(`http://localhost:8000/delete-sample/${sampleId}/`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          // Remove the sample from state if it was successfully deleted
          this.setState(prevState => ({
            samples: prevState.samples.filter(sample => sample.id !== sampleId)
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // plays or pauses sample
  onPlay = sample => {
    const { playingSample, isPlaying } = this.state;

    // if the same sample is clicked while playing, pause it
    if (isPlaying && playingSample.id === sample.id) {
      playingSample.audio.pause();
      this.setState({ isPlaying: false });
    } else {
      // otherwise, stop the currently playing sample (if there is one) and play the clicked sample
      if (playingSample) {
        playingSample.audio.pause();
      }

      const audio = new Audio(sample.file);
      audio.play();

      this.setState({
        playingSample: {audio: audio, id: sample.id},
        isPlaying: true
      });

      // when audio ends update the state to reflect that it's no longer playing
      audio.addEventListener('ended', () => {
        this.setState({ isPlaying: false });
      });
    }
  };
  
  // adds sample to selected track in Home.js
  onSelect = sample => {
    this.props.addSampleToSelectedTrack(sample);
  };

render() {
    return (
      <Container className="app">
        <div className="scroller">
          {this.state.samples.map(sample => {
            return (
              <Row key={sample.name} className="item">
                  <Button variant="link" onClick={() => this.onSelect(sample)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  {sample.name}
                <Col style={{ textAlign:"right"}}>
                  <Button variant="link" onClick={() => this.onPlay(sample)}>
                    <FontAwesomeIcon icon={this.state.isPlaying && this.state.playingSample.id === sample.id ? faPause : faPlay} />
                  </Button>
                  <Button variant="link" onClick={() => this.onDelete(sample.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Col>
              </Row>
            );
          })}
        </div>
      </Container>
    );
  }

}

export default Library;
