import * as React from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Feature, GeometryObject } from 'geojson';
import { Map, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import { getMapIcon } from '../../map/icons';

import 'leaflet/dist/leaflet.css';
import { Layer } from 'leaflet';

// const geoJSON: string = '{"type": "GeometryCollection","properties": {"value": "foo"},"geometries": [{"type": "Point", "coordinates": [0, 0]}, {"type": "Polygon", "coordinates": [[[45, 45], [45, -45], [-45, -45], [-45, 45], [45,45]]]}]}'; // todo-dan remove
const geoJSON: string = '{"type": "GeometryCollection","properties": {"value": "foo"},"geometries": [{"type": "Point", "coordinates": [54,54]}, {"type": "Point", "coordinates": [45, -45]}, {"type": "Polygon", "coordinates": [[[45, 45], [45, -45], [-45, -45], [-45, 45], [45,45]]]}]}'; // todo-dan remove
const ausGeoJSON: string = '{"type":"FeatureCollection","features":[{"type":"Feature","id":"AUS","properties":{"name":"Australia"},"geometry":{"type":"MultiPolygon","coordinates":[[[[145.397978,-40.792549],[146.364121,-41.137695],[146.908584,-41.000546],[147.689259,-40.808258],[148.289068,-40.875438],[148.359865,-42.062445],[148.017301,-42.407024],[147.914052,-43.211522],[147.564564,-42.937689],[146.870343,-43.634597],[146.663327,-43.580854],[146.048378,-43.549745],[145.43193,-42.693776],[145.29509,-42.03361],[144.718071,-41.162552],[144.743755,-40.703975],[145.397978,-40.792549]]],[[[143.561811,-13.763656],[143.922099,-14.548311],[144.563714,-14.171176],[144.894908,-14.594458],[145.374724,-14.984976],[145.271991,-15.428205],[145.48526,-16.285672],[145.637033,-16.784918],[145.888904,-16.906926],[146.160309,-17.761655],[146.063674,-18.280073],[146.387478,-18.958274],[147.471082,-19.480723],[148.177602,-19.955939],[148.848414,-20.39121],[148.717465,-20.633469],[149.28942,-21.260511],[149.678337,-22.342512],[150.077382,-22.122784],[150.482939,-22.556142],[150.727265,-22.402405],[150.899554,-23.462237],[151.609175,-24.076256],[152.07354,-24.457887],[152.855197,-25.267501],[153.136162,-26.071173],[153.161949,-26.641319],[153.092909,-27.2603],[153.569469,-28.110067],[153.512108,-28.995077],[153.339095,-29.458202],[153.069241,-30.35024],[153.089602,-30.923642],[152.891578,-31.640446],[152.450002,-32.550003],[151.709117,-33.041342],[151.343972,-33.816023],[151.010555,-34.31036],[150.714139,-35.17346],[150.32822,-35.671879],[150.075212,-36.420206],[149.946124,-37.109052],[149.997284,-37.425261],[149.423882,-37.772681],[148.304622,-37.809061],[147.381733,-38.219217],[146.922123,-38.606532],[146.317922,-39.035757],[145.489652,-38.593768],[144.876976,-38.417448],[145.032212,-37.896188],[144.485682,-38.085324],[143.609974,-38.809465],[142.745427,-38.538268],[142.17833,-38.380034],[141.606582,-38.308514],[140.638579,-38.019333],[139.992158,-37.402936],[139.806588,-36.643603],[139.574148,-36.138362],[139.082808,-35.732754],[138.120748,-35.612296],[138.449462,-35.127261],[138.207564,-34.384723],[137.71917,-35.076825],[136.829406,-35.260535],[137.352371,-34.707339],[137.503886,-34.130268],[137.890116,-33.640479],[137.810328,-32.900007],[136.996837,-33.752771],[136.372069,-34.094766],[135.989043,-34.890118],[135.208213,-34.47867],[135.239218,-33.947953],[134.613417,-33.222778],[134.085904,-32.848072],[134.273903,-32.617234],[132.990777,-32.011224],[132.288081,-31.982647],[131.326331,-31.495803],[129.535794,-31.590423],[128.240938,-31.948489],[127.102867,-32.282267],[126.148714,-32.215966],[125.088623,-32.728751],[124.221648,-32.959487],[124.028947,-33.483847],[123.659667,-33.890179],[122.811036,-33.914467],[122.183064,-34.003402],[121.299191,-33.821036],[120.580268,-33.930177],[119.893695,-33.976065],[119.298899,-34.509366],[119.007341,-34.464149],[118.505718,-34.746819],[118.024972,-35.064733],[117.295507,-35.025459],[116.625109,-35.025097],[115.564347,-34.386428],[115.026809,-34.196517],[115.048616,-33.623425],[115.545123,-33.487258],[115.714674,-33.259572],[115.679379,-32.900369],[115.801645,-32.205062],[115.689611,-31.612437],[115.160909,-30.601594],[114.997043,-30.030725],[115.040038,-29.461095],[114.641974,-28.810231],[114.616498,-28.516399],[114.173579,-28.118077],[114.048884,-27.334765],[113.477498,-26.543134],[113.338953,-26.116545],[113.778358,-26.549025],[113.440962,-25.621278],[113.936901,-25.911235],[114.232852,-26.298446],[114.216161,-25.786281],[113.721255,-24.998939],[113.625344,-24.683971],[113.393523,-24.384764],[113.502044,-23.80635],[113.706993,-23.560215],[113.843418,-23.059987],[113.736552,-22.475475],[114.149756,-21.755881],[114.225307,-22.517488],[114.647762,-21.82952],[115.460167,-21.495173],[115.947373,-21.068688],[116.711615,-20.701682],[117.166316,-20.623599],[117.441545,-20.746899],[118.229559,-20.374208],[118.836085,-20.263311],[118.987807,-20.044203],[119.252494,-19.952942],[119.805225,-19.976506],[120.85622,-19.683708],[121.399856,-19.239756],[121.655138,-18.705318],[122.241665,-18.197649],[122.286624,-17.798603],[122.312772,-17.254967],[123.012574,-16.4052],[123.433789,-17.268558],[123.859345,-17.069035],[123.503242,-16.596506],[123.817073,-16.111316],[124.258287,-16.327944],[124.379726,-15.56706],[124.926153,-15.0751],[125.167275,-14.680396],[125.670087,-14.51007],[125.685796,-14.230656],[126.125149,-14.347341],[126.142823,-14.095987],[126.582589,-13.952791],[127.065867,-13.817968],[127.804633,-14.276906],[128.35969,-14.86917],[128.985543,-14.875991],[129.621473,-14.969784],[129.4096,-14.42067],[129.888641,-13.618703],[130.339466,-13.357376],[130.183506,-13.10752],[130.617795,-12.536392],[131.223495,-12.183649],[131.735091,-12.302453],[132.575298,-12.114041],[132.557212,-11.603012],[131.824698,-11.273782],[132.357224,-11.128519],[133.019561,-11.376411],[133.550846,-11.786515],[134.393068,-12.042365],[134.678632,-11.941183],[135.298491,-12.248606],[135.882693,-11.962267],[136.258381,-12.049342],[136.492475,-11.857209],[136.95162,-12.351959],[136.685125,-12.887223],[136.305407,-13.29123],[135.961758,-13.324509],[136.077617,-13.724278],[135.783836,-14.223989],[135.428664,-14.715432],[135.500184,-14.997741],[136.295175,-15.550265],[137.06536,-15.870762],[137.580471,-16.215082],[138.303217,-16.807604],[138.585164,-16.806622],[139.108543,-17.062679],[139.260575,-17.371601],[140.215245,-17.710805],[140.875463,-17.369069],[141.07111,-16.832047],[141.274095,-16.38887],[141.398222,-15.840532],[141.702183,-15.044921],[141.56338,-14.561333],[141.63552,-14.270395],[141.519869,-13.698078],[141.65092,-12.944688],[141.842691,-12.741548],[141.68699,-12.407614],[141.928629,-11.877466],[142.118488,-11.328042],[142.143706,-11.042737],[142.51526,-10.668186],[142.79731,-11.157355],[142.866763,-11.784707],[143.115947,-11.90563],[143.158632,-12.325656],[143.522124,-12.834358],[143.597158,-13.400422],[143.561811,-13.763656]]]]}}]}';

interface State {
  position: L.LatLngExpression;
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
    this.globalMapEvents();

    const json = JSON.parse(geoJSON);
    L.geoJSON(json, {
      // Add our custom icon to the map.
      pointToLayer: (feature: Feature<GeometryObject>, latlng: L.LatLngExpression) => {
        return L.marker(latlng, {icon: getMapIcon()});
      },
      onEachFeature: (feature: Feature<GeometryObject>, layer: L.Layer) => {
        this.layerEvents(layer);
      }
    }).addTo(this.map.leafletElement);

    const json2 = JSON.parse(ausGeoJSON); // todo-dan remove
    L.geoJSON(json2, { // todo-dan remove
      // Add our custom icon to the map.
      pointToLayer: (feature: Feature<GeometryObject>, latlng: L.LatLngExpression) => {
        return L.marker(latlng, {icon: getMapIcon()});
      },
      onEachFeature: (feature: Feature<GeometryObject>, layer: L.Layer) => {
        this.layerEvents(layer);
      }
    }).addTo(this.map.leafletElement);

    if (this.props.geojson) {
      console.log('Got data');
    } else {
      this.locateUser();
    }
  }

  callback = () => {
    console.log('Callback - features - ', Object.values(this.map.leafletElement._layers));

    // Object.values(this.map.leafletElement._layers).map( (e: L.Layer) => {
    //   if (e.feature) {
    //     console.log(e)
    //   }
    // });

    // if (typeof this.props.positionCallback === 'function') {
    //   this.props.positionCallback(this.state.loadedMarkers);
    //   this.props.positionCallback(this.state.lineString);
    // }
  }

  componentWillUnmount(): void {
    this.callback();
    this._isMounted = false;
  }

  globalMapEvents = () => {
    this.map.leafletElement.on('layerremove', u => {
      this.callback();
    });
  }

  layerEvents = (layer: Layer) => {
    layer.on('pm:edit', u => {
      this.callback();
    });
    layer.on('pm:cut', u => {
      this.callback();
    });
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
      this.layerEvents(e.layer);
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
          crs={L.CRS.EPSG4326}
        >
          <TileLayer url={tileLayer} />
        </Map>
      </div>
    );
  }
}
