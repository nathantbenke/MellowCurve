// import { useState, useContext, createContext } from "react";
// import { Song, Track, Instrument, Effect } from "reactronica";

// import { Container, Row, Col, Button } from 'react-bootstrap'
// import "./ControlPanel.scss"

// function ControlPanel() {




//     return(
//         <Container className="control-panel">
//             <Row>
//                 <Col>
//                 <fieldset id="delay" name="delay" className="params">
//                 <label htmlFor="delay">General</label>
//                 <Container>
//                 <Row><label htmlFor="delay-mix">volume</label></Row>
//                 <Row>
//                 <input
//                     id="delay-mix"
//                     name="delay-mix"
//                     type="range"
//                     min="-6"
//                     max="6"
//                     step="0.5"
//                     onChange={(e) =>
//                         handleVolumeChange(e.target.value)
//                     }
//                     defaultValue={props.selectedTrack.volume}
//                 />
//                 </Row>
//                 </Container>
//                 <Container>
//                     <Row>
//                     <label htmlFor="delay-time">fade in</label>
//                     </Row>
//                     <Row>
//                     <input
//                     id="delay-time"
//                     name="delay-time"
//                     type="range"
//                     min="0.01"
//                     max="1"
//                     step="0.1"
//                     // onChange={(e) =>
//                     // setDelay({
//                     //     ...delay,
//                     //     time: e.target.value,
//                     // })
//                     // }
//                     // value={delay.time}
//                 />
//                     </Row>
//                 </Container>
                
//                <Container>
//                 <Row>
//                 <label htmlFor="delay-feedback">fade out</label>
//                 </Row>
//                 <Row>
//                 <input
//                     id="delay-feedback"
//                     name="delay-feedback"
//                     type="range"
//                     min="0"
//                     max="0.99"
//                     step="0.01"
//                     // onChange={(e) =>
//                     // setDelay({
//                     //     ...delay,
//                     //     feedback: e.target.value,
//                     // })
//                     // }
//                     // value={delay.feedback}
//                 />
//                 </Row>
//                </Container>
//                 </fieldset>
//                 </Col>


//                 <Col>
//                 <fieldset id="fx" name="fx" className="params">
//                     <label htmlFor="fx">FX</label>
//                 <Container>
//                     <Row>
//                     <label htmlFor="reverb">reverb</label>
//                     </Row>
//                     <Row>
//                     <input
//                     id="reverb"
//                     name="reverb"
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     // onChange={(e) => setFx({ ...fx, reverb: e.target.value })}
//                     // value={fx.reverb}
//                 />
//                     </Row>
//                 </Container>
//                 <Container>
//                     <Row>
//                     <label htmlFor="fuzz">fuzz</label>
//                     </Row>
//                     <Row>
//                     <input
//                     id="fuzz"
//                     name="fuzz"
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     // onChange={(e) =>
//                     // setFx({
//                     //     ...fx,
//                     //     fuzz: e.target.value,
//                     // })
//                     // }
//                     // value={fx.fuzz}
//                 />
//                     </Row>
//                 </Container>
//                 <Container>
//                     <Row>
//                     <label htmlFor="crunch">crunch</label>
//                     </Row>
//                     <Row>
//                     <input
//                     id="crunch"
//                     name="crunch"
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     // onChange={(e) =>
//                     // setFx({
//                     //     ...fx,
//                     //     crunch: e.target.value,
//                     // })
//                     // }
//                     // value={fx.crunch}
//                 />
//                     </Row>
//                 </Container>
//                 </fieldset>
//                 </Col>


//                 <Col>
//                 <fieldset id="eq" name="eq" className="params">
//                 <label htmlFor="eq">EQ</label>
//                 <Container className="h-100 w-100">
//                     <Row>
//                         <Col xs lg="4" className='d-flex justify-content-center align-items-center'>
//                         <label htmlFor="a">low</label>
//                         </Col>
//                         <Col xs lg="4" className='d-flex justify-content-center align-items-center'>
//                         <label htmlFor="d">mid</label>
//                         </Col>
//                         <Col xs lg="4" className='d-flex justify-content-center align-items-center'>
//                         <label htmlFor="s">hi</label>
//                         </Col>
//                     </Row>
//                     <Row className="h-75">
//                     <Col xs lg="4">
//                     <input
//                     className="vertical_3"
//                     id="a"
//                     name="a"
//                     type="range"
//                     min="1"
//                     max="100"
//                     step="5"
//                     // onChange={(e) =>
//                     // setEq({
//                     //     ...eq,
//                     //     mid: e.target.value,
//                     // })
//                     // }
//                     // value={eq.low}
//                 />
//                     </Col>
//                     <Col xs lg="4">
//                     <input
//                     className="vertical_3"
//                     id="d"
//                     name="d"
//                     type="range"
//                     min="1"
//                     max="100"
//                     step="5"
//                     // onChange={(e) =>
//                     // setEq({
//                     //     ...eq,
//                     //     mid: e.target.value,
//                     // })
//                     // }
//                     // value={eq.mid}
//                 />
//                     </Col>
//                     <Col xs lg="4">
//                     <input
//                     className="vertical_3"
//                     id="s"
//                     name="s"
//                     type="range"
//                     min="1"
//                     max="100"
//                     step="5"
//                     // onChange={(e) =>
//                     // setEq({
//                     //     ...eq,
//                     //     high: e.target.value,
//                     // })
//                     // }
//                     // value={eq.high}
//                 />
//                     </Col>
//                     </Row>
//                 </Container>

                
               
                
//                 </fieldset>
//                 </Col>
//                 <Col>
//                 <fieldset id="adsr" name="adsr" className="params">
//                 <label htmlFor="adsr">ADSR</label>
//                 <Container className="h-100 w-100">
//                     <Row>
//                         <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
//                         <label htmlFor="a">a</label>
//                         </Col>
//                         <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
//                         <label htmlFor="d">d</label>
//                         </Col>
//                         <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
//                         <label htmlFor="s">s</label>
//                         </Col>
//                         <Col xs lg="3" className='d-flex justify-content-center align-items-center'>
//                         <label htmlFor="r">r</label>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col xs lg="3" >
//                         <input
//                     className="vertical_4"
//                     id="a"
//                     name="a"
//                     type="range"
//                     min="0"
//                     max="100"
//                     step="5"
//                     // onChange={(e) =>
//                     // setAdsr({
//                     //     ...adsr,
//                     //     a: e.target.value,
//                     // })
//                     // }
//                     // value={adsr.a}
//                 />
//                         </Col>
//                         <Col xs lg="3" >
//                         <input
//                     className="vertical_4"
//                     id="d"
//                     name="d"
//                     type="range"
//                     min="1"
//                     max="100"
//                     step="5"
//                     // onChange={(e) =>
//                     // setAdsr({
//                     //     ...adsr,
//                     //     d: e.target.value,
//                     // })
//                     // }
//                     // value={adsr.d}
//                 />
//                         </Col>
//                         <Col xs lg="3" >
//                         <input
//                     className="vertical_4"
//                     id="s"
//                     name="s"
//                     type="range"
//                     min="1"
//                     max="100"
//                     step="5"
//                     // onChange={(e) =>
//                     // setAdsr({
//                     //     ...adsr,
//                     //     s: e.target.value,
//                     // })
//                     // }
//                     // value={adsr.s}
//                 />
//                         </Col>
//                         <Col xs lg="3" >
//                         <input
//                     className="vertical_4"
//                     id="r"
//                     name="r"
//                     type="range"
//                     min="1"
//                     max="100"
//                     step="5"
//                     // onChange={(e) =>
//                     // setAdsr({
//                     //     ...adsr,
//                     //     r: e.target.value,
//                     // })
//                     // }
//                     // value={adsr.r}
//                 />
//                         </Col>
//                     </Row>
//                 </Container>
//                 </fieldset>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default ControlPanel;