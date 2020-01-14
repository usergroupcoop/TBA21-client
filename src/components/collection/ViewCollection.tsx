import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { fetchCollection, dispatchLoadMore, loadMore } from 'actions/collections/viewCollection';
import { ViewCollectionState } from 'reducers/collections/viewCollection';
import { toggle as itemModalToggle } from 'actions/modals/itemModal';
import { ErrorMessage } from '../utils/alerts';

import { browser } from '../utils/browser';
import { RouteComponentProps, withRouter } from 'react-router';

import Share from '../utils/Share';
import moment from 'moment';
import 'styles/components/pages/viewItem.scss';
import { Item, itemType, Regions } from '../../types/Item';
import { Collection } from '../../types/Collection';
import { DetailPreview } from '../utils/DetailPreview';
import { FileTypes } from '../../types/s3File';
import AudioPreview from '../layout/audio/AudioPreview';
import { dateFromTimeYearProduced } from '../../actions/home';
import CollectionModal from '../modals/CollectionModal';

type MatchParams = {
  id: string;
};

interface Props extends RouteComponentProps<MatchParams>, ViewCollectionState {
  fetchCollection?: Function;
  itemModalToggle?: Function;
  dispatchLoadMore?: Function;
}

interface State {
  data: (Item | Collection)[];
  offset: number;
  errorMessage?: string;
  collection?: Collection;
  collectionModalToggled: boolean;
  collectionModalData?: Collection;
}

const CollectionDetails = (props: { label: string, value: string }): JSX.Element => (
  <Row className="border-bottom subline details">
    <Col xs="12" md="6">{props.label}</Col>
    <Col xs="12" md="6">{props.value}</Col>
  </Row>
);

const DataLayout = (props: { data: Item | Collection, itemModalToggle?: Function, collectionModalToggle?: Function }): JSX.Element => {
  let response: JSX.Element = <></>;

  if (props.data.__typename === 'item') {
    const data = props.data as Item;
    if (data.item_type === itemType.Audio || data.file.type === FileTypes.Audio) {
      const date = dateFromTimeYearProduced(data.time_produced, data.year_produced);
      response = (
        <AudioPreview
          data={{
            id: data.id,
            url: data.file.url,
            title: data.title ? data.title : '',
            creators: data.creators ? data.creators : undefined,
            item_subtype: data.item_subtype ? data.item_subtype : undefined,
            date: date,
            isCollection: data.__typename !== 'item'
          }}
          noClick={data.__typename !== 'item'}
        />
      );
    } else {
      response = <DetailPreview data={data} modalToggle={typeof props.itemModalToggle === 'function' ? props.itemModalToggle : undefined}/>;
    }
  } else {
    const data = props.data as Collection;
    if (data.file && data.id) {
      response = (
        <DetailPreview
          modalToggle={() => typeof props.collectionModalToggle === 'function' ? props.collectionModalToggle(data) : undefined}
          data={{
            file: data.file,
            id: data.id,
            title: data.title ? data.title : '',
            s3_key: '',
            year_produced: data.year_produced ? data.year_produced : '',
            time_produced: data.time_produced ? data.time_produced : '',
            creators: data.creators ? data.creators : [],
            regions: data.regions ? data.regions : [],

            // Collection specific
            count: data.count ? data.count : 0,
            type: data.type ? data.type : undefined,

            concept_tags: [],
            keyword_tags: []
          }}
        />
      );
    }
  }

  return (
    <Col md={!!props.data.file && props.data.file.type === 'Audio' ? '8' : '4'} className="pt-4">
      {response}
    </Col>
  );
};

class ViewCollection extends React.Component<Props, State> {
  browser: string;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      collectionModalToggled: false
    };

    this.browser = browser();
  }

  async componentDidMount(): Promise<void> {
    const { match } = this.props;

    if (match && match.params.id) {
      if (typeof this.props.fetchCollection !== 'undefined') {
        this.props.fetchCollection(match.params.id);
        return;
      }
    }

    // If we have an id from the URL pass it through, otherwise use the one from Redux State
    if (this.props.collection && this.props.collection.id) {
      this.setState({ collection: this.props.collection });

      if (this.props.noRedux) {
        this.setState({data: []});
        try {
          await loadMore(this.props.collection.id, this.state.offset, (data) => {
            this.setState({data: [...this.state.data, data]});
          });
        } catch (e) {
          this.setState({ errorMessage: 'Something went wrong loading the data for this collection, sorry!' });
        }
      } else {
        if (this.props.data) {
          this.setState({data: this.props.data});
        }
      }
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>): void {
    const state = {};

    if (!this.props.noRedux) {
      if (!!this.props.collection && this.props.collection !== this.state.collection) {
        Object.assign(state, {collection: this.props.collection});
      }

      if (this.props.data !== this.state.data) {
        Object.assign(state, {data: this.props.data});
      }

      if (this.props.offset !== this.state.offset) {
        Object.assign(state, {offset: this.props.offset});
      }

      if (Object.keys(state).length) {
        this.setState(state);
      }
    }
  }

  collectionModalToggle = (collectionModalData: Collection) => {
    this.setState({ collectionModalData, collectionModalToggled: !this.state.collectionModalToggled });
  }

  render() {
    if (typeof this.state.collection === 'undefined') {
      return <ErrorMessage message={this.props.errorMessage} />;
    }

    const {
      id,
      creators,
      title,
      description,
      license,
      aggregated_concept_tags,
      aggregated_keyword_tags,

      focus_action,
      focus_arts,
      focus_scitech,
      time_produced,
      year_produced,
      venues,
      exhibited_at,
      url,
      regions,
      copyright_holder
    } = this.state.collection;

    let focusTotal = 0;
    if (!!focus_action && !!focus_arts && !!focus_scitech) {
      focusTotal = parseInt(focus_action, 0) + parseInt(focus_arts, 0) + parseInt(focus_scitech, 0);
    }

    const focusPercentage = (level: number | string | undefined | null): string => {
      if (typeof level === 'undefined' || level === null) { return '0'; }
      if (typeof level === 'string') {
        level = parseInt(level, 0);
      }
      return `${ (level / focusTotal) * 100 }`;
    };

    return (
      <div id="item" className="container-fluid">
        <ErrorMessage message={this.props.errorMessage} />
        <Row>
          <Col xs="12" md="8" className="left border-right">
            <Row>
              <Col xs={{ size: 12, order: 2 }} md={{ size: 8, order: 1 }} className="creators">
                {creators ? creators.join(', ') : <></>}
              </Col>
            </Row>

            <Row>
              <Col>
                <h1>{title}</h1>
              </Col>
            </Row>
            <Row>
              <Col className="description">
                {
                  description ?
                    this.browser === 'ie6-11' ? description.split('\n').map((d, i) => <p key={i}>{d}</p>) : description
                  : <></>
                }
              </Col>
            </Row>

            {!!id ?
              (
                <Row>
                  <Col className="text-right">
                    <Share suffix={`collection/${id}`}/>
                  </Col>
                </Row>
              )
              : <></>
            }
          </Col>
          <Col xs="12" md="4" className="right">
            {!!time_produced ?
              <CollectionDetails label="Date Produced" value={moment(time_produced).format('Do MMMM YYYY')} />
              : year_produced ? <CollectionDetails label="Year Produced" value={year_produced} /> : <></>
            }
            {!!venues && venues.length ?
              <CollectionDetails label="Publication Venue(s)" value={`${venues.join(', ')}`} />
              : <></>
            }
            {!!exhibited_at && exhibited_at.length ?
              <CollectionDetails label="Exhibited At" value={`${exhibited_at.join(', ')}`} />
              : <></>
            }
            {!!regions && regions.length ?
              <CollectionDetails label="Region" value={regions.map((region) => (Regions[region])).join(', ')} />
              :
              ''
            }
            {!!license ? <CollectionDetails label="License" value={license} /> : ''}
            {!!copyright_holder ? <CollectionDetails label="Copyright Owner" value={copyright_holder} /> : ''}
            {!!url ? <CollectionDetails label="Link" value={url} /> : ''}

            {!!aggregated_concept_tags && aggregated_concept_tags.length ?
              (
                <Row className="border-bottom subline details">
                  <Col xs="12">Concept Tags</Col>
                  <Col xs="12">
                    {
                      aggregated_concept_tags.map(t => `#${t.tag_name} `)
                    }
                  </Col>
                </Row>
              )
            : ''}
            {!!aggregated_keyword_tags && aggregated_keyword_tags.length ?
              (
                <Row className="subline details">
                  <Col xs="12">Keyword Tags</Col>
                  <Col xs="12">
                    {
                      aggregated_keyword_tags.map(t => `#${t.tag_name} `)
                    }
                  </Col>
                </Row>
              )
              : ''}
            <Row>
              <Col className="px-0">
                <div style={{ height: '15px', background: `linear-gradient(to right, #0076FF ${focusPercentage(focus_arts)}%, #9013FE ${focusPercentage(focus_scitech)}%, #50E3C2 ${focusPercentage(focus_action)}%)` }} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          {
            this.state.data ?
              this.state.data.map((data: Item | Collection, i) => <DataLayout data={data} key={i} itemModalToggle={this.props.itemModalToggle} collectionModalToggle={this.collectionModalToggle}/>)
              : <></>
          }
        </Row>

        {this.state.collectionModalData ?
          (<CollectionModal
            collection={this.state.collectionModalData}
            open={this.state.collectionModalToggled}
            toggle={this.collectionModalToggle}
          />)
          : <></>
        }
      </div>
    );
  }
}

// State to props
const mapStateToProps = (state: { viewCollection: ViewCollectionState }, props: { collection?: Collection, noRedux?: boolean }) => { // tslint:disable-line: no-any
  return {
    errorMessage: state.viewCollection.errorMessage,
    collection: props.collection || state.viewCollection.collection,
    data: state.viewCollection.data,
    offset: state.viewCollection.offset,
    noRedux: !!props.noRedux || false,
  };
};

// Connect our redux store State to Props, and pass through the fetchCollection function.
export default withRouter(connect(mapStateToProps, { fetchCollection, dispatchLoadMore, itemModalToggle })(ViewCollection))
