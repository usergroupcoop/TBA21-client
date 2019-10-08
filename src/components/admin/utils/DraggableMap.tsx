import * as React from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Map, Marker, TileLayer, Polyline } from 'react-leaflet';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import { getMapIcon } from '../../map/icons';
import { Position } from 'types/Map';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

interface State {
  position: L.LatLngExpression;
  loadedMarkers: Position[] | undefined;
  lineString: L.LatLngExpression[] | undefined;
  zoom: number;
}

interface Props {
  geojson?: string;
  positionCallback?: Function;
}

export default class DraggableMap extends React.Component<Props, State> {
  _isMounted;
  map;

  state: State = {
    position: [0, 0],
    zoom: 5, // initial zoom level
    lineString: undefined,
    loadedMarkers: [
      {
        lat: -34.4061715,
        lng: 150.8809023
      },
      {
        lat: -38.4061715,
        lng: 150.8809023
      }
    ]
  };

  latInputRef;
  lngInputRef;

  constructor(props: any) { // tslint:disable-line: no-any
    super(props);

    this._isMounted = false;
  }

  componentDidMount(): void {
    this._isMounted = true;

    this.addLeafletGeoMan();

    if (this.props.geojson) {
      const
        geoJSON = JSON.parse(this.props.geojson),
        { type }: { type: string } = geoJSON;

      if (type === 'Point') {
        const { coordinates }: { coordinates: L.LatLngExpression } = geoJSON;
        this.setState({
          loadedMarkers: [{ lat: coordinates[0], lng: coordinates[1] }],
          position: [coordinates[0], coordinates[1]]
        });
      }

      if (type === 'LineString') {
        const { coordinates }: { coordinates: L.LatLngExpression[] } = geoJSON;
        this.setState({
          lineString: coordinates,
          position: [coordinates[0][0], coordinates[0][1]]
        });
      }
    } else {
      this.locateUser();
    }
  }

  callback = () => {
    console.log('Callback - features - ');

    // if (typeof this.props.positionCallback === 'function') {
    //   this.props.positionCallback(this.state.loadedMarkers);
    //   this.props.positionCallback(this.state.lineString);
    // }
  }

  componentWillUnmount(): void {
    this.callback();
    this._isMounted = false;
  }

  /**
   * Add controls from leaflet geoman, leaflet.pm
   */
  addLeafletGeoMan = () => {
    const map = this.map.leafletElement;
    map.pm.addControls();

    // Enable marker, se the icon then disable it, this toggles the "clicked" state on the icon.
    map.pm.enableDraw('Marker', {
      markerStyle: {
        icon: getMapIcon()
      }
    });
    map.pm.disableDraw('Marker');

    map.on('pm:create', e => {
      this.callback();
      e.layer.on('pm:edit', u => {
        this.callback();
      });
      e.layer.on('pm:remove', u => {
        this.callback();
      });
    });

  }

  inputChange = () => {
    const map = this.map;
    if (map !== null && this._isMounted) {
      console.log(this.latInputRef.value, this.lngInputRef.value);
      map.leafletElement.flyTo(this.latInputRef.currentTarget.value, this.lngInputRef.currentTarget.value);
    }
  }

  /**
   * Use leaflet's locate method to locate the use and set the view to that location.
   */
  locateUser = (): void => {
    const map = this.map;
    if (map !== null && this._isMounted) {
      map.leafletElement.locate()
        .on('locationfound', (location: L.LocationEvent) => {
          if (location && location.latlng) {
            map.leafletElement.flyTo(location.latlng, 10);
            // Set the input fields
            this.latInputRef.value = location.latlng.lat;
            this.lngInputRef.value = location.latlng.lng;
          }
        })
        .on('locationerror', () => {
          // Fly to a default location if the user declines our request to get their GPS location or if we had trouble getting said location.
          // Ideally the map would already be in this location anyway.
          // Set the input fields
          this.latInputRef.value = this.state.position[0];
          this.lngInputRef.value = this.state.position[1];
        });
    }
  }

  render(): React.ReactNode {
    const
      mapID: string = 'mapbox.outdoors',
      accessToken: string = 'pk.eyJ1IjoiYWNyb3NzdGhlY2xvdWQiLCJhIjoiY2ppNnQzNG9nMDRiMDNscDh6Zm1mb3dzNyJ9.nFFwx_YtN04_zs-8uvZKZQ',
      tileLayer: string = 'https://api.tiles.mapbox.com/v4/' + mapID + '/{z}/{x}/{y}.png?access_token=' + accessToken,

      mapStyle = {
        height: '100%',
        minHeight: '400px'
      };

    return (
      <div id="draggableMap" className="h-100">
        <Container>
          <Row>
            <Col md="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Lat</InputGroupAddon>
                <Input className="lat" type="number" innerRef={(el) => { this.latInputRef = el; }} onChange={this.inputChange}/>
              </InputGroup>
            </Col>
            <Col md="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">Lng</InputGroupAddon>
                <Input className="lng" type="number" innerRef={(el) => { this.lngInputRef = el; }} onChange={this.inputChange}/>
              </InputGroup>
            </Col>
          </Row>
        </Container>

        <Map
          center={this.state.position}
          zoom={this.state.zoom}
          style={mapStyle}
          ref={map => this.map = map}
        >
          <TileLayer url={tileLayer} />

          {this.state.lineString ?
            <Polyline color="lime" positions={this.state.lineString} />
            :
            <></>
          }
          {this.state.loadedMarkers ? this.state.loadedMarkers.map((m, i) => {
              return (
                <Marker
                  key={i}
                  position={m}
                  icon={getMapIcon()}
                  ondragend={this.callback}
                  onremove={this.callback}
                />
              );
            })
            : <></>
          }
        </Map>
      </div>
    );
  }
}
