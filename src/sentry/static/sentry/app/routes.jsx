import React from "react";
import Router from "react-router";
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

import App from "./views/app";
import GroupActivity from "./views/groupActivity";
import GroupDetails from "./views/groupDetails";
import GroupEventDetails from "./views/groupEventDetails";
import GroupEvents from "./views/groupEvents";
import GroupTags from "./views/groupTags";
import GroupTagValues from "./views/groupTagValues";
import GroupOverview from "./views/groupOverview";
import GroupUserReports from "./views/groupUserReports";
import OrganizationDetails from "./views/organizationDetails";
import OrganizationStats from "./views/organizationStats";
import OrganizationTeams from "./views/organizationTeams";
import ProjectDashboard from "./views/projectDashboard";
import ProjectEvents from "./views/projectEvents";
import ProjectDetails from "./views/projectDetails";
import ProjectReleases from "./views/projectReleases";
import PropTypes from "./proptypes";
import ReleaseAllEvents from "./views/releaseAllEvents";
import ReleaseArtifacts from "./views/releaseArtifacts";
import ReleaseDetails from "./views/releaseDetails";
import ReleaseNewEvents from "./views/releaseNewEvents";
import RouteNotFound from "./views/routeNotFound";
import SharedGroupDetails from "./views/sharedGroupDetails";
import Stream from "./views/stream";
import TeamDetails from "./views/teamDetails";

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route path="/organizations/:orgId/" handler={OrganizationDetails}>
      <Route name="organizationStats" path="stats/" handler={OrganizationStats} />
    </Route>
    <Route name="sharedGroupDetails" path="/share/group/:shareId/" handler={SharedGroupDetails} />
    <Route name="organizationDetails" path="/:orgId/" handler={OrganizationDetails}>
      <DefaultRoute name="organizationTeams" handler={OrganizationTeams} />
      <Route name="projectDetails" path=":projectId/" handler={ProjectDetails}>
        <DefaultRoute name="stream" handler={Stream} />
        <Route name="projectDashboard" path="dashboard/" handler={ProjectDashboard} />
        <Route name="projectEvents" path="events/" handler={ProjectEvents} />
        <Route name="projectReleases" path="releases/" handler={ProjectReleases} />
        <Route name="releaseDetails" path="releases/:version/" handler={ReleaseDetails}>
          <DefaultRoute name="releaseNewEvents" handler={ReleaseNewEvents} />
          <Route name="releaseAllEvents" path="all-events/" handler={ReleaseAllEvents} />
          <Route name="releaseArtifacts" path="artifacts/" handler={ReleaseArtifacts} />
        </Route>
        <Route name="groupDetails" path="group/:groupId/" handler={GroupDetails}
               ignoreScrollBehavior>
          <DefaultRoute name="groupOverview" handler={GroupOverview} />
          <Route name="groupActivity" path="activity/" handler={GroupActivity} />
          <Route name="groupEventDetails" path="events/:eventId/" handler={GroupEventDetails} />
          <Route name="groupEvents" path="events/" handler={GroupEvents} />
          <Route name="groupTags" path="tags/" handler={GroupTags} />
          <Route name="groupTagValues" path="tags/:tagKey/" handler={GroupTagValues} />
          <Route name="groupUserReports" path="reports/" handler={GroupUserReports} />
        </Route>
      </Route>
    </Route>
    <Router.NotFoundRoute handler={RouteNotFound} />
  </Route>
);

export default routes;

