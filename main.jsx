/** @jsx React.DOM */

(function (React, d3Chart) {

    var Chart = React.createClass({
        propTypes: {
            data: React.PropTypes.array,
            domain: React.PropTypes.object
        },

        componentDidMount: function() {
            var el = this.getDOMNode();
            d3Chart.create(el, {
                width: '100%',
                height: '300px'
            }, this.getChartState());
        },

        componentDidUpdate: function() {
            var el = this.getDOMNode();
            d3Chart.update(el, this.getChartState());
        },

        getChartState: function() {
            return {
                data: this.props.data,
                domain: this.props.domain
            };
        },

        componentWillUnmount: function() {
            var el = this.getDOMNode();
            d3Chart.destroy(el);
        },

        render: function() {
            return (
                <div className="Chart"></div>
            );
        }
    });
    // App

    var JobList = React.createClass({
        render: function () {
            var jobItems = this.props.jobs.map(function (job) {
                return (
                    <JobComponent jobName={job.name} ></JobComponent>
                );
            }, this);
            return (<div>{jobItems}</div>)
        }
    });

    var JobComponent = React.createClass({
        render: function () {
            return (
                <div className="jobForm">
                {this.props.jobName}
                </div>
            );
        }
    });


    var App = React.createClass({
        getInitialState: function () {
            var sampleData = [
                {id: '5fbmzmtc', x: 7, y: 41, z: 6},
                {id: 's4f8phwm', x: 11, y: 45, z: 9},
            ];

            return {
                jenkinsJobs: [{
                    name: 'Build#1',
                    color: 'red',
                    data: sampleData,
                    domain: {x: [0, 30], y: [0, 100]}
                }]
            };
        },
        componentDidMount: function () {
            var that = this;
            setInterval(function(){
                that.setState({
                    jenkinsJobs: that.state.jenkinsJobs.concat({
                        name: 'Build#1',
                        color: 'red'
                    })
                });
            }, 3000);

        },
        render: function () {
            return (
                <div className="jobBox">
                    <h1>jobs</h1>
                    <JobList jobs={this.state.jenkinsJobs}/>
                    <Chart
                        data={this.state.data}
                        domain={this.state.domain} />
                </div>

            );
        }
    });

    React.renderComponent(
        <App />,
        document.getElementById('content')
    );

}(React, d3Chart));

