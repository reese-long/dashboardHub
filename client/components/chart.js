var LineChart = require("react-chartjs").Line;
import { connect } from 'react-redux'
import React from 'react'

const Chart = (props) => {

    return (<LineChart data={props.data}
     options={props.options} width="370" height="150" />)


}

const mapState = null
const mapDispatch = null
export default connect(mapState, mapDispatch)(Chart)
