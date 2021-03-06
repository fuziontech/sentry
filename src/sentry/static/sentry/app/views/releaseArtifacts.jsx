import React from "react";
import Router from "react-router";
import PropTypes from "../proptypes";

import api from "../api";
import FileSize from "../components/fileSize";
import LoadingError from "../components/loadingError";
import LoadingIndicator from "../components/loadingIndicator";

var ReleaseArtifacts = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
    release: PropTypes.AnyModel
  },

  getInitialState() {
    return {
      loading: true,
      error: false,
      fileList: [],
      pageLinks: null
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  routeDidChange() {
    this.fetchData();
  },

  fetchData() {
    var router = this.context.router;
    var params = router.getCurrentParams();
    var endpoint = '/projects/' + params.orgId + '/' + params.projectId + '/releases/' + params.version + '/files/';

    this.setState({
      loading: true,
      error: false
    });

    api.request(endpoint, {
      success: (data, _, jqXHR) => {
        this.setState({
          error: false,
          loading: false,
          fileList: data,
          pageLinks: jqXHR.getResponseHeader('Link')
        });
      },
      error: () => {
        this.setState({
          error: true,
          loading: false
        });
      }
    });
  },


  render() {
    if (this.state.loading)
      return <LoadingIndicator />;
    else if (this.state.error)
      return <LoadingError onRetry={this.fetchData} />;
    else if (this.state.fileList.length === 0)
      return (
        <div className="box empty-stream">
          <span className="icon icon-exclamation"></span>
          <p>There are no artifacts uploaded for this release.</p>
        </div>
      );

    // TODO(dcramer): files should allow you to download and delete them
    return (
      <div>
        <table className="table">
          {this.state.fileList.map((file) => {
            console.log(file);
            return (
              <tr>
                <td><strong>{file.name}</strong></td>
                <td style={{width: 120}}><FileSize bytes={file.size} /></td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
});

export default ReleaseArtifacts;
