import * as React from 'react';
import { observer } from 'mobx-react';
import { FormState, FieldState } from 'formstate';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import {
    Viewport,
    InteractiveMap,
    MapEvent
} from 'react-map-gl';

import * as MapboxGL from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

interface MyMapState {
  viewport: Viewport;
}

interface MyMapProps {
  onClick: (e: MapEvent) => void; // tslint:disable-line: no-any
}

class MyMap extends React.Component<MyMapProps, MyMapState> {

  map: MapboxGL.Map;

  state: MyMapState = {
      viewport: {
          bearing: 0,
          isDragging: false,
          longitude: 150.86914,
          latitude: -34.41921,
          zoom: 3,
      }
  };

  _onViewportChange = (viewport: Viewport) => this.setState({viewport});

    constructor (props: any) { // tslint:disable-line: no-any
      super(props);
      this.props = props;
    }

    render() {
        return (
            <div>
                <InteractiveMap
                    {...this.state.viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoiYWNyb3NzdGhlY2xvdWQiLCJhIjoiY2ppNnQzNG9nMDRiMDNscDh6Zm1mb3dzNyJ9.nFFwx_YtN04_zs-8uvZKZQ"
                    height={400}
                    width={400}
                    ref={this.setRefInteractive}
                    onViewportChange={this._onViewportChange}
                    onClick={this.props.onClick}
                />
            </div>
        );
    }

    private readonly setRefInteractive = (el: InteractiveMap) => {
        this.map = el.getMap();
    }

}

let regexWeburl = new RegExp(
  '^' +
  // protocol identifier
  '(?:(?:https?|ftp)://)' +
  // user:pass authentication
  '(?:\\S+(?::\\S*)?@)?' +
  '(?:' +
  // IP address exclusion
  // private & local networks
  '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
  '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
  '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
  '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
  '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
  '|' +
  // host name
  '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
  // domain name
  '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
  // TLD identifier
  '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
  // TLD may end with dot
  '\\.?' +
  ')' +
  // port number
  '(?::\\d{2,5})?' +
  // resource path
  '(?:[/?#]\\S*)?' +
  '$',
  'i'
);

const oceans: String[] = [ 'Pacific', 'Atlantic', 'Indian', 'Southern', 'Arctic' ];

const valposition = function (lngLat: number[]): boolean {
  let lng = lngLat[0], lat = lngLat[1];
  return (-180 <= lng) && (lng <= 180) && (-90 <= lat) && (lat <= 90);
};

class EntryFormState {
  // Create a field
  description = new FieldState('').validators((val: string) => !val && 'description required');
  ocean = new FieldState('Pacific').validators((val: string) => oceans.indexOf(val) < 0 && 'valid ocean requured');
  url = new FieldState('').validators((val: string) => !regexWeburl.test(val) && 'valid URL required');
  artist = new FieldState('').validators((val: string) => { return false; });
  position = new FieldState([150.86914, -34.41921]).validators((val: number[]) => !valposition(val) && 'valid position required');

  // Compose fields into a form
  form = new FormState({
    description: this.description,
    ocean: this.ocean,
    url: this.url,
    position: this.position,
    artist: this.artist
  });

  onSubmit = async (e: any) => { // tslint:disable-line:no-any
    e.preventDefault(); 
    //  Validate all fields
    let res = await this.form.validate();
    // If any errors you would know
    if (res.hasError) {
      return;
    }
    // Yay .. all good. Do what you want with it
    let body = JSON.stringify({
      description: this.form.$.description.$,
      ocean: this.form.$.ocean.$,
      url: this.form.$.url.$,
      position: this.form.$.position.$,
      artist: this.form.$.artist.$
    });

    try {
      let response = await fetch('https://4984s3d656.execute-api.eu-central-1.amazonaws.com/prod/item', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
      });
      await response.status;
      location.reload();
    } catch (err) {
      alert(err);
    }
  }

}

@observer
export class EntryForm extends React.Component<{}, {}> {

  data = new EntryFormState();

  setposition = (e: MapEvent) => {
    this.data.position.onChange(e.lngLat);
  }

  render() {
    const data = this.data;
    return (
      <Container>
      <MyMap onClick={(e) => this.setposition(e)}/>
      <Form onSubmit={(e) => data.onSubmit(e)}>
        <FormGroup>
          <Label for="position">position</Label>
          <Input
            value={data.position.value.toString()}
            readOnly={true}
          />
        </FormGroup>
        <FormGroup>
          <Label for="inputDescription">Description</Label>
          <Input
            id="inputDescription"
            type="text"
            value={data.description.value}
            onChange={(e) => data.description.onChange(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ocean">Select an ocean</Label>
          <Input type="select" name="ocean" id="ocean" onChange={(e) => data.ocean.onChange(e.target.value)}>
            <option>Pacific</option>
            <option>Atlantic</option>
            <option>Indian</option>
            <option>Southern</option>
            <option>Arctic</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="url">Url</Label>
          <Input type="url" name="url" id="url" placeholder="url placeholder" onChange={(e) => data.url.onChange(e.target.value)}/>
        </FormGroup>
        <FormGroup>
          <Label for="artist">Artist</Label>
          <Input
            id="artist"
            type="text"
            value={data.artist.value}
            onChange={(e) => data.artist.onChange(e.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
        <p>{data.form.error}</p>
      </Form>
      </Container>
    );
  }
}
