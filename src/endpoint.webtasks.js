/**
* @param context {WebtaskContext}
*/
const request = require('request');

module.exports = function (context, req, res) {
  const QUERY = `
    query ($user: String!, $commitsMax: Int!) {
      rateLimit {
        cost
        remaining
        resetAt
      }
      user(login: $user) {
        name
        url
        repositories(isFork: false, privacy: PUBLIC, first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {
          edges {
            cursor
            node {
              name
              id
              url
              description
              pushedAt
              defaultBranchRef {
                id
                name
                target {
                  id,
                  commitResourcePath
                  ... on Commit {
                    history(first: $commitsMax) {
                      totalCount
                      pageInfo {
                        startCursor
                        endCursor
                      }
                      edges {
                        cursor
                        node {
                          committedDate
                          id
                          message
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const requestOptions = {
    url: 'https://api.github.com/graphql',
    body: JSON.stringify({
      query: QUERY,
      variables: {
        user: context.query.user || "javierdwd",
        commitsMax: context.query.commitsMax || 6,
      }
    }),
    headers: {
      'user-agent': 'node',
      'Authorization': `bearer ${context.secrets.GITHUB_ACCESS_TOKEN}`
    }
  };

  res.writeHead(200, { 'Content-Type': 'application/json '});

  if(req.method === 'GET') {
    request.post('https://api.github.com/graphql', requestOptions, function(error, resp, body) {
      if(error) {
        res.write(error);
        res.end();
      }
      res.write(body);
      res.end();
    });
  }
};