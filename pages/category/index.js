import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const CategoryList = (props) => {
  return (
    <div>CategoryList</div>
  )
}

CategoryList.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)