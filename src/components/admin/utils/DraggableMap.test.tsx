import * as React from 'react';
import { shallow } from 'enzyme';
import DraggableMap from './DraggableMap';

describe('Draggable map', () => {
  let wrapper;
  const
    topojson = '{"type":"Topology","objects":{"output":{"type":"GeometryCollection","geometries":[{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[149.36492,-33.81736,0]},{"type":"Point","coordinates":[160.400391,-34.957995,0]},{"type":"Point","coordinates":[154.511719,-41.376809,3000]}],"properties":{"id":"282","s3_key":"private/eu-central-1:2b3a2db1-5901-4e82-9f83-0160c82b9f15/7e32b7c6-c6d3-4e70-a101-12af2df21a19/496595a0-f215-11e9-b307-ffcdcd3d8655-IMG_4062.jpg","title":"Lizard friend","metatype":"item"}}]}},"arcs":[],"bbox":[149.36492,-41.376809,160.400391,-33.81736]}',
    props = {
      topoJSON: JSON.parse(topojson)
    };

  beforeAll( () => {
    wrapper = shallow(<DraggableMap {...props} />);
  });

  afterAll( () => {
    wrapper.unmount();
  });

  it('It should mount', () => {
    const instance = wrapper.instance();

    jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();

    expect(instance.componentDidMount).toHaveBeenCalledTimes(1);
  });

  // it('State should have LAT LNG from props after mount', () => {
  //   expect(wrapper.state('marker')).toMatchObject({ lat: geoJSON.coordinates[0], lng: geoJSON.coordinates[1] });
  // });
  //
  // it(`Lat input field should equal our props lat ${geoJSON.coordinates[0]}`, () => {
  //   expect(wrapper.find('#draggableMap Input.lat').props().value).toEqual(geoJSON.coordinates[0]);
  // });
  //
  // it(`Lng input field should equal our props lng ${geoJSON.coordinates[1]}`, () => {
  //   expect(wrapper.find('#draggableMap Input.lng').props().value).toEqual(geoJSON.coordinates[1]);
  // });

});
