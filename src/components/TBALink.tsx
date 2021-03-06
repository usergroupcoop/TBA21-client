import React from 'react'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeAllModal } from '../actions/modals/allModal';
import { toggle as toggleSearch } from '../actions/searchConsole';

const TBALink = ({ to, closeAllModal, toggleSearch, ...props }) =>
  <Link to={to} {...props} onClick={() => {
    closeAllModal()
    toggleSearch(false)
    props.onClick && props.onClick()
  }} />

export default connect(null, {
  closeAllModal,
  toggleSearch
})(TBALink)
