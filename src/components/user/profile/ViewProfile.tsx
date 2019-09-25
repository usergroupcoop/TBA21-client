import * as React from 'react';
import { connect } from 'react-redux';

import { State } from 'reducers/user/viewProfile';

import { RouteComponentProps, withRouter } from 'react-router';

import 'styles/components/pages/viewProfile.scss';
import { Alerts, ErrorMessage } from '../../utils/alerts';
import { Profile } from '../../../types/Profile';
import { fetchProfile } from '../../../actions/user/viewProfile';
import { Col, Row } from 'reactstrap';

interface Props extends RouteComponentProps, Alerts {
  fetchProfile: Function;
  profile: Profile;
}

class ViewProfile extends React.Component<Props, State> {
  matchedId: string = '';

  constructor(props: any) { // tslint:disable-line: no-any
    super(props);

    // Get our profileId passed through from URL props
    if (props.location && props.location.pathname) {
      this.matchedId = props.location.pathname.replace('/profiles/', '');
    }
  }

  componentDidMount() {
    // If we have an id from the URL pass it through, otherwise use the one from Redux State
    if (this.matchedId) {
      this.props.fetchProfile(this.matchedId);
    } else {
      this.setState({ errorMessage: 'No profile with that id.' });
    }
  }

  render() {
    if (typeof this.props.profile === 'undefined') {
      return 'Loading...';
    }
    const {
      // profile_image,
      profile_type,
      // featured_image,
      full_name,
      position,
      affiliation,
      city,
      country,
      biography,
      website,
      field_expertise,
      // profile_type,
      // public_profile
    } = this.props.profile;
    return (
      <div id="profile">
        <ErrorMessage message={this.props.errorMessage} />
        <Row>
          <Col xs="12" md="6" className="left">
            <Row>
              <Col xs="12" >
                <h1>{full_name}</h1>
              </Col>
              <Col xs="12">
                {field_expertise}
              </Col>
              <Col xs="12">
                {profile_type}
              </Col>
              <Col xs="12">
                {biography}
              </Col>
             </Row>
          </Col>

          <Col xs="12" md="6" className="right">
            <Row className="detailsRow">
              <Col xs="12" className="details border">
                Location: {city}, {country}
              </Col>
              <Col xs="12" className="details border">
                Website: {website}
              </Col>
              <Col xs="12" className="details border">
                Position: {position}
              </Col>
              <Col xs="12" className="details border">
                Affiliation: {affiliation}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

// State to props
const mapStateToProps = (state: { viewProfile: State }) => { // tslint:disable-line: no-any
  return {
    errorMessage: state.viewProfile.errorMessage,
    profile: state.viewProfile.profile
  };
};

// Connect our redux store State to Props, and pass through the fetchProfile function.
export default withRouter(connect(mapStateToProps, { fetchProfile })(ViewProfile));
